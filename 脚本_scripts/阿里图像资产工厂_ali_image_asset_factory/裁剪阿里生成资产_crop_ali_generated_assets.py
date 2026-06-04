#!/usr/bin/env python3
"""Crop Alibaba-generated image assets and attempt alpha extraction."""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parents[2]
INPUT_DIR = REPO_ROOT / "tmp" / "阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe"
OUTPUT_DIR = REPO_ROOT / "tmp" / "阿里图像资产裁剪_ali_image_asset_crop_probe"


ASSETS = [
    {
        "asset_id": "ali_sticker_candidate_01_crop",
        "source_asset_id": "ali_sticker_candidate_01",
        "asset_type": "sticker_candidate",
        "input_name": "sticker_candidate_01.png",
        "cropped_name": "sticker_candidate_01_cropped.png",
        "alpha_name": "sticker_candidate_01_alpha.png",
        "margin": 82,
        "background_tolerance": 26.0,
        "min_component_area": 1200,
        "text_accuracy_status": None,
        "mask_strategy": "background_flood",
    },
    {
        "asset_id": "ali_font_card_candidate_01_crop",
        "source_asset_id": "ali_font_card_candidate_01",
        "asset_type": "font_card_candidate",
        "input_name": "font_card_candidate_01.png",
        "cropped_name": "font_card_candidate_01_cropped.png",
        "alpha_name": "font_card_candidate_01_alpha.png",
        "margin": 58,
        "background_tolerance": 30.0,
        "min_component_area": 900,
        "text_accuracy_status": "visual_self_check_passed_pending_user_review",
        "mask_strategy": "text_outline_fill",
    },
]


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def load_font(size: int) -> ImageFont.ImageFont:
    for candidate in (
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/Library/Fonts/Arial Unicode.ttf",
    ):
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def load_rgb(path: Path) -> np.ndarray:
    with Image.open(path) as image:
        return np.array(image.convert("RGB"))


def save_rgb(array: np.ndarray, path: Path) -> None:
    Image.fromarray(array.astype(np.uint8)).save(path)


def save_rgba(rgb: np.ndarray, alpha: np.ndarray, path: Path) -> None:
    rgba = np.dstack([rgb.astype(np.uint8), alpha.astype(np.uint8)])
    Image.fromarray(rgba).save(path)


def border_pixels(rgb: np.ndarray, width: int = 36) -> np.ndarray:
    top = rgb[:width, :, :]
    bottom = rgb[-width:, :, :]
    left = rgb[:, :width, :]
    right = rgb[:, -width:, :]
    return np.concatenate(
        [top.reshape(-1, 3), bottom.reshape(-1, 3), left.reshape(-1, 3), right.reshape(-1, 3)],
        axis=0,
    )


def estimate_background(rgb: np.ndarray) -> np.ndarray:
    return np.median(border_pixels(rgb), axis=0).astype(np.float32)


def connected_background_mask(rgb: np.ndarray, tolerance: float) -> np.ndarray:
    bg = estimate_background(rgb)
    distance = np.linalg.norm(rgb.astype(np.float32) - bg.reshape(1, 1, 3), axis=2)
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    low_saturation = hsv[:, :, 1] < 72
    candidate_bg = (distance <= tolerance) & low_saturation

    h, w = candidate_bg.shape
    seed = np.zeros((h, w), dtype=np.uint8)
    seed[0, :] = candidate_bg[0, :]
    seed[-1, :] = candidate_bg[-1, :]
    seed[:, 0] = candidate_bg[:, 0]
    seed[:, -1] = candidate_bg[:, -1]

    flood = np.zeros((h + 2, w + 2), dtype=np.uint8)
    mask_u8 = candidate_bg.astype(np.uint8)
    for y, x in zip(*np.nonzero(seed)):
        if mask_u8[y, x] and flood[y + 1, x + 1] == 0:
            cv2.floodFill(mask_u8, flood, (int(x), int(y)), 2)
    return mask_u8 == 2


def subject_mask(rgb: np.ndarray, tolerance: float) -> np.ndarray:
    background = connected_background_mask(rgb, tolerance)
    foreground = (~background).astype(np.uint8) * 255
    kernel = np.ones((5, 5), np.uint8)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_CLOSE, kernel, iterations=2)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_OPEN, kernel, iterations=1)
    return foreground > 0


