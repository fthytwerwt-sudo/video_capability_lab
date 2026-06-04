# 58｜字幕贴纸 2-4 秒微段精修探针报告

status: `caption_sticker_2_4s_micro_probe_rendered_pending_user_review`

route_decision: `partial_visual_language_micro_probe_not_full_video_candidate`

this_is_partial_probe_not_full_video_candidate: `true`

blocked: `false`

blocked_reason: `none`

## 1. Scope

本轮目标不是重新生成 18 秒完整正片，不是增加贴纸数量，也不是修完整片子。本轮只选取当前 18 秒候选中的 1 个 2-4 秒窗口，做 caption / sticker / visual punctuation 的局部视觉语言精修探针，用来判断“差一点”的问题是否来自附着关系、形状派生、材质合成和动效手感。

- current_candidate_video: `dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4`
- current_candidate_report: `项目资料_docs/视频能力实验室_video_capability_lab/57_参考视觉语言路由18秒正片候选报告_18s_visual_language_routed_full_candidate_report.md`
- micro_probe_video: `dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4`
- review_pack_path: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/`
- remotion_data: `remotion/数据_data/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.ts`
- remotion_composition: `remotion/组合_compositions/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.tsx`
- remotion_composition_id: `字幕贴纸2到4秒微段精修探针-caption-sticker-2-4s-micro-probe`
- review_pack_script: `脚本_scripts/生成字幕贴纸2到4秒微段精修探针审片包_generate_caption_sticker_2_4s_micro_probe_review_pack.py`

## 2. Selected Micro Window

| field | value |
|---|---|
| `time_range` | `3.15-6.15s` from current 18s candidate |
| `duration` | `3.00s` |
| `source_segment` | `seg_04_main_action_push -> seg_05_metal_texture_cut` |
| `source_material` | `M03 + M06` |
| `source_time_range` | `M03 0.35-2.25s -> M06 0.70-1.80s` |
| `selection_reason` | 同时包含动作接触、原 contact flash、大字 caption 和金属纹理过渡，最能暴露当前视觉标点“像组件、不像长在画面里”的问题。 |

未选窗口：

| window | reason |
|---|---|
| `0.00-2.10s` | opening 更像身份/开场检验，接触锚点不足。 |
| `6.15-8.00s` | 机器 motion trail 可检验方向线，但原窗口不足 2s 且字幕冲突少。 |
| `11.85-13.45s` | 暗部影子段更适合 mood reset，低照度会掩盖材质和附着问题。 |

## 3. Visual Language Preflight

```yaml
visual_language_preflight:
  source_inventory_read: true
  migration_library_read: true
  decision_router_read: true
  analysis_asset_ids: [6, 7, 27, 29, 35, 37, 40, 41, 44, 50, 53, 57, 59]
  reference_rule_links:
    - 54:F.extraction_contract
    - 55:D.sticker_type_02
    - 55:D.sticker_type_03
    - 55:E.attach_02
    - 55:E.attach_08
    - 55:F.shape_02
    - 55:F.shape_08
    - 55:G.stroke_material_motion_library
    - 55:H.caption_01
    - 55:I.caption_sticker_relation_library
    - 56:E.caption_branch_01_hero_keyword
    - 56:E.caption_branch_02_attached_phrase
    - 56:F.sticker_branch_02_hand_drawn_hybrid
    - 56:F.sticker_branch_03_contact
    - 56:G.caption_sticker_conflict_resolver
    - 56:J.template_fallback_gate
  migration_library_used: true
  decision_router_used: true
  template_fallback: false
  copy_risk_check: 只迁移视觉语言机制；不复制参考视频素材、第三方贴纸、平台 UI、品牌资产、原字体或原文案；本轮不生成新图片/视频/音频资产。
