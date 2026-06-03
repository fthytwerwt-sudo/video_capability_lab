# 完整正片候选全流程重剪报告

## A. status（状态）

| field | value |
|---|---|
| task_type | `full_video_candidate_complete_flow_recut_render` |
| output_video_path | `dist/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.mp4` |
| review_pack_path | `tmp/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut_review_pack/` |
| review_contact_sheet | `tmp/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut_review_pack/完整正片候选全流程重剪_contact_sheet.jpg` |
| duration | `18.048000s` |
| resolution | `1080x1920` |
| fps | `30.000` |
| has_audio | `true` |
| content_status | `full_video_candidate_rendered_pending_user_review` |
| capability_status | `vlog_director_capability_still_pending_multi_case_validation` |
| user_review_status | `pending_user_review` |
| api_call_allowed_this_round | `false` |
| image_video_audio_generation_api_called | `false` |
| runtime_asset_commit_allowed_this_round | `false` |
| runtime_asset_commit_status | `not_committed` |

已确认：本轮不是继续修 `50` 的 BGM + 素材拼接口径，而是按 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md` 执行完整正片候选交付。

已确认：本轮没有调用图片 / 视频 / 音频生成 API，没有调用外部音乐识别 API，没有修改原始素材或 BGM。

部分成立：本轮技术输出可读取、可解码、有音轨、时长达标，并且包含字幕 / 文本层、贴纸 / 视觉标点、动效 / 转场和审片包；这不等于用户人审通过，也不等于能力已验证。

## B. full_video_candidate_completion_matrix（正片候选完整性矩阵）

| module | status | evidence | skipped_reason | user_explicitly_skipped | failure_route |
|---|---|---|---|---|---|
| `BGM_style_and_audio` | `included_partial` | 使用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`；BGM 可读，有 AAC stereo 音轨；报告含粗 BGM 风格卡。 | 无 | `false` | 若 BGM 和画面不搭，回到 `47 / 49` 的 `BGM_mood_confirmation_gate` 和人工听感回审。 |
| `material_selection` | `included_partial` | 扫描 `素材/剪辑素材/剪辑/` 下全部 14 个视频；选用 8 个素材进入新时间线，6 个降级为 backup / unused。 | 无 | `false` | 若素材不像一条片，回到 `material_role_table.mood_fit / recommended_role`。 |
| `sequence_structure` | `included` | 新时间线为 `gym identity -> gym space -> main action -> machine texture -> action reprise -> drink breath -> sky reset -> shadow outro -> gym reprise -> shadow close`；未直接复用 `50` 的沙纹开头顺序。 | 无 | `false` | 若结构不成立，回到 `sequence_candidate_used` 和 segment role 分配。 |
| `pacing_and_rhythm` | `included_partial` | 18.048s；短 opening、rise、action、breath、outro 段落均有时长分配；不写精准卡点。 | 无 | `false` | 若节奏拖或乱，回到 `BGM_style_card.energy_curve` 与 segment duration。 |
| `captions_or_text_layer` | `included_partial` | 4 条原创极简文本层：`先醒一下`、`把节奏收紧`、`留一口气`、`今天先到这`；状态均为 `draft_text_pending_user_review`。 | 无 | `false` | 若字幕不好，回到 `caption_text_plan`，改文本、位置、时长或删除单条。 |
| `stickers_or_visual_punctuation` | `included_partial` | 3 个视觉标点事件：动作触点火花、器械短笔触、呼吸段边缘线；contact sheet 含 3.82s、7.06s、12.04s 证据帧。 | 无 | `false` | 若贴纸不自然，回到 `44 / 45 / 46` 的附属关系、形状语法、比例距离和材质融合层。 |
| `motion_effects_and_transitions` | `included` | composition 含 crossfade、motion wipe、texture flash、breath dip、outro darken；视觉标点有入场、停留、退出。 | 无 | `false` | 若转场遮问题，回到 `motion_transition_plan` 和 edit structure，不用特效掩盖素材跳变。 |
| `composition_and_crop` | `included_partial` | 全片 `1080x1920` 竖屏；每段设置 `objectPosition`、scale、Y 位移；字幕和贴纸避开主要主体。 | 无 | `false` | 若主体被裁坏或贴纸压画面，回到 crop / safe area / frame review。 |
| `audio_mix` | `included_partial` | BGM level `0.82`，原素材音频 muted，BGM fade in `0.12s`，fade out `17.35-18.00s`；输出含 AAC stereo。 | 无 | `false` | 若音量或收尾不顺，回到 `audio_mix_plan`，不写 BGM 精准卡点通过。 |
| `export_and_technical_validation` | `included` | Remotion render 成功；video-metadata-probe: `18.048000s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true`。 | 无 | `false` | 若导出失败，回到 Remotion render / ffprobe / decode check。 |
| `review_pack` | `included` | 审片包位于 ignored `tmp/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut_review_pack/`，含 9 张关键帧、contact sheet、manifest。 | 无 | `false` | 若审片包缺失，重跑 `脚本_scripts/生成完整正片候选审片包_generate_full_video_candidate_review_pack.py`。 |
| `failure_feedback_routing` | `included` | 本报告含 `failure_routing_map`，覆盖正片感、BGM、贴纸、字幕、节奏、画面跳、素材统一、结尾和呼吸点。 | 无 | `false` | 若用户反馈新增失败类型，追加到 failure map 并回写 BGM / 素材 / sequence 字段。 |

