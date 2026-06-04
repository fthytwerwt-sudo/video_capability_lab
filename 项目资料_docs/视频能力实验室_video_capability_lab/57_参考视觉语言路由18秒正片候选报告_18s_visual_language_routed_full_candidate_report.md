# 参考视觉语言路由 18 秒正片候选报告

## status

- 已确认：本轮直接重新生成一版新的 `18s_visual_language_routed_full_candidate`，不是继续补机制、不是只做局部字幕 / 贴纸修复。
- 已确认：当前输出为 `full_video_candidate（正片候选）`，不是 `publish-ready（发布就绪）`。
- 已确认：本轮使用同一个 BGM：`素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`。
- 已确认：本轮扫描 `素材/剪辑素材/剪辑/` 下全部 14 个可用视频素材，全部 decodable=true。
- 已确认：本轮读取并使用 `51 / 54 / 55 / 56`，字幕、贴纸 / 视觉标点均通过 `56` 的 decision router。
- 已确认：本轮未调用图片 / 视频 / 音频生成 API，未生成新贴纸图片资产，未把参考视频素材写入成片时间线。
- 待验证：用户仍需审看输出视频；技术验证通过不等于内容、审美或能力通过。

## BGM metadata

| field | value |
|---|---|
| `path` | `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV` |
| `duration` | `25.400000s` |
| `video_codec` | `hevc` |
| `resolution` | `720x960` |
| `fps` | `30fps` |
| `audio_codec` | `aac` |
| `audio_channels` | `2 / stereo` |
| `rough_mood` | `steady pulse / gym-urban motion / active texture / short breath window` |
| `precision_boundary` | `粗情绪、粗能量、粗段落；未声明人工精准卡点` |

## material pool scan

