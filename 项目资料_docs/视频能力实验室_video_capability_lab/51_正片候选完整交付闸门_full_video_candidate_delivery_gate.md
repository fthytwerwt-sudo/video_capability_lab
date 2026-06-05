# 正片候选完整交付闸门

## A. status（状态）

- task_type: `full_video_candidate_delivery_gate_mechanism`
- mechanism_status: `full_video_candidate_delivery_gate_completed_pending_gpt_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- source_problem: 上一轮 `50` 输出了 BGM + 素材候选，但因 GPT prompt 未硬要求贴纸，导致正片候选缺少项目已确认贴纸模块。
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

已确认：本文件是正片类任务的完整交付闸门，不是 render 报告、不是 Remotion 修改说明、不是发布批准记录。

已确认：本轮只建立机制，不生成视频、不 render、不调用 API、不修改 Remotion、不提交 runtime assets。

待验证：本机制仍需 GPT / 用户回审，并在后续正片候选任务中按完整性矩阵执行后，才能判断机制是否真的有效。

## B. definition_of_full_video_candidate（正片候选定义）

用户说以下词时，默认都属于完整正片候选任务：

- 正片
- 成片
- 发布候选
- 最终视频
- 我只想看正片
- 直接出片
- 出一个完整视频
- 做一个能看的版本

默认含义：

```text
full_video_candidate = project guard + input inventory + reference/style anchor + material selection + material quality check + BGM/audio style + BGM mood analysis + material base color normalization + BGM mood driven color grade + edit structure + pacing + captions + stickers/visual punctuation + motion/effects + transitions + composition/crop + subject/caption readability guard + audio mix + export validation + review pack/machine report + failure routing
```

定义规则：

1. 正片候选不是 `publish-ready`，也不是用户已批准发布。
2. 正片候选必须包含项目当前已确认应出现的模块。
3. 如果某模块缺输入、缺能力或存在执行冲突，必须写 `blocked` 或显式标缺项，不得静默省略。
4. 不能因为 GPT prompt 没写到某一模块，就默认该模块不需要。
5. `我只想看正片` 只表示用户不想先看中间方案包，不表示 Codex 可以省略内部完整流程。

## C. partial_task_exception（局部任务例外）

只有用户明确说以下内容，才允许降级为局部任务：

- 只看 BGM
- 只看素材
- 只看贴纸
- 只看剪辑
- 不要贴纸
- 不要字幕
- 不要动效
- 只做机制
- 只做风格板
- 只做 probe
- 只做审计
- 不要生成视频

如果用户只是说“正片”，不允许解释成局部任务。

如果 GPT 或 Codex 需要缩小范围，必须在执行单或回报中明确写：

```text
this_is_partial_probe_not_full_video_candidate
```

并写明缺少哪些正片候选模块、为什么本轮不交付完整候选、下一轮如何回到完整候选。

## D. full_video_candidate_required_modules（正片候选必需模块）

正片候选默认检查以下 20 个模块。每个模块都必须进入 `full_video_candidate_completion_matrix（正片候选完整性矩阵）`。除非用户明确声明本轮是 `partial_probe` 或明确跳过某模块，否则不得省略。

| module | required_when | may_skip_only_if | evidence_required | blocked_if_missing | failure_route |
|---|---|---|---|---|---|
| `project_guard` | 所有正片候选。 | 不可省略。 | `pwd`、repo root、branch、remote、dirty check。 | `blocked_wrong_workspace_or_remote` | 回到工作区守卫。 |
| `input_inventory` | 所有正片候选。 | 不可省略。 | 素材、BGM、参考、文案、运行边界清单。 | `blocked_required_input_inventory_missing` | 回到输入清单。 |
| `reference_and_style_anchor` | 需要参考、风格或视觉语言迁移的正片候选。 | 用户明确无参考且给出替代风格锚点。 | 参考规则、风格锚点、copy risk。 | `blocked_required_reference_or_style_anchor_missing` | 回到 `54 / 55 / 56` 或风格锚点补齐。 |
| `material_selection` | 所有正片候选。 | 用户明确只看纯动效、纯字幕或无素材 probe。 | 素材池、选用素材、弃用素材、素材角色、风险。 | `blocked_required_material_selection_missing` | 回到素材清单、画面选择表、素材功能表。 |
| `material_quality_check` | 所有正片候选。 | 用户明确只做机制或纯文档。 | 分辨率、时长、可解码、主体可见、裁切风险。 | `blocked_required_material_quality_check_missing` | 回到素材质量检查。 |
| `BGM_style_and_audio` | 用户要求正片、成片、发布候选、最终视频，且项目使用 BGM / 音频驱动剪辑。 | 用户明确说无 BGM / 静音版本 / 只看画面结构。 | BGM 路径、时长、可读性、风格卡、情绪 / 段落证据、音频状态。 | `blocked_required_bgm_missing` | 回到 `47 / 49` 的 BGM 分析与 mood gate。 |
| `BGM_mood_analysis` | 所有含 BGM 或 BGM 候选的正片候选。 | 用户明确无 BGM 且允许 neutral fallback。 | `mood_tag`、`confidence_score`、`reason_signals`、`fallback_used`。 | `blocked_bgm_mood_analysis_missing` | 回到 `71` 的 BGM 情绪判断。 |
| `material_base_color_normalization` | 所有正片候选。 | 用户明确只做无调色局部 probe。 | 曝光、白平衡、素材之间颜色统一策略。 | `blocked_material_base_color_normalization_missing` | 回到素材基础颜色统一。 |
| `BGM_mood_driven_color_grade` | 所有正片候选。 | 用户明确跳过调色或本轮只做机制 / 无视频。 | `color_grade_profile`、`profile_read_by_pipeline`、可读性保护。 | `blocked_bgm_mood_color_grade_missing` | 回到 `71 / 72` 的 BGM 情绪调色链路。 |
| `sequence_structure` | 所有正片候选。 | 用户明确只看素材审计或局部 style probe。 | 片段顺序、段落功能、开头 / 中段 / 结尾理由。 | `blocked_required_sequence_structure_missing` | 回到 `sequence_candidate` 和 edit structure。 |
| `pacing_and_rhythm` | 所有带时间线的正片候选。 | 用户明确只看静态风格板或素材表。 | 节奏段落、镜头时长、呼吸点、动作 / BGM 关系。 | `blocked_required_pacing_or_rhythm_missing` | 回到 `47 / 49` 的 energy curve、section map 和 sequence。 |
| `captions_or_text_layer` | 正片需要信息传达、标题、字幕、口播或文本层时默认必需。 | 用户明确说不要字幕 / 不要文字层，或本轮是无字纯画面版本。 | 字幕 / 文本层清单、出现时段、与画面 / 贴纸关系。 | `blocked_required_caption_or_text_missing` | 回到 captions / text layer 设计。 |
| `stickers_or_visual_punctuation` | 项目已确认贴纸 / 视觉标点是该类视频的重要模块，且用户未明确排除。 | 用户明确说不要贴纸、只看无贴纸版本，或事件表判断全部 `sticker_needed=false` 且有证据。 | 读取 `54 / 55 / 56`，贴纸事件 / 风格方案 / start-mid-exit 或明确 no-sticker reason。 | `blocked_required_sticker_or_visual_punctuation_missing` | 回到 `54 / 55 / 56 / 59` 或新贴纸 probe。 |
| `motion_effects_and_transitions` | 所有带时间线的正片候选。 | 用户明确说只看原始粗剪、不要动效 / 转场。 | 转场、动效、入出场、镜头衔接和风险说明。 | `blocked_required_motion_effect_or_transition_missing` | 回到 edit structure、composition、motion signature。 |
| `composition_and_crop` | 所有正片候选。 | 用户明确只看纯数据表或机制。 | 竖屏 / 横屏、裁切、主体 safe area、字幕 / 贴纸避让。 | `blocked_required_composition_or_crop_missing` | 回到构图、裁切、frame review。 |
| `subject_and_caption_readability_guard` | 所有正片候选，尤其调色、字幕、贴纸或构图会影响可读性时。 | 不可省略。 | 主体可见、字幕可读、贴纸不遮挡主体。 | `blocked_subject_or_caption_readability_guard_missing` | 回到构图、字幕、调色可读性保护。 |
| `audio_mix` | 所有含 BGM、原声、音效或口播的正片候选。 | 用户明确静音或只看画面。 | 音量、混音、淡入淡出、原声保留 / 移除、可解码证据。 | `blocked_required_audio_mix_missing` | 回到 BGM / audio mix layer。 |
| `export_and_technical_validation` | 所有需要输出视频文件的正片候选。 | 用户明确只做机制、审计、风格板或局部 probe。 | 输出路径、时长、分辨率、fps、codec、audio、decodable。 | `blocked_required_export_validation_missing` | 回到 export / ffprobe / decode check。 |
| `review_pack_and_machine_report` | 所有正片候选。 | 用户明确只要本地视频且不要审片包，但仍需写缺失原因。 | contact sheet、关键帧、审片指南、机器自检、产物路径。 | `blocked_required_review_pack_missing` | 回到 review pack 和 machine report 生成规则。 |
| `failure_feedback_routing` | 所有正片候选。 | 不可省略。 | 失败类型、route_back_to、required_fix、forbidden_response。 | `blocked_required_failure_routing_missing` | 回到本文件、`71 / 72` 和 `47 / 49 / 54 / 55 / 56` 的失败路由。 |

## E. known_project_modules_current_state（当前项目已知模块状态）

已确认：BGM 机制已存在，主要入口为 `47_通用BGM风格驱动素材筛选机制_universal_bgm_style_driven_material_selection_system.md` 和 `49_BGM驱动素材筛选闭环补强_bgm_material_selection_feedback_loop_upgrade.md`。

已确认：贴纸视觉语言机制已存在，主要入口为 `44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md`。

已确认：用户已偏好过若干贴纸方向，相关小范围探针入口为 `45_贴纸附属关系风格板探针_sticker_attachment_relation_style_sheet_probe.md` 和 `46_选定贴纸方案小范围Remotion探针_selected_sticker_options_small_scope_remotion_probe.md`。

已确认：当前 `50` 缺少贴纸 / 视觉标点模块，不得作为完整正片候选通过。

已确认：如果下一轮仍出正片，默认必须装载贴纸 / 视觉标点模块，除非用户明确说不要贴纸。

待验证：这些机制是否能稳定产生用户认可的正片候选，仍需多案例、正片完整矩阵和用户审片验证。

## F. GPT_prompt_generation_rule（GPT 生成 Codex prompt 的规则）

1. 如果用户说“正片 / 成片 / 发布候选 / 最终视频 / 直接出片”，GPT 必须默认生成完整交付 prompt。
2. GPT 不得替用户删除贴纸、字幕、动效、审片包等项目已确认重要模块。
3. GPT 如果想缩小范围，必须明确写 `this_is_partial_probe_not_full_video_candidate`。
4. GPT 必须在 prompt 中写入：
   - `full_video_candidate_required_modules`
   - `missing_component_check`
   - `blocked_if_required_module_omitted`
5. GPT 不得把“用户只想看最终视频”理解为“可以省略中间机制和项目模块”；这只代表中间方案不用先给用户看，但 Codex 内部仍必须跑完整流程。
6. GPT prompt 若缺少正片候选完整性矩阵、缺项阻断或用户明确排除字段，视为不完整执行单。

## G. Codex_execution_rule（Codex 执行规则）

Codex 以后执行正片类任务时必须：

1. 先读取本文件 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md`。
2. 执行 `full_video_candidate_required_modules`，默认使用本文件 D 节 20 个模块。
3. 如果 prompt 没写贴纸，但 `51` 判断贴纸是当前项目必需模块，Codex 必须纳入贴纸，或写 `blocked_required_sticker_or_visual_punctuation_missing`。
4. 如果 prompt 没写字幕 / 文本层，但正片需要文本层，Codex 必须纳入字幕 / 文本层，或写 `blocked_required_caption_or_text_missing`。
5. 如果 prompt 没写 BGM 情绪判断或自动调色，但任务是正片候选，Codex 必须纳入 `BGM_mood_analysis`、`material_base_color_normalization` 和 `BGM_mood_driven_color_grade`，或写对应 blocked。
6. 如果模块输入缺失，Codex 必须写 `missing`、`blocked` 和 `failure_route`，不得静默省略。
7. 只有用户明确排除了模块，才可以跳过。
8. 输出报告必须有 `full_video_candidate_completion_matrix（正片候选完整性矩阵）`。
9. 如果完成矩阵存在 `missing_blocked`，不得写 `completed`、`publish_ready`、`video_fixed` 或 `vlog_director_capability_verified`。
10. `color_grade_profile` 必须被 Remotion / FFmpeg / 剪辑脚本真实读取；只生成配置但未读取，不得写 done。

