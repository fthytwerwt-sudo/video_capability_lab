#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]

ORIGINAL_VIDEO = (
    ROOT
    / "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4"
)
V1_VIDEO = (
    ROOT
    / "dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4"
)
V2_VIDEO = (
    ROOT
    / "dist/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.mp4"
)

REVIEW_DIR = ROOT / "tmp/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2_review_pack"
FRAMES_DIR = REVIEW_DIR / "frames"
ORIGINAL_SHEET = REVIEW_DIR / "original_candidate_contact_sheet.jpg"
V1_SHEET = REVIEW_DIR / "v1_micro_probe_contact_sheet.jpg"
V2_SHEET = REVIEW_DIR / "v2_fix_contact_sheet.jpg"
COMPARISON_SHEET = REVIEW_DIR / "before_v1_v2_contact_sheet.jpg"
VISUAL_SCORECARD = REVIEW_DIR / "visual_scorecard.json"
FIX_SPEC = REVIEW_DIR / "fix_spec.json"
MANIFEST = REVIEW_DIR / "review_manifest.json"


ORIGINAL_POINTS = [
    {"lane": "original", "id": "original_caption_start", "second": 3.34, "phase": "caption_start", "evidence": "原 18s 大字 caption 开始。"},
    {"lane": "original", "id": "original_contact_mid", "second": 3.78, "phase": "contact_mid", "evidence": "原 contact flash 和目标机械圆孔 / 横杆证据帧。"},
    {"lane": "original", "id": "original_contact_exit", "second": 4.04, "phase": "contact_exit", "evidence": "原 contact flash 退出。"},
    {"lane": "original", "id": "original_texture_exit", "second": 5.70, "phase": "texture_exit", "evidence": "原 M06 金属纹理出口。"},
]

V1_POINTS = [
    {"lane": "v1", "id": "v1_caption_start", "second": 0.26, "phase": "caption_start", "evidence": "v1 顶一下 caption 入场。"},
    {"lane": "v1", "id": "v1_caption_sticker_mid", "second": 0.78, "phase": "contact_mid", "evidence": "v1 pressure burst + tail 最清楚。"},
    {"lane": "v1", "id": "v1_sticker_exit", "second": 1.30, "phase": "contact_exit", "evidence": "v1 pressure burst 退出。"},
    {"lane": "v1", "id": "v1_texture_residual", "second": 2.08, "phase": "texture_exit", "evidence": "v1 M06 residual drag。"},
]

V2_POINTS = [
    {"lane": "v2", "id": "v2_caption_start", "second": 0.44, "phase": "caption_start", "evidence": "v2 咔拟声入场。"},
    {"lane": "v2", "id": "v2_scuff_mid", "second": 0.78, "phase": "contact_mid", "evidence": "v2 pin rub + bar scuff 最清楚。"},
    {"lane": "v2", "id": "v2_scuff_exit", "second": 1.16, "phase": "contact_exit", "evidence": "v2 pin rub 收掉。"},
    {"lane": "v2", "id": "v2_texture_absorb", "second": 2.04, "phase": "texture_exit", "evidence": "v2 M06 absorbed smear。"},
    {"lane": "v2", "id": "v2_end", "second": 2.86, "phase": "end", "evidence": "v2 尾帧，检查是否干净。"},
]