## C. BGM_style_card（BGM 风格卡）

| field | value |
|---|---|
| bgm_path | `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` |
| duration | `25.400000s` |
| tempo_feel | `medium_tempo_95_7_bpm_candidate` |
| mood_tags | `steady_pulse`, `high_onset_density`, `gym_or_urban_motion_candidate`, `late_drop_candidate` |
| energy_curve | `0.0-2.8 active intro / 2.8-6.8 rise / 6.8-10.0 action pressure / 10.0-12.8 short breath / 12.8-18.0 recede and close` |
| section_map | `0.00-1.70 opening subject / 1.70-3.15 space build / 3.15-10.05 action + texture / 10.05-12.85 breath + reset / 12.85-18.00 outro + close` |
| breath_points | `10.05-12.85s candidate breath window` |
| peak_points | `3.15-4.15s action contact candidate`, `6.78-7.34s machine motion candidate` |
| confidence | `rough_audio_feature_based_not_human_listening_confirmed` |
| review_status | `codex_internal_candidate_not_user_confirmed` |

待验证：BGM mood 和 section map 来自自动音频特征、既有 `48 / 49` 事实和本轮内部粗判，不是人工听感确认。

## D. material_pool（素材池）

- primary_material_pool: `素材/剪辑素材/剪辑/`
- scanned_count: `14`
- selected_count: `8`
- backup_or_unused_count: `6`
- public_legacy_assets_used: `false`
- reference_video_used: `false`
- forbidden_reference_dirs_used: `false`

| material_id | path | duration | resolution | selection | note |
|---|---|---:|---|---|---|
| `M01` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `14.398333s` | `1920x1080` | `backup_not_used` | 熊猫自然素材，和本轮 gym 主线冲突。 |
| `M02` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `16.766667s` | `1920x1080` | `backup_not_used` | 熊猫主体强，但会转入动物/游玩语境。 |
| `M03` | `素材/剪辑素材/剪辑/IMG_1350.MOV` | `3.936700s` | `3840x2160` | `selected` | 健身动作主素材，承担 action 和 action reprise。 |
| `M04` | `素材/剪辑素材/剪辑/IMG_1351.MOV` | `6.406700s` | `1920x1080` | `selected` | 器械结构和机械节奏。 |
| `M05` | `素材/剪辑素材/剪辑/IMG_1353.MOV` | `2.935000s` | `1920x1080` | `selected` | gym 空间建立和结尾前回拉。 |
| `M06` | `素材/剪辑素材/剪辑/IMG_1358.MOV` | `5.065000s` | `1920x1080` | `selected` | 金属器械短切纹理。 |
| `M07` | `素材/剪辑素材/剪辑/IMG_1359.MOV` | `3.388333s` | `1920x1080` | `selected` | 饮品呼吸点；品牌露出需用户回审。 |
| `M08` | `素材/剪辑素材/剪辑/IMG_1360.MOV` | `2.485000s` | `1920x1080` | `selected` | 开头人物/器械身份锚点；可识别人物风险需回审。 |
| `M09` | `素材/剪辑素材/剪辑/IMG_1361.MOV` | `9.531700s` | `1920x1080` | `selected` | 夜路影子 mood outro。 |
| `M10` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `8.756667s` | `1920x1080` | `backup_not_used` | 海天素材可备选，但本轮未用。 |
| `M11` | `素材/剪辑素材/剪辑/IMG_3226.MOV` | `6.005000s` | `1920x1080` | `selected` | 海天短视觉重置。 |
| `M12` | `素材/剪辑素材/剪辑/IMG_6985.MOV` | `18.295000s` | `1920x1080` | `backup_not_used` | 熊猫人偶/活动语境和 gym 主线冲突。 |
| `M13` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `6.300000s` | `1280x720` | `backup_not_used` | 雾滩远景可做呼吸，但本轮不扩散到旧样片语境。 |
| `M14` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `6.166667s` | `720x1280` | `backup_not_used` | 50 曾用作沙纹开头；本轮为避免复用旧顺序未采用。 |

