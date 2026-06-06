# 74｜外部图像资产流程对齐候选报告

## status（状态）

- current_status: `external_image_asset_pipeline_alignment_candidate_rendered_pending_user_review`
- review_status: `pending_user_review`
- this_is_partial_pipeline_alignment_candidate_not_full_video_candidate: `true`
- this_is_publish_candidate: `false`
- approved_for_video: `false`
- approved_for_library: `false`
- video_fixed: `false`

## route_decision

```yaml
task_type: external_image_asset_pipeline_alignment_candidate
route_decision: connect_reference_visual_language_to_external_image_asset_generation_alpha_video_fit_remotion
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
source_video: dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4
composition_id: 外部图像资产流程对齐候选-external-image-asset-pipeline-alignment-candidate
output_video_path: dist/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.mp4
review_pack_path: tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack/
```

## mechanism_integrity_check

| item | changed | note |
|---|---:|---|
| `55_参考视觉语言迁移库_reference_visual_language_migration_library.md` | `false` | 只读引用。 |
| `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md` | `false` | 只读引用。 |
| `59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md` | `false` | 只读引用。 |
| `61_视觉前处理数据协议_visual_preprocessing_data_protocol.md` | `false` | 只读引用。 |
| `BGM / beat_map` | `false` | 本轮未修改音乐卡点、BGM 节奏点或 beat_map。 |
| `base_color_grade / color_grade_profile` | `false` | 本轮未修改基础调色或 BGM 情绪调色机制。 |
| `Ali API` | `not_called` | 本轮未调用阿里 API，未生成新图。 |
| `runtime_assets_committed` | `false` | `tmp/`、`dist/`、图片、视频、音频仅作为 ignored runtime 输出。 |

## pipeline_outputs（流程输出）

| item | path | git_committed |
|---|---|---:|
| 流程机制 | `项目资料_docs/视频能力实验室_video_capability_lab/73_外部图像资产生成判断与视频匹配流程_external_image_asset_generation_video_fit_pipeline.md` | `true` |
| 本报告 | `项目资料_docs/视频能力实验室_video_capability_lab/74_外部图像资产流程对齐候选报告_external_image_asset_pipeline_alignment_candidate_report.md` | `true` |
| Remotion data | `remotion/数据_data/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.ts` | `true` |
| Remotion composition | `remotion/组合_compositions/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.tsx` | `true` |
| 匹配自检脚本 | `脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产匹配自检_generate_external_image_asset_fit_check.py` | `true` |
| 审片包脚本 | `脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产流程审片包_generate_external_image_asset_pipeline_review_pack.py` | `true` |
| 候选视频 | `dist/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.mp4` | `false` |
| 审片包 | `tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack/` | `false` |

## asset_generation_spec_summary

- total_assets: `6`
- auto_probe_generated_assets: `4`
- fallback_assets: `2`
- asset_need_05_status: `provider_arrearage_fallback_existing_ali_asset / text_semantic_mismatch_due_to_fallback_asset / chain_test_only_regenerate_required`
- asset_need_06_status: `provider_arrearage_fallback_existing_ali_asset / text_semantic_mismatch_due_to_fallback_asset / chain_test_only_regenerate_required`

每个资产已输出 `asset_generation_spec`，路径：

```text
tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack/asset_generation_spec.json
```

## asset_video_fit_check_summary

| asset_need_id | source_status | original_text | actual_text | machine_judgement | route_back_to |
|---|---|---|---|---|---|
| `asset_need_01` | `auto_probe_generated_asset` | `落地` | `落地` | `usable_for_pipeline_alignment_candidate_pending_user_review` | `caption_visual_language_library + video_event_anchor` |
| `asset_need_02` | `auto_probe_generated_asset` | `进场` | `no_text_expected` | `usable_for_pipeline_alignment_candidate_pending_user_review` | `sticker_branch_02 + composition_safe_area` |
| `asset_need_03` | `auto_probe_generated_asset` | `咔` | `no_text_expected` | `usable_for_pipeline_alignment_candidate_pending_user_review` | `contact_point_anchor + shape_02_contact_flash` |
| `asset_need_04` | `auto_probe_generated_asset` | `顶住` | `no_text_expected` | `usable_for_pipeline_alignment_candidate_pending_user_review` | `caption_sticker_relation + attention_budget` |
| `asset_need_05` | `provider_arrearage_fallback_existing_ali_asset` | `顺线` | `没感觉` | `chain_test_only_regenerate_required` | `asset_generation_spec / ali_asset_request / regenerate_when_provider_available` |
| `asset_need_06` | `provider_arrearage_fallback_existing_ali_asset` | `线走这边` | `没感觉` | `chain_test_only_regenerate_required` | `asset_generation_spec / motion_direction_attached / regenerate_when_provider_available` |

