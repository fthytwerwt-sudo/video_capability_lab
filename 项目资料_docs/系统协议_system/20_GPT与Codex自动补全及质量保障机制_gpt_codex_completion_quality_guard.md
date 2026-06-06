# GPT 与 Codex 自动补全及质量保障机制

## 文件定位

本文件规定 GPT 与 Codex 如何把方向、机制、项目事实和执行任务补到可验证、可复跑、可同步的程度。

## 触发条件

- 用户给出方向型输入、初始化任务、机制同步任务或能力 probe 设计任务。
- 现有文件只有说明，没有字段、脚本、验证、样例或完成定义。
- Codex 读取后发现入口、检查标准、最新摘要、上传包之间不一致。

## 默认动作

1. GPT 先执行真实意图澄清闸门，补清用户真实目标、成功标准、失败标准和停止条件。

当项目遇到问题、用户需求不清、执行方式改变或机制冲突时，GPT 必须先按 `23_五层需求确认与逻辑串联闸门机制_five_layer_requirement_alignment_gate.md` 做需求确认，再决定是否下发 Codex。

2. GPT 补目标、边界、P0/P1/P2、验收和风险。
3. Codex 补执行字段、输入输出、触发条件、判断流程、阻断条件、降级方案、验证脚本和 tests。
4. Codex 本轮执行时做二次补全：发现缺口就在当前边界内补齐。
5. 修改系统机制文件或 GPT Project 上传包相关文件后，必须运行 `python3 脚本_scripts/sync_gpt_project_mechanism_pack.py` 刷新 GPT Project 上传包，再运行 `python3 脚本_scripts/sync_gpt_project_mechanism_pack.py --check`。
6. 修改仓库文件后必须验证、commit、push、远端 HEAD readback。

## 质量保障清单

- 有目标和边界。
- 有用户真实目标、成功标准、失败标准和停止条件。
- 有输入字段和输出字段。
- 有字段来源和缺字段处理。
- 有触发条件和判断流程。
- 有阻断条件和降级方案。
- 有合格样例和不合格样例。
- 有检查脚本或 tests。
- 有最新摘要和下一个目标。
- 有 commit / push / remote HEAD 验证。
- GPT Project 上传包已确认不包含 `AGENTS.md`、latest、项目事实目录、视频、图片、音频、运行输出或业务事实。

## 例外 / 停止线

- 当前任务明确禁止真实 runner、视频生成或 API 调用时，只能补机制、脚本和检查，不得越界。
- 缺少真实素材、外部资料、账号数据或用户复审时，必须标 `待验证`。
- 只允许只读审计时，不得落库。

## 失败判定

- 只新增 Markdown，没有验证脚本或 tests。
- 只刷新同步包，没有检查上传包是否混入项目事实。
- 系统机制改了但上传包未同步。
- 上传包混入外部项目业务事实仍写可上传。
- 本地验证通过但 push 失败仍写完成。
- capability probe 未跑就写成能力成立。

## 一句话执行口径

GPT 把方向补清，Codex 把方向补成可执行、可验证、可同步、可 push 的仓库事实；缺验证或缺远端闭环都不是完成。

## 正片类任务完整交付补全规则

当用户说“正片 / 成片 / 发布候选 / 最终视频 / 直接出片 / 我只想看正片”时，GPT 必须默认补齐完整交付模块，而不是把任务降级成单一模块。

默认必须补齐：

1. `BGM_style_and_audio`
2. `material_selection`
3. `sequence_structure`
4. `pacing_and_rhythm`
5. `captions_or_text_layer`
6. `stickers_or_visual_punctuation`
7. `motion_effects_and_transitions`
8. `composition_and_crop`
9. `audio_mix`
10. `export_and_technical_validation`
11. `review_pack`
12. `failure_feedback_routing`

GPT 不得替用户删除未明确排除的模块，尤其不得默认删除贴纸、字幕、动效、审片包或失败回路。

“中间方案可以不给用户看”不等于“Codex 内部可以不执行完整流程”。如果用户只想看最终视频，GPT 仍必须把内部完整流程写入 Codex 执行要求。

正片类 Codex prompt 必须写入：

- `full_video_candidate_required_modules`
- `missing_component_check`
- `blocked_if_required_module_omitted`
- `full_video_candidate_completion_matrix`

若正片任务缺少上述模块检查，GPT prompt 视为不完整；Codex 收到后必须按 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md` 补齐或 blocked。
