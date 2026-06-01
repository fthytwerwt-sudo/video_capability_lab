# 当前三十秒样片三表执行包

## 1. 状态

- task_type: `current_30s_three_tables_execution_pack`
- target_sample: `三十秒对标样片-30s-reference-sample`
- target_sample_video: `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`
- source_data: `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- source_composition: `remotion/src/ThirtySecondReferenceSample.tsx`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- output_type: `three_tables_markdown_pack`
- content_status: `tables_completed_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- generated_at: `2026-06-01`

已确认：当前 30 秒样片是验证材料，不是项目目标。

已确认：本轮是在用 `24_通用vlog剪辑机制_vlog_director_capability_mechanism.md` 分析当前样片，不是把当前样片重新设为项目目标。

已确认：本轮不修视频、不 render、不编辑 Remotion 源码、不调用外部 API、不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。

部分成立：样片技术元数据通过，`30.058667s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true`。这只说明文件可解码，不说明内容、审美、字幕、贴纸、转场或音乐关系通过。

待验证：三张表完成后，下一轮是否进入 Remotion 修复，必须由 `hard_fail_summary` 和 `next_fix_route` 决定。

## 2. 输入依据

| source | status | use_in_this_pack |
|---|---|---|
| `16_新参考包审美解析_new_reference_aesthetic_pack.md` | 已确认 | 提供参考视频可迁移功能、不可复制项和审美失败线。 |
| `20_三十秒对标样片报告_30s_reference_sample_report.md` | 已确认 | 提供 30 秒结构、18 个 visual segment、10 个 caption、11 个 sticker、BGM marker 状态。 |
| `21_字幕贴纸对标审计_caption_sticker_reference_audit.md` | 已确认 | 提供 caption / sticker 当前失败证据。 |
| `22_视频事件表与画面选择机制_video_event_table_visual_selection.md` | 已确认 | 提供 `visual_selection_table` 与 `video_event_table` 字段机制。 |
| `23_对标视频底线失败标准_reference_bottom_line_fail_gate.md` | 已确认 | 提供 `hard_fail_gate` 和失败代码。 |
| `24_通用vlog剪辑机制_vlog_director_capability_mechanism.md` | 已确认 | 提供通用三表机制和项目目标重锚边界。 |
| `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts` | 已确认 | 提供当前 18 个 visual segment、10 个 caption、11 个 sticker 的执行数据。 |
| `remotion/src/ThirtySecondReferenceSample.tsx` | 已确认 | 提供 scrapbook、end card、fade / peak flash 等结构事件。 |

## 3. `reference_learning_checklist`

说明：本表只迁移参考视频的 `reference_function`，不复制平台 UI、品牌资产、账号页、二维码、原字体、原贴纸、原文案或原音乐。当前本地参考片段精确 timecode 未在本轮重新逐帧复核，所有 reference_timecode 均标为 `待人工复核`，不得伪造。

| reference_id | reference_timecode | reference_function | not_to_copy | target_event_id | function_match | style_match | failure_if_missing | fix_priority |
|---|---|---|---|---|---|---|---|---|
| `ref_01_object_pov_opening` | `待人工复核` | 用真实物件 / 纹理先开场，让观众先进入现场，而不是先看标题或说明。 | 不复制原参考文字、原贴纸、平台 UI、账号信息。 | `segment_sand_trace_opening`, `segment_panda_head_turn` | `partial` | `partial` | `fail_no_reference_function` | `P0` |
| `ref_02_micro_space_progression` | `待人工复核` | 通过 1.5-3 秒微段落推进空间，从近处纹理过渡到远景 / 云雾 / 人群。 | 不复制原地点、原音乐、原滤镜参数。 | `segment_mist_people_wide`, `segment_cloud_tide_open` | `partial` | `partial` | `fail_random_patchwork` | `P1` |
| `ref_03_action_bound_caption` | `待人工复核` | 字幕作为动作旁边的语气标点，绑定可见动作或切换瞬间。 | 不复制原字体、原文案、原手写贴图。 | `caption_ka`, `caption_look` | `fail` | `fail` | `fail_caption_not_reference_like` | `P0` |
| `ref_04_one_subject_one_small_punctuation` | `待人工复核` | 每个小贴纸只服务一个主体 / 动作 / 留白，不把贴纸当装饰填空。 | 不复制原贴纸形状、emoji、品牌元素。 | `sticker_open_arrow`, `sticker_bamboo_circle`, `sticker_sand_wave` | `fail` | `fail` | `fail_sticker_not_reference_like` | `P0` |
| `ref_05_peak_punctuation` | `待人工复核` | 在视觉或音乐峰值处用短词 / 小爆点做节奏强调。 | 不复制演唱会 / 账号 / 原字样 / 原贴图。 | `segment_sky_peak`, `segment_bamboo_peak`, `caption_blink`, `sticker_peak_burst`, `sticker_peak_circle` | `partial` | `partial` | `fail_music_visual_mismatch` | `P1` |
| `ref_06_scrapbook_breath` | `待人工复核` | 黑底 / 分屏不是 PPT 卡片，而是让真实镜头成组呼吸、降低信息密度。 | 不复制原版式、原文字、原背景素材。 | `scrapbook_layer_10_92_14_94`, `caption_slow` | `partial` | `partial` | `fail_surface_copy_without_function` | `P1` |
| `ref_07_sticker_as_tone_particle` | `待人工复核` | 贴纸像语气助词，只在动作边缘轻轻点一下。 | 不复制原 sticker、原手绘纹理、原账号风格。 | `sticker_cloud_spark`, `sticker_panda_tag`, `sticker_reprise_dottrail` | `fail` | `fail` | `fail_sticker_not_reference_like` | `P0` |
| `ref_08_editorial_word_on_motion` | `待人工复核` | 大字或短句必须贴住运动 / 情绪变化，不做解释性标题。 | 不复制原 serif 字体、原城市调色、原文案。 | `caption_tiny`, `caption_second` | `fail` | `partial` | `fail_caption_not_reference_like` | `P0` |
| `ref_09_motif_reprise` | `待人工复核` | 用具体视觉母题回环，让观众感到沙纹 / 竹叶 / 云雾在同一条视频里相互呼应。 | 不复制原玻璃、花、城市符号或原配乐。 | `segment_panda_bamboo_bite`, `segment_bamboo_reprise`, `segment_sand_echo`, `segment_panda_end_reprise` | `partial` | `partial` | `fail_random_patchwork` | `P1` |
| `ref_10_occlusion_or_cut_transition` | `待人工复核` | 用遮挡、动作接续或画面能量变化完成段落切换，而不是只有普通 fade。 | 不复制原转场素材、平台 UI 或品牌视觉。 | `transition_gap_analysis` | `fail` | `needs_review` | `fail_transition_not_reference_like` | `P0` |
| `ref_11_own_end_card` | `待人工复核` | 结尾做原创收束，让观众停在本片母题上，而不是复制平台尾卡。 | 不复制平台 UI、账号页、二维码、原 CTA、原字体。 | `end_card_27_18_30_00`, `caption_second`, `sticker_end_arrow` | `partial` | `partial` | `fail_surface_copy_without_function` | `P1` |
| `ref_12_music_visual_alignment` | `待人工复核` | 字幕、贴纸、clip change、peak flash 要对准音乐强弱、呼吸点或停顿。 | 不复制参考原音乐，不把自动 marker 写成精准卡点。 | `music_00_30`, `cut_chain_00_30`, `peak_flash_19_20_22_20` | `needs_review` | `needs_review` | `fail_music_visual_mismatch` | `P0` |

