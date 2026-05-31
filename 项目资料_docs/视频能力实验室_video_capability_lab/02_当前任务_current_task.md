# 当前任务

当前任务：`new_reference_aesthetic_analysis`。
当前目标：读取用户新增的 10 个参考视频，完成审美解析和 v2 demo 桥接规则；本轮最终产物是报告，不是 demo。

当前不是正式成片任务。
当前不是生成 v2 demo 任务。
当前不是训练模型任务。
当前不是继续机制设计任务。
当前不是复制参考视频资产任务。

## 本轮 P0 输入

- user_input: `我补了 10 个参考视频，让 codex 解析并学习一下，然后给出报告，路径：（素材-vlog 参考-新参考+解析）`
- task_type: `reference_analysis + aesthetic_rule_extraction + demo_v2_bridge`
- true_goal: 解析参考视频，提炼合格审美标准、不合格审美标准和下一轮 v2 demo 可执行规则。
- output_required: Markdown 报告。
- output_forbidden: v2 demo、正式视频、模型训练、参考资产复制。

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 部分成立：用户口述路径为 `素材-vlog 参考-新参考+解析`，仓库真实路径为 `素材/vlog 参考/新参考+解析`。
- 已确认：真实路径下正好 10 个 `.MP4` 参考视频。
- 已确认：本轮允许 `ffprobe` / `ffmpeg` 读取元数据、解码状态和临时抽帧观察。
- 已确认：本轮禁止调用外部 API。
- 已确认：本轮禁止生成 v2 demo 或正式视频。
- 已确认：本轮禁止提交视频、图片、音频、zip、dist、tmp、runtime assets。
- 已确认：本轮禁止复刻平台 UI、logo、二维码、账号页、搜索框、品牌包装、原字体、原文案、原音乐。

## v1 状态保留

- v1_technical_validation: `pass`
- v1_content_validation: `fail`
- v1_status: `technical_pass_content_mismatch`
- status_reason: v1 能证明 Remotion 技术链路跑通，但用户人审已确认内容方向不是想要的对标感。

该判断继续有效：未经用户确认新的 v2 方向对，不得写 `pass_continue_to_mechanism_design`。

## 本轮新增事实文件

- `项目资料_docs/视频能力实验室_video_capability_lab/16_新参考包审美解析_new_reference_aesthetic_pack.md`

## 当前能力状态

- 新参考视频路径确认: 已确认
- 新参考视频数量确认: 已确认：10 个
- 新参考视频元数据读取: 已确认：10 个均 passed
- 新参考视频音轨存在: 已确认：10 个均有 AAC stereo
- 新参考视频内容审美解析: 已确认：已产出报告
- v2 demo 生成: 未执行
- v2 内容方向: 待验证：必须等下一轮 demo 和用户人审
- BGM beat_map quality: 待验证：本轮只确认音轨存在，未做人耳复听或 beat tracking

## 当前最终判断

`new_reference_aesthetic_analysis_completed_pending_remote_verification`

本轮只能说明新参考包已解析并转成 v2 可执行规则；不能写成 Remotion 审美能力已成立，不能写成 v2 demo 已通过。

## 下一个目标

下一个目标：基于 `16_新参考包审美解析_new_reference_aesthetic_pack.md` 设计或执行下一轮 `demo_v2_reference_retarget`，但仍需遵守“先真实镜头，后文字/组件；不复刻平台/品牌资产；产出后必须用户人审”的规则。

## 本轮完成定义

本轮只有在新参考报告落库、当前任务/执行桥接包/latest 已更新、验证通过、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功后，才可写 `completed_remote_verified`。
