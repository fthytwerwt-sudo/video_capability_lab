#!/usr/bin/env python3
from __future__ import annotations

import argparse
import filecmp
import shutil
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SYSTEM_DIR = ROOT / "项目资料_docs" / "系统协议_system"
PACK_DIR = ROOT / "GPT项目资料同步包_gpt_project_mechanism_sync"

MECHANISM_FILES = [
    ("00_协作协议_collaboration_protocol.md", "三层协作、GPT / Codex 分工、GPT Project 机制层边界"),
    ("01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md", "项目态账号层高优先级规则"),
    ("02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md", "P0 / P1 / P2 优先级与抗漂移"),
    ("03_外部资料桥接与保真提取机制_external_material_bridge_protocol.md", "外部资料保真提取与执行桥接"),
    ("04_路线重判与失败后改线机制_goal_revision_replanning.md", "失败后路线重判和改线"),
    ("05_输出硬规则与中文语义对齐_output_hard_rules.md", "中文优先、状态标记和复制格式"),
    ("06_原感稿锁定与双层并存机制_locked_original_feel_bridge.md", "原感参考层与执行桥接层并存"),
    ("20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md", "GPT / Codex 补全和质量保障"),
    ("21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md", "方向型输入到可执行机制补全"),
    ("22_真实意图澄清闸门机制_true_intent_clarification_gate.md", "真实意图澄清闸门和 Codex 下发前置条件"),
    ("23_五层需求确认与逻辑串联闸门机制_five_layer_requirement_alignment_gate.md", "六层需求确认、实现设计、逻辑串联和冲突提醒闸门"),
]

GENERATED_FILES = {"00_GPT_Project上传说明_readme.md", "上传清单_manifest.md"}
ALLOWED_PACK_FILES = GENERATED_FILES | {name for name, _ in MECHANISM_FILES}
FORBIDDEN_PACK_NAMES = {
    "AGENTS.md",
    "最新摘要_latest.md",
}
FORBIDDEN_PACK_PARTS = {
    "项目资料_docs",
    "视频能力实验室_video_capability_lab",
    "执行日志_codex_log",
    "codex_source",
    "运行输出_runs",
}
FORBIDDEN_PACK_TEXT_TERMS = [
    "first-station",
    "商品池",
    "商品分级",
    "商品成立",
    "厕所清洁剂",
    "指标驱动的 AI 电商内容生成与商品筛选机制",
]


def readme_text() -> str:
    return """# GPT Project 上传说明

已确认：本上传包只承载配合机制，不承载项目事实。

## 使用方式

将本目录内文件上传到 GPT Project，用于提供协作方式、判断顺序、同步规则和执行边界。

## 事实源规则

- GPT Project = 配合机制层。
- GitHub 仓库 `main` 当前文件 = 项目事实层。
- Codex = 执行落库层。
- 如果 GPT Project 上传包和 GitHub 仓库事实冲突，以 GitHub 仓库为准。

## 禁止上传内容

- `AGENTS.md`
- `执行日志_codex_log/最新摘要_latest.md`
- `项目资料_docs/视频能力实验室_video_capability_lab/` 下的项目事实
- 视频、图片、音频、运行输出、zip
"""


def manifest_text() -> str:
    rows = [
        ("00_GPT_Project上传说明_readme.md", "脚本自动生成", "GPT Project 上传包定位、读取和同步规则"),
        ("上传清单_manifest.md", "脚本自动生成", "上传包文件清单、源路径和用途说明"),
    ]
    rows.extend((name, f"项目资料_docs/系统协议_system/{name}", purpose) for name, purpose in MECHANISM_FILES)

    lines = [
        "# GPT Project 配合机制上传清单",
        "",
        "`已确认`：本清单内所有文件都只允许承载配合机制，不允许承载项目事实。项目事实必须回到 GitHub 仓库 `main` 当前文件读取。",
        "",
        "| 上传包文件 | 源文件路径 | 用途 | 是否允许放项目事实 |",
        "|---|---|---|---|",
    ]
    for name, source, purpose in rows:
        lines.append(f"| `{name}` | `{source}` | {purpose} | 否 |")
    lines.append("")
    return "\n".join(lines)


def unexpected_pack_files() -> list[Path]:
    if not PACK_DIR.exists():
        return []
    unexpected: list[Path] = []
    for path in PACK_DIR.rglob("*"):
        if path.is_dir():
            continue
        rel = path.relative_to(PACK_DIR)
        if len(rel.parts) != 1 or rel.name not in ALLOWED_PACK_FILES:
            unexpected.append(rel)
    return unexpected


def forbidden_paths_present() -> list[Path]:
    found: list[Path] = []
    if not PACK_DIR.exists():
        return found
    for path in PACK_DIR.rglob("*"):
        rel = path.relative_to(PACK_DIR)
        if rel.name in FORBIDDEN_PACK_NAMES:
            found.append(rel)
        if any(part in FORBIDDEN_PACK_PARTS for part in rel.parts):
            found.append(rel)
    return found


def sync() -> None:
    PACK_DIR.mkdir(parents=True, exist_ok=True)
    (PACK_DIR / "00_GPT_Project上传说明_readme.md").write_text(readme_text(), encoding="utf-8")
    (PACK_DIR / "上传清单_manifest.md").write_text(manifest_text(), encoding="utf-8")
    for filename, _purpose in MECHANISM_FILES:
        source = SYSTEM_DIR / filename
        if not source.exists():
            raise FileNotFoundError(f"missing source mechanism file: {source}")
        shutil.copyfile(source, PACK_DIR / filename)

    for rel in unexpected_pack_files():
        (PACK_DIR / rel).unlink()


def check() -> list[str]:
    errors: list[str] = []
    if not PACK_DIR.exists():
        return [f"missing pack dir: {PACK_DIR}"]

    expected_generated = {
        "00_GPT_Project上传说明_readme.md": readme_text(),
        "上传清单_manifest.md": manifest_text(),
    }
    for name, expected in expected_generated.items():
        path = PACK_DIR / name
        if not path.exists():
            errors.append(f"missing generated file: {name}")
        elif path.read_text(encoding="utf-8") != expected:
            errors.append(f"generated file drifted: {name}")

    for filename, _purpose in MECHANISM_FILES:
        source = SYSTEM_DIR / filename
        target = PACK_DIR / filename
        if not source.exists():
            errors.append(f"missing source: {source}")
        elif not target.exists():
            errors.append(f"missing pack copy: {target}")
        elif not filecmp.cmp(source, target, shallow=False):
            errors.append(f"pack copy differs from source: {filename}")

    for rel in unexpected_pack_files():
        errors.append(f"unexpected file in pack: {rel}")
    for rel in forbidden_paths_present():
        errors.append(f"forbidden path in pack: {rel}")
    for path in PACK_DIR.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(PACK_DIR)
        text = path.read_text(encoding="utf-8")
        for term in FORBIDDEN_PACK_TEXT_TERMS:
            if term in text:
                errors.append(f"forbidden business term in pack: {rel}: {term}")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify pack without modifying files")
    args = parser.parse_args()

    if not args.check:
        sync()

    errors = check()
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("GPT Project mechanism pack OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
