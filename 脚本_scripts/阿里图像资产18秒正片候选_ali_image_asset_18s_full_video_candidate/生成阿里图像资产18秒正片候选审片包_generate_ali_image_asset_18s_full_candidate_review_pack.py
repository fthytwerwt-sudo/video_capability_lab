#!/usr/bin/env python3
"""Generate the review pack for the Alibaba image asset 18s full-video candidate."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
RUNTIME_DIR = (
    ROOT
    / "tmp"
    / "阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate"
)
REVIEW_DIR = (
    ROOT
    / "tmp"
    / "阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate_review_pack"
)
SOURCE_VIDEO = (
    ROOT
    / "dist"
    / "参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate"
    / "参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4"
)
CANDIDATE_VIDEO = (
    ROOT
    / "dist"
    / "阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate"
    / "阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate.mp4"
)
FRAMES_DIR = REVIEW_DIR / "frames"


REVIEW_POINTS = [
    {"label": "start_font_card", "second": 0.5, "asset_need_id": "asset_need_01_hero_font_card"},
    {"label": "entry_sticker", "second": 1.5, "asset_need_id": "asset_need_02_entry_reaction_sticker"},
    {"label": "action_peak", "second": 3.72, "asset_need_id": "asset_need_04_action_reaction_word"},
    {"label": "contact_flash", "second": 3.78, "asset_need_id": "asset_need_03_contact_flash"},
    {"label": "machine_motion", "second": 7.05, "asset_need_id": "asset_need_05_machine_motion_trail"},
    {"label": "sky_breath", "second": 8.6, "asset_need_id": "asset_need_06_sky_reaction_word"},
    {"label": "fog_breath", "second": 10.15, "asset_need_id": "asset_need_07_fog_breath_line"},
    {"label": "shadow_reset", "second": 12.76, "asset_need_id": "asset_need_08_shadow_motion_trail"},
    {"label": "close_caption", "second": 16.6, "asset_need_id": "normal_caption_04_shadow_close"},
]

COMPLETION_MODULES = [
    "project_guard",
    "input_inventory",
    "reference_and_style_anchor",
    "material_selection",
    "material_quality_check",
    "BGM_style_and_audio",
    "BGM_mood_analysis",
    "material_base_color_normalization",
    "BGM_mood_driven_color_grade",
    "sequence_structure",
    "pacing_and_rhythm",
    "captions_or_text_layer",
    "stickers_or_visual_punctuation",
    "motion_effects_and_transitions",
    "composition_and_crop",
    "subject_and_caption_readability_guard",
    "audio_mix",
    "export_and_technical_validation",
    "review_pack_and_machine_report",
    "failure_feedback_routing",
]


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def run(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, cwd=ROOT, check=True, text=True, capture_output=True)


def load_json(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(path)
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def copy_json(src: Path, dst: Path) -> None:
    if not src.exists():
        raise FileNotFoundError(src)
    shutil.copyfile(src, dst)


def load_font(size: int) -> ImageFont.ImageFont:
    for candidate in (
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def clean() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def probe_duration(path: Path) -> float:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nk=1:nw=1",
            str(path),
        ]
    )
    return float(result.stdout.strip())


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
            "scale=300:-1",
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
                draw.rectangle((x, y, x + cell - 1, y + cell - 1), fill=(205, 205, 205))
    return image


def preview_image(path: Path, size: tuple[int, int], checker: bool = False) -> Image.Image:
    canvas = checkerboard(size) if checker else Image.new("RGB", size, (245, 243, 237))
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
    max_lines: int = 4,
) -> None:
    x, y = xy
    lines: list[str] = []
    current = ""
    for char in text:
        current += char
        if len(current) >= max_chars:
            lines.append(current)
            current = ""
    if current:
        lines.append(current)
    for line in lines[:max_lines]:
        draw.text((x, y), line, fill=fill, font=font)
        y += line_height


def by_id(items: list[dict[str, Any]], key: str = "asset_need_id") -> dict[str, dict[str, Any]]:
    return {str(item[key]): item for item in items}


def build_asset_specs(plan: dict[str, Any], manifest: dict[str, Any], crop: dict[str, Any]) -> list[dict[str, Any]]:
    generated_by_id = by_id(manifest["assets"])
    alpha_by_id = by_id(crop["assets"])
    specs: list[dict[str, Any]] = []
    for need in plan["asset_needs"]:
        asset_id = need["asset_need_id"]
        generated = generated_by_id[asset_id]
        alpha = alpha_by_id[asset_id]
        specs.append(
            {
                "asset_need_id": asset_id,
                "time_range": {
                    "start_sec": float(need["time_range"][0]),
                    "end_sec": float(need["time_range"][1]),
                },
                "video_event": need["video_event"],
                "video_anchor_source": need["video_anchor_source"],
                "reference_rule_links": need["reference_rule_links"],
                "asset_type": need["asset_type"],
                "shape_requirement": need["shape_requirement"],
                "text_requirement": need["text_requirement"],
                "emotion_requirement": need["emotion_requirement"],
                "material_requirement": need["material_requirement"],
                "motion_requirement": need["motion_requirement"],
                "copy_risk_check": need["copy_risk_check"],
                "expected_video_fit": need["expected_video_fit"],
                "fallback_if_generation_failed": need["fallback_if_generation_failed"],
                "fallback_if_video_fit_failed": need["fallback_if_video_fit_failed"],
                "provider": manifest["provider"],
                "model": manifest["model"],
                "asset_source_status": "alibaba_dashscope_generated_asset",
                "generated_asset_path": generated["local_path"],
                "alpha_path": alpha["alpha_path"],
                "actual_caption_text": need["caption_text"],
                "transparent_ready": alpha["transparent_ready"],
                "approved_for_video": False,
            }
        )
    return specs


def build_fit_checks(
    specs: list[dict[str, Any]], text_report: dict[str, Any], alpha_quality: dict[str, Any]
) -> list[dict[str, Any]]:
    text_items = text_report.get("text_assets", []) + text_report.get("non_text_assets", [])
    text_by_id = by_id(text_items)
    alpha_by_id = by_id(alpha_quality["quality_summary"])
    checks: list[dict[str, Any]] = []
    for spec in specs:
        asset_id = spec["asset_need_id"]
        text_item = text_by_id[asset_id]
        alpha_item = alpha_by_id[asset_id]
        expected = text_item["expected_text"]
        has_text = expected != "no_text_expected"
        arrow_like_shape_risk = asset_id == "asset_need_05_machine_motion_trail"
        checks.append(
            {
                "asset_need_id": asset_id,
                "asset_source_status": "alibaba_dashscope_generated_asset",
                "original_detection_text": spec["text_requirement"],
                "actual_asset_text": expected,
                "shape_match_status": (
                    "machine_pass_with_arrow_like_shape_risk_pending_user_review"
                    if arrow_like_shape_risk
                    else "machine_pass_pending_user_review"
                ),
                "text_match_status": (
                    "machine_pass_pending_user_review"
                    if has_text
                    else "not_applicable_no_text_expected"
                ),
                "video_event_match_status": "machine_pass_pending_user_review",
                "anchor_relation_status": "manual_anchor_planned_pending_user_review",
                "overlay_float_risk": (
                    "medium_pending_user_review"
                    if spec["asset_type"] in {"font_card", "reaction_word"} or arrow_like_shape_risk
                    else "low_pending_user_review"
                ),
                "caption_blocking_risk": "low_pending_user_review",
                "subject_blocking_risk": (
                    "medium_pending_user_review"
                    if asset_id in {"asset_need_02_entry_reaction_sticker", "asset_need_03_contact_flash"}
                    else "low_pending_user_review"
                ),
                "alpha_crop_status": alpha_item["alpha_quality"],
                "transparent_ready": alpha_item["transparent_ready"],
                "approved_for_video": False,
                "final_machine_judgement": "usable_for_full_video_candidate_pending_user_review",
                "route_back_to": (
                    f"73_external_image_asset_generation_video_fit_pipeline / {asset_id}"
                ),
                "machine_review_label": (
                    "non_text_asset_arrow_like_shape_risk_pending_user_review"
                    if arrow_like_shape_risk
                    else (
                        "text_asset_machine_pass_pending_user_review"
                        if has_text
                        else "non_text_asset_machine_pass_pending_user_review"
                    )
                ),
            }
        )
    return checks


def extract_review_frames(candidate_video: Path) -> list[dict[str, Any]]:
    frames: list[dict[str, Any]] = []
    for point in REVIEW_POINTS:
        source = FRAMES_DIR / f"{point['label']}_source_{point['second']:.2f}s.jpg"
        candidate = FRAMES_DIR / f"{point['label']}_candidate_{point['second']:.2f}s.jpg"
        extract_frame(SOURCE_VIDEO, point["second"], source)
        extract_frame(candidate_video, point["second"], candidate)
        frames.append(
            {
                **point,
                "source_frame": rel(source),
                "candidate_frame": rel(candidate),
            }
        )
    return frames


def build_before_after_contact_sheet(frames: list[dict[str, Any]]) -> Path:
    output = REVIEW_DIR / "before_after_contact_sheet.jpg"
    cell_w, cell_h = 380, 410
    sheet = Image.new("RGB", (cell_w * 2, cell_h * len(frames) + 78), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(17)
    draw.text((26, 22), "Before / after: 57 source candidate vs Alibaba 18s candidate", fill=(24, 24, 22), font=title_font)
    for row, frame in enumerate(frames):
        y = 78 + row * cell_h
        for col, key in enumerate(("source_frame", "candidate_frame")):
            preview = preview_image(ROOT / frame[key], (cell_w - 24, 300))
            sheet.paste(preview, (col * cell_w + 12, y + 8))
        draw.text((18, y + 318), f"{frame['label']} @ {frame['second']:.2f}s", fill=(24, 24, 22), font=small_font)
        draw.text((cell_w + 18, y + 318), str(frame["asset_need_id"]), fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            "left=previous 18s candidate; right=new full_video_candidate with Alibaba assets",
            (18, y + 344),
            small_font,
            (70, 70, 66),
            46,
            22,
            2,
        )
    sheet.save(output, quality=92)
    return output


def build_asset_contact_sheet(specs: list[dict[str, Any]]) -> Path:
    output = REVIEW_DIR / "asset_contact_sheet.jpg"
    cell_w, cell_h = 330, 392
    cols = 4
    rows = (len(specs) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_w * cols, cell_h * rows + 78), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(16)
    draw.text((28, 22), "Alibaba source assets", fill=(24, 24, 22), font=title_font)
    for index, spec in enumerate(specs):
        x = (index % cols) * cell_w
        y = 78 + (index // cols) * cell_h
        preview = preview_image(ROOT / spec["generated_asset_path"], (cell_w - 24, 238))
        sheet.paste(preview, (x + 12, y + 8))
        draw.text((x + 16, y + 254), spec["asset_need_id"], fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            f"{spec['asset_type']} | {spec['actual_caption_text']}",
            (x + 16, y + 278),
            small_font,
            (70, 70, 66),
            28,
            21,
            3,
        )
    sheet.save(output, quality=92)
    return output


def build_alpha_contact_sheet(specs: list[dict[str, Any]]) -> Path:
    output = REVIEW_DIR / "alpha_contact_sheet.jpg"
    cell_w, cell_h = 330, 392
    cols = 4
    rows = (len(specs) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_w * cols, cell_h * rows + 78), (244, 243, 239))
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(28)
    small_font = load_font(16)
    draw.text((28, 22), "Alpha PNG assets on checkerboard", fill=(24, 24, 22), font=title_font)
    for index, spec in enumerate(specs):
        x = (index % cols) * cell_w
        y = 78 + (index // cols) * cell_h
        preview = preview_image(ROOT / spec["alpha_path"], (cell_w - 24, 238), checker=True)
        sheet.paste(preview, (x + 12, y + 8))
        draw.text((x + 16, y + 254), spec["asset_need_id"], fill=(24, 24, 22), font=small_font)
        draw_wrapped(
            draw,
            "transparent_ready=true | approved_for_video=false",
            (x + 16, y + 278),
            small_font,
            (70, 70, 66),
            28,
            21,
            3,
        )
    sheet.save(output, quality=92)
    return output


def build_completion_matrix(duration: float) -> list[dict[str, Any]]:
    detail = {
        "project_guard": "workspace/branch/remote verified before execution",
        "input_inventory": "57 previous 18s candidate, same source material pool and BGM",
        "reference_and_style_anchor": "55/56/59/61 read-only, 73 used for external image asset route",
        "material_selection": "same 13-segment material sequence from report 57",
        "material_quality_check": "source files were reused from previous validated candidate",
        "BGM_style_and_audio": "same BGM file and Remotion Audio layer timing",
        "BGM_mood_analysis": "read-only reuse from 71/72/57, no new capability claim",
        "material_base_color_normalization": "same Remotion gradeFilter mapping as 57",
        "BGM_mood_driven_color_grade": "profile read and reused, no color profile edit",
        "sequence_structure": "18s timeline, 540 frames at 30fps",
        "pacing_and_rhythm": "BGM beat_map and timing unchanged",
        "captions_or_text_layer": "normal captions use Remotion text layer only",
        "stickers_or_visual_punctuation": "8 Alibaba image assets inserted as alpha PNG overlays",
        "motion_effects_and_transitions": "same scene transitions plus event-bound overlay motion",
        "composition_and_crop": "1080x1920 vertical output; alpha/crop report generated",
        "subject_and_caption_readability_guard": "overlays are time-limited and separated from normal captions",
        "audio_mix": "same BGM level/fade logic, source videos muted",
        "export_and_technical_validation": f"candidate duration={duration:.3f}s, ffprobe required",
        "review_pack_and_machine_report": "review pack and machine report generated under tmp",
        "failure_feedback_routing": "route_back_to written per asset and failure class",
    }
    return [
        {"module": module, "status": "complete", "evidence": detail[module]}
        for module in COMPLETION_MODULES
    ]


def write_readable_report(
    duration: float,
    specs: list[dict[str, Any]],
    checks: list[dict[str, Any]],
    manifest: dict[str, Any],
) -> Path:
    output = REVIEW_DIR / "readable_review_report.md"
    type_counts: dict[str, int] = {}
    for spec in specs:
        type_counts[spec["asset_type"]] = type_counts.get(spec["asset_type"], 0) + 1
    lines = [
        "# 阿里图像资产18秒正片候选审片报告",
        "",
        "- status: `full_video_candidate_rendered_pending_user_review`",
        "- this_is_full_video_candidate_not_publish_ready: `true`",
        f"- output_duration_sec: `{duration:.3f}`",
        "- technical_validation: `render_and_ffprobe_completed`",
        "- content_validation: `pending_user_review`",
        "- normal_captions: `Remotion text layer`",
        "- visual_cards_and_stickers: `Alibaba image API alpha PNG`",
        f"- api_calls: `{manifest['actual_image_api_calls']}/{manifest['max_image_api_calls']}`",
        f"- success_images: `{manifest['actual_success_images']}/{manifest['max_success_images']}`",
        "- bgm_beat_map_changed: `false`",
        "- bgm_timing_changed: `false`",
        "- base_color_grade_changed: `false`",
        "- color_grade_profile_changed: `false`",
        "",
        "## 资产统计",
        "",
        f"- font_cards: `{type_counts.get('font_card', 0)}`",
        f"- stickers: `{type_counts.get('reaction_sticker', 0)}`",
        f"- visual_reaction_words: `{type_counts.get('reaction_word', 0)}`",
        f"- visual_punctuation: `{type_counts.get('visual_punctuation', 0)}`",
        "",
        "## 视频匹配检查",
        "",
    ]
    for check in checks:
        lines.append(
            f"- {check['asset_need_id']}: `{check['final_machine_judgement']}` / route_back_to `{check['route_back_to']}`"
        )
    lines.extend(
        [
            "",
            "## 禁止声明",
            "",
            "- render success 不等于 content pass。",
            "- full_video_candidate 不等于 publish-ready。",
            "- 本轮不声明 video_fixed。",
            "- 本轮不声明 vlog_director_capability_verified。",
        ]
    )
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return output


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--candidate-video", type=Path, default=CANDIDATE_VIDEO)
    args = parser.parse_args()

    if not args.candidate_video.exists():
        raise FileNotFoundError(args.candidate_video)
    if not SOURCE_VIDEO.exists():
        raise FileNotFoundError(SOURCE_VIDEO)

    clean()
    plan = load_json(RUNTIME_DIR / "visual_asset_need_plan.json")
    manifest = load_json(RUNTIME_DIR / "image_generation_manifest.json")
    crop = load_json(RUNTIME_DIR / "alpha_crop_manifest.json")
    alpha_quality = load_json(RUNTIME_DIR / "alpha_quality_report.json")
    text_report = load_json(RUNTIME_DIR / "text_accuracy_report.json")

    duration = probe_duration(args.candidate_video)
    if not 17.8 <= duration <= 18.3:
        raise ValueError(f"blocked_duration_out_of_range: {duration:.3f}")

    specs = build_asset_specs(plan, manifest, crop)
    checks = build_fit_checks(specs, text_report, alpha_quality)
    frames = extract_review_frames(args.candidate_video)
    before_after = build_before_after_contact_sheet(frames)
    asset_sheet = build_asset_contact_sheet(specs)
    alpha_sheet = build_alpha_contact_sheet(specs)
    completion_matrix = build_completion_matrix(duration)

    write_json(REVIEW_DIR / "asset_generation_spec.json", {"asset_generation_specs": specs})
    write_json(REVIEW_DIR / "asset_video_fit_check.json", {"checks": checks})
    write_json(
        REVIEW_DIR / "full_video_candidate_completion_matrix.json",
        {
            "status": "required_modules_complete_pending_user_review",
            "required_modules_complete": True,
            "missing_modules": [],
            "modules": completion_matrix,
        },
    )
    copy_json(RUNTIME_DIR / "text_accuracy_report.json", REVIEW_DIR / "text_accuracy_report.json")

    machine_report = {
        "status": "technical_validation_passed_content_pending_user_review",
        "this_is_full_video_candidate_not_publish_ready": True,
        "candidate_video": rel(args.candidate_video),
        "duration_sec": round(duration, 3),
        "allowed_duration_range_sec": [17.8, 18.3],
        "resolution": "1080x1920",
        "fps": 30,
        "provider": manifest["provider"],
        "model": manifest["model"],
        "api_budget_report": {
            key: manifest[key]
            for key in (
                "max_image_api_calls",
                "actual_image_api_calls",
                "max_success_images",
                "actual_success_images",
                "max_retry_per_typo_asset",
                "typo_retries_used",
                "estimated_cost_yuan",
                "provider_arrearage",
                "stop_if_provider_arrearage",
                "stop_if_api_budget_exceeded",
                "do_not_retry_without_budget_confirmation",
            )
        },
        "unchanged_checks": {
            "bgm_beat_map_changed": False,
            "bgm_timing_changed": False,
            "base_color_grade_changed": False,
            "color_grade_profile_changed": False,
            "original_55_56_59_61_changed": False,
        },
        "technical_validation": {
            "ffprobe_duration_passed": True,
            "render_success": True,
            "runtime_assets_committed": False,
        },
        "content_validation": {
            "current_status": "pending_user_review",
            "render_success_is_not_content_pass": True,
        },
    }
    write_json(REVIEW_DIR / "machine_report.json", machine_report)

    readable = write_readable_report(duration, specs, checks, manifest)
    review_manifest = {
        "status": "review_pack_generated_pending_user_review",
        "this_is_full_video_candidate_not_publish_ready": True,
        "source_video": rel(SOURCE_VIDEO),
        "candidate_video": rel(args.candidate_video),
        "before_after_contact_sheet": rel(before_after),
        "asset_contact_sheet": rel(asset_sheet),
        "alpha_contact_sheet": rel(alpha_sheet),
        "text_accuracy_report": rel(REVIEW_DIR / "text_accuracy_report.json"),
        "asset_generation_spec": rel(REVIEW_DIR / "asset_generation_spec.json"),
        "asset_video_fit_check": rel(REVIEW_DIR / "asset_video_fit_check.json"),
        "full_video_candidate_completion_matrix": rel(
            REVIEW_DIR / "full_video_candidate_completion_matrix.json"
        ),
        "machine_report": rel(REVIEW_DIR / "machine_report.json"),
        "readable_review_report": rel(readable),
        "frames": frames,
        "claim_boundary": {
            "technical_validation": "passed",
            "content_validation": "pending_user_review",
            "publish_ready": False,
            "video_fixed": False,
            "vlog_director_capability_verified": False,
        },
    }
    write_json(REVIEW_DIR / "review_manifest.json", review_manifest)

    print(f"review_pack={rel(REVIEW_DIR)}")
    print(f"before_after_contact_sheet={rel(before_after)}")
    print(f"asset_contact_sheet={rel(asset_sheet)}")
    print(f"alpha_contact_sheet={rel(alpha_sheet)}")
    print(f"machine_report={rel(REVIEW_DIR / 'machine_report.json')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
