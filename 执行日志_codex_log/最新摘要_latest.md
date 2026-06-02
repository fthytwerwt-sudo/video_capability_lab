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

## 本轮新增｜通用贴纸视觉语言机制补全

- 已确认：用户本轮要求不围绕单个 18 秒候选视频、单个风格板或单个贴纸候选，而是把贴纸视觉语言补成后续所有 vlog / odd / 对标样片可复用的机制系统。
- 已确认：本轮任务为 `universal_sticker_visual_language_mechanism_completion`。
- 已确认：新增通用机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md`。
- 已确认：`44` 把 `43` 的失败层升级成通用中间层：`shape_layer` 对应 `shape_grammar`，`stroke_layer` 对应 `stroke_outline_system`，`visual_material_feel` 对应 `material_compositing_rule`，`placement / integration` 对应 `sticker_attachment_relation` + `scale_distance_rule`，`human_feel` 对应 `style_sheet_acceptance_gate` + `judgement_standards`。
- 已确认：`44` 已补齐六个关键中间层：`shape_grammar`、`stroke_outline_system`、`scale_distance_rule`、`reaction_motion_signature`、`material_compositing_rule`、`style_sheet_acceptance_gate`。
- 已确认：`44` 同时包含 `execution_flow`、`sticker_attachment_relation`、`judgement_standards`、`failure_feedback_routing`、`next_execution_bridge` 和 `do_not_claim`。
- 已确认：本轮没有修改 Remotion，没有 render，没有调用图片 / 视频 / 音频 API，没有生成贴纸图或风格板图片，没有提交视频、图片、音频、抽帧、`tmp/`、`dist/` 或 runtime assets。
- 当前状态：`universal_sticker_visual_language_mechanism_completed_pending_gpt_review`。
- mechanism_status: `universal_sticker_visual_language_mechanism_completed_pending_probe_validation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 下一目标：`gpt_review_universal_sticker_visual_language_mechanism`。
- 回审通过后的执行桥接：`sticker_attachment_relation_style_sheet_probe（贴纸附属关系风格板探针）`，先做 3 个代表性候选镜头的 2-3 个静态方案，不直接重改视频。
- 待验证：`44` 仍需 GPT / 用户回审和后续风格板探针验证；不得把机制文件存在写成贴纸系统或 vlog director capability 已验证。

## 本轮新增｜18 秒候选与对标贴纸差距审计

- 已确认：用户人审反馈为：`我看了贴纸，没得啊，和之前比就是锚点更清晰了，但是还是和对标视频的差距很大啊。`
- 已确认：本轮任务为 `sticker_visual_gap_audit`，只做差距审计，不修改 Remotion，不重新 render，不调用 API，不生成新贴纸图。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/43_十八秒候选与对标贴纸差距审计_18s_candidate_reference_sticker_gap_audit.md`。
- 已确认：候选视频为 `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4`，技术验证通过：`18.048000s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true`。
- 已确认：对标视频为 `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`，技术验证通过：`25.911995s / 720x1280 / 60fps / h264 / AAC stereo / decodable=true`。
- 已确认：本轮临时抽取候选贴纸帧 `12` 张、对标贴纸机制参考帧 `14` 张，均位于 ignored `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/`，不提交。
- 部分成立：锚点层更清楚，4 个候选贴纸事件均能回到 `41`。
- 已确认：主失败层不是继续加锚点，而是 `shape_layer`、`stroke_layer`、`visual_material_feel`、`placement / integration` 和 `human_feel`；当前贴纸仍像 Remotion / SVG 组件展示，不像对标视频里自然附着在主体、物件和动作旁边的反应贴纸。
- 下一目标：`gpt_review_18s_candidate_sticker_gap_audit`。
- 推荐下一路线：`sticker_style_sheet_probe`，先做贴纸风格板探针，不直接重改 18 秒候选。
- 待验证：43 报告需 GPT / 用户回审；不得声明贴纸通过、视觉语言通过、视频已修好或 vlog director capability verified。

## 本轮新增｜18 秒锚点贴纸审片候选

- 已确认：本轮任务为 `remotion_18s_anchor_sticker_review_candidate`。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/42_十八秒锚点贴纸正片候选报告_18s_anchor_sticker_candidate_report.md`。
- 已确认：新增 Remotion composition 为 `十八秒锚点贴纸候选-18s-anchor-sticker-candidate`，source 文件为 `remotion/组合_compositions/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.tsx`。
- 已确认：新增数据文件为 `remotion/数据_data/十八秒锚点贴纸事件_18s_anchor_sticker_events.ts`，其中每个镜头标注 `stickerPolicy`，每个贴纸保留 `sourceShotId`、`anchorTarget` 和 start / mid / exit review seconds。
- 已确认：本地候选已 render 到 `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4`，该路径是 ignored runtime，不提交。
- 已确认：技术元数据为 `1080x1920 / 30fps / h264 / AAC stereo / 18.000000s video stream / 18.048000s audio+container`，完整解码通过。
- 已确认：本轮包含 4 个来自 `41` 的贴纸事件：`shot_01_panda_open_arrow`、`shot_03_bamboo_hide_circle`、`shot_04_sand_trace_wave`、`shot_05_panda_bite_tag`。
- 已确认：本轮包含多个 no-sticker shots，不为了凑数量硬贴。
- 部分成立：Codex 本地 frame review 已生成 12 张 start / mid / exit 帧和 contact sheet，并修复首次发现的 `shot_04` / `shot_05` exit 跨镜头问题。
- 已确认：本轮未调用任何图片 / 视频 / 音频 API，未生成第三方贴纸图，未提交视频、图片、音频、抽帧、`tmp/`、`dist/`、runtime assets 或 `.env`。
- 当前状态：`18s_anchor_sticker_review_candidate_rendered_pending_user_review`。
- 待验证：视觉语言通过、贴纸机制通过、vlog director capability verified、precise beat sync 均不得声明成立。
- 下一个目标：用户 / GPT 回审 18 秒候选视频和 start / mid / exit contact sheet。

