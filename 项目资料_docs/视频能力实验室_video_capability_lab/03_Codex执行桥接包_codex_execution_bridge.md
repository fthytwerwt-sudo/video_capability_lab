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
- Codex 不能把 `technical_sample` 写成正式发布候选。

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

## 本轮新增｜18 秒候选与对标贴纸差距审计桥接

### route_decision

```yaml
task_type: sticker_visual_gap_audit
user_review_input: 我看了贴纸，没得啊，和之前比就是锚点更清晰了，但是还是和对标视频的差距很大啊。
allowed_actions:
  - 读取当前仓库项目事实
  - ffprobe / ffmpeg 只读检查 18 秒候选和对标视频
  - 临时抽取候选贴纸 start / mid / exit frames
  - 临时抽取对标视频贴纸机制参考帧
  - 输出 43 差距审计报告
  - 更新 02 / 03 / latest
  - 可选在 42 追加 user_review / gap_audit_link
forbidden_actions:
  - 修改 remotion/ 下任何文件
  - 重新 render 视频
  - 调用图片 / 视频 / 音频 API
  - 生成新贴纸图
  - 提交视频、图片、音频、抽帧、tmp、dist、runtime assets 或 .env
  - 复制对标贴纸原图、原字体、原文案、平台 UI、包装、账号信息或品牌资产
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - video-metadata-probe for candidate and reference videos
  - candidate sticker start/mid/exit frame extraction
  - reference sticker mechanism frame extraction
  - report contains user quote and layered gap table
  - git diff --check
  - no remotion diff
  - no env/runtime assets staged
  - path-limited stage
  - commit_push_remote_head
```

### audit_inputs

| input | path | status |
|---|---|---|
| candidate_video | `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4` | `validation_status=passed` |
| reference_video | `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4` | `validation_status=passed` |
| candidate_report | `项目资料_docs/视频能力实验室_video_capability_lab/42_十八秒锚点贴纸正片候选报告_18s_anchor_sticker_candidate_report.md` | read |
| reference_audit | `项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md` | read |

### audit_outputs

| artifact | path | status |
|---|---|---|
| gap audit report | `项目资料_docs/视频能力实验室_video_capability_lab/43_十八秒候选与对标贴纸差距审计_18s_candidate_reference_sticker_gap_audit.md` | committed source |
| candidate frames | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/candidate_frames/` | ignored runtime, not committed |
| reference frames | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/reference_frames/` | ignored runtime, not committed |

### current_status

- 部分成立：锚点层更清晰，4 个候选 sticker events 都能回到 `41`。
- 已确认：主失败不在“继续加锚点”，而在 `shape_layer`、`stroke_layer`、`visual_material_feel`、`placement / integration` 和 `human_feel`。
- 已确认：当前贴纸仍像 Remotion / SVG 组件展示，不像对标视频里附着在主体、物件、动作旁边的自然反应贴纸。
- 待验证：43 报告需 GPT / 用户回审，不得声明 sticker passed、visual language passed、video fixed 或 vlog director capability verified。

### next_goal

下一个目标：GPT / 用户回审 `43` 差距报告；若认可判断，先执行 `sticker_style_sheet_probe`，不要直接重改 18 秒候选。

## 本轮新增｜18 秒锚点贴纸候选桥接

### route_decision

```yaml
task_type: remotion_18s_anchor_sticker_review_candidate
allowed_actions:
  - 修改 Remotion source / data / composition
  - 使用已有本地素材和 BGM runtime 文件
  - 本地 render 18 秒候选
  - 抽取每个 sticker event 的 start / mid / exit review frames
  - 输出 42 报告并更新 02 / 03 / latest
forbidden_actions:
  - 调用图片 / 视频 / 音频 API provider
  - 生成或接入第三方贴纸图
  - 提交视频、图片、音频、抽帧、tmp、dist、runtime assets 或 .env
  - 声明 publish-ready、visual language passed、sticker mechanism verified、vlog director capability verified 或 precise beat sync
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - npx remotion compositions remotion/Root.tsx
  - npx remotion render remotion/Root.tsx 十八秒锚点贴纸候选-18s-anchor-sticker-candidate ...
  - ffprobe output metadata
  - ffmpeg decode check
  - sticker start/mid/exit frame review
  - git diff --check
  - path-limited stage
  - commit_push_remote_head
```

### outputs

| artifact | path | status |
|---|---|---|
| report | `项目资料_docs/视频能力实验室_video_capability_lab/42_十八秒锚点贴纸正片候选报告_18s_anchor_sticker_candidate_report.md` | committed source |
| composition | `remotion/组合_compositions/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.tsx` | committed source |
| data | `remotion/数据_data/十八秒锚点贴纸事件_18s_anchor_sticker_events.ts` | committed source |
| local candidate | `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4` | ignored runtime, not committed |
| frame sheet | `tmp/十八秒锚点贴纸候选_frame_review_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_start_mid_exit_sheet.jpg` | ignored runtime, not committed |

### current_status

- 已确认：本轮本地 render 候选技术验证通过，视频流 `18.000000s`，音频 / container `18.048000s`，AAC stereo，完整解码通过。
- 已确认：候选包含 `41` 中 4 个 `sticker_needed=true` 事件，并包含多个 no-sticker shots。
- 部分成立：Codex 本地 frame review 已发现并修复贴纸 exit 跨镜头问题；最终审美仍需用户 / GPT 人审。
- 待验证：不得升级为 `visual_language_passed`、`sticker_system_verified`、`publish_candidate_ready` 或 `vlog_director_capability_verified`。

### next_goal

下一个目标：用户 / GPT 回审本地 18 秒候选视频和 start / mid / exit contact sheet，再按失败类型回到单个 sticker event、shape / placement、BGM review 或判断层。

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

## 本轮新增｜MiniMax 图片 API 契约解析与无水印贴纸探针

### route_decision

```yaml
task_type: minimax_image_contract_and_watermark_free_sticker_probe
true_goal: 用户只填写 MiniMax API key，由 Codex 自动查明 MiniMax 静态图片生成契约并执行 1 次 paper_sound_tag 单图探针
allowed_actions:
  - 读取 `.env` 中 MiniMax key / group_id / model 是否存在，但不得打印真实值
  - 读取 MiniMax official docs 确认静态图片生成 endpoint / model / request fields / response fields
  - 只调用 MiniMax 一个 provider
  - 只发起 1 次图片生成请求
  - 输出运行结果到 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/`
  - 更新策略配置、34 探针报告、35 契约报告、current_task、bridge、latest
