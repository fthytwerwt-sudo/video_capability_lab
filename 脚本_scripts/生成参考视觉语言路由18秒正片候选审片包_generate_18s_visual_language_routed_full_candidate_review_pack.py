#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate"
OUTPUT_VIDEO = OUTPUT_DIR / "参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4"
REVIEW_DIR = ROOT / "tmp/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"
CONTACT_SHEET = REVIEW_DIR / "参考视觉语言路由18秒正片候选_contact_sheet.jpg"
MANIFEST = REVIEW_DIR / "参考视觉语言路由18秒正片候选_review_manifest.json"
EVIDENCE_MAP = REVIEW_DIR / "caption_sticker_evidence_map.json"


BASE_REVIEW_TIMES = [
    {"kind": "base", "id": "start_frame", "second": 0.35, "evidence": "opening hook / caption_01 / sticker_01"},
    {"kind": "base", "id": "mid_frame", "second": 9.20, "evidence": "object breath to fog breath"},
    {"kind": "base", "id": "end_frame", "second": 17.55, "evidence": "shadow close / caption_07"},
]

CAPTION_EVENTS = [
    {"id": "caption_01_sand_hero", "from": 0.18, "duration": 0.70, "text": "先落地"},
    {"id": "caption_02_gym_entry", "from": 1.06, "duration": 0.86, "text": "进场"},
    {"id": "caption_03_action_push", "from": 3.28, "duration": 1.08, "text": "推上去"},
    {"id": "caption_04_machine_line", "from": 5.38, "duration": 0.64, "text": "线条在跑"},
    {"id": "caption_05_cup_breath", "from": 8.18, "duration": 0.85, "text": "缓一口"},
    {"id": "caption_06_fog_whisper", "from": 9.72, "duration": 0.73, "text": "慢一点"},
    {"id": "caption_07_shadow_close", "from": 15.72, "duration": 1.56, "text": "收在影子里"},
]

STICKER_EVENTS = [
    {"id": "sticker_01_sand_edge_wiggle", "from": 0.28, "duration": 0.54, "rendered": True},
    {"id": "sticker_02_entry_caption_tick", "from": 1.18, "duration": 0.64, "rendered": True},
    {"id": "sticker_03_action_contact_flash", "from": 3.48, "duration": 0.60, "rendered": True},
    {"id": "sticker_04_machine_motion_trail", "from": 6.72, "duration": 0.70, "rendered": True},
    {"id": "sticker_05_cup_surface_blocked", "from": 8.26, "duration": 0.70, "rendered": False},
    {"id": "sticker_06_fog_breath_line", "from": 9.82, "duration": 0.76, "rendered": True},
    {"id": "sticker_07_shadow_motion_trail", "from": 12.38, "duration": 0.80, "rendered": True},
]


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nk=1:nw=1",
            str(path),
        ],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return float(result.stdout.strip())


def validate_output() -> float:
    if not OUTPUT_VIDEO.exists():
        raise FileNotFoundError(OUTPUT_VIDEO)
    duration = probe_duration(OUTPUT_VIDEO)
    if not 17.5 <= duration <= 18.5:
        raise ValueError(f"Output duration outside 18s +/- 0.5s: {duration:.3f}")
    return duration


def clean_review_pack() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def frame_second(event: dict[str, Any], phase: str) -> float:
    start = float(event["from"])
    duration = float(event["duration"])
    if phase == "start":
        return start + min(0.06, duration * 0.18)
    if phase == "mid":
        return start + duration * 0.5
    return start + max(0.04, duration - 0.06)


def collect_review_points() -> list[dict[str, Any]]:
    points = list(BASE_REVIEW_TIMES)
    for event in CAPTION_EVENTS:
        for phase in ("start", "mid", "exit"):
            points.append(
                {
                    "kind": "caption",
                    "id": event["id"],
                    "phase": phase,
                    "second": frame_second(event, phase),
                    "evidence": f"{event['id']} / {event['text']} / {phase}",
                }
            )
    for event in STICKER_EVENTS:
        if not event["rendered"]:
            continue
        for phase in ("start", "mid", "exit"):
            points.append(
                {
                    "kind": "sticker",
                    "id": event["id"],
                    "phase": phase,
                    "second": frame_second(event, phase),
                    "evidence": f"{event['id']} / {phase}",
                }
            )
    return points


