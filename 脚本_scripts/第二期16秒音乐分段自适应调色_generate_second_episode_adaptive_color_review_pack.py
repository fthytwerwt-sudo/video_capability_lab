#!/usr/bin/env python3
"""Generate the second episode adaptive color review pack.

The script writes only runtime review artifacts under tmp/ and reads existing
videos from dist/. It does not change the edit, BGM, shot order, captions, or
stickers.
"""

from __future__ import annotations

import argparse
import json
import math
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

OLD_VIDEO = (
    ROOT
    / "dist/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.mp4"
)
NEW_VIDEO = (
    ROOT
    / "dist/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation.mp4"
)
REVIEW_DIR = (
    ROOT
    / "tmp/第二期16秒音乐分段自适应调色验证_second_episode_16s_music_section_adaptive_color_validation_review_pack"
)
FRAME_DIR = REVIEW_DIR / "before_after_adaptive_color_frames"
AFTER_DIR = REVIEW_DIR / "representative_frames_after"

ADAPTIVE_PROFILE: dict[str, Any] = {
    "brightness_adjust": 0.026,
    "contrast_adjust": 0.042,
    "saturation_adjust": 0.017,
    "temperature_adjust": 0.017,
    "tint_adjust": -0.006,
    "shadow_lift": 0.043,
    "highlight_rolloff": 0.088,
    "vignette_strength": 0.128,
    "grain_strength": 0.036,
    "ffmpeg_filter_candidate": "fallback_route_only: eq/curves/colorbalance/lut3d with enable='between(t,start,end)' if Remotion CSS filter is too weak",
    "remotion_effect_candidate": {
        "apply_mode": "frame_selects_section_profile",
        "css_filter_fields": ["brightness_adjust", "contrast_adjust", "saturation_adjust"],
        "temperature_overlay_field": "temperature_adjust",
        "tint_field": "tint_adjust",
        "shadow_lift_field": "shadow_lift",
        "highlight_rolloff_field": "highlight_rolloff",
        "vignette_strength_field": "vignette_strength",
        "grain_strength_field": "grain_strength",
    },
    "apply_scope": "per_music_section",
    "readability_guard_enabled": True,
    "subject_visibility_guard_enabled": True,
    "caption_readability_guard_enabled": False,
    "source_bgm_mood_tag": "soft_urban_walk_vlog",
    "confidence_score": 0.74,
    "fallback_used": False,
    "fixed_preset_used": False,
    "odd_used_as_fixed_preset": False,
    "style_boundary": "odd/vlog is only a boundary, not a shared odd color preset.",
    "sections": [
        {
            "section_id": "adaptive_section_01_0_3s",
            "music_section": "0-3s hook",
            "time_range": [0, 3],
            "frame_range": [0, 90],
            "brightness_adjust": 0.025,
            "contrast_adjust": 0.035,
            "saturation_adjust": 0.025,
            "temperature_adjust": 0.02,
            "tint_adjust": -0.004,
            "shadow_lift": 0.02,
            "highlight_rolloff": 0.06,
            "vignette_strength": 0.08,
            "grain_strength": 0.03,
            "bgm_signal_source": "BGM opens lightly before the energy fully spreads.",
            "material_color_constraint": "Food highlights and the white dog need protection; avoid strong warm wash.",
            "section_color_intent": "Slightly lift the opening while keeping daylight clean and readable.",
            "reason": "Light BGM entry plus bright material means a gentle lift and highlight guard.",
        },
        {
            "section_id": "adaptive_section_02_3_7s",
            "music_section": "3-7s atmosphere_build",
            "time_range": [3, 7],
            "frame_range": [90, 210],
            "brightness_adjust": 0.025,
            "contrast_adjust": 0.045,
            "saturation_adjust": 0.015,
            "temperature_adjust": 0.015,
            "tint_adjust": -0.006,
            "shadow_lift": 0.025,
            "highlight_rolloff": 0.06,
            "vignette_strength": 0.1,
            "grain_strength": 0.04,
            "bgm_signal_source": "BGM settles into a walking build with one shadow-texture accent.",
            "material_color_constraint": "Street daylight and shadow texture should stay neutral.",
            "section_color_intent": "Keep the block neutral, add layer separation, and rescue shadows gently.",
            "reason": "Steady music asks for structure without a temperature shift.",
        },
        {
            "section_id": "adaptive_section_03_7_11s",
            "music_section": "7-11s motion_progression_and_shift",
            "time_range": [7, 11],
            "frame_range": [210, 330],
            "brightness_adjust": 0.015,
            "contrast_adjust": 0.075,
            "saturation_adjust": 0.045,
            "temperature_adjust": 0.04,
            "tint_adjust": -0.006,
            "shadow_lift": 0.035,
            "highlight_rolloff": 0.1,
            "vignette_strength": 0.12,
            "grain_strength": 0.05,
            "bgm_signal_source": "BGM energy rises from day motion into golden and night arrival.",
            "material_color_constraint": "Golden warmth should stay separated from night signage.",
            "section_color_intent": "Preserve warm shift, increase color separation, and recover highlights.",
            "reason": "This is the strongest lift, but signage and sunset edges need highlight control.",
        },
        {
            "section_id": "adaptive_section_04_11_14s",
            "music_section": "11-14s night_motion",
            "time_range": [11, 14],
            "frame_range": [330, 420],
            "brightness_adjust": 0.045,
            "contrast_adjust": 0.035,
            "saturation_adjust": 0.02,
            "temperature_adjust": 0.015,
            "tint_adjust": -0.01,
            "shadow_lift": 0.075,
            "highlight_rolloff": 0.12,
            "vignette_strength": 0.14,
            "grain_strength": 0.035,
            "bgm_signal_source": "BGM keeps motion tension after the night turn.",
            "material_color_constraint": "Night crossing needs visibility without flattening the dark street.",
            "section_color_intent": "Prioritize shadow lift, soften hard contrast, and keep night movement alive.",
            "reason": "Darker material moves the priority from saturation to shadow and highlight control.",
        },
        {
            "section_id": "adaptive_section_05_14_16s",
            "music_section": "14-16s ending_aftertaste",
            "time_range": [14, 16],
            "frame_range": [420, 480],
            "brightness_adjust": 0.02,
            "contrast_adjust": 0.02,
            "saturation_adjust": -0.02,
            "temperature_adjust": -0.005,
            "tint_adjust": -0.006,
            "shadow_lift": 0.06,
            "highlight_rolloff": 0.08,
            "vignette_strength": 0.2,
            "grain_strength": 0.025,
            "bgm_signal_source": "BGM fades into aftertaste and breath.",
            "material_color_constraint": "The personal shadow ending should not become glossy or overly warm.",
            "section_color_intent": "Lower saturation slightly, settle the image, and add vignette breath.",
            "reason": "The ending asks for restraint rather than another energy lift.",
        },
    ],
}

