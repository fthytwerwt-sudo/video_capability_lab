# 对标视频底线失败标准

## 1. 状态

- task_type: `reference_bottom_line_fail_gate`
- content_status: `reference_bottom_line_gate_completed_fix_pending`
- generated_at: `2026-06-01`
- file_change_scope: `mechanism_docs_only`
- video_generation: 未执行
- remotion_edit: 未执行
- external_api_call: 未执行
- runtime_artifacts_committed: 未执行

已确认：本文件只补齐 `reference_bottom_line` 与 `hard_fail_gate`。它不能写成当前 30 秒样片已修复，也不能写成内容审美已经通过。

## 2. 机制定位

`reference_bottom_line` 的定位是：对标视频不是装饰性灵感，不是“看过就算参考过”，而是所有 vlog demo 的最低失败标准。

已确认：本文件中的失败标准是长期不变的底线。

已确认：它不随当前 demo、BGM、素材包、参考视频或风格变化而改变。

已确认：变化的是参考输入和风格参数，不变的是判断关系和失败底线。

本机制解决的问题：

- 防止把“有字幕、有贴纸、有转场、有音乐”误判为“像对标视频”。
- 防止把参考视频表面元素直接搬进原创视频，造成 `fail_reference_asset_copy`。
- 防止只按数量补事件，而没有解释每个事件学习了参考视频里的什么功能。
- 防止渲染成功后才发现用户看不出对标视频的感觉。

本机制不解决的问题：

- 不直接修复当前视频。
- 不直接改 caption / sticker 的 x、y、fontSize、SVG 尺寸。
- 不直接增加 transition。
- 不调用 API 生成贴纸、图片、音乐或视频。

## 3. 对标视频底线定义

对标视频底线不是“画面里出现相似元素”，而是以下四件事同时成立：

1. 每个被学习的参考点都有清楚的 `reference_function`。
2. 每个参考点都写明 `not_to_copy`，避免复刻原平台、品牌、字体、贴图、原文案、二维码、账号页和原音乐。
3. 每个目标事件都能绑定到 `visual_selection_table` 与 `video_event_table`，说明为什么这个画面、这个字幕、这个贴纸、这个转场在这里成立。
4. 渲染后逐帧回审时，用户能感受到“这条视频学到了对标视频的节奏、语气、功能和风格”，而不是只看到一堆随机补丁。

一句话底线：如果用户看不出对标视频的感觉，即使技术 render 成功，也必须判定为内容失败。

## 4. hard fail gate（硬失败闸门）

`hard_fail_gate` 是渲染前和渲染后共同使用的硬失败列表。任何一项触发，都不得写成内容通过判断。

| fail_code | 触发条件 | 判定结果 | 修复方向 |
|---|---|---|---|
| `fail_no_reference_function` | 参考点只写了“学某个视频”，没有说明学习功能。 | blocked before render | 补 `reference_function`，说明它服务情绪、节奏、信息、停顿、幽默、尾卡还是视觉呼吸。 |
| `fail_reference_judgement_missing` | 没有读取 `reference_judgement_library`，也没有新增对标解析，却声称学了对标。 | blocked before render | 先读取或补全判断库；无新增对标视频时使用已有沉淀并标注来源。 |
| `fail_reference_judgement_unused` | 判断库已有相关标准，但三张表没有调用或标注来源。 | blocked before render | 回到三张表补 `judgement_source` 和 `judgement_type`。 |
| `fail_reference_timecode_fabricated` | 无新增对标视频或未人工复核，却编造 `reference_timecode`。 | blocked / fail | 改为 `library_derived`，并将 `reference_timecode_status` 标为 `not_applicable_library_derived`。 |
| `fail_surface_copy_without_function` | 只复制贴纸、文字、黑底、分屏、字体感等表面，没有说明为什么用。 | blocked before render / fail after render | 改成函数式学习，先写功能，再设计原创表达。 |
| `fail_event_quantity_as_quality` | 用 caption/sticker/clip/transition 数量证明审美达标。 | fail | 改用功能匹配、风格匹配和 frame-level review。 |
| `fail_no_visual_selection_table` | 没有 `visual_selection_table` 就进入剪辑或 render。 | blocked before render | 先写画面选择表，说明画面为什么合适、为什么不能全一样。 |
| `fail_no_video_event_table` | 没有 `video_event_table` 就直接写 Remotion event。 | blocked before render | 先写视频事件表，绑定时间、画面、字幕、贴纸、转场和音乐。 |
| `fail_no_frame_review` | 渲染后没有抽帧或逐帧检查 caption/sticker/transition 是否成立。 | fail after render | 补 `frame_level_review_points`，按关键帧回审。 |
| `fail_reference_mismatch` | 目标视频学习点和选定参考视频不属于同一功能或语气。 | blocked / fail | 重新选择 reference point 或改目标事件。 |
| `fail_random_patchwork` | 字幕、贴纸、画面、转场像拼贴补丁，没有统一事件逻辑。 | fail after render | 重写事件关系，减少无功能元素。 |
| `fail_caption_not_reference_like` | 字幕只是在解释画面，没有对标参考视频的语气、停顿、轻重和出现时机。 | blocked / fail | 给每条 caption 补 `semantic_role`、`reference_function`、placement reason。 |
| `fail_sticker_not_reference_like` | 贴纸只是“可见”，但不服务情绪、动作、节奏或画面锚点。 | blocked / fail | 给每个 sticker 补 `anchor_target`、`minimum_visible_size`、`shot_binding_reason`。 |
| `fail_sticker_graphic_mismatch` | 贴纸有锚点和位置，但图形、颜色、质感或风格与镜头 / 整片 vlog 语气冲突。 | blocked / fail | 补 `sticker_visual_fit`、`graphic_role`、`color_fit`、`texture_fit`、`style_conflict`，删除或换掉不匹配图形。 |
| `fail_transition_not_reference_like` | 转场只为了炫技或补动效，没有对标视频里的切换功能。 | blocked / fail | 给每个 transition 补 `transition_role`、`music_moment`、`reference_function`。 |
| `fail_music_visual_mismatch` | 音乐重拍、停顿、呼吸点与画面/字幕/转场不匹配。 | blocked / fail | 先标 `music_moment`，再决定 clip change、caption in/out、transition。 |
| `fail_style_inconsistency` | 同一条视频内风格、语气、贴纸、字幕、转场像来自多个模板。 | fail after render | 统一 motif、色彩、字体层级、运动节奏和留白。 |
| `fail_reference_asset_copy` | 复刻参考视频的平台 UI、品牌资产、账号页、二维码、原贴图、原文案、原音乐。 | blocked / fail | 删除复刻资产，改为原创表达和功能迁移。 |

