# 对标视觉语言到资产规格

## 1. status

- task_type: `reference_visual_language_to_asset_spec`
- target_sample: `三十秒对标样片-30s-reference-sample`
- source_library: `29_对标判断库机制_reference_judgement_library.md`
- source_replan: `28_对标视觉语言失败重判_reference_visual_language_replan.md`
- source_cascade: `30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md`
- content_status: `asset_spec_completed_asset_generation_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- new_reference_pack_this_round: `false`
- judgement_source: `library_derived`
- reference_timecode_policy: `not_applicable_library_derived`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- asset_generation_allowed_this_round: `false`
- output_type: `asset_spec_markdown`

已确认：本文件只把 `reference_judgement_library（对标判断库）` 翻译成当前 30 秒样片可执行的视觉语言资产规格。

已确认：本轮没有新增对标视频；本轮判断来源是 `library_derived（来自已有判断库）`。

已确认：本轮不得编造 `reference_timecode（参考时间点）`；所有来源时间点均标为 `not_applicable_library_derived`。

已确认：本文件不是贴纸资产包，不是 Remotion 修复，不是 render 报告，不是 API 生成结果，不是内容通过判断。

待验证：本规格能否在下一轮资产实现、frame review 和用户人审中成立。

## 2. selected_judgements（本轮选用判断）

| judgement_type（判断类型） | selected_rule（选用规则） | source（来源） | use_in_asset_spec（如何用于资产规格） |
|---|---|---|---|
| `sticker_graphic_judgement（贴纸图案判断）` | 贴纸图形必须服务一个主体、动作、轨迹、遮挡或呼吸点；不能只是随机 SVG 图形。 | `library_derived` from 21 / 26 / 28 | 每个 `asset_id` 必须写 `graphic_shape`、`use_case`、`do_not_use_when` 和 `failure_rule`。 |
| `sticker_size_judgement（贴纸大小判断）` | 当前 1080x1920 竖屏里，主体贴纸推荐宽度约 140-210px；小标签不得低于肉眼可见下限。 | `library_derived` from 21 / 26 | 每个 sticker spec 必须写 `size_range`，避免 start / mid frame 中弱到无意义。 |
| `sticker_style_judgement（贴纸风格判断）` | 贴纸应像当前片子的语气标点：轻手绘、低饱和、纸感或胶贴感；不得像儿童模板、电商爆炸贴、赛博 UI 或硬工程 SVG。 | `library_derived` from 21 / 28 | 每个资产必须写 `material_feel`、`color_palette`、`style_conflict` 相关失败规则和实现路线。 |
| `caption_mood_judgement（字幕气氛判断）` | 字幕不是解释画面，必须承担情绪、拟声、提示、呼吸或收束，并与贴纸共同制造 mood。 | `library_derived` from 16 / 21 / 28 | `caption_mood_spec` 定义字幕家族、语义角色、长度、动效和失败项。 |
| `transition_function_judgement（转场功能判断）` | 转场必须服务段落过桥、动作接续、呼吸、峰值或收束；不能只证明能动。 | `library_derived` from 23 / 25 / 26 | `motion_spec` 中每条 motion 必须绑定 `motion_role` 和 `reference_function`。 |
| `visual_material_fit_judgement（画面素材适配判断）` | 资产必须贴合当前素材的沙纹、竹叶熊猫、海雾、云洞、银天空等画面关系。 | `library_derived` from 22 / 24 / 25 | `use_case` 和 `do_not_use_when` 必须引用当前画面类型，不能写成全片固定模板。 |
| `bgm_visual_relation_judgement（音乐画面关系判断）` | BGM 只能提供粗情绪和候选节奏，不能替代字幕、贴纸、转场的视觉情绪贡献。 | `library_derived` from 23 / 26 / 27 | `motion_spec` 禁止精准卡点声明；若去掉 BGM 后 overlay 没有情绪贡献，则触发失败。 |

已确认：上述判断都来自已有判断库和当前失败复盘，不代表本轮新增参考解析。

待验证：如果后续新增对标视频，必须回到 `29` 增量扩充判断库，再更新本规格。

## 3. current_sample_visual_language_target（当前样片视觉语言目标）

临时风格锚点：`soft_vlog_breath_with_light_comic_object_moments（柔和 vlog 呼吸感 + 轻喜剧物件瞬间）`。

已确认：这是基于当前素材、已有判断库和用户人审反馈形成的临时风格锚点，不是未来所有视频固定风格。

1. 当前样片希望是什么气质？
   - 柔和、真实镜头先行、有沙纹 / 竹叶 / 海雾 / 云洞的呼吸感。
   - 熊猫咬竹、竹叶遮挡、脚印轨迹等小动作可以产生轻喜剧物件瞬间。
   - 视觉层应像轻手写日记，不像项目说明、PPT 页面或组件展示。

2. 当前样片不应该是什么气质？
   - 不应该是儿童模板、电商促销、赛博 UI、硬 SVG 演示、爆炸贴纸、通用 hype 短视频。
   - 不应该用 BGM 把气氛全部撑起来，而画面、字幕和贴纸本身没有 mood。
   - 不应该把当前 5 个资产规格固定为未来所有 vlog 的统一贴纸风格。

3. 贴纸在本片里承担什么作用？
   - 贴纸是动作和画面的轻语气标点，只在一个主体、动作或轨迹旁边点一下。
   - 贴纸要帮助观众看见小重点，例如熊猫动作、竹叶遮挡、脚印轨迹、云 / 海边缘。
   - 贴纸不是填空装饰，也不是证明 overlay 数量。

4. 字幕在本片里承担什么作用？
   - 字幕是情绪词、拟声词、注意力提示、呼吸词或收束词。
   - 字幕必须与贴纸共同制造 mood，而不是单独解释画面。
   - 字幕不能像 PPT 标题、项目话术、通用短句或验收说明。

5. 转场在本片里承担什么作用？
   - 转场服务近景到远景、遮挡到显露、motif 回环、峰后呼吸和结尾收束。
   - 普通 cut / fade 也必须有段落作用，不能只是默认过渡。

6. BGM 在本片里只能承担什么，不应该替代什么？
   - BGM 只能提供粗情绪、候选节奏和呼吸参考。
   - 未人工复听前，不允许写精准卡点动效。
   - BGM 不应该替代字幕、贴纸、motion 和画面关系本身的情绪贡献。

## 4. sticker_asset_spec（贴纸资产规格）

| asset_id（资产编号） | sticker_family（贴纸家族） | graphic_shape（图形形态） | material_feel（材质感） | color_palette（颜色方案） | size_range（尺寸范围） | use_case（使用场景） | do_not_use_when（禁用场景） | motion_rule（动效规则） | reference_function（参考功能） | implementation_route（实现路线） | failure_rule（失败规则） |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `soft_hand_arrow（轻手绘箭头）` | `soft_hand_punctuation` | 轻弯箭头，箭头尖端必须指向主体动作。 | 手绘线、轻阴影、半透明边缘。 | 主色低饱和暖黄 `#e8ca68`；辅助米白描边；禁用高亮荧光黄。 | min `120x70`; preferred `160x96`; max `210x130`。 | 熊猫抬头、咬竹、手部或小动作明确时。 | 主体不清、动作方向不明、EndCard 与字幕已抢视觉时。 | 6-8 frames 轻弹入，停留时 1-2 度轻晃，5 frames 淡出。 | `attention_cue`，让观众看见小动作。 | `pure_code_svg`；若手绘边缘太硬，再转 `local_asset_pack`。 | 像硬 UI 箭头、指向空处、抢主体或变成教学标注，触发 `fail_sticker_asset_quality_low`。 |
| `soft_focus_circle（轻圈注）` | `soft_hand_punctuation` | 不规则圈注，允许断点和轻微手抖。 | 手绘线、轻胶贴阴影、透明填充。 | 主色低饱和蜂蜜黄；辅助浅粉只可微量；禁用告示牌黄、霓虹粉。 | min diameter `130`; preferred `160-190`; max `220`。 | 竹叶遮挡、熊猫脸 / 爪、可见云洞边缘。 | 圈不住主体、落到空树叶 / 空天空 / 画面边缘。 | 8 frames 手绘显线，停留轻呼吸 scale `0.98-1.02`，淡出不旋转。 | `one_subject_one_small_punctuation`，圈出单个小重点。 | `pure_code_svg`；若圈线质感太工程，转 `local_asset_pack`。 | 圈注有锚点但图形像 SVG 库展示，触发 `fail_sticker_graphic_mismatch`。 |
| `trace_wave_line（轨迹波浪线）` | `breath_trace_line` | 2-3 段短波浪线，沿脚印、沙纹、云 / 海边缘。 | 细手绘线、半透明、轻柔边缘。 | 主色低饱和海蓝 `#82d9e8`；辅助白色高光；禁用高饱和电蓝。 | min `130x54`; preferred `180x72`; max `240x96`。 | 沙纹脚印、云 / 海边缘、呼吸段的可见轨迹。 | 没有可见边缘、线条只贴空天或空沙面、画面已经有强字幕。 | 从左到右 10-14 frames 手绘展开，停留轻漂移 4-8px，淡出。 | `slowdown_breath` 或 `trace_punctuation`。 | `pure_code_svg`；需要纸张纹理时转 `local_asset_pack`。 | 线条像装饰波浪、没有轨迹对象或去掉 BGM 后无 mood，触发 `fail_caption_sticker_mood_flat`。 |
| `paper_sound_tag（纸感拟声标签）` | `paper_tone_tag` | 小纸签 / 轻贴纸标签，承载 1 个字或 1 个短拟声。 | 纸感、软边、轻阴影、少量胶贴感。 | 主色浅暖纸 `#f6d7a8`；文字深咖灰；禁用高饱和橙、促销红。 | min `108x60`; preferred `138x76`; max `168x92`。 | 熊猫咬竹、轻喜剧动作、单个小物件停顿。 | 文案超过 2 个汉字、像说明标签、没有动作、会和 caption 重复。 | 5 frames 轻贴上，停留微旋转 `-2` 到 `2` 度，结尾快速淡出。 | `comic_object_moment`，让动作更像轻喜剧语气。 | `local_asset_pack` 优先；纯代码容易变 pill tag；无本地资产时可做 `api_generated_candidate` 候选。 | 像电商标签、儿童贴纸、PPT 标签或 API 候选未人审，触发 `fail_sticker_asset_quality_low`。 |
| `breath_edge_line（呼吸边缘线）` | `breath_trace_line` | 很轻的边缘短线、下划或云 / 海边描线。 | 半透明手绘线、低阴影、轻呼吸。 | 主色雾蓝 / 米白；对比必须够看见但不能抢画面；禁用黑粗线。 | min `140x36`; preferred `190x46`; max `260x60`。 | 银天空收束、海雾降速、scrapbook 面板边缘。 | 没有明确边缘、已经有 caption / EndCard 主语言、线条只是装饰。 | 12 frames 慢显，停留随镜头呼吸，淡出慢于 caption。 | `closing_breath` 和 `scrapbook_breath`。 | `pure_code_svg`；若要真实纸边，再转 `local_asset_pack`。 | 只能证明“有线条会动”但不制造呼吸感，触发 `fail_basic_editing_only`。 |

