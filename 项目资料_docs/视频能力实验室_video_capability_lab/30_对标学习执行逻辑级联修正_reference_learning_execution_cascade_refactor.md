# 对标学习执行逻辑级联修正

## 1. 状态

- task_type: `reference_learning_execution_logic_cascade_refactor`
- content_status: `reference_learning_logic_cascade_refactored_pending_validation`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- generated_at: `2026-06-02`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `false`
- sticker_asset_generation_allowed_this_round: `false`
- output_type: `cascade_refactor_report`

已确认：本轮只修机制逻辑，不证明 Codex 已学会对标视频。

已确认：`reference_judgement_library（对标判断库）` 当前是初始版本，后续要靠更多结构和风格不同的视频继续扩充和校准。

## 2. 用户 P0 输入

> 这个 prompt 感觉范围还是不够大，如果之前的执行逻辑错误了，那么后面的执行流程和判断标准，还有反馈这些都有问题啊。

## 3. 错误逻辑说明

已确认：只把“必须先看对标视频”改成“读取已有对标判断库”范围不够。

上游错误会级联影响：

- `trigger_update`：什么时候必须读判断库，什么时候新增参考，什么时候使用已有沉淀。
- `flow_update`：三张表生成前的前置顺序。
- `judgement_update`：`reference_function`、贴纸、字幕、转场、素材、BGM 判断来源。
- `hard_fail_gate_update`：未读取判断库、未使用已有判断、伪造 reference timecode 时必须失败。
- `feedback_update`：失败后不只回到“重新解析当前参考”，还要回到判断库缺类、判断库冲突或判断库未调用。
- `capability_status_update`：机制存在不等于稳定能力成立。

## 4. cascade_impact_audit（级联影响审计表）

| file_path | problem_expression | impact_area | required_change | status |
|---|---|---|---|---|
| `22_视频事件表与画面选择机制_video_event_table_visual_selection.md` | 原机制要求事件表字段，但没有明确先读判断库。 | 流程 / 判断来源 | 增加判断库前置、`judgement_source`、`judgement_type`、`needs_reference_judgement`。 | fixed |
| `23_对标视频底线失败标准_reference_bottom_line_fail_gate.md` | 原 hard fail gate 未覆盖“未读取判断库”的执行逻辑失败。 | hard_fail_gate | 新增 `fail_reference_judgement_missing`、`fail_reference_judgement_unused`、`fail_reference_timecode_fabricated`。 | fixed |
| `24_通用vlog剪辑机制_vlog_director_capability_mechanism.md` | 存在“每次换参考视频都要重新生成”的表达，容易误导为从零学习。 | 触发 / 流程 / 三张表 | 改为每轮先读判断库，有新增参考则增量更新，无新增参考则使用已有沉淀。 | fixed |
| `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` | 当前样片执行包包含参考学习表，但属于当轮 demo 描述，不是长期入口。 | 路由 / 复用边界 | 增加定位说明：未来任务不得复制本包作为固定模板，必须先读判断库。 | fixed |
| `26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md` | 当前修正表可以沉淀判断，但不是判断库本身。 | 反馈 / 复用边界 | 增加定位说明：其关系表可作为判断库初始来源，未来仍必须先读判断库。 | fixed |
| `28_对标视觉语言失败重判_reference_visual_language_replan.md` | `sticker_style_system_and_asset_pack_spec` 容易被理解成固定贴纸样式。 | 下一路由 / 资产规格 | 升级为 `reference_visual_language_to_asset_spec`，来源为判断库 + 本轮 style_anchor。 | fixed |
| `03_Codex执行桥接包_codex_execution_bridge.md` | 缺少本轮级联修正 route 和未来 vlog 任务统一入口。 | 执行入口 / 路由 | 新增 `reference_learning_execution_logic_cascade_refactor` route 和未来执行顺序。 | fixed |
| `02_当前任务_current_task.md` | 仍指向上一轮视觉语言重判。 | 当前任务 | 更新为本轮级联修正任务、状态和下一个目标。 | fixed |
| `latest` | 仍指向上一轮贴纸规格目标。 | 反馈 / 接手入口 | 更新为先读判断库、有新参考增量校准、无新参考也可执行。 | fixed |

## 5. 已修正文件列表

