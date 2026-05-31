# 视频事件表与画面选择机制

## 1. 状态

- status: `mechanism_completed_fix_pending`
- task_type: `video_event_table_visual_selection_mechanism`
- generated_at: `2026-06-01`
- source_reference_report: `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`
- source_sample_report: `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`
- source_audit_report: `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md`
- video_generation: 未执行
- remotion_source_changed: false
- external_api: 未调用
- runtime_assets_changed: false
- content_status: `mechanism_only`

## 2. 机制定位

已确认：本机制不是固定审美模板。

已确认：本机制不是让所有 vlog 都按同一个流程剪。

已确认：本机制不是证明当前 30 秒样片已经通过审美验收。

已确认：本文件不是当前 30 秒 demo 修复专用机制。

已确认：本文件是通用 vlog 剪辑机制的一部分，服务所有未来 vlog 风格样片。

已确认：当前 demo 只是验证材料，不是项目目标；当前 demo 暴露了本机制缺口，但不得把项目主线收缩为修当前 demo。

本机制的作用是：将用户的审美锚点、参考视频风格、素材画面、音乐节奏、字幕贴纸、分屏尾卡，统一翻译成 Codex 能执行、能检查、能复盘的事件表。

核心原则：

1. 不锁死风格，但锁住判断关系。
2. 不固定每个镜头必须怎么剪，但每个镜头必须说明为什么出现。
3. 不固定每个贴纸放多大，但每个贴纸必须有锚定对象和最小可见标准。
4. 不固定所有 vlog 都用同一种素材，但每个画面必须符合当前视频的整体风格。
5. 不允许只凭素材可用、事件数量达标或 render 成功进入完成判断。

## 3. 触发条件

以下情况必须先使用本机制：

1. 用户要求做 vlog 风格、odd 风格、城市散步、海边呼吸、轻喜剧日常、scrapbook montage 等视频。
2. 用户提供参考视频、审美锚点、素材包、BGM 或字幕/贴纸方向。
3. Codex 准备进入 Remotion render 前，需要决定“放什么画面、放在哪段、为什么适合”。
4. 上一轮样片被用户指出像随机拼贴、像组件展示、像 PPT、字幕/贴纸不像参考视频。
5. 下一轮要修复 `30s_reference_sample_rebuild`、`caption_sticker_reference_audit` 或任何 vlog demo。

## 4. 视频事件表

`video_event_table` 是每个镜头、字幕、贴纸、转场、分屏、尾卡进入时间线前的强制字段表。

| field（字段） | 中文备注 |
|---|---|
| `event_id（事件编号）` | 每个镜头/字幕/贴纸/转场/尾卡的唯一编号。 |
| `time_range（时间范围）` | 这个事件在视频中的开始和结束时间。 |
| `visual_moment（画面时刻）` | 这一秒画面里发生了什么，比如熊猫抬头、脚印出现、云洞变亮、镜头切换。 |
| `shot_role（镜头作用）` | 这个镜头在整条视频里承担什么作用：开场、过桥、呼吸、高潮、回环、收束。 |
| `image_type（画面类型）` | 这个画面属于什么类型：手部、物件、脚步、纹理、远景、动物、城市、天空、食物、交通等。 |
| `image_fit_reason（画面适配理由）` | 为什么这个画面适合放在这里。 |
| `style_fit（风格匹配度）` | 这个画面是否符合当前 vlog 的整体风格。 |
| `motif_tag（母题标签）` | 这个画面属于哪个母题，比如 `sand_trace`（沙纹）、`bamboo_panda`（竹叶熊猫）、`mist_sea`（海雾）。 |
| `music_moment（音乐时刻）` | 音乐这一秒的状态：鼓点、转弱、停顿、高潮、落下、呼吸。 |
| `overlay_role（叠加层作用）` | 字幕/贴纸/图形在这里承担什么作用：提示、拟声、惊讶、降速、高潮、收束。 |
| `semantic_role（语义角色）` | 字幕文字的语义作用：情绪词、拟声词、歌词碎片、注意力提示、呼吸词。 |
| `anchor_target（锚定对象）` | 字幕/贴纸要贴住谁或什么动作，比如熊猫脸、脚印、云洞、手部、画面留白。 |
| `placement_rule（放置规则）` | 放在哪、离主体多远、朝哪个方向、不能遮挡什么。 |
| `minimum_visible_size（最小可见尺寸）` | 贴纸或字幕在 1080x1920 画面里至少多大，用户才能肉眼看见。 |
| `reference_function（参考功能）` | 这个设计学的是参考视频里的哪种功能，比如语气标点、注意力提示、降速呼吸、高潮提示。 |
| `variety_role（画面差异作用）` | 这个画面是否和前后画面形成差异，避免全片都是同一种图。 |
| `failure_rule（失败规则）` | 什么情况判定失败，比如像 PPT、像组件展示、离主体太远、贴纸看不见。 |

