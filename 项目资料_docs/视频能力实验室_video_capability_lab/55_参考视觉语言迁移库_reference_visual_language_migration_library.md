# 参考视觉语言迁移库

## A. status（状态）

| field | value |
|---|---|
| task_type | `reference_visual_language_migration_library_build` |
| source_inventory | `54_解析资产全量索引_analysis_asset_inventory.md` |
| decision_router | `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md` |
| content_status | `reference_visual_language_migration_library_completed_pending_gpt_user_review` |
| video_rendered_this_round | `false` |
| remotion_timeline_changed_this_round | `false` |
| generation_api_called_this_round | `false` |
| runtime_asset_commit_allowed_this_round | `false` |

已确认：本库迁移的是“判断能力、视觉语言、规则和失败回路”，不是迁移参考视频素材、第三方贴纸图、平台 UI、原字体、原文案或品牌资产。

已确认：本库的目的不是给 Codex 一组固定模板，而是让后续执行前能说明“为什么此镜头该用大字 / 小字 / 手写字 / 贴纸 / 视觉标点 / 什么都不用”。

待验证：本库需要后续多案例调用和人工回审；不能把库文件存在写成视觉语言已经稳定成立。

## B. source_asset_index（来源资产索引）

| source_group | source_files | reusable_signal |
|---|---|---|
| `reference_to_execution_contract` | `09`、`codex_source/13` | 参考解析必须转成 `reference_anchor / effect_targets / function_fields / deviation_check / done_when`，不能只写观感总结。 |
| `early_vlog_reference_analysis` | `11 / 16 / 15 / 18 / 20` | street micro-cuts、shadow opening、object inserts、product / location title、guided split-screen 等只能抽象机制，不能复制素材。 |
| `caption_sticker_audit_chain` | `21 / 22 / 23 / 25 / 26` | 字幕 / 贴纸必须回到 video_event_table、visual_selection_table 和 hard fail gate。 |
| `judgement_and_asset_route` | `28 / 29 / 30 / 31` | 先读 judgement library，再进视觉语言到资产规格；没有来源就不得套组件。 |
| `sticker_anchor_chain` | `39 / 40 / 41 / 42 / 43 / 44 / 45 / 46` | 贴纸由 video anchor、attachment relation、shape grammar、stroke、material、motion、review frames 决定。 |
| `caption_sticker_diversity_chain` | `53` | 参考 1 偏 typography-led；参考 2 偏 hand-drawn caption + sticker hybrid；当前单一感来自字幕 / 贴纸都缺少多锚点、多层级。 |
| `bgm_and_material_context` | `47 / 48 / 49 / 50 / 52` | BGM / 素材只作为情绪、节奏、视觉密度和失败回路输入，不作为精准卡点或素材终审。 |
| `api_asset_safety` | `32-38` | provider 连接、无水印、单图干净都不等于 overlay 贴纸可用；缺 alpha / 风格不符 / copy risk 仍需 blocked 或回退。 |

## C. transferable_vs_non_transferable（可迁移 / 不可迁移边界）

| layer | transferable | non_transferable |
|---|---|---|
| `reference_video` | 镜头功能、字幕密度、贴纸出现条件、节奏关系、失败标准。 | 视频文件本身、人物脸、品牌、平台 UI、账号、原字幕、原字体、原贴纸。 |
| `caption` | 字幕层级、位置变化、语气角色、与画面锚点关系。 | 原文案、原语言、原字形、平台搜索尾卡、商业标识。 |
| `sticker` | 附属关系、形状从事件长出的逻辑、描边 / 材质 / 动效规则。 | 第三方贴纸原图、粉色花形原样、IP 表情、品牌包装图案。 |
| `visual_punctuation` | 视觉标点的 attention weight、出现时机、留白与动作关系。 | 把对标 UI 或活动物料原样移植。 |
| `BGM` | 粗情绪、能量曲线、呼吸点、转场节奏提示。 | 自动分析写成精准人工卡点。 |
| `probe` | start / mid / exit 审片字段、contact sheet 证据。 | 把 probe 通过写成最终视觉通过。 |

## D. sticker_type_library（贴纸 / 视觉标点类型库）

