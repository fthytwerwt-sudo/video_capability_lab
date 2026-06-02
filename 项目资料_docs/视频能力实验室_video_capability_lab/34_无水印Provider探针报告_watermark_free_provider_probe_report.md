# 无水印 Provider 探针报告

## 1. status

- task_type: `minimax_new_key_watermark_free_sticker_probe`
- selected_provider: `minimax`
- selected_model: `image-01`
- endpoint: `https://api.minimax.io/v1/image_generation`
- api_call_status: `failed`
- blocked_status: `blocked_minimax_api_call_failed_invalid_api_key_after_new_key`
- generation_count: `0`
- output_status: `no_image_generated`
- candidate_status: `blocked_minimax_api_call_failed_invalid_api_key_after_new_key`
- content_status: `watermark_free_provider_probe_blocked_before_candidate_generation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮已先解析 MiniMax 静态图片生成 API 契约，没有让用户继续补模型名。

已确认：本轮只调用 MiniMax 一个 provider。

已确认：本轮只发起 1 次 MiniMax 图片生成请求。

已确认：MiniMax API 返回 `base_resp.status_code=2049`，`status_msg=invalid api key`，因此未返回图片。

已确认：本轮未调用 zhipu，未调用第二个 provider，未生成第二张候选图。

已确认：本轮未修改 Remotion，未 render，未接入视频。

已确认：`.env` 是本地 ignored file，未提交；报告未记录 API key 或 group id。

## 1.1 rerun_status

- rerun_task_type: `minimax_watermark_free_sticker_rerun`
- rerun_goal: 使用修正后的 MiniMax key 复用 `image-01` 契约，只重跑 1 次单图探针。
- rerun_api_call_status: `failed`
- rerun_blocked_status: `blocked_minimax_api_call_failed_invalid_api_key_after_rerun`
- rerun_generation_count: `0`
- rerun_local_failure_response: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax重跑请求失败_minimax_rerun_request_failed.json`

已确认：本轮重跑只发起 1 次 MiniMax 图片生成请求。

已确认：MiniMax API 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。

已确认：本轮未生成图片，因此没有候选图可进入 watermark / generated label / logo / alpha 检查。

## 1.2 new_key_probe_status

- new_key_task_type: `minimax_new_key_watermark_free_sticker_probe`
- new_key_goal: 使用用户新建并填入 `.env` 的 MiniMax key 复用 `image-01` 契约，只调用 1 次图片生成 API。
- env_example_secret_found: `true`
- env_example_secret_cleaned: `true`
- new_key_api_call_status: `failed`
- new_key_blocked_status: `blocked_minimax_api_call_failed_invalid_api_key_after_new_key`
- new_key_generation_count: `0`
- new_key_local_failure_response: `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax新Key请求失败_minimax_new_key_request_failed.json`

已确认：`.env.example` 中出现的疑似真实 key 已清空，未提交。

已确认：MiniMax API 对新 key 仍返回 `base_resp.status_code=2049` / `status_msg=invalid api key`。

已确认：本轮未生成图片，因此没有候选图可进入 watermark / generated label / logo / alpha 检查。

## 2. env_check

| item | result |
|---|---|
| `.env` exists | `true` |
| `.env` ignored | `true` |
| MiniMax key present | `true` |
| MiniMax group id present | `false` |
| MiniMax model present before resolution | `false` |
| MiniMax model resolved by Codex | `image-01` |
| key printed | `false` |
| env staged | `false` |
| env committed | `false` |

已确认：MiniMax 官方图片生成文档没有要求 `MINIMAX_GROUP_ID`；鉴权方式为 `Authorization: Bearer <API_key>`。

已确认：本轮检测到 key 形式不以 `Bearer ` 开头，也没有外层引号；但 MiniMax API 返回 key invalid，说明当前本地 key 对该 API 不可用或已无效。

## 3. contract_resolution

```yaml
minimax_contract_resolution:
  static_image_generation_supported: true
  endpoint: https://api.minimax.io/v1/image_generation
  model: image-01
  auth_method: HTTP Bearer API_key
  requires_group_id: false
  request_fields:
    - model
    - prompt
    - aspect_ratio
    - response_format
    - n
    - prompt_optimizer
  response_image_field:
    - data.image_base64
    - data.image_urls
  supports_transparent_background: not_documented
  supports_no_watermark: not_documented_must_verify_by_output
  source:
    - https://platform.minimax.io/docs/guides/image-generation
    - https://platform.minimax.io/docs/api-reference/image-generation-t2i
    - https://platform.minimax.io/docs/api-reference/api-overview
  confidence: high_for_contract_low_for_watermark_quality
```

