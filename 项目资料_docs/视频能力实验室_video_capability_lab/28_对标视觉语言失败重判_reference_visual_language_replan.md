# 对标视觉语言失败重判

## 1. 状态

- task_type: `reference_visual_language_replan`
- target_sample: `三十秒对标样片-30s-reference-sample`
- source_review_report: `27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md`
- content_status: `reference_structure_partial_ui_language_failed`
- next_status: `sticker_style_system_and_asset_pack_spec_pending`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- output_type: `route_rejudgment_markdown`
- generated_at: `2026-06-01`

已确认：本轮不是继续调 x/y、fontSize、SVG 尺寸或贴纸数量。

已确认：本轮不是 render，不是继续 Remotion 修复，不是直接调用 API 生成贴纸。

已确认：用户反馈指出的是视觉语言失败，不是单点位置失败。

## 2. 用户 P0 反馈原文

> codex 位置都没错，但是 codex 执行出来的东西就是很丑，和对标视频看上去完全就是两回事。
> 1. 贴纸的样子，完全没有学到参考视频的精髓，比如图片大小和样式这些，说白了就是 UI 很丑。
> 2. 整个的字幕+贴纸，让视频看起来就很单调，气氛基本都是音乐带起来的，感觉 codex 只是做了基础剪辑而已。

## 3. 失败类型判断

| layer | judgment | evidence | implication |
|---|---|---|---|
| `sticker_ui_layer` | `sticker_ui_language_failure` | 贴纸位置大体可接受，但贴纸样子、大小、样式和参考视频观感不同。 | 不能继续只调坐标；必须定义贴纸 UI 语言。 |
| `caption_atmosphere_layer` | `caption_sticker_mood_failure` | 字幕 + 贴纸没有形成情绪层，画面仍显单调。 | caption / sticker 要承担氛围标点，不只是可读标签。 |
| `motion_language_layer` | `reference_visual_language_not_loaded` | 贴纸进入、停留、大小变化和手感没有参考视频那种轻快语气。 | 下一步要写 motion rule，而不是只写出现时间。 |
| `visual_mood_layer` | `basic_editing_only` | 当前观感更像基础剪辑，缺少统一的视觉调性。 | 需要先补风格系统，再谈二次实现。 |
| `bgm_dependency_layer` | `bgm_over_dependency` | 气氛主要由音乐撑起，画面层本身没有足够 mood。 | BGM 不能替代视觉语言；overlay 自身要有情绪贡献。 |

本轮明确不是：

- 不是 `placement_failure`：用户已指出位置不是主要问题。
- 不是 `quantity_failure`：增加贴纸数量不能解决 UI 丑和气氛平。
- 不是 `render_failure`：技术可渲染不能证明对标观感成立。

当前失败代码：

- `sticker_ui_language_failure`
- `caption_sticker_mood_failure`
- `reference_visual_language_not_loaded`
- `bgm_over_dependency`
- `basic_editing_only`

## 4. Native Remotion SVG 边界

1. SVG/CSS 可以做 overlay，但不会自动得到参考级 sticker UI。
2. 当前基础 SVG 只证明形状能被画出来，不证明贴纸视觉语言成立。
3. 如果继续使用纯代码 SVG，必须先有 `sticker_style_system`。
4. 要更接近参考观感，可能需要 `sticker_asset_pack` 或 `API-generated transparent sticker`。
5. API 只能辅助生成图形资产；如果没有 `sticker spec`，仍然解决不了 placement、size、timing、tone。

## 5. 新失败标准

