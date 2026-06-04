#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

VIDEO = (
    ROOT
    / "dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4"
)
PREPROCESS_DIR = ROOT / "tmp/视觉前处理驱动8秒候选_visual_preprocessing_driven_8s_candidate"
REVIEW_DIR = ROOT / "tmp/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"


FRAME_POINTS = [
    {"id": "start_opening", "second": 0.28, "kind": "start", "label": "opening identity"},
    {"id": "caption_opening", "second": 0.72, "kind": "caption", "label": "caption 落地 + opening edge"},
    {"id": "anchor_opening", "second": 1.75, "kind": "anchor", "label": "opening/gym anchor"},
    {"id": "mid_space", "second": 2.85, "kind": "mid", "label": "space bridge"},
    {"id": "caption_contact", "second": 3.72, "kind": "caption", "label": "caption 咔"},
    {"id": "sticker_contact", "second": 4.08, "kind": "sticker", "label": "contact rub sticker"},
    {"id": "mask_texture", "second": 5.58, "kind": "anchor", "label": "machine texture simulated mask"},
    {"id": "motion_trail", "second": 6.95, "kind": "motion", "label": "motion trail"},
    {"id": "end_close", "second": 7.72, "kind": "end", "label": "return close"},
]


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def clean() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


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


def extract_frames() -> list[dict[str, Any]]:
    if not VIDEO.exists():
        raise FileNotFoundError(VIDEO)
    records: list[dict[str, Any]] = []
    for index, point in enumerate(FRAME_POINTS, start=1):
        frame_path = FRAMES_DIR / f"{index:02d}_{point['kind']}_{point['id']}_{point['second']:.2f}s.jpg"
        run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f"{point['second']:.3f}",
                "-i",
                str(VIDEO),
                "-frames:v",
                "1",
                "-vf",
                "scale=270:-1",
                "-q:v",
                "2",
                str(frame_path),
            ]
        )
        records.append({**point, "path": rel(frame_path)})
    return records


def build_contact_sheet(records: list[dict[str, Any]]) -> Path:
    font = load_font(21)
    label_font = load_font(16)
    images = [Image.open(ROOT / record["path"]).convert("RGB") for record in records]
    cell_w, cell_h = 360, 690
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 3), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    for index, image in enumerate(images):
        x = (index % 3) * cell_w
        y = (index // 3) * cell_h
        image.thumbnail((cell_w - 28, cell_h - 120))
        sheet.paste(image, (x + (cell_w - image.width) // 2, y + 20))
        record = records[index]
        draw.text((x + 18, y + cell_h - 84), str(record["id"]), fill=(22, 22, 22), font=font)
        draw.text((x + 18, y + cell_h - 54), f"{record['second']:.2f}s {record['label']}", fill=(74, 74, 70), font=label_font)
    path = REVIEW_DIR / "视觉前处理驱动8秒字幕贴纸候选_contact_sheet.jpg"
    sheet.save(path, quality=92)
    return path


def copy_runtime_json() -> dict[str, str]:
    copied: dict[str, str] = {}
    for name in [
        "anchor_map.json",
        "motion_track.json",
        "mask_plan.json",
        "visual_scorecard.json",
        "visual_preprocessing_report.json",
        "edge_preview.jpg",
        "motion_mask_preview.jpg",
    ]:
        source = PREPROCESS_DIR / name
        if not source.exists():
            raise FileNotFoundError(source)
        target = REVIEW_DIR / name
        shutil.copyfile(source, target)
        copied[name] = rel(target)
    return copied


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    clean()
    copied = copy_runtime_json()
    records = extract_frames()
    contact_sheet = build_contact_sheet(records)

    caption_map = {
        "caption_01_opening": {"frames": ["caption_opening"], "anchor_from": "anchor_opening_identity", "review_focus": "字幕是否贴在开场 texture / gym identity 关系上。"},
        "caption_02_entry": {"frames": ["anchor_opening"], "anchor_from": "anchor_opening_identity", "review_focus": "字幕是否像入场反应，而不是固定下三分之一字幕。"},
        "caption_03_contact": {"frames": ["caption_contact", "sticker_contact"], "anchor_from": "anchor_action_machine", "review_focus": "拟声是否跟动作接触窗口相关。"},
        "caption_04_line_return": {"frames": ["motion_trail", "end_close"], "anchor_from": "anchor_action_machine", "review_focus": "收束字幕是否顺着机器线条，不抢画面。"},
    }
    sticker_map = {
        "sticker_01_opening_edge_scuff": {"frames": ["caption_opening"], "anchor_from": "anchor_opening_identity", "motion_from": "opencv_lk_median_feature_track_01"},
        "sticker_02_contact_rub": {"frames": ["sticker_contact"], "anchor_from": "anchor_action_machine", "motion_from": "opencv_lk_median_feature_track_01"},
        "sticker_03_machine_motion_trail": {"frames": ["motion_trail"], "anchor_from": "anchor_action_machine", "motion_from": "opencv_lk_median_feature_track_01"},
    }
    preprocessing_map = {
        "anchor_evidence": ["anchor_opening", "mask_texture"],
        "motion_evidence": ["motion_trail"],
        "mask_evidence": ["mask_texture"],
        "mask_boundary": "mask_plan is simulated_occlusion_only; do not claim real occlusion passed.",
        "runtime_json": copied,
    }

    write_json(REVIEW_DIR / "caption_sticker_evidence_map.json", {"caption_events": caption_map, "sticker_events": sticker_map})
    write_json(REVIEW_DIR / "visual_preprocessing_evidence_map.json", preprocessing_map)
    write_json(
        REVIEW_DIR / "review_manifest.json",
        {
            "status": "review_pack_generated",
            "video": rel(VIDEO),
            "contact_sheet": rel(contact_sheet),
            "frames": records,
            "runtime_json": copied,
            "claim_boundary": {
                "not_full_18s_video": True,
                "not_publish_ready": True,
                "not_video_fixed": True,
                "not_vlog_director_capability_verified": True,
                "not_real_occlusion_passed": True,
            },
        },
    )
    print(f"wrote {rel(REVIEW_DIR / 'review_manifest.json')}")
    print(f"wrote {rel(contact_sheet)}")


if __name__ == "__main__":
    main()
