export type Anchor18sSegmentRole =
  | "opening_no_sticker"
  | "anchor_sticker"
  | "no_sticker_breath"
  | "motif_bridge"
  | "ending_hold";

export type Anchor18sMotifTag = "sand_trace" | "bamboo_panda" | "mist_sea" | "cloud_tide";

export type Anchor18sSegment = {
  id: string;
  src: string;
  sourcePath: string;
  sourceStartSec: number;
  fromSec: number;
  durationSec: number;
  role: Anchor18sSegmentRole;
  motifTag: Anchor18sMotifTag;
  stickerPolicy: "sticker_needed_true" | "sticker_needed_false" | "no_sticker_shot";
  anchorNote: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
};

export type Anchor18sCaptionEvent = {
  id: string;
  text: string;
  fromSec: number;
  durationSec: number;
  tone: "breath" | "attention" | "tiny" | "ending";
  x: number;
  y: number;
};

export type Anchor18sStickerKind = "arrow" | "circle" | "wave" | "tag";

export type Anchor18sStickerEvent = {
  id: string;
  sourceShotId: string;
  sourceTimecode: string;
  kind: Anchor18sStickerKind;
  text?: string;
  fromSec: number;
  durationSec: number;
  x: number;
  y: number;
  color: string;
  rotate?: number;
  anchorTarget: string;
  stickerRole: string;
  shapeDerivedFromEvent: string;
  placementRelation: string;
  reviewFrames: {
    startSec: number;
    midSec: number;
    exitSec: number;
  };
};

export const anchor18sAudio = "三十秒对标样片_assets/音频_audio/三十秒BGM_30s_bgm_looped.wav";

export const anchor18sDurationSec = 18;

export const anchor18sStatus = "18s_anchor_sticker_review_candidate_rendered_pending_user_review";

