# Codex 执行桥接包

## 工作目录硬约束

- 本项目只能在用户现有的 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库中执行。
- 当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 当前 GitHub 仓库必须是 `fthytwerwt-sudo/video_capability_lab`。
- 禁止跑出 `vlog、odd` 文件夹。
- 禁止在 `/Users/fan/Documents/` 下另建 `video_capability_lab`。
- 禁止 clone 到其他路径。
- 禁止创建 worktree 到其他路径。
- 任何文件创建、修改、迁移、同步、commit、push 都只能发生在该目录和该仓库内。
- 路径不明确时必须先问或 blocked，不得猜。

## Codex 每轮执行前必须读取

1. `AGENTS.md`
2. `项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md`
3. `项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md`
4. `项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md`
5. `项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md`
6. `项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md`
7. `项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md`
8. `项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md`
9. `项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md`
10. `项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md`
11. `执行日志_codex_log/最新摘要_latest.md`

## Codex 每轮必须输出

- `route_decision`
- `impact_check`
- `validation`
- `commit_push_status`
- `remote_head_status`
- `next_goal`
- `remaining_confirmation`

## Codex 执行单固定结构

```text
Goal（目标）
Context（上下文）
Constraints（边界）
真实意图澄清
Impact check（影响面检查）
Must read（必须读取）
文件命名要求
Execution steps（执行步骤）
Done when（完成标准）
Blocked if（阻断条件）
Output（最终回报格式）
```

## 文件命名要求

- 本轮新建自定义文件 / 目录必须使用中文+英文命名。
- 格式：`中文说明_english_slug.ext`。
- 工具强制约定文件名除外，但必须说明原因。
- 不知道怎么命名时，必须先问或标 `待确认`，不得随便创建纯英文文件名。

## 固定边界

- GPT 必须在执行单中写明用户真实目标、成功标准和失败标准；缺失时 Codex 必须 blocked 或回报缺口，不得猜。
- Codex 默认不知道 GPT 聊天新增信息，除非本轮输入给出或已写回仓库。
- Codex 每轮必须 push。
- Codex 不能把本地完成写成远端完成。
- Codex 不能把技术预览写成能力成立。
- Codex 不能把 `technical_sample` 写成 `publish_candidate_ready`。

## 固定回报字段

```text
status:
blocked:
blocked_reason:
repository:
branch:
commit_sha:
pushed:
remote_head_verified:
validation:
next_goal:
```

## 本轮新增｜reference_analysis 到 component_probe 桥接

### route_decision

```yaml
task_type: reference_analysis
allowed_actions:
  - 读取当前仓库内 `素材/vlog 参考` 的 2 个本地视频
  - 使用 ffprobe / ffmpeg 做技术元数据与临时抽帧辅助观察
  - 输出轻量 Markdown 报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 生成正式视频
  - 调用外部 API
  - 安装大型依赖
  - 提交视频、图片、音频、抽帧或运行输出
  - 复刻平台 UI、品牌资产、账号页、二维码、原字体或原文案
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - ffprobe metadata
  - report_non_empty
  - key_fields_grep
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### reference_outputs

- 已确认：本轮报告路径为 `项目资料_docs/视频能力实验室_video_capability_lab/11_vlog参考视频解析_vlog_reference_analysis.md`。
- 已确认：`video_01` 和 `video_02` 均已完成技术元数据读取和文字化参考解析。
- 待验证：所有 Remotion / HyperFrames / BGM 能力仍需独立 component_probe。

### next_component_probe_candidates

| priority | component | status | source_reference | probe_reason |
|---|---|---|---|---|
| 1 | Remotion 手写字节奏层 | 待验证 | `02.MP4` | 手写字作为独立 overlay 机制清晰，资产替换成本低。 |
| 2 | Remotion 分屏 collage | 待验证 | `02.MP4` | 上下分屏结构清楚，适合用原创素材验证布局和时间轴。 |
| 3 | 自有 CTA end card | 待验证 | `01.MP4` + `02.MP4` | 两个参考视频都有平台尾卡，可迁移为原创回审尾卡。 |

### remaining_confirmation

- 待验证：用户是否希望第一轮 probe 只做 `Remotion 手写字节奏层`，还是把 `分屏 collage` 一起纳入同一轮。
- 待验证：后续 probe 使用的原创素材、原创短句和画幅比例。
- 推测：若优先追求最小可验证闭环，先做单组件 `handwriting_beat_layer` 风险最低。

## 本轮新增｜audio_beat_toolchain_check 到 BGM beat_map probe 桥接

### route_decision

```yaml
task_type: audio_beat_toolchain_check
allowed_actions:
  - 创建或复用项目本地 `.venv`
  - 安装 librosa / numpy / scipy / soundfile 到 `.venv`
  - 检测 ffmpeg / ffprobe / Python / audio modules
  - 运行 synthetic click audio test
  - 输出轻量检测脚本、requirements 记录和 Markdown 报告
