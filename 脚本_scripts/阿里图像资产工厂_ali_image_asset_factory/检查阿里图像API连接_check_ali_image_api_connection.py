#!/usr/bin/env python3
"""Check Alibaba DashScope image API connectivity without printing secrets."""

from __future__ import annotations

import argparse
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Dict, Optional, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT_DIR = REPO_ROOT / "tmp" / "阿里图像资产工厂最小验证_ali_image_asset_factory_minimal_probe"
DEFAULT_ENDPOINT = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
DEFAULT_MODEL = "qwen-image-2.0-pro"
ENV_KEYS = (
    "DASHSCOPE_API_KEY",
    "ALIBABA_DASHSCOPE_API_KEY",
    "ALIBABA_IMAGE_ENDPOINT",
    "ALIBABA_IMAGE_MODEL",
    "IMAGE_API_PROVIDER",
)


class ProbeError(RuntimeError):
    """Raised for sanitized probe failures."""

    def __init__(self, reason: str, detail: str = "") -> None:
        super().__init__(reason)
        self.reason = reason
        self.detail = detail


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


def env_presence() -> Dict[str, bool]:
    return {key: bool(os.getenv(key, "").strip()) for key in ENV_KEYS}


def resolve_key() -> Tuple[Optional[str], Optional[str]]:
    for key_name in ("DASHSCOPE_API_KEY", "ALIBABA_DASHSCOPE_API_KEY"):
        value = os.getenv(key_name, "").strip()
        if value:
            return key_name, value
    return None, None


def normalize_size(value: str) -> str:
    value = value.strip() or "1024*1024"
    return value.replace("x", "*").replace("X", "*")


def extract_image_presence(payload: Dict[str, Any]) -> bool:
    choices = payload.get("output", {}).get("choices", [])
    if not choices:
        return False
    content = choices[0].get("message", {}).get("content", [])
    return any(isinstance(item, dict) and bool(item.get("image")) for item in content)


def sanitized_error(exc: urllib.error.HTTPError) -> Tuple[int, Dict[str, Any]]:
    body = exc.read().decode("utf-8", errors="replace")
    try:
        payload: Dict[str, Any] = json.loads(body)
    except json.JSONDecodeError:
        payload = {"raw_body_present": bool(body)}
    return exc.code, {
        "http_status": exc.code,
        "code": payload.get("code"),
        "message": payload.get("message"),
        "request_id": payload.get("request_id") or payload.get("requestId"),
    }


def call_dashscope(endpoint: str, api_key: str, model: str, timeout: int) -> Dict[str, Any]:
    request_payload = {
        "model": model,
        "input": {
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "text": (
                                "Connectivity smoke test only. Generate one simple abstract "
                                "gray dot on a plain white background. No words, no watermark, "
                                "no logo, no UI, no brand."
                            )
                        }
                    ],
                }
            ]
        },
        "parameters": {
            "negative_prompt": "watermark, logo, brand, app UI, readable text, account name",
            "prompt_extend": False,
            "watermark": False,
            "size": normalize_size(os.getenv("ALIBABA_IMAGE_SIZE", "1024*1024")),
            "n": 1,
        },
    }
    req = urllib.request.Request(
        endpoint,
        data=json.dumps(request_payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    context = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=timeout, context=context) as response:
        response_body = response.read().decode("utf-8", errors="replace")
    payload = json.loads(response_body)
    payload["_http_status"] = response.status
    return payload


def build_result(status: str, **extra: Any) -> Dict[str, Any]:
    return {
        "status": status,
        "task_type": "ali_image_api_connection_smoke_test",
        "generated_formal_asset": False,
        "secret_values_printed": False,
        "checked_at_unix": int(time.time()),
        **extra,
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR))
    parser.add_argument("--timeout", type=int, default=120)
    args = parser.parse_args()

    load_dotenv(REPO_ROOT / ".env")
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "api_connection_check.json"

    key_name, api_key = resolve_key()
    endpoint = os.getenv("ALIBABA_IMAGE_ENDPOINT", "").strip() or DEFAULT_ENDPOINT
    model = os.getenv("ALIBABA_IMAGE_MODEL", "").strip() or DEFAULT_MODEL
    env_keys_present = env_presence()

    if not api_key:
        result = build_result(
            "blocked_ali_api_env_missing",
            api_key_env_name_present=False,
            env_keys_present=env_keys_present,
            endpoint_configured=bool(endpoint),
            model_configured=bool(model),
        )
        output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
        print(json.dumps(result, ensure_ascii=False))
        return 2

    try:
        payload = call_dashscope(endpoint, api_key, model, args.timeout)
        image_present = extract_image_presence(payload)
        if not image_present:
            raise ProbeError("blocked_ali_api_connection_failed", "success_response_without_image_field")
        result = build_result(
            "passed",
            api_key_env_name_used=key_name,
            env_keys_present=env_keys_present,
            endpoint_host="dashscope.aliyuncs.com" if "dashscope.aliyuncs.com" in endpoint else "custom",
            model=model,
            http_status=payload.get("_http_status"),
            dashscope_request_id=payload.get("request_id") or payload.get("requestId"),
            image_url_present=True,
            image_url_stored=False,
            response_sanitized=True,
        )
    except urllib.error.HTTPError as exc:
        _status, sanitized = sanitized_error(exc)
        result = build_result(
            "blocked_ali_api_connection_failed",
            api_key_env_name_used=key_name,
            env_keys_present=env_keys_present,
            response_sanitized=True,
            failure=sanitized,
        )
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, ProbeError) as exc:
        reason = exc.reason if isinstance(exc, ProbeError) else "blocked_ali_api_connection_failed"
        result = build_result(
            reason,
            api_key_env_name_used=key_name,
            env_keys_present=env_keys_present,
            response_sanitized=True,
            failure={"type": exc.__class__.__name__, "message": str(exc)[:300]},
        )

    output_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False))
    return 0 if result["status"] == "passed" else 3


if __name__ == "__main__":
    sys.exit(main())