def safe_name(record: dict[str, Any], index: int) -> str:
    phase = record.get("phase", "frame")
    return f"{index:02d}_{record['kind']}_{record['id']}_{phase}_{record['second']:05.2f}s.jpg"


def extract_review_frames(points: list[dict[str, Any]]) -> list[dict[str, Any]]:
    frame_records: list[dict[str, Any]] = []
    for index, point in enumerate(points, 1):
        second = float(point["second"])
        frame_path = FRAMES_DIR / safe_name(point, index)
        run(
            [
                "ffmpeg",
                "-y",
                "-hide_banner",
                "-loglevel",
                "error",
                "-ss",
                f"{second:.3f}",
                "-i",
                str(OUTPUT_VIDEO),
                "-frames:v",
                "1",
                "-vf",
                "scale=270:-1",
                "-q:v",
                "2",
                str(frame_path),
            ]
        )
        frame_records.append({**point, "path": str(frame_path.relative_to(ROOT))})
    return frame_records


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/PingFang.ttc",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_contact_sheet(frame_records: list[dict[str, Any]]) -> None:
    thumbs = []
    for record in frame_records:
        image = Image.open(ROOT / record["path"]).convert("RGB")
        image.thumbnail((220, 392))
        thumbs.append((image, f"{record['kind']} {record['id']} {record.get('phase', '')}"))

    cols = 5
    cell_w = 260
    cell_h = 460
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h), "white")
    draw = ImageDraw.Draw(sheet)
    font = load_font(16)

    for index, (image, label) in enumerate(thumbs):
        x0 = (index % cols) * cell_w
        y0 = (index // cols) * cell_h
        x = x0 + (cell_w - image.width) // 2
        y = y0 + 10
        sheet.paste(image, (x, y))
        draw.text((x0 + 10, y + image.height + 10), label[:34], fill=(0, 0, 0), font=font)

    sheet.save(CONTACT_SHEET, quality=92)


def write_manifest(duration: float, frame_records: list[dict[str, Any]]) -> None:
    evidence_map = {
        "caption_events": [
            {
                "caption_id": event["id"],
                "text": event["text"],
                "frames": [record for record in frame_records if record.get("id") == event["id"]],
            }
            for event in CAPTION_EVENTS
        ],
        "sticker_events": [
            {
                "sticker_id": event["id"],
                "rendered": event["rendered"],
                "frames": [record for record in frame_records if record.get("id") == event["id"]],
                "non_rendered_reason": "copy_risk_surface_brand_removed" if not event["rendered"] else "",
            }
            for event in STICKER_EVENTS
        ],
    }
    EVIDENCE_MAP.write_text(json.dumps(evidence_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    manifest = {
        "output_video": str(OUTPUT_VIDEO.relative_to(ROOT)),
        "duration_seconds": duration,
        "review_pack": str(REVIEW_DIR.relative_to(ROOT)),
        "contact_sheet": str(CONTACT_SHEET.relative_to(ROOT)),
        "evidence_map": str(EVIDENCE_MAP.relative_to(ROOT)),
        "review_frames": frame_records,
        "required_review_evidence": [
            "start / mid / end frames",
            "every caption event start / mid / exit frame",
            "every rendered sticker event start / mid / exit frame",
            "copy-risk removed sticker event recorded",
            "contact sheet",
            "manifest",
            "caption / sticker evidence map",
        ],
        "content_status": "18s_visual_language_routed_full_candidate_rendered_pending_user_review",
        "runtime_asset_commit_allowed_this_round": False,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    duration = validate_output()
    clean_review_pack()
    points = collect_review_points()
    frame_records = extract_review_frames(points)
    make_contact_sheet(frame_records)
    write_manifest(duration, frame_records)
    print(f"review_pack={REVIEW_DIR}")
    print(f"contact_sheet={CONTACT_SHEET}")
    print(f"evidence_map={EVIDENCE_MAP}")


if __name__ == "__main__":
    main()