forbidden_actions:
  - 全局 pip install
  - sudo install
  - Homebrew 安装系统依赖
  - 安装 OpenCV / torch / tensorflow / demucs / spleeter / whisper
  - 调用外部 API
  - 生成视频
  - 提交 `.venv`、音频、视频、图片或运行输出
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - import_test
  - synthetic_audio_test
  - report_non_empty
  - no_venv_staged
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### audio_toolchain_outputs

- 已确认：检测脚本为 `脚本_scripts/检查音频卡点工具链_check_audio_beat_toolchain.py`。
- 已确认：依赖记录为 `依赖_requirements/音频分析_audio_analysis_requirements.txt`。
- 已确认：检测报告为 `项目资料_docs/视频能力实验室_video_capability_lab/12_音频卡点工具链检测_audio_beat_toolchain_check.md`。
- 部分成立：音频分析工具链已可运行，并通过 synthetic audio test。
- 待验证：真实 BGM beat_map 仍需独立 probe。

### next_bgm_probe_candidate

| priority | probe | status | input_candidate | expected_outputs |
|---|---|---|---|---|
| 1 | BGM beat_map probe | 待验证 | 真实 BGM 或从 `素材/vlog 参考` 提取的音频 | `beat_map.json`、`onset_map.json`、`rms_peaks.json`、`waveform_review.png`、人工复听清单 |

### remaining_confirmation

- 待验证：下一轮使用用户指定真实 BGM，还是从现有 `01.MP4` / `02.MP4` 提取音频。
- 待验证：下一轮是否允许提交 JSON / PNG review artifacts，或只提交 Markdown 检测报告。

## 本轮新增｜Remotion 多组件能力证明 demo 桥接

### route_decision

```yaml
task_type: technical_sample + capability_proof_demo
true_goal: 判断 Codex + Remotion + BGM marker 能否基于用户真实素材做出像样 demo
allowed_actions:
  - 读取当前仓库内 `素材/剪辑素材/BGM` 与 `素材/剪辑素材/剪辑`
  - 使用 ffprobe / ffmpeg 检测、提取和转码本地 runtime assets
  - 使用 librosa / scipy 生成 beat / onset / RMS 粗 marker
  - 使用 Remotion 渲染 10-15 秒 demo
  - 生成 contact sheet 和 Markdown 报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 提交 BGM 原文件、剪辑原视频、导出 demo、音频提取产物、contact sheet 或 runtime assets
  - 调用外部 API
  - 复刻平台 UI、logo、二维码、账号页、品牌资产
  - 把 demo 成功写成正式成片、发布候选或项目闭环能力成立
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
composition_id: 能力证明Demo-capability-demo
expected_validation:
  - ffprobe metadata
  - marker generation counts
  - npx remotion compositions
  - npx remotion render
  - video-metadata-probe
  - contact sheet visual self-check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### remotion_capability_outputs

- 已确认：报告路径为 `项目资料_docs/视频能力实验室_video_capability_lab/14_Remotion能力证明Demo报告_remotion_capability_demo_report.md`。
- 已确认：Remotion composition id 为 `能力证明Demo-capability-demo`。
- 已确认：本地 demo 输出为 `dist/remotion_demo_能力证明_capability_demo/demo.mp4`，不得提交。
- 已确认：contact sheet 输出为 `dist/remotion_demo_能力证明_capability_demo/contact_sheet.jpg`，不得提交。
- 已确认：marker 运行输出位于 `tmp/remotion_demo_assets/`，不得提交。
- 部分成立：BGM beat_map quality 仍是自动粗分析，未人工复听确认。

### next_mechanism_design_candidate

| priority | mechanism | status | reason |
|---:|---|---|---|
| 1 | runtime asset preparation | 待补全 | 当前 runtime assets 由 FFmpeg 命令生成，下一轮应脚本化。 |
| 2 | marker quality grading | 待补全 | 自动 marker 可用，但需区分 coarse / reviewed / publish-grade。 |
| 3 | editing profile | 待补全 | 本轮 demo 像样，但还未沉淀成可复用剪辑参数包。 |
| 4 | second material regression | 待验证 | 需要第二套素材验证可复用性。 |

## 本轮新增｜demo v1 回审与审美重定 v2 桥接

### route_decision

```yaml
task_type: demo_v1_review_and_aesthetic_retarget
true_goal: 先写入 v1 用户人审反馈和不合格审美标准，再产出一个更接近对标 vlog montage 机制的 v2 可展示 demo
allowed_actions:
  - 读取当前仓库内 `素材/vlog 参考` 的解析结论
  - 读取当前仓库内 `素材/剪辑素材/BGM` 与 `素材/剪辑素材/剪辑`
  - 更新项目事实文档、v1 报告、最新摘要和执行桥接包
  - 新建 `15_demo审美回审与v2方向_aesthetic_review_retarget.md`
  - 保留 v1 composition，并新增 v2 composition
  - 使用当前仓库已有 Remotion / FFmpeg / Python 工具链 render 本地 v2 demo
  - 生成 v2 contact sheet
