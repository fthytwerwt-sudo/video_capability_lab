# 第二期 16 秒 vlog 验证候选报告

## 结论

- task_type: `new_material_vlog_pipeline_validation_candidate`
- status: `validation_candidate_rendered_pending_user_review`
- duration_target_sec: `16`
- output_video_path: `dist/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.mp4`
- review_pack_path: `tmp/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate_review_pack/`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

本轮已用用户确认的仓库内路径生成第二期 16 秒 vlog / odd 新默认流程验证候选片。该候选片已完成 Remotion render、技术验证、审片包和机器报告，但仍需用户审片，不得写成发布候选或能力已验证。

## 输入路径

- material_root: `素材/第二期`
- material_dir: `素材/第二期/第二期素材`
- bgm_dir: `素材/第二期/第二期 BGM`
- material_count: `19`
- bgm_count: `1`

已确认：

- `素材/第二期/第二期素材` 下的视频素材可读。
- `素材/第二期/第二期 BGM` 下的 BGM 文件可读。
- 本轮不再使用旧缺失路径 `video_capability_lab-素材-第二期/素材-第二期/...`。
- 本轮不再使用旧缺失路径 `../video_capability_lab-素材-第二期/素材-第二期/...`。

## 跳过模块

用户明确要求本轮不要以下模块：

- captions: `skipped_by_user_explicit`
- stickers: `skipped_by_user_explicit`
- font_cards: `skipped_by_user_explicit`
- visual_reaction_words: `skipped_by_user_explicit`
- visual_punctuation: `skipped_by_user_explicit`
- Alibaba image API: `skipped_by_user_explicit`

因此本轮没有字幕、贴纸、字牌、视觉反应字、视觉标点，也没有调用 Alibaba image API 或外部生成 API。

## BGM 选择与情绪判断

- selected_bgm: `素材/第二期/第二期 BGM/copy_608DDA69-0BA3-4B72-9053-5C7E402DC98C.MOV`
- bgm_duration_sec: `16.233333`
- selection_policy: `single_bgm_direct_use`
- mood_tag: `soft_urban_walk_vlog`
- mood_energy: `medium_high`
- mood_brightness: `medium_high`
- mood_temperature: `slightly_warm`
- tempo_estimate: `150.0`
- confidence_score: `0.74`
- fallback_used: `false`

判断口径：BGM 可覆盖 16 秒目标，不需要 loop；能量连续、开头柔和、中段推进、后段适合夜间余味，适合做城市步行 vlog / odd diary。

## 镜头选择

本轮选择 10 个镜头，不按素材文件顺序平铺：

| 时间 | 镜头 | 素材 | 叙事功能 |
| --- | --- | --- | --- |
| 0.00-1.40s | `shot_01_food_hook` | `IMG_1364.MOV` | 开场抓人，用手持食物建立日常入口 |
| 1.40-3.00s | `shot_02_dog_walk` | `IMG_1371.MOV` | 从物件转向街头生命感 |
| 3.00-4.60s | `shot_03_sidewalk_build` | `IMG_1363.MOV` | 建立街区氛围 |
| 4.60-5.80s | `shot_04_shadow_cart` | `IMG_1367.MOV` | 用影子和车筐承担节奏纹理 |
| 5.80-7.80s | `shot_05_crosswalk_motion` | `IMG_1380.MOV` | 路口运动推进 |
| 7.80-9.80s | `shot_06_golden_city_shift` | `IMG_1381.MOV` | 白天到黄昏的情绪变化 |
| 9.80-11.35s | `shot_07_night_store` | `IMG_1385.MOV` | 夜间店铺落点 |
| 11.35-13.10s | `shot_08_night_crossing` | `IMG_1390.MOV` | 夜间人流和位移 |
| 13.10-14.65s | `shot_09_walkers_aftertaste` | `IMG_1386.MOV` | 背影和余味 |
| 14.65-16.00s | `shot_10_shadow_close` | `IMG_1361.MOV` | 回到个人影子收束 |

## 精细卡点与音乐情绪镜头计划

本轮 `refined_beat_map` 不是机械按固定间隔切镜头，而是把 BGM 段落和镜头功能绑定：

- 0.00s: `hold_food_hook`，保留食物识别，不急切。
- 1.40s: `cut_to_living_subject`，切到白狗，增加生命感。
- 3.00s: `cut_to_wider_space`，从小事件扩大到街区空间。
- 4.60s: `short_texture_cut`，用影子 / 车筐做节奏纹理，不加视觉标点。
- 5.80s: `enter_motion_segment`，进入路口运动段。
- 7.80s: `cut_to_golden_city`，转入黄昏暖光。
- 9.80s: `cut_to_night_store`，进入夜间城市。
- 11.35s: `cut_to_night_crossing`，后半继续保留位移。
- 13.10s: `hold_walkers`，能量回落，留背影。
- 14.65s: `close_on_shadow`，个人影子收束。