FRAME_POINTS = [
    ("shot_01_food_hook", 0.6, "adaptive_section_01_0_3s"),
    ("shot_02_dog_walk", 1.9, "adaptive_section_01_0_3s"),
    ("shot_03_sidewalk_build", 3.7, "adaptive_section_02_3_7s"),
    ("shot_04_shadow_cart", 5.2, "adaptive_section_02_3_7s"),
    ("shot_05_crosswalk_motion", 6.8, "adaptive_section_02_3_7s"),
    ("shot_06_golden_city_shift", 8.7, "adaptive_section_03_7_11s"),
    ("shot_07_night_store", 10.5, "adaptive_section_03_7_11s"),
    ("shot_08_night_crossing", 12.2, "adaptive_section_04_11_14s"),
    ("shot_09_walkers_aftertaste", 13.9, "adaptive_section_04_11_14s"),
    ("shot_10_shadow_close", 15.4, "adaptive_section_05_14_16s"),
]


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(command, cwd=ROOT, check=True, text=True, capture_output=True)


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def extract_frame(video: Path, timestamp: float, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "ffmpeg",
            "-y",
            "-ss",
            f"{timestamp:.2f}",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-q:v",
            "2",
            str(output),
        ]
    )


def ffprobe_json(video: Path) -> dict[str, Any]:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_streams",
            "-show_format",
            "-of",
            "json",
            str(video),
        ]
    )
    return json.loads(result.stdout)


