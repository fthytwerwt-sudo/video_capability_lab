#!/usr/bin/env python3
"""Build the selected sticker options start/mid/exit review sheet.

This script only composes local Remotion still frames into a JPEG review sheet.
It does not call image, video, or audio generation APIs.
"""

from __future__ import annotations

import argparse
from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageFont


PHASES = ("start", "mid", "exit")

OPTIONS = [
    {
        "option_id": "shot_05_option_A",
        "source_event_id": "shot_05_panda_bite_tag",
        "attachment": "contact_point_attached",
        "shape": "contact_spark",
        "status": "partial_pass_candidate",
        "note": "优先看咬合触点是否替代矩形纸签。",
    },
    {
        "option_id": "shot_03_option_A",
        "source_event_id": "shot_03_bamboo_hide_circle",
        "attachment": "reveal_boundary_attached",
        "shape": "half_ring_peek_mark",
        "status": "partial_pass_candidate",
        "note": "A/B 独立显示：只判断半环是否附着显露边界。",
    },
    {
        "option_id": "shot_03_option_B",
        "source_event_id": "shot_03_bamboo_hide_circle",
        "attachment": "edge_attached",
        "shape": "short_stroke_cluster",
        "status": "partial_pass_candidate",
        "note": "A/B 独立显示：只判断短笔触是否贴着叶缘/脸缘。",
    },
    {
        "option_id": "shot_01_option_B",
        "source_event_id": "shot_01_panda_open_arrow",
        "attachment": "contact_point_attached",
        "shape": "contact_spark",
        "status": "partial_pass_candidate",
        "note": "看触点反应是否能替代标准箭头。",
    },
]


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    ]

    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size, index=1 if bold else 0)

    return ImageFont.load_default()


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    width_chars: int,
    line_gap: int = 6,
) -> int:
    x, y = xy
    for line in wrap(text, width=width_chars):
        draw.text((x, y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, y), line, font=font)
        y += bbox[3] - bbox[1] + line_gap
    return y


def add_label(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    label: str,
    font: ImageFont.ImageFont,
) -> None:
    x1, y1, x2, y2 = box
    draw.rounded_rectangle((x1, y1, x2, y2), radius=18, fill=(28, 32, 24, 218))
    draw.text((x1 + 16, y1 + 11), label, font=font, fill=(255, 246, 216))


def compose_sheet(frames_dir: Path, output: Path) -> None:
    thumb_w = 324
    thumb_h = 576
    left_w = 470
    gap = 26
    top_h = 148
    row_h = 668
    bottom_pad = 38
    width = left_w + gap + len(PHASES) * thumb_w + (len(PHASES) - 1) * gap + 46
    height = top_h + len(OPTIONS) * row_h + bottom_pad

    sheet = Image.new("RGB", (width, height), (242, 238, 225))
    draw = ImageDraw.Draw(sheet)

    title_font = load_font(38, bold=True)
    subtitle_font = load_font(22)
    meta_font = load_font(21)
    small_font = load_font(18)
    badge_font = load_font(22, bold=True)

    draw.text(
        (34, 28),
        "selected_sticker_options_small_scope_remotion_probe",
        font=title_font,
        fill=(32, 34, 27),
    )
    draw.text(
        (36, 82),
        "4 selected options / start-mid-exit still frames / pending GPT-user review",
        font=subtitle_font,
        fill=(76, 78, 66),
    )

    for col, phase in enumerate(PHASES):
        x = left_w + gap + col * (thumb_w + gap)
        add_label(draw, (x, 104, x + 138, 146), phase, badge_font)

    for row, option in enumerate(OPTIONS):
        y = top_h + row * row_h
        draw.rounded_rectangle(
            (22, y + 18, width - 22, y + row_h - 20),
            radius=24,
            fill=(252, 249, 238),
            outline=(214, 205, 180),
            width=2,
        )

        text_x = 42
        text_y = y + 42
        draw.text(
            (text_x, text_y),
            option["option_id"],
            font=badge_font,
            fill=(33, 35, 26),
        )
        text_y += 42
        text_y = draw_wrapped(
            draw,
            f"event: {option['source_event_id']}",
            (text_x, text_y),
            meta_font,
            (76, 74, 62),
            31,
        )
        text_y = draw_wrapped(
            draw,
            f"relation: {option['attachment']}",
            (text_x, text_y + 5),
            meta_font,
            (76, 74, 62),
            31,
        )
        text_y = draw_wrapped(
            draw,
            f"shape: {option['shape']}",
            (text_x, text_y + 5),
            meta_font,
            (76, 74, 62),
            31,
        )
        text_y = draw_wrapped(
            draw,
            f"self-check: {option['status']}",
            (text_x, text_y + 5),
            meta_font,
            (112, 84, 26),
            31,
        )
        draw_wrapped(
            draw,
            option["note"],
            (text_x, text_y + 16),
            small_font,
            (83, 83, 70),
            24,
        )

        for col, phase in enumerate(PHASES):
            frame_path = frames_dir / f"{option['option_id']}_{phase}.jpg"
            if not frame_path.exists():
                raise FileNotFoundError(f"Missing Remotion still frame: {frame_path}")

            frame = Image.open(frame_path).convert("RGB")
            frame.thumbnail((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            x = left_w + gap + col * (thumb_w + gap)
            image_y = y + 42
            matte = Image.new("RGB", (thumb_w, thumb_h), (32, 34, 27))
            paste_x = (thumb_w - frame.width) // 2
            paste_y = (thumb_h - frame.height) // 2
            matte.paste(frame, (paste_x, paste_y))
            sheet.paste(matte, (x, image_y))
            draw.rectangle(
                (x, image_y, x + thumb_w, image_y + thumb_h),
                outline=(39, 41, 31),
                width=2,
            )
            add_label(
                draw,
                (x + 10, image_y + 10, x + 126, image_y + 50),
                phase,
                small_font,
            )

    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=92, optimize=True)


def parse_args() -> argparse.Namespace:
    root = repo_root()
    default_probe_dir = (
        root / "tmp" / "选定贴纸方案小范围探针_selected_sticker_options_probe"
    )

    parser = argparse.ArgumentParser(
        description="Compose selected sticker option still frames into a review sheet."
    )
    parser.add_argument(
        "--frames-dir",
        type=Path,
        default=default_probe_dir / "frames",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=default_probe_dir / "选定贴纸方案_start_mid_exit_review_sheet.jpg",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    compose_sheet(args.frames_dir, args.output)
    print(args.output)


if __name__ == "__main__":
    main()
