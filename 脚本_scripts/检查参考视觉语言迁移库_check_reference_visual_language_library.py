#!/usr/bin/env python3
"""Check reference visual language migration docs and gates."""

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]

DOCS = ROOT / "项目资料_docs" / "视频能力实验室_video_capability_lab"
CODEX_RULES = ROOT / "codex_source" / "01_execution_rules.md"
LATEST = ROOT / "执行日志_codex_log" / "最新摘要_latest.md"

REQUIRED_FILES = {
    "54": DOCS / "54_解析资产全量索引_analysis_asset_inventory.md",
    "55": DOCS / "55_参考视觉语言迁移库_reference_visual_language_migration_library.md",
    "56": DOCS / "56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md",
    "02": DOCS / "02_当前任务_current_task.md",
    "03": DOCS / "03_Codex执行桥接包_codex_execution_bridge.md",
    "04": DOCS / "04_检查标准与完成定义_check_standards.md",
    "codex_rules": CODEX_RULES,
    "latest": LATEST,
}

REQUIRED_55_TERMS = [
    "sticker_type_library",
    "attachment_relation_library",
    "shape_drawing_logic_library",
    "caption_visual_language_library",
    "caption_sticker_relation_library",
    "template_fallback_rule",
    "do_not_copy",
]

REQUIRED_56_TERMS = [
    "required_input_fields",
    "caption_router",
    "sticker_visual_punctuation_router",
    "caption_sticker_conflict_resolver",
    "template_fallback_gate",
    "router_output_schema",
    "failure_routing_map",
]

ENTRYPOINT_TERMS = [
    "54_解析资产全量索引_analysis_asset_inventory.md",
    "55_参考视觉语言迁移库_reference_visual_language_migration_library.md",
    "56_字幕贴纸视觉语言判断路由器_caption_sticker_visual_language_decision_router.md",
]

FORBIDDEN_NEW_DOC_CLAIMS = [
    "publish-ready",
    "video_fixed",
    "sticker system verified",
    "vlog director capability verified",
    "vlog_director_capability_verified",
]


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def fail(message: str) -> None:
    print(f"FAIL: {message}", file=sys.stderr)
    sys.exit(1)


def require(condition: bool, message: str) -> None:
    if not condition:
        fail(message)


def main() -> int:
    for name, path in REQUIRED_FILES.items():
        require(path.exists(), f"missing required file {name}: {path}")

    text54 = read(REQUIRED_FILES["54"])
    text55 = read(REQUIRED_FILES["55"])
    text56 = read(REQUIRED_FILES["56"])

    require("inventory_count | `69`" in text54, "54 missing inventory_count 69")
    numbered_rows = re.findall(r"^\| \d+ \| `", text54, flags=re.MULTILINE)
    require(len(numbered_rows) == 69, f"54 inventory rows expected 69, got {len(numbered_rows)}")

    for term in REQUIRED_55_TERMS:
        require(term in text55, f"55 missing term: {term}")

    for term in REQUIRED_56_TERMS:
        require(term in text56, f"56 missing term: {term}")

    for forbidden in FORBIDDEN_NEW_DOC_CLAIMS:
        for name in ("54", "55", "56"):
            require(
                forbidden not in read(REQUIRED_FILES[name]),
                f"{name} contains forbidden claim token: {forbidden}",
            )

    for name in ("02", "03", "04", "codex_rules", "latest"):
        text = read(REQUIRED_FILES[name])
        for term in ENTRYPOINT_TERMS:
            require(term in text, f"{name} does not reference {term}")

    rules_text = read(CODEX_RULES)
    for term in ("migration_library_used", "decision_router_used", "template_fallback", "copy_risk_check"):
        require(term in rules_text, f"codex rules missing future required output: {term}")

    print("PASS: reference visual language migration docs and gates are complete")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