export const anchor18sSegments: Anchor18sSegment[] = [
  {
    id: "sand_trace_opening_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/沙纹开场_sand_trace_opening.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    sourceStartSec: 0.1,
    fromSec: 0,
    durationSec: 2.18,
    role: "opening_no_sticker",
    motifTag: "sand_trace",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "开场只建立沙纹 motif，不贴纸，防止把无主体纹理当贴纸锚点。",
    scaleStart: 1.04,
    scaleEnd: 1.1,
    yStart: 0,
    yEnd: -16,
  },
  {
    id: "panda_head_turn_anchor",
    src: "三十秒对标样片_assets/视频_clips/熊猫抬头_panda_head_turn.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 0.7,
    fromSec: 1.86,
    durationSec: 1.92,
    role: "anchor_sticker",
    motifTag: "bamboo_panda",
    stickerPolicy: "sticker_needed_true",
    anchorNote: "对应 41 的 shot_01，熊猫小主体第一次出现，用轻箭头提示动作方向。",
    scaleStart: 1.12,
    scaleEnd: 1.05,
    yStart: 10,
    yEnd: -10,
  },
  {
    id: "mist_people_wide_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/海雾人影_mist_people_wide.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    sourceStartSec: 0.25,
    fromSec: 3.42,
    durationSec: 1.78,
    role: "no_sticker_breath",
    motifTag: "mist_sea",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "远景人影只做换气桥，不贴纸，作为本轮 no-sticker shot 证据。",
    scaleStart: 1.13,
    scaleEnd: 1.05,
    yStart: 18,
    yEnd: -18,
  },
  {
    id: "cloud_tide_open_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/云潮开阔_cloud_tide_open.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3226.MOV",
    sourceStartSec: 0.2,
    fromSec: 4.9,
    durationSec: 1.86,
    role: "no_sticker_breath",
    motifTag: "cloud_tide",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "对应 41 的 shot_02 false 逻辑：云面主体弱，不贴空 sky。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -20,
  },
  {
    id: "bamboo_hide_anchor",
    src: "三十秒对标样片_assets/视频_clips/竹叶遮挡_bamboo_hide.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    sourceStartSec: 1.2,
    fromSec: 6.42,
    durationSec: 1.68,
    role: "anchor_sticker",
    motifTag: "bamboo_panda",
    stickerPolicy: "sticker_needed_true",
    anchorNote: "对应 41 的 shot_03，圈注服务竹叶遮挡后的主体显露。",
    scaleStart: 1.15,
    scaleEnd: 1.08,
    yStart: -8,
    yEnd: 10,
  },
  {
    id: "sand_footprint_anchor",
    src: "三十秒对标样片_assets/视频_clips/沙纹脚印_sand_footprint_detail.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    sourceStartSec: 2.1,
    fromSec: 7.76,
    durationSec: 1.36,
    role: "anchor_sticker",
    motifTag: "sand_trace",
    stickerPolicy: "sticker_needed_true",
    anchorNote: "对应 41 的 shot_04，波纹贴脚印 / 沙纹轨迹，不做装饰海浪。",
    scaleStart: 1.12,
    scaleEnd: 1.04,
    yStart: 12,
    yEnd: -12,
  },
  {
    id: "panda_bamboo_bite_anchor",
    src: "三十秒对标样片_assets/视频_clips/熊猫吃竹_panda_bamboo_bite.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 4.2,
    fromSec: 9.18,
    durationSec: 1.7,
    role: "anchor_sticker",
    motifTag: "bamboo_panda",
    stickerPolicy: "sticker_needed_true",
    anchorNote: "对应 41 的 shot_05，纸签只服务咬竹接触动作。",
    scaleStart: 1.1,
    scaleEnd: 1.04,
    yStart: 8,
    yEnd: -10,
  },
  {
    id: "mist_walkaway_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/雾滩远走_mist_walkaway.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    sourceStartSec: 2.1,
    fromSec: 10.94,
    durationSec: 1.65,
    role: "no_sticker_breath",
    motifTag: "mist_sea",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "远景换气镜头，不把贴纸塞进弱主体画面。",
    scaleStart: 1.1,
    scaleEnd: 1.03,
    yStart: 10,
    yEnd: -14,
  },
  {
    id: "silver_cloud_crowd_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/银云人群_silver_cloud_crowd.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    sourceStartSec: 0.5,
    fromSec: 12.3,
    durationSec: 1.68,
    role: "motif_bridge",
    motifTag: "cloud_tide",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "云面和人群远景只承担段落过桥，避免贴空天。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -18,
  },
  {
    id: "bamboo_reprise_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/竹叶回看_bamboo_reprise.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    sourceStartSec: 5.4,
    fromSec: 13.74,
    durationSec: 1.4,
    role: "motif_bridge",
    motifTag: "bamboo_panda",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "竹叶回环只承接 motif，不新增点线贴纸。",
    scaleStart: 1.14,
    scaleEnd: 1.07,
    yStart: -10,
    yEnd: 12,
  },
  {
    id: "silver_sky_close_no_sticker",
    src: "三十秒对标样片_assets/视频_clips/银天空收束_silver_sky_close.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    sourceStartSec: 5.5,
    fromSec: 14.94,
    durationSec: 1.68,
    role: "no_sticker_breath",
    motifTag: "cloud_tide",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "18 秒候选不纳入 41 的 shot_09；收束段保持留白，避免冒充慢呼吸贴纸已验证。",
    scaleStart: 1.08,
    scaleEnd: 1.01,
    yStart: 0,
    yEnd: -18,
  },
  {
    id: "panda_end_reprise_hold",
    src: "三十秒对标样片_assets/视频_clips/熊猫尾声_panda_end_reprise.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 12.2,
    fromSec: 16.24,
    durationSec: 1.76,
    role: "ending_hold",
    motifTag: "bamboo_panda",
    stickerPolicy: "no_sticker_shot",
    anchorNote: "结尾回环不加箭头，对应 41 的 shot_10 false 约束。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 6,
    yEnd: -10,
  },
];