VISUAL_SCORECARD_DATA: dict[str, Any] = {
    "status": "visual_scorecard_completed_pending_user_review",
    "score_scale": "0 unresolved / 1 partial / 2 likely improved pending user review / 3 strong frame evidence",
    "source_mechanism": "59_字幕贴纸视觉回审闭环_caption_sticker_visual_review_loop.md",
    "items": [
        {
            "problem_id": "caption_relation_problem",
            "problem": "字幕像大字口号，不像动作反应。",
            "before_score": 0,
            "v1_score": 1,
            "v2_attempt_score": 2,
            "fix_attempt": "从大字“顶一下”降为小型拟声“咔”，只在接触窗口出现。",
            "evidence_frames": ["v2_caption_start", "v2_scuff_mid"],
            "remaining_review_risk": "拟声是否合适仍需用户审片。",
        },
        {
            "problem_id": "sticker_generic_component_problem",
            "problem": "贴纸像通用组件，不像这一帧专属反应。",
            "before_score": 0,
            "v1_score": 1,
            "v2_attempt_score": 2,
            "fix_attempt": "把 burst 改成沿机器圆孔和横杆边缘出现的 pin rub / bar scuff。",
            "evidence_frames": ["original_contact_mid", "v1_caption_sticker_mid", "v2_scuff_mid"],
            "remaining_review_risk": "若仍像标注，应删除 pin rub，只保留 bar scuff。",
        },
        {
            "problem_id": "anchor_declaration_problem",
            "problem": "锚点只是文档声明，不是真正贴住画面。",
            "before_score": 0,
            "v1_score": 1,
            "v2_attempt_score": 2,
            "fix_attempt": "锚点写为右侧机器立柱圆孔、横杆上边缘、M06 金属线条，并抽对应帧。",
            "evidence_frames": ["original_contact_mid", "v2_scuff_mid", "v2_texture_absorb"],
            "remaining_review_risk": "Remotion 仍需坐标实现，必须靠 contact sheet 回审帧证据。",
        },
        {
            "problem_id": "occlusion_material_problem",
            "problem": "遮挡和材质只是模拟，不够融入画面。",
            "before_score": 0,
            "v1_score": 1,
            "v2_attempt_score": 2,
            "fix_attempt": "降低高亮，使用灰白擦痕、暗边、multiply/soft-light 和机器色遮罩。",
            "evidence_frames": ["v2_scuff_mid", "v2_scuff_exit"],
            "remaining_review_risk": "遮罩是近似绘制，不是像素级 rotoscope。",
        },
        {
            "problem_id": "motion_event_problem",
            "problem": "动效像参数动画，不像动作事件带出来的运动。",
            "before_score": 0,
            "v1_score": 1,
            "v2_attempt_score": 2,
            "fix_attempt": "取消 spring pop，改为 scratch/compress/absorb，跟接触和切镜窗口绑定。",
            "evidence_frames": ["v2_caption_start", "v2_scuff_mid", "v2_texture_absorb"],
            "remaining_review_risk": "没有真实运动追踪，仍是人工事件窗口绑定。",
        },
    ],
    "minimum_pass_for_2_4s_probe": {
        "all_five_problems_present": True,
        "each_v2_attempt_score_minimum": 2,
        "template_fallback": False,
        "copy_risk_check": "passed",
        "user_review_required": True,
    },
}


FIX_SPEC_DATA: dict[str, Any] = {
    "status": "caption_sticker_fix_spec_completed_pending_user_review",
    "shot_id": "caption_sticker_fix_v2_action_contact_3s",
    "source_video_or_candidate": str(ORIGINAL_VIDEO.relative_to(ROOT)),
    "previous_probe_video": str(V1_VIDEO.relative_to(ROOT)),
    "v2_video": str(V2_VIDEO.relative_to(ROOT)),
    "time_range": "3.15-6.15s",
    "frame_evidence": {
        "original_candidate_frames": [record["id"] for record in ORIGINAL_POINTS],
        "previous_probe_frames": [record["id"] for record in V1_POINTS],
        "v2_probe_frames": [record["id"] for record in V2_POINTS],
        "target_anchor_frame": "v2_scuff_mid",
    },
    "caption_fix": {
        "old_caption": "顶一下",
        "new_caption": "咔",
        "text_status": "draft_text_pending_user_review",
        "caption_type": "hand_drawn_reaction_word",
        "why_more_like_action_reaction": "单字拟声只响应机械接触，不再承担段落口号。",
        "anchor_target": "右侧机器立柱圆孔左下缘和横杆上缘之间。",
        "attention_weight": "medium_low",
        "entry_hold_exit": "4 frame scratch-in / 13 frame hold / 7 frame wipe-out",
        "copy_risk_check": "原创拟声字；不复制参考文案、字体或平台 UI。",
    },
    "sticker_fix": {
        "old_sticker": "contact_pressure_burst + caption_tail_tick + texture_residual_drag",
        "new_sticker": "pin_rub_mark + bar_compression_scuff + texture_absorb_smear",
        "sticker_type": "edge/contact scuff visual punctuation",
        "attachment_relation": "contact_point_attached + edge_attached + motion_direction_attached",
        "shape_derived_from_frame_event": "擦痕围绕机器圆孔和横杆边缘，方向跟机械结构线一致。",
        "material_occlusion_strategy": "低饱和灰白/暗边，局部机器色遮罩盖住笔触端点。",
        "motion_bound_to_event": "接触窗口短擦入，动作压力时压缩，切到 M06 前收掉。",
        "fallback_if_still_generic": "删除 pin_rub_mark，仅保留 bar_compression_scuff；不得回退到 burst 模板。",
    },
    "conflict_resolution": "caption 负责拟声，贴纸负责接触擦痕和切镜吸收，不复述同一意思。",
    "template_fallback": False,
    "review_required": True,
}


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(cmd))
    subprocess.run(cmd, cwd=ROOT, check=True)


