# 73｜外部图像资产生成判断与视频匹配流程

## A. 文件定位

本文件是执行流程适配层，不覆盖、不重写、不替代以下 upstream mechanism：

- `55_参考视觉语言迁移库_reference_visual_language_migration_library.md`
- `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md`
- `59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md`
- `61_视觉前处理数据协议_visual_preprocessing_data_protocol.md`

本文件只处理从视觉语言判断到外部图像资产生成 / 复用 / alpha / 视频匹配 / Remotion 合成 / 机器自检的执行流程。

本流程不修改音乐卡点、不修改 `beat_map`、不修改 BGM 节奏点、不修改基础调色、不修改 BGM 情绪调色机制。

状态：`external_image_asset_generation_video_fit_pipeline_ready_pending_pipeline_alignment_candidate_review`

## B. 新流程

```text
video_event_anchor
-> visual_language_decision
-> asset_generation_spec
-> ali_image_asset_or_existing_asset
-> alpha_crop
-> asset_video_fit_check
-> remotion_composite
-> machine_review_report
```

### 核心原则

1. 生成数量不是通过标准。
2. alpha 成功不是 `approved_for_video`。
3. Remotion 消费不是内容通过。
4. `x / y` 只是 render implementation coordinate，不是唯一视觉判断依据。
5. 资产形状、文字、情绪、视频事件匹配，才是核心判断。
6. 补位资产只能测试链路，不得写成原需求生成成功。

## C. asset_generation_spec 字段

每个外部图像资产必须在生成 / 复用前输出以下字段：

| field | required | meaning |
|---|---:|---|
| `asset_need_id` | yes | 资产需求 ID。 |
| `time_range` | yes | 视频出现时间。 |
| `video_event` | yes | 画面真实事件，不允许只写“装饰”。 |
| `video_anchor_source` | yes | 来自抽帧、event table、anchor map 或人工帧审的证据来源。 |
| `reference_rule_links` | yes | 引用 `55 / 56 / 59 / 61` 或相关报告的规则。 |
| `sticker_or_caption_branch` | yes | 进入 caption、sticker、visual punctuation 或 no-layer 分支。 |
| `asset_type` | yes | `font_card` / `caption_card` / `reaction_sticker` / `motion_punctuation` / `object_label` 等。 |
| `shape_requirement` | yes | 形状怎样从事件长出。 |
| `text_requirement` | yes | 字牌 / 标签 / 无文字要求，必须明确。 |
| `emotion_requirement` | yes | 情绪角色。 |
| `material_requirement` | yes | 描边、质感、阴影、背景和 alpha 要求。 |
| `motion_requirement` | yes | 入场、停留、退场和运动方向要求。 |
| `copy_risk_check` | yes | 不复制第三方贴纸、平台 UI、品牌、原文案、原字体。 |
| `expected_video_fit` | yes | 预期怎样贴合视频事件。 |
| `fallback_if_generation_failed` | yes | provider 失败时可否补位、补位用途和禁止声明。 |
| `fallback_if_video_fit_failed` | yes | 视频匹配失败回哪一层。 |

缺少 `video_event`、`video_anchor_source`、`reference_rule_links`、`shape_requirement` 或 `text_requirement` 任一项时，状态为：

```yaml
blocked_reason: blocked_asset_generation_spec_missing
route_back_to: 55/56/61
```

## D. asset_video_fit_check 字段

每个外部图像资产入 Remotion 前必须输出以下字段：

| field | required | meaning |
|---|---:|---|
| `asset_need_id` | yes | 资产需求 ID。 |
| `asset_source_status` | yes | `auto_probe_generated_asset` 或 `provider_arrearage_fallback_existing_ali_asset` 等。 |
| `is_supplemental_fallback` | yes | 是否为补位资产。 |
| `original_detection_text` | yes | 自动识别阶段原始文字 / 需求。 |
| `actual_asset_text` | yes | 实际资产里的文字或 `no_text_expected`。 |
| `shape_match_status` | yes | 形状是否匹配。 |
| `text_match_status` | yes | 文字是否匹配。 |
| `video_event_match_status` | yes | 是否匹配视频事件。 |
| `anchor_relation_status` | yes | 是否有真实锚点关系；只用坐标时必须说明。 |
| `overlay_float_risk` | yes | 浮层风险。 |
| `caption_blocking_risk` | yes | 遮挡字幕风险。 |
| `subject_blocking_risk` | yes | 遮挡主体风险。 |
| `final_machine_judgement` | yes | 机器自检结论，不代表用户审美通过。 |
| `route_back_to` | yes | 失败回路。 |