已确认：以上 5 个资产规格都只是当前样片可用 spec，不是已生成图片，不是固定贴纸模板。

## 5. caption_mood_spec（字幕气氛规格）

| caption_family（字幕家族） | semantic_role（语义角色） | length_rule（长度规则） | font_feel（字体气质） | color_rule（颜色规则） | motion_rule（动效规则） | pairing_with_sticker（与贴纸配合） | failure_rule（失败规则） |
|---|---|---|---|---|---|---|---|
| `hand_breath_word` | 呼吸、进入、收束。 | 1-3 个汉字，最多 1 个短词。 | 轻手写，不要 PPT 标题感。 | 与画面留白形成可读对比，低饱和。 | 轻淡入 + 慢呼吸，不精准卡点。 | 可与 `breath_edge_line` 同场，但两者不能都抢主体。 | 字幕只解释画面或去掉 BGM 后无情绪贡献，触发 `fail_caption_sticker_mood_flat`。 |
| `comic_action_word` | 小动作、轻喜剧、拟声。 | 1-2 个汉字或 1 个短英文动词。 | 手写 / 纸签感，不要通用 meme 字。 | 贴近主体但不压脸，颜色跟纸签统一。 | 小弹入，停留短，退场干净。 | 可与 `paper_sound_tag` 二选一；同场时字幕必须让位。 | 像解释标签、项目话术或电商卖点，失败。 |
| `attention_cue_word` | 看见、藏 / 露、注意力提示。 | 2-3 个汉字。 | 轻手写，边缘柔和。 | 放在留白或遮挡边缘，避免高饱和。 | 与 `soft_hand_arrow` 或 `soft_focus_circle` 同步轻入。 | 字幕与贴纸共享一个 `anchor_target`。 | 字幕指向不明或贴纸指向另一个对象，失败。 |
| `slowdown_word` | 降速、换气、scrapbook 呼吸。 | 2-4 个汉字，不得长句。 | 纸感 / 小字，不要大标题。 | 黑底时用温白；真实画面时用低对比暖色。 | 慢入慢出，不弹跳。 | 可与 `breath_edge_line` 配合；不与强 sticker 同场。 | 像卡片标题、layout 说明或重复硬编码文字，失败。 |
| `ending_hold_word` | 收束、停留、尾声。 | 最多 3 个词。 | 轻 serif 或手写，必须自有化。 | 与 EndCard 主语言统一。 | 慢显，结束前不再弹跳。 | 通常不和箭头同场；EndCard 优先。 | 与 EndCard、sticker、caption 三套语言竞争，触发 `fail_style_inconsistency`。 |

