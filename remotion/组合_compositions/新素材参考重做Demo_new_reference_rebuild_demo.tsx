import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { newReferenceRebuildAudio, newReferenceRebuildClips } from "../数据_data/新素材重做清单_new_reference_rebuild_clips";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const fillVideo: React.CSSProperties = {
  height: "100%",
  objectFit: "cover",
  width: "100%",
};

type SceneProps = {
  clipIndex: number;
  durationSec: number;
  fromSec: number;
  scaleEnd?: number;
  scaleStart?: number;
};

const Scene: React.FC<SceneProps> = ({ clipIndex, durationSec, fromSec, scaleEnd = 1.04, scaleStart = 1.11 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(fromSec * fps);
  const duration = Math.round(durationSec * fps);
  const local = frame - start;
  const opacity = interpolate(local, [0, 8, duration - 8, duration], [0, 1, 1, 0], clamp);
  const scale = interpolate(local, [0, duration], [scaleStart, scaleEnd], clamp);
  const y = interpolate(local, [0, duration], [18, -10], clamp);

  return (
    <Sequence from={start} durationInFrames={duration} premountFor={fps}>
      <AbsoluteFill style={{ opacity }}>
        <OffthreadVideo
          loop
          muted
          src={staticFile(newReferenceRebuildClips[clipIndex].src)}
          style={{ ...fillVideo, transform: `scale(${scale}) translateY(${y}px)` }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

type CaptionProps = {
  fromSec: number;
  text: string;
  tone?: "light" | "strong" | "tiny";
  x: number;
  y: number;
};

const MoodCaption: React.FC<CaptionProps> = ({ fromSec, text, tone = "light", x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - fromSec * fps;
  const opacity = interpolate(local, [0, 8, 44, 56], [0, 1, 1, 0], clamp);
  const drift = interpolate(local, [0, 20], [18, 0], clamp);
  const wobble = Math.sin(local / 8) * 1.2;
  const size = tone === "strong" ? 82 : tone === "tiny" ? 30 : 48;
  const weight = tone === "strong" ? 800 : 700;

  return (
    <div
      style={{
        color: tone === "tiny" ? "#1e2320" : "#fff7dd",
        fontFamily: tone === "strong" ? "Georgia, 'Times New Roman', serif" : '"Marker Felt", "Bradley Hand", cursive',
        fontSize: size,
        fontWeight: weight,
        left: x,
        letterSpacing: 0,
        lineHeight: 1.02,
        opacity,
        position: "absolute",
        textShadow: tone === "tiny" ? "none" : "0 10px 26px rgba(0,0,0,0.42)",
        top: y,
        transform: `translateY(${drift}px) rotate(${tone === "strong" ? -1.2 : wobble}deg)`,
        zIndex: 34,
      }}
    >
      {text}
    </div>
  );
};

type AccentProps = {
  fromSec: number;
  kind: "spark" | "arrow" | "circle" | "wave";
  x: number;
  y: number;
};

const Accent: React.FC<AccentProps> = ({ fromSec, kind, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - fromSec * fps;
  const opacity = interpolate(local, [0, 5, 34, 44], [0, 1, 1, 0], clamp);
  const pop = spring({ frame: Math.max(0, local), fps, config: { damping: 14, mass: 0.4, stiffness: 180 } });
  const stroke = "#ffe05d";

  if (opacity <= 0) {
    return null;
  }

  const common: React.CSSProperties = {
    left: x,
    opacity,
    position: "absolute",
    top: y,
    transform: `scale(${0.7 + pop * 0.3}) rotate(-6deg)`,
    zIndex: 36,
  };

  if (kind === "spark") {
    return (
      <svg height="96" style={common} viewBox="0 0 96 96" width="96">
        <path d="M47 8 L50 34 L73 22 L57 45 L84 48 L58 55 L72 78 L49 64 L43 89 L40 62 L14 76 L31 53 L8 46 L33 40 Z" fill={stroke} opacity="0.92" />
      </svg>
    );
  }

  if (kind === "arrow") {
    return (
      <svg height="94" style={common} viewBox="0 0 160 94" width="160">
        <path d="M13 57 C43 24 82 22 124 39" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="9" />
        <path d="M111 18 L138 43 L101 50" fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="9" />
      </svg>
    );
  }

  if (kind === "circle") {
    return (
      <svg height="132" style={common} viewBox="0 0 132 132" width="132">
        <path d="M70 13 C105 18 122 48 113 78 C103 113 65 125 35 109 C6 93 2 55 24 31 C35 19 51 11 70 13Z" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="8" />
      </svg>
    );
  }

  return (
    <svg height="72" style={common} viewBox="0 0 180 72" width="180">
      <path d="M9 42 C31 12 53 68 75 38 C97 8 119 66 143 37 C154 24 165 25 174 33" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="8" />
    </svg>
  );
};

const BreathTexture: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(180deg, rgba(6,8,7,0.18) 0%, rgba(6,8,7,0.02) 38%, rgba(6,8,7,0.58) 100%)",
      boxShadow: "inset 0 0 160px rgba(0,0,0,0.32)",
      zIndex: 18,
    }}
  />
);

const ScrapbookMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = Math.round(6.52 * fps);
  const local = frame - start;
  const opacity = interpolate(local, [0, 8, 48, 58], [0, 1, 1, 0], clamp);
  const lift = interpolate(local, [0, 18], [30, 0], clamp);

  const card: React.CSSProperties = {
    backgroundColor: "#0b0d0c",
    border: "1px solid rgba(255,244,210,0.38)",
    overflow: "hidden",
    position: "absolute",
  };

  return (
    <Sequence from={start} durationInFrames={Math.round(2.05 * fps)} premountFor={fps}>
      <AbsoluteFill style={{ backgroundColor: "#090b0a", opacity, transform: `translateY(${lift}px)`, zIndex: 26 }}>
        <div style={{ ...card, height: 570, left: 72, top: 210, width: 410 }}>
          <OffthreadVideo loop muted src={staticFile(newReferenceRebuildClips[1].src)} style={fillVideo} />
        </div>
        <div style={{ ...card, height: 390, right: 72, top: 300, width: 450 }}>
          <OffthreadVideo loop muted src={staticFile(newReferenceRebuildClips[2].src)} style={fillVideo} />
        </div>
        <div style={{ ...card, height: 560, left: 210, top: 900, width: 660 }}>
          <OffthreadVideo loop muted src={staticFile(newReferenceRebuildClips[3].src)} style={fillVideo} />
        </div>
        <MoodCaption fromSec={0.2} text="咔" tone="tiny" x={112} y={814} />
        <Accent fromSec={0.53} kind="wave" x={705} y={784} />
      </AbsoluteFill>
    </Sequence>
  );
};

const ClosingBreath: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 10.46 * fps;
  const local = frame - start;
  const opacity = interpolate(local, [0, 14], [0, 1], clamp);
  const shade = interpolate(local, [0, 38], [0.1, 0.86], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(8,10,9,${shade})`,
        color: "#fff4d4",
        fontFamily: "Georgia, 'Times New Roman', serif",
        opacity,
        zIndex: 42,
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(255,242,207,0.52)",
          bottom: 138,
          left: 78,
          paddingTop: 30,
          position: "absolute",
          right: 78,
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: 0, lineHeight: 1.02 }}>先停在这里。</div>
        <div style={{ color: "#d8ccb0", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 30, lineHeight: 1.35, marginTop: 18 }}>
          风还在走，画面先呼吸一下。
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const NewReferenceRebuildDemo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#080b0a", overflow: "hidden" }}>
    <Audio src={staticFile(newReferenceRebuildAudio)} volume={0.74} />
    <Scene clipIndex={0} durationSec={2.05} fromSec={0} scaleEnd={1.04} scaleStart={1.08} />
    <Scene clipIndex={1} durationSec={1.55} fromSec={1.85} scaleEnd={1.06} scaleStart={1.14} />
    <Scene clipIndex={2} durationSec={1.45} fromSec={3.18} scaleEnd={1.04} scaleStart={1.12} />
    <Scene clipIndex={4} durationSec={1.85} fromSec={4.44} scaleEnd={1.05} scaleStart={1.12} />
    <Scene clipIndex={5} durationSec={1.58} fromSec={8.36} scaleEnd={1.04} scaleStart={1.1} />
    <Scene clipIndex={1} durationSec={1.18} fromSec={9.68} scaleEnd={1.03} scaleStart={1.08} />
    <Scene clipIndex={2} durationSec={1.28} fromSec={10.16} scaleEnd={1.03} scaleStart={1.06} />
    <BreathTexture />
    <MoodCaption fromSec={2.18} text="风过来" x={82} y={1192} />
    <Accent fromSec={2.26} kind="arrow" x={704} y={1098} />
    <MoodCaption fromSec={4.78} text="慢一点" x={610} y={338} />
    <Accent fromSec={4.96} kind="circle" x={544} y={442} />
    <ScrapbookMoment />
    <MoodCaption fromSec={8.72} text="藏在路上" tone="strong" x={76} y={1210} />
    <Accent fromSec={9.02} kind="spark" x={842} y={1106} />
    <ClosingBreath />
  </AbsoluteFill>
);
