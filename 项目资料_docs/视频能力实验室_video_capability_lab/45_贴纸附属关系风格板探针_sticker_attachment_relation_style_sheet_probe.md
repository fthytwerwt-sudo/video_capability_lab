# 贴纸附属关系风格板探针

## A. status（状态）

- task_type（任务类型）: `sticker_attachment_relation_style_sheet_probe`
- generated_at（生成日期）: `2026-06-03`
- repository（仓库）: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- branch（分支）: `main`
- source_mechanism_file（来源机制文件）: `项目资料_docs/视频能力实验室_video_capability_lab/44_通用贴纸视觉语言机制_universal_sticker_visual_language_system.md`
- source_candidate_video（来源候选视频）: `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4`
- source_reference_video（来源对标视频）: `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`
- style_sheet_output_path（风格板输出路径）: `tmp/贴纸附属关系风格板_sticker_attachment_relation_style_sheet/贴纸附属关系风格板_sticker_attachment_relation_style_sheet.jpg`
- source_frame_output_dir（原始帧输出目录）: `tmp/贴纸附属关系风格板_sticker_attachment_relation_style_sheet/source_frames/`
- style_options_count（风格方案数量）: `9`
- content_status（内容状态）: `sticker_attachment_relation_style_sheet_generated_pending_gpt_user_review`
- capability_status（能力状态）: `vlog_director_capability_still_pending_multi_case_validation`
- user_review_status（用户回审状态）: `pending_gpt_user_review`
- api_call_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`
- runtime_asset_commit_allowed_this_round: `false`

已确认：本轮只生成静态风格板和可回审报告，不修改 18 秒正片时间线，不 render 新正片，不调用图片 / 视频 / 音频 API，不生成第三方贴纸图。

已确认：风格板图片、source frames 和抽帧均位于 ignored `tmp/`，只作为 GPT / 用户回审证据，不提交 Git。

待验证：以下方案只是 Codex 静态自检候选，仍需 GPT / 用户判断是否至少有 1 个方案值得进入小范围 Remotion probe。

## B. selected_events（选用事件）

| event_id | source_41_event | source_43_failure | source_frame_path | current_bad_pattern | reason_for_selection |
|---|---|---|---|---|---|
| `shot_01_panda_open_arrow` | `shot_01_panda_open_arrow` | 标准箭头感，离熊猫嘴 / 爪动作点偏远，像教学 UI。 | `tmp/贴纸附属关系风格板_sticker_attachment_relation_style_sheet/source_frames/shot_01_panda_open_arrow_mid_2.92s.jpg` | `bad_standard_arrow` | 第一个主体动作出现点，适合测试动作方向附着、接触点附着和边缘附着三种关系。 |
| `shot_03_bamboo_hide_circle` | `shot_03_bamboo_hide_circle` | 完整圈注标注感，圈到叶子和空隙多于显露边界。 | `tmp/贴纸附属关系风格板_sticker_attachment_relation_style_sheet/source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg` | `bad_full_circle_annotation` | 遮挡 / 显露关系清楚，适合测试半圈窥视、叶缘短线和字幕关系微气泡。 |
| `shot_05_panda_bite_tag` | `shot_05_panda_bite_tag` | 矩形纸签说明牌，漂浮在熊猫上方而不是附着到咬合点。 | `tmp/贴纸附属关系风格板_sticker_attachment_relation_style_sheet/source_frames/shot_05_panda_bite_tag_mid_10.26s.jpg` | `bad_rectangle_paper_tag` | 咬竹接触点清楚，是最适合测试触点反应和微字气泡的事件。 |

## C. style_option_table（风格方案表）

| style_option_id（风格方案编号） | source_event_id（来源事件编号） | attachment_relation（附属关系） | shape_grammar（形状语法） | stroke_outline（描边系统） | scale_distance（比例距离） | reaction_motion_signature（反应动效签名） | material_compositing（材质融合） | bad_pattern_avoided（规避的错误模式） | copy_risk_check（复制风险检查） | expected_human_feel（预期人感） | why_this_is_not_template（为什么不是模板） | pass_partial_fail_self_check（自检结论） |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `shot_01_option_A` | `shot_01_panda_open_arrow` | `motion_direction_attached` | `short_stroke_cluster`：2-4 段错位短笔触顺熊猫咬竹 / 头部动作方向出现。 | 黑咖内线约 10-12px，米白外轮廓约 22-25px，粗细轻微不均，带轻阴影。 | 距熊猫嘴 / 头部动作点约 12-48px，不压脸；视觉重量低于熊猫头部。 | `staggered_burst`：短笔触错帧弹出，停留很短，不写精准 BGM 卡点。 | 手绘粗糙边 + 轻阴影，让笔触像压在画面上，不只是一条 SVG path。 | `bad_standard_arrow`, `bad_clean_svg_path`, `bad_color_only_iteration` | `safe`：原创短笔触，不复制对标箭头原形、字体或 UI。 | 像动作旁边冒出的注意力标点。 | 没有箭头头部，也不是完整方向图标；每段笔触都围绕熊猫动作方向。 | `partial_review`：方向比标准箭头好，但仍需用户判断是否足够一眼看懂。 |
| `shot_01_option_B` | `shot_01_panda_open_arrow` | `contact_point_attached` | `contact_spark`：1-3 个短促触点闪线从嘴 / 竹子接触点冒出。 | 蜂蜜黄内线 + 米白厚外轮廓，触点中心有小圆点，线端略不齐。 | 紧贴咬竹接触点 8-36px，不挡嘴和竹子。 | `contact_flash`：2-4 frames 出现，4-10 frames 停留，快速退场。 | 贴纸边缘带白边和轻阴影，强调接触点，不做透明淡线。 | `bad_standard_arrow`, `bad_floating_ui_overlay`, `bad_rectangle_paper_tag` | `safe`：只抽象接触反应，不复刻第三方贴纸。 | 像咬竹瞬间的小反应。 | 形状来自嘴和竹子的接触，不是箭头、标签或装饰星星模板。 | `partial_review_priority`：本组最值得回审，但接触点精度仍需下一轮 frame review。 |
| `shot_01_option_C` | `shot_01_panda_open_arrow` | `edge_attached` | `edge_wiggle`：沿熊猫头部 / 耳朵边缘的短轻抖线。 | 黑咖内线 + 米白外轮廓，双线短而不连续，带轻阴影。 | 离头部边缘 6-32px，不进入眼睛 / 嘴区域。 | `micro_wobble`：低幅度轻抖，服务“头部动作被看见”。 | 粗糙边与轻阴影结合，避免工程线条。 | `bad_clean_svg_path`, `bad_floating_ui_overlay` | `safe`：原创边缘标点，无第三方资产。 | 像熊猫头部边缘的轻喜剧反应。 | 附着在可见边缘，不是画面空处的通用波浪线。 | `partial`：边缘关系成立，但可能不如触点方案直观。 |
| `shot_03_option_A` | `shot_03_bamboo_hide_circle` | `reveal_boundary_attached` | `half_ring_peek_mark`：不完整半圈和小窥视标点沿叶缘 / 熊猫显露边界出现。 | 蜂蜜黄内线 + 米白厚外轮廓，半圈断点明显，带轻阴影。 | 沿遮挡边界，不圈空叶子；离可见熊猫脸 / 叶缘约 8-32px。 | `hand_draw_reveal`：8-14 frames 手绘显线，随显露窗口短停。 | 半圈带粗糙边和前景压层，不透明到融进竹叶背景。 | `bad_full_circle_annotation`, `bad_floating_ui_overlay`, `bad_clean_svg_path` | `safe`：不复制对标圈注原形或原字。 | 像“从叶子后探出来”的小反应。 | 只有半圈和断点，沿显露边界生长，不是完整检查圈。 | `partial_review_priority`：本组最值得回审，但边界定位仍需人审确认。 |
| `shot_03_option_B` | `shot_03_bamboo_hide_circle` | `edge_attached` | `short_stroke_cluster`：沿竹叶 / 熊猫脸边缘给 2-4 段短促提示。 | 黑咖内线 + 米白外轮廓，短线粗细不一，带轻阴影。 | 贴近叶缘或熊猫脸边缘 6-32px，不落到空叶子。 | `staggered_burst`：短线错帧出现，不旋转、不画完整圈。 | 手绘边缘 + 白边分离复杂叶片背景。 | `bad_full_circle_annotation`, `bad_floating_ui_overlay` | `safe`：原创短线，不复刻参考资产。 | 像叶缘旁边冒出一点“看这里”。 | 形状来自叶缘 / 脸缘，不是圈注模板变体。 | `partial`：能减少圈注感，但可能需要更准的主体边缘。 |
| `shot_03_option_C` | `shot_03_bamboo_hide_circle` | `caption_relation_attached` | `micro_word_bubble`：只用 1 个微字贴近同一遮挡锚点。 | 黑咖字 + 米白泡边，外轮廓厚，气泡不是矩形卡片。 | 离遮挡点 12-36px，不压现有 caption，不作为第二条字幕。 | `pop_reaction` + `quick_vanish`：短促出现，不跟 BGM 精准卡点。 | 轻纸感气泡 + 粗糙边，保持小而贴近主体。 | `bad_caption_duplicate_sticker`, `bad_rectangle_paper_tag` | `partial`：微字需避免和现有 caption 复述；当前只作风格候选。 | 像藏 / 露瞬间的轻语气助词。 | 不是解释性长标签，只是附着在同一遮挡关系上的微反应。 | `partial`：如果用户觉得仍像字幕复读，应删除或回到半圈方案。 |
| `shot_05_option_A` | `shot_05_panda_bite_tag` | `contact_point_attached` | `contact_spark`：触点火花从熊猫嘴和竹子接触处冒出。 | 蜂蜜黄内线 + 米白厚外轮廓，短线不规则，触点有小中心点。 | 离咬合点 8-36px，不挡嘴、不压竹子。 | `contact_flash`：非常短促，像咬到那一下的反应。 | 粗糙边、白边、轻阴影建立前景层，避免薄 SVG。 | `bad_rectangle_paper_tag`, `bad_floating_ui_overlay`, `bad_caption_duplicate_sticker` | `safe`：原创触点符号，不使用第三方贴纸、字体或文案。 | 像咬竹动作发出的轻喜剧小反应。 | 形状来自咬合接触点，不是纸签、说明牌或字幕替代。 | `partial_review_priority`：本轮 candidate_best_option，最值得 GPT / 用户先看。 |
| `shot_05_option_B` | `shot_05_panda_bite_tag` | `contact_point_attached` | `micro_word_bubble`：极短拟声字贴近咬合点旁边。 | 黑咖字 + 米白泡边，圆形 / 异形气泡，不用矩形纸签。 | 离嘴 / 竹子接触点约 16-44px，不挡熊猫脸。 | `pop_reaction`：短弹出、微停、快速消失。 | 小纸感 + 厚边 + 轻阴影，避免 CSS pill。 | `bad_rectangle_paper_tag`, `bad_caption_duplicate_sticker` | `safe`：原创单字候选；不复制参考原字形或原文案。 | 像咬竹声音在动作旁边冒出。 | 不是长说明，不漂浮成标签；它服务同一接触点。 | `partial`：方向可回审，但仍有文字贴纸变 caption 的风险。 |
| `shot_05_option_C` | `shot_05_panda_bite_tag` | `surface_attached` | `surface_face_mark`：在竹子 / 接触面上做最小表情标记。 | 黑咖表情线 + 米白外轮廓，短表情线带轻阴影。 | 贴在可见竹子或接触面附近，不能脱离物体漂浮。 | `soft_breath_hold` 或 `micro_wobble`：很轻，不抢熊猫主体。 | 纸感白边 + 表面贴附感；若透视不成立则删除。 | `bad_rectangle_paper_tag`, `bad_reference_asset_copy`, `bad_floating_ui_overlay` | `partial`：表面表情有贴纸包 / IP 近似风险，需用户判断是否过线。 | 像物件被动作人格化的一瞬间。 | 绑定竹子表面，而不是通用小脸素材；但 copy risk 比触点火花更高。 | `partial`：仅作为备选，未建议直接进入 Remotion。 |

## D. style_sheet_review_guide（风格板回审指南）

GPT / 用户回审时只判断 5 件事：

1. 第一眼是否知道贴纸附属于谁。
2. 形状是否从画面事件长出来，而不是模板。
3. 描边和材质是否像贴在真实画面上。
4. 是否比 18 秒候选明显少工程 SVG / PPT 感。
5. 是否至少有 1 个方案值得进入 Remotion 小范围 probe。

回审时不需要判断：

- 不判断 18 秒视频是否修好。
- 不判断贴纸系统是否验证通过。
- 不判断 vlog director capability 是否成立。
- 不判断最终上线或 publish-ready。

## E. candidate_route_decision（候选路线判断）

- candidate_best_option（候选最佳方案）: `shot_05_option_A`
- reason（理由）: 该方案最直接回到 `panda_mouth / bamboo_bite` 的接触点，形状是 `contact_spark`，不是矩形纸签、caption 复述或标准箭头；在风格板上最容易一眼看出贴纸附属于熊猫咬竹动作。
- risk（风险）: 接触点精度仍需下一轮 Remotion still / start-mid-exit frame review；如果火花位置偏离嘴和竹子，会重新落入 `bad_floating_ui_overlay`。
- gpt_user_review_required（是否需要 GPT / 用户回审）: `true`

部分成立：`shot_01_option_B` 和 `shot_03_option_A` 也值得回审，但本轮不写 selected / approved；只有 GPT / 用户明确选择后，下一轮才允许小范围 Remotion probe。

## F. technical_evidence（技术证据）

| check | result |
|---|---|
| candidate_video_read_check | 已确认：`18.048000s / 1080x1920 / 30fps / h264 / AAC stereo / decodable=true` |
| reference_video_read_check | 已确认：`25.911995s / 720x1280 / 60fps / h264 / AAC stereo / decodable=true` |
| source_frame_extract_check | 已确认：抽取 `shot_01=2.92s`、`shot_03=7.38s`、`shot_05=10.26s` 三张 source frames 到 ignored `tmp/` |
| style_sheet_generation_check | 已确认：生成 `1488x2448` JPEG 风格板到 ignored `tmp/` |
| api_call_check | 已确认：本轮没有调用图片 / 视频 / 音频 API |
| render_check | 已确认：本轮没有 render 新正片 |
| remotion_timeline_check | 已确认：本轮未修改 Remotion 正片时间线 |

说明：以上是 technical validation 和静态回审材料生成结果，不代表 content / aesthetic validation 通过。

## G. do_not_claim（禁止声明）

不得声明：

- `sticker passed`
- `visual language passed`
- `video fixed`
- `Remotion completed`
- `sticker system verified`
- `vlog director capability verified`
- `publish_candidate_ready`

最终内容状态只能写：

`sticker_attachment_relation_style_sheet_generated_pending_gpt_user_review`

## H. next_goal（下一个目标）

`gpt_user_review_sticker_attachment_relation_style_sheet`

只有 GPT / 用户从风格板里选出至少 1 个方向，并说明它为什么附属于视频事件，下一轮才允许进入：

`small_scope_remotion_probe_for_selected_sticker_attachment_relation`

下一轮仍不得写成完整视频修复或贴纸系统验证通过。