```

## 4. Before Audit

| problem | audit |
|---|---|
| `current_caption_problem` | 原 `caption_03_action_push` 的“推上去”位置避开了主体，但更像画面上的大字口号，和器械接触点的物理关系不够强。 |
| `current_sticker_problem` | 原 `sticker_03_action_contact_flash` 可读，但四向对称 burst 形状接近通用火花组件。 |
| `current_attachment_problem` | 数据里声明 contact anchor，画面里仍偏前景浮层，没有被器械边缘压住或顺受力方向长出。 |
| `current_shape_problem` | 线条规整、均衡、独立，缺少从 M03 具体接触事件抽出的不对称压力形。 |
| `current_material_compositing_problem` | cream/yellow SVG 边缘干净，drop shadow 统一，缺少粗糙描边、暗部压痕和局部遮罩。 |
| `current_motion_problem` | 动效是 pop + hold + exit，更像组件参数，不像接触瞬间被挤出、拖开、再收掉。 |
| `current_human_feel_problem` | 字段已通过 54/55/56，但手感仍偏工程实现。 |
| `likely_reason` | 形状没有足够从事件和材质里派生，caption 与 sticker 的附属关系仍是声明强于画面证据。 |

## 5. Micro Fix Spec

```yaml
shot_id: micro_probe_action_contact_3s
time_range: 3.15-6.15s
source_material: M03 + M06
source_time_range: M03 0.35-2.25s -> M06 0.70-1.80s
visual_event: 健身器械受力推进后切入金属线条纹理。
primary_subject: M03 器械和人体动作接触窗口。
action_or_state: push/contact pressure
anchor_target: M03 发力/器械接触点。
background_density: high on action contact; high on metal texture exit
safe_area: 字幕左下到中下斜向区域；贴纸贴近接触点但不压主体手臂/器械核心。
caption_decision: needed; hero_keyword + attached_phrase hybrid
sticker_decision: needed; hand_drawn_caption_plus_sticker_hybrid + contact pressure burst
attachment_relation: contact_point_attached + caption_relation_attached + short residual motion direction
shape_grammar: 不对称 pressure burst、短压痕、caption 尾巴小 tick，由接触点向左上和右下挤出。
material_compositing: charcoal under-stroke、off-white thick outline、warm yellow core、局部暗色遮罩和颗粒。
motion_signature: 4 frame snap-in, 9 frame smear-out, 18 frame uneven hold, exits before texture cut。
conflict_resolution: sticker 写接触冲击；caption 只给人声反应；二者不复述、不互压。
template_fallback: false
copy_risk_check: 原创短句和原创 SVG/CSS 形状；不复制参考字体、原文案、平台 UI、品牌包装或第三方贴纸。
failure_route: 若仍像组件，删除 pressure burst，仅保留 caption tail tick；若 caption 压主体，缩小并降到 attached phrase。
```

## 6. Caption Plan

```yaml
caption_event:
  caption_id: micro_caption_01_contact_reaction
  time_range: 0.22-1.48s
  text: 顶一下
  text_status: draft_text_pending_user_review
  caption_type: hero_keyword_attached_phrase_hybrid
  analysis_asset_ids: [27, 35, 37, 50, 53, 59]
  reference_rule_links:
    - 55:H.caption_01
    - 55:H.caption_02
    - 55:I.caption_sticker_relation_library
    - 56:E.caption_branch_01_hero_keyword
    - 56:E.caption_branch_02_attached_phrase
    - 56:G.caption_sticker_conflict_resolver
  anchor_target: M03 动作接触点左下侧，和 pressure burst 共享同一受力窗口。
  picture_relation: caption 像从动作压力旁边冒出来的人声反应，不做解释字幕，也不抢接触点主体。
  position_mode: diagonal_contact_attached
  attention_weight: high
  entry_frames: 4
  hold_frames: 24
  exit_frames: 8
  caption_sticker_relation: sticker_leads_caption_supports
  migration_library_used: true
  decision_router_used: true
  caption_visual_language_decision: caption_router -> hero_keyword + attached_phrase hybrid；短语跟动作压力，不固定底部。
  sticker_visual_language_decision: sticker_visual_punctuation_router -> contact pressure burst 先行，caption 只给语气。
  copy_risk_check: 原创短句，待用户人审；不复制参考文案或字体。
  template_fallback: false
```

## 7. Sticker / Visual Punctuation Plan

```yaml
sticker_event:
  sticker_id: micro_sticker_01_contact_pressure_burst
  time_range: 0.34-1.32s
  sticker_needed: true
  analysis_asset_ids: [40, 41, 44, 50, 53, 59]
  reference_rule_links: [55:D.sticker_type_03, 55:E.attach_02, 55:F.shape_02, 56:F.sticker_branch_03_contact]
  anchor_target: M03 发力/器械接触窗口
  anchor_reason: 真实接触和受力方向清楚。
  attachment_relation: contact_point_attached
  sticker_type: contact_pressure_burst
  shape_grammar: asymmetric_pressure_burst
  shape_derived_from_event: 5 条不对称短压痕从接触点挤出，长短和方向跟器械遮挡/受力方向绑定。
  stroke_outline: charcoal under-stroke + off-white thick outline + warm yellow broken core
  material_compositing: 局部暗色 occlusion mask 压住右侧笔触，grain overlay 混入 M03 暗部。
  scale_distance: 距离接触点 8-46px，不遮挡手臂/主体动作。
  motion_signature: 4 frame snap, 9 frame smear, 18 frame uneven hold, exits before M06 texture cut
  caption_relation: sticker leads; caption supports human reaction
  attention_weight: medium
  copy_risk_check: 原创 SVG/CSS 形状，无第三方贴纸或参考贴纸复制。
  bad_pattern_avoided: [fixed_component_reuse, quantity_as_quality, template_shape_swap, floating_ui_layer, sticker_caption_duplicate]
  template_fallback: false
  fallback_if_failed: 删除 pressure burst，仅保留 caption tail tick；不得替换为模板火花。
