# 正片候选完整交付闸门

## A. status（状态）

- task_type: `full_video_candidate_delivery_gate_mechanism`
- latest_policy_update_task_type: `project_default_vlog_pipeline_policy_update`
- mechanism_status: `project_default_vlog_pipeline_policy_updated_pending_future_validation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- source_problem: 旧正片候选闸门把字幕、贴纸、字牌、视觉反应字和视觉标点当成 vlog / odd 默认必需模块，导致 Codex 默认回到装饰资产路线，而不是验证 vlog 导演能力。
- policy_update_scope: `project_fact_files_only`
- file_change_scope: `mechanism_docs_only`
- video_generation: 未执行
- remotion_edit: 未执行
- render: 未执行
- external_api_call: 未执行
- runtime_assets_committed: 未执行
- do_not_claim:
  - 不得声明正片机制已验证
  - 不得声明视频已修好
  - 不得声明发布片已完成
  - 不得声明 Codex 已具备完整视频导演能力
  - 不得声明 BGM beat_map 能力已验证
  - 不得声明 BGM 情绪驱动调色能力已验证

已确认：本文件是 `video_capability_lab` 中 vlog / odd 正片候选的项目事实闸门，不是 render 报告、不是 Remotion 修改说明、不是发布批准记录。

已确认：本轮只更新项目机制，不生成视频、不 render、不调用 API、不修改 Remotion、不提交 runtime assets。

已确认：用户本轮 P0 规则覆盖旧口径。vlog / odd 默认正片候选主线从“字幕 / 贴纸 / 字牌 / 视觉标点默认必需”改为“BGM 情绪驱动剪辑 + 精细音乐卡点 + 音乐情绪镜头选择 + vlog 叙事结构 + BGM 情绪调色”。

待验证：本机制仍需下一轮真实验证候选片和用户审片后，才能判断执行效果是否成立。

## B. definition_of_full_video_candidate（正片候选定义）

用户说以下词时，默认属于 vlog / odd 正片候选任务：

- 正片
- 成片
- 候选片
- 完整视频
- 最终视频
- 我只想看正片
- 直接出片
- 出一个完整视频
- 做一个能看的 vlog / odd 版本

默认含义：

```text
full_video_candidate =
project guard
+ input inventory
+ reference/style anchor
+ material selection
+ material quality check
+ BGM/audio style
+ BGM mood analysis
+ refined beat map
+ music emotion shot plan
+ material base color normalization
+ BGM mood driven color grade
+ sequence structure
+ pacing and rhythm
+ motion/effects/transitions
+ composition/crop
+ subject visibility guard
+ audio mix
+ export validation
+ review pack/machine report
+ failure routing
+ optional user requested captions/text/stickers/font cards/visual punctuation/image assets
```

定义规则：

1. 正片候选不是 `publish-ready`，也不是用户已批准发布。
2. vlog / odd 正片候选默认验证 Codex 的视频导演能力：音乐、镜头、颜色、叙事和节奏。
3. 素材选择和镜头顺序必须服务叙事，不得只是素材平铺。
4. 音乐卡点不是只按 `beat_map` 机械切镜头，必须结合节奏、能量、情绪段落和起伏点判断每段应该出现什么镜头。
5. 调色不得只是建议；`color_grade_profile` 必须被 Remotion / FFmpeg / 剪辑脚本真实读取并影响最终画面。
6. 字幕、贴纸、字牌、视觉反应字、视觉标点和 Alibaba image asset generation 默认不是 vlog / odd 主线必需模块。
7. Codex 不得因为没有字幕 / 贴纸 / 字牌 / 视觉标点而 blocked，除非用户本轮明确要求这些模块但没有执行。
8. `我只想看正片` 只表示用户不想先看中间方案包，不表示 Codex 可以省略内部音乐、镜头、叙事、调色、导出和审片自检流程。

## C. route_override_for_vlog_odd（vlog / odd 默认路线覆盖规则）

已确认：旧系统泛规则中“正片默认包含字幕 / 贴纸 / 视觉标点”的口径，对本项目 vlog / odd 默认正片候选已被本轮 P0 用户规则降级。

已确认：历史贴纸 / 字幕路线可以作为以下用途保留：

1. 历史说明。
2. 用户明确要求时启用的可选模块。
3. 审片反馈指出确实需要文字或视觉反应时的后续修正路线。
4. 非 vlog / odd 或其他未来项目路线的待重判参考。

不得继续作为 vlog / odd 默认出片主线。

## D. default_required_modules（默认主模块）

vlog / odd 正片候选默认检查以下 20 个主模块。每个模块都必须进入 `full_video_candidate_completion_matrix（正片候选完整性矩阵）`。除非用户明确声明本轮是 `partial_probe`、只做机制、或明确跳过某个主模块，否则不得省略。

| module | default_status | evidence_required | blocked_if_missing | failure_route |
|---|---|---|---|---|
| `project_guard` | `required_default_module` | `pwd`、repo root、branch、remote、dirty check。 | `blocked_wrong_workspace_or_remote` | 回到工作区守卫。 |
| `input_inventory` | `required_default_module` | 素材、BGM、参考、运行边界清单。 | `blocked_required_input_inventory_missing` | 回到输入清单。 |
| `reference_and_style_anchor` | `required_default_module` | 参考规则或风格锚点、copy risk、审美边界。 | `blocked_required_reference_or_style_anchor_missing` | 回到参考 / 风格锚点补齐。 |
| `material_selection` | `required_default_module` | 素材池、选用素材、弃用素材、镜头功能和风险。 | `blocked_required_material_selection_missing` | 回到素材选择。 |
| `material_quality_check` | `required_default_module` | 分辨率、时长、可解码、主体可见、裁切风险。 | `blocked_required_material_quality_check_missing` | 回到素材质量检查。 |
| `BGM_style_and_audio` | `required_default_module` | BGM 路径、时长、可读性、风格卡、情绪 / 段落证据。 | `blocked_required_bgm_missing` | 回到 BGM 输入和风格判断。 |
| `BGM_mood_analysis` | `required_default_module` | `mood_tag`、`confidence_score`、`reason_signals`、`fallback_used`。 | `blocked_bgm_mood_analysis_missing` | 回到 `71` 的 BGM 情绪判断。 |
| `refined_beat_map` | `required_default_module` | 节奏点、强弱拍、能量起伏、段落边界、呼吸点。 | `blocked_refined_beat_map_missing` | 回到 BGM 节奏解析。 |
| `music_emotion_shot_plan` | `required_default_module` | 每个镜头对应的音乐情绪、节奏点、能量变化或段落功能。 | `blocked_music_emotion_shot_plan_missing` | 回到音乐情绪镜头计划。 |
| `material_base_color_normalization` | `required_default_module` | 曝光、白平衡、素材之间颜色统一策略。 | `blocked_material_base_color_normalization_missing` | 回到素材基础颜色统一。 |
| `BGM_mood_driven_color_grade` | `required_default_module` | `color_grade_profile`、`profile_read_by_pipeline`、主体可见性保护。 | `blocked_bgm_mood_color_grade_missing` | 回到 `71 / 72` 的 BGM 情绪调色链路。 |
| `sequence_structure` | `required_default_module` | 开场抓人、氛围建立、动作推进、情绪 / 节奏变化、收束。 | `blocked_required_sequence_structure_missing` | 回到 vlog 叙事结构。 |
| `pacing_and_rhythm` | `required_default_module` | 镜头时长、节奏段落、卡点 / 反卡点、呼吸点、动作 / BGM 关系。 | `blocked_required_pacing_or_rhythm_missing` | 回到节奏与卡点计划。 |
| `motion_effects_and_transitions` | `required_default_module` | 转场、动效、入出场、镜头衔接和风险说明。 | `blocked_required_motion_effect_or_transition_missing` | 回到动效 / 转场计划。 |
| `composition_and_crop` | `required_default_module` | 竖屏 / 横屏、裁切、主体 safe area、构图意图。 | `blocked_required_composition_or_crop_missing` | 回到构图 / 裁切。 |
| `subject_visibility_guard` | `required_default_module` | 主体可见、关键动作可读、调色 / 裁切不压主体。 | `blocked_subject_visibility_guard_missing` | 回到主体可见性保护。 |
| `audio_mix` | `required_default_module` | 音量、混音、淡入淡出、原声保留 / 移除、可解码证据。 | `blocked_required_audio_mix_missing` | 回到 BGM / audio mix layer。 |
| `export_and_technical_validation` | `required_default_module` | 输出路径、时长、分辨率、fps、codec、audio、decodable。 | `blocked_required_export_validation_missing` | 回到 export / ffprobe / decode check。 |
| `review_pack_and_machine_report` | `required_default_module` | contact sheet、关键帧、审片指南、机器自检、产物路径。 | `blocked_required_review_pack_missing` | 回到 review pack 和 machine report。 |
| `failure_feedback_routing` | `required_default_module` | 失败类型、route_back_to、required_fix、forbidden_response。 | `blocked_required_failure_routing_missing` | 回到本文件、`71 / 72` 和相关机制。 |

## E. optional_user_requested_modules（用户要求才执行模块）

以下模块默认降级为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`。只有用户本轮明确要求时，才升级为 `required_this_round`。