已确认：字幕不能只解释画面；字幕必须和贴纸一起制造 mood。

已确认：如果去掉 BGM 后字幕 / 贴纸没有情绪贡献，触发 `fail_caption_sticker_mood_flat（字幕贴纸气氛平失败）`。

已确认：字幕不能像 PPT 标题、项目话术、通用短句或验收项。

## 6. motion_spec（动效规格）

| motion_id（动效编号） | applies_to（适用对象） | motion_role（动效作用） | duration_rule（持续规则） | easing_feel（缓动感觉） | sync_rule（同步规则） | failure_rule（失败规则） |
|---|---|---|---|---|---|---|
| `motion_soft_pop_in` | `caption / sticker` | 轻弹入，让小重点被看见。 | 入场 5-8 frames，停留随事件时长。 | 轻、短、柔，不像按钮弹窗。 | 绑定可见动作或切镜候选点，不写精准 BGM。 | 只能证明会动但不服务主体，失败。 |
| `motion_hand_draw_reveal` | `sticker` | 手绘出现，适合圈注、箭头、波浪线。 | 8-14 frames 绘制完成。 | 手写、慢一点、无机械感。 | 绑定 `anchor_target` 出现时刻。 | 画线对象不存在或线条贴空处，失败。 |
| `motion_breath_hold` | `caption / sticker / end_card` | 呼吸、慢停、收束。 | 停留期间 scale `0.98-1.02`。 | 慢、低幅度。 | 可参考 BGM 粗情绪，但未复听前不精准卡点。 | 呼吸动效比主体更抢眼，失败。 |
| `motion_micro_wobble` | `paper_sound_tag / soft_hand_arrow` | 轻喜剧小抖动。 | 入场后 12-20 frames 内完成一次。 | 手贴纸感，不像 UI shake。 | 绑定小动作，如熊猫咬竹。 | 没有动作对象却抖，失败。 |
| `motion_trace_drift` | `trace_wave_line / breath_edge_line` | 沿轨迹轻漂移。 | 事件中持续 4-8px 微移。 | 慢、轻、贴画面。 | 绑定脚印、云边、海边线条。 | 线条漂移方向和画面边缘无关，失败。 |
| `motion_transition_breath_bridge` | `transition` | 段落过桥和换气。 | 10-18 frames，不做炫技。 | 柔和 cut / fade /遮挡感。 | 绑定 from_visual -> to_visual 的段落关系。 | 转场只装饰或只证明会 fade，失败。 |
| `motion_end_settle` | `end_card` | 结尾稳定停住。 | 最后 1.5-2.5s 只做轻微 settle。 | 安静、慢、留白。 | 不和 peak flash 或强 sticker 竞争。 | 尾声字幕、贴纸、卡片互相抢语言，失败。 |

