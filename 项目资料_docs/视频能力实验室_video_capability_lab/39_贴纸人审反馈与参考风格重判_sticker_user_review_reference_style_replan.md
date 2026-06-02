# 贴纸人审反馈与参考风格重判

## 1. status

- task_type: `sticker_user_review_reference_style_replan`
- source_task: `alibaba_image_contract_and_watermark_free_sticker_probe`
- source_report: `项目资料_docs/视频能力实验室_video_capability_lab/37_阿里图片Provider探针报告_alibaba_image_provider_probe_report.md`
- source_asset_spec: `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
- user_review_quote: `我们要的是贴纸，这个是对标视频上面的，我们要的也是类似这种。`
- previous_candidate_status: `watermark_free_single_candidate_generated_pending_user_review`
- current_candidate_status: `alibaba_candidate_user_review_style_mismatch_not_remotion_ready`
- route_revision: `paper_sound_tag_api_generated_candidate_to_hand_drawn_reaction_sticker_system`
- next_goal: `remotion_svg_reaction_sticker_probe`
- api_call_allowed_this_round: `false`
- sticker_image_generation_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`

已确认：本轮不是继续调用图片 API，不是继续生成贴纸图，不是接入 Remotion，也不是 render 视频。

已确认：本轮目标是把用户最新人审反馈落库，并重判 sticker 主路线。

## 2. user_review（用户人审）

用户人审原话：

```text
我们要的是贴纸，这个是对标视频上面的，我们要的也是类似这种。
```

已确认：该反馈覆盖上一轮 `pending_user_review` 状态。

已确认：用户并不是要求继续生成一张更好的纸签拟声字图，而是在指出当前 sticker 目标本身被理解错了。

## 3. current_alibaba_candidate_state（当前阿里候选真实状态）

| item（检查项） | status（状态） | judgement（判断） |
|---|---|---|
| provider | `alibaba_dashscope + qwen-image-2.0-pro` | 已确认：API 契约和单图生成链路跑通。 |
| API result | `http_status=200` | 已确认：最终返回 1 张 PNG。 |
| watermark_check | `pass` | 已确认：视觉自检未见明显水印。 |
| generated_label_check | `pass` | 已确认：视觉自检未见 `AI生成` 或 generated label。 |
| logo_brand_mark_check | `pass` | 已确认：视觉自检未见 logo / brand mark。 |
| alpha_channel | `has_alpha=false` | 已确认：不是 transparent PNG。 |
| background | `clean_cutout_source_pending_user_review` | 部分成立：边界清楚，但不是透明背景。 |
| style_review | `style_mismatch` | 已确认：用户人审认为不是对标贴纸方向。 |
| ready_for_remotion | `false` | 已确认：不得直接接入 Remotion。 |

结论：

已确认：当前阿里候选的水印 / 生成标识维度部分成立，但风格方向不成立。

已确认：`no watermark` 不等于 `sticker style approved`。

已确认：当前候选状态应写为 `user_review_style_mismatch_not_remotion_ready`。

## 4. root_cause（根因重判）

当前问题不是 provider 没跑通。

当前问题是 sticker 目标理解错位：

1. 旧路线把 sticker 理解成 `paper_sound_tag（纸感拟声标签）`：承载一个拟声字或短文字的纸签图。
2. 用户要的对标贴纸更像 `visual_emotion_punctuation（视觉情绪标点）`：无文字、低复杂度、贴近动作点、短促出现。
3. API 生成纸签图即使无水印，也不能解决反应符号的形状、锚点、时机、动效和画面关系。
4. 下一轮应优先用可控原创 SVG / Remotion vector component 做探针，而不是继续 API 图片抽卡。

## 5. reference_style_abstraction（对标截图视觉机制抽象）

本节只抽象视觉机制，不复制第三方贴纸原图。

### 5.1 black_white_reaction_mark（黑白反应标记）

| field（字段） | rule（规则） |
|---|---|
| visual_role | 动作点、情绪点附近的反应符号，类似轻喜剧里的怒气 / 爆点 / 注意力标点。 |
| shape_rule | 3-5 个不规则短叉、尖角、圆头笔画或小块面组成；整体像手绘三叉反应标记，但必须原创。 |
| complexity_rule | 低复杂度，必须一眼读成反应标记，不做复杂漫画字或装饰图案。 |
| color_rule | 黑色主体线条或块面，外层厚白描边。 |
| stroke_rule | 黑色 stroke / fill 可粗一些；白描边必须足够厚，保证压在真实画面上仍清楚。 |
| size_range | 1080x1920 竖屏中 preferred `96-148px`，最小不低于 `72px`，最大不超过 `170px`。 |
| placement_rule | 靠近主体头部、手部、动作峰值、遮挡显露点；不压脸、不盖关键动作。 |
| use_case | 狗头附近、熊猫咬竹、突然转头、动作变化、轻微惊讶或反应点。 |
| do_not_use_when | 主体不清、动作点不存在、画面已被 caption 占满、会误读成电商爆炸贴或 UI icon。 |
| motion_rule | 4-6 frames 快速 pop in；停留 10-18 frames；轻微 rotate / scale wobble；快速淡出。 |
| failure_rule | 像 PPT 图标、儿童模板、电商爆炸贴、硬工程 SVG、或可识别复刻第三方贴纸时失败。 |