| sticker_type_id | type | source_files | when_to_use | when_not_to_use | drawing_logic | attachment_relation | motion_signature | caption_relation | copy_boundary |
|---|---|---|---|---|---|---|---|---|---|
| `sticker_type_01` | `typography_driven_visual_punctuation` | `53 / 21 / 29` | 画面有强留白、街拍碎片、段落推进需要文字参与节奏。 | 文本只是说明画面，或主体已经被大字遮挡。 | 大字 / 中字 / 小字从画面锚点和情绪重心长出来。 | `caption_relation_attached`、`negative_space_attached` | cut-in、短停、随镜头退场。 | 字幕即视觉标点，贴纸应降权或不贴。 | 不复制参考字词、字体、平台尾卡。 |
| `sticker_type_02` | `hand_drawn_caption_plus_sticker_hybrid` | `53 / 44 / 45` | 画面有主体、物件或动作，需要手写反应和小标点一起成立。 | 没有明确锚点，只想让画面热闹。 | 粗描边手写词 + 小形状标点，二者共享锚点但不重复语义。 | `caption_relation_attached`、`contact_point_attached`、`surface_attached` | pop + slight drift + quick exit。 | caption 给语气，sticker 给反应。 | 不临摹参考手写字、粉色图形或原文。 |
| `sticker_type_03` | `contact_flash` | `40 / 41 / 44 / 53` | 手触、器械发力、物件相碰、动作峰值清楚。 | 接触点被挡、主体太小、动作不清。 | 1-3 个短促火花 / 折线 / 微闪，贴近接触点。 | `contact_point_attached` | 2-6 frame 入场，8-18 frame 停留，快速消失。 | 字幕不要解释同一个接触动作。 | 不用促销爆点形状。 |
| `sticker_type_04` | `motion_trail_punctuation` | `44 / 53 / 47` | 有手势、影子、脚步、器械方向或视线移动。 | 静态远景、轨迹不可见。 | 沿运动方向放错帧短线 / 点 / 手绘轨迹。 | `motion_direction_attached` | staggered reveal、短停、跟镜头切走。 | caption 可做低权重旁白，不能抢轨迹。 | 不把轨迹画成通用箭头。 |
| `sticker_type_05` | `edge_attached_short_stroke_cluster` | `43 / 44 / 45` | 主体边缘、器械边缘、海天边缘、遮挡边界清楚。 | 只是在空处填装饰。 | 2-5 个粗细不均的短笔触，沿真实边缘方向。 | `edge_attached`、`reveal_boundary_attached` | hand-draw reveal 或轻弹入。 | 大字出现时减少笔触密度。 | 不用固定黄线组件。 |
| `sticker_type_06` | `surface_micro_mark_or_face` | `39 / 44 / 53` | 杯身、小物件、玩具、墙面等表面清楚且无品牌风险。 | 表面含品牌、包装、IP 或透视太复杂。 | 小眼睛、嘴角、短反应线或微 wobble，遵守表面透视。 | `surface_attached`、`object_personification_attached` | soft breath、micro wobble。 | caption 可在旁边，不能把文字贴成标签牌。 | 不复制包装或第三方表情。 |
| `sticker_type_07` | `negative_space_breath_line` | `44 / 47 / 52 / 53` | 呼吸点、海天、暗路、留白段需要低权重视觉呼吸。 | 留白已经成立，或贴纸会破坏安静。 | 极轻线条、短 tick、细小手绘线，保持低 attention weight。 | `negative_space_attached` | slow reveal、soft hold。 | caption 也应低权重，二者不可同时强。 | 不把静态留白画成装饰背景。 |
| `sticker_type_08` | `caption_relation_micro_mark` | `21 / 44 / 53` | caption 与画面锚点明确，需要小标点辅助语气。 | caption 已经足够强，或贴纸会让画面拥挤。 | caption 边缘短 tick、微字泡、下划短线，不复述 caption。 | `caption_relation_attached` | 与 caption entry 有粗同步，不写精准卡点。 | 贴纸是语气，不是第二字幕。 | 不把参考 UI 标签到画面上。 |
| `sticker_type_09` | `object_personification_mark` | `39 / 44 / 53` | 物件是叙事主体，可产生轻微人格化反应。 | 人物主线严肃、品牌 / IP 风险高。 | 微表情、小反应字、短线表情，从物件表面长出。 | `object_personification_attached` | micro wobble、soft hold。 | caption 不解释“它很可爱”，只留短语气。 | 不复制 IP、包装、原表情。 |
| `sticker_type_10` | `reveal_boundary_peek_mark` | `40 / 41 / 44` | 主体从遮挡、门框、叶缘、画面边界显露。 | 没有 reveal 或显露主体不清。 | 半圈、断点圈、peek 眼神线沿显露边界。 | `reveal_boundary_attached` | reveal-linked pop。 | caption 可晚一点出现，避免同时抢显露。 | 不画成审片圈注。 |
| `sticker_type_11` | `transition_edge_punctuation` | `22 / 29 / 44 / 49` | 转场边缘、段落切换、BGM 能量换段需要轻提示。 | 只是为了遮硬切；画面关系不成立。 | 边缘短划、扫入线、分隔小点，跟转场方向一致。 | `scene_edge_attached` | cut-through、edge wipe feel。 | caption 若是段落标题，贴纸降权。 | 不套平台转场 UI。 |
| `sticker_type_12` | `no_sticker_or_no_visual_punctuation` | `23 / 41 / 44 / 56` | 无锚点、画面已经完整、copy risk 高、字幕已足够。 | 不能用来偷懒跳过必需模块；正片候选仍需在全片层面有视觉语言方案。 | 不生成形状。 | `none` | none | caption 或剪辑承担功能。 | 不因“没想到”而省略，必须写原因。 |

