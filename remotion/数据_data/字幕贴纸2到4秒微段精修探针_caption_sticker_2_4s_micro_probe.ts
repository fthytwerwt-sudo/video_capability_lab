export type MicroProbeSegment = {
  segmentId: string;
  materialId: string;
  src: string;
  originalCandidateTimeRange: string;
  sourceTimeRange: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  role: "action_contact_probe" | "texture_exit_probe";
  objectPosition: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
  visualReason: string;
  risk: string;
};

export type MicroCaptionEvent = {
  captionId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  text: string;
  textStatus: "draft_text_pending_user_review";
  captionType: "hero_keyword_attached_phrase_hybrid";
  analysisAssetIds: number[];
  referenceRuleLinks: string[];
  anchorTarget: string;
  pictureRelation: string;
  positionMode: "diagonal_contact_attached";
  attentionWeight: "high";
  entryFrames: number;
  holdFrames: number;
  exitFrames: number;
  captionStickerRelation: "sticker_leads_caption_supports";
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
  maxWidth: number;
};

export type MicroStickerEvent = {
  stickerId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  stickerNeeded: boolean;
  analysisAssetIds: number[];
  referenceRuleLinks: string[];
  anchorTarget: string;
  anchorReason: string;
  attachmentRelation:
    | "contact_point_attached"
    | "caption_relation_attached"
    | "motion_direction_attached";
  stickerType:
    | "hand_drawn_caption_plus_sticker_hybrid"
    | "contact_pressure_burst"
    | "residual_motion_drag";
  shapeGrammar:
    | "asymmetric_pressure_burst"
    | "caption_tail_tick"
    | "short_motion_smear";
  shapeDerivedFromEvent: string;
  strokeOutline: string;
  materialCompositing: string;
  scaleDistance: string;
  motionSignature: string;
  captionRelation: string;
  attentionWeight: "high" | "medium" | "low";
  copyRiskCheck: string;
  badPatternAvoided: string[];
  templateFallback: false;
  fallbackIfFailed: string;
  x: number;
  y: number;
  rotateDeg: number;
  scale: number;
};

export const microProbeComposition = {
  id: "字幕贴纸2到4秒微段精修探针-caption-sticker-2-4s-micro-probe",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 3,
  durationInFrames: 90,
};

export const microProbeBgm = {
  path: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  sourceStartSec: 3.15,
  level: 0.74,
  fadeInSec: 0.08,
  fadeOutSec: 0.16,
  roughMood: "same BGM, rough action-pressure window, not human precise beat locked",
};

export const selectedMicroWindow = {
  timeRange: "3.15-6.15s",
  durationSec: 3,
  sourceSegment: "seg_04_main_action_push -> seg_05_metal_texture_cut",
  materialIds: ["M03", "M06"],
  sourceTimeRange: "M03 0.35-2.25s; M06 0.70-1.80s",
  selectionReason:
    "该窗口同时包含动作接触、原 contact flash、大字 caption 和金属纹理过渡，最适合检验当前视觉标点是否仍像可替换 Remotion 组件。",
  rejectedWindowReasons: [
    {
      window: "0.00-2.10s",
      reason: "opening 更像身份/开场检验，接触锚点不足，不能直接暴露 sticker attachment 的差一点问题。",
    },
    {
      window: "6.15-8.00s",
      reason: "机器 motion trail 可检验方向线，但原时长不足 2s 且字幕冲突较少，不是本轮最小症结。",
    },
    {
      window: "11.85-13.45s",
      reason: "暗部影子段更适合 mood reset，低照度会掩盖字幕贴纸材质问题。",
    },
  ],
};