## E. material_role_table（素材功能表）

| material_id | visual_summary | motion_intensity | visual_density | mood_fit | matched_bgm_section | recommended_role | usable_segment_candidate | risk | evidence_level |
|---|---|---|---|---|---|---|---|---|---|
| `M08` | 健身房人物 / 器械镜面锚点。 | medium | medium-high | `fit_gym_identity` | intro | opening subject anchor | `0.14-1.84s` | 可识别人物 / 自拍语境。 | `metadata + contact_sheet_review` |
| `M05` | gym 空间和器械环境。 | low-medium | medium | `fit_space_build` | intro -> rise / outro reprise | space build / identity reprise | `0.20-1.65s`, `1.20-2.55s` | 主体弱，需短用。 | `metadata + contact_sheet_review` |
| `M03` | 健身动作和器械主动作。 | medium-high | high | `fit_action` | rise -> action | main action | `0.25-2.35s`, `2.05-3.55s` | 遮挡高，贴纸需避让。 | `metadata + contact_sheet_review` |
| `M06` | 金属器械近景纹理。 | medium | high | `fit_texture_cut` | action texture | short texture | `0.64-1.79s` | 主体弱，只能短切。 | `metadata + contact_sheet_review` |
| `M04` | 器械结构 / 机械节奏。 | medium | high | `fit_machine_sustain` | action sustain | machine texture | `0.82-2.97s` | 画面噪音高，用户反馈乱时降级。 | `metadata + contact_sheet_review` |
| `M07` | 饮品特写。 | low | low-medium | `fit_breath_object` | breath | breath object | `0.24-1.54s` | 品牌字样需用户回审。 | `metadata + contact_sheet_review` |
| `M11` | 海天远景。 | low | medium | `partial_fit_visual_reset` | breath -> outro | visual reset | `1.10-2.60s` | 和 gym 场景差异大，只短用。 | `metadata + contact_sheet_review` |
| `M09` | 夜路影子 / 低照度移动。 | low-medium | low | `fit_mood_outro_candidate` | outro | mood outro | `2.10-4.35s`, `4.50-6.05s` | 可能跳戏，需用户判断。 | `metadata + contact_sheet_review` |

## F. sequence_candidate_used（实际采用的候选顺序）

| time_range | material | role | bgm_relation | reason | risk |
|---|---|---|---|---|---|
| `0.00-1.70s` | `M08 IMG_1360.MOV` | opening subject anchor | active intro | 本轮改为 gym 人物 / 器械开场，不复用 50 沙纹开头。 | 可识别人物需回审。 |
| `1.70-3.15s` | `M05 IMG_1353.MOV` | space build | intro -> rise | 交代 gym 空间，承接人物锚点。 | 主体弱，短用。 |
| `3.15-5.25s` | `M03 IMG_1350.MOV` | main action | rise action | 把主动作提前，配合动作火花。 | 器械遮挡高。 |
| `5.25-6.40s` | `M06 IMG_1358.MOV` | short texture cut | action texture | 短促机械切点，不平均塞素材。 | 主体弱。 |
| `6.40-8.55s` | `M04 IMG_1351.MOV` | machine sustain | action sustain | 机械线条承接节奏，并放器械短笔触。 | 画面噪音高。 |
| `8.55-10.05s` | `M03 IMG_1350.MOV` | action reprise | late action punctuation | 回到主动作，给 breath 前收紧。 | 复用 M03，需用户判断重复感。 |
| `10.05-11.35s` | `M07 IMG_1359.MOV` | breath object | breath point | 饮品作为短呼吸，不拖长。 | 品牌露出。 |
| `11.35-12.85s` | `M11 IMG_3226.MOV` | visual reset | breath -> outro | 短视觉重置，放低权重呼吸线。 | 和 gym 场景差异大。 |
| `12.85-15.10s` | `M09 IMG_1361.MOV` | mood outro | recede | 夜路影子进入日记感收束。 | 可能不像同一条片。 |
| `15.10-16.45s` | `M05 IMG_1353.MOV` | identity reprise | outro return | 回拉 gym 空间，降低 mood 素材跳戏。 | 回拉本身可能突兀。 |
| `16.45-18.00s` | `M09 IMG_1361.MOV` | shadow close | final fade | 暗影尾声自然淡出。 | 若结尾不自然，重选 ending candidate。 |

