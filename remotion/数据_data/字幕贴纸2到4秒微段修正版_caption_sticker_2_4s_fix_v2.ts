export type FixV2Segment = {
  segmentId: string;
  materialId: string;
  src: string;
  originalCandidateTimeRange: string;
  sourceTimeRange: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  role: "action_contact_fix" | "texture_absorb_fix";
  objectPosition: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
  frameEvidence: string;
  visualReason: string;
};

export type FixV2CaptionEvent = {
  captionId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  text: string;
  textStatus: "draft_text_pending_user_review";
  captionType: "hand_drawn_reaction_word";
  analysisAssetIds: number[];
  referenceRuleLinks: string[];
  anchorTarget: string;
  frameEvidence: string;
  pictureRelation: string;
  positionMode: "contact_edge_micro_reaction";
  attentionWeight: "medium_low";
  entryFrames: number;
  holdFrames: number;
  exitFrames: number;
  captionStickerRelation: "shared_anchor_split_roles";
  migrationLibraryUsed: true;
  decisionRouterUsed: true;
  captionVisualLanguageDecision: string;
  stickerVisualLanguageDecision: string;
  copyRiskCheck: string;
  templateFallback: false;
  x: number;
  y: number;
  fontSize: number;
  rotateDeg: number;
};

export type FixV2StickerEvent = {
  stickerId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  stickerNeeded: boolean;
  analysisAssetIds: number[];
  referenceRuleLinks: string[];
  anchorTarget: string;
  frameEvidence: string;
  anchorReason: string;
  attachmentRelation:
    | "contact_point_attached"
    | "edge_attached"
    | "motion_direction_attached";
  stickerType: "pin_rub_mark" | "bar_compression_scuff" | "texture_absorb_smear";
  shapeGrammar: "edge_scratch_pair" | "compressed_bar_scuff" | "absorbed_short_smear";
  shapeDerivedFromEvent: string;
  strokeOutline: string;
  materialCompositing: string;
  scaleDistance: string;
  motionSignature: string;
  captionRelation: string;
  attentionWeight: "medium" | "low";
  copyRiskCheck: string;
  badPatternAvoided: string[];
  templateFallback: false;
  fallbackIfFailed: string;
  x: number;
  y: number;
  rotateDeg: number;
  scale: number;
};

export const fixV2Composition = {
  id: "字幕贴纸2到4秒微段修正版-caption-sticker-2-4s-fix-v2",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 3,
  durationInFrames: 90,
};

export const fixV2Bgm = {
  path: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  sourceStartSec: 3.15,
  level: 0.72,
  fadeInSec: 0.08,
  fadeOutSec: 0.18,
  roughMood: "same BGM action-pressure window; rough section only, no precise human beat claim",
};

export const sourceVideos = {
  original18s:
    "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4",
  v1MicroProbe:
    "dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4",
  v2Fix:
    "dist/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2.mp4",
};

export const selectedFixWindow = {
  timeRange: "3.15-6.15s",
  durationSec: 3,
  sourceSegment: "seg_04_main_action_push -> seg_05_metal_texture_cut",
  materialIds: ["M03", "M06"],
  sourceTimeRange: "M03 0.35-2.25s; M06 0.70-1.80s",
  frameEvidence:
    "以 original 3.54s/3.78s 与 v1 0.78s 为目标帧：可见右侧机器立柱圆孔、下方横杆和人体发力窗口。",
  selectionReason:
    "延续 58 的同一窗口，便于 before/v1/v2 对比；v2 不换镜头，用同一画面检验字幕和贴纸是否真的更贴帧。",
};

