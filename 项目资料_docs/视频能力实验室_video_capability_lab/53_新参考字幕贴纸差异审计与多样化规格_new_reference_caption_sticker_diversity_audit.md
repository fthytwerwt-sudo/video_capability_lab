# 新参考字幕贴纸差异审计与多样化规格

## A. status（状态）

| field | value |
|---|---|
| task_type | `new_reference_caption_sticker_diversity_audit` |
| user_feedback | 用户看完当前完整正片候选后，认为字幕和贴纸 / 视觉标点仍显单一，需要基于两个新参考视频拆出差异机制。 |
| current_candidate_video | `dist/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.mp4` |
| current_candidate_report | `项目资料_docs/视频能力实验室_video_capability_lab/52_完整正片候选全流程重剪报告_full_video_candidate_complete_flow_recut_report.md` |
| reference_01 | `素材/vlog 参考/新参考+解析/v2800fgi0000d7vgprvog65ilgo3p13g.MP4` |
| reference_02 | `素材/vlog 参考/新参考+解析/v2800fgi0000d86nsmfog65i1p2oj750.MP4` |
| audit_artifacts_path | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/` |
| content_status | `reference_caption_sticker_diversity_audit_completed_pending_next_recut_spec_review` |
| current_candidate_status_remains | `full_video_candidate_rendered_pending_user_review` |
| capability_status | `vlog_director_capability_still_pending_multi_case_validation` |
| remotion_timeline_changed_this_round | `false` |
| video_rendered_this_round | `false` |
| generation_api_called_this_round | `false` |
| runtime_asset_commit_allowed_this_round | `false` |

已确认：本轮是参考驱动差异审计和下一版规格，不是重剪整片，不修改当前 Remotion 正片时间线。

已确认：两个用户指定参考视频均已找到、可读取、可解码；当前候选视频也存在并通过技术探测。

部分成立：当前候选已包含字幕和视觉标点模块，但只达到 `included_partial`，未达到用户要求的自然、多样和参考机制感。

待验证：本报告的下一版规格仍需用户 / GPT 回审；回审后才进入下一轮实现。

## B. technical_metadata（技术元数据）

| video | real_path | duration | resolution | fps | video_codec | audio | decodable | validation_status |
|---|---|---:|---|---:|---|---|---|---|
| `reference_01` | `素材/vlog 参考/新参考+解析/v2800fgi0000d7vgprvog65ilgo3p13g.MP4` | `35.176780s` | `720x960` | `60.000` | `h264` | `AAC stereo` | `true` | `passed` |
| `reference_02` | `素材/vlog 参考/新参考+解析/v2800fgi0000d86nsmfog65i1p2oj750.MP4` | `25.749002s` | `720x960` | `60.000` | `h264` | `AAC stereo` | `true` | `passed` |
| `current_candidate` | `dist/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.mp4` | `18.048000s` | `1080x1920` | `30.000` | `h264` | `AAC stereo` | `true` | `passed` |

说明：以上只证明 `technical_validation（技术验证）`，不证明内容审美通过。

## C. frame_evidence_pack（抽帧证据包）

| artifact | path | status |
|---|---|---|
| `reference_01_1fps_frames` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/reference_01_frames/` | `35 frames; runtime only; not committed` |
| `reference_02_1fps_frames` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/reference_02_frames/` | `26 frames; runtime only; not committed` |
| `current_candidate_1fps_frames` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/current_candidate_frames/` | `18 frames; runtime only; not committed` |
| `reference_01_contact_sheet` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/contact_sheets/reference_01_contact_sheet.jpg` | `runtime only; not committed` |
| `reference_02_contact_sheet` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/contact_sheets/reference_02_contact_sheet.jpg` | `runtime only; not committed` |
| `current_candidate_contact_sheet` | `tmp/新参考字幕贴纸差异审计_new_reference_caption_sticker_diversity_audit/contact_sheets/current_candidate_contact_sheet.jpg` | `runtime only; not committed` |
| `current_candidate_existing_review_sheet` | `tmp/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut_review_pack/完整正片候选全流程重剪_contact_sheet.jpg` | `runtime only; not committed` |

已确认：抽帧、contact sheet、审片图均为运行产物，不进入 Git。

## D. reference_caption_mechanism_audit（参考字幕机制审计）