| module | default_status | upgrade_to_required_when | must_not_block_when |
|---|---|---|---|
| `captions_or_text_layer` | `optional_user_requested_module` | 用户明确说“加字幕 / 加文字 / 加标题 / 加文本层 / 需要口播字幕”。 | 用户没有明确要求字幕或文本层。 |
| `stickers_or_visual_punctuation` | `optional_user_requested_module` | 用户明确说“加贴纸 / 加视觉标点 / 加反应贴 / 需要贴纸语言”。 | 用户没有明确要求贴纸或视觉标点。 |
| `font_card` | `optional_user_requested_module` | 用户明确说“加字牌 / 加字体牌 / 做关键字牌”。 | 用户没有明确要求字牌。 |
| `visual_reaction_word` | `optional_user_requested_module` | 用户明确说“加视觉反应字 / 拟声字 / 反应词”。 | 用户没有明确要求视觉反应字。 |
| `visual_punctuation` | `optional_user_requested_module` | 用户明确说“加视觉标点 / 反应符号 / 情绪标点”。 | 用户没有明确要求视觉标点。 |
| `Alibaba image asset generation` | `optional_user_requested_module` | 用户明确要求走阿里图像生成资产，且允许 API。 | 用户没有明确要求阿里图像资产或本轮禁止 API。 |

