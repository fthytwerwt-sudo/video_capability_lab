#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import (
    build_parser,
    direction_from_delta,
    import_cv2,
    import_numpy,
    rel,
    resolve_input_video,
    sample_frames,
    tool_metadata,
    velocity_from_points,
    video_metadata,
    write_json,
)


def build_motion_track(video_path: Path, args: Any) -> dict[str, Any]:
    cv2 = import_cv2()
    np = import_numpy()
    frames = sample_frames(video_path, args.start, args.duration, args.max_frames)
    meta = video_metadata(video_path)
    gray_frames = [cv2.cvtColor(item["frame"], cv2.COLOR_BGR2GRAY) for item in frames]

    features = cv2.goodFeaturesToTrack(
        gray_frames[0],
        maxCorners=40,
        qualityLevel=0.01,
        minDistance=18,
        blockSize=7,
    )

    failure_frames: list[str] = []
    frame_points: list[dict[str, Any]] = []
    if features is None:
        for item in frames:
            failure_frames.append(item["frame_id"])
        tracked_points: list[dict[str, float]] = []
    else:
        current_points = features
        tracked_points = []
        for index in range(1, len(gray_frames)):
            next_points, status, _error = cv2.calcOpticalFlowPyrLK(
                gray_frames[index - 1],
                gray_frames[index],
                current_points,
                None,
                winSize=(21, 21),
                maxLevel=3,
            )
            if next_points is None or status is None:
                failure_frames.append(frames[index]["frame_id"])
                continue
            valid = status.reshape(-1) == 1
            if not bool(valid.any()):
                failure_frames.append(frames[index]["frame_id"])
                continue
            valid_points = next_points.reshape(-1, 2)[valid]
            median = np.median(valid_points, axis=0)
            tracked_points.append({"x": round(float(median[0]), 3), "y": round(float(median[1]), 3), "second": frames[index]["second"]})
            frame_points.append(
                {
                    "frame_id": frames[index]["frame_id"],
                    "second": frames[index]["second"],
                    "point": {"x": round(float(median[0]), 3), "y": round(float(median[1]), 3)},
                    "tracked_feature_count": int(valid.sum()),
                }
            )
            current_points = valid_points.reshape(-1, 1, 2).astype(np.float32)

    velocity = velocity_from_points(tracked_points)
    direction = direction_from_delta(velocity["x"], velocity["y"])
    confidence = 0.0 if not frame_points else max(0.18, min(0.76, len(frame_points) / max(1, len(frames) - 1)))

    return {
        "schema_name": "motion_track",
        "schema_version": "0.1.0",
        "metadata": {**tool_metadata(), "input_video": rel(video_path), "video": meta},
        "tracks": [
            {
                "track_id": "opencv_lk_median_feature_track_01",
                "target_type": "median_good_feature_cluster",
                "frame_points": frame_points,
                "velocity": velocity,
                "direction": direction,
                "confidence": round(confidence, 3),
                "failure_frames": failure_frames,
                "source_method": "opencv_lucas_kanade_optical_flow",
            }
        ],
    }


def main() -> None:
    parser = build_parser("Generate motion_track.json with OpenCV feature tracking.")
    args = parser.parse_args()
    video_path = resolve_input_video(args.input)
    output_dir = Path(args.output_dir)
    data = build_motion_track(video_path, args)
    write_json(output_dir / "motion_track.json", data)
    print(f"wrote {rel(output_dir / 'motion_track.json')}")


if __name__ == "__main__":
    main()
