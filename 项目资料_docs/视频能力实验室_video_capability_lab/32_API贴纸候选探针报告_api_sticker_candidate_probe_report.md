# API 贴纸候选探针报告

## 1. status

- task_type: `api_generated_sticker_candidate_probe`
- asset_id: `paper_sound_tag`
- provider: `zhipu`
- model: `glm-image`
- endpoint: `https://open.bigmodel.cn/api/paas/v4/images/generations`
- api_call_status: `succeeded`
- generation_count: `1`
- output_status: `local_ignored_only`
- candidate_status: `generated_pending_user_review_with_self_check_failures`
- content_status: `api_sticker_single_candidate_generated_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮只发起 1 次图片生成请求。

已确认：本轮只生成 1 张 `paper_sound_tag（纸感拟声标签）` 测试候选。

已确认：本轮未修改 Remotion 源码或数据，未 render 视频，未接入视频。

已确认：本轮未提交图片；图片只保存在 ignored 本地目录。

已确认：`.env` 是本地 ignored file，未提交，报告未记录 API key。

## 2. env_check

| item | result |
|---|---|
| `.env` exists | `true` |
| `.env` ignored | `true` |
| provider present | `true` |
| provider | `zhipu` |
| key present | `true` |
| key printed | `false` |
| model present before docs fallback | `false` |
| model selected from official docs | `glm-image` |
| local `IMAGE_API_DRY_RUN` | `false` |
| local `ALLOW_IMAGE_API_CALL` | `true` |
| local `ALLOW_STICKER_ASSET_GENERATION` | `true` |
| local `ALLOW_REMOTION_EDIT` | `false` |
| local `ALLOW_RENDER` | `false` |

已确认：`ZHIPUAI_IMAGE_MODEL` 原本为空；本轮根据智谱官方图像生成文档选择 `glm-image`，并只写入本地 `.env`，不提交。

参考来源：智谱官方图像生成 API 文档显示 `POST /paas/v4/images/generations`，模型可选项包含 `glm-image`。

## 3. prompt_summary

本轮 prompt 目标：

- 单个原创 vlog overlay sticker asset。
- 小纸签 / 轻贴纸标签。
- 只承载 1 个中文拟声字：`咔`。
- 纸感、软边、轻阴影、少量胶贴感。
- 浅暖纸色接近 `#f6d7a8`。
- 深咖灰文字。
- 低饱和，不儿童模板，不电商促销，不 PPT pill label。
- 无品牌、无 logo、无复杂背景。
- 优先透明背景；若不支持，使用纯白或纯色背景便于后续抠图。

## 4. output

| item | value |
|---|---|
| output_dir | `tmp/api贴纸候选_api_sticker_candidates/` |
| output_path | `tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01.png` |
| metadata_path | `tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01_metadata.json` |
| local_file_committed | `false` |
| git_ignore_source | `.gitignore` -> `tmp/` |
| image_size | `1280x1280` |
| saved_format | `PNG` |
| has_alpha | `false` |
| transparent_background_status | `not_transparent` |
| needs_background_removal | `true` |

已确认：API 返回可下载图片 URL；本轮已下载到本地 ignored 目录。

部分成立：服务返回的下载体最初可被本地 `file` 识别为 JPEG 数据；本轮只做本地格式规范化，保存为 PNG 文件。该处理不等于透明背景处理。

## 5. candidate_review_table

| check_item | result | notes |
|---|---|---|
| API request succeeded | `pass` | 成功拿到图片 URL 并保存本地文件。 |
| one-candidate-only | `pass` | 本轮只生成 1 张候选。 |
| paper note / sticker silhouette | `partial` | 有纸贴轮廓、软边和阴影。 |
| paper texture | `partial` | 有轻纸感，但更接近大号贴纸字牌。 |
| warm paper palette | `pass` | 主体接近浅暖纸色，文字为灰咖色系。 |
| one onomatopoeia text | `partial` | 视觉上接近 `咔` 的拟声标签，但字形较大且图形化。 |
| transparent background | `fail` | 图片无 alpha 通道，背景不透明。 |
| no watermark / no generated label | `fail` | 右下角可见 `AI生成` 标识。 |
| no ecommerce promotion style | `pass` | 未出现促销红、爆炸贴或卖点文案。 |
| no PPT pill label | `pass` | 没有明显 pill UI，但整体仍偏大字牌。 |
| ready for Remotion | `fail` | 不能直接接入 Remotion，必须先人审并处理背景 / 标识问题。 |

## 6. rejection_check

本轮候选不得写成通过，原因：

1. `transparent_background_status=not_transparent`，不符合透明贴纸资产要求。
2. 右下角存在 `AI生成` 标识，不符合无水印 / 无生成标识要求。
3. 候选更像大号贴纸字牌，仍需人审判断是否适合 `paper_sound_tag`。

已确认：这张图只能证明 `zhipu + glm-image` 单图 API 链路已跑通。

待验证：用户是否接受该风格作为候选方向。

待验证：是否需要后处理去背景 / 去标识，或改 provider / 改 prompt 后重新生成。

## 7. next_goal

本报告的后续判断已被本轮策略修正覆盖：先选择或验证 `watermark_free_provider_probe（无水印 provider 探针）`。

在无水印 provider / model 通过前，不进入批量生成或 Remotion 接入。

## 8. post_probe_policy_update（探针后策略修正）

- policy_update_status: `watermark_policy_config_updated_no_new_asset`
- policy_config_file: `配置_configs/图片生成策略_image_generation_policy.json`
- followup_report: `33_无水印图片生成配置修正_watermark_free_image_policy_config.md`
- zhipu_glm_image_status: `connection_probe_only`
- allowed_for_sticker_candidate: `false`
- allowed_for_connection_test: `true`
- watermarked_output_action: `reject_candidate`
- generated_label_output_action: `reject_candidate`
- do_not_remove_watermark: `true`

已确认：`zhipu + glm-image` 单图链路已跑通，但本轮候选存在 `transparent_background_status=not_transparent` 和可见 `AI生成` 标识。

已确认：带水印、带 `AI生成` 标识、带 logo 或 brand mark 的输出不得进入正式贴纸候选路线。

已确认：本轮没有去水印，没有裁掉水印，没有修补水印，没有生成新图片，没有调用 API。

已确认：未来若 provider 返回带水印或生成标识的图片，必须写 `rejected_candidate` 或 `blocked_provider_watermark`，不能写成可后处理通过。

## 9. next_goal

选择或验证 `watermark_free_provider_probe（无水印 provider 探针）`，确认 provider / model 能输出无水印、无生成标识、无 logo、无 brand mark，且具备透明 PNG 或干净抠图来源。

## 10. do_not_claim

本轮不得声明：

- no-watermark provider verified
- sticker asset approved
- sticker asset pack completed
- video fixed
- visual language passed
- Remotion integration completed
- vlog director capability verified
