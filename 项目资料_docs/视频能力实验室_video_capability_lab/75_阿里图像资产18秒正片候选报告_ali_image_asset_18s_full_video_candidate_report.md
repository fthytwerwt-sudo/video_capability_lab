# 75｜阿里图像资产18秒正片候选报告

## status（状态）

- current_status: `full_video_candidate_rendered_pending_user_review`
- review_status: `pending_user_review`
- this_is_full_video_candidate_not_publish_ready: `true`
- publish_ready: `false`
- video_fixed: `false`
- vlog_director_capability_verified: `false`
- content_validation: `pending_user_review`

## real_goal（真实目标）

本轮真实目标是重新生成一条 18 秒 `full_video_candidate（正片候选）`：沿用 57 号旧 18 秒候选的素材池、素材选择、BGM、BGM timing、BGM beat_map 和 base color grade；普通字幕改为 Remotion text layer；关键 font card、sticker、visual reaction word、visual punctuation 改为 Alibaba image API 生成的 alpha PNG 图像资产。

本轮不是继续 8 秒 probe，不是复用旧 6 张资产，不是发布就绪，也不是验证导演能力已经成立。

## route_decision（路由决策）

```yaml
task_type: full_video_candidate
route_decision: external_image_asset_generation_video_fit_pipeline_to_18s_full_candidate
this_is_full_video_candidate_not_publish_ready: true
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
github_repository: fthytwerwt-sudo/video_capability_lab
branch: main
composition_id: 阿里图像资产18秒正片候选-ali-image-asset-18s-full-video-candidate
output_video_path: dist/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate.mp4
review_pack_path: tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack/
```

## source_materials_and_bgm（源素材与背景音乐）

- reference_report: `项目资料_docs/视频能力实验室_video_capability_lab/57_参考视觉语言路由18秒正片候选报告_18s_visual_language_routed_full_candidate_report.md`
- material_pool: 沿用 57 号报告中的旧 18 秒候选素材池。
- selected_materials: 沿用 57 号 13 段结构中的 `M14 / M08 / M05 / M03 / M06 / M04 / M10 / M13 / M11 / M09` 等已选素材。
- sequence_structure: 沿用 57 号候选 0–18s 的 13 段剪辑结构。
- bgm_path: `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`
- original_bgm_duration_sec: `25.400000`
- candidate_duration_sec: `18.048`
- resolution: `1080x1920`
- fps: `30`

## unchanged_checks（未改动检查）

| item | changed |
|---|---:|
| `bgm_beat_map_changed` | `false` |
| `bgm_timing_changed` | `false` |
| `base_color_grade_changed` | `false` |
| `color_grade_profile_changed` | `false` |
| `original_55_56_59_61_changed` | `false` |

说明：本轮只读沿用 `71` 的 BGM 情绪 / 调色机制和 57 号 Remotion grade filter；没有改 BGM、beat_map、timing、base color grade 或 color_grade_profile。`55 / 56 / 59 / 61` 原机制文件只读沿用，未修改。

## api_budget_report（API 预算报告）

| field | value |
|---|---|
| provider | `alibaba_dashscope` |
| model | `qwen-image-2.0-pro` |
| max_image_api_calls | `12` |
| actual_image_api_calls | `12` |
| max_success_images | `8` |
| actual_success_images | `8` |
| max_retry_per_typo_asset | `1` |
| typo_retries_used | `0` |
| estimated_cost_yuan | `6.0` |
| stop_if_provider_arrearage | `true` |
| stop_if_api_budget_exceeded | `true` |
| do_not_retry_without_budget_confirmation | `true` |
| provider_arrearage | `false` |

实际调用说明：1 次 connection smoke + 8 次首轮正式资产生成 + 2 次限量重试 + 1 次最后限量重试，总计 12 次；成功图像 8 张；未触发 provider arrearage；未超预算。

## visual_asset_need_plan（视觉资产需求计划）

