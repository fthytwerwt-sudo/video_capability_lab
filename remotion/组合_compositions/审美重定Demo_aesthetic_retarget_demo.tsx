import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { demoAudio, demoClips } from "../数据_data/素材清单_demo_clips";

const coverVideo: React.CSSProperties = {
  height: "100%",
  objectFit: "cover",
  width: "100%",
};

const softClamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type ShotProps = {
  clipIndex: number;
  durationSec: number;
  fromSec: number;
  objectPosition?: string;
  scaleEnd?: number;
  scaleStart?: number;
};

const Shot: React.FC<ShotProps> = ({
  clipIndex,
  durationSec,
  fromSec,
  objectPosition = "50% 50%",
  scaleEnd = 1.04,
  scaleStart = 1.12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = Math.round(fromSec * fps);
  const duration = Math.round(durationSec * fps);
  const local = frame - from;
  const scale = interpolate(local, [0, duration], [scaleStart, scaleEnd], softClamp);
  const fadeIn = interpolate(local, [0, 8], [0, 1], softClamp);

  return (
    <Sequence from={from} durationInFrames={duration} premountFor={fps}>
      <AbsoluteFill style={{ opacity: fadeIn }}>
        <OffthreadVideo
          loop
          muted
          src={staticFile(demoClips[clipIndex].src)}
          style={{ ...coverVideo, objectPosition, transform: `scale(${scale})` }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const TextureLayer: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(180deg, rgba(8,11,10,0.28) 0%, rgba(8,11,10,0.04) 42%, rgba(8,11,10,0.58) 100%)",
      boxShadow: "inset 0 0 180px rgba(0,0,0,0.42)",
      mixBlendMode: "multiply",
      zIndex: 8,
    }}
  />
);

const HandNote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 4.55 * fps;
  const local = frame - start;
  const opacity = interpolate(local, [0, 9, 46, 58], [0, 1, 1, 0], softClamp);
  const lift = interpolate(local, [0, 18], [18, 0], softClamp);
  const draw = interpolate(local, [8, 28], [0, 1], softClamp);

  return (
    <div
      style={{
        color: "#fff2c7",
        fontFamily: '"Marker Felt", "Bradley Hand", "Comic Sans MS", cursive',
        fontSize: 58,
        left: 78,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow: "0 8px 22px rgba(0,0,0,0.48)",
        top: 1238,
        transform: `translateY(${lift}px) rotate(-2deg)`,
        zIndex: 24,
      }}
    >
      <div>路上有风</div>
      <svg height="42" style={{ display: "block", marginTop: 8 }} viewBox="0 0 360 42" width="360">
        <path
          d="M7 24 C72 6 122 35 188 18 C246 4 294 34 352 15"
          fill="none"
          stroke="#f4c95a"
          strokeLinecap="round"
          strokeWidth="8"
          style={{
            filter: "drop-shadow(0 7px 14px rgba(0,0,0,0.38))",
            strokeDasharray: 380,
            strokeDashoffset: 380 - 380 * draw,
          }}
        />
      </svg>
    </div>
  );
};

const SplitMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 6.45 * fps;
  const local = frame - start;
  const opacity = interpolate(local, [0, 8, 48, 58], [0, 1, 1, 0], softClamp);
  const slide = interpolate(local, [0, 18], [30, 0], softClamp);

  const panel: React.CSSProperties = {
    border: "1.5px solid rgba(255,245,217,0.58)",
    boxShadow: "0 18px 38px rgba(0,0,0,0.22)",
    overflow: "hidden",
    position: "absolute",
  };

  return (
    <Sequence from={Math.round(6.45 * fps)} durationInFrames={Math.round(2.05 * fps)} premountFor={fps}>
      <AbsoluteFill style={{ opacity, transform: `translateY(${slide}px)`, zIndex: 18 }}>
        <div style={{ ...panel, height: 420, left: 60, top: 292, width: 960 }}>
          <OffthreadVideo loop muted src={staticFile(demoClips[2].src)} style={{ ...coverVideo, objectPosition: "48% 50%" }} />
        </div>
        <div style={{ ...panel, height: 610, left: 60, top: 738, width: 462 }}>
          <OffthreadVideo loop muted src={staticFile(demoClips[0].src)} style={{ ...coverVideo, objectPosition: "48% 50%" }} />
        </div>
        <div style={{ ...panel, height: 610, right: 60, top: 738, width: 462 }}>
          <OffthreadVideo loop muted src={staticFile(demoClips[3].src)} style={{ ...coverVideo, objectPosition: "52% 50%" }} />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

const RealFrameTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 8.45 * fps;
  const local = frame - start;
  const opacity = interpolate(local, [0, 12, 58, 66], [0, 1, 1, 0], softClamp);
  const y = interpolate(local, [0, 20], [22, 0], softClamp);

  return (
    <div
      style={{
        bottom: 246,
        color: "#fff8e5",
        fontFamily: "Arial, Helvetica, sans-serif",
        left: 70,
        opacity,
        position: "absolute",
        right: 70,
        textShadow: "0 14px 34px rgba(0,0,0,0.52)",
        transform: `translateY(${y}px)`,
        zIndex: 22,
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>先看这一秒</div>
      <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.02 }}>把画面剪成呼吸</div>
    </div>
  );
};

const ClosingLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 10.45 * fps;
  const local = frame - start;
  const opacity = interpolate(local, [0, 14], [0, 1], softClamp);
  const shade = interpolate(local, [0, 36], [0.15, 0.82], softClamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(9,12,11,${shade})`,
        color: "#fff4d6",
        fontFamily: "Arial, Helvetica, sans-serif",
        opacity,
        zIndex: 28,
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(255,244,214,0.54)",
          bottom: 136,
          left: 72,
          paddingTop: 32,
          position: "absolute",
          right: 72,
        }}
      >
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.04 }}>这一版，先看感觉。</div>
        <div style={{ color: "#d9cfb2", fontSize: 28, lineHeight: 1.35, marginTop: 18 }}>风从画面里过去，故事先停在这里。</div>
      </div>
    </AbsoluteFill>
  );
};

export const AestheticRetargetDemo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0c100f", overflow: "hidden" }}>
    <Audio src={staticFile(demoAudio)} volume={0.74} />
    <Shot clipIndex={0} durationSec={2.05} fromSec={0} objectPosition="48% 50%" scaleStart={1.08} />
    <Shot clipIndex={1} durationSec={1.2} fromSec={1.85} objectPosition="50% 50%" scaleStart={1.14} />
    <Shot clipIndex={2} durationSec={1.25} fromSec={2.95} objectPosition="50% 50%" scaleStart={1.12} />
    <Shot clipIndex={3} durationSec={2.45} fromSec={4.05} objectPosition="52% 50%" scaleStart={1.12} />
    <Shot clipIndex={1} durationSec={2.2} fromSec={8.35} objectPosition="50% 48%" scaleStart={1.1} />
    <Shot clipIndex={0} durationSec={1.65} fromSec={10.35} objectPosition="50% 50%" scaleStart={1.06} />
    <TextureLayer />
    <HandNote />
    <SplitMoment />
    <RealFrameTitle />
    <ClosingLine />
  </AbsoluteFill>
);