export const visualLanguagePreflight = {
  source_inventory_read: true,
  migration_library_read: true,
  decision_router_read: true,
  visual_review_loop_read: true,
  analysis_asset_ids: [6, 7, 27, 29, 35, 37, 40, 41, 44, 49, 50, 53, 57, 59],
  reference_rule_links: [
    "54:F.extraction_contract",
    "55:D.sticker_type_02",
    "55:D.sticker_type_03",
    "55:D.sticker_type_05",
    "55:E.attach_01",
    "55:E.attach_02",
    "55:E.attach_03",
    "55:F.shape_01",
    "55:F.shape_02",
    "55:F.shape_03",
    "55:G.stroke_material_motion_library",
    "55:H.caption_05",
    "55:I.cs_relation_03",
    "56:E.caption_branch_05_hand_drawn_reaction_word",
    "56:F.sticker_branch_03_contact",
    "56:F.sticker_branch_05_edge",
    "56:G.caption_sticker_conflict_resolver",
    "56:J.template_fallback_gate",
    "59:B.frame_review_loop",
    "59:C.visual_scorecard",
    "59:D.caption_sticker_fix_spec",
    "59:E.micro_probe_before_full_render_2_4s",
  ],
  migration_library_used: true,
  decision_router_used: true,
  caption_sticker_visual_review_loop_used: true,
  template_fallback: false,
  copy_risk_check:
    "原创拟声短字与原创 SVG/CSS 擦痕；不复制参考视频素材、第三方贴纸、平台 UI、品牌资产、原字体或原文案。",
};

export const fiveProblemsFrom58 = {
  caption_relation_problem: "字幕像大字口号，不像动作反应。",
  sticker_generic_component_problem: "贴纸像通用组件，不像这一帧专属反应。",
  anchor_declaration_problem: "锚点只是文档声明，不是真正贴住画面。",
  occlusion_material_problem: "遮挡和材质只是模拟，不够融入画面。",
  motion_event_problem: "动效像参数动画，不像动作事件带出来的运动。",
};

export const visualScorecard = {
  score_scale: "0 unresolved / 1 partial / 2 likely improved pending user review / 3 strong frame evidence",
  source: "59:C.visual_scorecard",
  items: [
    {
      problem_id: "caption_relation_problem",
      before_score: 0,
      v1_score: 1,
      v2_attempt_score: 2,
      v2_fix_attempt:
        "从大字“顶一下”降为小型拟声“咔”，位置贴近机器圆孔边缘，作用是声音/动作反应而不是口号。",
      remaining_review_risk: "用户可能认为“咔”过于拟声或不符合语气，仍需人审。",
    },
    {
      problem_id: "sticker_generic_component_problem",
      before_score: 0,
      v1_score: 1,
      v2_attempt_score: 2,
      v2_fix_attempt:
        "把 v1 pressure burst 改成 pin rub mark + bar scuff，形状沿右侧圆孔和横杆边缘，不再是可移植 burst。",
      remaining_review_risk: "若仍显得像画上去的标注，应删除 pin rub mark，只保留更低权重 scuff。",
    },
    {
      problem_id: "anchor_declaration_problem",
      before_score: 0,
      v1_score: 1,
      v2_attempt_score: 2,
      v2_fix_attempt:
        "锚点写为可见右侧机器立柱圆孔、下方横杆、切入 M06 金属线条，并在审片包抽 before/v1/v2 对应帧。",
      remaining_review_risk: "坐标仍是 Remotion 实现所需，必须靠 contact sheet 证明不是只调 x/y。",
    },
    {
      problem_id: "occlusion_material_problem",
      before_score: 0,
      v1_score: 1,
      v2_attempt_score: 2,
      v2_fix_attempt:
        "颜色从高亮黄白降为灰白擦痕、暗边、multiply/soft-light 混合，并用机器色遮罩压住部分笔触。",
      remaining_review_risk: "遮罩仍是本地绘制近似，不等于真实像素级 rotoscope。",
    },
    {
      problem_id: "motion_event_problem",
      before_score: 0,
      v1_score: 1,
      v2_attempt_score: 2,
      v2_fix_attempt:
        "取消 spring pop，改为接触帧 4-frame scratch-in、受力 8-frame rub、切镜前吸收退出，M06 只留极短余痕。",
      remaining_review_risk: "没有真实运动追踪，只是按画面事件手工绑定粗窗口。",
    },
  ],
  minimum_pass_for_2_4s_probe: {
    all_five_problems_present: true,
    each_v2_attempt_score_minimum: 2,
    template_fallback: false,
    copy_risk_check: "passed",
    user_review_required: true,
  },
};

