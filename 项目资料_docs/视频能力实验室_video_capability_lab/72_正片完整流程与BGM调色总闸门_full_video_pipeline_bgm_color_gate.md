# 正片完整流程与 BGM 调色总闸门

## 文件定位

本文件规定以后 Codex 进入 vlog / odd 正片、成片、完整候选或直接出片任务时，默认围绕整条片子执行“BGM 情绪驱动剪辑 + 精细音乐卡点 + 音乐情绪镜头选择 + vlog 叙事结构 + BGM 情绪调色”的完整流程。

Codex 不得只执行用户提到的局部模块。
Codex 不得因为 prompt 没写就省略 BGM 情绪判断、精细卡点、音乐情绪镜头计划、叙事结构、BGM 情绪调色、构图、音频、导出、审片包或失败路由。
Codex 不得因为 prompt 没写字幕 / 贴纸，就把缺字幕 / 缺贴纸写成默认阻断。

除非用户明确说本轮是 `partial_probe（局部探针）`、只做机制、不要生成视频、或明确跳过某个主模块，否则必须进入 `full_video_candidate_pipeline（正片候选完整流程）`。

与 `51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md` 的关系：

- `51` = vlog / odd 正片候选完整交付闸门。
- `71` = BGM 情绪驱动自动调色机制。
- `72` = 正片完整流程 + BGM 情绪调色 + 音乐情绪镜头计划集成闸门。
- `72` 引用 `51` 和 `71`，并覆盖旧的字幕 / 贴纸默认必需口径。

机制状态：`full_video_candidate_pipeline_bgm_color_gate_ready_pending_real_candidate_validation`

## 触发条件

- 用户说正片、成片、候选片、完整视频、最终视频、直接出片、我只想看正片。
- 用户要求一条 vlog / odd 正片候选。
- 用户要求修片，但修复会影响完整观看体验。
- 用户要求围绕片子整体执行。
- 当前任务需要输出完整视频候选。
- 当前任务不是明确 `partial_probe`。

## full_video_candidate_required_modules（正片候选必需模块）

每次 vlog / odd 正片候选默认必须执行以下主模块：

1. `project_guard（项目边界检查）`
2. `input_inventory（输入清单）`
3. `reference_and_style_anchor（参考 / 风格锚点）`
4. `material_selection（素材选择）`
5. `material_quality_check（素材质量检查）`
6. `BGM_style_and_audio（BGM 与音频风格）`
7. `BGM_mood_analysis（BGM 情绪判断）`
8. `refined_beat_map（精细卡点图）`
9. `music_emotion_shot_plan（音乐情绪镜头计划）`
10. `material_base_color_normalization（素材基础颜色统一）`
11. `BGM_mood_driven_color_grade（BGM 情绪驱动调色）`
12. `sequence_structure（vlog 叙事结构）`
13. `pacing_and_rhythm（节奏与卡点）`
14. `motion_effects_and_transitions（动效 / 转场）`
15. `composition_and_crop（构图 / 裁切）`
16. `subject_visibility_guard（主体可见性保护）`
17. `audio_mix（音频混合）`
18. `export_and_technical_validation（导出与技术验证）`
19. `review_pack_and_machine_report（审片包与机器自检）`
20. `failure_feedback_routing（失败反馈路由）`

以下模块默认不是必需模块，状态必须写为 `optional_user_requested_module` 或 `skipped_by_default_unless_user_requested`：

1. `captions_or_text_layer（字幕 / 文本层）`
2. `stickers_or_visual_punctuation（贴纸 / 视觉标点）`
3. `font_card（字牌）`
4. `visual_reaction_word（视觉反应字）`
5. `visual_punctuation（视觉标点）`
6. `Alibaba image asset generation（阿里图像资产生成）`

只有用户明确要求时，以上可选模块才升级为 `required_this_round`。

## full_video_candidate_execution_order（正片候选执行顺序）

1. project_guard
2. input_inventory
3. reference_and_style_anchor
4. material_selection
5. material_quality_check
6. BGM_style_and_audio
7. BGM_mood_analysis
8. refined_beat_map
9. music_emotion_shot_plan
10. material_base_color_normalization
11. BGM_mood_driven_color_grade
12. sequence_structure
13. pacing_and_rhythm
14. motion_effects_and_transitions
15. composition_and_crop
16. subject_visibility_guard
17. optional_user_requested_captions_or_text_layer
18. optional_user_requested_stickers_or_visual_punctuation
19. audio_mix
20. export_and_technical_validation
21. review_pack_and_machine_report
22. failure_feedback_routing

注意：

- 音乐分析必须发生在镜头顺序冻结之前。
- `refined_beat_map` 只能提供节奏证据，不能代替镜头判断。
- `music_emotion_shot_plan` 必须决定“每段音乐情绪适合什么镜头”，不得按素材顺序或固定间隔平铺。
- 颜色机制必须发生在最终画面验收之前。
- 不得在最后随手套滤镜。
- 不得跳过素材基础颜色统一。
- 可选字幕 / 贴纸模块若被用户要求，应在调色和主体可见性保护之后再检查可读性、遮挡和融合感。

