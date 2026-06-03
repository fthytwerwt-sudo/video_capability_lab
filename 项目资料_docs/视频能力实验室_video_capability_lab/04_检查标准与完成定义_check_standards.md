# 检查标准与完成定义

## 工作范围检查

每轮执行前必须检查：

1. 当前目录是否在用户现有 `vlog、odd` 文件夹内部。
2. 当前 git 顶层是否为该文件夹内的 `video_capability_lab`。
3. remote 是否指向 `fthytwerwt-sudo/video_capability_lab`。
4. 是否没有在 `vlog、odd` 文件夹外创建目录或文件。
5. 是否没有在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab`。
6. 是否没有 push 到错误仓库。
7. 路径不明确、候选不唯一或 remote 不匹配时，是否已 blocked 而不是猜。

## 外部项目 AGENTS 审计检查

审计其他项目入口规则时必须检查：

1. 是否只读取被用户允许的源项目 `AGENTS.md`。
2. 是否误读用户明确禁止的项目。
3. 是否把源项目业务身份、当前任务、完成状态、素材路径、模型选择、业务路线或验收结果迁入本项目。
4. 是否只迁移通用协作机制。
5. 是否更新 GPT Project 上传包纪律。
6. 是否保持当前项目能力状态为 `待验证`。
7. 是否完成 commit、push 和 remote HEAD 验证。

## 项目骨架完整性检查

- `AGENTS.md` 存在。
- `项目资料_docs/系统协议_system/` 下 10 个系统机制文件存在。
- `项目资料_docs/视频能力实验室_video_capability_lab/` 下项目事实入口存在。
- `codex_source/` 下 Codex 执行标准存在。
- `执行日志_codex_log/最新摘要_latest.md` 存在。
- `脚本_scripts/` 和 `tests/` 存在。

## GPT Project 上传包检查

- 上传包只包含 readme、manifest 和 10 个系统机制文件副本。
- 上传清单所有“是否允许放项目事实”均为 `否`。
- 不包含 `AGENTS.md`。
- 不包含执行日志。
- 不包含项目事实目录。
- 不包含视频、图片、音频、运行输出或 zip。

## Codex 执行文件检查

- `codex_source/00_codex_readme.md` 定义读顺序。
- `codex_source/01_execution_rules.md` 定义 push、状态、route_decision、validation、commit_push_status。
- Remotion / HyperFrames / BGM / reference / review_pack 边界均存在。

## 文件命名检查

每轮完成前必须检查：

1. 本轮是否新建文件或目录。
2. 新建文件或目录是否符合 `中文说明_english_slug.ext` 或 `中文说明_english_slug/`。
3. 是否存在非约定场景下的纯英文文件名。
4. 如果使用工具固定英文名，是否在回报中说明原因。
5. 是否没有用模糊缩写、临时名、无语义名，例如 `test1.md`、`new_file.py`、`tmp.md`。

## 状态标记检查

必须出现并按证据强度使用：

- `已确认`
- `部分成立`
- `待验证`
- `推测`
- `通用建议`

## push 检查

完成必须满足：

- commit 已创建。
- push 已成功。
- `git ls-remote origin HEAD` 与本地 HEAD 一致。

## 旧项目事实污染检查

禁止把旧直播项目、旧电商测试、旧视频工厂正式运营任务、旧素材路径、旧模型选择或旧验收结论写成本项目事实。

## 能力 probe 状态检查

能力 probe 未验证不得写成已成立。能力地图中的初始状态必须全部是 `待验证`，不得出现 `已确认可用` 或 `已验证成立`。

## full_video_candidate_done_definition

正片候选完成前必须检查 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md`。

每个正片候选报告必须包含：

- `full_video_candidate_completion_matrix`
- `blocked_if_required_module_omitted`
- `failure_feedback_routing`
- 用户明确跳过模块记录
- 禁止声明清单

如果任一必需模块被静默省略，不得写 `completed`。

禁止使用以下缺项理由：

- `silently_omitted`
- `not_in_prompt_so_skipped`
- prompt 没写所以没做
- Codex 自行判断不需要

缺项时必须写：

- `missing_blocked`
- 对应 `blocked_required_*_missing`
- `route_back_to`
- `required_fix`

正片候选完整性检查通过，也不等于 `publish-ready`、`video_fixed` 或 `vlog_director_capability_verified`；仍需用户审片。

## reference_visual_language_migration_done_definition

涉及参考视频解析、对标审计、字幕、贴纸、视觉标点、风格判断、样片回审或 vlog / odd 正片候选前，必须检查：

1. 是否读取 `54_解析资产全量索引_analysis_asset_inventory.md`。
2. 是否读取 `55_参考视觉语言迁移库_reference_visual_language_migration_library.md`。
3. 是否读取 `56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md`。
4. 是否写明 `analysis_asset_ids`。
5. 是否写明 `reference_rule_link`。
6. 是否写明 `migration_library_used`。
7. 是否写明 `decision_router_used`。
8. 是否写明字幕 / 贴纸 / 视觉标点的选择理由。
9. 是否写明 `caption_sticker_relation`。
10. 是否写明 `copy_risk_check`。
11. 是否写明 `template_fallback`。
12. 是否写明失败回退层。

通过标准：

| check | pass |
|---|---|
| `inventory_used` | 后续任务能指出来源资产 ID，而不是只说“参考之前”。 |
| `library_used` | 能引用贴纸类型、附属关系、形状逻辑、字幕视觉类型或字幕贴纸关系。 |
| `router_used` | 每个镜头 / 事件经过 caption、sticker、visual punctuation、neither 的路由判断。 |
| `source_traceability` | 每个视觉语言决策都有 `reference_rule_link`。 |
| `template_fallback_gate` | 若只能套模板，必须标 `template_fallback=true`，不得进入成片候选。 |
| `copy_boundary` | 只迁移功能、关系和规则，不复制第三方资产、平台 UI、品牌、原字体、原文案。 |

失败时必须写：

- `blocked_reference_visual_language_preflight_missing`
- `blocked_decision_router_not_used`
- `blocked_template_fallback`
- `blocked_copy_risk`
- `route_back_to: 54/55/56`

不得把以下情况写成通过：

- 只有字幕数量增加，但没有 caption type、锚点、位置、层级和来源规则。
- 只有贴纸数量增加，但没有 attachment relation、shape grammar、stroke/material 和来源规则。
- 只做 Remotion 组件或 SVG 形状展示，没有视频事件和参考规则来源。
- 只说“按参考风格”，但没有 `analysis_asset_ids` 和 `reference_rule_link`。
- 技术 probe、静态风格板或局部 render 成功，就写成视觉语言已经通过。

本完成定义只证明迁移库和路由器文件已建立；后续真实任务仍需调用、输出审片包、接受用户 / GPT 回审。
