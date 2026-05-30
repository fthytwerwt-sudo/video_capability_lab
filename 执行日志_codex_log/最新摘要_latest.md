# 最新摘要

## 当前状态

- 已确认：video_capability_lab 仓库完成三层协作骨架初始化。
- 已确认：GPT Project 上传包只承载配合机制，不承载项目事实。
- 已确认：GitHub 仓库是项目事实源。
- 已确认：Codex 是执行落库层。
- 已确认：每轮 Codex 任务执行完必须 push 到仓库。
- 待验证：Remotion 手写字节奏层。
- 待验证：HyperFrames apple glass 卡片。
- 待验证：BGM beat_map 卡点管线。
- 待验证：10-15 秒技术样片导出能力。

## 本轮完成

- AGENTS.md 已创建。
- 项目机制源文件已创建。
- GPT Project 配合机制上传包已创建。
- 项目事实入口文件已创建。
- Codex 执行标准文件已创建。
- 同步脚本和验证脚本已创建。
- 验证已运行。
- commit 和 push 已完成。

## 本轮新增｜修正 video_capability_lab 工作目录规则

- 已确认：`video_capability_lab` 位于用户现有的 `vlog、odd` 文件夹内部。
- 已确认：当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：Codex 不得在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab`。
- 已确认：Codex 不得跑出 `vlog、odd` 文件夹执行本项目任务。
- 已确认：路径不明确、候选不唯一或 remote 不匹配时，必须 blocked，不得猜。
- 已确认：当前 GitHub 仓库仍必须是 `fthytwerwt-sudo/video_capability_lab`。

## 本轮新增｜电商项目 AGENTS 通用机制审计

- 已确认：本轮只读取电商项目 `AGENTS.md` 作为机制参考。
- 已确认：未读取或迁移 `first-station` 项目内容。
- 已确认：只迁移 GPT Project 上传包纪律、GitHub 事实源优先、GPT / Codex 分工、状态标记和“下一个目标”口径等通用机制。
- 已确认：电商项目业务目标、商品池、指标链路、商品测试和业务验收结果不得迁入本项目。
- 待验证：后续 Codex 任务是否稳定触发本轮补强规则。

## 本轮新增｜GPT Project 上传包同步补齐

- 已确认：已检查上一轮“电商项目 AGENTS 通用机制审计”是否需要进入 GPT Project 上传包。
- 已确认：`AGENTS.md` 本身不进入 GPT Project 上传包。
- 已确认：项目事实不进入 GPT Project 上传包。
- 已确认：需要长期生效的通用协作机制已抽象进 `项目资料_docs/系统协议_system/` 并同步到上传包。
- 已确认：上传包只承载配合机制，不承载项目事实。
- 待验证：用户是否已将最新上传包重新上传到 GPT Project。

## 本轮新增｜文件命名中文+英文硬规则

- 已确认：Codex 后续新建自定义文件和目录，必须默认使用中文+英文命名。
- 已确认：推荐格式为 `中文说明_english_slug.ext`。
- 已确认：工具强制约定文件名可以保留原名，但必须说明原因。
- 已确认：不知道怎么命名时，必须先问或标 `待确认`，不得随便创建纯英文文件名。
- 已确认：该规则已同步到输出硬规则和 GPT Project 配合机制上传包。

## 本轮新增｜vlog reference_analysis 轻量报告

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 部分成立：用户执行单中的 `/Users/fan/Documents/video_capability_lab` 在本机不存在；当前仓库规则已确认不得在 `/Users/fan/Documents/` 下另建同名目录。
- 部分成立：执行单写 `素材-vlog 参考`，当前仓库实际素材目录为 `素材/vlog 参考`。
- 已确认：`素材/vlog 参考` 下正好有 2 个视频：`01.MP4`、`02.MP4`。
- 已确认：本轮产物为 `项目资料_docs/视频能力实验室_video_capability_lab/11_vlog参考视频解析_vlog_reference_analysis.md`。
- 已确认：本轮只提交轻量 Markdown 文档，不提交视频、图片、音频、抽帧、contact sheet 或运行输出。
- 已确认：本轮按项目规则进行 path-limited stage、commit、push 和 remote HEAD readback；具体 commit SHA 以本轮最终回报为准。
- 待验证：Remotion 手写字节奏层、Remotion 分屏 collage、自有 CTA end card 和 BGM beat_map 仍需下一轮 component_probe。

## 本轮新增｜BGM beat_map 工具链体检

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：FFmpeg / ffprobe 可运行，版本为 `8.1`。
- 已确认：项目本地 `.venv` 已创建；未全局安装，未使用 sudo，未调用外部 API。
- 已确认：`librosa 0.11.0`、`numpy 2.0.2`、`scipy 1.13.1`、`soundfile 0.13.1` 已安装到 `.venv` 并通过 import test。
- 已确认：synthetic audio test 已通过，estimated_tempo 为 `117.454`，beat_count 为 `7`。
- 部分成立：audio toolchain 已具备进入下一轮 BGM beat_map probe 的基础条件。
- 待验证：真实 BGM beat_map 仍未验证，不得写成能力成立。
- 已确认：`.venv` 已加入 `.gitignore`，本轮不提交 `.venv`、音频、视频、图片或运行输出。
- 已确认：检测脚本为 `脚本_scripts/检查音频卡点工具链_check_audio_beat_toolchain.py`。
- 已确认：依赖记录为 `依赖_requirements/音频分析_audio_analysis_requirements.txt`。
- 已确认：检测报告为 `项目资料_docs/视频能力实验室_video_capability_lab/12_音频卡点工具链检测_audio_beat_toolchain_check.md`。

## 下一个目标

进入 `BGM beat_map probe（音乐卡点能力探针）`，使用真实 BGM 或从 `素材/vlog 参考` 提取音频生成可回审 `beat_map` / `onset_map` / `rms_peaks`。

## 仍待确认

- 新项目中文名是否最终锁定为：视频能力实验室｜Codex 视频导演能力库。
- 下一轮 `BGM beat_map probe` 使用用户指定真实 BGM，还是从现有 `01.MP4` / `02.MP4` 提取音频。
- 下一轮是否允许提交 JSON / PNG review artifacts，或只提交 Markdown 检测报告。
- 是否需要为 GPT Project 上传包额外生成本地 zip。
