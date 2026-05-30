# vlog 参考视频解析报告

## 1. 状态

- status: 已确认
- task_type: reference_analysis
- source_folder: `素材/vlog 参考`
- source_video_count: 2
- generated_at: `2026-05-30 23:45:42 +0800`
- capability_status: 待验证
- video_generation: 未执行
- external_api: 未调用
- source_files_changed: false
- report_path: `项目资料_docs/视频能力实验室_video_capability_lab/11_vlog参考视频解析_vlog_reference_analysis.md`
- path_note: 部分成立：本轮执行单中的 `/Users/fan/Documents/video_capability_lab` 在本机不存在；当前仓库规则已确认实际工作目录为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- folder_note: 部分成立：执行单写 `素材-vlog 参考`；当前仓库内实际素材目录为 `素材/vlog 参考`，且已确认正好 2 个视频。
- naming_note: 已确认：执行单建议的 `10_vlog_reference_analysis.md` 不符合本仓库“中文 + English”新建文件命名规则，且现有目录已有 `10_技术样片验收标准_probe_acceptance.md`，因此本报告使用 `11_vlog参考视频解析_vlog_reference_analysis.md`。

## 2. 解析对象

| video_id | file_name | duration | resolution | fps | has_audio | notes |
|---|---|---|---|---|---|---|
| video_01 | `01.MP4` | 25.38s | 720x960 | 60 | true | 竖屏生活切片 montage，含人物街景、交通工具、反射/遮挡、平台搜索尾卡。 |
| video_02 | `02.MP4` | 33.06s | 960x720 | 60 | true | 横屏产品与城市 vlog montage，含手写字、分屏 collage、标题叠层、平台搜索尾卡。 |

### 2.1 技术元数据

| video_id | path | file_size_bytes | modified_at | video_codec | video_bitrate | audio_codec | audio_channels | audio_sample_rate | audio_bitrate | total_bitrate | technical_validation |
|---|---|---:|---|---|---:|---|---:|---:|---:|---:|---|
| video_01 | `素材/vlog 参考/01.MP4` | 8060155 | `2026-05-27 22:53:26 +0800` | h264 | 2407088 | aac | 2 | 44100 | 128241 | 2540836 | 已确认：ffprobe 可读，ffmpeg decode passed |
| video_02 | `素材/vlog 参考/02.MP4` | 11704949 | `2026-05-27 22:52:34 +0800` | h264 | 2697573 | aac | 2 | 44100 | 128185 | 2832091 | 已确认：ffprobe 可读，ffmpeg decode passed |

## 3. 单视频解析

### 3.1 video_01

#### 一句话判断

已确认观察：`01.MP4` 是以日常街头观察、影子、交通工具、反射和慢速夜景收束组成的竖屏 vlog montage；可迁移的是“微镜头节奏 + 生活物件插片 + 自有尾卡”的机制，不可迁移的是平台 UI、水印、账号 ID、路人和可识别交通/地点元素。

#### 动态效果时间线

| timecode | duration | effect_name | visual_description | motion_type | layer_type | music_sync | implementation_candidate | remotion_fit | hyperframes_fit | ffmpeg_or_python_needed | risk | confidence |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| 00:00-00:02 | 2s | shadow_opening | 树影和人物影子作为开场，先给“人在路上”的感受而不是直接给主体。 | handheld walk / hard cut | source_video | 推测：可能贴近开场 beat | FFmpeg 裁切 + Remotion 时间轴编排 | medium | not_fit | FFmpeg needed；Python not required | 影子主体不可控，复刻原构图价值低 | medium |
| 00:02-00:06 | 4s | street_micro_cuts | 街头行人、遮阳伞、扶梯等生活片段快速切换。 | hard cuts / subject follow | source_video | 推测：切点可能卡在强拍附近 | Remotion sequence + FFmpeg cut list | medium | not_fit | FFmpeg needed；Python scene detect 可辅助 | 路人、车牌、地标不可复刻 | medium |
| 00:06-00:09 | 3s | object_and_indoor_insert | 单车、毛绒玩具特写、室内写字人物形成节奏降噪。 | close-up insert / static hold | source_video | 推测：从外景强动势切到室内弱动势 | Remotion 插片节奏层 | high | low | FFmpeg needed | 人脸和账号水印不可迁移 | medium |
| 00:09-00:13 | 4s | reflection_object_bridge | 玻璃反射、车把、钥匙扣等物件把街景转成 POV。 | handheld / detail cut | source_video | 部分成立：视觉切换明显，音频只做 RMS 粗估 | FFmpeg cut list + optional OpenCV motion scoring | medium | not_fit | FFmpeg needed；Python/OpenCV optional | 可识别车牌、人物、玩偶 IP 风险 | medium |
| 00:13-00:18 | 5s | mobility_montage | 电动车/单车/树荫/售卖机等城市移动切片连续出现。 | moving subject / hard cuts | source_video | 推测：多处切换可能对齐强弱拍 | Remotion timeline markers | medium | not_fit | FFmpeg needed；Python scene detect optional | 可识别交通工具、路人、地点 | medium |
| 00:18-00:22 | 4s | evening_slowdown | 夜间街景和坐着的人物收束，镜头节奏从快切转为停留。 | slower hold / ambient transition | source_video | 部分成立：画面节奏明显放慢，精确 beat 待验证 | Remotion hold + opacity transition | high | low | FFmpeg needed | 人物肖像不可复刻 | medium |
| 00:22-00:25 | 3s | platform_search_end_card | 结尾进入平台搜索卡和二维码式引导页面。 | static card / end hold | platform_ui | 已观察到画面收束；音乐对齐待验证 | 自有 `glass_cta_end_card`，不得复刻平台 UI | high | medium | FFmpeg not required for原创组件 | 平台 UI、logo、二维码、搜索框不可复刻 | high |