forbidden_actions:
  - 调用 zhipu 或第二个 provider
  - 批量生成
  - 修改 Remotion 源码或数据
  - render 视频
  - 提交 `.env`、图片、视频、音频、`dist`、`tmp` 或 runtime assets
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
selected_provider: minimax
resolved_model: image-01
endpoint: https://api.minimax.io/v1/image_generation
expected_validation:
  - workspace_identity_check
  - env_ignored_check
  - minimax_key_present_sanitized_check
  - official_contract_resolution
  - one_minimax_api_request_only
  - python3 -m json.tool 配置_configs/图片生成策略_image_generation_policy.json
  - git diff --check
  - no_env_staged
  - no_tmp_or_image_staged
  - staged_secret_scan
  - commit_push_remote_head
```

### minimax_contract_resolution

```yaml
static_image_generation_supported: true
endpoint: https://api.minimax.io/v1/image_generation
model: image-01
auth_method: HTTP Bearer API_key
requires_group_id: false
request_fields:
  - model
  - prompt
  - aspect_ratio
  - response_format
  - n
  - prompt_optimizer
response_image_field:
  - data.image_base64
  - data.image_urls
supports_transparent_background: not_documented
supports_no_watermark: not_documented_must_verify_by_output
source:
  - https://platform.minimax.io/docs/guides/image-generation
  - https://platform.minimax.io/docs/api-reference/image-generation-t2i
  - https://platform.minimax.io/docs/api-reference/api-overview
confidence: high_for_contract_low_for_watermark_quality
```

### minimax_probe_result

- 已确认：本轮已解析 MiniMax official docs，没有要求用户继续补模型名。
- 已确认：本轮只发起 1 次 MiniMax 图片生成请求。
- 已确认：API 返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。
- 已确认：本轮未生成图片，因此不能判断 no watermark / no generated label / no logo / transparent background。
- 已确认：失败响应只保存在 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/`，不得提交。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key`。
- 下一个目标：更换或修正 MiniMax official API Platform 可用 key 后，重跑 1 次单图探针。

### minimax_rerun_result

- 已确认：本轮任务为 `minimax_watermark_free_sticker_rerun`。
- 已确认：本轮复用已解析契约：endpoint `https://api.minimax.io/v1/image_generation`，model `image-01`，requires_group_id `false`。
- 已确认：`.env` 中 MiniMax key 存在，但 key 未打印，`.env` 未提交。
- 已确认：本轮只调用 MiniMax，只发起 1 次图片生成请求。
- 已确认：MiniMax API 重跑仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。
- 已确认：本轮未生成图片，无法判断 watermark、generated label、logo、brand mark 或透明背景。
- 已确认：重跑失败响应保存在 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax重跑请求失败_minimax_rerun_request_failed.json`，不得提交。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key_after_rerun`。
- 下一个目标：更换为 MiniMax official API Platform 可用 key，或改走下一个未被策略禁用的无水印图片 provider。

### minimax_new_key_probe_result

- 已确认：本轮任务为 `minimax_new_key_watermark_free_sticker_probe`。
- 已确认：本轮复用固定契约：endpoint `https://api.minimax.io/v1/image_generation`，model `image-01`，auth `Authorization: Bearer <API_key>`，requires_group_id `false`。
- 已确认：`.env.example` 曾出现疑似真实 MiniMax key，已在不打印 key 的情况下清空模板，并将 key 保持在 ignored `.env`。
- 已确认：`.env` 中 MiniMax key 存在，但 key 未打印，`.env` 未提交。
- 已确认：本轮只调用 MiniMax，只发起 1 次图片生成请求。
- 已确认：MiniMax API 对新 key 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。
- 已确认：本轮未生成图片，无法判断 watermark、generated label、logo、brand mark 或透明背景。
- 已确认：新 key 失败响应保存在 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax新Key请求失败_minimax_new_key_request_failed.json`，不得提交。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key_after_new_key`。
- 下一个目标：回到 MiniMax 控制台确认该 key 是否真的是 API Platform 的 API key，不是网页端、Token Plan 或其他产品线 key；若仍不可用，改走下一个未被策略禁用的无水印图片 provider。

## 本轮新增｜阿里图片 API env setup 桥接

### route_decision

```yaml
task_type: alibaba_image_env_setup
true_goal: 为阿里图片 API 建立本地 env 填写入口，等待用户手动填写 DASHSCOPE_API_KEY
selected_provider: alibaba_dashscope
allowed_actions:
  - 更新 `.env.example` 的阿里图片 API 空字段和默认策略值
  - 在 ignored 本地 `.env` 中追加缺失阿里字段，不覆盖已有值
  - 在图片生成策略配置中新增 `alibaba_dashscope` provider route
  - 更新 current_task、bridge、latest 和阿里 env 说明文档
forbidden_actions:
  - 调用阿里 API 或任何图片生成 API
  - 生成贴纸候选或图片
  - 修改 Remotion 源码或数据
  - render 视频
  - 提交 `.env`、图片、视频、音频、`dist`、`tmp` 或 runtime assets
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - workspace_identity_check
  - env_ignored_check
  - env_example_secret_scan
  - local_env_field_presence_sanitized_check
  - python3 -m json.tool 配置_configs/图片生成策略_image_generation_policy.json
  - git diff --check
  - no_env_staged
  - no_runtime_artifacts_staged
  - staged_secret_scan
  - commit_push_remote_head
```

### alibaba_env_setup_result

- 当前状态：`alibaba_image_env_created_pending_user_key`。
- provider_status: `env_prepared_pending_user_key`。
- key_field: `DASHSCOPE_API_KEY`。
- alias_field: `ALIBABA_DASHSCOPE_API_KEY`。
- next_probe: `alibaba_image_contract_and_watermark_free_sticker_probe`。

已确认：本轮只建立 env 入口，没有调用阿里 API，没有调用任何图片生成 API。

已确认：`.env.example` 不包含真实 API key；真实 key 只能由用户填写到 ignored 本地 `.env`。

已确认：Codex 不能把 `DASHSCOPE_API_KEY` 或任何真实 key 写入可提交文件、报告、latest、current_task、bridge、脚本或 commit message。

