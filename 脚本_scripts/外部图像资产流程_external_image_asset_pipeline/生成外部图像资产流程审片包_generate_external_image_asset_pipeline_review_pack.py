#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
SCRIPT_DIR = Path(__file__).resolve().parent
RUNTIME_DIR = ROOT / "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe"
REVIEW_DIR = ROOT / "tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack"
SOURCE_VIDEO = (
    ROOT
    / "dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4"
)
CANDIDATE_VIDEO = (
    ROOT
    / "dist/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate.mp4"
)


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, cwd=ROOT, check=True)


def load_json(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(path)
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_font(size: int) -> ImageFont.ImageFont:
    for candidate in (
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
    ):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def clean() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    (REVIEW_DIR / "frames").mkdir(parents=True, exist_ok=True)


def extract_frame(video: Path, second: float, output: Path) -> None:
    if not video.exists():
        raise FileNotFoundError(video)
    output.parent.mkdir(parents=True, exist_ok=True)
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
            str(video),
            "-frames:v",
            "1",
            "-vf",
            "scale=270:-1",
            "-q:v",
            "2",
            str(output),
        ]
    )


def checkerboard(size: tuple[int, int], cell: int = 24) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, (238, 238, 238))
    draw = ImageDraw.Draw(image)
    for y in range(0, height, cell):
        for x in range(0, width, cell):
            if ((x // cell) + (y // cell)) % 2:
                draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(206, 206, 206))
    return image


def preview_image(path: Path, size: tuple[int, int], checker: bool = False) -> Image.Image:
    canvas = checkerboard(size) if checker else Image.new("RGB", size, (246, 246, 242))
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        rgba.thumbnail((size[0] - 24, size[1] - 24), Image.LANCZOS)
        x = (size[0] - rgba.width) // 2
        y = (size[1] - rgba.height) // 2
        canvas.paste(rgba.convert("RGB"), (x, y), rgba.getchannel("A"))
    return canvas


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    font: ImageFont.ImageFont,
    fill: tuple[int, int, int],
    max_chars: int,
    line_height: int,
) -> None:
    x, y = xy
    current = ""
    lines: list[str] = []
    for char in text:
        current += char
        if len(current) >= max_chars:
            lines.append(current)
            current = ""
    if current:
        lines.append(current)
    for line in lines[:4]:
        draw.text((x, y), line, fill=fill, font=font)
        y += line_height


