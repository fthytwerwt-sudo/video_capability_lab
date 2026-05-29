# video_capability_lab 协作入口

已确认：当前仓库是 `video_capability_lab`。  
已确认：当前项目中文暂定名为 `视频能力实验室｜Codex 视频导演能力库`。  
已确认：本项目是视频能力实验室，不是直播项目、不是电商项目、不是视频工厂正式运营项目。

## 工作目录硬约束

已确认：本项目只能在用户现有的 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库中执行。
已确认：当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
已确认：Codex 不得跑出 `vlog、odd` 文件夹执行本项目任务。
已确认：Codex 不得在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab` 目录。
已确认：Codex 不得 clone 到其他路径，不得创建 worktree 到其他路径，不得在用户电脑其他位置新建项目目录。
已确认：当前 GitHub 仓库必须是 `fthytwerwt-sudo/video_capability_lab`。
已确认：执行前必须检查 `pwd`、`git rev-parse --show-toplevel`、`git branch --show-current`、`git remote -v`。
已确认：如果当前路径不在 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库，必须立即 `blocked_wrong_workspace_or_remote`。
已确认：如果 remote 不指向 `fthytwerwt-sudo/video_capability_lab`，必须立即 `blocked_wrong_workspace_or_remote`。
已确认：不知道目标文件、目录、素材路径或执行范围时，必须先问或标 `待确认`，不得猜。

## 项目目标

本项目用于验证、沉淀和复用 Codex 视频执行能力。

当前能力均为 `待验证`，包括：

- Remotion 手写字节奏层：待验证
- HyperFrames apple glass 卡片：待验证
- BGM beat_map 卡点管线：待验证
- 分屏 collage：待验证
- odd / apple glass / vlog 风格：待验证
- 电商商品视频组件：待验证
- 10-15 秒技术样片：待验证
- 45 秒样片：待验证

## 默认读取顺序

1. `AGENTS.md`
2. `项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md`
3. `项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md`
4. `项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md`
5. `项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md`
6. `项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md`
7. `项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md`
8. `项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md`
9. `项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md`
10. `项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md`
11. `项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md`
12. `codex_source/00_codex_readme.md`
13. `codex_source/01_execution_rules.md`
14. `执行日志_codex_log/最新摘要_latest.md`

## GPT Project 上传包纪律

GPT Project 只放配合机制，不放项目事实。  
项目事实必须回 GitHub 仓库 `main` 当前文件读取。  
GPT Project 上传包和 GitHub 仓库事实冲突时，以 GitHub 仓库为准。  
`AGENTS.md`、执行日志、项目事实文件不得放进 GPT Project 上传包。

## Codex 强制 push 规则

已确认：每一轮 Codex 任务执行完，必须 push 到仓库。  
已确认：凡产生仓库文件改动，`completed` 必须等到 commit 已创建、push 已成功、远端 HEAD 已验证。  
已确认：本地有文件但未 push，不得写 `completed`。  
已确认：push 失败必须写 `blocked_push_failed`。  
已确认：禁止 `git add .`，必须 path-limited stage 本轮相关文件。

## 状态标记

本项目只使用以下状态词表达判断强度：

- `已确认`
- `部分成立`
- `待验证`
- `推测`
- `通用建议`
- `待创建`
- `待补全`
- `blocked`

## 禁止迁移旧项目事实

禁止迁移直播、电商、视频工厂正式运营等旧项目业务结论。  
源项目文件中的业务例子只能作为机制示例，不得成为本项目事实。  
任何 capability、样片、组件、BGM、参考解析、导出链路，在真实 probe 通过前一律写 `待验证`。