## E. attachment_relation_library（附属关系库）

| relation_id | relation | source_files | definition | use_signal | failure_if_wrong | route_back_to |
|---|---|---|---|---|---|---|
| `attach_01` | `edge_attached` | `44 / 45` | 附着在主体、器械、云边、海边、叶缘等真实边缘。 | 边缘清楚，贴纸提示轮廓或显露。 | 漂浮在空白处。 | `attachment_relation` |
| `attach_02` | `contact_point_attached` | `40 / 41 / 44` | 附着在手触、器械发力、物件相碰等接触点。 | 动作峰值清楚。 | 接触点不可见仍硬贴火花。 | `anchor_target` |
| `attach_03` | `motion_direction_attached` | `44 / 53` | 沿动作方向、轨迹或视线转移附着。 | 轨迹可见。 | 点线与运动方向相反或无方向。 | `motion_direction_offset` |
| `attach_04` | `surface_attached` | `44 / 53` | 像贴在杯身、墙面、票据、小物件表面。 | 表面可读且无品牌风险。 | 像浮层，不遵守透视。 | `copy_risk + material_compositing` |
| `attach_05` | `object_personification_attached` | `39 / 44` | 让小物件产生轻微反应。 | 物件是画面主体或情绪点。 | 变成第三方表情贴纸。 | `copy_risk` |
| `attach_06` | `reveal_boundary_attached` | `41 / 44` | 附着在遮挡 / 显露边界。 | 主体从边界出现。 | 画成审片标注圈。 | `shape_grammar` |
| `attach_07` | `negative_space_attached` | `44 / 53` | 附着在留白、呼吸点、构图空隙。 | 需要低权重呼吸。 | 留白被破坏。 | `attention_weight` |
| `attach_08` | `caption_relation_attached` | `21 / 44 / 53` | 与 caption 共享画面锚点，辅助语气。 | caption 指向明确且需要轻反应。 | caption 和 sticker 抢焦点。 | `caption_sticker_relation` |
| `attach_09` | `scene_edge_attached` | `22 / 49` | 附着在镜头切换、段落边缘或画面边界。 | 结构推进需要视觉标点。 | 变成遮丑转场。 | `transition_function_judgement` |
| `attach_10` | `typography_anchor_attached` | `53` | 字体本身成为锚点，贴纸围绕字的边缘或不贴。 | 大字参与构图。 | 大字 + 贴纸同时过强。 | `caption_visual_language` |

## F. shape_drawing_logic_library（图案 / 形状生成逻辑）