def probe_json(path: Path) -> dict[str, Any]:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_format", "-show_streams", "-of", "json", str(path)],
        cwd=ROOT,
        check=True,
        text=True,
        capture_output=True,
    )
    return json.loads(result.stdout)


def probe_duration(path: Path) -> float:
    return float(probe_json(path)["format"]["duration"])


def validate_inputs() -> dict[str, float]:
    required = {
        "original": ORIGINAL_VIDEO,
        "v1": V1_VIDEO,
        "v2": V2_VIDEO,
    }
    durations: dict[str, float] = {}
    for label, path in required.items():
        if not path.exists():
            raise FileNotFoundError(path)
        durations[label] = probe_duration(path)
    if not 17.5 <= durations["original"] <= 18.5:
        raise ValueError(f"Original duration outside 18s +/- 0.5s: {durations['original']:.3f}")
    for label in ("v1", "v2"):
        if not 2 <= durations[label] <= 4:
            raise ValueError(f"{label} duration outside 2-4s: {durations[label]:.3f}")
    return durations


def clean_review_pack() -> None:
    if REVIEW_DIR.exists():
        shutil.rmtree(REVIEW_DIR)
    FRAMES_DIR.mkdir(parents=True, exist_ok=True)


def frame_name(record: dict[str, Any], index: int) -> str:
    return f"{index:02d}_{record['lane']}_{record['id']}_{record['phase']}_{record['second']:05.2f}s.jpg"


def extract_frame(video: Path, record: dict[str, Any], index: int) -> dict[str, Any]:
    frame_path = FRAMES_DIR / frame_name(record, index)
    run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-ss",
            f"{float(record['second']):.3f}",
            "-i",
            str(video),
            "-frames:v",
            "1",
            "-vf",
            "scale=270:-1",
            "-q:v",
            "2",
            str(frame_path),
        ]
    )
    return {**record, "path": str(frame_path.relative_to(ROOT))}


def extract_all_frames() -> dict[str, list[dict[str, Any]]]:
    records: dict[str, list[dict[str, Any]]] = {"original": [], "v1": [], "v2": []}
    index = 1
    for record in ORIGINAL_POINTS:
        records["original"].append(extract_frame(ORIGINAL_VIDEO, record, index))
        index += 1
    for record in V1_POINTS:
        records["v1"].append(extract_frame(V1_VIDEO, record, index))
        index += 1
    for record in V2_POINTS:
        records["v2"].append(extract_frame(V2_VIDEO, record, index))
        index += 1
    return records


def load_font(size: int) -> ImageFont.ImageFont:
    for candidate in (
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
    ):
        try:
            return ImageFont.truetype(candidate, size)
        except OSError:
            continue
    return ImageFont.load_default()


