# 阿里生成资产裁剪报告

## status（状态）

`ali_generated_asset_crop_completed_pending_user_review`

已确认：本轮只处理已有 runtime 图片 `sticker_candidate_01.png` 和 `font_card_candidate_01.png`。

已确认：本轮没有调用阿里 API，没有生成新贴纸或新字牌，没有剪辑视频，没有修改原始候选图。

## input_assets（输入资产）

| asset | path | exists | original_size | original_metadata |
|---|---|---:|---|---|
| `sticker_candidate` | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/sticker_candidate_01.png` | `true` | `1024x1024` | `PNG / RGB / no alpha` |
| `font_card_candidate` | `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/font_card_candidate_01.png` | `true` | `1024x1024` | `PNG / RGB / no alpha` |

## crop_outputs（裁剪输出）

| asset_id | cropped_path | alpha_path | cropped_size | crop_box | transparent_ready | background_removal_required | review_status | approved_for_video |
|---|---|---|---|---|---:|---:|---|---:|
| `ali_sticker_candidate_01_crop` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/sticker_candidate_01_cropped.png` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/sticker_candidate_01_alpha.png` | `872x859` | `[104, 104, 976, 963]` | `true` | `false` | `pending_user_review` | `false` |
| `ali_font_card_candidate_01_crop` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/font_card_candidate_01_cropped.png` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/font_card_candidate_01_alpha.png` | `974x501` | `[25, 263, 999, 764]` | `true` | `false` | `pending_user_review` | `false` |

## sticker_crop_result（贴纸裁剪结果）

| field | value |
|---|---|
| source_asset_id | `ali_sticker_candidate_01` |
| cropped_asset_id | `ali_sticker_candidate_01_crop` |
| crop_strategy | `background_flood_subject_mask_with_safe_margin` |
| alpha_quality | `passed_pending_user_review` |
| edge_quality | `safe_margin_preserved_pending_user_review` |
| shadow_preserved | `pending_user_review` |
| transparent_ready | `true` |
| approved_for_video | `false` |

部分成立：贴纸主体、白色贴纸边缘和阴影在审片总览图中未见明显裁断；alpha 版已生成并带真实 alpha 通道。

待验证：贴纸 alpha 边缘是否满足后续 Remotion 画面叠加，仍需用户回审和后续小范围使用检查。

## font_card_crop_result（字体牌裁剪结果）

| field | value |
|---|---|
| source_asset_id | `ali_font_card_candidate_01` |
| cropped_asset_id | `ali_font_card_candidate_01_crop` |
| crop_strategy | `text_outline_fill_mask_with_safe_margin` |
| text | `没感觉` |
| text_accuracy_status | `visual_self_check_passed_pending_user_review` |
| alpha_quality | `passed_pending_user_review` |
| edge_quality | `safe_margin_preserved_pending_user_review` |
| shadow_preserved | `pending_user_review` |
| transparent_ready | `true` |
| approved_for_video | `false` |

已确认：裁剪后字体牌仍能完整辨认为 `没感觉`，未见笔画被裁掉。

待验证：字体牌 alpha 边缘和阴影是否适合实际 Remotion 叠加，仍需用户回审。

## transparent_status（透明状态）

| asset_id | alpha_path | alpha_metadata | transparent_ready | alpha_quality |
|---|---|---|---:|---|
| `ali_sticker_candidate_01_crop` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/sticker_candidate_01_alpha.png` | `PNG / RGBA / alpha_range=0-255` | `true` | `passed_pending_user_review` |
| `ali_font_card_candidate_01_crop` | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/font_card_candidate_01_alpha.png` | `PNG / RGBA / alpha_range=0-255` | `true` | `passed_pending_user_review` |

已确认：`transparent_ready=true` 只代表本轮脚本和视觉自检通过，不代表资产已经允许进视频。

## quality_issues（质量问题）

1. 待验证：阴影保留和 alpha 边缘仍需用户看图确认。
2. 待验证：后续进入 Remotion 前，应在真实视频帧上做小范围叠加检查。
3. 已确认：本轮不把裁剪 / alpha 处理写成资产批准。

## review_contact_sheet_path（审片图路径）

```text
tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/crop_review_contact_sheet.jpg
```

## runtime_outputs（运行产物）

| item | path | committed |
|---|---|---:|
| crop_manifest | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/crop_manifest.json` | `false` |
| crop_quality_report | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/crop_quality_report.json` | `false` |
| crop_review_contact_sheet | `tmp/阿里图像资产裁剪_ali_image_asset_crop_probe/crop_review_contact_sheet.jpg` | `false` |

## next_goal（下一个目标）

`user_review_cropped_ali_assets_for_remotion_usage`

## do_not_claim（禁止声明）

- 不声明 `approved_for_video`。
- 不声明 `sticker library completed`。
- 不声明 `font card library completed`。
- 不声明 `video_fixed`。
- 不声明 `vlog director capability verified`。
