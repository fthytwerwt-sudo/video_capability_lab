#!/usr/bin/env python3
from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "AGENTS.md",
    "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
    "项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md",
    "项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md",
    "项目资料_docs/系统协议_system/03_外部资料桥接与保真提取机制_external_material_bridge_protocol.md",
    "项目资料_docs/系统协议_system/04_路线重判与失败后改线机制_goal_revision_replanning.md",
    "项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md",
    "项目资料_docs/系统协议_system/06_原感稿锁定与双层并存机制_locked_original_feel_bridge.md",
    "项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md",
    "项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md",
    "项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/01_执行合同与验收_execution_contract.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/02_当前任务_current_task.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md",
    "项目资料_docs/视频能力实验室_video_capability_lab/13_工具链补齐与意图闸门同步_toolchain_gate_sync.md",
    "codex_source/00_codex_readme.md",
    "codex_source/01_execution_rules.md",
    "脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py",
    "执行日志_codex_log/最新摘要_latest.md",
    "GPT项目资料同步包_gpt_project_mechanism_sync/00_GPT_Project上传说明_readme.md",
    "GPT项目资料同步包_gpt_project_mechanism_sync/上传清单_manifest.md",
]

STATUS_WORDS = ["已确认", "部分成立", "待验证", "推测", "通用建议"]
PACK_DIR = ROOT / "GPT项目资料同步包_gpt_project_mechanism_sync"
FACT_DIR_NAME = "视频能力实验室_video_capability_lab"
OLD_WRONG_WORKSPACE = "/Users/fan/Documents/video_capability_lab"
CONFIRMED_WORKSPACE = "/Users/fan/Documents/vlog、odd/video_capability_lab"
FORBIDDEN_TOP_LEVEL_DIRS = ["vlog", "odd", "vlog_odd"]
FORBIDDEN_ECOMMERCE_AGENTS_TERMS = [
    "first-station",
    "商品成立",
    "商品池",
    "指标驱动的 AI 电商内容生成与商品筛选机制",
    "厕所清洁剂",
    "商品分级",
]
POLLUTION_PHRASES = [
    "厕所清洁剂",
    "切丝器",
    "AI电商项目筛选工厂",
    "商品成立",
    "直播间运营目标",
    "Wan I2V 已通过",
    "Kling V3 Omni 默认路线",
]
SYSTEM_PROTOCOL_RELS = [
    "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
    "项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md",
    "项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md",
    "项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md",
    "项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md",
    "项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md",
]
SYSTEM_PROTOCOL_REQUIRED_PHRASES = [
    "外部项目 AGENTS 只作为机制参考",
    "只迁移协作机制，不迁移业务事实",
    "业务身份、当前任务、完成状态、素材路径、模型选择、指标路线、候选对象、业务验收结果必须禁止迁移",
    "系统机制文件或 GPT Project 上传包相关文件",
    "下一个目标",
]
UPLOAD_PACK_REQUIRED_PHRASES = [
    "外部项目 AGENTS 只作为机制参考",
    "只迁移协作机制，不迁移业务事实",
]
ALLOWED_FIXED_NAMES = {
    "AGENTS.md",
    "README.md",
    ".gitignore",
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "vite.config.js",
    "package-lock.json",
    "remotion.config.ts",
    "remotion.config.js",
    "Dockerfile",
    "docker-compose.yml",
    "pyproject.toml",
    "requirements.txt",
    "pytest.ini",
    "__init__.py",
}
LEGACY_FILENAME_EXCEPTIONS = {
    "codex_source",
    "codex_source/00_codex_readme.md",
    "codex_source/01_execution_rules.md",
    "codex_source/10_remotion_component_execution.md",
    "codex_source/11_hyperframes_card_execution.md",
    "codex_source/12_bgm_beat_execution.md",
    "codex_source/13_reference_analysis_execution.md",
    "codex_source/14_review_pack_and_export_rules.md",
    "tests",
    "tests/test_project_scaffold.py",
    "脚本_scripts/sync_gpt_project_mechanism_pack.py",
    "脚本_scripts/validate_project_scaffold.py",
    "package.json",
    "package-lock.json",
}
FILENAME_RULE_REQUIRED = [
    ("AGENTS.md", "文件命名硬规则"),
    ("项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md", "中文 + 英文"),
    ("codex_source/01_execution_rules.md", "文件命名规则"),
    ("项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md", "文件命名要求"),
    ("项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md", "文件命名检查"),
]
TRUE_INTENT_REQUIRED_PHRASES = [
    "真实意图澄清闸门",
    "用户真实目标",
    "成功标准",
    "失败标准",
    "停止条件",
]
CHINESE_RE = re.compile(r"[\u4e00-\u9fff]")
SNAKE_PART_RE = re.compile(r"[a-z][a-z0-9]*")


