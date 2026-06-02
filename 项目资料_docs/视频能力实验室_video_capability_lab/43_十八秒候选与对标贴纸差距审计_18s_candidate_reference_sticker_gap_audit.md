# 十八秒候选与对标贴纸差距审计

## A. status（状态）

- task_type: `sticker_visual_gap_audit`
- generated_at: `2026-06-03`
- repository: `/Users/fan/Documents/vlog、odd/video_capability_lab`
- branch: `main`
- candidate_video_path: `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4`
- reference_video_path: `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4`
- frame_extract_dir: `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/`
- audit_status: `18s_candidate_sticker_gap_audit_completed_pending_gpt_review`
- content_status: `sticker_visual_language_failed_pending_fix_route`
- capability_status: `vlog_director_capability_still_pending_multi_case_validation`
- api_call_allowed_this_round: `false`
- remotion_edit_allowed_this_round: `false`
- render_allowed_this_round: `false`
- runtime_asset_commit_allowed_this_round: `false`

已确认：本轮只做贴纸差距审计，不修改 Remotion，不重新 render，不调用 API，不生成新贴纸图，不提交视频、图片、音频、抽帧、`tmp/`、`dist/` 或 runtime assets。

已确认：本轮使用对标视频作为视觉机制参考，只抽象贴纸如何依附主体、动作、物件和情绪，不复制第三方贴纸原图、原字体、原文案、平台 UI、包装、账号信息或品牌资产。

## B. user_review_input（用户人审输入）

用户原话：

> 我看了贴纸，没得啊，和之前比就是锚点更清晰了，但是还是和对标视频的差距很大啊。

本轮判断入口：

- 已确认：用户承认锚点比之前更清晰。
- 已确认：用户否定的是贴纸视觉语言，不是让 Codex 继续证明锚点机制。
- 已确认：本轮必须回答“贴出来为什么不像”，不能只说“锚点清楚了”。

## C. video_metadata（视频元数据）

| field | candidate | reference |
|---|---|---|
| path | `dist/十八秒锚点贴纸候选_18s_anchor_sticker_candidate/十八秒锚点贴纸候选_18s_anchor_sticker_candidate.mp4` | `素材/vlog 参考/新参考+解析/v2700fgi0000d85e6c7og65uq46kpmu0.MP4` |
| exists | `true` | `true` |
| file_size_bytes | `33446251` | `6459033` |
| duration_seconds | `18.048000` | `25.911995` |
| resolution | `1080x1920` | `720x1280` |
| fps | `30.000` | `60.000` |
| video_codec | `h264` | `h264` |
| audio_present | `true` | `true` |
| audio_codec | `aac` | `aac` |
| audio_channels | `2` | `2` |
| decodable | `true` | `true` |
| validation_status | `passed` | `passed` |

说明：以上只是 `technical_validation（技术验证）`，不代表内容或审美通过。

## D. frame_evidence（帧级证据）

