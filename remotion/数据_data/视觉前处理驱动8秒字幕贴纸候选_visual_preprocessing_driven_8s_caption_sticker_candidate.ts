export type TimeRange = {
  start_sec: number;
  end_sec: number;
};

export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type SelectedSegment = {
  segment_id: string;
  material_id: string;
  source_path: string;
  time_range: TimeRange;
  source_start_sec: number;
  role:
    | "opening_identity"
    | "scene_identity"
    | "space_bridge"
    | "action_contact"
    | "machine_texture"
    | "return_close";
  visual_reason: string;
  object_position: string;
  scale_start: number;
  scale_end: number;
  y_start: number;
  y_end: number;
  grade: "texture" | "gym" | "machine" | "close";
};

export type AnchorSummary = {
  anchor_id: string;
  shot_id: string;
  frame_id: string;
  source_method: "opencv" | "mixed";
  confidence: number;
  subject_bbox: BBox;
  contact_points: Array<{ point_id: string; x: number; y: number; source_method: string }>;
  safe_caption_zone: BBox;
  edge_path: string;
  use_for: string[];
};

export type MotionTrackSummary = {
  track_id: string;
  target_type: string;
  direction: string;
  confidence: number;
  velocity: { x: number; y: number; magnitude: number };
  frame_points: Array<{ frame_id: string; second: number; x: number; y: number }>;
};

export type MaskPlanSummary = {
  mask_id: string;
  mask_source: string;
  confidence: number;
  simulated_occlusion_only: boolean;
  occlusion_regions: BBox[];
  overlay_allowed_regions: BBox[];
};

export type VisualScorecardSummary = {
  caption_reaction_score: number;
  sticker_specificity_score: number;
  anchor_attachment_score: number;
  material_occlusion_score: number;
  motion_event_score: number;
  pass_fail_reason: string;
  evidence_frames: string[];
  required_fix: string[];
  review_status: "pending_user_review";
};

export type CaptionEvent = {
  caption_id: string;
  text: string;
  time_range: TimeRange;
  caption_type:
    | "opening_keyword"
    | "attached_phrase"
    | "reaction_word"
    | "motion_phrase";
  anchor_from: string;
  position_mode: "anchor_safe_zone" | "contact_reaction" | "edge_attached";
  attention_weight: "high" | "medium" | "low";
  font_style: "hand_drawn_reaction" | "attached_caption";
  template_fallback: false;
};

export type StickerEvent = {
  sticker_id: string;
  time_range: TimeRange;
  sticker_type: "edge_scuff" | "contact_rub" | "motion_trail";
  anchor_from: string;
  motion_from: string;
  mask_from: string;
  shape_grammar: string;
  material_compositing: string;
  motion_signature: string;
  template_fallback: false;
};

export const visualPreprocessing8sComposition = {
  id: "视觉前处理驱动8秒字幕贴纸候选-visual-preprocessing-driven-8s-caption-sticker-candidate",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 8,
  durationInFrames: 240,
};

export const visualPreprocessing8sBgm = {
  path: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  source_start_sec: 3.15,
  level: 0.72,
  fade_in_sec: 0.16,
  fade_out_sec: 0.5,
};

