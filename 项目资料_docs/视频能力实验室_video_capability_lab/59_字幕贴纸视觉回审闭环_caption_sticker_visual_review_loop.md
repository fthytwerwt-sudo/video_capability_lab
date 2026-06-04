# 59｜字幕贴纸视觉回审闭环

status: `caption_sticker_visual_review_loop_added_pending_multi_case_validation`

route_decision: `mechanism_library_update_for_caption_sticker_visual_review`

source_case: `58_字幕贴纸2到4秒微段精修探针报告_caption_sticker_2_4s_micro_probe_report.md`

this_is_mechanism_not_full_video_candidate: `true`

## A. Why This Exists

已确认：`58` 暴露的问题不是“贴纸不够多”，而是字幕、贴纸、锚点、遮挡材质和动效没有在帧级证据里真正成立。

本机制用于后续所有字幕 / 贴纸 / 视觉标点修正任务。只要用户反馈“总差一点”“像组件”“像口号”“不贴画面”，必须先走本文件的 `frame_review_loop` 和 `visual_scorecard`，再决定是否能进入 2-4 秒微段 probe。

禁止把以下行为写成修正：

- 只增加贴纸数量。
- 只换颜色。
- 只换坐标。
- 只加描边或阴影。
- 只把 caption 改成更大字。
- 只用 Remotion 组件名解释视觉决策。

## B. frame_review_loop

每次修字幕 / 贴纸 / 视觉标点前，必须先看帧，再写修正规格。

```yaml
frame_review_loop:
  step_01_extract_frames:
    required: true
    frames:
      - original_current_candidate_start
      - original_current_candidate_mid
      - original_current_candidate_exit
      - previous_probe_start
      - previous_probe_mid
      - previous_probe_exit
  step_02_name_real_anchor:
    required: true
    rule: 不能只写 x/y；必须指出画面里哪个可见边缘、接触点、表面、遮挡边界或运动方向在承载视觉层。
  step_03_score_five_problems:
    required: true
    output: visual_scorecard
  step_04_write_fix_spec:
    required: true
    output: caption_sticker_fix_spec
  step_05_render_2_4s_micro_probe:
    required_before_full_render: true
    reason: 字幕贴纸没过 2-4 秒微段前，不允许直接扩到全片。
  step_06_generate_before_after_pack:
    required: true
    evidence: before/v1/v2 frames + contact sheet + scorecard + fix_spec
  step_07_user_review:
    required: true
    status_after_technical_pass: pending_user_review
```

## C. visual_scorecard

每次字幕 / 贴纸修正必须给 5 个问题打分。分数只代表 Codex 自检，不代表用户审美通过。

评分：

| score | meaning |
|---:|---|
| `0` | 未解决，仍是原问题。 |
| `1` | 有局部改善，但仍明显像模板 / 浮层。 |
| `2` | 大体成立，仍需用户审片确认。 |
| `3` | 帧级证据较强，但仍不能写能力已验证。 |

```yaml
visual_scorecard:
  caption_relation_problem:
    question: 字幕是不是动作反应，而不是大字口号？
    pass_evidence:
      - 文案是短反应 / 拟声 / 呼吸词，不是说明句或口号。
      - 字幕位置与动作边缘、接触点、主体状态有关系。
      - 字幕 attention weight 不压过动作主体。
    fail_evidence:
      - 看起来像固定宣传语。
      - 只因为字大而抢眼。
      - 可以换到任何镜头仍成立。
  sticker_generic_component_problem:
    question: 贴纸是不是这一帧专属反应，而不是通用组件？
    pass_evidence:
      - 形状由当前画面事件、边缘、接触点或运动方向推导。
      - 换到其他镜头会失去意义。
      - 不通过数量、颜色或大小证明多样化。
    fail_evidence:
      - 看起来像可复用 SVG burst / arrow / tick。
      - 只换了坐标、颜色或路径数量。
  anchor_declaration_problem:
    question: 锚点是否有帧级画面证据，而不只是文档声明？
    pass_evidence:
      - anchor_target 指向可见边缘 / 圆孔 / 横杆 / 接触点 / 运动轨迹。
      - review pack 能抽到 start/mid/exit 证据帧。
      - scale_distance 解释的是相对画面结构，不只是绝对坐标。
    fail_evidence:
      - 只有 x/y。
      - 锚点在画面里看不出来。
  occlusion_material_problem:
    question: 遮挡和材质是否减少浮层感？
    pass_evidence:
      - 视觉层被真实前景边缘切住、压住、擦过或局部遮挡。
      - 颜色和亮度接近画面材质，只在必要处高亮。
      - 描边、颗粒、透明度服务画面，不像独立 UI。
    fail_evidence:
      - 贴纸完整浮在最前景。
      - 只靠 drop shadow 或 opacity。
  motion_event_problem:
    question: 动效是否由动作事件带出，而不是参数动画？
    pass_evidence:
      - 入场发生在接触 / 受力 / 切镜窗口。
      - motion path 顺着真实运动方向或机械结构。
      - exit 跟事件结束或镜头切走绑定。
    fail_evidence:
      - spring / pop / bounce 与画面事件无关。
      - 贴纸跨过无关镜头或独自表演。
```

