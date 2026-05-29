# Codex 执行规则

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
