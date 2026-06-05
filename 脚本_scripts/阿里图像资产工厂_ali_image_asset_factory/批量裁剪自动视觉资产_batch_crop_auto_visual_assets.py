#!/usr/bin/env python3
"""Batch crop generated auto-visual assets into alpha PNGs."""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RUNTIME_DIR = REPO_ROOT / "tmp" / "自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe"
MIN_ALPHA_ASSETS = 5


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
    Image.fromarray(np.dstack([rgb.astype(np.uint8), alpha.astype(np.uint8)])).save(path)


def border_pixels(rgb: np.ndarray, width: int = 44) -> np.ndarray:
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


def flood_background(rgb: np.ndarray, tolerance: float) -> np.ndarray:
    bg = estimate_background(rgb)
    distance = np.linalg.norm(rgb.astype(np.float32) - bg.reshape(1, 1, 3), axis=2)
    candidate_bg = distance <= tolerance
    h, w = candidate_bg.shape
    seed = np.zeros((h, w), dtype=np.uint8)
    seed[0, :] = candidate_bg[0, :]
    seed[-1, :] = candidate_bg[-1, :]
    seed[:, 0] = candidate_bg[:, 0]
    seed[:, -1] = candidate_bg[:, -1]
    mask_u8 = candidate_bg.astype(np.uint8)
    flood = np.zeros((h + 2, w + 2), dtype=np.uint8)
    for y, x in zip(*np.nonzero(seed)):
        if mask_u8[y, x] and flood[y + 1, x + 1] == 0:
            cv2.floodFill(mask_u8, flood, (int(x), int(y)), 2)
    return mask_u8 == 2


def foreground_mask(rgb: np.ndarray) -> np.ndarray:
    bg = estimate_background(rgb)
    distance = np.linalg.norm(rgb.astype(np.float32) - bg.reshape(1, 1, 3), axis=2)
    tolerance = max(28.0, min(76.0, float(np.percentile(distance, 68)) * 0.76))
    background = flood_background(rgb, tolerance)
    mask = (~background).astype(np.uint8) * 255

    gray = cv2.cvtColor(rgb, cv2.COLOR_RGB2GRAY)
    edges = cv2.Canny(gray, 44, 132)
    edge_support = cv2.dilate(edges, np.ones((7, 7), np.uint8), iterations=2)
    mask = np.maximum(mask, edge_support)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8), iterations=2)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8), iterations=1)
    return mask > 0


def significant_bbox(mask: np.ndarray, margin: int = 74, min_area: int = 850) -> Tuple[int, int, int, int]:
    num_labels, _labels, stats, _centroids = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    boxes: List[Tuple[int, int, int, int]] = []
    for label in range(1, num_labels):
        x, y, w, h, area = stats[label]
        if int(area) >= min_area:
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
    return max(0, x0 - margin), max(0, y0 - margin), min(w, x1 + margin), min(h, y1 + margin)


def smooth_alpha(mask: np.ndarray) -> np.ndarray:
    alpha = mask.astype(np.uint8) * 255
    alpha = cv2.GaussianBlur(alpha, (0, 0), 1.35)
    alpha[alpha < 10] = 0
    alpha[alpha > 245] = 255
    return alpha


def edge_clearance(mask: np.ndarray) -> int:
    ys, xs = np.nonzero(mask)
    if len(xs) == 0 or len(ys) == 0:
        return 0
    h, w = mask.shape
    return int(min(xs.min(), ys.min(), w - 1 - xs.max(), h - 1 - ys.max()))


def alpha_quality(mask: np.ndarray, alpha: np.ndarray) -> Tuple[bool, str, Dict[str, Any]]:
    coverage = float(mask.mean())
    clearance = edge_clearance(mask)
    border_alpha = np.concatenate(
        [alpha[:4, :].reshape(-1), alpha[-4:, :].reshape(-1), alpha[:, :4].reshape(-1), alpha[:, -4:].reshape(-1)]
    )
    metrics = {
        "foreground_coverage": round(coverage, 4),
        "edge_clearance_px": clearance,
        "alpha_min": int(alpha.min()),
        "alpha_max": int(alpha.max()),
        "border_alpha_mean": round(float(border_alpha.mean()), 2),
    }
    if coverage < 0.01:
        return False, "alpha_failed_foreground_too_small", metrics
    if coverage > 0.96:
        return False, "alpha_failed_foreground_too_large", metrics
    if clearance < 4:
        return False, "alpha_failed_foreground_touches_crop_edge", metrics
    if int(alpha.max()) < 220:
        return False, "alpha_failed_no_opaque_subject", metrics
    return True, "passed_pending_user_review", metrics