最低通过口径：

```yaml
minimum_pass_for_2_4s_probe:
  all_five_problems_present: true
  each_score_minimum: 2
  template_fallback: false
  copy_risk_check: passed
  user_review_required: true
```

如果任一项低于 `2`，只能写 `attempted_fix_pending_user_review`，不得扩到 18 秒正片。

## D. caption_sticker_fix_spec

每次修正必须写清字幕和贴纸怎么改，而不是只改 Remotion 实现。

```yaml
caption_sticker_fix_spec:
  shot_id:
  source_video_or_candidate:
  time_range:
  frame_evidence:
    original_candidate_frames:
    previous_probe_frames:
    target_anchor_frame:
  five_problem_diagnosis:
    caption_relation_problem:
    sticker_generic_component_problem:
    anchor_declaration_problem:
    occlusion_material_problem:
    motion_event_problem:
  caption_fix:
    old_caption:
    new_caption:
    text_status: draft_text_pending_user_review
    caption_type:
    why_more_like_action_reaction:
    anchor_target:
    attention_weight:
    entry_hold_exit:
    copy_risk_check:
  sticker_fix:
    old_sticker:
    new_sticker:
    sticker_type:
    attachment_relation:
    shape_derived_from_frame_event:
    material_occlusion_strategy:
    motion_bound_to_event:
    fallback_if_still_generic:
  conflict_resolution:
  template_fallback: false
  review_required: true
```

## E. micro_probe_before_full_render_2_4s

已确认：字幕 / 贴纸 / 视觉标点没有通过 2-4 秒微段回审前，不允许直接扩到整条 18 秒正片。

```yaml
micro_probe_before_full_render_2_4s:
  required_when:
    - user_feedback_contains: 总差一点
    - user_feedback_contains: 像组件
    - user_feedback_contains: 像口号
    - user_feedback_contains: 不贴画面
    - visual_scorecard_any_score_below: 2
  allowed_outputs:
    - mechanism_file
    - 2_4s_micro_probe_video
    - before_after_review_pack
    - fix_report
  forbidden_outputs:
    - 18s_full_video_regenerate
    - publish_ready_claim
    - video_fixed_claim
    - vlog_director_capability_verified_claim
  review_pack_required_items:
    - original_candidate_frames
    - previous_probe_frames
    - new_probe_frames
    - before_v1_v2_contact_sheet
    - visual_scorecard.json
    - fix_spec.json
```

## F. Failure Routing

| failure | route_back_to | forbidden_fix |
|---|---|---|
| `caption_still_slogan` | `caption_fix_spec.caption_type + action_reaction_text` | 把字变大、加粗、居中。 |
| `sticker_still_generic` | `shape_derived_from_frame_event` | 换颜色、换坐标、加数量。 |
| `anchor_not_visible` | `frame_review_loop.step_02_name_real_anchor` | 只写 x/y。 |
| `occlusion_still_floaty` | `material_occlusion_strategy` | 只加 drop shadow。 |
| `motion_still_parametric` | `motion_bound_to_event` | 只调 spring 参数。 |
| `template_fallback_detected` | `55 / 56 / 59` | 进入 18 秒正片。 |

## G. Do Not Claim

- 不得声明 `publish-ready`。
- 不得声明 `video_fixed`。
- 不得声明 `full video candidate completed`。
- 不得声明 `vlog director capability verified`。
- 不得把 technical validation 写成用户审美通过。

## H. Next Use

后续所有字幕 / 贴纸 / 视觉标点任务，除了继续读取 `54 / 55 / 56`，还必须在出现视觉回审问题时读取本文件，并输出：

```yaml
mechanism_used:
  caption_sticker_visual_review_loop_read: true
  visual_scorecard_completed: true
  caption_sticker_fix_spec_completed: true
  micro_probe_before_full_render_2_4s_checked: true
```
