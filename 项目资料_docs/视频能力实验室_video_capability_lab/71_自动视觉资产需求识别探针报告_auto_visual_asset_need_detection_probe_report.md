# 71 自动视觉资产需求识别探针报告

## status（状态）

- current_status: `auto_visual_asset_need_detection_probe_remediated_pending_user_review`
- review_status: `pending_user_review`
- source_mode: `remediation_of_partial_prior_probe`
- this_is_publish_candidate: `false`
- approved_for_video: `false`
- approved_for_library: `false`

## real_goal（真实目标）

本轮真实目标是补救并验证“Codex 能否基于旧候选视频自动识别哪些时间点需要图像资产 / 字牌 / 贴纸 / 视觉反应图，并把这些判断转成可审片的 Remotion 贴入测试”。

本轮不是正片，不是发布候选，不是证明贴纸资产库完成，也不是证明 vlog director capability 已成立。

## source_video（源视频）

- selected_source_video: `dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4`
- duration: `8.042667s`
- video_stream: `1080x1920 / 30fps / h264 / 240 frames`
- frame_sampling_manifest: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/frame_sampling_manifest.json`
- remediation_audit: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/remediation_audit.json`
- previous_stage_detected: `stage_0_not_started`
- missing_links_before_remediation:
  - `less_than_5_generated_assets`
  - `less_than_5_alpha_assets`
  - `remotion_overlay_missing`
  - `review_pack_missing`
  - `report_71_missing`

## asset_need_detection_result（资产需求识别结果）

- visual_asset_need_plan: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/visual_asset_need_plan.json`
- total_visual_asset_needs: `6`
- selected_asset_need_ids: `asset_need_01 / asset_need_02 / asset_need_03 / asset_need_04 / asset_need_05 / asset_need_06`
- type_mix:
  - `font_card / caption_card`: `2`
  - `reaction_sticker`: `3`
  - `motion_punctuation / object_or_motion_label`: `1`

识别点摘要：

| asset_need_id | time_range | type | caption_text | reason |
| --- | --- | --- | --- | --- |
| `asset_need_01` | `0.28-1.05s` | `font_card` | `落地` | 开场低主体纹理需要字牌建立落点语气。 |
| `asset_need_02` | `1.28-2.12s` | `reaction_sticker` | `进场` | texture 转 gym 身份，需要轻反应贴纸提示进入状态。 |
| `asset_need_03` | `3.42-4.18s` | `motion_punctuation` | `咔` | 动作接触峰值需要图片化受力标点。 |
| `asset_need_04` | `4.05-4.78s` | `reaction_sticker` | `顶住` | 接触后回弹需要小表情分担压力感。 |
| `asset_need_05` | `5.12-6.08s` | `font_card` | `顺线` | 机器纹理 reset 段需要把注意力拉回线条方向。 |
| `asset_need_06` | `6.58-7.72s` | `object_label` | `线走这边` | 尾段方向线需要可见短线 / 标签收束。 |

## generated_assets（生成资产）

- image_generation_manifest: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/image_generation_manifest.json`
- provider: `alibaba_dashscope`
- model: `qwen-image-2.0-pro`
- total_requested: `6`
- total_generated_manifest: `6`
- existing_generated_assets_reused: `4`
- missing_generation_attempted: `2`
- provider_repair_status: `blocked_api_arrearage_for_missing_assets`
- supplemental_existing_ali_assets_used: `2`

说明：

- `asset_need_01` 到 `asset_need_04` 使用本探针 runtime 中已有的 4 张阿里生成图。
- `asset_need_05` 和 `asset_need_06` 在补救时按允许重试次数调用阿里 API，但 provider 返回 `Arrearage`，因此只为完成 alpha / Remotion 链路验证，临时复用既有阿里最小验证资产。
- 这 2 张补位资产标记为 `supplemental_existing_ali_asset=true`，不得写成“按原自动识别需求成功生成”。

生成 / 补位路径：

- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/generated_assets/asset_need_01_font_card.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/generated_assets/asset_need_02_reaction_sticker.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/generated_assets/asset_need_03_motion_punctuation.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/generated_assets/asset_need_04_reaction_sticker.png`
- `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/font_card_candidate_01.png`（补位）
- `tmp/阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe/sticker_candidate_01.png`（补位）

## alpha_crop_result（透明裁剪结果）

- alpha_crop_manifest: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_crop_manifest.json`
- alpha_quality_report: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_quality_report.json`
- total_alpha_success: `6`
- failed_assets: `[]`
- alpha_status: `alpha_assets_generated_pending_user_review`

Alpha PNG：

- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_01_alpha.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_02_alpha.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_03_alpha.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_04_alpha.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_05_alpha.png`
- `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_06_alpha.png`