硬规则：

1. `captions_or_text_layer.status` 默认必须为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`。
2. `stickers_or_visual_punctuation.status` 默认必须为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`。
3. 只有用户明确要求时，才可把它们升级为 `required_this_round`。
4. Codex 不得因为没有字幕 / 贴纸而 blocked，除非用户本轮明确要求字幕 / 贴纸但没有执行。
5. 不得再使用“prompt 没写贴纸所以缺项”“没做贴纸就 blocked”“Codex 默认进入阿里图像资产路线”的旧失败逻辑。

## F. BGM_and_story_director_rules（BGM 与叙事导演规则）

### BGM_mood_analysis

Codex 必须根据 BGM 的节奏、能量、情绪段落和声音质感输出：

- `mood_tag`
- `confidence_score`
- `reason_signals`
- `fallback_used`

低置信度时默认走 `fallback_neutral_unify`，不默认回问用户。

### refined_beat_map

`refined_beat_map` 必须包含：

1. 强拍 / 弱拍。
2. 能量上升点。
3. 能量下降点。
4. 情绪段落边界。
5. 适合切镜的点。
6. 适合保留呼吸的点。
7. 不适合机械切镜的点。

### music_emotion_shot_plan

每个镜头必须说明：

- 对应的音乐情绪。
- 对应的节奏点或段落。
- 对应的能量变化。
- 在 vlog 叙事中的功能。
- 为什么此处选这个素材，而不是按素材顺序平铺。

### sequence_structure

默认 vlog 叙事结构为：

1. 开场抓人。
2. 氛围建立。
3. 动作推进。
4. 情绪 / 节奏变化。
5. 收束。

## G. color_grade_pipeline_rules（调色链路规则）

`BGM_mood_driven_color_grade` 不得只是调色建议。

硬验收：

```yaml
profile_read_by_pipeline:
  required: true_for_full_video_candidate
  accepted_readers:
    - Remotion composition data
    - FFmpeg filter config
    - Python edit runner
    - machine_report consumed by export pipeline
  blocked_if_false: blocked_color_grade_profile_not_read_by_pipeline
```

如果 `profile_read_by_pipeline=false`，必须写：

```text
blocked_color_grade_profile_not_read_by_pipeline
```

不得写 `done`、`completed`、`BGM_mood_driven_color_grade_verified` 或 `full_video_candidate_pipeline_verified`。

## H. full_video_candidate_completion_matrix（正片候选完整性矩阵）

以后每次 vlog / odd 正片候选报告必须包含以下矩阵：

| module | status | evidence | skipped_reason | user_explicitly_requested | failure_route |
|---|---|---|---|---|---|
| `project_guard` |  |  |  |  |  |
| `input_inventory` |  |  |  |  |  |
| `reference_and_style_anchor` |  |  |  |  |  |
| `material_selection` |  |  |  |  |  |
| `material_quality_check` |  |  |  |  |  |
| `BGM_style_and_audio` |  |  |  |  |  |
| `BGM_mood_analysis` |  |  |  |  |  |
| `refined_beat_map` |  |  |  |  |  |
| `music_emotion_shot_plan` |  |  |  |  |  |
| `material_base_color_normalization` |  |  |  |  |  |
| `BGM_mood_driven_color_grade` |  |  |  |  |  |
| `sequence_structure` |  |  |  |  |  |
| `pacing_and_rhythm` |  |  |  |  |  |
| `motion_effects_and_transitions` |  |  |  |  |  |
| `composition_and_crop` |  |  |  |  |  |
| `subject_visibility_guard` |  |  |  |  |  |
| `optional_user_requested_captions_or_text_layer` |  |  |  |  |  |
| `optional_user_requested_stickers_or_visual_punctuation` |  |  |  |  |  |
| `audio_mix` |  |  |  |  |  |
| `export_and_technical_validation` |  |  |  |  |  |
| `review_pack_and_machine_report` |  |  |  |  |  |
| `failure_feedback_routing` |  |  |  |  |  |

