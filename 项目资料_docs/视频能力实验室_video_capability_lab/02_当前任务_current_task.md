# 当前任务

当前任务：`30s_reference_sample_rebuild`。
当前目标：基于 `16_新参考包审美解析_new_reference_aesthetic_pack.md`，结合用户新放入的素材，沿用同一个 BGM，重新做一条 30 秒竖屏对标样片。

当前不是贴纸显性化小修。
当前不是 12 秒技术 demo。
当前不是继续做 Remotion capability proof。
当前不是只修字幕、只修贴纸。
当前不是随机堆参考视频元素。

## 本轮 P0 输入

- user_input: `上一轮 codex 的视频产出只有 12 秒，而且我觉得 codex 和你并没有学习到我提供的啊，我希望这次看到一个对标的东西，时长是 30 秒，该有的东西都要有`
- task_type: `30s_reference_sample_rebuild`
- true_goal: 用户要看到的不是“技术可行”，而是“这条 30 秒样片已经明显在学习参考视频的审美方式”。
- previous_output_duration: `12s`
- user_expected_duration: `30s`
- route_decision: `full_30s_reference_sample_rebuild`
- not_sticker_patch: `true`
- not_capability_demo: `true`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：参考报告为 `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`。
- 已确认：新视觉素材路径唯一，为 `素材/剪辑素材/剪辑`。
- 已确认：该路径下 7 个视频均可读取和解码。
- 已确认：BGM 沿用 `素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV`。
- 已确认：本轮不调用外部 API，不训练模型，不安装大型依赖。
- 已确认：本轮不提交原视频、导出 demo、contact sheet、音频提取产物或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮素材决策

- 已确认：本轮使用 6 个源视频裁出 18 个微段落。
- 已确认：`IMG_6985.MOV` 因包含儿童和室内吉祥物场景，被排除出本轮样片。
- 部分成立：海边远景存在不可识别人影，只用于本地样片，不写成授权可复用资产。
- 部分成立：熊猫/动物园素材只用于本地样片 motif，不写成授权可复用资产。
- 已确认：本轮 motif 为 `sand_bamboo_sea_breath`。

## 本轮新增事实文件

- `remotion/数据_data/三十秒对标素材清单_30s_reference_sample_clips.ts`
- `remotion/组合_compositions/三十秒对标样片_30s_reference_sample.tsx`
- `项目资料_docs/视频能力实验室_video_capability_lab/20_三十秒对标样片报告_30s_reference_sample_report.md`

## 当前能力状态

- 新素材读取：已确认
- 新素材解码：已确认
- BGM 音轨读取：已确认
- BGM 30 秒延展：部分成立，已做本地平滑延展；未做人耳复听。
- BGM marker：部分成立，已生成自动粗 marker；不是精准 beat tracking。
- Remotion composition：已确认，id 为 `三十秒对标样片-30s-reference-sample`。
- durationInFrames：已确认，`900`。
- 本地 render：已确认，输出为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`。
- 技术元数据：已确认，30.058667s / 1080x1920 / 30fps / h264 / AAC stereo。
- contact sheet：已确认，输出为 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/contact_sheet_30s_reference_sample.jpg`。
- 内容状态：`rendered_pending_user_review`。

## 当前最终判断

`completed_remote_verified`

本轮只说明：30 秒对标样片已完成本地 render、技术验证通过、源码和报告已进入 GitHub 远端闭环。不能写成用户已认可，不能写成审美方向已通过，不能写成正式成片或 publish candidate。

## 下一个目标

下一个目标：用户人工审看 `dist/remotion_demo_三十秒对标样片_30s_reference_sample/demo_30s_reference_sample.mp4`。如果方向对，再进入字幕、贴纸、节奏和镜头选择的细节微调；如果方向仍不对，继续按审美失败项重做。

## 本轮完成定义

本轮只有在 30 秒 Remotion 源码、素材清单、报告、当前任务、执行桥接包、latest 更新后，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。
