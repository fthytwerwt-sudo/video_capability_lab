# Remotion 插件与视觉工具链补强报告

报告状态：`remotion_plugin_and_visual_toolchain_upgrade_completed_pending_user_review`。

本轮目标：一次性补齐后续字幕 / 贴纸 / 视觉标点所需的三层能力基础：

1. Remotion plugin layer。
2. Visual preprocessing protocol layer。
3. Real visual tool adapter layer。

本轮不是生成完整正片，不是重剪当前视频，不是证明视频导演能力已成立。

## A. route_decision

```yaml
task_type: visual_toolchain_foundation_upgrade
route_decision: install_plugins_build_protocol_build_probe_not_full_video
repository: /Users/fan/Documents/vlog、odd/video_capability_lab
branch: main
generation_api_called_this_round: false
runtime_asset_commit_allowed_this_round: false
full_video_render_allowed_this_round: false
```

## B. dependency_audit

```yaml
current_remotion_version: 4.0.469
current_remotion_packages_before_install:
  - remotion@4.0.469
  - @remotion/cli@4.0.469
  - @remotion/media-utils@4.0.469
  - @remotion/renderer@4.0.469
missing_remotion_packages_before_install:
  - @remotion/paths
  - @remotion/motion-blur
  - @remotion/effects
package_lock_present: true
node_modules_present: true
install_strategy: install_exact_versions_matching_remotion_4_0_469
compatible_versions_confirmed:
  - @remotion/paths@4.0.469
  - @remotion/motion-blur@4.0.469
  - @remotion/effects@4.0.469
```

已确认：`Codex 插件里有 Remotion` 不等于本项目 `package.json` 已安装相关 npm 包。本轮依赖判断只以 `package.json`、`package-lock.json`、`node_modules`、`npm ls` 和 import smoke test 为准。

## C. Remotion plugin layer

安装命令：

```bash
npm install --save-exact @remotion/paths@4.0.469 @remotion/motion-blur@4.0.469 @remotion/effects@4.0.469
```

新增包：

```yaml
newly_installed_packages:
  - @remotion/paths@4.0.469
  - @remotion/motion-blur@4.0.469
  - @remotion/effects@4.0.469
version_alignment_status: exact_match_with_remotion_4_0_469
package_lock_updated: true
```

actual_api_result:

```yaml
@remotion/paths:
  getLength: available
  getPointAtLength: available
  evolvePath: available
  interpolatePath: available
@remotion/motion-blur:
  Trail: available
  CameraMotionBlur: available
@remotion/effects:
  root_commonjs_require: ERR_PACKAGE_PATH_NOT_EXPORTED
  working_import_style:
    - @remotion/effects/blur
    - @remotion/effects/drop-shadow
    - @remotion/effects/noise
    - @remotion/effects/vignette
```

结论：`@remotion/effects` 使用 subpath imports，不从包根做 CommonJS require。

## D. 新增 Remotion probe

插件冒烟探针：

```yaml
data: remotion/数据_data/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe.ts
composition: remotion/组合_compositions/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe.tsx
composition_id: 视觉工具链插件冒烟探针-visual-toolchain-plugin-smoke-probe
duration_frames: 90
fps: 30
purpose:
  - prove @remotion/paths import and path calculations
  - prove @remotion/motion-blur Trail render path
  - prove @remotion/effects subpath imports through Solid effects
```

视觉前处理驱动探针：

```yaml
data: remotion/数据_data/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe.ts
composition: remotion/组合_compositions/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe.tsx
composition_id: 视觉前处理驱动字幕贴纸探针-visual-preprocessing-driven-caption-sticker-probe
duration_frames: 90
fps: 30
purpose:
  - read sample anchor_map / motion_track / mask_plan / visual_scorecard
  - render caption / sticker / visual punctuation from sample visual preprocessing data
  - prove data-driven route before future full-video use
```

待验证：render、ffprobe、ffmpeg decode 和审片包生成会在本报告验证区更新。

## E. visual preprocessing protocol layer

协议文件：

```yaml
protocol_file: 项目资料_docs/视频能力实验室_video_capability_lab/61_视觉前处理数据协议_visual_preprocessing_data_protocol.md
runtime_output_dir: tmp/视觉前处理探针_visual_preprocessing_probe/
runtime_assets_committed: false
```

定义的 JSON：

- `anchor_map.json`
- `motion_track.json`
- `mask_plan.json`
- `visual_scorecard.json`

## F. real visual tool adapter layer

脚本目录：

```text
脚本_scripts/视觉前处理_visual_preprocessing/
```

新增脚本：

