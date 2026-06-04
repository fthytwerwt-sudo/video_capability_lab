# 60｜字幕贴纸 2-4 秒微段修正版报告

status: `caption_sticker_2_4s_fix_v2_micro_probe_rendered_pending_user_review`

route_decision: `mechanism_plus_2_4s_fix_v2_micro_probe_not_full_video_candidate`

blocked: `false`

blocked_reason: `none`

this_is_partial_probe_not_full_video_candidate: `true`

## 1. Scope

本轮基于 `58` 的 5 个“总差一点”问题继续修正。输出范围是机制入库 + 2-4 秒 v2 修正微段 + before/v1/v2 审片包，不重新生成 18 秒完整正片，不增加贴纸数量，不声明能力成立。

- source_report: `项目资料_docs/视频能力实验室_video_capability_lab/58_字幕贴纸2到4秒微段精修探针报告_caption_sticker_2_4s_micro_probe_report.md`
- mechanism_file: `项目资料_docs/视频能力实验室_video_capability_lab/59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md`
- remotion_data: `remotion/数据_data/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.ts`
- remotion_composition: `remotion/组合_compositions/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.tsx`
- remotion_composition_id: `字幕贴纸2到4秒微段修正版-caption-sticker-2-4s-fix-v2`
- review_pack_script: `脚本_scripts/生成字幕贴纸2到4秒微段修正版审片包_generate_caption_sticker_2_4s_fix_v2_review_pack.py`
- v2_video_path: `dist/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.mp4`
- review_pack_path: `tmp/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2_review_pack/`

## 2. Mechanism Written

`59` 已入库，包含：

| mechanism | included |
|---|---|
| `frame_review_loop` | `true` |
| `visual_scorecard` | `true` |
| `caption_sticker_fix_spec` | `true` |
| `micro_probe_before_full_render_2_4s` | `true` |

核心新增规则：字幕 / 贴纸没过 2-4 秒微段回审前，不允许直接扩到整条 18 秒正片。

## 3. Selected Window

| field | value |
|---|---|
| `time_range` | `3.15-6.15s` from current 18s candidate |
| `duration` | `3.00s` |
| `source_segment` | `seg_04_main_action_push -> seg_05_metal_texture_cut` |
| `source_material` | `M03 + M06` |
| `source_time_range` | `M03 0.35-2.25s -> M06 0.70-1.80s` |
| `frame_evidence` | 原 18s `3.54/3.78s`、v1 `0.78s`、v2 `0.78s` 对比帧均能看到右侧机器立柱圆孔、下方横杆和人体发力窗口。 |

## 4. Visual Language Preflight

```yaml
visual_language_preflight:
  source_inventory_read: true
  migration_library_read: true
  decision_router_read: true
  visual_review_loop_read: true
  analysis_asset_ids: [6, 7, 27, 29, 35, 37, 40, 41, 44, 49, 50, 53, 57, 59]
  reference_rule_links:
    - 54:F.extraction_contract
    - 55:D.sticker_type_02
    - 55:D.sticker_type_03
    - 55:D.sticker_type_05
    - 55:E.attach_01
    - 55:E.attach_02
    - 55:E.attach_03
    - 55:F.shape_01
    - 55:F.shape_02
    - 55:F.shape_03
    - 55:G.stroke_material_motion_library
    - 55:H.caption_05
    - 55:I.cs_relation_03
    - 56:E.caption_branch_05_hand_drawn_reaction_word
    - 56:F.sticker_branch_03_contact
    - 56:F.sticker_branch_05_edge
    - 56:G.caption_sticker_conflict_resolver
    - 56:J.template_fallback_gate
    - 59:B.frame_review_loop
    - 59:C.visual_scorecard
    - 59:D.caption_sticker_fix_spec
    - 59:E.micro_probe_before_full_render_2_4s
  migration_library_used: true
  decision_router_used: true
  caption_sticker_visual_review_loop_used: true
  template_fallback: false
  copy_risk_check: 原创拟声短字与原创 SVG/CSS 擦痕；不复制参考视频素材、第三方贴纸、平台 UI、品牌资产、原字体或原文案。
```

## 5. Five Problems Fixed Attempt