forbidden_actions:
  - 调用外部 API
  - 安装大型依赖
  - 提交视频、图片、音频、runtime assets、`.venv`、`node_modules`、`dist` 或 `tmp`
  - 复刻平台 UI、logo、二维码、账号页、搜索框
  - 复刻品牌包装、原字体、原贴图、原文案或原音乐
  - 把 render success 写成 content pass
  - 把自动 BGM marker 写成精准卡点
  - 写 `pass_continue_to_mechanism_design`
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
v1_old_decision: pass_continue_to_mechanism_design
v1_new_decision: technical_pass_content_mismatch
v2_composition_id: 审美重定Demo-aesthetic-retarget-demo
expected_validation:
  - workspace_identity_check
  - material_audio_and_clip_decode_check
  - python3 脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py
  - npx remotion compositions
  - npx remotion render
  - video-metadata-probe
  - contact_sheet_generation
  - forbidden_text_check
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### v1_review_outputs

- 已确认：用户人审反馈为 `效果还行，但不是我想要的那种`。
- 已确认：v1 技术验证通过，但内容方向未通过。
- 已确认：v1 状态必须降级为 `technical_pass_content_mismatch`。
- 已确认：v1 可作为技术链路证明，不得作为审美方向通过。
- 已确认：未经用户人审确认 v2 方向对，不得进入机制设计。

### v2_acceptance

- v2 不出现内部项目说明文案。
- v2 不解释技术链路。
- v2 不用组件名称当观众文案。
- v2 先给真实镜头、运动、生活切片和情绪推进，再使用文字或分屏。
- v2 必须包含短手写字、短分屏 collage、标题叠真实画面和自有尾卡收束。
- v2 最终状态只允许写 `rendered_pending_user_review` 或 `technical_render_completed_pending_user_review`。

### v2_outputs

- 已确认：v2 composition id 为 `审美重定Demo-aesthetic-retarget-demo`。
- 已确认：v2 本地 demo 输出为 `dist/remotion_demo_审美重定_aesthetic_retarget/demo_v2.mp4`，不得提交。
- 已确认：v2 contact sheet 输出为 `dist/remotion_demo_审美重定_aesthetic_retarget/contact_sheet_v2.jpg`，不得提交。
- 已确认：v2 技术元数据为 12.053333s / 1080x1920 / 30fps / h264 / AAC stereo。
- 已确认：video-metadata-probe passed。
- 待验证：v2 内容方向是否通过，必须等待用户人审。

### remaining_confirmation

- 待验证：v2 是否方向对，必须等待用户人审。
- 部分成立：BGM marker 可作粗节奏辅助，但未人工复听，不是精准卡点。
- 待验证：v2 不是正式成片，不是 publish candidate。

## 本轮新增｜新参考包审美解析与 v2 demo 桥接

### route_decision