| reference | caption_count_estimate | caption_position_pattern | font_weight_feel | caption_size_hierarchy | caption_timing_pattern | caption_motion_pattern | caption_relation_to_picture | what_current_candidate_lacks |
|---|---:|---|---|---|---|---|---|---|
| `reference_01` | `20-24 visible text beats` | 位置持续变化：居中大字、下中部、左侧、右侧、主体旁、建筑 / 车辆 / 食物附近；不是固定 lower-third。 | 粗重衬线感 / 海报标题感，白字高对比，局部有大小叠层。 | 至少 3 层：大词作主视觉，中号词作段落推进，小号词补情绪或尾卡。 | 几乎每个镜头或每 1-2 秒出现新文本，文本本身承担剪辑节拍。 | 粗略可见为短停留、硬切 / 淡入淡出、随镜头切换换词；未做精准动效确认。 | 文本常贴近街景、招牌、车辆、食物、人物行动方向或负空间，像画面里的语气标点。 | 当前只有 4 条短句；位置和体量变化少；没有把字幕当剪辑节奏层；没有大词 / 中词 / 小词层级。 |
| `reference_02` | `8-12 visible caption / text beats` | 大字可斜放、叠放、围绕鱼 / 城市 / 人物；后段也有小字远景字幕和搜索尾卡。 | 手写 / 黑白描边 / 粗线视觉字感更强，局部带涂鸦式不均匀边。 | 2-3 层：巨大反应字、环境中号字、远景细字。 | 开头高密度，后段降低密度，文字随场景转成轻提示。 | 可见 pop / stagger / hand-draw feel 的方向，但本轮不声明具体帧级动效已确认。 | 字幕和主体关系更强：贴近鱼群、城市塔、人物轮廓、天空留白，不只是说明画面。 | 当前字幕都是同一小体量、同一语气和近似同一安全位置，缺少斜向、大字、附着、远近层级。 |

审计结论：参考视频的字幕不是“文案层”，而是 `typographic_punctuation_layer（文字视觉标点层）`。当前候选把字幕当短句说明，所以看起来像占位。

## E. reference_sticker_visual_punctuation_audit（参考贴纸 / 视觉标点审计）

| reference | sticker_event_count_estimate | anchor_target_types | attachment_relation_types | shape_grammar_types | stroke_outline_feel | scale_distance_pattern | reaction_motion_pattern | material_compositing_feel | human_feel_notes | copy_risk_notes |
|---|---:|---|---|---|---|---|---|---|---|---|
| `reference_01` | `3-5 visual punctuation events, typography-led` | 街景边缘、建筑招牌、车辆、食物、人物行动、尾卡 UI。 | 主要是 `caption_relation_attached`、`negative_space_attached`、`edge_attached`；贴纸图形少，文字本身承担标点。 | 大词、堆叠字、短词组、少量指针 / UI-like 元素。 | 白字强对比，局部类似海报标题，不靠小黄线。 | 字幕可很大，但依托画面留白；不一定避开所有主体，反而参与构图。 | 字幕随 shot cut 出现，形成剪辑节拍；不靠持续抖动。 | 文字压在真实城市镜头上，靠高对比和位置融合。 | 人感来自街拍碎片 + 文字情绪节拍，不是装饰贴纸数量。 | 平台水印、账号 UI、搜索尾卡、原字体、原英文词、品牌招牌均不可复制。 |
| `reference_02` | `7-10 sticker / punctuation events` | 鱼群、城市塔、人物、公交车背面、粉色花束、城市装置、天空留白、车窗 / 玩具灯光。 | `contact_point_attached`、`motion_direction_attached`、`surface_attached`、`object_personification_attached`、`caption_relation_attached`、`negative_space_attached`。 | 粗描边手写字、倾斜重复字、红色划线、粉色爱心 / 小花 / 星星、细线远景字。 | 更粗、更不均匀，黑白描边明显；粉色标点有胶贴 / 手绘感。 | 贴纸大小跟锚点变化大：鱼群上可大，花束上可小，天空中可极细。 | 开头像快速反应，后段像轻微漂浮 / 呼吸；具体动效待逐帧确认。 | 视觉标点像贴在鱼、花、城市装置和远景上，不像单独 UI 层。 | 人感来自“锚点不同所以贴纸形态不同”，不是统一组件套用。 | 原中文词、原手写字形、平台 UI、520 活动物料、品牌 / 城市商业标识、爱心花形原样均不可复制。 |