## 本轮新增｜目标样片贴纸锚点事件表与执行机制

- 已确认：用户纠偏为“贴纸不是每个视频都一样，而是根据视频锚点来”。
- 已确认：本轮任务为 `video_anchor_driven_sticker_system_spec_before_remotion_probe`。
- 已确认：本轮新增文件为 `项目资料_docs/视频能力实验室_video_capability_lab/41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md`。
- 已确认：`41` 的目标样片来源为 `project_tables_and_prior_frame_review`，主要读取 `25/26/27/31/40`，没有新增抽帧或 render。
- 已确认：`41` 建立了 10 个贴纸锚点候选事件，其中 `sticker_needed=true` 为 5 个，`sticker_needed=false` 为 5 个。
- 已确认：本轮没有调用 API、没有生成贴纸、没有修改 Remotion、没有 render、没有提交视频/图片/音频/tmp/dist/runtime assets。
- 下一目标：`gpt_review_target_sample_sticker_anchor_event_system`，先回审 `41`，不是直接进入 Remotion。

## 本轮新增｜对标视频贴纸锚点审计

- 已确认：本轮任务为 `reference_video_sticker_anchor_audit`。
- 已确认：主对标视频收敛为 `candidate_08 / new_ref_06`，路径是 `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`。
- 已确认：`video-metadata-probe` 通过，技术事实为 `25.911995s / 720x1280 / 60fps / h264 / AAC stereo / decodable=true`。
- 已确认：本轮新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md`。
- 已确认：贴纸主路线从固定 `hand_drawn_reaction_sticker_system` 上提为 `video_anchor_driven_sticker_system`，即先判断镜头主体、动作、物件和留白，再决定贴纸形态、位置和功能。
- 部分成立：`black_white_reaction_mark` 与 `yellow_attention_burst` 仍可作为结果，但不能作为所有镜头固定模板。
- 已确认：本轮没有生成贴纸、没有调用图片 API、没有修改 Remotion、没有 render、没有提交视频/图片/音频/tmp/runtime assets。
- 下一个目标：`video_anchor_driven_sticker_system_spec_before_remotion_probe`，先建立目标样片的 `sticker_anchor_event_table`，再进入原创 SVG / Remotion vector 小范围 probe。

## 本轮新增｜贴纸人审反馈与参考风格重判

- 已确认：用户人审阿里单图候选后反馈：`我们要的是贴纸，这个是对标视频上面的，我们要的也是类似这种。`
- 已确认：阿里候选未见明显水印、`AI生成` 标识、logo 或 brand mark，但这不等于贴纸风格通过。
- 已确认：当前候选状态从 `watermark_free_single_candidate_generated_pending_user_review` 降级为 `alibaba_candidate_user_review_style_mismatch_not_remotion_ready`。
- 已确认：当前问题不是 provider 没跑通，而是 sticker 目标理解错位；用户要的是手绘反应符号 / 视觉情绪标点，不是纸签拟声字图。
- 已确认：当前阿里候选不得接入 Remotion，不得写成 `sticker asset approved`。
- 已确认：本轮新增重判报告为 `项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md`。
- 已确认：`31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md` 已追加 addendum，新增 `black_white_reaction_mark（黑白反应标记）` 与 `yellow_attention_burst（黄色注意力爆点）` 两类资产方向。
- 下一个目标：`remotion_svg_reaction_sticker_probe（Remotion SVG 反应贴纸组件探针）`，优先用原创 SVG / Remotion vector 组件验证手绘反应贴纸系统，不继续 API 图片抽卡。

## 本轮新增｜阿里图片 API env setup

- 已确认：用户要求从 MiniMax key 阻断路线切换到阿里图片 API 路线。
- 已确认：本轮任务为 `alibaba_image_env_setup`，真实目标是建立本地 `.env` 填写入口，等待用户手动填写 `DASHSCOPE_API_KEY`。
- 已确认：`.env.example` 已加入 Alibaba / DashScope 图片 API 字段；模板不包含真实 key。
- 已确认：ignored 本地 `.env` 已补齐同名字段；`.env` 不提交 Git，不打印真实值。
- 已确认：`配置_configs/图片生成策略_image_generation_policy.json` 已新增 `alibaba_dashscope` provider route，状态为 `env_prepared_pending_user_key`。
- 已确认：新增说明文件为 `项目资料_docs/视频能力实验室_video_capability_lab/36_阿里图片API环境变量配置_alibaba_image_env_setup.md`。
- 已确认：本轮未调用阿里 API，未调用任何图片生成 API，未生成图片，未修改 Remotion，未 render。
- 待验证：阿里图片 API 的 endpoint、model、请求字段、返回字段、无水印能力、透明 PNG 或 clean cutout 能力，必须等用户填写 key 后由下一轮探针确认。

## 上一轮承接目标

用户填写本地 `.env` 的 `DASHSCOPE_API_KEY` 后，执行 `alibaba_image_contract_and_watermark_free_sticker_probe（阿里图片 API 契约解析 + 单图无水印贴纸探针）`。

## 本轮新增｜阿里图片 API 契约解析 + 单图探针

- 已确认：本轮任务为 `alibaba_image_contract_and_watermark_free_sticker_probe`。
- 已确认：官方文档确认 `qwen-image-2.0-pro` 可通过 DashScope HTTP 同步接口调用，endpoint 为 `https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`。
- 已确认：`.env` 中 `DASHSCOPE_API_KEY` 存在，但没有打印 key，`.env` 仍是 ignored 本地密钥文件。
- 已确认：用户修正额度状态后，Codex 按最新指令重新发起 1 次阿里图片生成请求，最终返回 `http_status=200`。
- 已确认：本轮只调用阿里一个 provider，未调用 zhipu、MiniMax 或第二个 provider。
- 已确认：本地候选图为 `tmp/无水印贴纸候选_watermark_free_sticker_candidates/阿里无水印纸感拟声标签测试_alibaba_watermark_free_paper_sound_tag_probe_01.png`，该路径属于 ignored `tmp/`，不得提交。
- 已确认：候选图是 `PNG 1024x1024 RGB`，没有 alpha 透明通道。
- 已确认：视觉自检未见明显水印、`AI生成` 标识、logo 或 brand mark。
- 部分成立：当前只可写 `clean_cutout_source_pending_user_review`，不能写 transparent PNG 或 approved。
- 已确认：用户人审认为该阿里候选图风格方向不匹配，不进入 Remotion，也不作为当前贴纸资产通过。

## 上一轮下一个目标（已被本轮锚点审计重判覆盖）

上一轮建议直接执行 `remotion_svg_reaction_sticker_probe（Remotion SVG 反应贴纸组件探针）`；本轮已重判为先执行 `video_anchor_driven_sticker_system_spec_before_remotion_probe`，避免把贴纸固化成两个固定组件。

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

## 本轮新增｜新素材参考重做 Demo

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮不是 patch 旧 v2，而是新增完整 Remotion demo。
- 已确认：审美规则来源为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：新视觉素材路径为 `素材/剪辑素材/剪辑`，该路径下 7 个视频均可读取和解码。
- 已确认：本轮 BGM 沿用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`。
- 已确认：本轮 motif 为 `sand_bamboo_breath`，由沙纹、熊猫/竹叶、海雾和云层组成。
- 已确认：本轮排除 `IMG_6985.MOV`，原因是儿童与室内吉祥物场景对 demo 风险和审美干扰更高。
- 已确认：新增素材清单为 `remotion/数据_data/新素材重做清单_new_reference_rebuild_clips.ts`。
- 已确认：新增 composition id 为 `新素材参考重做Demo-new-reference-rebuild-demo`。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/18_新素材参考重做Demo报告_new_reference_rebuild_demo_report.md`。
- 已确认：本地 demo 已 render：`dist/remotion_demo_新素材参考重做_new_reference_rebuild/demo_new_reference_rebuild.mp4`。
- 已确认：本地 contact sheet 已生成：`dist/remotion_demo_新素材参考重做_new_reference_rebuild/contact_sheet_new_reference_rebuild.jpg`。
- 已确认：新 demo 技术元数据为 12.053333s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed。
- 已确认：本轮未调用外部 API，未训练模型，未安装大型依赖，未提交视频、图片、音频、runtime assets、`dist` 或 `tmp`。
- 部分成立：BGM marker 已生成自动粗 marker：beat 16、onset 20、rms_peak 12；未做人耳复听，不是精准 beat tracking。
- 当前内容状态：`rendered_pending_user_review`。
- completed_remote_verified: 已确认：本轮源码、报告、当前任务、执行桥接包和 latest 已进入 commit / push / remote HEAD readback 闭环；最终 commit SHA 以 Codex final 回报为准。
- 待验证：用户人工审看后，才能判断本轮内容方向是否通过。

## 本轮新增｜30 秒对标样片重做

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：用户最新反馈是上一轮只有 12 秒，且没有明显学习 10 个新参考视频；本轮目标升级为 30 秒对标样片。
- 已确认：本轮不是贴纸小修，不是字幕小修，不是继续做 capability proof。
- 已确认：审美依据为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：新视觉素材路径唯一，为 `素材/剪辑素材/剪辑`，该路径下 7 个视频均可读取和解码。
- 已确认：本轮选用 6 个源视频裁出 18 个微段落；排除 `IMG_6985.MOV`，原因是儿童和室内吉祥物场景风险更高。
- 已确认：本轮 BGM 沿用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`。
- 部分成立：BGM 原始时长 25.4s，本轮已本地平滑延展到 30s；未做人耳复听。
- 部分成立：BGM marker 已生成自动粗 marker：beat 16、onset 20、rms_peak 12；不是精准 beat tracking。
- 已确认：本轮 motif 为 `sand_bamboo_sea_breath`。
- 已确认：新增素材清单为 `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`。
- 已确认：新增 composition id 为 `三十秒对标样片-30s-reference-sample`。
- 已确认：该 composition 为 `900` frames / `30` fps / `1080x1920`。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`。
- 已确认：本地 demo 已 render：`dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`。
- 已确认：本地 contact sheet 已生成：`dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`。
- 已确认：30 秒样片技术元数据为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed。
- 已确认：源码数据包含 18 个微段落、10 个字幕事件和 11 个贴纸事件。
- 已确认：本轮未调用外部 API，未训练模型，未安装大型依赖，未提交视频、图片、音频、runtime assets、`dist` 或 `tmp`。
- 当前内容状态：`rendered_pending_user_review`。
- completed_remote_verified: 已确认：本轮源码、报告、当前任务、执行桥接包和 latest 已进入 commit / push / remote HEAD readback 闭环；最终 commit SHA 以 Codex final 回报为准。
- 待验证：用户人工审看后，才能判断 30 秒样片内容方向是否通过。

## 本轮新增｜字幕贴纸对标审计

- 已确认：用户最新反馈是 30 秒样片“有了”，但字幕和贴纸与对标视频差距太大，贴纸位置有问题，贴纸大小和判断标准基本为零。
- 已确认：本轮任务为 `caption_sticker_reference_audit`，不是继续改视频，不是重新 render，不是调用外部 API，不是安装插件。
- 已确认：本轮已读取新参考学习报告、30 秒样片报告、30 秒样片源码、30 秒样片数据和 contact sheet。
- 已确认：30 秒样片技术元数据仍为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed。
- 已确认：源码数据包含 10 个 caption events 和 11 个 sticker events，但事件数量不等于审美达标。
- 已确认：原 contact sheet 不足以覆盖全部 sticker event，本轮已抽取所有 sticker start / mid frame 到 `tmp/三十秒贴纸字幕审计_caption_sticker_audit/`，该目录不得提交。
- 已确认：新增审计报告为 `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 已确认：当前核心问题不是缺插件，而是对标检测标准缺失 + 贴纸执行标准不足。
- 已确认：不允许再用数量达标代替审美达标；“代码里有贴纸”不等于“贴纸审美成立”。
- 已确认：当前不建议直接 API；API 不解决放置、大小、时机和语气问题。
- 已确认：下一轮修复必须先读取 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md`，并建立 `anchor target`、`minimum visible size`、`reference function`、`shot_binding_reason`、frame-level check、caption `semantic role`。
- 当前内容状态：`audit_completed_fix_pending`。

## 下一个目标

基于 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md` 修复 30 秒样片字幕和贴纸层，不允许再只用事件数量判断达标。

