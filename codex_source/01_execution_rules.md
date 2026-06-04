# Codex 执行规则

## vlog、odd 工作范围限制

本项目的本地仓库必须位于用户现有的 `vlog、odd` 文件夹内部。

已确认：当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。

Codex 不得在 `vlog、odd` 文件夹外执行本项目任务。

Codex 不得因为找不到旧路径，就在 `/Users/fan/Documents/` 下新建新的 `video_capability_lab`。

如果目标仓库不存在、路径不明确、存在多个候选、remote 不匹配，必须 blocked，不得猜。

## 工作范围与路径禁止规则

Codex 每轮执行前必须确认：

1. `pwd` 在用户现有的 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库内。
2. `git rev-parse --show-toplevel` 指向该 `video_capability_lab` 仓库。
3. `git remote -v` 指向 `fthytwerwt-sudo/video_capability_lab`。
4. 本轮允许修改文件已明确。
5. 本轮禁止修改文件已明确。

如果任一不满足：

- 不得改文件。
- 不得新建目录。
- 不得 commit。
- 不得 push。
- 必须输出 `blocked_wrong_workspace_or_remote`。

## 不知道先问规则

如果用户输入中出现不明确目标，例如：

- “那个文件”
- “vlog / odd 文件”
- “这个目录”
- “参考里面那个”
- “你自己看着弄”

Codex 必须先在仓库内查找候选。若候选不唯一或不存在，必须输出 `blocked_ask_user_confirmation`。

不得猜路径、不得新建目录、不得把能力规划写成已确认事实。

## 真实意图澄清闸门

方向型、能力型、demo 型、项目生死判断型和 Codex 执行型任务必须先明确用户真实目标、成功标准、失败标准和停止条件。

如果 Codex 执行单缺少真实目标、验收标准或失败判定，Codex 必须输出 `blocked_missing_true_intent_gate` 或回报缺口，不得猜测执行。

工具安装成功、机制补齐、参考视频解析、synthetic test 通过，都不得写成 Remotion demo、BGM beat_map 或项目闭环能力成立。

## 文件命名规则

Codex 新建任何自定义文件或目录前，必须检查文件名是否为“中文 + 英文”。

推荐格式：`中文说明_english_slug.ext`。

不符合规则时，不得创建；必须改成中文+英文，或说明属于工具固定文件名例外。

工具固定文件名例外包括 `AGENTS.md`、`README.md`、`.gitignore`、`package.json`、`tsconfig.json`、`vite.config.*`、`remotion.config.*`、`Dockerfile`、`docker-compose.yml`、`pyproject.toml`、`requirements.txt`、`pytest.ini`、`__init__.py` 和其他第三方工具强制要求的固定文件名。

本轮最终回报必须列出新建文件，并说明是否符合命名规则；若使用例外文件名，必须说明原因。

## 外部项目 AGENTS 审计规则

审计其他项目 `AGENTS.md` 时默认只读，不得读取该项目业务文件，不得读取用户明确禁止的项目。

可迁移内容必须标为“机制”。只迁移机制，不迁移业务事实。

业务身份、当前任务、完成状态、素材路径、模型选择、指标路线、候选对象、分层规则、内容生成路线和验收结果必须标为“禁止迁移”。

借鉴机制后，必须同步当前项目 `AGENTS.md`、`codex_source/01_execution_rules.md`、检查标准和 latest，不得把外部项目 AGENTS 写成当前项目事实源。

修改系统机制文件或 GPT Project 上传包相关文件后，必须运行 `python3 脚本_scripts/sync_gpt_project_mechanism_pack.py --check`；需要刷新上传包时，必须运行同步脚本并检查差异。

本地完成不等于远端完成；所有仓库文件改动必须 commit、push，并验证 remote HEAD。

## 每轮任务必须 push

已确认：每轮 Codex 任务执行完，必须 push 到仓库。只要产生文件改动，就必须 path-limited stage、commit、push、remote HEAD readback。

