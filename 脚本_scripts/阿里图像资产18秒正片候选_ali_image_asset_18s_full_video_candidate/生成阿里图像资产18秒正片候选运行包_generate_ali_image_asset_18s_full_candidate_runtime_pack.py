#!/usr/bin/env python3
"""Generate Alibaba image assets for the 18s full-video candidate."""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import ssl
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple

from PIL import Image, ImageStat


REPO_ROOT = Path(__file__).resolve().parents[2]
RUNTIME_DIR = (
    REPO_ROOT
    / "tmp"
    / "阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate"
)
DEFAULT_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
DEFAULT_MODEL = "qwen-image-2.0-pro"
DEFAULT_SIZE = "1024*1024"
MAX_IMAGE_API_CALLS = 12
MAX_SUCCESS_IMAGES = 8
MAX_RETRY_PER_TYPO_ASSET = 1
ESTIMATED_YUAN_PER_IMAGE = 0.5


ASSET_NEEDS: List[Dict[str, Any]] = [
    {
        "asset_need_id": "asset_need_01_hero_font_card",
        "time_range": [0.18, 0.88],
        "video_event": "opening sand texture hook; tactile landing moment before gym identity appears",
        "video_anchor_source": "57:seg_01_sand_texture_hook + M14 sand texture / negative-space anchor",
        "reference_rule_links": [
            "55:H.caption_01_hero_keyword",
            "55:F.shape_08_hero_keyword_block",
            "56:E.caption_branch_01_hero_keyword",
            "73:C.asset_generation_spec",
        ],
        "sticker_or_caption_branch": "caption_branch_01_hero_keyword",
        "asset_type": "font_card",
        "shape_requirement": "compact cream-white handwritten hero word card with uneven black outer stroke",
        "text_requirement": "exact Chinese text only: 先落地",
        "caption_text": "先落地",
        "emotion_requirement": "grounded opening hook, tactile, confident but not slogan-like",
        "material_requirement": "clean cutout source on plain white background, rough ink edge, soft shadow, no logo, no watermark",
        "motion_requirement": "pop in for opening hook, short hold, dissolve before gym entry",
        "copy_risk_check": "do_not_copy_third_party_ui_logo_brand_reference_font_or_reference_copy",
        "expected_video_fit": "sits in sand-texture negative space as key font card, not ordinary subtitle",
        "fallback_if_generation_failed": "blocked_semantic_success; do not replace with Remotion SVG",
        "fallback_if_video_fit_failed": "route_back_to caption_visual_language_library + opening_event_anchor",
        "x": 532,
        "y": 1226,
        "max_width": 500,
        "enter_animation": "pop",
        "exit_animation": "fade",
        "prompt_for_image_api": (
            "Create one original vlog overlay font card sticker. Exact Chinese text: 先落地. "
            "The image must contain exactly these three Chinese characters and no other readable text. "
            "Style: cream white bold hand-drawn Chinese lettering, uneven black ink outline, soft warm shadow, "
            "slightly rough marker edge, compact horizontal card, playful but clean. Plain white background for cutout. "
            "No logo, no watermark, no UI, no QR code, no brand, no copied font."
        ),
    },
    {
        "asset_need_id": "asset_need_02_entry_reaction_sticker",
        "time_range": [1.16, 1.86],
        "video_event": "texture cuts into gym entry identity; light reaction near equipment edge",
        "video_anchor_source": "57:seg_02_gym_entry_identity + M08 equipment/person entry edge",
        "reference_rule_links": [
            "55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid",
            "55:E.attach_08_caption_relation_attached",
            "56:F.sticker_branch_02_hand_drawn_hybrid",
            "73:C.asset_generation_spec",
        ],
        "sticker_or_caption_branch": "sticker_branch_02_hand_drawn_hybrid",
        "asset_type": "reaction_sticker",
        "shape_requirement": "small original peeking reaction sticker, simple face-like mark, not emoji copy",
        "text_requirement": "no readable text expected",
        "caption_text": "no_text_expected",
        "emotion_requirement": "entry reaction, playful and light",
        "material_requirement": "cream outline, warm yellow accent, clean cutout source, soft shadow",
        "motion_requirement": "short side slide and small pop with entry transition",
        "copy_risk_check": "do_not_copy_emoji_ip_brand_ui_or_reference_sticker",
        "expected_video_fit": "supports gym entry without blocking person, equipment, or Remotion text layer",
        "fallback_if_generation_failed": "blocked_semantic_success; Remotion text layer may keep normal caption only",
        "fallback_if_video_fit_failed": "route_back_to sticker_branch_02 + composition_safe_area",
        "x": 800,
        "y": 882,
        "max_width": 260,
        "enter_animation": "slide",
        "exit_animation": "pop_out",
        "prompt_for_image_api": (
            "Create one original small vlog reaction sticker, no words. A simple hand-drawn peeking face / spark mark "
            "with cream outline and warm yellow accent, playful entry reaction, clean white background for cutout, "
            "soft shadow, rough marker edge. No readable text, no emoji copy, no IP character, no logo, no watermark, no UI."
        ),
    },
    {
        "asset_need_id": "asset_need_03_contact_flash",
        "time_range": [3.46, 4.06],
        "video_event": "gym machine action pressure/contact peak",
        "video_anchor_source": "57:seg_04_main_action_push + M03 machine contact window",
        "reference_rule_links": [
            "55:D.sticker_type_03_contact_flash",
            "55:E.attach_02_contact_point_attached",
            "55:F.shape_02_contact_flash",
            "56:F.sticker_branch_03_contact",
            "61:C.anchor_map_contact_points",
        ],
        "sticker_or_caption_branch": "sticker_branch_03_contact",
        "asset_type": "visual_punctuation",
        "shape_requirement": "1-3 short rough contact flash strokes, not promotional burst",
        "text_requirement": "no readable text expected",
        "caption_text": "no_text_expected",
        "emotion_requirement": "brief pressure accent, physical contact reaction",
        "material_requirement": "cream/yellow rough marker strokes, clean cutout source, soft shadow",
        "motion_requirement": "bounce into contact peak, short hold, pop out",
        "copy_risk_check": "do_not_copy_reference_sticker_promo_burst_ui_or_brand",
        "expected_video_fit": "attached near action contact point without covering hand or machine core",
        "fallback_if_generation_failed": "blocked_semantic_success; do not use generic burst",
        "fallback_if_video_fit_failed": "route_back_to contact_point_anchor + shape_02_contact_flash",
        "x": 704,
        "y": 1032,
        "max_width": 275,
        "enter_animation": "bounce",
        "exit_animation": "pop_out",
        "prompt_for_image_api": (
            "Create one original contact flash sticker for a gym machine pressure point. No words. "
            "Use 1 to 3 short rough hand-drawn cream and yellow strokes, like a physical contact accent, "
            "not an explosion, not a sale burst. Plain white background for cutout, soft shadow. "
            "No readable text, no logo, no watermark, no UI, no brand."
        ),
    },
    {
        "asset_need_id": "asset_need_04_action_reaction_word",
        "time_range": [3.28, 4.36],
        "video_event": "main action push, effort rising on machine",
        "video_anchor_source": "57:caption_03_action_push + M03 action peak side area",
        "reference_rule_links": [
            "55:H.caption_05_hand_drawn_reaction_word",
            "55:I.cs_relation_02_sticker_leads_caption_supports",
            "56:E.caption_branch_05_hand_drawn_reaction_word",
            "73:C.asset_generation_spec",
        ],
        "sticker_or_caption_branch": "caption_branch_05_hand_drawn_reaction_word",
        "asset_type": "reaction_word",
        "shape_requirement": "bold slanted handwritten reaction word with rough outline",
        "text_requirement": "exact Chinese text only: 推上去",
        "caption_text": "推上去",
        "emotion_requirement": "action push, upward force, short reaction not explanatory subtitle",
        "material_requirement": "cream-white letters, black uneven outline, soft shadow, clean cutout source",
        "motion_requirement": "quick pop with action pressure, hold, fade before metal texture cut",
        "copy_risk_check": "do_not_copy_reference_caption_font_ui_or_brand",
        "expected_video_fit": "sits beside action peak as visual reaction word, not lower-third caption",
        "fallback_if_generation_failed": "blocked_semantic_success; do not replace with Remotion SVG",
        "fallback_if_video_fit_failed": "route_back_to caption_sticker_relation + attention_budget",
        "x": 136,
        "y": 1238,
        "max_width": 480,
        "enter_animation": "pop",
        "exit_animation": "fade",
        "prompt_for_image_api": (
            "Create one original vlog visual reaction word sticker. Exact Chinese text: 推上去. "
            "The image must contain exactly these three Chinese characters and no other readable text. "
            "Style: bold slanted cream-white handwritten Chinese, uneven black outline, warm shadow, rough marker edge, "
            "energetic upward push feeling. Plain white background for cutout. No logo, no watermark, no UI, no brand, no copied font."
        ),
    },
    {
        "asset_need_id": "asset_need_05_machine_motion_trail",
        "time_range": [6.70, 7.42],
        "video_event": "machine direction line and metal texture sustain",
        "video_anchor_source": "57:sticker_04_machine_motion_trail + M04 diagonal metal line direction",
        "reference_rule_links": [
            "55:D.sticker_type_04_motion_trail_punctuation",
            "55:E.attach_03_motion_direction_attached",
            "55:F.shape_03_motion_trail_punctuation",
            "56:F.sticker_branch_04_motion",
            "61:D.motion_track_direction",
        ],
        "sticker_or_caption_branch": "sticker_branch_04_motion",
        "asset_type": "visual_punctuation",
        "shape_requirement": "three staggered short hand-drawn motion trail strokes, not arrow",
        "text_requirement": "no readable text expected",
        "caption_text": "no_text_expected",
        "emotion_requirement": "directional motion cue, clean and mechanical",
        "material_requirement": "cream/yellow rough marker strokes, clean cutout source, soft shadow",
        "motion_requirement": "scribble reveal following line direction, cut with shot",
        "copy_risk_check": "do_not_copy_arrow_ui_brand_or_reference_sticker",
        "expected_video_fit": "follows machine line direction without floating as UI",
        "fallback_if_generation_failed": "blocked_semantic_success; no generic arrow fallback",
        "fallback_if_video_fit_failed": "route_back_to motion_direction_attached + composition_safe_area",
        "x": 402,
        "y": 832,
        "max_width": 300,
        "enter_animation": "scribble",
        "exit_animation": "slide_out",
        "prompt_for_image_api": (
            "Create one original motion trail visual punctuation sticker, no words. Three staggered short rough "
            "hand-drawn cream and yellow strokes, following a diagonal machine line, not an arrow, not UI. "
            "Plain white background for cutout, soft shadow, rough marker edge. No readable text, no logo, no watermark, no brand."
        ),
    },
    {
        "asset_need_id": "asset_need_06_sky_reaction_word",
        "time_range": [8.16, 9.04],
        "video_event": "wide sky/ocean breath point after dense gym-machine section",
        "video_anchor_source": "57:caption_05_sky_breath + M10 negative space breath area",
        "reference_rule_links": [
            "55:H.caption_05_hand_drawn_reaction_word",
            "55:E.attach_07_negative_space_attached",
            "56:E.caption_branch_05_hand_drawn_reaction_word",
            "56:L.no_layer_rule",
        ],
        "sticker_or_caption_branch": "caption_branch_05_hand_drawn_reaction_word",
        "asset_type": "reaction_word",
        "shape_requirement": "small hand-drawn breath reaction word, softer than action card",
        "text_requirement": "exact Chinese text only: 缓一口",
        "caption_text": "缓一口",
        "emotion_requirement": "breath reset, lower attention, not scenic label",
        "material_requirement": "off-white handwritten lettering, thin dark rough outline, soft shadow",
        "motion_requirement": "gentle fade / small pop, no bounce",
        "copy_risk_check": "do_not_copy_reference_caption_font_platform_ui_or_brand",
        "expected_video_fit": "lives in negative space and does not decorate the sky with unrelated stickers",
        "fallback_if_generation_failed": "blocked_semantic_success; keep Remotion normal caption only if needed",
        "fallback_if_video_fit_failed": "route_back_to no_layer_rule + attention_budget",
        "x": 130,
        "y": 1216,
        "max_width": 410,
        "enter_animation": "pop",
        "exit_animation": "fade",
        "prompt_for_image_api": (
            "Create one original small vlog breath reaction word sticker. Exact Chinese text: 缓一口. "
            "The image must contain exactly these three Chinese characters and no other readable text. "
            "Style: off-white soft handwritten Chinese, thin uneven dark outline, low attention, warm soft shadow, "
            "plain white background for cutout. No logo, no watermark, no UI, no brand, no copied font."
        ),
    },
    {
        "asset_need_id": "asset_need_07_fog_breath_line",
        "time_range": [9.82, 10.58],
        "video_event": "fog breath section and low-density horizon-like negative space",
        "video_anchor_source": "57:sticker_06_fog_breath_line + M13 fog negative space",
        "reference_rule_links": [
            "55:D.sticker_type_07_negative_space_breath_line",
            "55:E.attach_07_negative_space_attached",
            "55:F.shape_09_whisper_line_or_tick",
            "56:F.sticker_branch_07_breath",
        ],
        "sticker_or_caption_branch": "sticker_branch_07_breath",
        "asset_type": "visual_punctuation",
        "shape_requirement": "very light wavy breath line or small tick group",
        "text_requirement": "no readable text expected",
        "caption_text": "no_text_expected",
        "emotion_requirement": "slow breath, quiet transition",
        "material_requirement": "low-contrast off-white line, clean cutout source, soft shadow",
        "motion_requirement": "slow reveal and soft hold",
        "copy_risk_check": "do_not_copy_ui_brand_reference_sticker_or_caption",
        "expected_video_fit": "low-weight line near fog breath area; no sky decoration",
        "fallback_if_generation_failed": "blocked_semantic_success; do not force decoration",
        "fallback_if_video_fit_failed": "route_back_to negative_space_breath_line + no_layer_rule",
        "x": 164,
        "y": 1044,
        "max_width": 340,
        "enter_animation": "scribble",
        "exit_animation": "fade",
        "prompt_for_image_api": (
            "Create one original minimal breath-line visual punctuation sticker, no words. A very light off-white "
            "hand-drawn wavy line plus tiny ticks, low contrast, quiet fog breath feeling, clean white background for cutout, "
            "soft shadow. No readable text, no logo, no watermark, no UI, no brand."
        ),
    },
    {
        "asset_need_id": "asset_need_08_shadow_motion_trail",
        "time_range": [12.36, 13.16],
        "video_event": "shadow movement reset before gym action return",
        "video_anchor_source": "57:sticker_07_shadow_motion_trail + M09 shadow movement direction",
        "reference_rule_links": [
            "55:D.sticker_type_04_motion_trail_punctuation",
            "55:E.attach_03_motion_direction_attached",
            "55:F.shape_03_motion_trail_punctuation",
            "56:F.sticker_branch_04_motion",
        ],
        "sticker_or_caption_branch": "sticker_branch_04_motion",
        "asset_type": "visual_punctuation",
        "shape_requirement": "dim cream short shadow trail strokes, lower brightness than machine trail",
        "text_requirement": "no readable text expected",
        "caption_text": "no_text_expected",
        "emotion_requirement": "dark reset, restrained motion cue",
        "material_requirement": "dim cream / charcoal rough strokes, clean cutout source, soft shadow",
        "motion_requirement": "staggered dim reveal and exit before action return",
        "copy_risk_check": "do_not_copy_ui_arrow_brand_or_reference_sticker",
        "expected_video_fit": "follows visible shadow movement and stays quiet",
        "fallback_if_generation_failed": "blocked_semantic_success; do not use bright action sticker",
        "fallback_if_video_fit_failed": "route_back_to motion_direction_attached + dark_close_attention_budget",
        "x": 472,
        "y": 1124,
        "max_width": 278,
        "enter_animation": "scribble",
        "exit_animation": "fade",
        "prompt_for_image_api": (
            "Create one original dark shadow motion-trail visual punctuation sticker, no words. Dim cream and charcoal "
            "short hand-drawn strokes, quiet shadow movement feeling, low brightness, clean white background for cutout, "
            "soft shadow. No readable text, no logo, no watermark, no UI, no brand."
        ),
    },
]


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(REPO_ROOT))
    except ValueError:
        return str(path)


