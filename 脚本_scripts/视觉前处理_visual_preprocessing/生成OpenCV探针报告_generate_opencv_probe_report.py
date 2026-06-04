#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import build_parser, read_json, rel, tool_metadata, write_json


def first(data: dict[str, Any], key: str) -> dict[str, Any]:
    values = data.get(key) or []
    return values[0] if values else {}


def build_report(output_dir: Path) -> dict[str, Any]:
    anchor_path = output_dir / "anchor_map.json"
    motion_path = output_dir / "motion_track.json"
    mask_path = output_dir / "mask_plan.json"
    missing = [rel(path) for path in (anchor_path, motion_path, mask_path) if not path.exists()]
    if missing:
        raise FileNotFoundError(f"OpenCV probe prerequisites missing: {missing}")

    anchor_data = read_json(anchor_path)
    motion_data = read_json(motion_path)
    mask_data = read_json(mask_path)
    anchor = first(anchor_data, "anchors")
    motion = first(motion_data, "tracks")
    mask = first(mask_data, "masks")

    return {
        "schema_name": "opencv_probe_report",
        "schema_version": "0.1.0",
        "metadata": {
            **tool_metadata(),
            "source_files": [rel(anchor_path), rel(motion_path), rel(mask_path)],
            "edge_preview": anchor_data.get("metadata", {}).get("edge_preview"),
            "motion_mask_preview": mask_data.get("metadata", {}).get("mask_preview"),
        },
        "status": "opencv_probe_completed",
        "checks": {
            "edge_preview_written": bool(anchor_data.get("metadata", {}).get("edge_preview")),
            "anchor_map_written": bool(anchor),
            "motion_track_written": bool(motion),
            "mask_plan_written": bool(mask),
            "feature_track_failure_frames": motion.get("failure_frames", []),
        },
        "summary": {
            "anchor_confidence": anchor.get("confidence"),
            "motion_confidence": motion.get("confidence"),
            "motion_direction": motion.get("direction"),
            "mask_confidence": mask.get("confidence"),
            "simulated_occlusion_only": mask.get("simulated_occlusion_only"),
        },
        "claim_boundary": {
            "not_stable_visual_understanding": True,
            "not_human_review": True,
            "not_video_fixed": True,
        },
    }


def main() -> None:
    parser = build_parser("Generate an OpenCV probe report from anchor/motion/mask outputs.")
    args = parser.parse_args()
    output_dir = Path(args.output_dir)
    path = output_dir / "opencv_probe_report.json"
    write_json(path, build_report(output_dir))
    print(f"wrote {rel(path)}")


if __name__ == "__main__":
    main()