| problem | v2 fix attempt | score |
|---|---|---|
| `caption_relation_problem` | 从大字“顶一下”降为小型拟声“咔”，只在接触窗口出现，贴近机器圆孔边缘。 | `2 / pending_user_review` |
| `sticker_generic_component_problem` | 把 v1 pressure burst 改成 pin rub mark + bar scuff，形状沿右侧圆孔和横杆边缘。 | `2 / pending_user_review` |
| `anchor_declaration_problem` | 锚点写成可见右侧机器立柱圆孔、横杆上边缘、M06 金属线条，并在审片包抽 before/v1/v2 对应帧。 | `2 / pending_user_review` |
| `occlusion_material_problem` | 颜色从高亮黄白降为灰白擦痕、暗边、multiply/soft-light 混合，并用机器色遮罩压住部分笔触。 | `2 / pending_user_review` |
| `motion_event_problem` | 取消 spring pop，改为接触帧 scratch/compress/absorb，跟动作接触和切镜窗口绑定。 | `2 / pending_user_review` |

scorecard_path: `tmp/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2_review_pack/visual_scorecard.json`

## 6. Caption / Sticker Fix Spec

```yaml
caption_fix:
  old_caption: 顶一下
  new_caption: 咔
  text_status: draft_text_pending_user_review
  caption_type: hand_drawn_reaction_word
  why_more_like_action_reaction: 单字拟声只响应机械接触，不再承担段落口号。
  anchor_target: 右侧机器立柱圆孔左下缘和横杆上缘之间。
  attention_weight: medium_low
  entry_hold_exit: 4 frame scratch-in / 13 frame hold / 7 frame wipe-out
  copy_risk_check: 原创拟声字；不复制参考文案、字体或平台 UI。
sticker_fix:
  old_sticker: contact_pressure_burst + caption_tail_tick + texture_residual_drag
  new_sticker: pin_rub_mark + bar_compression_scuff + texture_absorb_smear
  sticker_type: edge/contact scuff visual punctuation
  attachment_relation: contact_point_attached + edge_attached + motion_direction_attached
  shape_derived_from_frame_event: 擦痕围绕机器圆孔和横杆边缘，方向跟机械结构线一致。
  material_occlusion_strategy: 低饱和灰白/暗边，局部机器色遮罩盖住笔触端点。
  motion_bound_to_event: 接触窗口短擦入，动作压力时压缩，切到 M06 前收掉。
  fallback_if_still_generic: 删除 pin_rub_mark，仅保留 bar_compression_scuff；不得回退到 burst 模板。
template_fallback: false
review_required: true
```

fix_spec_path: `tmp/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2_review_pack/fix_spec.json`

## 7. Review Pack

审片包包含：

- original 18s candidate frames
- v1 micro probe frames
- v2 fix frames
- `original_candidate_contact_sheet.jpg`
- `v1_micro_probe_contact_sheet.jpg`
- `v2_fix_contact_sheet.jpg`
- `before_v1_v2_contact_sheet.jpg`
- `visual_scorecard.json`
- `fix_spec.json`
- `review_manifest.json`

review_pack_path: `tmp/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2_review_pack/`

## 8. Technical Validation

| validation | result |
|---|---|
| Remotion composition check | `passed` |
| Remotion render | `passed` |
| output duration | `3.050667s` |
| resolution | `1080x1920` |
| fps | `30.000` |
| video codec | `h264` |
| audio | `AAC stereo` |
| decodable | `true` |
| ffmpeg decode check | `passed` |
| review pack generation | `passed` |
| visual sanity check | `before/v1/v2 contact sheet opened; no blank or wrong-frame failure observed` |

output_video_metadata: `3.050667s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true`

## 9. Failure Routing

| failure | route |
|---|---|
| `caption_still_slogan` | 换成更低权重拟声 / 呼吸词，或删除 caption，仅保留 scuff。 |
| `sticker_still_generic` | 删除 `pin_rub_mark`，只留贴横杆边缘的 `bar_compression_scuff`。 |
| `anchor_not_visible` | 回到 frame_review_loop，重新抽帧找真实边缘或写 no-sticker。 |
| `occlusion_still_floaty` | 降低亮度和对比，减少完整轮廓，改为材质痕迹。 |
| `motion_still_parametric` | 继续缩短窗口，绑定到接触帧和切镜帧，不调 spring。 |

## 10. Do Not Claim

- 不声明 `publish-ready`。
- 不声明 `video_fixed`。
- 不声明 `full video candidate completed`。
- 不声明 `vlog director capability verified`。
- 不声明用户审美通过。

## 11. Remaining User Review Points

- 待验证：`咔` 这个拟声是否符合用户要的语气。
- 待验证：v2 是否过于克制、太隐，还是正好减少了浮层感。
- 待验证：pin rub / bar scuff 是否比 v1 pressure burst 更像这一帧专属反应。
- 待验证：M06 texture_absorb_smear 是否应该保留，还是直接无贴纸退出。
