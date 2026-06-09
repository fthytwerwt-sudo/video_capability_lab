export type SecondEpisodeShot = {
  shotId: string;
  materialId: string;
  src: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  narrativeRole:
    | "hook"
    | "hook_to_atmosphere"
    | "atmosphere_build"
    | "rhythm_texture"
    | "motion_progression"
    | "emotion_shift"
    | "night_arrival"
    | "night_motion"
    | "ending_aftertaste_setup"
    | "ending_aftertaste";
  musicSection: string;
  moodReason: string;
  visualReason: string;
  cutPointReason: string;
  gradeZone:
    | "day_warm_detail"
    | "day_soft_green"
    | "day_neutral_walk"
    | "shadow_clean"
    | "day_motion"
    | "golden_shift"
    | "night_neon"
    | "night_motion"
    | "night_aftertaste"
    | "shadow_close";
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
  objectPosition: string;
};

export type SecondEpisodeColorGradeProfile = {
  brightness_adjust: number;
  contrast_adjust: number;
  saturation_adjust: number;
  temperature_adjust: number;
  tint_adjust: number;
  shadow_lift: number;
  highlight_rolloff: number;
  vignette_strength: number;
  grain_strength: number;
  ffmpeg_filter_candidate: string;
  remotion_effect_candidate: Record<string, unknown>;
  apply_scope: string;
  readability_guard_enabled: boolean;
  subject_visibility_guard_enabled: boolean;
  caption_readability_guard_enabled: boolean;
  source_bgm_mood_tag: string;
  confidence_score: number;
  fallback_used: boolean;
  fixed_preset_used?: boolean;
  odd_used_as_fixed_preset?: boolean;
  style_boundary?: string;
  sections?: SecondEpisodeAdaptiveColorSection[];
};

export type SecondEpisodeAdaptiveColorSection = {
  section_id: string;
  music_section: string;
  time_range: [number, number];
  frame_range: [number, number];
  brightness_adjust: number;
  contrast_adjust: number;
  saturation_adjust: number;
  temperature_adjust: number;
  tint_adjust: number;
  shadow_lift: number;
  highlight_rolloff: number;
  vignette_strength: number;
  grain_strength: number;
  bgm_signal_source: string;
  material_color_constraint: string;
  section_color_intent: string;
  reason: string;
};

export const secondEpisode16sVlogCandidateComposition = {
  id: "第二期16秒vlog验证候选-second-episode-16s-vlog-validation-candidate",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 16,
  durationInFrames: 480,
  status: "validation_candidate_rendered_pending_user_review",
  thisIsValidationCandidateNotPublishReady: true,
};

export const secondEpisode16sBgm = {
  path: "素材/第二期/第二期 BGM/copy_608DDA69-0BA3-4B72-9053-5C7E402DC98C.MOV",
  level: 0.82,
  fadeInSec: 0.18,
  fadeOutStartSec: 15.25,
  fadeOutDurationSec: 0.75,
};

export const secondEpisodeDefaultColorGradeProfile: SecondEpisodeColorGradeProfile = {
  brightness_adjust: 0.035,
  contrast_adjust: 0.065,
  saturation_adjust: 0.055,
  temperature_adjust: 0.035,
  tint_adjust: -0.008,
  shadow_lift: 0.045,
  highlight_rolloff: 0.08,
  vignette_strength: 0.16,
  grain_strength: 0.07,
  ffmpeg_filter_candidate:
    "eq=brightness=0.035:contrast=1.065:saturation=1.055,curves=preset=lighter",
  remotion_effect_candidate: {
    css_filter_fields: ["brightness_adjust", "contrast_adjust", "saturation_adjust"],
    temperature_overlay_field: "temperature_adjust",
    shadow_lift_field: "shadow_lift",
    highlight_rolloff_field: "highlight_rolloff",
    vignette_strength_field: "vignette_strength",
    grain_strength_field: "grain_strength",
  },
  apply_scope: "entire_candidate_with_segment_bias",
  readability_guard_enabled: true,
  subject_visibility_guard_enabled: true,
  caption_readability_guard_enabled: false,
  source_bgm_mood_tag: "soft_urban_walk_vlog",
  confidence_score: 0.74,
  fallback_used: false,
};

