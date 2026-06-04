#!/usr/bin/env python3
"""Build manifest and review contact sheet for Alibaba-generated candidates."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT_DIR = REPO_ROOT / "tmp" / "阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe"
STICKER_ID = "ali_sticker_candidate_01"
FONT_CARD_ID = "ali_font_card_candidate_01"


def relative_or_abs(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def image_info(path: Path) -> Dict[str, Any]:
    with Image.open(path) as image:
        mode = image.mode
        size = image.size
        fmt = image.format
        has_alpha = "A" in mode
        transparent_ready = False
        if has_alpha:
            alpha = image.getchannel("A")
            extrema = alpha.getextrema()
            transparent_ready = extrema[0] < 255
    return {
        "path": path,
        "format": fmt,
        "mode": mode,
        "width": size[0],
        "height": size[1],
        "has_alpha": has_alpha,
        "transparent_ready": transparent_ready,
    }


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def fit_image(image: Image.Image, max_size: Tuple[int, int]) -> Image.Image:
    copy = image.convert("RGBA")
    copy.thumbnail(max_size, Image.LANCZOS)
    canvas = Image.new("RGBA", max_size, (248, 248, 246, 255))
    x = (max_size[0] - copy.width) // 2
    y = (max_size[1] - copy.height) // 2
    canvas.alpha_composite(copy, (x, y))
    return canvas.convert("RGB")


def draw_lines(draw: ImageDraw.ImageDraw, xy: Tuple[int, int], lines: List[str], font: ImageFont.ImageFont) -> None:
    x, y = xy
    for line in lines:
        draw.text((x, y), line, fill=(35, 35, 35), font=font)
        y += 34


def generate_contact_sheet(manifest: Dict[str, Any], output_dir: Path) -> Path:
    sheet_path = output_dir / "review_contact_sheet.jpg"
    canvas = Image.new("RGB", (1800, 1120), (245, 244, 240))
    draw = ImageDraw.Draw(canvas)
    title_font = load_font(42)
    label_font = load_font(28)
    small_font = load_font(24)
    draw.text((56, 38), "Ali image asset factory minimal probe", fill=(24, 24, 24), font=title_font)
    draw.text((56, 96), "pending_user_review / runtime assets not committed", fill=(84, 84, 84), font=label_font)

    card_positions = [(70, 170), (940, 170)]
    preview_size = (720, 720)
    for asset, (x, y) in zip(manifest["assets"], card_positions):
        image_path = REPO_ROOT / asset["local_path"]
        with Image.open(image_path) as image:
            preview = fit_image(image, preview_size)
        canvas.paste(preview, (x, y))
        outline = ImageDraw.Draw(canvas)
        outline.rectangle((x, y, x + preview_size[0], y + preview_size[1]), outline=(198, 198, 190), width=2)
        lines = [
            f"asset_id: {asset['asset_id']}",
            f"type: {asset['asset_type']}",
            f"review: {asset['review_status']}",
            f"transparent_ready: {str(asset['transparent_ready']).lower()}",
        ]
        if asset.get("text_accuracy_status") is not None:
            lines.append(f"text_accuracy_status: {asset['text_accuracy_status']}")
        draw_lines(draw, (x, y + preview_size[1] + 28), lines, small_font)
    canvas.save(sheet_path, quality=92)
    return sheet_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument(
        "--font-card-text-status",
        default="pending_visual_self_check",
        choices=[
            "pending_visual_self_check",
            "visual_self_check_passed_pending_user_review",
            "font_card_text_failed",
        ],
    )
    args = parser.parse_args()

    output_dir = Path(args.output_dir)
    asset_request_path = output_dir / "asset_request.json"
    sticker_path = output_dir / "sticker_candidate_01.png"
    font_path = output_dir / "font_card_candidate_01.png"
    missing = [str(path) for path in (asset_request_path, sticker_path, font_path) if not path.exists()]
    if missing:
        print(json.dumps({"status": "blocked_asset_generation_missing", "missing": missing}, ensure_ascii=False))
        return 2

    asset_request = json.loads(asset_request_path.read_text(encoding="utf-8"))
    sticker_info = image_info(sticker_path)
    font_info = image_info(font_path)

    manifest = {
        "task_type": "ali_image_asset_factory_minimal_probe",
        "manifest_status": "generated_pending_user_review",
        "source_method": "ali_image_api",
        "runtime_asset_committed": False,
        "assets": [
            {
                "asset_id": STICKER_ID,
                "asset_type": "sticker_candidate",
                "source_method": "ali_image_api",
                "prompt_summary": asset_request["sticker_candidate_request"]["style"],
                "local_path": relative_or_abs(sticker_path),
                "image_format": sticker_info["format"],
                "image_mode": sticker_info["mode"],
                "width": sticker_info["width"],
                "height": sticker_info["height"],
                "transparent_ready": sticker_info["transparent_ready"],
                "background_removal_required": not sticker_info["transparent_ready"],
                "text_accuracy_status": None,
                "review_status": "pending_user_review",
                "approved_for_library": False,
                "remotion_usage_status": "not_used_yet",
            },
            {
                "asset_id": FONT_CARD_ID,
                "asset_type": "font_card_candidate",
                "source_method": "ali_image_api",
                "prompt_summary": asset_request["font_card_candidate_request"]["style"],
                "text": asset_request["font_card_candidate_request"]["text"],
                "local_path": relative_or_abs(font_path),
                "image_format": font_info["format"],
                "image_mode": font_info["mode"],
                "width": font_info["width"],
                "height": font_info["height"],
                "transparent_ready": font_info["transparent_ready"],
                "background_removal_required": not font_info["transparent_ready"],
                "text_accuracy_status": args.font_card_text_status,
                "review_status": "pending_user_review",
                "approved_for_library": False,
                "remotion_usage_status": "not_used_yet",
            },
        ],
    }
    contact_sheet_path = generate_contact_sheet(manifest, output_dir)
    manifest["review_contact_sheet_path"] = relative_or_abs(contact_sheet_path)
    manifest_path = output_dir / "asset_manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"status": "generated", "manifest": relative_or_abs(manifest_path), "contact_sheet": relative_or_abs(contact_sheet_path)}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
