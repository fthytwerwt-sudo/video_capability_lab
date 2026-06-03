export type FullVideoSegmentRole =
  | "opening_subject_anchor"
  | "space_build"
  | "main_action"
  | "machine_texture"
  | "breath_object"
  | "visual_reset"
  | "mood_outro"
  | "identity_reprise";

export type FullVideoSegment = {
  id: string;
  materialId: string;
  src: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  role: FullVideoSegmentRole;
  bgmRelation: string;
  reason: string;
  risk: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
  objectPosition: string;
};

export type FullVideoCaptionEvent = {
  id: string;
  text: string;
  fromSec: number;
  durationSec: number;
  role: "opening_hook" | "action_focus" | "breath" | "outro";
  x: number;
  y: number;
  status: "draft_text_pending_user_review";
};

export type FullVideoStickerShape =
  | "contact_spark"
  | "short_stroke_cluster"
  | "breath_edge_line";

export type FullVideoStickerEvent = {
  id: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  anchorTarget: string;
  attachmentRelation:
    | "contact_point_attached"
    | "motion_direction_attached"
    | "negative_space_attached";
  shapeGrammar: FullVideoStickerShape;
  visualRole: string;
  sourceMechanism: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  status: "included_partial_pending_user_review";
};

export type FullVideoTransitionEvent = {
  id: string;
  fromSec: number;
  durationSec: number;
  transitionType:
    | "soft_crossfade"
    | "motion_wipe"
    | "texture_flash"
    | "breath_dip";
  fromMaterial: string;
  toMaterial: string;
  whyNeeded: string;
  status: "included";
};

export const fullVideoCandidateComposition = {
  id: "完整正片候选全流程重剪-full-video-candidate-complete-flow-recut",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 18,
  durationInFrames: 540,
};

export const fullVideoCandidateBgm = {
  path: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  level: 0.82,
  fadeInSec: 0.12,
  fadeOutStartSec: 17.35,
  fadeOutDurationSec: 0.65,
};