export const secondEpisodeAdaptiveColorGradeProfile: SecondEpisodeColorGradeProfile = {
  brightness_adjust: 0.026,
  contrast_adjust: 0.042,
  saturation_adjust: 0.017,
  temperature_adjust: 0.017,
  tint_adjust: -0.006,
  shadow_lift: 0.043,
  highlight_rolloff: 0.088,
  vignette_strength: 0.128,
  grain_strength: 0.036,
  ffmpeg_filter_candidate:
    "fallback_route_only: eq/curves/colorbalance/lut3d with enable='between(t,start,end)' if Remotion CSS filter is too weak",
  remotion_effect_candidate: {
    apply_mode: "frame_selects_section_profile",
    css_filter_fields: ["brightness_adjust", "contrast_adjust", "saturation_adjust"],
    temperature_overlay_field: "temperature_adjust",
    tint_field: "tint_adjust",
    shadow_lift_field: "shadow_lift",
    highlight_rolloff_field: "highlight_rolloff",
    vignette_strength_field: "vignette_strength",
    grain_strength_field: "grain_strength",
  },
  apply_scope: "per_music_section",
  readability_guard_enabled: true,
  subject_visibility_guard_enabled: true,
  caption_readability_guard_enabled: false,
  source_bgm_mood_tag: "soft_urban_walk_vlog",
  confidence_score: 0.74,
  fallback_used: false,
  fixed_preset_used: false,
  odd_used_as_fixed_preset: false,
  style_boundary:
    "odd/vlog is only a boundary: keep the private unusual diary feeling without turning it into one shared odd color preset.",
  sections: [
    {
      section_id: "adaptive_section_01_0_3s",
      music_section: "0-3s hook",
      time_range: [0, 3],
      frame_range: [0, 90],
      brightness_adjust: 0.025,
      contrast_adjust: 0.035,
      saturation_adjust: 0.025,
      temperature_adjust: 0.02,
      tint_adjust: -0.004,
      shadow_lift: 0.02,
      highlight_rolloff: 0.06,
      vignette_strength: 0.08,
      grain_strength: 0.03,
      bgm_signal_source: "BGM opens lightly before the energy fully spreads.",
      material_color_constraint: "Food highlights and the white dog need protection; avoid strong warm wash.",
      section_color_intent: "Slightly lift the opening while keeping daylight clean and readable.",
      reason:
        "The BGM has a light entry and the material is bright daytime detail, so the grade only nudges lift and contrast while guarding highlights.",
    },
    {
      section_id: "adaptive_section_02_3_7s",
      music_section: "3-7s atmosphere_build",
      time_range: [3, 7],
      frame_range: [90, 210],
      brightness_adjust: 0.025,
      contrast_adjust: 0.045,
      saturation_adjust: 0.015,
      temperature_adjust: 0.015,
      tint_adjust: -0.006,
      shadow_lift: 0.025,
      highlight_rolloff: 0.06,
      vignette_strength: 0.1,
      grain_strength: 0.04,
      bgm_signal_source: "BGM settles into a walking build with one shadow-texture accent.",
      material_color_constraint: "Street daylight and shadow texture should stay neutral; shadow is lifted, not washed out.",
      section_color_intent: "Keep the block neutral, add a little layer separation, and rescue shadows gently.",
      reason:
        "The music is steady rather than dramatic, so the grade increases structure but keeps color temperature close to source daylight.",
    },
    {
      section_id: "adaptive_section_03_7_11s",
      music_section: "7-11s motion_progression_and_shift",
      time_range: [7, 11],
      frame_range: [210, 330],
      brightness_adjust: 0.015,
      contrast_adjust: 0.075,
      saturation_adjust: 0.045,
      temperature_adjust: 0.04,
      tint_adjust: -0.006,
      shadow_lift: 0.035,
      highlight_rolloff: 0.1,
      vignette_strength: 0.12,
      grain_strength: 0.05,
      bgm_signal_source: "BGM energy rises as the walk moves from day motion into golden and night arrival.",
      material_color_constraint: "Golden-hour warmth should remain separated from night signage; do not blow out store highlights.",
      section_color_intent: "Preserve warm shift, increase color separation, and recover highlights.",
      reason:
        "The section is the strongest emotional lift, so contrast and saturation rise, but highlight rolloff protects signs and sunset edges.",
    },
    {
      section_id: "adaptive_section_04_11_14s",
      music_section: "11-14s night_motion",
      time_range: [11, 14],
      frame_range: [330, 420],
      brightness_adjust: 0.045,
      contrast_adjust: 0.035,
      saturation_adjust: 0.02,
      temperature_adjust: 0.015,
      tint_adjust: -0.01,
      shadow_lift: 0.075,
      highlight_rolloff: 0.12,
      vignette_strength: 0.14,
      grain_strength: 0.035,
      bgm_signal_source: "BGM keeps motion tension after the night turn, with more breath in the darker passage.",
      material_color_constraint: "Night crossing needs subject visibility without flattening the dark street.",
      section_color_intent: "Prioritize shadow lift, soften hard contrast, and keep night movement alive.",
      reason:
        "The music is still moving but the material is dark, so shadow lift and highlight control matter more than saturation.",
    },
    {
      section_id: "adaptive_section_05_14_16s",
      music_section: "14-16s ending_aftertaste",
      time_range: [14, 16],
      frame_range: [420, 480],
      brightness_adjust: 0.02,
      contrast_adjust: 0.02,
      saturation_adjust: -0.02,
      temperature_adjust: -0.005,
      tint_adjust: -0.006,
      shadow_lift: 0.06,
      highlight_rolloff: 0.08,
      vignette_strength: 0.2,
      grain_strength: 0.025,
      bgm_signal_source: "BGM fades into aftertaste and breath rather than another energy lift.",
      material_color_constraint: "The personal shadow ending should not be made glossy or overly warm.",
      section_color_intent: "Slightly lower saturation, settle the image, and add vignette breath for the ending.",
      reason:
        "The final musical release asks for restraint: less saturation, mild darkness recovery, and a stronger edge falloff for aftertaste.",
    },
  ],
};