每个资产已输出 `asset_video_fit_check`，路径：

```text
tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack/asset_video_fit_check.json
```

## review_pack（审片包）

审片包路径：

```text
tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack/
```

包含：

- `before_after_contact_sheet.jpg`
- `asset_contact_sheet.jpg`
- `alpha_contact_sheet.jpg`
- `video_fit_contact_sheet.jpg`
- `asset_generation_spec.json`
- `asset_video_fit_check.json`
- `review_manifest.json`
- `readable_asset_fit_report.md`

审片包用途：

1. 看 6 个资产是否出现在正确时间段。
2. 看 01-04 是否至少能作为流程对齐候选继续人工审片。
3. 看 05-06 的补位资产为什么不能计入原需求成功。
4. 看 `x / y` 只是实现坐标，不是唯一视觉判断依据。
5. 判断外部图像资产执行流程是否已经接回原参考视觉语言机制。

## technical_validation

已运行：

- `pwd`
- `git rev-parse --show-toplevel`
- `git branch --show-current`
- `git remote -v`
- `git status --short`
- runtime asset existence check
- `python3 脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产匹配自检_generate_external_image_asset_fit_check.py`
- `npx remotion compositions remotion/Root.tsx`
- `python3 -m http.server 8124 --bind 127.0.0.1`
- `npx remotion render remotion/Root.tsx 外部图像资产流程对齐候选-external-image-asset-pipeline-alignment-candidate dist/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.mp4 --gl=angle`
- `ffprobe -v error -show_entries format=duration -show_streams -of json dist/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.mp4`
- `python3 脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产流程审片包_generate_external_image_asset_pipeline_review_pack.py`
- `git diff --check`
- `python3 -m py_compile 脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产匹配自检_generate_external_image_asset_fit_check.py 脚本_scripts/外部图像资产流程_external_image_asset_pipeline/生成外部图像资产流程审片包_generate_external_image_asset_pipeline_review_pack.py`
- `python3 -m unittest discover -s tests`

验证结果：

- Remotion composition listing：通过，新 composition 为 `240 frames / 8.00 sec / 1080x1920 / 30fps`。
- Remotion render：通过，输出候选 mp4。
- `ffprobe`：通过，video stream 为 `h264 / 1080x1920 / 30fps / 240 frames / duration=8.000000`，format duration 为 `8.042667`，audio stream 为 `aac / 48000Hz / stereo / duration=8.042667`。
- 审片包脚本：通过，生成所有 required review pack 文件。
- `git diff --check`：通过。
- 新增 Python 脚本 `py_compile`：通过。
- `python3 -m unittest discover -s tests`：未全量通过；失败项为既有未触碰文件 `项目资料_docs/视频能力实验室_video_capability_lab/参考解析_reference_analysis/素材-vlog_转场参考_镜头转场与物体描边分析.md` 不满足当前命名测试。该文件非本轮新增 / 修改文件，本轮未改测试白名单、未重命名无关文件。

## content_validation

已确认：

- 01-04 为本探针已有阿里生成资产，并进入 alpha / Remotion 流程对齐候选。
- 05-06 为 `provider_arrearage_fallback_existing_ali_asset`，只测试链路。
- 05 原需求为 `顺线`，实际补位文字为 `没感觉`，状态为 `text_semantic_mismatch_due_to_fallback_asset`。
- 06 原需求为 `线走这边`，实际补位文字为 `没感觉`，状态为 `text_semantic_mismatch_due_to_fallback_asset`。
- 本轮候选只证明 pipeline alignment 技术链可跑，不证明内容通过。

待验证：

- 用户 / GPT 是否认可 01-04 的图像内容和视频事件匹配关系。
- 用户 / GPT 是否认可机器判断里给出的失败回路。
- 05-06 是否等待 provider 恢复后按原需求重生成。
- alpha 边缘、遮挡、浮层感和主体 / 字幕遮挡仍需审片确认。

## do_not_claim

- 不声明 `full_video_candidate`。
- 不声明 `publish-ready`。
- 不声明 `approved_for_video`。
- 不声明 `video_fixed`。
- 不声明 `asset_library_completed`。
- 不声明 `vlog_director_capability_verified`。

## next_goal

`user_review_external_image_asset_pipeline_alignment_candidate_and_machine_fit_report`
