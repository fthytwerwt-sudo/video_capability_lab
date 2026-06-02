# 对标视频贴纸锚点审计

## 1. status

- task_type: `reference_video_sticker_anchor_audit`
- generated_at: `2026-06-02`
- repository: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- branch: `main`
- selected_reference_video: `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`
- selected_reference_id: `new_ref_06`
- selected_candidate_id: `candidate_08`
- source_reference_pack: `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`
- temporary_evidence_dir: `tmp/对标贴纸锚点审计_reference_sticker_anchor_audit/`
- video_metadata_probe_status: `passed`
- api_call_allowed_this_round: `false`
- sticker_image_generation_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`
- content_status: `reference_video_sticker_anchor_audit_completed_no_asset_generated`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮只做对标视频贴纸锚点审计，不生成贴纸、不调用图片 API、不修改 Remotion、不 render。

已确认：本轮结论只抽象贴纸如何依附视频事件、主体、动作和物件，不复制第三方贴纸原图、平台 UI、账号信息、字体、文案或商业包装。

## 2. reference_video_identity

### 2.1 技术事实

`video-metadata-probe` 读取结果：

| field | value |
|---|---|
| file_path | `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4` |
| exists | `true` |
| file_size_bytes | `6459033` |
| duration_seconds | `25.911995` |
| width | `720` |
| height | `1280` |
| fps | `60.000` |
| video_codec | `h264` |
| audio_present | `true` |
| audio_codec | `aac` |
| audio_channels | `2` |
| decodable | `true` |
| validation_status | `passed` |

说明：以上只是 technical validation，不代表内容或审美已经通过。

### 2.2 候选收敛

本轮先从 `素材/vlog 参考` 下 12 条本地参考视频抽 1fps contact sheet，再按贴纸锚点密度和用户上一轮反馈语义收敛主对标。

| candidate | video | judgement | reason |
|---|---|---|---|
| `candidate_05` | `new_ref_03` / `v2700fgi0000d4fcrl7og65l2uj788u0.MP4` | secondary_reference | 有疑问号、手写字、黄色提示和反应符号，但整体更偏本地生活文字/贴纸混合，不是本轮最完整的 object-driven sticker anchor 系统。 |
| `candidate_08` | `new_ref_06` / `v2700fgi0000d85e6c7og65uq46kpmu0.MP4` | selected_reference | 连续出现动物、饮品、冰淇淋、瓶身、票据、玩具车等不同主体上的贴纸锚点，最能说明贴纸不是固定类别，而是跟着视频内容生成。 |
| `candidate_09` | `new_ref_07` / `v2800fgi0000d5tjk2fog65nr5lroa70.MP4` | rejected_for_primary | 有宠物疑问贴纸和黄色主体提示，但事件数量少，更适合作为局部补充。 |
| `candidate_12` | `new_ref_10` / `v2800fgi0000d88j3onog65rc228llgg.MP4` | rejected_for_primary | 有玩偶、饮品和黄色提示，但强依赖玩偶/IP/商业空间，不适合做当前主审计对象。 |

已确认：本轮未 blocked，原因是 `candidate_08` 在“多主体、多功能、多形态、连续锚点”四个维度明显更符合本轮 `reference_video_sticker_anchor_audit` 目标。

待验证：若用户之后指定另一条对标视频，本报告字段可复用，但必须按新视频重新抽帧审计。

## 3. sticker_anchor_event_audit

以下 timecode 基于 1fps contact sheet 和重点帧抽取，属于审计锚点，不是最终剪辑帧号。

| timecode | visible_scene | observed_sticker_or_overlay | anchor_target | anchor_reason | reference_function | do_not_copy |
|---|---|---|---|---|---|---|
| `00:00-00:02` | 黑底画布里的草地/小动物群 | 白描边手写字 / 反应字 | 动物群和画面下方留白 | 先用字给普通动物镜头加轻喜剧语气，不是先做标题页。 | `opening_tone_punctuation` | 原字形、原文案、平台水印。 |
| `00:02-00:03` | 车内花朵 / 小物件 | `Hello` 花朵小贴纸 | 花瓣和近景小物件 | 贴纸像物件自己在打招呼，主体从“普通花”变成可互动角色。 | `object_greeting` | 英文字样、贴纸原图、花朵原样式。 |
| `00:05-00:06` | 手持冰淇淋 | 黄色短笔触爆点 | 冰淇淋尖端和手部动作 | 黄色笔触只提示“这里是重点”，不作为通用太阳/爆炸贴。 | `attention_cue` | 笔触原形、原色值、构图比例。 |
| `00:06-00:07` | 建筑前小熊 / 远处主体 | 红心反应泡 | 小熊主体上方 | 情绪贴纸服务小主体的可爱感，贴纸不是画面主角。 | `emotion_punctuation` | 心形贴纸原图、建筑/账号 UI。 |
| `00:07-00:09` | 手持饮品 / 桌面饮品 | 猫脸、竖排小标签、表情贴纸 | 杯身、杯盖、手部动作 | 贴纸把饮品人格化，让产品/物件变成轻喜剧角色。 | `object_personification` | 品牌包装、猫脸原图、文字原样式。 |
| `00:11-00:13` | 手持瓶装饮料 | 斜向短字、圆形小符号、瓶身表情 | 瓶身标签和手持区域 | 信息不是独立 caption，而是贴在瓶身上强化“这个物件正在说话”。 | `product_mood_tag` | 商品标签、包装、文字和表情原样式。 |
| `00:13-00:14` | 小狗靠近路牌 / 户外信息牌 | 右下小字反应 | 小狗和路牌之间的注意力关系 | 小字像语气助词，提示观众看见小狗和环境的互动。 | `micro_reaction_word` | 路牌信息、原字形、平台 UI。 |
| `00:15-00:16` | 手持红色饮品 | 黑白表情线条 / 小脸 | 杯身正面 | 表情直接落在杯身材质上，形成“杯子有情绪”的一帧笑点。 | `object_face_reaction` | 表情原图、饮品品牌/包装。 |
| `00:17-00:18` | 草地玩具车 | 白色反应爆点 | 玩具车运动/停顿点 | 反应符号绑定小车事件，不是随便放在空白处。 | `motion_peak_punctuation` | 玩具车原品牌、白色爆点原形。 |
| `00:18-00:19` | 路面蓝色小物件 | 白色眼睛贴纸 | 蓝色物件中心 | 最小化贴纸让物件立刻变成角色，靠主体形状决定贴纸形态。 | `minimal_personification` | 眼睛原图、道路标识原样。 |
| `00:19-00:20` | 手指/票据近景 | 黑色弧线反应标记 | 手指接触票据的位置 | 反应线绑定手部动作点，帮助观众看见触碰/揭示瞬间。 | `touch_action_punctuation` | 票据信息、弧线原形。 |
| `00:20-00:21` | 商品包装近景 | 包装自带图形和角色信息 | 商品包装 | 这是素材本身的信息密度，不应误判成可迁移贴纸资产。 | `copy_risk_boundary` | 包装、IP、商业图形。 |

## 4. extracted_rules

### 4.1 主结论

已确认：对标视频里的贴纸不是固定的 `black_white_reaction_mark` 或 `yellow_attention_burst` 两个模板。

已确认：更准确的系统应是 `video_anchor_driven_sticker_system（视频锚点驱动贴纸系统）`：先看镜头里有什么主体、动作、物件和留白，再决定贴纸应承担哪种功能。

部分成立：上一轮抽象出的黑白反应标记和黄色注意力爆点仍然可作为两种常见结果，但不能作为未来所有镜头的固定贴纸类别。

### 4.2 贴纸先问的 8 个字段

后续任何 sticker event 进入实现前，必须先写清：

| field | question |
|---|---|
| `shot_id` | 这个贴纸属于哪一个镜头，不是全片模板。 |
| `timecode` | 贴纸出现在哪个具体事件点。 |
| `anchor_target` | 它绑定主体、动作、物件、轨迹、文字区域还是留白。 |
| `anchor_reason` | 为什么这个主体需要贴纸，不放会少什么。 |
| `sticker_role` | 是 `attention_cue`、`emotion_punctuation`、`object_personification`、`micro_reaction_word`、`motion_peak_punctuation` 还是 `copy_risk_boundary`。 |
| `shape_derived_from_event` | 形状从事件里来：物件脸、手部触碰、动作峰值、主体边缘、方向线，而不是从固定模板里来。 |
| `placement_relation` | 贴纸与主体的相对位置、距离、遮挡关系和避让规则。 |
| `copy_risk` | 是否接近第三方贴纸、平台 UI、包装、品牌、原字形或原文案。 |

### 4.3 失败规则

1. `fail_fixed_two_sticker_templates`: 每个场景都硬塞黑白反应标记或黄色爆点，判定失败。
2. `fail_no_video_anchor`: 贴纸没有 `anchor_target` 和 `anchor_reason`，判定失败。
3. `fail_component_showcase`: 贴纸像展示 SVG 组件能力，而不是服务镜头事件，判定失败。
4. `fail_copy_reference_asset`: 复制对标视频贴纸原图、平台 UI、原字体、原文案、包装或账号信息，判定失败。
5. `fail_text_label_as_sticker_only`: 只把 sticker 理解成文字标签或纸签拟声字，判定失败。
6. `fail_no_frame_review`: 实现后不抽帧检查贴纸是否真的贴在动作/物件上，判定失败。

## 5. next_execution_input

下一步不应直接执行旧的 `remotion_svg_reaction_sticker_probe`。

新的下一目标：

`video_anchor_driven_sticker_system_spec_before_remotion_probe`

执行顺序：

1. 先为目标样片建立 `sticker_anchor_event_table`，逐镜头写 `anchor_target`、`anchor_reason`、`sticker_role`、`shape_derived_from_event`、`placement_relation` 和 `copy_risk`。
2. 再把每个事件翻译成原创 SVG / Remotion vector 规格。
3. 最后才进入小范围 Remotion probe。
4. probe 后必须抽 start / mid / exit frames 做 frame-level review。

## 6. completion_state

- report_status: `reference_video_sticker_anchor_audit_completed`
- selected_reference_video: `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`
- selected_reference_id: `new_ref_06`
- selected_candidate_id: `candidate_08`
- selected_route: `video_anchor_driven_sticker_system`
- current_status: `reference_video_sticker_anchor_audit_completed_no_asset_generated`
- next_goal: `video_anchor_driven_sticker_system_spec_before_remotion_probe`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

不得声明：

- `sticker system approved`
- `visual language passed`
- `Remotion integration completed`
- `sticker asset pack completed`
- `video fixed`
- `vlog director capability verified`