| evidence | path | status |
|---|---|---|
| candidate start / mid / exit frames | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/candidate_frames/` | 已生成 12 张，未提交 |
| candidate contact sheet | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/candidate_sticker_start_mid_exit_sheet.jpg` | 已生成，未提交 |
| reference sticker frames | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/reference_frames/` | 已生成 14 张，未提交 |
| reference contact sheet | `tmp/十八秒候选贴纸差距审计_18s_candidate_sticker_gap_audit/reference_sticker_mechanism_sheet_14frames.jpg` | 已生成，未提交 |

已确认：候选帧覆盖 4 个 sticker events 的 start / mid / exit；对标帧覆盖 `attention_cue`、`emotion_punctuation`、`object_personification`、`motion_peak_punctuation`、`micro_reaction_word`、`touch_action_punctuation` 等功能。

## E. sticker_event_gap_table（贴纸事件差距表）

| candidate_event_id | source_41_event | candidate_timecode | reference_event_match | anchor_match | shape_gap | silhouette_gap | stroke_outline_gap | color_gap | scale_gap | placement_gap | motion_gap | duration_gap | texture_material_gap | integration_gap | human_feel_gap | severity | route_back_to | next_fix_direction |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `sticker_shot_01_panda_open_arrow` | `shot_01_panda_open_arrow` | `2.48 / 2.92 / 3.36s` | `ref_icecream_yellow_mark_5.50s_attention_cue` | 部分成立：熊猫动作窗口正确，箭头大致指向小动作。 | high：仍是标准箭头，像教学标注；对标更像 2-3 段不规则短笔触。 | high：箭头轮廓太可预测，有明确箭头头部，缺少短促反应形。 | high：线条偏单层，缺少厚外轮廓 / 黑描边 / 贴纸边界。 | medium：低饱和黄融入背景，但可见度和前景层级不足。 | medium：宽度够，但线太细，视觉重量比对标弱。 | medium：离熊猫嘴和爪仍偏远，更像指向空白方向。 | medium：手绘显线存在，但反应感不够短促，像组件动画。 | low：约 1s 合理。 | high：没有胶贴 / 手绘涂层 / 纸边，只是矢量线。 | high：浮在画面上方，没有“从动作旁冒出来”。 | high：更像 Remotion SVG 能力展示，不像 vlog 原生贴纸。 | high | `shape_layer` + `stroke_layer` + `placement_relation` | 保留事件，重画为非箭头的短促注意力笔触：2-3 个厚边、非对称、贴近咬竹动作点的短 stroke。 |
| `sticker_shot_03_bamboo_hide_circle` | `shot_03_bamboo_hide_circle` | `6.98 / 7.38 / 7.84s` | `ref_bear_heart_6.50s_emotion_punctuation` + `ref_drink_personification_7.80s_object_personification` | 部分成立：遮挡 / 熊猫区域是对的，但目标主体仍不够明确。 | high：不规则圈注仍是“圈”本身，像标注层；对标更常把贴纸变成情绪对象或主体人格化。 | high：圆形轮廓太完整，缺少贴纸化外形和角色感。 | high：描边太薄、太轻，背景复杂时没有贴纸压层。 | medium：蜂蜜黄不刺眼，但在竹叶背景里不够有前景。 | medium：圈的面积可以看见，但视觉重量弱，start/exit 易淡。 | high：圈到竹叶和空隙多于圈住熊猫脸 / 遮挡边缘。 | medium：手绘显线方向对，但没有“藏 / 露”的反应节奏。 | low：时长可接受。 | high：没有白边、胶贴影、边缘厚度，仍像 SVG path。 | high：没有贴住主体边缘，像叠在画面上的检查圈。 | high：人感仍像审片标注，而不是自然反应贴纸。 | high | `placement_relation` + `shape_layer` + `style_layer` | 保留事件但重判形状：不要直接画完整圈，改为“窥见 / 藏住”的半圈、眼神或短促遮挡标点，并重新贴近可见熊猫脸或叶缘。 |
| `sticker_shot_04_sand_trace_wave` | `shot_04_sand_trace_wave` | `8.24 / 8.62 / 9.02s` | `ref_toy_car_burst_17.20s_motion_peak_punctuation` + `ref_ticket_touch_line_alt1_19.00s_touch_action_punctuation` | 部分成立：沙纹 / 脚印轨迹是有效候选，但对标里没有同类“海浪线”可直接套。 | high：波浪线像通用装饰，事件来源弱；对标运动标点更像绑定物件停顿或手部触碰的小反应。 | high：轮廓太光滑、均匀、连续，缺少短促断点。 | high：缺厚边和反应符号重量，远看像细线 UI。 | medium：海蓝色可见，但和沙面关系不强，像额外装饰色。 | medium：mid frame 可见，但没有形成“一眼看到重点”的标点。 | high：线条贴在沙面局部，仍难确认跟哪条脚印 / 沙纹绑定。 | medium：展开动效合理，但动作事件本身不明显，动效无法补救。 | low：时长可接受。 | high：无纸感、无贴纸边、无涂画质感。 | high：没有压在真实纹理上，也没有顺着纹理变形。 | high：像 “我会画 wave” 的组件展示。 | high | `shape_layer` + `anchor_target` + `reference_audit` | 暂不直接修 wave。下一轮先在 style sheet 中探索“沙纹/脚印能否贴”，若找不到更强主体，删除该 sticker，只保留画面或字幕。 |
| `sticker_shot_05_panda_bite_tag` | `shot_05_panda_bite_tag` | `9.86 / 10.26 / 10.72s` | `ref_drink_personification_7.80s_object_personification` + `ref_dog_micro_word_13.50s_micro_reaction_word` + `ref_ticket_touch_line_alt1_19.00s_touch_action_punctuation` | 部分成立：咬竹动作窗口清楚，是本轮最应保留的动作锚点。 | high：纸签是矩形标签，仍像说明牌；对标更像物件表情、贴在主体上的文字或触碰标点。 | high：矩形轮廓太规整，缺少异形贴纸边缘。 | medium：比其它贴纸更有背景，但边缘仍薄，外轮廓不够贴纸。 | medium：暖纸色不突兀，但没有参考贴纸的黑白高对比或角色化层级。 | medium：能看见，但与熊猫头 / 嘴的比例关系偏“挂牌”。 | high：浮在熊猫上方，没有贴近咬合点；更像字幕标签。 | medium：轻贴上可以，但缺少动作触发的喜剧反应。 | low：时长可接受。 | medium：有一点纸感，但仍是 CSS 卡片，不是贴纸资产质感。 | high：没有绑定嘴和竹子接触点，也不随主体材质融合。 | high：像注释字，不像自然反应贴纸。 | high | `placement_relation` + `shape_layer` + `visual_material_feel` | 保留事件，删除当前纸签形态；改为贴近嘴 / 竹子的极短触碰反应符号，或做“熊猫动作微表情”式小贴纸，不再用矩形标签。 |

## F. global_gap_summary（整体差距总结）

### F.1 anchor layer（锚点层）

部分成立：4 个候选事件都能回到 `41` 的视频锚点，用户反馈也说明“锚点更清晰”。因此主问题不是“要不要贴”完全失效。

仍待验证：`shot_03` 和 `shot_04` 的锚点可见性不够强。`shot_03` 的圈注没有精准圈住熊猫脸 / 叶缘；`shot_04` 的脚印 / 沙纹轨迹没有强到能自然支撑 wave。

### F.2 shape layer（形状层）

已确认：这是主失败层。当前 4 个贴纸仍是 `arrow / circle / wave / tag` 的通用形状集合。它们从 41 的事件表推导出来了，但还没有长成对标视频里的“反应贴纸”。

对标贴纸更常见的形状逻辑是：短笔触、厚边情绪符号、物件脸、手部触碰线、小字贴在物件边缘。候选仍像 SVG 图形库。

### F.3 stroke layer（描边层）

已确认：当前描边太干净、太单薄、层级太少。对标帧里能看见明显前景层、黑白 / 黄黑对比、厚边和贴纸压层；候选的箭头、圈、波纹多是单色线条，缺少外轮廓和粗细变化。

### F.4 color / material layer（颜色与材质层）

部分成立：候选避免了高饱和电商色，这比之前更稳。

失败点：低饱和被做成“灰、薄、融进背景”，而不是“贴在视频上但不刺眼”。当前缺白边、胶贴阴影、纸边、手绘涂层、局部粗糙感。

### F.5 motion layer（动效层）

部分成立：候选有入场 / 停留 / 退场，不是静态贴图。

失败点：动效仍像 Remotion 组件参数：fade、draw、spring、scale。对标贴纸的感觉更短促、更像动作旁边突然冒出来的反应，而不是让观众看见“动画执行了”。

### F.6 placement layer（位置关系层）

部分成立：候选贴纸大致在对应镜头窗口内，二次修正后没有明显跨镜头。

失败点：多数贴纸没有贴到主体边缘或动作接触点。箭头离咬竹动作偏远；圈注圈住了不少叶子和空隙；波纹没有压住明确脚印线；纸签浮在熊猫上方而不是动作点旁边。

### F.7 composition / integration layer（画面融合层）

已确认：候选贴纸和真实画面的融合度不足。它们像叠加在画面之上的 UI 层，而不是视频里主体、物件、动作自然引出的贴纸层。

### F.8 human feel layer（整体人感层）

已确认：当前仍偏工程演示 / 审片标注 / PPT 视觉辅助，不像对标视频里“小物件突然有情绪”“动作旁边冒出一点反应”的 vlog 贴纸。

## G. root_cause（根因）

主根因：

`anchor layer partial progress + sticker visual language failure`

分层判断：

| layer | judgement | reason |
|---|---|---|
| `anchor layer` | 部分成立 | 事件窗口、主体方向和 no-sticker 约束比之前清楚。 |
| `shape layer` | 已确认主要失败 | 当前仍是通用 arrow / circle / wave / tag，没有建立对标级形状语法。 |
| `stroke layer` | 已确认主要失败 | 描边厚度、外轮廓、粗细变化和贴纸压层不足。 |
| `color/material layer` | 已确认失败 | 低饱和方向对，但缺纸感、胶贴感、涂画质感和前景层级。 |
| `motion layer` | 部分失败 | 有动效，但反应短促感和动作触发感不足。 |
| `placement layer` | 已确认失败 | 贴纸仍没有足够贴住主体边缘 / 触碰点 / 轨迹。 |
| `human feel layer` | 已确认失败 | 人感仍像 Remotion/SVG 组件展示，不像自然 vlog 反应贴纸。 |

结论：下一轮不应先改时间线，也不应继续增加贴纸数量。下一轮必须先修 `sticker visual language（贴纸视觉语言）`。

## H. next_fix_route（下一轮修正路由）

主路线裁决：

`sticker_style_sheet_probe（贴纸风格板探针）`

选择理由：

1. 当前失败不是缺少更多锚点，而是贴纸形状 / 描边 / 材质 / 人感没有标准。
2. 直接修 18 秒候选会继续在 Remotion 坐标、颜色和 SVG path 里微调，容易重复“组件展示感”。
3. 需要先产出一张小型风格板：同一候选镜头下，比较 2-3 种原创贴纸视觉语言，再让用户 / GPT 选方向。

下一轮不建议：

- 不建议直接进入 `motion_timing_refactor`：动效有问题，但不是首要瓶颈。
- 不建议直接重改 18 秒候选：没有风格板会继续抽卡。
- 不建议回到 `41` 整体重写事件表：锚点层已部分成立，不是主失败。
- 不建议调用图片 API：当前需要先定视觉语言，API 会掩盖 placement / style 判断。

下一轮 `sticker_style_sheet_probe` 应只做：

| item | requirement |
|---|---|
| input frames | 选 `shot_01`、`shot_03`、`shot_05` 三个最有主体的候选帧；`shot_04` 暂列待判。 |
| style families | 每个事件 2-3 个原创视觉方案：厚边短笔触、主体贴附表情、触碰反应符号。 |
| forbidden | 不复制对标贴纸原图、原字、平台 UI、包装或账号。 |
| output | 静态 style sheet / frame pair，不先改 18 秒视频，不先 render 新视频。 |
| decision | 用户 / GPT 先选择哪一组视觉语言像，再允许进入 SVG shape refactor。 |

事件级路由：

| event | keep/delete | next route |
|---|---|---|
| `shot_01_panda_open_arrow` | keep | 重画为短促不规则注意力笔触，不再是标准箭头。 |
| `shot_03_bamboo_hide_circle` | keep with caution | 先重判主体位置；若圈不住熊猫脸或叶缘，改为半圈 / peek mark / 小眼神，而非完整圈。 |
| `shot_04_sand_trace_wave` | hold / likely delete | 先在 style sheet 里验证沙纹是否支撑贴纸；若仍像装饰线，删除。 |
| `shot_05_panda_bite_tag` | keep | 删除矩形纸签，改为贴近嘴和竹子接触点的触碰反应符号或极短拟声贴纸。 |

## I. do_not_claim（禁止声明）

不得声明：

- `sticker passed`
- `visual language passed`
- `video fixed`
- `Remotion completed`
- `sticker mechanism verified`
- `vlog director capability verified`
- `publish_candidate_ready`

## J. audit_completion_state（审计完成状态）

- report_status: `18s_candidate_sticker_gap_audit_completed_pending_gpt_review`
- candidate_sticker_events_audited: `4`
- candidate_frames_extracted: `12`
- reference_frames_extracted: `14`
- primary_failure_layer: `shape_layer / stroke_layer / visual_material_feel / integration`
- next_goal: `gpt_review_18s_candidate_sticker_gap_audit`
- recommended_next_route: `sticker_style_sheet_probe`
- blocked_reason: `none`
