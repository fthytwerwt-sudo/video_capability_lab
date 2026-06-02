export type ProbePhase = "start" | "mid" | "exit";

export type ShapeGrammar =
  | "contact_spark"
  | "half_ring_peek_mark"
  | "short_stroke_cluster";

export type StickerOptionProbe = {
  optionId: string;
  sourceEventId: string;
  sourceFrame: string;
  sourceFramePath: string;
  attachmentRelation: string;
  shapeGrammar: ShapeGrammar;
  badPatternAvoided: string[];
  anchor: {
    x: number;
    y: number;
  };
  backgroundTransform: {
    scale: number;
    y: number;
  };
  labelOffset: {
    x: number;
    y: number;
  };
  strokeOutline: string;
  scaleDistance: string;
  reactionMotionSignature: string;
  materialCompositing: string;
  localProbeQuestion: string;
};

export const selectedStickerOptionsProbeComposition = {
  id: "选定贴纸方案小范围探针-selected-sticker-options-probe",
  width: 1080,
  height: 1920,
  fps: 30,
  optionDurationFrames: 36,
  startFrameOffset: 5,
  midFrameOffset: 18,
  exitFrameOffset: 31,
};

export const selectedStickerOptionProbes: StickerOptionProbe[] = [
  {
    optionId: "shot_05_option_A",
    sourceEventId: "shot_05_panda_bite_tag",
    sourceFrame: "source_frames/shot_05_panda_bite_tag_mid_10.26s.jpg",
    sourceFramePath:
      "tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_05_panda_bite_tag_mid_10.26s.jpg",
    attachmentRelation: "contact_point_attached",
    shapeGrammar: "contact_spark",
    badPatternAvoided: [
      "bad_rectangle_paper_tag",
      "bad_floating_ui_overlay",
      "bad_caption_duplicate_sticker",
    ],
    anchor: { x: 438, y: 1392 },
    backgroundTransform: { scale: 1.062, y: -3 },
    labelOffset: { x: 46, y: -88 },
    strokeOutline:
      "soft_double_outline_with_irregular_outer_white_and_warm_inner_edge",
    scaleDistance:
      "micro_reaction_mark_occupies_about_7_percent_width_and_sits_within_24px_of_bite_contact",
    reactionMotionSignature:
      "pop_from_contact_then_one_frame_compress_and_small_exit_fade",
    materialCompositing:
      "slightly_translucent_marker_fill_with_soft_shadow_and_low_opacity_noise",
    localProbeQuestion:
      "咬合触点是否比矩形说明牌更像从嘴和竹子之间冒出的反应。",
  },
  {
    optionId: "shot_03_option_A",
    sourceEventId: "shot_03_bamboo_hide_circle",
    sourceFrame: "source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg",
    sourceFramePath:
      "tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg",
    attachmentRelation: "reveal_boundary_attached",
    shapeGrammar: "half_ring_peek_mark",
    badPatternAvoided: [
      "bad_full_circle_annotation",
      "bad_object_detector_box",
      "bad_template_marker",
    ],
    anchor: { x: 582, y: 932 },
    backgroundTransform: { scale: 1.11, y: 2 },
    labelOffset: { x: 72, y: -126 },
    strokeOutline:
      "broken_double_outline_with_pressure_variation_and_unclosed_ends",
    scaleDistance:
      "partial_ring_tracks_only_the_reveal_edge_and_avoids_enclosing_empty_leaf_area",
    reactionMotionSignature:
      "draw_on_along_occlusion_edge_then_hold_as_peek_accent_then_taper_out",
    materialCompositing:
      "cream_marker_fill_with_hand_cut_edge_shadow_and_subtle_paper_grain",
    localProbeQuestion:
      "半环是否只附着在显露边界，而不是回到完整圈注。",
  },
  {
    optionId: "shot_03_option_B",
    sourceEventId: "shot_03_bamboo_hide_circle",
    sourceFrame: "source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg",
    sourceFramePath:
      "tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_03_bamboo_hide_circle_mid_7.38s.jpg",
    attachmentRelation: "edge_attached",
    shapeGrammar: "short_stroke_cluster",
    badPatternAvoided: [
      "bad_full_circle_annotation",
      "bad_generic_wave_decoration",
      "bad_template_marker",
    ],
    anchor: { x: 654, y: 917 },
    backgroundTransform: { scale: 1.11, y: 2 },
    labelOffset: { x: 52, y: -104 },
    strokeOutline:
      "rounded_short_strokes_with_white_pressure_outline_and_soft_yellow_core",
    scaleDistance:
      "three_edge_ticks_remain_within_12_to_42px_of_leaf_face_boundary",
    reactionMotionSignature:
      "sequential_tick_pop_following_the_edge_then_quick_hold_and_exit",
    materialCompositing:
      "marker_stroke_texture_with_shadow_clipped_close_to_leaf_depth",
    localProbeQuestion:
      "短笔触是否更像贴在叶缘/脸缘的提示，而不是装饰线。",
  },
  {
    optionId: "shot_01_option_B",
    sourceEventId: "shot_01_panda_open_arrow",
    sourceFrame: "source_frames/shot_01_panda_open_arrow_mid_2.92s.jpg",
    sourceFramePath:
      "tmp/选定贴纸方案小范围探针_selected_sticker_options_probe/source_frames/shot_01_panda_open_arrow_mid_2.92s.jpg",
    attachmentRelation: "contact_point_attached",
    shapeGrammar: "contact_spark",
    badPatternAvoided: [
      "bad_standard_arrow",
      "bad_floating_ui_overlay",
      "bad_template_marker",
    ],
    anchor: { x: 420, y: 1286 },
    backgroundTransform: { scale: 1.08, y: -1 },
    labelOffset: { x: 50, y: -96 },
    strokeOutline:
      "small_double_outline_spark_with_irregular_white_cut_edge_and_inner_color",
    scaleDistance:
      "spark_is_smaller_than_original_arrow_and_sits_at_mouth_bamboo_contact",
    reactionMotionSignature:
      "contact_pop_then_tiny_rotation_jitter_and_fast_dissolve",
    materialCompositing:
      "warm_marker_fill_with_soft_contact_shadow_and_low_saturation_edge",
    localProbeQuestion:
      "触点反应是否能替代标准箭头，同时第一眼附属于嘴/竹子接触点。",
  },
];

export const getGlobalFrameForOptionPhase = (
  optionId: string,
  phase: ProbePhase
): number => {
  const optionIndex = selectedStickerOptionProbes.findIndex(
    (option) => option.optionId === optionId
  );

  if (optionIndex < 0) {
    throw new Error(`Unknown sticker option probe: ${optionId}`);
  }

  const phaseOffset =
    phase === "start"
      ? selectedStickerOptionsProbeComposition.startFrameOffset
      : phase === "mid"
        ? selectedStickerOptionsProbeComposition.midFrameOffset
        : selectedStickerOptionsProbeComposition.exitFrameOffset;

  return (
    optionIndex *
      selectedStickerOptionsProbeComposition.optionDurationFrames +
    phaseOffset
  );
};