已确认：下一轮必须先读取阿里 / DashScope 官方图片 API 文档，解析 endpoint、model、鉴权方式、请求字段和返回字段，再只生成 1 张 `paper_sound_tag` 无水印贴纸候选。

blocked_if：如果下一轮 `.env` 没有 `DASHSCOPE_API_KEY`，必须写 `blocked_missing_dashscope_api_key`，不得调用 API，不得生成图片。

待验证：阿里图片 API 是否支持 no watermark、no generated label、no logo / brand mark、transparent PNG 或 clean cutout source。

## 本轮新增｜阿里图片 API 契约与单图探针结果

### route_decision

```yaml
task_type: alibaba_image_contract_and_watermark_free_sticker_probe
true_goal: 用阿里图片模型生成 1 张无水印 paper_sound_tag 贴纸候选
selected_provider: alibaba_dashscope
preferred_model: qwen-image-2.0-pro
selected_model: qwen-image-2.0-pro
endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
allowed_actions:
  - 读取 ignored `.env` 中 DASHSCOPE_API_KEY 是否存在，不打印 key
  - 读取阿里官方文档解析 Qwen-Image 文生图契约
  - 只调用阿里一个 provider
  - 按用户最新指令重新发起 1 次图片生成请求
  - 只保存 1 张候选图到 ignored tmp 目录
  - 更新策略配置、37 探针报告、38 契约报告、current_task、bridge、latest
forbidden_actions:
  - 调用 zhipu、MiniMax 或第二个 provider
  - 批量生成
  - 修改 Remotion 源码或数据
  - render 视频
  - 提交 `.env`、图片、视频、音频、`dist`、`tmp` 或 runtime assets
expected_validation:
  - workspace_identity_check
  - env_ignored_check
  - dashscope_key_present_sanitized_check
  - official_contract_resolution
  - one_alibaba_provider_only
  - one_candidate_saved_after_user_retry_instruction
  - image_format_size_alpha_check
  - visual_self_check_for_watermark_generated_label_logo
  - python3 -m json.tool 配置_configs/图片生成策略_image_generation_policy.json
  - git diff --check
  - no_env_staged
  - no_tmp_or_image_staged
  - staged_secret_scan
  - commit_push_remote_head
```

### alibaba_contract_resolution

```yaml
text_to_image_supported: true
endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
model: qwen-image-2.0-pro
auth_method: HTTP Bearer DASHSCOPE_API_KEY
request_fields:
  - model
  - input.messages[0].role
  - input.messages[0].content[0].text
  - parameters.negative_prompt
  - parameters.prompt_extend
  - parameters.watermark
  - parameters.size
  - parameters.n
response_image_field:
  - output.choices[0].message.content[0].image
supports_transparent_background: unknown
supports_no_watermark: true_by_parameter_watermark_false_pending_output_review
source:
  - https://help.aliyun.com/zh/model-studio/text-to-image
  - https://help.aliyun.com/zh/model-studio/qwen-image-api
confidence: high_for_contract_medium_for_output_quality
```

### alibaba_probe_result

- 当前状态：`user_review_style_mismatch_not_remotion_ready`。
- output_path: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/阿里无水印纸感拟声标签测试_alibaba_watermark_free_paper_sound_tag_probe_01.png`。
- image_format: `PNG`。
- image_size: `1024x1024`。
- has_alpha: `false`。
- transparent_background_status: `clean_cutout_source_pending_user_review`。
- watermark_check: `pass`。
- generated_label_check: `pass`。
- logo_brand_mark_check: `pass`。
- candidate_status: `user_review_style_mismatch_not_remotion_ready`。

已确认：图片只保存在 ignored 本地 `tmp/` 目录，不提交 Git。

已确认：本轮未修改 Remotion，未 render，未接入视频。

部分成立：候选未见明显水印 / `AI生成` / logo / brand mark，但不是 transparent PNG。

已确认：用户人审不接受该候选作为当前对标贴纸方向；下一轮不能直接接 Remotion，必须改走原创 SVG / Remotion vector 反应贴纸组件探针。

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

## 本轮新增｜对标视频底线失败标准桥接

### route_decision

```yaml
task_type: reference_bottom_line_fail_gate
true_goal: 建立对标视频底线失败标准，防止把表面元素、事件数量或 render 成功误判为对标成立
render_allowed_this_round: false
file_change_scope: mechanism_docs_only
allowed_actions:
  - 读取当前仓库事实
  - 读取新参考包审美解析
  - 读取 30 秒对标样片报告
  - 读取字幕贴纸对标审计报告
  - 读取视频事件表与画面选择机制
  - 新建对标视频底线失败标准文件
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 源码
  - 修复当前视频
  - render 视频
  - 新增转场或贴纸素材
  - 调用外部 API
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把机制写成当前 30 秒样片已修复
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
mechanism_file: 项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - hard_fail_gate_key_terms_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### reference_bottom_line_outputs

- 已确认：本轮新增机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`。
- 已确认：`reference_bottom_line` 定义为对标视频最低失败标准，不是装饰性灵感。
- 已确认：`hard_fail_gate` 覆盖 `fail_no_reference_function`、`fail_surface_copy_without_function`、`fail_event_quantity_as_quality`、`fail_no_visual_selection_table`、`fail_no_video_event_table`、`fail_no_frame_review`、`fail_reference_mismatch`、`fail_random_patchwork`、`fail_caption_not_reference_like`、`fail_sticker_not_reference_like`、`fail_transition_not_reference_like`、`fail_music_visual_mismatch`、`fail_style_inconsistency`、`fail_reference_asset_copy`。
- 已确认：后续 transition 必须先写 `transition_role`、`music_moment` 和 `reference_function`，不能把转场当装饰。
- 已确认：如果用户看不出对标视频的感觉，即使技术 render 成功，也必须判定为内容失败。
- 当前内容状态：`reference_bottom_line_gate_completed_fix_pending`。

### next_execution_usage

- 后续任何 vlog demo 修复前，必须先生成 `reference_learning_checklist`。
- 后续任何 vlog demo render 前，必须先通过 `hard_fail_gate`。
- 后续任何 30 秒样片修复，都必须把 `reference_learning_checklist`、`visual_selection_table` 和 `video_event_table` 放在 Remotion 修改之前。
- 缺少 `visual_selection_table`、`video_event_table`、`failure_checklist`、`frame_level_review_points` 或 `reference_function` 时，默认 blocked。

### remaining_confirmation

- 待验证：下一轮按新底线重写当前 30 秒样片的 `reference_learning_checklist` 后，能否支撑实际 Remotion 修复。
- 待验证：用户人工审看修复后，是否认可“对标视频的感觉”已经可见。

## 本轮新增｜通用 vlog 剪辑机制桥接

### route_decision

```yaml
task_type: vlog_director_capability_mechanism
true_goal: 修正项目目标层，把三张表从当前 demo 修复表升级为未来所有 vlog 样片的通用前置机制
render_allowed_this_round: false
file_change_scope: mechanism_docs_only
allowed_actions:
  - 读取当前仓库事实
  - 更新项目总说明
  - 新建通用 vlog 剪辑机制文件
  - 修正 22/23 机制定位
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 源码
  - 修复当前 demo
  - render 视频
  - 调用外部 API
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把当前 demo 写成项目目标
  - 绕过三张表直接 render
  - 用数量达标判断通过
  - 把机制完成写成能力已验证
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
mechanism_file: 项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - mechanism_generalization_key_terms_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### required_future_reads