#### 特图 / 特殊图层 / 标题卡

- 已确认观察：全片持续出现平台 watermark、账号 ID 和搜索提示，这些都属于不可迁移资产。
- 已确认观察：22s 后出现平台搜索尾卡，结构上可以抽象成“自有 CTA end card”，但不能复刻平台 logo、二维码、搜索框、原文案或原样式。
- 部分成立：9s-13s 的反射/遮挡镜头可作为“生活物件插片 + POV 过桥”的机制参考。
- 待验证：未观察到明确的手写字节奏层或原创标题卡；不能把 video_01 写成手写字能力样例。

#### 音乐节奏 / 卡点

本轮只做 `RMS energy peak` 粗估，未安装或调用 beat tracking 依赖。以下时间点只能作为低置信音量峰和人工复听索引，不是精准 beat_map。

| timestamp | audio_signal_type | visual_event | sync_confidence | implementation_use | notes |
|---|---|---|---|---|---|
| 00:01.50 | RMS energy peak | 影子开场后的早期切换 | low | 通用建议：可作为复听点 | 低置信 RMS 峰值 |
| 00:06.50 | RMS energy peak | 单车 / 物件插片段附近 | low | 通用建议：可作为 cut marker 候选 | 需要人工复听 |
| 00:11.00 | RMS energy peak | 车把 / 街头移动段附近 | medium | 部分成立：可进入粗 beat_map 草稿 | 该段 RMS 较高 |
| 00:12.50 | RMS energy peak | 交通移动段附近 | medium | 部分成立：可进入粗 beat_map 草稿 | 不是精准 beat |
| 00:15.00 | RMS energy peak | 树荫 / 城市切片段附近 | medium | 部分成立：可进入粗 beat_map 草稿 | 需要人工复听 |
| 00:21.50 | RMS energy peak | 夜景收束与尾卡前 | medium | 部分成立：适合检查结尾卡点 | 全片最高 RMS 窗之一 |

#### 可迁移机制

- 影子或背影作为开场节奏，而不是直接展示主体。
- 2-4 秒一组的生活切片 montage。
- 物件插片连接空间切换，例如车把、钥匙扣、桌面、反射。
- 快切后用夜景或静态镜头降速收束。
- 结尾做项目自有 CTA end card。

#### 不可迁移资产

- 平台 UI、logo、watermark、账号 ID、搜索框、二维码式入口。
- 路人、人脸、头像、账号信息。
- 车牌、交通工具标识、可识别地点和商家环境。
- 原声音或音乐版权元素。
- 原字体、原贴图、原文案。

### 3.2 video_02

#### 一句话判断

已确认观察：`02.MP4` 是产品手持、城市移动、手写字、分屏 collage、标题叠层和平台尾卡组合的横屏 vlog；最值得迁移的是“手写字节奏层”“分屏 collage”“产品 hero + 标题叠层”“自有 CTA end card”的机制，所有品牌包装、平台 UI、原音乐和可识别人物/地点都不可复刻。

#### 动态效果时间线