```

```yaml
sticker_event:
  sticker_id: micro_sticker_02_caption_tail_tick
  time_range: 0.25-1.46s
  sticker_needed: true
  analysis_asset_ids: [21, 44, 50, 53, 59]
  reference_rule_links: [55:D.sticker_type_02, 55:E.attach_08, 55:F.shape_08, 56:F.sticker_branch_02_hand_drawn_hybrid]
  anchor_target: micro_caption_01 左侧下缘与 M03 受力方向之间
  anchor_reason: caption 需要有物理尾巴连接动作，不再是单独浮字。
  attachment_relation: caption_relation_attached
  sticker_type: hand_drawn_caption_plus_sticker_hybrid
  shape_grammar: caption_tail_tick
  shape_derived_from_event: 短尾巴从 caption 下缘斜向接触点，不画箭头，只做手写式压力连接。
  stroke_outline: dark soft under-stroke + off-white outline + muted yellow inner tick
  material_compositing: 跟 caption 阴影共用暗部，不独立发光。
  scale_distance: caption 下缘 10-64px，终点不碰主体。
  motion_signature: 与 caption 同步写入，晚于 contact burst 2 frames 退出。
  caption_relation: caption and tail share anchor; tail does not repeat text meaning
  attention_weight: low
  copy_risk_check: 原创手绘尾巴，不复制参考字体或第三方贴纸。
  bad_pattern_avoided: [floating_ui_layer, sticker_caption_duplicate, caption_as_explanation]
  template_fallback: false
  fallback_if_failed: 删除 tail tick，保留 caption 和 pressure burst。
```

```yaml
sticker_event:
  sticker_id: micro_sticker_03_texture_residual_drag
  time_range: 1.84-2.30s
  sticker_needed: true
  analysis_asset_ids: [44, 47, 50, 53, 59]
  reference_rule_links: [55:D.sticker_type_04, 55:E.attach_03, 55:F.shape_03, 56:F.sticker_branch_04_motion]
  anchor_target: M06 金属线条切入方向
  anchor_reason: M03 contact 退出到 M06 texture 时需要极低权重残留，不新增说明字幕。
  attachment_relation: motion_direction_attached
  sticker_type: residual_motion_drag
  shape_grammar: short_motion_smear
  shape_derived_from_event: 两条短 smear 顺金属线条切走，表示压力余波，而不是新贴纸事件。
  stroke_outline: dim charcoal edge + low opacity cream core
  material_compositing: low opacity, quickly absorbed by metal texture
  scale_distance: 贴近 M06 左中金属线条 12-30px
  motion_signature: 2 frame appear, 8 frame slide, 4 frame vanish
  caption_relation: no caption in M06; residual drag prevents previous burst feeling abruptly pasted
  attention_weight: low
  copy_risk_check: 原创低权重线条，无参考复制。
  bad_pattern_avoided: [quantity_as_quality, floating_ui_layer, caption_as_explanation]
  template_fallback: false
  fallback_if_failed: 删除 residual drag，M06 保持 no-sticker exit。
```

## 8. Conflict Resolution

| check | resolution |
|---|---|
| big_caption_vs_subject | caption 左下斜放，避开接触点和主体手臂；字体大但时间短。 |
| sticker_vs_subject | pressure burst 靠近接触点但短停，并用暗色遮罩制造“被器械压住”的感觉。 |
| caption_vs_sticker_duplicate | caption 写人声反应“顶一下”，sticker 写接触冲击，语义不复述。 |
| sticker_vs_caption_occlusion | caption tail tick 低权重，pressure burst 与 caption 分区。 |
| density_check | 1.9s 动作段只保留 1 条 caption 和 2 个附属标点；M06 只留 residual drag。 |
| copy_risk_check | 所有文本、线条和标点均原创；不使用参考视频素材、第三方 UI、品牌包装或原字体。 |
| template_fallback | `false` |

## 9. Technical Validation

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

output_video_metadata: `3.050667s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true`

## 10. Review Pack

- review_pack_path: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/`
- manifest: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/probe_manifest.json`
- evidence_map: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/caption_sticker_evidence_map.json`
- before_contact_sheet: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/before_contact_sheet.jpg`
- after_contact_sheet: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/after_contact_sheet.jpg`
- comparison_contact_sheet: `tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack/before_after_contact_sheet.jpg`
- evidence_frames: `13`

## 11. Failure Routing

| failure | route |
|---|---|
| caption still floats | 降级为 smaller attached phrase，保留 contact burst。 |
| pressure burst still component-like | 删除 pressure burst，仅保留 caption tail tick；不得换模板火花。 |
| sticker covers subject | 缩小到 low-weight contact tick 或删除。 |
| residual drag distracts from M06 | 删除 residual drag，M06 保持 no-sticker exit。 |
| copy risk found by user | 删除对应 text / mark，不用替代参考文案。 |

## 12. Do Not Claim

- 不得声明 `publish-ready`。
- 不得声明 `video_fixed`。
- 不得声明 `vlog director capability verified`。
- 不得声明 18 秒完整正片候选已重新生成。
- 不得把技术验证通过写成用户审美通过。

## 13. Remaining User Review Points

- 待验证：`顶一下` 这条原创短句是否符合用户想要的语气。
- 待验证：pressure burst 是否比原 contact flash 更像附着在器械接触点上。
- 待验证：caption tail 是否自然，还是仍显得像额外画上去的线。
- 待验证：M06 residual drag 是否有帮助，还是应该直接无贴纸退出。
- 待验证：该微段方向若通过，是否迁移回 18 秒候选的同类动作段。