## H. full_video_candidate_completion_matrix（正片候选完整性矩阵）

以后每次正片候选报告必须包含以下矩阵：

| module | status | evidence | skipped_reason | user_explicitly_skipped | failure_route |
|---|---|---|---|---|---|
| `project_guard` |  |  |  |  |  |
| `input_inventory` |  |  |  |  |  |
| `reference_and_style_anchor` |  |  |  |  |  |
| `material_selection` |  |  |  |  |  |
| `material_quality_check` |  |  |  |  |  |
| `BGM_style_and_audio` |  |  |  |  |  |
| `BGM_mood_analysis` |  |  |  |  |  |
| `material_base_color_normalization` |  |  |  |  |  |
| `BGM_mood_driven_color_grade` |  |  |  |  |  |
| `sequence_structure` |  |  |  |  |  |
| `pacing_and_rhythm` |  |  |  |  |  |
| `captions_or_text_layer` |  |  |  |  |  |
| `stickers_or_visual_punctuation` |  |  |  |  |  |
| `motion_effects_and_transitions` |  |  |  |  |  |
| `composition_and_crop` |  |  |  |  |  |
| `subject_and_caption_readability_guard` |  |  |  |  |  |
| `audio_mix` |  |  |  |  |  |
| `export_and_technical_validation` |  |  |  |  |  |
| `review_pack_and_machine_report` |  |  |  |  |  |
| `failure_feedback_routing` |  |  |  |  |  |

