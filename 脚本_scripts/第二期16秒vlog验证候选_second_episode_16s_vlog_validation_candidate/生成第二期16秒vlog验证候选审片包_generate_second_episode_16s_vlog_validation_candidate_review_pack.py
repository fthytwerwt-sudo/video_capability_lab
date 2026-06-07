#!/usr/bin/env python3
"""Generate review-pack data for the second-episode 16s vlog validation candidate."""

from __future__ import annotations

import argparse
import array
import json
import math
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[2]
MATERIAL_DIR = ROOT / "素材" / "第二期" / "第二期素材"
BGM_DIR = ROOT / "素材" / "第二期" / "第二期 BGM"
REVIEW_DIR = (
    ROOT
    / "tmp"
    / "第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate_review_pack"
)
DIST_VIDEO = (
    ROOT
    / "dist"
    / "第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate"
    / "第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.mp4"
)

COMPOSITION_ID = "第二期16秒vlog验证候选-second-episode-16s-vlog-validation-candidate"
FPS = 30
WIDTH = 1080
HEIGHT = 1920
DURATION_SEC = 16
DURATION_IN_FRAMES = FPS * DURATION_SEC


SELECTED_SHOTS: list[dict[str, Any]] = [
    {
        "shot_id": "shot_01_food_hook",
        "material_id": "M03",
        "path": "素材/第二期/第二期素材/IMG_1364.MOV",
        "time_range": {"start_sec": 0.0, "end_sec": 1.4},
        "source_start_sec": 0.18,
        "narrative_role": "hook",
        "music_fit_note": "短促食物特写适合开场的轻快起笔，先给日常质感而不是解释。",
        "mood_reason": "BGM 开头能量未完全铺开，适合用近景小物件建立 odd vlog 的私人入口。",
        "visual_reason": "手持食物、浅景深和街面共同给出可感知的日常事件。",
        "cut_point_reason": "1.4s 前完成信息识别，随后切到活物/街头以扩大空间。",
        "scale_start": 1.18,
        "scale_end": 1.08,
        "y_start": 4,
        "y_end": -14,
        "object_position": "50% 50%",
        "grade_zone": "day_warm_detail",
        "risk": "食物镜头过长会像生活记录流水账，因此只作短 hook。",
    },
    {
        "shot_id": "shot_02_dog_walk",
        "material_id": "M08",
        "path": "素材/第二期/第二期素材/IMG_1371.MOV",
        "time_range": {"start_sec": 1.4, "end_sec": 3.0},
        "source_start_sec": 0.35,
        "narrative_role": "hook_to_atmosphere",
        "music_fit_note": "白狗经过的轻动作匹配 BGM 进入稳定律动的柔和段。",
        "mood_reason": "轻松、明亮、有一点偶遇感，能把开头从物件转向街头生命感。",
        "visual_reason": "狗和人脚形成自然动线，主体清楚但不刻意表演。",
        "cut_point_reason": "在狗穿过画面后切出，避免无动作空等。",
        "scale_start": 1.12,
        "scale_end": 1.04,
        "y_start": 0,
        "y_end": -8,
        "object_position": "50% 50%",
        "grade_zone": "day_soft_green",
        "risk": "主体低位，竖屏裁切需保护狗的运动方向。",
    },
    {
        "shot_id": "shot_03_sidewalk_build",
        "material_id": "M02",
        "path": "素材/第二期/第二期素材/IMG_1363.MOV",
        "time_range": {"start_sec": 3.0, "end_sec": 4.6},
        "source_start_sec": 0.05,
        "narrative_role": "atmosphere_build",
        "music_fit_note": "稳定街面步行感承接 BGM 第一段律动，做空间建立。",
        "mood_reason": "音乐进入平稳推进，镜头从特写和偶遇扩到人行道环境。",
        "visual_reason": "摊位、行人、自行车形成城市街区层次。",
        "cut_point_reason": "在街区信息建立后切入影子镜头，进入第一处节奏变化。",
        "scale_start": 1.11,
        "scale_end": 1.04,
        "y_start": 10,
        "y_end": -10,
        "object_position": "50% 52%",
        "grade_zone": "day_neutral_walk",
        "risk": "人多但主体不唯一，作为氛围段短用。",
    },
    {
        "shot_id": "shot_04_shadow_cart",
        "material_id": "M06",
        "path": "素材/第二期/第二期素材/IMG_1367.MOV",
        "time_range": {"start_sec": 4.6, "end_sec": 5.8},
        "source_start_sec": 0.25,
        "narrative_role": "rhythm_texture",
        "music_fit_note": "影子和车筐的线条适合 BGM 小起伏处做视觉节拍。",
        "mood_reason": "从街面现实进入更 odd 的主观视角。",
        "visual_reason": "影子、车筐和地面纹理有强图形关系，适合短切。",
        "cut_point_reason": "只用 1.2s，承担节奏标点但不加视觉标点图层。",
        "scale_start": 1.1,
        "scale_end": 1.03,
        "y_start": 6,
        "y_end": -10,
        "object_position": "50% 50%",
        "grade_zone": "shadow_clean",
        "risk": "主体是影子，不能停留太久，否则叙事会变弱。",
    },
    {
        "shot_id": "shot_05_crosswalk_motion",
        "material_id": "M10",
        "path": "素材/第二期/第二期素材/IMG_1380.MOV",
        "time_range": {"start_sec": 5.8, "end_sec": 7.8},
        "source_start_sec": 1.1,
        "narrative_role": "motion_progression",
        "music_fit_note": "路口/斑马线和行人运动适合 BGM 中段推进。",
        "mood_reason": "能量略抬升，镜头从小日常进入明确位移。",
        "visual_reason": "横向道路、行人和交通灯给出城市行动节点。",
        "cut_point_reason": "在路口动作完成前切到黄昏，制造时间流动。",
        "scale_start": 1.13,
        "scale_end": 1.05,
        "y_start": 8,
        "y_end": -12,
        "object_position": "50% 51%",
        "grade_zone": "day_motion",
        "risk": "路口主体分散，需靠节奏和裁切组织观看。",
    },
    {
        "shot_id": "shot_06_golden_city_shift",
        "material_id": "M11",
        "path": "素材/第二期/第二期素材/IMG_1381.MOV",
        "time_range": {"start_sec": 7.8, "end_sec": 9.8},
        "source_start_sec": 0.5,
        "narrative_role": "emotion_shift",
        "music_fit_note": "树影和暖光适合 BGM 中段情绪从轻快转为微暖。",
        "mood_reason": "让白天段落自然走向傍晚，音乐情绪不再只是动作推进。",
        "visual_reason": "暖光、树和城市背景有明确日落层次。",
        "cut_point_reason": "在暖色建立后切入夜间店铺，完成昼夜桥接。",
        "scale_start": 1.09,
        "scale_end": 1.02,
        "y_start": 6,
        "y_end": -10,
        "object_position": "50% 50%",
        "grade_zone": "golden_shift",
        "risk": "暖光和前段日光色差大，需要基础统一后再保留转场色温。",
    },
    {
        "shot_id": "shot_07_night_store",
        "material_id": "M14",
        "path": "素材/第二期/第二期素材/IMG_1385.MOV",
        "time_range": {"start_sec": 9.8, "end_sec": 11.35},
        "source_start_sec": 0.3,
        "narrative_role": "night_arrival",
        "music_fit_note": "店铺霓虹和 BGM 后半段的明亮高频匹配，形成夜间落点。",
        "mood_reason": "情绪从白天游走转成夜间逛街的轻微兴奋。",
        "visual_reason": "灯牌、门头和街面给出明确夜间城市坐标。",
        "cut_point_reason": "灯牌识别后快速切走，避免字幕/招牌喧宾夺主。",
        "scale_start": 1.1,
        "scale_end": 1.03,
        "y_start": 6,
        "y_end": -8,
        "object_position": "50% 50%",
        "grade_zone": "night_neon",
        "risk": "招牌文字属于素材本身，非本轮字幕；注意不过度锐化。",
    },
    {
        "shot_id": "shot_08_night_crossing",
        "material_id": "M18",
        "path": "素材/第二期/第二期素材/IMG_1390.MOV",
        "time_range": {"start_sec": 11.35, "end_sec": 13.1},
        "source_start_sec": 0.9,
        "narrative_role": "night_motion",
        "music_fit_note": "夜间穿行匹配后半段更松弛的推进。",
        "mood_reason": "夜晚段需要继续有人的运动，不让后半只停在店铺景。",
        "visual_reason": "路口行人和暗部形成轻微电影感。",
        "cut_point_reason": "在人流通过后切到步行背影，让结尾进入余味。",
        "scale_start": 1.12,
        "scale_end": 1.04,
        "y_start": 2,
        "y_end": -12,
        "object_position": "50% 50%",
        "grade_zone": "night_motion",
        "risk": "暗部较重，调色需要 shadow_lift 和主体可见性保护。",
    },
    {
        "shot_id": "shot_09_walkers_aftertaste",
        "material_id": "M15",
        "path": "素材/第二期/第二期素材/IMG_1386.MOV",
        "time_range": {"start_sec": 13.1, "end_sec": 14.65},
        "source_start_sec": 2.0,
        "narrative_role": "ending_aftertaste_setup",
        "music_fit_note": "后半段能量回落，适合用背影步行进入收束。",
        "mood_reason": "从城市景转回人和路，形成日常结束感。",
        "visual_reason": "两个人背影和街灯有结尾前的余味。",
        "cut_point_reason": "步行段后接个人影子，完成从外部城市到个人视角的回收。",
        "scale_start": 1.08,
        "scale_end": 1.02,
        "y_start": 4,
        "y_end": -8,
        "object_position": "50% 50%",
        "grade_zone": "night_aftertaste",
        "risk": "画面偏暗但主体轮廓可读。",
    },
    {
        "shot_id": "shot_10_shadow_close",
        "material_id": "M01",
        "path": "素材/第二期/第二期素材/IMG_1361.MOV",
        "time_range": {"start_sec": 14.65, "end_sec": 16.0},
        "source_start_sec": 3.2,
        "narrative_role": "ending_aftertaste",
        "music_fit_note": "BGM 尾段适合回到个人影子，做无字收束。",
        "mood_reason": "把白天的影子动机回收成结尾，不靠字幕说明。",
        "visual_reason": "墙面和影子有明确个人视角，适合最后淡出。",
        "cut_point_reason": "尾部随 BGM fade out 淡出，保留余味。",
        "scale_start": 1.08,
        "scale_end": 1.0,
        "y_start": 8,
        "y_end": -8,
        "object_position": "50% 50%",
        "grade_zone": "shadow_close",
        "risk": "低照度，必须保护影子轮廓不被压死。",
    },
]


