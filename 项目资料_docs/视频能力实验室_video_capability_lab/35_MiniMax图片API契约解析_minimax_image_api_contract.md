# MiniMax 图片 API 契约解析

## 1. status

- task_type: `minimax_image_api_contract_resolution`
- provider: `minimax`
- contract_status: `resolved_from_official_docs`
- static_image_generation_supported: `true`
- selected_model: `image-01`
- endpoint: `https://api.minimax.io/v1/image_generation`
- auth_method: `HTTP Bearer API_key`
- requires_group_id: `false`
- generation_probe_status: `blocked_minimax_api_call_failed_invalid_api_key`

已确认：本文件只记录 MiniMax 静态图片生成 API 契约，不记录 API key，不记录 group id，不提交本地失败响应或图片。

## 2. sources

| source_type | url | confirmed_fact |
|---|---|---|
| official guide | `https://platform.minimax.io/docs/guides/image-generation` | Image Generation service includes Text-to-Image and Image-to-Image; sample endpoint is `https://api.minimax.io/v1/image_generation`; sample model is `image-01`; auth uses bearer token. |
| official API reference | `https://platform.minimax.io/docs/api-reference/image-generation-t2i` | Text-to-Image endpoint is `POST /v1/image_generation`; `model` is required and available option is `image-01`; `response_format` supports `url` and `base64`; `n` supports one or more outputs. |
| official API overview | `https://platform.minimax.io/docs/api-reference/api-overview` | Image Generation model list includes `image-01`, described as a high-quality image generation model supporting text-to-image and image-to-image. |

已确认：以上均为 MiniMax official docs。

## 3. resolved_contract

```yaml
provider: minimax
static_image_generation_supported: true
endpoint: https://api.minimax.io/v1/image_generation
http_method: POST
model: image-01
auth_method: HTTP Bearer API_key
requires_group_id: false
content_type: application/json
request_fields:
  model:
    required: true
    selected_value: image-01
  prompt:
    required: true
    max_length: 1500
  aspect_ratio:
    required: false
    selected_value: 1:1
    documented_options:
      - 1:1
      - 16:9
      - 4:3
      - 3:2
      - 2:3
      - 3:4
      - 9:16
      - 21:9
  response_format:
    required: false
    selected_value: base64
    documented_options:
      - url
      - base64
  n:
    required: false
    selected_value: 1
    documented_range: 1..9
  prompt_optimizer:
    required: false
    selected_value: false
response_image_fields:
  base64: data.image_base64
  url: data.image_urls
```

## 4. generation_probe_request

本轮真实请求字段：

```yaml
model: image-01
aspect_ratio: 1:1
response_format: base64
n: 1
prompt_optimizer: false
```

已确认：本轮只发起 1 次请求。

已确认：本轮没有使用视频模型、文本模型或视觉理解模型冒充静态图片生成模型。

## 5. api_result

```yaml
api_call_status: failed
base_resp.status_code: 2049
base_resp.status_msg: invalid api key
image_returned: false
candidate_generated: false
```

已确认：该失败来自 MiniMax API 返回值，不是 Codex 猜测。

## 6. watermark_capability_status

| capability | status | reason |
|---|---|---|
| no watermark | `待验证` | 未生成图片，不能判断。 |
| no generated label | `待验证` | 未生成图片，不能判断。 |
| no logo / brand mark | `待验证` | 未生成图片，不能判断。 |
| transparent background | `待验证` | 官方文档未明确透明背景能力，本轮未生成图片。 |
| clean cutout source | `待验证` | 未生成图片，不能判断。 |

## 7. next_goal

使用 MiniMax official API Platform 可用的 API key 重新执行单图探针；重跑前不得接入 Remotion，不得批量生成，不得写成贴纸资产通过。
