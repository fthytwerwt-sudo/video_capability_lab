#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import librosa
import numpy as np
from scipy.signal import find_peaks


def marker(time: float, marker_type: str, confidence: float, source: str) -> dict[str, Any]:
    return {
        "time": round(float(time), 3),
        "type": marker_type,
        "confidence": round(float(confidence), 3),
        "source": source,
    }


def write_json(path: Path, data: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def top_unique_times(times: np.ndarray, limit: int, min_gap: float) -> list[float]:
    selected: list[float] = []
    for value in sorted(float(t) for t in times if float(t) >= 0):
        if all(abs(value - existing) >= min_gap for existing in selected):
            selected.append(value)
        if len(selected) >= limit:
            break
    return selected


def analyze(audio_path: Path, output_dir: Path, duration_limit: float) -> dict[str, int]:
    y, sr = librosa.load(audio_path, sr=22050, mono=True, duration=duration_limit)
    if y.size == 0:
        raise ValueError(f"audio file has no readable samples: {audio_path}")

    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
    beat_times = librosa.frames_to_time(beat_frames, sr=sr)
    if np.size(tempo) > 0:
        tempo_value = float(np.asarray(tempo).reshape(-1)[0])
    else:
        tempo_value = 0.0
    beat_confidence = 0.68 if tempo_value > 0 and len(beat_times) >= 3 else 0.45
    beat_markers = [
        marker(t, "beat", beat_confidence, "librosa.beat.beat_track 自动分析，未人工复听确认，非成品级精准卡点")
        for t in top_unique_times(beat_times, limit=16, min_gap=0.35)
        if t <= duration_limit
    ]

    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units="frames", backtrack=False)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)
    onset_markers = [
        marker(t, "onset", 0.62, "librosa.onset.onset_detect 自动分析，未人工复听确认，非成品级精准卡点")
        for t in top_unique_times(onset_times, limit=20, min_gap=0.22)
        if t <= duration_limit
    ]

    rms = librosa.feature.rms(y=y, frame_length=2048, hop_length=512)[0]
    rms_times = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=512)
    if len(rms) > 0 and float(np.max(rms)) > 0:
        normalized = rms / float(np.max(rms))
        peaks, _props = find_peaks(normalized, distance=10, prominence=0.04)
        ranked = sorted(
            ((float(normalized[idx]), float(rms_times[idx])) for idx in peaks),
            reverse=True,
        )
        rms_times_ranked = np.array([time for _, time in ranked[:18]])
    else:
        rms_times_ranked = np.array([])
    rms_markers = [
        marker(t, "rms_peak", 0.58, "librosa RMS + scipy find_peaks 自动分析，未人工复听确认，非成品级精准卡点")
        for t in top_unique_times(rms_times_ranked, limit=12, min_gap=0.35)
        if t <= duration_limit
    ]

    write_json(output_dir / "beat_map.json", beat_markers)
    write_json(output_dir / "onset_map.json", onset_markers)
    write_json(output_dir / "rms_peaks.json", rms_markers)

    return {
        "beat": len(beat_markers),
        "onset": len(onset_markers),
        "rms_peak": len(rms_markers),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate coarse BGM beat/onset/RMS markers for Remotion demo review.")
    parser.add_argument("audio_path", type=Path)
    parser.add_argument("--output-dir", type=Path, default=Path("tmp/remotion_demo_assets"))
    parser.add_argument("--duration", type=float, default=15.0)
    args = parser.parse_args()

    counts = analyze(args.audio_path, args.output_dir, args.duration)
    print(json.dumps({"status": "generated", "output_dir": str(args.output_dir), "counts": counts}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