| path | change |
|---|---|
| `29_对标判断库机制_reference_judgement_library.md` | 新建判断库机制，定义输入、输出、判断类型、双入口、hard fail 和 feedback loop。 |
| `30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md` | 新建本级联修正报告。 |
| `22_视频事件表与画面选择机制_video_event_table_visual_selection.md` | 接入判断库前置和判断来源字段。 |
| `23_对标视频底线失败标准_reference_bottom_line_fail_gate.md` | 增加缺少判断库、未使用判断库和伪造 timecode 的失败项。 |
| `24_通用vlog剪辑机制_vlog_director_capability_mechanism.md` | 修正“每次从零学参考”的入口逻辑。 |
| `25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` | 增加当前 demo 包与长期判断库的边界说明。 |
| `26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md` | 增加当前 P0 修正包与判断库沉淀关系说明。 |
| `28_对标视觉语言失败重判_reference_visual_language_replan.md` | 将下一步升级为 `reference_visual_language_to_asset_spec`。 |
| `02_当前任务_current_task.md` | 更新当前任务、状态、边界和下一目标。 |
| `03_Codex执行桥接包_codex_execution_bridge.md` | 新增本轮 route 和未来 vlog 任务入口。 |
| `执行日志_codex_log/最新摘要_latest.md` | 更新最新接手摘要和下一个目标。 |

## 6. 新增 reference_judgement_library 说明

已确认：`reference_judgement_library` 不是素材库，不是贴纸库，不是固定模板。

初始判断类型：

- `sticker_graphic_judgement`
- `sticker_size_judgement`
- `sticker_style_judgement`
- `caption_mood_judgement`
- `transition_function_judgement`
- `visual_material_fit_judgement`
- `bgm_visual_relation_judgement`

当前状态：`reference_judgement_library_initial_version_pending_validation`。

## 7. 新执行入口

入口 A：本轮有新增对标视频。

1. 读取已有 `reference_judgement_library`。
2. 解析新增对标视频。
3. 提取新增判断项。
4. 判断新增判断项属于已有判断类型还是新增类型。
5. 合并进判断库。
6. 标注来源、适用场景和不适用场景。
7. 再生成三张表。

入口 B：本轮没有新增对标视频。

1. 读取已有 `reference_judgement_library`。
2. 读取本轮 `style_anchor`、`material_pack`、`bgm`、`duration_target`。
3. 从判断库中选择适用判断。
4. 生成本轮 `reference_learning_checklist`。
5. 标注依据来自已有沉淀。
6. 不得编造 `reference_timecode`。
7. 再进入 `visual_selection_table` 和 `video_event_table`。

已确认：无新增对标视频不等于无法执行。

已确认：新对标视频用于扩充和校准判断库。

## 8. 新反馈回路

| failure_signal | feedback_target |
|---|---|
| 用户说不像参考 / UI 很丑 | 判断库缺类、资产规格缺失或执行层失败。 |
| 三张表没有判断来源 | 回到判断库，补 `judgement_source`。 |
| 新参考与旧判断冲突 | 新增冲突记录和适用场景，不覆盖旧判断。 |
| 无新增参考却无法执行 | 回到判断库选择适用判断，不写 blocked。 |
| `reference_timecode` 未复核 | 标 `not_applicable_library_derived` 或 `pending_review`，不伪造。 |
| Remotion 实现失败 | 只有在三张表通过后，才回到执行层修复。 |

## 9. 仍待验证项

- 待验证：判断库初始版本是否覆盖足够多的视觉语言类别。
- 待验证：`reference_visual_language_to_asset_spec` 是否能稳定从判断库生成可执行资产规格。
- 待验证：不同素材、不同 BGM、不同参考视频、不同 style_anchor 下是否能复用。
- 待验证：多案例人审通过前，能力状态仍不能升级。

## 10. 下一步

下一个目标：基于 `reference_judgement_library（对标判断库）` 生成 `reference_visual_language_to_asset_spec（对标视觉语言到资产规格）`；然后再决定是否手工整理资产包、使用纯代码 SVG，或辅助 API 生成透明贴纸。

## 11. 后续承接状态

已确认：`reference_visual_language_to_asset_spec` 已由 `31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md` 承接。

已确认：`31` 仍是规格文件，不是资产包，不是 render 结果，不是内容通过判断。

下一个目标：读取 `31` 的 `asset_route_decision`，再决定 `pure_code_svg`、`local_asset_pack` 或 `api_generated_candidate` 路线。
