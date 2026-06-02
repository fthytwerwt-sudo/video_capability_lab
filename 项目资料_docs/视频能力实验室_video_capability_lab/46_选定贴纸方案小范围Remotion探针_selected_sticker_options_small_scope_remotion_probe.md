# 选定贴纸方案小范围 Remotion 探针

## A. status（状态）

- task_type（任务类型）: `selected_sticker_options_small_scope_remotion_probe`
- generated_at（生成日期）: `2026-06-03`
- repository（仓库）: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- branch（分支）: `main`
- source_mechanism_file（来源机制文件）: `项目资料_docs/视频能力实验室_video_capability_lab/44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md`
- source_style_sheet_probe（来源风格板探针）: `项目资料_docs/视频能力实验室_video_capability_lab/45_贴纸附属关系风格板探针_sticker_attachment_relation_style_sheet_probe.md`
- source_candidate_video（来源候选视频）: `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4`
- source_clip_basis（无旧贴纸源帧依据）: `public/三十秒对标样片_assets/视频_clips/`
- remotion_probe_composition（Remotion 探针 composition）: `remotion/组合_compositions/选定贴纸方案小范围探针_selected_sticker_options_probe.tsx`
- remotion_probe_data（Remotion 探针数据）: `remotion/数据_data/选定贴纸方案小范围探针_selected_sticker_options_probe.ts`
- review_sheet_script（回审图脚本）: `脚本_scripts/生成选定贴纸方案回审图_generate_selected_sticker_options_review_sheet.py`
- composition_id（composition 编号）: `选定贴纸方案小范围探针-selected-sticker-options-probe`
- source_frame_output_dir（原始帧输出目录）: `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/`
- still_frame_output_dir（静帧输出目录）: `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/`
- review_sheet_output_path（回审图输出路径）: `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/选定贴纸方案_start_mid_exit_review_sheet.jpg`
- selected_options_count（选定方案数量）: `4`
- still_frames_count（静帧数量）: `12`
- content_status（内容状态）: `selected_sticker_options_probe_rendered_pending_gpt_user_review`
- capability_status（能力状态）: `vlog_director_capability_still_pending_multi_case_validation`
- gpt_user_review_required（是否需要 GPT / 用户回审）: `true`
- api_call_allowed_this_round: `false`
- image_video_audio_generation_api_called: `false`
- full_18s_render_allowed_this_round: `false`
- remotion_edit_scope（Remotion 修改范围）: `small_scope_probe_only`
- runtime_asset_commit_allowed_this_round: `false`

已确认：本轮只做 4 个用户偏好方案的小范围 Remotion still probe，不重改 18 秒正片，不 render 18 秒正片，不调用图片 / 视频 / 音频 API，不生成第三方贴纸图。

已确认：本轮为避免旧候选箭头 / 圈注 / 纸签干扰，source frames 改从对应无旧贴纸 source clips 抽取，再按候选片段近似 `scale / y` 变换放回同一镜头语境。

待验证：以下 still frame 和回审图只是用户 / GPT 下一轮判断材料，不代表贴纸视觉语言通过，也不代表 18 秒视频已经修好。

## B. selected_options（用户偏好方案）

| style_option_id（风格方案编号） | source_event_id（来源事件编号） | source_from_45（45 来源状态） | attachment_relation（附属关系） | shape_grammar（形状语法） | probe_role（探针角色） |
|---|---|---|---|---|---|
| `shot_05_option_A` | `shot_05_panda_bite_tag` | `partial_review_priority` | `contact_point_attached` | `contact_spark` | 优先验证咬竹接触点是否能替代矩形纸签。 |
| `shot_03_option_A` | `shot_03_bamboo_hide_circle` | `partial_review_priority` | `reveal_boundary_attached` | `half_ring_peek_mark` | A/B 之一，验证半环是否附着显露边界。 |
| `shot_03_option_B` | `shot_03_bamboo_hide_circle` | `partial` | `edge_attached` | `short_stroke_cluster` | A/B 之一，验证短笔触是否更像叶缘 / 脸缘提示。 |
| `shot_01_option_B` | `shot_01_panda_open_arrow` | `partial_review_priority` | `contact_point_attached` | `contact_spark` | 验证触点反应是否能替代标准箭头。 |

说明：`shot_03_option_A` 和 `shot_03_option_B` 使用同一 source frame，但在 Remotion probe 中分成不同 36-frame segment，独立显示，未叠加。

## C. source_frames（原始帧）