export const selectedSegments: SelectedSegment[] = [
  {
    segment_id: "seg_01_opening_texture_identity",
    material_id: "M14",
    source_path: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    time_range: { start_sec: 0, end_sec: 1.2 },
    source_start_sec: 0.2,
    role: "opening_identity",
    visual_reason: "用沙纹/足迹 texture 做开场触感，但只短停，避免回到旧安全开场。",
    object_position: "50% 50%",
    scale_start: 1.05,
    scale_end: 1.14,
    y_start: 0,
    y_end: -20,
    grade: "texture",
  },
  {
    segment_id: "seg_02_gym_identity_entry",
    material_id: "M08",
    source_path: "素材/剪辑素材/剪辑/IMG_1360.MOV",
    time_range: { start_sec: 1.2, end_sec: 2.55 },
    source_start_sec: 0.14,
    role: "scene_identity",
    visual_reason: "快速把开场 texture 落到 gym 器械/人物身份。",
    object_position: "50% 50%",
    scale_start: 1.16,
    scale_end: 1.08,
    y_start: 12,
    y_end: -18,
    grade: "gym",
  },
  {
    segment_id: "seg_03_space_bridge",
    material_id: "M05",
    source_path: "素材/剪辑素材/剪辑/IMG_1353.MOV",
    time_range: { start_sec: 2.55, end_sec: 3.3 },
    source_start_sec: 0.45,
    role: "space_bridge",
    visual_reason: "用短空间镜头补足环境，不让动作镜头孤立。",
    object_position: "51% 50%",
    scale_start: 1.18,
    scale_end: 1.1,
    y_start: 10,
    y_end: -10,
    grade: "gym",
  },
  {
    segment_id: "seg_04_action_contact",
    material_id: "M03",
    source_path: "素材/剪辑素材/剪辑/IMG_1350.MOV",
    time_range: { start_sec: 3.3, end_sec: 4.9 },
    source_start_sec: 0.35,
    role: "action_contact",
    visual_reason: "主动作发力窗口，最适合检查字幕/贴纸是否跟着锚点和运动方向走。",
    object_position: "50% 50%",
    scale_start: 1.15,
    scale_end: 1.06,
    y_start: 2,
    y_end: -22,
    grade: "gym",
  },
  {
    segment_id: "seg_05_machine_texture_reset",
    material_id: "M06",
    source_path: "素材/剪辑素材/剪辑/IMG_1358.MOV",
    time_range: { start_sec: 4.9, end_sec: 6.4 },
    source_start_sec: 0.7,
    role: "machine_texture",
    visual_reason: "用金属线条和机器纹理作为 reset，继续检验材质融合而不是漂浮贴纸。",
    object_position: "48% 50%",
    scale_start: 1.22,
    scale_end: 1.1,
    y_start: -12,
    y_end: 18,
    grade: "machine",
  },
  {
    segment_id: "seg_06_return_machine_close",
    material_id: "M04",
    source_path: "素材/剪辑素材/剪辑/IMG_1351.MOV",
    time_range: { start_sec: 6.4, end_sec: 8 },
    source_start_sec: 1.05,
    role: "return_close",
    visual_reason: "回到机器方向线，给 motion trail 一个明确收束锚点。",
    object_position: "50% 50%",
    scale_start: 1.18,
    scale_end: 1.08,
    y_start: 16,
    y_end: -18,
    grade: "close",
  },
];

export const visualPreprocessingData = {
  runtime_output_dir:
    "tmp/视觉前处理驱动8秒候选_visual_preprocessing_driven_8s_candidate/",
  anchor_map_summary: {
    anchor_count: 2,
    confidence_values: [0.367, 0.391],
    note: "OpenCV rough anchors; both require human frame review before any full-video use.",
  },
  motion_track_summary: {
    track_count: 1,
    direction: "right",
    confidence: 0.76,
  },
  mask_plan_summary: {
    mask_count: 1,
    confidence: 0.72,
    simulated_occlusion_only: true,
  },
  visual_scorecard_summary: {
    caption_reaction_score: 2,
    sticker_specificity_score: 2,
    anchor_attachment_score: 1,
    material_occlusion_score: 3,
    motion_event_score: 3,
    review_status: "pending_user_review",
    required_fix: ["anchor_confidence_low_manual_frame_review_required"],
  } satisfies VisualScorecardSummary,
};

export const anchorMapSummary: AnchorSummary[] = [
  {
    anchor_id: "anchor_opening_identity",
    shot_id: "opening_identity_anchor",
    frame_id: "f00053",
    source_method: "opencv",
    confidence: 0.367,
    subject_bbox: { x: 72, y: 220, width: 880, height: 1030 },
    contact_points: [
      { point_id: "opening_texture_center", x: 512, y: 980, source_method: "opencv_edge_bbox_center" },
      { point_id: "opening_lower_edge", x: 620, y: 1160, source_method: "opencv_edge_bbox_derived" },
    ],
    safe_caption_zone: { x: 82, y: 1080, width: 520, height: 230 },
    edge_path: "M188 1212 C292 1150 382 1136 492 1176 C590 1213 682 1184 790 1118",
    use_for: ["caption_01_opening", "sticker_01_opening_edge_scuff"],
  },
  {
    anchor_id: "anchor_action_machine",
    shot_id: "action_machine_anchor",
    frame_id: "f00106",
    source_method: "opencv",
    confidence: 0.391,
    subject_bbox: { x: 190, y: 510, width: 720, height: 760 },
    contact_points: [
      { point_id: "machine_pin_contact", x: 680, y: 1038, source_method: "opencv_edge_bbox_center" },
      { point_id: "bar_edge_contact", x: 612, y: 1120, source_method: "opencv_edge_bbox_derived" },
    ],
    safe_caption_zone: { x: 74, y: 1190, width: 520, height: 260 },
    edge_path: "M612 980 C648 1016 678 1050 706 1124 C724 1175 768 1202 824 1210",
    use_for: ["caption_03_contact", "sticker_02_contact_rub", "sticker_03_motion_trail"],
  },
];

export const motionTrackSummary: MotionTrackSummary = {
  track_id: "opencv_lk_median_feature_track_01",
  target_type: "median_good_feature_cluster",
  direction: "right",
  confidence: 0.76,
  velocity: { x: 209.173, y: -16.286, magnitude: 209.806 },
  frame_points: [
    { frame_id: "f00053", second: 1.778, x: 472, y: 1080 },
    { frame_id: "f00106", second: 3.556, x: 602, y: 1062 },
    { frame_id: "f00160", second: 5.333, x: 716, y: 1044 },
    { frame_id: "f00213", second: 7.111, x: 842, y: 1028 },
  ],
};

