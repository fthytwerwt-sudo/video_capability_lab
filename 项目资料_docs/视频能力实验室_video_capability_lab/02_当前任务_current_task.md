# 当前任务

当前任务：`reference_visual_language_to_asset_spec`。

当前目标：基于 `reference_judgement_library（对标判断库）`，生成当前 30 秒样片的 `reference_visual_language_to_asset_spec（对标视觉语言到资产规格）`。

当前状态：`asset_spec_completed_asset_generation_pending`。

下一状态：`asset_generation_route_decision_pending`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮输入

- task_type: `reference_visual_language_to_asset_spec`
- true_goal: 把已有对标判断库和当前样片风格锚点，翻译成可执行的 sticker / caption / motion / asset route 规格。
- source_library: `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
- source_replan: `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`
- output_file: `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
- new_reference_pack_this_round: `false`
- judgement_source: `library_derived`
- reference_timecode_policy: `not_applicable_library_derived`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- sticker_asset_generation_allowed_this_round: `false`
- file_change_scope: `asset_spec_markdown + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前不是修视频。
- 已确认：当前不是 render。
- 已确认：当前不是调用 API。
- 已确认：当前不是生成贴纸、下载素材或提交贴纸图片。
- 已确认：当前不是修改 Remotion 源码。
- 已确认：当前不是修改 Remotion 数据文件。
- 已确认：当前不是把 `31` 当成资产已生成、视觉语言已通过或内容已通过。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮规格结果

- 已确认：`31` 已从判断库选出 7 类本轮适用判断。
- 已确认：`31` 已明确本轮没有新增对标视频，判断来源为 `library_derived`。
- 已确认：`31` 已定义临时风格锚点 `soft_vlog_breath_with_light_comic_object_moments`。
- 已确认：`31` 已生成 5 个当前样片可用 sticker asset spec。
- 已确认：`31` 已生成 `caption_mood_spec`、`motion_spec` 和 `asset_route_decision`。
- 已确认：`31` 已明确本轮不生成资产、不 render、不调用 API、不修改 Remotion。

## 下一个目标

根据 `31` 的 `asset_route_decision` 决定下一轮路线：

1. `pure_code_svg`：只用于简单箭头、圈注、轨迹线、呼吸边缘线，并必须服从视觉规格。
2. `local_asset_pack`：用于纸感、胶贴感、复杂纹理或纯代码容易变丑的资产。
3. `api_generated_candidate`：只作为透明背景候选资产辅助，必须经过人审或 frame review。

## 本轮完成定义

本轮只有在 `31`、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
