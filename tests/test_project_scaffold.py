from __future__ import annotations

import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class ProjectScaffoldTest(unittest.TestCase):
    def test_required_files_exist(self) -> None:
        required = [
            "AGENTS.md",
            "项目资料_docs/系统协议_system/00_协作协议_collaboration_protocol.md",
            "项目资料_docs/视频能力实验室_video_capability_lab/00_项目总说明_project_brief.md",
            "codex_source/00_codex_readme.md",
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

    def test_codex_execution_template_has_required_sections(self) -> None:
        text = (ROOT / "项目资料_docs/视频能力实验室_video_capability_lab/03_Codex执行桥接包_codex_execution_bridge.md").read_text(encoding="utf-8")
        required_sections = [
            "Goal（目标）",
            "Context（上下文）",
            "Constraints（边界）",
            "Impact check（影响面检查）",
            "Must read（必须读取）",
            "Execution steps（执行步骤）",
            "Done when（完成标准）",
            "Blocked if（阻断条件）",
            "Output（最终回报格式）",
        ]
        for section in required_sections:
            self.assertIn(section, text)


if __name__ == "__main__":
    unittest.main()