## music_emotion_shot_plan_required（音乐情绪镜头计划硬规则）

Codex 必须输出 `music_emotion_shot_plan`。

每个镜头至少包含：

```yaml
shot_id:
time_range:
material_id:
music_section:
music_mood:
rhythm_point:
energy_change:
narrative_function:
why_this_shot_here:
why_not_material_order_only:
```

禁止：

- 只按素材文件顺序剪。
- 只按固定镜头时长剪。
- 只根据 `beat_map` 机械切镜头。
- 只写“跟随音乐节奏”但不说明音乐情绪、能量变化和段落功能。

## refined_beat_map_required（精细卡点图硬规则）

Codex 必须输出 `refined_beat_map`。

`refined_beat_map` 至少包含：

```yaml
beat_time:
beat_strength:
energy_level:
section_role:
emotion_shift:
cut_recommendation:
hold_or_breathe_reason:
```

`cut_recommendation` 不能只有 `cut / no_cut`，必须说明为什么此处切、为什么此处留、为什么此处需要动作推进或情绪停顿。

## sequence_structure_required（vlog 叙事结构硬规则）

默认结构：

1. 开场抓人。
2. 氛围建立。
3. 动作推进。
4. 情绪 / 节奏变化。
5. 收束。

每段必须写：

```yaml
sequence_section:
time_range:
story_function:
music_function:
selected_shots:
viewer_feeling_target:
failure_if_flattened:
```

如果镜头选择和顺序不能服务叙事，必须写 `blocked_required_sequence_structure_missing` 或回到 `music_emotion_shot_plan` 重做。

## BGM 情绪调色必需规则

```yaml
BGM_mood_driven_color_grade_required:
  default: true_for_full_video_candidate
```

Codex 必须：

1. 从 BGM 提取音频特征。
2. 生成 `mood_tag`。
3. 生成 `confidence_score`。
4. 低置信度时自动 `fallback_neutral_unify`，不默认回问用户。
5. 先统一素材基础颜色。
6. 再应用 BGM 情绪调色。
7. 生成 `color_grade_profile`。
8. 确认 `color_grade_profile` 被 Remotion / FFmpeg / 剪辑脚本真实读取。
9. 若只生成 `color_grade_profile` 但流程未读取，不得写 done。
10. 不得把人审作为每次调色前的默认阻断。

## profile_read_by_pipeline_hard_gate（调色配置读取硬验收）

```yaml
profile_read_by_pipeline:
  required: true_for_full_video_candidate
  accepted_readers:
    - Remotion composition data
    - FFmpeg filter config
    - Python edit runner
    - machine_report consumed by export pipeline
  false_status: blocked_color_grade_profile_not_read_by_pipeline
```

硬规则：

1. BGM 情绪调色不得只生成配置。
2. `color_grade_profile` 必须被 Remotion / FFmpeg / 剪辑脚本读取。
3. `profile_read_by_pipeline=false` 时必须 `blocked_color_grade_profile_not_read_by_pipeline`。
4. `fallback_neutral_unify` 只能作为低置信度或 BGM 信号不足时的保守执行路线，不能成为不接入调色链路的借口。
5. `color_grade_profile` 被读取并影响最终画面之前，不得声明调色链路完成。

## optional_caption_sticker_gate（字幕贴纸可选闸门）

默认：

```yaml
captions_or_text_layer:
  default_status: optional_user_requested_module
  skipped_status: skipped_by_default_unless_user_requested

stickers_or_visual_punctuation:
  default_status: optional_user_requested_module
  skipped_status: skipped_by_default_unless_user_requested
```

升级条件：

```yaml
upgrade_to_required_this_round:
  captions_or_text_layer:
    - user_explicitly_requests_subtitles
    - user_explicitly_requests_text_layer
    - user_explicitly_requests_title_or_caption
  stickers_or_visual_punctuation:
    - user_explicitly_requests_stickers
    - user_explicitly_requests_visual_punctuation
    - user_explicitly_requests_visual_reaction_words
```

不得因为以下情况 blocked：

- 用户没说加字幕。
- 用户没说加贴纸。
- GPT prompt 没写贴纸。
- 旧机制曾经把贴纸 / 视觉标点当成默认重要模块。
- Codex 没有默认进入阿里图像资产路线。

## full_video_candidate_completion_matrix（正片候选完成矩阵）

Codex 每次 vlog / odd 正片候选必须输出：