运行清单：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/visual_asset_need_plan.json
```

每个资产需求均包含 `asset_need_id / time_range / video_event / video_anchor_source / reference_rule_links / asset_type / shape_requirement / text_requirement / emotion_requirement / material_requirement / motion_requirement / copy_risk_check / expected_video_fit / fallback_if_generation_failed / fallback_if_video_fit_failed`。

## generated_assets（生成资产）

| asset_need_id | type | text | status |
|---|---|---|---|
| `asset_need_01_hero_font_card` | `font_card` | `先落地` | `generated / alpha_ready / pending_user_review` |
| `asset_need_02_entry_reaction_sticker` | `reaction_sticker` | `no_text_expected` | `generated / alpha_ready / pending_user_review` |
| `asset_need_03_contact_flash` | `visual_punctuation` | `no_text_expected` | `generated / alpha_ready / pending_user_review` |
| `asset_need_04_action_reaction_word` | `reaction_word` | `推上去` | `generated / alpha_ready / pending_user_review` |
| `asset_need_05_machine_motion_trail` | `visual_punctuation` | `no_text_expected` | `generated / alpha_ready / arrow_like_shape_risk_pending_user_review` |
| `asset_need_06_sky_reaction_word` | `reaction_word` | `缓一口` | `generated / alpha_ready / pending_user_review` |
| `asset_need_07_fog_breath_line` | `visual_punctuation` | `no_text_expected` | `generated / alpha_ready / pending_user_review` |
| `asset_need_08_shadow_motion_trail` | `visual_punctuation` | `no_text_expected` | `generated / alpha_ready / pending_user_review` |

资产总览：

- total_assets: `8`
- font_cards: `1`
- stickers: `1`
- visual_reaction_words: `2`
- visual_punctuation: `4`

## text_accuracy_check（文字准确性检查）

文字检查报告：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack/text_accuracy_report.json
```

检查结果：

- passed: `true`
- failed_assets: `[]`
- retried_assets: `[]`
- typo_retries_used: `0`
- text_assets_passed:
  - `asset_need_01_hero_font_card`: `先落地`
  - `asset_need_04_action_reaction_word`: `推上去`
  - `asset_need_06_sky_reaction_word`: `缓一口`

## alpha_crop_result（透明裁剪结果）

裁剪 / alpha 运行清单：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/alpha_crop_manifest.json
```

质量报告：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/alpha_quality_report.json
```

结果：

- total_alpha_success: `8`
- failed_assets: `[]`
- transparent_ready: `true` for all 8 assets
- approved_for_video: `false` for all 8 assets

说明：`transparent_ready=true` 只代表透明通道可用，不代表内容通过或可发布。

## asset_video_fit_check（资产-视频匹配检查）

视频匹配检查：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack/asset_video_fit_check.json
```

摘要：

- passed: `8 machine usable for full_video_candidate pending user review`
- pending_user_review: `8`
- failed_or_blocked: `0`
- review_focus: `asset_need_05_machine_motion_trail` 形状偏箭头感，已标记 `arrow_like_shape_risk_pending_user_review`。

每个资产均写入 `asset_source_status / original_detection_text / actual_asset_text / shape_match_status / text_match_status / video_event_match_status / anchor_relation_status / overlay_float_risk / caption_blocking_risk / subject_blocking_risk / final_machine_judgement / route_back_to / machine_review_label`。

## full_video_candidate_completion_matrix（正片候选完成矩阵）

矩阵文件：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack/full_video_candidate_completion_matrix.json
```

