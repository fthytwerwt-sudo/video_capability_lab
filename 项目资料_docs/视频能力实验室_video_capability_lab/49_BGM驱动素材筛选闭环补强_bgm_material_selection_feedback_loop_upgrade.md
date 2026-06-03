# BGM 驱动素材筛选闭环补强

## status（状态）

- task_type: `bgm_material_selection_feedback_loop_upgrade`
- source_mechanism_file: `项目资料_docs/视频能力实验室_video_capability_lab/47_通用BGM风格驱动素材筛选机制_universal_bgm_style_driven_material_selection_system.md`
- source_current_audit_file: `项目资料_docs/视频能力实验室_video_capability_lab/48_当前BGM与七个素材筛选审计_current_bgm_7_material_selection_audit.md`
- upgrade_status: `bgm_material_selection_feedback_loop_completed_pending_gpt_user_review`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- file_change_scope: `mechanism_docs_only`
- video_generation: 未执行
- remotion_edit: 未执行
- render: 未执行
- external_api_call: 未执行
- runtime_assets_committed: 未执行
- do_not_claim:
  - 不得声明 `BGM precise beat sync confirmed`
  - 不得声明 `material selection approved`
  - 不得声明 `video ready to edit`
  - 不得声明 `edit mechanism verified`
  - 不得声明 `vlog director capability verified`

已确认：本文件是 `47` 的闭环补强，不重写 `47` 主体，也不改写 `48` 的当前审计事实。

已确认：本轮只补机制闭环，不生成视频、不 render、不修改 Remotion、不调用图片 / 视频 / 音频 API。

待验证：本闭环仍需 GPT / 用户回审和后续多案例剪辑反馈回流验证；文件存在不等于闭环已验证。

## why_this_upgrade_is_needed（为什么需要本次补强）

`47` 已经有机制、流程、判断标准和失败反馈路由，覆盖：

- `bgm_analysis_fields（BGM 分析字段）`
- `material_analysis_fields（素材分析字段）`
- `bgm_material_match_matrix（BGM-素材匹配矩阵）`
- `pre_edit_execution_flow（剪辑前执行流程）`
- `judgement_standards（判断标准）`
- `failure_feedback_routing（失败反馈路由）`

但 `47` 当前仍偏“开剪前检查表”。它能阻止 Codex 直接把素材丢进时间线，却还没有把“剪完之后的失败反馈如何回流到素材筛选字段”固定下来。

要形成真正可复用闭环，还必须补齐三项：

1. `BGM_mood_confirmation_gate（BGM 情绪确认闸门）`
2. `post_edit_feedback_to_selection_loop（剪后反馈回流到素材筛选）`
3. `pre_edit_output_package（开剪前固定输出包）`

否则每次剪辑失败后仍可能只停在“下次注意”“素材不搭”“节奏不对”这类松散评价，不能回写到可执行字段。

## closed_loop_definition（闭环定义）

完整闭环定义为：

```text
BGM analysis
-> BGM mood confirmation gate
-> material inventory
-> material role assignment
-> candidate sequence
-> GPT / user review
-> edit / Remotion allowed
-> post-edit review
-> feedback routing
-> update BGM / material / sequence / structure tags
-> next iteration
```

已确认：如果没有 post-edit feedback 回写，只能算前置筛选，不算闭环。

闭环成立的最低条件：

| layer | required_output | cannot_skip |
|---|---|---|
| BGM layer | `BGM_style_card` + mood confirmation status | 不能只用 technical metadata。 |
| Material layer | `material_role_table` | 不能只列素材路径。 |
| Sequence layer | `sequence_candidate` | 不能直接进 Remotion。 |
| Review layer | GPT / 用户回审状态 | 不能把 Codex 粗审写成最终通过。 |
| Feedback layer | `failure_routing_map` + write-back fields | 不能只写口头总结。 |

## BGM_mood_confirmation_gate（BGM 情绪确认闸门）

### gate purpose

`BGM_mood_confirmation_gate` 用于判断当前 BGM 的情绪、风格和段落结构是否足以支撑素材筛选和候选顺序。