```yaml
task_type: reference_analysis + aesthetic_rule_extraction + demo_v2_bridge
true_goal: 读取用户新增的 10 个参考视频，提炼合格审美标准、不合格审美标准，并转成下一轮 v2 demo 可执行规则
allowed_actions:
  - 在当前仓库内读取 `素材/vlog 参考/新参考+解析` 的 10 个本地参考视频
  - 使用 ffprobe / ffmpeg 读取元数据与解码状态
  - 生成 ignored 临时 contact sheet 辅助观察
  - 输出 Markdown 报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 生成 v2 demo
  - 生成正式视频
  - 训练模型
  - 调用外部 API
  - 安装大型依赖
  - 提交参考视频、抽帧、contact sheet、音频、zip、dist、tmp、runtime assets
  - 复刻平台 UI、logo、watermark、账号页、搜索框、二维码
  - 复刻品牌包装、原字体、原贴纸、原文案或原音乐
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
source_folder_user_text: 素材-vlog 参考-新参考+解析
source_folder_resolved: 素材/vlog 参考/新参考+解析
expected_validation:
  - workspace_identity_check
  - source_folder_exists
  - source_video_count_is_10
  - video-metadata-probe_all_passed
  - report_non_empty
  - key_fields_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### new_reference_outputs

- 已确认：真实参考路径为 `素材/vlog 参考/新参考+解析`。
- 已确认：该路径下正好 10 个 `.MP4`。
- 已确认：10 个视频均有 AAC stereo 音轨，且 `ffmpeg` decode passed。
- 已确认：本轮报告路径为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：本轮没有生成 v2 demo，没有调用外部 API，没有训练模型。
- 待验证：音乐卡点未做人耳复听或 beat tracking。
- 待验证：下一轮 v2 内容方向必须用户人审后才能升级。

### v2_bridge_rules

- v2 必须先有真实镜头、物件、手部、脚步、城市纹理或运动，再出现文字/组件。
- v2 文案只允许情绪词、拟声词或原创短词，不允许内部项目语言。
- v2 可以迁移 `object_pov_opening`、`micro_montage_chain`、`emotion_word_overlay`、`scrapbook_black_canvas`、`short_split_or_screen_within_screen`、`own_cta_end_card`。
- v2 不得迁移平台 UI、品牌 logo、账号页、二维码、原字体、原贴纸、原文案、原音乐、可识别人脸、车牌、地标。
- v2 输出后只能写 `rendered_pending_user_review` 或 `technical_render_completed_pending_user_review`，不得写 content pass。

### remaining_confirmation

- 待验证：下一轮 v2 使用哪个 motif：`city_object_diary`、`glass_light_walk` 或用户另定主题。
- 待验证：下一轮可用原创/允许素材清单。
- 待验证：是否允许下一轮生成 contact sheet 或仅提交 Markdown report。

## 本轮新增｜新素材参考重做 Demo 桥接

### route_decision

```yaml
task_type: new_reference_rebuild_demo
true_goal: 按新参考包解析报告和新素材重做一个完整 Remotion demo，不 patch 旧 v2
allowed_actions:
  - 读取当前仓库内 `素材/剪辑素材/剪辑` 的新本地素材
  - 沿用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
  - 使用 ffprobe / ffmpeg 检测、剪取和转码本地 runtime assets
  - 使用 librosa / scipy 生成 BGM 粗 marker
  - 新增 Remotion composition
  - render 12 秒竖屏 demo
  - 生成 contact sheet 辅助视觉自检
  - 输出 Markdown 报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - patch 旧 v2 当成新 demo
  - 调用外部 API
  - 训练模型
  - 安装大型依赖
  - 提交原始视频、导出 demo、音频提取产物、contact sheet、runtime assets、dist、tmp 或 zip
  - 复刻平台 UI、logo、watermark、账号页、搜索框、二维码
  - 复刻品牌包装、原字体、原贴纸、原文案或原音乐
  - 把 render success 写成 content pass
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
source_reference_report: 项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md
visual_source_folder: 素材/剪辑素材/剪辑
bgm_source: 素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV
motif: sand_bamboo_breath
composition_id: 新素材参考重做Demo-new-reference-rebuild-demo
expected_validation:
  - workspace_identity_check
  - material_audio_and_clip_decode_check
  - marker_generation_counts
  - python3 脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py
  - npx remotion compositions remotion/Root.tsx
  - npx remotion render
  - video-metadata-probe
  - contact_sheet_generation
  - forbidden_text_check
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### new_reference_rebuild_outputs