## 不能 push 不得 completed

push 失败时最终状态必须写 `blocked_push_failed`。本地文件存在但未 push 时，必须写 `local_only_not_completed`。

## 禁止本地结果冒充远端完成

本地验证通过只代表 local validation 通过，不代表远端完成。完成必须同时满足 commit、push、remote HEAD verified。

## 禁止技术样片冒充能力成立

`component_probe` 通过不等于能力稳定成立。`technical_sample` 通过不等于 `publish_candidate_ready`。

## 禁止 prompt 覆盖仓库事实

用户聊天或 GPT Project 上传包若与 GitHub 仓库 `main` 当前事实冲突，以仓库事实为准；若用户本轮输入明确覆盖，以本轮输入为 `P0`。

## 执行前必须输出 route_decision

每轮执行前至少判断：

```yaml
route_decision:
  task_type:
  allowed_actions:
  forbidden_actions:
  repository:
  branch:
  expected_validation:
```

## 执行后必须输出 validation 和 commit_push_status

每轮执行后至少输出：

```yaml
validation:
  commands:
  result:
  failed_items:
commit_push_status:
  commit_sha:
  pushed:
  remote_head_verified:
  status:
```

## 参考视觉语言迁移库与判断路由器规则

后续任何任务只要涉及以下内容，必须先读取并使用 `54 / 55 / 56`：

- 参考视频解析
- 对标审计
- 字幕
- 贴纸
- 视觉标点
- 视觉语言
- 样片回审
- style sheet
- Remotion 贴纸 probe
- vlog / odd 正片候选

必读文件：

1. `项目资料_docs/视频能力实验室_video_capability_lab/54_解析资产全量索引_analysis_asset_inventory.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/55_参考视觉语言迁移库_reference_visual_language_migration_library.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md`

执行前必须输出：

```yaml
visual_language_preflight:
  source_inventory_read:
  migration_library_read:
  decision_router_read:
  analysis_asset_ids:
  reference_rule_links:
  migration_library_used:
  decision_router_used:
  template_fallback:
  copy_risk_check:
```

如果缺少上述读取或字段，必须输出：

```yaml
blocked_reason: blocked_reference_visual_language_preflight_missing
route_back_to: 54/55/56
```

后续报告必须包含：

```yaml
migration_library_used:
decision_router_used:
analysis_asset_ids:
reference_rule_link:
caption_visual_language_decision:
sticker_visual_language_decision:
caption_sticker_relation:
template_fallback:
copy_risk_check:
failure_route:
```

`template_fallback=true` 的定义：

- 只能说“套模板 / 用组件 / 按之前风格”，但说不出来源资产。
- 说不出当前镜头的 `visual_event`、`anchor_target` 或 `attachment_relation`。
- 形状不是从画面事件长出来，只是换色、放大、换坐标。
- 字幕和贴纸没有分工，只是重复说明。
- 视觉形态接近参考原贴纸、原字体、原文案、平台 UI 或品牌资产。

`template_fallback=true` 时：

- 机制报告可以记录 fallback 问题。
- style sheet 只能作为问题板或对照板。
- 小范围 Remotion probe、正片候选、完整候选报告不得继续推进，必须 blocked 或回到规则补全。

禁止行为：

- 不得因为已存在组件库，就绕过 `54 / 55 / 56`。
- 不得把参考视频路径写成本项目素材资产。
- 不得复制第三方贴纸、平台 UI、品牌资产、原字体、原文案、包装或账号信息。
- 不得用数量、多样化、换颜色代替来源规则和镜头锚点。

## 视觉前处理与真实视觉工具接入规则

后续任何任务只要涉及以下内容，必须先读取并使用 `61`：

- 画面锚点
- 运动跟踪
- 遮罩计划
- 视觉判分
- 字幕 / 贴纸 / 视觉标点贴住画面
- OpenCV
- MediaPipe
- SAM2
- 数据驱动 Remotion probe