它不是 `ffprobe` 技术验证。技术元数据通过只说明 BGM 可读、有音轨、可分析；不代表 BGM 情绪确认通过。

### required fields

| field | required | rule |
|---|---:|---|
| `bgm_path（BGM 路径）` | yes | 必须是本轮实际 BGM；候选不唯一时 blocked。 |
| `tempo_feel（速度感）` | yes | 可来自 rough tempo，但必须标 evidence。 |
| `energy_curve（能量曲线）` | yes | 至少分 intro / rise / action / breath / outro 候选。 |
| `mood_tags（情绪标签）` | yes | 未人工听感确认时只能写 `rough_candidate` 或 `推测`。 |
| `section_map（段落结构）` | yes | 不清楚时不能进入精准片段时长规划。 |
| `confidence（置信度）` | yes | 必须区分 rough / GPT review / user confirmed。 |
| `evidence_source（证据来源）` | yes | `metadata`、`waveform`、`RMS`、`onset`、`GPT review`、`user listening` 分开写。 |
| `requires_user_review（是否需要用户回审）` | yes | mood 影响素材选择且只有 rough evidence 时必须 true。 |
| `allowed_next_step（允许下一步）` | yes | 只能进入对应层级，不得越级 render。 |
| `blocked_if（阻断条件）` | yes | 明确不能继续的条件。 |

### gate rules

1. 如果 `confidence=rough_audio_feature_based_not_human_listening_confirmed`，且 mood 会影响素材选择，必须进入 GPT / 用户回审。
2. 如果 BGM mood 不清，不能直接生成剪辑方案。
3. 如果 BGM `section_map` 不清，不能进入精准片段时长规划。
4. 如果只是技术元数据通过，不代表 BGM 情绪确认通过。
5. 如果 GPT 与用户对 mood 判断冲突，以用户听感为 `P0`，GPT 判断降级为 `candidate`。

### allowed states

| state | meaning | allowed_next_step |
|---|---|---|
| `bgm_mood_confirmed_by_user` | 用户已确认 BGM 情绪 / 风格方向。 | 可进入 `pre_edit_output_package` 和候选顺序细化。 |
| `bgm_mood_confirmed_by_gpt_review` | GPT 基于音频证据和用户目标完成回审，但用户未亲自确认。 | 可进入候选顺序草案，不得写最终通过。 |
| `bgm_mood_rough_candidate` | 只有自动音频特征或 contact sheet 语境判断。 | 可做审计，不得进入最终 sequence plan。 |
| `bgm_mood_blocked_unclear` | BGM 情绪不清或候选 BGM 不唯一。 | 回到 BGM 选择 / 人工听感确认。 |
| `bgm_needs_human_listening_review` | 技术分析和素材语境不足以判断 mood。 | 请求 GPT / 用户听感回审。 |

### blocked_if

- `blocked_bgm_missing`: 找不到 BGM。
- `blocked_bgm_ambiguous`: BGM 候选不唯一。
- `blocked_bgm_mood_unclear`: mood 影响素材筛选但无法判断。
- `blocked_section_map_unclear`: section map 不足以支撑片段时长或顺序。
- `blocked_human_listening_required`: 当前必须人工复听才能继续。

## pre_edit_output_package（开剪前固定输出包）

每次进入剪辑前，Codex 必须交付 4 个固定产物：

1. `BGM_style_card（BGM 风格卡）`
2. `material_role_table（素材功能表）`
3. `sequence_candidate（候选顺序）`
4. `failure_routing_map（失败回路表）`

缺任一项，最多只能写 `pre_edit_package_partial`，不得进入 Remotion / render。

### BGM_style_card（BGM 风格卡）

| field | description |
|---|---|
| `bgm_path` | 当前 BGM 路径。 |
| `duration` | BGM 时长。 |
| `tempo_feel` | 速度感，保留 evidence level。 |
| `mood_tags` | 情绪标签，必须标 rough / confirmed。 |
| `energy_curve` | 能量曲线。 |
| `section_map` | 段落结构。 |
| `breath_points` | 换气点候选。 |
| `peak_points` | 峰值点候选。 |
| `confidence` | `rough_audio_feature_based` / `gpt_reviewed` / `user_confirmed`。 |
| `review_status` | `pending` / `gpt_reviewed` / `user_confirmed` / `blocked`。 |

