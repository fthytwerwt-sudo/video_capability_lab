# 三表 P0 阻断项修正包

## 1. 状态

- task_type: `three_tables_p0_blocker_resolution`
- source_pack: `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
- target_sample: `三十秒对标样片-30s-reference-sample`
- correct_composition_path: `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`
- source_data: `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- output_type: `p0_blocker_markdown_resolution_pack`
- content_status: `p0_blocker_tables_updated_fix_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- generated_at: `2026-06-01`

已确认：本轮不是修视频，不是 render，不是修改 Remotion 源码，不是调整字幕、贴纸、转场的表现层参数。

已确认：本轮只把 `25` 中暴露的 P0 阻断项升级为可执行关系表，供下一轮判断是否进入有限 Remotion 修复。

待验证：当前视频内容仍未通过。当前 30 秒样片仍是验证材料，不是项目目标。

## 2. 错误路径修正记录

| item | status | evidence | fix |
|---|---|---|---|
| wrong_path_found | `triggered` | `25` 和 `02_当前任务_current_task.md` 中存在旧 `remotion/src` 组合源码路径（文件名为 `ThirtySecondReferenceSample.tsx`）。 | 改为 `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`。 |
| correct_path_exists | `已确认` | 仓库内存在 `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`。 | 后续表层任务统一读此路径。 |
| files_to_update | `已确认` | `25`、`02` 需要路径修正；`03`、latest 需要新增本轮 route/status。 | 本轮同步更新。 |

## 3. Caption 关系修正表

说明：本表只重写字幕事件关系，不改 Remotion。`fix_action` 是下一轮执行建议，不是本轮已执行结果。

| caption_id | current_text | current_problem | semantic_role | anchor_target | reference_function | shot_binding_reason | music_binding | recommended_text | fix_action | failure_rule | next_status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `caption_wind_first` | `风先到` | 文字有气氛，但没有明确绑定风、竹叶或熊猫动作。 | `opening_breath_word` | `panda_head_turn / bamboo_leaf_motion` | 开场短词贴真实物件或动作，像参考里的现场语气。 | 沙纹后进入熊猫，适合用轻词提示“环境先动”。 | `beat 2.252 auto; needs_review` | `风动了` 或 `抬头` | `replace` | `fail_caption_not_reference_like` | `partial` |
| `caption_ka` | `咔` | 缺少快门、碰撞、遮挡或真实切镜闪点，拟声依据弱。 | `cut_punctuation` | `mist_people_wide -> cloud_tide_open cut_point` | 用拟声词强调可见切换或强拍。 | 这句只有在 mist 到 cloud 的切换被设计成明显落点时才成立。 | `beat/onset 4.807 auto; needs_review` | 删除；若下一轮做明确切闪，再用 `咔` | `remove` | `fail_caption_not_reference_like` | `partial` |
| `caption_look` | `看这` | 提示词泛化，不知道看竹叶、熊猫还是遮挡。 | `attention_cue` | `bamboo_hide_edge / panda_face` | 参考里的注意力提示，指向一个小主体。 | 竹叶遮挡是可用的“藏一下”动作，必须把注意力落到主体。 | `onset 6.989 auto; needs_review` | `看这里` 或 `藏这儿` | `revise` | `fail_caption_not_reference_like` | `partial` |
| `caption_tiny` | `tiny thing` | 熊猫主体并不是 tiny thing，文字和画面尺度冲突。 | `small_action_tone` | `panda_mouth / bamboo_bite` | 短英文或短词必须贴运动和情绪，不做空标题。 | 熊猫咬竹是明确小动作，字幕应服务动作，不服务抽象可爱。 | `beat 9.149 / rms_peak 9.172 auto; needs_review` | `咬一口` 或 `bite` | `replace` | `fail_caption_not_reference_like` | `partial` |
| `caption_slow` | `慢一点` | 方向成立，但和 scrapbook 内硬编码 `慢一点` 重复。 | `slowdown_breath` | `scrapbook_center_breath / panel_group` | 黑底 scrapbook 的呼吸停顿。 | 10.92-14.94 是降速分组，保留一个慢速语言即可。 | `rms_peak 12.562 auto; needs_review` | 保留一个 `慢一点`，删除重复层 | `revise` | `fail_surface_copy_without_function` | `partial` |
| `caption_hidden` | `藏在路上` | 语义接近 motif，但跨竹叶和云洞，藏的对象不清。 | `hidden_reveal_word` | `cloud_window_gap` 或 `bamboo_occlusion_edge` | 遮挡 / 显露的语义转场。 | 竹叶遮挡到云洞可做“藏/露”关系，但必须二选一。 | `rms_peak 15.836/16.324 auto; needs_review` | `藏一下` | `replace` | `fail_caption_not_reference_like` | `partial` |
| `caption_just` | `刚好` | 没有对应的脚印落点、波纹完成点或构图巧合。 | `landing_word` | `footprint_trace` | 微小落点的语气词。 | 只有在沙纹/脚印有明确动作或切镜落点时成立。 | `no nearby confirmed marker; needs_bgm_review` | 删除；若脚印落点可见再写 `刚好` | `remove` | `fail_caption_not_reference_like` | `partial` |
| `caption_blink` | `别眨眼` | 可读但像通用 hype；视觉峰值和音乐峰值尚未人工确认。 | `peak_punctuation` | `sky_peak_bright_cloud / peak_flash` | 峰值提醒，只在真正视觉或音乐峰值上出现。 | 19.56-22.20 是 sky/bamboo/flash 峰段，必须绑定峰值证据。 | `rms_peak 20.828 auto; needs_review` | `别眨`；若峰值不成立则删除 | `revise` | `fail_music_visual_mismatch` | `blocked` |
| `caption_breathe` | `呼` | 语义方向正确，但位置和对比弱，未明确绑定 cloud / sky gap。 | `breath_release` | `silver_sky_close / cloud_edge` | 峰后呼吸词。 | 24.32-26.68 是收束呼吸段，适合保留极短拟声。 | `needs_marker_source_after_20.828; needs_review` | `呼` | `revise` | `fail_caption_not_reference_like` | `partial` |
| `caption_second` | `one more second` | 和 EndCard 主文案争夺结尾语言。 | `ending_hold` | `end_card_primary_line` | 结尾停留和原创收束。 | 27.18 后 EndCard 已承担收束，字幕应让位。 | `needs_marker_source_after_20.828; needs_review` | 删除，交给 EndCard 文案 | `remove` | `fail_style_inconsistency` | `partial` |

## 4. Sticker 关系修正表

说明：本表只重写贴纸事件关系，不新增贴纸素材，不修改 SVG、x/y 或尺寸参数。

| sticker_id | current_kind | current_problem | anchor_target | placement_rule | minimum_visible_size | reference_function | shot_binding_reason | music_binding | recommended_sticker | fix_action | failure_rule | next_status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sticker_open_arrow` | `arrow` | 箭头可见但没有定义箭头尖端指向哪个 body part。 | `panda_head_turn / panda_paw / bamboo_bite_direction` | 箭头尖端离主体 12-48px，朝动作方向，不遮脸。 | 主贴纸宽度至少画面宽度 14%-18%（约 151-194px）；当前 210px 需按主体重定位。 | 注意力引导小动作。 | 熊猫从沙纹后出现，是第一个可贴动作主体。 | `beat 2.252 auto; needs_review` | 保留 arrow，但重设主体锚点。 | `revise` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_cloud_spark` | `spark` | 抽象星星贴在空天空，缺少亮点或小主体。 | `cloud_gap / light_edge`，若无明确亮点则无锚点。 | 只能贴云缝亮点，不能贴空 sky。 | 主贴纸宽度至少 14%-18%；若云缝小于贴纸视觉目标则删除。 | 强调空间亮点。 | cloud_tide_open 远景主体弱，不适合随机 spark。 | `beat/onset 4.807 auto; needs_review` | 删除，除非下一轮能确认 cloud gap。 | `remove` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_bamboo_circle` | `circle` | 圈住的是叶区，不是 panda_face 或隐藏边缘。 | `panda_face / leaf_hide_edge` | 圈完整包住主体，离主体边缘 8-32px，不落画面边。 | circle 直径至少画面宽度 14%-18%（约 151-194px）。 | 圈出被遮挡的小重点。 | bamboo_hide 是天然 attention cue，但必须圈到对象。 | `onset 6.989 auto; needs_review` | 保留 circle，重设 anchor。 | `revise` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_sand_wave` | `wave` | wave 贴在低位空沙纹，没贴到脚印轨迹。 | `footprint_trace / sand_curve` | 沿脚印或沙纹方向，离轨迹 12-40px。 | 主贴纸宽度至少 14%-18%；高度不低于 70px。 | 纹理小动作标点。 | sand detail 是 motif 回环，适合轻 wave 但必须贴线条。 | `beat 7.895 auto; needs_review` | 保留 wave，移动到 footprint_trace。 | `revise` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_panda_tag` | `tag` | “小重点”像说明标签，位置不贴熊猫。 | `panda_mouth / bamboo_bite` | 标签靠近 bite，不挡脸；离动作点 16-44px。 | 小标签宽度至少画面宽度 10%-14%（约 108-151px）。 | 轻喜剧动作提示。 | 熊猫咬竹可做小笑点，但 tag 文案要更短。 | `beat 9.799 / rms_peak 9.172 auto; needs_review` | 替换为短拟声 tag，如 `咬`。 | `replace` | `fail_surface_copy_without_function` | `partial` |
| `sticker_scrap_under` | `underline` | 下划线没有被强调对象，像装饰线。 | `caption_slow_baseline` 或 `specific_panel_edge` | 只有存在具体文字/面板边缘时才画线。 | 细线宽度至少 180px，stroke 8-12px；无对象则删除。 | scrapbook 内的轻强调。 | scrapbook 呼吸段不需要无对象线条。 | `rms_peak 12.562 auto; needs_review` | 删除；若保留只给唯一 `慢一点` 做 baseline。 | `remove` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_reprise_dottrail` | `dottrail` | 点线没有起点终点，像随机漂浮。 | `bamboo_edge -> cloud_window_gap`，若路径不可见则无锚点。 | 必须从一个可见主体指向另一个可见终点。 | 点直径至少 10px，整体宽度至少 10%-14% 画面宽。 | motif 连接路径。 | bamboo 到 cloud 可做回环，但当前没有 endpoint。 | `rms_peak 15.836 auto; needs_review` | 删除，除非下一轮做明确路径。 | `remove` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_peak_burst` | `burst` | 大小可见，但缺少视觉峰值和音乐峰值确认。 | `sky_peak_bright_cloud / peak_flash_center` | burst 贴真实亮点，不挡主要云面。 | 主贴纸宽度至少 14%-18%。 | 峰值标点。 | sky_peak 是高潮段，可保留一个峰值贴纸。 | `rms_peak 20.828 auto; needs_review` | 保留为候选 burst，但必须等 BGM/峰值复听。 | `revise` | `fail_music_visual_mismatch` | `blocked` |
| `sticker_peak_circle` | `circle` | 位置靠边，未圈住 bamboo / panda 主体。 | `panda_or_bamboo_subject` | 圈主体；主体不可见时不强行圈。 | circle 直径至少画面宽度 14%-18%。 | 第二峰值主体强调。 | bamboo_peak 若没有清楚主体，circle 会显得乱。 | `needs_bgm_review` | 删除，或替换为不抢主体的短线。 | `remove` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_slow_wave` | `wave` | 概念接近呼吸，但贴空天且颜色过浅。 | `cloud_edge / sea_edge` | 沿云/海边缘，不贴纯空 sky。 | 主贴纸宽度至少 14%-18%，stroke 对比需可见。 | slowdown breath 轻标点。 | silver sky close 是呼吸段，可保留一条轻 wave。 | `needs_marker_source_after_20.828; needs_review` | 保留 wave，但重设边缘锚点和对比。 | `revise` | `fail_sticker_not_reference_like` | `partial` |
| `sticker_end_arrow` | `arrow` | 与 EndCard 争夺视线，指向不清。 | `end_card_primary_line` 或 `panda_background`，二选一。 | 结尾只允许一个视觉引导；不压 EndCard 主文字。 | 若保留，宽度至少 10%-14% 画面宽；但当前建议删除。 | 结尾注意力引导。 | EndCard 已有主文案，箭头不是必要事件。 | `needs_marker_source_after_20.828; needs_review` | 删除，EndCard 承担收束。 | `remove` | `fail_style_inconsistency` | `partial` |

### 4.1 Sticker 图形适配修正表

说明：本表补齐 `sticker_visual_fit`、`graphic_role`、`color_fit`、`texture_fit`、`style_conflict`。有 `anchor_target` 和 `placement_rule` 不等于贴纸成立；如果图形像随机素材包、儿童模板、电商爆炸贴、赛博 UI 或硬 SVG 展示，触发 `fail_sticker_graphic_mismatch`。

| sticker_id | sticker_visual_fit | graphic_role | color_fit | texture_fit | style_conflict | updated_action |
|---|---|---|---|---|---|---|
| `sticker_open_arrow` | `partial` | 指向熊猫动作的注意力箭头。 | 当前黄色偏强，需要降低饱和并避开熊猫脸。 | 线条可保留，但要更像手绘标点。 | 低冲突；位置不准时会像临时箭头。 | 保留并重定位，降低颜色强度。 |
| `sticker_cloud_spark` | `fail` | 原本想做云层亮点标点。 | 高亮黄在远景天空里像随机星星。 | 实心星形偏素材包。 | 随机素材包 / 儿童模板感。 | 删除。 |
| `sticker_bamboo_circle` | `partial` | 圈出竹叶遮挡里的小主体。 | 黄色可降饱和，避免像告示圈。 | 手绘圈可保留。 | 锚点错时像 SVG 库展示。 | 保留并重定位到 `panda_face / leaf_hide_edge`。 |
| `sticker_sand_wave` | `partial` | 沿脚印 / 沙纹轨迹的轻波纹。 | 蓝色需更贴沙面，不要过亮。 | 手绘线条可保留。 | 贴空地时像装饰线。 | 保留并重定位到 `footprint_trace / sand_curve`。 |
| `sticker_panda_tag` | `partial` | 熊猫咬竹动作旁的短拟声 / 动作标签。 | 原粉橙偏电商标签；需要改为纸感浅暖色。 | 原 pill 标签太模板，改为轻纸签。 | “小重点”说明感强。 | 文案改为 `咬`，换轻纸签语气并贴近动作。 |
| `sticker_scrap_under` | `fail` | 想做 scrapbook 下划强调。 | 颜色不构成问题，但没有被强调对象。 | 无对象线条像装饰。 | 随机线条感。 | 删除。 |
| `sticker_reprise_dottrail` | `fail` | 想做 motif 路径。 | 绿色与云海 / 竹叶关系弱。 | 点线像素材包。 | 随机 SVG 库感。 | 删除。 |
| `sticker_peak_burst` | `blocked` | 粗峰值候选爆点。 | 黄色强度高，若峰值未确认会抢画面。 | 爆炸图形偏模板化。 | 电商爆炸贴风险。 | 未复听前不用于证明峰值；本轮删除或只在报告标 `rough_peak_candidate`。 |
| `sticker_peak_circle` | `fail` | 想圈峰值主体。 | 粉色与 bamboo peak 冲突。 | 手绘圈可用，但当前无主体。 | 边缘漂浮感。 | 删除。 |
| `sticker_slow_wave` | `partial` | 呼吸段云 / 海边缘轻线条。 | 原色太浅，需要增强可见但保持低饱和。 | 手绘波纹可保留。 | 贴空天时像装饰。 | 保留并贴 `cloud_edge / sea_edge`，降低空贴风险。 |
| `sticker_end_arrow` | `fail` | 结尾注意力箭头。 | 黄色会和 EndCard 主语言竞争。 | 手绘箭头本身可用，但结尾不需要。 | 与 EndCard 风格冲突。 | 删除。 |

## 5. Transition / cut / fade / flash 关系补全表

说明：本表覆盖 18 个 visual segments 之间的 17 条主要切换，并额外标出 `PeakFlash` 与 `EndCard` 结构事件。即使是普通切镜，也必须定义作用。

| transition_id | from_visual | to_visual | time_range | transition_type | transition_role | music_moment | reference_function | current_problem | fix_action | failure_rule | next_status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `transition_01` | `sand_trace_opening` | `panda_head_turn` | `00:01.86-00:02.18` | `overlap_fade` | 从纹理开场过到具体小主体。 | `beat 2.252 auto; needs_review` | 物件 / 主体 reveal。 | 旧表只写普通 clip chain，没有说明 reveal 功能。 | `revise` | `fail_transition_not_reference_like` | `partial` |
| `transition_02` | `panda_head_turn` | `mist_people_wide` | `00:03.42-00:03.78` | `overlap_fade` | 从动物近主体退到空间远景。 | `beat 3.553 / onset 3.529 auto; needs_review` | 近景到远景的空间推进。 | 缺少空间推进说明。 | `revise` | `fail_transition_not_reference_like` | `partial` |
| `transition_03` | `mist_people_wide` | `cloud_tide_open` | `00:04.90-00:05.20` | `overlap_fade` | 从雾面扩展到云海，承担第一次空间放大。 | `beat/onset 4.807 auto; needs_review` | 空间扩大和轻切镜标点。 | `caption_ka` 若保留，必须绑定此切换。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `partial` |
| `transition_04` | `cloud_tide_open` | `bamboo_hide` | `00:06.42-00:06.76` | `overlap_fade` | 从远景转到遮挡小主体，引出注意力提示。 | `beat 6.664 / onset 6.989 auto; needs_review` | 远景到遮挡动作。 | 缺少注意力转场功能。 | `revise` | `fail_transition_not_reference_like` | `partial` |
| `transition_05` | `bamboo_hide` | `sand_footprint_detail` | `00:07.76-00:08.10` | `overlap_fade` | 从竹叶遮挡切回沙纹细节，完成 motif 换气。 | `beat 7.895 auto; needs_review` | motif 间的呼吸切换。 | 旧表未定义 motif 换气。 | `revise` | `fail_random_patchwork` | `partial` |
| `transition_06` | `sand_footprint_detail` | `panda_bamboo_bite` | `00:08.98-00:09.24` | `overlap_fade` | 从纹理细节到可见动作。 | `beat 9.149 / rms_peak 9.172 auto; needs_review` | 小动作进入。 | `caption_tiny` 语义需随 transition 改。 | `revise` | `fail_caption_not_reference_like` | `partial` |
| `transition_07` | `panda_bamboo_bite` | `mist_walkaway` | `00:10.24-00:10.60` | `overlap_fade` | 从动作小点转入 scrapbook 前的呼吸远景。 | `needs_marker_source_after_9.799; needs_review` | 动作后降信息密度。 | marker 覆盖不足，不能宣称精准对拍。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `partial` |
| `transition_08` | `mist_walkaway` | `silver_cloud_crowd` | `00:11.54-00:11.86` | `scrapbook_enter / overlap_fade` | 进入黑底 scrapbook 呼吸段。 | `rms_peak 11.656 auto; needs_review` | 黑底分组呼吸。 | 旧表没有说明 scrapbook enter。 | `revise` | `fail_surface_copy_without_function` | `partial` |
| `transition_09` | `silver_cloud_crowd` | `bamboo_reprise` | `00:14.72-00:14.94` | `scrapbook_exit / overlap_fade` | 退出 scrapbook，回到 bamboo motif。 | `rms_peak 14.118/15.070 auto; needs_review` | motif reprise。 | 退出点未绑定音乐和母题。 | `needs_bgm_review` | `fail_transition_not_reference_like` | `partial` |
| `transition_10` | `bamboo_reprise` | `cloud_window` | `00:15.96-00:16.27` | `overlap_fade` | 从竹叶遮挡转到云洞，承接“藏/露”语义。 | `rms_peak 15.836/16.324 auto; needs_review` | 遮挡到显露。 | `caption_hidden` 必须绑定一个对象。 | `revise` | `fail_caption_not_reference_like` | `partial` |
| `transition_11` | `cloud_window` | `panda_pause` | `00:17.22-00:17.48` | `overlap_fade` | 从开阔空间回到主体停顿。 | `rms_peak 17.554 auto; needs_review` | 峰前收束到小主体。 | sticker 锚点未定义。 | `revise` | `fail_sticker_not_reference_like` | `partial` |
| `transition_12` | `panda_pause` | `sand_echo` | `00:18.38-00:18.64` | `overlap_fade` | 峰值前回到开场 motif echo。 | `needs_marker_source; needs_review` | 首尾母题呼应。 | `caption_just` 缺落点。 | `revise` | `fail_random_patchwork` | `partial` |
| `transition_13` | `sand_echo` | `sky_peak` | `00:19.56-00:19.80` | `overlap_fade / peak_lift` | 从地面沙纹抬到天空峰值。 | `rms_peak 20.828 auto; needs_review` | 情绪抬升。 | 峰值音乐点未人工确认。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `blocked` |
| `transition_14` | `sky_peak` | `bamboo_peak` | `00:21.18-00:21.52` | `overlap_fade / peak_flash_active` | 峰值从天空转回 bamboo/panda 主体。 | `rms_peak 20.828 auto; needs_review` | peak reprise。 | `PeakFlash` 与第二峰值关系未确认。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `blocked` |
| `transition_15` | `bamboo_peak` | `mist_slowdown` | `00:22.56-00:22.80` | `overlap_fade` | 峰值释放到远景降速。 | `needs_marker_source_after_20.828; needs_review` | 峰后呼吸。 | marker 覆盖不到该时间段。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `partial` |
| `transition_16` | `mist_slowdown` | `silver_sky_close` | `00:24.32-00:24.66` | `overlap_fade` | 延续 slowdown breath，给尾卡留空间。 | `needs_marker_source_after_20.828; needs_review` | 呼吸段延长。 | 缺人耳复听，不能确认转弱。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `partial` |
| `transition_17` | `silver_sky_close` | `panda_end_reprise` | `00:26.32-00:26.68` | `overlap_fade / end_prep` | 从 sky close 回到 panda/bamboo 结尾回环。 | `needs_marker_source_after_20.828; needs_review` | motif reprise before CTA。 | 结尾 caption/sticker 和 EndCard 抢语言。 | `revise` | `fail_style_inconsistency` | `partial` |
| `transition_18_peak_flash` | `sky_peak` | `bamboo_peak` | `00:19.20-00:22.20` | `peak_flash` | 用闪光强调峰值段，但必须绑定视觉峰值和音乐峰值。 | `rms_peak 20.828 auto; needs_review` | peak punctuation effect。 | 当前不能证明精准卡点。 | `needs_bgm_review` | `fail_music_visual_mismatch` | `blocked` |
| `transition_19_end_card` | `panda_end_reprise` | `end_card_27_18_30_00` | `00:27.18-00:30.00` | `end_card_fade` | 从结尾 motif 进入原创尾卡收束。 | `needs_marker_source_after_20.828; needs_review` | own CTA / ending hold。 | EndCard、caption_second、sticker_end_arrow 三者竞争。 | `revise` | `fail_style_inconsistency` | `partial` |

## 6. BGM marker 对照表

说明：本轮不做人工复听。以下 marker 全部来自 ignored 运行产物 `tmp/三十秒对标样片_30s_reference_sample/markers/`，置信度只能写 `auto`，不能写精准卡点。已确认：beat 16、onset 20、rms_peak 12。待验证：marker timecode 未覆盖完整 30 秒，20.828s 之后需要 `needs_marker_source` 或人工复听补齐。

| marker_id | marker_type | timecode | confidence | mapped_event | current_use | risk | next_action |
|---|---|---:|---|---|---|---|---|
| `beat_01` | `beat` | `00:00.093` | `auto` | `segment_sand_trace_opening` | 开场候选节拍 | 自动粗 marker，未复听。 | 人工复听确认或忽略。 |
| `beat_02` | `beat` | `00:00.766` | `auto` | `segment_sand_trace_opening` | 开场候选节拍 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_03` | `beat` | `00:01.533` | `auto` | `transition_01` | sand -> panda 前候选节拍 | 自动粗 marker，未复听。 | 与 transition_01 对照。 |
| `beat_04` | `beat` | `00:02.252` | `auto` | `caption_wind_first`, `transition_01` | 已作为候选音乐点。 | 不能证明精准卡点。 | 人工复听确认。 |
| `beat_05` | `beat` | `00:02.926` | `auto` | `segment_panda_head_turn` | 候选节拍 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_06` | `beat` | `00:03.553` | `auto` | `transition_02` | 候选切换点。 | 自动粗 marker，未复听。 | 与 panda -> mist 对照。 |
| `beat_07` | `beat` | `00:04.180` | `auto` | `mist_people_wide` | 候选节拍。 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_08` | `beat` | `00:04.807` | `auto` | `caption_ka`, `transition_03` | 当前 `caption_ka` 候选点。 | 拟声未必成立。 | 优先复听。 |
| `beat_09` | `beat` | `00:05.410` | `auto` | `cloud_tide_open` | 候选节拍。 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_10` | `beat` | `00:06.037` | `auto` | `cloud_tide_open` | 候选节拍。 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_11` | `beat` | `00:06.664` | `auto` | `transition_04` | cloud -> bamboo 候选切换点。 | 自动粗 marker，未复听。 | 与 attention cue 对照。 |
| `beat_12` | `beat` | `00:07.291` | `auto` | `caption_look` | 候选字幕点。 | 自动粗 marker，未复听。 | 复听后决定 in/out。 |
| `beat_13` | `beat` | `00:07.895` | `auto` | `sticker_sand_wave`, `transition_05` | 候选 motif 切换点。 | 自动粗 marker，未复听。 | 与 footprint_trace 对照。 |
| `beat_14` | `beat` | `00:08.522` | `auto` | `sand_footprint_detail` | 候选节拍。 | 自动粗 marker，未复听。 | 人工复听确认。 |
| `beat_15` | `beat` | `00:09.149` | `auto` | `caption_tiny`, `transition_06` | 候选动作点。 | 文案语义已失败。 | 复听后用于 replacement。 |
| `beat_16` | `beat` | `00:09.799` | `auto` | `sticker_panda_tag` | 候选贴纸点。 | 自动粗 marker，未复听。 | 重写 tag 后再映射。 |
| `onset_01` | `onset` | `00:00.070` | `auto` | `segment_sand_trace_opening` | 候选开场 onset。 | 自动 onset 可能过密。 | 人工复听筛选。 |
| `onset_02` | `onset` | `00:00.441` | `auto` | `segment_sand_trace_opening` | 候选 onset。 | 自动 onset 可能过密。 | 人工复听筛选。 |
| `onset_03` | `onset` | `00:00.743` | `auto` | `segment_sand_trace_opening` | 候选 onset。 | 自动 onset 可能过密。 | 人工复听筛选。 |
| `onset_04` | `onset` | `00:01.045` | `auto` | `segment_sand_trace_opening` | 候选 onset。 | 自动 onset 可能过密。 | 人工复听筛选。 |
| `onset_05` | `onset` | `00:01.370` | `auto` | `transition_01` | 候选切换前 onset。 | 自动 onset 可能过密。 | 与 transition_01 对照。 |
| `onset_06` | `onset` | `00:01.672` | `auto` | `transition_01` | 候选切换前 onset。 | 自动 onset 可能过密。 | 与 transition_01 对照。 |
| `onset_07` | `onset` | `00:01.927` | `auto` | `transition_01` | 候选 transition onset。 | 自动 onset 可能过密。 | 人工复听确认。 |
| `onset_08` | `onset` | `00:02.252` | `auto` | `caption_wind_first` | 候选字幕 onset。 | 未复听。 | 对照开场词。 |
| `onset_09` | `onset` | `00:02.786` | `auto` | `panda_head_turn` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_10` | `onset` | `00:03.228` | `auto` | `transition_02` | 候选切换前 onset。 | 未复听。 | 人工复听确认。 |
| `onset_11` | `onset` | `00:03.529` | `auto` | `transition_02` | 候选切换 onset。 | 未复听。 | 与 transition_02 对照。 |
| `onset_12` | `onset` | `00:03.901` | `auto` | `mist_people_wide` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_13` | `onset` | `00:04.180` | `auto` | `mist_people_wide` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_14` | `onset` | `00:04.505` | `auto` | `transition_03` | 候选切换前 onset。 | 未复听。 | 人工复听确认。 |
| `onset_15` | `onset` | `00:04.807` | `auto` | `caption_ka`, `transition_03` | 当前拟声候选 onset。 | 拟声未必成立。 | 优先复听。 |
| `onset_16` | `onset` | `00:05.108` | `auto` | `cloud_tide_open` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_17` | `onset` | `00:05.410` | `auto` | `cloud_tide_open` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_18` | `onset` | `00:05.712` | `auto` | `cloud_tide_open` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_19` | `onset` | `00:06.037` | `auto` | `cloud_tide_open` | 候选 onset。 | 未复听。 | 人工复听确认。 |
| `onset_20` | `onset` | `00:06.989` | `auto` | `caption_look`, `transition_04` | attention cue 候选 onset。 | 未复听。 | 对照 bamboo_hide。 |
| `rms_peak_01` | `rms_peak` | `00:02.926` | `auto` | `panda_head_turn` | 候选能量点。 | RMS peak 未复听。 | 人工复听确认。 |
| `rms_peak_02` | `rms_peak` | `00:05.875` | `auto` | `cloud_tide_open` | 候选能量点。 | RMS peak 未复听。 | 人工复听确认。 |
| `rms_peak_03` | `rms_peak` | `00:09.172` | `auto` | `caption_tiny`, `transition_06` | 候选动作点。 | 文案语义不成立。 | 用于 replacement timing。 |
| `rms_peak_04` | `rms_peak` | `00:10.867` | `auto` | `scrapbook_enter_pre` | 候选进入 scrapbook 前点。 | RMS peak 未复听。 | 人工复听确认。 |
| `rms_peak_05` | `rms_peak` | `00:11.656` | `auto` | `transition_08` | scrapbook enter 候选点。 | RMS peak 未复听。 | 对照黑底进入。 |
| `rms_peak_06` | `rms_peak` | `00:12.562` | `auto` | `caption_slow`, `sticker_scrap_under` | 慢速提示候选点。 | RMS peak 不等于降速。 | 人工复听确认是否适合“慢”。 |
| `rms_peak_07` | `rms_peak` | `00:14.118` | `auto` | `scrapbook_exit_pre` | 候选退出前点。 | RMS peak 未复听。 | 人工复听确认。 |
| `rms_peak_08` | `rms_peak` | `00:15.070` | `auto` | `transition_09` | scrapbook exit / bamboo reprise 候选点。 | RMS peak 未复听。 | 对照 transition_09。 |
| `rms_peak_09` | `rms_peak` | `00:15.836` | `auto` | `caption_hidden`, `sticker_reprise_dottrail` | hidden/reprise 候选点。 | RMS peak 未复听。 | 重写后再映射。 |
| `rms_peak_10` | `rms_peak` | `00:16.324` | `auto` | `transition_10` | cloud window 候选点。 | RMS peak 未复听。 | 对照 hidden reveal。 |
| `rms_peak_11` | `rms_peak` | `00:17.554` | `auto` | `transition_11`, `panda_pause` | 峰前停顿候选点。 | RMS peak 未复听。 | 人工复听确认。 |
| `rms_peak_12` | `rms_peak` | `00:20.828` | `auto` | `caption_blink`, `sticker_peak_burst`, `transition_18_peak_flash` | 峰值候选点。 | 核心峰值未复听，不能写精准卡点。 | 优先人工复听。 |