状态只允许：

- `included`
- `included_partial`
- `missing_blocked`
- `skipped_by_user_explicit_request`
- `not_applicable_with_reason`

禁止状态：

- `silently_omitted`
- `not_in_prompt_so_skipped`

## I. blocked_if_required_module_omitted（必需模块缺失阻断）

正片候选缺少必需模块时，必须使用以下阻断码：

1. `blocked_required_bgm_missing`
2. `blocked_required_material_selection_missing`
3. `blocked_required_sequence_structure_missing`
4. `blocked_required_caption_or_text_missing`
5. `blocked_required_sticker_or_visual_punctuation_missing`
6. `blocked_bgm_mood_analysis_missing`
7. `blocked_material_base_color_normalization_missing`
8. `blocked_bgm_mood_color_grade_missing`
9. `blocked_color_grade_profile_not_read_by_pipeline`
10. `blocked_required_review_pack_missing`
11. `blocked_required_failure_routing_missing`

特别规则：

如果用户说正片，但视频缺少贴纸 / 视觉标点，且用户没有明确说不要贴纸，则不得写 `completed`，只能：

```text
blocked_required_sticker_or_visual_punctuation_missing
```

或者生成包含贴纸 / 视觉标点的候选。

## J. failure_feedback_routing（失败反馈路由）

