# 字幕贴纸视觉语言判断路由器

## A. status（状态）

| field | value |
|---|---|
| task_type | `caption_sticker_visual_language_decision_router_build` |
| source_inventory | `54_解析资产全量索引_analysis_asset_inventory.md` |
| migration_library | `55_参考视觉语言迁移库_reference_visual_language_migration_library.md` |
| content_status | `caption_sticker_visual_language_decision_router_completed_pending_gpt_user_review` |
| video_rendered_this_round | `false` |
| remotion_timeline_changed_this_round | `false` |
| generation_api_called_this_round | `false` |
| runtime_asset_commit_allowed_this_round | `false` |

已确认：本路由器用于后续字幕、贴纸、视觉标点执行前判断，不用于本轮修片或重剪。

已确认：路由器的核心任务是阻断“只套模板 / 只加数量 / 只做组件展示”的路径。

待验证：本路由器需要在后续真实执行任务中调用并回审，不能把文件创建写成多案例验证通过。

## B. required_input_fields（必需输入字段）

后续每个镜头或事件进入字幕 / 贴纸 / 视觉标点判断前，必须提供以下字段；缺少关键字段时不得直接执行。

| field | required | description |
|---|---|---|
| `task_type` | yes | 当前任务类型：机制、probe、正片候选、审计或局部重剪。 |
| `shot_id` | yes | 镜头或事件 ID。 |
| `time_range` | yes | 当前镜头或事件时间范围。 |
| `material_or_source` | yes | 当前素材或 reference 来源；参考视频不能写成本项目素材资产。 |
| `visual_event` | yes | 画面里发生了什么。 |
| `primary_subject` | yes | 主体是人、物件、器械、场景、影子、文字或留白。 |
| `action_or_state` | yes | 主体动作、静止、显露、接触、移动、呼吸点等。 |
| `camera_motion` | recommended | 推拉摇移、手持、静止、切点等。 |
| `composition_and_safe_area` | yes | 主体位置、留白、字幕安全区、贴纸可用区域。 |
| `background_density` | yes | 干净 / 中等 / 复杂。 |
| `visual_energy` | yes | 高能动作 / 中段推进 / 呼吸 / 收束。 |
| `bgm_section_or_energy` | recommended | BGM 粗情绪和能量段；不得写精准人工卡点。 |
| `caption_existing_or_needed` | yes | 当前是否已有字幕、是否需要文字层。 |
| `sticker_existing_or_needed` | yes | 当前是否已有贴纸、是否需要视觉标点。 |
| `reference_rule_links` | yes | 来自 `54 / 55` 的文件和规则 ID。 |
| `copy_risk_items` | yes | 平台 UI、品牌、原文案、原字体、包装、第三方贴纸风险。 |
| `user_explicit_constraints` | yes | 用户明确要 / 不要的模块。 |
| `output_context` | yes | 输出是报告、probe、style sheet、正片候选还是审片包。 |

缺少 `visual_event / primary_subject / action_or_state / reference_rule_links / copy_risk_items` 任一项：

```yaml
router_status: blocked_required_router_input_missing
route_back_to: video_event_table_or_reference_rule_link
```

## C. route_order（判断顺序）

```text
1. workspace / task boundary
2. source inventory and migration library read check
3. copy risk check
4. event clarity check
5. visual density and attention budget check
6. caption need check
7. sticker or visual punctuation need check
8. caption / sticker relation check
9. shape and attachment derivation check
10. motion and material check
11. template fallback check
12. output permission check
```

## D. router_core_decision_tree（核心决策树）

| step | question | if_yes | if_no |
|---|---|---|---|
| `gate_01` | 是否已读取 `54 / 55 / 56`？ | 继续。 | `blocked_reference_visual_language_preflight_missing` |
| `gate_02` | 当前任务是否允许修改视频 / render？ | 按任务边界继续。 | 只能生成机制、报告、审计或 style sheet。 |
| `gate_03` | reference 来源是否存在 copy risk？ | 只抽象机制，禁止复制；高风险时不生成对应形状。 | 继续。 |
| `gate_04` | 当前镜头事件是否清楚？ | 进入 caption / sticker 判断。 | `no_caption_no_sticker_or_blocked_event_unclear` |
| `gate_05` | 画面是否已有强主视觉？ | 降低字幕 / 贴纸权重或不使用。 | 可考虑视觉语言层。 |
| `gate_06` | 字幕是否能服务节奏、语气或锚点？ | 选择 caption branch。 | 进入 sticker / no-layer 判断。 |
| `gate_07` | 贴纸或视觉标点是否有锚点？ | 选择 sticker / punctuation branch。 | 不贴，并写 `sticker_needed=false_reason`。 |
| `gate_08` | 字幕和贴纸是否会抢焦点？ | 执行 conflict resolver。 | 继续。 |
| `gate_09` | 形状是否能从事件长出？ | 继续材质和动效判断。 | `template_fallback=true` |
| `gate_10` | 输出是否为成片候选且 `template_fallback=true`？ | blocked，不得进入成片候选。 | 机制或 probe 可记录 fallback 并回退。 |

