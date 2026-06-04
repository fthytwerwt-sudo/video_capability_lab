# 视觉前处理驱动 8 秒字幕贴纸候选报告

## status（状态）

`visual_preprocessing_driven_8s_caption_sticker_candidate_rendered_pending_user_review`

已确认：本轮已生成一个 8 秒本地视频，并生成审片包。该视频是 `8s_candidate`，不是 2-4 秒微段，不是 4 秒探针，不是完整 18 秒正片。

## route_decision（路由决策）

```yaml
task_type: visual_preprocessing_driven_8s_caption_sticker_candidate
route_decision: render_8s_candidate_using_visual_preprocessing_protocol_not_full_18s_video
user_goal: 把已安装的 Remotion 插件层和视觉前处理协议真正用于字幕 / 贴纸 / 视觉标点渲染。
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
generation_api_called_this_round: false
runtime_asset_commit_allowed_this_round: false
full_video_candidate: false
capability_status: vlog_director_capability_still_pending_multi_case_validation
```

## selected_8s_structure（选定 8 秒结构）

| time_range | segment_id | material_id | role | visual_reason |
|---|---|---|---|---|
| `0.00-1.20s` | `seg_01_opening_texture_identity` | `M14` | `opening_identity` | 沙纹 / 足迹 texture 做开场触感，但只短停。 |
| `1.20-2.55s` | `seg_02_gym_identity_entry` | `M08` | `scene_identity` | 把开场 texture 落到 gym 器械 / 人物身份。 |
| `2.55-3.30s` | `seg_03_space_bridge` | `M05` | `space_bridge` | 补足空间关系，不让动作镜头孤立。 |
| `3.30-4.90s` | `seg_04_action_contact` | `M03` | `action_contact` | 主动作发力窗口，用于检查接触字幕和贴纸。 |
| `4.90-6.40s` | `seg_05_machine_texture_reset` | `M06` | `machine_texture` | 金属线条 / 机器纹理作为 reset，检查材质融合。 |
| `6.40-8.00s` | `seg_06_return_machine_close` | `M04` | `return_close` | 回到机器方向线，给 motion trail 明确收束锚点。 |

使用 BGM：

```yaml
bgm_used: 素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV
```

## visual_preprocessing_summary（视觉前处理摘要）

运行目录：

```text
tmp/视觉前处理驱动8秒候选_visual_preprocessing_driven_8s_candidate/
```

```yaml
anchor_map:
  status: generated
  anchor_count: 2
  confidence_values: [0.367, 0.391]
  source_method: opencv
motion_track:
  status: generated
  track_count: 1
  direction: right
  confidence: 0.76
mask_plan:
  status: generated
  mask_count: 1
  confidence: 0.72
  simulated_occlusion_only: true
visual_scorecard:
  status: generated
  review_status: pending_user_review
  caption_reaction_score: 2
  sticker_specificity_score: 2
  anchor_attachment_score: 1
  material_occlusion_score: 3
  motion_event_score: 3
  required_fix:
    - anchor_confidence_low_manual_frame_review_required
```

部分成立：OpenCV 已提供粗锚点、粗运动方向和粗 mask plan。由于 `anchor_confidence` 低于 `0.4`，后续必须保留人工帧审；不得写成稳定视觉理解能力。

已确认：`mask_plan.simulated_occlusion_only=true`，所以本轮只做模拟遮挡，不声明 `real_occlusion_passed`。

## anchor_map_used（是否使用画面锚点表）

`true`

使用方式：

- `anchor_opening_identity` 驱动 `caption_01_opening` 和 `sticker_01_opening_edge_scuff`。
- `anchor_action_machine` 驱动 `caption_03_contact`、`sticker_02_contact_rub` 和 `sticker_03_machine_motion_trail`。

## motion_track_used（是否使用运动跟踪表）

`true`

使用方式：

- `motionTrackSummary.direction=right` 驱动 contact rub 和 motion trail 的右向位移。
- `velocity.x` 用于机器线条段的 trail shift。

## mask_plan_used（是否使用遮罩计划表）

`true`

使用方式：