## 4. `visual_selection_table`

说明：本表覆盖 `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts` 中全部 18 个 visual segment。`select_judgment` 只允许 `keep / revise / replace / remove`。如果素材只是“能用”但功能关系不够明确，必须标为 `revise` 或 `replace`，不得写 `keep`。

| clip_id | source_path | time_range | usable_range | image_type | visual_moment | shot_role | image_fit_reason | style_fit | motif_tag | variety_role | overlay_fit | music_fit | risk_note | select_judgment | failure_rule |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sand_trace_opening` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `00:00.00-00:02.18` | `source 00:00.10-00:02.30` | `sand_texture / footprint` | 沙纹和脚印质感开场。 | `opening_hook` | 真实纹理先行，适合建立 `sand_trace` 母题和现场感。 | `partial` | `sand_trace` | 用低信息密度纹理做进入点，和后续 panda / cloud 形成主体差异。 | `caption_light_only` | `needs_review` | 开场功能成立，但字幕 / 贴纸若过重会破坏现场感。 | `revise` | `fail_no_reference_function` |
| `panda_head_turn` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `00:01.86-00:03.78` | `source 00:00.70-00:02.70` | `animal / bamboo` | 熊猫抬头或转向，竹叶环境明显。 | `object_or_texture` | 有具体主体和小动作，适合接 opening 的 object POV。 | `partial` | `bamboo_panda` | 从沙纹切到动物主体，增加亲近感和可锚定动作。 | `good_for_caption_or_arrow` | `needs_review` | 动物园语境可能偏离海边呼吸感，需减少说明性 overlay。 | `revise` | `fail_style_inconsistency` |
| `mist_people_wide` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `00:03.42-00:05.20` | `source 00:00.25-00:02.35` | `wide_mist_people` | 雾中远景和人物移动。 | `movement_bridge` | 从近物转向空间，承担第一次呼吸和场景过桥。 | `partial` | `mist_sea` | 用远景降低信息密度，避免连续动物 / 近景。 | `caption_minimal` | `partial` | 人物较远，不能强行放精确贴纸。 | `revise` | `fail_no_visual_selection_table` |
| `cloud_tide_open` | `素材/剪辑素材/剪辑/IMG_3226.MOV` | `00:04.90-00:06.76` | `source 00:00.20-00:02.20` | `cloud_tide / crowd` | 云层 / 海面 / 人群开阔。 | `movement_bridge` | 适合把雾的空间感扩大到云 / 海母题。 | `partial` | `cloud_tide` | 和上一段同为远景，需用光线或运动方向区分。 | `weak_for_sticker` | `needs_review` | 当前 `sticker_cloud_spark` 贴在空 sky 感强，锚点不足。 | `revise` | `fail_sticker_not_reference_like` |
| `bamboo_hide` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `00:06.42-00:08.10` | `source 00:01.20-00:03.20` | `bamboo_occlusion` | 竹叶遮挡 / 藏住主体。 | `sticker_moment` | 有遮挡和隐藏关系，可承接参考里的注意力提示。 | `partial` | `bamboo_panda` | 用遮挡动作打断远景连续性。 | `good_if_anchor_panda_face` | `partial` | 当前 caption / circle 未精确贴住主体，容易变成装饰。 | `revise` | `fail_sticker_not_reference_like` |
| `sand_footprint_detail` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `00:07.76-00:09.24` | `source 00:02.10-00:03.90` | `sand_detail` | 脚印 / 沙纹细节回到近景。 | `caption_moment` | 近景细节适合短词或轻微贴纸，不适合泛泛解释。 | `partial` | `sand_trace` | 从竹叶回到沙，完成第一次 motif 回环。 | `caption_or_small_trace_sticker` | `needs_review` | 低位纹理容易让贴纸落到空处，需绑定 footprint_trace。 | `revise` | `fail_no_reference_function` |
| `panda_bamboo_bite` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `00:08.98-00:10.60` | `source 00:04.20-00:06.10` | `animal_action` | 熊猫咬竹 / 近动作。 | `motif_reprise` | 有清楚小动作，可做语气标点，不适合写 `tiny thing` 这种不贴主体的文本。 | `partial` | `bamboo_panda` | 第二次 panda 回环，给中段增加亲近主体。 | `good_for_action_bound_caption` | `partial` | 当前 `caption_tiny` 与熊猫主体语义不匹配。 | `revise` | `fail_caption_not_reference_like` |
| `mist_walkaway` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `00:10.24-00:11.86` | `source 00:02.10-00:04.10` | `wide_mist_motion` | 雾中人物或空间继续远离。 | `movement_bridge` | 适合从动物动作转向 scrapbook / 呼吸段。 | `partial` | `mist_sea` | 动静切换，给 scrapbook 前留气口。 | `no_heavy_overlay` | `partial` | 画面主体弱，贴纸必须克制。 | `revise` | `fail_random_patchwork` |
| `silver_cloud_crowd` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `00:11.54-00:13.32` | `source 00:00.50-00:02.60` | `silver_cloud / crowd` | 银色天空和人群开阔面。 | `scrapbook_or_split` | 可作为 scrapbook 中的低干扰面，但需要服务真实镜头分组。 | `partial` | `cloud_tide` | 和 mist / bamboo 组成三格呼吸，不应变成 PPT 卡。 | `caption_light` | `needs_review` | hardcoded `慢一点` 与 caption_slow 重叠，需删重。 | `revise` | `fail_surface_copy_without_function` |
| `bamboo_reprise` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `00:14.72-00:16.27` | `source 00:05.40-00:07.20` | `bamboo_reprise` | 竹叶 / panda motif 回来。 | `motif_reprise` | 用同一母题提示“回来一下”，适合轻文本但需明确锚点。 | `partial` | `bamboo_panda` | 中后段回环，和 sand / cloud 形成三母题循环。 | `caption_or_dottrail_if_endpoint_exists` | `partial` | 当前 dottrail 无 endpoint，像随机贴图。 | `revise` | `fail_sticker_not_reference_like` |
| `cloud_window` | `素材/剪辑素材/剪辑/IMG_3226.MOV` | `00:15.96-00:17.48` | `source 00:02.40-00:04.30` | `cloud_window` | 云洞 / 窗口感。 | `caption_moment` | 可承接“藏在路上”的语义，但必须把藏的对象说清。 | `partial` | `cloud_tide` | 从竹叶遮挡转到云洞遮挡，完成视觉语义接续。 | `caption_possible` | `needs_review` | caption_hidden 语义仍模糊，需绑定 cloud gap 或删。 | `revise` | `fail_caption_not_reference_like` |
| `panda_pause` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `00:17.22-00:18.64` | `source 00:07.20-00:08.90` | `animal_pause` | 熊猫停顿 / 小动作收住。 | `sticker_moment` | 小停顿适合贴纸语气助词，但不能远离主体。 | `partial` | `bamboo_panda` | 作为峰值前的主体停顿。 | `small_sticker_if_near_face_or_paw` | `partial` | 需要明确 face / paw / bamboo 的 anchor target。 | `revise` | `fail_sticker_not_reference_like` |
| `sand_echo` | `素材/剪辑素材/剪辑/sd1674359014_2.MP4` | `00:18.38-00:19.80` | `source 00:04.00-00:05.70` | `sand_echo` | 沙纹 / 脚印 echo。 | `motif_reprise` | 峰值前回到 opening motif，结构上成立。 | `partial` | `sand_trace` | 和开场呼应，提供视觉回环。 | `caption_must_bind_footprint_or_wave` | `needs_review` | `caption_just` 缺动作对象，容易空泛。 | `revise` | `fail_caption_not_reference_like` |
| `sky_peak` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `00:19.56-00:21.52` | `source 00:02.80-00:04.80` | `sky_peak` | 天空 / 云面能量上升。 | `emotional_peak` | 适合做峰值，但要用音乐或画面亮点支撑，不要泛泛喊口号。 | `partial` | `cloud_tide` | 从地面 motif 抬到天空峰值。 | `caption_burst_only_if_peak_visible` | `needs_review` | 当前 `caption_blink` 和 burst 可能只是 generic hype。 | `revise` | `fail_music_visual_mismatch` |
| `bamboo_peak` | `素材/剪辑素材/剪辑/IMG_0970.MOV` | `00:21.18-00:22.80` | `source 00:08.40-00:10.30` | `bamboo_peak` | 竹叶 / panda 相关峰值。 | `emotional_peak` | 可把峰值从天空拉回具体主体，但必须减少泛贴纸。 | `partial` | `bamboo_panda` | 峰值第二拍，避免全是天空远景。 | `circle_only_if_subject_centered` | `partial` | 当前 peak circle 在边缘，未圈住主体。 | `revise` | `fail_sticker_not_reference_like` |
| `mist_slowdown` | `素材/剪辑素材/剪辑/sd1674358932_2.MP4` | `00:22.56-00:24.66` | `source 00:04.00-00:06.00` | `mist_slowdown` | 雾 / 远景降速。 | `slowdown_breath` | 峰值后需要呼吸段，本素材功能成立。 | `partial` | `mist_sea` | 从峰值回到空旷远景，承担情绪落下。 | `no_or_minimal_caption` | `partial` | 需确认音乐是否真的转弱，否则会触发音乐错配。 | `revise` | `fail_music_visual_mismatch` |
| `silver_sky_close` | `素材/剪辑素材/剪辑/IMG_3225.MOV` | `00:24.32-00:26.68` | `source 00:05.50-00:07.70` | `silver_sky_close` | 银色天空 / 云面收束。 | `slowdown_breath` | 有留白，适合呼吸词，但贴纸必须绑定 cloud / sea edge。 | `partial` | `cloud_tide` | 继续降速，给尾卡留视觉空间。 | `caption_breathe_possible` | `needs_review` | 画面太空时，波浪贴纸会像空贴。 | `revise` | `fail_sticker_not_reference_like` |
| `panda_end_reprise` | `素材/剪辑素材/剪辑/IMG_0971.MOV` | `00:26.32-00:28.52` | `source 00:12.20-00:14.00` | `animal_end_reprise` | 熊猫 / 竹叶作为结尾回环背景。 | `end_card_background` | 具体主体回到结尾，有原创收束潜力。 | `partial` | `bamboo_panda` | 用熟悉主体结束，呼应中段 panda motif。 | `end_card_background_only` | `partial` | caption_second、sticker_end_arrow、EndCard 同时竞争，需要减法。 | `revise` | `fail_style_inconsistency` |

## 5. `video_event_table`

说明：本表把画面、字幕、贴纸、scrapbook、end card、transition / cut / clip change、BGM 关键段落放入同一套可回审事件链。当前判断不等于修复完成，只指出下一轮要修哪里。

### 5.1 Visual segment events（18 rows）

| event_id | event_type | time_range | visual_moment | music_moment | semantic_role | anchor_target | placement_rule | minimum_visible_size | reference_function | failure_rule | current_judgment | fix_action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `segment_sand_trace_opening` | `visual` | `00:00.00-00:02.18` | 沙纹 / 脚印 texture opening。 | `auto_marker_only_needs_review` | `opening_hook` | `sand_trace / footprint` | 字幕只能轻压留白，不遮纹理。 | `caption >= 36px; sticker only if footprint target clear` | 真实物件 / 纹理先进入现场。 | `fail_no_reference_function` | `partial` | 保留开场素材，但先补 frame review 与音乐落点。 |
| `segment_panda_head_turn` | `visual` | `00:01.86-00:03.78` | 熊猫头部 / 竹叶动作。 | `auto_marker_only_needs_review` | `object_pov_reveal` | `panda_head / bamboo_edge` | caption / arrow 必须靠近动作方向。 | `caption >= 36px; sticker >= 120x80px` | 小主体动作承接开场。 | `fail_style_inconsistency` | `partial` | 重新绑定 `caption_wind_first` 与 `sticker_open_arrow`。 |
| `segment_mist_people_wide` | `visual` | `00:03.42-00:05.20` | 雾中远景 / 人物移动。 | `auto_marker_only_needs_review` | `space_bridge` | `moving_people / mist_gap` | 不放精确贴纸，只允许呼吸型短词。 | `caption >= 34px` | 空间推进和降信息密度。 | `fail_random_patchwork` | `partial` | 检查与前后云面是否形成推进，而不是重复远景。 |
| `segment_cloud_tide_open` | `visual` | `00:04.90-00:06.76` | 云 / 海 / 人群开阔。 | `auto_marker_only_needs_review` | `space_expand` | `cloud_gap / horizon` | sticker 必须绑定云缝或删除。 | `sticker >= 120x90px if used` | 从雾扩展到云海空间。 | `fail_sticker_not_reference_like` | `partial` | 重新评估 `sticker_cloud_spark`。 |
| `segment_bamboo_hide` | `visual` | `00:06.42-00:08.10` | 竹叶遮挡 / 藏。 | `auto_marker_only_needs_review` | `attention_cue` | `panda_face / leaf_hide_edge` | caption 在遮挡边缘，circle 只圈主体。 | `caption >= 36px; circle diameter >= 120px` | 参考里的隐藏 / 注意力提示。 | `fail_sticker_not_reference_like` | `fail` | 先改 `caption_look` 和 `sticker_bamboo_circle` 的锚点。 |
| `segment_sand_footprint_detail` | `visual` | `00:07.76-00:09.24` | 脚印 / 沙纹细节。 | `auto_marker_only_needs_review` | `motif_detail` | `footprint_trace` | 贴纸跟随脚印方向，不贴空地。 | `sticker >= 120x80px` | motif 细节回环。 | `fail_no_reference_function` | `partial` | 重写 `sticker_sand_wave` 的绑定对象。 |
| `segment_panda_bamboo_bite` | `visual` | `00:08.98-00:10.60` | 熊猫咬竹动作。 | `auto_marker_only_needs_review` | `small_action_punctuation` | `panda_mouth / bamboo_bite` | caption 只做动作语气，不做不贴主体的说明。 | `caption >= 36px; tag >= 130x76px` | 动作旁的语气标点。 | `fail_caption_not_reference_like` | `fail` | 删除或重写 `caption_tiny` / `sticker_panda_tag`。 |
| `segment_mist_walkaway` | `visual` | `00:10.24-00:11.86` | 雾中移动 / 离开。 | `auto_marker_only_needs_review` | `breath_bridge` | `mist_path / moving_people` | 不堆贴纸，做 scrapbook 入口。 | `caption >= 34px if used` | 峰前换气和空间切换。 | `fail_random_patchwork` | `partial` | 与 scrapbook 层建立明确段落关系。 |
| `segment_silver_cloud_crowd` | `visual` | `00:11.54-00:13.32` | 银色云面 / 人群。 | `auto_marker_only_needs_review` | `scrapbook_panel` | `cloud_panel / crowd_line` | 分屏面板服务呼吸，不加解释卡片。 | `panel visible >= 25% frame height` | 黑底 scrapbook 呼吸。 | `fail_surface_copy_without_function` | `partial` | 处理 hardcoded `慢一点` 与 caption_slow 重叠。 |
| `segment_bamboo_reprise` | `visual` | `00:14.72-00:16.27` | 竹叶 / panda motif 回来。 | `auto_marker_only_needs_review` | `motif_reprise` | `bamboo_edge / panda_presence` | dot trail 必须有起点终点。 | `dot trail endpoint visible; sticker >= 100x70px` | motif 回环。 | `fail_sticker_not_reference_like` | `fail` | 重写或删除 `sticker_reprise_dottrail`。 |
| `segment_cloud_window` | `visual` | `00:15.96-00:17.48` | 云洞 / window。 | `auto_marker_only_needs_review` | `hidden_space_reveal` | `cloud_gap / window_edge` | caption 与 cloud gap 绑定，不泛写。 | `caption >= 36px` | 藏 / 看见的语义转场。 | `fail_caption_not_reference_like` | `partial` | 重写 `caption_hidden` 的 anchor target。 |
| `segment_panda_pause` | `visual` | `00:17.22-00:18.64` | 熊猫停顿。 | `auto_marker_only_needs_review` | `pre_peak_pause` | `panda_face / paw / bamboo` | sticker 靠近停顿主体。 | `sticker >= 120x80px` | 峰前语气停顿。 | `fail_sticker_not_reference_like` | `needs_review` | 补 sticker anchor 或不放贴纸。 |
| `segment_sand_echo` | `visual` | `00:18.38-00:19.80` | 沙纹 echo。 | `auto_marker_only_needs_review` | `opening_motif_echo` | `footprint / wave_trace` | caption 必须跟 footprint 或 wave 落点。 | `caption >= 36px` | 开场 motif 回响。 | `fail_caption_not_reference_like` | `fail` | 重写或删除 `caption_just`。 |
| `segment_sky_peak` | `visual` | `00:19.56-00:21.52` | 天空 / 云面峰值。 | `auto_marker_only_needs_review` | `emotional_peak` | `bright_cloud / horizon` | burst 只能在真实亮点或音乐强拍出现。 | `caption >= 42px; burst >= 140x100px` | 峰值视觉强调。 | `fail_music_visual_mismatch` | `needs_review` | 先人工复听或确认 marker，再定 `caption_blink`。 |
| `segment_bamboo_peak` | `visual` | `00:21.18-00:22.80` | 竹叶 / panda 峰值。 | `auto_marker_only_needs_review` | `second_peak_subject` | `panda_or_bamboo_subject` | circle 必须圈主体，不能落边缘。 | `circle diameter >= 130px` | 峰值回到具体主体。 | `fail_sticker_not_reference_like` | `fail` | 重写 `sticker_peak_circle`。 |
| `segment_mist_slowdown` | `visual` | `00:22.56-00:24.66` | 雾中降速。 | `auto_marker_only_needs_review` | `slowdown_breath` | `mist_path / distant_people` | overlay 尽量不出现或只用呼吸词。 | `caption >= 34px if used` | 峰后呼吸。 | `fail_music_visual_mismatch` | `partial` | 校验音乐是否进入弱段。 |
| `segment_silver_sky_close` | `visual` | `00:24.32-00:26.68` | 银色天空收束。 | `auto_marker_only_needs_review` | `closing_breath` | `cloud_edge / sky_gap` | `呼` 类字幕放留白，sticker 不贴空天。 | `caption >= 36px; sticker >= 120x80px` | 结尾前呼吸。 | `fail_sticker_not_reference_like` | `partial` | 重写 `sticker_slow_wave` 的 anchor。 |
| `segment_panda_end_reprise` | `visual` | `00:26.32-00:28.52` | 熊猫 / 竹叶作为结尾背景。 | `auto_marker_only_needs_review` | `end_reprise_background` | `panda_background / bamboo_frame` | EndCard 优先，caption / sticker 需减法。 | `end text readable >= 42px; sticker only if not competing` | 自有尾卡背景与 motif reprise。 | `fail_style_inconsistency` | `partial` | 统一 `caption_second`、`sticker_end_arrow`、EndCard。 |

### 5.2 Caption events（10 rows）

| event_id | event_type | time_range | visual_moment | music_moment | semantic_role | anchor_target | placement_rule | minimum_visible_size | reference_function | failure_rule | current_judgment | fix_action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `caption_wind_first` | `caption` | `00:02.22` | panda / bamboo opening。 | `auto_marker_only_needs_review` | `opening_breath_word` | `panda_head / bamboo_motion / wind_hint` | 贴近动作方向，避开脸部。 | `font >= 36px; contrast >= AA visual check` | 开场短词作为现场语气。 | `fail_caption_not_reference_like` | `fail` | 绑定真实风 / 叶 / 头部动作；无动作则改词。 |
| `caption_ka` | `caption` | `00:04.88` | mist_people_wide 到 cloud_tide_open 的切换。 | `auto_marker_only_needs_review` | `onomatopoeia_cut_punctuation` | `real_cut_flash / occlusion / strong beat` | 只在可见切换点出现。 | `font >= 38px` | 拟声词强调剪切瞬间。 | `fail_caption_not_reference_like` | `fail` | 若没有可见切换动作，改为呼吸词或删除。 |
| `caption_look` | `caption` | `00:07.18` | bamboo_hide。 | `auto_marker_only_needs_review` | `attention_cue` | `bamboo_hide_edge / panda_face` | 放在遮挡边缘，引导视线。 | `font >= 36px` | 注意力提示，不解释画面。 | `fail_caption_not_reference_like` | `fail` | 明确引导对象；和 circle 共享 anchor。 |
| `caption_tiny` | `caption` | `00:09.36` | panda_bamboo_bite。 | `auto_marker_only_needs_review` | `action_tone_word` | `panda_mouth / bamboo_bite` | 靠近动作，不写和主体不符的词。 | `font >= 36px` | 小动作旁的语气标点。 | `fail_caption_not_reference_like` | `fail` | 删除 `tiny thing` 或改成咬竹动作词。 |
| `caption_slow` | `caption` | `00:12.52` | scrapbook_or_split。 | `auto_marker_only_needs_review` | `slowdown_instruction_as_breath` | `scrapbook_center_breath` | 与 hardcoded `慢一点` 二选一。 | `font >= 38px` | scrapbook 呼吸停顿。 | `fail_surface_copy_without_function` | `partial` | 保留一个慢速提示；删除重复文字层。 |
| `caption_hidden` | `caption` | `00:15.52` | bamboo_reprise / cloud_window。 | `auto_marker_only_needs_review` | `hidden_reveal_word` | `bamboo_occlusion_or_cloud_gap` | 只能指向一个藏 / 露对象。 | `font >= 36px` | 遮挡和显露的语义转场。 | `fail_caption_not_reference_like` | `partial` | 拆分或改为绑定 cloud window。 |
| `caption_just` | `caption` | `00:18.82` | sand_echo。 | `auto_marker_only_needs_review` | `landing_word` | `footprint / wave_landing` | 对准脚印或波纹落点。 | `font >= 36px` | 微小落点的语气词。 | `fail_caption_not_reference_like` | `fail` | 没有动作落点就删除。 |
| `caption_blink` | `caption` | `00:20.18` | sky_peak。 | `auto_marker_only_needs_review` | `peak_punctuation` | `bright_cloud / visible_peak` | 只在峰值出现，避免 generic hype。 | `font >= 42px` | 峰值提醒。 | `fail_music_visual_mismatch` | `needs_review` | 先确认视觉 / 音乐峰值，再保留。 |
| `caption_breathe` | `caption` | `00:24.40` | silver_sky_close。 | `auto_marker_only_needs_review` | `breath_release` | `sky_gap / cloud_edge` | 放留白，不贴边过高。 | `font >= 36px` | 峰后呼吸词。 | `fail_caption_not_reference_like` | `partial` | 调整到云 / 海边缘，增强对比。 |
| `caption_second` | `caption` | `00:26.72` | panda_end_reprise + EndCard。 | `auto_marker_only_needs_review` | `ending_hold` | `panda_end_background / end_card_text` | 不与 EndCard 主文案竞争。 | `font >= 38px if retained` | 结尾多停一秒。 | `fail_style_inconsistency` | `fail` | 与 EndCard 合并成一种结尾语言。 |

### 5.3 Sticker events（11 rows）

| event_id | event_type | time_range | visual_moment | music_moment | semantic_role | anchor_target | placement_rule | minimum_visible_size | reference_function | failure_rule | current_judgment | fix_action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sticker_open_arrow` | `sticker` | `00:02.38` | panda_head_turn。 | `auto_marker_only_needs_review` | `attention_arrow` | `panda_head / paw / bamboo_bite` | arrow 指向动作，不贴空处。 | `>= 120x80px; preferred 160x100px` | 引导观众看小动作。 | `fail_sticker_not_reference_like` | `fail` | 绑定 panda 动作；无动作就删。 |
| `sticker_cloud_spark` | `sticker` | `00:04.98` | cloud_tide_open。 | `auto_marker_only_needs_review` | `spark_punctuation` | `cloud_gap / light_edge` | 只放在云缝或亮点，不贴空 sky。 | `>= 120x90px` | 强调空间亮点。 | `fail_sticker_not_reference_like` | `fail` | 找不到亮点则删除。 |
| `sticker_bamboo_circle` | `sticker` | `00:06.80` | bamboo_hide。 | `auto_marker_only_needs_review` | `attention_circle` | `panda_face / leaf_hide_edge` | 圈住主体或遮挡边缘。 | `circle diameter >= 130px` | 注意力提示。 | `fail_sticker_not_reference_like` | `fail` | 重定位到 panda_face。 |
| `sticker_sand_wave` | `sticker` | `00:08.12` | sand_footprint_detail。 | `auto_marker_only_needs_review` | `trace_wave` | `footprint_trace / sand_curve` | 沿着脚印方向，不贴低位空纹理。 | `>= 120x80px` | 小动作 / 纹理标点。 | `fail_sticker_not_reference_like` | `fail` | 改为 footprint_trace 绑定或删。 |
| `sticker_panda_tag` | `sticker` | `00:09.70` | panda_bamboo_bite。 | `auto_marker_only_needs_review` | `small_focus_tag` | `panda_mouth / bamboo_bite` | tag 靠近 bite，不挡脸。 | `>= 130x76px` | 给动作加轻提示。 | `fail_surface_copy_without_function` | `fail` | 删除解释性 tag 或改成动作旁标点。 |
| `sticker_scrap_under` | `sticker` | `00:12.78` | scrapbook_or_split。 | `auto_marker_only_needs_review` | `underline_breath` | `specific_panel_edge_or_caption_baseline` | 必须下划真实对象或文字。 | `underline width >= 180px; stroke visible` | scrapbook 面板内的节奏线。 | `fail_sticker_not_reference_like` | `fail` | 没有被 underline 的对象则删除。 |
| `sticker_reprise_dottrail` | `sticker` | `00:15.86` | bamboo_reprise / cloud_window。 | `auto_marker_only_needs_review` | `motif_trail` | `start_subject_and_endpoint` | dot trail 必须有起点终点。 | `endpoint visible; dots >= 10px each` | motif 连接。 | `fail_sticker_not_reference_like` | `fail` | 补 endpoint 或删除。 |
| `sticker_peak_burst` | `sticker` | `00:20.42` | sky_peak。 | `auto_marker_only_needs_review` | `peak_burst` | `visible_peak / bright_cloud` | burst 对准峰值，不挡主画面。 | `>= 140x100px` | 峰值标点。 | `fail_music_visual_mismatch` | `needs_review` | 先确认峰值时刻，否则删除。 |
| `sticker_peak_circle` | `sticker` | `00:21.46` | bamboo_peak。 | `auto_marker_only_needs_review` | `peak_subject_circle` | `panda_or_bamboo_subject` | circle 必须圈主体，不能在边缘漂。 | `diameter >= 130px` | 第二峰值主体强调。 | `fail_sticker_not_reference_like` | `fail` | 重新找主体锚点。 |
| `sticker_slow_wave` | `sticker` | `00:24.86` | silver_sky_close。 | `auto_marker_only_needs_review` | `slow_breath_wave` | `cloud_edge / sea_edge` | wave 必须沿可见边缘。 | `>= 120x80px` | 呼吸段轻标点。 | `fail_sticker_not_reference_like` | `fail` | 绑定边缘或删除。 |
| `sticker_end_arrow` | `sticker` | `00:27.10` | panda_end_reprise + EndCard。 | `auto_marker_only_needs_review` | `end_attention_arrow` | `end_card_primary_line_or_panda_background` | 不抢 EndCard 主文字。 | `>= 120x80px only if retained` | 引导结尾停顿。 | `fail_style_inconsistency` | `fail` | EndCard 优先；箭头大概率删除。 |

