from __future__ import annotations

import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

GATE_51 = ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/51_正片候选完整交付闸门_full_video_candidate_delivery_gate.md"
BGM_PROTOCOL_71 = ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/71_BGM情绪驱动自动调色机制_bgm_mood_driven_auto_color_grade_protocol.md"
GATE_72 = ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/72_正片完整流程与BGM调色总闸门_full_video_pipeline_bgm_color_gate.md"
CHECK_STANDARDS = ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md"
EXECUTION_RULES = ROOT / "codex_source/01_execution_rules.md"
LATEST = ROOT / "执行日志_codex_log/最新摘要_latest.md"

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
    "禁止声明",
]

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


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def gate_text() -> str:
    return "\n".join(read(path) for path in [GATE_51, BGM_PROTOCOL_71, GATE_72])


def is_runtime_or_media(path: str) -> bool:
    normalized = path.replace("\\", "/")
    return normalized.startswith(("tmp/", "dist/")) or normalized.lower().endswith(MEDIA_SUFFIXES)


def test_total_gate_files_exist() -> None:
    assert GATE_51.is_file()
    assert GATE_72.is_file()


def test_bgm_mood_color_protocol_exists() -> None:
    assert BGM_PROTOCOL_71.is_file()


def test_full_video_candidate_required_modules_contains_all_20_modules() -> None:
    text = read(GATE_72)
    assert "full_video_candidate_required_modules" in text
    for module in REQUIRED_MODULES:
        assert module in text


def test_bgm_color_modules_are_required() -> None:
    text = gate_text()
    assert "BGM_mood_analysis" in text
    assert "BGM_mood_driven_color_grade" in text
    assert "material_base_color_normalization" in text


def test_color_profile_fields_exist() -> None:
    text = gate_text()
    assert "color_grade_profile" in text
    assert "ffmpeg_filter_candidate" in text
    assert "remotion_effect_candidate" in text


def test_profile_read_by_pipeline_is_required() -> None:
    text = gate_text()
    assert "profile_read_by_pipeline" in text
    assert "blocked_color_grade_profile_not_read_by_pipeline" in text


def test_human_review_is_post_run_debug_only() -> None:
    text = gate_text()
    assert "human_review_role:\n  default: post_run_debug_only" in text
    assert "do_not_block_on_user_color_review" in text


def test_fallback_and_missing_module_rules_exist() -> None:
    text = gate_text()
    assert "fallback_neutral_unify" in text
    assert "blocked_required_module_missing" in text


def test_failure_feedback_routing_exists() -> None:
    text = gate_text()
    assert "failure_feedback_routing" in text
    assert "profile_generated_but_not_read" in text


def test_partial_probe_exception_must_be_explicit() -> None:
    text = read(GATE_72)
    assert "partial_probe" in text
    assert "this_is_partial_probe_not_full_video_candidate: true" in text


def test_forbidden_capability_claims_are_only_in_forbidden_context() -> None:
    files = [GATE_51, BGM_PROTOCOL_71, GATE_72, CHECK_STANDARDS, EXECUTION_RULES, LATEST]
    violations = []
    for path in files:
        in_forbidden_context = False
        for line_number, line in enumerate(read(path).splitlines(), start=1):
            stripped = line.strip()
            if stripped.startswith("##") and not any(marker in stripped for marker in ALLOWED_OVERCLAIM_CONTEXT):
                in_forbidden_context = False
            if any(marker in stripped for marker in ALLOWED_OVERCLAIM_CONTEXT) or stripped in {
                "forbidden_actions:",
                "do_not_claim:",
                "forbidden_claims:",
            }:
                in_forbidden_context = True
            for term in OVERCLAIM_TERMS:
                if term in line and not in_forbidden_context and not any(marker in line for marker in ALLOWED_OVERCLAIM_CONTEXT):
                    violations.append(f"{path.relative_to(ROOT)}:{line_number}:{term}")
    assert not violations


def test_check_standards_contains_done_definition() -> None:
    text = read(CHECK_STANDARDS)
    assert "full_video_candidate_pipeline_bgm_color_done_definition" in text


def test_codex_execution_rules_contains_full_pipeline_rule() -> None:
    text = read(EXECUTION_RULES)
    assert "正片候选完整流程强制规则" in text
    assert "BGM 情绪驱动调色必需模块规则" in text


def test_latest_contains_this_round_summary() -> None:
    text = read(LATEST)
    assert "本轮新增｜正片完整流程与 BGM 情绪调色总闸门" in text
    assert "full_video_candidate_pipeline_bgm_color_gate_mechanism_sync" in text


def test_tmp_dist_and_media_assets_are_not_tracked() -> None:
    output = subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True, encoding="utf-8")
    offenders = [path for path in output.splitlines() if is_runtime_or_media(path)]
    assert offenders == []


class FullVideoPipelineBgmColorGateTest(unittest.TestCase):
    def test_total_gate_files_exist(self) -> None:
        test_total_gate_files_exist()

    def test_bgm_mood_color_protocol_exists(self) -> None:
        test_bgm_mood_color_protocol_exists()

    def test_full_video_candidate_required_modules_contains_all_20_modules(self) -> None:
        test_full_video_candidate_required_modules_contains_all_20_modules()

    def test_bgm_color_modules_are_required(self) -> None:
        test_bgm_color_modules_are_required()

    def test_color_profile_fields_exist(self) -> None:
        test_color_profile_fields_exist()

    def test_profile_read_by_pipeline_is_required(self) -> None:
        test_profile_read_by_pipeline_is_required()

    def test_human_review_is_post_run_debug_only(self) -> None:
        test_human_review_is_post_run_debug_only()

    def test_fallback_and_missing_module_rules_exist(self) -> None:
        test_fallback_and_missing_module_rules_exist()

    def test_failure_feedback_routing_exists(self) -> None:
        test_failure_feedback_routing_exists()

    def test_partial_probe_exception_must_be_explicit(self) -> None:
        test_partial_probe_exception_must_be_explicit()

    def test_forbidden_capability_claims_are_only_in_forbidden_context(self) -> None:
        test_forbidden_capability_claims_are_only_in_forbidden_context()

    def test_check_standards_contains_done_definition(self) -> None:
        test_check_standards_contains_done_definition()

    def test_codex_execution_rules_contains_full_pipeline_rule(self) -> None:
        test_codex_execution_rules_contains_full_pipeline_rule()

    def test_latest_contains_this_round_summary(self) -> None:
        test_latest_contains_this_round_summary()

    def test_tmp_dist_and_media_assets_are_not_tracked(self) -> None:
        test_tmp_dist_and_media_assets_are_not_tracked()


if __name__ == "__main__":
    unittest.main()