所有 alpha 输出均只表示 `transparent_ready=true`，不代表 `approved_for_video=true`。

## remotion_usage_result（Remotion 贴入结果）

- remotion_data: `remotion/数据_data/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe.ts`
- remotion_composition: `remotion/组合_compositions/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe.tsx`
- composition_id: `自动视觉资产需求识别探针-auto-visual-asset-need-detection-probe`
- remotion_placement_plan: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/remotion_placement_plan.json`
- output_video_path: `dist/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe.mp4`
- duration: `8.042667s format / 8.000000s video stream`
- resolution: `1080x1920`
- total_assets_consumed_by_remotion: `6`
- overlay_status: `rendered_pending_user_review`

## review_pack（审片包）

- review_pack_path: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/`
- before_after_contact_sheet: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/before_after_contact_sheet.jpg`
- asset_contact_sheet: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/asset_contact_sheet.jpg`
- alpha_contact_sheet: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/alpha_contact_sheet.jpg`
- placement_contact_sheet: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/placement_contact_sheet.jpg`
- review_manifest: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/review_manifest.json`
- readable_plan: `tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe_review_pack/visual_asset_need_plan_readable.md`

审片包用于判断：

- 图是否出现在正确时间点。
- 图的内容是否和画面 / 字幕有关。
- 字幕 / 字牌是否合适。
- alpha 边缘是否脏。
- 是否遮挡主体或原字幕。
- 补位资产是否应废弃并等待 API 恢复后重生成。

## technical_validation（技术验证）

已运行：

- `pwd`
- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git remote -v`
- `git status --short`
- `npm run typecheck`
- `npx remotion compositions remotion/Root.tsx`
- `python3 -m http.server 8124 --bind 127.0.0.1`
- `npx remotion render remotion/Root.tsx 自动视觉资产需求识别探针-auto-visual-asset-need-detection-probe dist/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe.mp4 --gl=angle`
- `ffprobe -v error -show_entries format=duration -show_streams -of json "dist/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe.mp4"`

验证结果：

- `npm run typecheck`：项目没有 `typecheck` script，命令返回 `Missing script: "typecheck"`。
- `npx remotion compositions remotion/Root.tsx`：通过，新 composition 列出为 `240 frames / 8.00 sec / 1080x1920 / 30fps`。
- Remotion render：通过，输出 mp4 成功生成。
- `ffprobe`：通过，输出可解码；video stream 为 `h264 / 1080x1920 / 30fps / 240 frames / duration=8.000000`，format duration 为 `8.042667`。

## content_validation（内容验证）

已确认：

- 本轮有 6 个自动识别资产需求点。
- 每个需求点都有时间段、出图理由、资产类型、字幕 / 字牌、位置计划和成功标准。
- 6 张 alpha PNG 均被 Remotion composition 数据消费。
- 审片包已生成，能看到 before / after、源资产、alpha、placement evidence。

部分成立：

- Codex 能基于旧视频和旧字幕 / 视觉节奏提出“哪里需要图”的候选判断。
- 阿里生成管线已有 4 张本探针图可复用，并能进入 alpha / Remotion 链路。
- 当 API 因 `Arrearage` 不能补图时，补救链路可以标记 fallback 并继续验证 alpha / Remotion 消费能力。

待验证：

- 用户是否认可 6 个时间点。
- 用户是否认可 4 张本探针图的内容和风格。
- 用户是否接受 `asset_need_05 / asset_need_06` 的补位资产，或要求等 API 恢复后重生成。
- 透明边缘、阴影保留和贴入遮挡仍需用户审看。

## capability_judgment（能力判断）

已确认：

- 本轮成功形成不少于 5 张图像资产的可审片链路；其中 4 张为本探针已有阿里生成图，2 张为因 provider `Arrearage` 使用的既有阿里补位资产。
- 本轮成功生成 6 张 alpha 透明图。
- 本轮成功渲染 Remotion 测试片。

部分成立：

- Codex 是否能提出“哪里需要图”的候选判断。
- 阿里 API 是否能批量产出候选视觉资产。
- Remotion 是否能消费这些 alpha 资产做贴入测试。

待验证：

- 用户是否认可这些图出现在正确时间点。
- 用户是否认可这些图的风格和字幕。
- 这些资产是否可升级为视频常用资产库。
- 是否能扩展到完整正片。

## do_not_claim（禁止声明）

- 不声明 `approved_for_video`。
- 不声明 `asset_library_completed`。
- 不声明 `caption_font_system_completed`。
- 不声明 `video_fixed`。
- 不声明 `publish-ready`。
- 不声明 `vlog_director_capability_verified`。

## next_goal（下一个目标）

- `user_review_auto_detected_visual_assets_and_remotion_overlay`