| fail_code | trigger | block_next |
|---|---|---|
| `fail_sticker_asset_quality_low` | 贴纸像工程占位、简单 SVG、随机素材包或低质模板。 | 阻断继续 render；先补贴纸资产标准。 |
| `fail_caption_sticker_mood_flat` | 字幕和贴纸只解释画面，没有让视频更有气氛。 | 阻断表层加字加贴；先补 mood role。 |
| `fail_visual_language_not_reference_like` | 用户看不出参考视频的 UI、节奏和语气。 | 阻断宣称对标完成；回到参考视觉语言拆解。 |
| `fail_bgm_carries_all_mood` | 画面氛围几乎全靠 BGM，overlay 和剪辑层无明显贡献。 | 阻断只做音乐卡点；必须补视觉 mood。 |
| `fail_basic_editing_only` | 成片像基础剪辑 + 字幕 + 贴纸，没有导演感。 | 阻断继续小修；需要重建视觉语言系统。 |

## 6. 路线重判

### Route A: pure code SVG/CSS stickers

状态：`limited_support_only`

优点：快、可控、能直接进入 Remotion，不依赖外部资产。

问题：容易工程味重，贴纸 UI 难自然；如果没有 `sticker_style_system`，会继续显得很丑。

适用范围：最小线条、箭头、圈注、下划线、呼吸线等低复杂度标点。

不适用：需要参考视频那种成套贴纸、纸感、手绘感、emoji-like 情绪感或复杂图形时。

### Route B: sticker_style_system + sticker_asset_pack

状态：`recommended_main_route`

结论：推荐作为下一步主路线。

原因：

- 先定义贴纸家族、大小、材质、颜色、使用场景和失败规则，再进入实现。
- 能把“UI 很丑”转成可执行字段，而不是继续靠 Codex 临场画 SVG。
- 可以同时约束字幕贴纸 mood、motion rule 和视觉风格统一性。

下一步应进入：`sticker_style_system_and_asset_pack_spec`

### Route C: API-generated sticker pack

状态：`supplemental_route`

作用：当需要更强图形风格、透明贴纸、纸感插画或复杂 sticker family 时，可作为资产生成辅助。

边界：

- API 不能替代 `sticker spec`。
- API 生成的图仍要经过 size、style、tone、motion、use_case 和 failure_rule 过滤。
- 未定义 sticker family 前，不应直接批量生成贴纸。

## 7. 下一步规格字段

`sticker_style_system_and_asset_pack_spec` 至少必须包含：

| field | required_judgment |
|---|---|
| `sticker_family` | 本片贴纸属于哪一组视觉家族，例如轻手绘、纸签、呼吸线、动作标点。 |
| `visual_reference` | 参考视频中要学习的是大小、材质、留白、节奏还是 mood，不复制原资产。 |
| `graphic_shape` | 允许的形状类型，例如 arrow、circle、wave、tag、spark、emoji-like mark。 |
| `material_feel` | 纸感、手绘、胶贴、半透明、描边、阴影等质感规则。 |
| `color_palette` | 主色、辅助色、禁用色、饱和度和对比度边界。 |
| `size_range` | 移动端 1080x1920 中的最小 / 推荐 / 最大视觉尺寸。 |
| `use_case` | 何时使用：动作提示、情绪标点、呼吸、峰值、尾声或 motif reprise。 |
| `do_not_use_when` | 何时禁用：空 sky、无主体、和 EndCard 抢语言、BGM 未确认峰值。 |
| `motion_rule` | 出入场、停留、弹性、跟随主体、随音乐呼吸的规则。 |
| `failure_rule` | 触发 `fail_sticker_asset_quality_low` 等失败代码时的删除 / 换资产 / 回表动作。 |

## 8. 结论

已确认：`27` 的 limited fix 不能被写成视觉语言通过。用户指出的位置问题已经让位于更高层的 UI 与 mood 问题。

已确认：当前状态为 `reference_structure_partial_ui_language_failed`。

已确认：下一步不是继续 Remotion/render，而是先写 `sticker_style_system_and_asset_pack_spec`。

已确认：API 可以作为补充路线，但不能取代 sticker style/spec。

待验证：下一轮完成 sticker style system 和 asset pack spec 后，才能决定是否走纯代码 SVG、导入手工资产，或辅助生成透明 sticker。
