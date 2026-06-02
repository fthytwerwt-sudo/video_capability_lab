# 通用贴纸视觉语言机制

## A. status（状态）

- task_type: `universal_sticker_visual_language_mechanism_completion`
- source_files:
  - `40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md`
  - `41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md`
  - `43_十八秒候选与对标贴纸差距审计_18s_candidate_reference_sticker_gap_audit.md`
- mechanism_status: `universal_sticker_visual_language_mechanism_completed_pending_probe_validation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- allowed_next_task: `gpt_review_universal_sticker_visual_language_mechanism`
- allowed_probe_after_review: `sticker_attachment_relation_style_sheet_probe`
- do_not_claim:
  - `sticker system verified`
  - `sticker visual language passed`
  - `current video fixed`
  - `Remotion integration completed`
  - `publish candidate ready`
  - `vlog director capability verified`

已确认：本文件是通用机制文件，不是 18 秒候选视频修复报告，不是 Remotion 实现说明，不是贴纸资产包。

已确认：本轮不修改 Remotion，不 render，不调用图片 / 视频 / 音频 API，不生成新贴纸图，不生成风格板图片。

已确认：本机制只把 `43` 暴露的 `shape_layer`、`stroke_layer`、`visual_material_feel`、`placement / integration`、`human_feel` 失败层补成可执行、可验证、可复用的中间层机制。

待验证：本机制需要下一轮 GPT / 用户回审，并通过 `sticker_attachment_relation_style_sheet_probe` 的静态风格板探针验证，才能进入小范围 Remotion probe。

## B. mechanism_positioning（机制定位）

本机制服务所有后续 vlog / odd / 对标视频，不只服务当前 18 秒候选，也不只服务某一个对标视频。

它解决的缺口是：

```text
video_anchor 已找到
-> 贴纸为什么出现已部分成立
-> 但贴纸长什么样、怎么贴住画面、怎么有反应感仍失败
-> 需要 universal_sticker_visual_language_system 作为中间层
-> 通过 style sheet 后才允许进入 Remotion probe
```

机制输入：

| input | 中文说明 |
|---|---|
| `reference audit` | 对标视频贴纸功能、锚点、禁复制边界。 |
| `target video event table` | 目标样片或新视频的镜头事件表。 |
| `shot / timecode` | 贴纸候选所在镜头和事件窗口。 |
| `anchor target` | 主体、动作点、物件、边缘、轨迹、留白或字幕关系。 |
| `anchor reason` | 为什么这个事件需要贴纸，不贴会少什么。 |
| `visual background` | 背景复杂度、明暗、真实材质和主体可见性。 |
| `caption / BGM relation` | 字幕是否抢主体，BGM 是否只提供粗 marker。 |
| `copy risk` | 第三方贴纸原图、平台 UI、品牌包装、原字形、原文案风险。 |

机制输出：

| output | 中文说明 |
|---|---|
| `whether sticker is needed` | 是否贴，不贴也必须有理由。 |
| `attachment relation` | 贴纸附属于主体边缘、接触点、轨迹、表面、留白或字幕关系。 |
| `shape grammar` | 形状从事件和附属关系长出来，而不是固定模板。 |
| `stroke outline` | 描边、白边、黑内线、阴影和粗糙度如何建立前景层。 |
| `scale distance` | 与主体、脸、动作点、字幕、景别的比例和距离。 |
| `reaction motion` | 入场、停留、退场是否像动作反应，而不是参数动画。 |
| `material compositing` | 纸感、胶贴感、边缘、透明度和真实画面的融合规则。 |
| `style sheet acceptance` | Remotion 前的静态风格板验收闸门。 |
| `Remotion implementation spec` | 仅在风格板通过后生成的小范围实现规格。 |

## C. core_principle（核心原则）

贴纸不是独立素材。

贴纸不是固定模板。

贴纸不是随机 SVG。

贴纸不是字幕替代品。

贴纸不是视觉填空。

贴纸是：

```text
video_anchor + attachment_relation + visual_grammar + reaction_motion + material_compositing
```

也就是：

1. 先由视频锚点决定它为什么出现。
2. 再由附属关系决定它长在哪里。
3. 再由形状语法决定它长什么样。
4. 再由描边、比例、动效、材质决定它像不像自然贴纸。
5. 如果任一层不成立，必须回到对应层，不允许只调颜色、坐标或时长。

## D. execution_flow（执行流程）

以后 Codex 每次处理贴纸时，必须按以下流程执行：

1. 读取 `reference mechanism`，只学功能、关系和失败边界，不复制 `reference asset`。
2. 读取目标视频、目标样片或事件表。
3. 为每个镜头判断 `sticker_needed`。
4. 如果 `sticker_needed=false`，明确写不贴原因。
5. 如果 `sticker_needed=true`，先写 `anchor_target` 和 `anchor_reason`。
6. 判断 `sticker_attachment_relation`。
7. 根据附属关系生成 `shape_grammar`。
8. 根据画面复杂度选择 `stroke_outline_system`。
9. 根据主体尺寸和景别计算 `scale_distance_rule`。
10. 根据事件类型选择 `reaction_motion_signature`。
11. 根据背景复杂度和画面质感选择 `material_compositing_rule`。
12. 先进入 `style_sheet_acceptance_gate`，不要直接改正片。
13. 风格板通过后，才进入 Remotion 小范围 probe。
14. probe 后必须输出 start / mid / exit frame review。
15. 用户 / GPT 回审。
16. 根据失败代码回到对应层。

执行硬门槛：

| gate | pass 条件 | blocked 条件 |
|---|---|---|
| `anchor_gate` | 贴纸可追溯到主体、动作、物件、边缘、接触点、轨迹、留白或字幕关系。 | 只有“这里想热闹一点”。 |
| `attachment_gate` | 能说明贴纸附属于什么，不是浮在画面上。 | 只有 x/y 坐标。 |
| `style_sheet_gate` | 静态风格板可让 GPT / 用户选出方向。 | 直接进入 Remotion 微调。 |
| `frame_review_gate` | start / mid / exit 帧均能证明贴纸贴住事件。 | 只看 render 成功。 |

## E. sticker_attachment_relation（贴纸附属关系）

贴纸附属关系决定贴纸是“从画面事件里长出来”，还是“浮在画面上的 UI”。每个贴纸必须先选一个主附属关系；如果选不出，默认 `sticker_needed=false`。

| relation | definition | when_to_use | when_not_to_use | shape_implication | placement_implication | motion_implication | failure_code |
|---|---|---|---|---|---|---|---|
| `edge_attached（边缘附着）` | 贴纸附着在主体、物件、云边、海边、叶缘等可见边缘。 | 主体边缘清楚，贴纸用于提示显露、轮廓或呼吸。 | 边缘不可见、主体虚焦、会压脸或压字幕。 | 半圈、边缘短线、短笔触簇。 | 离边缘 6-32px，顺边缘方向，不贴空处。 | 慢显或轻弹入，跟显露窗口相关。 | `fail_wrong_attachment_relation` |
| `contact_point_attached（接触点附着）` | 贴纸附着在嘴咬、手触、物件相碰等接触点。 | 动作点明确，接触产生轻喜剧或注意力反应。 | 接触点被遮挡、主体太小、动作不可见。 | 接触火花、短线、微字泡。 | 离接触点 8-36px，不挡接触本身。 | 短促 pop、contact flash、quick vanish。 | `fail_wrong_attachment_relation` |
| `motion_direction_attached（动作方向附着）` | 贴纸沿动作方向、轨迹或运动峰值附着。 | 画面有可见方向、脚印、移动路径或视线转移。 | 只有静态远景或轨迹不清。 | 运动轨迹标点、错帧短笔触。 | 顺动作方向偏移 12-48px，避免反向漂浮。 | staggered burst、hand draw reveal、短停留。 | `fail_scale_distance_floaty` |
| `surface_attached（表面附着）` | 贴纸像贴在杯身、票据、玩具、墙面等表面上。 | 物件表面清楚，能形成物件人格化或表面表情。 | 表面有品牌包装、文字风险或透视过复杂。 | 表面表情、眼睛、小脸、短标签。 | 贴在表面中心或边缘，遵守透视和遮挡。 | soft breath hold 或轻微 wobble。 | `fail_material_flat_or_svg_like` |
| `reveal_boundary_attached（显露边界附着）` | 贴纸附着在遮挡和显露的边界。 | 叶子、门框、画面边缘、手部遮挡后出现主体。 | 没有 reveal，或显露主体不清。 | 半圈窥视、peek mark、短促眼神标点。 | 沿遮挡边界，不圈空叶子或空背景。 | hand draw reveal 或 pop reaction。 | `fail_shape_not_event_derived` |
| `negative_space_attached（留白附着）` | 贴纸附着在留白中的边缘、呼吸点或构图空隙。 | 呼吸段需要极轻提示，且有可解释的边缘或节奏。 | 留白本身已经足够，贴纸会破坏安静。 | 很轻边缘线、短呼吸线、no_shape。 | 保持低 attention weight，避开主字幕。 | soft breath hold、slow reveal。 | `fail_visual_clutter` |
| `caption_relation_attached（字幕关系附着）` | 贴纸与 caption 共享同一锚点，服务同一语义。 | caption 指向动作或主体，贴纸只做辅助语气。 | caption 与贴纸指向不同对象，或 caption 已足够强。 | 微字气泡、短笔触、caption 边缘标点。 | 不压字幕，不把贴纸变成第二条字幕。 | 跟 caption entry 有关系，但不精准卡 BGM。 | `fail_visual_clutter` |
| `object_personification_attached（物件人格化附着）` | 贴纸把物件变成轻喜剧角色。 | 杯子、玩具、票据、小物件主体清楚。 | 物件含品牌 / 包装 / IP 风险，或目标视频不是物件主线。 | 表面脸、眼睛、小表情、微反应字。 | 贴在物件表面，不能脱离物件漂浮。 | micro wobble、soft breath hold。 | `fail_copy_reference_asset` |

判断标准：

- pass: 一眼能说出贴纸附属于哪个主体、边缘、动作点、轨迹、表面、留白或字幕关系。
- partial: 有大致对象，但贴纸还离主体太远、形状仍像模板。
- fail: 只有坐标、颜色、组件名，无法说明附属关系。
- evidence_required: 原始帧、事件表字段、style sheet 标注、start / mid / exit frame review。

回退层级：`fail_wrong_attachment_relation` 回到本节重新判断；不能只调 x/y。

## F. shape_grammar（形状语法）

形状语法必须从附属关系和视频事件推导，不允许把 `arrow（箭头）`、`circle（圈注）`、`wave（波浪线）`、`tag（标签）` 当固定默认模板。

| shape | source_relation | visual_shape | suitable_anchor | forbidden_use | common_failure | next_fix_if_failed |
|---|---|---|---|---|---|---|
| `short_stroke_cluster（短笔触簇）` | `edge_attached` / `motion_direction_attached` | 2-5 个不规则短笔触，粗细略有变化。 | 动作峰值、注意力切换、主体边缘。 | 当作通用爆炸贴或固定黄色模板。 | 像 UI icon、促销爆点、SVG 组件展示。 | 回到 `attachment_relation`，缩短笔触并贴近动作点。 |
| `half_ring_peek_mark（半圈窥视标记）` | `reveal_boundary_attached` / `edge_attached` | 不完整半圈、断点圈、窥视边缘。 | 遮挡后显露、叶缘、门框、主体半露。 | 完整圈住空叶子或变成审片标注。 | 像检查圈、标注圈。 | 回到 `placement_implication`，沿真实边界重画。 |
| `contact_spark（接触火花 / 触点反应）` | `contact_point_attached` | 1-3 个短促火花、折线、触点闪。 | 嘴咬、手触、物件接触。 | 没有接触点时硬贴。 | 像装饰星星或按钮反馈。 | 回到 `anchor_target`，无接触点则 `no_shape`。 |
| `surface_face_mark（表面表情标记）` | `surface_attached` / `object_personification_attached` | 小眼睛、嘴角、短表情线。 | 杯身、玩具、瓶身、小物件。 | 复制品牌包装或第三方表情贴纸。 | 像贴纸包素材、IP 复刻。 | 回到 `copy_risk`，抽象机制并原创重画。 |
| `edge_wiggle（边缘轻抖线）` | `edge_attached` / `negative_space_attached` | 沿边缘的短波动线或轻抖线。 | 云边、海边、竹叶边、主体轮廓。 | 贴空天、空沙面或纯装饰。 | 像通用波浪线。 | 回到 `edge_attached`，找不到边缘则删除。 |
| `micro_word_bubble（微字气泡）` | `caption_relation_attached` / `contact_point_attached` | 极短字、拟声、手写小泡，不超过 1-2 字。 | 动作点、轻喜剧停顿、主体反应。 | 替代 caption、写长句、解释画面。 | 像 PPT 标签或说明牌。 | 回到 `caption_relation`，必要时只留 caption。 |
| `motion_trail_punctuation（运动轨迹标点）` | `motion_direction_attached` | 沿轨迹的点、短线、错帧小标点。 | 脚印、手势、视线、物件移动。 | 轨迹不可见时贴点线。 | 漂浮、像素材包装饰。 | 回到 `motion_direction_offset`，轨迹不足则 `no_shape`。 |
| `no_shape（不生成形状）` | 任一关系不成立 | 不生成贴纸。 | 无锚点、caption 已足够、画面太乱、copy risk 高。 | 为了数量硬塞贴纸。 | 视觉噪音、随机装饰。 | 回到 event table 写 `sticker_needed=false`。 |

判断标准：

- pass: 形状不用文字解释也能看出来自事件、主体、动作、物件或边缘。
- partial: 形状方向对，但仍像 `arrow / circle / wave / tag` 的通用替换。
- fail: 形状只来自模板名、SVG 组件名或视觉填空。
- evidence_required: style sheet 中每个方案必须标 `source_relation`、`suitable_anchor`、`common_failure`。

回退层级：`fail_shape_not_event_derived` 回到本节，不允许只换颜色。

## G. stroke_outline_system（描边系统）

描边系统决定贴纸有没有前景层级。当前 18 秒候选的主要失败之一，是线条太薄、太干净、太像工程 SVG。

### G.1 描边选择规则

| condition | rule |
|---|---|
| 背景复杂、主体纹理多、贴纸容易融进去 | 需要厚白边或双层描边。 |
| 贴纸主体是黑色短笔触或表情线 | 可使用黑色内线 + 白色外轮廓。 |
| 背景明暗跳变大 | 使用双层描边，内线定形，外线隔离背景。 |
| 背景干净、留白多、贴纸只做呼吸 | 只用浅阴影或极轻外描边，避免过重。 |
| 贴纸需要压在真实画面上 | 使用轻阴影 + 粗糙边缘，不只靠 opacity。 |
| 贴纸像 UI / SVG path | 增加 `stroke_variation`、断点、圆角不均、边缘粗糙。 |

### G.2 必填字段

| field | requirement |
|---|---|
| `inner_stroke` | 内线颜色、粗细和是否承载主要形状。 |
| `outer_stroke` | 外轮廓颜色、粗细和隔离背景的作用。 |
| `stroke_variation` | 粗细变化、断点、手绘不均匀度。 |
| `shadow` | 是否需要轻阴影、方向、模糊和透明度。 |
| `edge_roughness` | 纸边 / 胶贴边 / 手绘边是否需要轻粗糙。 |
| `contrast_gate` | 在原始帧上是否足够可见，但不抢主体。 |
| `failure_code` | 默认 `fail_stroke_too_thin_or_ui_like`。 |

### G.3 判定规则

- pass: 贴纸有清楚前景层，边缘不像工程图，背景复杂时仍可读。
- partial: 贴纸可见，但线条过干净、过薄或只靠颜色对比。
- fail: 像 PPT 标注、SVG path、UI icon、审片辅助线。
- evidence_required: 原始帧 + style sheet 对照 + contrast gate 标注。

回退层级：`fail_stroke_too_thin_or_ui_like` 回到本节；不能只放大贴纸。

## H. scale_distance_rule（比例距离规则）

比例距离规则决定贴纸是附着、漂浮还是抢主体。

### H.1 必填字段

| field | requirement |
|---|---|
| `subject_size_ratio` | 贴纸宽度与主体可见宽度的比例；小动作贴纸通常低于主体宽度的 35%-55%。 |
| `edge_distance` | 与主体边缘或动作点距离；常规 6-48px，远景可更近，近景可略远。 |
| `face_safe_area` | 不压脸、不遮眼、不遮嘴，除非贴纸本身是表面人格化且已回审。 |
| `caption_safe_area` | 不压 caption，不和 caption 形成两个主视觉。 |
| `motion_direction_offset` | 顺动作方向偏移，不能逆动作或无方向漂浮。 |
| `minimum_readability` | 贴纸在 mid frame 能一眼看见，不靠暂停放大才成立。 |
| `maximum_attention_weight` | 贴纸不能比主体、动作点或主 caption 更抢眼。 |

### H.2 景别规则

| shot type | scale rule | distance rule | forbidden |
|---|---|---|---|
| 近景 | 小贴纸可更细，但必须避脸和动作点。 | 离接触点 8-44px。 | 大标签压主体。 |
| 中景 | 贴纸需有足够描边和前景层。 | 离主体边缘 12-48px。 | 贴在空白处当装饰。 |
| 远景 | 贴纸数量应更少，优先不贴。 | 若贴，只贴清楚边缘或留白关系。 | 用大贴纸弥补主体弱。 |

### H.3 失败判定

| failure | trigger | route_back_to |
|---|---|---|
| 太大 | 贴纸成为主视觉，主体被抢。 | `scale_distance_rule` |
| 太小 | mid frame 不可读，只有暂停能看见。 | `stroke_outline_system` + `scale_distance_rule` |
| 漂浮 | 距离主体、边缘、接触点或轨迹太远。 | `sticker_attachment_relation` |
| 抢主体 | attention weight 高于主体动作或 caption。 | `scale_distance_rule` + `style_sheet_acceptance_gate` |

判断标准：

- pass: 贴纸像附着在事件旁边，既可见又不压主体。
- partial: 大小可见，但附着距离或避让关系不稳。
- fail: 漂浮、压脸、压字幕、抢 EndCard、用尺寸补救无锚点。
- evidence_required: 原始帧中标出主体边缘、贴纸 bounding box、caption safe area。

回退层级：`fail_scale_distance_floaty` 回到本节和附属关系层。

## I. reaction_motion_signature（反应动效签名）

动效必须像动作窗口或视觉反应窗口里的反应，不是为了证明参数会动。

BGM 未人工复听前，不得写精准卡点。动效可以绑定粗 marker、切点候选、动作出现窗口或视觉反应窗口，但不能把自动 marker 写成已确认节拍。

| motion | use_case | entry_frames | hold_frames | exit_frames | easing_feel | forbidden_use | failure_code |
|---|---|---:|---:|---:|---|---|---|
| `pop_reaction（短促弹出反应）` | 动作点、情绪点、主体突然出现。 | 3-6 | 8-18 | 3-6 | 短、轻、像冒出来。 | 无动作窗口也弹。 | `fail_motion_parameter_like` |
| `staggered_burst（错帧爆点）` | 2-5 个短笔触围绕动作点错帧出现。 | 3-7 | 8-16 | 3-5 | 每个笔触略错开。 | 变成电商爆炸贴或固定太阳。 | `fail_motion_parameter_like` |
| `hand_draw_reveal（手绘显线）` | 半圈、边缘线、轨迹标点。 | 8-14 | 12-28 | 4-8 | 像手画出来，不机械。 | 没有真实边缘或轨迹。 | `fail_shape_not_event_derived` |
| `micro_wobble（轻微抖动）` | 微字泡、纸感小标签、表面表情。 | 4-6 | 12-20 | 3-6 | 低幅度，不像 UI shake。 | 大幅摇晃抢主体。 | `fail_motion_parameter_like` |
| `contact_flash（接触闪动）` | 咬、碰、触、揭示瞬间。 | 2-4 | 4-10 | 2-4 | 非常短，像触点反应。 | 没有接触点。 | `fail_wrong_attachment_relation` |
| `soft_breath_hold（轻呼吸停留）` | 留白、边缘线、收束段。 | 8-14 | 20-45 | 8-14 | 慢、低幅度。 | 把呼吸做成主体之外的主视觉。 | `fail_visual_clutter` |
| `quick_vanish（快速消失）` | 小反应结束、动作窗口结束。 | 0-2 | 0-8 | 2-5 | 干净退场。 | 贴纸长时间悬浮。 | `fail_motion_parameter_like` |

判断标准：

- pass: start / mid / exit 帧能看出动效服务事件窗口。
- partial: 入场和退场完整，但动作触发感不足。
- fail: 像 Remotion 参数展示、按钮动效、无事件抖动、精准卡点未被人工复听支持。
- evidence_required: 事件窗口、frame review、是否人工复听 BGM 的状态标记。

回退层级：`fail_motion_parameter_like` 回到本节；不能只改 duration。

## J. material_compositing_rule（材质融合规则）

材质融合规则决定贴纸是不是压在真实画面上。当前候选的主要失败，是贴纸像叠加 UI 层或 PPT 标注，而不是自然贴在主体、物件和动作旁边。

### J.1 必填字段

| field | requirement |
|---|---|
| `shadow_rule` | 背景复杂或贴纸需要压层时，用轻阴影；留白呼吸段可不用或极轻。 |
| `grain_rule` | 必要时加入轻纸感、胶贴感或手绘涂层，避免纯矢量平滑。 |
| `edge_roughness_rule` | 圆角和边缘不能太完美，允许微小断点和粗糙。 |
| `opacity_rule` | 低饱和不等于透明到融进背景；可读性先过 contrast gate。 |
| `blend_with_background` | 根据背景明暗、纹理、主体边界选择白边、阴影或降饱和。 |
| `contrast_with_subject` | 贴纸和主体要有层级，但 attention weight 不超过主体。 |
| `human_feel_gate` | 观察是否像自然贴纸、手绘标点或轻喜剧反应。 |

### J.2 选择规则

| condition | material rule |
|---|---|
| 需要压在真实画面上 | 加轻阴影、外轮廓和边缘粗糙，不只叠 opacity。 |
| 纸签、微字泡、表面贴纸 | 加纸感 / 胶贴感，但避免 CSS pill 或标签卡片。 |
| 短笔触、反应符号 | 保留手绘粗细变化，可用黑线 + 白边 + 轻阴影。 |
| 背景低对比 | 增强外轮廓或降低背景融合，不让贴纸消失。 |
| 背景干净 | 降低描边重量，避免贴纸比主体更重。 |
| 色彩太抢 | 降饱和，但必须保留可读性和前景层。 |

### J.3 失败判定

| failure | trigger |
|---|---|
| 像 UI 层 | 过于平滑、规则、无阴影、无边缘质感。 |
| 像 PPT | 标签化、说明牌化、矩形框、审片标注感。 |
| 像工程 SVG | 线条太干净、路径太均匀、没有粗细变化。 |
| 像素材包 | 与主体关系弱，风格像随手贴装饰。 |

判断标准：

- pass: 贴纸像贴在画面事件上，边缘和前景层自然。
- partial: 材质方向对，但仍有 UI / SVG 平滑感。
- fail: 贴纸是独立 overlay，和真实画面没有融合关系。
- evidence_required: 原始帧 + style sheet + material field 标注。

回退层级：`fail_material_flat_or_svg_like` 回到本节。

## K. style_sheet_acceptance_gate（风格板验收闸门）

进入 Remotion 前，必须先做静态风格板。风格板不是最终资产，也不是能力通过证明；它是选择视觉语言方向的闸门。

风格板必须包含：

1. 原始帧。
2. 每个候选事件 2-3 个方案。
3. 每个方案明确附属关系。
4. 每个方案明确形状来源。
5. 每个方案明确描边系统。
6. 每个方案明确比例距离。
7. 每个方案明确动效建议。
8. 每个方案明确失败风险。

通过标准：

- 一眼知道贴纸附属于谁。
- 贴纸不是漂浮 UI。
- 贴纸形状从事件长出来。
- 贴纸有足够前景层级。
- 不像 PPT / 工程 SVG / 儿童模板 / 电商爆炸贴。
- 比上一版 18 秒候选明显更接近对标贴纸语言。
- 用户 / GPT 能选出一个方向进入 Remotion。

失败标准：

- 方案只是换颜色。
- 方案只是换箭头 / 圈 / 波浪线。
- 看不出附属关系。
- 贴纸仍像图标库。
- 没有主体关系。
- 只靠文字解释才看得懂。

判断标准：

- pass: GPT / 用户能在候选方案里选出至少 1 个方向，并说清为什么它附着在视频事件上。
- partial: 有 1 个方案接近，但同组仍有模板感或材质风险。
- fail: 所有方案都是换色、换模板或无主体关系。
- evidence_required: 原始帧、方案图、字段标注、失败风险和回审结论。

回退层级：`fail_style_sheet_not_selectable` 回到本节重做，不进 Remotion。

## L. judgement_standards（判断标准）

| layer | pass | partial | fail | evidence_required |
|---|---|---|---|---|
| `anchor judgement` | 有可定位的主体、动作、物件、边缘、接触点、轨迹、留白或字幕关系。 | 大方向有锚点，但对象弱或帧级不清。 | 没有锚点，只想装饰。 | 事件表、原始帧、timecode。 |
| `attachment judgement` | 能一眼看出贴纸附属于谁或什么关系。 | 有对象，但距离或角度还像漂浮。 | 只有坐标，没有附属关系。 | 附属关系字段、style sheet 标注。 |
| `shape judgement` | 形状从事件、动作、边缘或物件推导。 | 方向对，但仍接近固定模板。 | `arrow / circle / wave / tag` 硬套。 | 形状语法字段、方案对照。 |
| `stroke judgement` | 描边有前景层、粗细变化和可读性。 | 可见但太薄或太干净。 | 像 UI icon / SVG path / PPT 标注。 | stroke 字段、contrast gate。 |
| `scale judgement` | 大小、距离、避让关系稳定，不压主体。 | 可见但略漂或略抢。 | 太大、太小、压脸、压字幕、抢主体。 | bounding box、safe area。 |
| `motion judgement` | 动效服务动作窗口或视觉反应窗口。 | 有入场和退场，但反应感弱。 | 参数动画、无事件抖动、未复听却精准卡点。 | start / mid / exit frames、BGM 状态。 |
| `material judgement` | 有纸感 / 胶贴感 / 手绘涂层或自然压层。 | 材质方向有，但仍偏平。 | 平面 UI、工程 SVG、PPT 标签。 | material 字段、原帧叠加对照。 |
| `composition judgement` | 贴纸、字幕、主体、留白互不抢。 | 局部拥挤但可修。 | 视觉噪音、贴纸数量冒充质量。 | 全帧构图、attention weight。 |
| `human feel judgement` | 像自然 vlog 情绪标点。 | 比组件强，但仍有审片标注感。 | 像工具演示、儿童模板、电商爆炸贴。 | GPT / 用户回审、风格板对照。 |
| `copy risk judgement` | 只抽象机制，原创重画。 | 有参考近似风险，需重画。 | 复制第三方贴纸、UI、包装、原文案、原字体。 | `do_not_copy` 字段、source audit。 |

## M. failure_feedback_routing（失败反馈路由）

失败后必须回到对应层，不允许盲目调参。

| failure_code | route_back_to | required_action | forbidden_response |
|---|---|---|---|
| `fail_no_anchor` | 镜头事件表 | 重写 `anchor_target` / `anchor_reason`，或写 `sticker_needed=false`。 | 硬贴装饰。 |
| `fail_wrong_attachment_relation` | 附属关系判断 | 重选 `sticker_attachment_relation`，说明附属于什么。 | 只调坐标。 |
| `fail_shape_not_event_derived` | 形状语法 | 从动作、边缘、接触点、物件表面重画形状。 | 只换颜色或套模板。 |
| `fail_stroke_too_thin_or_ui_like` | 描边系统 | 增加内线、外轮廓、粗细变化、轻阴影或粗糙边。 | 只放大贴纸。 |
| `fail_scale_distance_floaty` | 比例距离规则 | 重算主体比例、边缘距离、safe area 和 attention weight。 | 继续微调 opacity。 |
| `fail_motion_parameter_like` | 反应动效签名 | 重写入场、停留、退场与事件窗口的关系。 | 为了证明会动而继续调 duration。 |
| `fail_material_flat_or_svg_like` | 材质融合规则 | 加纸感、胶贴感、边缘粗糙、轻阴影或对比调整。 | 只改 hex color。 |
| `fail_style_sheet_not_selectable` | 风格板重做 | 重做 2-3 个事件方案，不进 Remotion。 | 强行进 Remotion probe。 |
| `fail_remotion_frame_review` | 单个事件 | 只修该事件的位置、大小、动效或删除该事件。 | 重写全机制。 |
| `fail_user_review_style_mismatch` | reference audit + style sheet | 回到参考机制抽象和风格板，不继续微调参数。 | Codex 自己继续抽卡。 |
| `fail_copy_reference_asset` | 抽象机制重画 | 删除复刻内容，保留机制，原创重画。 | 复制原图、原字、UI、包装。 |
| `fail_visual_clutter` | 减少贴纸或不贴 | 删除贴纸、缩短时长、写 `sticker_needed=false`。 | 继续叠更多贴纸。 |

## N. next_execution_bridge（下一轮执行桥接）

建议下一轮任务名：

`sticker_attachment_relation_style_sheet_probe（贴纸附属关系风格板探针）`

目标：

选 3 个有代表性的候选镜头，每个做 2-3 个静态方案。每个方案必须按以下链路输出：

```text
attachment_relation
-> shape_grammar
-> stroke_outline
-> scale_distance
-> motion_signature
-> material_compositing
-> acceptance_gate
```

下一轮允许：

1. 读取 `40 / 41 / 43 / 44`。
2. 选 3 个代表性原始帧。
3. 生成静态 style sheet 或可回审方案图。
4. 每个方案写清字段、失败风险和回退层级。
5. 用户 / GPT 回审后，才判断是否进入 Remotion 小范围 probe。

下一轮不允许：

1. 直接重改 18 秒候选。
2. 直接生成最终视频。
3. 用固定 `black_white_reaction_mark` / `yellow_attention_burst` 作为默认贴纸。
4. 调用图片 API 抽卡替代风格板判断。
5. 复制对标贴纸原图、原字体、原文案、平台 UI、包装、账号信息或品牌资产。

什么时候才能从风格板进入 Remotion：

1. GPT / 用户能选出至少 1 组方向。
2. 每组方向能回到 `attachment_relation` 和 `shape_grammar`。
3. 描边、比例、动效、材质均有字段。
4. 复制风险为 safe 或已重画。
5. Remotion 只做 3-5 个事件的小范围 probe。
6. probe 后必须产出 start / mid / exit frame review。

### N.1 mechanism_module_completeness_check（机制模块完整性检查）

| module | definition | applicable_scene | forbidden_scene | judgement_standard | failure_code | route_back |
|---|---|---|---|---|---|---|
| `sticker_attachment_relation` | 已定义 8 类附属关系。 | `when_to_use` 字段。 | `when_not_to_use` 字段。 | `pass / partial / fail / evidence_required`。 | 每类 relation 均有 `failure_code`。 | 回到附属关系判断。 |
| `shape_grammar` | 已定义 8 类形状语法。 | `suitable_anchor` 字段。 | `forbidden_use` 字段。 | `pass / partial / fail / evidence_required`。 | `fail_shape_not_event_derived`。 | 回到形状语法。 |
| `stroke_outline_system` | 已定义内线、外线、粗细变化、阴影和粗糙边。 | 背景复杂、前景层不足、线条太薄时适用。 | 背景干净时禁止过重描边。 | `contrast_gate` + `pass / partial / fail`。 | `fail_stroke_too_thin_or_ui_like`。 | 回到描边系统。 |
| `scale_distance_rule` | 已定义比例、距离、safe area 和 attention weight。 | 主体、脸、动作点、字幕需要避让时适用。 | 禁止用大贴纸弥补无锚点。 | `minimum_readability` + `maximum_attention_weight`。 | `fail_scale_distance_floaty`。 | 回到比例距离规则。 |
| `reaction_motion_signature` | 已定义 7 类反应动效签名。 | 动作窗口、视觉反应窗口、触点或呼吸段适用。 | BGM 未人工复听时禁止精准卡点。 | start / mid / exit frame review。 | `fail_motion_parameter_like`。 | 回到反应动效签名。 |
| `material_compositing_rule` | 已定义阴影、纸感、粗糙边、透明度和融合规则。 | 贴纸需要压在真实画面上时适用。 | 禁止平面 UI、PPT、工程 SVG 质感。 | `human_feel_gate`。 | `fail_material_flat_or_svg_like`。 | 回到材质融合规则。 |
| `style_sheet_acceptance_gate` | 已定义 Remotion 前的静态风格板验收。 | 进入任何 Remotion probe 前必须适用。 | 风格板不可选时禁止进 Remotion。 | 用户 / GPT 能选出方向。 | `fail_style_sheet_not_selectable`。 | 回到风格板重做。 |

## O. do_not_claim（禁止声明）

不得声明：

- `sticker system verified`
- `sticker visual language passed`
- `current video fixed`
- `Remotion integration completed`
- `publish candidate ready`
- `vlog director capability verified`

最终口径只能写：

`universal_sticker_visual_language_mechanism_completed_pending_probe_validation`

待验证：本机制是否能在后续不同 vlog / odd / 对标样片中稳定复用，必须等待多案例 style sheet、Remotion probe、frame review 和用户 / GPT 回审。