| shape_id | shape | grows_from | drawing_rule | not_allowed | source_files |
|---|---|---|---|---|---|
| `shape_01` | `short_stroke_cluster` | edge / motion / attention shift | 2-5 个短笔触，长度和粗细不一致，沿主体边缘或运动方向。 | 当通用爆炸贴、促销贴、固定黄线。 | `43 / 44 / 45` |
| `shape_02` | `contact_flash` | contact point / action peak | 1-3 个短促火花，离接触点 8-36px，不挡接触本身。 | 没有接触点也硬贴。 | `40 / 41 / 44` |
| `shape_03` | `motion_trail_punctuation` | visible trajectory | 点、短线、错帧轨迹顺运动方向排列。 | 画成箭头说明。 | `44 / 53` |
| `shape_04` | `half_ring_peek_mark` | reveal boundary | 断点半圈沿遮挡边界，不完整圈住主体。 | 像审片圈注或标注圈。 | `41 / 44` |
| `shape_05` | `surface_face_mark` | object surface | 小眼、嘴角、短表情线遵守表面透视。 | 复制品牌包装或 IP 表情。 | `39 / 44` |
| `shape_06` | `edge_wiggle` | soft edge / breath edge | 极短波动线沿云边、海边、主体轮廓。 | 贴空天、空沙面。 | `44` |
| `shape_07` | `micro_word_bubble` | caption relation / contact point | 1-2 个原创短字或拟声，像反应不是说明牌。 | 长句、解释画面、复制参考词。 | `44 / 53` |
| `shape_08` | `hero_keyword_block` | typography-driven beat | 大字作为视觉主事件，字重 / 位置 / 大小由画面留白决定。 | 固定 lower-third 或原字体复刻。 | `53 / 21` |
| `shape_09` | `whisper_line_or_tick` | low energy breath point | 细线、小 tick、极轻下划，保持低 attention weight。 | 呼吸段硬加高对比贴纸。 | `53 / 47` |
| `shape_10` | `no_shape` | no anchor / high risk | 不画，记录 `sticker_needed=false` 或 `visual_punctuation_needed=false`。 | 为了数量硬塞。 | `23 / 41 / 44` |

形状生成顺序：

```text
visual_event
-> anchor_target
-> attachment_relation
-> shape_family
-> stroke_outline
-> scale_distance
-> motion_signature
-> caption_relation
-> copy_risk_check
```

如果无法说清 `grows_from`，必须标记 `template_fallback=true` 并回到规则补全；不得进入成片候选。

## G. stroke_material_motion_library（描边 / 材质 / 动效库）

| layer | rule | evidence_source | failure_route |
|---|---|---|---|
| `stroke_outline` | 背景复杂时用黑内线 + 白外轮廓或轻阴影；背景干净时降低对比。 | `43 / 44` | `stroke_outline_system` |
| `stroke_variation` | 线条需要轻微粗细变化、断点、圆角不均，避免工程感。 | `43 / 44 / 53` | `shape_drawing_logic` |
| `material_compositing` | 贴纸要有压在真实画面上的前景层，不能只靠 opacity。 | `43 / 44` | `material_compositing_rule` |
| `scale_distance` | 贴纸必须贴近主体、边缘、动作点、轨迹或 caption，不靠坐标漂浮。 | `44 / 45` | `attachment_relation` |
| `entry_motion` | 大字 4-8 frames，贴纸 2-6 frames，呼吸线 8-14 frames。 | `53` | `motion_signature` |
| `hold_motion` | 大字短停，小贴纸短停，呼吸线轻停；mid frame 必须可审。 | `45 / 46 / 53` | `review_pack_gate` |
| `exit_motion` | 跟 shot cut 或事件结束退出，不跨无关镜头。 | `42 / 46 / 53` | `event_window` |

## H. caption_visual_language_library（字幕视觉语言库）

| caption_type_id | caption_type | source_files | when_to_use | visual_rule | sticker_relation | not_allowed |
|---|---|---|---|---|---|---|
| `caption_01` | `hero_keyword` | `53 / 21` | 开头、动作峰值、段落主情绪需要一眼抓住。 | 大字号、强字重、位置可居中 / 斜向 / 贴留白；只用原创短词。 | 贴纸降权或围绕字边缘做微标点。 | 全片固定 lower-third、复制参考字。 |
| `caption_02` | `attached_phrase` | `53 / 44` | 文本需要贴近器械、物件、人物动作或画面边缘。 | 中等字号，随锚点变化位置。 | 可配 caption_relation_micro_mark。 | 只写 role，不写 picture_relation。 |
| `caption_03` | `whisper_caption` | `53 / 47` | 呼吸点、过渡、结尾低权重情绪。 | 小字、留白、低对比、短停留。 | 若有贴纸，只能轻线或不贴。 | 呼吸段硬塞大字。 |
| `caption_04` | `poster_title_stack` | `53 / 16` | 参考 1 式 typography-led 段落。 | 大中小层级叠放，文字参与构图。 | 贴纸通常不需要；视觉标点可为短下划。 | 当营销海报模板套用。 |
| `caption_05` | `hand_drawn_reaction_word` | `53 / 39 / 44` | 主体或物件产生轻反应。 | 粗描边、原创手写感、短字。 | 可和小贴纸共享锚点，但不复述。 | 复刻参考手写字形。 |
| `caption_06` | `utility_micro_caption` | `21 / 23` | 信息必须存在但不能抢主体。 | 小字、稳定、安全区，但仍需锚点。 | 一般不配强贴纸。 | 变成长说明牌。 |
| `caption_07` | `no_caption` | `23 / 56` | 画面或 BGM 已足够，字幕会破坏节奏。 | 不出字幕并写原因。 | 贴纸也需单独判断。 | 因懒省略必需字幕模块；正片任务需全片层面有文本方案。 |