所有未来 vlog demo、当前 30 秒样片修复、未来不同 BGM / 不同素材 / 不同参考视频任务，都必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`

### generalized_execution_rules

- 已确认：当前 demo 只是验证材料，不是项目目标。
- 已确认：项目目标是让 Codex 稳定形成 vlog 剪辑判断能力。
- 已确认：三张表是未来所有 vlog 剪辑任务的通用前置，不是当前 demo 专用表。
- 已确认：失败标准长期不变；BGM 可以变，素材包可以变，参考视频可以变，风格锚点可以变，但判断关系不变。
- 已确认：不允许绕过 `reference_learning_checklist`、`visual_selection_table`、`video_event_table` 直接 render。
- 已确认：不允许用 caption/sticker/transition 数量达标判断通过。
- 待验证：通用机制是否能在多素材、多 BGM、多参考视频下稳定产出接近对标视频观感的样片。

### next_execution_usage

下一轮若处理当前 30 秒样片，必须先基于通用机制重新生成三张表；三张表通过 `hard_fail_gate` 后，才允许进入 Remotion 修复。

## 本轮新增｜当前 30 秒样片三表执行包桥接

### route_decision

```yaml
task_type: current_30s_three_tables_execution_pack
true_goal: 为当前 30 秒样片生成三张执行表，供下一轮按 hard_fail_summary 和 next_fix_route 决定修复路线
target_sample: 三十秒对标样片-30s-reference-sample
render_allowed_this_round: false
remotion_edit_allowed_this_round: false
file_change_scope: markdown_docs_only
allowed_actions:
  - 读取 16/20/21/22/23/24 机制与审计资料
  - 读取当前 30 秒样片数据表和 composition
  - 新建三表执行包 Markdown
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 源码
  - 修复当前视频
  - render 视频
  - 调用外部 API
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把当前 30 秒样片写成内容通过
  - 把三表完成写成 Codex 稳定 vlog 导演能力成立
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
output_file: 项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - video_metadata_probe_technical_only
  - required_key_terms_grep
  - table_count_check
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### required_reads_for_next_round

下一轮若继续处理当前 30 秒样片，必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`

### next_execution_gate

- 已确认：下一轮不得跳过 `hard_fail_summary`。
- 已确认：下一轮不得跳过 `next_fix_route`。
- 已确认：如果 `reference_layer`、`visual_selection_layer`、`event_layer`、`transition_layer` 或 `bgm_layer` 仍有 `triggered` / `needs_review`，不得直接进入 Remotion 参数修复。
- 已确认：只有当问题降级为具体执行参数，如 x/y、fontSize、SVG 尺寸、opacity、EndCard 排版时，才允许进入 `remotion_layer`。
- 已确认：本轮内容状态为 `three_tables_pack_completed_fix_pending`。
- 待验证：下一轮修复后仍需用户人工审看，不能由技术 metadata 代替内容验收。

## 本轮新增｜三表 P0 阻断项修正桥接

### route_decision

```yaml
task_type: three_tables_p0_blocker_resolution
true_goal: 修正 25 三表执行包暴露的 P0 阻断项，把 caption、sticker、transition、BGM marker 关系补到下一轮可判断执行的状态
source_pack: 项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md
output_file: 项目资料_docs/视频能力实验室_video_capability_lab/26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md
render_allowed_this_round: false
remotion_edit_allowed_this_round: false
file_change_scope: markdown_docs_only
allowed_actions:
  - 读取 25 三表执行包
  - 修正错误源码路径
  - 新建 26 P0 阻断项修正包
  - 读取 BGM marker JSON 并整理为 auto marker 对照表
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修改 Remotion 源码
  - 修改视频数据文件
  - render 视频
  - 调用外部 API
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把自动 marker 写成精准卡点
  - 把 P0 表层修正写成当前视频已修好
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - wrong_path_absent
  - p0_pack_required_terms_grep
  - table_count_check
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### required_reads_for_next_round

下一轮若继续当前 30 秒样片，必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`
3. `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
4. `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`

### next_execution_gate

- 已确认：下一轮是否允许进入 Remotion，由 `26` 的 `next_fix_route` 决定。
- 已确认：下一轮 Remotion 修复必须读取 `25` 和 `26`。
- 已确认：当前结论不是“允许直接进入 Remotion 修复”。
- 部分成立：下一轮可拆 `remotion_allowed_with_bgm_review_pending` 的有限实现，只处理 `26` 已明确的 caption/sticker 删改和非精准卡点转场关系。
- 仍阻断：BGM 精准卡点、PeakFlash 峰值、20.828s 后 marker source、render 后 frame-level review、用户人工审看。

## 本轮新增｜sticker_visual_fit_limited_remotion_fix 桥接

### route_decision