- 已确认：新素材路径为 `素材/剪辑素材/剪辑`。
- 已确认：该路径下 7 个视频均可读取和解码。
- 已确认：本轮选用 6 个片段进入 demo，排除 `IMG_6985.MOV`。
- 已确认：本轮沿用同一个 BGM 文件。
- 已确认：新增素材清单为 `remotion/数据_data/新素材重做清单_new_reference_rebuild_clips.ts`。
- 已确认：新增 composition 源码为 `remotion/组合_compositions/新素材参考重做Demo_new_reference_rebuild_demo.tsx`。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/18_新素材参考重做Demo报告_new_reference_rebuild_demo_report.md`。
- 已确认：本地 demo 输出为 `dist/remotion_demo_新素材参考重做_new_reference_rebuild/demo_new_reference_rebuild.mp4`，不得提交。
- 已确认：contact sheet 输出为 `dist/remotion_demo_新素材参考重做_new_reference_rebuild/contact_sheet_new_reference_rebuild.jpg`，不得提交。
- 已确认：技术元数据为 12.053333s / 1080x1920 / 30fps / h264 / AAC stereo。
- 当前内容状态：`rendered_pending_user_review`。

### remaining_confirmation

- 待验证：用户是否认可本轮 `sand_bamboo_breath` 的内容方向。
- 待验证：本轮 demo 不是正式成片，不是 publish candidate。
- 部分成立：BGM marker 可作粗节奏辅助，但未人工复听，不是精准卡点。

## 本轮新增｜30 秒对标样片重做桥接

### route_decision

```yaml
task_type: 30s_reference_sample_rebuild
true_goal: 用户要看到 30 秒对标样片已经明显学习 10 个新参考视频的审美方式，而不是继续看技术可行 demo
previous_output_duration: 12s
user_expected_duration: 30s
not_sticker_patch: true
not_capability_demo: true
allowed_actions:
  - 读取当前仓库内 `素材/剪辑素材/剪辑` 的新本地素材
  - 沿用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
  - 使用 ffprobe / ffmpeg 检测、剪取、转码本地 runtime assets
  - 将 25.4s BGM 本地平滑延展到 30s
  - 使用 librosa / scipy 生成 BGM 粗 marker
  - 新增 30 秒 Remotion composition
  - render 30 秒竖屏 demo
  - 生成 contact sheet 辅助视觉自检
  - 输出 Markdown 报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 只输出 12 秒 demo
  - patch 旧 12 秒 demo 当成新样片
  - 只修字幕或只修贴纸
  - 调用外部 API
  - 训练模型
  - 安装大型依赖
  - 提交原始视频、导出 demo、音频提取产物、contact sheet、runtime assets、dist、tmp 或 zip
  - 复刻平台 UI、logo、watermark、账号页、搜索框、二维码
  - 复刻品牌包装、原字体、原贴纸、原 emoji 样式、原文案或原音乐
  - 把 render success 写成 content pass
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
source_reference_report: 项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md
visual_source_folder: 素材/剪辑素材/剪辑
bgm_source: 素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV
motif: sand_bamboo_sea_breath
composition_id: 三十秒对标样片-30s-reference-sample
duration_in_frames: 900
fps: 30
expected_validation:
  - workspace_identity_check
  - material_audio_and_clip_decode_check
  - selected_segments_count_at_least_16
  - caption_events_count_at_least_8
  - sticker_events_count_at_least_8
  - marker_generation_counts
  - python3 脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py
  - npx remotion compositions remotion/Root.tsx
  - npx remotion render
  - video-metadata-probe
  - contact_sheet_generation
  - forbidden_text_check
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### thirty_second_reference_sample_outputs

- 已确认：新增数据清单为 `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`。
- 已确认：新增 composition 源码为 `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`。
- 已确认：composition id 为 `三十秒对标样片-30s-reference-sample`。
- 已确认：durationInFrames 为 `900`，fps 为 `30`。
- 已确认：本地 demo 输出为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`，不得提交。
- 已确认：contact sheet 输出为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`，不得提交。
- 已确认：技术元数据为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo。
- 已确认：18 个微段落、10 个字幕事件、11 个贴纸事件进入源码数据。
- 当前内容状态：`rendered_pending_user_review`。

### remaining_confirmation

- 待验证：用户是否认可 30 秒对标样片已经明显学习新参考包审美。
- 待验证：本轮样片不是正式成片，不是 publish candidate。
- 部分成立：BGM marker 可作粗节奏辅助，但未人工复听，不是精准卡点。

## 本轮新增｜字幕贴纸对标审计桥接

### route_decision

