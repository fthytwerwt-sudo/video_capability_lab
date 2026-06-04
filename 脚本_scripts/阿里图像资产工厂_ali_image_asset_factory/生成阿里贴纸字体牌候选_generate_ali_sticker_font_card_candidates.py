#!/usr/bin/env python3
"""Generate one sticker candidate and one font card candidate via Alibaba DashScope."""

from __future__ import annotations

import argparse
import base64
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT_DIR = REPO_ROOT / "tmp" / "阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe"
DEFAULT_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
DEFAULT_MODEL = "qwen-image-2.0-pro"
DEFAULT_SIZE = "1024*1024"


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
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(name, value)


def resolve_key() -> Tuple[Optional[str], Optional[str]]:
    for key_name in ("DASHSCOPE_API_KEY", "ALIBABA_DASHSCOPE_API_KEY"):
        value = os.getenv(key_name, "").strip()
        if value:
            return key_name, value
    return None, None


def normalize_size(value: str) -> str:
    return (value.strip() or DEFAULT_SIZE).replace("x", "*").replace("X", "*")


def build_asset_request() -> Dict[str, Any]:
    return {
        "task_type": "ali_image_asset_factory_minimal_probe",
        "candidate_count_limit": {"sticker_candidate": 1, "font_card_candidate": 1},
        "copy_boundary": {
            "must_be_original": True,
            "do_not_copy_reference_sticker_or_font": True,
            "do_not_include_platform_ui_or_account": True,
        },
        "sticker_candidate_request": {
            "asset_id": "ali_sticker_candidate_01",
            "asset_type": "sticker_candidate",
            "target": "Generate one original yellow emoji reaction sticker for vlog short video overlay use.",
            "style": "yellow emoji face / playful / vlog / sticker / soft shadow",
            "emotion": "no-feeling / awkward / silly / cute reaction",
            "shape": "round face, simple expressive eyes, mouth, playful face",
            "background": "plain or removable background",
            "prompt": (
                "Original yellow emoji face sticker for a vlog overlay, playful no-feeling awkward "
                "reaction, round face, simple expressive eyes, slightly silly mouth, cute and funny, "
                "soft shadow, clean edge, centered single sticker, plain removable background, no text. "
                "Do not copy any existing emoji or third-party sticker."
            ),
            "must_not_include": [
                "watermark",
                "app UI",
                "account name",
                "brand logo",
                "copied third-party sticker",
                "readable platform text",
            ],
        },
        "font_card_candidate_request": {
            "asset_id": "ali_font_card_candidate_01",
            "asset_type": "font_card_candidate",
            "target": "Generate one bold white handwritten Chinese text card candidate.",
            "text": "没感觉",
            "style": "bold white handwritten Chinese, rough edge, playful vlog caption, slight dark shadow",
            "background": "plain or removable background",
            "usage": "image sticker style text card, not official subtitle font",
            "prompt": (
                "A single image sticker style Chinese text card with exactly these three Chinese characters: "
                "没感觉. Bold white handwritten Chinese lettering, rough handmade edges, playful vlog caption "
                "feeling, slight dark soft shadow, centered, plain removable background. No other words, "
                "no extra characters, no punctuation, no watermark, no logo."
            ),
            "must_not_include": [
                "watermark",
                "app UI",
                "account name",
                "copied font",
                "copied reference typography",
                "extra wrong Chinese characters",
            ],
        },
    }


def request_payload(prompt: str, model: str, size: str) -> Dict[str, Any]:
    return {
        "model": model,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [{"text": prompt}],
                }
            ]
        },
        "parameters": {
            "negative_prompt": (
                "watermark, logo, brand mark, app UI, account name, platform text, copied third-party sticker, "
                "copied typography, garbled Chinese, extra Chinese characters, low quality, blurry text"
            ),
            "prompt_extend": False,
            "watermark": False,
            "size": size,
            "n": 1,
        },
    }


def call_dashscope(endpoint: str, api_key: str, payload: Dict[str, Any], timeout: int) -> Dict[str, Any]:
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    context = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=timeout, context=context) as response:
        body = response.read().decode("utf-8", errors="replace")
    parsed = json.loads(body)
    parsed["_http_status"] = response.status
    return parsed


def extract_image_value(response: Dict[str, Any]) -> str:
    choices = response.get("output", {}).get("choices", [])
    for choice in choices:
        content = choice.get("message", {}).get("content", [])
        for item in content:
            if isinstance(item, dict) and item.get("image"):
                return str(item["image"])
    raise RuntimeError("response_image_field_missing")