审计结论：参考 1 更像 `typography_driven_visual_punctuation`；参考 2 更像 `hand_drawn_caption_plus_sticker_hybrid`。下一版不能只加小线条，必须把字幕和贴纸共同视为视觉语言层。

## F. current_candidate_difference_table（当前候选差异表）

| layer | current_candidate_evidence | reference_gap | why_it_feels_single | next_fix_direction |
|---|---|---|---|---|
| `caption_count` | `52` 中只有 4 条：开头、动作、呼吸、结尾。 | 参考 1 几乎每个镜头都有文本节拍，参考 2 开头 / 中段有多层文字反应。 | 字幕密度低，无法形成“文本参与剪辑”的感觉。 | 下一版改为 `6-8` 个文本事件，含大字、中字、小字三类。 |
| `caption_position` | 主要在底部 / 左下安全区。 | 参考字幕会居中、斜向、贴主体、贴留白、贴环境边缘。 | 位置像字幕条，不像画面里的视觉标点。 | 每条 caption 必须写 `anchor_target` 和 `position_mode`，禁止全片固定位置。 |
| `caption_typography` | 同一白色短句风格，缺少大小、字重、角度变化。 | 参考使用海报大字、手写粗描边、细字远景等多层级。 | 所有字幕像同一组件重复。 | 加 `hero_keyword`、`attached_phrase`、`whisper_caption` 三种原创样式。 |
| `caption_semantics` | 文本像占位短句，服务段落但不贴画面事件。 | 参考文字常和物件、街景、人物动作形成反应关系。 | 字幕只说明节奏，没有和画面发生关系。 | 每条短句必须说明 `picture_relation`，不只是 `role=opening/action`。 |
| `sticker_event_count` | 3 个事件：动作触点火花、器械短笔触、呼吸段边缘线。 | 参考 2 至少 7-10 个视觉标点；参考 1 虽贴纸少，但文字标点密度高。 | 数量少且只出现三个孤立点，不能形成风格系统。 | 下一版设置 `5-7` 个 sticker / punctuation events，但允许 `sticker_needed=false`，不为数量硬塞。 |
| `anchor_target_diversity` | 接触点、器械方向、负空间三类。 | 参考包含主体、物件表面、动作方向、城市边缘、人物关系、字幕关系、尾部留白。 | 锚点类型少，导致形状也少。 | 至少覆盖 `contact / motion / surface-or-object / caption_relation / negative_space` 中 4 类。 |
| `shape_grammar` | 多为短线、火花、边缘线，颜色和线条近似。 | 参考有粗描边字、红色划线、粉色贴纸、细字、表面小标点。 | 形状同质，像一套小组件。 | 按锚点生成不同形状，不再把 `short_stroke_cluster` 当默认答案。 |
| `stroke_material` | 线条干净、轻、少量黄色 / 米色，贴纸质感弱。 | 参考更粗、更有描边、手写不均匀、胶贴 / 涂鸦感明显。 | 像 Remotion 线条层，不像自然贴纸。 | 加粗描边、外轮廓、轻阴影、粗糙边、局部错帧。 |
| `motion_signature` | 有入场 / 停留 / 退出，但感知上偏参数化。 | 参考视觉字和贴纸更像跟 shot / 动作冒出来。 | 动效没有被人感锚点驱动。 | 每个事件写 `entry_frames / hold_frames / exit_frames / event_window_reason`。 |
| `reference_loading` | `52` 明确 `reference_video_used=false`。 | 本轮两个新参考此前未进入当前成片执行。 | 没有 reference-driven variation，只按项目机制最小覆盖。 | 下一版必须以本 `53` 的参考机制表作为字幕/贴纸输入。 |

## G. why_current_output_feels_single（当前单一感根因）