def text_outline_mask(rgb: np.ndarray) -> np.ndarray:
    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    dark = (gray < 178).astype(np.uint8) * 255
    kernel = np.ones((7, 7), np.uint8)
    dark = cv2.morphologyEx(dark, cv2.MORPH_CLOSE, kernel, iterations=2)
    dark = cv2.dilate(dark, np.ones((9, 9), np.uint8), iterations=2)
    contours, _hierarchy = cv2.findContours(dark, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filled = np.zeros_like(dark)
    for contour in contours:
        area = cv2.contourArea(contour)
        if area >= 450:
            cv2.drawContours(filled, [contour], -1, 255, thickness=cv2.FILLED)
    filled = cv2.morphologyEx(filled, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=1)
    return filled > 0


def significant_bbox(mask: np.ndarray, min_component_area: int, margin: int) -> Tuple[int, int, int, int]:
    num_labels, labels, stats, _centroids = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    boxes: List[Tuple[int, int, int, int]] = []
    for label in range(1, num_labels):
        x, y, w, h, area = stats[label]
        if int(area) >= min_component_area:
            boxes.append((int(x), int(y), int(x + w), int(y + h)))
    if not boxes:
        ys, xs = np.nonzero(mask)
        if len(xs) == 0 or len(ys) == 0:
            raise RuntimeError("no_subject_detected")
        boxes.append((int(xs.min()), int(ys.min()), int(xs.max() + 1), int(ys.max() + 1)))

    x0 = min(box[0] for box in boxes)
    y0 = min(box[1] for box in boxes)
    x1 = max(box[2] for box in boxes)
    y1 = max(box[3] for box in boxes)
    h, w = mask.shape
    return (
        max(0, x0 - margin),
        max(0, y0 - margin),
        min(w, x1 + margin),
        min(h, y1 + margin),
    )


def smooth_alpha(mask: np.ndarray) -> np.ndarray:
    alpha = mask.astype(np.uint8) * 255
    alpha = cv2.GaussianBlur(alpha, (0, 0), 1.25)
    alpha[alpha < 10] = 0
    alpha[alpha > 245] = 255
    return alpha


def edge_clearance(mask: np.ndarray) -> int:
    ys, xs = np.nonzero(mask)
    if len(xs) == 0 or len(ys) == 0:
        return 0
    h, w = mask.shape
    return int(min(xs.min(), ys.min(), w - 1 - xs.max(), h - 1 - ys.max()))


def alpha_quality(mask: np.ndarray) -> Tuple[bool, str, Dict[str, Any]]:
    coverage = float(mask.mean())
    clearance = edge_clearance(mask)
    metrics = {"foreground_coverage": round(coverage, 4), "edge_clearance_px": clearance}
    if coverage < 0.015:
        return False, "failed_foreground_too_small", metrics
    if coverage > 0.92:
        return False, "failed_foreground_too_large", metrics
    if clearance < 6:
        return False, "failed_foreground_touches_crop_edge", metrics
    return True, "passed_pending_user_review", metrics


def crop_asset(asset: Dict[str, Any], input_dir: Path, output_dir: Path) -> Dict[str, Any]:
    original_path = input_dir / asset["input_name"]
    if not original_path.exists():
        raise FileNotFoundError(str(original_path))

    rgb = load_rgb(original_path)
    original_size = [int(rgb.shape[1]), int(rgb.shape[0])]
    if asset["mask_strategy"] == "text_outline_fill":
        mask = text_outline_mask(rgb)
    else:
        mask = subject_mask(rgb, asset["background_tolerance"])
    crop_box = significant_bbox(mask, asset["min_component_area"], asset["margin"])
    x0, y0, x1, y1 = crop_box
    cropped = rgb[y0:y1, x0:x1, :]
    cropped_mask = mask[y0:y1, x0:x1]

    cropped_path = output_dir / asset["cropped_name"]
    alpha_path = output_dir / asset["alpha_name"]
    save_rgb(cropped, cropped_path)

    passed_alpha, alpha_status, alpha_metrics = alpha_quality(cropped_mask)
    alpha = smooth_alpha(cropped_mask)
    save_rgba(cropped, alpha, alpha_path)

    edge_quality = "safe_margin_preserved_pending_user_review" if alpha_metrics["edge_clearance_px"] >= 10 else "needs_manual_review"
    return {
        "asset_id": asset["asset_id"],
        "source_asset_id": asset["source_asset_id"],
        "asset_type": asset["asset_type"],
        "original_path": rel(original_path),
        "cropped_path": rel(cropped_path),
        "alpha_path": rel(alpha_path),
        "original_size": original_size,
        "cropped_size": [int(cropped.shape[1]), int(cropped.shape[0])],
        "crop_box": [int(x0), int(y0), int(x1), int(y1)],
        "transparent_ready": bool(passed_alpha),
        "background_removal_required": not bool(passed_alpha),
        "alpha_quality": alpha_status,
        "alpha_quality_metrics": alpha_metrics,
        "edge_quality": edge_quality,
        "shadow_preserved": "pending_user_review",
        "text_accuracy_status": asset["text_accuracy_status"],
        "review_status": "pending_user_review",
        "approved_for_video": False,
        "recommended_remotion_usage": (
            "use_alpha_png_only_after_user_review"
            if passed_alpha
            else "use_cropped_png_for_review_only_background_removal_still_required"
        ),
    }


def checkerboard(size: Tuple[int, int], cell: int = 24) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, (238, 238, 238))
    draw = ImageDraw.Draw(image)
    for y in range(0, height, cell):
        for x in range(0, width, cell):
            if ((x // cell) + (y // cell)) % 2:
                draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(208, 208, 208))
    return image


def fit_on_canvas(path: Path, size: Tuple[int, int], checker: bool = False) -> Image.Image:
    canvas = checkerboard(size) if checker else Image.new("RGB", size, (246, 246, 242))
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        rgba.thumbnail((size[0] - 24, size[1] - 24), Image.LANCZOS)
        x = (size[0] - rgba.width) // 2
        y = (size[1] - rgba.height) // 2
        canvas.paste(rgba.convert("RGB"), (x, y), rgba.getchannel("A"))
    return canvas


def draw_wrapped(draw: ImageDraw.ImageDraw, xy: Tuple[int, int], lines: Iterable[str], font: ImageFont.ImageFont) -> None:
    x, y = xy
    for line in lines:
        draw.text((x, y), line, fill=(32, 32, 32), font=font)
        y += 26


def contact_sheet(manifest: Dict[str, Any], output_dir: Path) -> Path:
    output_path = output_dir / "crop_review_contact_sheet.jpg"
    cell_w, cell_h = 430, 360
    label_h = 150
    columns = 3
    rows = len(manifest["assets"])
    canvas = Image.new("RGB", (columns * cell_w + 80, rows * (cell_h + label_h) + 150), (244, 243, 239))
    draw = ImageDraw.Draw(canvas)
    title_font = load_font(36)
    small_font = load_font(21)
    draw.text((40, 34), "Ali generated asset crop probe", fill=(22, 22, 22), font=title_font)
    draw.text((40, 82), "original / cropped / alpha preview, all pending_user_review", fill=(82, 82, 82), font=small_font)

    labels = ["original", "cropped", "alpha"]
    for row, entry in enumerate(manifest["assets"]):
        y = 126 + row * (cell_h + label_h)
        paths = [
            REPO_ROOT / entry["original_path"],
            REPO_ROOT / entry["cropped_path"],
            REPO_ROOT / entry["alpha_path"],
        ]
        for col, path in enumerate(paths):
            x = 40 + col * cell_w
            preview = fit_on_canvas(path, (cell_w - 30, cell_h), checker=(labels[col] == "alpha"))
            canvas.paste(preview, (x, y))
            draw.rectangle((x, y, x + cell_w - 30, y + cell_h), outline=(190, 190, 184), width=2)
            draw.text((x, y + cell_h + 10), labels[col], fill=(32, 32, 32), font=small_font)
        lines = [
            f"asset_id: {entry['asset_id']}",
            f"transparent_ready: {str(entry['transparent_ready']).lower()}",
            f"alpha_quality: {entry['alpha_quality']}",
            f"edge_quality: {entry['edge_quality']}",
            f"review_status: {entry['review_status']}",
        ]
        draw_wrapped(draw, (40, y + cell_h + 40), lines, small_font)
    canvas.save(output_path, quality=92)
    return output_path


def build_quality_report(manifest: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "task_type": "ali_generated_asset_crop_probe",
        "status": "generated_pending_user_review",
        "generated_at_unix": int(time.time()),
        "api_called_this_round": False,
        "new_image_generation_this_round": False,
        "runtime_assets_committed": False,
        "quality_summary": [
            {
                "asset_id": entry["asset_id"],
                "transparent_ready": entry["transparent_ready"],
                "alpha_quality": entry["alpha_quality"],
                "edge_quality": entry["edge_quality"],
                "shadow_preserved": entry["shadow_preserved"],
                "approved_for_video": entry["approved_for_video"],
            }
            for entry in manifest["assets"]
        ],
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-dir", default=str(INPUT_DIR))
    parser.add_argument("--output-dir", default=str(OUTPUT_DIR))
    args = parser.parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    entries = [crop_asset(asset, input_dir, output_dir) for asset in ASSETS]
    manifest = {
        "task_type": "ali_generated_asset_crop_probe",
        "status": "ali_generated_asset_crop_completed_pending_user_review",
        "source_manifest": rel(input_dir / "asset_manifest.json"),
        "api_called_this_round": False,
        "new_image_generation_this_round": False,
        "runtime_asset_committed": False,
        "assets": entries,
    }
    sheet_path = contact_sheet(manifest, output_dir)
    manifest["crop_review_contact_sheet_path"] = rel(sheet_path)

    manifest_path = output_dir / "crop_manifest.json"
    quality_path = output_dir / "crop_quality_report.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    quality_path.write_text(json.dumps(build_quality_report(manifest), ensure_ascii=False, indent=2), encoding="utf-8")

    print(
        json.dumps(
            {
                "status": manifest["status"],
                "crop_manifest": rel(manifest_path),
                "crop_quality_report": rel(quality_path),
                "crop_review_contact_sheet": rel(sheet_path),
                "assets": [
                    {
                        "asset_id": entry["asset_id"],
                        "cropped_path": entry["cropped_path"],
                        "alpha_path": entry["alpha_path"],
                        "transparent_ready": entry["transparent_ready"],
                        "alpha_quality": entry["alpha_quality"],
                    }
                    for entry in entries
                ],
            },
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