## E. caption_router（字幕路由）

| branch_id | condition | caption_decision | required_fields | source_rule | failure_route |
|---|---|---|---|---|---|
| `caption_branch_01_hero_keyword` | 开头、动作峰值、段落主情绪、留白可承载大字。 | 使用 `hero_keyword`。 | `text / anchor_target / position_mode / attention_weight / entry_hold_exit / copy_risk_check` | `55:H.caption_01` | `caption_visual_language_library` |
| `caption_branch_02_attached_phrase` | 文本需要贴近器械、物件、动作、边缘。 | 使用 `attached_phrase`。 | `picture_relation / safe_area / caption_sticker_relation` | `55:H.caption_02` | `video_event_table` |
| `caption_branch_03_whisper_caption` | 呼吸点、暗段、收束、低权重语气。 | 使用 `whisper_caption`。 | `low_attention_reason / bgm_section_or_energy` | `55:H.caption_03` | `attention_budget` |
| `caption_branch_04_poster_title_stack` | typography-led 路线，文字承担剪辑节奏。 | 使用 `poster_title_stack`。 | `hierarchy / text_density / position_variation` | `55:H.caption_04` | `caption_hierarchy_judgement` |
| `caption_branch_05_hand_drawn_reaction_word` | 主体 / 物件有轻反应，手写字比普通字幕更贴画面。 | 使用 `hand_drawn_reaction_word`。 | `stroke_style / attachment_relation / copy_risk_check` | `55:H.caption_05` | `copy_risk_judgement` |
| `caption_branch_06_utility_micro_caption` | 信息必须存在但不能抢主体。 | 使用 `utility_micro_caption`。 | `minimum_text / safe_position / reason` | `55:H.caption_06` | `caption_mood_judgement` |
| `caption_branch_07_no_caption` | 画面 / BGM / 贴纸已足够，字幕会破坏节奏。 | 不出字幕并写原因。 | `no_caption_reason / alternate_layer` | `55:H.caption_07` | `caption_need_check` |

字幕强制规则：

- 若没有用户正式文案，必须标 `draft_text_pending_user_review`。
- 不得复制参考文案、字体、平台 UI、搜索尾卡。
- 不得全片固定 lower-third，除非有明确风格理由且仍需位置变化说明。
- 正片候选若全片没有文本层，必须回到完整交付闸门或写 blocked。

## F. sticker_visual_punctuation_router（贴纸 / 视觉标点路由）

| branch_id | condition | decision | required_fields | source_rule | failure_route |
|---|---|---|---|---|---|
| `sticker_branch_01_typography_led` | 字幕本身是视觉主标点。 | 使用 `typography_driven_visual_punctuation`，贴纸降权或不贴。 | `caption_type / attention_weight / no_sticker_reason` | `55:D.sticker_type_01` | `caption_sticker_relation` |
| `sticker_branch_02_hand_drawn_hybrid` | 手写字和小贴纸共享锚点。 | 使用 `hand_drawn_caption_plus_sticker_hybrid`。 | `caption_relation / shape_family / stroke_outline` | `55:D.sticker_type_02` | `shape_drawing_logic` |
| `sticker_branch_03_contact` | 有清楚接触点或动作峰值。 | 使用 `contact_flash`。 | `contact_point / scale_distance / entry_hold_exit` | `55:D.sticker_type_03` | `anchor_target` |
| `sticker_branch_04_motion` | 有移动方向、影子、手势、器械方向。 | 使用 `motion_trail_punctuation`。 | `motion_direction / offset / trail_shape` | `55:D.sticker_type_04` | `motion_direction_offset` |
| `sticker_branch_05_edge` | 主体 / 器械 / 场景边缘清楚。 | 使用 `edge_attached_short_stroke_cluster`。 | `edge_target / stroke_variation / density` | `55:D.sticker_type_05` | `attachment_relation` |
| `sticker_branch_06_surface` | 物件表面清楚且无 copy risk。 | 使用 `surface_micro_mark_or_face`。 | `surface_target / perspective / copy_risk_check` | `55:D.sticker_type_06` | `copy_risk_judgement` |
| `sticker_branch_07_breath` | 呼吸点或留白需要低权重提示。 | 使用 `negative_space_breath_line`。 | `negative_space_reason / max_attention_weight` | `55:D.sticker_type_07` | `attention_budget` |
| `sticker_branch_08_caption_micro` | caption 需要轻微语气辅助。 | 使用 `caption_relation_micro_mark`。 | `caption_id / shared_anchor / duplicate_check` | `55:D.sticker_type_08` | `caption_sticker_relation` |
| `sticker_branch_09_object_personification` | 小物件可轻微人格化。 | 使用 `object_personification_mark`。 | `object_surface / persona_reason / copy_risk_check` | `55:D.sticker_type_09` | `copy_risk_judgement` |
| `sticker_branch_10_reveal` | 主体从遮挡或边界显露。 | 使用 `reveal_boundary_peek_mark`。 | `reveal_boundary / entry_window` | `55:D.sticker_type_10` | `shape_drawing_logic` |
| `sticker_branch_11_transition_edge` | 段落切换需要轻视觉标点。 | 使用 `transition_edge_punctuation`。 | `transition_function / direction / not_masking_bad_cut` | `55:D.sticker_type_11` | `transition_function_judgement` |
| `sticker_branch_12_no_sticker` | 无锚点、caption 足够、画面太乱或风险高。 | 不贴并写原因。 | `sticker_needed=false_reason / alternate_layer` | `55:D.sticker_type_12` | `sticker_need_check` |