export const captionStickerFixSpec = {
  shot_id: "caption_sticker_fix_v2_action_contact_3s",
  source_video_or_candidate: sourceVideos.original18s,
  previous_probe_video: sourceVideos.v1MicroProbe,
  time_range: "3.15-6.15s",
  frame_evidence: {
    original_candidate_frames: ["3.34s", "3.54s", "3.78s", "4.04s", "5.70s"],
    previous_probe_frames: ["0.26s", "0.78s", "1.30s", "2.08s"],
    target_anchor_frame:
      "v2 0.66-0.92s: 右侧机器立柱圆孔、横杆上边缘和人体发力窗口同时可见。",
  },
  five_problem_diagnosis: fiveProblemsFrom58,
  caption_fix: {
    old_caption: "顶一下",
    new_caption: "咔",
    text_status: "draft_text_pending_user_review",
    caption_type: "hand_drawn_reaction_word",
    why_more_like_action_reaction:
      "单字拟声只在接触窗口出现，贴近机器圆孔，不再承担段落口号或说明。",
    anchor_target: "右侧机器立柱圆孔左下缘和横杆上缘之间。",
    attention_weight: "medium_low",
    entry_hold_exit: "4 frame scratch-in / 13 frame hold / 7 frame wipe-out",
    copy_risk_check: "原创拟声字；不复制参考文案、字体或平台 UI。",
  },
  sticker_fix: {
    old_sticker: "contact_pressure_burst + caption_tail_tick + texture_residual_drag",
    new_sticker: "pin_rub_mark + bar_compression_scuff + texture_absorb_smear",
    sticker_type: "edge/contact scuff visual punctuation",
    attachment_relation: "contact_point_attached + edge_attached + motion_direction_attached",
    shape_derived_from_frame_event:
      "擦痕围绕机器圆孔和横杆边缘，方向跟动作压力向右上/左下的结构线一致。",
    material_occlusion_strategy:
      "低饱和灰白/暗边，局部机器色遮罩盖住笔触端点，混合模式降低 UI 浮层感。",
    motion_bound_to_event:
      "接触窗口短擦入，动作压力时压缩，切到 M06 前收掉，M06 只吸收为极低权重短痕。",
    fallback_if_still_generic:
      "删除 pin_rub_mark，仅保留 bar_compression_scuff；不得回退到 burst/firework 模板。",
  },
  conflict_resolution:
    "caption 负责拟声，pin rub mark 负责接触擦痕，bar scuff 负责横杆受力，M06 smear 负责切镜吸收；四者不复述同一意思。",
  template_fallback: false,
  review_required: true,
};

export const fixV2Segments: FixV2Segment[] = [
  {
    segmentId: "fix_v2_seg_01_action_contact",
    materialId: "M03",
    src: "素材/剪辑素材/剪辑/IMG_1350.MOV",
    originalCandidateTimeRange: "3.15-5.05s",
    sourceTimeRange: "0.35-2.25s",
    sourceStartSec: 0.35,
    fromSec: 0,
    durationSec: 1.9,
    role: "action_contact_fix",
    objectPosition: "51.5% 50%",
    scaleStart: 1.13,
    scaleEnd: 1.07,
    yStart: 0,
    yEnd: -18,
    frameEvidence: "右侧机器立柱圆孔、横杆与人体动作在同一帧内可见。",
    visualReason: "保持同一动作窗口，但略收窄 motion，减少 v1 大图形浮层感。",
  },
  {
    segmentId: "fix_v2_seg_02_texture_absorb",
    materialId: "M06",
    src: "素材/剪辑素材/剪辑/IMG_1358.MOV",
    originalCandidateTimeRange: "5.05-6.15s",
    sourceTimeRange: "0.70-1.80s",
    sourceStartSec: 0.7,
    fromSec: 1.9,
    durationSec: 1.1,
    role: "texture_absorb_fix",
    objectPosition: "48% 50%",
    scaleStart: 1.2,
    scaleEnd: 1.1,
    yStart: -10,
    yEnd: 15,
    frameEvidence: "M06 金属配重线条可见，适合低权重吸收余痕。",
    visualReason: "只保留极低权重短痕，让 v2 接触反应在切镜处被金属纹理吸收。",
  },
];

