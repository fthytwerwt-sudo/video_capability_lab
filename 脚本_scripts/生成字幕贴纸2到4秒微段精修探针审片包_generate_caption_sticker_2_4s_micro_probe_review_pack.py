#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

BEFORE_VIDEO = (
    ROOT
    / "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4"
)
AFTER_VIDEO = (
    ROOT
    / "dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4"
)
REVIEW_DIR = ROOT / "tmp/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"
BEFORE_CONTACT_SHEET = REVIEW_DIR / "before_contact_sheet.jpg"
AFTER_CONTACT_SHEET = REVIEW_DIR / "after_contact_sheet.jpg"
COMPARISON_CONTACT_SHEET = REVIEW_DIR / "before_after_contact_sheet.jpg"
MANIFEST = REVIEW_DIR / "probe_manifest.json"
EVIDENCE_MAP = REVIEW_DIR / "caption_sticker_evidence_map.json"


BEFORE_REVIEW_POINTS = [
    {
        "kind": "before",
        "id": "before_caption_start",
        "second": 3.34,
        "phase": "start",
        "evidence": "原 18s 候选 caption_03_action_push 开始读出。",
    },
    {
        "kind": "before",
        "id": "before_contact_flash_start",
        "second": 3.54,
        "phase": "start",
        "evidence": "原 18s 候选 contact flash 入场。",
    },
    {
        "kind": "before",
        "id": "before_contact_flash_mid",
        "second": 3.78,
        "phase": "mid",
        "evidence": "原 contact flash 对称 burst 最清楚的帧。",
    },
    {
        "kind": "before",
        "id": "before_contact_flash_exit",
        "second": 4.04,
        "phase": "exit",
        "evidence": "原 contact flash 退出，检查看是否像通用组件。",
    },
    {
        "kind": "before",
        "id": "before_texture_exit",
        "second": 5.70,
        "phase": "texture",
        "evidence": "原 M06 金属纹理出口，只有 caption-only 处理。",
    },
]

AFTER_REVIEW_POINTS = [
    {
        "kind": "after",
        "id": "after_probe_start",
        "second": 0.14,
        "phase": "start",
        "evidence": "微段探针动作窗口开始。",
    },
    {
        "kind": "after",
        "id": "after_caption_start",
        "second": 0.26,
        "phase": "caption_start",
        "evidence": "micro_caption_01_contact_reaction 入场。",
    },
    {
        "kind": "after",
        "id": "after_sticker_start",
        "second": 0.36,
        "phase": "sticker_start",
        "evidence": "micro_sticker_01_contact_pressure_burst 入场。",
    },
    {
        "kind": "after",
        "id": "after_caption_sticker_mid",
        "second": 0.78,
        "phase": "mid",
        "evidence": "caption/sticker 共享动作锚点最清楚的帧。",
    },
    {
        "kind": "after",
        "id": "after_sticker_exit",
        "second": 1.30,
        "phase": "sticker_exit",
        "evidence": "pressure burst 退出，检查是否在切 M06 前收干净。",
    },
    {
        "kind": "after",
        "id": "after_caption_exit",
        "second": 1.44,
        "phase": "caption_exit",
        "evidence": "caption/tail 退出，检查是否压动作尾部。",
    },
    {
        "kind": "after",
        "id": "after_texture_residual",
        "second": 2.08,
        "phase": "texture_residual",
        "evidence": "M06 中低权重 residual drag 帧。",
    },
    {
        "kind": "after",
        "id": "after_end",
        "second": 2.86,
        "phase": "end",
        "evidence": "微段探针尾帧，检查结尾是否干净。",
    },
]


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def probe_json(path: Path) -> dict[str, Any]:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_format",
            "-show_streams",
            "-of",
            "json",
            str(path),
        ],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return json.loads(result.stdout)


def probe_duration(path: Path) -> float:
    data = probe_json(path)
    return float(data["format"]["duration"])


def validate_inputs() -> tuple[float, float]:
    if not BEFORE_VIDEO.exists():
        raise FileNotFoundError(BEFORE_VIDEO)
    if not AFTER_VIDEO.exists():
        raise FileNotFoundError(AFTER_VIDEO)
    before_duration = probe_duration(BEFORE_VIDEO)
    after_duration = probe_duration(AFTER_VIDEO)
    if not 17.5 <= before_duration <= 18.5:
        raise ValueError(f"Before candidate duration outside 18s +/- 0.5s: {before_duration:.3f}")
    if not 2 <= after_duration <= 4:
        raise ValueError(f"Micro probe duration outside 2-4s: {after_duration:.3f}")
    return before_duration, after_duration


