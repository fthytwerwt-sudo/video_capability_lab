export type AutoVisualAssetPlacement = {
  asset_need_id: string;
  time_range: {
    start_sec: number;
    end_sec: number;
  };
  asset_type: string;
  original_asset_type_from_detection: string;
  caption_text: string;
  original_caption_text_from_detection: string;
  reason: string;
  alpha_path: string;
  anchor: string;
  x: number;
  y: number;
  origin: "center";
  max_width: number;
  caption_x: number;
  caption_y: number;
  caption_align: "center";
  scale: number;
  enter_animation: "pop" | "slide" | "bounce" | "scribble";
  exit_animation: "fade" | "pop_out" | "slide_out";
  success_criteria: string[];
  review_status: "pending_user_review";
  approved_for_video: false;
  supplemental_existing_ali_asset: boolean;
  repair_note: "auto_probe_generated_asset" | "provider_arrearage_fallback_existing_ali_asset";
};

export const autoVisualAssetProbeComposition = {
  id: "自动视觉资产需求识别探针-auto-visual-asset-need-detection-probe",
  width: 1080,
  height: 1920,
  fps: 30,
  durationSec: 8,
  durationInFrames: 240,
  sourceVideo:
    "dist/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate.mp4",
  runtimePlacementPlan:
    "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/remotion_placement_plan.json",
  reviewStatus: "pending_user_review",
  status: "auto_visual_asset_need_detection_probe_remediated_pending_user_review",
};