```yaml
task_type: sticker_visual_fit_limited_remotion_fix
true_goal: 补齐贴纸图形适配标准，并基于 25 + 26 做有限 Remotion 修复
render_allowed_this_round: true
remotion_edit_allowed_this_round: limited
allowed_actions:
  - 读取 25 和 26
  - 先补 sticker_visual_fit 机制
  - 更新 22 / 23 / 24 / 25 / 26
  - 修改当前 30 秒样片数据和当前 composition 的有限表现层
  - render limited fix 版
  - 生成 contact sheet
  - 生成 frame-level review Markdown
forbidden_actions:
  - 调用外部 API
  - 生成 AI sticker image
  - 安装大型依赖
  - 重做整条结构
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 写精准 BGM 卡点声明
  - 写内容通过声明
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
composition_id: 三十秒对标样片-30s-reference-sample
source_file: remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx
data_file: remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts
expected_status: limited_remotion_fix_rendered_pending_user_review
capability_status: vlog_director_capability_still_pending_multi_case_validation
expected_validation:
  - npx remotion compositions
  - npx remotion render
  - video-metadata-probe
  - contact_sheet_generated
  - frame_level_review_markdown
  - git diff --check
  - key_fields_grep
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### execution_rules

- 必须先读 `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` 和 `26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`。
- 必须先补 `sticker_visual_fit`、`graphic_role`、`color_fit`、`texture_fit`、`style_conflict`、`fail_sticker_graphic_mismatch`。
- 本轮允许有限 Remotion 修改，范围只限 caption / sticker 删改、贴纸轻视觉语气、scrapbook 重复文字删除和普通 cut/fade 关系保持。
- 本轮不允许精准 BGM 卡点声明。
- 本轮不允许内容通过声明。
- 下一轮必须读取 `27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md` 的 frame-level review。

### current_outputs

- 已确认：limited fix video 输出到 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample_limited_fix.mp4`，不得提交。
- 已确认：contact sheet 输出到 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_limited_fix.jpg`，不得提交。
- 已确认：frame-level review 报告为 `项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`。
- 已确认：BGM 仍未人工复听，PeakFlash 仍只能标 `rough_peak_candidate`。
- 当前内容状态：`limited_remotion_fix_rendered_pending_user_review`。

## 本轮新增｜reference_visual_language_replan 桥接

### route_decision

```yaml
task_type: reference_visual_language_replan
true_goal: 承认当前问题是贴纸 UI、字幕贴纸氛围、motion language、visual mood 和 BGM 依赖失败，而不是继续修位置
trigger_when:
  - 用户说位置没错但很丑
  - 用户说 UI 很丑
  - 用户说不像参考
  - 用户说气氛靠 BGM
render_allowed_this_round: false
remotion_edit_allowed_this_round: false
external_api_call_allowed_this_round: false
file_change_scope: markdown_docs_only
allowed_actions:
  - 读取 16/21/22/23/24/25/26/27
  - 读取当前 30 秒样片数据和 composition 作为事实背景
  - 新建对标视觉语言失败重判报告
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 直接调 x/y、fontSize、SVG 尺寸或贴纸数量
  - 修改 Remotion 源码
  - 修改视频数据文件
  - render 视频
  - 调用外部 API
  - 生成 sticker assets
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 写成视觉语言已解决
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
output_file: 项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md
expected_status: reference_structure_partial_ui_language_failed
next_status: reference_visual_language_to_asset_spec_pending
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - report_required_terms_grep
  - forbidden_status_grep
  - git diff --check
  - no_binary_artifacts_staged
  - commit_push_remote_head
```

### execution_rules

- 触发该 route 时，不得把问题降级成坐标、大小或数量修补。
- 第一判断必须是 `sticker_ui_layer`、`caption_atmosphere_layer`、`motion_language_layer`、`visual_mood_layer`、`bgm_dependency_layer`。
- 下一步优先进入 `reference_visual_language_to_asset_spec`，不是直接 render。
- pure code SVG/CSS 只能作为低复杂度标点路线，不作为默认主路线。
- `API-generated sticker pack` 只能作为补充路线，不能替代 sticker spec。

### required_reads_for_next_round

下一轮若继续当前 30 秒样片，必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`

### next_execution_gate

- 已确认：下一步不是继续让 Codex 用基础 SVG 硬画全部贴纸。
- 已确认：下一步不是继续位置微调。
- 已确认：下一步不是直接 render。
- 已确认：下一步应先形成 `reference_visual_language_to_asset_spec`。
- 待验证：完成 spec 后，才判断走 pure code SVG/CSS、导入手工 asset pack，还是补充 API-generated transparent sticker。

## 本轮新增｜reference_learning_execution_logic_cascade_refactor 桥接

### route_decision

```yaml
task_type: reference_learning_execution_logic_cascade_refactor
true_goal: 回审并修正对标学习执行逻辑的上游错误，建立 reference_judgement_library 并级联修正触发、流程、判断、反馈和路由
render_allowed_this_round: false
remotion_edit_allowed_this_round: false
external_api_call_allowed_this_round: false
sticker_asset_generation_allowed_this_round: false
file_change_scope: mechanism_docs + current_task + bridge + latest
allowed_actions:
  - 只读检查当前仓库事实
  - 新建 reference_judgement_library 机制文件
  - 新建全链路级联修正报告
  - 更新对标学习逻辑相关机制文件
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 修视频
  - render
  - 修改 Remotion 源码
  - 修改 Remotion 数据文件
  - 调用外部 API
  - 生成贴纸素材
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把 reference_judgement_library 写成充分完备
  - 把机制修正写成稳定 vlog 导演能力已成立
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
new_library_file: 项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md
cascade_report: 项目资料_docs/视频能力实验室_video_capability_lab/30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md
expected_status: reference_learning_logic_cascade_refactored_pending_validation
next_goal: reference_visual_language_to_asset_spec
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - required_terms_grep
  - staged_media_guard
  - remotion_diff_guard
  - git diff --check
  - commit_push_remote_head
```

### future_vlog_task_entry

