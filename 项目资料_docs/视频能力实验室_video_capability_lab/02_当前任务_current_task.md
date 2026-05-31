# 当前任务

当前任务：`reference_bottom_line_fail_gate`。
当前目标：把“对标视频是底线，不是装饰灵感”写成可执行硬失败标准，让后续 vlog demo 在 render 前后都能被 `reference_bottom_line` 与 `hard_fail_gate` 阻断或判 fail。

当前不是修视频。
当前不是重新 render。
当前不是新增转场。
当前不是继续调字幕或贴纸。
当前不是调用外部 API、安装依赖或生成素材。

## 本轮 P0 输入

- user_input: 附件要求创建 `reference_bottom_line_fail_gate mechanism`，补齐对标视频底线失败标准。
- task_type: `reference_bottom_line_fail_gate`
- true_goal: 建立一套硬失败闸门，防止后续把“看过参考”“有字幕贴纸转场”“render 成功”误判为“像对标视频”。
- current_judgment: `bottom_line_missing_caused_random_judgement`
- content_status: `reference_bottom_line_gate_completed_fix_pending`
- render_allowed_this_round: `false`
- file_change_scope: `mechanism_docs_only`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮承接 `16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：本轮承接 `20_三十秒对标样片报告_30s_reference_sample_report.md`。
- 已确认：本轮承接 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 已确认：本轮承接 `22_视频事件表与画面选择机制_video_event_table_visual_selection.md`。
- 已确认：本轮不修改 Remotion 源码，不重新 render 视频，不调用外部 API，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮新增机制

- 新增机制文件：`项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`
- 核心机制：
  - `reference_bottom_line`
  - `hard_fail_gate`
  - `reference_learning_checklist`
  - transition 必填 `transition_role`、`music_moment`、`reference_function`
  - 渲染前阻断条件
  - 渲染后失败判定

## 当前判断

`bottom_line_missing_caused_random_judgement`

已确认：当前真正风险不是少一个转场、少一个贴纸或少一条字幕，而是缺少“对标视频底线失败标准”。

已确认：如果没有 `reference_function`，任何 caption、sticker、transition 都可能变成随机补丁。

已确认：如果用户看不出对标视频的感觉，即使 render 成功，也必须判定为内容失败。

## 当前能力状态

- 对标视频底线：已确认，机制文件已落库。
- 硬失败闸门：已确认，覆盖 caption、sticker、transition、music、style、visual selection、event table、frame review、reference asset copy。
- 当前 30 秒样片内容问题：待验证，仍为 `fix_pending`。
- 当前 30 秒样片是否已按新底线修复：待验证，不能写成已修复。
- 后续 vlog demo 直接 render：blocked，必须先生成 `reference_learning_checklist`、`visual_selection_table`、`video_event_table`、`failure_checklist`、`frame_level_review_points`。

## 当前最终判断

`reference_bottom_line_gate_completed_fix_pending`

本轮只说明：对标视频底线失败标准已补齐。不能写成当前视频问题已解决，不能写成 30 秒样片审美通过，不能写成 Remotion 能力新增验证完成。

## 下一个目标

下一个目标：基于该底线，重写当前 30 秒样片的 `reference_learning_checklist（对标学习检查清单）` + `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，再进入修复。

## 本轮完成定义

本轮只有在新机制文件、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
