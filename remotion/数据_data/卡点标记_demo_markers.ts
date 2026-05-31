export type DemoMarker = {
  time: number;
  type: "beat" | "onset" | "rms_peak";
  confidence: number;
  source: string;
};

export const demoMarkers: DemoMarker[] = [
  {
    time: 0.766,
    type: "beat",
    confidence: 0.68,
    source: "librosa beat marker from tmp/remotion_demo_assets/beat_map.json, not human reviewed",
  },
  {
    time: 2.252,
    type: "onset",
    confidence: 0.62,
    source: "librosa onset marker from tmp/remotion_demo_assets/onset_map.json, not human reviewed",
  },
  {
    time: 4.18,
    type: "beat",
    confidence: 0.68,
    source: "librosa beat marker from tmp/remotion_demo_assets/beat_map.json, not human reviewed",
  },
  {
    time: 6.664,
    type: "rms_peak",
    confidence: 0.58,
    source: "librosa RMS marker from tmp/remotion_demo_assets/rms_peaks.json, not human reviewed",
  },
  {
    time: 7.895,
    type: "beat",
    confidence: 0.68,
    source: "librosa beat marker from tmp/remotion_demo_assets/beat_map.json, not human reviewed",
  },
  {
    time: 10.403,
    type: "rms_peak",
    confidence: 0.58,
    source: "librosa RMS marker from tmp/remotion_demo_assets/rms_peaks.json, not human reviewed",
  },
];