贴纸强制规则：

- 每个 `sticker_needed=true` 必须写 `anchor_target`、`attachment_relation`、`shape_grammar`、`stroke_outline`、`scale_distance`、`motion_signature`、`caption_relation`、`copy_risk_check`。
- 只有 x / y / color / component_name 的贴纸计划一律视为 `template_fallback=true`。
- 形状不能从事件长出时，不得通过换色、放大或加数量补救。

## G. caption_sticker_conflict_resolver（字幕 / 贴纸冲突处理）

| conflict | symptom | resolver | route_back_to |
|---|---|---|---|
| `two_primary_visuals` | 大字和贴纸同时抢主体。 | 保留更贴锚点的一方，另一方降权或删除。 | `attention_budget` |
| `duplicate_meaning` | 字幕和贴纸表达同一句话。 | caption 写语气，sticker 画反应，或只留一种。 | `caption_sticker_relation` |
| `caption_blocks_action` | 字幕压住动作点。 | 换 `attached_phrase` 或 `whisper_caption`，避开动作点。 | `composition_safe_area` |
| `sticker_blocks_caption` | 贴纸压字幕。 | 贴纸变成 caption edge micro mark 或删除。 | `caption_relation_attached` |
| `visual_density_too_high` | 画面、字幕、贴纸、转场同时很满。 | 降低一层或进入 `neither`。 | `visual_density_gate` |
| `copy_risk_conflict` | 最贴近的形状会接近参考原图 / UI。 | 只保留抽象机制，改 shape 或不贴。 | `copy_risk_judgement` |

## H. output_permission_matrix（输出许可矩阵）

| output_context | template_fallback=false | template_fallback=true |
|---|---|---|
| `mechanism_report` | 可输出规则。 | 可输出 fallback 诊断，但必须写待补规则。 |
| `style_sheet_probe` | 可做静态方案。 | 只能做对比问题板，不得当候选方案。 |
| `small_scope_remotion_probe` | 可做局部 probe。 | blocked，先回 style sheet 或规则补全。 |
| `full_video_candidate` | 可进入成片候选前置计划。 | blocked，不得进入成片候选。 |
| `review_pack` | 可生成审片证据。 | 只能生成诊断证据，不能写成通过。 |

## I. copy_risk_gate（复制风险闸门）

| risk | route |
|---|---|
| `platform_ui_or_account` | 禁止复制；只抽象为“信息层 / 尾卡功能”。 |
| `brand_or_packaging` | 禁止复制；必要时裁切、避让或不做 surface mark。 |
| `original_caption_text` | 禁止复制；使用原创短句并标草案待审。 |
| `original_font_or_handwriting` | 禁止复刻；只抽象粗描边、手写不均、层级关系。 |
| `third_party_sticker_shape` | 禁止临摹；只抽象附属关系和角色。 |
| `generated_image_without_alpha` | 不能直接当 overlay sticker；回到资产适配或 Remotion 原创绘制。 |

copy risk 高时：

```yaml
copy_risk_status: high
allowed_action: abstract_mechanism_only
forbidden_action: copy_surface_or_asset
```

## J. template_fallback_gate（模板 fallback 闸门）

`template_fallback` 判断：

