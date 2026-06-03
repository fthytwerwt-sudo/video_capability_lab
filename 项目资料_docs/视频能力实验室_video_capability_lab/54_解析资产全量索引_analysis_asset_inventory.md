# 解析资产全量索引

## A. status（状态）

| field | value |
|---|---|
| task_type | `reference_analysis_asset_full_inventory` |
| inventory_scope | `项目资料_docs/**/*.md` + `codex_source/*.md`，排除 GPT Project 同步包、`tmp/`、`dist/` |
| inventory_count | `69` |
| content_status | `analysis_asset_inventory_completed_pending_gpt_user_review` |
| migration_library_output | `55_参考视觉语言迁移库_reference_visual_language_migration_library.md` |
| decision_router_output | `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md` |
| video_rendered_this_round | `false` |
| remotion_timeline_changed_this_round | `false` |
| generation_api_called_this_round | `false` |
| runtime_asset_commit_allowed_this_round | `false` |

已确认：本轮不是修片、不是重剪、不是 render、不是生成贴纸资产；本轮只做解析资产盘点、能力迁移和后续执行前判断机制。

已确认：全量候选清单先建立，再按迁移价值分类；没有只读取 GPT 点名文件。

待验证：`55 / 56` 仍需 GPT / 用户回审；文件存在不等于视觉语言能力已经通过多案例验证。

## B. inventory_method（盘点方法）

| step | method | result |
|---|---|---|
| `workspace_guard` | `pwd`、`git rev-parse --show-toplevel`、`git branch --show-current`、`git remote -v`、`git status --short` | passed |
| `candidate_discovery` | `find 项目资料_docs codex_source -type f -name "*.md"`，排除同步包与 runtime 输出 | `69` files |
| `fixed_entry_read` | 读取 AGENTS、系统协议、项目入口、Codex 规则、latest | completed |
| `keyword_scan` | 按 reference / sticker / caption / visual language / judgement / review / gate / BGM / API 等关键词扫描 | completed |
| `classification` | 将文件分为 `true / partial / false` 三类迁移来源 | completed |

分类说明：

- `true`: 直接进入视觉语言迁移库或判断路由器。
- `partial`: 只迁移边界、状态、风险、执行闸门或失败回路。
- `false`: 作为项目入口、历史状态或上下文，不迁移为视觉语言规则。

## C. analysis_asset_inventory（解析资产索引）