| module | status |
|---|---|
| `project_guard` | `complete` |
| `input_inventory` | `complete` |
| `reference_and_style_anchor` | `complete` |
| `material_selection` | `complete` |
| `material_quality_check` | `complete` |
| `BGM_style_and_audio` | `complete` |
| `BGM_mood_analysis` | `complete_read_only_reused` |
| `material_base_color_normalization` | `complete_read_only_reused` |
| `BGM_mood_driven_color_grade` | `complete_read_only_reused` |
| `sequence_structure` | `complete` |
| `pacing_and_rhythm` | `complete` |
| `captions_or_text_layer` | `complete` |
| `stickers_or_visual_punctuation` | `complete` |
| `motion_effects_and_transitions` | `complete` |
| `composition_and_crop` | `complete` |
| `subject_and_caption_readability_guard` | `complete` |
| `audio_mix` | `complete` |
| `export_and_technical_validation` | `complete` |
| `review_pack_and_machine_report` | `complete` |
| `failure_feedback_routing` | `complete` |

required_modules_complete: `true`  
missing_modules: `[]`

## technical_validation（技术验证）

已运行并通过：

- workspace guard: `pwd / git rev-parse --show-toplevel / git branch --show-current / git remote -v / git status --short`
- `python3 -m py_compile` for new Python scripts
- `npx remotion compositions remotion/Root.tsx`
- `npx remotion render remotion/Root.tsx 阿里图像资产18秒正片候选-ali-image-asset-18s-full-video-candidate ... --gl=angle`
- `ffprobe` metadata check
- `ffmpeg -v error -i ... -f null -` decode check
- `bash /Users/fan/.codex/skills/video-metadata-probe/scripts/probe_video.sh ...`
- `python3 脚本_scripts/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/生成阿里图像资产18秒正片候选审片包_generate_ali_image_asset_18s_full_candidate_review_pack.py`

关键结果：

- render: `passed`
- video_stream_duration: `18.000000`
- format_duration: `18.048000`
- allowed_duration_range: `17.8–18.3`
- resolution: `1080x1920`
- fps: `30`
- frames: `540`
- video_codec: `h264`
- audio_present: `true`
- audio_codec: `aac`
- decodable: `true`

## content_validation（内容验证）

- current_status: `pending_user_review`
- user_review_required: `true`
- technical_render_is_not_content_pass: `true`
- content_pass_claimed: `false`

机器判断只说明该视频可作为 `full_video_candidate` 进入用户回审，不说明贴图、字牌、普通字幕、BGM、基础调色、整体观感已经过线。

## review_pack（审片包）

审片包路径：

```text
tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack/
```

包含：

- `before_after_contact_sheet.jpg`
- `asset_contact_sheet.jpg`
- `alpha_contact_sheet.jpg`
- `text_accuracy_report.json`
- `asset_generation_spec.json`
- `asset_video_fit_check.json`
- `full_video_candidate_completion_matrix.json`
- `machine_report.json`
- `review_manifest.json`
- `readable_review_report.md`

## failure_feedback_routing（失败反馈路由）

| failure | route_back_to |
|---|---|
| `api_asset_text_wrong` | `asset_generation_spec + typo_retry_gate` |
| `api_budget_exceeded` | `api_budget_gate` |
| `overlay_floaty_or_generic` | `73 asset_video_fit_check + 55/56 attachment relation` |
| `caption_unreadable` | `captions_or_text_layer + subject_and_caption_readability_guard` |
| `bgm_or_color_changed` | `blocked_bgm_or_color_change_required` |
| `asset_need_05_arrow_like_shape_risk` | `73 asset_video_fit_check + motion_direction_attached + user_review` |

## do_not_claim（禁止声明）

不得声明：

- `publish-ready`
- `video_fixed`
- `vlog_director_capability_verified`
- `BGM beat_map capability verified`
- `base color grade capability verified`
- `Alibaba image API unlimited generation capability verified`
- `render success equals content pass`

## next_goal（下一个目标）

用户审看 18 秒阿里图像资产正片候选、审片包、资产生成规格、资产-视频匹配检查和机器自检报告，判断贴图 / 字牌 / 普通字幕 / BGM / 基础调色 / 整体观感是否过线。
