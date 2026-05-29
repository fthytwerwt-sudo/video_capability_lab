# GPT Project 上传说明

已确认：本上传包只承载配合机制，不承载项目事实。

## 使用方式

将本目录内文件上传到 GPT Project，用于提供协作方式、判断顺序、同步规则和执行边界。

## 事实源规则

- GPT Project = 配合机制层。
- GitHub 仓库 `main` 当前文件 = 项目事实层。
- Codex = 执行落库层。
- 如果 GPT Project 上传包和 GitHub 仓库事实冲突，以 GitHub 仓库为准。

## 禁止上传内容

- `AGENTS.md`
- `执行日志_codex_log/最新摘要_latest.md`
- `项目资料_docs/视频能力实验室_video_capability_lab/` 下的项目事实
- 视频、图片、音频、运行输出、zip
