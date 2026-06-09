# 检查标准与完成定义

## 工作范围检查

每轮执行前必须检查：

1. 当前目录是否在用户现有 `vlog、odd` 文件夹内部。
2. 当前 git 顶层是否为该文件夹内的 `video_capability_lab`。
3. remote 是否指向 `fthytwerwt-sudo/video_capability_lab`。
4. 是否没有在 `vlog、odd` 文件夹外创建目录或文件。
5. 是否没有在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab`。
6. 是否没有 push 到错误仓库。
7. 路径不明确、候选不唯一或 remote 不匹配时，是否已 blocked 而不是猜。

## 外部项目 AGENTS 审计检查

审计其他项目入口规则时必须检查：

1. 是否只读取被用户允许的源项目 `AGENTS.md`。
2. 是否误读用户明确禁止的项目。
3. 是否把源项目业务身份、当前任务、完成状态、素材路径、模型选择、业务路线或验收结果迁入本项目。
4. 是否只迁移通用协作机制。
5. 是否更新 GPT Project 上传包纪律。
6. 是否保持当前项目能力状态为 `待验证`。
7. 是否完成 commit、push 和 remote HEAD 验证。

## 项目骨架完整性检查

- `AGENTS.md` 存在。
- `项目资料_docs/系统协议_system/` 下系统机制文件存在，数量以 `脚本_scripts/sync_gpt_project_mechanism_pack.py` 的 `MECHANISM_FILES` 为准，当前为 11 个。
- `项目资料_docs/视频能力实验室_video_capability_lab/` 下项目事实入口存在。
- `codex_source/` 下 Codex 执行标准存在。
- `执行日志_codex_log/最新摘要_latest.md` 存在。
- `脚本_scripts/` 和 `tests/` 存在。

## GPT Project 上传包检查

- 上传包只包含 readme、manifest 和 `MECHANISM_FILES` 当前 11 个系统机制文件副本。
- 上传清单所有“是否允许放项目事实”均为 `否`。
- 不包含 `AGENTS.md`。
- 不包含执行日志。
- 不包含项目事实目录。
- 不包含视频、图片、音频、运行输出或 zip。

## Codex 执行文件检查

- `codex_source/00_codex_readme.md` 定义读顺序。
- `codex_source/01_execution_rules.md` 定义 push、状态、route_decision、implementation_design、validation、commit_push_status。
- Remotion / HyperFrames / BGM / reference / review_pack 边界均存在。

## implementation_design_gate_done_definition

本完成定义用于检查“实现设计层与六层需求确认机制同步”是否完成。

通过标准：

| check | pass |
|---|---|
| `six_layer_gate_updated` | 23 号机制内容已从五层升级为六层：目标层 / 机制层 / 实现设计层 / 流程层 / 判断标准层 / 反馈层。 |
| `implementation_design_layer_present` | 实现设计层定义首选路线、fallback、能力边界、probe 要求、Codex 自主范围、禁止猜测范围和 blocked 条件。 |
| `implementation_design_added_to_codex_prompt_template` | Codex 执行单固定结构在真实意图澄清后、Impact check 前加入 `Implementation design（实现设计层）`。 |
| `blocked_need_implementation_design_layer_defined` | 缺实现设计层、首选路线、fallback、能力边界或 probe 要求时必须输出 `blocked_need_implementation_design_layer`。 |
| `no_codex_core_route_guessing` | Codex 不得把 Execution steps 当成 Implementation design，不得自行决定核心技术路线后直接执行。 |
| `system_pack_synced` | 已运行 `python3 脚本_scripts/sync_gpt_project_mechanism_pack.py` 和 `python3 脚本_scripts/sync_gpt_project_mechanism_pack.py --check`，输出 `GPT Project mechanism pack OK`。 |
| `no_capability_overclaim` | 本轮机制同步不得声明视频已生成、render 已跑、API 已调用或视频能力已验证。 |

失败时必须写：

- `blocked_need_implementation_design_layer`
- `blocked_gpt_project_pack_sync_failed`
- `blocked_capability_overclaim`
- `local_only_not_completed`

不得把以下情况写成 completed：

1. 只把五层改名成六层，但没有定义实现设计层。
2. 只写目标和流程，没有首选实现路线、fallback、能力边界、probe 要求和 blocked 条件。
3. Codex 执行模板仍缺 `Implementation design（实现设计层）`。
4. GPT Project 上传包未刷新或 `--check` 未通过。
5. 本轮机制同步被写成 Remotion、HyperFrames、BGM、API、render 或正片候选能力验证成功。

## 文件命名检查

每轮完成前必须检查：

1. 本轮是否新建文件或目录。
2. 新建文件或目录是否符合 `中文说明_english_slug.ext` 或 `中文说明_english_slug/`。
3. 是否存在非约定场景下的纯英文文件名。
4. 如果使用工具固定英文名，是否在回报中说明原因。
5. 是否没有用模糊缩写、临时名、无语义名，例如 `test1.md`、`new_file.py`、`tmp.md`。

## 状态标记检查

必须出现并按证据强度使用：

- `已确认`
- `部分成立`
- `待验证`
- `推测`
- `通用建议`

## push 检查

完成必须满足：

- commit 已创建。
- push 已成功。
- `git ls-remote origin HEAD` 与本地 HEAD 一致。

## 旧项目事实污染检查

禁止把旧直播项目、旧电商测试、旧视频工厂正式运营任务、旧素材路径、旧模型选择或旧验收结论写成本项目事实。

## 能力 probe 状态检查

能力 probe 未验证不得写成已成立。能力地图中的初始状态必须全部是 `待验证`，不得出现 `已确认可用` 或 `已验证成立`。

## adaptive_color_grade_tool_execution_validation_done_definition

本完成定义用于检查 `adaptive_color_grade_tool_execution_validation` 是否完成。

通过标准：

| check | pass |
|---|---|
| `adaptive_profile_written` | `adaptive_color_grade_profile` 已写入可执行数据结构，并包含 `apply_scope=per_music_section`。 |
| `no_fixed_preset` | `fixed_preset_used=false` 且 `odd_used_as_fixed_preset=false`。 |
| `sections_present` | 至少存在按 BGM 段落定义的 `sections`，且每段有 time / frame range 和调色参数。 |
| `remotion_frame_to_section_selector` | Remotion composition 能按当前 frame 选择 active section。 |
| `section_profile_consumed` | active section 参数进入 CSS filter、氛围叠层、vignette 和 grain。 |
| `render_passed` | adaptive version 已成功 render。 |
| `review_pack_generated` | review_pack 包含 before / after contact sheet、representative frames、profile read report、machine_report 和 readable report。 |
| `machine_report_required_fields` | machine_report 包含 `adaptive_color_profile_read_by_pipeline=true`、`apply_scope=per_music_section`、`fixed_preset_used=false`、`odd_used_as_fixed_preset=false`、`render_status=passed`。 |
| `technical_validation_passed` | 输出视频可解码，分辨率 1080x1920，fps 30，有音频，时长接近 16 秒。 |
| `runtime_assets_not_committed` | `dist/` 和 `tmp/` 的视频、图片、JSON 不进入 Git stage / commit。 |
| `no_capability_overclaim` | 不得声明 `color_grade_verified`、`BGM_mood_driven_color_grade_verified` 或 `vlog_director_capability_verified`。 |
| `user_review_required` | 最终状态必须是等待用户审片，而不是发布或审美通过。 |

失败时必须写：

- `blocked_missing_current_candidate_files`
- `blocked_adaptive_profile_missing`
- `blocked_remotion_per_section_profile_failed`
- `blocked_render_failed`
- `blocked_review_pack_generation_failed`
- `blocked_fixed_color_preset_risk`
- `blocked_odd_used_as_fixed_preset`
- `blocked_runtime_asset_commit_risk`
- `local_only_not_completed`

不得把以下情况写成 completed：

1. 只写 profile 文件，但 Remotion 没有读取。
2. Remotion 仍然整片统一调色。
3. 使用固定 preset 或把 `odd` 当成固定 LUT。
4. render 成功但没有 before / after 对比证据。
5. runtime assets 被提交进 Git。
6. 没有 push 或没有 remote HEAD 验证。

## vlog_default_output_pipeline_done_definition

本完成定义用于检查 `project_default_vlog_pipeline_policy_update` 是否完成。

通过标准：

| check | pass |
|---|---|
| `captions_downgraded_by_default` | `captions_or_text_layer` 默认状态为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`。 |
| `stickers_downgraded_by_default` | `stickers_or_visual_punctuation` 默认状态为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`。 |
| `no_caption_sticker_default_block` | 用户没有明确要求字幕 / 贴纸时，缺字幕 / 缺贴纸不得 blocked。 |
| `bgm_mood_analysis_required` | `BGM_mood_analysis` 是 vlog / odd 默认主模块。 |
| `refined_beat_map_required` | `refined_beat_map` 是 vlog / odd 默认主模块。 |
| `music_emotion_shot_plan_required` | `music_emotion_shot_plan` 是 vlog / odd 默认主模块。 |
| `sequence_structure_required` | `sequence_structure` 使用“开场抓人 → 氛围建立 → 动作推进 → 情绪 / 节奏变化 → 收束”。 |
| `bgm_mood_driven_color_grade_required` | `BGM_mood_driven_color_grade` 是默认主模块。 |
| `profile_read_by_pipeline_hard_gate` | `color_grade_profile` 必须被 Remotion / FFmpeg / 剪辑脚本读取；`profile_read_by_pipeline=false` 必须 blocked。 |
| `no_capability_overclaim` | 机制更新不得声明能力已验证、视频已修好或发布可用。 |
| `future_user_review_required` | 下一轮验证片仍需用户审片。 |

失败时必须写：

- `blocked_caption_sticker_policy_not_downgraded`
- `blocked_bgm_mood_analysis_missing_from_default_pipeline`
- `blocked_refined_beat_map_missing_from_default_pipeline`
- `blocked_music_emotion_shot_plan_missing_from_default_pipeline`
- `blocked_sequence_structure_missing_from_default_pipeline`
- `blocked_bgm_mood_color_grade_missing`
- `blocked_color_grade_profile_not_read_by_pipeline`
- `blocked_capability_overclaim`

不得把以下情况写成 completed：

1. 51 / 72 仍把 vlog / odd 字幕或贴纸写成默认必需模块。
2. 只写 BGM 调色建议，没有要求流程真实读取 `color_grade_profile`。
3. 只写 `beat_map`，没有音乐情绪镜头计划。
4. 只写素材顺序，没有 vlog 叙事结构。
5. 机制更新写成 `vlog_director_capability_verified`。
6. 本轮生成了视频、render、调用外部 API 或提交 runtime assets。

历史规则说明：

- 旧贴纸 / 字幕机制可以保留为历史说明和用户明确要求时的可选模块。
- 旧“贴纸 / 字幕默认必需”口径对 vlog / odd 默认路线已被本轮项目事实降权或替换。
- 若系统泛规则仍有旧描述，后续可单独做系统层 cleanup；本轮项目默认路线以 `51 / 72 / 03 / latest` 为准。

## full_video_candidate_done_definition

正片候选完成前必须检查 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md`。