export const fullVideoCandidateSegments: FullVideoSegment[] = [
  {
    id: "seg_01_gym_identity_open",
    materialId: "M08",
    src: "素材/剪辑素材/剪辑/IMG_1360.MOV",
    sourceStartSec: 0.14,
    fromSec: 0,
    durationSec: 1.7,
    role: "opening_subject_anchor",
    bgmRelation: "intro active pulse, subject-first opening",
    reason: "本轮不沿用 50 的沙纹开场，先用健身房人物/器械建立主线。",
    risk: "可识别人物/自拍语境需用户回审；用短段和下裁降低风险。",
    scaleStart: 1.18,
    scaleEnd: 1.08,
    yStart: 8,
    yEnd: -24,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_02_gym_space_build",
    materialId: "M05",
    src: "素材/剪辑素材/剪辑/IMG_1353.MOV",
    sourceStartSec: 0.2,
    fromSec: 1.7,
    durationSec: 1.45,
    role: "space_build",
    bgmRelation: "intro to rise, scene confirmation",
    reason: "用空间镜头把开头人物锚点落回 gym 环境。",
    risk: "画面倾斜且主体弱，只短用并加轻推进。",
    scaleStart: 1.2,
    scaleEnd: 1.1,
    yStart: 16,
    yEnd: -18,
    objectPosition: "51% 50%",
  },
  {
    id: "seg_03_main_action_first",
    materialId: "M03",
    src: "素材/剪辑素材/剪辑/IMG_1350.MOV",
    sourceStartSec: 0.25,
    fromSec: 3.15,
    durationSec: 2.1,
    role: "main_action",
    bgmRelation: "rise hits first clear action window",
    reason: "把主动作前移，避免只做素材铺陈。",
    risk: "器械遮挡明显，贴纸只做触点标点，不长时间抢主体。",
    scaleStart: 1.16,
    scaleEnd: 1.05,
    yStart: 2,
    yEnd: -20,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_04_short_machine_cut",
    materialId: "M06",
    src: "素材/剪辑素材/剪辑/IMG_1358.MOV",
    sourceStartSec: 0.64,
    fromSec: 5.25,
    durationSec: 1.15,
    role: "machine_texture",
    bgmRelation: "action texture accent",
    reason: "用金属线条做短促机械节奏，不平均分配素材时长。",
    risk: "主体弱，必须短切。",
    scaleStart: 1.22,
    scaleEnd: 1.1,
    yStart: -12,
    yEnd: 18,
    objectPosition: "48% 50%",
  },
  {
    id: "seg_05_machine_rise_sustain",
    materialId: "M04",
    src: "素材/剪辑素材/剪辑/IMG_1351.MOV",
    sourceStartSec: 0.82,
    fromSec: 6.4,
    durationSec: 2.15,
    role: "machine_texture",
    bgmRelation: "action sustain with visual density",
    reason: "承接机械节奏，并在中段用视觉标点提示动作方向。",
    risk: "视觉噪音高，若用户觉得乱，回退到更短或改用 M03。",
    scaleStart: 1.18,
    scaleEnd: 1.08,
    yStart: 18,
    yEnd: -18,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_06_action_reprise",
    materialId: "M03",
    src: "素材/剪辑素材/剪辑/IMG_1350.MOV",
    sourceStartSec: 2.05,
    fromSec: 8.55,
    durationSec: 1.5,
    role: "main_action",
    bgmRelation: "late action punctuation before breath",
    reason: "回到主动作而不是继续机器纹理，给呼吸点前做一次收紧。",
    risk: "复用 M03 但换入点；若重复感强，下轮换其他 gym 素材。",
    scaleStart: 1.1,
    scaleEnd: 1.04,
    yStart: 0,
    yEnd: -10,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_07_drink_breath",
    materialId: "M07",
    src: "素材/剪辑素材/剪辑/IMG_1359.MOV",
    sourceStartSec: 0.24,
    fromSec: 10.05,
    durationSec: 1.3,
    role: "breath_object",
    bgmRelation: "short breath object",
    reason: "用低动势饮品做换气，但不把品牌素材拖长。",
    risk: "品牌字样可见，需用户回审；必要时裁切或替换。",
    scaleStart: 1.32,
    scaleEnd: 1.22,
    yStart: -20,
    yEnd: -8,
    objectPosition: "52% 54%",
  },
  {
    id: "seg_08_sky_visual_reset",
    materialId: "M11",
    src: "素材/剪辑素材/剪辑/IMG_3226.MOV",
    sourceStartSec: 1.1,
    fromSec: 11.35,
    durationSec: 1.5,
    role: "visual_reset",
    bgmRelation: "breath to outro bridge",
    reason: "给高密度 gym 画面一个短视觉重置，并放轻视觉标点。",
    risk: "海天和 gym 主线冲突，只短用，反馈不好时降级删除。",
    scaleStart: 1.1,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -20,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_09_shadow_mood_outro",
    materialId: "M09",
    src: "素材/剪辑素材/剪辑/IMG_1361.MOV",
    sourceStartSec: 2.1,
    fromSec: 12.85,
    durationSec: 2.25,
    role: "mood_outro",
    bgmRelation: "outro darkening candidate",
    reason: "用夜路影子进入日记感收束，作为 gym 主线后的情绪回声。",
    risk: "和 gym 语境差异大，若跳戏，下轮改为 gym-only ending。",
    scaleStart: 1.12,
    scaleEnd: 1.04,
    yStart: 10,
    yEnd: -14,
    objectPosition: "50% 50%",
  },
  {
    id: "seg_10_gym_space_reprise",
    materialId: "M05",
    src: "素材/剪辑素材/剪辑/IMG_1353.MOV",
    sourceStartSec: 1.2,
    fromSec: 15.1,
    durationSec: 1.35,
    role: "identity_reprise",
    bgmRelation: "outro briefly returns to source place",
    reason: "在结尾前回一下 gym 空间，减少 mood 素材像另一个视频的风险。",
    risk: "回拉可能突兀；失败时改成夜路单线收束或 gym-only 收束。",
    scaleStart: 1.16,
    scaleEnd: 1.08,
    yStart: 10,
    yEnd: -10,
    objectPosition: "51% 50%",
  },
  {
    id: "seg_11_shadow_close",
    materialId: "M09",
    src: "素材/剪辑素材/剪辑/IMG_1361.MOV",
    sourceStartSec: 4.5,
    fromSec: 16.45,
    durationSec: 1.55,
    role: "mood_outro",
    bgmRelation: "final drop and fade",
    reason: "用更暗的影子尾声自然淡出，给用户审片判断结尾是否成立。",
    risk: "若用户觉得不像一条片，回到 ending candidate 重选。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 8,
    yEnd: -8,
    objectPosition: "50% 50%",
  },
];

export const fullVideoCandidateCaptions: FullVideoCaptionEvent[] = [
  {
    id: "caption_01_opening",
    text: "先醒一下",
    fromSec: 0.38,
    durationSec: 1.1,
    role: "opening_hook",
    x: 78,
    y: 1440,
    status: "draft_text_pending_user_review",
  },
  {
    id: "caption_02_action",
    text: "把节奏收紧",
    fromSec: 3.25,
    durationSec: 1.35,
    role: "action_focus",
    x: 78,
    y: 1370,
    status: "draft_text_pending_user_review",
  },
  {
    id: "caption_03_breath",
    text: "留一口气",
    fromSec: 10.16,
    durationSec: 1.02,
    role: "breath",
    x: 76,
    y: 1288,
    status: "draft_text_pending_user_review",
  },
  {
    id: "caption_04_outro",
    text: "今天先到这",
    fromSec: 15.42,
    durationSec: 1.5,
    role: "outro",
    x: 74,
    y: 1422,
    status: "draft_text_pending_user_review",
  },
];