字幕每条必填：

| field | requirement |
|---|---|
| `caption_id` | 唯一 ID。 |
| `time_range` | 出现时间。 |
| `text` | 原创短文本，若无用户文案，标 `draft_text_pending_user_review`。 |
| `caption_type` | 从本节选择。 |
| `anchor_target` | 字幕贴近或响应的画面锚点。 |
| `picture_relation` | 文本与画面关系，不只写段落角色。 |
| `position_mode` | 位置模式，不允许全片固定。 |
| `attention_weight` | 主视觉 / 中权重 / 低权重。 |
| `entry_hold_exit` | 入场、停留、退场帧或粗窗口。 |
| `copy_risk_check` | 不复制参考文案、字体、平台 UI。 |

## I. caption_sticker_relation_library（字幕和贴纸关系库）

| relation_id | relation | use_when | rule | failure_if_wrong |
|---|---|---|---|---|
| `cs_relation_01` | `caption_leads_sticker_supports` | 大字或中字幕是主节奏，贴纸只补语气。 | sticker attention weight 低于 caption。 | 两个主视觉互抢。 |
| `cs_relation_02` | `sticker_leads_caption_supports` | 动作点或物件反应最重要，字幕只给短语气。 | caption 用 whisper 或不出。 | 字幕解释动作导致钝。 |
| `cs_relation_03` | `shared_anchor_split_roles` | caption 和 sticker 指向同一动作 / 物件。 | caption 写语气，sticker 画反应，不能复述。 | 文案和贴纸重复说明。 |
| `cs_relation_04` | `caption_only` | 文本本身已形成视觉标点。 | 不贴或只用微标点。 | 为凑数量硬贴。 |
| `cs_relation_05` | `sticker_only` | 动作需要反应，但字幕会破坏画面。 | 贴纸短停并退出。 | 把贴纸当字幕牌。 |
| `cs_relation_06` | `neither` | 画面已完整或风险高。 | 写不使用理由和替代承载层。 | 静默省略。 |

## J. decision_basis_library（判断依据库）

后续执行必须至少从以下判断中选择并写入 `reference_rule_link`：

| judgement | source_files | question |
|---|---|---|
| `sticker_graphic_judgement` | `29 / 43 / 44` | 形状是否从事件长出，还是模板替换。 |
| `sticker_size_judgement` | `29 / 44 / 45` | 贴纸是否可读、不过大、不漂浮。 |
| `sticker_style_judgement` | `29 / 43 / 53` | 贴纸是否有手感、材质和参考抽象关系。 |
| `caption_mood_judgement` | `29 / 53` | 字幕语气是否服务画面与 BGM，而非占位文案。 |
| `caption_hierarchy_judgement` | `53` | 是否存在 hero / attached / whisper 等层级。 |
| `transition_function_judgement` | `22 / 29 / 49` | 视觉标点是否服务段落转场，而不是遮丑。 |
| `visual_material_fit_judgement` | `27 / 43 / 44` | 线条、描边、材质是否融入真实画面。 |
| `bgm_visual_relation_judgement` | `29 / 47 / 49` | BGM 只作为粗情绪和能量输入，不写精准确认。 |
| `copy_risk_judgement` | `09 / 13 / 32-38 / 53` | 是否涉及第三方资产、平台 UI、原文案、原字体、品牌包装。 |
| `template_fallback_judgement` | `31 / 41 / 44 / 56` | 是否只能说“套模板”。若是，则 blocked 或回到 style sheet。 |

## K. bad_pattern_library（坏模式库）

