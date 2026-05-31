#!/usr/bin/env python3
from __future__ import annotations

import importlib.metadata
import json
import platform
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
VENV_PYTHON = ROOT / ".venv" / "bin" / "python"
REQUIRED_MODULES = ["librosa", "numpy", "scipy", "soundfile"]
REQUIRED_REMOTION_DEPS = ["remotion", "@remotion/cli", "@remotion/renderer", "@remotion/media-utils"]


def run_command(command: list[str], timeout: int = 15) -> dict[str, Any]:
    path = shutil.which(command[0])
    if not path:
        return {"status": "missing", "version": None, "path": None, "error": f"{command[0]} not found"}
    try:
        proc = subprocess.run(
            [path, *command[1:]],
            cwd=ROOT,
            check=False,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
    except Exception as exc:  # noqa: BLE001 - diagnostics are part of the JSON contract.
        return {"status": "error", "version": None, "path": path, "error": f"{type(exc).__name__}: {exc}"}

    output = (proc.stdout or proc.stderr).strip()
    first_line = output.splitlines()[0] if output else ""
    return {
        "status": "available" if proc.returncode == 0 else "error",
        "version": first_line or None,
        "path": path,
        "error": None if proc.returncode == 0 else f"exit_code={proc.returncode}",
    }


def python_status() -> dict[str, Any]:
    executable = VENV_PYTHON if VENV_PYTHON.exists() else Path(sys.executable)
    proc = subprocess.run(
        [str(executable), "--version"],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
        timeout=10,
    )
    output = (proc.stdout or proc.stderr).strip()
    return {
        "status": "available" if proc.returncode == 0 else "error",
        "version": output or platform.python_version(),
        "path": str(executable),
        "error": None if proc.returncode == 0 else f"exit_code={proc.returncode}",
    }


def module_status(name: str) -> dict[str, Any]:
    if not VENV_PYTHON.exists():
        return {"status": "missing", "version": None, "error": ".venv python missing"}

    code = (
        "import importlib, importlib.metadata; "
        f"importlib.import_module({name!r}); "
        f"print(importlib.metadata.version({name!r}))"
    )
    proc = subprocess.run(
        [str(VENV_PYTHON), "-c", code],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
        timeout=20,
    )
    if proc.returncode != 0:
        return {"status": "missing_or_error", "version": None, "error": (proc.stderr or proc.stdout).strip()}
    return {"status": "available", "version": proc.stdout.strip(), "error": None}


def package_json_status() -> dict[str, Any]:
    path = ROOT / "package.json"
    if not path.exists():
        return {"status": "missing", "dependencies": {}, "missing_dependencies": REQUIRED_REMOTION_DEPS}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        return {"status": "error", "dependencies": {}, "missing_dependencies": REQUIRED_REMOTION_DEPS, "error": str(exc)}
    dependencies = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
    missing = [name for name in REQUIRED_REMOTION_DEPS if name not in dependencies]
    return {
        "status": "available",
        "dependencies": dependencies,
        "missing_dependencies": missing,
        "error": None,
    }


def remotion_versions_status() -> dict[str, Any]:
    if not (ROOT / "package.json").exists():
        return {"status": "missing", "version": None, "error": "package.json missing"}
    proc = subprocess.run(
        ["npx", "remotion", "versions"],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
        timeout=30,
    )
    output = (proc.stdout or proc.stderr).strip()
    version_line = next((line.strip() for line in output.splitlines() if line.startswith("On version:")), "")
    return {
        "status": "available" if proc.returncode == 0 else "error",
        "version": version_line.replace("On version:", "").strip() or None,
        "error": None if proc.returncode == 0 else f"exit_code={proc.returncode}",
        "output_head": output.splitlines()[:5],
    }


def gitignore_status(pattern: str) -> str:
    path = ROOT / ".gitignore"
    if not path.exists():
        return "missing"
    lines = {line.strip() for line in path.read_text(encoding="utf-8").splitlines()}
    return "covered" if pattern in lines else "missing"


def main() -> int:
    package_json = package_json_status()
    modules = {name: module_status(name) for name in REQUIRED_MODULES}
    remotion_versions = remotion_versions_status()
    checks = {
        "node": run_command(["node", "--version"]),
        "npm": run_command(["npm", "--version"]),
        "ffmpeg": run_command(["ffmpeg", "-version"]),
        "ffprobe": run_command(["ffprobe", "-version"]),
        "python": python_status(),
    }

    gitignore_venv = gitignore_status(".venv/")
    gitignore_node_modules = gitignore_status("node_modules/")
    venv_status = "available" if VENV_PYTHON.exists() else "missing"
    remotion_dependencies = "available" if package_json["status"] == "available" and not package_json["missing_dependencies"] else "missing"

    notes: list[str] = []
    if remotion_versions["status"] != "available":
        notes.append("remotion versions command did not pass")
    if package_json["status"] != "available":
        notes.append("package.json missing or unreadable")
    for name, status in modules.items():
        if status["status"] != "available":
            notes.append(f"{name} import failed")

    result: dict[str, Any] = {
        "status": "passed",
        "node": checks["node"]["status"],
        "npm": checks["npm"]["status"],
        "ffmpeg": checks["ffmpeg"]["status"],
        "ffprobe": checks["ffprobe"]["status"],
        "python": checks["python"]["status"],
        "venv": venv_status,
        "librosa": modules["librosa"]["status"],
        "numpy": modules["numpy"]["status"],
        "scipy": modules["scipy"]["status"],
        "soundfile": modules["soundfile"]["status"],
        "package_json": package_json["status"],
        "remotion_dependencies": remotion_dependencies,
        "remotion_cli_versions": remotion_versions["status"],
        "gitignore_venv": gitignore_venv,
        "gitignore_node_modules": gitignore_node_modules,
        "notes": notes,
        "details": {
            "commands": checks,
            "modules": modules,
            "package_json": package_json,
            "remotion_versions": remotion_versions,
        },
    }

    required = [
        result["node"],
        result["npm"],
        result["ffmpeg"],
        result["ffprobe"],
        result["python"],
        result["venv"],
        result["librosa"],
        result["numpy"],
        result["scipy"],
        result["soundfile"],
        result["package_json"],
        result["remotion_dependencies"],
        result["remotion_cli_versions"],
        result["gitignore_venv"],
        result["gitignore_node_modules"],
    ]
    if any(status not in {"available", "covered"} for status in required):
        result["status"] = "failed"

    print(json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True))
    return 0 if result["status"] == "passed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
