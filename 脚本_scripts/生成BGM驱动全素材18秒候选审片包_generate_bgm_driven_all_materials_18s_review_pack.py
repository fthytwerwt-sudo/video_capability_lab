#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BGM_PATH = ROOT / "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV"
OUTPUT_DIR = ROOT / "dist/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_final_style_candidate"
OUTPUT_VIDEO = OUTPUT_DIR / "BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_final_style_candidate.mp4"
REVIEW_DIR = ROOT / "tmp/BGM驱动全素材18秒正片风格候选_bgm_driven_all_materials_18s_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"
CONTACT_SHEET = REVIEW_DIR / "BGM驱动全素材18秒正片风格候选_contact_sheet.jpg"
MANIFEST = REVIEW_DIR / "BGM驱动全素材18秒正片风格候选_review_manifest.json"


SEGMENTS = [
    {
        "id": "seg_01_intro_sand_texture",
        "path": ROOT / "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
        "start": 0.35,
        "duration": 1.40,
        "role": "opening_texture",
    },
    {
        "id": "seg_02_gym_identity",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1360.MOV",
        "start": 0.10,
        "duration": 2.00,
        "role": "subject_anchor",
    },
    {
        "id": "seg_03_gym_space",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1353.MOV",
        "start": 0.15,
        "duration": 1.80,
        "role": "space_build",
    },
    {
        "id": "seg_04_gym_action",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1350.MOV",
        "start": 0.25,
        "duration": 2.40,
        "role": "main_action",
    },
    {
        "id": "seg_05_machine_texture",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1358.MOV",
        "start": 0.60,
        "duration": 1.40,
        "role": "short_texture_cut",
    },
    {
        "id": "seg_06_machine_rise",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1351.MOV",
        "start": 0.85,
        "duration": 2.20,
        "role": "rise_texture",
    },
    {
        "id": "seg_07_drink_breath",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1359.MOV",
        "start": 0.20,
        "duration": 1.60,
        "role": "breath_object",
    },
    {
        "id": "seg_08_sky_breath",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_3226.MOV",
        "start": 1.10,
        "duration": 1.80,
        "role": "visual_reset",
    },
    {
        "id": "seg_09_shadow_outro",
        "path": ROOT / "素材/剪辑素材/剪辑/IMG_1361.MOV",
        "start": 2.10,
        "duration": 3.40,
        "role": "mood_outro",
    },
]


REVIEW_TIMES = [
    ("01_start", 0.50),
    ("02_cut_01", 1.45),
    ("03_cut_02", 3.45),
    ("04_mid", 9.00),
    ("05_cut_03", 11.25),
    ("06_sky_breath", 13.55),
    ("07_cut_04", 14.70),
    ("08_end", 17.50),
]


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def probe_duration(path: Path) -> float:
    result = subprocess.run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "default=nk=1:nw=1",
            str(path),
        ],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return float(result.stdout.strip())


def validate_inputs() -> None:
    if not BGM_PATH.exists():
        raise FileNotFoundError(BGM_PATH)
    for segment in SEGMENTS:
        path = segment["path"]
        if not isinstance(path, Path) or not path.exists():
            raise FileNotFoundError(path)
        source_duration = probe_duration(path)
        needed = float(segment["start"]) + float(segment["duration"])
        if needed > source_duration + 0.05:
            raise ValueError(f"{segment['id']} exceeds source duration: {needed:.3f} > {source_duration:.3f}")


def clean_runtime_outputs() -> None:
    if OUTPUT_VIDEO.exists():
        OUTPUT_VIDEO.unlink()
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)


def render_video() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    inputs: list[str] = []
    for segment in SEGMENTS:
        inputs.extend(["-i", str(segment["path"])])
    inputs.extend(["-i", str(BGM_PATH)])

    filters: list[str] = []
    concat_inputs: list[str] = []
    for index, segment in enumerate(SEGMENTS):
        label = f"v{index}"
        filters.append(
            (
                f"[{index}:v]"
                f"trim=start={segment['start']}:duration={segment['duration']},"
                "setpts=PTS-STARTPTS,"
                "scale=1080:1920:force_original_aspect_ratio=increase,"
                "crop=1080:1920,"
                "fps=30,"
                "setsar=1"
                f"[{label}]"
            )
        )
        concat_inputs.append(f"[{label}]")

    filters.append(
        "".join(concat_inputs)
        + f"concat=n={len(SEGMENTS)}:v=1:a=0,"
        + "format=yuv420p,"
        + "fade=t=in:st=0:d=0.20,"
        + "fade=t=out:st=17.55:d=0.45[vout]"
    )
    bgm_index = len(SEGMENTS)
    filters.append(
        f"[{bgm_index}:a]atrim=0:18,asetpts=PTS-STARTPTS,"
        "afade=t=in:st=0:d=0.10,"
        "afade=t=out:st=17.35:d=0.65[aout]"
    )

    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            *inputs,
            "-filter_complex",
            ";".join(filters),
            "-map",
            "[vout]",
            "-map",
            "[aout]",
            "-c:v",
            "libx264",
            "-preset",
            "medium",
            "-crf",
            "18",
            "-c:a",
            "aac",
            "-b:a",
            "192k",
            "-movflags",
            "+faststart",
            str(OUTPUT_VIDEO),
        ]
    )


def make_review_pack() -> None:
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    frame_paths: list[Path] = []
    for label, second in REVIEW_TIMES:
        frame_path = FRAMES_DIR / f"{label}_{second:05.2f}s.jpg"
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
                str(OUTPUT_VIDEO),
                "-frames:v",
                "1",
                "-vf",
                "scale=270:-1",
                "-q:v",
                "2",
                str(frame_path),
            ]
        )
        frame_paths.append(frame_path)

    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-pattern_type",
            "glob",
            "-i",
            str(FRAMES_DIR / "*.jpg"),
            "-vf",
            "tile=4x2:padding=16:margin=16:color=white",
            "-q:v",
            "2",
            str(CONTACT_SHEET),
        ]
    )

    manifest = {
        "output_video": str(OUTPUT_VIDEO.relative_to(ROOT)),
        "review_pack": str(REVIEW_DIR.relative_to(ROOT)),
        "contact_sheet": str(CONTACT_SHEET.relative_to(ROOT)),
        "review_frames": [str(path.relative_to(ROOT)) for path in frame_paths],
        "segments": [
            {
                "id": segment["id"],
                "path": str(segment["path"].relative_to(ROOT)),
                "source_start": segment["start"],
                "duration": segment["duration"],
                "role": segment["role"],
            }
            for segment in SEGMENTS
        ],
        "content_status": "18s_final_style_candidate_rendered_pending_user_review",
        "runtime_asset_commit_allowed_this_round": False,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    validate_inputs()
    clean_runtime_outputs()
    render_video()
    make_review_pack()
    print(f"output_video={OUTPUT_VIDEO}")
    print(f"review_pack={REVIEW_DIR}")


if __name__ == "__main__":
    main()