### 5.4 Structure, transition, cut, BGM events

| event_id | event_type | time_range | visual_moment | music_moment | semantic_role | anchor_target | placement_rule | minimum_visible_size | reference_function | failure_rule | current_judgment | fix_action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `music_00_30` | `music` | `00:00.00-00:30.05` | 全片音乐驱动。 | `beat=16 / onset=20 / rms_peak=12; auto_marker_only` | `bgm_rhythm_layer` | `clip_change / caption_in / sticker_in / peak_flash` | 只能作为粗 marker，未人工复听不能写精准卡点。 | `n/a` | 音乐强弱决定字幕、贴纸、cut 和呼吸段的落点。 | `fail_music_visual_mismatch` | `needs_review` | 下一轮先做人工复听或至少 marker 对照表。 |
| `cut_chain_00_30` | `transition` | `00:00.00-00:28.52` | 18 个 visual segment 的普通 clip change / overlap。 | `auto_marker_only_needs_review` | `transition_role=ordinary_cut_or_fade_chain` | `previous_clip_to_next_clip` | cut / fade 必须说明段落功能；当前未逐条定义。 | `n/a` | 段落切换、母题回环和呼吸推进。 | `fail_transition_not_reference_like` | `fail` | 建立逐条 `transition_role`；不能直接进 Remotion。 |
| `scrapbook_layer_10_92_14_94` | `scrapbook` | `00:10.92-00:14.94` | 三格 / 黑底 scrapbook 呼吸。 | `auto_marker_only_needs_review` | `scrapbook_breath` | `panel_edges / center_breath_text` | 黑底只服务真实镜头分组，不做 PPT 卡。 | `panel >= 25% frame height; text >= 38px` | 参考里的黑底呼吸和分屏组织。 | `fail_surface_copy_without_function` | `partial` | 删除重复 `慢一点`，明确三格各自作用。 |
| `peak_flash_19_20_22_20` | `transition` | `00:19.20-00:22.20` | 峰值段 flash / emphasis。 | `auto_marker_only_needs_review` | `transition_role=peak_punctuation_effect` | `sky_peak / bamboo_peak` | 只在视觉或音乐峰值闪，不做装饰。 | `n/a` | 峰值提示和段落抬升。 | `fail_music_visual_mismatch` | `needs_review` | 先确认 BGM 峰值和视觉峰值。 |
| `end_card_27_18_30_00` | `end_card` | `00:27.18-00:30.00` | 熊猫背景上出现原创尾卡。 | `auto_marker_only_needs_review` | `own_ending_hold` | `panda_end_background / safe_text_area` | EndCard 主文案优先；caption / sticker 不抢。 | `main text >= 46px; secondary text >= 32px` | 原创收束和 motif reprise；not_to_copy=平台 UI、账号页、二维码、原 CTA、原字体、原文案。 | `fail_surface_copy_without_function` | `partial` | 统一结尾文案，删除竞争性 caption / sticker。 |

