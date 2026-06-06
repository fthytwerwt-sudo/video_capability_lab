import {
  AutoVisualAssetPlacement,
  autoVisualAssetPlacements,
  autoVisualAssetProbeComposition,
} from "./自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe";

export type AssetSourceStatus =
  | "auto_probe_generated_asset"
  | "provider_arrearage_fallback_existing_ali_asset";

export type MatchStatus =
  | "machine_pass_pending_user_review"
  | "partial_machine_pass_pending_user_review"
  | "text_semantic_mismatch_due_to_fallback_asset"
  | "shape_semantic_mismatch_due_to_fallback_asset"
  | "event_semantic_mismatch_due_to_fallback_asset"
  | "coordinate_implemented_real_anchor_not_verified";

export type ExternalImageAssetGenerationSpec = {
  asset_need_id: string;
  time_range: {
    start_sec: number;
    end_sec: number;
  };
  video_event: string;
  video_anchor_source: string;
  reference_rule_links: string[];
  sticker_or_caption_branch: string;
  asset_type: string;
  shape_requirement: string;
  text_requirement: string;
  emotion_requirement: string;
  material_requirement: string;
  motion_requirement: string;
  copy_risk_check: string;
  expected_video_fit: string;
  fallback_if_generation_failed: string;
  fallback_if_video_fit_failed: string;
};

export type ExternalImageAssetVideoFitCheck = {
  asset_need_id: string;
  asset_source_status: AssetSourceStatus;
  is_supplemental_fallback: boolean;
  original_detection_text: string;
  actual_asset_text: string;
  shape_match_status: MatchStatus;
  text_match_status: MatchStatus;
  video_event_match_status: MatchStatus;
  anchor_relation_status: MatchStatus;
  overlay_float_risk: "low_pending_user_review" | "medium_pending_user_review" | "high_due_to_fallback_mismatch";
  caption_blocking_risk: "low_pending_user_review" | "medium_pending_user_review";
  subject_blocking_risk: "low_pending_user_review" | "medium_pending_user_review";
  final_machine_judgement:
    | "usable_for_pipeline_alignment_candidate_pending_user_review"
    | "chain_test_only_regenerate_required";
  route_back_to: string;
  machine_review_label: string;
};

export type ExternalImageAssetPipelinePlacement = AutoVisualAssetPlacement & {
  machine_review_label: string;
  asset_source_status: AssetSourceStatus;
  final_machine_judgement: ExternalImageAssetVideoFitCheck["final_machine_judgement"];
};

export const externalImageAssetPipelineComposition = {
  id: "外部图像资产流程对齐候选-external-image-asset-pipeline-alignment-candidate",
  width: autoVisualAssetProbeComposition.width,
  height: autoVisualAssetProbeComposition.height,
  fps: autoVisualAssetProbeComposition.fps,
  durationSec: autoVisualAssetProbeComposition.durationSec,
  durationInFrames: autoVisualAssetProbeComposition.durationInFrames,
  sourceVideo: autoVisualAssetProbeComposition.sourceVideo,
  reviewStatus: "pending_user_review",
  status: "external_image_asset_pipeline_alignment_candidate_rendered_pending_user_review",
  thisIsPartialPipelineAlignmentCandidateNotFullVideoCandidate: true,
};