## 7. 更新后的 `hard_fail_summary`

| fail_code | updated_status | evidence | remaining_risk |
|---|---|---|---|
| `fail_no_reference_function` | `partially_resolved` | 26 已为 caption / sticker / transition 补 `reference_function`。 | 关系表完成不等于视频已执行或人审通过。 |
| `fail_surface_copy_without_function` | `partially_resolved` | scrapbook、EndCard、tag、underline 已给出保留 / 删除 / 替换理由。 | 具体删改需下一轮 Remotion 执行。 |
| `fail_event_quantity_as_quality` | `not_triggered_after_update` | 26 明确按功能关系判断，不用 10/11/18 数量证明质量。 | 后续回报仍需避免数量冒充内容通过。 |
| `fail_no_visual_selection_table` | `not_triggered_after_update` | 25 已覆盖 18 个 visual segment，26 继续沿用。 | 仍缺 frame-level 复核。 |
| `fail_no_video_event_table` | `not_triggered_after_update` | 25/26 已覆盖 caption、sticker、transition、BGM、EndCard。 | 关系表完成不等于 implementation 完成。 |
| `fail_no_frame_review` | `still_blocked` | 本轮禁止 render，也未做新的逐帧回审。 | 下一轮视频执行后必须抽帧。 |
| `fail_random_patchwork` | `partially_resolved` | transition 与 motif 关系已补齐。 | 需要人审确认观感是否统一。 |
| `fail_caption_not_reference_like` | `partially_resolved` | 10 条 caption 均已给出 replace / revise / remove 路由。 | Remotion 尚未执行，内容未通过。 |
| `fail_sticker_not_reference_like` | `partially_resolved` | 11 条 sticker 均已给出 anchor、placement、minimum_visible_size 和动作。 | Remotion 尚未执行，start/mid frame 未复核。 |
| `fail_transition_not_reference_like` | `partially_resolved` | 17 条 visual cut + PeakFlash + EndCard 已补 `transition_role`。 | peak / BGM 相关转场仍需复听。 |
| `fail_music_visual_mismatch` | `still_blocked` | marker 表已整理，但全部是 `auto`，且 20.828s 后缺 marker source。 | BGM 精准对齐与 peak flash 仍需用户人工复听。 |
| `fail_style_inconsistency` | `partially_resolved` | 结尾 caption / sticker / EndCard 冲突已给出删除/合并方向。 | 需下一轮执行后回看整体语气。 |