必读文件：

```text
项目资料_docs/视频能力实验室_video_capability_lab/61_视觉前处理数据协议_visual_preprocessing_data_protocol.md
```

执行前必须输出：

```yaml
visual_preprocessing_preflight:
  protocol_read:
  anchor_map_available_or_sample_used:
  motion_track_available_or_sample_used:
  mask_plan_available_or_sample_used:
  visual_scorecard_available_or_sample_used:
  runtime_assets_commit_allowed: false
  sam2_weights_download_allowed: false
```

Remotion plugin layer 规则：

```yaml
dependency_source_of_truth:
  - package.json
  - package-lock.json
  - node_modules
  - npm ls
not_source_of_truth:
  - Codex plugin environment
version_alignment_required: true
blocked_if_exact_or_compatible_version_unavailable: true
blocked_if_remotion_family_upgrade_required_without_user_confirm: true
```

真实视觉工具接入规则：

```yaml
opencv:
  allowed_use: edges_optical_flow_feature_points_simple_motion_tracking
  claim_boundary: probe_success_not_stable_visual_understanding
mediapipe:
  allowed_use: pose_hand_body_landmark_probe
  no_detection_rule: write_no_landmark_detected_do_not_fake
sam2:
  allowed_use_this_round: adapter_and_environment_probe_only
  forbidden_without_user_permission:
    - download_checkpoints
    - git_clone_external_sam2_repo
    - install_large_cuda_or_torch_dependency
  no_weights_status: interface_ready_weights_missing
```

阻断条件：

```yaml
blocked_reason:
  - blocked_remotion_plugin_version_not_available
  - blocked_need_user_confirm_remotion_family_upgrade
  - blocked_python_env_not_safe
  - blocked_opencv_install_failed
  - blocked_mediapipe_python_version_unsupported
  - blocked_sam2_requires_weights_or_heavy_cuda_dependency
  - blocked_visual_preprocessing_protocol_missing
  - blocked_review_pack_generation_failed
```

禁止声明：

- 不得把插件安装成功写成视频能力已验证。
- 不得把 OpenCV / MediaPipe probe 成功写成视觉理解能力稳定成立。
- 不得把 SAM2 adapter 存在写成 segmentation verified。
- 不得把 2-4 秒工具链 probe 写成 `publish-ready`、`video_fixed` 或 `vlog_director_capability_verified`。
- 不得提交 `tmp/`、`dist/`、视频、图片、音频、抽帧、runtime JSON、模型权重或 `.env`。

## 视觉前处理驱动 8 秒候选执行规则

当用户要求基于视觉前处理协议生成 8 秒字幕 / 贴纸 / 视觉标点候选时，Codex 必须执行以下规则：

必读文件：

```text
项目资料_docs/视频能力实验室_video_capability_lab/54_解析资产全量索引_analysis_asset_inventory.md
项目资料_docs/视频能力实验室_video_capability_lab/55_参考视觉语言迁移库_reference_visual_language_migration_library.md
项目资料_docs/视频能力实验室_video_capability_lab/56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md
项目资料_docs/视频能力实验室_video_capability_lab/59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md
项目资料_docs/视频能力实验室_video_capability_lab/61_视觉前处理数据协议_visual_preprocessing_data_protocol.md
项目资料_docs/视频能力实验室_video_capability_lab/62_Remotion插件与视觉工具链补强报告_remotion_plugin_and_visual_toolchain_upgrade_report.md
```

执行前必须输出：

```yaml
visual_preprocessing_driven_8s_preflight:
  scope: 8s_candidate_not_2_4s_probe_not_full_18s_video
  anchor_map_generated_or_read: true
  motion_track_generated_or_read: true
  mask_plan_generated_or_read: true
  visual_scorecard_generated_or_read: true
  remotion_plugins_available:
    - @remotion/paths
    - @remotion/motion-blur
    - @remotion/effects
  runtime_assets_commit_allowed: false
  generation_api_called: false
```

