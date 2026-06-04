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

export type AnchorMapRecord = {
  shot_id: string;
  time_range: TimeRange;
  frame_id: string;
  subject_bbox: BBox;
  contact_points: Array<{ id: string; x: number; y: number; confidence: number }>;
  edge_lines: Array<{ id: string; points: Array<{ x: number; y: number }>; confidence: number }>;
  motion_direction: { dx: number; dy: number; label: string };
  safe_caption_zones: BBox[];
  unsafe_overlay_zones: BBox[];
  confidence: number;
  source_method: "manual" | "opencv" | "mediapipe" | "sam2" | "mixed";
};

export type MotionTrackRecord = {
  track_id: string;
  target_type: string;
  frame_points: Array<{ frame_id: string; time_sec: number; x: number; y: number }>;
  velocity: { px_per_sec: number; dx: number; dy: number };
  direction: string;
  confidence: number;
  failure_frames: string[];
};

export type MaskPlanRecord = {
  mask_id: string;
  time_range: TimeRange;
  foreground_regions: BBox[];
  occlusion_regions: BBox[];
  overlay_allowed_regions: BBox[];
  simulated_occlusion_only: boolean;
  mask_source: "manual" | "opencv" | "mediapipe" | "sam2" | "mixed";
  confidence: number;
};

export type VisualScorecardRecord = {
  caption_reaction_score: number;
  sticker_specificity_score: number;
  anchor_attachment_score: number;
  material_occlusion_score: number;
  motion_event_score: number;
  pass_fail_reason: string;
  evidence_frames: string[];
  required_fix: string[];
  review_status: "pending_user_review" | "passed" | "failed";
};

export const visualPreprocessingComposition = {
  id: "视觉前处理驱动字幕贴纸探针-visual-preprocessing-driven-caption-sticker-probe",
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 90,
  durationSec: 3,
};

export const visualPreprocessingSource = {
  video: "素材/剪辑素材/剪辑/IMG_1350.MOV",
  video_source_start_sec: 0.35,
  bgm: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  bgm_source_start_sec: 3.15,
  source_status: "existing_local_material_only_no_generation_api",
};

export const sampleAnchorMap: AnchorMapRecord[] = [
  {
    shot_id: "micro_action_contact",
    time_range: { start_sec: 0, end_sec: 1.9 },
    frame_id: "frame_00024",
    subject_bbox: { x: 192, y: 530, width: 710, height: 760 },
    contact_points: [
      { id: "machine_pin_contact", x: 680, y: 1038, confidence: 0.72 },
      { id: "bar_edge_contact", x: 606, y: 1118, confidence: 0.68 },
    ],
    edge_lines: [
      {
        id: "right_machine_pillar_edge",
        points: [
          { x: 642, y: 910 },
          { x: 690, y: 1048 },
          { x: 706, y: 1190 },
        ],
        confidence: 0.71,
      },
      {
        id: "lower_bar_top_edge",
        points: [
          { x: 474, y: 1128 },
          { x: 610, y: 1118 },
          { x: 754, y: 1124 },
        ],
        confidence: 0.67,
      },
    ],
    motion_direction: { dx: 0.76, dy: -0.22, label: "push_right_up_then_release" },
    safe_caption_zones: [{ x: 82, y: 1130, width: 500, height: 280 }],
    unsafe_overlay_zones: [
      { x: 220, y: 520, width: 360, height: 520 },
      { x: 720, y: 820, width: 260, height: 450 },
    ],
    confidence: 0.7,
    source_method: "mixed",
  },
];

export const sampleMotionTrack: MotionTrackRecord[] = [
  {
    track_id: "track_machine_pin_contact",
    target_type: "contact_point",
    frame_points: [
      { frame_id: "frame_00012", time_sec: 0.4, x: 654, y: 1058 },
      { frame_id: "frame_00018", time_sec: 0.6, x: 666, y: 1047 },
      { frame_id: "frame_00024", time_sec: 0.8, x: 680, y: 1038 },
      { frame_id: "frame_00030", time_sec: 1.0, x: 690, y: 1034 },
    ],
    velocity: { px_per_sec: 63, dx: 36, dy: -24 },
    direction: "right_up_push",
    confidence: 0.66,
    failure_frames: [],
  },
];

export const sampleMaskPlan: MaskPlanRecord[] = [
  {
    mask_id: "micro_action_contact_mask_plan",
    time_range: { start_sec: 0, end_sec: 1.9 },
    foreground_regions: [{ x: 205, y: 520, width: 610, height: 720 }],
    occlusion_regions: [
      { x: 655, y: 900, width: 120, height: 310 },
      { x: 440, y: 1094, width: 340, height: 92 },
    ],
    overlay_allowed_regions: [
      { x: 82, y: 1130, width: 500, height: 280 },
      { x: 606, y: 950, width: 230, height: 280 },
    ],
    simulated_occlusion_only: true,
    mask_source: "mixed",
    confidence: 0.62,
  },
];

export const sampleVisualScorecard: VisualScorecardRecord = {
  caption_reaction_score: 2,
  sticker_specificity_score: 2,
  anchor_attachment_score: 2,
  material_occlusion_score: 1,
  motion_event_score: 2,
  pass_fail_reason:
    "Toolchain probe only: sample data drives placement, motion and simulated occlusion, but user review is still required.",
  evidence_frames: ["frame_00012", "frame_00024", "frame_00030"],
  required_fix: [
    "Replace manual sample with real OpenCV/MediaPipe/SAM2-derived data before full-candidate use.",
    "Do not claim stable visual understanding from this 2-4s probe.",
  ],
  review_status: "pending_user_review",
};

export const visualPreprocessingProbeChecklist = {
  anchor_map_read_or_sampled: true,
  motion_track_read_or_sampled: true,
  mask_plan_read_or_sampled: true,
  visual_scorecard_read_or_sampled: true,
  remotion_paths_used: true,
  remotion_motion_blur_used: true,
  remotion_effects_used: true,
  this_is_partial_probe_not_full_video_candidate: true,
};