## 5. 对标学习判断表

后续任何对标学习都必须先读取 `29_对标判断库机制_reference_judgement_library.md`，再生成 `reference_learning_checklist`。本轮有新增对标视频时，新增判断用于扩充和校准判断库；本轮无新增对标视频时，必须使用已有判断库执行，不得伪造本轮参考 timecode。

| field | required | 用途 |
|---|---:|---|
| `reference_id` | yes | 指向具体参考视频或参考片段。 |
| `reference_timecode` | conditional | 有新增对标视频或人工复核时填写；无新增对标视频时标 `not_applicable_library_derived`。 |
| `judgement_source` | yes | 标注 `library_derived`、`new_reference_derived`、`user_feedback_derived` 或 `needs_reference_judgement`。 |
| `judgement_type` | yes | 标注调用的判断类型，如 `sticker_style_judgement` 或 `caption_mood_judgement`。 |
| `reference_function` | yes | 说明该参考点的真实功能，例如情绪停顿、动作强调、信息节奏、转场缓冲、尾卡收束。 |
| `not_to_copy` | yes | 明确不可复制的平台 UI、品牌资产、字体、贴图、原文案、账号页、二维码、原音乐。 |
| `target_event_id` | yes | 绑定本片目标事件，避免参考点悬空。 |
| `function_match` | yes | 判断目标事件是否实现了同类功能。 |
| `style_match` | yes | 判断目标表达是否和整片风格一致。 |
| `failure_if_missing` | yes | 写清字段缺失时触发的失败项。 |

示例空表：

| reference_id | reference_timecode | judgement_source | judgement_type | reference_function | not_to_copy | target_event_id | function_match | style_match | failure_if_missing |
|---|---|---|---|---|---|---|---|---|---|
| `ref_XX` | `not_applicable_library_derived` | `library_derived` | `待填写` | `待填写` | `待填写` | `event_XX` | `待验证` | `待验证` | `fail_no_reference_function` |

## 6. 字幕/贴纸底线

字幕底线：

- 每条 caption 必须有 `semantic_role` 和 `reference_function`，不能只写“解释画面”。
- caption 的出现时机必须绑定动作、音乐或情绪停顿。
- caption 的字号、位置、停留时间必须能通过关键帧回审，不得遮挡主体。
- 触发 `fail_caption_not_reference_like` 时，不允许只微调 x/y；必须先重写字幕事件理由。

贴纸底线：

- 每个 sticker 必须有 `anchor_target`，说明贴的是哪个动作、主体、情绪或节拍。
- 每个 sticker 必须有 `minimum_visible_size`，不能“代码里有但肉眼弱到无意义”。
- 每个 sticker 必须有 `shot_binding_reason`，说明为什么这张画面需要它。
- 每个 sticker 必须有 `sticker_visual_fit`，说明贴纸图形、颜色、质感和整体 vlog 风格是否相配。
- 每个 sticker 必须有 `graphic_role`，说明它是指向、圈注、轨迹、呼吸、动作短标签还是粗峰值候选。
- 每个 sticker 必须有 `color_fit` 和 `texture_fit`，避免高饱和模板感、过浅不可见、硬 UI 质感或随机 SVG 库感。
- 每个 sticker 必须有 `style_conflict` 判断；像随机素材包、儿童模板、电商爆炸贴或赛博 UI，直接触发 `fail_sticker_graphic_mismatch`。
- 触发 `fail_sticker_not_reference_like` 时，不允许只加数量；必须先删掉无功能贴纸，再补功能明确的贴纸。
- 有 `anchor_target` 不等于贴纸成立；如果 `sticker_visual_fit` 不成立，必须删除、换图形语气或降低颜色强度。

