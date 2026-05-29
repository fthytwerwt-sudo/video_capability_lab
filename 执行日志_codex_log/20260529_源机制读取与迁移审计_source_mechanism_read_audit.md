# 源机制读取与迁移审计

## 读取结论

已确认：用户指定的源父目录 `/Users/fan/Documents/直播工厂` 下，机制文件实际位于真实子仓库 `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp`。  
已确认：本轮只读取机制，不迁移旧项目业务事实。  
已确认：源机制包完整，9 个机制文件和上传清单均已读取。  
部分成立：父目录直连相对路径未命中，但同一源父路径下真实子仓库路径完整命中。  
待验证：未来源项目是否会把机制包复制回父目录。

## 已读取文件

| 文件 | 学习到的机制 |
|---|---|
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/GPT项目资料同步包_gpt_project_mechanism_sync/上传清单_manifest.md` | GPT Project 上传包只放配合机制，不放项目事实；manifest 每项“是否允许放项目事实”为 `否`。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md` | GPT / Codex 分工、GPT Project / GitHub / Codex 三层分工、只迁移协作方式。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md` | 项目态下账号层规则继续硬执行，当前输入和当前事实优先。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md` | `P0 / P1 / P2` 优先级、冲突回拉和证据不足标 `待验证`。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md` | GPT 上游补全、Codex 可执行化补全、二次补全、同步包刷新和质量检查。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md` | 方向型输入必须补到字段、入口、样例、验证、阻断、同步。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/03_外部资料桥接与保真提取机制_external_material_bridge_protocol.md` | 外部资料先保真事实包，再执行桥接；Codex 不默认知道 GPT Project 新增资料。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/04_路线重判与失败后改线机制_goal_revision_replanning.md` | 失败分层、路线级失败停止重复、改线后同步入口。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md` | 中文优先、English 原词保留、状态词、下一个目标口径。 |
| `/Users/fan/Documents/直播工厂/AI直播前台验证项目_ai_live_frontend_mvp/项目资料_docs/系统协议_system/06_原感稿锁定与双层并存机制_locked_original_feel_bridge.md` | 原感参考层和执行桥接层并存，不能互相覆盖。 |

## 允许迁移的机制

- 三层协作结构：`GPT Project` = 配合机制层，`GitHub 仓库` = 项目事实层，`Codex` = 执行落库层。
- GPT Project 上传包 allowlist / manifest / mechanism-only 纪律。
- `P0 / P1 / P2` 锚点和抗漂移规则。
- 状态标记：`已确认` / `部分成立` / `待验证` / `推测` / `通用建议`。
- 方向型输入到可执行机制补全规则。
- 外部资料保真提取与执行桥接规则。
- 路线失败后的重判、降级和 blocker 表述。
- 原感参考层与执行桥接层双层并存。
- Codex 验证、commit、push、远端 HEAD 验证后才写完成。

## 禁止迁移的旧项目业务内容

- 直播项目业务目标。
- 电商项目业务结论。
- 视频工厂正式运营结论。
- 旧素材路径。
- 旧模型选择结论。
- 旧项目当前任务。
- 旧项目完成状态或验收结果。
- 旧项目商品、样片、TTS、API、平台数据等事实。

## 业务事实污染风险

已确认：源机制文件中包含旧项目示例和旧项目特定路径。  
已确认：本轮新文件已改写为 `video_capability_lab` 通用机制版本。  
已确认：旧项目业务例子只作为机制理解来源，不写成本项目事实。  
待验证：后续新增 reference_analysis 时，仍需单独检查第三方 UI / 品牌资产 / 素材污染。

## 源机制包完整性

已确认：源机制包完整。  
已确认：本轮迁移不依赖聊天印象。  
已确认：本轮不生成视频、不调用 Remotion / HyperFrames / FFmpeg 真实出片、不调用外部 API。
