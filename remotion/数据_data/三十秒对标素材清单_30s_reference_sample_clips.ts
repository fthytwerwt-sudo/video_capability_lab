export type ThirtySecondSegmentRole =
  | "opening_hook"
  | "object_or_texture"
  | "movement_bridge"
  | "sticker_moment"
  | "caption_moment"
  | "scrapbook_or_split"
  | "motif_reprise"
  | "emotional_peak"
  | "slowdown_breath"
  | "end_card_background";

export type ThirtySecondMotifTag = "sand_trace" | "bamboo_panda" | "mist_sea" | "cloud_tide";

export type ThirtySecondSegment = {
  id: string;
  src: string;
  sourcePath: string;
  sourceStartSec: number;
  usableDurationSec: number;
  fromSec: number;
  durationSec: number;
  role: ThirtySecondSegmentRole;
  motifTag: ThirtySecondMotifTag;
  riskNote: string;
  scaleStart: number;
  scaleEnd: number;
  yStart: number;
  yEnd: number;
};

export type ThirtySecondCaptionEvent = {
  id: string;
  text: string;
  fromSec: number;
  durationSec: number;
  tone: "small" | "hand" | "serif" | "impact";
  x: number;
  y: number;
};

export type ThirtySecondStickerEvent = {
  id: string;
  kind: "arrow" | "circle" | "spark" | "wave" | "tag" | "burst" | "dottrail" | "underline";
  text?: string;
  fromSec: number;
  durationSec: number;
  x: number;
  y: number;
  color: string;
  rotate?: number;
};

export const thirtySecondAudio = "三十秒对标样片_assets/音频_audio/三十秒BGM_30s_bgm_looped.wav";

export const thirtySecondMotif = "sand_bamboo_sea_breath";

