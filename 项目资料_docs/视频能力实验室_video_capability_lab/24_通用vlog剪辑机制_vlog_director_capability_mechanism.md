# 通用 vlog 剪辑机制

## 1. 状态

- task_type: `vlog_director_capability_mechanism`
- content_status: `goal_anchor_reframed_mechanism_generalized_completed`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- generated_at: `2026-06-01`
- file_change_scope: `mechanism_docs_only`
- video_generation: 未执行
- remotion_edit: 未执行
- external_api_call: 未执行
- runtime_artifacts_committed: 未执行

已确认：当前 demo 只是验证材料，不是项目目标。

已确认：项目目标是让 Codex 稳定形成 vlog 剪辑判断能力。

已确认：本机制不是当前 demo 修复机制。本机制是未来所有 vlog 风格视频的通用执行机制。

待验证：Codex 是否能在不同素材、不同 BGM、不同参考视频、不同风格锚点下稳定产出接近对标视频观感的样片。

## 2. 机制定位

`vlog_director_capability_mechanism` 的定位是把前几轮 demo 暴露出的缺口，升级为通用 vlog 剪辑判断机制。

它不围绕某一条 30 秒样片打转，也不把当前 demo 当项目目标。当前 demo 可以作为验证材料，暴露参考学习、画面选择、事件表、字幕贴纸、转场、音乐配合和逐帧回审的缺口；但项目主线必须服务可复用剪辑能力。

一句话定位：

> 用户换参考视频、换素材包、换 BGM、换 vlog 风格时，Codex 仍必须先做三张表和硬失败检查，再进入 Remotion 执行。

## 3. 通用输入

| input（输入） | 中文备注 |
|---|---|
| `reference_pack（参考视频包）` | 用户提供的对标视频或参考视频集合。 |
| `material_pack（素材包）` | 用户提供的可剪辑素材。 |
| `bgm（背景音乐）` | 当前视频使用的音乐，未来每轮都可能不同。 |
| `style_anchor（风格锚点）` | 用户指定的风格方向，比如海边呼吸、城市散步、轻喜剧日常、scrapbook。 |
| `duration_target（目标时长）` | 本轮目标时长，如 30 秒、45 秒。 |
| `must_have（必须包含项）` | 字幕、贴纸、转场、分屏、尾卡等必须出现的元素。 |
| `not_to_copy（禁止复制项）` | 不可复刻的平台 UI、品牌、原字体、原音乐、原贴纸、原文案。 |

## 4. 通用输出

| output（输出） | 中文备注 |
|---|---|
| `reference_learning_checklist（对标学习检查清单）` | 说明本轮学了参考视频的哪些功能。 |
| `visual_selection_table（画面选择表）` | 说明每个画面为什么适合放进来。 |
| `video_event_table（视频事件表）` | 说明每个字幕、贴纸、转场、尾卡为什么出现。 |
| `failure_checklist（失败检查清单）` | 渲染前后都要检查的失败项。 |
| `frame_level_review_points（逐帧回审点）` | 渲染后必须抽帧检查的关键点。 |
| `remotion_output（Remotion 输出）` | 只有前面机制表通过后，才允许生成的视频。 |

## 5. 三张表的通用定义

### 5.1 `reference_learning_checklist（对标学习检查清单）`

- 不绑定当前 demo。
- 每次换参考视频都要重新生成。
- 但字段和失败标准不变。
- 必须说明 `reference_function（参考功能）` 和 `not_to_copy（禁止复制项）`。
- 必须把每个参考点绑定到 `target_event_id`，避免“看过参考但没有学到功能”。

最小字段：

| reference_id | reference_timecode | reference_function | not_to_copy | target_event_id | function_match | style_match | failure_if_missing |
|---|---|---|---|---|---|---|---|
| `ref_XX` | `00:00-00:02` | `待填写` | `待填写` | `event_XX` | `待验证` | `待验证` | `fail_no_reference_function` |

### 5.2 `visual_selection_table（画面选择表）`

- 不绑定当前素材包。
- 每次换素材都要重新生成。
- 但判断关系不变。
- 必须说明 `image_fit_reason（画面适配理由）`、`style_fit（风格匹配度）`、`variety_role（画面差异作用）`。
- 必须先回答“为什么放这个画面”，再允许字幕、贴纸、转场进入事件表。

最小字段：

| clip_id | candidate_path | usable_range | image_type | visual_moment | image_fit_reason | style_fit | motif_tag | variety_role | overlay_fit | music_fit | failure_rule | select_decision |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `clip_XX` | `待填写` | `待填写` | `待填写` | `待填写` | `待填写` | `待验证` | `待填写` | `待填写` | `待验证` | `待验证` | `fail_no_visual_selection_table` | `待验证` |

### 5.3 `video_event_table（视频事件表）`

- 不绑定当前 30 秒样片。
- 每次换 BGM、素材、参考都要重新生成。
- 但字段和失败标准不变。
- 必须说明 `visual_moment（画面时刻）`、`music_moment（音乐时刻）`、`semantic_role（语义角色）`、`anchor_target（锚定对象）`、`placement_rule（放置规则）`、`reference_function（参考功能）`、`failure_rule（失败规则）`。
- 必须把画面、音乐、字幕、贴纸、转场和尾卡放到同一条可回审的事件链里。

