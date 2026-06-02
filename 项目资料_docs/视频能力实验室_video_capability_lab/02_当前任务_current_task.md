# 当前任务

当前任务：`minimax_image_contract_and_watermark_free_sticker_probe`。

当前目标：先解析 MiniMax 静态图片生成 API 契约，再用 1 次 MiniMax 请求验证是否能生成无水印 `paper_sound_tag` 贴纸候选。

当前状态：`blocked_minimax_api_call_failed_invalid_api_key`。

下一状态：`minimax_valid_key_reprobe_pending`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮新增｜MiniMax 图片契约解析与单图探针

- task_type: `minimax_image_contract_and_watermark_free_sticker_probe`
- true_goal: 用户只填写 MiniMax API key，Codex 自动查清静态图片生成模型、endpoint、请求字段和返回字段，并只生成 1 张无水印贴纸候选。
- selected_provider: `minimax`
- resolved_model: `image-01`
- endpoint: `https://api.minimax.io/v1/image_generation`
- auth_method: `HTTP Bearer API_key`
- group_id_required: `false`
- api_call_status: `failed`
- blocked_status: `blocked_minimax_api_call_failed_invalid_api_key`
- generation_count: `0`
- report_file: `项目资料_docs/视频能力实验室_video_capability_lab/34_无水印Provider探针报告_watermark_free_provider_probe_report.md`
- contract_file: `项目资料_docs/视频能力实验室_video_capability_lab/35_MiniMax图片API契约解析_minimax_image_api_contract.md`

已确认：MiniMax 官方文档已确认静态图片生成 endpoint 和模型 `image-01`，Codex 没有让用户继续补模型名。

已确认：本轮只发起 1 次 MiniMax 图片生成请求，API 返回 `base_resp.status_code=2049` / `invalid api key`，因此未生成图片。

已确认：本轮没有调用 zhipu，没有调用第二个 provider，没有批量生成，没有修改 Remotion，没有 render。

已确认：`.env` 和 `tmp/` 均为 ignored；`.env`、失败响应和运行产物不得提交。

待验证：更换或修正 MiniMax official API Platform 可用 key 后，才能重新执行单图候选并判断 no watermark / no generated label / no logo / transparent or clean cutout source。

## 本轮输入

- task_type: `watermark_free_image_policy_config`
- true_goal: 避免继续使用会带 `AI生成` 标识或水印的图片输出作为正式贴纸候选。
- previous_completed_input: `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
- source_probe_report: `项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md`
- policy_config_file: `配置_configs/图片生成策略_image_generation_policy.json`
- policy_report_file: `项目资料_docs/视频能力实验室_video_capability_lab/33_无水印图片生成配置修正_watermark_free_image_policy_config.md`
- downgraded_provider_model: `zhipu + glm-image`
- downgraded_status: `connection_probe_only`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- sticker_asset_generation_allowed_this_round: `false`
- batch_generation_allowed_this_round: `false`
- file_change_scope: `.env.example + image_generation_policy_config + 32_update + 33_policy_report + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前不是修视频。
- 已确认：当前不是 render。
- 已确认：当前不调用 API。
- 已确认：当前不生成新图片。
- 已确认：当前不去水印，不裁切水印，不修补水印。
- 已确认：当前不是批量生成贴纸包。
- 已确认：当前不是提交贴纸图片。
- 已确认：当前不是修改 Remotion 源码。
- 已确认：当前不是修改 Remotion 数据文件。
- 已确认：当前不是验证完整贴纸资产包成立。
- 已确认：当前不是验证视觉语言通过。
- 已确认：当前不是验证 vlog director capability 成立。
- 已确认：`.env` 是本地密钥文件，只能本地存在，不提交 Git，不打印真实值。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮配置修正结果

- 已确认：`32` 的失败事实已升级为配置硬门槛：无水印、无生成标识、无 logo、无 brand mark。
- 已确认：`zhipu + glm-image` 当前状态已降级为 `connection_probe_only`。
- 已确认：`zhipu + glm-image` 不允许作为正式 `sticker_candidate` provider，除非后续重新验证无水印输出。
- 已确认：带水印或 `AI生成` 标识的输出默认 `reject_candidate`，不是后处理去水印。
- 已确认：新增策略配置为 `配置_configs/图片生成策略_image_generation_policy.json`。
- 已确认：`.env.example` 已增加无水印和 provider route 策略字段。
- 已确认：本轮未调用 API，未生成新图，未修改 Remotion，未 render。
- 待验证：下一轮可用无水印 provider / model 是什么。

## 下一个目标

选择或验证 `watermark_free_provider_probe（无水印 provider 探针）`。

下一轮仍必须遵守：

1. 未来正式贴纸候选必须 no watermark / no generated label。
2. 带水印或 `AI生成` 标识的输出直接 rejected / blocked。
3. 不把去水印作为默认路线。
4. 无水印 provider 未验证前，不允许批量生成候选。
5. 配置修正不等于 sticker asset approved。

## 本轮完成定义

本轮只有在 `.env.example`、策略配置、`32`、`33`、当前任务、执行桥接包、latest 更新后，`.env` 已被忽略且未 staged，图片 / tmp / dist 未 staged，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。

已确认：`.env` 是 local ignored file，不属于 remote verified 文件。

已确认：已有生成图片仍是 local ignored file，不属于 remote verified 文件。