export const thirtySecondSegments: ThirtySecondSegment[] = [
  {
    id: "sand_trace_opening",
    src: "三十秒对标样片_assets/视频_clips/沙纹开场_sand_trace_opening.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    sourceStartSec: 0.1,
    usableDurationSec: 2.2,
    fromSec: 0,
    durationSec: 2.18,
    role: "opening_hook",
    motifTag: "sand_trace",
    riskNote: "低风险：沙纹脚印纹理，无平台 UI、品牌或可识别人脸。",
    scaleStart: 1.04,
    scaleEnd: 1.1,
    yStart: 0,
    yEnd: -16,
  },
  {
    id: "panda_head_turn",
    src: "三十秒对标样片_assets/视频_clips/熊猫抬头_panda_head_turn.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 0.7,
    usableDurationSec: 2,
    fromSec: 1.86,
    durationSec: 1.92,
    role: "object_or_texture",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于本地样片 motif，不写成授权可复用资产。",
    scaleStart: 1.12,
    scaleEnd: 1.05,
    yStart: 10,
    yEnd: -10,
  },
  {
    id: "mist_people_wide",
    src: "三十秒对标样片_assets/视频_clips/海雾人影_mist_people_wide.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    sourceStartSec: 0.25,
    usableDurationSec: 2.1,
    fromSec: 3.42,
    durationSec: 1.78,
    role: "movement_bridge",
    motifTag: "mist_sea",
    riskNote: "部分成立：远处有人影但不可识别，只用于本地样片。",
    scaleStart: 1.13,
    scaleEnd: 1.05,
    yStart: 18,
    yEnd: -18,
  },
  {
    id: "cloud_tide_open",
    src: "三十秒对标样片_assets/视频_clips/云潮开阔_cloud_tide_open.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3226.MOV",
    sourceStartSec: 0.2,
    usableDurationSec: 2,
    fromSec: 4.9,
    durationSec: 1.86,
    role: "movement_bridge",
    motifTag: "cloud_tide",
    riskNote: "部分成立：海边远景人群不可识别，只用于本地样片。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -20,
  },
  {
    id: "bamboo_hide",
    src: "三十秒对标样片_assets/视频_clips/竹叶遮挡_bamboo_hide.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    sourceStartSec: 1.2,
    usableDurationSec: 2,
    fromSec: 6.42,
    durationSec: 1.68,
    role: "sticker_moment",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于本地样片 motif。",
    scaleStart: 1.15,
    scaleEnd: 1.08,
    yStart: -8,
    yEnd: 10,
  },
  {
    id: "sand_footprint_detail",
    src: "三十秒对标样片_assets/视频_clips/沙纹脚印_sand_footprint_detail.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    sourceStartSec: 2.1,
    usableDurationSec: 1.8,
    fromSec: 7.76,
    durationSec: 1.48,
    role: "caption_moment",
    motifTag: "sand_trace",
    riskNote: "低风险：沙面纹理，无可识别主体。",
    scaleStart: 1.12,
    scaleEnd: 1.04,
    yStart: 12,
    yEnd: -12,
  },
  {
    id: "panda_bamboo_bite",
    src: "三十秒对标样片_assets/视频_clips/熊猫吃竹_panda_bamboo_bite.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 4.2,
    usableDurationSec: 1.9,
    fromSec: 8.98,
    durationSec: 1.62,
    role: "motif_reprise",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于本地样片 motif。",
    scaleStart: 1.1,
    scaleEnd: 1.04,
    yStart: 8,
    yEnd: -10,
  },
  {
    id: "mist_walkaway",
    src: "三十秒对标样片_assets/视频_clips/雾滩远走_mist_walkaway.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    sourceStartSec: 2.1,
    usableDurationSec: 2,
    fromSec: 10.24,
    durationSec: 1.62,
    role: "movement_bridge",
    motifTag: "mist_sea",
    riskNote: "部分成立：远景人影不可识别，只用于本地样片。",
    scaleStart: 1.1,
    scaleEnd: 1.03,
    yStart: 10,
    yEnd: -14,
  },
  {
    id: "silver_cloud_crowd",
    src: "三十秒对标样片_assets/视频_clips/银云人群_silver_cloud_crowd.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    sourceStartSec: 0.5,
    usableDurationSec: 2.1,
    fromSec: 11.54,
    durationSec: 1.78,
    role: "scrapbook_or_split",
    motifTag: "cloud_tide",
    riskNote: "部分成立：远景人群只作本地样片素材。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -18,
  },
  {
    id: "bamboo_reprise",
    src: "三十秒对标样片_assets/视频_clips/竹叶回看_bamboo_reprise.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    sourceStartSec: 5.4,
    usableDurationSec: 1.8,
    fromSec: 14.72,
    durationSec: 1.55,
    role: "motif_reprise",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于 motif 回环。",
    scaleStart: 1.14,
    scaleEnd: 1.07,
    yStart: -10,
    yEnd: 12,
  },
  {
    id: "cloud_window",
    src: "三十秒对标样片_assets/视频_clips/海边云洞_cloud_window.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3226.MOV",
    sourceStartSec: 2.4,
    usableDurationSec: 1.9,
    fromSec: 15.96,
    durationSec: 1.52,
    role: "caption_moment",
    motifTag: "cloud_tide",
    riskNote: "部分成立：远景人群不可识别，只用于本地样片。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -20,
  },
  {
    id: "panda_pause",
    src: "三十秒对标样片_assets/视频_clips/熊猫停顿_panda_pause.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 7.2,
    usableDurationSec: 1.7,
    fromSec: 17.22,
    durationSec: 1.42,
    role: "sticker_moment",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于本地样片 motif。",
    scaleStart: 1.1,
    scaleEnd: 1.04,
    yStart: 8,
    yEnd: -8,
  },
  {
    id: "sand_echo",
    src: "三十秒对标样片_assets/视频_clips/沙面回声_sand_echo.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    sourceStartSec: 4,
    usableDurationSec: 1.7,
    fromSec: 18.38,
    durationSec: 1.42,
    role: "motif_reprise",
    motifTag: "sand_trace",
    riskNote: "低风险：沙面纹理，无可识别主体。",
    scaleStart: 1.12,
    scaleEnd: 1.06,
    yStart: 12,
    yEnd: -12,
  },
  {
    id: "sky_peak",
    src: "三十秒对标样片_assets/视频_clips/云层高潮_sky_peak.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    sourceStartSec: 2.8,
    usableDurationSec: 2,
    fromSec: 19.56,
    durationSec: 1.96,
    role: "emotional_peak",
    motifTag: "cloud_tide",
    riskNote: "部分成立：远景人群只作本地样片素材。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -20,
  },
  {
    id: "bamboo_peak",
    src: "三十秒对标样片_assets/视频_clips/竹影高潮_bamboo_peak.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    sourceStartSec: 8.4,
    usableDurationSec: 1.9,
    fromSec: 21.18,
    durationSec: 1.62,
    role: "emotional_peak",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于本地样片 motif。",
    scaleStart: 1.12,
    scaleEnd: 1.06,
    yStart: -10,
    yEnd: 10,
  },
  {
    id: "mist_slowdown",
    src: "三十秒对标样片_assets/视频_clips/雾海降速_mist_slowdown.mp4",
    sourcePath: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    sourceStartSec: 4,
    usableDurationSec: 2,
    fromSec: 22.56,
    durationSec: 2.1,
    role: "slowdown_breath",
    motifTag: "mist_sea",
    riskNote: "部分成立：远景人影不可识别，只用于本地样片。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 0,
    yEnd: -16,
  },
  {
    id: "silver_sky_close",
    src: "三十秒对标样片_assets/视频_clips/银天空收束_silver_sky_close.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    sourceStartSec: 5.5,
    usableDurationSec: 2.2,
    fromSec: 24.32,
    durationSec: 2.36,
    role: "slowdown_breath",
    motifTag: "cloud_tide",
    riskNote: "部分成立：海边远景人群不可识别，只用于本地样片。",
    scaleStart: 1.08,
    scaleEnd: 1.01,
    yStart: 0,
    yEnd: -18,
  },
  {
    id: "panda_end_reprise",
    src: "三十秒对标样片_assets/视频_clips/熊猫尾声_panda_end_reprise.mp4",
    sourcePath: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    sourceStartSec: 12.2,
    usableDurationSec: 1.8,
    fromSec: 26.32,
    durationSec: 2.2,
    role: "end_card_background",
    motifTag: "bamboo_panda",
    riskNote: "部分成立：动物园熊猫素材，只用于结尾 motif 回看。",
    scaleStart: 1.08,
    scaleEnd: 1.02,
    yStart: 6,
    yEnd: -10,
  },
];