## 7. 转场底线

转场不是装饰。后续任何 transition 都必须说明 `transition_role`，并绑定音乐、画面关系和参考功能。

必填字段：

| field | required | 用途 |
|---|---:|---|
| `transition_id` | yes | 唯一转场编号。 |
| `from_visual` | yes | 转场前画面。 |
| `to_visual` | yes | 转场后画面。 |
| `transition_role` | yes | 转场功能，例如情绪换气、地点切换、动作接续、节拍落点、段落翻页。 |
| `music_moment` | yes | 绑定音乐重拍、停顿、鼓点、呼吸点或静音点。 |
| `reference_function` | yes | 说明参考视频里的转场功能，而不是复制其表面效果。 |
| `failure_rule` | yes | 字段缺失或效果不成立时触发的失败规则。 |

示例空表：

| transition_id | from_visual | to_visual | transition_role | music_moment | reference_function | failure_rule |
|---|---|---|---|---|---|---|
| `transition_XX` | `event_A` | `event_B` | `待填写` | `待填写` | `待填写` | `fail_transition_not_reference_like` |

## 8. 画面选择底线

画面选择必须先于字幕、贴纸和转场。

底线规则：

- 没有 `visual_selection_table` 时，禁止 render。
- 每个 visual 必须说明 `image_fit_reason`，回答“为什么放这个图/镜头比较合适”。
- 每个 visual 必须说明 `style_fit`，回答它是否符合整体视频风格。
- 每个 visual 必须说明 `variety_role`，避免全是同一种画面、同一景别、同一运动方式。
- 每个 visual 必须和 `motif_tag` 或段落情绪有关系，不能随机拼素材。
- 触发 `fail_no_visual_selection_table` 或 `fail_random_patchwork` 时，必须回到画面选择表，不得直接补 overlay。

## 9. 音乐配合底线

音乐不是背景噪声，也不能只写“有 BGM”。

底线规则：

- 每个关键 caption、sticker、transition 或 clip change 必须能说明是否绑定 `music_moment`。
- 如果音乐重拍和画面切换不对齐，触发 `fail_music_visual_mismatch`。
- 如果自动 marker 未经过人工复听，只能标为 `部分成立` 或 `待验证`，不得写成精准卡点。
- 如果音乐气质和画面/字幕/贴纸语气冲突，触发 `fail_style_inconsistency`。

## 10. 渲染前阻断条件

进入 Remotion render 前，必须具备以下文件或结构；缺任一项默认 blocked：

- `reference_judgement_library` 已读取，或本轮新增对标视频解析已合并进判断库。
- `fail_reference_judgement_missing` 未触发。
- `reference_bottom_line` 已写入本轮执行标准。
- `hard_fail_gate` 已逐项检查。
- `reference_learning_checklist` 已填完，不存在悬空参考点。
- `visual_selection_table` 已填完，且每个 visual 有 `image_fit_reason`、`style_fit`、`variety_role`。
- `video_event_table` 已填完，且每个 event 绑定画面、字幕/贴纸/转场/音乐关系。
- `failure_checklist` 已覆盖 caption、sticker、transition、music、style、reference asset copy。
- `frame_level_review_points` 已明确抽帧点和检查项。
- 如果本轮新增 transition，必须先填 `transition_role` 与 `reference_function`。

## 11. 渲染后失败判定

渲染后即使技术 metadata 正常，只要出现以下任一情况，也必须判定内容失败：

- 用户看不出对标视频的感觉。
- 画面像随机拼贴，触发 `fail_random_patchwork`。
- 字幕或贴纸存在但没有参考功能，触发 `fail_caption_not_reference_like` 或 `fail_sticker_not_reference_like`。
- 转场存在但不承担段落、节拍或情绪功能，触发 `fail_transition_not_reference_like`。
- 音乐和画面、字幕、贴纸、转场互相脱节，触发 `fail_music_visual_mismatch`。
- 只用事件数量、贴纸数量、caption 数量证明质量，触发 `fail_event_quantity_as_quality`。
- 复刻参考素材、平台 UI、品牌资产、原文案或原音乐，触发 `fail_reference_asset_copy`。

## 12. 下一轮如何接入 `visual_selection_table` 和 `video_event_table`

下一轮修复当前 30 秒样片时，执行顺序必须是：

1. 先为当前 30 秒样片生成 `reference_learning_checklist`，把每个学习点绑定到具体参考片段和 `reference_function`。
2. 再生成 `visual_selection_table`，说明每个画面为什么适合、如何避免同质、如何服务整体风格。
3. 再生成 `video_event_table`，把画面、字幕、贴纸、转场、音乐、motif 和失败规则绑定到同一事件。
4. 再生成 `failure_checklist` 和 `frame_level_review_points`。
5. 只有前四步通过 `hard_fail_gate`，才允许进入 Remotion 修复或 render。

已确认：本文件完成的是机制底线，不是视频修复。当前 30 秒样片仍为 `fix_pending`。