### material_role_table（素材功能表）

| field | description |
|---|---|
| `material_id` | 稳定素材编号。 |
| `path` | 素材路径。 |
| `visual_summary` | 视觉粗摘要；未人工确认时标 partial。 |
| `motion_intensity` | 动作强度。 |
| `visual_density` | 画面密度。 |
| `mood_fit` | 与 BGM mood 的适配。 |
| `matched_bgm_section` | 适合的 BGM 段落。 |
| `recommended_role` | opening / build / action / breath / ending / backup / rejected。 |
| `usable_segment_candidate` | 可用片段候选，不是最终 timecode。 |
| `risk` | 品牌、隐私、跳戏、遮挡、噪音等风险。 |
| `evidence_level` | `metadata_only` / `contact_sheet_review` / `gpt_reviewed` / `user_confirmed`。 |

### sequence_candidate（候选顺序）

| field | description |
|---|---|
| `section` | intro / rise / action / breath / outro。 |
| `time_range_candidate` | 片段时长候选。 |
| `primary_material` | 主素材。 |
| `backup_material` | 备选素材。 |
| `edit_function` | 本段剪辑功能。 |
| `transition_reason` | 为什么从上一段转到这一段。 |
| `bgm_relation` | 和 BGM 段落 / mood / marker 的关系。 |
| `risk` | 顺序风险。 |
| `review_status` | `pending_gpt_user_review` / `approved_for_draft_sequence` / `blocked`。 |

### failure_routing_map（失败回路表）

| field | description |
|---|---|
| `possible_failure` | 可能失败类型。 |
| `symptom` | 用户 / GPT 看到的症状。 |
| `route_back_to` | 回到 BGM、素材、顺序、结构或人工听感哪一层。 |
| `required_fix` | 必须更新的字段。 |
| `forbidden_fix` | 禁止的错误修法。 |

## post_edit_feedback_to_selection_loop（剪后反馈回流到素材筛选）

剪后反馈必须回写到可执行字段。Codex 不能只写“下次注意”，也不能只改时间线不改原因。

| feedback_type | user_symptom | route_back_to | update_fields | next_iteration_action | forbidden_response |
|---|---|---|---|---|---|
| `feedback_rhythm_dragging（节奏拖）` | 看起来拖、慢、没推进。 | `energy_curve + segment_duration + cut_potential` | `BGM_style_card.energy_curve`, `sequence_candidate.time_range_candidate`, `material_role_table.usable_segment_candidate` | 缩短拖沓段，重排 build / action，必要时换素材。 | 只加贴纸或字幕制造热闹。 |
| `feedback_rhythm_too_chaotic（节奏乱）` | 镜头太碎、看不清、没有节奏。 | `onset_marker + material_motion + visual_density` | `BGM_style_card.peak_points`, `material_role_table.motion_intensity`, `material_role_table.visual_density` | 降低高密度素材连续出现，减少短切。 | 继续增加 transition 或加速所有素材。 |
| `feedback_visual_jumps（画面跳）` | 场景或情绪突然跳断。 | `emotional_fit + section_fit + transition_reason` | `material_role_table.mood_fit`, `sequence_candidate.transition_reason`, `sequence_candidate.risk` | 补过渡理由，调换顺序，或降级跳戏素材。 | 只用转场特效遮盖不合逻辑的跳切。 |
| `feedback_material_not_same_video（素材不像一条片子）` | 素材像来自不同视频。 | `material_role_table + mood_fit + scene_function` | `material_role_table.recommended_role`, `material_role_table.mood_fit`, `sequence_candidate.section` | 重新定义主线素材、辅助素材、弃用素材。 | 把所有素材都保留，只靠调色或贴纸统一。 |
| `feedback_bgm_picture_mismatch（BGM 和画面不搭）` | 音乐情绪和画面气质冲突。 | `BGM_mood_confirmation_gate + material_mood_fit` | `BGM_style_card.mood_tags`, `BGM_style_card.review_status`, `material_role_table.mood_fit` | 回到 mood gate，必要时人工复听后重筛素材。 | 只移动 timecode，不重判 BGM 情绪。 |
| `feedback_no_breath（没有呼吸感）` | 全片一直满，没有停顿。 | `breath_points + breath_material + segment_spacing` | `BGM_style_card.breath_points`, `material_role_table.recommended_role`, `sequence_candidate.time_range_candidate` | 插入或延长 breath 段，降低同时出现的信息量。 | 在满屏段落继续加字幕 / 贴纸。 |
| `feedback_opening_wrong（开头不对）` | 开头没抓住气质或主体。 | `BGM intro mood + opening material role` | `BGM_style_card.section_map`, `material_role_table.recommended_role`, `sequence_candidate.primary_material` | 重选 opening candidate，先定 mood-first 还是 subject-first。 | 只改第一镜头时长，不改开场功能。 |
| `feedback_ending_wrong（结尾不对）` | 收束突兀、没回味、像没剪完。 | `ending_feel + ending candidate` | `BGM_style_card.ending_feel`, `sequence_candidate.section`, `material_role_table.recommended_role` | 重选 ending candidate，调整 outro 或回环关系。 | 强塞尾卡或结束字幕来掩盖素材不适配。 |
| `feedback_action_not_on_music（动作没踩到音乐）` | 动作和音乐点不贴。 | `material_motion_tag + onset_marker + human listening review` | `material_role_table.motion_intensity`, `BGM_style_card.peak_points`, `BGM_style_card.review_status` | 回到 onset / action point，必要时人工复听确认。 | 把 rough marker 写成精准卡点。 |
| `feedback_too_many_good_materials_no_priority（素材都好但没主次）` | 素材都不错，但没有主线。 | `material_role_table + sequence_candidate priority` | `material_role_table.recommended_role`, `sequence_candidate.primary_material`, `sequence_candidate.backup_material` | 明确主素材、辅助素材、弃用素材和每段功能。 | 平均分配每个素材时长。 |

