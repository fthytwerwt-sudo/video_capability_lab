# 当前任务

当前任务：`reference_visual_language_replan`。

当前目标：重判当前 30 秒样片的贴纸 UI、字幕贴纸氛围、motion language、visual mood 和 BGM 依赖问题，并决定下一步路线。

当前状态：`reference_structure_partial_ui_language_failed`。

下一状态：`sticker_style_system_and_asset_pack_spec_pending`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮输入

- user_input: 用户指出“位置都没错”，但 Codex 执行出的贴纸 UI 很丑，字幕 + 贴纸让视频单调，气氛基本由音乐带起来，像基础剪辑。
- task_type: `reference_visual_language_replan`
- target_sample: `三十秒对标样片-30s-reference-sample`
- source_review_report: `项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`
- output_report: `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`
- source_data: `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- source_composition: `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- file_change_scope: `mechanism_docs + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：本轮不 render，不修改 Remotion 源码，不修改视频数据文件。
- 已确认：本轮不调用外部 API，不生成 sticker assets，不安装依赖。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮不继续直接调 x/y、fontSize、SVG 尺寸或贴纸数量。
- 已确认：本轮不把 `27` 的有限修复写成视觉语言已通过。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮判断

当前不是：

- 不是 `placement_failure`。
- 不是 `quantity_failure`。
- 不是 `render_failure`。
- 不是基础 SVG 能力问题。
- 不是继续 Remotion 小修能直接解决的问题。

当前是：

- `sticker_ui_language_failure`
- `caption_sticker_mood_failure`
- `reference_visual_language_not_loaded`
- `bgm_over_dependency`
- `basic_editing_only`

## 路线决策

主路线：`sticker_style_system + sticker_asset_pack_spec`。

辅助路线：`API-generated sticker pack`，仅在需要更强图形风格时使用，且必须先有 sticker spec。

弱路线：pure code SVG/CSS stickers，只适合低复杂度线条、箭头、圈注、呼吸线和最小标点。

## 下一个目标

进入 `sticker_style_system_and_asset_pack_spec`：

1. 定义 `sticker_family`。
2. 定义 `visual_reference`。
3. 定义 `graphic_shape`。
4. 定义 `material_feel`。
5. 定义 `color_palette`。
6. 定义 `size_range`。
7. 定义 `use_case`。
8. 定义 `do_not_use_when`。
9. 定义 `motion_rule`。
10. 定义 `failure_rule`。

## 本轮完成定义

本轮只有在 `28` 重判报告、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