已确认：动效不是装饰；动效必须服务 `reference_function（参考功能）`。

已确认：如果动效只能证明“能动”，但不制造气氛，判失败。

已确认：BGM 未人工复听时，不允许写精准卡点动效。

## 7. asset_route_decision（资产路线裁决）

| asset_id（资产编号） | recommended_route（推荐路线） | reason（理由） | blocked_if（阻断条件） |
|---|---|---|---|
| `soft_hand_arrow` | `pure_code_svg` | 箭头是低复杂度图形，纯代码可控；关键是手绘线质感、颜色和锚点。 | 纯代码边缘太硬、像教学标注、或无法贴合主体动作。 |
| `soft_focus_circle` | `pure_code_svg` | 圈注适合用 SVG path 做轻手绘线；需要不规则断点和柔和阴影。 | 圈不住主体、线条像工程图、颜色像告示圈。 |
| `trace_wave_line` | `pure_code_svg` | 波浪线属于低复杂度轨迹标点，可先代码实现。 | 没有可见轨迹、线条贴空处、动效和画面方向无关。 |
| `paper_sound_tag` | `local_asset_pack` | 纸感和胶贴边缘很容易被纯代码做成 pill UI；优先本地资产包。 | 没有本地纸感资产且 API 候选未透明背景 / 未人审。 |
| `breath_edge_line` | `pure_code_svg` | 轻边缘线可以通过 path、opacity 和 blur 控制。 | 线条只装饰、不产生呼吸感、与字幕或 EndCard 竞争。 |