## 8. 更新后的 `next_fix_route`

| priority | issue | source_table | fix_layer | action | remotion_allowed | blocked_until |
|---:|---|---|---|---|---|---|
| `P0` | BGM marker 全部为 auto，且 20.828s 后缺 marker source。 | `BGM marker 对照表` | `bgm_layer` | 人工复听或补 loop/section marker 映射，尤其确认 19.20-22.20 peak 段。 | `not_for_precise_bgm_or_peak_flash` | `fail_music_visual_mismatch` 从 `still_blocked` 降为 `partial`。 |
| `P0` | `caption_blink`、`sticker_peak_burst`、`PeakFlash` 依赖音乐/视觉峰值。 | caption / sticker / transition tables | `bgm_layer`, `transition_layer` | 先复听峰值，再决定保留或删除峰值强调。 | `blocked_for_peak_events` | 峰值点用户复听或明确允许粗 marker。 |
| `P1` | 多条 caption 已决定 replace/remove，但尚未执行。 | caption relation table | `remotion_layer` | 下一轮可按 26 执行删除 `caption_ka`、`caption_just`、`caption_second`，替换 `caption_tiny` 等。 | `remotion_allowed_with_bgm_review_pending` | 仅限表层已明确的删改，不得写内容通过。 |
| `P1` | 多条 sticker 已决定 remove/revise，但尚未执行。 | sticker relation table | `remotion_layer` | 下一轮可删除无锚点 sticker，重定位有 anchor 的 sticker。 | `remotion_allowed_with_bgm_review_pending` | 不允许新增素材或 API；执行后需 frame review。 |
| `P1` | ordinary cut / overlap fade 已有 transition_role，但 peak 段仍需 BGM review。 | transition table | `transition_layer`, `remotion_layer` | 非 peak 的普通切换可先按角色执行；peak_flash 不可写精准。 | `limited_remotion_allowed` | peak / BGM 关系仍 `needs_review`。 |
| `P1` | `reference_timecode` 仍是 `待人工复核`。 | reference_learning_checklist | `reference_layer` | 后续可补参考 timecode，但不能以此阻断已经明确的删改。 | `remotion_allowed_for_non_reference_timecode_changes` | 若要宣称 reference match，必须人工复核 timecode。 |
| `P2` | frame-level review 缺失。 | hard_fail_summary | `visual_selection_layer`, `event_layer` | 下一轮 render 后抽 caption/sticker/transition start/mid/end frames。 | `after_render_required` | 本轮不能解决；下一轮必须执行。 |

## 9. 是否允许进入 Remotion 修复

结论：`不允许直接进入 Remotion 修复`。

已确认：本轮只是把 P0 表层阻断项降级，不能写成“已允许直接进入 Remotion 修复”。

部分成立：下一轮可以基于 `25 + 26` 拆一个有限 Remotion implementation，范围仅限以下表层明确动作：

1. 删除或替换已判定无功能的 caption。
2. 删除或重定位已判定无锚点的 sticker。
3. 按 transition table 处理普通 cut / fade 的段落关系。
4. 暂不把 BGM/peak flash 写成精准卡点。

仍阻断：

1. `caption_blink`、`sticker_peak_burst`、`PeakFlash` 的峰值卡点。
2. 20.828s 之后的 BGM marker source。
3. render 后 frame-level review。
4. 用户人工审看。

最终判断：`remotion_allowed_with_bgm_review_pending` 只适用于非峰值、非精准卡点的表现层删改；BGM 核心对齐仍为 `still_blocked`。
