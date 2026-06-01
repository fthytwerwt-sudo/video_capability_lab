# 当前任务

当前任务：`api_sticker_env_setup`。

当前目标：为后续 `api_generated_sticker_candidate_probe（API 贴纸候选探针）` 创建安全的本地环境变量入口。

当前状态：`api_sticker_env_created_pending_user_key`。

下一状态：`api_generated_sticker_candidate_probe_pending_user_key`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮输入

- task_type: `api_sticker_env_setup`
- true_goal: 让用户可以在本地 `.env` 中手动填写图片生成 API key，为下一轮 API 贴纸候选探针做准备。
- previous_completed_input: `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
- env_example_path: `.env.example`
- local_env_path: `.env`
- gitignore_path: `.gitignore`
- env_status: `local_ignored_pending_user_key`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- sticker_asset_generation_allowed_this_round: `false`
- file_change_scope: `.gitignore + .env.example + local .env + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前不是修视频。
- 已确认：当前不是 render。
- 已确认：当前不是调用 API。
- 已确认：当前不是生成贴纸、下载素材或提交贴纸图片。
- 已确认：当前不是修改 Remotion 源码。
- 已确认：当前不是修改 Remotion 数据文件。
- 已确认：当前不是验证智谱 AI / MiniMax / 阶跃星辰 API 是否可用。
- 已确认：当前不是把 `.env` 创建写成 API 可用、贴纸候选已生成、资产已生成或视频已修好。
- 已确认：`.env` 是本地密钥文件，只能本地存在，不提交 Git，不打印真实值。
- 已确认：`.env.example` 只包含空占位和安全默认开关，不包含真实 API key。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮 env 结果

- 已确认：上一轮 `31` 已完成，当前仍是 `asset_spec_completed_asset_generation_pending` 的后续准备阶段。
- 已确认：`.env.example` 是可提交模板，只包含 provider 字段、输出目录字段和安全限制字段。
- 已确认：`.env` 是本地 ignored file，用于用户手动填写 key；`.env` 不属于 remote verified 文件。
- 已确认：下一轮 API probe 必须先读取 `.env` 的 key 是否存在，但不得打印 key。
- 待验证：用户是否已经在 `.env` 填写真实 API key。
- 待验证：任一图片生成 provider 是否可用。

## 下一个目标

用户在本地 `.env` 填写 key 后，进入 `api_generated_sticker_candidate_probe（API 贴纸候选探针）`。

下一轮仍必须遵守：

1. API 只能生成透明背景候选资产，不能绕过审美判断。
2. API probe 不等于 sticker assets 已通过。
3. API probe 不等于当前视频已修好。
4. API probe 不等于 `vlog_director_capability` 已成立。

## 本轮完成定义

本轮只有在 `.env.example`、`.gitignore`、当前任务、执行桥接包、latest 更新后，`.env` 已被忽略且未 staged，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。

已确认：`.env` 是 local ignored file，不属于 remote verified 文件。