所有未来 vlog demo、当前 30 秒样片修复、不同 BGM / 不同素材 / 不同参考视频任务，都必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`

未来执行顺序：

1. 读取 `reference_judgement_library`。
2. 判断本轮是否有新增对标视频。
3. 有新增对标视频：先更新判断库。
4. 无新增对标视频：使用已有判断库。
5. 再生成三张表。
6. 三张表过 `hard_fail_gate`。
7. 才允许 Remotion 执行。

### cascade_rules

- 不允许把“无新增对标视频”当作 blocked。
- 不允许每次从零学习。
- 不允许用当前参考覆盖历史判断库。
- 不允许没有判断库来源就编造 `reference_function`。
- 不允许伪造 `reference_timecode`。
- 旧的 `sticker_style_system_and_asset_pack_spec` 入口升级为 `reference_visual_language_to_asset_spec`。
- 新对标视频用于扩充和校准判断库，不是替代旧判断。

## 本轮新增｜reference_visual_language_to_asset_spec 桥接

### route_decision

```yaml
task_type: reference_visual_language_to_asset_spec
true_goal: 基于 reference_judgement_library 生成当前 30 秒样片的对标视觉语言到资产规格
render_allowed_this_round: false
remotion_edit_allowed_this_round: false
external_api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
new_reference_pack_this_round: false
judgement_source: library_derived
reference_timecode_policy: not_applicable_library_derived
file_change_scope: asset_spec_markdown + current_task + bridge + latest
allowed_actions:
  - 读取 16/21/22/23/24/25/26/27/28/29/30
  - 读取当前 30 秒样片数据和 composition 作为事实背景
  - 从 29 选择本轮适用判断
  - 新建 31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 生成资产
  - 生成视频
  - render
  - 修改 Remotion 源码
  - 修改 Remotion 数据文件
  - 调用外部 API
  - 下载或提交 sticker images
  - 安装依赖
  - 提交视频、图片、音频、dist、tmp 或 runtime assets
  - 把 31 写成资产已生成
  - 把 31 写成视觉语言已通过
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
output_file: 项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md
expected_content_status: asset_spec_completed_asset_generation_pending
capability_status: vlog_director_capability_still_pending_multi_case_validation
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - required_terms_grep
  - forbidden_status_grep_new_file
  - remotion_diff_guard
  - staged_media_guard
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### execution_rules

1. 必须先读 `29_对标判断库机制_reference_judgement_library.md`。
2. 必须确认本轮是否有新增对标视频。
3. 本轮无新增对标视频时，使用已有判断库生成规格，并标注 `library_derived`。
4. 本轮不得生成资产、不得 render、不得调用 API、不得修改 Remotion。
5. 下一轮实现必须读取 `31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`。
6. 不允许把 `31` 当成资产已生成。
7. 不允许把 `31` 当成视觉语言已通过。
8. 不允许把 `31` 固化成未来所有视频的通用贴纸模板。

### required_reads_for_next_round

下一轮若要整理本地资产包、实现纯代码 SVG 或生成 API 候选贴纸，必须先读：

1. `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
5. `项目资料_docs/视频能力实验室_video_capability_lab/26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`
6. `项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`

### next_execution_gate

- 已确认：下一步根据 `asset_route_decision` 决定本地资产包、纯代码 SVG 或 API 候选路线。
- 已确认：API 只能生成透明背景候选资产，不能绕过审美判断。
- 已确认：纯代码 SVG 只能用于低复杂度标点，并必须服从 `31` 的材质、颜色、大小、动效和失败规则。
- 待验证：`31` 能否转成真实资产并通过 frame review 和用户人审。

## 本轮新增｜API 贴纸候选前置 env 桥接

### route_decision

```yaml
task_type: api_sticker_env_setup
true_goal: 为后续 api_generated_sticker_candidate_probe 创建安全的本地 API key 填写入口
api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
env_example_path: .env.example
local_env_path: .env
expected_status: api_sticker_env_created_pending_user_key
file_change_scope: .gitignore + .env.example + current_task + bridge + latest + local .env ignored
allowed_actions:
  - 创建或更新 .env.example
  - 创建本地 .env 空占位文件
  - 确认 .env 被 .gitignore 忽略
  - 确认 .env.example 不被 .gitignore 忽略
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 调用外部 API
  - 生成 sticker candidates
  - 生成透明 PNG
  - 生成图片、视频或音频
  - 修改 Remotion 源码
  - 修改 Remotion 数据文件
  - render
  - 打印 .env 真实值
  - 提交 .env
  - 把 env 创建写成 API 可用
  - 把 env 创建写成贴纸候选已生成
  - 把 env 创建写成视频已修好
expected_validation:
  - workspace_identity_check
  - gitignore_env_check
  - env_example_not_ignored_check
  - env_not_staged_check
  - staged_secret_scan
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### execution_rules

1. `.env` 只作为本地 ignored key 文件，不进入 Git，不进入 remote verified 文件。
2. `.env.example` 只允许出现空 API key 占位和安全默认开关，不得出现真实 key。
3. 下一轮 `api_generated_sticker_candidate_probe` 必须先读取 `.env` 中 key 是否存在，但不得打印 key。
4. 下一轮即使调用 API，也只能生成候选贴纸，不得跳过 frame review 或用户人审。
5. 本轮不调用 API、不生成贴纸、不修视频、不 render。

### next_execution_gate

- 已确认：当前状态为 `api_sticker_env_created_pending_user_key`。
- 已确认：用户填 key 前不得进入真实 API probe。
- 待验证：用户是否已在本地 `.env` 填写任一 provider 的 API key。
- 待验证：智谱 AI / MiniMax / 阶跃星辰任一图片生成 provider 是否可用。

## 本轮新增｜API 单图贴纸候选探针结果

### route_decision

```yaml
task_type: api_generated_sticker_candidate_probe
true_goal: 真实连接图片模型并生成 1 张 paper_sound_tag 测试候选
provider: zhipu
model: glm-image
api_call_allowed_this_round: true
asset_generation_allowed_this_round: true
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
batch_generation_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
report_file: 项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md
local_output_path: tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01.png
candidate_status: generated_pending_user_review_with_self_check_failures
expected_content_status: api_sticker_single_candidate_generated_pending_user_review
allowed_actions:
  - 读取 .env 的 provider、model、key 存在状态
  - 按 zhipu provider 调用 1 次图片生成 API
  - 生成 1 张 paper_sound_tag 测试候选
  - 保存到 ignored 本地 tmp 目录
  - 创建 32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 打印 API key
  - 提交 .env
  - 提交图片、视频、音频、tmp、dist 或 runtime assets
  - 批量生成贴纸
  - 修改 Remotion 源码
  - 修改 Remotion 数据文件
  - render 视频
  - 把候选写成资产已通过
  - 把 API 跑通写成视觉语言通过
  - 把候选存在写成用户已认可
expected_validation:
  - workspace_identity_check
  - env_ignored_check
  - output_ignored_check
  - image_file_check
  - report_required_terms_check
  - no_env_or_image_staged
  - staged_secret_scan
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### execution_result

- 已确认：本轮只发起 1 次图片生成请求。
- 已确认：API 返回图片 URL，并已保存到 ignored 本地目录。
- 已确认：本轮未提交图片，未提交 `.env`。
- 已确认：本轮候选图尺寸为 `1280x1280`。
- 已确认：本轮候选图保存为 PNG，但无 alpha 通道。
- 部分成立：候选有纸贴轮廓、软边、暖纸色和灰咖文字。
- 已确认：候选右下角可见 `AI生成` 标识，不能直接作为合格贴纸资产。
- 已确认：候选背景不透明，仍需背景去除或重新生成透明背景候选。

### next_execution_gate

下一轮不得直接接 Remotion。必须先由用户人审该候选，并决定：

1. 接受方向后做背景去除 / 去标识后处理。
2. 修改 prompt 重新单图或小批量生成。
3. 更换 provider 或模型。
4. 放弃 API 候选，回到 `local_asset_pack` 或 `pure_code_svg`。

## 本轮新增｜无水印图片生成 provider gate

### route_decision

```yaml
task_type: watermark_free_image_policy_config
true_goal: 把 no watermark / no generated label 升级为未来贴纸候选硬门槛
api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
policy_config_file: 配置_configs/图片生成策略_image_generation_policy.json
policy_report_file: 项目资料_docs/视频能力实验室_video_capability_lab/33_无水印图片生成配置修正_watermark_free_image_policy_config.md
source_probe_report: 项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md
expected_status: watermark_policy_config_updated_no_new_asset
allowed_actions:
  - 新增图片生成策略配置
  - 更新 .env.example 的无水印策略字段
  - 更新 32 报告的 post_probe_policy_update
  - 更新当前任务、执行桥接包和最新摘要