export const fixV2CaptionEvents: FixV2CaptionEvent[] = [
  {
    captionId: "fix_v2_caption_01_contact_sound",
    timeRange: "0.42-1.22s",
    fromSec: 0.42,
    durationSec: 0.8,
    text: "咔",
    textStatus: "draft_text_pending_user_review",
    captionType: "hand_drawn_reaction_word",
    analysisAssetIds: [27, 35, 37, 50, 53, 59],
    referenceRuleLinks: [
      "55:H.caption_05",
      "55:I.cs_relation_03",
      "56:E.caption_branch_05_hand_drawn_reaction_word",
      "56:G.caption_sticker_conflict_resolver",
      "59:C.visual_scorecard",
      "59:D.caption_sticker_fix_spec",
    ],
    anchorTarget: "M03 右侧机器立柱圆孔左下缘与横杆上缘的接触压力窗口。",
    frameEvidence: "original 3.78s / v1 0.78s / v2 0.78s 对比帧能看到圆孔和横杆边缘。",
    pictureRelation:
      "单字拟声只响应机械接触，不承担段落口号；位置靠近接触结构，读法像动作旁的声音。",
    positionMode: "contact_edge_micro_reaction",
    attentionWeight: "medium_low",
    entryFrames: 4,
    holdFrames: 13,
    exitFrames: 7,
    captionStickerRelation: "shared_anchor_split_roles",
    migrationLibraryUsed: true,
    decisionRouterUsed: true,
    captionVisualLanguageDecision:
      "caption_router -> hand_drawn_reaction_word；从大字口号降到动作拟声。",
    stickerVisualLanguageDecision:
      "sticker router -> contact/edge scuff；贴纸写摩擦痕，字幕写声音，分工明确。",
    copyRiskCheck: "原创拟声字，待用户人审；不复制参考文案或字体。",
    templateFallback: false,
    x: 628,
    y: 1002,
    fontSize: 58,
    rotateDeg: -7,
  },
];