export const fullVideoCandidateStickers: FullVideoStickerEvent[] = [
  {
    id: "sticker_01_action_contact_spark",
    timeRange: "3.55-4.15s",
    fromSec: 3.55,
    durationSec: 0.6,
    anchorTarget: "M03 器械/身体动作接触窗口",
    attachmentRelation: "contact_point_attached",
    shapeGrammar: "contact_spark",
    visualRole: "动作触点短促火花，提示主动作首次进入。",
    sourceMechanism: "44 sticker_attachment_relation + 46 contact_spark small-scope probe",
    x: 660,
    y: 1048,
    rotate: -8,
    scale: 1,
    status: "included_partial_pending_user_review",
  },
  {
    id: "sticker_02_machine_motion_ticks",
    timeRange: "6.78-7.34s",
    fromSec: 6.78,
    durationSec: 0.56,
    anchorTarget: "M04 器械线条与动作方向",
    attachmentRelation: "motion_direction_attached",
    shapeGrammar: "short_stroke_cluster",
    visualRole: "沿器械运动方向的短笔触标点，避免变成说明箭头。",
    sourceMechanism: "44 short_stroke_cluster + reaction_motion_signature",
    x: 394,
    y: 808,
    rotate: 12,
    scale: 0.86,
    status: "included_partial_pending_user_review",
  },
  {
    id: "sticker_03_breath_edge_line",
    timeRange: "11.62-12.38s",
    fromSec: 11.62,
    durationSec: 0.76,
    anchorTarget: "M11 海天呼吸段边缘/留白关系",
    attachmentRelation: "negative_space_attached",
    shapeGrammar: "breath_edge_line",
    visualRole: "低权重呼吸线，证明视觉标点存在但不破坏换气。",
    sourceMechanism: "44 negative_space_attached + edge_wiggle / no clutter rule",
    x: 176,
    y: 740,
    rotate: -4,
    scale: 0.78,
    status: "included_partial_pending_user_review",
  },
];

export const fullVideoCandidateTransitions: FullVideoTransitionEvent[] = [
  {
    id: "transition_01_subject_to_space",
    fromSec: 1.58,
    durationSec: 0.22,
    transitionType: "soft_crossfade",
    fromMaterial: "M08",
    toMaterial: "M05",
    whyNeeded: "从人物锚点过到空间建立，降低硬切跳感。",
    status: "included",
  },
  {
    id: "transition_02_space_to_action",
    fromSec: 3.02,
    durationSec: 0.24,
    transitionType: "motion_wipe",
    fromMaterial: "M05",
    toMaterial: "M03",
    whyNeeded: "把空间镜头推入主动作段。",
    status: "included",
  },
  {
    id: "transition_03_action_texture_flash",
    fromSec: 5.15,
    durationSec: 0.18,
    transitionType: "texture_flash",
    fromMaterial: "M03",
    toMaterial: "M06",
    whyNeeded: "用短闪响应 action 段密度，不写精准卡点。",
    status: "included",
  },
  {
    id: "transition_04_breath_dip",
    fromSec: 10.0,
    durationSec: 0.28,
    transitionType: "breath_dip",
    fromMaterial: "M03",
    toMaterial: "M07",
    whyNeeded: "给饮品呼吸点留出可感知的降动势。",
    status: "included",
  },
  {
    id: "transition_05_outro_darken",
    fromSec: 12.74,
    durationSec: 0.28,
    transitionType: "soft_crossfade",
    fromMaterial: "M11",
    toMaterial: "M09",
    whyNeeded: "从视觉重置转入夜路收束，显式记录 mood 风险。",
    status: "included",
  },
];

export const fullVideoCandidateReviewTimes = [
  { label: "01_start_frame", second: 0.5, evidence: "start frame / opening caption" },
  { label: "02_opening_caption", second: 0.92, evidence: "caption_text_layer" },
  { label: "03_action_sticker", second: 3.82, evidence: "sticker_visual_punctuation" },
  { label: "04_machine_sticker", second: 7.06, evidence: "sticker_visual_punctuation" },
  { label: "05_mid_frame", second: 9.0, evidence: "mid frame / action reprise" },
  { label: "06_breath_caption", second: 10.58, evidence: "caption_text_layer" },
  { label: "07_breath_sticker", second: 12.04, evidence: "sticker_visual_punctuation" },
  { label: "08_outro_caption", second: 16.08, evidence: "caption_text_layer" },
  { label: "09_end_frame", second: 17.55, evidence: "end frame" },
];

export const fullVideoCandidateStatus =
  "full_video_candidate_rendered_pending_user_review";