def by_id(items: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    return {str(item["asset_need_id"]): item for item in items}


def build_asset_contact_sheet(specs: list[dict[str, Any]], generation_assets: dict[str, dict[str, Any]]) -> Path:
    output = REVIEW_DIR / "asset_contact_sheet.jpg"
    cell_w, cell_h = 360, 420
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 2 + 82), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(18)
    draw.text((32, 24), "External image asset sources", fill=(24, 24, 22), font=title_font)
    for index, spec in enumerate(specs):
        x = (index % 3) * cell_w
        y = 82 + (index // 3) * cell_h
        asset = generation_assets[spec["asset_need_id"]]
        preview = preview_image(ROOT / asset["local_path"], (cell_w - 28, 250))
        sheet.paste(preview, (x + 14, y + 8))
        draw.text((x + 20, y + 268), spec["asset_need_id"], fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            f"{spec['asset_source_status']} | actual={spec['actual_caption_text']}",
            (x + 20, y + 296),
            small_font,
            (70, 70, 66),
            26,
            23,
        )
    sheet.save(output, quality=92)
    return output


def build_alpha_contact_sheet(specs: list[dict[str, Any]]) -> Path:
    output = REVIEW_DIR / "alpha_contact_sheet.jpg"
    cell_w, cell_h = 360, 398
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 2 + 82), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(18)
    draw.text((32, 24), "Alpha assets", fill=(24, 24, 22), font=title_font)
    for index, spec in enumerate(specs):
        x = (index % 3) * cell_w
        y = 82 + (index // 3) * cell_h
        preview = preview_image(ROOT / spec["alpha_path"], (cell_w - 28, 244), checker=True)
        sheet.paste(preview, (x + 14, y + 8))
        draw.text((x + 20, y + 262), spec["asset_need_id"], fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            f"{spec['alpha_quality']} | approved_for_video=false",
            (x + 20, y + 290),
            small_font,
            (70, 70, 66),
            30,
            23,
        )
    sheet.save(output, quality=92)
    return output


def extract_review_frames(
    specs: list[dict[str, Any]], candidate_video: Path
) -> list[dict[str, Any]]:
    frames: list[dict[str, Any]] = []
    for spec in specs:
        mid = (float(spec["time_range"]["start_sec"]) + float(spec["time_range"]["end_sec"])) / 2
        source_path = REVIEW_DIR / "frames" / f"{spec['asset_need_id']}_source_{mid:.2f}s.jpg"
        candidate_path = REVIEW_DIR / "frames" / f"{spec['asset_need_id']}_candidate_{mid:.2f}s.jpg"
        extract_frame(SOURCE_VIDEO, mid, source_path)
        extract_frame(candidate_video, mid, candidate_path)
        frames.append(
            {
                "asset_need_id": spec["asset_need_id"],
                "second": round(mid, 3),
                "source_frame": rel(source_path),
                "candidate_frame": rel(candidate_path),
            }
        )
    return frames


def build_before_after_contact_sheet(
    specs: list[dict[str, Any]], checks: dict[str, dict[str, Any]], frames: list[dict[str, Any]]
) -> Path:
    output = REVIEW_DIR / "before_after_contact_sheet.jpg"
    cell_w, cell_h = 360, 440
    sheet = Image.new("RGB", (cell_w * 2, cell_h * len(frames) + 82), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(18)
    draw.text((28, 24), "Before / after: source video vs pipeline candidate", fill=(24, 24, 22), font=title_font)
    spec_by_id = by_id(specs)
    for row, frame in enumerate(frames):
        y = 82 + row * cell_h
        for col, key in enumerate(("source_frame", "candidate_frame")):
            image = preview_image(ROOT / frame[key], (cell_w - 26, 288))
            x = col * cell_w
            sheet.paste(image, (x + 13, y + 8))
        spec = spec_by_id[frame["asset_need_id"]]
        check = checks[frame["asset_need_id"]]
        draw.text((18, y + 308), f"{frame['asset_need_id']} @ {frame['second']:.2f}s", fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            f"source event: {spec['video_event']}",
            (18, y + 334),
            small_font,
            (70, 70, 66),
            52,
            23,
        )
        draw_wrapped(
            draw,
            f"machine: {check['final_machine_judgement']}",
            (cell_w + 18, y + 334),
            small_font,
            (70, 70, 66),
            46,
            23,
        )
    sheet.save(output, quality=92)
    return output


def build_video_fit_contact_sheet(
    specs: list[dict[str, Any]], checks: dict[str, dict[str, Any]], frames: list[dict[str, Any]]
) -> Path:
    output = REVIEW_DIR / "video_fit_contact_sheet.jpg"
    cell_w, cell_h = 360, 474
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 2 + 82), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(18)
    draw.text((32, 24), "Video fit machine check", fill=(24, 24, 22), font=title_font)
    spec_by_id = by_id(specs)
    for index, frame in enumerate(frames):
        x = (index % 3) * cell_w
        y = 82 + (index // 3) * cell_h
        preview = preview_image(ROOT / frame["candidate_frame"], (cell_w - 28, 250))
        sheet.paste(preview, (x + 14, y + 8))
        asset_id = frame["asset_need_id"]
        spec = spec_by_id[asset_id]
        check = checks[asset_id]
        draw.text((x + 20, y + 268), asset_id, fill=(24, 24, 22), font=small_font)
        draw_wrapped(draw, check["machine_review_label"], (x + 20, y + 296), small_font, (70, 70, 66), 28, 23)
        draw_wrapped(
            draw,
            f"text: {check['text_match_status']} | actual={check['actual_asset_text']}",
            (x + 20, y + 350),
            small_font,
            (70, 70, 66),
            30,
            23,
        )
        draw_wrapped(draw, f"event: {spec['video_event']}", (x + 20, y + 404), small_font, (70, 70, 66), 30, 23)
    sheet.save(output, quality=92)
    return output


def generate_fit_check() -> None:
    run(
        [
            "python3",
            str(SCRIPT_DIR / "生成外部图像资产匹配自检_generate_external_image_asset_fit_check.py"),
            "--review-dir",
            str(REVIEW_DIR),
        ]
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--candidate-video", type=Path, default=CANDIDATE_VIDEO)
    args = parser.parse_args()

    clean()
    generate_fit_check()

    specs_payload = load_json(REVIEW_DIR / "asset_generation_spec.json")
    checks_payload = load_json(REVIEW_DIR / "asset_video_fit_check.json")
    generation_manifest = load_json(RUNTIME_DIR / "image_generation_manifest.json")
    specs = specs_payload["asset_generation_specs"]
    checks = by_id(checks_payload["checks"])
    generation_assets = by_id(generation_manifest["assets"])

    frames = extract_review_frames(specs, args.candidate_video)
    before_after = build_before_after_contact_sheet(specs, checks, frames)
    asset_sheet = build_asset_contact_sheet(specs, generation_assets)
    alpha_sheet = build_alpha_contact_sheet(specs)
    fit_sheet = build_video_fit_contact_sheet(specs, checks, frames)

    manifest = {
        "status": "external_image_asset_pipeline_review_pack_generated",
        "review_status": "pending_user_review",
        "this_is_partial_pipeline_alignment_candidate_not_full_video_candidate": True,
        "source_video": rel(SOURCE_VIDEO),
        "candidate_video": rel(args.candidate_video),
        "before_after_contact_sheet": rel(before_after),
        "asset_contact_sheet": rel(asset_sheet),
        "alpha_contact_sheet": rel(alpha_sheet),
        "video_fit_contact_sheet": rel(fit_sheet),
        "asset_generation_spec": rel(REVIEW_DIR / "asset_generation_spec.json"),
        "asset_video_fit_check": rel(REVIEW_DIR / "asset_video_fit_check.json"),
        "readable_asset_fit_report": rel(REVIEW_DIR / "readable_asset_fit_report.md"),
        "frames": frames,
        "claim_boundary": {
            "technical_render_is_not_content_pass": True,
            "content_validation": "pending_user_review",
            "asset_need_05_06_are_chain_test_only": True,
            "bgm_beat_map_changed": False,
            "base_color_grade_changed": False,
        },
    }
    write_json(REVIEW_DIR / "review_manifest.json", manifest)

    print(f"wrote {rel(before_after)}")
    print(f"wrote {rel(asset_sheet)}")
    print(f"wrote {rel(alpha_sheet)}")
    print(f"wrote {rel(fit_sheet)}")
    print(f"wrote {rel(REVIEW_DIR / 'review_manifest.json')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