| source_event_id | source_clip | extract_time_in_clip | source_frame_path | reason |
|---|---|---:|---|---|
| `shot_05_panda_bite_tag` | `public/三十秒对标样片_assets/视频_clips/熊猫吃竹_panda_bamboo_bite.mp4` | `1.08s` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_05_panda_bite_tag_mid_10.26s.jpg` | 去掉候选旧纸签，只保留咬竹动作语境。 |
| `shot_03_bamboo_hide_circle` | `public/三十秒对标样片_assets/视频_clips/竹叶遮挡_bamboo_hide.mp4` | `0.96s` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg` | 去掉候选旧圈注，只保留竹叶遮挡 / 显露关系。 |
| `shot_01_panda_open_arrow` | `public/三十秒对标样片_assets/视频_clips/熊猫抬头_panda_head_turn.mp4` | `1.06s` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_01_panda_open_arrow_mid_2.92s.jpg` | 去掉候选旧箭头，只保留熊猫嘴 / 竹子接触动作。 |

## D. small_scope_probe_design（小范围探针设计）

- `composition_duration_frames`: `144`
- `fps`: `30`
- `option_duration_frames`: `36`
- `phase_offsets`: `start=5`, `mid=18`, `exit=31`
- `review_sheet_layout`: `4 options x 3 phases`
- `shot_03_ab_rule`: `same_source_frame_independent_segments_never_stacked`
- `review_only_stamp`: 单帧左下角的 option / relation / shape 标识仅用于回审，不是贴纸设计的一部分。

本轮只验证：贴纸附属关系、形状语法、描边/材质、人感方向是否值得继续做局部 motion probe。它不验证完整 18 秒节奏，也不验证整条片子的贴纸系统。

## E. style_option_probe_table（风格方案探针表）

| style_option_id | source_event_id | attachment_relation | shape_grammar | stroke_outline | scale_distance | reaction_motion_signature | material_compositing | bad_pattern_avoided | copy_risk_check | expected_human_feel | why_this_is_not_template | pass_partial_fail_self_check |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `shot_05_option_A` | `shot_05_panda_bite_tag` | `contact_point_attached` | `contact_spark` | 米白厚外轮廓 + 蜂蜜黄内线，短线端点不齐，带轻阴影。 | 贴近熊猫嘴 / 竹子接触点，宽度约画面 7%，不挡嘴。 | `contact_flash`: start 帧开始弹出，mid 帧完整，exit 帧淡出。 | marker-like fill + soft shadow + no old paper tag。 | `bad_rectangle_paper_tag`, `bad_floating_ui_overlay`, `bad_caption_duplicate_sticker` | `safe`：原创触点符号，不复制第三方贴纸、字体或文案。 | 像咬竹瞬间冒出的轻喜剧反应。 | 形状来自咬合点，不是纸签、说明牌、箭头或字幕替代。 | `partial_probe_priority`：当前仍需 GPT / 用户判断附着是否足够一眼看懂。 |
| `shot_03_option_A` | `shot_03_bamboo_hide_circle` | `reveal_boundary_attached` | `half_ring_peek_mark` | 断开的米白外轮廓 + 蜂蜜黄内线，半环末端开放。 | 沿竹叶遮挡和熊猫脸显露边界，不圈空叶子。 | `hand_draw_reveal`: start 帧手绘显线，mid 帧完整，exit 帧退场。 | cream marker stroke + soft shadow，压在复杂叶片背景上。 | `bad_full_circle_annotation`, `bad_object_detector_box`, `bad_template_marker` | `safe`：原创半环，不复刻对标圈注原形。 | 像“从叶子后露出来”的轻提示。 | 只沿显露边界长出，不闭合成完整检查圈。 | `partial_probe_priority`：更接近附属关系，但边界精度仍需回审。 |
| `shot_03_option_B` | `shot_03_bamboo_hide_circle` | `edge_attached` | `short_stroke_cluster` | 3 段短笔触，米白厚边 + 黄内线，粗细略变。 | 短线贴近叶缘 / 脸缘 12-42px，不圈画面空处。 | `sequential_tick_pop`: 短线错帧出现，mid 帧完整，exit 帧淡出。 | marker stroke texture + soft shadow，避免 thin SVG line。 | `bad_full_circle_annotation`, `bad_generic_wave_decoration`, `bad_template_marker` | `safe`：原创短线组合，不复制参考资产。 | 像叶缘旁边短促冒出的注意力标点。 | 它跟随叶缘 / 脸缘，不是波浪装饰或固定圈注模板。 | `partial_probe`：A/B 值得比较，但可能不如半环直观。 |
| `shot_01_option_B` | `shot_01_panda_open_arrow` | `contact_point_attached` | `contact_spark` | 小型米白厚外轮廓 + 蜂蜜黄内线，中心点压在接触附近。 | 比旧箭头小，贴在嘴 / 竹子接触点附近，不漂到头顶。 | `contact_pop_jitter`: start 帧弹出，mid 帧完整，exit 帧快速淡出。 | warm marker fill + soft contact shadow。 | `bad_standard_arrow`, `bad_floating_ui_overlay`, `bad_template_marker` | `safe`：原创接触反应，不复刻对标贴纸。 | 像咬到竹子时的小反应。 | 形状来自嘴和竹子的触点，不是方向箭头模板。 | `partial_probe_priority`：若用户觉得仍贴脸偏高，需要回到 anchor 坐标微调。 |

## F. start_mid_exit_frame_outputs（start/mid/exit 输出）

| style_option_id | start_frame | mid_frame | exit_frame |
|---|---|---|---|
| `shot_05_option_A` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_05_option_A_start.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_05_option_A_mid.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_05_option_A_exit.jpg` |
| `shot_03_option_A` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_A_start.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_A_mid.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_A_exit.jpg` |
| `shot_03_option_B` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_B_start.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_B_mid.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_03_option_B_exit.jpg` |
| `shot_01_option_B` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_01_option_B_start.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_01_option_B_mid.jpg` | `tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/frames/shot_01_option_B_exit.jpg` |

回审图：

`tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/选定贴纸方案_start_mid_exit_review_sheet.jpg`

说明：以上图片均为 ignored runtime outputs，不提交 Git。

## G. style_sheet_review_guide（回审指南）

GPT / 用户回审时只判断：

1. 第一眼是否知道贴纸附属于谁。
2. `shot_05_option_A` 和 `shot_01_option_B` 的火花是否真的贴在咬合 / 接触点，而不是贴脸或漂浮。
3. `shot_03_option_A` 是否比完整圈注更像显露边界附着。
4. `shot_03_option_B` 是否比半环更有人感，还是退回通用短线装饰。
5. 描边、材质、比例和距离是否少了工程 SVG / PPT 感。
6. 是否至少有 1 个方案值得进入下一轮更小范围 motion / placement 微调。

回审时不判断：

- 不判断 18 秒视频是否修好。
- 不判断贴纸系统是否验证通过。
- 不判断 vlog director capability 是否成立。
- 不判断最终上线或 publish-ready。

## H. candidate_route_decision（候选路线判断）

- candidate_best_option（候选最佳方案）: `shot_05_option_A`
- reason（理由）: 它最直接回到熊猫嘴 / 竹子的接触点，规避 `bad_rectangle_paper_tag`，且 start/mid/exit 三帧能看出触点反应从画面事件冒出。
- risk（风险）: 触点仍可能偏到熊猫脸侧而非竹子咬合点；如果 GPT / 用户认为附属关系不够一眼成立，下一轮应只微调 anchor 坐标，不扩大到整片修改。
- ab_note（A/B 说明）: `shot_03_option_A` 和 `shot_03_option_B` 需要用户二选一或都否；不能把两者叠加成同一镜头方案。
- gpt_user_review_required（是否需要 GPT / 用户回审）: `true`

部分成立：Codex 只能给出 `candidate_best_option`，不得写 selected / approved。

## I. technical_evidence（技术证据）

| check | result |
|---|---|
| candidate_video_read_check | 已确认：候选视频可读、可解码，技术事实为 `18.048000s / 1080x1920 / 30fps / h264 / AAC stereo`。 |
| source_frame_extract_check | 已确认：从 3 个无旧贴纸 source clips 抽出本轮 source frames 到 ignored `tmp/`。 |
| remotion_composition_check | 已确认：`npx remotion compositions` 识别 `选定贴纸方案小范围探针-selected-sticker-options-probe`，`144 frames / 30fps / 1080x1920`。 |
| still_render_check | 已确认：`npx remotion still` 输出 `12` 张 start/mid/exit still frames。 |
| review_sheet_generation_check | 已确认：生成回审图 `1566x2858` JPEG 到 ignored `tmp/`。 |
| api_call_check | 已确认：本轮没有调用图片 / 视频 / 音频 API。 |
| full_video_render_check | 已确认：本轮没有 render 新 18 秒正片。 |
| remotion_scope_check | 已确认：本轮只新增小范围 probe composition / data，未修改 18 秒正片时间线文件。 |

## J. do_not_claim（禁止声明）

不得声明：

- `sticker passed`
- `visual language passed`
- `video fixed`
- `Remotion completed`
- `sticker system verified`
- `vlog director capability verified`
- `publish_candidate_ready`

最终内容状态只能写：

`selected_sticker_options_probe_rendered_pending_gpt_user_review`

## K. next_goal（下一个目标）

`gpt_user_review_selected_sticker_options_small_scope_remotion_probe`

进入下一轮前必须由 GPT / 用户判断：

1. 哪个方案最接近对标视频的人感和附属关系。
2. `shot_03_option_A` 与 `shot_03_option_B` 是否只保留一个。
3. 是否允许针对至少 1 个方案进入更小范围 Remotion motion / anchor 微调。
