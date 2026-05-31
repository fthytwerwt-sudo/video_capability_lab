export type DemoClip = {
  id: string;
  label: string;
  src: string;
  orientation: "vertical" | "landscape";
};

export const demoClips: DemoClip[] = [
  {
    id: "clip_01_vertical",
    label: "vertical hand motion",
    src: "能力证明Demo_assets/clips/clip_01_vertical.mp4",
    orientation: "vertical",
  },
  {
    id: "clip_02_landscape",
    label: "wide movement",
    src: "能力证明Demo_assets/clips/clip_02_landscape.mp4",
    orientation: "landscape",
  },
  {
    id: "clip_03_wide",
    label: "city texture",
    src: "能力证明Demo_assets/clips/clip_03_wide.mp4",
    orientation: "landscape",
  },
  {
    id: "clip_04_wide",
    label: "second texture",
    src: "能力证明Demo_assets/clips/clip_04_wide.mp4",
    orientation: "landscape",
  },
];

export const demoAudio = "能力证明Demo_assets/audio/bgm_demo_15s.wav";