def load_dotenv(dotenv_path: Path) -> None:
    if not dotenv_path.exists():
        return
    for raw_line in dotenv_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        name = name.strip()
        if name.startswith("export "):
            name = name[len("export ") :].strip()
        os.environ.setdefault(name, value.strip().strip('"').strip("'"))


def resolve_key() -> Tuple[Optional[str], Optional[str]]:
    for key_name in ("DASHSCOPE_API_KEY", "ALIBABA_DASHSCOPE_API_KEY"):
        value = os.getenv(key_name, "").strip()
        if value:
            return key_name, value
    return None, None


def safe_filename(value: str) -> str:
    value = re.sub(r"[^A-Za-z0-9_\-]+", "_", value.strip())
    return re.sub(r"_+", "_", value).strip("_") or "asset"


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    return json.loads(path.read_text(encoding="utf-8"))


def valid_image(path: Path) -> bool:
    if not path.exists() or path.stat().st_size <= 0:
        return False
    try:
        with Image.open(path) as image:
            rgba = image.convert("RGBA")
            stat = ImageStat.Stat(rgba.convert("L"))
            return image.width > 0 and image.height > 0 and bool(rgba.getbbox()) and float(stat.stddev[0]) > 1.0
    except OSError:
        return False


def request_payload(asset_need: Dict[str, Any], model: str, size: str) -> Dict[str, Any]:
    return {
        "model": model,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": str(asset_need["prompt_for_image_api"])}],
                }
            ]
        },
        "parameters": {
            "negative_prompt": (
                "watermark, logo, brand mark, app UI, account name, platform text, QR code, "
                "copied sticker, copied emoji, copied typography, extra words, garbled Chinese, "
                "blurry, low quality, photorealistic person, celebrity"
            ),
            "prompt_extend": False,
            "watermark": False,
            "size": size,
            "n": 1,
        },
    }


