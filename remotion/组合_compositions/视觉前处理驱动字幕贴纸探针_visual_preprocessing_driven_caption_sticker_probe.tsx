import React from "react";
import { blur } from "@remotion/effects/blur";
import { dropShadow } from "@remotion/effects/drop-shadow";
import { noise } from "@remotion/effects/noise";
import { vignette } from "@remotion/effects/vignette";
import { Trail } from "@remotion/motion-blur";
import { evolvePath, getLength, getPointAtLength, interpolatePath } from "@remotion/paths";
import {
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  Sequence,
  Solid,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  sampleAnchorMap,
  sampleMaskPlan,
  sampleMotionTrack,
  sampleVisualScorecard,
  visualPreprocessingComposition,
  visualPreprocessingSource,
} from "../数据_data/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe";

const localAssetBaseUrl = "http://127.0.0.1:8124";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const toFrame = (seconds: number, fps: number) => Math.round(seconds * fps);

const assetUrl = (relativePath: string) =>
  `${localAssetBaseUrl}/${relativePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;

const anchor = sampleAnchorMap[0];
const track = sampleMotionTrack[0];
const mask = sampleMaskPlan[0];

const edgePath = `M${anchor.edge_lines[0].points
  .map((point) => `${point.x} ${point.y}`)
  .join(" L")}`;
const contactPath = "M632 1074 C660 1032 692 1024 732 1054";
const contactAltPath = "M620 1118 C656 1098 702 1080 758 1088";

const VideoLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 90], [1.13, 1.05], clamp);
  const y = interpolate(frame, [0, 90], [0, -24], clamp);
  const { fps } = useVideoConfig();
  return (
    <OffthreadVideo
      muted
      src={assetUrl(visualPreprocessingSource.video)}
      startFrom={toFrame(visualPreprocessingSource.video_source_start_sec, fps)}
      style={{
        filter: "contrast(1.06) saturate(1.03) brightness(0.96)",
        height: "100%",
        objectFit: "cover",
        objectPosition: "50% 50%",
        transform: `scale(${scale}) translateY(${y}px)`,
        width: "100%",
      }}
    />
  );
};

const DataDrivenSticker: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 23], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const fade = interpolate(frame, [8, 14, 46, 57], [0, 1, 0.9, 0], clamp);
  const motionPoint = track.frame_points[Math.min(track.frame_points.length - 1, Math.floor(frame / 7))];
  const length = getLength(edgePath);
  const sampledEdge = getPointAtLength(edgePath, length * Math.min(0.9, 0.22 + draw * 0.5));
  const evolved = evolvePath(draw, edgePath);
  const contactMorph = interpolatePath(draw, contactPath, contactAltPath);

  return (
    <Trail lagInFrames={2} layers={6} trailOpacity={0.28}>
      <svg
        height={520}
        style={{
          left: 0,
          opacity: fade,
          overflow: "visible",
          position: "absolute",
          top: 700,
          zIndex: 70,
        }}
        viewBox="0 0 1080 520"
        width={1080}
      >
        <path
          d={edgePath}
          fill="none"
          pathLength={1}
          stroke="rgba(33, 29, 22, 0.72)"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={18}
          transform="translate(5 7)"
        />
        <path
          d={edgePath}
          fill="none"
          pathLength={1}
          stroke="rgba(255, 246, 220, 0.92)"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={12}
        />
        <path
          d={contactMorph}
          fill="none"
          stroke="rgba(238, 190, 72, 0.92)"
          strokeLinecap="round"
          strokeWidth={10}
        />
        <circle
          cx={motionPoint.x}
          cy={motionPoint.y - 700}
          fill="rgba(244, 205, 99, 0.95)"
          r={14 + draw * 8}
          stroke="rgba(255,255,240,0.92)"
          strokeWidth={7}
        />
        <circle cx={sampledEdge.x} cy={sampledEdge.y - 700} fill="rgba(21,21,18,0.35)" r={28} />
      </svg>
    </Trail>
  );
};

const SimulatedOcclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [12, 22, 50, 58], [0, 0.46, 0.42, 0], clamp);
  return (
    <>
      {mask.occlusion_regions.map((region) => (
        <div
          key={`${region.x}-${region.y}`}
          style={{
            background: "rgba(19, 21, 18, 0.52)",
            borderRadius: 12,
            height: region.height,
            left: region.x,
            mixBlendMode: "multiply",
            opacity,
            position: "absolute",
            top: region.y,
            transform: "rotate(-3deg)",
            width: region.width,
            zIndex: 76,
          }}
        />
      ))}
    </>
  );
};

const CaptionReaction: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [11, 17, 48, 58], [0, 1, 0.92, 0], clamp);
  const shove = interpolate(frame, [10, 18, 48], [24, 0, -3], clamp);
  const zone = anchor.safe_caption_zones[0];

  return (
    <div
      style={{
        color: "#fff0c4",
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: 72,
        fontWeight: 880,
        left: zone.x,
        letterSpacing: 0,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow:
          "4px 5px 0 rgba(34, 30, 24, 0.72), 0 14px 28px rgba(0,0,0,0.42)",
        top: zone.y + 92,
        transform: `translateX(${shove}px) rotate(-5deg)`,
        whiteSpace: "nowrap",
        zIndex: 82,
      }}
    >
      咔
    </div>
  );
};

const ScoreBadge: React.FC = () => (
  <div
    style={{
      bottom: 110,
      color: "rgba(247, 240, 219, 0.76)",
      fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
      fontSize: 26,
      left: 82,
      letterSpacing: 0,
      lineHeight: 1.34,
      position: "absolute",
      width: 850,
      zIndex: 92,
    }}
  >
    anchor {sampleVisualScorecard.anchor_attachment_score}/3 · motion{" "}
    {sampleVisualScorecard.motion_event_score}/3 · review pending
  </div>
);

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  const bgmStart = toFrame(visualPreprocessingSource.bgm_source_start_sec, fps);
  return (
    <Audio
      endAt={bgmStart + visualPreprocessingComposition.durationInFrames}
      src={assetUrl(visualPreprocessingSource.bgm)}
      startFrom={bgmStart}
      volume={0.68}
    />
  );
};

export const VisualPreprocessingDrivenCaptionStickerProbe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    <VideoLayer />
    <Solid
      color="rgba(22, 22, 17, 0.22)"
      effects={[
        noise({ amount: 0.08, seed: 29 }),
        vignette({ amount: 0.36, radius: 0.62, feather: 0.28 }),
        blur({ radius: 1.4 }),
        dropShadow({ color: "#000000", opacity: 0.2, radius: 10, offsetX: 0, offsetY: 8 }),
      ]}
      height={visualPreprocessingComposition.height}
      style={{ mixBlendMode: "soft-light", position: "absolute" }}
      width={visualPreprocessingComposition.width}
    />
    <Sequence durationInFrames={60} from={6}>
      <DataDrivenSticker />
      <SimulatedOcclusion />
      <CaptionReaction />
    </Sequence>
    <ScoreBadge />
    <AudioLayer />
  </AbsoluteFill>
);