### 4.1 事件表最小模板

```markdown
| event_id | time_range | visual_moment | shot_role | image_type | image_fit_reason | style_fit | motif_tag | music_moment | overlay_role | semantic_role | anchor_target | placement_rule | minimum_visible_size | reference_function | variety_role | failure_rule |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
```

## 5. 画面选择标准

`visual_selection_table` 用来先判断“放什么画面合适”，再允许生成 `video_event_table`。画面选择不能只按“素材能用”判断，而要按以下关系判断。

### 5.1 `style_match（风格匹配）`

- 画面必须符合当前视频整体风格。
- 如果当前视频是轻松日常 vlog，不要突然放强商业广告感画面。
- 如果当前视频是海边/城市呼吸感，不要连续放太多高信息密度画面。
- 如果当前视频是 scrapbook 黑底呼吸感，黑底必须服务真实镜头分组，不得变成 PPT 卡片。

### 5.2 `motif_match（母题匹配）`

- 画面必须服务当前视频母题。
- 例如本轮 `sand_bamboo_sea_breath`（沙纹/竹叶/海雾/呼吸），不得随机插入完全无关素材。
- 每个 motif 必须能被观众感知，不得只是文件名或内部标签。
- motif 回环要通过同类元素、空间、颜色或动作建立，不是简单重复素材。

### 5.3 `shot_role_fit（镜头作用匹配）`

- 开场画面：适合物件、手部、脚步、纹理、运动。
- 过桥画面：适合交通、转身、遮挡、移动、空间切换。
- 高潮画面：适合大景、亮点、动作峰值、强构图。
- 呼吸画面：适合天空、水面、远景、静物、低动势。
- 尾卡背景：适合低干扰、稳定、有留白的画面。

### 5.4 `visual_variety（画面多样性）`

- 不能连续使用太多同一种画面。
- 同类画面连续出现超过 3 次，必须有过桥或差异。
- 差异可以来自：距离、运动方向、主体类型、明暗、色彩、构图、空间。
- 差异不是随机换素材，而是让观众感到节奏推进。

### 5.5 `overlay_fit（叠加适配）`

- 字幕/贴纸多的镜头，背景不能太乱。
- 画面主体很强时，贴纸必须更少。
- 留白明显的镜头适合字幕。
- 有小动作的镜头适合贴纸。
- 没有主体或动作的镜头，不适合贴纸。
- 字幕、贴纸、分屏、尾卡不得同时抢主体。

### 5.6 `music_fit（音乐适配）`

- 强节奏点适合短字幕、贴纸、闪一下。
- 弱节奏/降速段适合呼吸镜头和轻字幕。
- 没有音乐变化时，不要硬放贴纸。
- 自动 marker 只能作为粗参考；未人工复听前不得写成精准卡点。

### 5.7 画面选择表最小模板

```markdown
| clip_id | candidate_path | usable_range | image_type | visual_moment | style_fit | motif_tag | shot_role_fit | visual_variety | overlay_fit | music_fit | image_fit_reason | failure_rule | select_decision |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
```

## 6. 字幕/贴纸绑定规则

字幕和贴纸不是“后期装饰”，而是事件表里的语气层。每一条字幕/贴纸必须先回答以下问题：

| rule | required | explanation |
|---|---|---|
| `semantic_role` | yes | 字幕是什么语义：情绪词、拟声词、注意力提示、呼吸词、高潮词。 |
| `anchor_target` | yes | 字幕/贴纸贴住哪个主体、动作或留白。 |
| `placement_rule` | yes | 离主体多远、在哪个方向、避开什么主体。 |
| `minimum_visible_size` | yes | 在 1080x1920 中的最小宽高或画面占比。 |
| `reference_function` | yes | 学的是参考视频的功能，不复制参考贴纸样式。 |
| `shot_binding_reason` | yes | 为什么这个镜头需要这条字幕/贴纸。 |
| `frame_level_review_points` | yes | 渲染后要抽哪些帧检查 start / mid / end 是否成立。 |

失败线：

- 只有 x/y，没有 `anchor_target`，失败。
- 只有 sticker kind，没有 `reference_function`，失败。
- 只有 text，没有 `semantic_role`，失败。
- 只说“肉眼可见”，没有 `minimum_visible_size` 和抽帧证据，失败。
- 贴纸离主体太远、贴在空天空/空树叶/无意义边缘，失败。

## 7. 画面多样性规则

画面多样性不是越多越好，而是让每个镜头和前后镜头形成必要差异。