| user_feedback | route_back_to | required_fix | forbidden_response |
|---|---|---|---|
| 用户反馈“没有贴纸” | `stickers_or_visual_punctuation` | 读取 `44 / 45 / 46`，补入已选贴纸方案或重新做贴纸 probe。 | 解释 prompt 没写所以没做。 |
| 用户反馈“只有素材和 BGM，不像正片” | `full_video_candidate_completion_matrix` | 补齐缺失模块，并把上版降级为局部候选或不完整候选。 | 把素材候选写成正片候选。 |
| 用户反馈“剪辑像素材拼接” | `sequence_structure + pacing_and_rhythm` | 回到 `47 / 49` 的 BGM-driven sequence、段落功能和反馈回写。 | 只加贴纸或转场。 |
| 用户反馈“贴纸影响剪辑” | `stickers_or_visual_punctuation + composition` | 降低贴纸数量、位置、尺寸、时长或避让，不是直接删除所有贴纸。 | 默认不要贴纸。 |
| 用户反馈“字幕 / 文字层缺失” | `captions_or_text_layer` | 添加或重建文本层，并检查与贴纸、画面、BGM 的关系。 | 说 prompt 没写字幕。 |
| 用户反馈“颜色和 BGM 情绪不搭” | `BGM_mood_analysis + BGM_mood_driven_color_grade` | 回到 `71`，重查 mood_tag、confidence_score 和 color_grade_profile。 | 随机套滤镜或要求用户每次先审调色。 |
| 用户反馈“素材颜色乱” | `material_base_color_normalization` | 先做素材基础颜色统一，再做 BGM 情绪调色。 | 只在最后加滤镜。 |
| 用户反馈“调色后字幕 / 主体看不清” | `subject_and_caption_readability_guard + color_grade_pipeline` | 调整 profile 并复查字幕可读性、主体曝光和贴纸融合。 | 把可读性问题推给用户审片前置。 |

## K. do_not_claim（禁止声明）

不得声明：

- `full video delivery mechanism verified`
- `publish-ready`
- `final approved`
- `video fixed`
- `vlog director capability verified`
- `completed when required module missing`

本轮最终口径只能写：

```text
full_video_candidate_delivery_gate_completed_pending_gpt_user_review
```
