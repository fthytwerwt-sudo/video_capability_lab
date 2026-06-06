#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
RUNTIME_DIR = ROOT / "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe"
DEFAULT_REVIEW_DIR = (
    ROOT / "tmp/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate_review_pack"
)

SPEC_RULES: dict[str, dict[str, Any]] = {
    "asset_need_01": {
        "video_event": "opening low-subject texture landing beat with existing 落地 text cue",
        "video_anchor_source": "frame_sampling_manifest f0001 0.50s + visual_need_01 + center_lower negative-space anchor",
        "reference_rule_links": [
            "55:H.caption_05_hand_drawn_reaction_word",
            "55:F.shape_08_hero_keyword_block",
            "56:E.caption_branch_05_hand_drawn_reaction_word",
            "59:B.frame_review_loop",
        ],
        "sticker_or_caption_branch": "caption_branch_05_hand_drawn_reaction_word",
        "shape_requirement": "cream hand-drawn caption card, uneven outline, compact block growing from the landing text moment",
        "text_requirement": "exact Chinese text: 落地",
        "emotion_requirement": "grounded opening cue, tactile and light, not a slogan",
        "material_requirement": "alpha PNG with preserved rough outline, soft shadow, no watermark/logo/UI",
        "motion_requirement": "small pop in, short hold, fade before the next identity transition",
        "expected_video_fit": "reads as a landing caption card near lower center without becoming a fixed lower-third",
        "fallback_if_video_fit_failed": "route_back_to caption_visual_language_library + video_event_anchor",
    },
    "asset_need_02": {
        "video_event": "texture-to-gym entry identity transition with 进场 cue",
        "video_anchor_source": "frame_sampling_manifest f0003 1.50s + visual_need_02 + right_mid safe area",
        "reference_rule_links": [
            "55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid",
            "55:E.attach_08_caption_relation_attached",
            "56:F.sticker_branch_02_hand_drawn_hybrid",
            "56:G.caption_sticker_conflict_resolver",
        ],
        "sticker_or_caption_branch": "sticker_branch_02_hand_drawn_hybrid",
        "shape_requirement": "small reaction face / peeking mark, not a copied emoji, sized below subject attention",
        "text_requirement": "no readable text expected; supports existing 进场 cue",
        "emotion_requirement": "light entry reaction, playful but not random",
        "material_requirement": "cream outline, soft shadow, alpha edge pending user review",
        "motion_requirement": "short slide from side, quick pop-out with the entry transition",
        "expected_video_fit": "supports the transition into gym identity without blocking person or equipment",
        "fallback_if_video_fit_failed": "route_back_to sticker_branch_02 + composition_safe_area",
    },
    "asset_need_03": {
        "video_event": "machine action contact / pressure peak around 咔 cue",
        "video_anchor_source": "frame_sampling_manifest f0007 3.50s + visual_need_03 + near_object contact window",
        "reference_rule_links": [
            "55:D.sticker_type_03_contact_flash",
            "55:E.attach_02_contact_point_attached",
            "55:F.shape_02_contact_flash",
            "56:F.sticker_branch_03_contact",
            "61:C.anchor_map_contact_points",
        ],
        "sticker_or_caption_branch": "sticker_branch_03_contact",
        "shape_requirement": "1-3 short cream/yellow contact flash strokes near the pressure point",
        "text_requirement": "no readable text expected; visual punctuation supports 咔",
        "emotion_requirement": "brief pressure / impact accent, not promotional burst",
        "material_requirement": "rough marker edge, small dust texture, alpha edge pending review",
        "motion_requirement": "bounce into contact peak, short hold, pop out before follow-up reaction",
        "expected_video_fit": "feels attached to action contact rather than floating as decorative burst",
        "fallback_if_video_fit_failed": "route_back_to contact_point_anchor + shape_02_contact_flash",
    },
    "asset_need_04": {
        "video_event": "post-contact effort / hold-pressure reaction around 顶住 cue",
        "video_anchor_source": "frame_sampling_manifest f0008-f0009 4.00-4.50s + visual_need_04 + left_mid safe area",
        "reference_rule_links": [
            "55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid",
            "55:D.sticker_type_09_object_personification_mark",
            "55:I.cs_relation_03_shared_anchor_split_roles",
            "56:F.sticker_branch_02_hand_drawn_hybrid",
            "59:C.visual_scorecard",
        ],
        "sticker_or_caption_branch": "sticker_branch_02_hand_drawn_hybrid",
        "shape_requirement": "small effort reaction face, visually different from entry sticker, not oversized emoji",
        "text_requirement": "no readable text expected; supports 顶住 pressure cue",
        "emotion_requirement": "strain / hold / awkward effort",
        "material_requirement": "thick cream outline, soft shadow, alpha edge pending review",
        "motion_requirement": "quick pop with small hold, fade after pressure reaction",
        "expected_video_fit": "adds effort reaction without covering contact point or duplicating asset_need_03",
        "fallback_if_video_fit_failed": "route_back_to caption_sticker_relation + attention_budget",
    },
    "asset_need_05": {
        "video_event": "metal texture reset section where attention should return to line direction",
        "video_anchor_source": "frame_sampling_manifest f0010-f0012 5.00-6.00s + visual_need_05 + right_mid line texture",
        "reference_rule_links": [
            "55:H.caption_02_attached_phrase",
            "55:D.sticker_type_04_motion_trail_punctuation",
            "55:E.attach_03_motion_direction_attached",
            "56:E.caption_branch_02_attached_phrase",
            "61:D.motion_track_direction",
        ],
        "sticker_or_caption_branch": "caption_branch_02_attached_phrase",
        "shape_requirement": "compact line-direction card with small underline, attached to metal line direction",
        "text_requirement": "exact Chinese text: 顺线",
        "emotion_requirement": "reset / directional guidance, calm and functional",
        "material_requirement": "alpha card should stay legible over dense metal texture",
        "motion_requirement": "side slide, short hold, fade before tail label",
        "expected_video_fit": "guides viewer attention along machine line direction",
        "fallback_if_video_fit_failed": "route_back_to asset_generation_spec / ali_asset_request",
    },
    "asset_need_06": {
        "video_event": "tail machine direction-line close where visual punctuation should collect motion",
        "video_anchor_source": "frame_sampling_manifest f0013-f0015 6.50-7.50s + visual_need_06 + near_object line direction",
        "reference_rule_links": [
            "55:D.sticker_type_04_motion_trail_punctuation",
            "55:E.attach_03_motion_direction_attached",
            "55:F.shape_03_motion_trail_punctuation",
            "56:F.sticker_branch_04_motion",
            "61:D.motion_track_direction",
        ],
        "sticker_or_caption_branch": "sticker_branch_04_motion",
        "shape_requirement": "two short hand-drawn strokes plus tiny object label, not an arrow",
        "text_requirement": "original detection text: 线走这边; generated asset should not display unrelated words",
        "emotion_requirement": "directional tail close, quiet and precise",
        "material_requirement": "rough marker edge, cream/yellow line feel, alpha edge pending review",
        "motion_requirement": "scribble reveal following the machine line, slide out with tail movement",
        "expected_video_fit": "acts as motion/object visual punctuation near the machine line",
        "fallback_if_video_fit_failed": "route_back_to asset_generation_spec / motion_direction_attached",
    },
}


