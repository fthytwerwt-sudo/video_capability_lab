#!/usr/bin/env python3
"""Fill missing auto-visual asset candidates through Alibaba DashScope.

The script is remediation-oriented: it reuses valid existing files and only
calls the provider for asset_need rows that are missing or previously failed.
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from PIL import Image, ImageStat


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RUNTIME_DIR = REPO_ROOT / "tmp" / "自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe"
DEFAULT_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
DEFAULT_MODEL = "qwen-image-2.0-pro"
DEFAULT_SIZE = "1024*1024"
MIN_ASSETS = 5


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(REPO_ROOT))
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


def request_payload(prompt: str, model: str, size: str) -> Dict[str, Any]:
    return {
        "model": model,
        "input": {"messages": [{"role": "user", "content": [{"text": prompt}]}]},
        "parameters": {
            "negative_prompt": (
                "watermark, logo, brand mark, app UI, account name, platform text, QR code, copied sticker, "
                "copied emoji, copied typography, garbled Chinese, extra words, blurry, low quality"
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
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout, context=ssl.create_default_context()) as response:
        parsed = json.loads(response.read().decode("utf-8", errors="replace"))
    parsed["_http_status"] = response.status
    return parsed


def extract_image_value(response: Dict[str, Any]) -> str:
    choices = response.get("output", {}).get("choices", [])
    for choice in choices:
        for item in choice.get("message", {}).get("content", []):
            if isinstance(item, dict) and item.get("image"):
                return str(item["image"])
    raise RuntimeError("response_image_field_missing")


def download_image(image_value: str, output_path: Path, timeout: int) -> Dict[str, Any]:
    if image_value.startswith("data:image"):
        output_path.write_bytes(base64.b64decode(image_value.split(",", 1)[1]))
        return {"download_method": "data_uri", "bytes": output_path.stat().st_size}
    if image_value.startswith("http://") or image_value.startswith("https://"):
        req = urllib.request.Request(image_value, headers={"User-Agent": "video-capability-lab/remediation"})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            data = response.read()
        output_path.write_bytes(data)
        return {"download_method": "url", "bytes": len(data), "url_stored": False}
    output_path.write_bytes(base64.b64decode(image_value))
    return {"download_method": "base64", "bytes": output_path.stat().st_size}


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


def existing_asset_map(manifest: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    return {str(asset.get("asset_need_id")): asset for asset in manifest.get("assets", [])}


def generate_one(
    *,
    endpoint: str,
    api_key: str,
    model: str,
    size: str,
    asset_need: Dict[str, Any],
    output_dir: Path,
    timeout: int,
    retry_limit: int,
) -> Dict[str, Any]:
    asset_need_id = str(asset_need["asset_need_id"])
    asset_type = str(asset_need["asset_type"])
    output_path = output_dir / f"{safe_filename(asset_need_id)}_{safe_filename(asset_type)}.png"
    failures: List[Dict[str, Any]] = []
    for attempt in range(retry_limit + 1):
        try:
            response = call_dashscope(
                endpoint,
                api_key,
                request_payload(str(asset_need["prompt_for_image_api"]), model, size),
                timeout,
            )
            download = download_image(extract_image_value(response), output_path, timeout)
            if not valid_image(output_path):
                raise RuntimeError("generated_image_invalid_or_blank")
            return {
                "asset_need_id": asset_need_id,
                "asset_type": asset_type,
                "caption_text": asset_need.get("caption_text"),
                "status": "generated",
                "local_path": rel(output_path),
                "attempts": attempt + 1,
                "http_status": response.get("_http_status"),
                "request_id": response.get("request_id") or response.get("requestId"),
                "download": download,
                "image_url_or_base64_stored": False,
                "secret_values_printed": False,
                "review_status": "pending_user_review",
                "approved_for_video": False,
                "approved_for_library": False,
            }
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError, RuntimeError) as exc:
            failures.append({"attempt": attempt + 1, "failure": sanitized_failure(exc)})
            if attempt < retry_limit:
                time.sleep(12)
    return {
        "asset_need_id": asset_need_id,
        "asset_type": asset_type,
        "caption_text": asset_need.get("caption_text"),
        "status": "failed",
        "local_path": rel(output_path),
        "attempts": retry_limit + 1,
        "failures": failures,
        "secret_values_printed": False,
        "review_status": "pending_user_review",
        "approved_for_video": False,
        "approved_for_library": False,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--runtime-dir", default=str(DEFAULT_RUNTIME_DIR))
    parser.add_argument("--timeout", type=int, default=180)
    parser.add_argument("--retry-limit", type=int, default=1)
    parser.add_argument("--request-delay", type=float, default=18.0)
    args = parser.parse_args()

    load_dotenv(REPO_ROOT / ".env")
    key_name, api_key = resolve_key()
    runtime_dir = Path(args.runtime_dir)
    plan_path = runtime_dir / "visual_asset_need_plan.json"
    manifest_path = runtime_dir / "image_generation_manifest.json"
    output_dir = runtime_dir / "generated_assets"
    output_dir.mkdir(parents=True, exist_ok=True)

    if not plan_path.exists():
        result = {"status": "blocked_less_than_5_generated_assets_and_missing_need_plan", "secret_values_printed": False}
        manifest_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(result, ensure_ascii=False))
        return 2
    if not api_key:
        result = {"status": "blocked_api_config_missing", "api_key_env_name_present": False, "secret_values_printed": False}
        manifest_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(result, ensure_ascii=False))
        return 2

    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    old_manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {"assets": []}
    old_by_id = existing_asset_map(old_manifest)
    endpoint = os.getenv("ALIBABA_IMAGE_ENDPOINT", "").strip() or DEFAULT_ENDPOINT
    model = os.getenv("ALIBABA_IMAGE_MODEL", "").strip() or DEFAULT_MODEL
    size = (os.getenv("ALIBABA_IMAGE_SIZE", DEFAULT_SIZE).strip() or DEFAULT_SIZE).replace("x", "*").replace("X", "*")

    assets: List[Dict[str, Any]] = []
    generated_missing_assets = 0
    for asset_need in plan.get("asset_needs", []):
        asset_need_id = str(asset_need["asset_need_id"])
        existing = old_by_id.get(asset_need_id)
        if existing and existing.get("local_path") and valid_image(REPO_ROOT / str(existing["local_path"])):
            reused = dict(existing)
            reused["status"] = "generated"
            reused["reused_existing_file"] = True
            assets.append(reused)
            continue
        if generated_missing_assets > 0:
            time.sleep(max(0.0, args.request_delay))
        generated_missing_assets += 1
        assets.append(
            generate_one(
                endpoint=endpoint,
                api_key=api_key,
                model=model,
                size=size,
                asset_need=asset_need,
                output_dir=output_dir,
                timeout=args.timeout,
                retry_limit=max(0, args.retry_limit),
            )
        )

    generated = [asset for asset in assets if asset.get("status") == "generated" and valid_image(REPO_ROOT / str(asset.get("local_path", "")))]
    status = "generated" if len(generated) >= MIN_ASSETS else "blocked_less_than_5_generated_assets"
    manifest = {
        "task_type": "auto_visual_asset_need_detection_probe",
        "status": status,
        "remediation_mode": True,
        "provider": "alibaba_dashscope",
        "model": model,
        "endpoint_host": "dashscope.aliyuncs.com" if "dashscope.aliyuncs.com" in endpoint else "custom",
        "api_key_env_name_used": key_name,
        "secret_values_printed": False,
        "generated_at_unix": int(time.time()),
        "total_requested": len(plan.get("asset_needs", [])),
        "total_generated": len(generated),
        "generated_missing_assets": generated_missing_assets,
        "existing_generated_assets_reused": len([asset for asset in assets if asset.get("reused_existing_file")]),
        "runtime_assets_committed": False,
        "assets": assets,
    }
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: manifest[k] for k in ["status", "total_requested", "total_generated", "generated_missing_assets", "existing_generated_assets_reused"]}, ensure_ascii=False))
    return 0 if status == "generated" else 3


if __name__ == "__main__":
    sys.exit(main())