对 vlog / odd 默认路线，必须优先执行 `vlog_default_output_pipeline_done_definition`。字幕 / 贴纸 / 字牌 / 视觉反应字 / 视觉标点只有在用户明确要求时才作为 `required_this_round` 检查；未明确要求时不得因为缺这些可选模块 blocked。

每个正片候选报告必须包含：

- `full_video_candidate_completion_matrix`
- `blocked_if_required_module_omitted`
- `failure_feedback_routing`
- 用户明确跳过模块记录
- 禁止声明清单

如果任一必需模块被静默省略，不得写 `completed`。

禁止使用以下缺项理由：

- `silently_omitted`
- `not_in_prompt_so_skipped`
- prompt 没写所以没做
- Codex 自行判断不需要

缺项时必须写：

- `missing_blocked`
- 对应 `blocked_required_*_missing`
- `route_back_to`
- `required_fix`

正片候选完整性检查通过，也不等于 `publish-ready`、`video_fixed` 或 `vlog_director_capability_verified`；仍需用户审片。

## full_video_candidate_pipeline_bgm_color_done_definition

涉及正片、成片、候选片、完整视频、直接出片时，必须检查：

1. 是否进入 full_video_candidate_pipeline。
2. 是否读取 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md`。
3. 是否读取 `71_BGM情绪驱动自动调色机制_bgm_mood_driven_auto_color_grade_protocol.md`。
4. 是否读取 `72_正片完整流程与BGM调色总闸门_full_video_pipeline_bgm_color_gate.md`。
5. 是否输出 full_video_candidate_completion_matrix。
6. 是否检查 full_video_candidate_required_modules。
7. 是否包含 BGM_mood_analysis。
8. 是否包含 refined_beat_map。
9. 是否包含 music_emotion_shot_plan。
10. 是否包含 sequence_structure。
11. 是否包含 BGM_mood_driven_color_grade。
12. 是否包含 material_base_color_normalization。
13. 是否包含 color_grade_profile。
14. 是否确认 color_grade_profile 被流程读取。
15. 是否包含 subject_visibility_guard。
16. 是否没有把字幕 / 贴纸当作未请求时的默认阻断项。
17. 是否包含 failure_feedback_routing。
18. 是否没有把人审作为每次调色前置阻断。
19. 是否没有声明能力已验证。
20. 是否未提交 runtime assets。
21. 是否 commit、push、remote HEAD verified。

通过标准：

| check | pass |
|---|---|
| full_pipeline_gate_used | 正片任务进入完整流程，而不是只执行用户提到的局部模块。 |
| required_modules_complete | 所有必需模块都有 done / blocked / fallback_used / skipped_by_user 状态。 |
| bgm_mood_to_color_grade_integrated | BGM 情绪判断生成 color_grade_profile，并进入流程。 |
| refined_beat_map_present | 精细卡点图包含节奏点、能量起伏、段落边界和呼吸点。 |
| music_emotion_shot_plan_present | 每个镜头说明音乐情绪、节奏点、能量变化和段落功能。 |
| sequence_structure_present | vlog 叙事结构服务“开场抓人 → 氛围建立 → 动作推进 → 情绪 / 节奏变化 → 收束”。 |
| material_base_normalization_first | 先统一素材基础颜色，再做音乐情绪调色。 |
| profile_read_by_pipeline | color_grade_profile 被 Remotion / FFmpeg / 剪辑脚本读取。 |
| caption_sticker_optional_by_default | 用户未明确要求时，字幕 / 贴纸缺失不触发默认阻断。 |
| no_pre_review_block | 不要求用户每次先审核调色。 |
| failure_route_present | 失败能回到具体模块层，而不是随机改 prompt。 |
| no_capability_overclaim | 不把机制存在写成能力已验证。 |

失败时必须写：

- `blocked_required_module_missing`
- `blocked_refined_beat_map_missing`
- `blocked_music_emotion_shot_plan_missing`
- `blocked_bgm_mood_color_grade_missing`
- `blocked_color_grade_profile_not_read_by_pipeline`
- `blocked_completion_matrix_missing`
- `blocked_failure_routing_missing`
- `blocked_runtime_assets_staged`
- `blocked_push_failed`

不得把以下情况写成 completed：

1. 只新增调色文档，没有接入正片完整流程。
2. 只生成 color_grade_profile，但没有流程读取。
3. 只执行用户提到的模块，跳过其他正片必需模块。
4. 只输出 before / after 审片包，没有自动调色配置。
5. 调色失败后要求用户每次判断。
6. 没有 failure_feedback_routing。
7. 本地完成但未 push。
8. push 后未验证 remote HEAD。

## reference_visual_language_migration_done_definition

涉及参考视频解析、对标审计、字幕、贴纸、视觉标点、风格判断、样片回审或 vlog / odd 正片候选前，必须检查：

1. 是否读取 `54_解析资产全量索引_analysis_asset_inventory.md`。
2. 是否读取 `55_参考视觉语言迁移库_reference_visual_language_migration_library.md`。
3. 是否读取 `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md`。
4. 是否写明 `analysis_asset_ids`。
5. 是否写明 `reference_rule_link`。
6. 是否写明 `migration_library_used`。
7. 是否写明 `decision_router_used`。
8. 是否写明字幕 / 贴纸 / 视觉标点的选择理由。
9. 是否写明 `caption_sticker_relation`。
10. 是否写明 `copy_risk_check`。
11. 是否写明 `template_fallback`。
12. 是否写明失败回退层。

通过标准：

| check | pass |
|---|---|
| `inventory_used` | 后续任务能指出来源资产 ID，而不是只说“参考之前”。 |
| `library_used` | 能引用贴纸类型、附属关系、形状逻辑、字幕视觉类型或字幕贴纸关系。 |
| `router_used` | 每个镜头 / 事件经过 caption、sticker、visual punctuation、neither 的路由判断。 |
| `source_traceability` | 每个视觉语言决策都有 `reference_rule_link`。 |
| `template_fallback_gate` | 若只能套模板，必须标 `template_fallback=true`，不得进入成片候选。 |
| `copy_boundary` | 只迁移功能、关系和规则，不复制第三方资产、平台 UI、品牌、原字体、原文案。 |

失败时必须写：

- `blocked_reference_visual_language_preflight_missing`
- `blocked_decision_router_not_used`
- `blocked_template_fallback`
- `blocked_copy_risk`
- `route_back_to: 54/55/56`

不得把以下情况写成通过：

- 只有字幕数量增加，但没有 caption type、锚点、位置、层级和来源规则。
- 只有贴纸数量增加，但没有 attachment relation、shape grammar、stroke/material 和来源规则。
- 只做 Remotion 组件或 SVG 形状展示，没有视频事件和参考规则来源。
- 只说“按参考风格”，但没有 `analysis_asset_ids` 和 `reference_rule_link`。
- 技术 probe、静态风格板或局部 render 成功，就写成视觉语言已经通过。

本完成定义只证明迁移库和路由器文件已建立；后续真实任务仍需调用、输出审片包、接受用户 / GPT 回审。

## visual_preprocessing_toolchain_done_definition

涉及字幕、贴纸、视觉标点、画面锚点、运动跟踪、遮罩计划、OpenCV、MediaPipe 或 SAM2 接入时，必须检查：

1. 是否读取 `61_视觉前处理数据协议_visual_preprocessing_data_protocol.md`。
2. 是否安装或确认 Remotion plugin layer，并以 `package.json` / `package-lock.json` / `node_modules` / `npm ls` 为准。
3. 是否保持 Remotion 插件版本与当前 `remotion` 版本一致；需要升级全家桶时必须 blocked。
4. 是否生成或读取 `anchor_map.json`、`motion_track.json`、`mask_plan.json` 和 `visual_scorecard.json`。
5. 是否把 runtime JSON、预览帧、视频、图片、音频、抽帧、模型权重留在 ignored `tmp/` / `dist/`，不提交 Git。
6. 是否有 Remotion 2-4 秒 probe 读取视觉前处理 sample 或 runtime 数据。
7. 是否用 `@remotion/paths` 证明路径处理，用 `@remotion/motion-blur` 证明拖影 / 动态模糊入口，用 `@remotion/effects` 证明材质效果入口。
8. 是否运行 OpenCV 最小 probe，并把结果写成边缘 / 光流 / 特征点信号，而不是稳定视觉理解。
9. 是否运行 MediaPipe 最小 probe；检测不到关键点时必须输出 `no_landmark_detected`，不得伪造。
10. 是否只建立 SAM2 adapter 与环境探测；无权重时必须写 `interface_ready_weights_missing`，不得声明 segmentation verified。
11. 是否生成审片包并等待用户 / GPT 回审。

通过标准：

| check | pass |
|---|---|
| `dependency_source_of_truth` | 依赖以项目 `package.json` / lockfile / `npm ls` 为准，不以 Codex 插件环境为准。 |
| `remotion_plugin_layer_ready` | 三个 Remotion 插件 exact version 安装、import smoke test 和 Remotion probe render 均通过。 |
| `visual_protocol_ready` | `61` 已定义四类 JSON 的用途、字段和 schema。 |
| `opencv_probe_ready` | OpenCV 能输出 edge preview、motion / feature track JSON 和 probe report。 |
| `mediapipe_probe_ready_or_empty` | MediaPipe 输出关键点 JSON 或明确 `no_landmark_detected`。 |
| `sam2_interface_ready` | SAM2 adapter 和 env probe 存在；未下载权重时状态为 `interface_ready_weights_missing`。 |
| `review_pack_ready` | 审片包存在，且只作为工具链回审输入。 |
| `runtime_assets_not_committed` | `tmp/`、`dist/`、视频、图片、音频、抽帧、模型权重未提交 Git。 |

失败时必须写：

- `blocked_wrong_workspace_or_remote`
- `blocked_remotion_plugin_version_not_available`
- `blocked_need_user_confirm_remotion_family_upgrade`
- `blocked_python_env_not_safe`
- `blocked_opencv_install_failed`
- `blocked_mediapipe_python_version_unsupported`
- `blocked_sam2_requires_weights_or_heavy_cuda_dependency`
- `blocked_remotion_render_failed`
- `blocked_review_pack_generation_failed`
- `blocked_push_failed`

不得把以下情况写成通过：

- npm 包安装成功，就声明视频能力已验证。
- OpenCV / MediaPipe 导入成功，就声明视觉理解能力稳定成立。
- SAM2 adapter 存在但没有权重，就声明分割能力已验证。
- Remotion 2-4 秒 probe render 成功，就声明 `publish-ready`、`video_fixed`、`vlog_director_capability_verified`。

## visual_preprocessing_driven_8s_candidate_done_definition

涉及“8 秒视觉前处理驱动字幕贴纸候选”时，必须同时检查 `54 / 55 / 56 / 59 / 61 / 62`，并满足以下条件：

1. 是否明确本轮是 `8s_candidate`，不是 2-4 秒微段 probe，不是 4 秒 probe，也不是完整 18 秒正片。
2. 是否真实生成或读取 `anchor_map.json`、`motion_track.json`、`mask_plan.json` 和 `visual_scorecard.json`。
3. 是否至少使用 2 个可回审画面锚点、1 条运动方向 / 运动轨迹和 1 个遮罩计划。
4. 是否在 Remotion data 或 composition 中把字幕 / 贴纸事件绑定到 `anchor_from`、`motion_from` 或 `mask_from`。
5. 是否用 `@remotion/paths` 处理路径，用 `@remotion/motion-blur` 处理拖影 / 动态模糊入口，用 `@remotion/effects` 处理材质融合入口。
6. 是否渲染 8 秒本地视频，并通过 `ffprobe` 元数据和 `ffmpeg` decode check。
7. 是否生成审片包，包含关键帧、contact sheet、四张视觉前处理 runtime JSON 和证据 map。
8. 是否保持 `template_fallback=false`，并写明 `analysis_asset_ids` / `reference_rule_links` 或对应来源机制。
9. 是否明确 `visual_scorecard.review_status=pending_user_review`。
10. 是否把 `tmp/`、`dist/`、视频、图片、音频、抽帧、runtime JSON 和模型权重排除在 Git 提交之外。

通过标准：

| check | pass |
|---|---|
| `eight_second_scope_locked` | 报告和 latest 均写明 8 秒候选，不冒充 18 秒正片。 |
| `visual_preprocessing_data_used` | 四张 runtime 表被生成 / 读取，并进入 Remotion 字幕 / 贴纸计划。 |
| `plugin_layer_applied` | 三个 Remotion 插件在 8 秒 composition 中有实际 API 使用。 |
| `review_pack_ready` | 审片包含关键帧、contact sheet、manifest、evidence map 和 runtime JSON 副本。 |
| `technical_validation_passed` | render、composition check、ffprobe 和 ffmpeg decode 均通过。 |
| `claim_boundary_kept` | 仍为 `pending_user_review`，不声明发布、修好、能力验证或真实遮挡通过。 |

失败时必须写：

- `blocked_visual_preprocessing_runtime_json_missing`
- `blocked_8s_candidate_render_failed`
- `blocked_8s_candidate_metadata_check_failed`
- `blocked_8s_review_pack_generation_failed`
- `blocked_template_fallback_or_anchor_binding_missing`
- `route_back_to: 54/55/56/59/61/62`

不得把以下情况写成通过：

- 只读取 sample JSON，没有把数据绑定到字幕 / 贴纸 / 视觉标点。
- 只套旧 2-4 秒 probe，没有输出 8 秒候选。
- 只渲染成功，但没有审片包和 evidence map。
- `mask_plan.simulated_occlusion_only=true`，却声明真实遮挡通过。
- `anchor_confidence` 较低时，省略人工回审要求。

## caption_sticker_visual_review_loop_done_definition

涉及字幕、贴纸、视觉标点的回审问题时，尤其当用户反馈“总差一点”“像口号”“像组件”“不贴画面”“动效像参数动画”时，必须读取并执行：

`59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md`

每个修正任务必须检查：

1. 是否先看帧，再修字幕贴纸，而不是先改 Remotion 参数。
2. 是否输出 `frame_review_loop` 证据，包含 original / previous probe / new probe 的 start、mid、exit 或关键事件帧。
3. 是否完成 `visual_scorecard`，并覆盖 5 个问题：
   - `caption_relation_problem`
   - `sticker_generic_component_problem`
   - `anchor_declaration_problem`
   - `occlusion_material_problem`
   - `motion_event_problem`
4. 是否输出 `caption_sticker_fix_spec`，写清 caption 怎么改、sticker 怎么改、为什么更像动作事件反应。
5. 是否指出真实画面锚点，例如可见边缘、接触点、表面、遮挡边界、运动方向，而不是只写 x/y 坐标。
6. 是否说明材质、遮挡和动效如何降低浮层感。
7. 是否生成 2-4 秒微段和 before/after 或 before/v1/v2 审片包。
8. 是否保持 `template_fallback=false` 和 `copy_risk_check=passed_with_user_review_pending`。
9. 是否明确最终状态仍为 `pending_user_review`。

通过标准：

| check | pass |
|---|---|
| `frame_review_loop_used` | 修正依据来自已抽取帧的可见画面证据。 |
| `visual_scorecard_complete` | 5 个问题逐项打分并写明修正尝试。 |
| `fix_spec_complete` | caption / sticker / conflict / fallback 均有明确修正规格。 |
| `anchor_real` | 锚点指向画面中可被审片包验证的结构或事件。 |
| `not_quantity_patch` | 没有用增加贴纸数量、换颜色或换坐标替代修正。 |
| `micro_probe_gate` | 字幕贴纸没过 2-4 秒微段前，不直接扩到 18 秒全片。 |

失败时必须写：

- `blocked_caption_sticker_frame_review_missing`
- `blocked_visual_scorecard_missing`
- `blocked_caption_sticker_fix_spec_missing`
- `blocked_anchor_declaration_only`
- `blocked_template_or_coordinate_only_fix`
- `route_back_to: 54/55/56/59`

不得把以下情况写成通过：

- 字幕只变大、变粗或居中，但仍像口号。
- 贴纸只是通用 burst / tick / line 组件换坐标。
- 锚点只有固定坐标，没有帧级画面证据。
- 遮挡只靠 opacity、drop shadow 或颜色降低。
- 动效只调 spring / easing 参数，没有动作接触、受力或切镜依据。
- 技术 render 成功，就声明字幕贴纸审美通过。

本完成定义只证明“修正尝试已按机制执行并可供审片”，不证明 `publish-ready`、`video_fixed`、`full video candidate completed` 或 `vlog director capability verified`。
