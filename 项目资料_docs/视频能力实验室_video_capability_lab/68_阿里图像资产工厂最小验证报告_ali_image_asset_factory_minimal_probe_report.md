# 阿里图像资产工厂最小验证报告

## status（状态）

`ali_image_asset_factory_generated_1_sticker_1_font_card_pending_user_review`

已确认：本轮只做阿里图像 API 连接实测、1 个 `sticker_candidate（贴纸候选）`、1 个 `font_card_candidate（字体牌候选）`、资产元数据和审片总览图。

已确认：本轮不是 8 秒视频，不是完整正片，不是 Remotion 接入，不是字体系统建立，也不是贴纸资产批准。

## api_connection_status（API 连接状态）

| field | value |
|---|---|
| provider | `alibaba_dashscope` |
| model | `qwen-image-2.0-pro` |
| endpoint_host | `dashscope.aliyuncs.com` |
| official_docs_checked | `https://help.aliyun.com/zh/model-studio/text-to-image` / `https://help.aliyun.com/zh/model-studio/qwen-image-api` |
| env_file_exists | `true` |
| env_keys_present | `DASHSCOPE_API_KEY / ALIBABA_IMAGE_ENDPOINT / ALIBABA_IMAGE_MODEL / IMAGE_API_PROVIDER` |
| key_values_printed | `false` |
| client_found_or_created | `created_minimal_python_http_client` |
| smoke_test_script | `脚本_scripts/阿里图像资产工厂_ali_image_asset_factory/检查阿里图像API连接_check_ali_image_api_connection.py` |
| smoke_test_output | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/api_connection_check.json` |
| smoke_test_result | `passed / http_status=200 / image_url_present=true / image_url_stored=false` |

已确认：smoke test 只验证请求能发出、响应成功并含图片字段；该 smoke 响应不是正式候选资产。

## generated_assets（生成资产）

| asset_id | asset_type | local_path | image_metadata | transparent_ready | background_removal_required | review_status | approved_for_library | remotion_usage_status |
|---|---|---|---|---|---|---|---|---|
| `ali_sticker_candidate_01` | `sticker_candidate` | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/sticker_candidate_01.png` | `PNG / 1024x1024 / RGB` | `false` | `true` | `pending_user_review` | `false` | `not_used_yet` |
| `ali_font_card_candidate_01` | `font_card_candidate` | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/font_card_candidate_01.png` | `PNG / 1024x1024 / RGB` | `false` | `true` | `pending_user_review` | `false` | `not_used_yet` |

已确认：两张图片均由 `ali_image_api（阿里图像 API）` 生成并保存到 ignored `tmp/`，不提交 Git。

## sticker_candidate_result（贴纸候选结果）

| field | value |
|---|---|
| asset_id | `ali_sticker_candidate_01` |
| request_goal | 原创黄色表情脸，搞怪 / 无语 / 反应感，适合 vlog sticker 候选。 |
| visual_self_check | `passed_pending_user_review` |
| no_watermark_or_ui_self_check | `passed_pending_user_review` |
| transparent_ready | `false` |
| background_removal_required | `true` |
| review_status | `pending_user_review` |

部分成立：贴纸方向在“黄色无语表情 / emoji sticker 候选”维度成立，但没有 alpha，且未经过用户审美回审，不能写成可直接入片。

## font_card_candidate_result（字体牌候选结果）

| field | value |
|---|---|
| asset_id | `ali_font_card_candidate_01` |
| text | `没感觉` |
| request_goal | 粗白手写字牌，轻阴影，粗糙边缘，图片字牌候选。 |
| text_accuracy_status | `visual_self_check_passed_pending_user_review` |
| no_watermark_or_ui_self_check | `passed_pending_user_review` |
| transparent_ready | `false` |
| background_removal_required | `true` |
| review_status | `pending_user_review` |

已确认：视觉自检读作 `没感觉`，未见错字、乱码、多字或漏字。

待验证：该图片字牌是否符合用户要的粗白手写字牌审美，仍需用户回审；不得当作正式字幕字体系统。

## asset_manifest_path（资产清单路径）

```text
tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/asset_manifest.json
```

## review_contact_sheet_path（审片总览图路径）

```text
tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/review_contact_sheet.jpg
```

审片总览图包含：

- `ali_sticker_candidate_01`
- `ali_font_card_candidate_01`
- `pending_user_review`
- `transparent_ready=false`
- `text_accuracy_status=visual_self_check_passed_pending_user_review`

## limitations（限制）

1. 两张图均为 `RGB`，没有 alpha 通道。
2. `transparent_ready=false`，如果后续入 Remotion，需要单独做去背景 / alpha 处理和边缘检查。
3. 本轮只有视觉自检，没有用户审美批准。
4. 阿里 API 连接成功只证明 provider 可调用，不证明贴纸或字体牌能力成立。
5. 字体牌是图片候选，不是正式字幕字体系统。
6. 本轮不生成视频，不接入 Remotion，不提交 runtime 图片。

## next_goal（下一个目标）

`user_review_ali_generated_sticker_and_font_card_candidates`

## do_not_claim（禁止声明）

- 不声明 `sticker approved`。
- 不声明 `font card approved`。
- 不声明 `sticker library completed`。
- 不声明 `caption font system completed`。
- 不声明 `video_fixed`。
- 不声明 `vlog director capability verified`。
