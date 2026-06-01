# 当前任务

当前任务：`api_generated_sticker_candidate_probe`。

当前目标：真实连接图片 API，生成 1 张 `paper_sound_tag（纸感拟声标签）` 测试候选，并进入用户人审。

当前状态：`api_sticker_single_candidate_generated_pending_user_review`。

下一状态：`paper_sound_tag_candidate_user_review_pending`。

能力状态：`vlog_director_capability_still_pending_multi_case_validation`。

## 本轮输入

- task_type: `api_generated_sticker_candidate_probe`
- true_goal: 使用本地 `.env` 中的 API key 真实连接图片模型，生成 1 张纸感拟声标签测试候选，判断 API 路线是否可继续。
- previous_completed_input: `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
- local_env_path: `.env`
- provider: `zhipu`
- model: `glm-image`
- report_file: `项目资料_docs/视频能力实验室_video_capability_lab/32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md`
- output_path: `tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01.png`
- env_status: `local_ignored_key_present`
- render_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- external_api_call_allowed_this_round: `true`
- sticker_asset_generation_allowed_this_round: `true`
- batch_generation_allowed_this_round: `false`
- file_change_scope: `32_probe_report + current_task + bridge + latest`

## 本轮边界

- 已确认：执行路径为 `/Users/fan/Documents/vlog、odd/video_capability_lab`。
- 已确认：GitHub 仓库为 `fthytwerwt-sudo/video_capability_lab`，分支为 `main`。
- 已确认：当前不是修视频。
- 已确认：当前不是 render。
- 已确认：当前只允许调用 1 次图片生成 API。
- 已确认：当前只允许生成 1 张 `paper_sound_tag` 测试候选。
- 已确认：当前不是批量生成贴纸包。
- 已确认：当前不是提交贴纸图片。
- 已确认：当前不是修改 Remotion 源码。
- 已确认：当前不是修改 Remotion 数据文件。
- 已确认：当前不是验证完整贴纸资产包成立。
- 已确认：当前不是验证视觉语言通过。
- 已确认：当前不是验证 vlog director capability 成立。
- 已确认：`.env` 是本地密钥文件，只能本地存在，不提交 Git，不打印真实值。
- 已确认：本轮不提交视频、图片、音频、`dist`、`tmp` 或 runtime assets。
- 已确认：本轮必须 path-limited stage，不允许 `git add .`。

## 本轮 API 探针结果

- 已确认：`.env` 中 provider 为 `zhipu`，key 存在，key 未打印。
- 已确认：`ZHIPUAI_IMAGE_MODEL` 原本为空；本轮根据智谱官方图像生成文档选用 `glm-image`，只写入本地 `.env`，不提交。
- 已确认：本轮真实发起 1 次图片生成请求，请求成功。
- 已确认：生成候选保存在 ignored 本地目录：`tmp/api贴纸候选_api_sticker_candidates/纸感拟声标签测试_paper_sound_tag_probe_01.png`。
- 已确认：生成候选没有提交 Git。
- 已确认：报告已创建：`32_API贴纸候选探针报告_api_sticker_candidate_probe_report.md`。
- 部分成立：候选有纸贴轮廓、软边、暖纸色和灰咖文字。
- 待验证：用户是否认可该候选风格。
- 待验证：候选是否能经过背景去除 / 去标识后进入 frame review。
- 已确认：候选无 alpha 通道，背景不透明。
- 已确认：候选右下角可见 `AI生成` 标识，不能直接作为合格贴纸资产。

## 下一个目标

用户人审 `paper_sound_tag（纸感拟声标签）` 测试候选。

下一轮仍必须遵守：

1. 不能把本轮候选写成 sticker asset approved。
2. 不能直接接 Remotion，必须先用户人审。
3. 如继续 API 路线，应先处理透明背景 / 生成标识问题。
4. API probe 不等于当前视频已修好。
5. API probe 不等于 `vlog_director_capability` 已成立。

## 本轮完成定义

本轮只有在 `32`、当前任务、执行桥接包、latest 更新后，`.env` 已被忽略且未 staged，图片位于 ignored `tmp/` 且未 staged，完成验证、path-limited stage、commit 成功、push 成功、远端 HEAD 验证成功，才可写 `completed_remote_verified`。

已确认：`.env` 是 local ignored file，不属于 remote verified 文件。

已确认：生成图片是 local ignored file，不属于 remote verified 文件。