### 5.5 `transition_gap_analysis`

| gap_id | status | evidence | impact | next_action |
|---|---|---|---|---|
| `transition_gap_analysis` | `triggered` | `ThirtySecondReferenceSample.tsx` 里存在 SceneLayer opacity / ordinary clip overlap / PeakFlash，但没有逐条 `transition_role`、`music_moment`、`reference_function` 表。 | 触发 `fail_transition_not_reference_like`；不能直接进入 Remotion 改动。 | 下一轮先为每个 clip change 建 `from_visual -> to_visual -> transition_role -> music_moment -> reference_function`，再决定是否改 transition。 |

## 6. `hard_fail_summary`

说明：本表检查的是当前 30 秒样片在三表视角下的状态。`not_triggered_after_this_pack` 只表示本轮已经创建对应表，不表示表内事件全部通过。

| fail_code | status | evidence | next_route |
|---|---|---|---|
| `fail_no_reference_function` | `triggered` | 21 审计显示多条 caption / sticker 只有文字或形状，没有稳定 `reference_function`；本文件已补表，但当前视频未修。 | `reference_layer -> event_layer` |
| `fail_surface_copy_without_function` | `triggered` | scrapbook 黑底 / underline / EndCard 等结构存在，但功能与对象关系仍不完整。 | `reference_layer -> event_layer` |
| `fail_event_quantity_as_quality` | `triggered` | 当前有 18 visual、10 caption、11 sticker，但 21 审计明确数量不等于审美达标。 | `event_layer` |
| `fail_no_visual_selection_table` | `not_triggered_after_this_pack` | 本文件第 4 节已生成覆盖 18 个 visual segment 的 `visual_selection_table`。 | `visual_selection_layer` |
| `fail_no_video_event_table` | `not_triggered_after_this_pack` | 本文件第 5 节已生成覆盖 visual、caption、sticker、scrapbook、transition、BGM、end card 的 `video_event_table`。 | `event_layer` |
| `fail_no_frame_review` | `triggered` | 本轮只读已有 contact sheet / 技术元数据，没有做下一轮逐事件 start / mid / end frame review。 | `frame_review_layer` |
| `fail_random_patchwork` | `needs_review` | 18 个 visual 有 motif 设计，但多处 `image_fit_reason` 仍是 `partial`，且 transition_role 不完整。 | `visual_selection_layer -> transition_layer` |
| `fail_caption_not_reference_like` | `triggered` | 10 条 caption 中多条被 21 审计判为语义或时机不匹配，例如 `caption_tiny`、`caption_just`、`caption_second`。 | `event_layer` |
| `fail_sticker_not_reference_like` | `triggered` | 11 个 sticker 多数缺稳定 `anchor_target` 或 `minimum_visible_size`，例如 `sticker_reprise_dottrail`、`sticker_peak_circle`、`sticker_end_arrow`。 | `event_layer` |
| `fail_transition_not_reference_like` | `triggered` | 当前只有普通 cut / fade / PeakFlash，没有逐条 transition function 表。 | `transition_layer` |
| `fail_music_visual_mismatch` | `needs_review` | BGM marker 是自动粗 marker；未人工复听，不能证明 caption / sticker / cut / flash 对齐。 | `bgm_layer` |
| `fail_style_inconsistency` | `triggered` | panda / sand / cloud / scrapbook / EndCard 之间已有 motif 但 caption / sticker 语气和位置不统一。 | `goal_layer -> event_layer` |