已确认：MiniMax 官方 API Overview 将 `image-01` 列为图片生成模型，支持 text-to-image 与 image-to-image。

已确认：Text-to-Image API 文档明确 `POST /v1/image_generation`、`model=image-01`、`response_format=url|base64`、`n` 范围为 `1..9`。

待验证：MiniMax `image-01` 的实际输出是否无水印、无生成标识、无 logo / brand mark，以及是否支持透明背景。由于本轮 key invalid，未进入图片质量判断。

## 4. prompt_summary

本轮生成请求 prompt 目标：

- Single original vlog overlay sticker asset.
- 小纸签 / 轻贴纸标签。
- 只承载 1 个中文拟声字：`咔`。
- 纸感、软边、轻阴影、少量胶贴感。
- 浅暖纸色接近 `#f6d7a8`。
- 深咖灰手写中文字。
- 低饱和、gentle、handmade、vlog diary feeling。
- 无 watermark、无 AI generated label、无 generated label、无 logo、无 brand mark。
- 优先 transparent background；若不支持，使用 clean solid background suitable for cutout。

## 5. output

| item | value |
|---|---|
| output_dir | `tmp/无水印贴纸候选_watermark_free_sticker_candidates/` |
| output_path | `null` |
| local_failure_response | `tmp/无水印贴纸候选_watermark_free_sticker_candidates/MiniMax请求失败_minimax_request_failed.json` |
| local_file_committed | `false` |
| git_ignore_source | `.gitignore` -> `tmp/` |
| image_format | `null` |
| image_size | `null` |
| has_alpha | `null` |
| transparent_background_status | `not_generated` |

已确认：失败响应只保存在 ignored 本地目录，不提交 Git。

## 6. candidate_review_table

| check_item | result | notes |
|---|---|---|
| contract resolved | `pass` | 官方文档确认静态图片生成 endpoint 和 `image-01` 模型。 |
| MiniMax key present | `pass` | 本地 `.env` 有 key，但未打印。 |
| group id required | `pass` | 官方图片 API 未要求 group id。 |
| one-provider-only | `pass` | 本轮只调用 MiniMax。 |
| one-request-only | `pass` | 本轮只发起 1 次 MiniMax 图片生成请求。 |
| API request succeeded | `fail` | MiniMax 首次请求、修正后重跑、本轮新 key 探针均返回 `invalid api key`。 |
| one-candidate-only | `not_applicable` | API 未返回图片。 |
| file readable | `not_applicable` | API 未返回图片。 |
| transparent background | `not_applicable` | API 未返回图片。 |
| no watermark / generated label | `not_applicable` | API 未返回图片。 |
| no logo / brand mark | `not_applicable` | API 未返回图片。 |
| ready for user review | `fail` | 未生成候选图，不能进入人审。 |

## 7. rejection_check

本轮不是图片质量 rejected，而是 API 调用 blocked：

1. MiniMax 静态图片生成契约已解析。
2. MiniMax API key 在本地存在。
3. MiniMax API 对新 key 仍返回 `invalid api key`，未生成图片。
4. 未生成图片，因此无法判断 watermark、generated label、logo、brand mark 或透明背景。

已确认：不得把本轮写成 MiniMax 无水印路线通过。

已确认：不得调用第二个 provider 补结果。

## 8. provider_route_decision

| provider_model | status | allowed_for_sticker_candidate | reason |
|---|---|---:|---|
| `minimax + image-01` | `contract_resolved_api_call_failed_invalid_api_key_after_new_key` | `false` | 新 key 仍返回 API key invalid，未生成图片，不能判断输出质量。 |

待验证：更换为 MiniMax 官方可用 API key 后，才能重跑单图候选并判断是否无水印。

## 9. next_goal

回到 MiniMax 控制台确认该 key 是否真的是 API Platform 的 API key；如果仍不可用，进入下一个未被策略禁用的无水印图片 provider 探针。

## 10. do_not_claim

本轮不得声明：

- MiniMax no-watermark provider verified
- sticker asset approved
- sticker asset pack completed
- video fixed
- visual language passed
- Remotion integration completed
- vlog director capability verified
