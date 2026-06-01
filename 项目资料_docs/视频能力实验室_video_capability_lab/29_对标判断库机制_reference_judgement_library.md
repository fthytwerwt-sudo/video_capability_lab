# 对标判断库机制

## 1. 状态

- task_type: `reference_judgement_library_mechanism`
- content_status: `reference_judgement_library_initial_version_pending_validation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- generated_at: `2026-06-02`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- output_type: `mechanism_markdown`

已确认：本文件是机制层，不是素材库、贴纸库、prompt 库或固定风格模板。

已确认：本文件的判断库当前是初始版本，不代表 Codex 已经稳定学会对标视频。

## 2. 机制定位

`reference_judgement_library（对标判断库）` 是从多条对标视频、用户人审反馈和失败复盘中沉淀出来的判断标准集合。

它解决的是“每次从零学习当前对标视频”的上游逻辑错误。

正确流程不是：

```text
新任务 -> 从当前对标视频重新生成全部判断 -> 三张表 -> render
```

正确流程是：

```text
新任务 -> 读取 reference_judgement_library -> 判断本轮是否有新增对标视频 -> 增量校准或直接选用已有判断 -> 三张表 -> hard_fail_gate -> 执行
```

## 3. 判断库输入

| input | 用途 |
|---|---|
| `existing_reference_judgement_library` | 已沉淀的长期判断标准。 |
| `new_reference_pack_optional` | 本轮新增对标视频；没有新增时可为空。 |
| `style_anchor` | 本轮风格锚点，例如海边呼吸、城市散步、轻喜剧日常、scrapbook。 |
| `material_pack` | 本轮素材包。 |
| `bgm` | 本轮背景音乐。 |
| `duration_target` | 本轮目标时长。 |
| `user_feedback` | 用户人工审看反馈，用于补齐判断库缺类或冲突。 |

## 4. 判断库输出

| output | 用途 |
|---|---|
| `selected_judgements` | 本轮从判断库选出的适用判断。 |
| `new_judgements_to_merge` | 新对标视频或用户反馈新增的判断。 |
| `judgement_source_map` | 每条判断来自已有沉淀、具体对标视频、用户反馈还是本轮推导。 |
| `reference_learning_checklist_seed` | 生成对标学习检查清单的依据。 |
| `visual_selection_table_seed` | 生成画面选择表的依据。 |
| `video_event_table_seed` | 生成视频事件表的依据。 |
| `hard_fail_gate_extensions` | 本轮需要启用或新增的失败项。 |
| `feedback_loop_target` | 失败后回到判断库缺类、判断库冲突、三张表缺字段或执行层。 |

## 5. 已沉淀判断类型

| judgement_type | 中文备注 | 初始来源 |
|---|---|---|
| `sticker_graphic_judgement` | 判断贴纸图形是否适合当前画面。 | 21 / 26 / 28 的贴纸失败复盘。 |
| `sticker_size_judgement` | 判断贴纸尺寸是否在参考级别范围内。 | 21 的 minimum visible size 审计。 |
| `sticker_style_judgement` | 判断贴纸是否像当前视频语气，而不是素材包或工程 SVG。 | 21 / 28 的 UI 失败复盘。 |
| `caption_mood_judgement` | 判断字幕是否参与制造情绪，而不是只解释画面。 | 16 / 21 / 28 的字幕气氛判断。 |
| `transition_function_judgement` | 判断转场是否服务段落、节拍、情绪或画面关系。 | 23 / 25 / 26 的 transition role 规则。 |
| `visual_material_fit_judgement` | 判断素材是否适合当前视频风格和位置。 | 22 / 24 / 25 的 visual selection 规则。 |
| `bgm_visual_relation_judgement` | 判断音乐是否和画面、字幕、贴纸、转场形成关系。 | 23 / 26 / 27 的 BGM marker 边界。 |

## 6. 新增对标视频如何更新判断库

入口 A：本轮有新增对标视频。

执行顺序：

1. 读取已有 `reference_judgement_library`。
2. 解析新增对标视频。
3. 提取新增判断项。
4. 判断新增判断项属于已有 `judgement_type` 还是新增类型。
5. 合并进判断库。
6. 标注来源参考视频、近似 timecode、适用场景和不适用场景。
7. 如新增判断与旧判断冲突，记录 `judgement_conflict`，不得直接覆盖旧判断。
8. 再基于判断库、本轮素材、BGM 和风格锚点生成三张表。

已确认：新对标视频用于扩充和校准判断库，不是替代旧判断。

已确认：旧判断库不得被当前参考视频风格直接覆盖。

## 7. 无新增对标视频时如何执行

入口 B：本轮没有新增对标视频。

执行顺序：

1. 读取已有 `reference_judgement_library`。
2. 读取本轮 `style_anchor`、`material_pack`、`bgm` 和 `duration_target`。
3. 从判断库中选择适用判断。
4. 生成本轮 `reference_learning_checklist`。
5. 在表中标注依据来自已有沉淀，而不是本轮新参考。
6. 不得编造 `reference_timecode`。
7. 再进入 `visual_selection_table` 和 `video_event_table`。

已确认：无新增对标视频不等于无法执行。

已确认：无新增对标视频也不允许跳过判断库。

已确认：无新增对标视频时，`reference_function` 的来源必须写成 `library_derived` 或 `existing_judgement`，不能伪造新参考证据。

## 8. 判断库如何影响三张表

### 8.1 `reference_learning_checklist`

- `reference_function` 优先来自 `reference_judgement_library`。
- 本轮有新增对标视频时，可补充 `new_reference_derived` 判断。
- 本轮无新增对标视频时，必须标注 `library_derived`。
- `reference_timecode` 只能在真实解析新增参考或人工复核已有参考时填写。

### 8.2 `visual_selection_table`

- `image_fit_reason` 必须引用 `visual_material_fit_judgement`。
- `style_fit` 必须结合 `style_anchor` 和已有判断库，不得只写素材可用。
- `variety_role` 必须使用判断库里的画面差异规则。

### 8.3 `video_event_table`

- `sticker_visual_fit` 必须调用 `sticker_graphic_judgement` 和 `sticker_style_judgement`。
- `minimum_visible_size` 必须调用 `sticker_size_judgement`。
- `semantic_role` 必须调用 `caption_mood_judgement`。
- `transition_role` 必须调用 `transition_function_judgement`。
- `music_moment` 必须调用 `bgm_visual_relation_judgement`。
- 如果字段没有判断库来源，必须标 `needs_reference_judgement`。

## 9. 判断库如何影响 hard_fail_gate

新增失败项：

| fail_code | 触发条件 | 修复方向 |
|---|---|---|
| `fail_reference_judgement_missing` | 没有读取判断库，也没有新增对标解析，却声称学了对标。 | 先读取或补全判断库。 |
| `fail_reference_judgement_unused` | 判断库已有相关标准，但三张表未引用。 | 回到三张表，补 `judgement_source`。 |
| `fail_reference_timecode_fabricated` | 无新增对标视频或未人工复核，却伪造 `reference_timecode`。 | 改为 `library_derived`，并标 `reference_timecode=not_applicable`。 |
| `fail_judgement_library_overwritten` | 用当前参考视频覆盖旧判断库。 | 改为增量合并，记录冲突。 |

## 10. 判断库如何影响 feedback_loop

失败后不得只回到“重新解析当前参考”。必须先判断失败层级：

| failure_layer | feedback_target |
|---|---|
| `library_missing` | 新建或补全 `reference_judgement_library`。 |
| `library_conflict` | 增加冲突记录和适用场景，不覆盖旧判断。 |
| `library_not_used` | 回到三张表，补 `judgement_source`。 |
| `judgement_type_missing` | 新增 `judgement_type`，再进入三张表。 |
| `table_field_missing` | 补 `reference_learning_checklist` / `visual_selection_table` / `video_event_table` 字段。 |
| `execution_layer_failure` | 只有三张表通过后，才进入 Remotion 或资产实现层。 |
| `user_aesthetic_reject` | 判断是库缺类、风格锚点错、素材不合适、资产规格失败还是执行失败。 |

## 11. 判断库仍待验证项

- 待验证：当前判断库只是从已有 16 / 21 / 22 / 23 / 24 / 25 / 26 / 28 抽象出的初始版本。
- 待验证：不同素材、不同 BGM、不同参考视频、不同 style_anchor 下是否能稳定复用。
- 待验证：贴纸资产规格是否能从判断库稳定生成。
- 待验证：用户人工审看仍是最终内容判断来源之一。

## 12. 下一步

下一个目标：基于 `reference_judgement_library` 生成 `reference_visual_language_to_asset_spec`，再决定使用纯代码 SVG、手工整理资产包，或辅助 API 生成透明贴纸。