## G. caption_text_plan（字幕 / 文本层方案）

| caption_id | time_range | text | role | why_needed | status |
|---|---|---|---|---|---|
| `caption_01_opening` | `0.38-1.48s` | `先醒一下` | opening hook | 开头给 gym 身份一个轻语气入口。 | `draft_text_pending_user_review` |
| `caption_02_action` | `3.25-4.60s` | `把节奏收紧` | action focus | 服务主动作和 BGM 推进，不解释画面。 | `draft_text_pending_user_review` |
| `caption_03_breath` | `10.16-11.18s` | `留一口气` | breath | 标记饮品呼吸点，避免全片一直满。 | `draft_text_pending_user_review` |
| `caption_04_outro` | `15.42-16.92s` | `今天先到这` | outro | 结尾给日记感收束。 | `draft_text_pending_user_review` |

## H. sticker_visual_punctuation_plan（贴纸 / 视觉标点方案）

| sticker_id | time_range | anchor_target | attachment_relation | shape_grammar | visual_role | source_mechanism | status |
|---|---|---|---|---|---|---|---|
| `sticker_01_action_contact_spark` | `3.55-4.15s` | `M03 器械/身体动作接触窗口` | `contact_point_attached` | `contact_spark` | 动作触点短促火花，提示主动作首次进入。 | `44 sticker_attachment_relation + 46 contact_spark small-scope probe` | `included_partial_pending_user_review` |
| `sticker_02_machine_motion_ticks` | `6.78-7.34s` | `M04 器械线条与动作方向` | `motion_direction_attached` | `short_stroke_cluster` | 沿器械运动方向的短笔触标点，避免变成说明箭头。 | `44 short_stroke_cluster + reaction_motion_signature` | `included_partial_pending_user_review` |
| `sticker_03_breath_edge_line` | `11.62-12.38s` | `M11 海天呼吸段边缘/留白关系` | `negative_space_attached` | `breath_edge_line` | 低权重呼吸线，证明视觉标点存在但不破坏换气。 | `44 negative_space_attached + edge_wiggle / no clutter rule` | `included_partial_pending_user_review` |

## I. motion_transition_plan（动效与转场方案）

| transition_id | time_range | from_material | to_material | transition_type | why_needed | status |
|---|---|---|---|---|---|---|
| `transition_01_subject_to_space` | `1.58-1.80s` | `M08` | `M05` | `soft_crossfade` | 人物锚点到空间建立，降低硬切跳感。 | `included` |
| `transition_02_space_to_action` | `3.02-3.26s` | `M05` | `M03` | `motion_wipe` | 把空间镜头推入主动作段。 | `included` |
| `transition_03_action_texture_flash` | `5.15-5.33s` | `M03` | `M06` | `texture_flash` | 短闪响应 action 密度，不写精准卡点。 | `included` |
| `transition_04_breath_dip` | `10.00-10.28s` | `M03` | `M07` | `breath_dip` | 给饮品呼吸点留出降动势。 | `included` |
| `transition_05_outro_darken` | `12.74-13.02s` | `M11` | `M09` | `soft_crossfade` | 从视觉重置进入夜路收束。 | `included` |

## J. audio_mix_plan（音频混合方案）

| item | value |
|---|---|
| BGM level | `0.82` |
| BGM source | `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` |
| original clip audio policy | `muted_all_source_clip_audio` |
| fade in | `0.00-0.12s` |
| fade out | `17.35-18.00s` |
| final audio validation | `AAC stereo present; video-metadata-probe audio_present=true` |