## 本轮新增｜视频事件表与画面选择机制

- 已确认：用户最新反馈是后续做别的 vlog 风格视频时，需要更多锚定和判断标准，尤其缺少“放什么图比较合适”，不能全是一样的，必须符合画面和整体视频风格。
- 已确认：本轮任务为 `video_event_table_visual_selection_mechanism`，不是修视频，不是重新 render，不是继续加字幕或贴纸。
- 已确认：本轮已读取 `16_新参考包审美解析_new_reference_aesthetic_pack.md`、`20_三十秒对标样片报告_30s_reference_sample_report.md`、`21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 已确认：新增机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`。
- 已确认：本机制不是固定审美模板，不让所有 vlog 按同一个流程剪；它锁住判断关系，不锁死风格。
- 已确认：当前真正缺口是“事件表 + 画面选择标准”，不是单纯字幕贴纸问题。
- 已确认：后续任何 vlog demo 直接进入 Remotion render 前，必须先生成 `visual_selection_table` 和 `video_event_table`。
- 已确认：后续 30 秒样片修复不能直接改 x/y、fontSize、SVG 尺寸或贴纸数量，必须先改事件表字段。
- 已确认：新机制补齐 `image_fit_reason`、`style_fit`、`motif_tag`、`variety_role`、`anchor_target`、`placement_rule`、`minimum_visible_size`、`failure_rule`、`frame_level_review_points` 等字段。
- 已确认：本轮未调用外部 API，未安装依赖，未 render 视频，未提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 当前内容状态：`mechanism_completed_fix_pending`。