已确认：API 只能生成候选资产，不能绕过审美判断。

已确认：API 输出必须透明背景，且必须经过人审或 frame review。

## 8. do_not_generate_yet（本轮禁止生成清单）

本轮不生成资产。

本轮不生成视频。

本轮不调用 API。

本轮不修改 Remotion。

本轮不提交贴纸图片。

本轮只完成资产规格。

## 9. next_execution_input

下一轮若进入资产实现，必须先读取本文件，并继续读取：

1. `29_对标判断库机制_reference_judgement_library.md`
2. `28_对标视觉语言失败重判_reference_visual_language_replan.md`
3. `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md`
4. `26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md`
5. `27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`

下一轮不得把本文件理解为：

- 贴纸图片已生成。
- 当前视频已修好。
- 视觉语言已通过。
- Codex 已稳定具备 vlog director 能力。
- API 已生成可用贴纸。

## 10. completion_state

- spec_status: `reference_visual_language_to_asset_spec_completed_asset_generation_pending`
- content_status: `asset_spec_completed_asset_generation_pending`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- next_goal: 根据 `asset_route_decision` 决定 `local_asset_pack`、`pure_code_svg` 或 `api_generated_candidate` 的下一轮实现路线。

## 11. addendum｜贴纸人审反馈后的路线重判

- addendum_type: `sticker_user_review_reference_style_replan`
- source_review_file: `项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md`
- previous_primary_sticker_route: `paper_sound_tag_api_generated_candidate`
- revised_primary_sticker_route: `hand_drawn_reaction_sticker_system`
- next_goal: `remotion_svg_reaction_sticker_probe`

已确认：用户人审阿里 `paper_sound_tag（纸感拟声标签）` 单图候选后，认为当前方向不是想要的对标贴纸风格。