| timecode | duration | effect_name | visual_description | motion_type | layer_type | music_sync | implementation_candidate | remotion_fit | hyperframes_fit | ffmpeg_or_python_needed | risk | confidence |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| 00:00-00:03 | 3s | product_opening | 饮品杯与桌面/手部动作开场，随后接交通空间。 | hard cuts / hand motion | source_video + brand_asset | 推测：开头产品露出可能对齐强拍 | Remotion product hero layout | high | medium | FFmpeg needed | 品牌包装、logo、店铺元素不可复刻 | high |
| 00:03-00:06 | 3s | corridor_handwriting | 走廊、手持杯、手写字短语穿插。 | walking shot / overlay hold | source_video + text_layer | 部分成立：文字出现像节奏点 | `handwriting_beat_layer` probe | high | low | Python audio markers optional | 原手写字体和文字不可复刻 | high |
| 00:06-00:10 | 4s | cutout_flash_title | 黑底手写字、人物白色抠像发光、砖墙街区切换。 | flash / mask reveal / hard cut | text_layer + mask_layer | 推测：flash 与音量峰可能相关 | Remotion mask + text animation；先降级为纯形状/文字 | medium | low | FFmpeg extraction；Python/OpenCV mask only if needed | 人物抠像、肖像、原字形风险高 | medium |
| 00:10-00:14 | 4s | product_location_title | 手持杯叠加大号中文标题，城市/天空/杯身形成特图。 | handheld hero / title overlay | source_video + title_layer | 部分成立：标题出场可能跟随强拍 | Remotion title overlay + crop | high | medium | FFmpeg needed | 品牌杯身和原文案不可迁移 | high |
| 00:14-00:17 | 3s | split_screen_transit | 两条电车上下分屏，叠手写字横跨画面。 | split-screen / horizontal movement | collage_layer + text_layer | 已观察到明显视觉卡点；音频对齐待验证 | `split_screen_collage` + handwriting overlay | high | not_fit | FFmpeg cut/crop needed | 交通工具标识和线路信息不可复刻 | high |
| 00:17-00:21 | 4s | station_walk_sequence | 地铁/站内/街边行走镜头串联。 | subject follow / hard cut | source_video | 推测：移动镜头承担节奏过桥 | Remotion sequence + FFmpeg crop | medium | not_fit | FFmpeg needed；OpenCV motion optional | 路人、站内标识不可迁移 | medium |
| 00:21-00:26 | 5s | product_reprise | 重新回到饮品、购物袋、手机扫码等产品行为。 | close-up / hand action | source_video + brand_asset | 部分成立：产品再出现是结构重心 | Remotion product card / hero slot | high | medium | FFmpeg needed | 品牌包装、扫码页、原店铺资产不可复刻 | high |
| 00:26-00:30 | 4s | texture_product_inserts | 杯子放在叶丛、砖墙、地面等质感背景上，含白色手写字。 | static product hold / angle change | source_video + text_layer | 推测：静态 product hold 可能做降速段 | Remotion still/card composition | high | medium | FFmpeg frame/clip extraction | 品牌杯身不可复刻 | high |
| 00:30-00:33 | 3s | platform_profile_end_card | 平台账号搜索尾卡收束。 | static card / end hold | platform_ui | 已观察到结尾收束；音乐对齐待验证 | 自有 `glass_cta_end_card`，不得复刻平台 UI | high | medium | FFmpeg not required for原创组件 | 平台 UI、logo、搜索框、账号头像不可复刻 | high |

#### 特图 / 特殊图层 / 标题卡

- 已确认观察：手写字作为节奏层多次出现，包含黑底手写字、跨画面横向手写字、白色短词和中文标题叠层。
- 已确认观察：14s-17s 存在上下分屏 collage，适合抽象成 `split_screen_collage`。
- 已确认观察：9s 左右出现人物白色抠像/发光形态，属于高风险效果，第一轮不建议直接做真实人物抠像复刻。
- 已确认观察：全片有平台 watermark、账号 ID、品牌杯身、包装、交通/站内标识、搜索尾卡。
- 部分成立：部分镜头带 film border / vignette 观感，可抽象成原创边框或轻微暗角，但不能复制原素材风格包。

#### 音乐节奏 / 卡点

本轮只做 `RMS energy peak` 粗估。`02.MP4` 的音量峰更明显，但仍不能写成精准 beat tracking。