| material_id | path | duration | resolution | fps | decodable | visual_summary | motion_intensity | visual_density | possible_role | risk | selection | reason |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|
| `M01` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `14.398333s` | `1920x1080` | `approx_59.94` | `true` | 熊猫在竹叶和木栏后方活动，自然园区语境强。 | `low_medium` | `medium_high` | nature character insert / backup contrast | 和本轮 gym + texture + night 主线语境不合。 | `backup` | 保留为备选；不进入本轮，避免把叙事改成熊猫片。 |
| `M02` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `16.766667s` | `1920x1080` | `approx_59.94` | `true` | 熊猫坐在竹林环境，主体清晰但有游客遮挡。 | `low_medium` | `medium` | character beat / backup | 动物主体和游览感过强。 | `backup` | 若用户转自然/动物路线再使用；本轮不进时间线。 |
| `M03` | `素材/剪辑素材/剪辑/IMG_1350.MOV` | `3.936700s` | `3840x2160` | `approx_59.94` | `true` | 健身器械和人体动作，前景器械遮挡形成强运动锚点。 | `medium_high` | `high` | action focus / return action | 遮挡高，字幕和贴纸必须避开动作核心。 | `selected` | 最匹配 BGM 的运动推进，承担主动作和后段 return。 |
| `M04` | `素材/剪辑素材/剪辑/IMG_1351.MOV` | `6.406700s` | `1920x1080` | `approx_59.94` | `true` | 健身器械近中景，机械线条和空间纵深明显。 | `medium` | `high` | machine direction push | 金属线条复杂，视觉标点过多会显乱。 | `selected` | 作为 BGM 上升段机器方向镜头，配 motion trail 而不做说明箭头。 |
| `M05` | `素材/剪辑素材/剪辑/IMG_1353.MOV` | `2.935000s` | `1920x1080` | `approx_59.94` | `true` | 健身房空间、镜面、器械与环境标识，空间感强。 | `low_medium` | `medium` | space build / return identity | 主体弱，长用会像环境占位。 | `selected` | 短段建立和回收 gym 身份，防止夜路/海边素材带散。 |
| `M06` | `素材/剪辑素材/剪辑/IMG_1358.MOV` | `5.065000s` | `1920x1080` | `30` | `true` | 健身器械金属立柱和配重细节，近景纹理强。 | `medium` | `high` | texture rhythm push | 主体叙事弱，必须短切。 | `selected` | 为中段提供机械 texture，不平均塞素材。 |
| `M07` | `素材/剪辑素材/剪辑/IMG_1359.MOV` | `3.388333s` | `1920x1080` | `approx_59.94` | `true` | 手拿透明饮品，杯身文字明显，低动势物件镜头。 | `low` | `low_medium` | object breath | 杯身品牌/包装文字有 copy risk。 | `rejected` | 二次审片包检查发现杯身文字过大；为降低 brand/copy risk，移出最终时间线。 |
| `M08` | `素材/剪辑素材/剪辑/IMG_1360.MOV` | `2.485000s` | `1920x1080` | `approx_59.94` | `true` | 健身器械与人物入场/动作锚点，空间身份明确。 | `medium` | `medium_high` | identity entry | 可识别人物和自拍语境需用户人审。 | `selected` | 用作 sand texture 之后的进场身份，不复用 52 首镜开法。 |
| `M09` | `素材/剪辑素材/剪辑/IMG_1361.MOV` | `9.531700s` | `1920x1080` | `30` | `true` | 夜路墙边影子移动，暗部留白和日记感强。 | `low_medium` | `low` | shadow mood reset / close | 和 gym 主线有语境跳跃风险。 | `selected` | 用于后段暗色 reset 和 close，配 motion trail 与 whisper caption 收束。 |
| `M10` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `8.756667s` | `1920x1080` | `approx_59.94` | `true` | 海天远景，人群较多，云层开阔。 | `low` | `medium_high` | wide sky breath | 人群和景区感较强，和 gym 线不一致。 | `selected` | 替换 M07 杯身品牌风险，用作 8s 呼吸点；只短用，不贴天空装饰。 |
| `M11` | `素材/剪辑素材/剪辑/IMG_3226.MOV` | `6.005000s` | `1920x1080` | `approx_59.94` | `true` | 海天和云层远景，画面比 M10 更开阔。 | `low` | `medium` | visual reset | 场景跳出 gym，需要短用并回到主线。 | `selected` | 承担视觉重置，不贴空天，只让剪辑承载。 |
| `M12` | `素材/剪辑素材/剪辑/IMG_6985.MOV` | `18.295000s` | `1920x1080` | `approx_59.94` | `true` | 室内活动、儿童与熊猫人偶，人物和活动语境强。 | `medium` | `high` | event crowd backup | 儿童/人群/活动空间 copy and privacy risk 高。 | `rejected` | 不进入成片候选，避免人物活动风险和叙事跳线。 |
| `M13` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `6.300000s` | `1280x720` | `30` | `true` | 雾滩远景，人物很小，低对比、低动势。 | `low` | `low` | mood breath | 低能量与 BGM 不一定搭，必须短用。 | `selected` | 呼吸点，给中段机械密度降噪。 |
| `M14` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `6.166667s` | `720x1280` | `30` | `true` | 竖屏沙纹/足迹/地面纹理，低主体但 texture 强。 | `low` | `medium` | opening texture hook | 若拖长会回到旧沙纹安全开场。 | `selected` | 只用 0.9s 做 tactile hook，并立即切入 gym。 |

## sequence structure

本轮重新建立时间线，不直接复用 `52` 的顺序。