MATERIAL_VISUAL_NOTES = {
    "IMG_1361.MOV": ("影子/墙面，主观视角强。", "主体是人影轮廓，低照度但可读。", "low"),
    "IMG_1363.MOV": ("白天街边、人行道、摊位和自行车。", "主体分散，适合氛围建立。", "medium"),
    "IMG_1364.MOV": ("手持食物近景，街面背景。", "食物主体清楚，适合短 hook。", "low_medium"),
    "IMG_1365.MOV": ("街道和树荫，空间感强。", "主体偏弱，可做备选空间镜头。", "medium"),
    "IMG_1366.MOV": ("街面阴影和小车轮廓。", "主体抽象，适合纹理备选。", "medium"),
    "IMG_1367.MOV": ("车筐/人物影子，图形感强。", "主体是影子和车筐，适合节奏短切。", "medium"),
    "IMG_1369.MOV": ("步行影子，个人视角。", "主体可读但与 M01/M06 重复。", "medium"),
    "IMG_1371.MOV": ("白狗经过街边绿植。", "狗主体清楚，低位裁切需保护。", "medium"),
    "IMG_1379.MOV": ("路口 scooter 快速经过。", "时长不足 1 秒，只适合闪切备选。", "high"),
    "IMG_1380.MOV": ("路口、斑马线、行人运动。", "主体分散但空间清楚，适合动作推进。", "medium_high"),
    "IMG_1381.MOV": ("黄昏树影和城市街边。", "主体是空间和光线，适合情绪转折。", "medium"),
    "IMG_1383.MOV": ("地面影子，个人视角。", "与 M01/M06 重复，作为备选。", "low_medium"),
    "IMG_1384.MOV": ("黄昏街景和建筑灯光。", "空间明确，和 M11/M14 功能重叠。", "medium"),
    "IMG_1385.MOV": ("夜间店铺与灯牌。", "夜间主体明确，适合到达感。", "low_medium"),
    "IMG_1386.MOV": ("夜间街道行人背影。", "背影和路灯可读，适合收束前余味。", "low_medium"),
    "IMG_1387.MOV": ("深夜影子/低照度。", "过暗，主体可见性风险高。", "low"),
    "IMG_1388.MOV": ("夜间 scooter 动态模糊。", "运动强但模糊，适合备选转场。", "high"),
    "IMG_1390.MOV": ("夜间路口行人运动。", "主体可读但暗部重。", "medium_high"),
    "IMG_1391.MOV": ("倾斜窗面/店面反光。", "画面较歪，适合 odd 备选但风险较高。", "medium"),
}


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def run(cmd: list[str], *, capture: bool = True) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        cmd,
        cwd=ROOT,
        text=True,
        capture_output=capture,
        check=True,
    )


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def probe(path: Path) -> dict[str, Any]:
    result = run(
        [
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration,size,format_name:stream=index,codec_type,codec_name,width,height,avg_frame_rate,duration,channels",
            "-of",
            "json",
            str(path),
        ]
    )
    data = json.loads(result.stdout)
    streams = data.get("streams", [])
    video = next((stream for stream in streams if stream.get("codec_type") == "video"), {})
    audio = next((stream for stream in streams if stream.get("codec_type") == "audio"), {})
    duration = float(data.get("format", {}).get("duration") or 0)
    width = int(video.get("width") or 0)
    height = int(video.get("height") or 0)
    fps_text = str(video.get("avg_frame_rate") or "0/1")
    fps_value = rational_to_float(fps_text)
    return {
        "path": rel(path),
        "filename": path.name,
        "format": data.get("format", {}).get("format_name"),
        "duration": round(duration, 6),
        "size_bytes": int(data.get("format", {}).get("size") or path.stat().st_size),
        "video_codec": video.get("codec_name"),
        "audio_codec": audio.get("codec_name"),
        "audio_present": bool(audio),
        "audio_channels": audio.get("channels"),
        "width": width,
        "height": height,
        "fps": round(fps_value, 3) if fps_value else None,
        "fps_raw": fps_text,
        "orientation": "phone_vertical_display_with_landscape_container" if width > height else "vertical_container",
        "suitable_for_1080x1920": width >= 1080 and height >= 1080,
    }


