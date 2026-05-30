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
7. `项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md`
8. `项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md`
9. `项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md`
10. `执行日志_codex_log/最新摘要_latest.md`

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