| dimension | 检查问题 | 合格 |
|---|---|---|
| 主体差异 | 前后是否都是同一种主体 | 主体可重复，但要有动作、距离或情绪差异 |
| 距离差异 | 是否连续都是近景或远景 | 近景、远景、局部、环境之间有节奏 |
| 运动差异 | 是否连续都是静态或同方向运动 | 静动交替，或用遮挡/移动做过桥 |
| 明暗差异 | 是否连续灰暗或连续高亮 | 高低能量有呼吸 |
| 色彩差异 | 是否突然跳到不属于当前风格的颜色 | 色彩变化服务情绪推进 |
| overlay 差异 | 是否每段都塞字幕/贴纸 | overlay 有留白，有出现和不出现的节奏 |

本轮 30 秒样片暴露的问题是：虽然存在 `18` 个微段落、`10` 个字幕、`11` 个贴纸，但还缺少每段画面在整体风格中的 `variety_role` 和 `image_fit_reason`。下一轮必须先补这个表。

## 8. 整体风格一致性规则

整体风格由以下输入共同决定：

1. 用户本轮审美锚点。
2. 参考视频的可迁移机制。
3. 当前素材可承载的真实画面。
4. BGM 的粗节奏和人工复听判断。
5. 字幕/贴纸/分屏/尾卡的统一语气。

风格一致不等于全片同质。合格状态是：画面有差异，但都服务同一个 motif、节奏和语气。

对于 vlog demo，默认检查：

- 是否真实镜头先行。
- 是否有观众可感知的 motif。
- 是否避免内部项目语言。
- 是否避免 PPT / card / component showcase。
- 是否让字幕成为情绪/节奏层，而不是说明层。
- 是否让贴纸成为语气标点，而不是抽象 SVG 展示。
- 是否让尾卡做自有收束，而不是复刻平台 UI。

## 9. 失败判定

以下情况判定为失败：

1. `image_random_patchwork（随机拼贴失败）`
   - 画面只是随机素材拼接，没有母题关系。

2. `image_same_type_repetition（同类画面重复失败）`
   - 连续多段都是同一种画面，没有距离/主体/运动/情绪变化。

3. `image_style_mismatch（风格不匹配失败）`
   - 某个画面突然破坏整体视频气质。

4. `image_overlay_conflict（画面与叠加层冲突失败）`
   - 画面太乱，字幕/贴纸放上去看不清。

5. `image_no_role（镜头无作用失败）`
   - 镜头不知道承担开场、过桥、高潮、呼吸还是收束。

6. `image_no_anchor（画面无锚点失败）`
   - 画面里没有可被字幕/贴纸锚定的主体或动作，却硬放贴纸。

7. `image_reference_mismatch（参考功能不匹配失败）`
   - 说是学参考视频，但只复制表面元素，没有学到它在参考里承担的功能。

8. `event_table_missing（事件表缺失失败）`
   - 没有 `visual_selection_table` 和 `video_event_table` 就直接 render。

9. `frame_review_missing（逐帧回审缺失失败）`
   - 渲染后没有抽 `frame_level_review_points` 检查字幕/贴纸真实画面表现。

## 10. 下一轮如何用于 Codex 执行

后续任何 vlog demo 下发给 Codex 前，必须先生成：

1. `visual_selection_table（画面选择表）`
   - 决定每个镜头为什么被选中。

2. `video_event_table（视频事件表）`
   - 决定每个字幕、贴纸、转场、尾卡为什么出现。

3. `failure_checklist（失败检查清单）`
   - 渲染前检查是否会像 PPT、组件展示、随机拼贴。

4. `frame_level_review_points（逐帧回审点）`
   - 渲染后必须抽哪些帧检查字幕/贴纸是否真的成立。

如果没有这些表，不允许直接 render。

### 10.1 下一轮 30 秒样片修复入口

下一轮修复 30 秒样片时，不允许直接改 x/y、fontSize、SVG 尺寸或贴纸数量。必须先创建或补全：

```text
visual_selection_table -> video_event_table -> failure_checklist -> Remotion implementation -> frame_level_review_points
```

下一轮最小完成条件：

- 每个镜头有 `image_fit_reason`、`style_fit`、`motif_tag`、`variety_role`。
- 每个字幕/贴纸有 `semantic_role`、`anchor_target`、`placement_rule`、`minimum_visible_size`、`reference_function`。
- 每个贴纸至少有 start / mid frame review point。
- 渲染后仍必须等用户人审，不能把技术验证写成内容通过。

## 11. 保真检查

- 是否修改 Remotion 源码：否。
- 是否重新 render：否。
- 是否调用外部 API：否。
- 是否安装依赖：否。
- 是否提交视频、图片、音频、`dist`、`tmp` 或 runtime assets：否。
- 是否把机制写成当前视频已通过：否。
- 是否把事件表机制写成已验证能力：否。
- 是否为下一轮 Codex 执行补齐字段和阻断条件：是。