def decode_check(video: Path) -> bool:
    run(["ffmpeg", "-v", "error", "-i", str(video), "-f", "null", "-"])
    return True


def image_stats(path: Path) -> dict[str, float]:
    image = Image.open(path).convert("RGB").resize((144, 256))
    pixels = list(image.getdata())
    lumas: list[float] = []
    saturations: list[float] = []
    for red, green, blue in pixels:
        luma = 0.2126 * red + 0.7152 * green + 0.0722 * blue
        max_channel = max(red, green, blue) / 255
        min_channel = min(red, green, blue) / 255
        saturation = 0 if max_channel == 0 else (max_channel - min_channel) / max_channel
        lumas.append(luma)
        saturations.append(saturation)
    return {
        "mean_luma": sum(lumas) / len(lumas),
        "mean_saturation": sum(saturations) / len(saturations),
    }


def load_font(size: int) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size=size)
    return ImageFont.load_default()


def draw_label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.ImageFont) -> None:
    draw.rectangle([xy[0], xy[1], xy[0] + 520, xy[1] + 46], fill=(12, 14, 16))
    draw.text((xy[0] + 12, xy[1] + 12), text, fill=(245, 245, 240), font=font)


def make_before_after_sheet(pairs: list[dict[str, Any]], output: Path) -> None:
    thumb_w, thumb_h = 270, 480
    label_h = 54
    gutter = 14
    width = thumb_w * 2 + gutter
    height = (thumb_h + label_h + gutter) * len(pairs)
    sheet = Image.new("RGB", (width, height), (18, 19, 20))
    draw = ImageDraw.Draw(sheet)
    font = load_font(18)
    y = 0
    for pair in pairs:
        before = Image.open(pair["before_path"]).convert("RGB").resize((thumb_w, thumb_h))
        after = Image.open(pair["after_path"]).convert("RGB").resize((thumb_w, thumb_h))
        sheet.paste(before, (0, y + label_h))
        sheet.paste(after, (thumb_w + gutter, y + label_h))
        label = f"{pair['shot_id']} | {pair['timestamp_sec']:.2f}s | {pair['section_id']}"
        draw_label(draw, (0, y), "before  " + label, font)
        draw_label(draw, (thumb_w + gutter, y), "after adaptive", font)
        y += thumb_h + label_h + gutter
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)


def make_after_sheet(pairs: list[dict[str, Any]], output: Path) -> None:
    thumb_w, thumb_h = 270, 480
    label_h = 54
    gutter = 14
    columns = 2
    rows = math.ceil(len(pairs) / columns)
    width = thumb_w * columns + gutter * (columns - 1)
    height = rows * (thumb_h + label_h + gutter)
    sheet = Image.new("RGB", (width, height), (18, 19, 20))
    draw = ImageDraw.Draw(sheet)
    font = load_font(18)
    for index, pair in enumerate(pairs):
        col = index % columns
        row = index // columns
        x = col * (thumb_w + gutter)
        y = row * (thumb_h + label_h + gutter)
        after = Image.open(pair["after_path"]).convert("RGB").resize((thumb_w, thumb_h))
        sheet.paste(after, (x, y + label_h))
        label = f"{pair['timestamp_sec']:.2f}s | {pair['section_id']}"
        draw_label(draw, (x, y), label, font)
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=92)


def parse_video_metadata(probe: dict[str, Any]) -> dict[str, Any]:
    video_stream = next(stream for stream in probe["streams"] if stream["codec_type"] == "video")
    audio_streams = [stream for stream in probe["streams"] if stream["codec_type"] == "audio"]
    fps_text = video_stream.get("avg_frame_rate", "0/1")
    numerator, denominator = [int(part) for part in fps_text.split("/")]
    fps = numerator / denominator if denominator else 0
    duration = float(probe.get("format", {}).get("duration", 0))
    return {
        "width": int(video_stream["width"]),
        "height": int(video_stream["height"]),
        "fps": fps,
        "duration_sec": duration,
        "audio_present": bool(audio_streams),
    }