export const fixV2StickerEvents: FixV2StickerEvent[] = [
  {
    stickerId: "fix_v2_sticker_01_pin_rub_mark",
    timeRange: "0.46-1.14s",
    fromSec: 0.46,
    durationSec: 0.68,
    stickerNeeded: true,
    analysisAssetIds: [40, 41, 44, 49, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_03",
      "55:D.sticker_type_05",
      "55:E.attach_02",
      "55:F.shape_01",
      "55:F.shape_02",
      "55:G.stroke_material_motion_library",
      "56:F.sticker_branch_03_contact",
      "59:C.visual_scorecard",
    ],
    anchorTarget: "M03 右侧机器立柱圆孔外缘。",
    frameEvidence: "圆孔在原候选 3.54-3.78s 可见；v2 mark 贴圆孔外缘，不以任意 x/y 为依据。",
    anchorReason: "圆孔是帧内最明确的机械受力结构，擦痕围绕该边缘才成立。",
    attachmentRelation: "contact_point_attached",
    stickerType: "pin_rub_mark",
    shapeGrammar: "edge_scratch_pair",
    shapeDerivedFromEvent:
      "三条短弧沿圆孔外缘和机器立柱斜边擦出，换到没有圆孔的镜头会失去意义。",
    strokeOutline: "smoky charcoal under-edge + low-saturation off-white scuff + tiny warm core",
    materialCompositing:
      "multiply dark edge and soft-light pale scuff; partial machine-color cover masks the right ends.",
    scaleDistance: "贴圆孔外缘 4-24px，短弧不离开机械边缘。",
    motionSignature:
      "event-bound scratch: 0-4f draw from pivot, 5-10f compress toward rail, 11-20f hold with micro abrasion, exit before cut.",
    captionRelation: "shared anchor with fix_v2_caption_01_contact_sound; sticker shows rub, caption gives sound.",
    attentionWeight: "medium",
    copyRiskCheck: "原创擦痕路径，无第三方贴纸或参考贴纸复制。",
    badPatternAvoided: [
      "fixed_component_reuse",
      "template_shape_swap",
      "floating_ui_layer",
      "sticker_caption_duplicate",
      "motion_still_parametric",
    ],
    templateFallback: false,
    fallbackIfFailed: "删除 pin_rub_mark，仅保留 bar_compression_scuff。",
    x: 672,
    y: 1000,
    rotateDeg: -10,
    scale: 0.92,
  },
  {
    stickerId: "fix_v2_sticker_02_bar_compression_scuff",
    timeRange: "0.38-1.34s",
    fromSec: 0.38,
    durationSec: 0.96,
    stickerNeeded: true,
    analysisAssetIds: [44, 49, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_05",
      "55:E.attach_01",
      "55:F.shape_01",
      "55:G.stroke_material_motion_library",
      "56:F.sticker_branch_05_edge",
      "59:D.caption_sticker_fix_spec",
    ],
    anchorTarget: "M03 下方横杆上边缘。",
    frameEvidence: "原候选与 v1 对比帧中横杆贯穿下三分区，v2 scuff 沿横杆上边缘擦入。",
    anchorReason: "横杆是画面内最稳定的前景遮挡边界，用它压住笔触能减少浮层感。",
    attachmentRelation: "edge_attached",
    stickerType: "bar_compression_scuff",
    shapeGrammar: "compressed_bar_scuff",
    shapeDerivedFromEvent:
      "短擦痕沿横杆上边缘被挤扁，不是单独浮在空中的尾巴或箭头。",
    strokeOutline: "transparent charcoal stain + pale grey worn paint edge, no bright outline",
    materialCompositing:
      "blend into rail with multiply/soft-light; rail-color occlusion strip covers lower stroke.",
    scaleDistance: "沿横杆上缘 0-18px 内，避免进入人物身体区域。",
    motionSignature:
      "pressure smear enters with the contact frame, holds as compressed scuff, wipes off along rail before M06.",
    captionRelation: "supports contact sound but does not point to or underline the caption.",
    attentionWeight: "low",
    copyRiskCheck: "原创材质擦痕，无品牌/包装/参考 UI 复制。",
    badPatternAvoided: ["caption_tail_as_arrow", "floating_ui_layer", "quantity_as_quality"],
    templateFallback: false,
    fallbackIfFailed: "删除该 scuff，保留 pin rub mark 和 caption。",
    x: 430,
    y: 1132,
    rotateDeg: -2,
    scale: 1,
  },
  {
    stickerId: "fix_v2_sticker_03_texture_absorb_smear",
    timeRange: "1.92-2.22s",
    fromSec: 1.92,
    durationSec: 0.3,
    stickerNeeded: true,
    analysisAssetIds: [44, 47, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_04",
      "55:E.attach_03",
      "55:F.shape_03",
      "55:G.stroke_material_motion_library",
      "56:F.sticker_branch_04_motion",
      "59:C.visual_scorecard",
    ],
    anchorTarget: "M06 左中金属线条切入方向。",
    frameEvidence: "M06 texture exit frame 能看到竖向配重线，余痕只沿切入方向出现。",
    anchorReason: "切镜后只能留下被金属纹理吸收的极短残影，不能继续展示上一镜贴纸。",
    attachmentRelation: "motion_direction_attached",
    stickerType: "texture_absorb_smear",
    shapeGrammar: "absorbed_short_smear",
    shapeDerivedFromEvent: "两条极短竖向擦痕被 M06 金属线条吸收，0.3s 内消失。",
    strokeOutline: "dim grey line with almost no outline",
    materialCompositing: "very low opacity soft-light, below atmosphere layer, no glow.",
    scaleDistance: "贴 M06 金属线 8-20px，不独立漂浮。",
    motionSignature: "2 frame appear, 5 frame absorb, 2 frame vanish; tied to cut frame.",
    captionRelation: "no caption in texture exit; only absorbs previous contact mark.",
    attentionWeight: "low",
    copyRiskCheck: "原创短痕，无参考复制。",
    badPatternAvoided: ["floating_ui_layer", "motion_still_parametric", "caption_as_explanation"],
    templateFallback: false,
    fallbackIfFailed: "删除 texture_absorb_smear，M06 维持 no sticker。",
    x: 640,
    y: 610,
    rotateDeg: 4,
    scale: 0.66,
  },
];