export const visualLanguagePreflight = {
  source_inventory_read: true,
  migration_library_read: true,
  decision_router_read: true,
  analysis_asset_ids: [6, 7, 27, 29, 35, 37, 40, 41, 44, 50, 53, 57, 59],
  reference_rule_links: [
    "54:F.extraction_contract",
    "55:D.sticker_type_02",
    "55:D.sticker_type_03",
    "55:E.attach_02",
    "55:E.attach_08",
    "55:F.shape_02",
    "55:F.shape_08",
    "55:G.stroke_material_motion_library",
    "55:H.caption_01",
    "55:I.caption_sticker_relation_library",
    "56:E.caption_branch_01_hero_keyword",
    "56:E.caption_branch_02_attached_phrase",
    "56:F.sticker_branch_02_hand_drawn_hybrid",
    "56:F.sticker_branch_03_contact",
    "56:G.caption_sticker_conflict_resolver",
    "56:J.template_fallback_gate",
  ],
  migration_library_used: true,
  decision_router_used: true,
  template_fallback: false,
  copy_risk_check:
    "只迁移视觉语言机制，不复制参考视频素材、第三方贴纸、平台 UI、品牌资产、原字体或原文案；本轮不生成新图片/视频/音频资产。",
};

export const beforeAudit = {
  current_caption_problem:
    "原 caption_03_action_push 的“推上去”位置避开了主体，但更像放在画面上的大字口号，和器械接触点的物理关系不够强。",
  current_sticker_problem:
    "原 sticker_03_action_contact_flash 可读，但四向对称的 burst 形状接近通用火花组件，换到其他镜头也能成立。",
  current_attachment_problem:
    "接触锚点在数据里成立，画面里仍偏前景浮层，没有被器械边缘压住、遮挡或顺着受力方向长出。",
  current_shape_problem:
    "短线条规整、均衡、独立，缺少从 M03 具体接触事件抽出的不对称压力形。",
  current_material_compositing_problem:
    "cream/yellow SVG 边缘干净，drop shadow 统一，缺少粗糙描边、暗部压痕、局部遮罩和画面颗粒的混合。",
  current_motion_problem:
    "动效是 pop + hold + exit，更像组件参数，不像接触瞬间被挤出、拖开、再收掉。",
  current_human_feel_problem:
    "字段已经通过 54/55/56，但手感仍偏工程实现，距离“像人贴在这个镜头上”差一点。",
  likely_reason:
    "形状没有足够从事件和材质里派生，caption 与 sticker 的附属关系仍是声明强于画面证据。",
};

export const microFixSpec = {
  shot_id: "micro_probe_action_contact_3s",
  time_range: "3.15-6.15s",
  source_material: "M03 + M06",
  source_time_range: "M03 0.35-2.25s -> M06 0.70-1.80s",
  visual_event: "健身器械受力推进后切入金属线条纹理。",
  primary_subject: "M03 器械和人体动作接触窗口。",
  action_or_state: "push/contact pressure",
  anchor_target: "M03 发力/器械接触点，接近原 sticker_03_action_contact_flash 锚点。",
  background_density: "high on action contact; high on metal texture exit",
  safe_area: "字幕保持在左下到中下斜向区域，贴纸贴近接触点但不压主体手臂/器械核心。",
  caption_decision:
    "needed: hero_keyword + attached_phrase hybrid，短句从动作压力侧边进入，避免固定 lower-third。",
  sticker_decision:
    "needed: hand_drawn_caption_plus_sticker_hybrid + contact pressure burst，优先服务接触点，不追求数量。",
  attachment_relation:
    "contact_point_attached + caption_relation_attached + short residual motion direction",
  shape_grammar:
    "不对称 pressure burst、短压痕、caption 尾巴小 tick，由接触点向左上和右下挤出。",
  material_compositing:
    "charcoal under-stroke、off-white thick outline、warm yellow core、局部暗色遮罩和颗粒，让贴纸被器械边缘压住。",
  motion_signature:
    "4 frame snap-in, 9 frame smear-out, 18 frame uneven hold, exits before texture cut; residual drag continues low-weight into M06.",
  conflict_resolution:
    "sticker 负责接触冲击，caption 只给人声反应；caption 不复述 contact flash，贴纸不压 caption。",
  template_fallback: false,
  copy_risk_check:
    "原创短句和原创 SVG/CSS 形状；不复制参考字体、原文案、平台 UI、品牌包装或第三方贴纸。",
  failure_route:
    "若贴纸仍像组件，删除 pressure burst，仅保留 caption tail tick；若 caption 压主体，缩小并降到 attached phrase。",
};

