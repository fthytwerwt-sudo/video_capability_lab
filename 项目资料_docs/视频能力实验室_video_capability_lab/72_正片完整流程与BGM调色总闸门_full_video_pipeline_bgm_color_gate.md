# 正片完整流程与 BGM 调色总闸门

## 文件定位

本文件规定以后 Codex 进入正片、成片、完整候选、发布候选或直接出片任务时，必须围绕整条片子执行完整流程。

Codex 不得只执行用户提到的局部模块。
Codex 不得因为 prompt 没写就省略字幕、贴纸、BGM、颜色、动效、构图、音频、导出、审片包或失败路由。
除非用户明确说本轮是 partial_probe（局部探针）或明确跳过某模块，否则必须进入 full_video_candidate_pipeline（正片候选完整流程）。

与 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md` 的关系：

- `51` = 正片候选完整交付闸门。
- `72` = 正片完整流程 + BGM 情绪调色集成闸门。
- `72` 不覆盖 `51`，而是补强并引用 `51`。

机制状态：`full_video_candidate_pipeline_bgm_color_gate_ready_pending_real_candidate_validation`

## 触发条件

- 用户说正片、成片、候选片、完整视频、最终视频、直接出片、我只想看正片。
- 用户要求修片，但修复会影响完整观看体验。
- 用户要求围绕片子整体执行。
- 用户要求 Codex 每个步骤不能省略。
- 当前任务需要输出完整视频候选。
- 当前任务不是明确 partial_probe。

## full_video_candidate_required_modules（正片候选必需模块）

每次正片候选必须执行以下模块：

1. project_guard（项目边界检查）
2. input_inventory（输入清单）
3. reference_and_style_anchor（参考 / 风格锚点）
4. material_selection（素材选择）
5. material_quality_check（素材质量检查）
6. BGM_style_and_audio（BGM 与音频风格）
7. BGM_mood_analysis（BGM 情绪判断）
8. BGM_mood_driven_color_grade（BGM 情绪驱动自动调色）
9. material_base_color_normalization（素材基础颜色统一）
10. sequence_structure（剪辑结构）
11. pacing_and_rhythm（节奏与卡点）
12. captions_or_text_layer（字幕 / 文本层）
13. stickers_or_visual_punctuation（贴纸 / 视觉标点）
14. motion_effects_and_transitions（动效 / 转场）
15. composition_and_crop（构图 / 裁切）
16. subject_and_caption_readability_guard（主体与字幕可读性保护）
17. audio_mix（音频混合）
18. export_and_technical_validation（导出与技术验证）
19. review_pack_and_machine_report（审片包与机器自检）
20. failure_feedback_routing（失败反馈路由）

## full_video_candidate_execution_order（正片候选执行顺序）

1. project_guard
2. input_inventory
3. reference_and_style_anchor
4. material_selection
5. material_quality_check
6. BGM_style_and_audio
7. BGM_mood_analysis
8. material_base_color_normalization
9. BGM_mood_driven_color_grade
10. sequence_structure
11. pacing_and_rhythm
12. captions_or_text_layer
13. stickers_or_visual_punctuation
14. motion_effects_and_transitions
15. composition_and_crop
16. subject_and_caption_readability_guard
17. audio_mix
18. export_and_technical_validation
19. review_pack_and_machine_report
20. failure_feedback_routing

注意：

- 颜色机制必须发生在字幕、贴纸、动效最终落位之前。
- 因为调色会影响字幕可读性、贴纸融合感、主体曝光和整体画面层次。
- 不得在最后随手套滤镜。
- 不得跳过素材基础颜色统一。
- 不得只根据 BGM 调色而忽略素材之间颜色不统一。

## full_video_candidate_completion_matrix（正片候选完成矩阵）

Codex 每次正片候选必须输出：

```yaml
full_video_candidate_completion_matrix:
  project_guard:
    status: done / blocked
    evidence:
  input_inventory:
    status: done / blocked
    evidence:
  reference_and_style_anchor:
    status: done / blocked / skipped_by_user
    evidence:
  material_selection:
    status: done / blocked
    evidence:
  material_quality_check:
    status: done / blocked
    evidence:
  BGM_style_and_audio:
    status: done / blocked / fallback_used
    evidence:
  BGM_mood_analysis:
    status: done / blocked / fallback_used
    mood_tag:
    confidence_score:
    fallback_used:
  material_base_color_normalization:
    status: done / blocked / fallback_used
    evidence:
  BGM_mood_driven_color_grade:
    status: done / blocked / fallback_used
    color_grade_profile:
    profile_read_by_pipeline:
  sequence_structure:
    status: done / blocked
    evidence:
  pacing_and_rhythm:
    status: done / blocked
    evidence:
  captions_or_text_layer:
    status: done / blocked / skipped_by_user
    evidence:
  stickers_or_visual_punctuation:
    status: done / blocked / skipped_by_user
    evidence:
  motion_effects_and_transitions:
    status: done / blocked
    evidence:
  composition_and_crop:
    status: done / blocked
    evidence:
  subject_and_caption_readability_guard:
    status: done / blocked
    evidence:
  audio_mix:
    status: done / blocked
    evidence:
  export_and_technical_validation:
    status: done / blocked
    evidence:
  review_pack_and_machine_report:
    status: done / blocked
    evidence:
  failure_feedback_routing:
    status: done
    evidence:
