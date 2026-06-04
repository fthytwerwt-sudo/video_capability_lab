export type MaterialSelectionStatus = "selected" | "backup" | "rejected";
export type MotionIntensity = "low" | "low_medium" | "medium" | "medium_high" | "high";
export type VisualDensity = "low" | "low_medium" | "medium" | "medium_high" | "high";

export type MaterialScanRecord = {
  materialId: string;
  path: string;
  durationSec: number;
  resolution: string;
  fps: string;
  decodable: boolean;
  visualSummary: string;
  motionIntensity: MotionIntensity;
  visualDensity: VisualDensity;
  possibleRole: string;
  risk: string;
  selection: MaterialSelectionStatus;
  reason: string;
};

export type RoutedSegment = {
  segmentId: string;
  timeRange: string;
  materialId: string;
  src: string;
  sourceTimeRange: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  role:
    | "opening_hook_texture"
    | "identity_entry"
    | "space_build"
    | "action_focus"
    | "texture_rhythm_push"
    | "machine_direction_push"
    | "object_breath"
    | "mood_breath"
    | "visual_reset"
    | "shadow_mood_reset"
    | "return_action"
    | "return_identity"
    | "close";
  bgmRelation: string;
  visualReason: string;
  captionOrStickerNeed: string;
  risk: string;
  fallbackIfFailed: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
  objectPosition: string;
  grade: "cool_texture" | "gym_pulse" | "breath_soft" | "dark_close";
};