| segment_id | time_range | material_id | source_time_range | role | bgm_relation | visual_reason | caption_or_sticker_need | risk | fallback_if_failed |
|---|---|---|---|---|---|---|---|---|---|
| `seg_01_sand_texture_hook` | `0.00-0.90s` | `M14` | `0.20-1.10s` | opening hook texture | active intro texture hit | 沙纹只做 tactile hook。 | hero keyword + edge strokes | 低主体素材过长会像拼接。 | 改用 M08 直接开场。 |
| `seg_02_gym_entry_identity` | `0.90-2.10s` | `M08` | `0.14-1.34s` | identity entry | intro pulse becomes gym identity | 把 texture hook 落到 gym。 | attached phrase + micro mark | 可识别人物需人审。 | 改用 M05 空间进场。 |
| `seg_03_gym_space_build` | `2.10-3.15s` | `M05` | `0.40-1.45s` | space build | intro to rise | 补空间，不让动作孤立。 | transition edge only | 主体弱。 | 删除并延长 M08/M03。 |
| `seg_04_main_action_push` | `3.15-5.05s` | `M03` | `0.35-2.25s` | action focus | rise/action pressure | 主动作提前进入。 | hero keyword + contact flash | 遮挡高。 | 缩短并提前 M04。 |
| `seg_05_metal_texture_cut` | `5.05-6.15s` | `M06` | `0.70-1.80s` | texture rhythm push | mechanical texture accent | 金属近景做 rhythm push。 | attached phrase only | 主体弱。 | 删除并让 M04 承接。 |
| `seg_06_machine_direction` | `6.15-8.00s` | `M04` | `1.05-2.90s` | machine direction push | action sustain | 机械线条给 motion trail 锚点。 | motion trail punctuation | 高密度。 | 缩短 M04。 |
| `seg_07_sky_breath` | `8.00-9.20s` | `M10` | `1.10-2.30s` | visual reset / breath | short breath | 海天开阔面给机械段换气。 | caption only; no sky sticker | 景区感强，短用。 | 删除 M10，改由 M13/M11。 |
| `seg_08_fog_breath` | `9.20-10.55s` | `M13` | `1.00-2.35s` | mood breath | energy downshift | 低密度承接呼吸。 | breath line + whisper | 场景跳线。 | 改成 M11 reset。 |
| `seg_09_sky_reset` | `10.55-11.85s` | `M11` | `1.15-2.45s` | visual reset | breath bridge | 云层做视觉 reset。 | no caption/no sticker | 过长会离开 gym。 | 删除并进 shadow。 |
| `seg_10_shadow_mood_reset` | `11.85-13.45s` | `M09` | `2.20-3.80s` | shadow mood reset | darker return prep | 夜路影子接日记感。 | motion trail + whisper | 可能跳戏。 | 改为 gym-only return。 |
| `seg_11_action_return` | `13.45-15.05s` | `M03` | `2.05-3.65s` | return action | return pulse | 从 shadow 回到 gym 动作。 | caption only | M03 二次出现。 | 换 M04/M08 return。 |
| `seg_12_identity_return` | `15.05-16.30s` | `M05` | `1.20-2.45s` | return identity | outro returns to place | 回到 gym 空间。 | caption only | 回拉可能突兀。 | 删除，M03 接 shadow close。 |
| `seg_13_shadow_close` | `16.30-18.00s` | `M09` | `4.70-6.40s` | close | final fade | 影子尾声收住。 | whisper caption only | 结尾跳戏风险。 | 使用 M05 或 M11 收尾。 |

## visual_language_preflight

```yaml
visual_language_preflight:
  source_inventory_read: true
  migration_library_read: true
  decision_router_read: true
  analysis_asset_ids: [2, 5, 6, 7, 17, 21, 22, 23, 25, 27, 29, 35, 37, 50, 53, 57, 58, 59]
  reference_rule_links:
    - 54:F.extraction_contract
    - 55:D.sticker_type_library
    - 55:E.attachment_relation_library
    - 55:F.shape_drawing_logic_library
    - 55:G.stroke_material_motion_library
    - 55:H.caption_visual_language_library
    - 55:I.caption_sticker_relation_library
    - 56:E.caption_router
    - 56:F.sticker_visual_punctuation_router
    - 56:G.caption_sticker_conflict_resolver
    - 56:J.template_fallback_gate
  migration_library_used: true
  decision_router_used: true
  template_fallback: false
  copy_risk_check: "只迁移功能关系、锚点、层级、材质和动效；不复制参考视频素材、第三方贴纸、平台 UI、品牌包装、原字体或原文案。M07 杯身品牌风险经审片包检查后已移出最终时间线。"
```

## caption plan