export const secondEpisodeShots: SecondEpisodeShot[] = [
  {
    shotId: "shot_01_food_hook",
    materialId: "M03",
    src: "素材/第二期/第二期素材/IMG_1364.MOV",
    sourceStartSec: 0.18,
    fromSec: 0,
    durationSec: 1.4,
    narrativeRole: "hook",
    musicSection: "0-3s hook",
    moodReason: "BGM 开头能量未完全铺开，适合用近景小物件建立 odd vlog 的私人入口。",
    visualReason: "手持食物、浅景深和街面共同给出可感知的日常事件。",
    cutPointReason: "1.4s 前完成信息识别，随后切到活物/街头以扩大空间。",
    gradeZone: "day_warm_detail",
    scaleStart: 1.18,
    scaleEnd: 1.08,
    yStart: 4,
    yEnd: -14,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_02_dog_walk",
    materialId: "M08",
    src: "素材/第二期/第二期素材/IMG_1371.MOV",
    sourceStartSec: 0.35,
    fromSec: 1.4,
    durationSec: 1.6,
    narrativeRole: "hook_to_atmosphere",
    musicSection: "0-3s hook",
    moodReason: "轻松、明亮、有一点偶遇感，能把开头从物件转向街头生命感。",
    visualReason: "狗和人脚形成自然动线，主体清楚但不刻意表演。",
    cutPointReason: "在狗穿过画面后切出，避免无动作空等。",
    gradeZone: "day_soft_green",
    scaleStart: 1.12,
    scaleEnd: 1.04,
    yStart: 0,
    yEnd: -8,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_03_sidewalk_build",
    materialId: "M02",
    src: "素材/第二期/第二期素材/IMG_1363.MOV",
    sourceStartSec: 0.05,
    fromSec: 3,
    durationSec: 1.6,
    narrativeRole: "atmosphere_build",
    musicSection: "3-7s atmosphere_build",
    moodReason: "音乐进入平稳推进，镜头从特写和偶遇扩到人行道环境。",
    visualReason: "摊位、行人、自行车形成城市街区层次。",
    cutPointReason: "在街区信息建立后切入影子镜头，进入第一处节奏变化。",
    gradeZone: "day_neutral_walk",
    scaleStart: 1.11,
    scaleEnd: 1.04,
    yStart: 10,
    yEnd: -10,
    objectPosition: "50% 52%",
  },
  {
    shotId: "shot_04_shadow_cart",
    materialId: "M06",
    src: "素材/第二期/第二期素材/IMG_1367.MOV",
    sourceStartSec: 0.25,
    fromSec: 4.6,
    durationSec: 1.2,
    narrativeRole: "rhythm_texture",
    musicSection: "3-7s atmosphere_build",
    moodReason: "从街面现实进入更 odd 的主观视角。",
    visualReason: "影子、车筐和地面纹理有强图形关系，适合短切。",
    cutPointReason: "只用 1.2s，承担节奏标点但不加视觉标点图层。",
    gradeZone: "shadow_clean",
    scaleStart: 1.1,
    scaleEnd: 1.03,
    yStart: 6,
    yEnd: -10,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_05_crosswalk_motion",
    materialId: "M10",
    src: "素材/第二期/第二期素材/IMG_1380.MOV",
    sourceStartSec: 1.1,
    fromSec: 5.8,
    durationSec: 2,
    narrativeRole: "motion_progression",
    musicSection: "7-11s motion_progression_and_shift",
    moodReason: "能量略抬升，镜头从小日常进入明确位移。",
    visualReason: "横向道路、行人和交通灯给出城市行动节点。",
    cutPointReason: "在路口动作完成前切到黄昏，制造时间流动。",
    gradeZone: "day_motion",
    scaleStart: 1.13,
    scaleEnd: 1.05,
    yStart: 8,
    yEnd: -12,
    objectPosition: "50% 51%",
  },
  {
    shotId: "shot_06_golden_city_shift",
    materialId: "M11",
    src: "素材/第二期/第二期素材/IMG_1381.MOV",
    sourceStartSec: 0.5,
    fromSec: 7.8,
    durationSec: 2,
    narrativeRole: "emotion_shift",
    musicSection: "7-11s motion_progression_and_shift",
    moodReason: "让白天段落自然走向傍晚，音乐情绪不再只是动作推进。",
    visualReason: "暖光、树和城市背景有明确日落层次。",
    cutPointReason: "在暖色建立后切入夜间店铺，完成昼夜桥接。",
    gradeZone: "golden_shift",
    scaleStart: 1.09,
    scaleEnd: 1.02,
    yStart: 6,
    yEnd: -10,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_07_night_store",
    materialId: "M14",
    src: "素材/第二期/第二期素材/IMG_1385.MOV",
    sourceStartSec: 0.3,
    fromSec: 9.8,
    durationSec: 1.55,
    narrativeRole: "night_arrival",
    musicSection: "7-11s motion_progression_and_shift",
    moodReason: "情绪从白天游走转成夜间逛街的轻微兴奋。",
    visualReason: "灯牌、门头和街面给出明确夜间城市坐标。",
    cutPointReason: "灯牌识别后快速切走，避免素材内招牌喧宾夺主。",
    gradeZone: "night_neon",
    scaleStart: 1.1,
    scaleEnd: 1.03,
    yStart: 6,
    yEnd: -8,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_08_night_crossing",
    materialId: "M18",
    src: "素材/第二期/第二期素材/IMG_1390.MOV",
    sourceStartSec: 0.9,
    fromSec: 11.35,
    durationSec: 1.75,
    narrativeRole: "night_motion",
    musicSection: "11-14s night_motion",
    moodReason: "夜晚段需要继续有人的运动，不让后半只停在店铺景。",
    visualReason: "路口行人和暗部形成轻微电影感。",
    cutPointReason: "在人流通过后切到步行背影，让结尾进入余味。",
    gradeZone: "night_motion",
    scaleStart: 1.12,
    scaleEnd: 1.04,
    yStart: 2,
    yEnd: -12,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_09_walkers_aftertaste",
    materialId: "M15",
    src: "素材/第二期/第二期素材/IMG_1386.MOV",
    sourceStartSec: 2,
    fromSec: 13.1,
    durationSec: 1.55,
    narrativeRole: "ending_aftertaste_setup",
    musicSection: "11-14s night_motion",
    moodReason: "从城市景转回人和路，形成日常结束感。",
    visualReason: "两个人背影和街灯有结尾前的余味。",
    cutPointReason: "步行段后接个人影子，完成从外部城市到个人视角的回收。",
    gradeZone: "night_aftertaste",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 4,
    yEnd: -8,
    objectPosition: "50% 50%",
  },
  {
    shotId: "shot_10_shadow_close",
    materialId: "M01",
    src: "素材/第二期/第二期素材/IMG_1361.MOV",
    sourceStartSec: 3.2,
    fromSec: 14.65,
    durationSec: 1.35,
    narrativeRole: "ending_aftertaste",
    musicSection: "14-16s ending_aftertaste",
    moodReason: "把白天的影子动机回收成结尾，不靠字幕说明。",
    visualReason: "墙面和影子有明确个人视角，适合最后淡出。",
    cutPointReason: "尾部随 BGM fade out 淡出，保留余味。",
    gradeZone: "shadow_close",
    scaleStart: 1.08,
    scaleEnd: 1,
    yStart: 8,
    yEnd: -8,
    objectPosition: "50% 50%",
  },
];