export const maskPlanSummary: MaskPlanSummary = {
  mask_id: "opencv_motion_diff_mask_01",
  mask_source: "opencv_frame_difference_no_pixel_matting",
  confidence: 0.72,
  simulated_occlusion_only: true,
  occlusion_regions: [
    { x: 190, y: 510, width: 720, height: 760 },
    { x: 610, y: 930, width: 240, height: 330 },
  ],
  overlay_allowed_regions: [
    { x: 82, y: 1080, width: 520, height: 230 },
    { x: 604, y: 910, width: 260, height: 360 },
  ],
};

export const visualScorecardSummary: VisualScorecardSummary = {
  caption_reaction_score: 2,
  sticker_specificity_score: 2,
  anchor_attachment_score: 1,
  material_occlusion_score: 3,
  motion_event_score: 3,
  pass_fail_reason: "toolchain_probe_ready_pending_human_visual_review",
  evidence_frames: ["f00053", "f00080", "f00106", "f00160"],
  required_fix: ["anchor_confidence_low_manual_frame_review_required"],
  review_status: "pending_user_review",
};

export const captionEvents: CaptionEvent[] = [
  {
    caption_id: "caption_01_opening",
    text: "落地",
    time_range: { start_sec: 0.28, end_sec: 1.02 },
    caption_type: "opening_keyword",
    anchor_from: "anchor_opening_identity",
    position_mode: "anchor_safe_zone",
    attention_weight: "medium",
    font_style: "hand_drawn_reaction",
    template_fallback: false,
  },
  {
    caption_id: "caption_02_entry",
    text: "进场",
    time_range: { start_sec: 1.36, end_sec: 2.18 },
    caption_type: "attached_phrase",
    anchor_from: "anchor_opening_identity",
    position_mode: "edge_attached",
    attention_weight: "low",
    font_style: "attached_caption",
    template_fallback: false,
  },
  {
    caption_id: "caption_03_contact",
    text: "咔",
    time_range: { start_sec: 3.48, end_sec: 4.36 },
    caption_type: "reaction_word",
    anchor_from: "anchor_action_machine",
    position_mode: "contact_reaction",
    attention_weight: "medium",
    font_style: "hand_drawn_reaction",
    template_fallback: false,
  },
  {
    caption_id: "caption_04_line_return",
    text: "顺着线走",
    time_range: { start_sec: 6.62, end_sec: 7.58 },
    caption_type: "motion_phrase",
    anchor_from: "anchor_action_machine",
    position_mode: "edge_attached",
    attention_weight: "low",
    font_style: "attached_caption",
    template_fallback: false,
  },
];

export const stickerEvents: StickerEvent[] = [
  {
    sticker_id: "sticker_01_opening_edge_scuff",
    time_range: { start_sec: 0.42, end_sec: 1.05 },
    sticker_type: "edge_scuff",
    anchor_from: "anchor_opening_identity",
    motion_from: "opencv_lk_median_feature_track_01",
    mask_from: "opencv_motion_diff_mask_01",
    shape_grammar: "short rough strokes evolve along the detected opening edge path",
    material_compositing: "low opacity cream stroke plus noise/vignette, no hard UI panel",
    motion_signature: "short draw-in with a two-layer Trail echo",
    template_fallback: false,
  },
  {
    sticker_id: "sticker_02_contact_rub",
    time_range: { start_sec: 3.55, end_sec: 4.38 },
    sticker_type: "contact_rub",
    anchor_from: "anchor_action_machine",
    motion_from: "opencv_lk_median_feature_track_01",
    mask_from: "opencv_motion_diff_mask_01",
    shape_grammar: "contact rub morphs from machine edge path into short pressure scuff",
    material_compositing: "simulated occlusion only; dark multiply patch covers stroke ends",
    motion_signature: "rightward contact flick follows motion_track.direction=right",
    template_fallback: false,
  },
  {
    sticker_id: "sticker_03_machine_motion_trail",
    time_range: { start_sec: 6.55, end_sec: 7.68 },
    sticker_type: "motion_trail",
    anchor_from: "anchor_action_machine",
    motion_from: "opencv_lk_median_feature_track_01",
    mask_from: "opencv_motion_diff_mask_01",
    shape_grammar: "staggered points sampled along the edge path and pushed right by optical flow",
    material_compositing: "thin cream/yellow strokes with blur/dropShadow/noise blend",
    motion_signature: "staggered reveal, short hold, exit before 8s close",
    template_fallback: false,
  },
];

export const doNotClaim = [
  "publish-ready",
  "video_fixed",
  "full_video_candidate_completed",
  "vlog_director_capability_verified",
  "real_occlusion_passed",
];