| caption_id | time_range | text | text_status | caption_type | analysis_asset_ids | reference_rule_links | anchor_target | position_mode | attention_weight | caption_sticker_relation | caption_visual_language_decision | sticker_visual_language_decision | copy_risk_check | template_fallback |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `caption_01_sand_hero` | `0.18-0.88s` | `先落地` | `draft_text_pending_user_review` | `hero_keyword` | `[53,59]` | `55:H.caption_01 / 56:E.caption_branch_01_hero_keyword` | M14 沙纹/足迹 texture | `center_hero` | `high` | `caption_leads_sticker_supports` | 大字短停，参与 opening hook。 | edge strokes 降权辅助沙纹边缘。 | 原创短句；不复制参考文案、字体或平台 UI。 | `false` |
| `caption_02_gym_entry` | `1.06-1.92s` | `进场` | `draft_text_pending_user_review` | `attached_phrase` | `[53,59]` | `55:H.caption_02 / 56:E.caption_branch_02_attached_phrase` | M08 器械前景/人物入场关系 | `object_edge` | `medium` | `shared_anchor_split_roles` | 文本靠器械边缘，作为身份进入提示。 | micro mark 只做语气，不复述文字。 | 原创短词；不使用参考字体/原文案。 | `false` |
| `caption_03_action_push` | `3.28-4.36s` | `推上去` | `draft_text_pending_user_review` | `hero_keyword` | `[53,59]` | `55:H.caption_01 / 56:E.caption_branch_01_hero_keyword` | M03 动作峰值/器械接触窗口 | `diagonal_attached` | `high` | `sticker_leads_caption_supports` | 动作峰值短句，不是说明牌。 | contact flash 主导动作反应。 | 原创短句；不复制参考字幕或促销爆点。 | `false` |
| `caption_04_machine_line` | `5.38-6.02s` | `线条在跑` | `draft_text_pending_user_review` | `attached_phrase` | `[53,59]` | `55:H.caption_02 / 56:E.caption_branch_02_attached_phrase` | M06 金属配重线条 | `object_edge` | `medium` | `caption_only` | 贴线条，不固定底部。 | 不加贴纸，避免高密度画面拥挤。 | 原创短句，无品牌/UI/参考文案复制。 | `false` |
| `caption_05_sky_breath` | `8.18-9.03s` | `缓一口` | `draft_text_pending_user_review` | `hand_drawn_reaction_word` | `[47,50,53,59]` | `55:H.caption_05 / 56:E.caption_branch_05_hand_drawn_reaction_word / 56:G.caption_sticker_conflict_resolver` | M10 海天留白与远处人物尺度 | `negative_space_small` | `medium` | `caption_only` | 呼吸段轻反应，跟随画面开阔而不是说明风景。 | sky/no-layer branch，不给天空硬塞贴纸。 | 原创短句；M07 brand/copy 风险已移出最终时间线。 | `false` |
| `caption_06_fog_whisper` | `9.72-10.45s` | `慢一点` | `draft_text_pending_user_review` | `whisper_caption` | `[47,53,59]` | `55:H.caption_03 / 56:E.caption_branch_03_whisper_caption` | M13 雾滩远景留白 | `negative_space_small` | `low` | `caption_leads_sticker_supports` | 低权重呼吸语气。 | breath line 只做低权重视觉呼吸。 | 原创短句，无参考复制。 | `false` |
| `caption_07_shadow_close` | `15.72-17.28s` | `收在影子里` | `draft_text_pending_user_review` | `whisper_caption` | `[47,53,59]` | `55:H.caption_03 / 56:E.caption_branch_03_whisper_caption` | M05 回到 gym 后转入 M09 影子 close | `lower_left_whisper` | `low` | `caption_only` | 结尾低权重收束。 | 结尾不再加贴纸，避免尾声拥挤。 | 原创短句；不复制参考尾卡/UI/原文案。 | `false` |

## sticker / visual punctuation plan