export const externalImageAssetGenerationSpecs: ExternalImageAssetGenerationSpec[] = [
  {
    asset_need_id: "asset_need_01",
    time_range: { start_sec: 0.28, end_sec: 1.05 },
    video_event: "opening low-subject texture landing beat with existing 落地 text cue",
    video_anchor_source:
      "frame_sampling_manifest f0001 0.50s + visual_need_01 + center_lower negative-space anchor",
    reference_rule_links: [
      "55:H.caption_05_hand_drawn_reaction_word",
      "55:F.shape_08_hero_keyword_block",
      "56:E.caption_branch_05_hand_drawn_reaction_word",
      "59:B.frame_review_loop",
    ],
    sticker_or_caption_branch: "caption_branch_05_hand_drawn_reaction_word",
    asset_type: "font_card",
    shape_requirement:
      "cream hand-drawn caption card, uneven outline, compact block growing from the landing text moment",
    text_requirement: "exact Chinese text: 落地",
    emotion_requirement: "grounded opening cue, tactile and light, not a slogan",
    material_requirement: "alpha PNG with preserved rough outline, soft shadow, no watermark/logo/UI",
    motion_requirement: "small pop in, short hold, fade before the next identity transition",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit:
      "reads as a landing caption card near lower center without becoming a fixed lower-third",
    fallback_if_generation_failed:
      "block semantic success; do not replace with unrelated font card except for chain test",
    fallback_if_video_fit_failed: "route_back_to caption_visual_language_library + video_event_anchor",
  },
  {
    asset_need_id: "asset_need_02",
    time_range: { start_sec: 1.28, end_sec: 2.12 },
    video_event: "texture-to-gym entry identity transition with 进场 cue",
    video_anchor_source: "frame_sampling_manifest f0003 1.50s + visual_need_02 + right_mid safe area",
    reference_rule_links: [
      "55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid",
      "55:E.attach_08_caption_relation_attached",
      "56:F.sticker_branch_02_hand_drawn_hybrid",
      "56:G.caption_sticker_conflict_resolver",
    ],
    sticker_or_caption_branch: "sticker_branch_02_hand_drawn_hybrid",
    asset_type: "reaction_sticker",
    shape_requirement:
      "small reaction face / peeking mark, not a copied emoji, sized below subject attention",
    text_requirement: "no readable text expected; supports existing 进场 cue",
    emotion_requirement: "light entry reaction, playful but not random",
    material_requirement: "cream outline, soft shadow, alpha edge pending user review",
    motion_requirement: "short slide from side, quick pop-out with the entry transition",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit: "supports the transition into gym identity without blocking person or equipment",
    fallback_if_generation_failed: "block semantic success; provider fallback may only test alpha/render chain",
    fallback_if_video_fit_failed: "route_back_to sticker_branch_02 + composition_safe_area",
  },
  {
    asset_need_id: "asset_need_03",
    time_range: { start_sec: 3.42, end_sec: 4.18 },
    video_event: "machine action contact / pressure peak around 咔 cue",
    video_anchor_source: "frame_sampling_manifest f0007 3.50s + visual_need_03 + near_object contact window",
    reference_rule_links: [
      "55:D.sticker_type_03_contact_flash",
      "55:E.attach_02_contact_point_attached",
      "55:F.shape_02_contact_flash",
      "56:F.sticker_branch_03_contact",
      "61:C.anchor_map_contact_points",
    ],
    sticker_or_caption_branch: "sticker_branch_03_contact",
    asset_type: "motion_punctuation",
    shape_requirement: "1-3 short cream/yellow contact flash strokes near the pressure point",
    text_requirement: "no readable text expected; visual punctuation supports 咔",
    emotion_requirement: "brief pressure / impact accent, not promotional burst",
    material_requirement: "rough marker edge, small dust texture, alpha edge pending review",
    motion_requirement: "bounce into contact peak, short hold, pop out before follow-up reaction",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit: "feels attached to action contact rather than floating as decorative burst",
    fallback_if_generation_failed: "block semantic success; no unrelated sticker can count as contact flash",
    fallback_if_video_fit_failed: "route_back_to contact_point_anchor + shape_02_contact_flash",
  },
  {
    asset_need_id: "asset_need_04",
    time_range: { start_sec: 4.05, end_sec: 4.78 },
    video_event: "post-contact effort / hold-pressure reaction around 顶住 cue",
    video_anchor_source: "frame_sampling_manifest f0008-f0009 4.00-4.50s + visual_need_04 + left_mid safe area",
    reference_rule_links: [
      "55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid",
      "55:D.sticker_type_09_object_personification_mark",
      "55:I.cs_relation_03_shared_anchor_split_roles",
      "56:F.sticker_branch_02_hand_drawn_hybrid",
      "59:C.visual_scorecard",
    ],
    sticker_or_caption_branch: "sticker_branch_02_hand_drawn_hybrid",
    asset_type: "reaction_sticker",
    shape_requirement:
      "small effort reaction face, visually different from entry sticker, not oversized emoji",
    text_requirement: "no readable text expected; supports 顶住 pressure cue",
    emotion_requirement: "strain / hold / awkward effort",
    material_requirement: "thick cream outline, soft shadow, alpha edge pending review",
    motion_requirement: "quick pop with small hold, fade after pressure reaction",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit: "adds effort reaction without covering contact point or duplicating asset_need_03",
    fallback_if_generation_failed: "block semantic success; fallback can only be chain-test marker",
    fallback_if_video_fit_failed: "route_back_to caption_sticker_relation + attention_budget",
  },
  {
    asset_need_id: "asset_need_05",
    time_range: { start_sec: 5.12, end_sec: 6.08 },
    video_event: "metal texture reset section where attention should return to line direction",
    video_anchor_source: "frame_sampling_manifest f0010-f0012 5.00-6.00s + visual_need_05 + right_mid line texture",
    reference_rule_links: [
      "55:H.caption_02_attached_phrase",
      "55:D.sticker_type_04_motion_trail_punctuation",
      "55:E.attach_03_motion_direction_attached",
      "56:E.caption_branch_02_attached_phrase",
      "61:D.motion_track_direction",
    ],
    sticker_or_caption_branch: "caption_branch_02_attached_phrase",
    asset_type: "caption_card",
    shape_requirement: "compact line-direction card with small underline, attached to metal line direction",
    text_requirement: "exact Chinese text: 顺线",
    emotion_requirement: "reset / directional guidance, calm and functional",
    material_requirement: "alpha card should stay legible over dense metal texture",
    motion_requirement: "side slide, short hold, fade before tail label",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit: "guides viewer attention along machine line direction",
    fallback_if_generation_failed:
      "fallback existing Ali asset may test alpha/render only; must not count as original requirement success",
    fallback_if_video_fit_failed: "route_back_to asset_generation_spec / ali_asset_request",
  },
  {
    asset_need_id: "asset_need_06",
    time_range: { start_sec: 6.58, end_sec: 7.72 },
    video_event: "tail machine direction-line close where visual punctuation should collect motion",
    video_anchor_source: "frame_sampling_manifest f0013-f0015 6.50-7.50s + visual_need_06 + near_object line direction",
    reference_rule_links: [
      "55:D.sticker_type_04_motion_trail_punctuation",
      "55:E.attach_03_motion_direction_attached",
      "55:F.shape_03_motion_trail_punctuation",
      "56:F.sticker_branch_04_motion",
      "61:D.motion_track_direction",
    ],
    sticker_or_caption_branch: "sticker_branch_04_motion",
    asset_type: "object_label",
    shape_requirement: "two short hand-drawn strokes plus tiny object label, not an arrow",
    text_requirement: "original detection text: 线走这边; generated asset should not display unrelated words",
    emotion_requirement: "directional tail close, quiet and precise",
    material_requirement: "rough marker edge, cream/yellow line feel, alpha edge pending review",
    motion_requirement: "scribble reveal following the machine line, slide out with tail movement",
    copy_risk_check: "passed_no_third_party_ui_logo_brand_original_font_or_reference_copy",
    expected_video_fit: "acts as motion/object visual punctuation near the machine line",
    fallback_if_generation_failed:
      "fallback existing Ali asset may test alpha/render only; must not count as original requirement success",
    fallback_if_video_fit_failed: "route_back_to asset_generation_spec / motion_direction_attached",
  },
];

