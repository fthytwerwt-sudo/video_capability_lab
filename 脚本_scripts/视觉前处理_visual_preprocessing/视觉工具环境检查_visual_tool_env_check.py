#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import platform
from pathlib import Path
from typing import Any

from SAM2适配器_sam2_adapter import probe_sam2_environment
from 视觉前处理公共工具_visual_preprocessing_common import build_parser, rel, tool_metadata, write_json


def probe_import(name: str, attr: str = "__version__") -> dict[str, Any]:
    spec = importlib.util.find_spec(name)
    if spec is None:
        return {"present": False, "version": None}
    try:
        module = __import__(name)
        return {"present": True, "version": getattr(module, attr, "unknown")}
    except Exception as exc:  # pragma: no cover - runtime probe path
        return {"present": True, "version": "import_failed", "error": str(exc)}


def build_report() -> dict[str, Any]:
    cv2_probe = probe_import("cv2")
    mediapipe_probe = probe_import("mediapipe")
    numpy_probe = probe_import("numpy")
    sam2 = probe_sam2_environment()
    return {
        "schema_name": "visual_tool_env_check",
        "schema_version": "0.1.0",
        "metadata": tool_metadata(),
        "python": platform.python_version(),
        "opencv": cv2_probe,
        "numpy": numpy_probe,
        "mediapipe": mediapipe_probe,
        "sam2_env_probe": sam2,
        "status": {
            "opencv_ready_for_probe": bool(cv2_probe["present"] and cv2_probe["version"] != "import_failed"),
            "mediapipe_ready_for_probe": bool(mediapipe_probe["present"] and mediapipe_probe["version"] != "import_failed"),
            "sam2_adapter_ready": True,
            "sam2_segmentation_verified": False,
            "sam2_status": sam2["sam2_status"],
        },
        "claim_boundary": "environment_check_only_not_video_capability_validation",
    }


def main() -> None:
    parser = build_parser("Check OpenCV / MediaPipe / SAM2 visual tool environment.")
    args = parser.parse_args()
    output_dir = Path(args.output_dir)
    report = build_report()
    env_path = output_dir / "visual_tool_env_check.json"
    sam2_path = output_dir / "sam2_env_probe.json"
    write_json(env_path, report)
    write_json(sam2_path, report["sam2_env_probe"])
    print(f"wrote {rel(env_path)}")
    print(f"wrote {rel(sam2_path)}")


if __name__ == "__main__":
    main()
