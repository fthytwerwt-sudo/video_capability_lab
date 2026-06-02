# 当前任务

当前任务：`alibaba_image_contract_and_watermark_free_sticker_probe`。

当前目标：使用本地 `.env` 中的 `DASHSCOPE_API_KEY`，通过阿里 DashScope `qwen-image-2.0-pro` 生成 1 张 `paper_sound_tag` 无水印贴纸候选。

当前状态：`watermark_free_single_candidate_generated_pending_user_review`。

下一状态：`user_review_alibaba_single_candidate`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮新增｜阿里图片 API 契约解析与单图探针

- task_type: `alibaba_image_contract_and_watermark_free_sticker_probe`
- true_goal: 用阿里图片模型生成 1 张无水印 `paper_sound_tag` 贴纸候选，验证阿里路线是否适合后续贴纸候选。
- selected_provider: `alibaba_dashscope`
- preferred_model: `qwen-image-2.0-pro`
- selected_model: `qwen-image-2.0-pro`
- endpoint: `https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`
- auth_method: `HTTP Bearer DASHSCOPE_API_KEY`
- api_call_status: `succeeded_after_user_retry_instruction`
- first_attempt_status: `blocked_quota_free_tier_only`
- final_attempt_http_status: `200`
- generation_request_count_after_user_retry_instruction: `1`
- generation_count: `1`
- output_status: `local_ignored_only`
- output_path: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/阿里无水印纸感拟声标签测试_alibaba_watermark_free_paper_sound_tag_probe_01.png`
- image_format: `PNG`
- image_size: `1024x1024`
- has_alpha: `false`
- transparent_background_status: `clean_cutout_source_pending_user_review`
- watermark_check: `pass`
- generated_label_check: `pass`
- logo_brand_mark_check: `pass`
- candidate_status: `watermark_free_single_candidate_generated_pending_user_review`
- report_file: `项目资料_docs/视频能力实验室_video_capability_lab/37_阿里图片Provider探针报告_alibaba_image_provider_probe_report.md`
- contract_file: `项目资料_docs/视频能力实验室_video_capability_lab/38_阿里图片API契约解析_alibaba_image_api_contract.md`

已确认：本轮已读取阿里官方文档，确认 `qwen-image-2.0-pro` 是推荐模型，HTTP 同步接口为 `POST /api/v1/services/aigc/multimodal-generation/generation`。

已确认：`.env` 中 `DASHSCOPE_API_KEY` 存在，但没有打印 key；`.env` 是 ignored 本地密钥文件，未提交。

已确认：本轮只调用阿里一个 provider；用户修正额度状态后，Codex 按最新指令重新发起 1 次图片生成请求，未调用 zhipu、MiniMax 或第二个 provider。

已确认：阿里 API 最终返回 `http_status=200`，并返回 1 张 PNG 图片 URL；Codex 已下载到 ignored 本地 `tmp/` 目录。

已确认：图片为 `PNG 1024x1024 RGB`，没有 alpha 透明通道；视觉自检未发现明显水印、`AI生成` 标识、logo 或 brand mark。

部分成立：图片背景不是透明背景，但贴纸主体边缘清楚，当前记为 `clean_cutout_source_pending_user_review`，必须等待用户人审。

已确认：本轮未修改 Remotion，未 render，未接入视频，未提交图片、`tmp`、`.env` 或 runtime assets。

待验证：用户是否认可该阿里单图候选进入后续 frame review 或抠图处理；不能直接接入 Remotion。

不得声明：`Alibaba no-watermark provider verified`、`sticker asset approved`、`sticker asset pack completed`、`video fixed`、`visual language passed`、`Remotion integration completed`、`vlog director capability verified`。

## 本轮新增｜阿里图片 API env 配置

- task_type: `alibaba_image_env_setup`
- true_goal: 用户想切换到阿里图片 API；Codex 本轮只建立安全的本地 env 填写入口。
- selected_provider: `alibaba_dashscope`
- key_field: `DASHSCOPE_API_KEY`
- alias_field: `ALIBABA_DASHSCOPE_API_KEY`
- env_template_file: `.env.example`
- local_env_file: `.env`
- env_status: `env_prepared_pending_user_key`
- policy_provider_status: `env_prepared_pending_user_key`
- next_probe: `alibaba_image_contract_and_watermark_free_sticker_probe`
- api_call_allowed_this_round: `false`
- asset_generation_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`

已确认：本轮只创建 / 更新阿里图片 API 的 env 字段，不调用阿里 API。

已确认：本轮不调用任何图片生成 API，不生成图片，不修改 Remotion，不 render。

已确认：`.env.example` 只保存空字段和默认策略值，不允许写入真实 API key。

已确认：本地 `.env` 已补齐 `DASHSCOPE_API_KEY` 等阿里字段，等待用户手动填写；`.env` 是 ignored 本地密钥文件，不提交 Git。

待验证：阿里图片 API 的真实 endpoint、model、请求字段、返回字段、无水印能力、透明 PNG 或 clean cutout 能力，必须等用户填写 key 后由下一轮读取官方文档并做单图探针。

不得声明：`Alibaba API verified`、`Alibaba model resolved`、`Alibaba no-watermark provider verified`、`sticker asset approved`、`sticker asset pack completed`、`video fixed`、`visual language passed`、`Remotion integration completed`、`vlog director capability verified`。

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

## 本轮新增｜MiniMax key 修正后单图重跑

- task_type: `minimax_watermark_free_sticker_rerun`
- selected_provider: `minimax`
- selected_model: `image-01`
- endpoint: `https://api.minimax.io/v1/image_generation`
- api_call_status: `failed`
- blocked_status: `blocked_minimax_api_call_failed_invalid_api_key_after_rerun`
- generation_count: `0`
- local_failure_response: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax重跑请求失败_minimax_rerun_request_failed.json`

已确认：本轮已使用修正后写入 `.env` 的 MiniMax key，但未打印 key。

已确认：本轮只调用 MiniMax，只发起 1 次图片生成请求，未调用 zhipu 或第二个 provider。

已确认：MiniMax API 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`，因此未生成图片。

已确认：本轮没有图片可检查，不能判断 no watermark / no generated label / no logo / transparent background。

待验证：需要更换为 MiniMax official API Platform 可用 key，或改走下一个未被策略禁用的无水印图片 provider。

## 本轮新增｜MiniMax 新 key 单图探针

- task_type: `minimax_new_key_watermark_free_sticker_probe`
- selected_provider: `minimax`
- selected_model: `image-01`
- endpoint: `https://api.minimax.io/v1/image_generation`
- api_call_status: `failed`
- blocked_status: `blocked_minimax_api_call_failed_invalid_api_key_after_new_key`
- generation_count: `0`
- env_example_secret_found: `true`
- env_example_secret_cleaned: `true`
- local_failure_response: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax新Key请求失败_minimax_new_key_request_failed.json`

已确认：本轮发现 `.env.example` 曾出现疑似真实 MiniMax key，已在不打印 key 的情况下迁回 ignored `.env` 并清空模板。

已确认：本轮使用新 key 只调用 MiniMax 1 次，未调用 zhipu 或第二个 provider。

已确认：MiniMax API 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`，因此未生成图片。

已确认：本轮没有图片可检查，不能判断 no watermark / no generated label / no logo / transparent background。

待验证：需要回到 MiniMax 控制台确认该 key 是否真的是 API Platform 的 API key，不是网页端、Token Plan 或其他产品线 key。

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