```yaml
opencv:
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成画面锚点表_generate_anchor_map.py
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成运动跟踪表_generate_motion_track.py
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成遮罩计划_generate_mask_plan.py
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成视觉判分表_generate_visual_scorecard.py
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成OpenCV探针报告_generate_opencv_probe_report.py
mediapipe:
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成MediaPipe关键点_generate_mediapipe_landmarks.py
sam2:
  - 脚本_scripts/视觉前处理_visual_preprocessing/SAM2适配器_sam2_adapter.py
  - 脚本_scripts/视觉前处理_visual_preprocessing/SAM2环境探测_sam2_env_probe.py
env_check:
  - 脚本_scripts/视觉前处理_visual_preprocessing/视觉工具环境检查_visual_tool_env_check.py
review_pack:
  - 脚本_scripts/视觉前处理_visual_preprocessing/生成视觉工具链审片包_generate_visual_toolchain_review_pack.py
requirements_record:
  - 脚本_scripts/视觉前处理_visual_preprocessing/视觉前处理依赖_visual_preprocessing_requirements.txt
```

SAM2 边界：

```yaml
sam2_fit:
  - 主体 / 物体遮罩
  - 未来辅助 foreground / occlusion regions
sam2_not_used_for_this_round:
  - no checkpoint download
  - no external git clone
  - no heavy CUDA / torch install
expected_no_weights_status: interface_ready_weights_missing
```

## G. validation_log

```yaml
node_npm_validation:
  npm_install_result: added 3 packages; audited 186 packages; 0 vulnerabilities
  npm_ls:
    @remotion/paths: 4.0.469
    @remotion/motion-blur: 4.0.469
    @remotion/effects: 4.0.469
    remotion: 4.0.469
  import_smoke_test:
    paths: getLength / getPointAtLength / evolvePath / interpolatePath passed
    motion_blur: Trail / CameraMotionBlur passed
    effects: blur / dropShadow / noise / vignette subpath imports passed
remotion_validation:
  compositions_check: passed
  plugin_smoke_probe_render:
    status: passed
    first_attempt_result: failed_webgl2_context
    fix: rerun_with_remotion_cli_gl_angle
    output: dist/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe.mp4
    metadata: h264 / 1080x1920 / 30fps / stream_duration=3.000000 / format_duration=3.050667
    decode_check: passed
  visual_preprocessing_driven_probe_render:
    status: passed
    output: dist/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe.mp4
    metadata: h264 / 1080x1920 / 30fps / stream_duration=3.000000 / format_duration=3.050667
    decode_check: passed
python_validation:
  python3: 3.9.6
  project_venv_python: 3.9.6
  opencv_import: 4.13.0
  mediapipe_import: 0.10.35
  numpy_import: 2.0.2
opencv_validation:
  status: opencv_probe_completed
  output_dir: tmp/视觉前处理探针_visual_preprocessing_probe/
  anchor_map: anchor_confidence=0.588 / source_method=opencv / edge_lines=8
  motion_track: motion_confidence=0.76 / direction=up_right / frame_points=6 / failure_frames=[f00013]
  mask_plan: mask_confidence=0.18 / simulated_occlusion_only=true
  visual_scorecard: review_status=pending_user_review / required_fix=[mask_is_simulated_occlusion_only_keep_runtime_review_gate]
  opencv_probe_report: tmp/视觉前处理探针_visual_preprocessing_probe/opencv_probe_report.json
mediapipe_validation:
  status: no_landmark_detected
  reason: mediapipe_0_10_35_exposes_tasks_api_only_no_legacy_solutions_and_no_local_task_model
  output: tmp/视觉前处理探针_visual_preprocessing_probe/no_landmark_detected.json
  fake_landmarks_written: false
sam2_env_probe:
  status: interface_ready_weights_missing
  python_version_supported_for_sam2: false
  torch_present: false
  weights_status: missing_not_downloaded_by_policy
  output: tmp/视觉前处理探针_visual_preprocessing_probe/sam2_env_probe.json
review_pack:
  status: generated
  path: tmp/视觉工具链补强审片包_visual_toolchain_upgrade_review_pack/
  contact_sheet: tmp/视觉工具链补强审片包_visual_toolchain_upgrade_review_pack/视觉工具链补强_contact_sheet.jpg
  manifest: tmp/视觉工具链补强审片包_visual_toolchain_upgrade_review_pack/review_manifest.json
  visual_sanity_check: contact_sheet_opened_nonblank
git_validation: final_response_reports_commit_push_remote_head
```

## H. 禁止声明

- 不声明 `publish-ready`。
- 不声明 `video_fixed`。
- 不声明 `vlog_director_capability_verified`。
- 不声明 `SAM2 segmentation verified`。
- 不声明 OpenCV / MediaPipe 能稳定解决所有视频。
- 不声明本轮已生成完整正片。
