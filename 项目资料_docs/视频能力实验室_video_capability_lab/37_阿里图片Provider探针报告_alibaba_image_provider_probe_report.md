# 阿里图片 Provider 探针报告

## 1. status

- task_type: `alibaba_image_contract_and_watermark_free_sticker_probe`
- selected_provider: `alibaba_dashscope`
- preferred_model: `qwen-image-2.0-pro`
- selected_model: `qwen-image-2.0-pro`
- endpoint: `https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`
- contract_source:
  - `https://help.aliyun.com/zh/model-studio/text-to-image`
  - `https://help.aliyun.com/zh/model-studio/qwen-image-api`
- api_call_status: `succeeded_after_user_retry_instruction`
- final_http_status: `200`
- generation_count: `1`
- output_status: `local_ignored_only`
- candidate_status: `watermark_free_single_candidate_generated_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮只调用阿里 `alibaba_dashscope` 一个 provider，未调用 zhipu、MiniMax 或第二个 provider。

已确认：用户修正额度状态后，Codex 按最新指令重新发起 1 次阿里图片生成请求，最终返回 1 张图片。

已确认：本轮未修改 Remotion，未 render，未接入视频。

已确认：图片只保存在 ignored 本地 `tmp/` 目录，不提交 Git。

## 2. contract_resolution

| item | value |
|---|---|
| provider | `alibaba_dashscope` |
| model | `qwen-image-2.0-pro` |
| text_to_image_supported | `true` |
| endpoint_or_sdk | `HTTP POST /api/v1/services/aigc/multimodal-generation/generation` |
| auth_method | `Authorization: Bearer <DASHSCOPE_API_KEY>` |
| preferred_model_available | `true` |
| request_fields | `model`, `input.messages[0].role`, `input.messages[0].content[0].text`, `parameters.negative_prompt`, `parameters.prompt_extend`, `parameters.watermark`, `parameters.size`, `parameters.n` |
| response_image_field | `output.choices[0].message.content[0].image` |
| supports_transparent_background | `unknown` |
| supports_no_watermark | `true_by_parameter_watermark_false_pending_output_review` |
| confidence | `high_for_contract_medium_for_output_quality` |

已确认：官方文档将 `qwen-image-2.0-pro` 标为推荐模型，并说明其文字渲染能力较强。

已确认：官方文档显示 `watermark` 参数默认 `false`，本轮请求显式设置 `watermark=false`。

待验证：官方文档未确认透明背景输出能力；本轮实际图片也没有 alpha 通道。

## 3. env_check

| item | result |
|---|---|
| `.env` exists | `true` |
| `.env` ignored | `true` |
| `DASHSCOPE_API_KEY` present | `true` |
| key printed | `false` |
| env staged | `false` |
| env committed | `false` |

已确认：本报告不记录 API key，不记录 token，不记录 secret。

## 4. prompt_summary

本轮 prompt 目标：

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
| output_path | `tmp/无水印贴纸候选_watermark_free_sticker_candidates/阿里无水印纸感拟声标签测试_alibaba_watermark_free_paper_sound_tag_probe_01.png` |
| metadata_path | `tmp/无水印贴纸候选_watermark_free_sticker_candidates/阿里无水印纸感拟声标签测试_alibaba_watermark_free_paper_sound_tag_probe_01_metadata.json` |
| local_file_committed | `false` |
| git_ignore_source | `.gitignore` -> `tmp/` |
| image_format | `PNG` |
| image_size | `1024x1024` |
| has_alpha | `false` |
| transparent_background_status | `clean_cutout_source_pending_user_review` |

已确认：图片为 `PNG 1024x1024 RGB`，没有 alpha 透明通道。

部分成立：视觉上贴纸边界清楚、背景干净，但不是透明背景；因此只能作为 `clean_cutout_source_pending_user_review`，不能写成 transparent PNG。

## 6. candidate_review_table

| check_item | result | notes |
|---|---|---|
| API request succeeded | `pass` | 用户修正额度状态后，阿里最终返回 `http_status=200`。 |
| one-provider-only | `pass` | 只调用 `alibaba_dashscope`。 |
| one-candidate-only | `pass` | 最终只保存 1 张候选图。 |
| file readable | `pass` | 本地 `file` 与 Python image check 均可读取。 |
| image format | `pass` | PNG。 |
| alpha channel | `fail` | RGB 图，无 alpha 通道。 |
| transparent background | `fail` | 非透明背景。 |
| clean cutout source | `partial` | 贴纸主体边缘清楚，但背景是米纸色纹理，不是纯白。 |
| no watermark | `pass` | 视觉自检未见明显水印。 |
| no generated label | `pass` | 视觉自检未见 `AI生成` 或 generated label。 |
| no logo / brand mark | `pass` | 视觉自检未见 logo 或 brand mark。 |
| one Chinese character | `pass` | 视觉上接近目标拟声字 `咔`。 |
| ready for Remotion | `fail` | 未透明，且未用户人审，不能直接接入 Remotion。 |

## 7. rejection_check

本轮候选不能写成 approved，原因：

1. `has_alpha=false`，不是 transparent PNG。
2. `transparent_background_status=clean_cutout_source_pending_user_review`，仍需用户判断是否接受抠图路线。
3. API 输出只能作为候选，不能绕过 frame review 或用户人审。

已确认：本轮没有发现明显水印、生成标识、logo 或 brand mark。

待验证：用户是否认可该图作为 `paper_sound_tag` 候选风格。

## 8. provider_route_decision

| provider_model | status | allowed_for_sticker_candidate | reason |
|---|---|---:|---|
| `alibaba_dashscope + qwen-image-2.0-pro` | `watermark_free_single_probe_passed_pending_user_review` | `pending_user_review` | 单图无明显水印 / 生成标识 / logo / brand mark，但无 alpha，需要用户人审。 |

已确认：阿里路线优于本项目上一张 `zhipu + glm-image` 候选的关键点是未见明显 `AI生成` 标识。

部分成立：阿里路线仍未证明可直接输出透明贴纸资产。

## 9. next_goal

用户人审该本地候选图；若认可风格，再决定是否进入 frame review / 抠图测试 / 第二张受控探针。

## 10. do_not_claim

本轮不得声明：

- `sticker asset approved`
- `sticker asset pack completed`
- `video fixed`
- `visual language passed`
- `Remotion integration completed`
- `vlog director capability verified`
