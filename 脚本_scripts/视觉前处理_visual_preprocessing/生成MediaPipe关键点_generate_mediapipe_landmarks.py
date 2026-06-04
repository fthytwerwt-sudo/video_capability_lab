#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import (
    build_parser,
    rel,
    resolve_input_video,
    sample_frames,
    tool_metadata,
    video_metadata,
    write_json,
)


def import_mediapipe():
    try:
        import mediapipe as mp  # type: ignore
    except Exception as exc:  # pragma: no cover - runtime probe path
        raise RuntimeError(f"MediaPipe import failed: {exc}") from exc
    return mp


def build_landmarks(video_path: Path, args: Any) -> dict[str, Any]:
    mp = import_mediapipe()
    frames = sample_frames(video_path, args.start, args.duration, args.max_frames)
    meta = video_metadata(video_path)
    if not hasattr(mp, "solutions"):
        return {
            "schema_name": "mediapipe_landmarks",
            "schema_version": "0.1.0",
            "metadata": {**tool_metadata(), "input_video": rel(video_path), "video": meta, "mediapipe_version": mp.__version__},
            "status": "no_landmark_detected",
            "api_status": "mediapipe_tasks_only_no_legacy_solutions",
            "available_top_level_api": [name for name in dir(mp) if not name.startswith("_")],
            "sampled_frame_count": len(frames),
            "landmark_records": [],
            "anchor_map_integration_hint": {
                "source_method": "mediapipe",
                "usable_for_anchor_map": False,
                "fallback_when_empty": "keep OpenCV/manual anchors; do not fake body or hand landmarks",
            },
        }

    pose = mp.solutions.pose.Pose(static_image_mode=True, model_complexity=1, enable_segmentation=False)
    hands = mp.solutions.hands.Hands(static_image_mode=True, max_num_hands=2, min_detection_confidence=0.35)

    records: list[dict[str, Any]] = []
    try:
        for item in frames:
            rgb = item["frame"][:, :, ::-1]
            pose_result = pose.process(rgb)
            hand_result = hands.process(rgb)
            record: dict[str, Any] = {
                "frame_id": item["frame_id"],
                "second": item["second"],
                "pose_landmarks": [],
                "hand_landmarks": [],
            }
            if pose_result.pose_landmarks:
                record["pose_landmarks"] = [
                    {
                        "landmark_id": index,
                        "x": round(float(landmark.x), 5),
                        "y": round(float(landmark.y), 5),
                        "z": round(float(landmark.z), 5),
                        "visibility": round(float(landmark.visibility), 5),
                    }
                    for index, landmark in enumerate(pose_result.pose_landmarks.landmark)
                ]
            if hand_result.multi_hand_landmarks:
                for hand_index, landmarks in enumerate(hand_result.multi_hand_landmarks):
                    record["hand_landmarks"].append(
                        {
                            "hand_index": hand_index,
                            "points": [
                                {
                                    "landmark_id": index,
                                    "x": round(float(landmark.x), 5),
                                    "y": round(float(landmark.y), 5),
                                    "z": round(float(landmark.z), 5),
                                }
                                for index, landmark in enumerate(landmarks.landmark)
                            ],
                        }
                    )
            if record["pose_landmarks"] or record["hand_landmarks"]:
                records.append(record)
    finally:
        pose.close()
        hands.close()

    status = "landmarks_detected" if records else "no_landmark_detected"
    return {
        "schema_name": "mediapipe_landmarks",
        "schema_version": "0.1.0",
        "metadata": {**tool_metadata(), "input_video": rel(video_path), "video": meta, "mediapipe_version": mp.__version__},
        "status": status,
        "landmark_records": records,
        "anchor_map_integration_hint": {
            "source_method": "mediapipe",
            "usable_for_anchor_map": bool(records),
            "fallback_when_empty": "keep OpenCV/manual anchors; do not fake body or hand landmarks",
        },
    }


def main() -> None:
    parser = build_parser("Run a lightweight MediaPipe pose/hand probe.")
    args = parser.parse_args()
    video_path = resolve_input_video(args.input)
    output_dir = Path(args.output_dir)
    data = build_landmarks(video_path, args)
    output_name = "mediapipe_landmarks.json" if data["status"] == "landmarks_detected" else "no_landmark_detected.json"
    write_json(output_dir / output_name, data)
    print(f"wrote {rel(output_dir / output_name)}")


if __name__ == "__main__":
    main()
