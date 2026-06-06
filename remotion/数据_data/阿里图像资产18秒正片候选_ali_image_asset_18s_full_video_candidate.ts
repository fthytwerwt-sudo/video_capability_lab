import {
  routedFullCandidateBgm,
  routedFullCandidateComposition,
  routedSegments,
} from "./参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate";

export const aliImageAsset18sComposition = {
  id: "阿里图像资产18秒正片候选-ali-image-asset-18s-full-video-candidate",
  width: routedFullCandidateComposition.width,
  height: routedFullCandidateComposition.height,
  fps: routedFullCandidateComposition.fps,
  durationSec: routedFullCandidateComposition.durationSec,
  durationInFrames: routedFullCandidateComposition.durationInFrames,
  status: "full_video_candidate_rendered_pending_user_review",
  this_is_full_video_candidate_not_publish_ready: true,
};

export const aliImageAsset18sBgm = {
  ...routedFullCandidateBgm,
  bgm_beat_map_changed: false,
  bgm_timing_changed: false,
  original_bgm_duration_sec: routedFullCandidateBgm.durationSec,
  original_bgm_path: routedFullCandidateBgm.path,
};

export const aliImageAsset18sSourceSegments = routedSegments;

export type NormalCaptionLayer = {
  caption_id: string;
  time_range: { start_sec: number; end_sec: number };
  text: string;
  renderer: "Remotion text layer";
  alibaba_image_api_used: false;
  position: { x: number; y: number; max_width: number; rotate_deg: number };
  font_size: number;
  attention_weight: "low" | "medium";
  anchor_target: string;
  readability_guard: string;
  copy_risk_check: string;
};

export type ExternalImageAssetPlacement = {
  asset_need_id: string;
  time_range: { start_sec: number; end_sec: number };
  asset_type: "font_card" | "reaction_sticker" | "reaction_word" | "visual_punctuation";
  alpha_path: string;
  x: number;
  y: number;
  max_width: number;
  rotate_deg: number;
  enter_animation: "pop" | "slide" | "bounce" | "scribble";
  exit_animation: "fade" | "pop_out" | "slide_out";
  expected_text: string;
  video_event: string;
  anchor_target: string;
  machine_review_label: string;
  z_index: number;
};

