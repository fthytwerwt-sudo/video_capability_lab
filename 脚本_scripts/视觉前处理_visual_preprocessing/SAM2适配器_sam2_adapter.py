#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import platform
import sys
from pathlib import Path
from typing import Any

from 视觉前处理公共工具_visual_preprocessing_common import ROOT, tool_metadata


def module_present(name: str) -> bool:
    return importlib.util.find_spec(name) is not None


def torch_probe() -> dict[str, Any]:
    if not module_present("torch"):
        return {
            "torch_present": False,
            "torchvision_present": module_present("torchvision"),
            "device": "none",
            "can_run_without_weight_download": False,
        }
    import torch  # type: ignore

    device = "cpu"
    cuda_available = bool(getattr(torch.cuda, "is_available", lambda: False)())
    mps_available = bool(getattr(getattr(torch.backends, "mps", None), "is_available", lambda: False)())
    if cuda_available:
        device = "cuda"
    elif mps_available:
        device = "mps"
    return {
        "torch_present": True,
        "torch_version": getattr(torch, "__version__", "unknown"),
        "torchvision_present": module_present("torchvision"),
        "device": device,
        "cuda_available": cuda_available,
        "mps_available": mps_available,
        "can_run_without_weight_download": False,
    }


def checkpoint_candidates() -> list[str]:
    candidates = []
    for folder in [ROOT / "模型_models", ROOT / "checkpoints", ROOT / "weights"]:
        if folder.exists():
            for path in folder.rglob("*"):
                if path.suffix.lower() in {".pt", ".pth", ".ckpt"}:
                    candidates.append(str(path.relative_to(ROOT)))
    return candidates


def probe_sam2_environment() -> dict[str, Any]:
    python_version = sys.version_info
    version_supported = python_version >= (3, 10)
    checkpoints = checkpoint_candidates()
    return {
        "schema_name": "sam2_env_probe",
        "schema_version": "0.1.0",
        "metadata": tool_metadata(),
        "python_version": platform.python_version(),
        "python_version_supported_for_sam2": version_supported,
        "sam2_python_package_present": module_present("sam2"),
        "torch_probe": torch_probe(),
        "local_checkpoint_candidates": checkpoints,
        "sam2_status": "interface_ready_weights_missing" if not checkpoints else "interface_ready_local_weights_present_not_run",
        "weights_status": "missing_not_downloaded_by_policy" if not checkpoints else "local_candidates_found_manual_confirmation_required",
        "policy": {
            "download_checkpoints": "forbidden_this_round_without_user_permission",
            "git_clone_facebookresearch_sam2": "forbidden_this_round",
            "install_large_cuda_or_torch_stack": "forbidden_without_blocked_user_confirmation",
            "claim_boundary": "SAM2 adapter/environment probe only; segmentation not verified",
        },
    }


class SAM2Adapter:
    """Interface shell for future SAM2 segmentation without downloading weights."""

    def __init__(self, checkpoint_path: str | None = None, config_path: str | None = None) -> None:
        self.checkpoint_path = checkpoint_path
        self.config_path = config_path

    def status(self) -> dict[str, Any]:
        probe = probe_sam2_environment()
        probe["adapter_config"] = {
            "checkpoint_path": self.checkpoint_path,
            "config_path": self.config_path,
            "ready_for_real_segmentation": bool(self.checkpoint_path and self.config_path),
        }
        return probe

    def segment_frame(self, *_args: Any, **_kwargs: Any) -> dict[str, Any]:
        return {
            "status": "blocked_weights_missing",
            "reason": "SAM2 checkpoints are not downloaded in this round; use this adapter only after user approval and local weights/config are provided.",
        }