## 下一个目标

基于新机制，把当前 30 秒样片重写成 `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，再进入字幕/贴纸/画面修复。

## 本轮新增｜对标视频底线失败标准

- 已确认：用户最新要求是创建 `reference_bottom_line_fail_gate mechanism`，不是修视频、不是 render、不是加转场、不是调字幕贴纸。
- 已确认：本轮新增机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`。
- 已确认：`reference_bottom_line` 已定义为对标视频最低失败标准，不是装饰性灵感。
- 已确认：`hard_fail_gate` 已覆盖 `fail_no_reference_function`、`fail_surface_copy_without_function`、`fail_event_quantity_as_quality`、`fail_no_visual_selection_table`、`fail_no_video_event_table`、`fail_no_frame_review`、`fail_reference_mismatch`、`fail_random_patchwork`、`fail_caption_not_reference_like`、`fail_sticker_not_reference_like`、`fail_transition_not_reference_like`、`fail_music_visual_mismatch`、`fail_style_inconsistency`、`fail_reference_asset_copy`。
- 已确认：后续 transition 必须先写 `transition_role`、`music_moment` 和 `reference_function`，不能把转场当装饰。
- 已确认：如果用户看不出对标视频的感觉，即使技术 render 成功，也必须判定为内容失败。
- 已确认：渲染前阻断条件已加入 `reference_learning_checklist`、`visual_selection_table`、`video_event_table`、`failure_checklist`、`frame_level_review_points`。
- 已确认：本轮未调用外部 API，未安装依赖，未 render 视频，未提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 当前内容状态：`reference_bottom_line_gate_completed_fix_pending`。