| id | file | asset_type | feed_migration_library | migration_reason | extraction_target |
|---:|---|---|---|---|---|
| 1 | `codex_source/00_codex_readme.md` | codex_entry | `false` | Codex 入口说明，不含视觉语言规则。 | 入口上下文 |
| 2 | `codex_source/01_execution_rules.md` | codex_execution_rule | `partial` | 需要更新为后续字幕 / 贴纸 / 视觉标点执行前必读 `54 / 55 / 56`。 | future_execution_gate |
| 3 | `codex_source/10_remotion_component_execution.md` | remotion_rule | `partial` | 只迁移 Remotion 执行边界：机制不等于实现，probe 不等于通过。 | execution_boundary |
| 4 | `codex_source/11_hyperframes_card_execution.md` | hyperframes_rule | `false` | 卡片执行规则，不进入 vlog 视觉语言库。 | none |
| 5 | `codex_source/12_bgm_beat_execution.md` | bgm_rule | `partial` | 迁移 BGM 只可作为粗节奏输入，不可写成精准人工确认。 | bgm_relation_boundary |
| 6 | `codex_source/13_reference_analysis_execution.md` | reference_execution_rule | `true` | 定义参考解析必须输出可执行契约，并禁止复制 UI、品牌、原文案、原布局。 | do_not_copy_boundary |
| 7 | `codex_source/14_review_pack_and_export_rules.md` | review_rule | `partial` | 迁移审片包和 start / mid / exit 证据要求。 | review_pack_gate |
| 8 | `项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md` | project_entry | `false` | 项目说明，不直接形成视觉语言规则。 | none |
| 9 | `项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md` | acceptance_contract | `partial` | 提供验收边界、Git 事实源和能力待验证口径。 | acceptance_boundary |
| 10 | `项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md` | state_entry | `partial` | 需要更新当前任务与下一目标。 | current_state |
| 11 | `项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md` | execution_bridge | `partial` | 需要追加本轮桥接、后续必读与输出字段。 | execution_bridge |
| 12 | `项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md` | validation_standard | `partial` | 需要补充视觉语言迁移完成定义。 | future_execution_gate |
| 13 | `项目资料_docs/视频能力实验室_video_capability_lab/05_能力地图_capability_map.md` | capability_map | `false` | 能力状态地图，不作为参考视觉语言素材。 | none |
| 14 | `项目资料_docs/视频能力实验室_video_capability_lab/06_视觉风格预设_visual_style_presets.md` | visual_style_preset | `partial` | 可迁移风格命名与调性，但不能当固定模板。 | style_taxonomy |
| 15 | `项目资料_docs/视频能力实验室_video_capability_lab/07_组件库_component_library.md` | component_library | `partial` | 可迁移组件边界：组件只是表达工具，不是判断来源。 | template_fallback_rule |
| 16 | `项目资料_docs/视频能力实验室_video_capability_lab/08_BGM节拍管线_bgm_beat_pipeline.md` | bgm_pipeline | `partial` | 可迁移粗节奏 / 不能精准卡点的边界。 | bgm_relation_boundary |
| 17 | `项目资料_docs/视频能力实验室_video_capability_lab/09_参考视频解析与落地契约_reference_to_execution_contract.md` | reference_contract | `true` | 参考解析到执行契约的核心规则。 | reference_rule_link |
| 18 | `项目资料_docs/视频能力实验室_video_capability_lab/10_技术样片验收标准_probe_acceptance.md` | probe_acceptance | `partial` | 技术样片通过不等于内容通过。 | validation_boundary |
| 19 | `项目资料_docs/视频能力实验室_video_capability_lab/11_vlog参考视频解析_vlog_reference_analysis.md` | reference_analysis | `true` | 首批 vlog 参考视频解析资产，含 shadow opening、street micro-cuts、object inserts 等可迁移机制。 | reference_asset_index |
| 20 | `项目资料_docs/视频能力实验室_video_capability_lab/12_音频卡点工具链检测_audio_beat_toolchain_check.md` | audio_toolchain | `partial` | 工具链事实只迁移为粗 marker 输入边界。 | bgm_relation_boundary |
| 21 | `项目资料_docs/视频能力实验室_video_capability_lab/13_工具链补齐与意图闸门同步_toolchain_gate_sync.md` | toolchain_gate | `partial` | 迁移“工具可用不等于能力成立”的状态边界。 | validation_boundary |
| 22 | `项目资料_docs/视频能力实验室_video_capability_lab/14_Remotion能力证明Demo报告_remotion_capability_demo_report.md` | demo_report | `partial` | Demo 只能证明技术路径，不可迁移为视觉标准。 | do_not_claim_boundary |
| 23 | `项目资料_docs/视频能力实验室_video_capability_lab/15_demo审美回审与v2方向_aesthetic_review_retarget.md` | aesthetic_review | `true` | 提供从技术 demo 退回审美方向重判的资产。 | failure_routing |
| 24 | `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md` | reference_aesthetic_pack | `true` | 新参考包审美解析，提供可迁移风格目标与不可复制边界。 | visual_language_source |
| 25 | `项目资料_docs/视频能力实验室_video_capability_lab/18_新素材参考重做Demo报告_new_reference_rebuild_demo_report.md` | rebuild_report | `partial` | 只迁移“参考驱动重做仍需回审”的失败回路。 | failure_routing |
| 26 | `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md` | reference_sample_report | `partial` | 样片报告可作为三表和事件表历史来源，不直接当成模板。 | reference_rule_link |
| 27 | `项目资料_docs/视频能力实验室_video_capability_lab/21_字幕贴纸对标审计_caption_sticker_reference_audit.md` | caption_sticker_audit | `true` | 字幕 / 贴纸对标审计，是字幕和贴纸关系库的上游。 | caption_sticker_relation |
| 28 | `项目资料_docs/视频能力实验室_video_capability_lab/22_视频事件表与画面选择机制_video_event_table_visual_selection.md` | event_selection_mechanism | `true` | 建立 video_event_table / visual_selection_table，是路由器输入层。 | router_input_fields |
| 29 | `项目资料_docs/视频能力实验室_video_capability_lab/23_对标视频底线失败标准_reference_bottom_line_fail_gate.md` | hard_fail_gate | `true` | 定义 reference_function、hard fail codes、禁止表面复制。 | blocked_conditions |
| 30 | `项目资料_docs/视频能力实验室_video_capability_lab/24_通用vlog剪辑机制_vlog_director_capability_mechanism.md` | vlog_mechanism | `partial` | 迁移剪辑结构与呼吸点关系，不写成能力已通过。 | sequence_context |
| 31 | `项目资料_docs/视频能力实验室_video_capability_lab/25_当前三十秒样片三表执行包_current_30s_three_tables_execution_pack.md` | three_tables_pack | `true` | 三表执行包提供 caption / sticker / transition / BGM 关系字段。 | router_input_fields |
| 32 | `项目资料_docs/视频能力实验室_video_capability_lab/26_三表P0阻断项修正包_three_tables_p0_blocker_resolution.md` | p0_blocker_resolution | `true` | 三表阻断修正，迁移为执行前字段缺失阻断。 | blocked_conditions |
| 33 | `项目资料_docs/视频能力实验室_video_capability_lab/27_贴纸图形适配与有限修复报告_sticker_visual_fit_limited_remotion_report.md` | sticker_fit_report | `true` | 指出锚点正确仍可能图形不适配，迁移 shape / color / texture 风险。 | sticker_visual_fit |
| 34 | `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md` | visual_replan | `true` | 失败后改线到视觉语言与资产规格，不继续只调 Remotion。 | failure_routing |
| 35 | `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md` | judgement_library | `true` | 核心判断库：graphic、size、style、caption mood、transition、material、BGM relation。 | decision_basis |
| 36 | `项目资料_docs/视频能力实验室_video_capability_lab/30_对标学习执行逻辑级联修正_reference_learning_execution_cascade_refactor.md` | execution_cascade | `true` | 建立 judgement library -> checklist -> event table -> hard gate 的级联。 | future_execution_gate |
| 37 | `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md` | asset_spec | `true` | 把视觉语言转为资产规格；迁移为“资产从规则生成，而不是模板 fallback”。 | shape_drawing_logic |
| 38 | `项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md` | api_probe | `partial` | 只迁移 provider / 生成候选不等于贴纸可用的边界。 | api_boundary |
| 39 | `项目资料_docs/视频能力实验室_video_capability_lab/33_无水印图片生成配置修正_watermark_free_image_policy_config.md` | policy_config | `partial` | 只迁移 no watermark / no generated label 的 source-level reject。 | copy_risk_boundary |
| 40 | `项目资料_docs/视频能力实验室_video_capability_lab/34_无水印Provider探针报告_watermark_free_provider_probe_report.md` | provider_probe | `partial` | 连接探针不等于资产可用。 | api_boundary |
| 41 | `项目资料_docs/视频能力实验室_video_capability_lab/35_MiniMax图片API契约解析_minimax_image_api_contract.md` | api_contract | `partial` | 只迁移 API 合同与不可调用边界。 | api_boundary |
| 42 | `项目资料_docs/视频能力实验室_video_capability_lab/36_阿里图片API环境变量配置_alibaba_image_env_setup.md` | env_setup | `false` | 环境变量配置，不进入视觉语言库；不得打印或迁移 secret。 | none |
| 43 | `项目资料_docs/视频能力实验室_video_capability_lab/37_阿里图片Provider探针报告_alibaba_image_provider_probe_report.md` | provider_probe | `partial` | 图片候选可干净但未必有 alpha / overlay suitability。 | asset_suitability_boundary |
| 44 | `项目资料_docs/视频能力实验室_video_capability_lab/38_阿里图片API契约解析_alibaba_image_api_contract.md` | api_contract | `partial` | 只迁移 provider 约束，不作为生成调用依据。 | api_boundary |
| 45 | `项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md` | user_review_replan | `true` | 用户明确“需要贴纸不是图片”，迁移为 sticker != image 的核心边界。 | sticker_type_library |
| 46 | `项目资料_docs/视频能力实验室_video_capability_lab/40_对标视频贴纸锚点审计_reference_sticker_anchor_audit.md` | sticker_anchor_audit | `true` | 提出 video_anchor_driven_sticker_system。 | attachment_relation_source |
| 47 | `项目资料_docs/视频能力实验室_video_capability_lab/41_目标样片贴纸锚点事件表与执行机制_target_sample_sticker_anchor_event_system.md` | target_event_system | `true` | 明确贴纸不是固定包、固定组件或 API 抽卡。 | router_input_fields |
| 48 | `项目资料_docs/视频能力实验室_video_capability_lab/42_十八秒锚点贴纸正片候选报告_18s_anchor_sticker_candidate_report.md` | candidate_report | `partial` | 可迁移 start / mid / exit 审片字段和“锚点成立不等于风格成立”。 | review_pack_gate |
| 49 | `项目资料_docs/视频能力实验室_video_capability_lab/43_十八秒候选与对标贴纸差距审计_18s_candidate_reference_sticker_gap_audit.md` | gap_audit | `true` | 指出 shape、stroke、material、placement、human feel 失败层。 | bad_pattern_library |
| 50 | `项目资料_docs/视频能力实验室_video_capability_lab/44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md` | sticker_visual_language_system | `true` | 通用贴纸视觉语言机制，是 `55` 主体来源。 | sticker_type_library |
| 51 | `项目资料_docs/视频能力实验室_video_capability_lab/45_贴纸附属关系风格板探针_sticker_attachment_relation_style_sheet_probe.md` | style_sheet_probe | `true` | 提供附属关系风格板与可审片字段。 | style_sheet_gate |
| 52 | `项目资料_docs/视频能力实验室_video_capability_lab/46_选定贴纸方案小范围Remotion探针_selected_sticker_options_small_scope_remotion_probe.md` | small_scope_probe | `partial` | 只迁移 start / mid / exit probe 方式，不写成贴纸系统通过。 | review_pack_gate |
| 53 | `项目资料_docs/视频能力实验室_video_capability_lab/47_通用BGM风格驱动素材筛选机制_universal_bgm_style_driven_material_selection_system.md` | bgm_material_system | `partial` | 迁移视觉语言与 BGM energy / mood 的粗关系。 | bgm_relation_boundary |
| 54 | `项目资料_docs/视频能力实验室_video_capability_lab/48_当前BGM与七个素材筛选审计_current_bgm_7_material_selection_audit.md` | material_audit | `partial` | 迁移素材选择风险字段，不进入贴纸模板。 | material_context |
| 55 | `项目资料_docs/视频能力实验室_video_capability_lab/49_BGM驱动素材筛选闭环补强_bgm_material_selection_feedback_loop_upgrade.md` | feedback_loop | `partial` | 迁移失败反馈回流和开剪前固定输出包。 | failure_routing |
| 56 | `项目资料_docs/视频能力实验室_video_capability_lab/50_BGM驱动全素材18秒正片风格候选报告_bgm_driven_all_materials_18s_final_style_candidate_report.md` | candidate_report | `partial` | 作为缺项历史和素材风险参考，不复用为最终模板。 | gap_history |
| 57 | `项目资料_docs/视频能力实验室_video_capability_lab/51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md` | delivery_gate | `partial` | 迁移完整模块闸门和不能静默省略的原则。 | future_execution_gate |
| 58 | `项目资料_docs/视频能力实验室_video_capability_lab/52_完整正片候选全流程重剪报告_full_video_candidate_complete_flow_recut_report.md` | candidate_report | `partial` | 迁移完整性矩阵、字幕 / 贴纸 partial 的失败回路。 | failure_routing |
| 59 | `项目资料_docs/视频能力实验室_video_capability_lab/53_新参考字幕贴纸差异审计与多样化规格_new_reference_caption_sticker_diversity_audit.md` | caption_sticker_diversity_audit | `true` | 新参考差异审计，直接进入 caption / sticker 多样化库。 | caption_visual_language |
| 60 | `项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md` | system_protocol | `partial` | 迁移 GPT / Codex 分工和 Git 事实源边界。 | process_boundary |
| 61 | `项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md` | system_protocol | `partial` | 迁移项目态记忆读取要求。 | process_boundary |
| 62 | `项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md` | system_protocol | `partial` | 迁移 P0 用户指令优先和抗漂移。 | process_boundary |
| 63 | `项目资料_docs/系统协议_system/03_外部资料桥接与保真提取机制_external_material_bridge_protocol.md` | system_protocol | `partial` | 迁移外部资料保真提取，不复制第三方资产。 | do_not_copy_boundary |
| 64 | `项目资料_docs/系统协议_system/04_路线重判与失败后改线机制_goal_revision_replanning.md` | system_protocol | `partial` | 迁移失败后改线规则。 | failure_routing |
| 65 | `项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md` | system_protocol | `partial` | 迁移中文语义与状态强度标记。 | output_boundary |
| 66 | `项目资料_docs/系统协议_system/06_原感稿锁定与双层并存机制_locked_original_feel_bridge.md` | system_protocol | `partial` | 迁移“原感 / 改写并存”的文本边界，可辅助 caption 文案。 | caption_text_boundary |
| 67 | `项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md` | system_protocol | `partial` | 迁移缺项自动补全和质量保障。 | future_execution_gate |
| 68 | `项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md` | system_protocol | `partial` | 迁移方向型任务必须补成可执行机制。 | future_execution_gate |
| 69 | `项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md` | system_protocol | `partial` | 迁移真实意图和默认完整交付口径。 | future_execution_gate |