| failure_layer | status | evidence | root_cause | route_back_to |
|---|---|---|---|---|
| `reference_not_loaded` | `成立` | `52` 写明 `reference_video_used=false`，两个新参考本轮才进入审计。 | 当前候选按内部最小模块执行，没有参考视频字幕 / 贴纸机制输入。 | `53 reference mechanism tables` |
| `caption_style_not_extracted` | `成立` | 当前 4 条短句均为同类小文本层。 | 字幕只作为信息层，不作为 typography visual punctuation。 | `caption_style_rule_set` |
| `sticker_event_library_too_thin` | `成立` | 当前只有 3 个视觉标点事件。 | 事件库不足，无法覆盖多锚点、多形状、多材质。 | `sticker_event_library_v2` |
| `attachment_relation_not_diverse` | `成立` | 当前主要是 contact / motion / negative space。 | 缺 surface、object、caption relation、edge reveal 等关系。 | `44 sticker_attachment_relation` |
| `shape_grammar_too_repetitive` | `成立` | 视觉上多为小短线 / 火花 / 边缘线。 | 形状未从每个素材事件重新长出来。 | `44 shape_grammar + bad_sticker_pattern_library` |
| `motion_signature_too_parameter_like` | `部分成立` | contact sheet 可见有动效节点，但人感反应弱。 | 事件窗口、入停出帧和画面动作关系写得不够强。 | `reaction_motion_signature` |
| `material_compositing_too_flat` | `成立` | 贴纸像浮在画面上的干净线条。 | 缺外轮廓、粗糙边、轻阴影、真实画面压层感。 | `material_compositing_rule` |
| `human_feel_missing` | `成立` | 用户反馈视觉语言单一；参考多样性来自街拍/文字/贴纸的自然关系。 | Codex 仍像按组件清单达标，而非按参考人感组织视觉语言。 | `reference audit + style sheet before recut` |

## H. next_caption_rules（下一版字幕规则）

| rule_id | rule | required_fields | implementation_hint | forbidden_response |
|---|---|---|---|---|
| `caption_rule_01_density` | 18 秒候选至少设计 `6-8` 个字幕 / 文本节拍。 | `caption_id`, `time_range`, `text`, `density_role` | 不平均铺满；开头和推进段密，呼吸段少。 | 继续只保留 4 条同质短句。 |
| `caption_rule_02_hierarchy` | 至少三类文字层级：`hero_keyword`、`attached_phrase`、`whisper_caption`。 | `font_scale_mode`, `weight_mode`, `attention_weight` | 例如大字 1-2 次，中字 3-4 次，小字 2 次。 | 全部同字号同位置。 |
| `caption_rule_03_anchor_relation` | 每条 caption 必须写画面锚点。 | `anchor_target`, `picture_relation`, `safe_area` | 贴近器械、动作方向、杯身留白、影子或画面边缘。 | 只写 `role=opening/action/outro`。 |
| `caption_rule_04_position_variation` | 位置必须随镜头变化。 | `position_mode` | 允许 `center_hero`, `lower_left_whisper`, `object_edge`, `diagonal_attached`, `negative_space_small`。 | 全片固定 lower-third。 |
| `caption_rule_05_original_copy` | 使用原创短句，不抄参考文案、原字形或平台 UI。 | `copy_risk=safe_original` | 可保留“短、碎、像日记”的机制。 | 复制参考词、参考字体或搜索尾卡文本。 |
| `caption_rule_06_motion` | 每条 caption 写入入场、停留、退场。 | `entry_frames`, `hold_frames`, `exit_frames`, `motion_reason` | 大字可 pop / cut-in，小字可 slow fade，斜字可 slight drift。 | 把 motion 写成精准 BGM 卡点。 |

下一版候选 caption plan 可按以下方向启动：

| caption_mode | count | visual_role | current_material_fit |
|---|---:|---|---|
| `hero_keyword` | `1-2` | 开头或动作段形成参考 1 的大字节拍。 | `M08 / M03` gym opening 和主动作。 |
| `attached_phrase` | `3-4` | 贴着器械、动作方向、杯身或影子。 | `M03 / M04 / M07 / M09`。 |
| `whisper_caption` | `2` | 呼吸点或结尾低权重小字。 | `M11 / M09`。 |

## I. next_sticker_visual_punctuation_rules（下一版贴纸 / 视觉标点规则）