def checkerboard(size: Tuple[int, int], cell: int = 24) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, (238, 238, 238))
    draw = ImageDraw.Draw(image)
    for y in range(0, height, cell):
        for x in range(0, width, cell):
            if ((x // cell) + (y // cell)) % 2:
                draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(206, 206, 206))
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


def draw_lines(draw: ImageDraw.ImageDraw, xy: Tuple[int, int], lines: Iterable[str], font: ImageFont.ImageFont) -> None:
    x, y = xy
    for line in lines:
        draw.text((x, y), line, fill=(34, 34, 34), font=font)
        y += 25


def crop_one(asset: Dict[str, Any], output_dir: Path) -> Dict[str, Any]:
    source_path = REPO_ROOT / str(asset.get("local_path", ""))
    if not source_path.exists():
        raise FileNotFoundError(str(source_path))
    asset_need_id = str(asset["asset_need_id"])
    asset_type = str(asset.get("asset_type", "asset"))
    rgb = load_rgb(source_path)
    mask = foreground_mask(rgb)
    x0, y0, x1, y1 = significant_bbox(mask)
    cropped = rgb[y0:y1, x0:x1, :]
    cropped_mask = mask[y0:y1, x0:x1]
    pad = 40
    bg_color = estimate_background(rgb).astype(np.uint8)
    padded = np.zeros((cropped.shape[0] + pad * 2, cropped.shape[1] + pad * 2, 3), dtype=np.uint8)
    padded[:, :, :] = bg_color.reshape(1, 1, 3)
    padded[pad : pad + cropped.shape[0], pad : pad + cropped.shape[1], :] = cropped
    padded_mask = np.zeros((cropped_mask.shape[0] + pad * 2, cropped_mask.shape[1] + pad * 2), dtype=bool)
    padded_mask[pad : pad + cropped_mask.shape[0], pad : pad + cropped_mask.shape[1]] = cropped_mask
    cropped = padded
    cropped_mask = padded_mask
    alpha = smooth_alpha(cropped_mask)
    passed, status, metrics = alpha_quality(cropped_mask, alpha)
    cropped_path = output_dir / f"{asset_need_id}_{asset_type}_cropped.png"
    alpha_path = output_dir / f"{asset_need_id}_alpha.png"
    save_rgb(cropped, cropped_path)
    save_rgba(cropped, alpha, alpha_path)
    return {
        "asset_need_id": asset_need_id,
        "asset_type": asset_type,
        "caption_text": asset.get("caption_text"),
        "source_asset_path": rel(source_path),
        "cropped_path": rel(cropped_path),
        "alpha_path": rel(alpha_path),
        "original_size": [int(rgb.shape[1]), int(rgb.shape[0])],
        "cropped_size": [int(cropped.shape[1]), int(cropped.shape[0])],
        "crop_box": [int(x0), int(y0), int(x1), int(y1)],
        "transparent_ready": bool(passed),
        "alpha_quality": status,
        "alpha_quality_metrics": metrics,
        "edge_quality": "safe_margin_preserved_pending_user_review" if metrics["edge_clearance_px"] >= 10 else "needs_manual_review",
        "halo_check": "pending_user_review" if passed else "alpha_failed_pending_manual_or_picsart",
        "shadow_preserved": "pending_user_review",
        "review_status": "pending_user_review",
        "approved_for_video": False,
        "approved_for_library": False,
    }


def contact_sheet(entries: List[Dict[str, Any]], output_dir: Path) -> Path:
    output_path = output_dir / "alpha_assets_contact_sheet.jpg"
    cell_w, cell_h = 360, 300
    label_h = 122
    columns = 3
    rows = len(entries)
    canvas = Image.new("RGB", (columns * cell_w + 80, rows * (cell_h + label_h) + 140), (244, 243, 239))
    draw = ImageDraw.Draw(canvas)
    title_font = load_font(34)
    small_font = load_font(20)
    draw.text((40, 30), "Auto visual asset alpha crop probe", fill=(22, 22, 22), font=title_font)
    draw.text((40, 78), "generated / cropped / alpha preview, all pending_user_review", fill=(84, 84, 84), font=small_font)
    labels = ["generated", "cropped", "alpha"]
    for row, entry in enumerate(entries):
        y = 124 + row * (cell_h + label_h)
        paths = [REPO_ROOT / entry["source_asset_path"], REPO_ROOT / entry["cropped_path"], REPO_ROOT / entry["alpha_path"]]
        for col, path in enumerate(paths):
            x = 40 + col * cell_w
            preview = fit_on_canvas(path, (cell_w - 28, cell_h), checker=(labels[col] == "alpha"))
            canvas.paste(preview, (x, y))
            draw.rectangle((x, y, x + cell_w - 28, y + cell_h), outline=(184, 184, 178), width=2)
            draw.text((x, y + cell_h + 8), labels[col], fill=(32, 32, 32), font=small_font)
        draw_lines(
            draw,
            (40, y + cell_h + 36),
            [
                f"{entry['asset_need_id']} / {entry['asset_type']}",
                f"transparent_ready={str(entry['transparent_ready']).lower()}",
                f"alpha_quality={entry['alpha_quality']}",
                f"edge={entry['edge_quality']}",
            ],
            small_font,
        )
    canvas.save(output_path, quality=92)
    return output_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--runtime-dir", default=str(DEFAULT_RUNTIME_DIR))
    args = parser.parse_args()

    runtime_dir = Path(args.runtime_dir)
    generation_manifest_path = runtime_dir / "image_generation_manifest.json"
    alpha_manifest_path = runtime_dir / "alpha_crop_manifest.json"
    alpha_report_path = runtime_dir / "alpha_quality_report.json"
    output_dir = runtime_dir / "alpha_assets"
    output_dir.mkdir(parents=True, exist_ok=True)
    if not generation_manifest_path.exists():
        result = {"status": "blocked_image_generation_manifest_missing", "path": rel(generation_manifest_path)}
        alpha_manifest_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(result, ensure_ascii=False))
        return 2
    generation_manifest = json.loads(generation_manifest_path.read_text(encoding="utf-8"))
    generated_assets = [asset for asset in generation_manifest.get("assets", []) if asset.get("status") == "generated"]
    entries: List[Dict[str, Any]] = []
    failures: List[Dict[str, Any]] = []
    for asset in generated_assets:
        try:
            entries.append(crop_one(asset, output_dir))
        except (FileNotFoundError, RuntimeError, OSError, ValueError) as exc:
            failures.append({
                "asset_need_id": asset.get("asset_need_id"),
                "status": "alpha_failed_pending_manual_or_picsart",
                "failure": {"type": exc.__class__.__name__, "message": str(exc)[:300]},
                "approved_for_video": False,
            })
    alpha_success = [entry for entry in entries if entry.get("transparent_ready")]
    sheet_path = contact_sheet(entries, output_dir) if entries else None
    status = "alpha_assets_generated_pending_user_review" if len(alpha_success) >= MIN_ALPHA_ASSETS else "blocked_less_than_5_alpha_assets"
    manifest = {
        "task_type": "auto_visual_asset_need_detection_probe",
        "status": status,
        "generated_at_unix": int(time.time()),
        "total_generated_assets": len(generated_assets),
        "total_alpha_success": len(alpha_success),
        "runtime_assets_committed": False,
        "alpha_contact_sheet": rel(sheet_path) if sheet_path else None,
        "assets": entries,
        "failed_assets": failures,
    }
    quality_report = {
        "task_type": "auto_visual_asset_need_detection_probe",
        "status": status,
        "total_alpha_success": len(alpha_success),
        "alpha_success_asset_ids": [entry["asset_need_id"] for entry in alpha_success],
        "failed_assets": failures,
        "quality_summary": [
            {
                "asset_need_id": entry["asset_need_id"],
                "transparent_ready": entry["transparent_ready"],
                "alpha_quality": entry["alpha_quality"],
                "edge_quality": entry["edge_quality"],
                "halo_check": entry["halo_check"],
                "shadow_preserved": entry["shadow_preserved"],
                "approved_for_video": False,
            }
            for entry in entries
        ],
    }
    alpha_manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    alpha_report_path.write_text(json.dumps(quality_report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({
        "status": status,
        "total_alpha_success": len(alpha_success),
        "alpha_crop_manifest": rel(alpha_manifest_path),
        "alpha_quality_report": rel(alpha_report_path),
    }, ensure_ascii=False))
    return 0 if status == "alpha_assets_generated_pending_user_review" else 3


if __name__ == "__main__":
    sys.exit(main())