## D. migration_bucket_summary（迁移桶汇总）

| bucket | count | representative_files | usage |
|---|---:|---|---|
| `direct_visual_language_sources` | `18` | `09 / 11 / 16 / 21-23 / 25-31 / 39-45 / 53` | 直接进入 `55` 的贴纸、字幕、附属关系、形状、判断库。 |
| `execution_and_review_boundaries` | `27` | `01-04 / 08 / 10 / 12-15 / 18 / 20 / 24 / 46-52 / codex_source` | 进入 `56` 或完成定义，约束何时可执行、何时 blocked。 |
| `api_and_asset_safety_boundaries` | `7` | `32-38` | 只迁移 provider 探针、图片候选、no watermark、alpha、资产适配边界。 |
| `project_or_system_context` | `17` | `00 / 05 / 60-69` | 作为项目态、协作态、状态强度和抗漂移背景。 |

## E. analysis_files_skipped_with_reason（跳过原因）

| status | files | reason |
|---|---|---|
| `none_skipped_from_inventory` | `0` | 全部 69 个 Markdown 文件均进入索引。 |
| `not_migrated_as_visual_rule` | `17` | 项目入口、系统协议、状态文件只作为上下文或闸门，不抽成贴纸 / 字幕视觉规则。 |
| `partial_boundary_only` | `34` | 只迁移流程、风险、API、review、状态边界。 |