| rule_id | rule | required_fields | implementation_hint | forbidden_response |
|---|---|---|---|---|
| `sticker_rule_01_event_count` | 下一版设计 `5-7` 个贴纸 / 视觉标点事件，但每个都必须有锚点。 | `sticker_id`, `time_range`, `anchor_target`, `sticker_needed_reason` | 多于当前 3 个，但允许删掉无锚点事件。 | 为了热闹每镜头都贴。 |
| `sticker_rule_02_anchor_variety` | 至少覆盖 4 类附属关系。 | `attachment_relation` | `contact_point_attached`, `motion_direction_attached`, `surface_attached_or_object`, `caption_relation_attached`, `negative_space_attached`。 | 继续只用短线 / 火花 / 边缘线。 |
| `sticker_rule_03_shape_from_event` | 形状从事件推导，不用固定模板。 | `shape_grammar`, `why_this_shape` | 动作点可 contact flash；器械方向可错帧笔触；杯身可低风险表面小表情；影子可微轨迹标点。 | 只换颜色或放大现有线条。 |
| `sticker_rule_04_stroke_material` | 贴纸必须有前景层级和手感。 | `stroke_outline`, `roughness`, `shadow`, `material_compositing` | 黑/白双层描边、粗细变化、轻阴影、局部断点。 | 继续使用干净工程 SVG 线条。 |
| `sticker_rule_05_caption_relation` | 贴纸和字幕必须分工。 | `caption_relation`, `avoid_caption_duplicate` | 贴纸做反应，字幕做语气；不得互相复述。 | 把同一句话做成贴纸。 |
| `sticker_rule_06_copy_safety` | 只抽象机制，原创重画。 | `copy_risk_check` | 参考 2 的粉色爱心/花形只能抽象为“object-attached small accent”，不能临摹形状。 | 复制平台 UI、品牌、原贴纸、原字体、原文案。 |

下一版候选 sticker event library 可按以下方向启动：

| event_id | time_window_candidate | target_material | anchor_target | attachment_relation | shape_grammar | role |
|---|---|---|---|---|---|---|
| `sticker_v2_01_opening_edge` | `0.35-1.15s` | `M08` | 器械前景边缘 / 人物进入关系 | `edge_attached` | `short_stroke_cluster + rough outline` | 开头第一视觉点，不是说明箭头。 |
| `sticker_v2_02_action_contact` | `3.45-4.10s` | `M03` | 动作接触 / 发力窗口 | `contact_point_attached` | `contact_flash` | 保留当前思路但加粗描边和错帧。 |
| `sticker_v2_03_machine_direction` | `6.70-7.35s` | `M04` | 器械方向 / 金属线条 | `motion_direction_attached` | `staggered_burst` | 从机器结构长出，不贴空处。 |
| `sticker_v2_04_cup_surface` | `10.15-10.95s` | `M07` | 杯身 / 手部关系 | `surface_attached` | `surface_face_mark_or_micro_wobble` | 若品牌风险高则改成杯口边缘短线。 |
| `sticker_v2_05_sky_whisper` | `11.70-12.45s` | `M11` | 天空 / 海平面留白 | `negative_space_attached` | `hand_draw_reveal_small_line` | 呼吸点保留低权重。 |
| `sticker_v2_06_shadow_trail` | `13.30-14.35s` | `M09` | 影子移动方向 | `motion_direction_attached` | `motion_trail_punctuation` | 暗段可见但不抢主体。 |
| `sticker_v2_07_caption_micro_mark` | `15.55-16.40s` | `M05 / M09` | 结尾字幕边缘 | `caption_relation_attached` | `micro_word_bubble_or_short_tick` | 让字幕和视觉标点同锚点，不重复文案。 |

## J. motion_and_material_spec（动效与材质规格）

| layer | next_rule | evidence_source | implementation_note |
|---|---|---|---|
| `entry` | 大字 4-8 frames，贴纸 2-6 frames，呼吸线 8-14 frames。 | 参考 1/2 字幕随镜头冒出，参考 2 贴纸反应更短。 | 不写精准卡点，只写事件窗口。 |
| `hold` | 大字可短停 12-26 frames，小贴纸 8-18 frames。 | 当前贴纸感知弱，需 start / mid / exit 更明确。 | 每个 sticker 仍要可在 mid frame 看见。 |
| `exit` | 快速消失或随 shot cut 退场。 | 参考文字/贴纸很少长时间悬浮。 | 避免贴纸跨镜头。 |
| `stroke` | 增加粗细变化、外轮廓、轻阴影。 | `44` 指出 clean SVG path 是坏模式。 | 用原创 SVG / CSS，不引入第三方资产。 |
| `texture` | 轻微粗糙边 / 胶贴感 / 手绘断点。 | 参考 2 的手绘感来自不均匀边，不是平滑线条。 | 不能复制原贴纸轮廓。 |
| `composition` | 字幕、贴纸、主体三者必须写 attention weight。 | 当前候选字幕和贴纸都低权重但变化少。 | 大字出现时减少贴纸；贴纸强时字幕变轻。 |

