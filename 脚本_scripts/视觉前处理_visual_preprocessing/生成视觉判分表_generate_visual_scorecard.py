#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import build_parser, read_json, rel, tool_metadata, write_json


def score_from_confidence(value: float) -> int:
    if value >= 0.68:
        return 3
    if value >= 0.42:
        return 2
    if value > 0:
        return 1
    return 0


def first_item(data: dict[str, Any], key: str) -> dict[str, Any]:
    items = data.get(key) or []
    return items[0] if items else {}


def build_scorecard(output_dir: Path, shot_id: str) -> dict[str, Any]:
    anchor_path = output_dir / "anchor_map.json"
    motion_path = output_dir / "motion_track.json"
    mask_path = output_dir / "mask_plan.json"
    missing = [rel(path) for path in (anchor_path, motion_path, mask_path) if not path.exists()]
    if missing:
        raise FileNotFoundError(f"Required probe JSON missing before scorecard: {missing}")

    anchor = first_item(read_json(anchor_path), "anchors")
    motion = first_item(read_json(motion_path), "tracks")
    mask = first_item(read_json(mask_path), "masks")

    anchor_score = score_from_confidence(float(anchor.get("confidence") or 0))
    motion_score = score_from_confidence(float(motion.get("confidence") or 0))
    mask_score = score_from_confidence(float(mask.get("confidence") or 0))
    caption_score = 2 if anchor.get("safe_caption_zones") else 1
    sticker_score = 2 if anchor.get("contact_points") and anchor.get("edge_lines") else 1

    required_fix: list[str] = []
    if anchor_score < 2:
        required_fix.append("anchor_confidence_low_manual_frame_review_required")
    if motion_score < 2:
        required_fix.append("motion_track_confidence_low_manual_event_binding_required")
    if mask_score < 2:
        required_fix.append("mask_is_simulated_occlusion_only_keep_runtime_review_gate")
    if not required_fix:
        required_fix.append("human_review_required_before_any_full_video_use")

    return {
        "schema_name": "visual_scorecard",
        "schema_version": "0.1.0",
        "metadata": {**tool_metadata(), "source_files": [rel(anchor_path), rel(motion_path), rel(mask_path)]},
        "scorecard": {
            "shot_id": shot_id,
            "caption_reaction_score": caption_score,
            "sticker_specificity_score": sticker_score,
            "anchor_attachment_score": anchor_score,
            "material_occlusion_score": mask_score,
            "motion_event_score": motion_score,
            "pass_fail_reason": "toolchain_probe_ready_pending_human_visual_review"
            if min(anchor_score, motion_score, mask_score) >= 1
            else "probe_signal_too_weak_for_visual_overlay_use",
            "evidence_frames": [
                anchor.get("frame_id", "unknown_anchor_frame"),
                *((point.get("frame_id") for point in motion.get("frame_points", [])[:3] if point.get("frame_id"))),
            ],
            "required_fix": required_fix,
            "review_status": "pending_user_review",
        },
        "claim_boundary": {
            "not_video_fixed": True,
            "not_publish_ready": True,
            "not_stable_visual_understanding": True,
            "not_sam2_segmentation_verified": True,
        },
    }


def main() -> None:
    parser = build_parser("Generate visual_scorecard.json from anchor/motion/mask probe output.")
    args = parser.parse_args()
    output_dir = Path(args.output_dir)
    data = build_scorecard(output_dir, args.shot_id)
    write_json(output_dir / "visual_scorecard.json", data)
    print(f"wrote {rel(output_dir / 'visual_scorecard.json')}")


if __name__ == "__main__":
    main()