def download_image(image_value: str, output_path: Path, timeout: int) -> Dict[str, Any]:
    if image_value.startswith("data:image"):
        encoded = image_value.split(",", 1)[1]
        output_path.write_bytes(base64.b64decode(encoded))
        return {"download_method": "data_uri", "bytes": output_path.stat().st_size}
    if image_value.startswith("http://") or image_value.startswith("https://"):
        req = urllib.request.Request(image_value, headers={"User-Agent": "video-capability-lab/ali-probe"})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            data = response.read()
        output_path.write_bytes(data)
        return {
            "download_method": "url",
            "bytes": len(data),
            "url_host_present": True,
            "url_stored": False,
        }
    output_path.write_bytes(base64.b64decode(image_value))
    return {"download_method": "base64", "bytes": output_path.stat().st_size}


def sanitized_failure(exc: urllib.error.HTTPError) -> Dict[str, Any]:
    body = exc.read().decode("utf-8", errors="replace")
    try:
        payload: Dict[str, Any] = json.loads(body)
    except json.JSONDecodeError:
        payload = {"raw_body_present": bool(body)}
    return {
        "http_status": exc.code,
        "code": payload.get("code"),
        "message": payload.get("message"),
        "request_id": payload.get("request_id") or payload.get("requestId"),
    }


def sanitize_success(asset_id: str, response: Dict[str, Any], download: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "asset_id": asset_id,
        "http_status": response.get("_http_status"),
        "request_id": response.get("request_id") or response.get("requestId"),
        "image_field_present": True,
        "image_url_or_base64_stored": False,
        "download": download,
    }


def generate_one(
    *,
    endpoint: str,
    api_key: str,
    model: str,
    size: str,
    prompt: str,
    asset_id: str,
    output_path: Path,
    timeout: int,
) -> Dict[str, Any]:
    payload = request_payload(prompt, model, size)
    response = call_dashscope(endpoint, api_key, payload, timeout)
    image_value = extract_image_value(response)
    download = download_image(image_value, output_path, timeout)
    if not output_path.exists() or output_path.stat().st_size <= 0:
        raise RuntimeError(f"{asset_id}_image_not_written")
    return sanitize_success(asset_id, response, download)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument("--timeout", type=int, default=180)
    args = parser.parse_args()

    load_dotenv(REPO_ROOT / ".env")
    key_name, api_key = resolve_key()
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    asset_request = build_asset_request()
    (output_dir / "asset_request.json").write_text(
        json.dumps(asset_request, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    response_summary: Dict[str, Any] = {
        "task_type": "ali_image_asset_factory_minimal_probe",
        "source_method": "ali_image_api",
        "secret_values_printed": False,
        "generated_at_unix": int(time.time()),
        "api_key_env_name_used": key_name,
        "assets": [],
    }

    if not api_key:
        response_summary["status"] = "blocked_ali_api_env_missing"
        (output_dir / "api_response_sanitized.json").write_text(
            json.dumps(response_summary, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(json.dumps(response_summary, ensure_ascii=False))
        return 2

    endpoint = os.getenv("ALIBABA_IMAGE_ENDPOINT", "").strip() or DEFAULT_ENDPOINT
    model = os.getenv("ALIBABA_IMAGE_MODEL", "").strip() or DEFAULT_MODEL
    size = normalize_size(os.getenv("ALIBABA_IMAGE_SIZE", DEFAULT_SIZE))

    targets = [
        (
            asset_request["sticker_candidate_request"],
            output_dir / "sticker_candidate_01.png",
        ),
        (
            asset_request["font_card_candidate_request"],
            output_dir / "font_card_candidate_01.png",
        ),
    ]

    try:
        for request, output_path in targets:
            response_summary["assets"].append(
                generate_one(
                    endpoint=endpoint,
                    api_key=api_key,
                    model=model,
                    size=size,
                    prompt=request["prompt"],
                    asset_id=request["asset_id"],
                    output_path=output_path,
                    timeout=args.timeout,
                )
            )
        response_summary["status"] = "generated"
        response_summary["model"] = model
        response_summary["endpoint_host"] = "dashscope.aliyuncs.com" if "dashscope.aliyuncs.com" in endpoint else "custom"
        response_summary["candidate_count"] = len(response_summary["assets"])
    except urllib.error.HTTPError as exc:
        response_summary["status"] = "blocked_ali_api_connection_failed"
        response_summary["failure"] = sanitized_failure(exc)
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
        response_summary["status"] = "blocked_ali_api_connection_failed"
        response_summary["failure"] = {"type": exc.__class__.__name__, "message": str(exc)[:300]}

    (output_dir / "api_response_sanitized.json").write_text(
        json.dumps(response_summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(response_summary, ensure_ascii=False))
    return 0 if response_summary["status"] == "generated" else 3


if __name__ == "__main__":
    sys.exit(main())
