# 当前任务

当前任务：`caption_sticker_reference_audit`。
当前目标：对当前 30 秒对标样片做“字幕 + 贴纸 + 对标规则”系统审计，找出为什么用户感觉字幕和贴纸与对标视频差距太大。

当前不是继续改视频。
当前不是重新 render 一个版本。
当前不是调用外部 API 生成贴纸。
当前不是安装插件。
当前不是用事件数量证明质量。

## 本轮 P0 输入

- user_input: `我看了 30 秒的视频，感觉是有了，但是字幕和贴纸和对标视频差距太大了，让 codex 自己对标检测，并且贴纸放的位置这些都是有问题的，并且 codex 做出来贴纸大小和判断标准基本为零，你需要先去检查一次之前的学习报告这些，我觉得问题有点多`
- task_type: `caption_sticker_reference_audit`
- true_goal: 让 Codex 不再把“代码里有字幕/贴纸”和“字幕/贴纸审美成立”混为一谈，而是按参考报告逐条检测当前字幕和贴纸为什么不像。
- user_feedback_status: 已确认
- current_judgment: `caption_sticker_quality_gap_requires_audit_before_fix`
- previous_sample_status: `rendered_pending_user_review`
- content_status: `audit_completed_fix_pending`
- fix_allowed_this_round: `false`
- api_allowed_this_round: `false`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：参考学习报告为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：30 秒样片报告为 `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`。
- 已确认：30 秒样片源码为 `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`。
- 已确认：30 秒样片数据为 `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`。
- 已确认：本地输出视频为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`。
- 已确认：本地 contact sheet 为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`。
- 已确认：本轮不调用外部 API，不安装大型依赖，不重新 render 视频。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮审计事实

- 已确认：当前样片技术元数据为 30.058667s / 1080x1920 / 30fps / h264 / AAC stereo，video-metadata-probe passed。
- 已确认：源码数据包含 10 个 caption events 和 11 个 sticker events。
- 已确认：原 contact sheet 只覆盖 9 个时间点，不足以审计所有 sticker event。
- 已确认：本轮已抽取所有 sticker event 的 start / mid frame 到 `tmp/三十秒贴纸字幕审计_caption_sticker_audit/`，该目录为 ignored 临时观察产物，不得提交。
- 已确认：新增审计报告为 `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。

## 当前判断

`caption_sticker_quality_gap_requires_audit_before_fix`

已确认：当前不是插件缺失优先。

已确认：当前不建议直接 API。API 可以作为下一阶段 `api_generated_sticker_pack_probe`，但 API 不解决放置、大小、时机和语气问题。

已确认：旧判断里“贴纸肉眼可见”缺少 `anchor target`、`minimum visible size`、`reference function`、`shot_binding_reason` 和 frame-level check。

部分成立：当前字幕多数是短词，且没有内部项目语言；但字幕仍缺少 semantic role、动作绑定和位置理由。

部分成立：当前贴纸在 mid frame 中多数可暂停识别；但贴纸位置、大小、主体绑定和 reference-like 语气仍不成立。

## 本轮新增事实文件

- `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`

## 当前能力状态

- 30 秒样片技术验证：已确认
- 字幕事件存在：已确认
- 贴纸事件存在：已确认
- 字幕审美达标：待验证，当前审计为 `failed_pending_fix`
- 贴纸审美达标：待验证，当前审计为 `failed_pending_fix`
- 贴纸 frame-level check：部分成立，本轮已做审计抽帧，但修复前仍需纳入下一轮执行规则
- API sticker pack：待验证，不是本轮优先路线

## 当前最终判断

`audit_completed_fix_pending`

本轮只说明：字幕/贴纸对标审计已完成，并已指出下一轮修复前置规则。不能写成字幕/贴纸已修好，不能写成内容审美通过，不能写成 API 贴纸现在应该做。

## 下一个目标

下一个目标：基于 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md` 修复 30 秒样片字幕和贴纸层，不允许再只用事件数量判断达标。

## 本轮完成定义

本轮只有在审计报告、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