export const autoVisualAssetPlacements: AutoVisualAssetPlacement[] = [
  {
    asset_need_id: "asset_need_01",
    time_range: { start_sec: 0.28, end_sec: 1.05 },
    asset_type: "font_card",
    original_asset_type_from_detection: "font_card",
    caption_text: "落地",
    original_caption_text_from_detection: "落地",
    reason:
      "开场纹理低主体但有落点语气，用原创手写字牌让观众先读到“落地”，不把低主体画面拖成纯素材。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_01_alpha.png",
    anchor: "center_lower",
    x: 540,
    y: 1260,
    origin: "center",
    max_width: 440,
    caption_x: 540,
    caption_y: 1502,
    caption_align: "center",
    scale: 0.36,
    enter_animation: "pop",
    exit_animation: "fade",
    success_criteria: [
      "和开场“落地”字幕/纹理有关",
      "不遮挡主体",
      "不遮挡原字幕",
      "能看出是字牌不是随机装饰",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: false,
    repair_note: "auto_probe_generated_asset",
  },
  {
    asset_need_id: "asset_need_02",
    time_range: { start_sec: 1.28, end_sec: 2.12 },
    asset_type: "reaction_sticker",
    original_asset_type_from_detection: "reaction_sticker",
    caption_text: "进场",
    original_caption_text_from_detection: "进场",
    reason:
      "texture 切到 gym 身份时需要轻反应贴纸确认“进入状态”，让转场更像画面反应而不是说明字幕。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_02_alpha.png",
    anchor: "right_mid",
    x: 790,
    y: 880,
    origin: "center",
    max_width: 300,
    caption_x: 790,
    caption_y: 1060,
    caption_align: "center",
    scale: 0.24,
    enter_animation: "slide",
    exit_animation: "pop_out",
    success_criteria: [
      "和进场镜头有关",
      "不遮挡人物和器械主体",
      "不遮挡字幕",
      "表情是转场反应而非随机 emoji",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: false,
    repair_note: "auto_probe_generated_asset",
  },
  {
    asset_need_id: "asset_need_03",
    time_range: { start_sec: 3.42, end_sec: 4.18 },
    asset_type: "motion_punctuation",
    original_asset_type_from_detection: "motion_punctuation",
    caption_text: "咔",
    original_caption_text_from_detection: "咔",
    reason:
      "动作接触峰值需要图片化接触标点，验证自动识别能把“受力点”转成可贴入资产。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_03_alpha.png",
    anchor: "near_object",
    x: 715,
    y: 1000,
    origin: "center",
    max_width: 310,
    caption_x: 715,
    caption_y: 1185,
    caption_align: "center",
    scale: 0.3,
    enter_animation: "bounce",
    exit_animation: "pop_out",
    success_criteria: [
      "贴近动作接触点",
      "不遮挡手/器械核心",
      "不遮挡字幕“咔”",
      "像受力标点而非促销爆炸贴",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: false,
    repair_note: "auto_probe_generated_asset",
  },
  {
    asset_need_id: "asset_need_04",
    time_range: { start_sec: 4.05, end_sec: 4.78 },
    asset_type: "reaction_sticker",
    original_asset_type_from_detection: "reaction_sticker",
    caption_text: "顶住",
    original_caption_text_from_detection: "顶住",
    reason:
      "接触后的回弹需要一个小情绪反应，分担动作压力感，避免继续堆同一种字体牌。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_04_alpha.png",
    anchor: "left_mid",
    x: 232,
    y: 820,
    origin: "center",
    max_width: 300,
    caption_x: 232,
    caption_y: 1008,
    caption_align: "center",
    scale: 0.22,
    enter_animation: "pop",
    exit_animation: "fade",
    success_criteria: [
      "承接动作压力感",
      "不遮挡动作接触点",
      "和“顶住”字幕有关",
      "和 asset_need_02 有表情差异",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: false,
    repair_note: "auto_probe_generated_asset",
  },
  {
    asset_need_id: "asset_need_05",
    time_range: { start_sec: 5.12, end_sec: 6.08 },
    asset_type: "caption_card",
    original_asset_type_from_detection: "font_card",
    caption_text: "没感觉",
    original_caption_text_from_detection: "顺线",
    reason:
      "机器纹理 reset 段需要字牌把观众注意力从动作峰值转回线条和方向，但本轮补图因 provider Arrearage 改用既有阿里字体牌占位。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_05_alpha.png",
    anchor: "right_mid",
    x: 806,
    y: 1180,
    origin: "center",
    max_width: 360,
    caption_x: 806,
    caption_y: 1395,
    caption_align: "center",
    scale: 0.32,
    enter_animation: "slide",
    exit_animation: "fade",
    success_criteria: [
      "能提示 reset 后的线条方向",
      "不遮挡机器主体",
      "不遮挡后续收束字幕",
      "字牌存在感够但不抢画面",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: true,
    repair_note: "provider_arrearage_fallback_existing_ali_asset",
  },
  {
    asset_need_id: "asset_need_06",
    time_range: { start_sec: 6.58, end_sec: 7.72 },
    asset_type: "reaction_sticker",
    original_asset_type_from_detection: "object_label",
    caption_text: "没感觉",
    original_caption_text_from_detection: "线走这边",
    reason:
      "尾段原本需要 object label / motion punctuation 收束方向线，但本轮补图因 provider Arrearage 改用既有阿里贴纸占位。",
    alpha_path:
      "tmp/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe/alpha_assets/asset_need_06_alpha.png",
    anchor: "near_object",
    x: 640,
    y: 1140,
    origin: "center",
    max_width: 315,
    caption_x: 640,
    caption_y: 1326,
    caption_align: "center",
    scale: 0.28,
    enter_animation: "scribble",
    exit_animation: "slide_out",
    success_criteria: [
      "跟随尾段运动方向",
      "不遮挡收束主体",
      "字幕/图像能辅助观众理解方向线",
      "不变成随机漂浮贴纸",
    ],
    review_status: "pending_user_review",
    approved_for_video: false,
    supplemental_existing_ali_asset: true,
    repair_note: "provider_arrearage_fallback_existing_ali_asset",
  },
];

export const autoVisualAssetProbeSummary = {
  total_assets_consumed_by_remotion: autoVisualAssetPlacements.length,
  supplemental_existing_ali_assets_used: 2,
  alpha_success_assets: 6,
  generated_assets_note:
    "4 auto-probe images were generated earlier; 2 missing images were attempted with one retry and fell back to existing Alibaba probe assets after provider Arrearage.",
  review_status: "pending_user_review",
  do_not_claim: [
    "approved_for_video",
    "asset_library_completed",
    "caption_font_system_completed",
    "video_fixed",
    "publish-ready",
    "vlog_director_capability_verified",
  ],
};
