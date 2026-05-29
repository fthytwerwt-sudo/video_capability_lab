# Codex 执行规则

## vlog、odd 工作范围限制

本项目的本地仓库必须位于用户现有的 `vlog、odd` 文件夹内部。

已确认：当前已确认本地仓库路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。

Codex 不得在 `vlog、odd` 文件夹外执行本项目任务。

Codex 不得因为找不到旧路径，就在 `/Users/fan/Documents/` 下新建新的 `video_capability_lab`。

如果目标仓库不存在、路径不明确、存在多个候选、remote 不匹配，必须 blocked，不得猜。

## 工作范围与路径禁止规则

Codex 每轮执行前必须确认：

1. `pwd` 在用户现有的 `vlog、odd` 文件夹内部的 `video_capability_lab` 仓库内。
2. `git rev-parse --show-toplevel` 指向该 `video_capability_lab` 仓库。
3. `git remote -v` 指向 `fthytwerwt-sudo/video_capability_lab`。
4. 本轮允许修改文件已明确。
5. 本轮禁止修改文件已明确。

如果任一不满足：

- 不得改文件。
- 不得新建目录。
- 不得 commit。
- 不得 push。
- 必须输出 `blocked_wrong_workspace_or_remote`。

## 不知道先问规则

如果用户输入中出现不明确目标，例如：

- “那个文件”
- “vlog / odd 文件”
- “这个目录”
- “参考里面那个”
- “你自己看着弄”

Codex 必须先在仓库内查找候选。若候选不唯一或不存在，必须输出 `blocked_ask_user_confirmation`。

不得猜路径、不得新建目录、不得把能力规划写成已确认事实。

## 每轮任务必须 push

已确认：每轮 Codex 任务执行完，必须 push 到仓库。只要产生文件改动，就必须 path-limited stage、commit、push、remote HEAD readback。

## 不能 push 不得 completed

push 失败时最终状态必须写 `blocked_push_failed`。本地文件存在但未 push 时，必须写 `local_only_not_completed`。

## 禁止本地结果冒充远端完成

本地验证通过只代表 local validation 通过，不代表远端完成。完成必须同时满足 commit、push、remote HEAD verified。

## 禁止技术样片冒充能力成立

`component_probe` 通过不等于能力稳定成立。`technical_sample` 通过不等于 `publish_candidate_ready`。

## 禁止 prompt 覆盖仓库事实

用户聊天或 GPT Project 上传包若与 GitHub 仓库 `main` 当前事实冲突，以仓库事实为准；若用户本轮输入明确覆盖，以本轮输入为 `P0`。

## 执行前必须输出 route_decision

每轮执行前至少判断：

```yaml
route_decision:
  task_type:
  allowed_actions:
  forbidden_actions:
  repository:
  branch:
  expected_validation:
```

## 执行后必须输出 validation 和 commit_push_status

每轮执行后至少输出：

```yaml
validation:
  commands:
  result:
  failed_items:
commit_push_status:
  commit_sha:
  pushed:
  remote_head_verified:
  status:
```
