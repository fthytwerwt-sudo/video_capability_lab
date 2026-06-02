#!/usr/bin/env python3
"""Generate a local sticker attachment relation style sheet.

The script uses only existing source frames and Pillow drawing primitives. It
does not call any external API and writes runtime review images only to tmp/.
"""

from __future__ import annotations

import math
import random
import textwrap
from pathlib import Path
from typing import Callable

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
TMP_DIR = ROOT / "tmp" / "贴纸附属关系风格板_sticker_attachment_relation_style_sheet"
SOURCE_DIR = TMP_DIR / "source_frames"
OUTPUT_PATH = TMP_DIR / "贴纸附属关系风格板_sticker_attachment_relation_style_sheet.jpg"

FONT_CANDIDATES = [
    Path("/System/Library/Fonts/Hiragino Sans GB.ttc"),
    Path("/System/Library/Fonts/STHeiti Medium.ttc"),
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/HelveticaNeue.ttc"),
]


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


FONT_TITLE = load_font(36)
FONT_SUBTITLE = load_font(22)
FONT_LABEL = load_font(18)
FONT_SMALL = load_font(15)
FONT_TINY = load_font(13)
FONT_STICKER = load_font(64)


def draw_line_with_outline(
    draw: ImageDraw.ImageDraw,
    points: list[tuple[int, int]],
    inner: tuple[int, int, int],
    outer: tuple[int, int, int] = (248, 246, 229),
    shadow: tuple[int, int, int, int] = (0, 0, 0, 80),
    width: int = 10,
    outer_width: int = 20,
) -> None:
    shadow_points = [(x + 5, y + 7) for x, y in points]
    draw.line(shadow_points, fill=shadow, width=outer_width, joint="curve")
    draw.line(points, fill=outer, width=outer_width, joint="curve")
    draw.line(points, fill=inner, width=width, joint="curve")


def jittered(points: list[tuple[int, int]], amount: int = 4) -> list[tuple[int, int]]:
    return [(x + random.randint(-amount, amount), y + random.randint(-amount, amount)) for x, y in points]


def blur_regions(img: Image.Image, regions: list[tuple[int, int, int, int]]) -> Image.Image:
    out = img.copy()
    for box in regions:
        crop = out.crop(box).filter(ImageFilter.GaussianBlur(radius=24))
        overlay = Image.new("RGB", crop.size, (210, 204, 188))
        crop = Image.blend(crop, overlay, 0.18)
        out.paste(crop, box)
    return out


