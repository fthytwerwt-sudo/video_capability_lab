#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

GATE_51 = "项目资料_docs/视频能力实验室_video_capability_lab/51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md"
BGM_PROTOCOL_71 = "项目资料_docs/视频能力实验室_video_capability_lab/71_BGM情绪驱动自动调色机制_bgm_mood_driven_auto_color_grade_protocol.md"
GATE_72 = "项目资料_docs/视频能力实验室_video_capability_lab/72_正片完整流程与BGM调色总闸门_full_video_pipeline_bgm_color_gate.md"
CURRENT_TASK = "项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md"
BRIDGE = "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md"
CHECK_STANDARDS = "项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md"
EXECUTION_RULES = "codex_source/01_execution_rules.md"
LATEST = "执行日志_codex_log/最新摘要_latest.md"

REQUIRED_MODULES = [
    "project_guard",
    "input_inventory",
    "reference_and_style_anchor",
    "material_selection",
    "material_quality_check",
    "BGM_style_and_audio",
    "BGM_mood_analysis",
    "material_base_color_normalization",
    "BGM_mood_driven_color_grade",
    "sequence_structure",
    "pacing_and_rhythm",
    "captions_or_text_layer",
    "stickers_or_visual_punctuation",
    "motion_effects_and_transitions",
    "composition_and_crop",
    "subject_and_caption_readability_guard",
    "audio_mix",
    "export_and_technical_validation",
    "review_pack_and_machine_report",
    "failure_feedback_routing",
]

REQUIRED_PHRASES = [
    "full_video_candidate_required_modules",
    "full_video_candidate_completion_matrix",
    "BGM_mood_analysis",
    "BGM_mood_driven_color_grade",
    "material_base_color_normalization",
    "color_grade_profile",
    "profile_read_by_pipeline",
    "human_review_role:\n  default: post_run_debug_only",
    "do_not_block_on_user_color_review",
    "fallback_neutral_unify",
    "blocked_required_module_missing",
    "blocked_color_grade_profile_not_read_by_pipeline",
    "failure_feedback_routing",
]

OVERCLAIM_TERMS = [
    "bgm_mood_driven_color_grade_verified",
    "full_video_candidate_pipeline_verified",
    "publish-ready",
    "video_fixed",
    "vlog_director_capability_verified",
]

ALLOWED_OVERCLAIM_CONTEXT = [
    "不得",
    "禁止",
    "不能",
    "不是",
    "不等于",
    "不证明",
    "不声明",
    "声明",
    "do_not_claim",
    "forbidden",
    "forbidden_claims",
    "禁用",
    "禁止声明",
]

RUNTIME_PREFIXES = ("tmp/", "dist/")
MEDIA_SUFFIXES = (
    ".mp4",
    ".mov",
    ".m4v",
    ".avi",
    ".mkv",
    ".webm",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".wav",
    ".mp3",
    ".m4a",
    ".aac",
    ".flac",
)


def read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def exists(rel: str) -> bool:
    return (ROOT / rel).is_file()


def git_output(args: list[str]) -> str:
    return subprocess.check_output(args, cwd=ROOT, text=True, encoding="utf-8")


def is_runtime_asset_path(path: str) -> bool:
    normalized = path.replace("\\", "/")
    return normalized.startswith(RUNTIME_PREFIXES) or normalized.lower().endswith(MEDIA_SUFFIXES)


def staged_runtime_assets() -> list[str]:
    output = git_output(["git", "status", "--short", "--untracked-files=all"])
    offenders: list[str] = []
    for line in output.splitlines():
        if len(line) < 4:
            continue
        index_status = line[0]
        path = line[3:]
        if " -> " in path:
            path = path.split(" -> ", 1)[1]
        if index_status not in {" ", "?"} and is_runtime_asset_path(path):
            offenders.append(path)
    return offenders


def tracked_runtime_assets() -> list[str]:
    output = git_output(["git", "ls-files"])
    offenders: list[str] = []
    for path in output.splitlines():
        if path.startswith(RUNTIME_PREFIXES) or path.lower().endswith(MEDIA_SUFFIXES):
            offenders.append(path)
    return offenders


