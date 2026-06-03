# BGM 驱动全素材 18 秒正片风格候选报告

## status（状态）

- task_type: `bgm_driven_all_materials_18s_final_style_candidate_render`
- render_method: `ffmpeg_local_concat_and_bgm_mix`
- output_video_path: `dist/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_final_style_candidate/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_final_style_candidate.mp4`
- review_pack_path: `tmp/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_review_pack/`
- review_contact_sheet: `tmp/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_review_pack/BGM驱动全素材18秒正片风格候选_contact_sheet.jpg`
- duration: `18.000000s`
- resolution: `1080x1920`
- fps: `30.000`
- has_audio: `true`
- content_status: `18s_final_style_candidate_rendered_pending_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- user_review_status: `pending_user_review`
- api_call_allowed_this_round: `false`
- runtime_asset_commit_allowed_this_round: `false`
- runtime_asset_commit_status: `not_committed`

已确认：本轮按照用户 P0 指令直接生成本地 18 秒候选，没有把方案包作为前置交付给用户确认。

已确认：本轮没有调用图片 / 视频 / 音频生成 API，没有调用外部音乐识别 API，没有修改原始素材或 BGM。

部分成立：本轮技术输出可读取、可解码、有音轨、时长达标；这不等于内容、人审、视觉语言或能力通过。

## BGM_style_card（BGM 风格卡）

| field | value |
|---|---|
| bgm_path | `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` |
| duration | `25.400000s` |
| tempo_feel | `medium_tempo_95_7_bpm_candidate` |
| mood_tags | `steady_pulse`, `high_onset_density`, `gym_or_urban_motion_candidate`, `outro_drop_candidate` |
| energy_curve | `intro already active -> rise -> action texture -> short breath -> darker outro` |
| section_map | `0.0-3.4 intro / 3.4-7.6 rise / 7.6-11.2 action-texture / 11.2-14.6 breath / 14.6-18.0 outro` |
| breath_points | `11.2-14.6s candidate breath window` |
| peak_points | `7.6-11.2s action / machine texture candidate peak` |
| confidence | `rough_audio_feature_based_not_human_listening_confirmed` |
| review_status | `codex_internal_candidate_not_user_confirmed` |

待验证：BGM mood 和 section map 仍不是人工听感确认，不得写成精准卡点或最终 BGM 情绪通过。

## material_pool（素材池）

- primary_material_pool: `素材/剪辑素材/剪辑/`
- scanned_count: `14`
- selected_count: `9`
- backup_count: `5`
- public_legacy_assets_used: `false`
- reference_video_used: `false`
- forbidden_reference_dirs_used: `false`

| material_id | path | duration | resolution | selection | note |
|---|---|---:|---|---|---|
| `M01` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `14.398333s` | `1920x1080` | `backup_not_used` | 熊猫自然素材，和 gym 主线差异大。 |
| `M02` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `16.766667s` | `1920x1080` | `backup_not_used` | 熊猫主体强，但会把视频带到动物园 / 游玩语境。 |
| `M03` | `素材/剪辑素材/剪辑/IMG_1350.MOV` | `3.936700s` | `3840x2160` | `selected` | 健身房动作 / 器械主动作。 |
| `M04` | `素材/剪辑素材/剪辑/IMG_1351.MOV` | `6.406700s` | `1920x1080` | `selected` | 器械结构与机械节奏，做 rise texture。 |
| `M05` | `素材/剪辑素材/剪辑/IMG_1353.MOV` | `2.935000s` | `1920x1080` | `selected` | 健身房空间建立。 |
| `M06` | `素材/剪辑素材/剪辑/IMG_1358.MOV` | `5.065000s` | `1920x1080` | `selected` | 金属器械短切纹理。 |
| `M07` | `素材/剪辑素材/剪辑/IMG_1359.MOV` | `3.388333s` | `1920x1080` | `selected` | 饮品呼吸点，存在品牌露出风险。 |
| `M08` | `素材/剪辑素材/剪辑/IMG_1360.MOV` | `2.485000s` | `1920x1080` | `selected` | 健身房人物 / 自拍身份锚点，存在可识别人物风险。 |
| `M09` | `素材/剪辑素材/剪辑/IMG_1361.MOV` | `9.531700s` | `1920x1080` | `selected` | 夜路影子，做 mood outro。 |
| `M10` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `8.756667s` | `1920x1080` | `backup_not_used` | 海边天空可做呼吸，但本轮只选另一个海天素材。 |
| `M11` | `素材/剪辑素材/剪辑/IMG_3226.MOV` | `6.005000s` | `1920x1080` | `selected` | 海天呼吸段，作为从 gym 到夜路的短视觉重置。 |
| `M12` | `素材/剪辑素材/剪辑/IMG_6985.MOV` | `18.295000s` | `1920x1080` | `backup_not_used` | 熊猫人偶 / 儿童活动语境强，和本轮 BGM + gym 主线冲突。 |
| `M13` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `6.300000s` | `1280x720` | `backup_not_used` | 雾滩远景可做呼吸，但人物太远，本轮未放主线。 |
| `M14` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `6.166667s` | `720x1280` | `selected` | 沙纹开头纹理，给高 onset BGM 一个低语义 intro。 |

## material_role_table（素材功能表）

| material_id | visual_summary | motion_intensity | visual_density | mood_fit | matched_bgm_section | recommended_role | usable_segment_candidate | risk | evidence_level |
|---|---|---|---|---|---|---|---|---|---|
| `M14` | 沙纹细节，低主体、低语义。 | low | low | `partial_fit_intro_texture` | intro | opening texture | `0.35-1.75s` | 和 gym 主线有场景差异，只能短用。 | `metadata + contact_sheet_review` |
| `M08` | 健身房人物和器械，主体明确。 | medium | medium-high | `fit_gym_identity` | intro -> rise | subject anchor | `0.10-2.10s` | 可识别人物 / 自拍风险，需用户确认。 | `metadata + contact_sheet_review` |
| `M05` | 健身房空间和器械，建立环境。 | low-medium | medium | `fit_space_build` | rise | space build | `0.15-1.95s` | 画面倾斜，需竖屏裁切。 | `metadata + contact_sheet_review` |
| `M03` | 器械和训练动作，可做主动作。 | medium-high | high | `fit_action_texture` | rise -> action | main action | `0.25-2.65s` | 器械遮挡较强，不宜拖太长。 | `metadata + contact_sheet_review` |
| `M06` | 金属器械近景，节奏纹理明显。 | medium | high | `fit_short_texture` | action | texture cut | `0.60-2.00s` | 主体弱，只能做短切。 | `metadata + contact_sheet_review` |
| `M04` | 器械结构和镜面空间。 | medium | high | `fit_machine_rise` | action | rise texture | `0.85-3.05s` | 视觉噪音高，需短段。 | `metadata + contact_sheet_review` |
| `M07` | 手持饮品特写。 | low | low-medium | `fit_breath_object` | breath | breath object | `0.20-1.80s` | 品牌字样可见，需用户回审。 | `metadata + contact_sheet_review` |
| `M11` | 海天人群远景。 | low | medium | `partial_fit_visual_reset` | breath | visual reset | `1.10-2.90s` | 和 gym 场景差异大，只能短暂换气。 | `metadata + contact_sheet_review` |
| `M09` | 夜路影子 / 低照度移动。 | low-medium | low | `fit_mood_outro_candidate` | outro | mood outro | `2.10-5.50s` | 和 gym 主线情绪反差大，需用户确认是否接受。 | `metadata + contact_sheet_review` |

## sequence_candidate_used（实际采用的候选顺序）

| time_range | material | role | bgm_relation | reason |
|---|---|---|---|---|
| `0.00-1.40s` | `M14 sd1674359014_2.MP4` | opening texture | intro high-onset but low semantic load | 先用沙纹建立低语义纹理，避免一开始就把人物风险推满。 |
| `1.40-3.40s` | `M08 IMG_1360.MOV` | subject anchor | intro -> rise | 把主线拉回 gym 身份。 |
| `3.40-5.20s` | `M05 IMG_1353.MOV` | space build | rise | 交代健身房空间，承接人物。 |
| `5.20-7.60s` | `M03 IMG_1350.MOV` | main action | rise -> action | 用动作 / 器械作为主推进。 |
| `7.60-9.00s` | `M06 IMG_1358.MOV` | short texture cut | action texture | 用器械线条回应高密度 BGM。 |
| `9.00-11.20s` | `M04 IMG_1351.MOV` | machine rise | action sustain | 延续机械节奏，但不平均拖满。 |
| `11.20-12.80s` | `M07 IMG_1359.MOV` | breath object | breath point | 饮品降动势，形成短呼吸。 |
| `12.80-14.60s` | `M11 IMG_3226.MOV` | visual reset | breath -> outro | 用海天短暂换气，但保留场景跳变风险。 |
| `14.60-18.00s` | `M09 IMG_1361.MOV` | mood outro | late drop / ending feel | 夜路影子收束，形成日记感结尾候选。 |

## failure_routing_map（失败回路表）

| possible_failure | symptom | route_back_to | required_fix | forbidden_fix |
|---|---|---|---|---|
| `feedback_material_not_same_video` | 用户觉得沙纹 / 海天 / 夜路和 gym 不像一条片子。 | `material_role_table + mood_fit + scene_function` | 降级 `M14/M11/M09`，改成 gym-only 或只保留一个 mood 素材。 | 用滤镜或贴纸强行统一所有场景。 |
| `feedback_bgm_picture_mismatch` | BGM 和画面气质不搭。 | `BGM_mood_confirmation_gate + material_mood_fit` | 人工听感回审后重判 BGM mood，再重筛素材。 | 把 rough audio feature 写成精准听感。 |
| `feedback_rhythm_dragging` | 中段器械镜头显得拖。 | `energy_curve + segment_duration + cut_potential` | 缩短 `M04/M06`，把动作点集中到 `M03`。 | 只加转场或贴纸制造热闹。 |
| `feedback_no_breath` | 全片仍显得满。 | `breath_points + breath_material + segment_spacing` | 延长 `M07` 或改用更低密度素材。 | 在 breath 段加字幕 / 贴纸。 |
| `feedback_opening_wrong` | 开头沙纹不抓人。 | `BGM intro mood + opening material role` | 改用 `M08` 或 `M09` 开头，重排 intro。 | 只改第一镜头时长。 |
| `feedback_ending_wrong` | 夜路结尾显得突兀。 | `ending_feel + ending candidate` | 改用 `M07` 或 gym 镜头收束。 | 强塞尾卡掩盖不适配。 |
| `feedback_privacy_or_brand_risk` | 人物或饮品品牌不适合保留。 | `material_role_table.risk` | 裁切、缩短或替换 `M08/M07`。 | 把风险写成已确认可用。 |

## technical_validation（技术验证）

| check | result |
|---|---|
| render_success | `true` |
| output_duration | `18.000000s` |
| duration_requirement | `pass: 18s ± 0.5s` |
| resolution | `1080x1920` |
| fps | `30.000` |
| video_codec | `h264` |
| has_audio | `true` |
| audio_codec | `aac` |
| audio_channels | `2` |
| decodable | `true` |
| ffprobe_validation_status | `passed` |
| review_frames_count | `8` |
| contact_sheet_generated | `true` |
| runtime_assets_committed | `false` |

已确认：上述仅为 `technical_validation（技术验证）`，不是 `content_validation（内容验证）`。

## review_guide（用户审片指南）

用户只需要看：

1. BGM 和画面是否搭。
2. 开头是否抓人。
3. 中段是否推进。
4. 是否有呼吸点。
5. 结尾是否自然。
6. 哪个素材不该用。
7. 哪个素材应该多用或少用。

## do_not_claim（禁止声明）

不得声明：

- BGM 精准卡点已确认
- 素材选择已最终通过
- 视频已发布
- 正片已 approved
- vlog director capability verified
