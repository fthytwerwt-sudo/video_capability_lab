# 阿里图片 API 契约解析

## 1. status

- task_type: `alibaba_image_api_contract_resolution`
- provider: `alibaba_dashscope`
- selected_model: `qwen-image-2.0-pro`
- contract_status: `resolved_from_official_docs`
- confidence: `high_for_contract_medium_for_watermark_quality_low_for_transparent_background`
- source:
  - `https://help.aliyun.com/zh/model-studio/text-to-image`
  - `https://help.aliyun.com/zh/model-studio/qwen-image-api`

## 2. official_contract

| item | value |
|---|---|
| API family | `千问-文生图 / Qwen-Image` |
| model | `qwen-image-2.0-pro` |
| endpoint | `https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation` |
| method | `POST` |
| auth | `Authorization: Bearer <DASHSCOPE_API_KEY>` |
| content_type | `application/json` |
| sync_supported | `true` |
| output_format | `PNG` |
| response_image_field | `output.choices[0].message.content[0].image` |

已确认：官方文档说明千问图像模型支持同步接口，一次请求即可获得结果。

已确认：北京地域 endpoint 为 `https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation`。

已确认：鉴权方式是 `Authorization: Bearer <DASHSCOPE_API_KEY>`。

## 3. request_fields

```json
{
  "model": "qwen-image-2.0-pro",
  "input": {
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "text": "<prompt>"
          }
        ]
      }
    ]
  },
  "parameters": {
    "negative_prompt": "<negative_prompt>",
    "prompt_extend": false,
    "watermark": false,
    "size": "1024*1024",
    "n": 1
  }
}
```

已确认：本轮使用 `n=1`，不做批量生成。

已确认：本轮显式设置 `watermark=false`。

已确认：本轮将 `.env` 的 `ALIBABA_IMAGE_SIZE=1024x1024` 转为 API 需要的 `1024*1024`。

## 4. response_fields

成功响应中的图片 URL 字段：

```text
output.choices[0].message.content[0].image
```

已确认：URL 有效期有限，必须立即下载保存；本轮已保存到 ignored 本地 `tmp/` 目录。

## 5. capability_judgement

| capability | status | evidence |
|---|---|---|
| text_to_image_supported | `true` | 官方文档和本轮 API 成功响应。 |
| preferred_model_available | `true` | `qwen-image-2.0-pro` 最终返回图片。 |
| no_watermark_output | `passed_by_visual_self_check_pending_user_review` | 本轮图像未见明显水印。 |
| no_generated_label | `passed_by_visual_self_check_pending_user_review` | 本轮图像未见 `AI生成` 或 generated label。 |
| no_logo_or_brand_mark | `passed_by_visual_self_check_pending_user_review` | 本轮图像未见 logo / brand mark。 |
| transparent_png | `false` | 本轮 PNG 为 RGB，无 alpha 通道。 |
| clean_cutout_source | `partial_pending_user_review` | 贴纸边界清楚，但背景是米纸色纹理，不是纯白。 |

## 6. unresolved_items

- 待验证：阿里 `qwen-image-2.0-pro` 是否存在可控透明背景参数。
- 待验证：同模型是否能稳定生成干净可抠图背景。
- 待验证：该候选是否符合用户对 `paper_sound_tag` 的审美判断。
- 待验证：是否需要后续单独做 frame review / 抠图测试。

## 7. do_not_claim

本契约解析不得被理解为：

- 贴纸资产已批准。
- 贴纸资产包已完成。
- 视频已修好。
- Remotion 已接入。
- vlog director capability 已成立。