待验证：该混音只证明 BGM 音轨进入输出，不证明人工听感已通过。

## K. technical_validation（技术验证）

| check | result |
|---|---|
| remotion_composition_check | `recognized: 完整正片候选全流程重剪-full-video-candidate-complete-flow-recut / 540 frames / 30fps / 1080x1920` |
| render_success | `true` |
| local_asset_bridge | `127.0.0.1 local http server used only for Remotion reading repo-local files; stopped after render` |
| output_duration | `18.048000s` |
| duration_requirement | `pass: 18s ± 0.5s` |
| resolution | `1080x1920` |
| fps | `30.000` |
| video_codec | `h264` |
| has_audio | `true` |
| audio_codec | `aac` |
| audio_channels | `2` |
| decodable | `true` |
| video_metadata_probe_status | `passed` |
| ffmpeg_decode_check | `passed` |
| review_frames_count | `9` |
| contact_sheet_generated | `true` |
| runtime_assets_committed | `false` |

说明：以上是 `technical_validation（技术验证）`，不是 `content_validation（内容验证）`。

## L. review_guide（用户审片指南）

用户只需要看：

1. BGM 和画面是否搭。
2. 开头是否抓人。
3. 中段是否推进。
4. 是否有呼吸点。
5. 结尾是否自然。
6. 字幕是否影响观看。
7. 贴纸 / 视觉标点是否存在且自然。
8. 哪个素材不该用。
9. 哪个素材应该多用或少用。

## M. failure_routing_map（失败回路表）

| possible_failure | symptom | route_back_to | required_fix | forbidden_fix |
|---|---|---|---|---|
| `feedback_no_full_video_feel` | 用户觉得仍不像正片，只像素材串联。 | `full_video_candidate_completion_matrix + sequence_structure` | 重判缺失模块，重写 opening/build/action/breath/outro 功能。 | 只解释已经 render 成功。 |
| `feedback_bgm_picture_mismatch` | BGM 和画面气质不搭。 | `BGM_mood_confirmation_gate + material_mood_fit` | 人工听感回审后重判 BGM mood，再重筛素材。 | 把 rough audio feature 写成人工确认。 |
| `feedback_sticker_not_natural` | 贴纸像 UI、PPT 标注或漂浮。 | `44 / 45 / 46 sticker attachment + shape + material` | 调整附属关系、比例距离、描边材质，或删除单个事件。 | 继续加更多贴纸或只改颜色。 |
| `feedback_caption_bad` | 字幕别扭、过解释或挡画面。 | `caption_text_plan` | 改短句、位置、时长或删除单条。 | 把字幕写成最终文案通过。 |
| `feedback_rhythm_dragging` | 中段拖、没有推进。 | `energy_curve + segment_duration + cut_potential` | 缩短 M04/M06，集中 M03 动作点。 | 只加转场或贴纸制造热闹。 |
| `feedback_visual_jumps` | gym、饮品、海天、夜路跳得突兀。 | `transition_reason + material_role_table.mood_fit` | 减少 mood 素材，改成 gym-only 或只保留一个反差素材。 | 用滤镜或贴纸硬统一所有场景。 |
| `feedback_material_not_same_video` | 素材不像同一条片。 | `material_role_table + sequence_candidate` | 重定主素材、辅助素材、弃用素材和 ending candidate。 | 平均保留所有素材时长。 |
| `feedback_ending_wrong` | 结尾突兀、没收住。 | `ending_feel + ending candidate` | 改用 gym 镜头或饮品收束，或删除夜路尾声。 | 强塞尾卡或结束字幕掩盖。 |
| `feedback_no_breath` | 全片一直满，没有换气。 | `breath_points + breath_material + segment_spacing` | 延长或重选低密度 breath 段，减少同段字幕/贴纸权重。 | 在满屏段继续加信息。 |

## N. do_not_claim（禁止声明）

不得声明：

- BGM 精准卡点已确认。
- 素材选择已最终通过。
- 视频已发布。
- 正片已由用户批准。
- 贴纸机制已验证。
- `vlog` 视频导演能力已验证。
- 本轮已进入发布就绪状态。

最终内容状态只能写：

```text
full_video_candidate_rendered_pending_user_review
```