def clean_review_pack() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def safe_name(record: dict[str, Any], index: int) -> str:
    return (
        f"{index:02d}_{record['kind']}_{record['id']}_{record['phase']}_"
        f"{float(record['second']):05.2f}s.jpg"
    )


def extract_frame(video: Path, record: dict[str, Any], index: int) -> dict[str, Any]:
    frame_path = FRAMES_DIR / safe_name(record, index)
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{float(record['second']):.3f}",
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
    return {**record, "path": str(frame_path.relative_to(ROOT))}


def extract_review_frames() -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    before_records = [
        extract_frame(BEFORE_VIDEO, record, index)
        for index, record in enumerate(BEFORE_REVIEW_POINTS, 1)
    ]
    after_records = [
        extract_frame(AFTER_VIDEO, record, index)
        for index, record in enumerate(AFTER_REVIEW_POINTS, len(before_records) + 1)
    ]
    return before_records, after_records


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_contact_sheet(records: list[dict[str, Any]], output: Path, title: str) -> None:
    cols = min(4, max(1, len(records)))
    cell_w = 300
    cell_h = 470
    header_h = 54
    rows = (len(records) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h + header_h), "white")
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(22)
    label_font = load_font(15)
    draw.text((14, 14), title, fill=(0, 0, 0), font=title_font)

    for index, record in enumerate(records):
        image = Image.open(ROOT / record["path"]).convert("RGB")
        image.thumbnail((270, 392))
        x0 = (index % cols) * cell_w
        y0 = (index // cols) * cell_h + header_h
        x = x0 + (cell_w - image.width) // 2
        y = y0 + 8
        sheet.paste(image, (x, y))
        label = f"{record['id']} {record['phase']} {float(record['second']):.2f}s"
        draw.text((x0 + 10, y + image.height + 10), label[:38], fill=(0, 0, 0), font=label_font)
        draw.text((x0 + 10, y + image.height + 31), record["evidence"][:34], fill=(60, 60, 60), font=label_font)

    sheet.save(output, quality=92)


def make_comparison_sheet(before_records: list[dict[str, Any]], after_records: list[dict[str, Any]]) -> None:
    pairs = [
        ("start", before_records[0], after_records[1]),
        ("sticker_mid", before_records[2], after_records[3]),
        ("exit", before_records[3], after_records[4]),
        ("texture", before_records[4], after_records[6]),
    ]
    cell_w = 300
    cell_h = 458
    header_h = 64
    cols = 2
    rows = len(pairs)
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h + header_h), "white")
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(22)
    label_font = load_font(16)
    draw.text((14, 12), "before / after caption-sticker micro probe", fill=(0, 0, 0), font=title_font)
    draw.text((78, 40), "before", fill=(40, 40, 40), font=label_font)
    draw.text((cell_w + 78, 40), "after", fill=(40, 40, 40), font=label_font)

    for row, (label, before, after) in enumerate(pairs):
        for col, record in enumerate((before, after)):
            image = Image.open(ROOT / record["path"]).convert("RGB")
            image.thumbnail((270, 392))
            x0 = col * cell_w
            y0 = row * cell_h + header_h
            x = x0 + (cell_w - image.width) // 2
            y = y0 + 10
            sheet.paste(image, (x, y))
            draw.text(
                (x0 + 10, y + image.height + 10),
                f"{label}: {record['id']}",
                fill=(0, 0, 0),
                font=label_font,
            )
            draw.text(
                (x0 + 10, y + image.height + 32),
                record["evidence"][:34],
                fill=(64, 64, 64),
                font=label_font,
            )

    sheet.save(COMPARISON_CONTACT_SHEET, quality=92)