缺少 `asset_video_fit_check` 时，状态为：

```yaml
blocked_reason: blocked_video_fit_check_missing
route_back_to: 73_external_image_asset_generation_video_fit_pipeline
```

## E. 判断标准

| check | pass | fail |
|---|---|---|
| `shape_match` | 形状能从 `video_event_anchor`、`attachment_relation`、`shape_requirement` 推导。 | 只是通用表情、通用字牌、组件换色或数量补丁。 |
| `text_match` | 实际文字和原需求一致，或明确 `no_text_expected`。 | 原需求是 `顺线 / 线走这边`，实际资产是 `没感觉`。 |
| `emotion_match` | 情绪服务当前事件，例如进场、接触、顶住、顺线、收束。 | 情绪和画面事件无关，只是补位。 |
| `video_event_match` | 资产能解释为这个时间段的事件反应。 | 换到任意镜头仍成立。 |
| `anchor_relation` | 锚点来自可见边缘、接触点、表面、运动方向或 evidence frame。 | 只有 `x / y`。 |
| `alpha_quality` | 透明边缘、主体保留和阴影进入 `pending_user_review`。 | alpha 脏边、裁断、主体过大或边缘失真。 |
| `remotion_composite` | Remotion 成功消费资产且机器标签说明状态。 | 只报告 render 成功，没有内容匹配判断。 |

## F. 失败反馈层

| failure | symptom | route_back_to | forbidden_response |
|---|---|---|---|
| `shape_requirement_wrong` | 形状不像该事件长出来。 | `visual_language_decision / shape_grammar` | 换颜色、放大或加数量。 |
| `text_requirement_wrong` | 字牌 / 标签文字不匹配。 | `caption_relation / asset_generation_spec` | 把错字牌当成功。 |
| `generated_asset_mismatch` | provider 图和需求不符。 | `asset_generation_spec / ali_asset_request` | 只因有图就继续写通过。 |
| `alpha_dirty` | alpha 脏边、裁切、阴影异常。 | `crop_alpha` | 把 `transparent_ready=true` 写成批准。 |
| `overlay_floats` | 贴纸像浮层。 | `remotion_composite / material_motion` | 只微调 `x / y`。 |
| `coordinate_only_evidence` | 只有坐标解释。 | `video_event_anchor` | 写 `real_anchor_binding_verified`。 |
| `fallback_asset_used_as_success` | 补位资产被计入原需求成功。 | `blocked_semantic_success_overclaimed` | 把补位当 generated success。 |

## G. BGM / beat_map / base color grade unchanged

本流程不修改：

- 音乐卡点。
- BGM `beat_map`、`onset_map`、BGM 节奏点。
- 当前基础调色。
- `color_grade_profile`。
- `71_BGM情绪驱动自动调色机制_bgm_mood_driven_auto_color_grade_protocol.md`。
- `72_正片完整流程与BGM调色总闸门_full_video_pipeline_bgm_color_gate.md`。

若继续执行必须修改上述任一项，则本流程必须停止：

```yaml
blocked_reason: blocked_bgm_or_color_change_required
```

## H. 状态规则

| output | allowed_status | forbidden_claim |
|---|---|---|
| 流程文件 ready | `ready_pending_pipeline_alignment_candidate_review` | `capability_verified` |
| asset spec ready | `asset_generation_spec_ready` | `approved_for_video` |
| video fit check ready | `machine_fit_check_ready_pending_user_review` | `content_passed` |
| Remotion render 成功 | `technical_render_passed_pending_user_review` | `publish-ready / video_fixed` |
| 05 / 06 补位资产 | `provider_arrearage_fallback_existing_ali_asset` | `original_requirement_generated_success` |

## I. 本轮对齐候选状态词

本轮流程对齐候选必须写：

```text
this_is_partial_pipeline_alignment_candidate_not_full_video_candidate
```

该状态表示：

- 本轮只验证旧参考视觉语言机制能否接回外部图像资产执行流程。
- 本轮不构成完整正片候选。
- 本轮不构成 publish-ready。
- 本轮 technical validation 和 content validation 必须分开。

## J. next_goal

`user_review_external_image_asset_pipeline_alignment_candidate_and_machine_fit_report`