主模块状态只允许：

- `included`
- `included_partial`
- `missing_blocked`
- `fallback_used_with_reason`
- `skipped_by_user_explicit_request`
- `not_applicable_with_reason`

可选模块状态只允许：

- `optional_user_requested_module`
- `skipped_by_default_unless_user_requested`
- `required_this_round`
- `included`
- `missing_blocked_when_user_requested`

禁止状态：

- `silently_omitted`
- `not_in_prompt_so_skipped`
- `missing_blocked_because_no_sticker`
- `missing_blocked_because_no_caption`

## I. blocked_if_required_module_omitted（必需模块缺失阻断）

默认主模块缺失时，必须使用具体阻断码：

1. `blocked_required_input_inventory_missing`
2. `blocked_required_bgm_missing`
3. `blocked_bgm_mood_analysis_missing`
4. `blocked_refined_beat_map_missing`
5. `blocked_music_emotion_shot_plan_missing`
6. `blocked_material_base_color_normalization_missing`
7. `blocked_bgm_mood_color_grade_missing`
8. `blocked_color_grade_profile_not_read_by_pipeline`
9. `blocked_required_sequence_structure_missing`
10. `blocked_required_pacing_or_rhythm_missing`
11. `blocked_subject_visibility_guard_missing`
12. `blocked_required_review_pack_missing`
13. `blocked_required_failure_routing_missing`

可选模块只有在用户明确要求后缺失，才允许使用：

1. `blocked_user_requested_caption_or_text_missing`
2. `blocked_user_requested_sticker_or_visual_punctuation_missing`
3. `blocked_user_requested_font_card_missing`
4. `blocked_user_requested_visual_reaction_word_missing`
5. `blocked_user_requested_alibaba_image_asset_generation_missing`

特别规则：

如果用户没有明确要求字幕 / 贴纸 / 字牌 / 视觉标点，缺少这些模块不得写 `blocked_required_*_missing`。

## J. failure_feedback_routing（失败反馈路由）

| user_feedback | route_back_to | required_fix | forbidden_response |
|---|---|---|---|
| 用户反馈“剪辑像素材拼接” | `music_emotion_shot_plan + sequence_structure + pacing_and_rhythm` | 重做音乐情绪镜头计划、段落功能和镜头顺序。 | 只加字幕、贴纸或转场。 |
| 用户反馈“卡点粗糙 / 不贴音乐” | `refined_beat_map + music_emotion_shot_plan` | 重查节奏、能量、情绪段落和呼吸点。 | 只按固定间隔切镜头。 |
| 用户反馈“画面情绪和音乐不搭” | `BGM_mood_analysis + music_emotion_shot_plan + BGM_mood_driven_color_grade` | 重查 mood_tag、镜头情绪和调色映射。 | 随机套滤镜或只改字幕贴纸。 |
| 用户反馈“素材颜色乱” | `material_base_color_normalization` | 先做素材基础颜色统一，再做 BGM 情绪调色。 | 只在最后加滤镜。 |
| 用户反馈“调色没生效” | `profile_read_by_pipeline` | 检查 `color_grade_profile` 是否被 Remotion / FFmpeg / 剪辑脚本读取。 | 只展示配置文件。 |
| 用户明确要求“加字幕”但没有字幕 | `captions_or_text_layer` | 将字幕升级为 `required_this_round` 并补执行证据。 | 说默认路线不做字幕所以忽略用户要求。 |
| 用户明确要求“加贴纸 / 视觉标点”但没有执行 | `stickers_or_visual_punctuation` | 将贴纸 / 视觉标点升级为 `required_this_round` 并补执行证据。 | 说新默认路线不做贴纸所以忽略用户要求。 |
| 用户反馈“贴纸抢戏 / 破坏 vlog 感” | `optional_user_requested_stickers_or_visual_punctuation + composition` | 降低或移除用户要求的装饰层，回到音乐镜头叙事主线。 | 为了旧完整性强行保留贴纸。 |
| 用户反馈“当前视频不是本轮目标” | `project_goal_boundary` | 回到项目目标：沉淀可复用 vlog 导演能力，不围绕单条 18 秒 demo 反复修。 | 把当前 demo 修好写成项目目标完成。 |

## K. do_not_claim（禁止声明）

不得声明：

- `full video delivery mechanism verified`
- `publish-ready`
- `final approved`
- `video fixed`
- `vlog director capability verified`
- `BGM beat_map capability verified`
- `BGM_mood_driven_color_grade_verified`
- `completed when required director module missing`

本轮最终机制口径只能写：

```text
project_default_vlog_pipeline_policy_updated_pending_future_validation
```