## K. should_recut_now（是否建议本轮直接重剪）

不建议本轮继续自动重剪。

原因：

1. 用户本轮真实目标是先解释“为什么单一”和“参考到底多在哪里”，不是直接再抽卡一版。
2. 参考 1 和参考 2 的路线不同：参考 1 是 `typography-led`，参考 2 是 `hand-drawn caption + sticker hybrid`；需要用户确认下一版更偏哪一条，或采用混合路线。
3. 当前候选的素材主线仍是 gym / 饮品 / 海天 / 夜路，和两个参考的视频素材语境不同；下一版必须做机制迁移，而不是外观复刻。
4. 直接重剪容易再次把机制压扁成“多加几个贴纸”，和本轮目标冲突。

建议下一轮任务类型：

```text
caption_sticker_diversity_layer_recut_from_reference_audit
```

建议下一轮优先修改：

1. `remotion/数据_data/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.ts`
   - 扩展 `caption_text_plan` 为 `6-8` 个事件。
   - 为 caption 增加 `caption_mode`、`anchor_target`、`position_mode`、`attention_weight`、`entry_frames`、`hold_frames`、`exit_frames`。
   - 扩展 `sticker_visual_punctuation_plan` 为 `5-7` 个候选事件。
   - 为 sticker 增加 `copy_risk_check`、`caption_relation`、`stroke_outline`、`material_compositing`、`bad_pattern_avoided`。

2. `remotion/组合_compositions/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.tsx`
   - 实现 `hero_keyword`、`attached_phrase`、`whisper_caption` 三类字幕 renderer。
   - 实现至少 4 类贴纸 renderer：`contact_flash`、`staggered_burst`、`surface_micro_mark`、`motion_trail_punctuation`。
   - 增加手绘粗细变化、外轮廓、轻阴影和 start / mid / exit 可审片状态。

3. 审片包脚本：
   - 下一版必须额外抽取每个 caption / sticker 的 start / mid / exit 帧。
   - contact sheet 需按 `caption_event` 和 `sticker_event` 标注，不只抽 start / mid / end。

## L. do_not_copy（禁止复制项）

| source | forbidden_copy | allowed_abstraction |
|---|---|---|
| `reference_01` | 平台水印、账号 UI、搜索尾卡、原英文词、原字体、品牌招牌、店名、车辆 / 建筑上的真实标识。 | 大词参与剪辑节奏、字幕位置随画面变化、文字和城市碎片构图互动。 |
| `reference_02` | 原中文词、原手写字形、粉色图形原样、平台 UI、520 活动物料、公交广告、品牌 / 城市商业标识。 | 粗描边手写感、贴纸围绕主体变化、粉色小标点作为低权重物件反应机制。 |
| `current_candidate` | 不直接把参考 UI 套到 gym 视频上。 | 将字幕 / 贴纸从单组件升级为多锚点视觉语言层。 |

## M. validation（验证）

| check | result |
|---|---|
| workspace_guard | `passed: /Users/fan/Documents/vlog、odd/video_capability_lab / main / fthytwerwt-sudo/video_capability_lab` |
| reference_01_found | `passed` |
| reference_02_found | `passed` |
| current_candidate_found | `passed` |
| reference_video_probe | `passed: both decodable with audio` |
| current_candidate_probe | `passed: decodable with audio` |
| frame_extraction | `passed: 35 + 26 + 18 1fps frames` |
| contact_sheet_generation | `passed: 3 contact sheets` |
| current_report_read | `passed: 52 read` |
| sticker_mechanism_read | `passed: 44 read` |
| delivery_gate_read | `passed: 51 read` |
| remotion_timeline_changed | `false` |
| runtime_assets_committed | `false` |

## N. remaining_confirmation（仍需确认）

待验证：下一版更偏 `reference_01 typography-led`、`reference_02 hand-drawn hybrid`，还是混合路线。

待验证：当前 gym 主线是否继续保留，还是用户希望下一版把素材也往更街拍 / 城市 / 日记碎片方向调整。

待验证：用户是否接受下一轮只改字幕 / 贴纸 / 视觉语言层，还是要求重新构建整个 18 秒结构。

## O. next_goal（下一个目标）

`user_review_new_reference_caption_sticker_diversity_audit_then_execute_caption_sticker_diversity_layer_recut`