export const microProbeSegments: MicroProbeSegment[] = [
  {
    segmentId: "micro_seg_01_action_contact",
    materialId: "M03",
    src: "素材/剪辑素材/剪辑/IMG_1350.MOV",
    originalCandidateTimeRange: "3.15-5.05s",
    sourceTimeRange: "0.35-2.25s",
    sourceStartSec: 0.35,
    fromSec: 0,
    durationSec: 1.9,
    role: "action_contact_probe",
    objectPosition: "50% 50%",
    scaleStart: 1.15,
    scaleEnd: 1.05,
    yStart: 2,
    yEnd: -22,
    visualReason: "保留原候选动作窗口，以便直接比较 caption/sticker 从工程组件到画面附着的变化。",
    risk: "高密度、遮挡高；所有视觉层必须靠边、短停、避开动作核心。",
  },
  {
    segmentId: "micro_seg_02_texture_exit",
    materialId: "M06",
    src: "素材/剪辑素材/剪辑/IMG_1358.MOV",
    originalCandidateTimeRange: "5.05-6.15s",
    sourceTimeRange: "0.70-1.80s",
    sourceStartSec: 0.7,
    fromSec: 1.9,
    durationSec: 1.1,
    role: "texture_exit_probe",
    objectPosition: "48% 50%",
    scaleStart: 1.22,
    scaleEnd: 1.1,
    yStart: -12,
    yEnd: 18,
    visualReason: "保留金属纹理出口，检验 contact mark 是否自然退出，而不是永远悬浮在上一个镜头。",
    risk: "画面线条密，残留标点必须低权重，不新增解释型字幕。",
  },
];

export const microCaptionEvents: MicroCaptionEvent[] = [
  {
    captionId: "micro_caption_01_contact_reaction",
    timeRange: "0.22-1.48s",
    fromSec: 0.22,
    durationSec: 1.26,
    text: "顶一下",
    textStatus: "draft_text_pending_user_review",
    captionType: "hero_keyword_attached_phrase_hybrid",
    analysisAssetIds: [27, 35, 37, 50, 53, 59],
    referenceRuleLinks: [
      "55:H.caption_01",
      "55:H.caption_02",
      "55:I.caption_sticker_relation_library",
      "56:E.caption_branch_01_hero_keyword",
      "56:E.caption_branch_02_attached_phrase",
      "56:G.caption_sticker_conflict_resolver",
    ],
    anchorTarget: "M03 动作接触点左下侧，和 pressure burst 共享同一受力窗口。",
    pictureRelation:
      "caption 像从动作压力旁边冒出来的人声反应，不做解释字幕，也不抢接触点主体。",
    positionMode: "diagonal_contact_attached",
    attentionWeight: "high",
    entryFrames: 4,
    holdFrames: 24,
    exitFrames: 8,
    captionStickerRelation: "sticker_leads_caption_supports",
    migrationLibraryUsed: true,
    decisionRouterUsed: true,
    captionVisualLanguageDecision:
      "caption_router -> hero_keyword + attached_phrase hybrid；短语跟动作压力，不固定底部。",
    stickerVisualLanguageDecision:
      "sticker_visual_punctuation_router -> contact pressure burst 先行，caption 只给语气。",
    copyRiskCheck: "原创短句，待用户人审；不复制参考文案或字体。",
    templateFallback: false,
    x: 86,
    y: 1210,
    fontSize: 82,
    rotateDeg: -6,
    maxWidth: 520,
  },
];