输出必须包含：

```yaml
selected_8s_structure:
  material_ids:
  time_ranges:
  bgm_used:
caption_sticker_plan:
  captions:
    - caption_id
    - text
    - anchor_from
    - template_fallback
  stickers:
    - sticker_id
    - anchor_from
    - motion_from
    - mask_from
    - template_fallback
visual_scorecard:
  review_status: pending_user_review
review_pack:
  path:
  contact_sheet:
  evidence_maps:
```

Remotion 使用要求：

```yaml
@remotion/paths:
  required_use: path_length_or_point_or_evolution
@remotion/motion-blur:
  required_use: Trail_or_motion_blur_entry
@remotion/effects:
  required_use: blur_or_shadow_or_noise_or_vignette_material_entry
```

阻断条件：

```yaml
blocked_reason:
  - blocked_visual_preprocessing_runtime_json_missing
  - blocked_8s_candidate_render_failed
  - blocked_8s_candidate_metadata_check_failed
  - blocked_8s_review_pack_generation_failed
  - blocked_template_fallback_or_anchor_binding_missing
```

禁止声明：

- 不得把 8 秒候选写成完整 18 秒正片。
- 不得把 `render_status=passed` 写成用户审美通过。
- 不得把 OpenCV 粗锚点写成稳定视觉理解。
- 不得把 `simulated_occlusion_only=true` 写成真实遮挡通过。
- 不得声明 `publish-ready`、`video_fixed`、`full_video_candidate_completed` 或 `vlog_director_capability_verified`。
- 不得提交 `tmp/`、`dist/`、视频、图片、音频、抽帧、runtime JSON 或模型权重。

## 字幕贴纸视觉回审闭环规则

后续任何任务只要出现以下反馈或风险，必须在 `54 / 55 / 56` 之外继续读取并使用 `59`：

- 字幕像大字口号，不像动作反应。
- 贴纸像通用组件，不像这一帧专属反应。
- 锚点只是文档声明，不是真正贴住画面。
- 遮挡和材质只是模拟，不够融入画面。
- 动效像参数动画，不像动作事件带出来的运动。
- 用户反馈“总差一点”“像组件”“像口号”“不贴画面”。

必读文件：

```text
项目资料_docs/视频能力实验室_video_capability_lab/59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md
```

执行前必须输出：

```yaml
mechanism_used:
  caption_sticker_visual_review_loop_read: true
  visual_scorecard_completed: true
  caption_sticker_fix_spec_completed: true
  micro_probe_before_full_render_2_4s_checked: true
```

每次修正必须输出：

```yaml
visual_scorecard:
  caption_relation_problem:
  sticker_generic_component_problem:
  anchor_declaration_problem:
  occlusion_material_problem:
  motion_event_problem:
caption_sticker_fix_spec:
  frame_evidence:
  caption_fix:
  sticker_fix:
  conflict_resolution:
  template_fallback: false
  copy_risk_check:
```

阻断条件：

```yaml
blocked_reason:
  - blocked_caption_sticker_frame_review_missing
  - blocked_visual_scorecard_missing
  - blocked_caption_sticker_fix_spec_missing
  - blocked_anchor_declaration_only
  - blocked_template_or_coordinate_only_fix
route_back_to: 54/55/56/59
```

禁止把以下行为写成修正：

- 只增加贴纸数量。
- 只换颜色。
- 只换坐标。
- 只加描边或阴影。
- 只把 caption 改成更大字。
- 只调 spring / easing 参数，但不绑定动作接触、受力或切镜。

字幕 / 贴纸 / 视觉标点没有通过 2-4 秒微段回审前，不得直接扩到整条 18 秒正片。

2-4 秒微段技术验证通过后，状态仍必须是 `pending_user_review`；不得声明 `publish-ready`、`video_fixed`、`full video candidate completed` 或 `vlog director capability verified`。