forbidden_actions:
  - 调用外部 API
  - 生成新图片
  - 去水印
  - 裁切或修补已有水印
  - 修改 Remotion 源码或数据
  - render 视频
  - 提交 .env、图片、视频、音频、tmp、dist 或 runtime assets
  - 把配置修正写成 provider 已可用
  - 把无水印要求写成后处理去水印
expected_validation:
  - workspace_identity_check
  - required_report_32_exists
  - policy_json_valid
  - required_policy_terms_grep
  - no_api_or_generated_asset_this_round
  - no_env_or_media_staged
  - staged_secret_scan
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### future_provider_gate

未来进入正式 `sticker_candidate` 的图片 provider / model 必须满足：

1. `require_no_watermark=true`
2. `require_no_generated_label=true`
3. `require_no_logo=true`
4. `require_no_brand_mark=true`
5. `require_transparent_background_or_clean_background_for_cutout=true`

### provider_route_decision

| provider_model | status | allowed_for_sticker_candidate | allowed_for_connection_test | reason |
|---|---|---:|---:|---|
| `zhipu + glm-image` | `connection_probe_only` | `false` | `true` | `32` 显示候选图无 alpha 通道且右下角可见 `AI生成` 标识。 |

### rejection_rules

- 已确认：带水印输出必须 `reject_candidate`。
- 已确认：带 `AI生成` 或其他 generated label 的输出必须 `reject_candidate`。
- 已确认：带 logo / brand mark 的输出必须 `reject_candidate`。
- 已确认：不得把去水印、裁水印或 inpaint 水印作为默认方案。
- 已确认：无水印 provider 未验证前，不允许批量生成候选，也不得接入 Remotion。

### next_execution_gate

下一轮目标为 `watermark_free_provider_probe`。只有 provider / model 通过 no watermark、no generated label、no logo / brand mark、transparent PNG 或 clean cutout source 检查后，才允许进入批量候选或 frame review。

## 本轮新增｜贴纸人审反馈与参考风格重判桥接

### route_decision

```yaml
task_type: sticker_user_review_reference_style_replan
true_goal: 把用户对阿里单图候选的最新人审反馈落库，并将 sticker 主路线改为原创手绘反应贴纸系统
source_candidate_task: alibaba_image_contract_and_watermark_free_sticker_probe
previous_candidate_status: watermark_free_single_candidate_generated_pending_user_review
current_candidate_status: alibaba_candidate_user_review_style_mismatch_not_remotion_ready
route_revision: paper_sound_tag_api_generated_candidate_to_hand_drawn_reaction_sticker_system
api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
new_report_file: 项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md
updated_files:
  - 项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/37_阿里图片Provider探针报告_alibaba_image_provider_probe_report.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md
  - 执行日志_codex_log/最新摘要_latest.md
expected_validation:
  - workspace_identity_check
  - required_files_exist
  - report_required_terms_grep
  - no_approved_status_for_alibaba_candidate
  - remotion_diff_guard
  - no_api_or_generated_asset_this_round
  - no_env_or_media_staged
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### user_review_result

- user_review_quote: `我们要的是贴纸，这个是对标视频上面的，我们要的也是类似这种。`
- 已确认：阿里单图候选未见明显水印 / `AI生成` 标识 / logo / brand mark，但用户人审认为风格方向不匹配。
- 已确认：当前候选是 `paper_sound_tag（纸感拟声标签）` 路线，不是用户要的对标视频反应贴纸路线。
- 已确认：当前候选不得接入 Remotion，不得写成 `sticker asset approved`。
- 部分成立：阿里路线可保留为 future image provider 候选，但当前这张图不能作为贴纸资产通过。

### revised_sticker_system

下一轮主线为 `hand_drawn_reaction_sticker_system（手绘反应贴纸系统）`，优先验证：

1. `black_white_reaction_mark（黑白反应标记）`：黑色主体线条 / 小块面 + 厚白描边，用于动作点、情绪点、轻喜剧反应。
2. `yellow_attention_burst（黄色注意力爆点）`：3 个左右不规则黄色短笔触，用于提示主体动作或注意力切换。

### next_execution_gate

- 下一轮目标：`remotion_svg_reaction_sticker_probe（Remotion SVG 反应贴纸组件探针）`。
- 下一轮允许范围：小范围原创 SVG / Remotion vector component probe。
- 下一轮不得复制第三方截图贴纸原图，只能抽象视觉机制。
- 下一轮不得继续 API 图片抽卡作为主线。
- 下一轮不得把 `paper_sound_tag（纸感拟声标签）` 继续作为唯一优先 sticker 目标。
- 下一轮即使进入 Remotion probe，也只能验证组件，不得写成当前视频已修好或视觉语言已通过。

## 本轮新增｜对标视频贴纸锚点审计桥接

### route_decision

```yaml
task_type: reference_video_sticker_anchor_audit
true_goal: 从唯一对标视频中审计贴纸如何绑定视频主体、动作、物件和留白，避免把贴纸固化成固定组件模板
selected_reference_video: 素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4
selected_reference_id: new_ref_06
selected_candidate_id: candidate_08
selected_route: video_anchor_driven_sticker_system
previous_next_goal: remotion_svg_reaction_sticker_probe
revised_next_goal: video_anchor_driven_sticker_system_spec_before_remotion_probe
api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
new_report_file: 项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md
updated_files:
  - 项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md
  - 执行日志_codex_log/最新摘要_latest.md