export const microStickerEvents: MicroStickerEvent[] = [
  {
    stickerId: "micro_sticker_01_contact_pressure_burst",
    timeRange: "0.34-1.32s",
    fromSec: 0.34,
    durationSec: 0.98,
    stickerNeeded: true,
    analysisAssetIds: [40, 41, 44, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_03",
      "55:E.attach_02",
      "55:F.shape_02",
      "55:G.stroke_material_motion_library",
      "56:F.sticker_branch_03_contact",
      "56:G.caption_sticker_conflict_resolver",
    ],
    anchorTarget: "M03 发力/器械接触窗口",
    anchorReason: "该窗口有真实接触和受力方向，是本轮最小可观察贴纸锚点。",
    attachmentRelation: "contact_point_attached",
    stickerType: "contact_pressure_burst",
    shapeGrammar: "asymmetric_pressure_burst",
    shapeDerivedFromEvent:
      "5 条不对称短压痕从接触点挤出，长短和方向跟器械遮挡/受力方向绑定。",
    strokeOutline: "charcoal under-stroke + off-white thick outline + warm yellow broken core",
    materialCompositing:
      "局部暗色 occlusion mask 压住右侧笔触，grain overlay 混入 M03 暗部。",
    scaleDistance: "距离接触点 8-46px，贴近器械边缘，不遮挡手臂/主体动作。",
    motionSignature: "4 frame snap, 9 frame smear, 18 frame uneven hold, exits before M06 texture cut",
    captionRelation: "sticker leads; caption micro_caption_01_contact_reaction supports human reaction",
    attentionWeight: "medium",
    copyRiskCheck: "原创 SVG/CSS 形状，无第三方贴纸或参考贴纸复制。",
    badPatternAvoided: [
      "fixed_component_reuse",
      "quantity_as_quality",
      "template_shape_swap",
      "floating_ui_layer",
      "sticker_caption_duplicate",
    ],
    templateFallback: false,
    fallbackIfFailed: "删除 pressure burst，仅保留 caption tail tick；不得替换为模板火花。",
    x: 662,
    y: 1038,
    rotateDeg: -12,
    scale: 1,
  },
  {
    stickerId: "micro_sticker_02_caption_tail_tick",
    timeRange: "0.25-1.46s",
    fromSec: 0.25,
    durationSec: 1.21,
    stickerNeeded: true,
    analysisAssetIds: [21, 44, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_02",
      "55:E.attach_08",
      "55:F.shape_08",
      "55:I.caption_sticker_relation_library",
      "56:F.sticker_branch_02_hand_drawn_hybrid",
      "56:G.caption_sticker_conflict_resolver",
    ],
    anchorTarget: "micro_caption_01 左侧下缘与 M03 受力方向之间",
    anchorReason: "caption 需要有物理尾巴连接动作，不再是单独浮字。",
    attachmentRelation: "caption_relation_attached",
    stickerType: "hand_drawn_caption_plus_sticker_hybrid",
    shapeGrammar: "caption_tail_tick",
    shapeDerivedFromEvent:
      "短尾巴从 caption 下缘斜向接触点，不画箭头，只做手写式压力连接。",
    strokeOutline: "dark soft under-stroke + off-white outline + muted yellow inner tick",
    materialCompositing: "跟 caption 阴影共用暗部，不独立发光。",
    scaleDistance: "caption 下缘 10-64px，终点不碰主体。",
    motionSignature: "与 caption 同步写入，晚于 contact burst 2 frames 退出。",
    captionRelation: "caption and tail share anchor; tail does not repeat text meaning",
    attentionWeight: "low",
    copyRiskCheck: "原创手绘尾巴，不复制参考字体或第三方贴纸。",
    badPatternAvoided: ["floating_ui_layer", "sticker_caption_duplicate", "caption_as_explanation"],
    templateFallback: false,
    fallbackIfFailed: "删除 tail tick，保留 caption 和 pressure burst。",
    x: 236,
    y: 1326,
    rotateDeg: -9,
    scale: 1,
  },
  {
    stickerId: "micro_sticker_03_texture_residual_drag",
    timeRange: "1.84-2.30s",
    fromSec: 1.84,
    durationSec: 0.46,
    stickerNeeded: true,
    analysisAssetIds: [44, 47, 50, 53, 59],
    referenceRuleLinks: [
      "55:D.sticker_type_04",
      "55:E.attach_03",
      "55:F.shape_03",
      "55:G.stroke_material_motion_library",
      "56:F.sticker_branch_04_motion",
      "56:G.caption_sticker_conflict_resolver",
    ],
    anchorTarget: "M06 金属线条切入方向",
    anchorReason: "M03 contact 退出到 M06 texture 时需要一个极低权重残留，不新增说明字幕。",
    attachmentRelation: "motion_direction_attached",
    stickerType: "residual_motion_drag",
    shapeGrammar: "short_motion_smear",
    shapeDerivedFromEvent: "两条短 smear 顺金属线条切走，表示压力余波，而不是新贴纸事件。",
    strokeOutline: "dim charcoal edge + low opacity cream core",
    materialCompositing: "low opacity, screen/soft-light feeling, quickly absorbed by metal texture",
    scaleDistance: "贴近 M06 左中金属线条 12-30px",
    motionSignature: "2 frame appear, 8 frame slide, 4 frame vanish",
    captionRelation: "no caption in M06; residual drag prevents previous burst feeling abruptly pasted",
    attentionWeight: "low",
    copyRiskCheck: "原创低权重线条，无参考复制。",
    badPatternAvoided: ["quantity_as_quality", "floating_ui_layer", "caption_as_explanation"],
    templateFallback: false,
    fallbackIfFailed: "删除 residual drag，M06 保持 no-sticker exit。",
    x: 618,
    y: 596,
    rotateDeg: 8,
    scale: 0.82,
  },
];