export type CaptionEvent = {
  captionId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  text: string;
  textStatus: "draft_text_pending_user_review";
  captionType: "hero_keyword" | "attached_phrase" | "whisper_caption" | "hand_drawn_reaction_word";
  analysisAssetIds: number[];
  referenceRuleLinks: string[];
  anchorTarget: string;
  pictureRelation: string;
  positionMode:
    | "center_hero"
    | "object_edge"
    | "diagonal_attached"
    | "negative_space_small"
    | "lower_left_whisper";
  attentionWeight: "high" | "medium" | "low";
  entryFrames: number;
  holdFrames: number;
  exitFrames: number;
  captionStickerRelation:
    | "caption_leads_sticker_supports"
    | "sticker_leads_caption_supports"
    | "shared_anchor_split_roles"
    | "caption_only";
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

export type StickerEvent = {
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
    | "edge_attached"
    | "caption_relation_attached"
    | "contact_point_attached"
    | "motion_direction_attached"
    | "negative_space_attached"
    | "surface_attached";
  stickerType:
    | "edge_attached_short_stroke_cluster"
    | "caption_relation_micro_mark"
    | "contact_flash"
    | "motion_trail_punctuation"
    | "negative_space_breath_line";
  shapeGrammar:
    | "short_stroke_cluster"
    | "micro_tick_pair"
    | "contact_flash"
    | "motion_trail_punctuation"
    | "whisper_line_or_tick";
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

export type TransitionEvent = {
  transitionId: string;
  timeRange: string;
  fromSec: number;
  durationSec: number;
  transitionType:
    | "texture_cut_wipe"
    | "motion_wipe"
    | "texture_flash"
    | "breath_dip"
    | "soft_crossfade"
    | "return_cutline";
  fromMaterial: string;
  toMaterial: string;
  whyNeeded: string;
};

export const routedFullCandidateComposition = {
  id: "参考视觉语言路由18秒正片候选-18s-visual-language-routed-full-candidate",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 18,
  durationInFrames: 540,
};

export const routedFullCandidateBgm = {
  path: "素材/剪辑素材/BGM/copy_C23D419B-74B9-48BB-A971-F8D19ADE885F.MOV",
  durationSec: 25.4,
  videoCodec: "hevc",
  audioCodec: "aac",
  audioChannels: 2,
  audioLayout: "stereo",
  level: 0.8,
  fadeInSec: 0.14,
  fadeOutStartSec: 17.32,
  fadeOutDurationSec: 0.68,
  roughMood: "steady pulse, gym/urban motion candidate, active texture, short breath window",
  roughEnergySections: [
    "0.00-2.20 active intro",
    "2.20-8.00 rise and mechanical push",
    "8.00-11.80 short breath and visual reset",
    "11.80-18.00 return and darker close",
  ],
  precisionBoundary: "rough_audio_feature_based_not_human_precise_beat_confirmation",
};

export const materialPoolScan: MaterialScanRecord[] = [
  { materialId: "M01", path: "素材/剪辑素材/剪辑/IMG_0970.MOV", durationSec: 14.398333, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "熊猫在竹叶和木栏后方活动，自然园区语境强。", motionIntensity: "low_medium", visualDensity: "medium_high", possibleRole: "nature character insert / backup contrast", risk: "和本轮 gym + texture + night 主线语境不合。", selection: "backup", reason: "保留为备选；不进入本轮，避免把叙事改成熊猫片。" },
  { materialId: "M02", path: "素材/剪辑素材/剪辑/IMG_0971.MOV", durationSec: 16.766667, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "熊猫坐在竹林环境，主体清晰但有游客遮挡。", motionIntensity: "low_medium", visualDensity: "medium", possibleRole: "character beat / backup", risk: "动物主体和游览感过强。", selection: "backup", reason: "若用户转自然/动物路线再使用；本轮不进时间线。" },
  { materialId: "M03", path: "素材/剪辑素材/剪辑/IMG_1350.MOV", durationSec: 3.9367, resolution: "3840x2160", fps: "approx_59.94", decodable: true, visualSummary: "健身器械和人体动作，前景器械遮挡形成强运动锚点。", motionIntensity: "medium_high", visualDensity: "high", possibleRole: "action focus / return action", risk: "遮挡高，字幕和贴纸必须避开动作核心。", selection: "selected", reason: "最匹配 BGM 的运动推进，承担主动作和后段 return。" },
  { materialId: "M04", path: "素材/剪辑素材/剪辑/IMG_1351.MOV", durationSec: 6.4067, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "健身器械近中景，机械线条和空间纵深明显。", motionIntensity: "medium", visualDensity: "high", possibleRole: "machine direction push", risk: "金属线条复杂，视觉标点过多会显乱。", selection: "selected", reason: "作为 BGM 上升段机器方向镜头，配 motion trail 而不做说明箭头。" },
  { materialId: "M05", path: "素材/剪辑素材/剪辑/IMG_1353.MOV", durationSec: 2.935, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "健身房空间、镜面、器械与环境标识，空间感强。", motionIntensity: "low_medium", visualDensity: "medium", possibleRole: "space build / return identity", risk: "主体弱，长用会像环境占位。", selection: "selected", reason: "短段建立和回收 gym 身份，防止夜路/海边素材带散。" },
  { materialId: "M06", path: "素材/剪辑素材/剪辑/IMG_1358.MOV", durationSec: 5.065, resolution: "1920x1080", fps: "30", decodable: true, visualSummary: "健身器械金属立柱和配重细节，近景纹理强。", motionIntensity: "medium", visualDensity: "high", possibleRole: "texture rhythm push", risk: "主体叙事弱，必须短切。", selection: "selected", reason: "为中段提供机械 texture，不平均塞素材。" },
  { materialId: "M07", path: "素材/剪辑素材/剪辑/IMG_1359.MOV", durationSec: 3.388333, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "手拿透明饮品，杯身文字明显，低动势物件镜头。", motionIntensity: "low", visualDensity: "low_medium", possibleRole: "object breath", risk: "杯身品牌/包装文字有 copy risk。", selection: "rejected", reason: "二次审片包检查发现杯身文字过大；为降低 brand/copy risk，移出最终时间线。" },
  { materialId: "M08", path: "素材/剪辑素材/剪辑/IMG_1360.MOV", durationSec: 2.485, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "健身器械与人物入场/动作锚点，空间身份明确。", motionIntensity: "medium", visualDensity: "medium_high", possibleRole: "identity entry", risk: "可识别人物和自拍语境需用户人审。", selection: "selected", reason: "用作 sand texture 之后的进场身份，不复用 52 首镜开法。" },
  { materialId: "M09", path: "素材/剪辑素材/剪辑/IMG_1361.MOV", durationSec: 9.5317, resolution: "1920x1080", fps: "30", decodable: true, visualSummary: "夜路墙边影子移动，暗部留白和日记感强。", motionIntensity: "low_medium", visualDensity: "low", possibleRole: "shadow mood reset / close", risk: "和 gym 主线有语境跳跃风险。", selection: "selected", reason: "用于后段暗色 reset 和 close，配 motion trail 与 whisper caption 收束。" },
  { materialId: "M10", path: "素材/剪辑素材/剪辑/IMG_3225.MOV", durationSec: 8.756667, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "海天远景，人群较多，云层开阔。", motionIntensity: "low", visualDensity: "medium_high", possibleRole: "wide sky breath", risk: "人群和景区感较强，和 gym 线不一致。", selection: "selected", reason: "替换 M07 杯身品牌风险，用作 8s 呼吸点；只短用，不贴天空装饰。" },
  { materialId: "M11", path: "素材/剪辑素材/剪辑/IMG_3226.MOV", durationSec: 6.005, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "海天和云层远景，画面比 M10 更开阔。", motionIntensity: "low", visualDensity: "medium", possibleRole: "visual reset", risk: "场景跳出 gym，需要短用并回到主线。", selection: "selected", reason: "承担视觉重置，不贴空天，只让剪辑承载。" },
  { materialId: "M12", path: "素材/剪辑素材/剪辑/IMG_6985.MOV", durationSec: 18.295, resolution: "1920x1080", fps: "approx_59.94", decodable: true, visualSummary: "室内活动、儿童与熊猫人偶，人物和活动语境强。", motionIntensity: "medium", visualDensity: "high", possibleRole: "event crowd backup", risk: "儿童/人群/活动空间 copy and privacy risk 高。", selection: "rejected", reason: "不进入成片候选，避免人物活动风险和叙事跳线。" },
  { materialId: "M13", path: "素材/剪辑素材/剪辑/sd1674358932_2.MP4", durationSec: 6.3, resolution: "1280x720", fps: "30", decodable: true, visualSummary: "雾滩远景，人物很小，低对比、低动势。", motionIntensity: "low", visualDensity: "low", possibleRole: "mood breath", risk: "低能量与 BGM 不一定搭，必须短用。", selection: "selected", reason: "杯子之后的短呼吸点，给中段机械密度降噪。" },
  { materialId: "M14", path: "素材/剪辑素材/剪辑/sd1674359014_2.MP4", durationSec: 6.166667, resolution: "720x1280", fps: "30", decodable: true, visualSummary: "竖屏沙纹/足迹/地面纹理，低主体但 texture 强。", motionIntensity: "low", visualDensity: "medium", possibleRole: "opening texture hook", risk: "若拖长会回到旧沙纹安全开场。", selection: "selected", reason: "只用 0.9s 做 tactile hook，并立即切入 gym。" },
];

export const selectedMaterialIds = materialPoolScan.filter((item) => item.selection === "selected").map((item) => item.materialId);

export const visualLanguagePreflight = {
  source_inventory_read: true,
  migration_library_read: true,
  decision_router_read: true,
  analysis_asset_ids: [2, 5, 6, 7, 17, 21, 22, 23, 25, 27, 29, 35, 37, 50, 53, 57, 58, 59],
  reference_rule_links: ["54:F.extraction_contract", "55:D.sticker_type_library", "55:E.attachment_relation_library", "55:F.shape_drawing_logic_library", "55:G.stroke_material_motion_library", "55:H.caption_visual_language_library", "55:I.caption_sticker_relation_library", "56:E.caption_router", "56:F.sticker_visual_punctuation_router", "56:G.caption_sticker_conflict_resolver", "56:J.template_fallback_gate"],
  migration_library_used: true,
  decision_router_used: true,
  template_fallback: false,
  copy_risk_check: "只迁移功能关系、锚点、层级、材质和动效；不复制参考视频素材、第三方贴纸、平台 UI、品牌包装、原字体或原文案。M07 杯身品牌风险经审片包检查后已移出最终时间线。",
};

export const routedSegments: RoutedSegment[] = [
  { segmentId: "seg_01_sand_texture_hook", timeRange: "0.00-0.90s", materialId: "M14", src: "素材/剪辑素材/剪辑/sd1674359014_2.MP4", sourceTimeRange: "0.20-1.10s", sourceStartSec: 0.2, fromSec: 0, durationSec: 0.9, role: "opening_hook_texture", bgmRelation: "active intro texture hit; no precise beat claim", visualReason: "用沙纹做 0.9s tactile hook，不把低主体素材拖成旧安全开场。", captionOrStickerNeed: "hero_keyword + edge_attached_short_stroke_cluster", risk: "低主体素材过长会像素材拼接。", fallbackIfFailed: "改用 M08 直接开场，M14 退回 backup texture。", scaleStart: 1.04, scaleEnd: 1.12, yStart: 0, yEnd: -18, objectPosition: "50% 50%", grade: "cool_texture" },
  { segmentId: "seg_02_gym_entry_identity", timeRange: "0.90-2.10s", materialId: "M08", src: "素材/剪辑素材/剪辑/IMG_1360.MOV", sourceTimeRange: "0.14-1.34s", sourceStartSec: 0.14, fromSec: 0.9, durationSec: 1.2, role: "identity_entry", bgmRelation: "intro pulse becomes gym identity", visualReason: "快速把 texture hook 落到 gym 人物/器械身份。", captionOrStickerNeed: "attached_phrase + caption_relation_micro_mark", risk: "可识别人物需用户审片判断。", fallbackIfFailed: "改用 M05 空间镜头进场，M08 降级。", scaleStart: 1.16, scaleEnd: 1.08, yStart: 12, yEnd: -20, objectPosition: "50% 50%", grade: "gym_pulse" },
  { segmentId: "seg_03_gym_space_build", timeRange: "2.10-3.15s", materialId: "M05", src: "素材/剪辑素材/剪辑/IMG_1353.MOV", sourceTimeRange: "0.40-1.45s", sourceStartSec: 0.4, fromSec: 2.1, durationSec: 1.05, role: "space_build", bgmRelation: "intro to rise; space confirmation", visualReason: "补足空间，不让人物/器械开场变成孤立镜头。", captionOrStickerNeed: "no strong layer; transition edge only", risk: "主体弱，保持短切。", fallbackIfFailed: "删除该段并延长 M08/M03。", scaleStart: 1.2, scaleEnd: 1.09, yStart: 14, yEnd: -12, objectPosition: "51% 50%", grade: "gym_pulse" },
  { segmentId: "seg_04_main_action_push", timeRange: "3.15-5.05s", materialId: "M03", src: "素材/剪辑素材/剪辑/IMG_1350.MOV", sourceTimeRange: "0.35-2.25s", sourceStartSec: 0.35, fromSec: 3.15, durationSec: 1.9, role: "action_focus", bgmRelation: "rise/action pressure", visualReason: "主动作提前进入，避免只做空间铺陈。", captionOrStickerNeed: "hero_keyword + contact_flash", risk: "器械遮挡高，字幕和贴纸必须偏边缘。", fallbackIfFailed: "缩短到 1.3s 并把 M04 提前。", scaleStart: 1.15, scaleEnd: 1.05, yStart: 2, yEnd: -22, objectPosition: "50% 50%", grade: "gym_pulse" },
  { segmentId: "seg_05_metal_texture_cut", timeRange: "5.05-6.15s", materialId: "M06", src: "素材/剪辑素材/剪辑/IMG_1358.MOV", sourceTimeRange: "0.70-1.80s", sourceStartSec: 0.7, fromSec: 5.05, durationSec: 1.1, role: "texture_rhythm_push", bgmRelation: "short mechanical texture accent", visualReason: "用金属近景做 rhythm push，不承担叙事说明。", captionOrStickerNeed: "attached_phrase only; no extra sticker", risk: "主体弱，超过 1.2s 会像填充。", fallbackIfFailed: "删除并让 M04 承接机器段。", scaleStart: 1.22, scaleEnd: 1.1, yStart: -12, yEnd: 18, objectPosition: "48% 50%", grade: "gym_pulse" },
  { segmentId: "seg_06_machine_direction", timeRange: "6.15-8.00s", materialId: "M04", src: "素材/剪辑素材/剪辑/IMG_1351.MOV", sourceTimeRange: "1.05-2.90s", sourceStartSec: 1.05, fromSec: 6.15, durationSec: 1.85, role: "machine_direction_push", bgmRelation: "action sustain with visible line direction", visualReason: "机械线条给 motion trail 明确锚点。", captionOrStickerNeed: "motion_trail_punctuation; caption stays light", risk: "高密度画面，贴纸只能短停。", fallbackIfFailed: "缩短 M04，回到 M03 动作 reprise。", scaleStart: 1.18, scaleEnd: 1.08, yStart: 16, yEnd: -18, objectPosition: "50% 50%", grade: "gym_pulse" },
  { segmentId: "seg_07_sky_breath", timeRange: "8.00-9.20s", materialId: "M10", src: "素材/剪辑素材/剪辑/IMG_3225.MOV", sourceTimeRange: "1.10-2.30s", sourceStartSec: 1.1, fromSec: 8, durationSec: 1.2, role: "visual_reset", bgmRelation: "short breath without full stop", visualReason: "用海天开阔面给机械段换气，避免 M07 杯身文字带来的 brand/copy risk。", captionOrStickerNeed: "hand_drawn/whisper caption only; no sky sticker", risk: "人群和景区感较强，必须短用并继续接 M13/M11。", fallbackIfFailed: "删除 M10，改由 M13/M11 承担 breath。", scaleStart: 1.12, scaleEnd: 1.04, yStart: 6, yEnd: -12, objectPosition: "50% 50%", grade: "breath_soft" },
  { segmentId: "seg_08_fog_breath", timeRange: "9.20-10.55s", materialId: "M13", src: "素材/剪辑素材/剪辑/sd1674358932_2.MP4", sourceTimeRange: "1.00-2.35s", sourceStartSec: 1, fromSec: 9.2, durationSec: 1.35, role: "mood_breath", bgmRelation: "breath window; energy downshift", visualReason: "雾滩低密度承接杯子呼吸，给全片留气口。", captionOrStickerNeed: "negative_space_breath_line + whisper_caption", risk: "场景跳线，只短用。", fallbackIfFailed: "改成 M11 单一 visual reset。", scaleStart: 1.14, scaleEnd: 1.05, yStart: 16, yEnd: -12, objectPosition: "50% 50%", grade: "breath_soft" },
  { segmentId: "seg_09_sky_reset", timeRange: "10.55-11.85s", materialId: "M11", src: "素材/剪辑素材/剪辑/IMG_3226.MOV", sourceTimeRange: "1.15-2.45s", sourceStartSec: 1.15, fromSec: 10.55, durationSec: 1.3, role: "visual_reset", bgmRelation: "breath to return bridge", visualReason: "开阔云层做视觉 reset，局部 no-layer 由剪辑承载。", captionOrStickerNeed: "no caption/no sticker for density control", risk: "过长会离开 gym 主线。", fallbackIfFailed: "删除该段，直接进入 shadow reset。", scaleStart: 1.1, scaleEnd: 1.02, yStart: 0, yEnd: -18, objectPosition: "50% 50%", grade: "breath_soft" },
  { segmentId: "seg_10_shadow_mood_reset", timeRange: "11.85-13.45s", materialId: "M09", src: "素材/剪辑素材/剪辑/IMG_1361.MOV", sourceTimeRange: "2.20-3.80s", sourceStartSec: 2.2, fromSec: 11.85, durationSec: 1.6, role: "shadow_mood_reset", bgmRelation: "darker return preparation", visualReason: "夜路影子把 reset 变成日记感，而非纯风景插入。", captionOrStickerNeed: "motion_trail_punctuation + whisper caption", risk: "可能跳戏；需要用户审片。", fallbackIfFailed: "改为 gym-only return，M09 留在 close。", scaleStart: 1.12, scaleEnd: 1.04, yStart: 8, yEnd: -12, objectPosition: "50% 50%", grade: "dark_close" },
  { segmentId: "seg_11_action_return", timeRange: "13.45-15.05s", materialId: "M03", src: "素材/剪辑素材/剪辑/IMG_1350.MOV", sourceTimeRange: "2.05-3.65s", sourceStartSec: 2.05, fromSec: 13.45, durationSec: 1.6, role: "return_action", bgmRelation: "return pulse after breath/reset", visualReason: "从 shadow 回到 gym 动作，让结构闭合。", captionOrStickerNeed: "caption only; no second contact flash to avoid repetition", risk: "M03 二次出现可能重复。", fallbackIfFailed: "换 M04/M08 做 return。", scaleStart: 1.12, scaleEnd: 1.04, yStart: 0, yEnd: -12, objectPosition: "50% 50%", grade: "gym_pulse" },
  { segmentId: "seg_12_identity_return", timeRange: "15.05-16.30s", materialId: "M05", src: "素材/剪辑素材/剪辑/IMG_1353.MOV", sourceTimeRange: "1.20-2.45s", sourceStartSec: 1.2, fromSec: 15.05, durationSec: 1.25, role: "return_identity", bgmRelation: "outro returns to place", visualReason: "回到 gym 空间，降低海/夜路素材像另一条片的风险。", captionOrStickerNeed: "attached_phrase / caption_only", risk: "空间回拉可能突兀。", fallbackIfFailed: "删掉该段，让 M03 直接接 shadow close。", scaleStart: 1.16, scaleEnd: 1.08, yStart: 10, yEnd: -10, objectPosition: "51% 50%", grade: "gym_pulse" },
  { segmentId: "seg_13_shadow_close", timeRange: "16.30-18.00s", materialId: "M09", src: "素材/剪辑素材/剪辑/IMG_1361.MOV", sourceTimeRange: "4.70-6.40s", sourceStartSec: 4.7, fromSec: 16.3, durationSec: 1.7, role: "close", bgmRelation: "final fade; dark close", visualReason: "用影子尾声收住，不做平台尾卡或参考 UI。", captionOrStickerNeed: "whisper_caption only; no sticker", risk: "如果用户认为结尾跳戏，改为 gym-only close。", fallbackIfFailed: "使用 M05 或 M11 收尾。", scaleStart: 1.08, scaleEnd: 1.02, yStart: 8, yEnd: -8, objectPosition: "50% 50%", grade: "dark_close" },
];

export const captionEvents: CaptionEvent[] = [
  { captionId: "caption_01_sand_hero", timeRange: "0.18-0.88s", fromSec: 0.18, durationSec: 0.7, text: "先落地", textStatus: "draft_text_pending_user_review", captionType: "hero_keyword", analysisAssetIds: [53, 59], referenceRuleLinks: ["55:H.caption_01", "56:E.caption_branch_01_hero_keyword"], anchorTarget: "M14 沙纹/足迹 texture", pictureRelation: "大字贴在纹理留白处，负责开头抓眼，不解释画面。", positionMode: "center_hero", attentionWeight: "high", entryFrames: 5, holdFrames: 14, exitFrames: 5, captionStickerRelation: "caption_leads_sticker_supports", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "hero_keyword: 大字短停，参与 opening hook。", stickerVisualLanguageDecision: "edge_attached_short_stroke_cluster 降权辅助沙纹边缘。", copyRiskCheck: "原创短句；不复制参考文案、字体或平台 UI。", templateFallback: false, x: 108, y: 1160, fontSize: 92, rotateDeg: -4, maxWidth: 560 },
  { captionId: "caption_02_gym_entry", timeRange: "1.06-1.92s", fromSec: 1.06, durationSec: 0.86, text: "进场", textStatus: "draft_text_pending_user_review", captionType: "attached_phrase", analysisAssetIds: [53, 59], referenceRuleLinks: ["55:H.caption_02", "56:E.caption_branch_02_attached_phrase"], anchorTarget: "M08 器械前景/人物入场关系", pictureRelation: "贴近器械边缘，像跟随进入画面，不做固定 lower-third。", positionMode: "object_edge", attentionWeight: "medium", entryFrames: 5, holdFrames: 16, exitFrames: 5, captionStickerRelation: "shared_anchor_split_roles", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "attached_phrase: 文本靠器械边缘，作为身份进入提示。", stickerVisualLanguageDecision: "caption_relation_micro_mark 只做语气，不复述文字。", copyRiskCheck: "原创短词；不使用参考字体/原文案。", templateFallback: false, x: 78, y: 1368, fontSize: 58, rotateDeg: -2, maxWidth: 360 },
  { captionId: "caption_03_action_push", timeRange: "3.28-4.36s", fromSec: 3.28, durationSec: 1.08, text: "推上去", textStatus: "draft_text_pending_user_review", captionType: "hero_keyword", analysisAssetIds: [53, 59], referenceRuleLinks: ["55:H.caption_01", "56:E.caption_branch_01_hero_keyword"], anchorTarget: "M03 动作峰值/器械接触窗口", pictureRelation: "大字在动作侧边，服务动作推力，不压接触点。", positionMode: "diagonal_attached", attentionWeight: "high", entryFrames: 4, holdFrames: 18, exitFrames: 5, captionStickerRelation: "sticker_leads_caption_supports", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "hero_keyword: 动作峰值短句，不是说明牌。", stickerVisualLanguageDecision: "contact_flash 主导动作反应，caption 只给语气。", copyRiskCheck: "原创短句；不复制参考字幕或促销爆点。", templateFallback: false, x: 86, y: 1242, fontSize: 76, rotateDeg: -5, maxWidth: 460 },
  { captionId: "caption_04_machine_line", timeRange: "5.38-6.02s", fromSec: 5.38, durationSec: 0.64, text: "线条在跑", textStatus: "draft_text_pending_user_review", captionType: "attached_phrase", analysisAssetIds: [53, 59], referenceRuleLinks: ["55:H.caption_02", "56:E.caption_branch_02_attached_phrase"], anchorTarget: "M06 金属配重线条", pictureRelation: "贴近垂直金属结构，提示纹理节奏。", positionMode: "object_edge", attentionWeight: "medium", entryFrames: 4, holdFrames: 12, exitFrames: 4, captionStickerRelation: "caption_only", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "attached_phrase: 贴线条，不固定底部。", stickerVisualLanguageDecision: "该段不加贴纸，避免高密度画面拥挤。", copyRiskCheck: "原创短句，无品牌/UI/参考文案复制。", templateFallback: false, x: 650, y: 460, fontSize: 42, rotateDeg: 4, maxWidth: 330 },
  { captionId: "caption_05_sky_breath", timeRange: "8.18-9.03s", fromSec: 8.18, durationSec: 0.85, text: "缓一口", textStatus: "draft_text_pending_user_review", captionType: "hand_drawn_reaction_word", analysisAssetIds: [47, 50, 53, 59], referenceRuleLinks: ["55:H.caption_05", "56:E.caption_branch_05_hand_drawn_reaction_word", "56:G.caption_sticker_conflict_resolver"], anchorTarget: "M10 海天留白与远处人物尺度", pictureRelation: "短手写反应词放在海面留白侧，不把天空当贴纸底板。", positionMode: "negative_space_small", attentionWeight: "medium", entryFrames: 5, holdFrames: 14, exitFrames: 5, captionStickerRelation: "caption_only", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "hand_drawn_reaction_word: 呼吸段轻反应，跟随画面开阔而不是说明风景。", stickerVisualLanguageDecision: "sky/no-layer branch: 不给天空硬塞贴纸。", copyRiskCheck: "原创短句；M07 brand/copy 风险已移出最终时间线。", templateFallback: false, x: 86, y: 1220, fontSize: 54, rotateDeg: -3, maxWidth: 360 },
  { captionId: "caption_06_fog_whisper", timeRange: "9.72-10.45s", fromSec: 9.72, durationSec: 0.73, text: "慢一点", textStatus: "draft_text_pending_user_review", captionType: "whisper_caption", analysisAssetIds: [47, 53, 59], referenceRuleLinks: ["55:H.caption_03", "56:E.caption_branch_03_whisper_caption"], anchorTarget: "M13 雾滩远景留白", pictureRelation: "小字贴在低对比留白区，承接 breathing window。", positionMode: "negative_space_small", attentionWeight: "low", entryFrames: 8, holdFrames: 12, exitFrames: 8, captionStickerRelation: "caption_leads_sticker_supports", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "whisper_caption: 低权重呼吸语气。", stickerVisualLanguageDecision: "negative_space_breath_line 只做低权重视觉呼吸。", copyRiskCheck: "原创短句，无参考复制。", templateFallback: false, x: 92, y: 1288, fontSize: 38, rotateDeg: -1, maxWidth: 300 },
  { captionId: "caption_07_shadow_close", timeRange: "15.72-17.28s", fromSec: 15.72, durationSec: 1.56, text: "收在影子里", textStatus: "draft_text_pending_user_review", captionType: "whisper_caption", analysisAssetIds: [47, 53, 59], referenceRuleLinks: ["55:H.caption_03", "56:E.caption_branch_03_whisper_caption"], anchorTarget: "M05 回到 gym 后转入 M09 影子 close", pictureRelation: "小字作为结尾语气，不做平台尾卡。", positionMode: "lower_left_whisper", attentionWeight: "low", entryFrames: 8, holdFrames: 28, exitFrames: 10, captionStickerRelation: "caption_only", migrationLibraryUsed: true, decisionRouterUsed: true, captionVisualLanguageDecision: "whisper_caption: 结尾低权重收束。", stickerVisualLanguageDecision: "结尾不再加贴纸，避免尾声拥挤。", copyRiskCheck: "原创短句；不复制参考尾卡/UI/原文案。", templateFallback: false, x: 72, y: 1392, fontSize: 42, rotateDeg: -2, maxWidth: 420 },
];

export const stickerEvents: StickerEvent[] = [
  { stickerId: "sticker_01_sand_edge_wiggle", timeRange: "0.28-0.82s", fromSec: 0.28, durationSec: 0.54, stickerNeeded: true, analysisAssetIds: [43, 44, 50, 53, 59], referenceRuleLinks: ["55:D.sticker_type_05", "55:E.attach_01", "55:F.shape_01", "56:F.sticker_branch_05_edge"], anchorTarget: "M14 沙纹边缘/足迹纹理方向", anchorReason: "沙纹有真实边缘和方向，适合低权重 edge strokes。", attachmentRelation: "edge_attached", stickerType: "edge_attached_short_stroke_cluster", shapeGrammar: "short_stroke_cluster", shapeDerivedFromEvent: "短笔触沿沙纹方向长出，不漂浮在空白处。", strokeOutline: "cream outer stroke + warm inner stroke + uneven rounded ends", materialCompositing: "soft-light shadow, low contrast to blend with sand", scaleDistance: "8-28px from sand edge, not centered decoration", motionSignature: "4 frame draw, 12 frame hold, quick dissolve", captionRelation: "supports caption_01_sand_hero without repeating text", attentionWeight: "low", copyRiskCheck: "原创 SVG/CSS 线条；不复制第三方贴纸或参考形状。", badPatternAvoided: ["floating_ui_layer", "quantity_as_quality", "template_shape_swap"], templateFallback: false, fallbackIfFailed: "删除该贴纸，保留 caption_01。", x: 608, y: 1036, rotateDeg: -12, scale: 0.9 },
  { stickerId: "sticker_02_entry_caption_tick", timeRange: "1.18-1.82s", fromSec: 1.18, durationSec: 0.64, stickerNeeded: true, analysisAssetIds: [21, 44, 53, 59], referenceRuleLinks: ["55:D.sticker_type_08", "55:E.attach_08", "55:F.shape_09", "56:F.sticker_branch_08_caption_micro"], anchorTarget: "caption_02_gym_entry 与 M08 器械边缘共享锚点", anchorReason: "caption 已承载语气，贴纸只做微标点。", attachmentRelation: "caption_relation_attached", stickerType: "caption_relation_micro_mark", shapeGrammar: "micro_tick_pair", shapeDerivedFromEvent: "从进场短词左侧边缘长出，不作为第二字幕。", strokeOutline: "white outer stroke with muted yellow inner tick", materialCompositing: "caption-edge foreground mark with small drop shadow", scaleDistance: "贴近 caption 12-22px", motionSignature: "entry synced roughly with caption, not precise beat", captionRelation: "caption leads, sticker supports", attentionWeight: "low", copyRiskCheck: "原创微标点；无参考 UI/字体复制。", badPatternAvoided: ["sticker_caption_duplicate", "floating_ui_layer"], templateFallback: false, fallbackIfFailed: "删除 sticker，caption_02 保持。", x: 64, y: 1328, rotateDeg: -8, scale: 0.82 },
  { stickerId: "sticker_03_action_contact_flash", timeRange: "3.48-4.08s", fromSec: 3.48, durationSec: 0.6, stickerNeeded: true, analysisAssetIds: [40, 41, 44, 53, 59], referenceRuleLinks: ["55:D.sticker_type_03", "55:E.attach_02", "55:F.shape_02", "56:F.sticker_branch_03_contact"], anchorTarget: "M03 发力/器械接触窗口", anchorReason: "动作峰值清楚，contact flash 有真实接触锚点。", attachmentRelation: "contact_point_attached", stickerType: "contact_flash", shapeGrammar: "contact_flash", shapeDerivedFromEvent: "1-3 个短火花从接触附近长出，不做促销爆点。", strokeOutline: "thick uneven cream outline + warm center stroke", materialCompositing: "drop shadow plus slight screen blend", scaleDistance: "离接触窗口约 18-42px，不遮挡手/器械", motionSignature: "3 frame pop, 14 frame hold, 3 frame exit", captionRelation: "sticker leads, caption_03 supports", attentionWeight: "medium", copyRiskCheck: "原创 SVG 火花；不复制参考贴纸或爆炸形。", badPatternAvoided: ["quantity_as_quality", "caption_as_explanation", "copy_reference_surface"], templateFallback: false, fallbackIfFailed: "保留 caption_03，contact flash 删除或缩小。", x: 666, y: 1038, rotateDeg: -10, scale: 1 },
  { stickerId: "sticker_04_machine_motion_trail", timeRange: "6.72-7.42s", fromSec: 6.72, durationSec: 0.7, stickerNeeded: true, analysisAssetIds: [44, 47, 53, 59], referenceRuleLinks: ["55:D.sticker_type_04", "55:E.attach_03", "55:F.shape_03", "56:F.sticker_branch_04_motion"], anchorTarget: "M04 器械斜向金属线条", anchorReason: "机器方向可见，适合错帧短线沿方向排列。", attachmentRelation: "motion_direction_attached", stickerType: "motion_trail_punctuation", shapeGrammar: "motion_trail_punctuation", shapeDerivedFromEvent: "点线顺器械方向展开，不画成通用箭头。", strokeOutline: "cream outline, yellow core, slight broken endpoints", materialCompositing: "foreground line with low opacity shadow to avoid UI float", scaleDistance: "沿器械边缘 12-36px", motionSignature: "staggered reveal, short hold, cut with shot", captionRelation: "caption_04 ended; sticker owns motion cue", attentionWeight: "medium", copyRiskCheck: "原创短线轨迹；无参考复制。", badPatternAvoided: ["floating_ui_layer", "template_shape_swap"], templateFallback: false, fallbackIfFailed: "降为 no-sticker，M04 只靠剪辑推进。", x: 386, y: 828, rotateDeg: 14, scale: 0.86 },
  { stickerId: "sticker_05_sky_no_layer_blocked", timeRange: "8.26-8.96s", fromSec: 8.26, durationSec: 0.7, stickerNeeded: false, analysisAssetIds: [47, 52, 53, 59], referenceRuleLinks: ["55:E.attach_07", "56:F.sticker_visual_punctuation_router", "56:G.caption_sticker_conflict_resolver", "56:L.no_layer_rule"], anchorTarget: "M10 海天留白", anchorReason: "天空和海面没有足够具体的接触点；硬贴会变成浮层装饰。", attachmentRelation: "negative_space_attached", stickerType: "negative_space_breath_line", shapeGrammar: "whisper_line_or_tick", shapeDerivedFromEvent: "候选被删除；该段由 caption 和剪辑呼吸承担。", strokeOutline: "not_rendered_due_no_layer_rule", materialCompositing: "not_rendered_due_no_layer_rule", scaleDistance: "not_rendered_due_no_layer_rule", motionSignature: "not_rendered_due_no_layer_rule", captionRelation: "caption_05_sky_breath carries breath reaction", attentionWeight: "low", copyRiskCheck: "原创 no-layer decision；不复制参考贴纸，不在天空硬塞符号。", badPatternAvoided: ["floating_ui_layer", "quantity_as_quality", "caption_as_explanation"], templateFallback: false, fallbackIfFailed: "已回退为 caption-only；不进入视频。", x: 0, y: 0, rotateDeg: 0, scale: 1 },
  { stickerId: "sticker_06_fog_breath_line", timeRange: "9.82-10.58s", fromSec: 9.82, durationSec: 0.76, stickerNeeded: true, analysisAssetIds: [44, 47, 52, 53, 59], referenceRuleLinks: ["55:D.sticker_type_07", "55:E.attach_07", "55:F.shape_09", "56:F.sticker_branch_07_breath"], anchorTarget: "M13 雾滩留白和地平线方向", anchorReason: "呼吸点留白清楚，适合低权重 breath line。", attachmentRelation: "negative_space_attached", stickerType: "negative_space_breath_line", shapeGrammar: "whisper_line_or_tick", shapeDerivedFromEvent: "细线沿低对比留白方向展开，不装饰天空。", strokeOutline: "soft off-white thin stroke, low contrast", materialCompositing: "very low opacity shadow, blends into fog", scaleDistance: "贴地平线/留白边缘，不靠随机坐标", motionSignature: "slow 10 frame reveal, soft hold", captionRelation: "caption_06 leads; sticker breathes under it", attentionWeight: "low", copyRiskCheck: "原创线条；无参考资产复制。", badPatternAvoided: ["quantity_as_quality", "floating_ui_layer"], templateFallback: false, fallbackIfFailed: "删除 breath line，保留 M13 no-layer breath。", x: 138, y: 1038, rotateDeg: -2, scale: 0.82 },
  { stickerId: "sticker_07_shadow_motion_trail", timeRange: "12.38-13.18s", fromSec: 12.38, durationSec: 0.8, stickerNeeded: true, analysisAssetIds: [44, 47, 53, 59], referenceRuleLinks: ["55:D.sticker_type_04", "55:E.attach_03", "55:F.shape_03", "56:F.sticker_branch_04_motion"], anchorTarget: "M09 影子移动方向", anchorReason: "暗段有清楚影子轨迹，适合低亮 motion trail。", attachmentRelation: "motion_direction_attached", stickerType: "motion_trail_punctuation", shapeGrammar: "motion_trail_punctuation", shapeDerivedFromEvent: "沿影子移动方向放短点线，不变成箭头说明。", strokeOutline: "dark outer soft edge + dim cream inner stroke", materialCompositing: "multiply-like dark edge, low glow for visibility", scaleDistance: "贴近影子轮廓 16-44px", motionSignature: "staggered dim reveal, exits before action return", captionRelation: "shared anchor with later caption_07 but not duplicate meaning", attentionWeight: "low", copyRiskCheck: "原创暗线；无参考复制。", badPatternAvoided: ["floating_ui_layer", "sticker_caption_duplicate"], templateFallback: false, fallbackIfFailed: "删除 trail，让 shadow reset 只靠画面和 BGM。", x: 478, y: 1120, rotateDeg: 9, scale: 0.72 },
];

export const transitionEvents: TransitionEvent[] = [
  { transitionId: "transition_01_texture_to_gym", timeRange: "0.82-1.00s", fromSec: 0.82, durationSec: 0.18, transitionType: "texture_cut_wipe", fromMaterial: "M14", toMaterial: "M08", whyNeeded: "用短扫线把低主体 texture hook 切进 gym identity。" },
  { transitionId: "transition_02_space_to_action", timeRange: "3.02-3.24s", fromSec: 3.02, durationSec: 0.22, transitionType: "motion_wipe", fromMaterial: "M05", toMaterial: "M03", whyNeeded: "从空间建立进入主动作，防止硬切像素材拼接。" },
  { transitionId: "transition_03_action_to_texture_flash", timeRange: "4.96-5.14s", fromSec: 4.96, durationSec: 0.18, transitionType: "texture_flash", fromMaterial: "M03", toMaterial: "M06", whyNeeded: "用短闪接机械 texture，不写精准卡点通过。" },
  { transitionId: "transition_04_machine_to_breath", timeRange: "7.92-8.18s", fromSec: 7.92, durationSec: 0.26, transitionType: "breath_dip", fromMaterial: "M04", toMaterial: "M10", whyNeeded: "从机械密度降到海天呼吸点，同时避开杯身品牌风险。" },
  { transitionId: "transition_05_fog_to_sky", timeRange: "10.44-10.68s", fromSec: 10.44, durationSec: 0.24, transitionType: "soft_crossfade", fromMaterial: "M13", toMaterial: "M11", whyNeeded: "低能呼吸到开阔视觉 reset。" },
  { transitionId: "transition_06_shadow_to_action_return", timeRange: "13.36-13.56s", fromSec: 13.36, durationSec: 0.2, transitionType: "return_cutline", fromMaterial: "M09", toMaterial: "M03", whyNeeded: "把暗段带回 gym action，不用贴纸遮切。" },
];

export const captionStickerConflictResolution = [
  { check: "two_primary_visuals", result: "resolved", action: "caption_03 and sticker_03 share action window; sticker leads contact, caption offset left and shorter." },
  { check: "duplicate_meaning", result: "resolved", action: "stickers draw reactions/edges/trails; captions write mood/action words only." },
  { check: "sticker_blocks_caption", result: "resolved", action: "sticker_02 attaches near caption but lower attention; sticker_05 uses no-layer branch and is not rendered." },
  { check: "visual_density_too_high", result: "resolved", action: "M06/M04 high-density sections use only one visual language layer at a time." },
  { check: "copy_risk_conflict", result: "resolved", action: "M07 removed from final timeline after review-pack inspection; no reference UI/font/sticker/brand assets copied." },
];

export const fullVideoCandidateCompletionMatrix = [
  ["BGM_style_and_audio", "included", "same BGM path, readable AAC stereo, rough mood/energy sections recorded"],
  ["material_selection", "included", "14 files scanned; selected/backup/rejected table completed"],
  ["sequence_structure", "included", "new texture -> gym -> action -> breath -> shadow -> return -> close timeline"],
  ["pacing_and_rhythm", "included", "18s section timing with short texture/action/breath windows; no precise beat claim"],
  ["captions_or_text_layer", "included", "7 original caption events routed through 56 caption branches"],
  ["stickers_or_visual_punctuation", "included", "7 candidate events; 6 rendered, 1 removed by copy-risk router"],
  ["motion_effects_and_transitions", "included", "6 transition events plus entry/hold/exit for caption/sticker"],
  ["composition_and_crop", "included", "1080x1920 vertical crop, per-segment objectPosition and scale"],
  ["audio_mix", "included", "BGM level 0.80, source clip audio muted, fade-in/out"],
  ["export_and_technical_validation", "pending_until_render", "render + ffprobe + decode check required"],
  ["review_pack", "pending_until_script", "start/mid/end plus caption/sticker evidence frames required"],
  ["failure_feedback_routing", "included", "failure routing map included in data and report"],
] as const;

export const failureRouting = [
  { possibleFailure: "feedback_no_full_video_feel", routeBackTo: "51 full_video_candidate_completion_matrix + segment_table", requiredFix: "rebuild segment functions rather than adding more overlays", forbiddenFix: "claim render success as content pass" },
  { possibleFailure: "feedback_visual_language_still_template_like", routeBackTo: "54/55/56 router + 53 diversity spec", requiredFix: "revise anchor, attachment, shape grammar, material and caption relation", forbiddenFix: "only change color/position or add quantity" },
  { possibleFailure: "feedback_bgm_picture_mismatch", routeBackTo: "BGM rough mood gate + material selection table", requiredFix: "reselect material roles after human listening review", forbiddenFix: "write automatic rough feature as precise beat confirmation" },
  { possibleFailure: "feedback_material_not_same_video", routeBackTo: "selected material table", requiredFix: "remove M13/M11/M09 or move to gym-only route", forbiddenFix: "use filters/stickers to hide semantic mismatch" },
  { possibleFailure: "feedback_copy_risk_high", routeBackTo: "56 copy_risk_gate", requiredFix: "delete risky surface mark/caption and crop/replace material", forbiddenFix: "copy brand/packaging/reference surface" },
];

export const reviewTimes = [
  { label: "start_frame", second: 0.35, evidence: "opening hook / caption_01 / sticker_01" },
  { label: "mid_frame", second: 9.2, evidence: "object breath to fog breath" },
  { label: "end_frame", second: 17.55, evidence: "shadow close / caption_07" },
];

export const routedFullCandidateStatus = "18s_visual_language_routed_full_candidate_rendered_pending_user_review";