def write_manifest(
    before_duration: float,
    after_duration: float,
    before_records: list[dict[str, Any]],
    after_records: list[dict[str, Any]],
) -> None:
    evidence_map = {
        "micro_probe_scope": "this_is_partial_probe_not_full_video_candidate",
        "selected_window": {
            "original_candidate_time_range": "3.15-6.15s",
            "duration_seconds": 3,
            "source_segments": ["M03 0.35-2.25s", "M06 0.70-1.80s"],
        },
        "before_evidence": {
            "video": str(BEFORE_VIDEO.relative_to(ROOT)),
            "frames": before_records,
        },
        "after_evidence": {
            "video": str(AFTER_VIDEO.relative_to(ROOT)),
            "frames": after_records,
        },
        "caption_event": {
            "caption_id": "micro_caption_01_contact_reaction",
            "text": "顶一下",
            "text_status": "draft_text_pending_user_review",
            "analysis_asset_ids": [27, 35, 37, 50, 53, 59],
            "reference_rule_links": [
                "55:H.caption_01",
                "55:H.caption_02",
                "56:E.caption_branch_01_hero_keyword",
                "56:E.caption_branch_02_attached_phrase",
                "56:G.caption_sticker_conflict_resolver",
            ],
            "copy_risk_check": "原创短句；待用户人审。",
            "template_fallback": False,
        },
        "sticker_events": [
            {
                "sticker_id": "micro_sticker_01_contact_pressure_burst",
                "analysis_asset_ids": [40, 41, 44, 50, 53, 59],
                "reference_rule_links": [
                    "55:D.sticker_type_03",
                    "55:E.attach_02",
                    "55:F.shape_02",
                    "56:F.sticker_branch_03_contact",
                ],
                "copy_risk_check": "原创 SVG/CSS 形状，无第三方贴纸或参考贴纸复制。",
                "template_fallback": False,
            },
            {
                "sticker_id": "micro_sticker_02_caption_tail_tick",
                "analysis_asset_ids": [21, 44, 50, 53, 59],
                "reference_rule_links": [
                    "55:D.sticker_type_02",
                    "55:E.attach_08",
                    "55:F.shape_08",
                    "56:F.sticker_branch_02_hand_drawn_hybrid",
                ],
                "copy_risk_check": "原创手绘尾巴，不复制参考字体或第三方贴纸。",
                "template_fallback": False,
            },
            {
                "sticker_id": "micro_sticker_03_texture_residual_drag",
                "analysis_asset_ids": [44, 47, 50, 53, 59],
                "reference_rule_links": [
                    "55:D.sticker_type_04",
                    "55:E.attach_03",
                    "55:F.shape_03",
                    "56:F.sticker_branch_04_motion",
                ],
                "copy_risk_check": "原创低权重线条，无参考复制。",
                "template_fallback": False,
            },
        ],
    }
    EVIDENCE_MAP.write_text(json.dumps(evidence_map, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    manifest = {
        "status": "caption_sticker_2_4s_micro_probe_review_pack_generated",
        "before_video": str(BEFORE_VIDEO.relative_to(ROOT)),
        "after_video": str(AFTER_VIDEO.relative_to(ROOT)),
        "before_duration_seconds": before_duration,
        "after_duration_seconds": after_duration,
        "review_pack": str(REVIEW_DIR.relative_to(ROOT)),
        "before_contact_sheet": str(BEFORE_CONTACT_SHEET.relative_to(ROOT)),
        "after_contact_sheet": str(AFTER_CONTACT_SHEET.relative_to(ROOT)),
        "comparison_contact_sheet": str(COMPARISON_CONTACT_SHEET.relative_to(ROOT)),
        "evidence_map": str(EVIDENCE_MAP.relative_to(ROOT)),
        "frames": before_records + after_records,
        "required_review_evidence": [
            "before frames from current 18s candidate",
            "after start / mid / end frames from micro probe",
            "caption event start / mid / exit frames",
            "sticker event start / mid / exit frames",
            "before / after contact sheet",
            "manifest",
            "caption / sticker evidence map",
        ],
        "content_status": "caption_sticker_2_4s_micro_probe_rendered_pending_user_review",
        "this_is_partial_probe_not_full_video_candidate": True,
        "publish_ready_claim": False,
        "capability_verified_claim": False,
        "runtime_asset_commit_allowed_this_round": False,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    before_duration, after_duration = validate_inputs()
    clean_review_pack()
    before_records, after_records = extract_review_frames()
    make_contact_sheet(before_records, BEFORE_CONTACT_SHEET, "before: current 18s candidate window 3.15-6.15s")
    make_contact_sheet(after_records, AFTER_CONTACT_SHEET, "after: 2-4s caption/sticker micro probe")
    make_comparison_sheet(before_records, after_records)
    write_manifest(before_duration, after_duration, before_records, after_records)
    print(f"review_pack={REVIEW_DIR.relative_to(ROOT)}")
    print(f"manifest={MANIFEST.relative_to(ROOT)}")
    print(f"evidence_map={EVIDENCE_MAP.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