export const conflictResolution = {
  caption_relation_problem:
    "caption 从 82px 的“顶一下”降为 58px 单字“咔”，只在接触窗口短停。",
  sticker_generic_component_problem:
    "移除大 burst，改成围绕圆孔和横杆边缘的擦痕；形状依赖当前帧机械结构。",
  anchor_declaration_problem:
    "每个事件写 frameEvidence，并在审片包抽 original/v1/v2 对应帧。",
  occlusion_material_problem:
    "贴纸低饱和、局部被 rail-color strip / machine-color cover 压住，减少完整前景图形感。",
  motion_event_problem:
    "取消 spring pop，使用接触帧 scratch/compress/absorb 的事件窗口。",
  template_fallback: false,
};

export const reviewFrames = {
  original: [
    { id: "original_caption_start", second: 3.34, evidence: "原大字口号起点" },
    { id: "original_contact_mid", second: 3.78, evidence: "原 contact flash / 目标圆孔与横杆证据帧" },
    { id: "original_contact_exit", second: 4.04, evidence: "原 contact flash 退出" },
    { id: "original_texture_exit", second: 5.7, evidence: "原 M06 texture exit" },
  ],
  v1: [
    { id: "v1_caption_start", second: 0.26, evidence: "v1 顶一下入场" },
    { id: "v1_caption_sticker_mid", second: 0.78, evidence: "v1 pressure burst + tail 最清楚" },
    { id: "v1_sticker_exit", second: 1.3, evidence: "v1 pressure burst exit" },
    { id: "v1_texture_residual", second: 2.08, evidence: "v1 M06 residual drag" },
  ],
  v2: [
    { id: "v2_caption_start", second: 0.44, evidence: "v2 咔入场" },
    { id: "v2_scuff_mid", second: 0.78, evidence: "v2 pin rub + bar scuff 最清楚" },
    { id: "v2_scuff_exit", second: 1.16, evidence: "v2 pin rub exit" },
    { id: "v2_texture_absorb", second: 2.04, evidence: "v2 M06 absorbed smear" },
    { id: "v2_end", second: 2.86, evidence: "v2 clean end" },
  ],
};

export const completionMatrix = {
  mechanism_59_written: true,
  five_problems_in_visual_scorecard: true,
  v2_micro_probe_not_full_video: true,
  before_v1_v2_review_pack_required: true,
  template_fallback: false,
  no_external_generation_api: true,
  no_new_sticker_image_asset: true,
  pending_user_review: true,
  do_not_claim_publish_ready: true,
  do_not_claim_video_fixed: true,
  do_not_claim_capability_verified: true,
};