def call_dashscope(endpoint: str, api_key: str, payload: Dict[str, Any], timeout: int) -> Dict[str, Any]:
    request = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=timeout, context=ssl.create_default_context()) as response:
        parsed = json.loads(response.read().decode("utf-8", errors="replace"))
    parsed["_http_status"] = response.status
    return parsed


def sanitized_failure(exc: BaseException) -> Dict[str, Any]:
    if isinstance(exc, urllib.error.HTTPError):
        body = exc.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            payload = {"raw_body_present": bool(body)}
        return {
            "http_status": exc.code,
            "code": payload.get("code"),
            "message": payload.get("message"),
            "request_id": payload.get("request_id") or payload.get("requestId"),
        }
    return {"type": exc.__class__.__name__, "message": str(exc)[:300]}


def is_arrearage(failure: Dict[str, Any]) -> bool:
    joined = json.dumps(failure, ensure_ascii=False).lower()
    return "arrearage" in joined or "欠费" in joined


def extract_image_value(response: Dict[str, Any]) -> str:
    choices = response.get("output", {}).get("choices", [])
    for choice in choices:
        for item in choice.get("message", {}).get("content", []):
            if isinstance(item, dict) and item.get("image"):
                return str(item["image"])
    raise RuntimeError("response_image_field_missing")