| bad_pattern | symptom | route_back_to |
|---|---|---|
| `fixed_component_reuse` | 每个视频都用同一贴纸组件。 | `video_event_table + attachment_relation` |
| `quantity_as_quality` | 以贴纸数量替代锚点质量。 | `sticker_needed_reason` |
| `template_shape_swap` | 只换颜色、大小、坐标。 | `shape_drawing_logic` |
| `floating_ui_layer` | 贴纸像浮在画面上的 UI。 | `attachment_relation + material_compositing` |
| `caption_lower_third_lock` | 全片字幕固定 lower-third。 | `caption_visual_language` |
| `caption_as_explanation` | 字幕只说明画面，不参与节奏。 | `caption_mood_judgement` |
| `sticker_caption_duplicate` | 贴纸和字幕表达同一句话。 | `caption_sticker_relation` |
| `copy_reference_surface` | 临摹参考贴纸、字体、文案、平台 UI。 | `copy_risk_judgement` |
| `probe_as_acceptance` | 静态 probe 或技术渲染被写成视觉通过。 | `review_pack_gate` |
| `no_source_rule` | 只说“按之前风格”，没有来源文件和规则 ID。 | `reference_rule_link` |

## L. future_execution_gate（后续执行前闸门）

任何字幕 / 贴纸 / 视觉标点任务，必须在执行前输出：

```yaml
visual_language_preflight:
  source_inventory_read: true
  migration_library_read: true
  decision_router_read: true
  analysis_asset_ids:
  reference_rule_links:
  shot_or_event_table:
  caption_decision:
  sticker_decision:
  visual_punctuation_decision:
  template_fallback:
  copy_risk_check:
  failure_route_if_blocked:
```

缺任一项时：

```yaml
blocked_reason: blocked_reference_visual_language_preflight_missing
route_back_to: 54/55/56
```

## M. template_fallback_rule（模板 fallback 规则）

`template_fallback=true` 的触发条件：

1. 只能说“用某个组件 / 模板 / 样式”，说不出来源文件。
2. 说不出画面锚点、附属关系或字幕 / 贴纸分工。
3. 形状不能解释为从事件长出。
4. 复制或近似复制参考视频里的字形、贴纸、UI、品牌资产。
5. 用数量、多样化、换色替代规则来源。

处理方式：

- 机制任务：可以记录为 `template_fallback_detected_pending_rule_completion`。
- 成片候选任务：不得进入成片候选，必须 blocked 或退回 style sheet / event table / judgement library。

## N. output_fields_for_future_reports（后续报告必填字段）

| field | purpose |
|---|---|
| `migration_library_used` | 写明使用了 `55`。 |
| `decision_router_used` | 写明使用了 `56`。 |
| `analysis_asset_ids` | 引用 `54` 的资产 ID。 |
| `reference_rule_link` | 具体来源规则文件和章节。 |
| `caption_visual_language_decision` | 字幕类型、锚点、位置、层级、动效。 |
| `sticker_visual_language_decision` | 贴纸类型、附属关系、形状、描边、材质、动效。 |
| `caption_sticker_relation` | 二者分工。 |
| `template_fallback` | true / false；true 则不能进入成片。 |
| `copy_risk_check` | 明确可迁移机制和禁止复制项。 |
| `failure_route` | 失败退回哪一层。 |

## O. do_not_claim（禁止声明）

不得把本库写成：

- 参考视觉语言已经最终通过。
- 当前视频已经修好。
- 贴纸或字幕机制已经完成多案例验证。
- 技术探针通过等于人审通过。
- 后续可以跳过 `54 / 55 / 56`。

## P. do_not_copy（禁止复制）

| source_surface | do_not_copy | allowed_abstraction |
|---|---|---|
| `reference_video_surface` | 参考视频画面、人物脸、平台水印、账号 UI、搜索尾卡、活动物料。 | 镜头功能、信息层功能、段落结构。 |
| `caption_surface` | 原字幕、原文案、原字体、原手写字形、原语言组合。 | 字幕密度、层级、位置变化、手写感、语气角色。 |
| `sticker_surface` | 第三方贴纸原图、粉色图形原样、IP 表情、品牌包装图案。 | 附属关系、反应角色、描边 / 材质 / 动效原则。 |
| `brand_surface` | 店名、品牌、包装、商业标识、平台 UI。 | 物件关系、表面附着条件、copy risk 规避方式。 |
| `provider_surface` | API 返回的单图候选直接当 overlay 资产。 | provider 能力、透明度 / alpha / 无标识 / 风格适配检查。 |

原则：只迁移“为什么出现、贴在哪里、服务什么、如何避险”，不迁移“原样长什么样”。

## Q. next_goal（下一个目标）

`gpt_user_review_reference_visual_language_migration_library_then_future_caption_sticker_tasks_use_decision_router`