已确认：用户要的是对标视频里的手绘反应符号 / 视觉情绪标点，而不是承载拟声字或说明文字的纸签图。

部分成立：`paper_sound_tag（纸感拟声标签）` 仍可作为小动作拟声的辅助资产类型保留，但本轮不再作为唯一优先 sticker 主线；后续不能继续用 API 纸签图抽卡替代反应贴纸系统。

### 11.1 revised_sticker_asset_directions（修正后的贴纸资产方向）

| asset_id（资产编号） | sticker_family（贴纸家族） | visual_role（视觉作用） | shape_rule（形状规则） | color_stroke_rule（颜色与描边） | size_range（尺寸范围） | use_case（使用场景） | do_not_use_when（禁用场景） | motion_rule（动效规则） | implementation_route（实现路线） | failure_rule（失败规则） |
|---|---|---|---|---|---|---|---|---|---|---|
| `black_white_reaction_mark（黑白反应标记）` | `hand_drawn_reaction_sticker_system` | 作为动作点、情绪点附近的视觉情绪标点，类似轻喜剧里的怒气 / 爆点 / 反应符号。 | 3-5 个不规则短叉、尖角或圆头笔画组成；必须低复杂度、手绘、短促，不承载文字。 | 黑色主体线条或小块面，厚白描边；允许轻阴影；禁用电商爆炸贴、硬 UI icon、复杂漫画字。 | min `72x72`; preferred `96-148`; max `170x170`。 | 狗头、熊猫脸、手部动作、突然转头、咬竹、遮挡显露等明确动作 / 情绪点。 | 主体不清、动作不明显、画面已经有强 caption / sticker、会遮脸或复制参考贴纸原图时。 | 4-6 frames 快速 pop in，停留 10-18 frames，轻微 rotate / scale wobble，快速淡出。 | `pure_code_svg` / `remotion_vector_component` 优先。 | 像纸签、PPT 图标、儿童模板、电商爆炸贴、或可识别复刻第三方贴纸时，触发 `fail_sticker_reference_style_mismatch`。 |
| `yellow_attention_burst（黄色注意力爆点）` | `hand_drawn_reaction_sticker_system` | 用 2-4 个黄色短笔触提示注意力，让观众看见主体动作点。 | 3 个左右不规则圆角短笔触 / 小豆形，围绕主体边缘分布；不形成完整太阳、星星或 UI badge。 | 主色低饱和亮黄 `#f3c84a`；可用浅白边或轻阴影；禁用荧光黄、促销黄、品牌色复刻。 | min `50x46`; preferred `70-110`; max `130x120`。 | 主体出现、突然动作、轻惊讶、注意力切换、动作峰值附近。 | 没有明确 anchor target、只装饰空处、同场已有强黑白反应标记、或视觉噪音过高时。 | 3-5 frames staggered pop，三个笔触略错帧出现，停留短，不做大幅弹跳。 | `pure_code_svg` / `remotion_vector_component` 优先。 | 像 emoji、meme 表情、促销爆点、贴纸包模板，或和主体动作无关时失败。 |

### 11.2 revised_route_rules（修正后的路线规则）

1. 已确认：下一轮优先做原创 SVG / Remotion vector sticker probe，不优先继续 API 生成图。
2. 已确认：`paper_sound_tag（纸感拟声标签）` 若继续保留，只能作为辅助标签，不得覆盖 `reaction_mark_sticker（反应标记贴纸）` 与 `yellow_attention_burst（黄色注意力爆点）`。
3. 已确认：不得复制第三方截图里的贴纸原图，只能抽象其视觉机制、形状关系、颜色关系、使用位置和动效功能。
4. 已确认：任何 API 输出仍只能作为候选素材，不能绕过 frame review 或用户人审。
5. 待验证：`remotion_svg_reaction_sticker_probe` 是否能在实际 frame review 中比纸签图更接近对标视频观感。

通用贴纸视觉语言机制见 `44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md`。
