# 当前任务

当前任务：`reference_learning_execution_logic_cascade_refactor`。

当前目标：回审并修正对标学习执行逻辑的上游错误，建立 `reference_judgement_library（对标判断库）`，并级联修正触发、流程、判断、反馈和路由。

当前状态：`reference_learning_logic_cascade_refactored_pending_validation`。

下一状态：`reference_visual_language_to_asset_spec_pending`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮输入

- user_input: 用户指出如果之前的执行逻辑错误，后面的执行流程、判断标准和反馈也都会有问题，不能只小修 prompt 范围。
- task_type: `reference_learning_execution_logic_cascade_refactor`
- true_goal: 检查并修正“对标学习机制”是否误写成每次从零学习当前对标视频，并建立长期 `reference_judgement_library`。
- new_library_file: `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
- cascade_report: `项目资料_docs/视频能力实验室_video_capability_lab/30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- sticker_asset_generation_allowed_this_round: `false`
- file_change_scope: `mechanism_docs + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮不是修视频。
- 已确认：本轮不是 render。
- 已确认：本轮不是生成贴纸。
- 已确认：本轮不是只新增一个判断库文件。
- 已确认：本轮不修改 Remotion 源码，不修改 Remotion 数据文件。
- 已确认：本轮不调用外部 API，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮不把 `reference_judgement_library` 写成充分完备。
- 已确认：本轮不把机制修正写成 Codex 已具备稳定 vlog 导演能力。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮修正判断

已确认：之前范围不能只修“必须先看对标视频”一句。

已确认：上游对标学习逻辑会影响：

- 触发条件。
- 执行流程。
- 三张表生成逻辑。
- hard fail gate。
- next fix route。
- feedback loop。
- 能力状态升级规则。

已确认：正确逻辑是：

1. 先读取 `reference_judgement_library`。
2. 判断本轮是否有新增对标视频。
3. 有新增对标视频时，先更新判断库。
4. 无新增对标视频时，使用已有判断库。
5. 再生成 `reference_learning_checklist`、`visual_selection_table`、`video_event_table`。
6. 三张表通过 `hard_fail_gate` 后，才允许 Remotion 执行。

## 下一个目标

基于 `reference_judgement_library` 生成 `reference_visual_language_to_asset_spec（对标视觉语言到资产规格）`。

随后再决定是否：

1. 手工整理 `sticker_asset_pack`。
2. 使用 pure code SVG/CSS 做低复杂度标点。
3. 辅助 API 生成透明贴纸。

## 本轮完成定义

本轮只有在判断库、级联修正报告、相关机制文件、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
