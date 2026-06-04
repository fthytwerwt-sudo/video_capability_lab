#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import (
    bbox_from_points,
    build_parser,
    center_of_bbox,
    import_cv2,
    import_numpy,
    rel,
    resolve_input_video,
    sample_frames,
    tool_metadata,
    video_metadata,
    write_json,
)


def edge_lines_from_frame(frame: Any, max_lines: int = 8) -> tuple[list[dict[str, Any]], Any]:
    cv2 = import_cv2()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edges = cv2.Canny(blurred, 60, 160)
    lines = cv2.HoughLinesP(edges, 1, 3.14159 / 180, threshold=70, minLineLength=55, maxLineGap=18)
    result: list[dict[str, Any]] = []
    if lines is not None:
        for index, line in enumerate(lines[:max_lines]):
            x1, y1, x2, y2 = [int(value) for value in line[0]]
            result.append(
                {
                    "line_id": f"edge_{index:02d}",
                    "start": {"x": x1, "y": y1},
                    "end": {"x": x2, "y": y2},
                    "source_method": "opencv_hough_lines",
                }
            )
    return result, edges


def subject_bbox_from_edges(edges: Any, width: int, height: int) -> dict[str, int]:
    np = import_numpy()
    points = np.column_stack(np.where(edges > 0))
    if points.size == 0:
        return {"x": int(width * 0.15), "y": int(height * 0.2), "width": int(width * 0.7), "height": int(height * 0.55)}
    y_values = points[:, 0]
    x_values = points[:, 1]
    keep = (
        (x_values > width * 0.06)
        & (x_values < width * 0.94)
        & (y_values > height * 0.08)
        & (y_values < height * 0.9)
    )
    filtered = [(float(x), float(y)) for y, x in points[keep]]
    return bbox_from_points(filtered, width, height, padding=22)


def build_anchor_record(video_path: Path, args: Any) -> dict[str, Any]:
    cv2 = import_cv2()
    frames = sample_frames(video_path, args.start, args.duration, args.max_frames)
    meta = video_metadata(video_path)
    width = int(meta["width"])
    height = int(meta["height"])
    mid = frames[len(frames) // 2]
    edge_lines, edges = edge_lines_from_frame(mid["frame"])
    subject_bbox = subject_bbox_from_edges(edges, width, height)
    contact_center = center_of_bbox(subject_bbox)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    edge_preview = output_dir / "opencv_edge_preview.jpg"
    cv2.imwrite(str(edge_preview), edges)

    contact_points = [
        {"point_id": "subject_center", **contact_center, "source_method": "opencv_edge_bbox_center"},
        {
            "point_id": "lower_edge_contact",
            "x": subject_bbox["x"] + subject_bbox["width"] * 0.55,
            "y": subject_bbox["y"] + subject_bbox["height"] * 0.82,
            "source_method": "opencv_edge_bbox_derived",
        },
    ]

    safe_caption_zones = [
        {
            "zone_id": "top_safe_band",
            "bbox": {"x": int(width * 0.08), "y": int(height * 0.07), "width": int(width * 0.84), "height": int(height * 0.16)},
            "reason": "Avoids subject bbox and bottom controls area in vertical probe.",
        },
        {
            "zone_id": "lower_side_safe_band",
            "bbox": {"x": int(width * 0.08), "y": int(height * 0.67), "width": int(width * 0.84), "height": int(height * 0.16)},
            "reason": "Candidate zone for low-weight reaction text when subject bbox permits.",
        },
    ]

    unsafe_overlay_zones = [
        {"zone_id": "subject_bbox", "bbox": subject_bbox, "reason": "Primary visible structure should not be blindly covered."},
    ]

    edge_density = float((edges > 0).sum()) / float(width * height)
    confidence = max(0.2, min(0.82, edge_density * 18))

    return {
        "schema_name": "anchor_map",
        "schema_version": "0.1.0",
        "metadata": {**tool_metadata(), "input_video": rel(video_path), "edge_preview": rel(edge_preview), "video": meta},
        "anchors": [
            {
                "shot_id": args.shot_id,
                "time_range": {"start": args.start, "end": round(args.start + args.duration, 3)},
                "frame_id": mid["frame_id"],
                "subject_bbox": subject_bbox,
                "contact_points": contact_points,
                "edge_lines": edge_lines,
                "motion_direction": "pending_motion_track",
                "safe_caption_zones": safe_caption_zones,
                "unsafe_overlay_zones": unsafe_overlay_zones,
                "confidence": round(confidence, 3),
                "source_method": "opencv",
            }
        ],
    }


def main() -> None:
    parser = build_parser("Generate anchor_map.json from a local probe video with OpenCV edge hints.")
    args = parser.parse_args()
    video_path = resolve_input_video(args.input)
    output_dir = Path(args.output_dir)
    data = build_anchor_record(video_path, args)
    write_json(output_dir / "anchor_map.json", data)
    print(f"wrote {rel(output_dir / 'anchor_map.json')}")


if __name__ == "__main__":
    main()