def download_image(image_value: str, output_path: Path, timeout: int) -> Dict[str, Any]:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    if image_value.startswith("data:image"):
        output_path.write_bytes(base64.b64decode(image_value.split(",", 1)[1]))
        return {"download_method": "data_uri", "bytes": output_path.stat().st_size}
    if image_value.startswith("http://") or image_value.startswith("https://"):
        request = urllib.request.Request(
            image_value,
            headers={"User-Agent": "video-capability-lab/ali-image-asset-18s"},
        )
        with urllib.request.urlopen(request, timeout=timeout) as response:
            data = response.read()
        output_path.write_bytes(data)
        return {"download_method": "url", "bytes": len(data), "url_stored": False}
    output_path.write_bytes(base64.b64decode(image_value))
    return {"download_method": "base64", "bytes": output_path.stat().st_size}


def existing_asset_map(manifest: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    return {str(asset.get("asset_need_id")): asset for asset in manifest.get("assets", [])}


def write_need_plan(runtime_dir: Path) -> None:
    payload = {
        "status": "visual_asset_need_plan_ready",
        "this_is_full_video_candidate_not_publish_ready": True,
        "target_duration_sec": 18,
        "allowed_duration_range_sec": [17.8, 18.3],
        "provider": "alibaba_dashscope",
        "model": DEFAULT_MODEL,
        "max_image_api_calls": MAX_IMAGE_API_CALLS,
        "max_success_images": MAX_SUCCESS_IMAGES,
        "max_retry_per_typo_asset": MAX_RETRY_PER_TYPO_ASSET,
        "estimated_cost_yuan": "4-8",
        "stop_if_provider_arrearage": True,
        "stop_if_api_budget_exceeded": True,
        "do_not_retry_without_budget_confirmation": True,
        "normal_captions": {
            "renderer": "Remotion text layer",
            "alibaba_image_api_used": False,
        },
        "asset_needs": ASSET_NEEDS,
    }
    write_json(runtime_dir / "visual_asset_need_plan.json", payload)


def text_accuracy_stub(asset: Dict[str, Any]) -> Dict[str, Any]:
    expected = str(asset.get("caption_text", ""))
    has_text = expected and expected != "no_text_expected"
    return {
        "asset_need_id": asset["asset_need_id"],
        "expected_text": expected if has_text else "no_text_expected",
        "contains_text": has_text,
        "text_accuracy_status": "pending_codex_visual_inspection" if has_text else "not_applicable_no_text_expected",
        "typo_retry_used": 0,
        "max_retry_per_typo_asset": MAX_RETRY_PER_TYPO_ASSET,
        "blocked_if_failed": "blocked_text_accuracy_failed" if has_text else "not_applicable",
    }


def generate_assets(
    *,
    runtime_dir: Path,
    timeout: int,
    request_delay: float,
    prior_calls: int,
    force_assets: Iterable[str],
) -> int:
    load_dotenv(REPO_ROOT / ".env")
    key_name, api_key = resolve_key()
    manifest_path = runtime_dir / "image_generation_manifest.json"
    output_dir = runtime_dir / "generated_assets"
    old_manifest = load_json(manifest_path, {"assets": [], "actual_image_api_calls": prior_calls})
    old_by_id = existing_asset_map(old_manifest)
    force_set = set(force_assets)
    endpoint = os.getenv("ALIBABA_IMAGE_ENDPOINT", "").strip() or DEFAULT_ENDPOINT
    model = os.getenv("ALIBABA_IMAGE_MODEL", "").strip() or DEFAULT_MODEL
    size = (os.getenv("ALIBABA_IMAGE_SIZE", DEFAULT_SIZE).strip() or DEFAULT_SIZE).replace("x", "*").replace("X", "*")
    total_prior_calls = int(old_manifest.get("actual_image_api_calls", prior_calls) or prior_calls)
    if prior_calls > total_prior_calls:
        total_prior_calls = prior_calls

    if not api_key:
        result = {
            "status": "blocked_api_config_missing",
            "provider": "alibaba_dashscope",
            "model": model,
            "api_key_env_name_present": False,
            "secret_values_printed": False,
        }
        write_json(manifest_path, result)
        print(json.dumps(result, ensure_ascii=False))
        return 2

    assets: List[Dict[str, Any]] = []
    calls_made_this_run = 0
    provider_arrearage = False
    for asset_need in ASSET_NEEDS:
        asset_need_id = str(asset_need["asset_need_id"])
        existing = old_by_id.get(asset_need_id)
        if (
            asset_need_id not in force_set
            and existing
            and existing.get("local_path")
            and valid_image(REPO_ROOT / str(existing["local_path"]))
        ):
            reused = dict(existing)
            reused["reused_existing_file"] = True
            assets.append(reused)
            continue

        if len([item for item in assets if item.get("status") == "generated"]) >= MAX_SUCCESS_IMAGES:
            break
        if total_prior_calls + calls_made_this_run >= MAX_IMAGE_API_CALLS:
            assets.append(
                {
                    "asset_need_id": asset_need_id,
                    "asset_type": asset_need["asset_type"],
                    "caption_text": asset_need["caption_text"],
                    "status": "blocked_api_budget_exceeded",
                    "approved_for_video": False,
                }
            )
            break

        if calls_made_this_run > 0:
            time.sleep(max(0.0, request_delay))
        calls_made_this_run += 1
        output_path = output_dir / f"{safe_filename(asset_need_id)}_{safe_filename(asset_need['asset_type'])}.png"
        try:
            response = call_dashscope(
                endpoint,
                api_key,
                request_payload(asset_need, model, size),
                timeout,
            )
            download = download_image(extract_image_value(response), output_path, timeout)
            if not valid_image(output_path):
                raise RuntimeError("generated_image_invalid_or_blank")
            assets.append(
                {
                    "asset_need_id": asset_need_id,
                    "asset_type": asset_need["asset_type"],
                    "caption_text": asset_need["caption_text"],
                    "status": "generated",
                    "local_path": rel(output_path),
                    "attempts": 1,
                    "http_status": response.get("_http_status"),
                    "request_id": response.get("request_id") or response.get("requestId"),
                    "download": download,
                    "image_url_or_base64_stored": False,
                    "secret_values_printed": False,
                    "review_status": "pending_user_review",
                    "approved_for_video": False,
                    "approved_for_library": False,
                    "text_accuracy": text_accuracy_stub(asset_need),
                }
            )
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
            failure = sanitized_failure(exc)
            if is_arrearage(failure):
                provider_arrearage = True
                assets.append(
                    {
                        "asset_need_id": asset_need_id,
                        "asset_type": asset_need["asset_type"],
                        "caption_text": asset_need["caption_text"],
                        "status": "blocked_provider_arrearage",
                        "failure": failure,
                        "secret_values_printed": False,
                        "approved_for_video": False,
                        "approved_for_library": False,
                    }
                )
                break
            assets.append(
                {
                    "asset_need_id": asset_need_id,
                    "asset_type": asset_need["asset_type"],
                    "caption_text": asset_need["caption_text"],
                    "status": "failed",
                    "failure": failure,
                    "secret_values_printed": False,
                    "approved_for_video": False,
                    "approved_for_library": False,
                }
            )

    generated = [
        asset
        for asset in assets
        if asset.get("status") == "generated" and valid_image(REPO_ROOT / str(asset.get("local_path", "")))
    ]
    actual_calls = total_prior_calls + calls_made_this_run
    if provider_arrearage:
        status = "blocked_provider_arrearage"
    elif actual_calls > MAX_IMAGE_API_CALLS:
        status = "blocked_api_budget_exceeded"
    elif len(generated) == MAX_SUCCESS_IMAGES and len(assets) >= len(ASSET_NEEDS):
        status = "generated_pending_text_accuracy_visual_check"
    else:
        status = "blocked_asset_generation_incomplete"

    manifest = {
        "task_type": "ali_image_asset_18s_full_video_candidate",
        "status": status,
        "this_is_full_video_candidate_not_publish_ready": True,
        "provider": "alibaba_dashscope",
        "model": model,
        "endpoint_host": "dashscope.aliyuncs.com" if "dashscope.aliyuncs.com" in endpoint else "custom",
        "api_key_env_name_used": key_name,
        "secret_values_printed": False,
        "generated_at_unix": int(time.time()),
        "max_image_api_calls": MAX_IMAGE_API_CALLS,
        "prior_image_api_calls_counted": total_prior_calls,
        "image_api_calls_this_run": calls_made_this_run,
        "actual_image_api_calls": actual_calls,
        "max_success_images": MAX_SUCCESS_IMAGES,
        "actual_success_images": len(generated),
        "max_retry_per_typo_asset": MAX_RETRY_PER_TYPO_ASSET,
        "typo_retries_used": 0,
        "estimated_cost_yuan": round(actual_calls * ESTIMATED_YUAN_PER_IMAGE, 2),
        "stop_if_provider_arrearage": True,
        "stop_if_api_budget_exceeded": True,
        "do_not_retry_without_budget_confirmation": True,
        "provider_arrearage": provider_arrearage,
        "runtime_assets_committed": False,
        "assets": assets,
    }
    write_json(manifest_path, manifest)
    text_report = {
        "status": "pending_codex_visual_inspection",
        "text_assets": [
            asset["text_accuracy"]
            for asset in assets
            if asset.get("status") == "generated" and asset.get("text_accuracy", {}).get("contains_text")
        ],
        "non_text_assets": [
            text_accuracy_stub(asset_need)
            for asset_need in ASSET_NEEDS
            if str(asset_need["caption_text"]) == "no_text_expected"
        ],
    }
    write_json(runtime_dir / "text_accuracy_report.json", text_report)
    print(
        json.dumps(
            {
                "status": status,
                "actual_image_api_calls": actual_calls,
                "image_api_calls_this_run": calls_made_this_run,
                "actual_success_images": len(generated),
                "provider_arrearage": provider_arrearage,
                "manifest": rel(manifest_path),
            },
            ensure_ascii=False,
        )
    )
    return 0 if status == "generated_pending_text_accuracy_visual_check" else 3


def run_crop(runtime_dir: Path) -> int:
    crop_script = (
        REPO_ROOT
        / "脚本_scripts"
        / "阿里图像资产工厂_ali_image_asset_factory"
        / "批量裁剪自动视觉资产_batch_crop_auto_visual_assets.py"
    )
    completed = subprocess.run(
        ["python3", str(crop_script), "--runtime-dir", str(runtime_dir)],
        cwd=REPO_ROOT,
        check=False,
        text=True,
        capture_output=True,
    )
    print(completed.stdout.strip())
    if completed.stderr.strip():
        print(completed.stderr.strip(), file=sys.stderr)
    return completed.returncode


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--runtime-dir", type=Path, default=RUNTIME_DIR)
    parser.add_argument("--timeout", type=int, default=180)
    parser.add_argument("--request-delay", type=float, default=10.0)
    parser.add_argument("--prior-calls", type=int, default=1)
    parser.add_argument("--force-asset", action="append", default=[])
    parser.add_argument("--skip-crop", action="store_true")
    args = parser.parse_args()

    args.runtime_dir.mkdir(parents=True, exist_ok=True)
    write_need_plan(args.runtime_dir)
    generation_exit = generate_assets(
        runtime_dir=args.runtime_dir,
        timeout=args.timeout,
        request_delay=args.request_delay,
        prior_calls=args.prior_calls,
        force_assets=args.force_asset,
    )
    if generation_exit != 0:
        return generation_exit
    if args.skip_crop:
        return 0
    return run_crop(args.runtime_dir)


if __name__ == "__main__":
    sys.exit(main())