每个镜头均在 `music_emotion_shot_plan.json` 中记录了音乐情绪、节奏点、视觉理由、叙事角色、切点理由和风险。

## vlog 叙事结构

本轮默认结构为：

1. `hook`: 食物 + 白狗，开场抓人。
2. `atmosphere_build`: 人行道 + 影子，建立街区和个人视角。
3. `motion_progression`: 路口 + 黄昏 + 店铺，推动时间和空间。
4. `emotion_or_rhythm_shift`: 夜间路口 + 背影，进入后半余味。
5. `ending_aftertaste`: 个人影子淡出，无字收束。

## BGM 情绪调色

`color_grade_profile`：

- brightness_adjust: `0.035`
- contrast_adjust: `0.065`
- saturation_adjust: `0.055`
- temperature_adjust: `0.035`
- tint_adjust: `-0.008`
- shadow_lift: `0.045`
- highlight_rolloff: `0.08`
- vignette_strength: `0.16`
- grain_strength: `0.07`
- source_bgm_mood_tag: `soft_urban_walk_vlog`
- subject_visibility_guard_enabled: `true`
- fallback_used: `false`

调色意图：整体轻暖、略提亮、保留城市夜景暗部轮廓，不把低照度素材压死。

## profile_read_by_pipeline

- profile_read_by_pipeline: `true`
- reader: `Remotion render CLI --props color_grade_profile.json`
- reader_file: `remotion/组合_compositions/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.tsx`
- props_file: `tmp/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate_review_pack/color_grade_profile.json`
- field_effect: `CSS filter plus overlay/vignette/grain layers in the Remotion composition`

Remotion composition 实际读取字段：

- `brightness_adjust`
- `contrast_adjust`
- `saturation_adjust`
- `temperature_adjust`
- `tint_adjust`
- `shadow_lift`
- `highlight_rolloff`
- `vignette_strength`
- `grain_strength`

如果后续 `profile_read_by_pipeline=false`，必须阻断为 `blocked_color_grade_profile_not_read_by_pipeline`。

## Remotion 输出

- remotion_data: `remotion/数据_data/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.ts`
- remotion_composition: `remotion/组合_compositions/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.tsx`
- remotion_composition_id: `第二期16秒vlog验证候选-second-episode-16s-vlog-validation-candidate`
- render_props: `tmp/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate_review_pack/color_grade_profile.json`
- final_video: `dist/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.mp4`
- render_local_asset_server: `python3 -m http.server 8124 --bind 127.0.0.1`

## 技术验证

输出视频验证结果：

- duration_seconds: `16.042667`
- width: `1080`
- height: `1920`
- fps: `30.000`
- video_codec: `h264`
- audio_present: `true`
- audio_codec: `aac`
- audio_channels: `2`
- decodable: `true`
- validation_status: `passed`

已运行：

- `npx remotion compositions remotion/Root.tsx`
- `npx remotion render remotion/Root.tsx 第二期16秒vlog验证候选-second-episode-16s-vlog-validation-candidate ... --props=tmp/.../color_grade_profile.json --gl=angle`
- `ffprobe` metadata check
- `ffmpeg` decode check
- `video-metadata-probe`
- `python3 -m py_compile`

## 审片包

审片包目录：`tmp/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate_review_pack/`

关键文件：

- `input_inventory.json`
- `material_inventory_report.json`
- `material_selection_table.json`
- `bgm_selection_report.json`
- `bgm_mood_analysis.json`
- `refined_beat_map.json`
- `music_emotion_shot_plan.json`
- `sequence_structure.json`
- `material_base_color_normalization_report.json`
- `color_grade_profile.json`
- `profile_read_by_pipeline_report.json`
- `full_video_candidate_completion_matrix.json`
- `machine_report.json`
- `review_manifest.json`
- `representative_frames_after_contact_sheet.jpg`
- `before_after_color_contact_sheet.jpg`
- `readable_review_report.md`

这些文件位于 runtime 目录，只作为审片证据，不提交 Git。

## failure_feedback_routing

若用户审片发现问题，按以下路线回退：

- `music_cut_feels_mechanical`: 回到 `refined_beat_map + music_emotion_shot_plan`，不能只按固定间隔重切。
- `story_feels_flat`: 回到 `sequence_structure + material_selection`，不能靠字幕 / 贴纸掩盖叙事不成立。
- `color_grade_not_visible`: 回到 `profile_read_by_pipeline`，检查 Remotion 是否真实读取 `color_grade_profile`。
- `night_subject_too_dark`: 回到 `subject_visibility_guard + BGM_mood_driven_color_grade`，提高暗部可见性或替换夜间低可见素材。

## 不得声明

- `publish-ready`
- `video_fixed`
- `vlog_director_capability_verified`
- `BGM beat_map capability verified`
- `BGM_mood_driven_color_grade_verified`
