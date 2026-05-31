from __future__ import annotations

import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SYSTEM_PROTOCOL_RELS = [
    "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
    "项目资料_docs/系统协议_system/01_项目态账号记忆强制执行规则_project_mode_account_memory_enforcement.md",
    "项目资料_docs/系统协议_system/02_P0-P1-P2锚点与抗漂移机制_anchor_priority_anti_drift.md",
    "项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md",
    "项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md",
    "项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md",
    "项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md",
]
FORBIDDEN_UPLOAD_PACK_TERMS = [
    "first-station",
    "商品池",
    "商品分级",
    "商品成立",
    "厕所清洁剂",
    "指标驱动的 AI 电商内容生成与商品筛选机制",
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
    "public",
    "remotion",
    "Root.tsx",
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
RUNTIME_DIR_NAMES = {"dist", "tmp", "public/能力证明Demo_assets", "运行输出_runs"}
CHINESE_RE = re.compile(r"[\u4e00-\u9fff]")
SNAKE_PART_RE = re.compile(r"[a-z][a-z0-9]*")


def uses_bilingual_name(path: Path) -> bool:
    name = path.name
    if name in ALLOWED_FIXED_NAMES:
        return True
    stem = name if path.is_dir() else path.stem
    if "_" not in stem or not CHINESE_RE.search(stem):
        return False
    return any(SNAKE_PART_RE.fullmatch(part) for part in stem.split("_"))


class ProjectScaffoldTest(unittest.TestCase):
    def test_required_files_exist(self) -> None:
        required = [
            "AGENTS.md",
            "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
            "项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md",
            "项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md",
            "项目资料_docs/视频能力实验室_video_capability_lab/13_工具链补齐与意图闸门同步_toolchain_gate_sync.md",
            "codex_source/00_codex_readme.md",
            "脚本_scripts/检查视频能力工具链_check_video_capability_toolchain.py",
            "执行日志_codex_log/最新摘要_latest.md",
            "GPT项目资料同步包_gpt_project_mechanism_sync/00_GPT_Project上传说明_readme.md",
            "GPT项目资料同步包_gpt_project_mechanism_sync/上传清单_manifest.md",
        ]
        for rel in required:
            self.assertTrue((ROOT / rel).is_file(), rel)

    def test_gpt_project_pack_has_no_project_fact_directory(self) -> None:
        pack_dir = ROOT / "GPT项目资料同步包_gpt_project_mechanism_sync"
        for path in pack_dir.rglob("*"):
            rel = path.relative_to(pack_dir)
            self.assertNotIn("项目资料_docs", rel.parts)
            self.assertNotIn("视频能力实验室_video_capability_lab", rel.parts)
            self.assertNotIn("执行日志_codex_log", rel.parts)
            self.assertNotEqual(rel.name, "AGENTS.md")

    def test_agents_contains_mandatory_push_rule(self) -> None:
        text = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
        self.assertIn("每一轮 Codex 任务执行完，必须 push 到仓库", text)
        self.assertIn("禁止 `git add .`", text)

    def test_workspace_boundary_is_vlog_odd_repo(self) -> None:
        agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
        execution_rules = (ROOT / "codex_source/01_execution_rules.md").read_text(encoding="utf-8")
        bridge = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md").read_text(encoding="utf-8")

        self.assertNotIn("/Users/fan/Documents/video_capability_lab", agents)
        self.assertIn("vlog、odd", agents)
        self.assertIn("不得在 `/Users/fan/Documents/` 下另建新的 `video_capability_lab`", agents)
        self.assertIn("vlog、odd 工作范围限制", execution_rules)
        self.assertIn("blocked_wrong_workspace_or_remote", execution_rules)
        self.assertIn("工作目录硬约束", bridge)
        self.assertIn("vlog、odd", bridge)

    def test_no_unconfirmed_vlog_odd_top_level_dirs(self) -> None:
        for dirname in ["vlog", "odd", "vlog_odd"]:
            self.assertFalse((ROOT / dirname).exists(), dirname)

    def test_ecommerce_agents_rules_are_mechanism_only(self) -> None:
        agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
        execution_rules = (ROOT / "codex_source/01_execution_rules.md").read_text(encoding="utf-8")
        system_protocol = "\n".join((ROOT / rel).read_text(encoding="utf-8") for rel in SYSTEM_PROTOCOL_RELS)

        self.assertIn("电商项目 AGENTS 只作为机制参考", agents)
        self.assertIn("禁止迁移电商项目业务事实", agents)
        self.assertIn("下一个目标", agents)
        self.assertIn("只迁移机制，不迁移业务事实", execution_rules)
        self.assertIn("外部项目 AGENTS 只作为机制参考", system_protocol)
        self.assertIn("只迁移协作机制，不迁移业务事实", system_protocol)
        self.assertIn(
            "业务身份、当前任务、完成状态、素材路径、模型选择、指标路线、候选对象、业务验收结果必须禁止迁移",
            system_protocol,
        )
        for forbidden in [
            "first-station",
            "商品成立",
            "商品池",
            "指标驱动的 AI 电商内容生成与商品筛选机制",
            "厕所清洁剂",
            "商品分级",
        ]:
            self.assertNotIn(forbidden, agents)

    def test_capability_map_initial_status_is_pending_validation(self) -> None:
        text = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/05_能力地图_capability_map.md").read_text(encoding="utf-8")
        self.assertNotIn("已确认可用", text)
        self.assertNotIn("已验证成立", text)
        rows = [line for line in text.splitlines() if line.startswith("| ") and "---" not in line and "能力 |" not in line]
        self.assertGreaterEqual(len(rows), 10)
        for row in rows:
            cells = [cell.strip() for cell in row.strip("|").split("|")]
            self.assertEqual(cells[1], "待验证", row)

    def test_manifest_disallows_project_facts(self) -> None:
        manifest = (ROOT / "GPT项目资料同步包_gpt_project_mechanism_sync/上传清单_manifest.md").read_text(encoding="utf-8")
        rows = [line for line in manifest.splitlines() if line.startswith("| `")]
        self.assertGreaterEqual(len(rows), 11)
        for row in rows:
            cells = [cell.strip() for cell in row.strip("|").split("|")]
            self.assertEqual(cells[-1], "否", row)

    def test_upload_pack_syncs_external_agents_mechanism_without_business_facts(self) -> None:
        pack_dir = ROOT / "GPT项目资料同步包_gpt_project_mechanism_sync"
        pack_text = "\n".join(path.read_text(encoding="utf-8") for path in pack_dir.rglob("*.md"))

        self.assertIn("外部项目 AGENTS 只作为机制参考", pack_text)
        self.assertIn("只迁移协作机制，不迁移业务事实", pack_text)
        self.assertIn("真实意图澄清闸门", pack_text)
        for forbidden in FORBIDDEN_UPLOAD_PACK_TERMS:
            self.assertNotIn(forbidden, pack_text)

    def test_codex_execution_template_has_required_sections(self) -> None:
        text = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md").read_text(encoding="utf-8")
        required_sections = [
            "Goal（目标）",
            "Context（上下文）",
            "Constraints（边界）",
            "Impact check（影响面检查）",
            "Must read（必须读取）",
            "文件命名要求",
            "Execution steps（执行步骤）",
            "Done when（完成标准）",
            "Blocked if（阻断条件）",
            "Output（最终回报格式）",
        ]
        for section in required_sections:
            self.assertIn(section, text)

    def test_filename_rule_is_landed_in_project_controls(self) -> None:
        agents = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
        output_rules = (ROOT / "项目资料_docs/系统协议_system/05_输出硬规则与中文语义对齐_output_hard_rules.md").read_text(encoding="utf-8")
        execution_rules = (ROOT / "codex_source/01_execution_rules.md").read_text(encoding="utf-8")
        bridge = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md").read_text(encoding="utf-8")
        check_standards = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/04_检查标准与完成定义_check_standards.md").read_text(encoding="utf-8")

        self.assertIn("文件命名硬规则", agents)
        self.assertIn("中文 + 英文", output_rules)
        self.assertIn("文件命名规则", execution_rules)
        self.assertIn("文件命名要求", bridge)
        self.assertIn("文件命名检查", check_standards)

    def test_current_custom_filenames_are_bilingual_or_legacy(self) -> None:
        violations = []
        for path in ROOT.rglob("*"):
            rel = path.relative_to(ROOT)
            rel_text = rel.as_posix()
            if any(rel_text == runtime or rel_text.startswith(f"{runtime}/") for runtime in RUNTIME_DIR_NAMES):
                continue
            if ".git" in rel.parts or ".venv" in rel.parts or "node_modules" in rel.parts or "素材" in rel.parts:
                continue
            if path.name.startswith("."):
                continue
            if rel_text in LEGACY_FILENAME_EXCEPTIONS:
                continue
            if not uses_bilingual_name(path):
                violations.append(rel_text)

        self.assertIn("tests/test_project_scaffold.py", LEGACY_FILENAME_EXCEPTIONS)
        self.assertEqual([], violations)

    def test_true_intent_gate_is_landed_in_execution_chain(self) -> None:
        files = [
            "AGENTS.md",
            "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
            "项目资料_docs/系统协议_system/20_GPT与Codex自动补全及质量保障机制_gpt_codex_completion_quality_guard.md",
            "项目资料_docs/系统协议_system/21_方向型输入到可执行机制补全协议_direction_to_execution_completion_protocol.md",
            "项目资料_docs/系统协议_system/22_真实意图澄清闸门机制_true_intent_clarification_gate.md",
            "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md",
            "codex_source/01_execution_rules.md",
        ]
        text = "\n".join((ROOT / rel).read_text(encoding="utf-8") for rel in files)
        for phrase in ["真实意图澄清闸门", "用户真实目标", "成功标准", "失败标准", "停止条件"]:
            self.assertIn(phrase, text)


if __name__ == "__main__":
    unittest.main()