| timestamp | audio_signal_type | visual_event | sync_confidence | implementation_use | notes |
|---|---|---|---|---|---|
| 00:02.25 | RMS energy peak | 产品开场 / 交通切换附近 | medium | 部分成立：可作为 beat_map 草稿候选 | 高 RMS 窗 |
| 00:06.75 | RMS energy peak | 手写字 / 走廊段附近 | medium | 部分成立：适合复听手写字入场 | 全片最高 RMS 窗之一 |
| 00:10.75 | RMS energy peak | 大标题与杯身特图附近 | medium | 部分成立：可作为 title marker 候选 | 需要人工复听 |
| 00:16.00 | RMS energy peak | 分屏电车 collage 附近 | medium | 部分成立：适合分屏 probe 的候选 marker | 高 RMS 窗 |
| 00:20.50 | RMS energy peak | 站内 / 城市移动段附近 | medium | 通用建议：可作为转场 marker 候选 | 不是精准 beat |
| 00:23.75 | RMS energy peak | 产品 reprise 段附近 | medium | 部分成立：可作为产品 hero 再入场 marker | 高 RMS 窗 |
| 00:26.00 | RMS energy peak | 质感背景产品插片附近 | low | 通用建议：人工复听 | 低置信 |
| 00:29.75 | RMS energy peak | 尾卡前质感镜头附近 | low | 通用建议：人工复听 | 低置信 |

#### 可迁移机制

- 手写字作为节奏层：文字短、出现快、贴近镜头切换或强拍。
- 标题叠实拍：把地点感或情绪词作为独立 title layer，而不是做完整字幕。
- 分屏 collage：用上下或网格结构并排展示两段移动镜头。
- 产品 hero：手持产品或静物产品进入画面中央，配短标题。
- CTA end card：只保留“结尾收束 + 搜索/复审意图”的机制，换成项目自有原创卡片。
- glitch / flash 只作为外围转场或文字入场，不遮挡主体信息。

#### 不可迁移资产

- 平台 UI、logo、watermark、账号 ID、搜索框、头像。
- 品牌杯身、品牌包装、店铺海报、商标。
- 路人、人脸、人物白色抠像原素材。
- 地铁/交通/站内标识、城市地标和可识别车辆。
- 原字体、原贴图、原文案、原声音或音乐版权元素。

## 4. 横向对比

| 维度 | video_01 | video_02 | 可迁移判断 |
|---|---|---|---|
| 画幅 | 竖屏 720x960 | 横屏 960x720 | Remotion probe 应同时考虑 vertical / landscape 配置，但第一轮建议选一种画幅降低变量。 |
| 主要结构 | 生活切片 + 夜景收束 + 平台尾卡 | 产品 hero + 手写字 + 分屏 + 平台尾卡 | video_02 的组件更清晰，更适合作为第一轮 component_probe 输入参考。 |
| 手写字 | 待验证：未观察到明确手写字节奏层 | 已确认观察：多处手写字/标题层 | 第一 probe 建议从 video_02 抽象，不使用原字体或原文字。 |
| 分屏 collage | 待验证：未观察到明确分屏 | 已确认观察：电车上下分屏 | 第二 probe 建议做原创分屏布局。 |
| CTA end card | 已确认观察：平台搜索尾卡 | 已确认观察：平台账号尾卡 | 机制可参考，资产不可复刻。 |
| 音乐卡点 | 推测：RMS 峰较分散 | 部分成立：RMS 峰较明显 | 两者都需要人工复听或后续 beat/onset probe。 |

结论：机制可参考，资产不可复刻。

## 5. 能力矩阵

| 效果 | 当前状态 | Remotion | HyperFrames | FFmpeg | Python / OpenCV | 是否建议 probe | 原因 |
|---|---|---|---|---|---|---|---|
| 手写字节奏层 | 已确认观察 | high：文字路径/透明度/入场节奏适配 | low：不适合承载真实证据段 | low：只需素材裁切 | medium：后续可读取 beat_map / RMS markers | 是 | video_02 多次出现，组件边界清楚，资产替换成本低。 |
| 分屏 collage | 已确认观察 | high：布局、裁切、时间轴可控 | not_fit：不应放在卡片动效层 | medium：可预裁切片段 | low：可选做运动评分 | 是 | video_02 的上下电车分屏是清晰参考机制。 |
| 自有 CTA end card | 已确认观察 | high：原创尾卡可实现 | medium：适合 glass card 但不能复刻平台 UI | low：不依赖 | low：不依赖 | 是 | 两个视频都有平台尾卡，适合替换为项目自有回审卡。 |
| 产品 hero + 标题叠层 | 已确认观察 | high：产品槽位、标题层、遮罩可做 | medium：可做卡片式产品信息，但不得做真实证据段 | medium：素材裁切 | low：不依赖 | 后置 | 品牌资产风险高，应先用自有/占位素材验证机制。 |
| silhouette / mask flash | 部分成立 | medium：可用原创形状或占位人物做降级版 | low | medium：需要素材预处理 | medium：真实抠像才需要 OpenCV / segmentation | 不建议第一轮 | 人物抠像涉及肖像和技术变量，容易扩大边界。 |
| glitch / flash / color smear | 部分成立 | medium：转场层可做 | low | medium：FFmpeg filter 可辅助 | low | 后置 | 应先验证基础文字/分屏/尾卡，再做外围风格扰动。 |
| BGM beat_map | 推测 | medium：Remotion 可消费 markers | low | medium：音频提取可做 | high：需要 beat/onset/RMS 分析 | 后置 | 本轮只有 RMS 粗估，不足以写成精准 beat tracking。 |
| 平台 UI / 品牌复刻 | 不建议 | not_fit | not_fit | not_fit | not_fit | 否 | 平台 UI、logo、账号、二维码、品牌包装均不可迁移。 |