## 下一个目标

基于该底线，重写当前 30 秒样片的 `reference_learning_checklist（对标学习检查清单）` + `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，再进入修复。

## 本轮新增｜项目目标重锚与通用 vlog 剪辑机制

- 已确认：当前 demo 只是验证材料，不是项目目标。
- 已确认：项目目标是让 Codex 稳定形成 vlog 剪辑判断能力。
- 已确认：前几轮机制从 demo 失败中抽象出来，但必须升级为通用机制，不能围绕当前 demo 打转。
- 已确认：三张表是未来所有 vlog 剪辑任务的通用前置，不是当前 demo 专用表。
- 已确认：新增通用机制文件为 `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`。
- 已确认：`reference_learning_checklist`、`visual_selection_table`、`video_event_table` 已被定义为通用前置机制。
- 已确认：失败标准长期不变。
- 已确认：BGM 可以变，素材包可以变，参考视频可以变，风格锚点可以变，但判断关系不变。
- 已确认：本轮未调用外部 API，未安装依赖，未 render 视频，未提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- content_status: `goal_anchor_reframed_mechanism_generalized_completed`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：Codex 是否能在不同素材、不同 BGM、不同参考视频下稳定产出接近对标视频观感的样片。

## 下一个目标

基于通用 vlog 剪辑机制，为当前 30 秒样片重新生成 `reference_learning_checklist（对标学习检查清单）` + `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，三表通过 hard fail gate（硬失败闸门）后，再进入 Remotion 修复。

## 本轮新增｜当前 30 秒样片三表执行包

- 已确认：本轮任务为 `current_30s_three_tables_execution_pack`。
- 已确认：当前 30 秒样片是验证材料，不是项目目标。
- 已确认：当前资料已经足够形成第一版 demo 形态，但 Codex 稳定 vlog 导演能力仍需多案例验证。
- 已确认：当前真正缺失层是面向当前样片的三表执行包，而不是继续盲修字幕、贴纸或转场。
- 已确认：新增三表执行包为 `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`。
- 已确认：`reference_learning_checklist` 已覆盖 opening、captions、stickers、scrapbook / split、transition、end card、music-visual alignment、slowdown breath、motif reprise。
- 已确认：`visual_selection_table` 已覆盖当前 30 秒样片全部 18 个 visual segment。
- 已确认：`video_event_table` 已覆盖 18 个 visual segment、10 个 caption events、11 个 sticker events、scrapbook / split、end card、transition / cut / clip changes、BGM key sections。
- 已确认：`hard_fail_summary` 与 `next_fix_route` 已写入三表执行包。
- 部分成立：30 秒样片技术元数据为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed；这只代表 technical validation，不代表 content pass。
- 已确认：本轮没有修视频，没有 render，没有修改 Remotion 源码，没有调用外部 API，没有提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- content_status: `three_tables_pack_completed_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：下一轮必须依据 `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` 的 `hard_fail_summary` 与 `next_fix_route` 决定路线，不能跳过表层直接进 Remotion。

## 下一个目标

读取 `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`，先处理 `reference_layer`、`event_layer`、`transition_layer` 与 `bgm_layer` 的阻断项；只有当问题降级到具体执行参数层时，才允许进入 Remotion 修复。

## 本轮新增｜三表 P0 阻断项修正

- 已确认：`25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` 暴露出 P0 阻断项。
- 已确认：`25` 中错误源码路径已修正为 `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`。
- 已确认：本轮新增 P0 阻断项修正包为 `项目资料_docs/视频能力实验室_video_capability_lab/26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`。
- 已确认：本轮修正 caption / sticker / transition / BGM 的表层关系。
- 已确认：`26` 覆盖 10 条 caption、11 条 sticker、17 条 visual cut 关系、PeakFlash、EndCard 和 BGM marker 对照。
- 已确认：BGM marker 对照只使用 auto marker，未做人耳复听，不能写成精准卡点。
- 已确认：本轮不修视频，不 render，不修改 Remotion 源码，不修改视频数据文件，不调用外部 API，不安装依赖，不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- content_status: `p0_blocker_tables_updated_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：下一轮是否进入 Remotion 由 `26` 的 `next_fix_route` 决定。
- 待验证：即使下一轮进入有限 Remotion implementation，BGM 峰值、PeakFlash、精准卡点、frame-level review 和用户人审仍未通过。

## 下一个目标

读取 `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` 和 `26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`，判断是否拆一个有限 Remotion implementation；若拆，只允许执行 `26` 已明确的表层删改，不得把它写成视频内容通过。