```yaml
task_type: caption_sticker_reference_audit
true_goal: 按新参考学习报告和当前 30 秒样片逐条检测字幕/贴纸为什么不像参考视频，禁止把事件数量写成审美达标
allowed_actions:
  - 读取新参考学习报告
  - 读取 30 秒样片报告
  - 读取 30 秒样片 Remotion 源码和数据文件
  - 读取本地 contact sheet
  - 从当前本地视频抽取 sticker start / mid 关键帧到 ignored tmp 目录
  - 对 caption events 逐条审计
  - 对 sticker events 逐条审计
  - 输出 Markdown 审计报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 源码
  - 重新 render 新视频
  - 调用外部 API
  - 安装大型依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把代码里有贴纸写成贴纸审美成立
  - 把数量达标写成对标达标
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
source_video: dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4
source_report: 项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md
sample_report: 项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md
audit_report: 项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - video-metadata-probe
  - sticker_keyframe_extraction
  - report_key_fields_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### caption_sticker_reference_audit_outputs

- 已确认：本轮报告路径为 `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 已确认：审计报告必须作为下一轮字幕/贴纸修复的必读文件。
- 已确认：下一轮修复不得只读取 `20_三十秒对标样片报告_30s_reference_sample_report.md` 后直接改视频。
- 已确认：下一轮修复必须先建立每个 sticker 的 `anchor target`、`minimum visible size`、`reference function`、`shot_binding_reason` 和 frame-level check。
- 已确认：下一轮修复必须先建立每个 caption 的 `semantic role`、动作绑定和位置理由。
- 已确认：当前不是插件缺失优先。
- 已确认：当前不建议直接 API；API 不解决放置、大小、时机和语气问题。
- 当前内容状态：`audit_completed_fix_pending`。

### next_fix_gate

- 必须先读取 `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 必须拒绝只用 caption/sticker event 数量作为完成标准。
- 必须输出下一轮可执行的 caption/sticker spec 后再改 Remotion。
- 必须在修复后重新抽取 sticker start / mid frame，并重新做 frame-level check。

### remaining_confirmation

- 待验证：下一轮修复后，用户是否认可字幕和贴纸更像参考视频的情绪/语气层。
- 待验证：若后续进入 `api_generated_sticker_pack_probe`，必须先补 sticker spec，不得直接调用 API 抽卡。

## 本轮新增｜视频事件表与画面选择机制桥接

### route_decision

```yaml
task_type: video_event_table_visual_selection_mechanism
true_goal: 建立可复用的视频事件表与画面选择标准，让后续 vlog demo 先判断画面、风格、母题、字幕贴纸锚点，再进入 Remotion 执行
render_allowed_this_round: false
file_change_scope: mechanism_docs_only
allowed_actions:
  - 读取当前仓库事实
  - 读取新参考包审美解析
  - 读取 30 秒对标样片报告
  - 读取字幕贴纸对标审计报告
  - 新建视频事件表与画面选择机制文件
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 视频表现层
  - render 视频
  - 调用外部 API
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把机制写成已验证能力
  - 把事件表机制写成当前视频已经通过
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
mechanism_file: 项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - mechanism_key_fields_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### video_event_table_visual_selection_outputs

- 已确认：本轮新增机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`。
- 已确认：该机制不是固定审美模板，不要求所有 vlog 按同一个流程剪。
- 已确认：该机制补齐 `visual_selection_table`、`video_event_table`、`failure_checklist`、`frame_level_review_points`。
- 已确认：后续 30 秒样片修复必须读取 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md` 和 `22_视频事件表与画面选择机制_video_event_table_visual_selection.md`。
- 已确认：下一轮不能直接改 x/y、fontSize、SVG 尺寸或贴纸数量，必须先改事件表字段。
- 已确认：当前真正缺口是“事件表 + 画面选择标准”，不是单纯字幕贴纸问题。
- 当前内容状态：`mechanism_completed_fix_pending`。

### next_execution_usage

- 后续任何 vlog demo 下发给 Codex 前，必须先生成 `visual_selection_table（画面选择表）`。
- 后续任何 vlog demo 进入 Remotion 前，必须先生成 `video_event_table（视频事件表）`。
- 渲染前必须检查 `failure_checklist（失败检查清单）`，避免 PPT、组件展示、随机拼贴、画面同质。
- 渲染后必须按 `frame_level_review_points（逐帧回审点）` 抽帧，检查字幕/贴纸是否真的成立。
- 如果缺少这些表，默认 blocked，不允许直接 render。

### remaining_confirmation

- 待验证：下一轮重写 30 秒样片事件表后，是否能支撑实际 Remotion 修复。
- 待验证：用户是否认可新机制覆盖“放什么图比较合适”和“不能全是一样的”这两个缺口。