## 7. `next_fix_route`

说明：如果缺口来自表关系、事件关系或参考功能，不得直接进入 Remotion。只有当三表状态至少达到 `partial` 且问题属于执行参数层，才允许进入 `remotion_layer`。

| priority | issue | source_table | fix_layer | action | blocked_until |
|---:|---|---|---|---|---|
| `P0` | caption / sticker 缺 `reference_function` 或和参考功能不匹配。 | `reference_learning_checklist`, `video_event_table` | `reference_layer`, `event_layer` | 先重写 10 条 caption 和 11 条 sticker 的 `semantic_role / anchor_target / reference_function`，删除无功能事件。 | 所有 caption / sticker 行不再触发 `fail_caption_not_reference_like` / `fail_sticker_not_reference_like`。 |
| `P0` | transition 只有普通 cut / fade / flash，没有 `transition_role`。 | `video_event_table`, `transition_gap_analysis` | `event_layer` | 为 18 个 visual 之间的 clip change 补 `from_visual / to_visual / transition_role / music_moment / reference_function`。 | `transition_gap_analysis` 从 `triggered` 降为 `partial`。 |
| `P0` | BGM 只是自动粗 marker，无法证明音乐画面对齐。 | `video_event_table`, `hard_fail_summary` | `bgm_layer` | 做人工复听或 marker 对照，标出强拍、弱拍、呼吸点、峰值点。 | `music_00_30` 从 `needs_review` 降为 `partial` 或 `pass`。 |
| `P1` | 18 个 visual 多数只能 `revise`，还没有 frame-level 画面证据。 | `visual_selection_table` | `visual_selection_layer`, `material_layer` | 对每段抽 start / mid / end frame，确认主体、留白、overlay 空间和 motif 可见。 | 每段至少有一个 frame-level review point。 |
| `P1` | scrapbook / EndCard 有表面结构，但和真实镜头功能关系不稳。 | `video_event_table` | `event_layer`, `goal_layer` | 明确 scrapbook 三格的真实镜头组织功能；EndCard 只保留一种结尾语言。 | `scrapbook_layer_10_92_14_94` 与 `end_card_27_18_30_00` 不再触发 `fail_surface_copy_without_function`。 |
| `P1` | 部分素材风格风险来自 panda / zoo 语境与 sea breath 语境的并置。 | `visual_selection_table` | `material_layer`, `goal_layer` | 判断 `bamboo_panda` 是否作为可接受的 cute object motif；若不成立，替换或减少 panda 段。 | 用户或下一轮目标确认 panda motif 可保留。 |
| `P2` | x/y、fontSize、SVG 尺寸、opacity、EndCard 具体执行参数。 | `video_event_table` | `remotion_layer` | 只有三表硬失败降级后，才进入 Remotion 调参和渲染。 | `reference_layer / visual_selection_layer / event_layer / bgm_layer` 至少达到 `partial`。 |

## 8. 结论

- 已确认：本轮三张表已完成，当前内容状态为 `tables_completed_fix_pending`。
- 已确认：这不是视频修复，不是 render，不是 Remotion 执行。
- 已确认：当前视频仍不能写成 `content_pass`、`30s_sample_passed` 或 `vlog_director_capability_verified`。
- 已确认：下一轮应按 `next_fix_route` 先处理 `reference_layer`、`event_layer`、`transition_layer`、`bgm_layer`，不能直接跳到 Remotion 改参数。
- 待验证：多案例验证前，能力状态仍为 `vlog_director_capability_still_pending_multi_case_validation`。