- `maskPlanSummary.simulated_occlusion_only=true` 被组件显式写入 score badge 和报告。
- contact rub 使用低透明 multiply patch 做模拟遮挡，不声明真实遮挡。

## remotion_plugins_used（是否使用 Remotion 插件）

```yaml
@remotion/paths:
  - getLength
  - getPointAtLength
  - evolvePath
  - interpolatePath
@remotion/motion-blur:
  - Trail
@remotion/effects:
  - blur
  - dropShadow
  - noise
  - vignette
```

已确认：`@remotion/effects` 使用 subpath imports，不从包根导入。

## caption_plan（字幕计划）

| caption_id | text | anchor_from | position_mode | template_fallback |
|---|---|---|---|---|
| `caption_01_opening` | `落地` | `anchor_opening_identity` | `anchor_safe_zone` | `false` |
| `caption_02_entry` | `进场` | `anchor_opening_identity` | `edge_attached` | `false` |
| `caption_03_contact` | `咔` | `anchor_action_machine` | `contact_reaction` | `false` |
| `caption_04_line_return` | `顺着线走` | `anchor_action_machine` | `edge_attached` | `false` |

## sticker_plan（贴纸计划）

| sticker_id | sticker_type | anchor_from | motion_from | mask_from | template_fallback |
|---|---|---|---|---|---|
| `sticker_01_opening_edge_scuff` | `edge_scuff` | `anchor_opening_identity` | `opencv_lk_median_feature_track_01` | `opencv_motion_diff_mask_01` | `false` |
| `sticker_02_contact_rub` | `contact_rub` | `anchor_action_machine` | `opencv_lk_median_feature_track_01` | `opencv_motion_diff_mask_01` | `false` |
| `sticker_03_machine_motion_trail` | `motion_trail` | `anchor_action_machine` | `opencv_lk_median_feature_track_01` | `opencv_motion_diff_mask_01` | `false` |

## visual_scorecard（视觉判分表）

```yaml
caption_reaction_score: 2
sticker_specificity_score: 2
anchor_attachment_score: 1
material_occlusion_score: 3
motion_event_score: 3
pass_fail_reason: toolchain_probe_ready_pending_human_visual_review
review_status: pending_user_review
required_fix:
  - anchor_confidence_low_manual_frame_review_required
```

## technical_validation（技术验证）

```yaml
render_status: passed
render_command: npx remotion render remotion/Root.tsx 视觉前处理驱动8秒字幕贴纸候选-visual-preprocessing-driven-8s-caption-sticker-candidate ... --gl=angle
video_path: dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4
duration_seconds: 8.042667
width: 1080
height: 1920
fps: 30.000
video_codec: h264
audio_present: true
audio_codec: aac
audio_channels: 2
decodable: true
metadata_validation: passed
content_validation: pending_user_review
```

## review_pack_path（审片包路径）

```text
tmp/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate_review_pack/
```

包含：

- `review_manifest.json`
- `caption_sticker_evidence_map.json`
- `visual_preprocessing_evidence_map.json`
- `visual_scorecard.json`
- `anchor_map.json`
- `motion_track.json`
- `mask_plan.json`
- `edge_preview.jpg`
- `motion_mask_preview.jpg`
- `视觉前处理驱动8秒字幕贴纸候选_contact_sheet.jpg`
- start / mid / end / caption / sticker / anchor / motion evidence frames

## remaining_user_review_points（仍需用户回审点）

- 用户需要判断 8 秒候选是否比 2-4 秒微段更有完整片段感。
- 用户需要判断字幕是否更贴画面。
- 用户需要判断贴纸是否仍像通用组件。
- 用户需要判断 OpenCV 锚点和运动跟踪是否真的减少浮层感。
- 用户需要判断若仍然差一点，是否进入更强视觉分割 / 剪辑工具层。

## do_not_claim（禁止声明）

- 不声明 `publish-ready`。
- 不声明 `video_fixed`。
- 不声明 `full_video_candidate_completed`。
- 不声明 `vlog_director_capability_verified`。
- 不声明 `real_occlusion_passed`。
- 不声明 OpenCV 粗锚点等于真实稳定视觉理解。
