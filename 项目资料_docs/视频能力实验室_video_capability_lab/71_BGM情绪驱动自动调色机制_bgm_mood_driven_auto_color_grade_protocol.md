# BGM 情绪驱动自动调色机制

## 文件定位

本文件规定 Codex 在正片候选流程中如何根据 BGM 自动判断情绪，并生成机器可读取的 color_grade_profile（调色配置）。

本机制不是人工调色建议，不是用户每次审核步骤，而是正片候选流程中的自动执行模块。

机制状态：`bgm_mood_driven_auto_color_grade_protocol_ready_pending_multi_case_validation`

## 触发条件

- 用户要求正片、成片、候选片、完整视频、直接出片。
- 当前任务进入 full_video_candidate_pipeline。
- 当前视频存在 BGM 或 BGM 候选。
- 当前素材颜色不统一。
- 当前画面氛围和音乐不匹配。
- 正片流程需要生成统一视觉风格。

## 输入字段

```yaml
bgm_path:
  说明: 本轮视频使用的 BGM 路径。
  required: true_for_full_video_candidate
  missing_route: fallback_no_bgm_neutral_unify_or_blocked_if_bgm_required

material_paths:
  说明: 本轮参与剪辑的素材路径。
  required: true

sequence_context:
  说明: 当前视频结构、段落、镜头顺序。
  required: true

optional_beat_map:
  说明: 可选 beat_map（卡点图）。
  required: false

optional_reference_mood:
  说明: 用户或参考视频给出的氛围锚点。
  required: false
```

## 音频特征字段

```yaml
duration:
  说明: BGM 时长。

rms_energy:
  说明: 整体能量。

peak_volume:
  说明: 峰值音量。

onset_density:
  说明: 鼓点 / 起伏密度。

tempo_estimate:
  说明: 节奏快慢估计。

spectral_centroid_proxy:
  说明: 高频明亮感近似指标。

low_frequency_weight:
  说明: 低频厚重感。

high_frequency_weight:
  说明: 高频清亮感。

dynamic_range:
  说明: 动态范围。

silence_ratio:
  说明: 空白比例。
```

## 情绪判断字段

```yaml
mood_tag:
  说明: 情绪标签。
  allowed_values:
    - cheerful_bright
    - soft_vlog
    - clean_cool
    - dramatic_dark
    - fallback_neutral_unify

mood_energy:
  allowed_values:
    - low
    - medium
    - high
    - unknown

mood_brightness:
  allowed_values:
    - dark
    - neutral
    - bright
    - unknown

mood_temperature:
  allowed_values:
    - warm
    - neutral
    - cool
    - unknown

mood_tension:
  allowed_values:
    - relaxed
    - clean
    - playful
    - dramatic
    - unknown

confidence_score:
  说明: 0.0 到 1.0 的置信度。
  required: true

fallback_used:
  说明: 是否使用低置信度兜底。
  required: true

reason_signals:
  说明: mood_tag 的信号来源，不能只写主观判断。
  required: true
```

## 调色配置字段

```yaml
color_grade_profile:
  required: true
  fields:
    - brightness_adjust
    - contrast_adjust
    - saturation_adjust
    - temperature_adjust
    - tint_adjust
    - shadow_lift
    - highlight_rolloff
    - vignette_strength
    - grain_strength
    - ffmpeg_filter_candidate
    - remotion_effect_candidate
    - apply_scope
    - readability_guard_enabled
    - subject_visibility_guard_enabled
    - caption_readability_guard_enabled
```

## 自动映射规则

