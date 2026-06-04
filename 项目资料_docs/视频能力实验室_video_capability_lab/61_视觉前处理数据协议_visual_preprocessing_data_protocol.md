# 视觉前处理数据协议

协议状态：`visual_preprocessing_data_protocol_v0_1_ready_for_probe`。

适用范围：字幕、贴纸、视觉标点、材质遮挡、动作事件动效进入 Remotion 前，必须先有可回审的画面证据数据。该协议只定义数据契约和轻量 probe，不声明视觉理解能力稳定成立。

## A. 链路定位

```text
视频画面
-> 视觉前处理 probe
-> anchor_map.json / motion_track.json / mask_plan.json / visual_scorecard.json
-> Remotion 按数据渲染 2-4 秒 probe
-> 审片包回审
```

已确认：`Codex 插件里有 Remotion` 不等于本项目 `package.json` 已安装 Remotion 插件；后续以仓库 `package.json`、`package-lock.json`、`node_modules` 和 render 验证为准。

已确认：本协议不生成完整正片，不重剪当前视频，不证明视频导演能力已成立。

## B. 文件输出约定

运行输出默认进入：

```text
tmp/视觉前处理探针_visual_preprocessing_probe/
```

运行输出包括：

- `anchor_map.json`
- `motion_track.json`
- `mask_plan.json`
- `visual_scorecard.json`
- `opencv_edge_preview.jpg`
- `opencv_motion_mask_preview.jpg`
- `mediapipe_landmarks.json` 或 `no_landmark_detected.json`
- `sam2_env_probe.json`

这些文件属于 runtime assets，不提交 Git。仓库只提交协议、schema、脚本、Remotion probe 和机制报告。

## C. anchor_map.json（画面锚点表）

用途：记录每个镜头可用于字幕 / 贴纸 / 视觉标点附着的画面锚点。

最低字段：

| field | type | required | meaning |
|---|---:|---:|---|
| `shot_id` | string | yes | 镜头 ID |
| `time_range` | object | yes | 时间范围，包含 `start` / `end` 秒 |
| `frame_id` | string | yes | 证据帧 ID |
| `subject_bbox` | object | yes | 主体框，包含 `x` / `y` / `width` / `height` |
| `contact_points` | array | yes | 接触点列表 |
| `edge_lines` | array | yes | 画面边缘线列表 |
| `motion_direction` | string | yes | 运动方向 |
| `safe_caption_zones` | array | yes | 字幕安全区 |
| `unsafe_overlay_zones` | array | yes | 不适合覆盖区域 |
| `confidence` | number | yes | 置信度，0-1 |
| `source_method` | string | yes | `manual` / `opencv` / `mediapipe` / `sam2` / `mixed` |

JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "anchor_map",
  "type": "object",
  "required": ["schema_name", "schema_version", "anchors"],
  "properties": {
    "schema_name": {"const": "anchor_map"},
    "schema_version": {"type": "string"},
    "metadata": {"type": "object"},
    "anchors": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "shot_id",
          "time_range",
          "frame_id",
          "subject_bbox",
          "contact_points",
          "edge_lines",
          "motion_direction",
          "safe_caption_zones",
          "unsafe_overlay_zones",
          "confidence",
          "source_method"
        ],
        "properties": {
          "shot_id": {"type": "string"},
          "time_range": {
            "type": "object",
            "required": ["start", "end"],
            "properties": {
              "start": {"type": "number"},
              "end": {"type": "number"}
            }
          },
          "frame_id": {"type": "string"},
          "subject_bbox": {"$ref": "#/$defs/bbox"},
          "contact_points": {
            "type": "array",
            "items": {"$ref": "#/$defs/point"}
          },
          "edge_lines": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["line_id", "start", "end", "source_method"],
              "properties": {
                "line_id": {"type": "string"},
                "start": {"$ref": "#/$defs/point"},
                "end": {"$ref": "#/$defs/point"},
                "source_method": {"type": "string"}
              }
            }
          },
          "motion_direction": {"type": "string"},
          "safe_caption_zones": {"type": "array"},
          "unsafe_overlay_zones": {"type": "array"},
          "confidence": {"type": "number", "minimum": 0, "maximum": 1},
          "source_method": {"enum": ["manual", "opencv", "mediapipe", "sam2", "mixed"]}
        }
      }
    }
  },
  "$defs": {
    "bbox": {
      "type": "object",
      "required": ["x", "y", "width", "height"],
      "properties": {
        "x": {"type": "number"},
        "y": {"type": "number"},
        "width": {"type": "number"},
        "height": {"type": "number"}
      }
    },
    "point": {
      "type": "object",
      "required": ["x", "y"],
      "properties": {
        "x": {"type": "number"},
        "y": {"type": "number"}
      }
    }
  }
}
```

## D. motion_track.json（运动跟踪表）

用途：记录关键点或主体在不同帧之间的运动轨迹，让贴纸和字幕可以跟着动作走。

最低字段：

| field | type | required | meaning |
|---|---:|---:|---|
| `track_id` | string | yes | 跟踪 ID |
| `target_type` | string | yes | 目标类型 |
| `frame_points` | array | yes | 逐帧点位 |
| `velocity` | object | yes | 速度 |
| `direction` | string | yes | 方向 |
| `confidence` | number | yes | 置信度 |
| `failure_frames` | array | yes | 失败帧 |

JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "motion_track",
  "type": "object",
  "required": ["schema_name", "schema_version", "tracks"],
  "properties": {
    "schema_name": {"const": "motion_track"},
    "schema_version": {"type": "string"},
    "metadata": {"type": "object"},
    "tracks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["track_id", "target_type", "frame_points", "velocity", "direction", "confidence", "failure_frames"],
        "properties": {
          "track_id": {"type": "string"},
          "target_type": {"type": "string"},
          "frame_points": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["frame_id", "second", "point"],
              "properties": {
                "frame_id": {"type": "string"},
                "second": {"type": "number"},
                "point": {"$ref": "#/$defs/point"},
                "tracked_feature_count": {"type": "integer"}
              }
            }
          },
          "velocity": {
            "type": "object",
            "required": ["x", "y", "magnitude"],
            "properties": {
              "x": {"type": "number"},
              "y": {"type": "number"},
              "magnitude": {"type": "number"}
            }
          },
          "direction": {"type": "string"},
          "confidence": {"type": "number", "minimum": 0, "maximum": 1},
          "failure_frames": {"type": "array", "items": {"type": "string"}}
        }
      }
    }
  },
  "$defs": {
    "point": {
      "type": "object",
      "required": ["x", "y"],
      "properties": {
        "x": {"type": "number"},
        "y": {"type": "number"}
      }
    }
  }
}
```

## E. mask_plan.json（遮罩计划表）

用途：记录哪里是前景、哪里可能遮住贴纸、哪里只能模拟遮挡。

最低字段：

| field | type | required | meaning |
|---|---:|---:|---|
| `mask_id` | string | yes | 遮罩 ID |
| `time_range` | object | yes | 时间范围 |
| `foreground_regions` | array | yes | 前景区域 |
| `occlusion_regions` | array | yes | 遮挡区域 |
| `overlay_allowed_regions` | array | yes | 允许覆盖区域 |
| `simulated_occlusion_only` | boolean | yes | 是否仅能模拟遮挡 |
| `mask_source` | string | yes | 遮罩来源 |
| `confidence` | number | yes | 置信度 |

JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "mask_plan",
  "type": "object",
  "required": ["schema_name", "schema_version", "masks"],
  "properties": {
    "schema_name": {"const": "mask_plan"},
    "schema_version": {"type": "string"},
    "metadata": {"type": "object"},
    "masks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "mask_id",
          "time_range",
          "foreground_regions",
          "occlusion_regions",
          "overlay_allowed_regions",
          "simulated_occlusion_only",
          "mask_source",
          "confidence"
        ],
        "properties": {
          "mask_id": {"type": "string"},
          "time_range": {"type": "object"},
          "foreground_regions": {"type": "array"},
          "occlusion_regions": {"type": "array"},
          "overlay_allowed_regions": {"type": "array"},
          "simulated_occlusion_only": {"type": "boolean"},
          "mask_source": {"type": "string"},
          "confidence": {"type": "number", "minimum": 0, "maximum": 1}
        }
      }
    }
  }
}
```

## F. visual_scorecard.json（视觉判分表）

用途：记录字幕和贴纸是否真的贴住画面；该分数是工具链回审输入，不是用户审美终审。

最低字段：

| field | type | required | meaning |
|---|---:|---:|---|
| `caption_reaction_score` | number | yes | 字幕反应感评分 |
| `sticker_specificity_score` | number | yes | 贴纸专属性评分 |
| `anchor_attachment_score` | number | yes | 锚点附着评分 |
| `material_occlusion_score` | number | yes | 材质与遮挡评分 |
| `motion_event_score` | number | yes | 动作事件动效评分 |
| `pass_fail_reason` | string | yes | 通过 / 失败原因 |
| `evidence_frames` | array | yes | 证据帧 |
| `required_fix` | array | yes | 必须修正项 |
| `review_status` | string | yes | 回审状态 |

JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "visual_scorecard",
  "type": "object",
  "required": ["schema_name", "schema_version", "scorecard"],
  "properties": {
    "schema_name": {"const": "visual_scorecard"},
    "schema_version": {"type": "string"},
    "metadata": {"type": "object"},
    "scorecard": {
      "type": "object",
      "required": [
        "caption_reaction_score",
        "sticker_specificity_score",
        "anchor_attachment_score",
        "material_occlusion_score",
        "motion_event_score",
        "pass_fail_reason",
        "evidence_frames",
        "required_fix",
        "review_status"
      ],
      "properties": {
        "caption_reaction_score": {"type": "number"},
        "sticker_specificity_score": {"type": "number"},
        "anchor_attachment_score": {"type": "number"},
        "material_occlusion_score": {"type": "number"},
        "motion_event_score": {"type": "number"},
        "pass_fail_reason": {"type": "string"},
        "evidence_frames": {"type": "array", "items": {"type": "string"}},
        "required_fix": {"type": "array", "items": {"type": "string"}},
        "review_status": {"type": "string"}
      }
    }
  }
}
```

## G. 工具层来源规则

| source_method | 可以证明 | 不能证明 |
|---|---|---|
| `manual` | 人工帧审标注的锚点意图 | 自动视觉理解能力 |
| `opencv` | 边缘、光流、角点、简单运动跟踪信号 | 语义理解、稳定遮罩 |
| `mediapipe` | 人体 / 手部 / 姿态关键点是否被检测 | 没检测到时不能伪造人手锚点 |
| `sam2` | 未来主体 / 物体遮罩候选 | 本轮无权重时不能证明分割已验证 |
| `mixed` | 多来源融合后的候选锚点 | 用户审美通过或正片可发布 |

## H. Remotion 使用规则

Remotion probe 必须读取 sample 或 runtime JSON，并在组件里显式体现：

1. 字幕位置来自 `safe_caption_zones` 或 `contact_points`。
2. 贴纸路径来自 `edge_lines` / `contact_points` / `frame_points`。
3. 动效方向来自 `motion_track.direction` 和 `velocity`。
4. 遮挡只要来自 `mask_plan.simulated_occlusion_only=true`，必须写成模拟遮挡，不得写成真实像素级遮罩。
5. `visual_scorecard.review_status` 不是 `approved` 时，不得进入完整正片候选。

## I. 禁止声明

- 不声明 `publish-ready`。
- 不声明 `video_fixed`。
- 不声明 `vlog_director_capability_verified`。
- 不声明 `SAM2 segmentation verified`。
- 不声明 OpenCV / MediaPipe 能稳定解决所有视频。
- 不声明本轮已生成完整正片。