expected_validation:
  - workspace_identity_check
  - selected_reference_video_probe
  - report_required_terms_grep
  - no_api_or_generated_asset_this_round
  - remotion_diff_guard
  - no_env_or_media_staged
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### anchor_audit_result

- 已确认：主对标视频为 `candidate_08 / new_ref_06`。
- 已确认：该视频连续出现动物、饮品、冰淇淋、瓶身、票据、玩具车等不同主体上的贴纸锚点。
- 已确认：贴纸不应被理解成固定 `black_white_reaction_mark` / `yellow_attention_burst` 两类模板。
- 部分成立：黑白反应标记和黄色注意力爆点仍可作为 event-derived result，但必须由镜头锚点决定。
- 已确认：新的上层路线为 `video_anchor_driven_sticker_system（视频锚点驱动贴纸系统）`。

### next_execution_gate

- 下一轮目标：`video_anchor_driven_sticker_system_spec_before_remotion_probe`。
- 下一轮必须先建立目标样片的 `sticker_anchor_event_table`。
- 每个 sticker event 必须写 `shot_id`、`timecode`、`anchor_target`、`anchor_reason`、`sticker_role`、`shape_derived_from_event`、`placement_relation` 和 `copy_risk`。
- 禁止直接把所有镜头套用两类固定贴纸组件。
- 禁止复制第三方贴纸原图、平台 UI、原字体、原文案、包装或账号信息。
- 进入 Remotion probe 后必须抽 start / mid / exit frames 做 frame-level review。

## 本轮新增｜目标样片贴纸锚点事件表与执行机制桥接

### route_decision

```yaml
task_type: video_anchor_driven_sticker_system_spec_before_remotion_probe
true_goal: 为目标样片建立 sticker_anchor_event_table，并补齐进入 Remotion probe 前的视频锚点驱动贴纸机制
target_sample: 三十秒对标样片-30s-reference-sample
target_sample_source: project_tables_and_prior_frame_review
source_reference_audit: 项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md
new_report_file: 项目资料_docs/视频能力实验室_video_capability_lab/41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md
content_status: target_sample_sticker_anchor_event_system_completed_pending_gpt_review
capability_status: vlog_director_capability_still_pending_multi_case_validation
sticker_anchor_event_count: 10
sticker_needed_true_count: 5
sticker_needed_false_count: 5
api_call_allowed_this_round: false
asset_generation_allowed_this_round: false
remotion_edit_allowed_this_round: false
render_allowed_this_round: false
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
updated_files:
  - 项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md
  - 项目资料_docs/视频能力实验室_video_capability_lab/41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md
  - 执行日志_codex_log/最新摘要_latest.md
expected_validation:
  - workspace_identity_check
  - required_files_read
  - report_required_sections_grep
  - no_api_call
  - no_remotion_edit
  - no_render
  - no_env_or_media_staged
  - git_diff_check
  - path_limited_stage
  - commit_push_remote_head
```

### allowed_actions

- 新建 `41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md`。
- 更新 `02_当前任务_current_task.md`、`03_Codex执行桥接包_codex_execution_bridge.md`、`执行日志_codex_log/最新摘要_latest.md`。
- 只读取目标样片相关项目表、已有 frame review 和本地视频技术探针结果。

### forbidden_actions

- 禁止调用图片 API 或任何外部生成 provider。
- 禁止生成新贴纸图。
- 禁止修改 Remotion 源码或数据。
- 禁止 render 视频。
- 禁止提交 `.env`、`tmp/`、`dist/`、视频、图片、音频、抽帧或 runtime assets。
- 禁止把 `black_white_reaction_mark` / `yellow_attention_burst` 写成所有视频通用固定组件。
- 禁止把本轮机制规格写成贴纸系统已验证或视觉语言已通过。

### judgement_standards

- `anchor_validity`: 有明确对象、动作、轨迹、留白或切点；没有锚点就不贴。
- `role_fit`: 贴纸作用必须和锚点匹配，不能为了装饰而贴。
- `shape_event_fit`: 形状必须来自动作、物件、情绪或画面关系。
- `placement_fit`: 不压脸、不挡动作、不抢字幕，与主体保持合理呼吸距离。
- `motion_fit`: 动效服务事件；BGM 未人工复听前不得写精准卡点。
- `copy_risk_safe`: 不复制对标贴纸原图、平台 UI、品牌、包装、原字形、原文案。
- `human_feel_pass`: 必须像自然贴上去的情绪标点，不像 PPT 图标、儿童模板、电商爆炸贴或工程 SVG 展示。

### failure_feedback_routing

- `fail_no_video_anchor`: 回到镜头选择；该镜头不贴或换锚点。
- `fail_wrong_sticker_role`: 回到 `sticker_role_taxonomy` 重选作用。
- `fail_fixed_template_usage`: 回到 `shape_derived_from_event`，禁止继续复用两个固定贴纸。
- `fail_bad_placement`: 回到 `placement_relation`，检查压脸、挡动作、抢字幕、贴空处。
- `fail_motion_not_event_based`: 回到 `motion_rule` 和 `duration_rule`。
- `fail_copy_reference_asset`: 抽象机制并重画原创形状。
- `fail_visual_clutter`: 减少贴纸、缩短时长、改成字幕或不贴。
- `fail_frame_review_mismatch`: 回到单个 event，不重写全系统。
- `fail_user_review_style_mismatch`: 回到 reference audit 和 style abstraction，需要 GPT 回审。
- `fail_remotion_technical_error`: 只修组件实现，不改机制判断或素材事实。

### remotion_entry_gate

- 至少有 3 个 `sticker_needed=true` 事件。
- 每个事件都有完整锚点、作用、形状、位置、动效、持续时间和复制风险字段。
- 每个事件都能转成原创 SVG / Remotion vector。
- 没有复制第三方贴纸资产。
- 用户或 GPT 已回审 `41`。
- 下一轮 Remotion probe 只允许小范围组件验证，不能写成视频已修好。

### next_goal

`gpt_review_target_sample_sticker_anchor_event_system`