export const anchor18sCaptionEvents: Anchor18sCaptionEvent[] = [
  { id: "caption_wind_first", text: "风动了", fromSec: 2.24, durationSec: 1.08, tone: "attention", x: 88, y: 1120 },
  { id: "caption_hide", text: "藏这儿", fromSec: 6.94, durationSec: 1.02, tone: "attention", x: 92, y: 930 },
  { id: "caption_slow", text: "慢一点", fromSec: 12.7, durationSec: 1.3, tone: "breath", x: 132, y: 812 },
  { id: "caption_end_hold", text: "停一下", fromSec: 16.72, durationSec: 1.22, tone: "ending", x: 80, y: 1436 },
];

export const anchor18sStickerEvents: Anchor18sStickerEvent[] = [
  {
    id: "sticker_shot_01_panda_open_arrow",
    sourceShotId: "shot_01_panda_open_arrow",
    sourceTimecode: "00:02.38",
    kind: "arrow",
    fromSec: 2.38,
    durationSec: 1.08,
    x: 602,
    y: 1008,
    color: "#e7ca67",
    rotate: -13,
    anchorTarget: "panda_head_turn / bamboo_bite_direction",
    stickerRole: "attention_cue",
    shapeDerivedFromEvent: "轻手绘箭头，方向来自熊猫头部和竹叶动作方向。",
    placementRelation: "箭头尖端朝动作点，不遮脸，宽度约画面宽 16%。",
    reviewFrames: { startSec: 2.48, midSec: 2.92, exitSec: 3.36 },
  },
  {
    id: "sticker_shot_03_bamboo_hide_circle",
    sourceShotId: "shot_03_bamboo_hide_circle",
    sourceTimecode: "00:06.82",
    kind: "circle",
    fromSec: 6.82,
    durationSec: 1.12,
    x: 396,
    y: 606,
    color: "#e6c36c",
    rotate: -6,
    anchorTarget: "panda_face / leaf_hide_edge",
    stickerRole: "attention_cue",
    shapeDerivedFromEvent: "不规则圈注沿遮挡边缘生成，只圈一个显露重点。",
    placementRelation: "圈住竹叶遮挡后的熊猫区域，避开画面边缘。",
    reviewFrames: { startSec: 6.98, midSec: 7.38, exitSec: 7.84 },
  },
  {
    id: "sticker_shot_04_sand_trace_wave",
    sourceShotId: "shot_04_sand_trace_wave",
    sourceTimecode: "00:08.08",
    kind: "wave",
    fromSec: 8.08,
    durationSec: 1.06,
    x: 342,
    y: 1198,
    color: "#84d4df",
    rotate: -7,
    anchorTarget: "footprint_trace / sand_curve",
    stickerRole: "motion_peak_punctuation",
    shapeDerivedFromEvent: "2-3 段短波浪线沿脚印和沙纹轨迹展开。",
    placementRelation: "沿轨迹旁 12-40px，避开画面下沿，不贴空沙面。",
    reviewFrames: { startSec: 8.24, midSec: 8.62, exitSec: 9.02 },
  },
  {
    id: "sticker_shot_05_panda_bite_tag",
    sourceShotId: "shot_05_panda_bite_tag",
    sourceTimecode: "00:09.70",
    kind: "tag",
    text: "咬",
    fromSec: 9.7,
    durationSec: 1.12,
    x: 616,
    y: 978,
    color: "#f4d7aa",
    rotate: 4,
    anchorTarget: "panda_mouth / bamboo_bite",
    stickerRole: "touch_action_punctuation",
    shapeDerivedFromEvent: "小纸签只承载 1 个字，来自嘴和竹子接触动作。",
    placementRelation: "靠近咬合点 16-44px，不压嘴、不挡脸。",
    reviewFrames: { startSec: 9.86, midSec: 10.26, exitSec: 10.72 },
  },
];