def read(rel: str) -> str:
    return (ROOT / rel).read_text(encoding="utf-8")


def uses_bilingual_name(path: Path) -> bool:
    name = path.name
    if name in ALLOWED_FIXED_NAMES:
        return True
    stem = name if path.is_dir() else path.stem
    if "_" not in stem or not CHINESE_RE.search(stem):
        return False
    return any(SNAKE_PART_RE.fullmatch(part) for part in stem.split("_"))


def filename_rule_violations() -> list[str]:
    violations: list[str] = []
    for path in ROOT.rglob("*"):
        rel = path.relative_to(ROOT)
        rel_text = rel.as_posix()
        if ".git" in rel.parts or ".venv" in rel.parts or "node_modules" in rel.parts or "素材" in rel.parts:
            continue
        if path.name.startswith("."):
            continue
        if rel_text in LEGACY_FILENAME_EXCEPTIONS:
            continue
        if not uses_bilingual_name(path):
            violations.append(rel_text)
    return violations


def validate() -> list[str]:
    errors: list[str] = []

    for rel in REQUIRED_FILES:
        if not (ROOT / rel).is_file():
            errors.append(f"missing required file: {rel}")

    agents = read("AGENTS.md") if (ROOT / "AGENTS.md").exists() else ""
    if "每一轮 Codex 任务执行完，必须 push 到仓库" not in agents:
        errors.append("AGENTS.md missing mandatory push rule")
    if OLD_WRONG_WORKSPACE in agents:
        errors.append("AGENTS.md still contains old wrong workspace path")
    if "vlog、odd" not in agents:
        errors.append("AGENTS.md missing vlog、odd workspace boundary")
    if "不得在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab`" not in agents:
        errors.append("AGENTS.md missing no-new-root-video-capability-lab rule")
    if CONFIRMED_WORKSPACE not in agents:
        errors.append("AGENTS.md missing confirmed workspace path")
    if "电商项目 AGENTS 只作为机制参考" not in agents:
        errors.append("AGENTS.md missing ecommerce AGENTS mechanism-only boundary")
    if "禁止迁移电商项目业务事实" not in agents:
        errors.append("AGENTS.md missing ecommerce business-fact migration ban")
    if "下一个目标" not in agents:
        errors.append("AGENTS.md missing next-goal wording")
    for term in FORBIDDEN_ECOMMERCE_AGENTS_TERMS:
        if term in agents:
            errors.append(f"AGENTS.md contains forbidden ecommerce or blocked-project term: {term}")

    execution_rules = read("codex_source/01_execution_rules.md")
    if "vlog、odd 工作范围限制" not in execution_rules:
        errors.append("execution rules missing vlog、odd scope section")
    if "blocked_wrong_workspace_or_remote" not in execution_rules:
        errors.append("execution rules missing wrong-workspace blocker")
    if "blocked_ask_user_confirmation" not in execution_rules:
        errors.append("execution rules missing ask-user-confirmation blocker")
    if "只迁移机制，不迁移业务事实" not in execution_rules:
        errors.append("execution rules missing mechanism-only external AGENTS rule")

    for rel, phrase in FILENAME_RULE_REQUIRED:
        if phrase not in read(rel):
            errors.append(f"filename rule missing from {rel}: {phrase}")
    for rel in filename_rule_violations():
        errors.append(f"custom file or directory name must be Chinese+English or legacy/fixed exception: {rel}")

    system_protocol_text = "\n".join(read(rel) for rel in SYSTEM_PROTOCOL_RELS)
    for phrase in SYSTEM_PROTOCOL_REQUIRED_PHRASES:
        if phrase not in system_protocol_text:
            errors.append(f"system protocol missing required mechanism phrase: {phrase}")
    true_intent_paths = [
        "AGENTS.md",
        "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
        "项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md",
        "项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md",
        "项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md",
        "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md",
        "codex_source/01_execution_rules.md",
    ]
    true_intent_text = "\n".join(read(rel) for rel in true_intent_paths)
    for phrase in TRUE_INTENT_REQUIRED_PHRASES:
        if phrase not in true_intent_text:
            errors.append(f"true intent gate missing required phrase: {phrase}")

    bridge = read("项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md")
    if "工作目录硬约束" not in bridge or "vlog、odd" not in bridge:
        errors.append("Codex bridge missing vlog、odd workspace hard constraint")

    for dirname in FORBIDDEN_TOP_LEVEL_DIRS:
        if (ROOT / dirname).exists():
            errors.append(f"forbidden unconfirmed top-level directory exists: {dirname}")

    all_text = "\n".join(
        path.read_text(encoding="utf-8")
        for path in ROOT.rglob("*.md")
        if ".git" not in path.parts and ".venv" not in path.parts and "node_modules" not in path.parts
    )
    for word in STATUS_WORDS:
        if word not in all_text:
            errors.append(f"missing status word: {word}")

    if PACK_DIR.exists():
        pack_text_parts: list[str] = []
        for path in PACK_DIR.rglob("*"):
            if path.is_dir():
                continue
            rel = path.relative_to(PACK_DIR)
            pack_text_parts.append(path.read_text(encoding="utf-8"))
            if len(rel.parts) != 1:
                errors.append(f"nested file in upload pack: {rel}")
            if FACT_DIR_NAME in rel.parts or "项目资料_docs" in rel.parts or "执行日志_codex_log" in rel.parts:
                errors.append(f"project fact path mixed into upload pack: {rel}")
            if rel.name in {"AGENTS.md", "最新摘要_latest.md"}:
                errors.append(f"forbidden file mixed into upload pack: {rel}")
        pack_text = "\n".join(pack_text_parts)
        for phrase in UPLOAD_PACK_REQUIRED_PHRASES:
            if phrase not in pack_text:
                errors.append(f"upload pack missing required mechanism phrase: {phrase}")
        if "真实意图澄清闸门" not in pack_text:
            errors.append("upload pack missing true intent clarification gate")
        for term in FORBIDDEN_ECOMMERCE_AGENTS_TERMS:
            if term in pack_text:
                errors.append(f"upload pack contains forbidden ecommerce or blocked-project term: {term}")

    project_fact_text = "\n".join(
        path.read_text(encoding="utf-8")
        for path in (ROOT / "项目资料_docs" / FACT_DIR_NAME).glob("*.md")
    )
    for phrase in POLLUTION_PHRASES:
        if phrase in project_fact_text:
            errors.append(f"old project business fact phrase found: {phrase}")

    capability_map = read("项目资料_docs/视频能力实验室_video_capability_lab/05_能力地图_capability_map.md")
    if "已确认可用" in capability_map or "已验证成立" in capability_map:
        errors.append("capability map contains verified-capability wording")
    for line in capability_map.splitlines():
        if line.startswith("| ") and "能力 |" not in line and "---" not in line:
            cells = [cell.strip() for cell in line.strip("|").split("|")]
            if len(cells) >= 2 and cells[1] != "待验证":
                errors.append(f"capability status must be 待验证: {line}")

    return errors


def main() -> int:
    errors = validate()
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("project scaffold OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