def line_has_allowed_overclaim_context(line: str) -> bool:
    return any(marker in line for marker in ALLOWED_OVERCLAIM_CONTEXT)


def overclaim_violations() -> list[str]:
    files = [GATE_51, BGM_PROTOCOL_71, GATE_72, CURRENT_TASK, BRIDGE, CHECK_STANDARDS, EXECUTION_RULES, LATEST]
    violations: list[str] = []
    for rel in files:
        if not exists(rel):
            continue
        in_forbidden_context = False
        for lineno, line in enumerate(read(rel).splitlines(), start=1):
            stripped = line.strip()
            if stripped.startswith("##") and not line_has_allowed_overclaim_context(stripped):
                in_forbidden_context = False
            if line_has_allowed_overclaim_context(stripped) or stripped in {"forbidden_actions:", "do_not_claim:", "forbidden_claims:"}:
                in_forbidden_context = True
            for term in OVERCLAIM_TERMS:
                if term in line and not in_forbidden_context and not line_has_allowed_overclaim_context(line):
                    violations.append(f"{rel}:{lineno}: {term}")
    return violations


def validate() -> list[str]:
    errors: list[str] = []

    if not (exists(GATE_51) or exists(GATE_72)):
        errors.append("51 or 72 full-video gate must exist")
    if not exists(BGM_PROTOCOL_71):
        errors.append("71 BGM mood color protocol must exist")

    for rel in [GATE_51, BGM_PROTOCOL_71, GATE_72, CURRENT_TASK, BRIDGE, CHECK_STANDARDS, EXECUTION_RULES, LATEST]:
        if not exists(rel):
            errors.append(f"missing required file: {rel}")

    combined_gate_text = "\n".join(read(rel) for rel in [GATE_51, BGM_PROTOCOL_71, GATE_72, BRIDGE] if exists(rel))
    for phrase in REQUIRED_PHRASES:
        if phrase not in combined_gate_text:
            errors.append(f"missing required phrase in gate/protocol/bridge: {phrase}")

    gate_text = read(GATE_72) if exists(GATE_72) else combined_gate_text
    for module in REQUIRED_MODULES:
        if module not in gate_text:
            errors.append(f"required module missing from integrated gate: {module}")

    rules = read(EXECUTION_RULES) if exists(EXECUTION_RULES) else ""
    if "正片候选完整流程强制规则" not in rules:
        errors.append("execution rules missing full video pipeline mandatory rule")
    if "BGM 情绪驱动调色必需模块规则" not in rules:
        errors.append("execution rules missing BGM mood color grade required-module rule")

    standards = read(CHECK_STANDARDS) if exists(CHECK_STANDARDS) else ""
    if "full_video_candidate_pipeline_bgm_color_done_definition" not in standards:
        errors.append("check standards missing BGM color full-pipeline done definition")

    latest = read(LATEST) if exists(LATEST) else ""
    if "本轮新增｜正片完整流程与 BGM 情绪调色总闸门" not in latest:
        errors.append("latest summary missing this round BGM color gate section")

    staged_assets = staged_runtime_assets()
    if staged_assets:
        errors.append(f"runtime assets staged: {', '.join(staged_assets)}")

    tracked_assets = tracked_runtime_assets()
    if tracked_assets:
        errors.append(f"runtime/media assets tracked by git: {', '.join(tracked_assets)}")

    claim_violations = overclaim_violations()
    if claim_violations:
        errors.append("capability overclaim terms outside forbidden context: " + "; ".join(claim_violations))

    return errors


def main() -> int:
    errors = validate()
    if errors:
        print("validation_status: failed")
        for error in errors:
            print(f"- {error}")
        return 1

    print("validation_status: passed")
    print("checked: full_video_candidate_pipeline_bgm_color_gate")
    print("required_modules_count: 20")
    print("runtime_assets_staged: false")
    print("capability_overclaim_detected: false")
    return 0


if __name__ == "__main__":
    sys.exit(main())