## 本轮新增｜贴纸图形适配与有限 Remotion 修复

- 已确认：本轮任务为 `sticker_visual_fit_limited_remotion_fix`。
- 已确认：本轮先补齐贴纸图形适配标准，再基于 `25 + 26` 做有限 Remotion 修复。
- 已确认：`22`、`23`、`24` 已补入 `sticker_visual_fit`、`graphic_role`、`color_fit`、`texture_fit`、`style_conflict` 和 `fail_sticker_graphic_mismatch`。
- 已确认：`25` 已补当前三表缺口说明。
- 已确认：`26` 已为 11 条 sticker 补图形适配判断。
- 已确认：当前 30 秒样片 caption events 从 10 条收缩为 6 条，删除 / 替换无功能 caption。
- 已确认：当前 30 秒样片 sticker events 从 11 条收缩为 5 条，删除 / 重定位无锚点或风格冲突 sticker。
- 已确认：scrapbook 中重复硬编码 `慢一点` 已删除，只保留一个 caption event。
- 已确认：本轮执行有限 Remotion 修复，不重做整条结构。
- 已确认：本轮输出 limited fix 视频：`dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample_limited_fix.mp4`，不得提交。
- 已确认：本轮输出 contact sheet：`dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_limited_fix.jpg`，不得提交。
- 已确认：本轮输出 frame-level review 报告：`项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`。
- 已确认：limited fix 视频技术元数据为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true，video-metadata-probe passed。
- 已确认：本轮未调用外部 API，未生成 AI sticker image，未安装大型依赖，未提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：BGM 仍未人工复听，所有音乐相关判断仍为 `auto_marker_only` / `needs_review`。
- 已确认：PeakFlash 仍不得写精准卡点，只能标 `rough_peak_candidate`。
- 当前内容状态：`limited_remotion_fix_rendered_pending_user_review`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

## 下一个目标

用户人审 limited fix 视频和 `27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`。若方向更接近，则继续局部表现层修正；若仍不像对标，则回到 `reference_layer` / `material_layer` / `bgm_layer` 重判。

## 本轮新增｜对标视觉语言失败重判

- 已确认：用户最新反馈是位置基本不是主问题；贴纸 UI、图片大小 / 样式、字幕 + 贴纸气氛失败，视频看起来仍像基础剪辑。
- 已确认：当前任务为 `reference_visual_language_replan`。
- 已确认：当前判断为 `reference_structure_partial_ui_language_failed`。
- 已确认：本轮不是继续调 x/y、fontSize、SVG 尺寸或贴纸数量。
- 已确认：本轮不是 render，不修改 Remotion 源码，不修改视频数据文件，不调用外部 API，不生成 sticker assets。
- 已确认：新增重判报告为 `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`。
- 已确认：当前失败层包括 `sticker_ui_layer`、`caption_atmosphere_layer`、`motion_language_layer`、`visual_mood_layer`、`bgm_dependency_layer`。
- 已确认：当前失败代码包括 `sticker_ui_language_failure`、`caption_sticker_mood_failure`、`reference_visual_language_not_loaded`、`bgm_over_dependency`、`basic_editing_only`。
- 已确认：新失败标准包括 `fail_sticker_asset_quality_low`、`fail_caption_sticker_mood_flat`、`fail_visual_language_not_reference_like`、`fail_bgm_carries_all_mood`、`fail_basic_editing_only`。
- 主路线：`sticker_style_system + sticker_asset_pack_spec`。
- 辅助路线：`API-generated sticker pack`，只能补充图形风格，不能替代 sticker spec。
- 不推荐继续让 Codex 用基础 SVG 硬画全部贴纸；pure code SVG/CSS 只适合最小线条、箭头、圈注、呼吸线和低复杂度标点。

## 下一个目标

历史口径曾指向 `sticker_style_system_and_asset_pack_spec`；本轮已升级为 `reference_visual_language_to_asset_spec`，先从 `reference_judgement_library` 和本轮 `style_anchor` 生成资产规格，再决定是否进入 Remotion、手工 asset pack 或 API 补充生成。

## 本轮新增｜对标学习执行逻辑级联修正

- 已确认：用户最新 P0 输入指出，不能只修“必须先看对标视频”一句；如果上游执行逻辑错，执行流程、判断标准和反馈回路也会错。
- 已确认：本轮任务为 `reference_learning_execution_logic_cascade_refactor`。
- 已确认：本轮新增 `reference_judgement_library（对标判断库）`，文件为 `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`。
- 已确认：本轮新增级联修正报告，文件为 `项目资料_docs/视频能力实验室_video_capability_lab/30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md`。
- 已确认：未来执行必须先读判断库；有新增对标视频时先扩充和校准判断库；无新增对标视频时也可以基于已有判断库执行。
- 已确认：无新增对标视频不等于无法执行。
- 已确认：新对标视频用于扩充和校准判断库，不是替代旧判断。
- 已确认：失败标准仍然不变，判断库持续积累。
- 已确认：旧的 `sticker_style_system_and_asset_pack_spec` 已升级为 `reference_visual_language_to_asset_spec`，不能理解为固定一套贴纸样式。
- 已确认：本轮不修视频、不 render、不修改 Remotion 源码或数据、不调用 API、不生成贴纸素材。
- 当前内容状态：`reference_learning_logic_cascade_refactored_pending_validation`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