```yaml
cheerful_bright:
  触发信号:
    - tempo_estimate high
    - onset_density high
    - rms_energy medium_or_high
    - high_frequency_weight high
  调色方向:
    - brightness_adjust: +0.08_to_+0.15
    - saturation_adjust: +0.08_to_+0.18
    - temperature_adjust: +0.03_to_+0.10
    - contrast_adjust: +0.03_to_+0.08
    - shadow_lift: slight_up
  适用:
    - 欢快
    - 轻松
    - 明亮
    - vlog
    - 商品展示
  禁止:
    - 过曝
    - 高光炸裂
    - 字幕不可读

soft_vlog:
  触发信号:
    - tempo_estimate medium
    - rms_energy low_or_medium
    - dynamic_range stable
  调色方向:
    - brightness_adjust: +0.03_to_+0.08
    - saturation_adjust: +0.03_to_+0.08
    - contrast_adjust: -0.02_to_+0.03
    - highlight_rolloff: soft
    - temperature_adjust: slight_warm
  适用:
    - 松弛
    - 日常
    - 舒服
    - 轻叙事
  禁止:
    - 灰
    - 脏
    - 没层次

clean_cool:
  触发信号:
    - high_frequency_weight medium_or_high
    - low_frequency_weight low
    - tempo_estimate medium
  调色方向:
    - temperature_adjust: cool
    - saturation_adjust: slight_down
    - contrast_adjust: moderate_up
    - shadow_lift: neutral_clean
  适用:
    - 科技感
    - 冷静
    - 理性
    - 干净
  禁止:
    - 肤色死人感
    - 主体偏青严重
    - 字幕和背景粘住

dramatic_dark:
  触发信号:
    - low_frequency_weight high
    - rms_energy high
    - dynamic_range large
  调色方向:
    - brightness_adjust: -0.05_to_-0.12
    - contrast_adjust: +0.10_to_+0.20
    - saturation_adjust: -0.05_to_-0.12
    - shadows: down
    - vignette_strength: slight_up
  适用:
    - 紧张
    - 压迫
    - 悬疑
    - 强冲突
  禁止:
    - 主体压死
    - 商品 / 人脸不可见
    - 字幕不可读

fallback_neutral_unify:
  触发信号:
    - confidence_score_low
    - bgm_features_insufficient
    - bgm_missing_but_full_video_allows_neutral
  调色方向:
    - 只做素材基础统一
    - 统一曝光
    - 统一白平衡
    - 轻微饱和
    - 轻微对比
    - 不做强情绪滤镜
  适用:
    - 低置信度
    - BGM 不明确
    - 素材颜色太乱时先保守统一
  禁止:
    - 回问用户作为默认流程
    - 强行套 dramatic_dark 或 cheerful_bright
```

## 执行顺序

1. 读取 bgm_path。
2. 提取音频特征。
3. 生成 mood_tag、confidence_score、reason_signals。
4. 若 confidence_score 低，自动使用 fallback_neutral_unify。
5. 先执行 material_base_normalization。
6. 再执行 mood_driven_color_grade。
7. 生成 color_grade_profile.json。
8. 将 color_grade_profile 接入 Remotion / FFmpeg / 剪辑脚本读取链路。
9. 输出 machine_report，不阻断默认出片流程。

## 流程读取要求

```yaml
profile_read_by_pipeline:
  required: true_for_full_video_candidate
  accepted_readers:
    - Remotion composition data
    - FFmpeg filter config
    - Python edit runner
    - machine_report consumed by export pipeline
  blocked_if_missing: blocked_color_grade_profile_not_read_by_pipeline
```

只生成 color_grade_profile，但没有后续流程读取时，不得写 done。

## 人审定位

```yaml
human_review_role:
  default: post_run_debug_only
  说明: 人审只作为出片后复盘和失败定位，不作为每次调色前置审核。

do_not_block_on_user_color_review:
  default: true
```

## 完成标准

1. mood_tag 已生成。
2. confidence_score 已生成。
3. color_grade_profile 已生成。
4. low confidence 自动走 fallback_neutral_unify。
5. color_grade_profile 被后续流程读取。
6. 不要求用户每次先审核。
7. 不声明能力已验证。

## 失败路由

```yaml
blocked_bgm_missing:
  route_back_to: input_inventory

low_confidence:
  route_back_to: fallback_neutral_unify
  blocked: false

material_color_inconsistent:
  route_back_to: material_base_normalization

color_mood_mismatch:
  route_back_to: mood_to_color_grade_mapping

caption_unreadable_after_grade:
  route_back_to: caption_readability_guard + color_grade_pipeline

subject_visibility_damaged:
  route_back_to: subject_visibility_guard + color_grade_pipeline

profile_generated_but_not_read:
  route_back_to: pipeline_integration_check
  blocked: blocked_color_grade_profile_not_read_by_pipeline
```

## 禁止声明

- 不得声明 BGM 情绪判断能力已验证。
- 不得声明自动调色能力已验证。
- 不得声明 `bgm_mood_driven_color_grade_verified`。
- 不得声明 `full_video_candidate_pipeline_verified`。
- 不得声明 `vlog_director_capability_verified`。
- 不得声明 `publish-ready`。
- 不得把低置信度推测写成确定事实。
