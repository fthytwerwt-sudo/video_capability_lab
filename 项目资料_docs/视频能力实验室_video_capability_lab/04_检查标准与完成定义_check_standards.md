# 检查标准与完成定义

## 项目骨架完整性检查

- `AGENTS.md` 存在。
- `项目资料_docs/系统协议_system/` 下 9 个系统机制文件存在。
- `项目资料_docs/视频能力实验室_video_capability_lab/` 下项目事实入口存在。
- `codex_source/` 下 Codex 执行标准存在。
- `执行日志_codex_log/最新摘要_latest.md` 存在。
- `脚本_scripts/` 和 `tests/` 存在。

## GPT Project 上传包检查

- 上传包只包含 readme、manifest 和 9 个系统机制文件副本。
- 上传清单所有“是否允许放项目事实”均为 `否`。
- 不包含 `AGENTS.md`。
- 不包含执行日志。
- 不包含项目事实目录。
- 不包含视频、图片、音频、运行输出或 zip。

## Codex 执行文件检查

- `codex_source/00_codex_readme.md` 定义读顺序。
- `codex_source/01_execution_rules.md` 定义 push、状态、route_decision、validation、commit_push_status。
- Remotion / HyperFrames / BGM / reference / review_pack 边界均存在。

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
