#!/usr/bin/env python3
from __future__ import annotations

import importlib
import importlib.metadata
import json
import platform
import shutil
import subprocess
import sys
from typing import Any


REQUIRED_MODULES = ["numpy", "scipy", "soundfile", "librosa"]


def command_status(name: str) -> dict[str, Any]:
    path = shutil.which(name)
    if not path:
        return {"status": "missing", "version": None, "path": None, "error": f"{name} not found"}

    try:
        proc = subprocess.run(
            [path, "-version"],
            check=False,
            capture_output=True,
            text=True,
            timeout=10,
        )
    except Exception as exc:  # noqa: BLE001 - report exact diagnostic in JSON.
        return {"status": "error", "version": None, "path": path, "error": f"{type(exc).__name__}: {exc}"}

    first_line = (proc.stdout or proc.stderr).splitlines()[0] if (proc.stdout or proc.stderr) else ""
    if proc.returncode != 0:
        return {"status": "error", "version": first_line, "path": path, "error": f"exit_code={proc.returncode}"}
    return {"status": "available", "version": first_line, "path": path, "error": None}


def module_status(name: str) -> dict[str, Any]:
    try:
        importlib.import_module(name)
        version = importlib.metadata.version(name)
    except Exception as exc:  # noqa: BLE001 - report exact diagnostic in JSON.
        return {"status": "missing_or_error", "version": None, "error": f"{type(exc).__name__}: {exc}"}
    return {"status": "available", "version": version, "error": None}


def synthetic_audio_test() -> dict[str, Any]:
    try:
        import librosa
        import numpy as np

        sample_rate = 22050
        duration_seconds = 4.0
        click_interval_seconds = 0.5
        click_times = np.arange(0.0, duration_seconds, click_interval_seconds)
        audio = librosa.clicks(
            times=click_times,
            sr=sample_rate,
            length=int(sample_rate * duration_seconds),
        )
        onset_envelope = librosa.onset.onset_strength(y=audio, sr=sample_rate)
        tempo, beat_times = librosa.beat.beat_track(
            onset_envelope=onset_envelope,
            sr=sample_rate,
            units="time",
            trim=True,
        )
        tempo_value = float(np.asarray(tempo).reshape(-1)[0])
        beat_times_list = [round(float(value), 3) for value in beat_times]
        passed = 90.0 <= tempo_value <= 150.0 and len(beat_times_list) >= 6
        return {
            "status": "passed" if passed else "failed",
            "generated_click_count": int(len(click_times)),
            "estimated_tempo": round(tempo_value, 3),
            "beat_count": len(beat_times_list),
            "beat_times": beat_times_list,
            "onset_envelope_length": int(len(onset_envelope)),
            "notes": [
                "synthetic click audio only",
                "does not prove real BGM beat_map quality",
            ],
        }
    except Exception as exc:  # noqa: BLE001 - report exact diagnostic in JSON.
        return {
            "status": "failed",
            "failed_item": "synthetic_audio_test",
            "error": f"{type(exc).__name__}: {exc}",
            "notes": ["synthetic click audio only"],
        }


def main() -> int:
    ffmpeg = command_status("ffmpeg")
    ffprobe = command_status("ffprobe")
    modules = {name: module_status(name) for name in REQUIRED_MODULES}

    result: dict[str, Any] = {
        "status": "passed",
        "ffmpeg": ffmpeg["status"],
        "ffprobe": ffprobe["status"],
        "python": "available",
        "librosa": modules["librosa"]["status"],
        "numpy": modules["numpy"]["status"],
        "scipy": modules["scipy"]["status"],
        "soundfile": modules["soundfile"]["status"],
        "details": {
            "ffmpeg": ffmpeg,
            "ffprobe": ffprobe,
            "python": {
                "status": "available",
                "version": platform.python_version(),
                "executable": sys.executable,
            },
            "modules": modules,
        },
        "synthetic_audio_test": None,
        "estimated_tempo": None,
        "beat_count": 0,
        "notes": [],
    }

    required_statuses = [ffmpeg["status"], ffprobe["status"], *(item["status"] for item in modules.values())]
    if any(status != "available" for status in required_statuses):
        result["status"] = "failed"
        result["failed_item"] = "toolchain_import_or_binary"
        result["notes"].append("missing required binary or Python module")
        print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
        return 1

    synthetic = synthetic_audio_test()
    result["synthetic_audio_test"] = synthetic["status"]
    result["estimated_tempo"] = synthetic.get("estimated_tempo")
    result["beat_count"] = synthetic.get("beat_count", 0)
    result["details"]["synthetic_audio_test"] = synthetic
    result["notes"].extend(synthetic.get("notes", []))
    if synthetic["status"] != "passed":
        result["status"] = "failed"
        result["failed_item"] = "synthetic_audio_test"
        result["error"] = synthetic.get("error")

    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    return 0 if result["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
