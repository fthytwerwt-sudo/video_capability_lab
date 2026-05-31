# 当前任务

当前任务：`video_event_table_visual_selection_mechanism`。
当前目标：把当前项目缺失的“视频事件表 + 画面选择标准”写进仓库，让后续任何 vlog 风格 demo 都能先按事件表判断，再进入 Remotion 执行。

当前不是修视频。
当前不是重新 render。
当前不是继续加字幕或贴纸。
当前不是调用外部 API 或生成贴纸素材。

## 本轮 P0 输入

- user_input: `我觉得现在可以写，我之后如果做别的vlog 风格的视频，可以给到更多的锚定和判断标准，而且我引用的这里面还是少一个，放什么图是比较合适的，不能全是一样的，主要还是要符合画面和整体视频风格`
- task_type: `video_event_table_visual_selection_mechanism`
- true_goal: 建立一套可复用机制，让用户以后做不同 vlog 风格视频时，可以给 Codex 更多锚点和判断标准；Codex 必须先判断“放什么画面合适”，再决定字幕、贴纸、分屏、尾卡和 Remotion 实现。
- current_judgment: `mechanism_gap_identified`
- content_status: `mechanism_completed_fix_pending`
- render_allowed_this_round: `false`
- file_change_scope: `mechanism_docs_only`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮读取并承接 `16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：本轮读取并承接 `20_三十秒对标样片报告_30s_reference_sample_report.md`。
- 已确认：本轮读取并承接 `21_字幕贴纸对标审计_caption_sticker_reference_audit.md`。
- 已确认：本轮不修改 Remotion 源码，不重新 render 视频，不调用外部 API，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮新增机制

- 新增机制文件：`项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`
- 机制定位：不是固定审美模板，不让所有 vlog 按同一个流程剪；它用于把用户审美锚点、参考视频风格、素材画面、音乐节奏、字幕贴纸、分屏尾卡翻译成 Codex 可执行事件表。
- 关键表：
  - `visual_selection_table（画面选择表）`
  - `video_event_table（视频事件表）`
  - `failure_checklist（失败检查清单）`
  - `frame_level_review_points（逐帧回审点）`

## 当前判断

`mechanism_gap_identified`

已确认：当前真正缺口不是单纯字幕/贴纸问题，而是缺少 “先选什么画面、为什么适合、和整体风格怎么匹配、再绑定字幕/贴纸” 的事件表机制。

已确认：后续 30 秒样片修复不能直接改 x/y、fontSize、SVG 尺寸或贴纸数量。

已确认：下一轮必须先把当前 30 秒样片重写成 `visual_selection_table` + `video_event_table`，再进入字幕/贴纸/画面修复。

## 当前能力状态

- 事件表机制：已确认，机制文件已落库。
- 画面选择标准：已确认，机制文件已落库。
- 当前 30 秒样片内容问题：待验证，仍为 `fix_pending`。
- 当前 30 秒样片是否已经通过新机制：待验证，不能写成已通过。
- 后续 vlog demo 直接 render：blocked，必须先生成 `visual_selection_table` 和 `video_event_table`。

## 当前最终判断

`mechanism_completed_fix_pending`

本轮只说明：视频事件表与画面选择机制已补齐。不能写成当前视频问题已解决，不能写成 30 秒样片审美通过，不能写成 Remotion 能力新增验证完成。

## 下一个目标

下一个目标：基于新机制，把当前 30 秒样片重写成 `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，再进入字幕/贴纸/画面修复。

## 本轮完成定义

本轮只有在新机制文件、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
