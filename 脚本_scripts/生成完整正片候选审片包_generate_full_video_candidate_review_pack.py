#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "dist/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut"
OUTPUT_VIDEO = OUTPUT_DIR / "完整正片候选全流程重剪_full_video_candidate_complete_flow_recut.mp4"
REVIEW_DIR = ROOT / "tmp/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"
CONTACT_SHEET = REVIEW_DIR / "完整正片候选全流程重剪_contact_sheet.jpg"
MANIFEST = REVIEW_DIR / "完整正片候选全流程重剪_review_manifest.json"

REVIEW_TIMES = [
    ("01_start_frame", 0.50, "start frame / opening caption"),
    ("02_opening_caption", 0.92, "caption_text_layer"),
    ("03_action_sticker", 3.82, "sticker_visual_punctuation"),
    ("04_machine_sticker", 7.06, "sticker_visual_punctuation"),
    ("05_mid_frame", 9.00, "mid frame / action reprise"),
    ("06_breath_caption", 10.58, "caption_text_layer"),
    ("07_breath_sticker", 12.04, "sticker_visual_punctuation"),
    ("08_outro_caption", 16.08, "caption_text_layer"),
    ("09_end_frame", 17.55, "end frame"),
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


def validate_output() -> None:
    if not OUTPUT_VIDEO.exists():
        raise FileNotFoundError(OUTPUT_VIDEO)
    duration = probe_duration(OUTPUT_VIDEO)
    if not 17.5 <= duration <= 18.5:
        raise ValueError(f"Output duration outside 18s +/- 0.5s: {duration:.3f}")


def clean_review_pack() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def extract_review_frames() -> list[dict[str, str | float]]:
    frame_records: list[dict[str, str | float]] = []
    for label, second, evidence in REVIEW_TIMES:
        frame_path = FRAMES_DIR / f"{label}_{second:05.2f}s.jpg"
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
        frame_records.append(
            {
                "label": label,
                "second": second,
                "evidence": evidence,
                "path": str(frame_path.relative_to(ROOT)),
            }
        )
    return frame_records


def make_contact_sheet() -> None:
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-pattern_type",
            "glob",
            "-i",
            str(FRAMES_DIR / "*.jpg"),
            "-vf",
            "tile=3x3:padding=16:margin=16:color=white",
            "-q:v",
            "2",
            str(CONTACT_SHEET),
        ]
    )


def write_manifest(frame_records: list[dict[str, str | float]]) -> None:
    manifest = {
        "output_video": str(OUTPUT_VIDEO.relative_to(ROOT)),
        "review_pack": str(REVIEW_DIR.relative_to(ROOT)),
        "contact_sheet": str(CONTACT_SHEET.relative_to(ROOT)),
        "review_frames": frame_records,
        "required_review_evidence": [
            "start frame",
            "mid frame",
            "end frame",
            "key cut frames",
            "sticker / visual punctuation frames",
            "caption / text layer frames",
            "contact sheet",
        ],
        "content_status": "full_video_candidate_rendered_pending_user_review",
        "runtime_asset_commit_allowed_this_round": False,
    }
    MANIFEST.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    validate_output()
    clean_review_pack()
    frame_records = extract_review_frames()
    make_contact_sheet()
    write_manifest(frame_records)
    print(f"review_pack={REVIEW_DIR}")
    print(f"contact_sheet={CONTACT_SHEET}")


if __name__ == "__main__":
    main()