| check | pass | fallback |
|---|---|---|
| `source_rule_link` | 写出 `54` asset id 和 `55` rule id。 | 只说“按之前风格”。 |
| `anchor_target` | 锚点能在画面事件中找到。 | 只有位置坐标。 |
| `attachment_relation` | 能说明贴在哪里、附属于什么。 | 漂浮 UI。 |
| `shape_grows_from_event` | 形状由事件推导。 | 模板换色 / 换尺寸。 |
| `caption_sticker_relation` | 两者分工清楚。 | 两者互相复述或抢焦点。 |
| `copy_risk_check` | 明确禁止复制项。 | 接近参考原物。 |

fallback 输出格式：

```yaml
template_fallback: true
fallback_reason:
route_back_to:
required_fix:
full_video_candidate_allowed: false
```

## K. router_output_schema（路由器输出字段）

后续每个镜头 / 事件至少输出：

```yaml
visual_language_decision:
  shot_id:
  time_range:
  reference_rule_links:
  analysis_asset_ids:
  event_summary:
  caption_decision:
    needed:
    caption_type:
    text_status:
    anchor_target:
    position_mode:
    attention_weight:
    entry_hold_exit:
    copy_risk_check:
  sticker_or_visual_punctuation_decision:
    needed:
    sticker_type:
    attachment_relation:
    shape_grammar:
    stroke_outline:
    scale_distance:
    motion_signature:
    caption_relation:
    copy_risk_check:
  conflict_resolution:
  template_fallback:
  decision_status:
  failure_route:
```

允许的 `decision_status`：

- `routed_ready_for_plan`
- `routed_ready_for_style_sheet`
- `routed_ready_for_probe`
- `routed_no_layer_with_reason`
- `blocked_required_router_input_missing`
- `blocked_copy_risk`
- `blocked_template_fallback`
- `blocked_visual_density_conflict`

## L. no_layer_rule（不使用字幕 / 贴纸 / 视觉标点规则）

允许什么都不用的条件：

1. 画面主事件已经足够清楚。
2. 字幕会破坏呼吸或遮挡主体。
3. 贴纸没有锚点。
4. 画面密度太高。
5. copy risk 高。
6. 当前段落由剪辑、BGM 或素材本身承担功能。

必须写：

```yaml
caption_needed: false
sticker_needed: false
visual_punctuation_needed: false
no_layer_reason:
alternate_storytelling_layer:
```

正片候选全片层面仍需完整模块检查；局部镜头 `no_layer` 不等于全片可以没有字幕或视觉标点方案。

## M. failure_routing_map（失败回路表）

| possible_failure | symptom | route_back_to | required_fix | forbidden_fix |
|---|---|---|---|---|
| `reference_rule_missing` | 说不出来自哪个规则。 | `54 / 55` | 补 `analysis_asset_id` 和 `reference_rule_link`。 | 说“参考之前”。 |
| `event_unclear` | 镜头事件说不清。 | `video_event_table` | 补 shot / event / subject / action。 | 直接贴。 |
| `caption_flat` | 字幕像说明牌或占位。 | `caption_visual_language_library` | 选 hero / attached / whisper 等类型。 | 固定 lower-third。 |
| `sticker_floaty` | 贴纸浮在画面上。 | `attachment_relation_library` | 重新选择附属关系和距离。 | 调 x/y。 |
| `shape_template` | 形状像组件。 | `shape_drawing_logic_library` | 说明 shape grows from event。 | 换颜色。 |
| `stroke_too_clean` | 像工程 SVG。 | `stroke_material_motion_library` | 增加描边、粗糙边、前景层。 | 放大贴纸。 |
| `caption_sticker_conflict` | 字幕和贴纸抢焦点。 | `caption_sticker_conflict_resolver` | 重新分配主次。 | 同时加粗。 |
| `copy_risk_high` | 接近原字体 / 原贴纸 / UI。 | `copy_risk_gate` | 抽象机制或删除。 | 手动临摹。 |
| `template_fallback_detected` | 只能套模板。 | `template_fallback_gate` | 回到规则补全或 style sheet。 | 进入成片候选。 |

## N. future_execution_gate（未来执行闸门）

后续任何任务若包含以下关键词之一：

- 字幕
- 贴纸
- 视觉标点
- 对标
- 参考视频
- visual language
- vlog / odd 正片候选
- style sheet
- Remotion 贴纸 probe

必须先读取 `54 / 55 / 56`，并在报告或桥接包写：

```yaml
migration_library_used: true
decision_router_used: true
router_output_schema_completed: true
template_fallback:
copy_risk_check:
```

未写则：

```yaml
blocked_reason: blocked_decision_router_not_used
route_back_to: 56
```

## O. next_goal（下一个目标）

`future_caption_sticker_visual_punctuation_tasks_must_use_decision_router`
