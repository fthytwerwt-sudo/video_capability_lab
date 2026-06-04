#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import (
    bbox_from_points,
    build_parser,
    import_cv2,
    import_numpy,
    read_json,
    rel,
    resolve_input_video,
    sample_frames,
    tool_metadata,
    video_metadata,
    write_json,
)


def load_anchor_bbox(output_dir: Path) -> dict[str, int] | None:
    path = output_dir / "anchor_map.json"
    if not path.exists():
        return None
    data = read_json(path)
    anchors = data.get("anchors") or []
    if not anchors:
        return None
    bbox = anchors[0].get("subject_bbox")
    if isinstance(bbox, dict):
        return bbox
    return None


def build_mask_plan(video_path: Path, args: Any) -> dict[str, Any]:
    cv2 = import_cv2()
    np = import_numpy()
    frames = sample_frames(video_path, args.start, args.duration, args.max_frames)
    meta = video_metadata(video_path)
    width = int(meta["width"])
    height = int(meta["height"])
    output_dir = Path(args.output_dir)

    first_gray = cv2.cvtColor(frames[0]["frame"], cv2.COLOR_BGR2GRAY)
    last_gray = cv2.cvtColor(frames[-1]["frame"], cv2.COLOR_BGR2GRAY)
    diff = cv2.absdiff(first_gray, last_gray)
    _threshold, mask = cv2.threshold(diff, 22, 255, cv2.THRESH_BINARY)
    kernel = np.ones((7, 7), np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    motion_points_raw = np.column_stack(np.where(mask > 0))
    motion_points = [(float(x), float(y)) for y, x in motion_points_raw]
    motion_bbox = bbox_from_points(motion_points, width, height, padding=28)

    anchor_bbox = load_anchor_bbox(output_dir) or motion_bbox
    overlay_allowed_regions = [
        {
            "region_id": "upper_caption_safe",
            "bbox": {"x": int(width * 0.08), "y": int(height * 0.07), "width": int(width * 0.84), "height": int(height * 0.16)},
            "reason": "Caption can start here when anchor bbox is not covered.",
        },
        {
            "region_id": "edge_punctuation_band",
            "bbox": {"x": max(0, anchor_bbox["x"] - 60), "y": anchor_bbox["y"], "width": min(width, anchor_bbox["width"] + 120), "height": anchor_bbox["height"]},
            "reason": "Visual punctuation may attach around detected edge bbox with review required.",
        },
    ]

    preview_path = output_dir / "opencv_motion_mask_preview.jpg"
    cv2.imwrite(str(preview_path), mask)
    motion_ratio = float((mask > 0).sum()) / float(width * height)

    return {
        "schema_name": "mask_plan",
        "schema_version": "0.1.0",
        "metadata": {**tool_metadata(), "input_video": rel(video_path), "mask_preview": rel(preview_path), "video": meta},
        "masks": [
            {
                "mask_id": "opencv_motion_diff_mask_01",
                "time_range": {"start": args.start, "end": round(args.start + args.duration, 3)},
                "foreground_regions": [{"region_id": "motion_foreground_bbox", "bbox": motion_bbox}],
                "occlusion_regions": [{"region_id": "anchor_subject_bbox", "bbox": anchor_bbox}],
                "overlay_allowed_regions": overlay_allowed_regions,
                "simulated_occlusion_only": True,
                "mask_source": "opencv_frame_difference_no_pixel_matting",
                "confidence": round(max(0.18, min(0.72, motion_ratio * 20)), 3),
            }
        ],
    }


def main() -> None:
    parser = build_parser("Generate mask_plan.json from lightweight OpenCV frame differences.")
    args = parser.parse_args()
    video_path = resolve_input_video(args.input)
    output_dir = Path(args.output_dir)
    data = build_mask_plan(video_path, args)
    write_json(output_dir / "mask_plan.json", data)
    print(f"wrote {rel(output_dir / 'mask_plan.json')}")


if __name__ == "__main__":
    main()