def draw_short_stroke_cluster(draw: ImageDraw.ImageDraw, anchor: tuple[int, int], angle: float) -> None:
    x, y = anchor
    for idx, offset in enumerate([-44, -8, 35]):
        length = 88 - idx * 10
        cx = x + int(math.cos(angle + 1.3) * offset)
        cy = y + int(math.sin(angle + 1.3) * offset)
        dx = int(math.cos(angle) * length)
        dy = int(math.sin(angle) * length)
        points = jittered([(cx - dx // 2, cy - dy // 2), (cx + dx // 2, cy + dy // 2)], 7)
        draw_line_with_outline(draw, points, inner=(56, 43, 35), width=12, outer_width=25)


def draw_contact_spark(draw: ImageDraw.ImageDraw, anchor: tuple[int, int]) -> None:
    x, y = anchor
    rays = [
        [(x - 18, y - 56), (x - 42, y - 105)],
        [(x + 20, y - 46), (x + 58, y - 88)],
        [(x + 48, y + 3), (x + 104, y - 4)],
        [(x - 38, y + 13), (x - 86, y + 24)],
    ]
    for pts in rays:
        draw_line_with_outline(draw, jittered(pts, 5), inner=(247, 197, 81), width=10, outer_width=22)
    draw.ellipse((x - 15, y - 15, x + 15, y + 15), fill=(248, 246, 229), outline=(55, 44, 35), width=5)


def draw_edge_wiggle(draw: ImageDraw.ImageDraw, points: list[tuple[int, int]]) -> None:
    for base in [points, [(x + 20, y + 22) for x, y in points]]:
        draw_line_with_outline(draw, jittered(base, 5), inner=(57, 47, 39), width=9, outer_width=21)


def draw_half_ring(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], start: int, end: int) -> None:
    shadow_box = tuple(v + 6 for v in box)
    draw.arc(shadow_box, start=start, end=end, fill=(0, 0, 0, 80), width=30)
    draw.arc(box, start=start, end=end, fill=(248, 246, 229), width=32)
    draw.arc(box, start=start, end=end, fill=(241, 190, 74), width=15)
    x0, y0, x1, y1 = box
    draw.ellipse((x0 + 30, y0 + 45, x0 + 62, y0 + 77), fill=(55, 44, 35))
    draw.ellipse((x0 + 98, y0 + 36, x0 + 130, y0 + 68), fill=(55, 44, 35))


def draw_micro_bubble(
    draw: ImageDraw.ImageDraw,
    box: tuple[int, int, int, int],
    text: str,
    fill: tuple[int, int, int] = (248, 244, 225),
) -> None:
    x0, y0, x1, y1 = box
    draw.rounded_rectangle((x0 + 6, y0 + 8, x1 + 6, y1 + 8), radius=42, fill=(0, 0, 0, 72))
    draw.rounded_rectangle(box, radius=42, fill=fill, outline=(52, 43, 36), width=7)
    draw.polygon([(x0 + 38, y1 - 4), (x0 + 62, y1 + 35), (x0 + 78, y1 - 2)], fill=fill)
    draw.line([(x0 + 38, y1 - 4), (x0 + 62, y1 + 35), (x0 + 78, y1 - 2)], fill=(52, 43, 36), width=6)
    bbox = draw.textbbox((0, 0), text, font=FONT_STICKER)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((x0 + x1 - tw) // 2, (y0 + y1 - th) // 2 - 8), text, font=FONT_STICKER, fill=(50, 41, 34))


def draw_surface_face(draw: ImageDraw.ImageDraw, anchor: tuple[int, int]) -> None:
    x, y = anchor
    draw.ellipse((x - 70, y - 52, x + 70, y + 52), fill=(248, 244, 225), outline=(52, 43, 36), width=8)
    draw.ellipse((x - 38, y - 14, x - 14, y + 10), fill=(52, 43, 36))
    draw.ellipse((x + 18, y - 15, x + 42, y + 9), fill=(52, 43, 36))
    draw.arc((x - 28, y - 4, x + 30, y + 42), start=20, end=160, fill=(52, 43, 36), width=6)
    draw_line_with_outline(draw, [(x - 102, y - 62), (x - 136, y - 86)], inner=(247, 197, 81), width=8, outer_width=18)
    draw_line_with_outline(draw, [(x + 92, y - 58), (x + 132, y - 82)], inner=(247, 197, 81), width=8, outer_width=18)


OptionDraw = Callable[[ImageDraw.ImageDraw], None]


EVENTS = [
    {
        "title": "shot_01 panda open",
        "source": SOURCE_DIR / "shot_01_panda_open_arrow_mid_2.92s.jpg",
        "bad": "bad_standard_arrow",
        "cover": [(590, 980, 870, 1210)],
        "options": [
            {
                "id": "shot_01_option_A",
                "relation": "motion_direction_attached",
                "grammar": "short_stroke_cluster",
                "avoid": "bad_standard_arrow",
                "self": "partial/pass",
                "draw": lambda d: draw_short_stroke_cluster(d, (430, 1400), -0.48),
            },
            {
                "id": "shot_01_option_B",
                "relation": "contact_point_attached",
                "grammar": "contact_spark",
                "avoid": "bad_floating_ui_overlay",
                "self": "partial_review",
                "draw": lambda d: draw_contact_spark(d, (350, 1428)),
            },
            {
                "id": "shot_01_option_C",
                "relation": "edge_attached",
                "grammar": "edge_wiggle",
                "avoid": "bad_clean_svg_path",
                "self": "partial",
                "draw": lambda d: draw_edge_wiggle(d, [(474, 1268), (548, 1236), (630, 1264)]),
            },
        ],
    },
    {
        "title": "shot_03 bamboo hide",
        "source": SOURCE_DIR / "shot_03_bamboo_hide_circle_mid_7.38s.jpg",
        "bad": "bad_full_circle_annotation",
        "cover": [(365, 600, 610, 825)],
        "options": [
            {
                "id": "shot_03_option_A",
                "relation": "reveal_boundary_attached",
                "grammar": "half_ring_peek_mark",
                "avoid": "bad_full_circle_annotation",
                "self": "partial_review",
                "draw": lambda d: draw_half_ring(d, (352, 860, 610, 1118), 205, 35),
            },
            {
                "id": "shot_03_option_B",
                "relation": "edge_attached",
                "grammar": "short_stroke_cluster",
                "avoid": "bad_floating_ui_overlay",
                "self": "partial/pass",
                "draw": lambda d: draw_short_stroke_cluster(d, (590, 900), -1.15),
            },
            {
                "id": "shot_03_option_C",
                "relation": "caption_relation_attached",
                "grammar": "micro_word_bubble",
                "avoid": "bad_caption_duplicate_sticker",
                "self": "partial",
                "draw": lambda d: draw_micro_bubble(d, (390, 910, 560, 1045), "露"),
            },
        ],
    },
    {
        "title": "shot_05 panda bite",
        "source": SOURCE_DIR / "shot_05_panda_bite_tag_mid_10.26s.jpg",
        "bad": "bad_rectangle_paper_tag",
        "cover": [(560, 935, 820, 1125)],
        "options": [
            {
                "id": "shot_05_option_A",
                "relation": "contact_point_attached",
                "grammar": "contact_spark",
                "avoid": "bad_rectangle_paper_tag",
                "self": "partial_review",
                "draw": lambda d: draw_contact_spark(d, (330, 1422)),
            },
            {
                "id": "shot_05_option_B",
                "relation": "contact_point_attached",
                "grammar": "micro_word_bubble",
                "avoid": "bad_caption_duplicate_sticker",
                "self": "partial_review",
                "draw": lambda d: draw_micro_bubble(d, (365, 1298, 525, 1435), "咔"),
            },
            {
                "id": "shot_05_option_C",
                "relation": "surface_attached",
                "grammar": "surface_face_mark",
                "avoid": "bad_reference_asset_copy",
                "self": "partial",
                "draw": lambda d: draw_surface_face(d, (310, 1398)),
            },
        ],
    },
]


def render_preview(event: dict, option: dict | None) -> Image.Image:
    base = Image.open(event["source"]).convert("RGB")
    if option is not None:
        base = blur_regions(base, event["cover"])
        draw = ImageDraw.Draw(base, "RGBA")
        option["draw"](draw)
    return base.resize((300, 533), Image.Resampling.LANCZOS)


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont, fill: tuple[int, int, int], width: int) -> int:
    x, y = xy
    lines: list[str] = []
    for raw in text.split("\n"):
        lines.extend(textwrap.wrap(raw, width=width) or [""])
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += 21
    return y


def make_card(sheet: Image.Image, x: int, y: int, event: dict, option: dict | None) -> None:
    draw = ImageDraw.Draw(sheet, "RGBA")
    preview = render_preview(event, option)
    draw.rounded_rectangle((x - 10, y - 10, x + 320, y + 712), radius=16, fill=(255, 253, 246), outline=(214, 208, 190), width=2)
    sheet.paste(preview, (x, y))
    label_y = y + 548
    if option is None:
        title = "source frame"
        lines = f"current_bad_pattern: {event['bad']}\nsource: candidate mid frame"
    else:
        title = option["id"]
        lines = (
            f"relation: {option['relation']}\n"
            f"grammar: {option['grammar']}\n"
            f"avoid: {option['avoid']}\n"
            f"self: {option['self']}"
        )
    draw.text((x, label_y), title, font=FONT_LABEL, fill=(43, 38, 31))
    draw_wrapped(draw, (x, label_y + 26), lines, FONT_TINY, (82, 73, 61), 34)


def main() -> None:
    random.seed(45)
    missing = [str(event["source"]) for event in EVENTS if not event["source"].exists()]
    if missing:
        raise SystemExit("Missing source frame(s): " + ", ".join(missing))

    cols = 4
    card_w = 350
    row_h = 760
    margin = 44
    header_h = 128
    width = margin * 2 + cols * card_w
    height = header_h + len(EVENTS) * row_h + 40
    sheet = Image.new("RGB", (width, height), (242, 238, 225))
    draw = ImageDraw.Draw(sheet, "RGBA")

    draw.text((margin, 28), "Sticker Attachment Relation Style Sheet Probe", font=FONT_TITLE, fill=(39, 35, 29))
    draw.text(
        (margin, 78),
        "static local probe | pending_gpt_user_review | no API, no render, no runtime assets committed",
        font=FONT_SUBTITLE,
        fill=(87, 78, 65),
    )

    y = header_h
    for event in EVENTS:
        draw.text((margin, y - 24), f"{event['title']} / avoid {event['bad']}", font=FONT_SMALL, fill=(76, 65, 53))
        make_card(sheet, margin, y, event, None)
        for idx, option in enumerate(event["options"], start=1):
            make_card(sheet, margin + idx * card_w, y, event, option)
        y += row_h

    TMP_DIR.mkdir(parents=True, exist_ok=True)
    sheet.save(OUTPUT_PATH, quality=92)
    print(OUTPUT_PATH)


if __name__ == "__main__":
    main()
