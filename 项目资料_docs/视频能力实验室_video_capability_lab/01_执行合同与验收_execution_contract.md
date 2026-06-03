# 执行合同与验收

## 什么任务可以进入执行

- 初始化、维护或校验项目骨架。
- 设计 `component_probe` 执行合同。
- 创建小范围、可验证、可复跑的组件级 probe。
- 创建 review_pack、manifest、validator、tests。
- 不调用外部 API、不生成正式视频、不安装大型依赖的本地机制补全。

## 什么任务必须先拦截

- 要求生成正式视频、真实 BGM 混音或真实出片。
- 要求调用 Remotion / HyperFrames / FFmpeg 真实出片。
- 要求迁移旧项目业务事实、素材路径、模型选择或完成状态。
- 要求把 `technical_sample` 写成 `publish_candidate_ready`。
- 要求复刻 Apple、抖音或第三方真实 UI / 品牌资产。

## 能力 probe 和正式样片的区别

`component_probe` 只验证一个可复用组件或管线片段是否可执行、可复跑、可回审。  
`technical_sample` 可以组合多个待验证能力，用于技术验证。  
`publish_candidate` 是正式可发布候选片，本项目当前阶段不允许声明。

## 技术样片和可复用能力的区别

技术样片通过，只能说明该样片在当次条件下可生成。可复用能力成立还需要输入契约、组件边界、验收标准、复跑命令、失败样例和多场景验证。

## 完成标准

- 目标文件已落库。
- 验证脚本和 tests 通过。
- 能力状态没有从 `待验证` 被误升级。
- 本轮改动已 path-limited stage。
- commit 已创建。
- push 已成功。
- 远端 HEAD 已验证。

## 失败判定

- 缺少必读文件。
- 同步包混入项目事实。
- 验证脚本或 unittest 失败。
- `git diff --check` 失败。
- commit / push / remote HEAD 验证失败。
- 本地完成被写成 `completed`。

## 禁止项

- 禁止生成视频。
- 禁止调用外部 API。
- 禁止安装大型依赖。
- 禁止迁移旧项目业务事实。
- 禁止把技术样片写成正式交付。
- 禁止 `git add .`。

## 每轮必须 push 规则

已确认：每一轮 Codex 任务执行完，必须 push 到仓库。若产生仓库改动，只有 commit、push、remote HEAD 验证都完成后，才允许在最终回报写 `completed`。

## 正片候选验收口径

正片候选不是单一模块 probe，也不是只要视频文件存在就算完成。

当用户要求“正片 / 成片 / 发布候选 / 最终视频 / 直接出片”时，验收至少检查：

- BGM
- 素材
- 剪辑结构
- 贴纸 / 视觉标点
- 字幕 / 文本层
- 动效 / 转场
- 音频
- 导出
- 审片包
- 失败回路

缺少任一当前项目已确认必需模块，且用户没有明确排除时，不得写 `completed`，只能写对应 `blocked_required_*_missing` 或输出包含该模块的候选。

正片候选仍不是 `publish-ready`；必须等待用户审片，能力状态仍保持 `vlog_director_capability_still_pending_multi_case_validation`。