export const captionStickerConflictResolution = {
  big_caption_vs_subject: "caption 左下斜放，避开 M03 接触点和主体手臂；fontSize 82 但 maxWidth 限制。",
  sticker_vs_subject:
    "pressure burst 锚点靠近接触点但短停，局部 occlusion mask 让它被器械压住，不盖动作核心。",
  caption_vs_sticker_duplicate:
    "caption 写人声反应“顶一下”，sticker 写接触冲击，语义不复述。",
  sticker_vs_caption_occlusion:
    "caption tail tick 低权重，pressure burst 与 caption 分区，不压字。",
  density_check:
    "1.9s 动作段只保留一条 caption 和两个附属标点；M06 只留 residual drag，不再加字幕。",
  copy_risk_check:
    "所有文本、线条和标点均原创；不使用参考视频素材、第三方 UI、品牌包装或原字体。",
  template_fallback: false,
};

export const evidenceFrames = {
  beforeVideo:
    "dist/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate.mp4",
  afterVideo:
    "dist/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe.mp4",
  beforeFrames: [
    { id: "before_caption_start", second: 3.34, evidence: "original caption_03 starts to read" },
    { id: "before_contact_flash_start", second: 3.54, evidence: "original contact flash enters" },
    { id: "before_contact_flash_mid", second: 3.78, evidence: "original symmetric burst is clearest" },
    { id: "before_contact_flash_exit", second: 4.04, evidence: "original burst exits" },
    { id: "before_texture_exit", second: 5.70, evidence: "original M06 caption-only texture exit" },
  ],
  afterFrames: [
    { id: "after_probe_start", second: 0.14, evidence: "micro probe action window starts" },
    { id: "after_caption_start", second: 0.26, evidence: "new attached caption enters" },
    { id: "after_sticker_start", second: 0.36, evidence: "new pressure burst starts" },
    { id: "after_caption_sticker_mid", second: 0.78, evidence: "caption/sticker shared anchor clearest" },
    { id: "after_sticker_exit", second: 1.30, evidence: "pressure burst exits before cut" },
    { id: "after_texture_residual", second: 2.08, evidence: "low-weight residual drag in M06" },
    { id: "after_end", second: 2.86, evidence: "micro probe end clean" },
  ],
};

export const microProbeCompletionMatrix = {
  this_is_partial_probe_not_full_video_candidate: true,
  selected_2_4s_window: true,
  before_audit_written_before_fix: true,
  visual_language_preflight_54_55_56: true,
  caption_router_used: true,
  sticker_visual_punctuation_router_used: true,
  template_fallback_false: true,
  copy_risk_checked: true,
  no_external_generation_api: true,
  no_new_sticker_image_asset: true,
  render_target: "2-4s micro probe pending technical validation",
  user_review_required: true,
  do_not_claim_publish_ready: true,
  do_not_claim_capability_verified: true,
};