export const externalImageAssetVideoFitChecks: ExternalImageAssetVideoFitCheck[] = [
  {
    asset_need_id: "asset_need_01",
    asset_source_status: "auto_probe_generated_asset",
    is_supplemental_fallback: false,
    original_detection_text: "落地",
    actual_asset_text: "落地",
    shape_match_status: "partial_machine_pass_pending_user_review",
    text_match_status: "machine_pass_pending_user_review",
    video_event_match_status: "partial_machine_pass_pending_user_review",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "medium_pending_user_review",
    caption_blocking_risk: "low_pending_user_review",
    subject_blocking_risk: "low_pending_user_review",
    final_machine_judgement: "usable_for_pipeline_alignment_candidate_pending_user_review",
    route_back_to: "user_review_then_caption_visual_language_library_if_floaty",
    machine_review_label: "generated_asset / pending_video_fit",
  },
  {
    asset_need_id: "asset_need_02",
    asset_source_status: "auto_probe_generated_asset",
    is_supplemental_fallback: false,
    original_detection_text: "进场",
    actual_asset_text: "no_text_expected",
    shape_match_status: "partial_machine_pass_pending_user_review",
    text_match_status: "machine_pass_pending_user_review",
    video_event_match_status: "partial_machine_pass_pending_user_review",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "medium_pending_user_review",
    caption_blocking_risk: "low_pending_user_review",
    subject_blocking_risk: "medium_pending_user_review",
    final_machine_judgement: "usable_for_pipeline_alignment_candidate_pending_user_review",
    route_back_to: "sticker_branch_02_and_composition_safe_area_if_subject_blocked",
    machine_review_label: "generated_asset / pending_video_fit",
  },
  {
    asset_need_id: "asset_need_03",
    asset_source_status: "auto_probe_generated_asset",
    is_supplemental_fallback: false,
    original_detection_text: "咔",
    actual_asset_text: "no_text_expected",
    shape_match_status: "partial_machine_pass_pending_user_review",
    text_match_status: "machine_pass_pending_user_review",
    video_event_match_status: "partial_machine_pass_pending_user_review",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "medium_pending_user_review",
    caption_blocking_risk: "low_pending_user_review",
    subject_blocking_risk: "medium_pending_user_review",
    final_machine_judgement: "usable_for_pipeline_alignment_candidate_pending_user_review",
    route_back_to: "contact_point_anchor_and_shape_02_if_floaty",
    machine_review_label: "generated_asset / pending_video_fit",
  },
  {
    asset_need_id: "asset_need_04",
    asset_source_status: "auto_probe_generated_asset",
    is_supplemental_fallback: false,
    original_detection_text: "顶住",
    actual_asset_text: "no_text_expected",
    shape_match_status: "partial_machine_pass_pending_user_review",
    text_match_status: "machine_pass_pending_user_review",
    video_event_match_status: "partial_machine_pass_pending_user_review",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "medium_pending_user_review",
    caption_blocking_risk: "low_pending_user_review",
    subject_blocking_risk: "medium_pending_user_review",
    final_machine_judgement: "usable_for_pipeline_alignment_candidate_pending_user_review",
    route_back_to: "caption_sticker_relation_and_attention_budget_if_reaction_random",
    machine_review_label: "generated_asset / pending_video_fit",
  },
  {
    asset_need_id: "asset_need_05",
    asset_source_status: "provider_arrearage_fallback_existing_ali_asset",
    is_supplemental_fallback: true,
    original_detection_text: "顺线",
    actual_asset_text: "没感觉",
    shape_match_status: "shape_semantic_mismatch_due_to_fallback_asset",
    text_match_status: "text_semantic_mismatch_due_to_fallback_asset",
    video_event_match_status: "event_semantic_mismatch_due_to_fallback_asset",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "high_due_to_fallback_mismatch",
    caption_blocking_risk: "medium_pending_user_review",
    subject_blocking_risk: "medium_pending_user_review",
    final_machine_judgement: "chain_test_only_regenerate_required",
    route_back_to: "asset_generation_spec / ali_asset_request / regenerate_when_provider_available",
    machine_review_label: "fallback_asset / semantic_mismatch / chain_test_only",
  },
  {
    asset_need_id: "asset_need_06",
    asset_source_status: "provider_arrearage_fallback_existing_ali_asset",
    is_supplemental_fallback: true,
    original_detection_text: "线走这边",
    actual_asset_text: "没感觉",
    shape_match_status: "shape_semantic_mismatch_due_to_fallback_asset",
    text_match_status: "text_semantic_mismatch_due_to_fallback_asset",
    video_event_match_status: "event_semantic_mismatch_due_to_fallback_asset",
    anchor_relation_status: "coordinate_implemented_real_anchor_not_verified",
    overlay_float_risk: "high_due_to_fallback_mismatch",
    caption_blocking_risk: "medium_pending_user_review",
    subject_blocking_risk: "medium_pending_user_review",
    final_machine_judgement: "chain_test_only_regenerate_required",
    route_back_to: "asset_generation_spec / motion_direction_attached / regenerate_when_provider_available",
    machine_review_label: "fallback_asset / semantic_mismatch / chain_test_only",
  },
];

