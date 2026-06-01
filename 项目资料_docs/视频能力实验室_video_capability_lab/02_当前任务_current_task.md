# 当前任务

当前任务：`current_30s_three_tables_execution_pack`。
当前目标：基于通用 vlog 剪辑机制，为当前 30 秒样片生成完整三表执行包：`reference_learning_checklist（对标学习检查清单）`、`visual_selection_table（画面选择表）`、`video_event_table（视频事件表）`。

当前不是修视频。
当前不是 render。
当前不是继续调整字幕、贴纸、转场或 EndCard。
当前不是编辑 Remotion 源码。
当前不是调用外部 API、安装依赖或生成素材。
当前不是把当前 30 秒样片重新设为项目目标。

## 本轮 P0 输入

- user_input: 用户要求对当前 30 秒样片创建完整三张表执行包，不修视频、不 render、不编辑 Remotion 源码。
- task_type: `current_30s_three_tables_execution_pack`
- target_sample: `三十秒对标样片-30s-reference-sample`
- source_video: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`
- required_output: `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
- content_status: `three_tables_pack_completed_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- file_change_scope: `markdown_docs_only`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前 30 秒样片是验证材料，不是项目目标。
- 已确认：项目目标仍是让 Codex 稳定形成可迁移的 vlog 剪辑判断能力。
- 已确认：本轮只生成 Markdown 三表执行包并更新状态文件。
- 已确认：本轮不修改 Remotion 源码，不重新 render 视频，不调用外部 API，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮必须读取

1. `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md`
5. `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md`
6. `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md`
7. `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
8. `remotion/src/ThirtySecondReferenceSample.tsx`

## 本轮产物

- 已确认：新增三表执行包为 `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`。
- 已确认：`reference_learning_checklist` 覆盖 opening、captions、stickers、scrapbook / split、transition、end card、music-visual alignment、slowdown breath、motif reprise。
- 已确认：`visual_selection_table` 覆盖当前 30 秒样片全部 18 个 visual segment。
- 已确认：`video_event_table` 覆盖 18 个 visual segment、10 个 caption events、11 个 sticker events、scrapbook / split、end card、transition / cut / clip changes、BGM key sections。
- 已确认：`hard_fail_summary` 与 `next_fix_route` 已写入三表执行包。

## 当前判断

`three_tables_pack_completed_fix_pending`

已确认：本轮三张表已完成，但当前视频仍为 `fix_pending`。

已确认：样片技术元数据通过只代表文件可解码，不代表内容通过。

已确认：不得把本轮写成当前视频已修好、30 秒样片已通过、Codex 稳定 vlog 导演能力成立或 Remotion 能力已验证。

## 下一个目标

下一个目标：根据 `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` 的 `hard_fail_summary` 与 `next_fix_route` 决定下一步路线。

默认下一步不应直接进入 Remotion。只有 `reference_layer`、`visual_selection_layer`、`event_layer`、`transition_layer`、`bgm_layer` 至少达到 `partial`，且问题明确落到执行参数层时，才允许进入 Remotion 修复。

## 本轮完成定义

本轮只有在三表执行包、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
