# 第二期 16 秒音乐分段自适应调色验证报告

## 结论

- task_type: `adaptive_color_grade_tool_execution_validation`
- status: `adaptive_color_grade_tool_execution_validation_completed_pending_user_review`
- source_candidate: `第二期16秒vlog验证候选-second-episode-16s-vlog-validation-candidate`
- apply_scope: `per_music_section`
- sections_count: `5`
- fixed_preset_used: `false`
- odd_used_as_fixed_preset: `false`
- content_validation_status: `pending_user_review`

本轮已把当前第二期 16 秒候选的 `adaptive_color_grade_profile` 接入 Remotion 执行链路，并重新渲染出工具执行验证版。该结果证明 Remotion 当前可以按 frame 选择不同音乐段落调色参数，但不代表用户审美通过，也不代表跨片调色能力已验证。

## 本轮边界

已确认：

- 未修改 BGM。
- 未修改镜头顺序。
- 未修改剪辑节奏。
- 未新增字幕、贴纸、字牌、视觉反应字或视觉标点。
- 未调用外部 API。
- runtime video / image / JSON 只生成在 `dist/` 和 `tmp/`，不得提交进 Git。

不得声明：

- `publish-ready`
- `video_fixed`
- `color_grade_verified`
- `BGM_mood_driven_color_grade_verified`
- `vlog_director_capability_verified`
- `odd_color_preset_ready`

## 自适应调色配置

profile 路径：

- runtime props: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/adaptive_color_grade_profile.json`
- Remotion data: `remotion/数据_data/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.ts`

分段策略：

| section | time_range | BGM / material signal | color intent |
| --- | --- | --- | --- |
| `adaptive_section_01_0_3s` | `0-3s` | BGM 开头轻，食物高光和白狗需保护 | 轻微提亮，保持日光干净，不做强暖滤镜 |
| `adaptive_section_02_3_7s` | `3-7s` | BGM 进入街区推进，含影子纹理 | 街区保持中性，略提层次，只救暗部不洗白 |
| `adaptive_section_03_7_11s` | `7-11s` | BGM 能量抬升，白天运动转黄昏和夜店招牌 | 保留黄昏暖感，提升色彩分离并回收高光 |
| `adaptive_section_04_11_14s` | `11-14s` | 夜间运动张力延续 | 暗部抬升优先，降低过硬对比，保留夜间位移 |
| `adaptive_section_05_14_16s` | `14-16s` | BGM fade out 进入余味 | 降饱和一点，收暗一点，加 vignette 呼吸 |

`odd` 只作为 style_boundary：保留私人、非常规的日记气质；不得作为固定色调、固定 LUT 或所有片子共用的 preset。

## Remotion 执行链路

已确认：

- `remotion/Root.tsx` 的第二期 16 秒 composition defaultProps 已指向 `secondEpisodeAdaptiveColorGradeProfile`。
- render 使用 `--props=tmp/.../adaptive_color_grade_profile.json` 明确传入本轮 profile。
- composition 根据当前 `frame` 选择 active section。
- active section 参数进入：
  - `cssFilter`
  - `AtmosphereLayer`
  - temperature overlay
  - shadow lift overlay
  - highlight rolloff overlay
  - vignette
  - grain
- 如果 frame 未落入 section，会 fallback 到最近 section，不会崩溃。

部分成立：

- 本轮走的是 Remotion-only route，`ffmpeg_consumption=false`。
- 机器检测到 before / after 有可见均值差异，但 CSS filter 的专业调色上限仍需用户审片判断。

## Runtime 输出

- output_video_path: `dist/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation.mp4`
- review_pack_path: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/`
- before_after_contact_sheet: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/before_after_adaptive_color_contact_sheet.jpg`
- representative_frames_after_contact_sheet: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/representative_frames_after_contact_sheet.jpg`
- machine_report: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/machine_report.json`
- profile_read_report: `tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack/adaptive_profile_read_by_pipeline_report.json`

## 技术验证

已确认：

- `npx remotion compositions remotion/Root.tsx`: passed。
- Remotion render: passed。
- ffprobe / video metadata:
  - duration_seconds: `16.042667`
  - width: `1080`
  - height: `1920`
  - fps: `30.000`
  - video_codec: `h264`
  - audio_present: `true`
  - audio_codec: `aac`
  - decodable: `true`
- ffmpeg decode check: passed。
- review_pack generation: passed。
- runtime assets committed: `false`。

machine_report 关键字段：

- adaptive_color_profile_read_by_pipeline: `true`
- apply_scope: `per_music_section`
- sections_count: `5`
- fixed_preset_used: `false`
- odd_used_as_fixed_preset: `false`
- render_status: `passed`
- before_after_contact_sheet_exists: `true`
- machine_visible_change.detected: `true`
- machine_visible_change.mean_abs_luma_delta: `3.22`
- machine_visible_change.mean_abs_saturation_delta: `0.02006`
- remotion_css_filter_ceiling_status: `not_detected_by_machine_delta_only`

## 待验证

- 用户是否认为新 adaptive 版本比旧整片统一调色更好。
- 用户是否认可每个音乐段落对应的颜色意图。
- 如果用户认为变化弱或不够高级，下一轮应进入 FFmpeg / LUT 调色路线 probe，而不是把本轮结果写成调色能力已验证。

## 下一步

1. 如果用户认可画面：将 adaptive color profile 执行方式固化到后续候选流程。
2. 如果用户觉得变化弱：进入 FFmpeg `eq / curves / colorbalance / lut3d` 或 LUT 路线 probe。
3. 如果用户觉得方向错：回到 `BGM_mood_curve` 和 `section_color_intent` 重做，不套固定 preset。
