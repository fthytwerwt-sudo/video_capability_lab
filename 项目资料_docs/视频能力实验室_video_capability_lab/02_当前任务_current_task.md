# 当前任务

当前任务：`new_reference_rebuild_demo`。
当前目标：基于 `16_新参考包审美解析_new_reference_aesthetic_pack.md` 的审美规则，使用 `素材/剪辑素材/剪辑` 中的新素材，沿用同一个 BGM，重新做一个完整 Remotion demo。

当前不是旧 v2 patch 任务。
当前不是正式成片任务。
当前不是训练模型任务。
当前不是调用外部生成 API 任务。
当前不是机制设计扩写任务。

## 本轮 P0 输入

- user_input: `重新给我做，按照解析报告、新素材、字幕和贴纸方向，BGM 用同一个`
- task_type: `new_reference_rebuild_demo`
- true_goal: 不沿用旧 v2 的内容方向，按新参考包规则和新剪辑素材重做一个可看片的 12 秒竖屏 demo。
- output_required: Remotion 源码、素材清单、Markdown 报告、当前任务/桥接/latest 状态更新、本地 render 结果。
- output_forbidden: 外部 API、模型训练、大型依赖安装、提交 runtime assets、提交 demo 视频、提交音频、提交图片、提交 zip。

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：新视觉素材路径为 `素材/剪辑素材/剪辑`。
- 已确认：该路径下有 7 个视频文件，均可读取和解码。
- 已确认：本轮使用的 BGM 仍为 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`。
- 已确认：本轮参考规则来自 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：本轮不提交原视频、导出 demo、contact sheet、音频提取产物或 runtime assets。
- 已确认：本轮不调用外部 API，不训练模型，不安装大型依赖。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 素材选择

- 已确认：选用 6 个低到中风险片段进入 demo：`sd1674359014_2.MP4`、`IMG_0971.MOV`、`sd1674358932_2.MP4`、`IMG_3226.MOV`、`IMG_0970.MOV`、`IMG_3225.MOV`。
- 已确认：`IMG_6985.MOV` 因包含儿童与室内吉祥物场景，被排除出本轮 demo。
- 部分成立：海边远景素材存在不可识别人影，只用于本地 demo，不写成授权可复用资产。
- 部分成立：熊猫/动物园素材只用于本地 demo 的 motif，不写成授权可复用资产。

## 本轮新增事实文件

- `remotion/数据_data/新素材重做清单_new_reference_rebuild_clips.ts`
- `remotion/组合_compositions/新素材参考重做Demo_new_reference_rebuild_demo.tsx`
- `项目资料_docs/视频能力实验室_video_capability_lab/18_新素材参考重做Demo报告_new_reference_rebuild_demo_report.md`

## 当前能力状态

- 新素材读取：已确认
- 新素材解码：已确认
- BGM 音轨读取：已确认
- BGM marker：部分成立，已生成自动粗 marker；未做人耳复听，不是精准 beat tracking。
- Remotion composition：已确认，id 为 `新素材参考重做Demo-new-reference-rebuild-demo`。
- 本地 render：已确认，输出为 `dist/remotion_demo_新素材参考重做_new_reference_rebuild/demo_new_reference_rebuild.mp4`。
- 技术元数据：已确认，12.053333s / 1080x1920 / 30fps / h264 / AAC stereo。
- 内容状态：`rendered_pending_user_review`。

## 当前最终判断

`completed_remote_verified`

本轮只说明：新素材重做 demo 已完成本地 render、技术验证通过、源码和报告已进入 GitHub 远端闭环。不能写成用户已认可，不能写成审美方向已通过，不能写成正式成片或 publish candidate。

## 下一个目标

下一个目标：用户人工审看 `dist/remotion_demo_新素材参考重做_new_reference_rebuild/demo_new_reference_rebuild.mp4`。若方向通过，再把本轮的素材选择、字幕/贴纸节奏、BGM 粗 marker 和 runtime asset 准备流程沉淀成可复用机制；若方向不通过，继续按审美失败项重做。

## 本轮完成定义

本轮只有在 Remotion 源码、素材清单、报告、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