def make_contact_sheet(records: list[dict[str, Any]], output: Path, title: str) -> None:
    cols = min(5, max(1, len(records)))
    cell_w = 300
    cell_h = 470
    header_h = 54
    rows = (len(records) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell_w, rows * cell_h + header_h), "white")
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(22)
    label_font = load_font(15)
    draw.text((14, 14), title, fill=(0, 0, 0), font=title_font)
    for index, record in enumerate(records):
        image = Image.open(ROOT / record["path"]).convert("RGB")
        image.thumbnail((270, 392))
        x0 = (index % cols) * cell_w
        y0 = (index // cols) * cell_h + header_h
        x = x0 + (cell_w - image.width) // 2
        y = y0 + 8
        sheet.paste(image, (x, y))
        draw.text((x0 + 10, y + image.height + 10), f"{record['id']} {record['second']:.2f}s"[:38], fill=(0, 0, 0), font=label_font)
        draw.text((x0 + 10, y + image.height + 31), record["evidence"][:36], fill=(64, 64, 64), font=label_font)
    sheet.save(output, quality=92)


def make_comparison_sheet(records: dict[str, list[dict[str, Any]]]) -> None:
    phases = [
        ("caption_start", 0),
        ("contact_mid", 1),
        ("contact_exit", 2),
        ("texture_exit", 3),
    ]
    lanes = ["original", "v1", "v2"]
    cell_w = 300
    cell_h = 462
    header_h = 74
    sheet = Image.new("RGB", (len(lanes) * cell_w, len(phases) * cell_h + header_h), "white")
    draw = ImageDraw.Draw(sheet)
    title_font = load_font(22)
    label_font = load_font(16)
    draw.text((14, 12), "caption / sticker before - v1 - v2 comparison", fill=(0, 0, 0), font=title_font)
    for lane_index, lane in enumerate(lanes):
        draw.text((lane_index * cell_w + 88, 44), lane, fill=(40, 40, 40), font=label_font)

    for row, (phase, record_index) in enumerate(phases):
        for col, lane in enumerate(lanes):
            record = records[lane][record_index]
            image = Image.open(ROOT / record["path"]).convert("RGB")
            image.thumbnail((270, 392))
            x0 = col * cell_w
            y0 = row * cell_h + header_h
            x = x0 + (cell_w - image.width) // 2
            y = y0 + 10
            sheet.paste(image, (x, y))
            draw.text((x0 + 10, y + image.height + 10), f"{phase}: {record['id']}"[:38], fill=(0, 0, 0), font=label_font)
            draw.text((x0 + 10, y + image.height + 32), record["evidence"][:36], fill=(64, 64, 64), font=label_font)
    sheet.save(COMPARISON_SHEET, quality=92)


def write_json_outputs(durations: dict[str, float], records: dict[str, list[dict[str, Any]]]) -> None:
    VISUAL_SCORECARD.write_text(
        json.dumps(VISUAL_SCORECARD_DATA, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    FIX_SPEC.write_text(json.dumps(FIX_SPEC_DATA, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    manifest = {
        "status": "caption_sticker_2_4s_fix_v2_review_pack_generated",
        "review_pack": str(REVIEW_DIR.relative_to(ROOT)),
        "videos": {
            "original": str(ORIGINAL_VIDEO.relative_to(ROOT)),
            "v1": str(V1_VIDEO.relative_to(ROOT)),
            "v2": str(V2_VIDEO.relative_to(ROOT)),
        },
        "durations": durations,
        "contact_sheets": {
            "original": str(ORIGINAL_SHEET.relative_to(ROOT)),
            "v1": str(V1_SHEET.relative_to(ROOT)),
            "v2": str(V2_SHEET.relative_to(ROOT)),
            "before_v1_v2": str(COMPARISON_SHEET.relative_to(ROOT)),
        },
        "visual_scorecard": str(VISUAL_SCORECARD.relative_to(ROOT)),
        "fix_spec": str(FIX_SPEC.relative_to(ROOT)),
        "frames": records,
        "this_is_partial_probe_not_full_video_candidate": True,
        "pending_user_review": True,
        "publish_ready_claim": False,
        "video_fixed_claim": False,
        "capability_verified_claim": False,
        "runtime_asset_commit_allowed_this_round": False,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    durations = validate_inputs()
    clean_review_pack()
    records = extract_all_frames()
    make_contact_sheet(records["original"], ORIGINAL_SHEET, "original 18s candidate frames")
    make_contact_sheet(records["v1"], V1_SHEET, "v1 2-4s micro probe frames")
    make_contact_sheet(records["v2"], V2_SHEET, "v2 2-4s fix frames")
    make_comparison_sheet(records)
    write_json_outputs(durations, records)
    print(f"review_pack={REVIEW_DIR.relative_to(ROOT)}")
    print(f"manifest={MANIFEST.relative_to(ROOT)}")
    print(f"visual_scorecard={VISUAL_SCORECARD.relative_to(ROOT)}")
    print(f"fix_spec={FIX_SPEC.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