export const externalImageAssetPipelinePlacements: ExternalImageAssetPipelinePlacement[] =
  autoVisualAssetPlacements.map((placement) => {
    const fitCheck = externalImageAssetVideoFitChecks.find(
      (item) => item.asset_need_id === placement.asset_need_id
    );
    if (!fitCheck) {
      throw new Error(`missing fit check for ${placement.asset_need_id}`);
    }
    return {
      ...placement,
      machine_review_label: fitCheck.machine_review_label,
      asset_source_status: fitCheck.asset_source_status,
      final_machine_judgement: fitCheck.final_machine_judgement,
    };
  });

export const externalImageAssetPipelineSummary = {
  this_is_partial_pipeline_alignment_candidate_not_full_video_candidate: true,
  total_assets: externalImageAssetPipelinePlacements.length,
  auto_probe_generated_assets: externalImageAssetVideoFitChecks.filter(
    (item) => item.asset_source_status === "auto_probe_generated_asset"
  ).length,
  fallback_assets: externalImageAssetVideoFitChecks.filter((item) => item.is_supplemental_fallback).length,
  technical_validation: "pending_render_and_ffprobe",
  content_validation: "pending_user_review",
  bgm_beat_map_changed: false,
  base_color_grade_changed: false,
  do_not_claim: [
    "full_video_candidate",
    "publish-ready",
    "video_fixed",
    "approved_for_video",
    "vlog_director_capability_verified",
  ],
};