```yaml
full_video_candidate_completion_matrix:
  project_guard:
    status: done / blocked
    evidence:
  input_inventory:
    status: done / blocked
    evidence:
  reference_and_style_anchor:
    status: done / blocked / not_applicable_with_reason
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
  refined_beat_map:
    status: done / blocked
    evidence:
  music_emotion_shot_plan:
    status: done / blocked
    evidence:
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
  motion_effects_and_transitions:
    status: done / blocked
    evidence:
  composition_and_crop:
    status: done / blocked
    evidence:
  subject_visibility_guard:
    status: done / blocked
    evidence:
  captions_or_text_layer:
    status: optional_user_requested_module / skipped_by_default_unless_user_requested / required_this_round / done / blocked
    user_explicitly_requested:
    evidence:
  stickers_or_visual_punctuation:
    status: optional_user_requested_module / skipped_by_default_unless_user_requested / required_this_round / done / blocked
    user_explicitly_requested:
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
    status: done / blocked
    evidence:
```

## 缺模块规则

如果任一默认主模块被省略，且用户没有明确跳过：

```yaml
status:
  blocked_required_module_missing
missing_module:
route_back_to:
required_fix:
```

禁止写 completed。

如果字幕 / 贴纸 / 字牌 / 视觉标点未被用户明确要求，缺失这些可选模块不得触发默认阻断。

禁止使用以下理由：

- prompt 没写所以没做
- 我判断不需要所以没有矩阵
- silently_omitted
- not_in_prompt_so_skipped
- 没贴纸所以不是正片
- 没字幕所以不是正片

## 局部探针例外

只有用户明确说：

- 只做局部 probe
- 不要出片
- 只测试某模块
- 这轮不要生成视频
- 这轮只做机制
- 这轮只做 BGM
- 这轮只做调色
- 这轮只做字幕 / 贴纸

才允许 `partial_probe`。

`partial_probe` 必须显式输出：

```yaml
this_is_partial_probe_not_full_video_candidate: true
```

并说明本轮不构成正片候选完整交付。

## 人审定位

```yaml
human_review_role:
  default: post_run_debug_only

do_not_block_on_user_color_review:
  default: true

future_candidate_review:
  required_after_render: true
```

人审是下一轮验证候选片后的内容 / 审美终审，不是本轮机制更新完成的依据。

## 失败反馈路由

```yaml
failure_feedback_routing:
  bgm_missing:
    route_back_to: input_inventory
    allowed_fallback: fallback_no_bgm_neutral_unify
  bgm_low_confidence:
    route_back_to: fallback_neutral_unify
    blocked: false
  refined_beat_map_missing:
    route_back_to: refined_beat_map
    blocked: blocked_refined_beat_map_missing
  music_emotion_shot_plan_missing:
    route_back_to: music_emotion_shot_plan
    blocked: blocked_music_emotion_shot_plan_missing
  material_order_flattened:
    route_back_to: music_emotion_shot_plan + sequence_structure
  color_mood_mismatch:
    route_back_to: mood_to_color_grade_mapping
  material_color_inconsistent:
    route_back_to: material_base_color_normalization
  subject_visibility_damaged:
    route_back_to: subject_visibility_guard + color_grade_pipeline
  profile_generated_but_not_read:
    route_back_to: pipeline_integration_check
    blocked: blocked_color_grade_profile_not_read_by_pipeline
  user_requested_caption_missing:
    route_back_to: captions_or_text_layer
    blocked: blocked_user_requested_caption_or_text_missing
  user_requested_sticker_missing:
    route_back_to: stickers_or_visual_punctuation
    blocked: blocked_user_requested_sticker_or_visual_punctuation_missing
  required_module_omitted:
    route_back_to: full_video_candidate_completion_matrix
```

## 完成标准

正片候选完成必须满足：

1. 默认主模块全部 `done / fallback_used / skipped_by_user_explicit_request`，或对应 blocked。
2. `BGM_mood_analysis` 已执行或明确 fallback。
3. `refined_beat_map` 已输出。
4. `music_emotion_shot_plan` 已输出。
5. `sequence_structure` 已输出，并符合“开场抓人 → 氛围建立 → 动作推进 → 情绪 / 节奏变化 → 收束”。
6. `BGM_mood_driven_color_grade` 已执行或明确 fallback。
7. `color_grade_profile` 被流程读取。
8. `subject_visibility_guard` 已检查。
9. 导出技术验证通过。
10. `review_pack_and_machine_report` 存在。
11. `failure_feedback_routing` 存在。
12. 字幕 / 贴纸默认可选；只有用户明确要求时才必须 done。
13. 不得把正片候选写成 `publish-ready`。
14. 仍需用户审片。

本轮机制更新完成必须额外满足：

1. 51 / 72 的默认主模块已改为音乐、镜头、叙事、调色主线。
2. 02 / 03 / 04 / latest 已记录新项目事实。
3. 没有生成视频、没有 render、没有调用外部 API。
4. 没有把机制更新写成能力已验证。

## 禁止声明

- 不得声明 `publish-ready`。
- 不得声明 `video_fixed`。
- 不得声明 `full_video_candidate_completed`，除非未来候选片矩阵完整通过。
- 不得声明 `vlog_director_capability_verified`。
- 不得声明 BGM 情绪判断能力已验证。
- 不得声明自动调色能力已验证。
- 不得声明 `bgm_mood_driven_color_grade_verified`。
- 不得声明 `full_video_candidate_pipeline_verified`。
