#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import math
import platform
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]

DEFAULT_INPUT_CANDIDATES = [
    ROOT
    / "dist/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.mp4",
    ROOT
    / "dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4",
    ROOT
    / "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4",
]

DEFAULT_OUTPUT_DIR = ROOT / "tmp/视觉前处理探针_visual_preprocessing_probe"


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def resolve_input_video(value: str | None) -> Path:
    if value:
        path = Path(value)
        if not path.is_absolute():
            path = ROOT / path
        if not path.exists():
            raise FileNotFoundError(path)
        return path

    for candidate in DEFAULT_INPUT_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("No default 2-4s probe video found under dist/. Render a probe first or pass --input.")


def build_parser(description: str) -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--input", help="Input probe video. Defaults to the latest 2-4s probe in dist/.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Runtime output directory under tmp/.")
    parser.add_argument("--shot-id", default="visual_preprocessing_probe_2_4s", help="Shot id written into JSON.")
    parser.add_argument("--start", type=float, default=0.0, help="Start second inside the input video.")
    parser.add_argument("--duration", type=float, default=3.0, help="Duration in seconds to inspect.")
    parser.add_argument("--max-frames", type=int, default=8, help="Maximum sampled frames.")
    return parser


def import_cv2():
    try:
        import cv2  # type: ignore
    except Exception as exc:  # pragma: no cover - runtime probe path
        raise RuntimeError(f"OpenCV import failed: {exc}") from exc
    return cv2


def import_numpy():
    try:
        import numpy as np  # type: ignore
    except Exception as exc:  # pragma: no cover - runtime probe path
        raise RuntimeError(f"numpy import failed: {exc}") from exc
    return np


def video_metadata(video_path: Path) -> dict[str, Any]:
    cv2 = import_cv2()
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        raise RuntimeError(f"Unable to open input video: {video_path}")
    fps = float(cap.get(cv2.CAP_PROP_FPS) or 30)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    duration = frame_count / fps if fps else 0
    cap.release()
    return {
        "path": rel(video_path),
        "fps": fps,
        "frame_count": frame_count,
        "width": width,
        "height": height,
        "duration": duration,
    }


def sample_frames(video_path: Path, start: float, duration: float, max_frames: int) -> list[dict[str, Any]]:
    cv2 = import_cv2()
    np = import_numpy()
    meta = video_metadata(video_path)
    fps = float(meta["fps"] or 30)
    video_duration = float(meta["duration"] or 0)
    start = max(0.0, min(start, max(video_duration - 0.01, 0.0)))
    end = min(video_duration, start + max(0.1, duration))
    count = max(2, max_frames)
    if end <= start:
        end = min(video_duration, start + 0.1)
    times = np.linspace(start, max(start, end - (1 / fps)), num=count)

    cap = cv2.VideoCapture(str(video_path))
    frames: list[dict[str, Any]] = []
    for index, second in enumerate(times):
        frame_number = int(round(float(second) * fps))
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        ok, frame = cap.read()
        if not ok or frame is None:
            continue
        frames.append(
            {
                "index": index,
                "frame_id": f"f{frame_number:05d}",
                "frame_number": frame_number,
                "second": round(float(second), 3),
                "frame": frame,
            }
        )
    cap.release()
    if len(frames) < 2:
        raise RuntimeError("Fewer than two frames could be sampled from input video.")
    return frames


def bbox_from_points(points: list[tuple[float, float]], width: int, height: int, padding: int = 18) -> dict[str, int]:
    if not points:
        return {"x": 0, "y": 0, "width": width, "height": height}
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    x0 = max(0, int(min(xs) - padding))
    y0 = max(0, int(min(ys) - padding))
    x1 = min(width, int(max(xs) + padding))
    y1 = min(height, int(max(ys) + padding))
    return {"x": x0, "y": y0, "width": max(1, x1 - x0), "height": max(1, y1 - y0)}


def center_of_bbox(bbox: dict[str, int]) -> dict[str, float]:
    return {"x": bbox["x"] + bbox["width"] / 2, "y": bbox["y"] + bbox["height"] / 2}


def direction_from_delta(dx: float, dy: float) -> str:
    if abs(dx) < 1 and abs(dy) < 1:
        return "stable"
    horizontal = "right" if dx > 0 else "left"
    vertical = "down" if dy > 0 else "up"
    if abs(dx) > abs(dy) * 1.6:
        return horizontal
    if abs(dy) > abs(dx) * 1.6:
        return vertical
    return f"{vertical}_{horizontal}"


def velocity_from_points(points: list[dict[str, float]]) -> dict[str, float]:
    if len(points) < 2:
        return {"x": 0.0, "y": 0.0, "magnitude": 0.0}
    first = points[0]
    last = points[-1]
    elapsed = max(0.001, float(last["second"]) - float(first["second"]))
    vx = (float(last["x"]) - float(first["x"])) / elapsed
    vy = (float(last["y"]) - float(first["y"])) / elapsed
    return {"x": round(vx, 3), "y": round(vy, 3), "magnitude": round(math.hypot(vx, vy), 3)}


def tool_metadata() -> dict[str, Any]:
    return {
        "created_at": now_iso(),
        "python": sys.version.split()[0],
        "platform": platform.platform(),
        "runtime_output_policy": "tmp_only_not_for_git_commit",
        "claim_boundary": "probe_output_not_stable_visual_understanding",
    }