## 下一个目标

基于 `reference_judgement_library（对标判断库）` 生成 `reference_visual_language_to_asset_spec（对标视觉语言到资产规格）`；然后再决定是否手工整理资产包、使用纯代码 SVG，或辅助 API 生成透明贴纸。

## 本轮新增｜对标视觉语言到资产规格

- 已确认：当前任务为 `reference_visual_language_to_asset_spec`。
- 已确认：新增资产规格文件为 `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`。
- 已确认：本轮基于判断库生成资产规格，不是直接生成贴纸。
- 已确认：本轮没有新增对标视频，判断来源为 `library_derived`。
- 已确认：本轮从 `29_对标判断库机制_reference_judgement_library.md` 选用 7 类判断：贴纸图案、贴纸大小、贴纸风格、字幕气氛、转场功能、画面素材适配、音乐画面关系。
- 已确认：当前临时风格锚点为 `soft_vlog_breath_with_light_comic_object_moments`，不是未来所有视频固定风格。
- 已确认：`31` 已生成 5 个当前样片可用 sticker asset spec：`soft_hand_arrow`、`soft_focus_circle`、`trace_wave_line`、`paper_sound_tag`、`breath_edge_line`。
- 已确认：`31` 已生成 `caption_mood_spec`、`motion_spec`、`asset_route_decision` 和 `do_not_generate_yet`。
- 已确认：本轮没有 render、没有调用 API、没有生成资产、没有修改 Remotion 源码或数据。
- 已确认：下一步根据 `asset_route_decision` 决定本地资产包 / 纯代码 SVG / API 候选路线。
- 内容状态：`asset_spec_completed_asset_generation_pending`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

## 下一个目标

读取 `31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`，根据 `asset_route_decision` 决定下一轮是否整理 `local_asset_pack`、实现 `pure_code_svg`，或生成透明背景 `api_generated_candidate`。下一轮不得把 `31` 写成资产已生成、视觉语言已通过或当前视频已修好。

## 本轮新增｜API 贴纸候选前置 env

- 已确认：当前任务为 `api_sticker_env_setup`。
- 已确认：本轮目标是为下一轮 `api_generated_sticker_candidate_probe` 创建安全的本地 API key 填写入口。
- 已确认：`.env.example` 已作为可提交模板准备，只包含空 key 占位、provider 字段、输出目录字段和安全限制字段。
- 已确认：本地 `.env` 已准备为用户手动填写 key 的入口；`.env` 是 local ignored file，不提交 Git，不属于 remote verified 文件。
- 已确认：`.gitignore` 已补充 `.env.local`、`.env.*.local` 和 `!.env.example`，避免 `.env.example` 被误忽略。
- 已确认：本轮未调用外部 API，未生成贴纸候选，未生成透明 PNG，未修改 Remotion，未 render 视频。
- 已确认：本轮不得把 env 创建写成 API 可用、贴纸候选已生成、资产已生成或视频已修好。
- 当前状态：`api_sticker_env_created_pending_user_key`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：用户是否已在本地 `.env` 填写真实 API key。
- 待验证：智谱 AI / MiniMax / 阶跃星辰任一图片生成 provider 是否可用。

## 下一个目标

用户在本地 `.env` 填写 key 后，进入 `api_generated_sticker_candidate_probe（API 贴纸候选探针）`。下一轮必须先读取 `.env` 中 key 是否存在，但不得打印 key；API 输出仍只能作为候选资产，必须经过 frame review 或用户人审。

## 本轮新增｜API 单图贴纸候选探针

- 已确认：当前任务为 `api_generated_sticker_candidate_probe`。
- 已确认：本轮 provider 为 `zhipu`，模型为 `glm-image`。
- 已确认：本轮根据智谱官方图像生成文档选择 `glm-image`，并只写入本地 `.env`，不提交。
- 已确认：本轮 `.env` key 存在，key 未打印，`.env` 未提交。
- 已确认：本轮真实发起 1 次图片生成请求，API 调用成功。
- 已确认：本轮只生成 1 张 `paper_sound_tag（纸感拟声标签）` 测试候选。
- 已确认：候选本地路径为 `tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01.png`。
- 已确认：候选图片和 metadata 都在 ignored `tmp/` 目录，不提交 Git。
- 已确认：报告为 `项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md`。
- 部分成立：候选有纸贴轮廓、软边、暖纸色和灰咖文字。
- 已确认：候选无 alpha 通道，背景不透明，需要背景去除或重新生成透明背景候选。
- 已确认：候选右下角可见 `AI生成` 标识，不能直接作为合格贴纸资产。
- 当前状态：`api_sticker_single_candidate_generated_pending_user_review`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：用户是否认可该候选方向。
- 待验证：下一轮是否做背景去除、去标识、改 prompt、换 provider，或回到本地资产包。

## 下一个目标

用户人审 `paper_sound_tag（纸感拟声标签）` 测试候选。通过后再决定是否批量生成候选、做透明 PNG 后处理，或进入 Remotion 前的 frame review。

## 本轮新增｜无水印图片生成策略配置

