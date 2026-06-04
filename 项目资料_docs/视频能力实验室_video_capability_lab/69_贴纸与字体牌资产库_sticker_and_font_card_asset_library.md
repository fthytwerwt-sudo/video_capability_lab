# 贴纸与字体牌资产库

## status（状态）

`asset_library_metadata_created_pending_user_review`

已确认：本文件只登记本轮阿里图像 API 生成的候选资产 metadata（元数据），不批准入库，不提交 runtime 图片，不声明 Remotion 可用。

## asset_entries（资产条目）

| field | sticker_candidate | font_card_candidate |
|---|---|---|
| asset_id | `ali_sticker_candidate_01` | `ali_font_card_candidate_01` |
| asset_type | `sticker_candidate` | `font_card_candidate` |
| source_method | `ali_image_api` | `ali_image_api` |
| source_probe | `ali_image_asset_factory_minimal_probe` | `ali_image_asset_factory_minimal_probe` |
| local_path | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/sticker_candidate_01.png` | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/font_card_candidate_01.png` |
| prompt_summary | `yellow emoji face / playful / vlog / sticker / soft shadow` | `bold white handwritten Chinese / rough edge / playful vlog caption / slight dark shadow` |
| text | `not_applicable` | `没感觉` |
| image_metadata | `PNG / 1024x1024 / RGB` | `PNG / 1024x1024 / RGB` |
| transparent_ready | `false` | `false` |
| background_removal_required | `true` | `true` |
| text_accuracy_status | `not_applicable` | `visual_self_check_passed_pending_user_review` |
| review_status | `pending_user_review` | `pending_user_review` |
| approved_for_library | `false` | `false` |
| runtime_asset_committed | `false` | `false` |
| remotion_usage_status | `not_used_yet` | `not_used_yet` |

## review_package（回审包）

| item | path | committed |
|---|---|---|
| asset_request | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/asset_request.json` | `false` |
| asset_manifest | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/asset_manifest.json` | `false` |
| review_contact_sheet | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/review_contact_sheet.jpg` | `false` |

## approval_rule（批准规则）

待验证：只有用户回审明确通过后，才允许把候选升级为 `approved_for_library=true`。

待验证：只有去背景 / alpha / 边缘检查和 Remotion 小范围使用检查通过后，才允许写 `remotion_usage_status=ready_or_used`。

## do_not_claim（禁止声明）

- 不声明贴纸已批准。
- 不声明字体牌已批准。
- 不声明贴图库已完成。
- 不声明字幕字体系统已完成。
- 不声明视频已修好。