export const thirtySecondCaptionEvents: ThirtySecondCaptionEvent[] = [
  { id: "caption_wind_first", text: "风动了", fromSec: 2.22, durationSec: 1.15, tone: "hand", x: 92, y: 1118 },
  { id: "caption_look", text: "藏这儿", fromSec: 7.02, durationSec: 1.05, tone: "hand", x: 92, y: 930 },
  { id: "caption_tiny", text: "咬一口", fromSec: 9.28, durationSec: 1.22, tone: "hand", x: 644, y: 1034 },
  { id: "caption_slow", text: "慢一点", fromSec: 12.52, durationSec: 1.25, tone: "small", x: 132, y: 812 },
  { id: "caption_hidden", text: "藏一下", fromSec: 15.52, durationSec: 1.18, tone: "hand", x: 94, y: 1138 },
  { id: "caption_breathe", text: "呼", fromSec: 24.4, durationSec: 1.25, tone: "hand", x: 754, y: 362 },
];

export const thirtySecondStickerEvents: ThirtySecondStickerEvent[] = [
  { id: "sticker_open_arrow", kind: "arrow", fromSec: 2.38, durationSec: 1.05, x: 610, y: 1018, color: "#f4d56a", rotate: -13 },
  { id: "sticker_bamboo_circle", kind: "circle", fromSec: 6.82, durationSec: 1.05, x: 388, y: 612, color: "#f0c96a", rotate: -7 },
  { id: "sticker_sand_wave", kind: "wave", fromSec: 8.08, durationSec: 1.05, x: 328, y: 1228, color: "#82d9e8", rotate: -7 },
  { id: "sticker_panda_tag", kind: "tag", text: "咬", fromSec: 9.7, durationSec: 1.18, x: 612, y: 986, color: "#f6d7a8", rotate: 4 },
  { id: "sticker_slow_wave", kind: "wave", fromSec: 24.86, durationSec: 1.35, x: 410, y: 520, color: "#8fd7e2", rotate: 3 },
];
