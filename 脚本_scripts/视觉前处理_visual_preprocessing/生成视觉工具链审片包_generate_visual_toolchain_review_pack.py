#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
PROBE_DIR = ROOT / "tmp/视觉前处理探针_visual_preprocessing_probe"
REVIEW_DIR = ROOT / "tmp/视觉工具链补强审片包_visual_toolchain_upgrade_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"

PLUGIN_SMOKE_VIDEO = (
    ROOT
    / "dist/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe.mp4"
)
VISUAL_PREPROCESSING_VIDEO = (
    ROOT
    / "dist/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe.mp4"
)


FRAME_POINTS = [
    {"lane": "plugin_smoke", "second": 0.25, "label": "paths/effects entry"},
    {"lane": "plugin_smoke", "second": 1.35, "label": "Trail and path motion"},
    {"lane": "plugin_smoke", "second": 2.55, "label": "effects exit"},
    {"lane": "visual_preprocessing", "second": 0.35, "label": "anchor caption entry"},
    {"lane": "visual_preprocessing", "second": 1.35, "label": "motion track trail"},
    {"lane": "visual_preprocessing", "second": 2.65, "label": "mask/material finish"},
]


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def read_json(path: Path) -> Any:
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def clean() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def video_for_lane(lane: str) -> Path:
    if lane == "plugin_smoke":
        return PLUGIN_SMOKE_VIDEO
    if lane == "visual_preprocessing":
        return VISUAL_PREPROCESSING_VIDEO
    raise ValueError(lane)


def extract_frames() -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for index, point in enumerate(FRAME_POINTS, start=1):
        video = video_for_lane(str(point["lane"]))
        if not video.exists():
            raise FileNotFoundError(video)
        frame_path = FRAMES_DIR / f"{index:02d}_{point['lane']}_{point['second']:.2f}s.jpg"
        run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f"{float(point['second']):.3f}",
                "-i",
                str(video),
                "-frames:v",
                "1",
                "-vf",
                "scale=270:-1",
                "-q:v",
                "2",
                str(frame_path),
            ]
        )
        records.append({**point, "path": rel(frame_path), "source_video": rel(video)})
    return records


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def build_contact_sheet(records: list[dict[str, Any]]) -> Path:
    font = load_font(22)
    label_font = load_font(18)
    images = [Image.open(ROOT / record["path"]).convert("RGB") for record in records]
    cell_w, cell_h = 360, 720
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 2), (245, 245, 242))
    draw = ImageDraw.Draw(sheet)
    for index, image in enumerate(images):
        x = (index % 3) * cell_w
        y = (index // 3) * cell_h
        image.thumbnail((cell_w - 28, cell_h - 120))
        sheet.paste(image, (x + (cell_w - image.width) // 2, y + 24))
        record = records[index]
        draw.text((x + 18, y + cell_h - 86), str(record["lane"]), fill=(20, 20, 20), font=font)
        draw.text((x + 18, y + cell_h - 56), f"{record['second']:.2f}s {record['label']}", fill=(70, 70, 70), font=label_font)
    path = REVIEW_DIR / "视觉工具链补强_contact_sheet.jpg"
    sheet.save(path, quality=92)
    return path


def main() -> None:
    clean()
    records = extract_frames()
    sheet = build_contact_sheet(records)
    manifest = {
        "status": "review_pack_generated",
        "claim_boundary": "technical_review_pack_only_pending_user_visual_review",
        "videos": {
            "plugin_smoke_probe": rel(PLUGIN_SMOKE_VIDEO),
            "visual_preprocessing_driven_probe": rel(VISUAL_PREPROCESSING_VIDEO),
        },
        "probe_json": {
            "anchor_map": rel(PROBE_DIR / "anchor_map.json"),
            "motion_track": rel(PROBE_DIR / "motion_track.json"),
            "mask_plan": rel(PROBE_DIR / "mask_plan.json"),
            "visual_scorecard": rel(PROBE_DIR / "visual_scorecard.json"),
            "opencv_probe_report": rel(PROBE_DIR / "opencv_probe_report.json"),
            "visual_tool_env_check": rel(PROBE_DIR / "visual_tool_env_check.json"),
            "sam2_env_probe": rel(PROBE_DIR / "sam2_env_probe.json"),
            "mediapipe_landmarks_or_empty": rel(PROBE_DIR / "mediapipe_landmarks.json")
            if (PROBE_DIR / "mediapipe_landmarks.json").exists()
            else rel(PROBE_DIR / "no_landmark_detected.json"),
        },
        "frames": records,
        "contact_sheet": rel(sheet),
        "runtime_assets_not_for_git": True,
    }
    manifest_path = REVIEW_DIR / "review_manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {rel(manifest_path)}")
    print(f"wrote {rel(sheet)}")


if __name__ == "__main__":
    main()
