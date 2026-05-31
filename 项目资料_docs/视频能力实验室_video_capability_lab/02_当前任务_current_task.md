# 当前任务

当前任务：`goal_anchor_reframe_and_generalize_vlog_mechanism`。
当前目标：把前几轮围绕当前 demo 暴露出的机制缺口，升级为通用 vlog 剪辑能力机制。

当前不是修视频。
当前不是 render。
当前不是继续围绕当前 demo 补洞。
当前不是继续加字幕、贴纸或转场。
当前不是调用外部 API、安装依赖或生成素材。

## 本轮 P0 输入

- user_input: 用户要求修正并执行 `reference_learning_checklist（对标学习检查清单）`、`visual_selection_table（画面选择表）`、`video_event_table（视频事件表）`，让机制和判断标准以后都通用，不能围绕 demo 打转。
- task_type: `goal_anchor_reframe_and_generalize_vlog_mechanism`
- true_goal: 修正项目目标层，明确当前 demo 只是验证材料，不是项目目标；把三张表升级为通用 vlog 剪辑执行机制。
- current_judgment: `partial_mechanism_valid_goal_anchor_missing`
- corrected_judgment: `goal_anchor_reframed_mechanism_generalized_completed`
- content_status: `mechanism_generalized_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- render_allowed_this_round: `false`
- file_change_scope: `mechanism_docs_only`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前 demo 只是验证材料，不是项目目标。
- 已确认：项目目标是让 Codex 稳定形成 vlog 剪辑判断能力。
- 已确认：本轮不修改 Remotion 源码，不重新 render 视频，不调用外部 API，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮新增机制

- 新增机制文件：`项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
- 通用前置表：
  - `reference_learning_checklist（对标学习检查清单）`
  - `visual_selection_table（画面选择表）`
  - `video_event_table（视频事件表）`
- 不变底线：失败标准长期不变。
- 可变输入：BGM 可以变，素材包可以变，参考视频可以变，风格锚点可以变。
- 不变机制：判断关系不变。

## 当前判断

`partial_mechanism_valid_goal_anchor_missing`

已确认：前几轮机制部分有效，但呈现上仍容易被误解成围绕当前 30 秒 demo 修复。

已确认：本轮必须把三张表从“当前 demo 修复表”升级为“通用 vlog 剪辑前置机制”。

已确认：失败标准不随 demo、BGM、素材包、参考视频或风格变化而变化。

## 修正后判断

`goal_anchor_reframed_mechanism_generalized_completed`

本轮只说明：项目目标层已重锚，通用 vlog 剪辑机制已落库。不能写成当前视频已修好，不能写成 Codex 已稳定具备 vlog 剪辑能力。

## 当前能力状态

- 通用 vlog 剪辑机制：已确认，机制文件已落库。
- 三张表通用化：已确认，已从 demo 修复表升级为通用前置机制。
- 当前 30 秒样片内容问题：待验证，仍为 `fix_pending`。
- Codex 稳定 vlog 导演能力：待验证，状态为 `vlog_director_capability_still_pending_multi_case_validation`。
- 后续直接 render：blocked，必须先生成三张表并通过 `hard_fail_gate`。

## 下一个目标

下一个目标：基于通用 vlog 剪辑机制，为当前 30 秒样片重新生成 `reference_learning_checklist（对标学习检查清单）` + `visual_selection_table（画面选择表）` + `video_event_table（视频事件表）`，三表通过 hard fail gate（硬失败闸门）后，再进入 Remotion 修复。

## 本轮完成定义

本轮只有在项目总说明、通用机制文件、当前任务、执行桥接包、22/23 定位、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