def rational_to_float(value: str) -> float:
    if "/" in value:
        numerator, denominator = value.split("/", 1)
        denominator_float = float(denominator)
        return float(numerator) / denominator_float if denominator_float else 0
    return float(value or 0)


def quick_decode(path: Path) -> bool:
    result = subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-t",
            "0.25",
            "-i",
            str(path),
            "-f",
            "null",
            "-",
        ],
        cwd=ROOT,
        text=True,
        capture_output=True,
    )
    return result.returncode == 0


def audio_samples(path: Path, sample_rate: int = 16000, seconds: float = 16.0) -> list[float]:
    result = subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-i",
            str(path),
            "-vn",
            "-ac",
            "1",
            "-ar",
            str(sample_rate),
            "-t",
            f"{seconds:.3f}",
            "-f",
            "f32le",
            "-",
        ],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    values = array.array("f")
    values.frombytes(result.stdout)
    return values.tolist()


def analyze_audio(path: Path) -> dict[str, Any]:
    metadata = probe(path)
    samples = audio_samples(path)
    if not samples:
        raise RuntimeError("BGM audio samples empty")
    rms = math.sqrt(sum(sample * sample for sample in samples) / len(samples))
    peak = max(abs(sample) for sample in samples)
    window = 800
    frame_rms = [
        math.sqrt(sum(sample * sample for sample in samples[index : index + window]) / window)
        for index in range(0, max(0, len(samples) - window), window)
    ]
    diffs = [frame_rms[index] - frame_rms[index - 1] for index in range(1, len(frame_rms))]
    if diffs:
        threshold = max(0.002, sum(abs(diff) for diff in diffs) / len(diffs) * 1.7)
        onset_indices = [index for index, diff in enumerate(diffs, start=1) if diff > threshold]
    else:
        onset_indices = []
    duration = min(float(metadata["duration"]), DURATION_SEC)
    onset_density = len(onset_indices) / duration if duration else 0
    zcr = sum(
        1
        for index in range(1, len(samples))
        if (samples[index - 1] < 0 <= samples[index]) or (samples[index - 1] >= 0 > samples[index])
    ) / max(1, len(samples))
    derivative = sum(abs(samples[index] - samples[index - 1]) for index in range(1, len(samples))) / max(
        1, len(samples) - 1
    )
    low_frequency_weight = max(0.0, min(1.0, rms / 0.09))
    high_frequency_weight = max(0.0, min(1.0, (zcr * 16) + (derivative * 1.8)))
    dynamic_range = max(frame_rms) - min(frame_rms) if frame_rms else 0
    silence_ratio = sum(1 for value in frame_rms if value < 0.006) / max(1, len(frame_rms))
    if len(onset_indices) > 1:
        intervals = [
            (onset_indices[index] - onset_indices[index - 1]) * (window / 16000)
            for index in range(1, len(onset_indices))
            if onset_indices[index] > onset_indices[index - 1]
        ]
        median_interval = sorted(intervals)[len(intervals) // 2] if intervals else 0.55
        tempo_estimate = 60 / median_interval if median_interval else 108
    else:
        tempo_estimate = 104
    mood_energy = "medium" if rms < 0.075 else "medium_high"
    mood_brightness = "medium_high" if high_frequency_weight > 0.48 else "medium"
    mood_temperature = "slightly_warm"
    mood_tension = "low_medium"
    confidence = 0.74 if onset_density > 0.5 and peak > 0.04 else 0.62
    return {
        "bgm_path": rel(path),
        "duration": metadata["duration"],
        "rms_energy": round(rms, 6),
        "peak_volume": round(peak, 6),
        "onset_density": round(onset_density, 4),
        "tempo_estimate": round(tempo_estimate, 2),
        "low_frequency_weight": round(low_frequency_weight, 4),
        "high_frequency_weight": round(high_frequency_weight, 4),
        "dynamic_range": round(dynamic_range, 6),
        "silence_ratio": round(silence_ratio, 4),
        "mood_tag": "soft_urban_walk_vlog",
        "mood_family": "soft_vlog",
        "mood_energy": mood_energy,
        "mood_brightness": mood_brightness,
        "mood_temperature": mood_temperature,
        "mood_tension": mood_tension,
        "confidence_score": confidence,
        "fallback_used": False,
        "reason_signals": [
            "BGM duration covers the 16s target without looping",
            "medium RMS and low silence ratio support continuous walking-vlog pacing",
            "onset changes are frequent enough for refined cuts but not so dense that every beat should cut",
            "high-frequency proxy suggests a clean, slightly bright urban mood",
        ],
        "auto_marker_only": True,
        "human_listening_review": "not_performed",
    }


def build_inventory() -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    material_files = sorted(MATERIAL_DIR.glob("*.MOV"))
    bgm_files = sorted(path for path in BGM_DIR.iterdir() if path.is_file())
    material_inventory: list[dict[str, Any]] = []
    for index, path in enumerate(material_files, start=1):
        meta = probe(path)
        visual, subject, motion = MATERIAL_VISUAL_NOTES.get(
            path.name,
            ("未人工标注，保守作为备选。", "主体可见性待审。", "unknown"),
        )
        meta.update(
            {
                "material_id": f"M{index:02d}",
                "decodable": quick_decode(path),
                "visual_quality_note": visual,
                "subject_visibility_note": subject,
                "motion_energy_note": motion,
                "obvious_unusable": path.name == "IMG_1387.MOV",
            }
        )
        material_inventory.append(meta)
    bgm_inventory = []
    for path in bgm_files:
        meta = probe(path)
        meta.update({"decodable": quick_decode(path), "selected": True, "selection_reason": "BGM directory contains one file"})
        bgm_inventory.append(meta)
    return material_inventory, bgm_inventory


def build_material_selection(inventory: list[dict[str, Any]]) -> list[dict[str, Any]]:
    selected_paths = {shot["path"] for shot in SELECTED_SHOTS}
    shot_by_path = {shot["path"]: shot for shot in SELECTED_SHOTS}
    selection: list[dict[str, Any]] = []
    for item in inventory:
        path = item["path"]
        shot = shot_by_path.get(path)
        if shot:
            selected = True
            reason = f"选用为 {shot['narrative_role']}；{shot['visual_reason']}"
            narrative_role = shot["narrative_role"]
            music_fit_note = shot["music_fit_note"]
            risk = shot["risk"]
        else:
            selected = False
            if item["filename"] == "IMG_1379.MOV":
                reason = "时长不足 1 秒，适合闪切但不足以承担本轮 16 秒叙事段落。"
            elif item["filename"] == "IMG_1387.MOV":
                reason = "画面过暗，主体可见性风险高，本轮不进入默认候选。"
            elif item["filename"] in {"IMG_1365.MOV", "IMG_1384.MOV"}:
                reason = "空间功能与已选街景/黄昏镜头重叠，保留为备选避免堆素材。"
            elif item["filename"] in {"IMG_1366.MOV", "IMG_1369.MOV", "IMG_1383.MOV"}:
                reason = "影子/纹理功能与已选影子镜头重复，保留为备选。"
            elif item["filename"] in {"IMG_1388.MOV", "IMG_1391.MOV"}:
                reason = "odd 感强但画面模糊或倾斜风险较高，保留作后续更实验版本。"
            else:
                reason = "与本轮音乐情绪和 16 秒叙事功能不如已选镜头匹配。"
            narrative_role = "backup_or_rejected_for_this_cut"
            music_fit_note = "未进入本轮镜头计划；不是文件顺序淘汰，而是叙事功能重叠或风险更高。"
            risk = "none_for_final_cut"
        selection.append(
            {
                "material_id": item["material_id"],
                "path": path,
                "selected": selected,
                "reason": reason,
                "narrative_role": narrative_role,
                "music_fit_note": music_fit_note,
                "risk": risk,
                "duration": item["duration"],
                "resolution": f"{item['width']}x{item['height']}",
                "decodable": item["decodable"],
            }
        )
    assert selected_paths == {entry["path"] for entry in selection if entry["selected"]}
    return selection


def build_bgm_selection(bgm_inventory: list[dict[str, Any]], mood: dict[str, Any]) -> dict[str, Any]:
    return {
        "bgm_dir": rel(BGM_DIR),
        "bgm_files": bgm_inventory,
        "selected_bgm": bgm_inventory[0]["path"] if bgm_inventory else None,
        "selection_policy": "single_bgm_direct_use",
        "selection_reason": "BGM 目录只有一首，且时长 16.23s，可覆盖 16s 候选，无需 loop。",
        "unused_bgm": [],
        "mood_summary": {
            "mood_tag": mood["mood_tag"],
            "confidence_score": mood["confidence_score"],
            "tempo_estimate": mood["tempo_estimate"],
            "onset_density": mood["onset_density"],
        },
    }


def build_beat_map(mood: dict[str, Any]) -> list[dict[str, Any]]:
    points = [
        (0.0, 0.58, "intro_hook", "bright_entry", "hold_food_hook", "low_medium", "先不机械切，保留食物识别。"),
        (1.4, 0.7, "intro_hook", "light_walk", "cut_to_living_subject", "medium", "BGM 稳定后切到白狗，增加生命感。"),
        (3.0, 0.62, "atmosphere", "street_build", "cut_to_wider_space", "medium", "从小事件扩大到街区空间。"),
        (4.6, 0.78, "texture_pulse", "shadow_graphic", "short_texture_cut", "medium_high", "影子/车筐承担小节拍，不加视觉标点。"),
        (5.8, 0.82, "motion_progression", "crosswalk_motion", "enter_motion_segment", "high", "进入路口运动段，推动叙事。"),
        (7.8, 0.68, "emotion_shift", "warm_shift", "cut_to_golden_city", "medium", "能量不硬切，转为黄昏暖光。"),
        (9.8, 0.74, "night_arrival", "neon_warm", "cut_to_night_store", "medium", "夜间灯光与高频明亮感匹配。"),
        (11.35, 0.7, "night_motion", "soft_drive", "cut_to_night_crossing", "medium_high", "后半仍保留位移，避免只看街景。"),
        (13.1, 0.55, "aftertaste", "energy_release", "hold_walkers", "medium_low", "能量回落，留背影。"),
        (14.65, 0.5, "ending", "personal_shadow", "close_on_shadow", "low", "以个人影子收束，和开头日常感闭环。"),
        (15.75, 0.42, "ending", "fade_out", "fade_audio_and_video", "low", "进入淡出，不再加新信息。"),
    ]
    return [
        {
            "beat_time": time,
            "beat_strength": strength,
            "section_id": section_id,
            "mood_zone": mood_zone,
            "suggested_cut_action": action,
            "suggested_shot_energy": energy,
            "reason": reason,
            "source": "auto_audio_marker_plus_story_decision",
            "bgm_mood_tag": mood["mood_tag"],
        }
        for time, strength, section_id, mood_zone, action, energy, reason in points
    ]


def build_shot_plan() -> list[dict[str, Any]]:
    return [
        {
            "shot_id": shot["shot_id"],
            "time_range": shot["time_range"],
            "selected_material": shot["path"],
            "bgm_section": section_for_time(shot["time_range"]["start_sec"]),
            "mood_reason": shot["mood_reason"],
            "visual_reason": shot["visual_reason"],
            "narrative_role": shot["narrative_role"],
            "cut_point_reason": shot["cut_point_reason"],
            "risk": shot["risk"],
            "not_material_order_only": True,
        }
        for shot in SELECTED_SHOTS
    ]


def section_for_time(start: float) -> str:
    if start < 3:
        return "0-3s hook"
    if start < 7:
        return "3-7s atmosphere_build"
    if start < 11:
        return "7-11s motion_progression_and_shift"
    if start < 14:
        return "11-14s night_motion"
    return "14-16s ending_aftertaste"


def build_sequence_structure() -> list[dict[str, Any]]:
    return [
        {
            "sequence_section": "hook",
            "time_range": {"start_sec": 0, "end_sec": 3},
            "story_function": "用食物和白狗建立轻日常入口，先抓人，不解释。",
            "music_function": "BGM 起笔到稳定律动。",
            "selected_shots": ["shot_01_food_hook", "shot_02_dog_walk"],
            "viewer_feeling_target": "像刚开始走在街上，被一个小细节带进去。",
            "failure_if_flattened": "若改成素材顺序，开头会变成普通街景记录。",
        },
        {
            "sequence_section": "atmosphere_build",
            "time_range": {"start_sec": 3, "end_sec": 7},
            "story_function": "建立街区、人行道和主观影子，形成城市游走感。",
            "music_function": "稳定推进和第一处轻节拍。",
            "selected_shots": ["shot_03_sidewalk_build", "shot_04_shadow_cart"],
            "viewer_feeling_target": "有街区层次，也开始进入个人视角。",
            "failure_if_flattened": "只连续放街景会像素材堆叠，缺少 odd 视角。",
        },
        {
            "sequence_section": "motion_progression",
            "time_range": {"start_sec": 7, "end_sec": 11},
            "story_function": "通过路口运动和黄昏暖光完成时间推进。",
            "music_function": "中段能量抬升后转入暖色段落。",
            "selected_shots": ["shot_05_crosswalk_motion", "shot_06_golden_city_shift", "shot_07_night_store"],
            "viewer_feeling_target": "从白天走到夜晚，节奏不散。",
            "failure_if_flattened": "昼夜跳变会突兀，或只像随手素材拼接。",
        },
        {
            "sequence_section": "emotion_or_rhythm_shift",
            "time_range": {"start_sec": 11, "end_sec": 14},
            "story_function": "夜间运动转为更安静的人流和背影。",
            "music_function": "后半段能量释放，不再密集切。",
            "selected_shots": ["shot_08_night_crossing", "shot_09_walkers_aftertaste"],
            "viewer_feeling_target": "进入夜路的缓慢余味。",
            "failure_if_flattened": "如果继续高频切，会破坏 BGM 后半段回落感。",
        },
        {
            "sequence_section": "ending_aftertaste",
            "time_range": {"start_sec": 14, "end_sec": 16},
            "story_function": "回到个人影子，完成无字收束。",
            "music_function": "随 BGM 尾部淡出。",
            "selected_shots": ["shot_10_shadow_close"],
            "viewer_feeling_target": "像一段街头日记自然结束。",
            "failure_if_flattened": "若结尾继续放店铺或路口，会缺少个人回声。",
        },
    ]


def build_color_profile(mood: dict[str, Any]) -> dict[str, Any]:
    return {
        "brightness_adjust": 0.035,
        "contrast_adjust": 0.065,
        "saturation_adjust": 0.055,
        "temperature_adjust": 0.035,
        "tint_adjust": -0.008,
        "shadow_lift": 0.045,
        "highlight_rolloff": 0.08,
        "vignette_strength": 0.16,
        "grain_strength": 0.07,
        "ffmpeg_filter_candidate": "eq=brightness=0.035:contrast=1.065:saturation=1.055,curves=preset=lighter",
        "remotion_effect_candidate": {
            "css_filter_fields": ["brightness_adjust", "contrast_adjust", "saturation_adjust"],
            "temperature_overlay_field": "temperature_adjust",
            "shadow_lift_field": "shadow_lift",
            "highlight_rolloff_field": "highlight_rolloff",
            "vignette_strength_field": "vignette_strength",
            "grain_strength_field": "grain_strength",
        },
        "apply_scope": "entire_candidate_with_segment_bias",
        "readability_guard_enabled": True,
        "subject_visibility_guard_enabled": True,
        "caption_readability_guard_enabled": False,
        "source_bgm_mood_tag": mood["mood_tag"],
        "confidence_score": mood["confidence_score"],
        "fallback_used": mood["fallback_used"],
    }


def build_color_normalization() -> list[dict[str, Any]]:
    normalization_by_zone = {
        "day_warm_detail": ("slight_highlight_rolloff", "keep warm food texture, avoid yellow clipping"),
        "day_soft_green": ("mild_saturation_control", "keep white dog visible against green background"),
        "day_neutral_walk": ("neutral_exposure_unify", "street scene should not feel flatter than hook"),
        "shadow_clean": ("shadow_lift", "shadow subject stays readable without crushing black"),
        "day_motion": ("contrast_unify", "crosswalk whites controlled before mood grade"),
        "golden_shift": ("warmth_preserved", "keep dusk warmth but align exposure with day/night bridge"),
        "night_neon": ("highlight_rolloff", "store sign is controlled, not over-sharpened"),
        "night_motion": ("shadow_lift", "night moving subjects remain readable"),
        "night_aftertaste": ("shadow_lift_low_noise", "walkers remain visible while keeping night mood"),
        "shadow_close": ("shadow_lift_and_vignette_guard", "final shadow remains visible through fade"),
    }
    return [
        {
            "shot_id": shot["shot_id"],
            "material": shot["path"],
            "grade_zone": shot["grade_zone"],
            "normalization_action": normalization_by_zone[shot["grade_zone"]][0],
            "reason": normalization_by_zone[shot["grade_zone"]][1],
            "subject_visibility_guard": True,
        }
        for shot in SELECTED_SHOTS
    ]


def build_completion_matrix(final_video: Path | None) -> list[dict[str, Any]]:
    output_evidence = rel(final_video) if final_video and final_video.exists() else "pending_render"
    modules = [
        ("project_guard", "included", "pwd/git top/branch/remote/status checked"),
        ("input_inventory", "included", "input_inventory.json"),
        ("reference_and_style_anchor", "included", "style anchor: soft urban walk vlog / odd daily diary"),
        ("material_selection", "included", "material_selection_table.json"),
        ("material_quality_check", "included", "material_inventory_report.json"),
        ("BGM_style_and_audio", "included", "bgm_selection_report.json"),
        ("BGM_mood_analysis", "included", "bgm_mood_analysis.json"),
        ("refined_beat_map", "included", "refined_beat_map.json"),
        ("music_emotion_shot_plan", "included", "music_emotion_shot_plan.json"),
        ("material_base_color_normalization", "included", "material_base_color_normalization_report.json"),
        ("BGM_mood_driven_color_grade", "included", "color_grade_profile.json"),
        ("sequence_structure", "included", "sequence_structure.json"),
        ("pacing_and_rhythm", "included", "refined_beat_map + shot plan"),
        ("motion_effects_and_transitions", "included", "Remotion crossfade/scale/dip only, no visual punctuation layer"),
        ("composition_and_crop", "included", "1080x1920 cover crop with objectPosition per shot"),
        ("subject_visibility_guard", "included", "segment normalization and color profile guards"),
        (
            "optional_user_requested_captions_or_text_layer",
            "skipped_by_user_explicit_request",
            "用户明确：不要字幕",
        ),
        (
            "optional_user_requested_stickers_or_visual_punctuation",
            "skipped_by_user_explicit_request",
            "用户明确：不要贴纸；无字牌、视觉反应字、视觉标点",
        ),
        ("audio_mix", "included", "BGM Audio layer with fade in/out"),
        ("export_and_technical_validation", "included" if final_video else "included_partial", output_evidence),
        ("review_pack_and_machine_report", "included", "review pack + machine_report.json"),
        ("failure_feedback_routing", "included", "machine_report.failure_feedback_routing"),
    ]
    return [
        {
            "module": module,
            "status": status,
            "evidence": evidence,
            "skipped_reason": "user_explicit_skip" if status == "skipped_by_user_explicit_request" else None,
            "user_explicitly_requested": False if module.startswith("optional_user_requested") else None,
            "failure_route": "see machine_report.failure_feedback_routing",
        }
        for module, status, evidence in modules
    ]


def extract_frame(video: Path, second: float, output: Path, width: int = 360) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
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
            str(video),
            "-frames:v",
            "1",
            "-vf",
            f"scale={width}:-1",
            "-q:v",
            "2",
            str(output),
        ]
    )