```

## 缺模块规则

如果任一 required module 被省略，且用户没有明确跳过：

```yaml
status:
  blocked_required_module_missing
missing_module:
route_back_to:
required_fix:
```

禁止写 completed。

禁止使用以下理由：

- prompt 没写所以没做
- 我判断不需要
- silently_omitted
- not_in_prompt_so_skipped
- 这轮只是用户提了某个模块，所以只做某个模块

## 局部探针例外

只有用户明确说：

- 只做局部 probe
- 不要出片
- 只测试某模块
- 这轮不要生成视频
- 这轮只做机制
- 这轮只做 BGM
- 这轮只做调色
- 这轮只做字幕

才允许 partial_probe。

partial_probe 必须显式输出：

```yaml
this_is_partial_probe_not_full_video_candidate: true
```

并说明本轮不构成正片候选完整交付。

## BGM 情绪调色必需规则

```yaml
BGM_mood_driven_color_grade_required:
  default: true_for_full_video_candidate
```

Codex 必须：

1. 从 BGM 提取音频特征。
2. 生成 mood_tag。
3. 生成 confidence_score。
4. 低置信度时自动 fallback_neutral_unify。
5. 先统一素材基础颜色。
6. 再应用 BGM 情绪调色。
7. 生成 color_grade_profile。
8. 确认 color_grade_profile 被 Remotion / FFmpeg / 剪辑脚本真实读取。
9. 若只生成 color_grade_profile 但流程未读取，不得写 done。
10. 不得把人审作为每次调色前的默认阻断。

## 人审定位

```yaml
human_review_role:
  default: post_run_debug_only

do_not_block_on_user_color_review:
  default: true
```

## 失败反馈路由

```yaml
failure_feedback_routing:
  bgm_missing:
    route_back_to: input_inventory
    allowed_fallback: fallback_no_bgm_neutral_unify
  bgm_low_confidence:
    route_back_to: fallback_neutral_unify
    blocked: false
  color_mood_mismatch:
    route_back_to: mood_to_color_grade_mapping
  material_color_inconsistent:
    route_back_to: material_base_color_normalization
  caption_unreadable:
    route_back_to: captions_or_text_layer + color_readability_guard
  sticker_not_integrated:
    route_back_to: stickers_or_visual_punctuation + color_grade_pipeline
  pacing_mismatch:
    route_back_to: pacing_and_rhythm
  transition_mismatch:
    route_back_to: motion_effects_and_transitions
  subject_occluded:
    route_back_to: composition_and_crop
  export_failed:
    route_back_to: export_and_technical_validation
  profile_generated_but_not_read:
    route_back_to: pipeline_integration_check
    blocked: blocked_color_grade_profile_not_read_by_pipeline
  required_module_omitted:
    route_back_to: full_video_candidate_completion_matrix
```

## 完成标准

正片候选完成必须满足：

1. required modules 全部 done / fallback_used / skipped_by_user。
2. skipped_by_user 必须有用户明确跳过证据。
3. BGM_mood_analysis 已执行或明确 fallback。
4. BGM_mood_driven_color_grade 已执行或明确 fallback。
5. color_grade_profile 被流程读取。
6. 字幕可读性检查通过。
7. 主体可见性检查通过。
8. 导出技术验证通过。
9. review_pack_and_machine_report 存在。
10. failure_feedback_routing 存在。
11. 不得把正片候选写成 publish-ready。
12. 仍需用户审片。

## 禁止声明

- 不得声明 `publish-ready`。
- 不得声明 `video_fixed`。
- 不得声明 `full_video_candidate_completed`，除非矩阵完整通过。
- 不得声明 `vlog_director_capability_verified`。
- 不得声明 BGM 情绪判断能力已验证。
- 不得声明自动调色能力已验证。
- 不得声明 `bgm_mood_driven_color_grade_verified`。
- 不得声明 `full_video_candidate_pipeline_verified`。