### 5.2 yellow_attention_burst（黄色注意力爆点）

| field（字段） | rule（规则） |
|---|---|
| visual_role | 轻提示动作点和注意力切换，让观众看见主体动作。 |
| shape_rule | 2-4 个不规则圆角黄色短笔触 / 小豆形；推荐 3 个，围绕主体边缘错落分布。 |
| complexity_rule | 不形成完整太阳、星星、badge 或促销爆点；只做短促提示符号。 |
| color_rule | 低饱和亮黄，建议 `#f3c84a` 附近；允许轻白边或轻阴影。 |
| stroke_rule | 边缘圆润，像手绘短笔触；禁止锋利 UI 形状。 |
| size_range | preferred `70-110px`，最小约 `50px`，最大不超过 `130px`。 |
| placement_rule | 放在主体动作方向旁边，和主体保持 12-36px 呼吸距离。 |
| use_case | 主体出现、突然动作、轻惊讶、注意力切换、动作峰值附近。 |
| do_not_use_when | 没有明确 `anchor_target`、画面噪音高、同场已有强黑白反应标记、或只是填空装饰。 |
| motion_rule | 3-5 frames staggered pop，多个笔触略错帧出现；停留短，不做大幅弹跳。 |
| failure_rule | 像 emoji、meme 表情、促销爆点、儿童贴纸模板，或和主体动作无关时失败。 |

## 6. revised_route（修正后的主路线）

主路线：

`hand_drawn_reaction_sticker_system（手绘反应贴纸系统）`

下一轮探针：

`remotion_svg_reaction_sticker_probe（Remotion SVG 反应贴纸组件探针）`

建议组件输入：

| prop（属性） | purpose（用途） |
|---|---|
| `sticker_family` | `black_white_reaction_mark` 或 `yellow_attention_burst`。 |
| `anchor_target` | 绑定主体、动作点或情绪点，禁止无锚点装饰。 |
| `intensity` | 控制大小、笔画数量、入场速度。 |
| `placement` | 相对主体的位置，如 `top_right`、`left_edge`、`near_motion_direction`。 |
| `start_frame` | 入场帧。 |
| `duration_frames` | 停留时长。 |
| `style_seed` | 控制原创不规则 path，避免每个贴纸完全一样。 |

## 7. forbidden_routes（禁止路线）

1. 禁止把当前阿里候选写成 `approved`。
2. 禁止把当前阿里候选接入 Remotion。
3. 禁止本轮继续调用图片 API。
4. 禁止本轮继续生成图片。
5. 禁止把 sticker 继续只理解为纸签拟声字图。
6. 禁止复制第三方截图贴纸原图、形状细节或可识别资产。
7. 禁止提交图片、视频、音频、`tmp/`、`dist/` 或 runtime assets。

## 8. next_execution_input（下一轮执行输入）

下一轮建议执行：

`remotion_svg_reaction_sticker_probe（Remotion SVG 反应贴纸组件探针）`

允许范围：

1. 小范围原创 SVG / Remotion vector component probe。
2. 只验证 `black_white_reaction_mark` 与 `yellow_attention_burst` 两类组件。
3. 可以输出 component-level 截图或本地预览时，必须遵守下一轮执行单边界；本文件不授权本轮 render。

下一轮必须读取：

1. `项目资料_docs/视频能力实验室_video_capability_lab/31_对标视觉语言到资产规格_reference_visual_language_to_asset_spec.md`
2. `项目资料_docs/视频能力实验室_video_capability_lab/37_阿里图片Provider探针报告_alibaba_image_provider_probe_report.md`
3. `项目资料_docs/视频能力实验室_video_capability_lab/39_贴纸人审反馈与参考风格重判_sticker_user_review_reference_style_replan.md`
4. `项目资料_docs/视频能力实验室_video_capability_lab/29_对标判断库机制_reference_judgement_library.md`
5. `项目资料_docs/视频能力实验室_video_capability_lab/28_对标视觉语言失败重判_reference_visual_language_replan.md`

下一轮成功标准：

1. 组件能用原创 SVG path 表达反应贴纸，不依赖第三方截图贴纸原图。
2. 每个贴纸必须有 `anchor_target`、使用场景和禁用场景。
3. 视觉上更接近手绘反应符号 / 情绪标点，而不是纸签拟声字图。
4. 组件 probe 不能写成当前视频已修好，仍需 frame review 和用户人审。

## 9. completion_state

- report_status: `sticker_user_review_reference_style_replan_completed`
- alibaba_candidate_status: `user_review_style_mismatch_not_remotion_ready`
- revised_primary_route: `hand_drawn_reaction_sticker_system`
- next_goal: `remotion_svg_reaction_sticker_probe`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