## 6. 最值得先 probe 的 3 个组件

### 6.1 第一优先：Remotion 手写字节奏层

- status: 待验证
- source_reference: video_02
- input_fields: `text_items[]`, `start_time`, `duration`, `position`, `stroke_style`, `opacity_curve`, `beat_marker_source`
- output: 原创手写字 overlay component，不使用原字体、原文案或原平台水印。
- acceptance: 文字能按 marker 入场/退场，画面主体不被遮挡，截图回审可读。

### 6.2 第二优先：Remotion 分屏 collage

- status: 待验证
- source_reference: video_02
- input_fields: `clips[]`, `layout`, `crop_rect`, `gap`, `border`, `start_time`, `duration`
- output: 原创上下或网格分屏 composition。
- acceptance: 两个或多个片段稳定对齐，尺寸不跳动，边界清晰，不复刻原交通素材。

### 6.3 第三优先：自有 CTA end card

- status: 待验证
- source_reference: video_01 + video_02
- input_fields: `title`, `subtitle`, `action_label`, `review_context`, `duration`, `background_style`
- output: 项目自有 `glass_cta_end_card`，用于 review / next_goal 收束。
- acceptance: 不出现平台 logo、二维码、真实搜索框、账号头像或原文案。

## 7. 不建议第一轮做的效果

- 不建议：复刻平台搜索尾卡、二维码、logo、账号页、搜索框。
- 不建议：复刻品牌杯身、包装、店铺海报或第三方商标。
- 不建议：真实人物抠像 / 肖像发光 silhouette。
- 不建议：直接复制原手写字体、原贴图、原文案。
- 不建议：把 RMS 粗估写成精准 beat_map。
- 不建议：第一轮就做 glitch / flash / color smear 的完整风格包。

## 8. 下一轮 Codex 可执行方向

1. 建立 `component_probe` 执行合同：`Remotion 手写字节奏层`。
2. 为 probe 准备原创占位素材和原创短句，不使用参考视频里的品牌、平台 UI、人物或地点。
3. 输出最小验收包：manifest、输入 JSON、截图或 contact sheet、复跑命令、失败判定。
4. 后续再做 `split_screen_collage`，最后做 `glass_cta_end_card`。
5. BGM 只先使用 RMS markers 草稿；精准 beat/onset 需要单独 probe，不能在本轮写成已确认能力。

## 9. 阻断项与不确定项

- 部分成立：执行单旧路径 `/Users/fan/Documents/video_capability_lab` 不存在；当前仓库事实确认实际路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 部分成立：执行单素材目录名与仓库实际目录不同，实际为 `素材/vlog 参考`。
- 待验证：音乐节拍只做 RMS 粗估，没有真实 beat tracking。
- 待验证：Remotion / HyperFrames 能力没有真实 probe，本报告只给下一轮组件候选。
- 待验证：参考视频中的人物、品牌、平台 UI 和地点授权情况；默认不可迁移。
- 推测：部分镜头切点可能与音乐强拍相关，需要人工复听确认。

## 10. 保真检查

- 是否把旧项目解析当成当前事实：否；本轮基于当前仓库 `素材/vlog 参考` 重新读取。
- 是否复刻第三方资产：否；报告只抽象机制，并列出不可迁移资产。
- 是否把待验证能力写成已确认：否；只把观察到的参考效果写成 `已确认观察`，Remotion / HyperFrames / BGM 能力仍为 `待验证`。
- 是否提交视频 / 图片 / 音频：否；临时抽帧、音频和 contact sheet 只用于本轮分析，提交前必须删除或保持未 stage。
