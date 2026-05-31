export type NewReferenceRebuildClip = {
  id: string;
  label: string;
  src: string;
  orientation: "vertical";
  role:
    | "opening_object"
    | "movement_bridge"
    | "texture_hold"
    | "hand_or_pov"
    | "motif_reprise"
    | "closing_breath";
  risk_note: string;
  motif_tag: "sand_trace" | "bamboo_panda" | "mist_sea" | "cloud_tide";
  source_path: string;
  usable_note: string;
};

export const newReferenceRebuildClips: NewReferenceRebuildClip[] = [
  {
    id: "sand_trace_opening",
    label: "sand trace opening",
    src: "新素材参考重做Demo_assets/视频_clips/沙纹开场_sand_trace_opening.mp4",
    orientation: "vertical",
    role: "opening_object",
    risk_note: "低风险：沙纹脚印纹理，无平台 UI、品牌或可识别人脸。",
    motif_tag: "sand_trace",
    source_path: "素材/剪辑素材/剪辑/sd1674359014_2.MP4",
    usable_note: "适合开场物件/纹理，建立真实镜头先行。",
  },
  {
    id: "bamboo_panda_hold",
    label: "bamboo panda hold",
    src: "新素材参考重做Demo_assets/视频_clips/竹叶熊猫_bamboo_panda_hold.mp4",
    orientation: "vertical",
    role: "motif_reprise",
    risk_note: "部分成立：动物园熊猫素材，适合本地 demo；不写成可复用授权资产。",
    motif_tag: "bamboo_panda",
    source_path: "素材/剪辑素材/剪辑/IMG_0971.MOV",
    usable_note: "适合主 motif 和回环镜头。",
  },
  {
    id: "mist_sea_bridge",
    label: "mist sea bridge",
    src: "新素材参考重做Demo_assets/视频_clips/海雾过渡_mist_sea_bridge.mp4",
    orientation: "vertical",
    role: "movement_bridge",
    risk_note: "部分成立：远处有人影但不可识别，适合本地技术 demo。",
    motif_tag: "mist_sea",
    source_path: "素材/剪辑素材/剪辑/sd1674358932_2.MP4",
    usable_note: "适合作为空间推进和降速呼吸。",
  },
  {
    id: "cloud_tide_wide",
    label: "cloud tide wide",
    src: "新素材参考重做Demo_assets/视频_clips/云潮远景_cloud_tide_wide.mp4",
    orientation: "vertical",
    role: "movement_bridge",
    risk_note: "部分成立：远景人群和海边环境，需避免写成授权可复用资产。",
    motif_tag: "cloud_tide",
    source_path: "素材/剪辑素材/剪辑/IMG_3226.MOV",
    usable_note: "适合海天开阔感和 scrapbook 段落。",
  },
  {
    id: "leaf_hide_reprise",
    label: "leaf hide reprise",
    src: "新素材参考重做Demo_assets/视频_clips/竹叶遮挡_leaf_hide_reprise.mp4",
    orientation: "vertical",
    role: "motif_reprise",
    risk_note: "部分成立：动物园熊猫素材，适合 motif 回环。",
    motif_tag: "bamboo_panda",
    source_path: "素材/剪辑素材/剪辑/IMG_0970.MOV",
    usable_note: "适合把 bamboo / hide motif 拉回来。",
  },
  {
    id: "silver_sky_closing",
    label: "silver sky closing",
    src: "新素材参考重做Demo_assets/视频_clips/银色天空_silver_sky_closing.mp4",
    orientation: "vertical",
    role: "closing_breath",
    risk_note: "部分成立：海边远景人群，人物不可识别但仍只作本地 demo 素材。",
    motif_tag: "cloud_tide",
    source_path: "素材/剪辑素材/剪辑/IMG_3225.MOV",
    usable_note: "适合结尾前的呼吸和收束。",
  },
];

export const newReferenceRebuildAudio = "新素材参考重做Demo_assets/音频_audio/重做BGM_bgm_rebuild_12s.wav";

export const newReferenceRebuildMotif = "sand_bamboo_breath";