## state_update_rules（状态更新规则）

剪后反馈回来后，Codex 必须更新状态字段，而不是只写自然语言总结。

### BGM_style_card update rules

必须更新：

- `mood_tags`: 用户 / GPT 反馈证明 mood 判断错时更新。
- `energy_curve`: 节奏拖、乱、无呼吸时更新。
- `section_map`: 段落不清或结尾不对时更新。
- `breath_points`: 无呼吸或呼吸点错时更新。
- `peak_points`: 动作没踩到音乐时更新。
- `review_status`: 人工复听或 GPT 回审后更新状态。

### material_role_table update rules

必须更新：

- `visual_summary`: 素材语义被用户纠正时更新。
- `motion_intensity`: 动作强弱判断错时更新。
- `visual_density`: 用户反馈画面太乱 / 太空时更新。
- `mood_fit`: BGM 与画面不搭或素材不像一条片子时更新。
- `recommended_role`: opening / build / action / breath / ending 判断错时更新。
- `risk`: 新发现品牌、隐私、跳戏、遮挡、风格冲突时更新。
- `evidence_level`: 用户确认后才允许升级。

### sequence_candidate update rules

必须更新：

- `time_range_candidate`: 节奏拖 / 乱时更新。
- `primary_material`: 主次不清或开头 / 结尾错时更新。
- `backup_material`: 备选素材被证实更适配时更新。
- `transition_reason`: 画面跳或不像一条片时更新。
- `bgm_relation`: 音乐关系判断错时更新。
- `review_status`: 回审通过 / 阻断时更新。

### failure_routing_map update rules

必须更新：

- `possible_failure`: 新失败类型出现时追加。
- `symptom`: 用户原话或 GPT 回审症状要保真记录。
- `route_back_to`: 明确回到哪一层。
- `required_fix`: 写字段级修复，不写泛泛建议。
- `forbidden_fix`: 写明禁止的偷懒修法。

### versioning rules