def rel(path: Path) -> str:
    try:
        return str(path.resolve().relative_to(ROOT))
    except ValueError:
        return str(path)


def load_json(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(path)
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def by_id(items: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    return {str(item["asset_need_id"]): item for item in items}


def build_specs(
    visual_plan: dict[str, Any],
    generation_manifest: dict[str, Any],
    alpha_report: dict[str, Any],
) -> list[dict[str, Any]]:
    generation_by_id = by_id(generation_manifest["assets"])
    alpha_by_id = by_id(alpha_report["quality_summary"])
    specs: list[dict[str, Any]] = []
    for need in visual_plan["asset_needs"]:
        asset_need_id = str(need["asset_need_id"])
        rule = SPEC_RULES[asset_need_id]
        generated = generation_by_id[asset_need_id]
        alpha = alpha_by_id[asset_need_id]
        is_fallback = bool(generated.get("supplemental_existing_ali_asset"))
        actual_caption_text = generated.get("caption_text", need["caption_text"])
        if not is_fallback and generated["asset_type"] in {"reaction_sticker", "motion_punctuation"}:
            actual_caption_text = "no_text_expected"
        specs.append(
            {
                "asset_need_id": asset_need_id,
                "time_range": {
                    "start_sec": need["time_range"][0],
                    "end_sec": need["time_range"][1],
                },
                "original_asset_type_from_detection": need["asset_type"],
                "actual_asset_type": generated["asset_type"],
                "original_caption_text_from_detection": need["caption_text"],
                "actual_caption_text": actual_caption_text,
                "reason": need["reason"],
                "video_event": rule["video_event"],
                "video_anchor_source": rule["video_anchor_source"],
                "reference_rule_links": rule["reference_rule_links"],
                "sticker_or_caption_branch": rule["sticker_or_caption_branch"],
                "asset_type": generated["asset_type"],
                "shape_requirement": rule["shape_requirement"],
                "text_requirement": rule["text_requirement"],
                "emotion_requirement": rule["emotion_requirement"],
                "material_requirement": rule["material_requirement"],
                "motion_requirement": rule["motion_requirement"],
                "copy_risk_check": visual_plan["copy_risk_check"],
                "asset_source_status": "provider_arrearage_fallback_existing_ali_asset"
                if is_fallback
                else "auto_probe_generated_asset",
                "supplemental_existing_ali_asset": is_fallback,
                "alpha_path": next(
                    asset["alpha_path"]
                    for asset in load_json(RUNTIME_DIR / "alpha_crop_manifest.json")["assets"]
                    if asset["asset_need_id"] == asset_need_id
                ),
                "alpha_quality": alpha["alpha_quality"],
                "expected_video_fit": rule["expected_video_fit"],
                "fallback_if_generation_failed": "fallback existing Ali asset may test alpha/render only; must not count as original requirement success"
                if is_fallback
                else "block semantic success; provider fallback can only test alpha/render chain",
                "fallback_if_video_fit_failed": rule["fallback_if_video_fit_failed"],
            }
        )
    return specs


def fit_check_for(spec: dict[str, Any], placement: dict[str, Any]) -> dict[str, Any]:
    is_fallback = bool(spec["supplemental_existing_ali_asset"])
    if is_fallback:
        shape_match = "shape_semantic_mismatch_due_to_fallback_asset"
        text_match = "text_semantic_mismatch_due_to_fallback_asset"
        event_match = "event_semantic_mismatch_due_to_fallback_asset"
        judgement = "chain_test_only_regenerate_required"
        overlay_risk = "high_due_to_fallback_mismatch"
        label = "fallback_asset / semantic_mismatch / chain_test_only"
        route = spec["fallback_if_video_fit_failed"] + " / regenerate_when_provider_available"
    else:
        shape_match = "partial_machine_pass_pending_user_review"
        text_match = "machine_pass_pending_user_review"
        event_match = "partial_machine_pass_pending_user_review"
        judgement = "usable_for_pipeline_alignment_candidate_pending_user_review"
        overlay_risk = "medium_pending_user_review"
        label = "generated_asset / pending_video_fit"
        route = spec["fallback_if_video_fit_failed"]

    actual_text = spec["actual_caption_text"]
    if not is_fallback and spec["asset_type"] in {"reaction_sticker", "motion_punctuation"}:
        actual_text = "no_text_expected"

    return {
        "asset_need_id": spec["asset_need_id"],
        "asset_source_status": spec["asset_source_status"],
        "is_supplemental_fallback": is_fallback,
        "original_detection_text": spec["original_caption_text_from_detection"],
        "actual_asset_text": actual_text,
        "shape_match_status": shape_match,
        "text_match_status": text_match,
        "video_event_match_status": event_match,
        "anchor_relation_status": "coordinate_implemented_real_anchor_not_verified",
        "render_coordinate": {
            "x": placement["x"],
            "y": placement["y"],
            "anchor": placement["anchor"],
            "note": "x/y is render implementation coordinate, not the only visual judgement evidence",
        },
        "overlay_float_risk": overlay_risk,
        "caption_blocking_risk": "medium_pending_user_review"
        if is_fallback
        else "low_pending_user_review",
        "subject_blocking_risk": "medium_pending_user_review",
        "final_machine_judgement": judgement,
        "route_back_to": route,
        "machine_review_label": label,
    }


def build_checks(specs: list[dict[str, Any]], placement_plan: dict[str, Any]) -> list[dict[str, Any]]:
    placement_by_id = by_id(placement_plan["placements"])
    return [fit_check_for(spec, placement_by_id[spec["asset_need_id"]]) for spec in specs]


def write_readable_report(
    output_path: Path,
    specs: list[dict[str, Any]],
    checks: list[dict[str, Any]],
) -> None:
    checks_by_id = by_id(checks)
    lines = [
        "# 外部图像资产流程机器自检报告",
        "",
        "status: `machine_fit_check_ready_pending_user_review`",
        "",
        "this_is_partial_pipeline_alignment_candidate_not_full_video_candidate: `true`",
        "",
        "## summary",
        "",
        f"- total_assets: `{len(specs)}`",
        f"- auto_probe_generated_assets: `{sum(1 for item in specs if not item['supplemental_existing_ali_asset'])}`",
        f"- fallback_assets: `{sum(1 for item in specs if item['supplemental_existing_ali_asset'])}`",
        "- technical_validation: `pending_render`",
        "- content_validation: `pending_user_review`",
        "- bgm_beat_map_changed: `false`",
        "- base_color_grade_changed: `false`",
        "",
        "## per_asset_checks",
        "",
    ]
    for spec in specs:
        check = checks_by_id[spec["asset_need_id"]]
        lines.extend(
            [
                f"### {spec['asset_need_id']}",
                "",
                f"- video_event: `{spec['video_event']}`",
                f"- video_anchor_source: `{spec['video_anchor_source']}`",
                f"- asset_source_status: `{spec['asset_source_status']}`",
                f"- original_detection_text: `{check['original_detection_text']}`",
                f"- actual_asset_text: `{check['actual_asset_text']}`",
                f"- shape_match_status: `{check['shape_match_status']}`",
                f"- text_match_status: `{check['text_match_status']}`",
                f"- video_event_match_status: `{check['video_event_match_status']}`",
                f"- anchor_relation_status: `{check['anchor_relation_status']}`",
                f"- final_machine_judgement: `{check['final_machine_judgement']}`",
                f"- route_back_to: `{check['route_back_to']}`",
                "",
            ]
        )
    output_path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--review-dir", type=Path, default=DEFAULT_REVIEW_DIR)
    args = parser.parse_args()

    visual_plan = load_json(RUNTIME_DIR / "visual_asset_need_plan.json")
    generation_manifest = load_json(RUNTIME_DIR / "image_generation_manifest.json")
    alpha_report = load_json(RUNTIME_DIR / "alpha_quality_report.json")
    placement_plan = load_json(RUNTIME_DIR / "remotion_placement_plan.json")

    specs = build_specs(visual_plan, generation_manifest, alpha_report)
    checks = build_checks(specs, placement_plan)

    output_dir = args.review_dir
    output_dir.mkdir(parents=True, exist_ok=True)
    now = int(time.time())
    spec_payload = {
        "status": "asset_generation_spec_ready",
        "generated_at_unix": now,
        "source_files": [
            rel(RUNTIME_DIR / "visual_asset_need_plan.json"),
            rel(RUNTIME_DIR / "image_generation_manifest.json"),
            rel(RUNTIME_DIR / "alpha_quality_report.json"),
            rel(RUNTIME_DIR / "remotion_placement_plan.json"),
        ],
        "this_is_partial_pipeline_alignment_candidate_not_full_video_candidate": True,
        "asset_generation_specs": specs,
    }
    check_payload = {
        "status": "asset_video_fit_check_ready_pending_user_review",
        "generated_at_unix": now,
        "this_is_partial_pipeline_alignment_candidate_not_full_video_candidate": True,
        "checks": checks,
        "do_not_claim": [
            "approved_for_video",
            "publish-ready",
            "video_fixed",
            "vlog_director_capability_verified",
        ],
    }
    write_json(output_dir / "asset_generation_spec.json", spec_payload)
    write_json(output_dir / "asset_video_fit_check.json", check_payload)
    write_readable_report(output_dir / "readable_asset_fit_report.md", specs, checks)

    print(f"wrote {rel(output_dir / 'asset_generation_spec.json')}")
    print(f"wrote {rel(output_dir / 'asset_video_fit_check.json')}")
    print(f"wrote {rel(output_dir / 'readable_asset_fit_report.md')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
