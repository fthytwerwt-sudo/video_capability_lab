#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

from SAM2适配器_sam2_adapter import probe_sam2_environment
from 视觉前处理公共工具_visual_preprocessing_common import build_parser, rel, write_json


def main() -> None:
    parser = build_parser("Probe SAM2 environment without downloading model weights.")
    args = parser.parse_args()
    output_dir = Path(args.output_dir)
    path = output_dir / "sam2_env_probe.json"
    write_json(path, probe_sam2_environment())
    print(f"wrote {rel(path)}")


if __name__ == "__main__":
    main()