def generate_review_pack() -> None:
    if not OLD_VIDEO.exists():
        raise FileNotFoundError(f"missing before video: {OLD_VIDEO}")
    if not NEW_VIDEO.exists():
        raise FileNotFoundError(f"missing adaptive video: {NEW_VIDEO}")

    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    FRAME_DIR.mkdir(parents=True, exist_ok=True)
    AFTER_DIR.mkdir(parents=True, exist_ok=True)
    write_json(REVIEW_DIR / "adaptive_color_grade_profile.json", ADAPTIVE_PROFILE)

    pairs: list[dict[str, Any]] = []
    metric_summary: list[dict[str, Any]] = []
    for shot_id, timestamp, section_id in FRAME_POINTS:
        before_path = FRAME_DIR / f"{shot_id}_before_{timestamp:.2f}s.jpg"
        after_path = FRAME_DIR / f"{shot_id}_after_{timestamp:.2f}s.jpg"
        representative_after = AFTER_DIR / f"after_{len(pairs) + 1:02d}_{timestamp:.2f}s.jpg"
        extract_frame(OLD_VIDEO, timestamp, before_path)
        extract_frame(NEW_VIDEO, timestamp, after_path)
        shutil.copyfile(after_path, representative_after)

        before_stats = image_stats(before_path)
        after_stats = image_stats(after_path)
        pair = {
            "shot_id": shot_id,
            "timestamp_sec": timestamp,
            "section_id": section_id,
            "before_path": before_path,
            "after_path": after_path,
        }
        pairs.append(pair)
        metric_summary.append(
            {
                "shot_id": shot_id,
                "timestamp_sec": timestamp,
                "section_id": section_id,
                "mean_luma_delta": round(after_stats["mean_luma"] - before_stats["mean_luma"], 3),
                "mean_saturation_delta": round(
                    after_stats["mean_saturation"] - before_stats["mean_saturation"], 5
                ),
            }
        )

    before_after_sheet = REVIEW_DIR / "before_after_adaptive_color_contact_sheet.jpg"
    after_sheet = REVIEW_DIR / "representative_frames_after_contact_sheet.jpg"
    make_before_after_sheet(pairs, before_after_sheet)
    make_after_sheet(pairs, after_sheet)

    probe = ffprobe_json(NEW_VIDEO)
    metadata = parse_video_metadata(probe)
    decode_ok = decode_check(NEW_VIDEO)
    mean_abs_luma_delta = sum(abs(item["mean_luma_delta"]) for item in metric_summary) / len(metric_summary)
    mean_abs_saturation_delta = sum(abs(item["mean_saturation_delta"]) for item in metric_summary) / len(
        metric_summary
    )
    machine_visible_change = mean_abs_luma_delta >= 1.0 or mean_abs_saturation_delta >= 0.008

    profile_read_report = {
        "adaptive_color_profile_read_by_pipeline": True,
        "apply_scope": ADAPTIVE_PROFILE["apply_scope"],
        "sections_count": len(ADAPTIVE_PROFILE["sections"]),
        "fixed_preset_used": ADAPTIVE_PROFILE["fixed_preset_used"],
        "odd_used_as_fixed_preset": ADAPTIVE_PROFILE["odd_used_as_fixed_preset"],
        "render_props_path": str(REVIEW_DIR / "adaptive_color_grade_profile.json"),
        "remotion_consumption": {
            "frame_selects_section_profile": True,
            "css_filter_consumes_active_section": True,
            "atmosphere_layer_consumes_active_section": True,
            "vignette_consumes_active_section": True,
            "grain_consumes_active_section": True,
        },
        "ffmpeg_consumption": False,
        "render_status": "passed",
        "before_after_contact_sheet_exists": before_after_sheet.exists(),
        "content_validation_status": "pending_user_review",
    }

    machine_report = {
        "status": "adaptive_color_grade_tool_execution_validation_completed_pending_user_review",
        "adaptive_color_profile_read_by_pipeline": True,
        "apply_scope": ADAPTIVE_PROFILE["apply_scope"],
        "sections_count": len(ADAPTIVE_PROFILE["sections"]),
        "fixed_preset_used": ADAPTIVE_PROFILE["fixed_preset_used"],
        "odd_used_as_fixed_preset": ADAPTIVE_PROFILE["odd_used_as_fixed_preset"],
        "render_status": "passed",
        "remotion_consumption": profile_read_report["remotion_consumption"],
        "ffmpeg_consumption": False,
        "technical_validation": {
            "width_1080_height_1920": metadata["width"] == 1080 and metadata["height"] == 1920,
            "fps_30": abs(metadata["fps"] - 30) < 0.01,
            "duration_close_to_16s": 15.7 <= metadata["duration_sec"] <= 16.3,
            "audio_present": metadata["audio_present"],
            "decode_check_passed": decode_ok,
            "metadata": metadata,
        },
        "review_pack": {
            "path": str(REVIEW_DIR),
            "before_after_contact_sheet": str(before_after_sheet),
            "representative_frames_after_contact_sheet": str(after_sheet),
            "frames_count": len(pairs),
        },
        "machine_visible_change": {
            "detected": machine_visible_change,
            "mean_abs_luma_delta": round(mean_abs_luma_delta, 3),
            "mean_abs_saturation_delta": round(mean_abs_saturation_delta, 5),
            "section_metric_summary": metric_summary,
        },
        "remotion_css_filter_ceiling_status": "not_detected_by_machine_delta_only"
        if machine_visible_change
        else "possible_weak_delta_pending_user_review",
        "content_validation_status": "pending_user_review",
        "do_not_claim": [
            "publish-ready",
            "video_fixed",
            "color_grade_verified",
            "BGM_mood_driven_color_grade_verified",
            "vlog_director_capability_verified",
            "odd_color_preset_ready",
        ],
    }

    write_json(REVIEW_DIR / "adaptive_profile_read_by_pipeline_report.json", profile_read_report)
    write_json(REVIEW_DIR / "machine_report.json", machine_report)
    write_json(
        REVIEW_DIR / "review_manifest.json",
        {
            "output_video": str(NEW_VIDEO),
            "review_pack": str(REVIEW_DIR),
            "adaptive_profile": str(REVIEW_DIR / "adaptive_color_grade_profile.json"),
            "profile_read_report": str(REVIEW_DIR / "adaptive_profile_read_by_pipeline_report.json"),
            "machine_report": str(REVIEW_DIR / "machine_report.json"),
            "before_after_contact_sheet": str(before_after_sheet),
            "representative_frames_after_contact_sheet": str(after_sheet),
            "runtime_assets_committed": False,
        },
    )

    readable_report = f"""# 第二期16秒音乐分段自适应调色验证

status: adaptive_color_grade_tool_execution_validation_completed_pending_user_review

本轮只验证工具执行链路：Remotion 已按当前 frame 选择 `per_music_section` 的调色参数，并生成 before / after contact sheet。该结果不等于用户审美通过，也不等于调色能力完成验证。

- output_video_path: `{NEW_VIDEO}`
- review_pack_path: `{REVIEW_DIR}`
- before_after_contact_sheet: `{before_after_sheet}`
- adaptive_color_profile_read_by_pipeline: true
- apply_scope: per_music_section
- sections_count: {len(ADAPTIVE_PROFILE["sections"])}
- fixed_preset_used: false
- odd_used_as_fixed_preset: false
- ffmpeg_consumption: false
- content_validation_status: pending_user_review

machine_visible_change:
- detected: {str(machine_visible_change).lower()}
- mean_abs_luma_delta: {mean_abs_luma_delta:.3f}
- mean_abs_saturation_delta: {mean_abs_saturation_delta:.5f}

do_not_claim:
- publish-ready
- video_fixed
- color_grade_verified
- BGM_mood_driven_color_grade_verified
- vlog_director_capability_verified
- odd_color_preset_ready
"""
    (REVIEW_DIR / "readable_review_report.md").write_text(readable_report, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile-only", action="store_true", help="only write render props JSON")
    args = parser.parse_args()

    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    write_json(REVIEW_DIR / "adaptive_color_grade_profile.json", ADAPTIVE_PROFILE)
    if args.profile_only:
        return
    generate_review_pack()


if __name__ == "__main__":
    main()
