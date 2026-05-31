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

## 本轮新增｜工具链补齐与真实意图澄清闸门

- 已确认：Node.js / npm / FFmpeg / ffprobe / Python 工具链已检测。
- 已确认：Remotion 依赖已安装到当前仓库，未全局安装。
- 已确认：`.venv` 中 `librosa`、`numpy`、`scipy`、`soundfile` 可 import。
- 已确认：真实意图澄清闸门已进入系统机制源文件和 GPT Project 配合机制上传包。
- 已确认：本轮未生成视频，未调用外部 API，未提交 `.venv` 或 `node_modules`。
- 待验证：Remotion 多组件 demo 是否通过真实回审。
- 待验证：真实 BGM beat_map 是否通过真实音乐 probe。

## 本轮新增｜Remotion 多组件能力证明 demo v1 回审

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 部分成立：用户描述素材路径为 `素材-剪辑素材`，当前仓库实际路径为 `素材/剪辑素材`。
- 已确认：`素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` 有音轨，已提取为本地运行音频。
- 已确认：`素材/剪辑素材/剪辑` 下 4 个剪辑素材均可读取和 decode。
- 已确认：BGM marker 已生成：beat 16、onset 20、rms_peak 12。
- 部分成立：BGM beat_map quality 仍是自动粗 marker，未人工复听确认，不是精准 beat tracking。
- 已确认：Remotion v1 composition id 为 `能力证明Demo-capability-demo`，原因是 Remotion 不允许 composition id 使用 `_`。
- 已确认：Remotion v1 12 秒竖屏 demo render 成功，技术元数据为 1080x1920 / 30fps / h264 / AAC stereo。
- 已确认：v1 contact sheet 已生成；手写字节奏层、分屏 collage、标题叠画面、自有 CTA end card 均出现。
- 已确认：用户人审反馈为：`效果还行，但不是我想要的那种`。
- 已确认：用户人审反馈覆盖 Codex 原自评。
- 当前最终判断已降级为：`technical_pass_content_mismatch`。
- 已确认：v1 只能作为技术链路证明，不能作为审美方向通过。

## 本轮新增｜demo 不合格审美标准与 v2 方向

- 已确认：新增审美回审文件：`项目资料_docs/视频能力实验室_video_capability_lab/15_demo审美回审与v2方向_aesthetic_review_retarget.md`。
- 已确认：不合格标准覆盖内部项目语言、组件展示感、网页 / PPT / 卡片感、无故事情绪、overlay 抢主体、分屏太久、项目管理尾卡、未人工复听却宣称精准卡点、复刻参考资产。
- 已确认：v2 下一个目标为 `demo_v2_aesthetic_retarget`。
- 待验证：v2 demo 是否方向对，必须等待用户人审。
- 已确认：未经用户确认 v2 方向对，不得写 `pass_continue_to_mechanism_design`。

## 本轮新增｜审美重定 Demo v2 本地 render

- 已确认：新增 v2 composition id 为 `审美重定Demo-aesthetic-retarget-demo`。
- 已确认：保留 v1 composition `能力证明Demo-capability-demo`，未删除。
- 已确认：v2 本地 demo 已 render：`dist/remotion_demo_审美重定_aesthetic_retarget/demo_v2.mp4`。
- 已确认：v2 contact sheet 已生成：`dist/remotion_demo_审美重定_aesthetic_retarget/contact_sheet_v2.jpg`。
- 已确认：v2 技术元数据为 12.053333s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed。
- 已确认：v2 源码不使用 v1 的内部验收式 overlay 文案。
- 已确认：本轮未调用外部 API，未提交视频、图片、音频、runtime assets 或原始素材。
- 当前 v2 内容状态：`rendered_pending_user_review`。
- 待验证：v2 是否方向对，仍需用户人审。

## 本轮新增｜10 个新参考视频审美解析

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 部分成立：用户口述路径为 `素材-vlog 参考-新参考+解析`，仓库真实路径为 `素材/vlog 参考/新参考+解析`。
- 已确认：真实路径下正好有 10 个 `.MP4` 参考视频。
- 已确认：10 个视频均可 `ffprobe` 读取，均可 `ffmpeg` 解码，均有 AAC stereo 音轨。
- 已确认：本轮报告为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：本轮只生成 Markdown 报告和项目状态更新；未生成 v2 demo，未训练模型，未调用外部 API。
- 已确认：临时 contact sheet 位于 `tmp/new_reference_aesthetic_analysis/contact_sheets/`，属于 ignored 临时观察产物，不得提交。
- 已确认：合格审美标准已落成规则：真实镜头先行、1.5-3 秒微段落、情绪词 overlay、motif 回环、黑底 scrapbook 呼吸、自有尾卡收束。
- 已确认：不合格审美标准已落成 hard fail：内部项目语言、PPT/card 感、组件展示、无 motif、overlay 过载、长时间 layout、平台/品牌复刻、把音轨存在写成精准卡点。
- completed_remote_verified: 已确认：本轮报告、当前任务、执行桥接包和 latest 已进入 commit / push / remote HEAD readback 闭环；最终 commit SHA 以 Codex final 回报为准。
- 待验证：下一轮 v2 内容方向必须基于新报告另行生成并等待用户人审。
- 待验证：音乐卡点仍未做人耳复听或 beat tracking。

## 下一个目标

基于 `16_新参考包审美解析_new_reference_aesthetic_pack.md` 设计或执行下一轮 `demo_v2_reference_retarget`。只有用户确认新的 v2 方向对，才允许进入机制设计。

## 仍待确认

- 新项目中文名是否最终锁定为：视频能力实验室｜Codex 视频导演能力库。
- 待验证：基于新参考包规则生成的下一轮 v2 是否通过用户人审。
- 待验证：marker quality 是否需要人工复听闸门和 publish-grade 标准。
- 待验证：后续是否需要把 runtime asset 准备过程脚本化。
- 是否需要为 GPT Project 上传包额外生成本地 zip。
