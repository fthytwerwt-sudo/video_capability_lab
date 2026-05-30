# Codex 执行桥接包

## 工作目录硬约束

- 本项目只能在用户现有的 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库中执行。
- 当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 当前 GitHub 仓库必须是 `fthytwerwt-sudo/video_capability_lab`。
- 禁止跑出 `vlog、odd` 文件夹。
- 禁止在 `/Users/fan/Documents/` 下另建 `video_capability_lab`。
- 禁止 clone 到其他路径。
- 禁止创建 worktree 到其他路径。
- 任何文件创建、修改、迁移、同步、commit、push 都只能发生在该目录和该仓库内。
- 路径不明确时必须先问或 blocked，不得猜。

## Codex 每轮执行前必须读取

1. `AGENTS.md`
2. `项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md`
3. `项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md`
4. `项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md`
5. `项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md`
6. `项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md`
7. `项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md`
8. `项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md`
9. `项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md`
10. `执行日志_codex_log/最新摘要_latest.md`

## Codex 每轮必须输出

- `route_decision`
- `impact_check`
- `validation`
- `commit_push_status`
- `remote_head_status`
- `next_goal`
- `remaining_confirmation`

## Codex 执行单固定结构

```text
Goal（目标）
Context（上下文）
Constraints（边界）
Impact check（影响面检查）
Must read（必须读取）
文件命名要求
Execution steps（执行步骤）
Done when（完成标准）
Blocked if（阻断条件）
Output（最终回报格式）
```

## 文件命名要求

- 本轮新建自定义文件 / 目录必须使用中文+英文命名。
- 格式：`中文说明_english_slug.ext`。
- 工具强制约定文件名除外，但必须说明原因。
- 不知道怎么命名时，必须先问或标 `待确认`，不得随便创建纯英文文件名。

## 固定边界

- Codex 默认不知道 GPT 聊天新增信息，除非本轮输入给出或已写回仓库。
- Codex 每轮必须 push。
- Codex 不能把本地完成写成远端完成。
- Codex 不能把技术预览写成能力成立。
- Codex 不能把 `technical_sample` 写成 `publish_candidate_ready`。

## 固定回报字段

```text
status:
blocked:
blocked_reason:
repository:
branch:
commit_sha:
pushed:
remote_head_verified:
validation:
next_goal:
```