最小字段：

| event_id | time_range | visual_moment | music_moment | semantic_role | anchor_target | placement_rule | reference_function | failure_rule |
|---|---|---|---|---|---|---|---|---|
| `event_XX` | `00:00-00:02` | `待填写` | `待填写` | `待填写` | `待填写` | `待填写` | `待填写` | `fail_no_video_event_table` |

## 6. 不变失败标准

失败标准长期不变。以下失败标准以后不变：

1. 没有对标功能，失败。
2. 只学表面，不学功能，失败。
3. 用数量冒充质量，失败。
4. 没有画面选择表，blocked。
5. 没有视频事件表，blocked。
6. 没有逐帧回审点，失败。
7. 用户看不出对标视频的感觉，失败。
8. 随机拼贴，失败。
9. 字幕不像对标，失败。
10. 贴纸不像对标，失败。
11. 转场不像对标，失败。
12. 音乐和画面不匹配，失败。
13. 复刻参考资产，失败。

这些失败标准不随当前 demo、BGM、素材包、参考视频或风格变化而改变。

## 7. 可变风格参数

以下可以随项目变化：

1. BGM 可以变。
2. 素材包可以变。
3. 参考视频可以变。
4. 风格锚点可以变。
5. 目标时长可以变。
6. 贴纸风格可以变。
7. 字幕语言可以变。
8. 转场类型可以变。

但判断关系不变：

1. 每次都必须解释学了参考视频的什么功能。
2. 每次都必须解释为什么选这个画面。
3. 每次都必须解释字幕/贴纸/转场为什么出现。
4. 每次都必须通过硬失败闸门。

## 8. BGM 可变时的处理方式

BGM 可以变，但音乐判断关系不变。

- 每次换 `bgm`，必须重新标 `music_moment`。
- 自动 marker 只能标 `部分成立`，未人工复听不得写精准卡点。
- 字幕、贴纸、转场、clip change 必须说明是否绑定 `music_moment`。
- 如果音乐重拍、停顿、呼吸点和画面不匹配，触发 `fail_music_visual_mismatch`。

## 9. 不同参考视频可变时的处理方式

参考视频可以变，但参考学习关系不变。

- 每次换 `reference_pack`，必须重新生成 `reference_learning_checklist`。
- 每个参考点必须写 `reference_function`，不能只写“学这个风格”。
- 每个参考点必须写 `not_to_copy`，避免复刻平台 UI、品牌资产、原文案、原音乐、原贴纸。
- 如果目标事件和参考功能不匹配，触发 `fail_reference_mismatch`。

## 10. 不同素材包可变时的处理方式

素材包可以变，但画面选择关系不变。

- 每次换 `material_pack`，必须重新生成 `visual_selection_table`。
- 每个素材必须说明 `image_fit_reason`、`style_fit`、`variety_role`。
- 不能因为素材可用就进入时间线。
- 如果素材只是随机拼贴，触发 `fail_random_patchwork`。

## 11. render 前阻断条件

进入 Remotion render 前，必须同时满足：

1. `reference_learning_checklist` 已生成并通过检查。
2. `visual_selection_table` 已生成并通过检查。
3. `video_event_table` 已生成并通过检查。
4. `failure_checklist` 已覆盖参考功能、画面选择、字幕、贴纸、转场、音乐、风格和复刻风险。
5. `frame_level_review_points` 已列出关键抽帧点。
6. `hard_fail_gate` 未触发阻断项。

缺任一项，默认 blocked，不允许 render。

## 12. render 后回审条件

render 后即使技术 metadata 正常，也必须回审：

- 用户是否能看出对标视频的感觉。
- 三张表里的每个核心事件是否在画面中可见。
- caption / sticker / transition 是否真的服务 `reference_function`。
- `music_moment` 是否和画面、字幕、贴纸、转场相互配合。
- 是否出现随机拼贴、数量冒充质量、复刻参考资产、PPT/card/component showcase。

待验证：只有经过用户人工审看和多案例回归，才能把 vlog 导演能力从 `待验证` 升级。

## 13. 后续如何用于当前 30 秒样片和未来 vlog 样片

用于当前 30 秒样片时：

1. 不直接改 Remotion。
2. 不直接加字幕、贴纸或转场。
3. 先按本机制重新生成 `reference_learning_checklist`、`visual_selection_table`、`video_event_table`。
4. 三张表通过 `hard_fail_gate` 后，再进入修复。

用于未来 vlog 样片时：

1. 用户提供新的 `reference_pack`、`material_pack`、`bgm`、`style_anchor`。
2. Codex 先按本机制生成三张表。
3. 三张表通过后才允许 Remotion 执行。
4. render 后按 `frame_level_review_points` 回审。
5. 多案例通过后，才能把能力状态从 `vlog_director_capability_still_pending_multi_case_validation` 升级。

本轮只完成机制通用化，不证明 Codex 已稳定具备 vlog 视频导演能力。