- 已确认：用户反馈是后续图片需要无水印、无 `AI生成` 标识；本轮不要求带出新产物。
- 已确认：本轮任务为 `watermark_free_image_policy_config`。
- 已确认：本轮没有调用 API，没有生成新图片，没有去水印，没有修改 Remotion，没有 render。
- 已确认：`32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md` 中的 `zhipu + glm-image` 单图链路只保留为连通性证据。
- 已确认：`zhipu + glm-image` 已降级为 `connection_probe_only`，不再作为正式贴纸候选默认 provider。
- 已确认：新增策略配置为 `配置_configs/图片生成策略_image_generation_policy.json`。
- 已确认：`.env.example` 已增加 `IMAGE_REQUIRE_NO_WATERMARK`、`IMAGE_REQUIRE_NO_GENERATED_LABEL`、`IMAGE_WATERMARKED_OUTPUT_ACTION=reject_candidate` 等策略字段。
- 已确认：未来贴纸候选必须满足 no watermark、no generated label、no logo、no brand mark。
- 已确认：带水印或 `AI生成` 标识的输出默认 `reject_candidate`，不是后处理去水印。
- 已确认：新增记录为 `项目资料_docs/视频能力实验室_video_capability_lab/33_无水印图片生成配置修正_watermark_free_image_policy_config.md`。
- 当前状态：`watermark_policy_config_updated_no_new_asset`。
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- 待验证：下一个可用的无水印 provider / model。

## 下一个目标

进入 `watermark_free_provider_probe（无水印 provider 探针）`。在 provider / model 通过 no watermark、no generated label、no logo / brand mark、transparent PNG 或 clean cutout source 检查前，不允许批量生成贴纸候选或接入 Remotion。

## 本轮新增｜MiniMax 图片 API 契约解析与单图探针 blocked

- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：用户本轮真实目标是只填写 MiniMax API key，由 Codex 自动查明 MiniMax 静态图片生成 endpoint / model / request fields / response image field。
- 已确认：MiniMax official docs 已确认静态图片生成 endpoint 为 `https://api.minimax.io/v1/image_generation`，模型为 `image-01`，鉴权为 `HTTP Bearer API_key`。
- 已确认：MiniMax 图片 API 文档未要求 `MINIMAX_GROUP_ID`。
- 已确认：本轮只调用 MiniMax，一个 provider，一次图片生成请求。
- 已确认：本轮 API 返回 `base_resp.status_code=2049` / `status_msg=invalid api key`，未生成图片。
- 已确认：本轮未调用 zhipu，未调用第二个 provider，未批量生成，未修改 Remotion，未 render。
- 已确认：`.env` 和 `tmp/` 均为 ignored；`.env`、失败响应和运行产物未提交。
- 已确认：新增报告为 `项目资料_docs/视频能力实验室_video_capability_lab/34_无水印Provider探针报告_watermark_free_provider_probe_report.md`。
- 已确认：新增契约解析为 `项目资料_docs/视频能力实验室_video_capability_lab/35_MiniMax图片API契约解析_minimax_image_api_contract.md`。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key`。
- 待验证：更换或修正 MiniMax official API Platform 可用 key 后，才能重跑单图候选并判断 no watermark / no generated label / no logo / transparent or clean cutout source。

## 本轮新增｜MiniMax key 修正后单图重跑仍 blocked

- 已确认：本轮任务为 `minimax_watermark_free_sticker_rerun`。
- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮复用 MiniMax 已解析契约：endpoint `https://api.minimax.io/v1/image_generation`，model `image-01`，requires_group_id `false`。
- 已确认：`.env` 中 `MINIMAX_API_KEY` 存在，但 key 未打印，`.env` 未提交。
- 已确认：本轮只调用 MiniMax，只发起 1 次图片生成请求，未调用 zhipu 或第二个 provider。
- 已确认：MiniMax API 重跑仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。
- 已确认：本轮未生成图片，因此不能判断 no watermark / no generated label / no logo / transparent background。
- 已确认：重跑失败响应位于 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/`，不得提交。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key_after_rerun`。
- 待验证：需要更换 MiniMax official API Platform 可用 key，或进入下一个未被策略禁用的无水印图片 provider 探针。

## 本轮新增｜MiniMax 新 key 单图探针仍 blocked

- 已确认：本轮任务为 `minimax_new_key_watermark_free_sticker_probe`。
- 已确认：本轮执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：当前 GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮复用 MiniMax 已解析契约：endpoint `https://api.minimax.io/v1/image_generation`，model `image-01`，auth `Authorization: Bearer <API_key>`，requires_group_id `false`。
- 已确认：`.env.example` 曾出现疑似真实 MiniMax key，已清空模板；key 未打印，`.env` 未提交。
- 已确认：本轮只调用 MiniMax，只发起 1 次图片生成请求，未调用 zhipu 或第二个 provider。
- 已确认：MiniMax API 对新 key 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。
- 已确认：本轮未生成图片，因此不能判断 no watermark / no generated label / no logo / transparent background。
- 已确认：新 key 失败响应位于 ignored `tmp/无水印贴纸候选_watermark_free_sticker_candidates/`，不得提交。
- 当前状态：`blocked_minimax_api_call_failed_invalid_api_key_after_new_key`。
- 待验证：回到 MiniMax 控制台确认该 key 是否真的是 API Platform 的 API key，不是网页端、Token Plan 或其他产品线 key。