| sticker_id | time_range | sticker_needed | analysis_asset_ids | reference_rule_links | anchor_target | attachment_relation | sticker_type | shape_grammar | material_compositing | motion_signature | caption_relation | copy_risk_check | bad_pattern_avoided | template_fallback |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sticker_01_sand_edge_wiggle` | `0.28-0.82s` | `true` | `[43,44,50,53,59]` | `55:D.sticker_type_05 / 55:E.attach_01 / 55:F.shape_01 / 56:F.sticker_branch_05_edge` | M14 沙纹边缘/足迹纹理方向 | `edge_attached` | `edge_attached_short_stroke_cluster` | `short_stroke_cluster` | soft-light shadow, low contrast | 4 frame draw, hold, dissolve | supports caption_01 | 原创 SVG/CSS 线条；不复制第三方贴纸或参考形状。 | floating_ui_layer / quantity_as_quality / template_shape_swap | `false` |
| `sticker_02_entry_caption_tick` | `1.18-1.82s` | `true` | `[21,44,53,59]` | `55:D.sticker_type_08 / 55:E.attach_08 / 55:F.shape_09 / 56:F.sticker_branch_08_caption_micro` | caption_02 与 M08 器械边缘共享锚点 | `caption_relation_attached` | `caption_relation_micro_mark` | `micro_tick_pair` | caption-edge foreground mark | entry synced roughly with caption | caption leads, sticker supports | 原创微标点；无参考 UI/字体复制。 | sticker_caption_duplicate / floating_ui_layer | `false` |
| `sticker_03_action_contact_flash` | `3.48-4.08s` | `true` | `[40,41,44,53,59]` | `55:D.sticker_type_03 / 55:E.attach_02 / 55:F.shape_02 / 56:F.sticker_branch_03_contact` | M03 发力/器械接触窗口 | `contact_point_attached` | `contact_flash` | `contact_flash` | drop shadow plus slight screen blend | 3 frame pop, hold, exit | sticker leads, caption_03 supports | 原创 SVG 火花；不复制参考贴纸或爆炸形。 | quantity_as_quality / caption_as_explanation / copy_reference_surface | `false` |
| `sticker_04_machine_motion_trail` | `6.72-7.42s` | `true` | `[44,47,53,59]` | `55:D.sticker_type_04 / 55:E.attach_03 / 55:F.shape_03 / 56:F.sticker_branch_04_motion` | M04 器械斜向金属线条 | `motion_direction_attached` | `motion_trail_punctuation` | `motion_trail_punctuation` | foreground line with low opacity shadow | staggered reveal, short hold | owns motion cue | 原创短线轨迹；无参考复制。 | floating_ui_layer / template_shape_swap | `false` |
| `sticker_05_sky_no_layer_blocked` | `8.26-8.96s` | `false` | `[47,52,53,59]` | `55:E.attach_07 / 56:F.sticker_visual_punctuation_router / 56:G.caption_sticker_conflict_resolver / 56:L.no_layer_rule` | M10 海天留白 | `negative_space_attached` | `negative_space_breath_line` | `whisper_line_or_tick` | not_rendered_due_no_layer_rule | not_rendered_due_no_layer_rule | caption_05 carries breath reaction | 原创 no-layer decision；不复制参考贴纸，不在天空硬塞符号。 | floating_ui_layer / quantity_as_quality / caption_as_explanation | `false` |
| `sticker_06_fog_breath_line` | `9.82-10.58s` | `true` | `[44,47,52,53,59]` | `55:D.sticker_type_07 / 55:E.attach_07 / 55:F.shape_09 / 56:F.sticker_branch_07_breath` | M13 雾滩留白和地平线方向 | `negative_space_attached` | `negative_space_breath_line` | `whisper_line_or_tick` | low opacity shadow, blends into fog | slow reveal, soft hold | caption_06 leads | 原创线条；无参考资产复制。 | quantity_as_quality / floating_ui_layer | `false` |
| `sticker_07_shadow_motion_trail` | `12.38-13.18s` | `true` | `[44,47,53,59]` | `55:D.sticker_type_04 / 55:E.attach_03 / 55:F.shape_03 / 56:F.sticker_branch_04_motion` | M09 影子移动方向 | `motion_direction_attached` | `motion_trail_punctuation` | `motion_trail_punctuation` | dark edge + dim cream inner stroke | staggered dim reveal | shared anchor with later caption_07 | 原创暗线；无参考复制。 | floating_ui_layer / sticker_caption_duplicate | `false` |

## caption_sticker_conflict_resolution

| check | result | action |
|---|---|---|
| `big_text_blocks_subject` | `resolved` | hero captions stay side/texture anchored; action contact point kept clear. |
| `sticker_duplicates_caption` | `resolved` | sticker_02 supports `进场`; sticker_03 owns contact reaction; sticker_06/07 are low-weight motion/breath marks. |
| `sticker_blocks_caption` | `resolved` | sticker_02 attaches near caption but lower attention; sticker_05 uses no-layer branch and is not rendered. |
| `caption_blocks_action` | `resolved` | action captions are lower/side biased and short-lived. |
| `visual_density_overload` | `resolved` | high-density gym segments get short or no stickers; M10/M11 no sky decoration. |
| `copy_risk_conflict` | `resolved` | M07 removed from final timeline after review-pack inspection; no reference UI/font/sticker/brand assets copied. |

## full_video_candidate_completion_matrix

| module | status | evidence |
|---|---|---|
| BGM | `included` | same BGM path, AAC stereo in output |
| material selection | `included` | all 14 materials scanned; selected/backup/rejected table written |
| edit structure | `included` | 13 routed segments, 0-18s |
| pacing / rhythm | `included` | rough energy sections + short segment roles |
| captions / text layer | `included` | 7 caption events, all routed through `56` |
| sticker / visual punctuation | `included` | 7 candidates, 6 rendered, 1 no-layer blocked |
| motion / transitions | `included` | transitions + animated caption/sticker entry/hold/exit |
| composition / crop | `included` | 1080x1920, safe-area aware positions |
| audio mix | `included` | BGM audio in track, source clip audio muted |
| export validation | `included` | metadata probe + ffmpeg decode check passed |
| review pack | `included` | 42 evidence frames + contact sheet + manifest |
| failure routing | `included` | fallback per segment + completion/failure routing data |

## technical validation

| validation | result |
|---|---|
| Remotion composition check | `passed`：composition `参考视觉语言路由18秒正片候选-18s-visual-language-routed-full-candidate` registered as `30fps / 1080x1920 / 540 frames` |
| Remotion render | `passed` |
| output path | `dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4` |
| file size | `26844064 bytes` |
| duration | `18.048000s` |
| resolution | `1080x1920` |
| fps | `30.000` |
| video codec | `h264` |
| audio codec | `aac` |
| audio channels | `2 / stereo` |
| decodable | `true` |
| ffmpeg decode check | `passed` |
| review pack script | `passed` |
| review pack evidence count | `42 frames + contact sheet + manifest + evidence map` |
| contact sheet sanity | `已确认：M07 杯身文字片段不在最终证据帧中；未见上一版硬黑帧问题` |

## review pack path

- `tmp/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate_review_pack/`
- contact sheet: `tmp/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate_review_pack/参考视觉语言路由18秒正片候选_contact_sheet.jpg`
- manifest: `tmp/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate_review_pack/参考视觉语言路由18秒正片候选_review_manifest.json`
- evidence map: `tmp/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate_review_pack/caption_sticker_evidence_map.json`

## failure routing

- 如果用户认为 `M10 / M13 / M11` 海边呼吸段使主线跳开，下一轮退回 `gym-only breath`，优先 M05/M06 做低动势回拉。
- 如果用户认为影子结尾跳戏，下一轮用 M05 或 M11 收尾，不声明当前 close 通过。
- 如果用户认为字幕仍太轻，先改 caption layer 的层级和位置节奏，不复制参考原字体或原文案。
- 如果用户认为贴纸仍不够自然，继续用 `56` 回到 `attachment_relation / shape_derived_from_event / material_compositing`，不能靠新增模板数量硬塞。
- 如果任一输出项出现 `template_fallback=true`，不得进入正片候选，必须回退重判。

## do_not_claim

- 不声明 `publish-ready`。
- 不声明 `video_fixed`。
- 不声明 `vlog director capability verified`。
- 不声明用户审美通过。
- 不声明 BGM 精准人工卡点通过。
- 不提交 `dist/`、`tmp/`、视频、图片、音频、抽帧或原始素材。

## remaining user review points

- 待验证：整体方向是否比上一版更像“完整正片候选”，而不是安全素材拼接。
- 待验证：8 秒海天呼吸段是否成立，还是需要回到 gym-only breath。
- 待验证：夜路影子 reset / close 是否形成情绪收束，还是跳戏。
- 待验证：7 条原创 caption 的语气是否适合本片。
- 待验证：6 个实际渲染的 sticker / visual punctuation 是否自然附着，还是仍偏 Remotion 组件感。
- 待验证：当前候选只完成技术和结构交付，能力仍为 `vlog_director_capability_still_pending_multi_case_validation`。