| situation | action |
|---|---|
| 只修单个素材标签 | 更新 `material_role_table` 当前版本，记录 `field_update_reason`。 |
| BGM mood / section_map 被推翻 | 创建新的 `BGM_style_card` 版本，并重跑素材匹配。 |
| 候选顺序主线改变 | 创建新的 `sequence_candidate` 版本。 |
| 用户反馈证明路线层错误 | 执行路线重判，更新 `failure_routing_map` 和当前任务状态。 |
| 只是 timecode 微调 | 不创建新机制版本，但必须记录对应 `route_back_to`。 |

## judgement_standards_upgrade（判断标准补强）

| standard | pass | partial | fail | evidence_required |
|---|---|---|---|---|
| `loop_readiness（闭环准备度）` | BGM、素材、顺序、失败路由都有明确状态。 | 有筛选但缺反馈回写。 | 只有素材清单，没有机制闭环。 | `BGM_style_card + material_role_table + sequence_candidate + failure_routing_map` |
| `edit_permission_gate（是否允许进入剪辑）` | 开剪前固定输出包已完成并回审。 | 可以做粗排，但不得 render 正片。 | 不能进入 Remotion。 | GPT / 用户回审状态 + output package。 |
| `feedback_resolution_gate（反馈是否被解决）` | 反馈已回到对应字段并完成更新。 | 只定位问题但未更新机制。 | 只改时间线，没有回写原因。 | post-edit feedback record + updated fields。 |

## failure_feedback_routing_upgrade（失败反馈路由补强）

| failure_code | trigger | route_back_to | required_update | forbidden_response |
|---|---|---|---|---|
| `fail_no_bgm_mood_confirmation` | BGM mood 只停留在 rough candidate，却直接做素材顺序。 | `BGM_mood_confirmation_gate` | 更新 `BGM_style_card.review_status`，请求 GPT / 用户回审。 | 把 technical metadata 当 mood confirmed。 |
| `fail_pre_edit_package_missing` | 缺 `BGM_style_card`、`material_role_table`、`sequence_candidate` 或 `failure_routing_map`。 | `pre_edit_output_package` | 补齐缺失产物。 | 直接进入 Remotion。 |
| `fail_feedback_not_routed` | 用户反馈只被总结，没有 route_back_to。 | `post_edit_feedback_to_selection_loop` | 给每条反馈写 `route_back_to`。 | 写“下次注意”。 |
| `fail_feedback_not_written_back` | 知道问题但没有更新字段。 | `state_update_rules` | 更新对应 card / table / sequence / routing map 字段。 | 只改时间线。 |
| `fail_sequence_candidate_no_review` | 候选顺序未经 GPT / 用户回审。 | `sequence_candidate.review_status` | 标 `pending_gpt_user_review` 或补回审。 | 写成 final sequence。 |
| `fail_edit_started_before_gate` | 未过 mood gate / output package 就开始剪辑。 | `BGM_mood_confirmation_gate + pre_edit_output_package` | 回退到前置包，不允许 render。 | 用“先试一下”绕过 gate。 |
| `fail_same_material_overused_after_feedback` | 反馈已指出素材过度使用，下一版仍过度使用。 | `material_role_table + sequence_candidate` | 更新主次、时长和 replacement rule。 | 继续平均分配或拖长同素材。 |
| `fail_user_feedback_ignored` | 用户明确说不对，但机制状态未变化。 | `failure_routing_map + current_task` | 记录用户症状并更新状态。 | 只解释 Codex 原判断。 |
| `fail_loop_claimed_without_iteration` | 没有剪后反馈回写，却声明闭环已验证。 | `post-edit review + state_update_rules` | 降级为 `pending_validation`。 | 写 `loop_verified`。 |

## next_execution_bridge（下一轮执行桥接）

建议下一轮任务：

```text
gpt_user_review_current_bgm_7_material_selection_audit
```

回审通过后，才允许进入：

```text
bgm_driven_material_sequence_plan（BGM 驱动素材顺序方案）
```

下一轮必须产出：

1. `BGM_style_card`
2. `material_role_table`
3. `sequence_candidate`
4. `failure_routing_map`

不得直接进入 Remotion / render。不得把当前 `48` 的候选顺序写成最终剪辑方案。

## do_not_claim（禁止声明）

不得声明：

- BGM 精准卡点已确认
- 素材选择已最终通过
- 视频已可剪
- 闭环已验证
- vlog director capability verified