## F. extraction_contract（抽取契约）

后续任何字幕、贴纸、视觉标点任务不得只说“参考 44 / 53”或“按之前风格”。必须引用：

1. `analysis_asset_id` 或具体 `source_file`。
2. `reference_rule_link`。
3. `migration_library_rule_id`。
4. `decision_router_branch`。
5. `copy_risk_check`。
6. `template_fallback` 是否触发。
7. 若触发 `template_fallback=true`，不得进入成片候选，只能回到规则补全或 style sheet probe。

## G. do_not_copy_boundary（禁止复制边界）

允许迁移：

- 参考视频的功能关系、锚点类型、字幕层级、贴纸附属关系、形状生成逻辑、失败标准、审片字段。

禁止迁移：

- 第三方贴纸原图、平台 UI、账号信息、品牌资产、原字体、原文案、包装、活动物料、可识别城市商业标识、参考视频本身的素材路径作为本项目素材资产。

## H. next_use（后续使用方式）

后续任务只要涉及字幕、贴纸、视觉标点、参考解析迁移、样片对标、vlog / odd 正片候选，就必须先读取：

1. `54_解析资产全量索引_analysis_asset_inventory.md`
2. `55_参考视觉语言迁移库_reference_visual_language_migration_library.md`
3. `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md`

如果没有读取上述三份文件，不得声明已经按参考视觉语言执行。