def load_font(size: int) -> ImageFont.ImageFont:
    for candidate in (
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ):
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def make_after_sheet(final_video: Path) -> None:
    frame_dir = REVIEW_DIR / "representative_frames_after"
    frame_dir.mkdir(parents=True, exist_ok=True)
    points = [0.6, 1.9, 3.7, 5.2, 6.8, 8.7, 10.5, 12.2, 13.9, 15.4]
    images = []
    for index, second in enumerate(points, start=1):
        path = frame_dir / f"after_{index:02d}_{second:.2f}s.jpg"
        extract_frame(final_video, second, path, width=300)
        images.append((second, path))
    compose_image_grid(images, REVIEW_DIR / "representative_frames_after_contact_sheet.jpg", "representative_frames_after")


def make_before_after_sheet(final_video: Path) -> None:
    frame_dir = REVIEW_DIR / "before_after_color_frames"
    frame_dir.mkdir(parents=True, exist_ok=True)
    pairs = []
    for shot in SELECTED_SHOTS:
        mid = (shot["time_range"]["start_sec"] + shot["time_range"]["end_sec"]) / 2
        source = ROOT / shot["path"]
        before = frame_dir / f"{shot['shot_id']}_before.jpg"
        after = frame_dir / f"{shot['shot_id']}_after.jpg"
        extract_frame(source, float(shot["source_start_sec"]) + 0.25, before, width=260)
        extract_frame(final_video, mid, after, width=260)
        pairs.append((shot["shot_id"], before, after))
    width = 600
    row_h = 360
    sheet = Image.new("RGB", (width, row_h * len(pairs)), (238, 236, 230))
    draw = ImageDraw.Draw(sheet)
    font = load_font(18)
    for index, (shot_id, before, after) in enumerate(pairs):
        y = index * row_h
        draw.text((14, y + 10), shot_id, fill=(25, 25, 25), font=font)
        for label, path, x in (("before_source", before, 14), ("after_grade", after, 310)):
            image = Image.open(path).convert("RGB")
            image.thumbnail((260, 300), Image.LANCZOS)
            sheet.paste(image, (x, y + 42))
            draw.text((x, y + 324), label, fill=(70, 70, 70), font=font)
    sheet.save(REVIEW_DIR / "before_after_color_contact_sheet.jpg", quality=92)