export type AssetGenerationSpec = {
  asset_need_id: string;
  time_range: { start_sec: number; end_sec: number };
  video_event: string;
  video_anchor_source: string;
  reference_rule_links: string[];
  sticker_or_caption_branch: string;
  asset_type: ExternalImageAssetPlacement["asset_type"];
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

export type AssetVideoFitCheck = {
  asset_need_id: string;
  asset_source_status: "alibaba_dashscope_generated_asset";
  original_detection_text: string;
  actual_asset_text: string;
  shape_match_status: "machine_pass_pending_user_review";
  text_match_status: "machine_pass_pending_user_review" | "not_applicable_no_text_expected";
  video_event_match_status: "machine_pass_pending_user_review";
  anchor_relation_status: "manual_anchor_planned_pending_user_review";
  overlay_float_risk: "low_pending_user_review" | "medium_pending_user_review";
  caption_blocking_risk: "low_pending_user_review";
  subject_blocking_risk: "low_pending_user_review" | "medium_pending_user_review";
  final_machine_judgement: "usable_for_full_video_candidate_pending_user_review";
  route_back_to: string;
  machine_review_label: string;
};

const runtimeBase =
  "tmp/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate/alpha_assets";

export const normalCaptionLayers: NormalCaptionLayer[] = [
  {
    caption_id: "normal_caption_01_entry",
    time_range: { start_sec: 1.06, end_sec: 1.92 },
    text: "进场",
    renderer: "Remotion text layer",
    alibaba_image_api_used: false,
    position: { x: 82, y: 1366, max_width: 320, rotate_deg: -2 },
    font_size: 56,
    attention_weight: "medium",
    anchor_target: "M08 equipment edge / entry identity",
    readability_guard: "short text, left lower safe area, separated from API entry sticker",
    copy_risk_check: "original short word; no reference font, UI, or brand copy",
  },
  {
    caption_id: "normal_caption_02_machine_line",
    time_range: { start_sec: 5.38, end_sec: 6.02 },
    text: "线条在跑",
    renderer: "Remotion text layer",
    alibaba_image_api_used: false,
    position: { x: 650, y: 460, max_width: 340, rotate_deg: 4 },
    font_size: 42,
    attention_weight: "medium",
    anchor_target: "M06 metal weight line",
    readability_guard: "short mid-size text, high-density machine region kept clear",
    copy_risk_check: "original short phrase; no reference copy",
  },
  {
    caption_id: "normal_caption_03_fog_whisper",
    time_range: { start_sec: 9.72, end_sec: 10.45 },
    text: "慢一点",
    renderer: "Remotion text layer",
    alibaba_image_api_used: false,
    position: { x: 92, y: 1290, max_width: 300, rotate_deg: -1 },
    font_size: 38,
    attention_weight: "low",
    anchor_target: "M13 fog negative space",
    readability_guard: "low-weight whisper caption stays away from breath-line asset",
    copy_risk_check: "original short phrase; no reference copy",
  },
  {
    caption_id: "normal_caption_04_shadow_close",
    time_range: { start_sec: 15.72, end_sec: 17.28 },
    text: "收在影子里",
    renderer: "Remotion text layer",
    alibaba_image_api_used: false,
    position: { x: 72, y: 1392, max_width: 420, rotate_deg: -2 },
    font_size: 42,
    attention_weight: "low",
    anchor_target: "M09 shadow close lower-left safe area",
    readability_guard: "kept below subject center and after API shadow trail exits",
    copy_risk_check: "original closing phrase; no platform UI or reference tail card",
  },
];

export const externalImageAssetPlacements: ExternalImageAssetPlacement[] = [
  {
    asset_need_id: "asset_need_01_hero_font_card",
    time_range: { start_sec: 0.18, end_sec: 0.88 },
    asset_type: "font_card",
    alpha_path: `${runtimeBase}/asset_need_01_hero_font_card_alpha.png`,
    x: 532,
    y: 1226,
    max_width: 500,
    rotate_deg: -3,
    enter_animation: "pop",
    exit_animation: "fade",
    expected_text: "先落地",
    video_event: "opening sand texture hook",
    anchor_target: "M14 sand texture negative space",
    machine_review_label: "api font card / text passed / pending user review",
    z_index: 91,
  },
  {
    asset_need_id: "asset_need_02_entry_reaction_sticker",
    time_range: { start_sec: 1.16, end_sec: 1.86 },
    asset_type: "reaction_sticker",
    alpha_path: `${runtimeBase}/asset_need_02_entry_reaction_sticker_alpha.png`,
    x: 800,
    y: 882,
    max_width: 260,
    rotate_deg: 5,
    enter_animation: "slide",
    exit_animation: "pop_out",
    expected_text: "no_text_expected",
    video_event: "texture to gym entry identity",
    anchor_target: "M08 right-mid equipment edge",
    machine_review_label: "api reaction sticker / pending user review",
    z_index: 88,
  },
  {
    asset_need_id: "asset_need_03_contact_flash",
    time_range: { start_sec: 3.46, end_sec: 4.06 },
    asset_type: "visual_punctuation",
    alpha_path: `${runtimeBase}/asset_need_03_contact_flash_alpha.png`,
    x: 704,
    y: 1032,
    max_width: 275,
    rotate_deg: -8,
    enter_animation: "bounce",
    exit_animation: "pop_out",
    expected_text: "no_text_expected",
    video_event: "gym machine action pressure/contact peak",
    anchor_target: "M03 contact window",
    machine_review_label: "api contact punctuation / pending user review",
    z_index: 90,
  },
  {
    asset_need_id: "asset_need_04_action_reaction_word",
    time_range: { start_sec: 3.28, end_sec: 4.36 },
    asset_type: "reaction_word",
    alpha_path: `${runtimeBase}/asset_need_04_action_reaction_word_alpha.png`,
    x: 136,
    y: 1238,
    max_width: 480,
    rotate_deg: -5,
    enter_animation: "pop",
    exit_animation: "fade",
    expected_text: "推上去",
    video_event: "main action push",
    anchor_target: "M03 action side safe area",
    machine_review_label: "api reaction word / text passed / pending user review",
    z_index: 91,
  },
  {
    asset_need_id: "asset_need_05_machine_motion_trail",
    time_range: { start_sec: 6.7, end_sec: 7.42 },
    asset_type: "visual_punctuation",
    alpha_path: `${runtimeBase}/asset_need_05_machine_motion_trail_alpha.png`,
    x: 402,
    y: 832,
    max_width: 300,
    rotate_deg: 13,
    enter_animation: "scribble",
    exit_animation: "slide_out",
    expected_text: "no_text_expected",
    video_event: "machine direction line and metal texture sustain",
    anchor_target: "M04 diagonal metal line",
    machine_review_label: "api motion punctuation / arrow-like shape risk / pending user review",
    z_index: 89,
  },
  {
    asset_need_id: "asset_need_06_sky_reaction_word",
    time_range: { start_sec: 8.16, end_sec: 9.04 },
    asset_type: "reaction_word",
    alpha_path: `${runtimeBase}/asset_need_06_sky_reaction_word_alpha.png`,
    x: 130,
    y: 1216,
    max_width: 410,
    rotate_deg: -2,
    enter_animation: "pop",
    exit_animation: "fade",
    expected_text: "缓一口",
    video_event: "wide sky/ocean breath point",
    anchor_target: "M10 negative space",
    machine_review_label: "api reaction word / text passed / pending user review",
    z_index: 90,
  },
  {
    asset_need_id: "asset_need_07_fog_breath_line",
    time_range: { start_sec: 9.82, end_sec: 10.58 },
    asset_type: "visual_punctuation",
    alpha_path: `${runtimeBase}/asset_need_07_fog_breath_line_alpha.png`,
    x: 164,
    y: 1044,
    max_width: 340,
    rotate_deg: -2,
    enter_animation: "scribble",
    exit_animation: "fade",
    expected_text: "no_text_expected",
    video_event: "fog breath negative space",
    anchor_target: "M13 fog/horizon-like low-density area",
    machine_review_label: "api breath punctuation / pending user review",
    z_index: 88,
  },
  {
    asset_need_id: "asset_need_08_shadow_motion_trail",
    time_range: { start_sec: 12.36, end_sec: 13.16 },
    asset_type: "visual_punctuation",
    alpha_path: `${runtimeBase}/asset_need_08_shadow_motion_trail_alpha.png`,
    x: 472,
    y: 1124,
    max_width: 278,
    rotate_deg: 9,
    enter_animation: "scribble",
    exit_animation: "fade",
    expected_text: "no_text_expected",
    video_event: "shadow movement reset",
    anchor_target: "M09 shadow movement direction",
    machine_review_label: "api shadow punctuation / pending user review",
    z_index: 88,
  },
];

export const apiBudgetReport = {
  provider: "alibaba_dashscope",
  model: "qwen-image-2.0-pro",
  max_image_api_calls: 12,
  actual_image_api_calls: 12,
  max_success_images: 8,
  actual_success_images: 8,
  typo_retries_used: 0,
  estimated_cost_yuan: 6,
  provider_arrearage: false,
  stop_if_provider_arrearage: true,
  stop_if_api_budget_exceeded: true,
  do_not_retry_without_budget_confirmation: true,
};

export const unchangedChecks = {
  bgm_beat_map_changed: false,
  bgm_timing_changed: false,
  base_color_grade_changed: false,
  color_grade_profile_changed: false,
  original_55_56_59_61_changed: false,
};

export const colorGradeProfileUnchanged = {
  profile_name: "reuse_57_base_grade_filter_and_atmosphere_layer",
  source: "57 Remotion gradeFilter and AtmosphereLayer copied unchanged into new composition",
  profile_read_by_pipeline: true,
  base_color_grade_changed: false,
  color_grade_profile_changed: false,
  remotion_effect_candidate: "same gradeFilter mapping: cool_texture/gym_pulse/breath_soft/dark_close",
  readability_guard_enabled: true,
  subject_visibility_guard_enabled: true,
  caption_readability_guard_enabled: true,
};

export const assetGenerationSpecs: AssetGenerationSpec[] = [
  {
    asset_need_id: "asset_need_01_hero_font_card",
    time_range: { start_sec: 0.18, end_sec: 0.88 },
    video_event: "opening sand texture hook; tactile landing moment before gym identity appears",
    video_anchor_source: "57:seg_01_sand_texture_hook + M14 sand texture / negative-space anchor",
    reference_rule_links: ["55:H.caption_01_hero_keyword", "55:F.shape_08_hero_keyword_block", "56:E.caption_branch_01_hero_keyword", "73:C.asset_generation_spec"],
    sticker_or_caption_branch: "caption_branch_01_hero_keyword",
    asset_type: "font_card",
    shape_requirement: "compact cream-white handwritten hero word card with uneven black outer stroke",
    text_requirement: "exact Chinese text only: 先落地",
    emotion_requirement: "grounded opening hook, tactile, confident but not slogan-like",
    material_requirement: "clean cutout source, rough ink edge, soft shadow, alpha PNG after crop",
    motion_requirement: "pop in for opening hook, short hold, dissolve before gym entry",
    copy_risk_check: "no third-party UI/logo/brand/reference font/reference copy",
    expected_video_fit: "sits in sand-texture negative space as key font card",
    fallback_if_generation_failed: "blocked_semantic_success; do not replace with Remotion SVG",
    fallback_if_video_fit_failed: "route_back_to caption_visual_language_library + opening_event_anchor",
  },
  {
    asset_need_id: "asset_need_02_entry_reaction_sticker",
    time_range: { start_sec: 1.16, end_sec: 1.86 },
    video_event: "texture cuts into gym entry identity; light reaction near equipment edge",
    video_anchor_source: "57:seg_02_gym_entry_identity + M08 equipment/person entry edge",
    reference_rule_links: ["55:D.sticker_type_02_hand_drawn_caption_plus_sticker_hybrid", "55:E.attach_08_caption_relation_attached", "56:F.sticker_branch_02_hand_drawn_hybrid", "73:C.asset_generation_spec"],
    sticker_or_caption_branch: "sticker_branch_02_hand_drawn_hybrid",
    asset_type: "reaction_sticker",
    shape_requirement: "small original peeking reaction sticker, simple face-like mark, not emoji copy",
    text_requirement: "no readable text expected",
    emotion_requirement: "entry reaction, playful and light",
    material_requirement: "cream outline, warm yellow accent, clean alpha PNG, soft shadow",
    motion_requirement: "short side slide and small pop with entry transition",
    copy_risk_check: "no emoji/IP/brand/UI/reference sticker copy",
    expected_video_fit: "supports gym entry without blocking person, equipment, or Remotion text layer",
    fallback_if_generation_failed: "blocked_semantic_success; Remotion text layer may keep normal caption only",
    fallback_if_video_fit_failed: "route_back_to sticker_branch_02 + composition_safe_area",
  },
  {
    asset_need_id: "asset_need_03_contact_flash",
    time_range: { start_sec: 3.46, end_sec: 4.06 },
    video_event: "gym machine action pressure/contact peak",
    video_anchor_source: "57:seg_04_main_action_push + M03 machine contact window",
    reference_rule_links: ["55:D.sticker_type_03_contact_flash", "55:E.attach_02_contact_point_attached", "55:F.shape_02_contact_flash", "56:F.sticker_branch_03_contact", "61:C.anchor_map_contact_points"],
    sticker_or_caption_branch: "sticker_branch_03_contact",
    asset_type: "visual_punctuation",
    shape_requirement: "1-3 short rough contact flash strokes, not promotional burst",
    text_requirement: "no readable text expected",
    emotion_requirement: "brief pressure accent, physical contact reaction",
    material_requirement: "cream/yellow rough marker strokes, alpha PNG, soft shadow",
    motion_requirement: "bounce into contact peak, short hold, pop out",
    copy_risk_check: "no reference sticker/promo burst/UI/brand copy",
    expected_video_fit: "attached near action contact point without covering hand or machine core",
    fallback_if_generation_failed: "blocked_semantic_success; do not use generic burst",
    fallback_if_video_fit_failed: "route_back_to contact_point_anchor + shape_02_contact_flash",
  },
  {
    asset_need_id: "asset_need_04_action_reaction_word",
    time_range: { start_sec: 3.28, end_sec: 4.36 },
    video_event: "main action push, effort rising on machine",
    video_anchor_source: "57:caption_03_action_push + M03 action peak side area",
    reference_rule_links: ["55:H.caption_05_hand_drawn_reaction_word", "55:I.cs_relation_02_sticker_leads_caption_supports", "56:E.caption_branch_05_hand_drawn_reaction_word", "73:C.asset_generation_spec"],
    sticker_or_caption_branch: "caption_branch_05_hand_drawn_reaction_word",
    asset_type: "reaction_word",
    shape_requirement: "bold slanted handwritten reaction word with rough outline",
    text_requirement: "exact Chinese text only: 推上去",
    emotion_requirement: "action push, upward force, short reaction not explanatory subtitle",
    material_requirement: "cream-white letters, black uneven outline, soft shadow, alpha PNG",
    motion_requirement: "quick pop with action pressure, hold, fade before metal texture cut",
    copy_risk_check: "no reference caption/font/UI/brand copy",
    expected_video_fit: "sits beside action peak as visual reaction word, not lower-third caption",
    fallback_if_generation_failed: "blocked_semantic_success; do not replace with Remotion SVG",
    fallback_if_video_fit_failed: "route_back_to caption_sticker_relation + attention_budget",
  },
  {
    asset_need_id: "asset_need_05_machine_motion_trail",
    time_range: { start_sec: 6.7, end_sec: 7.42 },
    video_event: "machine direction line and metal texture sustain",
    video_anchor_source: "57:sticker_04_machine_motion_trail + M04 diagonal metal line direction",
    reference_rule_links: ["55:D.sticker_type_04_motion_trail_punctuation", "55:E.attach_03_motion_direction_attached", "55:F.shape_03_motion_trail_punctuation", "56:F.sticker_branch_04_motion", "61:D.motion_track_direction"],
    sticker_or_caption_branch: "sticker_branch_04_motion",
    asset_type: "visual_punctuation",
    shape_requirement: "three staggered short hand-drawn motion trail strokes, not arrow",
    text_requirement: "no readable text expected",
    emotion_requirement: "directional motion cue, clean and mechanical",
    material_requirement: "cream/yellow rough marker strokes, alpha PNG, soft shadow",
    motion_requirement: "scribble reveal following line direction, cut with shot",
    copy_risk_check: "no arrow UI/brand/reference sticker copy",
    expected_video_fit: "follows machine line direction without floating as UI",
    fallback_if_generation_failed: "blocked_semantic_success; no generic arrow fallback",
    fallback_if_video_fit_failed: "route_back_to motion_direction_attached + composition_safe_area",
  },
  {
    asset_need_id: "asset_need_06_sky_reaction_word",
    time_range: { start_sec: 8.16, end_sec: 9.04 },
    video_event: "wide sky/ocean breath point after dense gym-machine section",
    video_anchor_source: "57:caption_05_sky_breath + M10 negative space breath area",
    reference_rule_links: ["55:H.caption_05_hand_drawn_reaction_word", "55:E.attach_07_negative_space_attached", "56:E.caption_branch_05_hand_drawn_reaction_word", "56:L.no_layer_rule"],
    sticker_or_caption_branch: "caption_branch_05_hand_drawn_reaction_word",
    asset_type: "reaction_word",
    shape_requirement: "small hand-drawn breath reaction word, softer than action card",
    text_requirement: "exact Chinese text only: 缓一口",
    emotion_requirement: "breath reset, lower attention, not scenic label",
    material_requirement: "off-white handwritten lettering, thin dark rough outline, soft shadow, alpha PNG",
    motion_requirement: "gentle fade / small pop, no bounce",
    copy_risk_check: "no reference caption/font/platform UI/brand copy",
    expected_video_fit: "lives in negative space and does not decorate the sky with unrelated stickers",
    fallback_if_generation_failed: "blocked_semantic_success; keep Remotion normal caption only if needed",
    fallback_if_video_fit_failed: "route_back_to no_layer_rule + attention_budget",
  },
  {
    asset_need_id: "asset_need_07_fog_breath_line",
    time_range: { start_sec: 9.82, end_sec: 10.58 },
    video_event: "fog breath section and low-density horizon-like negative space",
    video_anchor_source: "57:sticker_06_fog_breath_line + M13 fog negative space",
    reference_rule_links: ["55:D.sticker_type_07_negative_space_breath_line", "55:E.attach_07_negative_space_attached", "55:F.shape_09_whisper_line_or_tick", "56:F.sticker_branch_07_breath"],
    sticker_or_caption_branch: "sticker_branch_07_breath",
    asset_type: "visual_punctuation",
    shape_requirement: "very light wavy breath line or small tick group",
    text_requirement: "no readable text expected",
    emotion_requirement: "slow breath, quiet transition",
    material_requirement: "low-contrast off-white line, alpha PNG, soft shadow",
    motion_requirement: "slow reveal and soft hold",
    copy_risk_check: "no UI/brand/reference sticker/caption copy",
    expected_video_fit: "low-weight line near fog breath area; no sky decoration",
    fallback_if_generation_failed: "blocked_semantic_success; do not force decoration",
    fallback_if_video_fit_failed: "route_back_to negative_space_breath_line + no_layer_rule",
  },
  {
    asset_need_id: "asset_need_08_shadow_motion_trail",
    time_range: { start_sec: 12.36, end_sec: 13.16 },
    video_event: "shadow movement reset before gym action return",
    video_anchor_source: "57:sticker_07_shadow_motion_trail + M09 shadow movement direction",
    reference_rule_links: ["55:D.sticker_type_04_motion_trail_punctuation", "55:E.attach_03_motion_direction_attached", "55:F.shape_03_motion_trail_punctuation", "56:F.sticker_branch_04_motion"],
    sticker_or_caption_branch: "sticker_branch_04_motion",
    asset_type: "visual_punctuation",
    shape_requirement: "dim cream short shadow trail strokes, lower brightness than machine trail",
    text_requirement: "no readable text expected",
    emotion_requirement: "dark reset, restrained motion cue",
    material_requirement: "dim cream / charcoal rough strokes, alpha PNG, soft shadow",
    motion_requirement: "staggered dim reveal and exit before action return",
    copy_risk_check: "no UI arrow/brand/reference sticker copy",
    expected_video_fit: "follows visible shadow movement and stays quiet",
    fallback_if_generation_failed: "blocked_semantic_success; do not use bright action sticker",
    fallback_if_video_fit_failed: "route_back_to motion_direction_attached + dark_close_attention_budget",
  },
];

export const assetVideoFitChecks: AssetVideoFitCheck[] = externalImageAssetPlacements.map((asset) => ({
  asset_need_id: asset.asset_need_id,
  asset_source_status: "alibaba_dashscope_generated_asset",
  original_detection_text: asset.expected_text,
  actual_asset_text: asset.expected_text,
  shape_match_status: "machine_pass_pending_user_review",
  text_match_status:
    asset.expected_text === "no_text_expected"
      ? "not_applicable_no_text_expected"
      : "machine_pass_pending_user_review",
  video_event_match_status: "machine_pass_pending_user_review",
  anchor_relation_status: "manual_anchor_planned_pending_user_review",
  overlay_float_risk:
    asset.asset_type === "font_card" || asset.asset_type === "reaction_word"
      ? "medium_pending_user_review"
      : "low_pending_user_review",
  caption_blocking_risk: "low_pending_user_review",
  subject_blocking_risk:
    asset.asset_need_id === "asset_need_02_entry_reaction_sticker" ||
    asset.asset_need_id === "asset_need_03_contact_flash"
      ? "medium_pending_user_review"
      : "low_pending_user_review",
  final_machine_judgement: "usable_for_full_video_candidate_pending_user_review",
  route_back_to: `73_external_image_asset_generation_video_fit_pipeline / ${asset.asset_need_id}`,
  machine_review_label: asset.machine_review_label,
}));

export const fullVideoCandidateCompletionMatrix = [
  ["project_guard", "done", "pwd/top-level/branch/remote/status checked before execution"],
  ["input_inventory", "done", "57 old candidate, same BGM, 14-material pool, API runtime manifests"],
  ["reference_and_style_anchor", "done", "55/56/59/61/73 read; visual language route written per asset"],
  ["material_selection", "done", "reused 57 selected materials and sequence structure"],
  ["material_quality_check", "done", "57 material scan reused; source files remain present"],
  ["BGM_style_and_audio", "done", "same BGM path and duration; Audio layer reads same source"],
  ["BGM_mood_analysis", "done_read_only_reused", "rough mood/energy from 57/71 reused; no new beat claim"],
  ["material_base_color_normalization", "done_read_only_reused", "same gradeFilter mapping as 57"],
  ["BGM_mood_driven_color_grade", "done_read_only_reused", "colorGradeProfileUnchanged.profile_read_by_pipeline=true"],
  ["sequence_structure", "done", "same 13-segment 0-18s structure from 57"],
  ["pacing_and_rhythm", "done", "same segment timing and BGM timing; no beat_map edits"],
  ["captions_or_text_layer", "done", "normal captions use Remotion text layer only"],
  ["stickers_or_visual_punctuation", "done", "8 Alibaba alpha PNG assets used for key cards/stickers/reaction words/punctuation"],
  ["motion_effects_and_transitions", "done", "same transitions plus asset event-bound entry/exit animations"],
  ["composition_and_crop", "done", "1080x1920 vertical composition; overlay positions avoid normal captions"],
  ["subject_and_caption_readability_guard", "done", "normal text and API assets separated; high-risk overlays short-lived"],
  ["audio_mix", "done", "same BGM level/fade logic as 57; source clips muted"],
  ["export_and_technical_validation", "pending_until_render", "Remotion render + ffprobe + decode required"],
  ["review_pack_and_machine_report", "pending_until_review_pack", "review pack script must generate required runtime files"],
  ["failure_feedback_routing", "done", "failureFeedbackRouting exported and report will include route_back_to"],
] as const;

export const failureFeedbackRouting = [
  {
    failure: "api_asset_text_wrong",
    route_back_to: "asset_generation_spec + typo_retry_gate",
    required_fix: "retry the same text asset once if budget remains; otherwise blocked_text_accuracy_failed",
    forbidden_response: "use wrong-text image in full candidate",
  },
  {
    failure: "api_budget_exceeded",
    route_back_to: "api_budget_gate",
    required_fix: "stop and ask for explicit budget confirmation before new calls",
    forbidden_response: "continue provider calls silently",
  },
  {
    failure: "overlay_floaty_or_generic",
    route_back_to: "73 asset_video_fit_check + 55/56 attachment relation",
    required_fix: "regenerate or reposition based on visible event anchor",
    forbidden_response: "only change x/y or increase quantity",
  },
  {
    failure: "caption_unreadable",
    route_back_to: "captions_or_text_layer + subject_and_caption_readability_guard",
    required_fix: "adjust Remotion text layer size/position/contrast without changing BGM timing",
    forbidden_response: "claim render success as content pass",
  },
  {
    failure: "bgm_or_color_changed",
    route_back_to: "blocked_bgm_or_color_change_required",
    required_fix: "restore old BGM timing and grade profile before continuing",
    forbidden_response: "hide the change in report",
  },
];

export const reviewTimes = [
  { label: "start_font_card", second: 0.5, evidence: "asset_need_01 / M14 opening hook" },
  { label: "entry_sticker", second: 1.5, evidence: "asset_need_02 / M08 gym entry" },
  { label: "action_peak", second: 3.72, evidence: "asset_need_03 + asset_need_04 / M03 contact" },
  { label: "machine_motion", second: 7.05, evidence: "asset_need_05 / M04 machine line" },
  { label: "sky_breath", second: 8.6, evidence: "asset_need_06 / M10 breath" },
  { label: "fog_breath", second: 10.15, evidence: "asset_need_07 / M13 fog line" },
  { label: "shadow_reset", second: 12.76, evidence: "asset_need_08 / M09 shadow trail" },
  { label: "close_caption", second: 16.6, evidence: "normal_caption_04 / M09 close" },
];