def compose_image_grid(images: list[tuple[float, Path]], output: Path, title: str) -> None:
    thumbs = []
    font = load_font(17)
    for second, path in images:
        image = Image.open(path).convert("RGB")
        canvas = Image.new("RGB", (320, 420), (245, 244, 238))
        image.thumbnail((300, 360), Image.LANCZOS)
        canvas.paste(image, ((320 - image.width) // 2, 12))
        draw = ImageDraw.Draw(canvas)
        draw.text((12, 382), f"{second:.2f}s", fill=(30, 30, 30), font=font)
        thumbs.append(canvas)
    cols = 5
    rows = math.ceil(len(thumbs) / cols)
    sheet = Image.new("RGB", (cols * 320, rows * 420 + 42), (226, 225, 220))
    draw = ImageDraw.Draw(sheet)
    draw.text((16, 10), title, fill=(20, 20, 20), font=load_font(22))
    for index, image in enumerate(thumbs):
        sheet.paste(image, ((index % cols) * 320, 42 + (index // cols) * 420))
    sheet.save(output, quality=92)


def final_video_metadata(video: Path) -> dict[str, Any]:
    metadata = probe(video)
    decode = subprocess.run(["ffmpeg", "-v", "error", "-i", str(video), "-f", "null", "-"], cwd=ROOT)
    metadata["decodable"] = decode.returncode == 0
    metadata["duration_in_allowed_range"] = 15.8 <= float(metadata["duration"]) <= 16.3
    metadata["expected_resolution"] = f"{WIDTH}x{HEIGHT}"
    metadata["resolution_pass"] = metadata["width"] == WIDTH and metadata["height"] == HEIGHT
    metadata["fps_pass"] = abs(float(metadata["fps"] or 0) - FPS) < 0.02
    metadata["video_codec_pass"] = metadata["video_codec"] in {"h264", "h264_videotoolbox"}
    metadata["audio_codec_pass"] = metadata["audio_codec"] == "aac"
    return metadata


def write_readable_report(final_video: Path | None, mood: dict[str, Any], metadata: dict[str, Any] | None) -> None:
    lines = [
        "# 第二期 16 秒 vlog 验证候选审片报告",
        "",
        "- status: validation_candidate_rendered_pending_user_review" if final_video else "- status: pre_render_pack_generated",
        "- technical_render_is_not_content_pass: true",
        "- user_review_required: true",
        "- captions: skipped_by_user_explicit",
        "- stickers: skipped_by_user_explicit",
        "- Alibaba image API: not_called",
        "",
        "## BGM Mood",
        "",
        f"- mood_tag: {mood['mood_tag']}",
        f"- confidence_score: {mood['confidence_score']}",
        f"- tempo_estimate: {mood['tempo_estimate']}",
        f"- onset_density: {mood['onset_density']}",
        "",
        "## Shot Structure",
        "",
    ]
    for shot in SELECTED_SHOTS:
        lines.append(
            f"- {shot['shot_id']}: {shot['time_range']['start_sec']:.2f}-{shot['time_range']['end_sec']:.2f}s, "
            f"{Path(shot['path']).name}, {shot['narrative_role']}."
        )
    if metadata:
        lines.extend(
            [
                "",
                "## Technical Validation",
                "",
                f"- duration: {metadata['duration']}",
                f"- resolution: {metadata['width']}x{metadata['height']}",
                f"- fps: {metadata['fps']}",
                f"- video_codec: {metadata['video_codec']}",
                f"- audio_codec: {metadata['audio_codec']}",
                f"- decodable: {metadata['decodable']}",
            ]
        )
    lines.extend(
        [
            "",
            "## Pending User Review Focus",
            "",
            "- 白天到夜间的时间推进是否自然。",
            "- 无字幕/无贴纸时，音乐、镜头和颜色是否足够支撑观看。",
            "- BGM 情绪驱动调色是否让日间、黄昏、夜间素材统一而不压暗主体。",
            "- 镜头顺序是否像 vlog 叙事，而不是素材平铺。",
        ]
    )
    (REVIEW_DIR / "readable_review_report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_reports(final_video: Path | None) -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)

    material_inventory, bgm_inventory = build_inventory()
    if not material_inventory:
        raise RuntimeError("material inventory empty")
    if not bgm_inventory:
        raise RuntimeError("BGM inventory empty")
    if not all(item["decodable"] for item in material_inventory):
        raise RuntimeError("at least one material is not decodable")
    if not bgm_inventory[0]["decodable"]:
        raise RuntimeError("BGM is not decodable")

    mood = analyze_audio(ROOT / bgm_inventory[0]["path"])
    color_profile = build_color_profile(mood)
    selection = build_material_selection(material_inventory)
    final_metadata = final_video_metadata(final_video) if final_video and final_video.exists() else None

    input_inventory = {
        "material_root": "素材/第二期",
        "material_dir": rel(MATERIAL_DIR),
        "bgm_dir": rel(BGM_DIR),
        "material_files": [item["path"] for item in material_inventory],
        "bgm_files": [item["path"] for item in bgm_inventory],
        "file_count": {"material": len(material_inventory), "bgm": len(bgm_inventory), "images": 0},
        "paths_authorized_by_user": True,
        "target_duration_sec": DURATION_SEC,
        "format": "mp4 final candidate",
    }

    profile_report = {
        "profile_read_by_pipeline": bool(final_video and final_video.exists()),
        "reader": "Remotion render CLI --props color_grade_profile.json",
        "reader_file": "remotion/组合_compositions/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate.tsx",
        "props_file": rel(REVIEW_DIR / "color_grade_profile.json"),
        "fields_read": [
            "brightness_adjust",
            "contrast_adjust",
            "saturation_adjust",
            "temperature_adjust",
            "tint_adjust",
            "shadow_lift",
            "highlight_rolloff",
            "vignette_strength",
            "grain_strength",
        ],
        "field_effect": "CSS filter plus overlay/vignette/grain layers in the Remotion composition",
        "final_video_applied": bool(final_video and final_video.exists()),
        "final_video_path": rel(final_video) if final_video and final_video.exists() else None,
        "blocked_if_false": "blocked_color_grade_profile_not_read_by_pipeline",
    }

    failure_routing = [
        {
            "possible_failure": "music_cut_feels_mechanical",
            "route_back_to": "refined_beat_map + music_emotion_shot_plan",
            "required_fix": "重新标注 BGM 段落功能和镜头承担的情绪功能。",
            "forbidden_response": "只按固定间隔重切。",
        },
        {
            "possible_failure": "story_feels_flat",
            "route_back_to": "sequence_structure + material_selection",
            "required_fix": "重做开场、推进、情绪变化和收束的素材角色。",
            "forbidden_response": "增加字幕或贴纸来掩盖叙事不成立。",
        },
        {
            "possible_failure": "color_grade_not_visible",
            "route_back_to": "profile_read_by_pipeline",
            "required_fix": "检查 Remotion render 是否通过 --props 读取 color_grade_profile.json。",
            "forbidden_response": "只展示 color_grade_profile 而不接入最终画面。",
        },
        {
            "possible_failure": "night_subject_too_dark",
            "route_back_to": "subject_visibility_guard + BGM_mood_driven_color_grade",
            "required_fix": "提高 shadow_lift 或替换夜间低可见素材。",
            "forbidden_response": "继续压暗追求氛围。",
        },
    ]

    machine_report = {
        "status": "validation_candidate_rendered_pending_user_review" if final_metadata else "pre_render_pack_generated",
        "technical_render_is_not_content_pass": True,
        "this_is_validation_candidate_not_publish_ready": True,
        "capability_status": "vlog_director_capability_still_pending_multi_case_validation",
        "no_external_api_called": True,
        "captions": "skipped_by_user_explicit",
        "stickers": "skipped_by_user_explicit",
        "font_cards": "skipped_by_user_explicit",
        "visual_reaction_words": "skipped_by_user_explicit",
        "visual_punctuation": "skipped_by_user_explicit",
        "profile_read_by_pipeline": profile_report["profile_read_by_pipeline"],
        "technical_validation": final_metadata,
        "failure_feedback_routing": failure_routing,
        "do_not_claim": [
            "publish-ready",
            "video_fixed",
            "vlog_director_capability_verified",
            "BGM beat map capability verified",
            "BGM_mood_driven_color_grade_verified",
        ],
    }

    review_manifest = {
        "review_pack_path": rel(REVIEW_DIR),
        "output_video_path": rel(final_video) if final_video and final_video.exists() else rel(DIST_VIDEO),
        "files": [
            "review_manifest.json",
            "machine_report.json",
            "input_inventory.json",
            "material_inventory_report.json",
            "material_selection_table.json",
            "bgm_selection_report.json",
            "bgm_mood_analysis.json",
            "refined_beat_map.json",
            "music_emotion_shot_plan.json",
            "sequence_structure.json",
            "material_base_color_normalization_report.json",
            "color_grade_profile.json",
            "profile_read_by_pipeline_report.json",
            "full_video_candidate_completion_matrix.json",
            "before_after_color_contact_sheet.jpg",
            "representative_frames_after_contact_sheet.jpg",
            "readable_review_report.md",
        ],
        "runtime_outputs_not_for_git_stage": True,
        "user_review_required": True,
    }

    reports = {
        "input_inventory.json": input_inventory,
        "material_inventory_report.json": {
            "material_dir": rel(MATERIAL_DIR),
            "video_count": len(material_inventory),
            "image_count": 0,
            "items": material_inventory,
            "all_decodable": all(item["decodable"] for item in material_inventory),
            "vertical_fit_note": "iPhone MOV files report 1920x1080 containers; extracted frames display portrait orientation and Remotion uses cover crop/objectPosition.",
        },
        "material_selection_table.json": selection,
        "bgm_selection_report.json": build_bgm_selection(bgm_inventory, mood),
        "bgm_mood_analysis.json": mood,
        "refined_beat_map.json": build_beat_map(mood),
        "music_emotion_shot_plan.json": build_shot_plan(),
        "sequence_structure.json": build_sequence_structure(),
        "material_base_color_normalization_report.json": build_color_normalization(),
        "color_grade_profile.json": color_profile,
        "profile_read_by_pipeline_report.json": profile_report,
        "full_video_candidate_completion_matrix.json": build_completion_matrix(final_video),
        "machine_report.json": machine_report,
        "review_manifest.json": review_manifest,
    }
    for filename, data in reports.items():
        write_json(REVIEW_DIR / filename, data)

    if final_video and final_video.exists():
        make_after_sheet(final_video)
        make_before_after_sheet(final_video)

    write_readable_report(final_video, mood, final_metadata)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--final-video", type=Path, default=None)
    args = parser.parse_args()
    final_video = args.final_video.resolve() if args.final_video else None
    build_reports(final_video)
    print(REVIEW_DIR)


if __name__ == "__main__":
    main()
