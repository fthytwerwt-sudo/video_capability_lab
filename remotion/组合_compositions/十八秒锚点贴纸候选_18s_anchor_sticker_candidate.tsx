import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Anchor18sCaptionEvent,
  Anchor18sSegment,
  Anchor18sStickerEvent,
  anchor18sAudio,
  anchor18sCaptionEvents,
  anchor18sSegments,
  anchor18sStickerEvents,
} from "../数据_data/十八秒锚点贴纸事件_18s_anchor_sticker_events";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const fullVideo: React.CSSProperties = {
  height: "100%",
  objectFit: "cover",
  width: "100%",
};

const toFrame = (seconds: number, fps: number) => Math.round(seconds * fps);

const SceneLayer: React.FC<{ segment: Anchor18sSegment; index: number }> = ({ segment, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const opening = segment.id === "sand_trace_opening_no_sticker";
  const opacity = opening
    ? interpolate(local, [duration - 10, duration], [1, 0], clamp)
    : interpolate(local, [0, 8, duration - 10, duration], [0, 1, 1, 0], clamp);
  const scale = interpolate(local, [0, duration], [segment.scaleStart, segment.scaleEnd], clamp);
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);
  const quiet = segment.role === "no_sticker_breath" || segment.role === "ending_hold";

  return (
    <Sequence from={from} durationInFrames={duration} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          loop
          muted
          src={staticFile(segment.src)}
          style={{
            ...fullVideo,
            filter: `contrast(${quiet ? 0.96 : 1.03}) saturate(${quiet ? 0.9 : 0.98})`,
            transform: `scale(${scale}) translateY(${y}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const Atmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(Math.sin(frame / 32), [-1, 1], [0.05, 0.16]);
  const settle = interpolate(frame, [410, 492, 540], [0, 0.08, 0.48], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(4,6,5,0.14) 0%, rgba(4,6,5,0.02) 38%, rgba(4,6,5,0.64) 100%)",
        boxShadow: "inset 0 0 170px rgba(0,0,0,0.34)",
        zIndex: 28,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 39%, rgba(255,247,214,${glow}) 0%, rgba(255,247,214,0) 34%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(5, 7, 6, ${settle})` }} />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.024) 0px, rgba(255,255,255,0.024) 1px, transparent 1px, transparent 5px)",
          opacity: 0.18,
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ event: Anchor18sCaptionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, 7, duration - 8, duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(local, [0, 14], [22, 0], clamp);
  const isBreath = event.tone === "breath";
  const isEnding = event.tone === "ending";
  const wobble = Math.sin(local / 9) * (isBreath || isEnding ? 0.7 : 1.2);

  return (
    <div
      style={{
        color: isBreath ? "#17201e" : "#fff2cf",
        fontFamily: isEnding ? "Georgia, 'Times New Roman', serif" : '"Marker Felt", "Bradley Hand", cursive',
        fontSize: isEnding ? 58 : isBreath ? 42 : 58,
        fontWeight: isEnding ? 780 : 800,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow: isBreath ? "0 8px 18px rgba(255,255,255,0.42)" : "0 10px 28px rgba(0,0,0,0.5)",
        top: event.y,
        transform: `translateY(${lift}px) rotate(${wobble - (isEnding ? 1.4 : 0.2)}deg)`,
        whiteSpace: "nowrap",
        zIndex: 58,
      }}
    >
      {event.text}
    </div>
  );
};

const CaptionLayer: React.FC = () => (
  <>
    {anchor18sCaptionEvents.map((event) => (
      <Caption event={event} key={event.id} />
    ))}
  </>
);

const HandArrow: React.FC<{ event: Anchor18sStickerEvent; draw: number }> = ({ event, draw }) => (
  <svg height="142" viewBox="0 0 220 142" width="220">
    <path
      d="M18 88 C58 42 114 34 168 56"
      fill="none"
      pathLength={1}
      stroke={event.color}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="12"
    />
    <path
      d="M149 25 L190 62 L135 76"
      fill="none"
      pathLength={1}
      stroke="#fff3c7"
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="6"
    />
    <path
      d="M149 25 L190 62 L135 76"
      fill="none"
      pathLength={1}
      stroke={event.color}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="10"
    />
  </svg>
);

const FocusCircle: React.FC<{ event: Anchor18sStickerEvent; draw: number }> = ({ event, draw }) => (
  <svg height="188" viewBox="0 0 188 188" width="188">
    <path
      d="M96 18 C139 20 166 52 158 96 C150 141 102 166 60 148 C20 131 13 80 37 45 C50 26 68 16 96 18Z"
      fill="rgba(255,247,207,0.04)"
      pathLength={1}
      stroke={event.color}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="10"
    />
    <path
      d="M55 36 C79 20 118 22 139 43"
      fill="none"
      opacity="0.42"
      pathLength={1}
      stroke="#fff4cc"
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>
);

const TraceWave: React.FC<{ event: Anchor18sStickerEvent; draw: number }> = ({ event, draw }) => (
  <svg height="108" viewBox="0 0 244 108" width="244">
    <path
      d="M14 62 C43 22 72 91 101 55 C132 17 159 88 189 52 C205 33 221 36 232 48"
      fill="none"
      pathLength={1}
      stroke="#efffff"
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="4"
    />
    <path
      d="M14 62 C43 22 72 91 101 55 C132 17 159 88 189 52 C205 33 221 36 232 48"
      fill="none"
      pathLength={1}
      stroke={event.color}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="10"
    />
    <path
      d="M36 84 C65 62 92 88 119 69 C145 50 170 69 194 58"
      fill="none"
      opacity="0.58"
      pathLength={1}
      stroke={event.color}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>
);

const PaperTag: React.FC<{ event: Anchor18sStickerEvent; draw: number }> = ({ event, draw }) => (
  <div
    style={{
      alignItems: "center",
      backgroundColor: "rgba(244, 215, 170, 0.9)",
      border: "2px solid rgba(42, 34, 22, 0.28)",
      borderRadius: 14,
      boxShadow: "0 9px 22px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.28)",
      color: "#251d13",
      display: "flex",
      fontFamily: '"Marker Felt", "Bradley Hand", cursive',
      fontSize: 44,
      fontWeight: 820,
      height: 82,
      justifyContent: "center",
      letterSpacing: 0,
      opacity: 0.96,
      transform: `scale(${0.88 + draw * 0.12})`,
      width: 128,
    }}
  >
    {event.text}
  </div>
);

const StickerGraphic: React.FC<{ event: Anchor18sStickerEvent; draw: number }> = ({ event, draw }) => {
  if (event.kind === "arrow") {
    return <HandArrow draw={draw} event={event} />;
  }

  if (event.kind === "circle") {
    return <FocusCircle draw={draw} event={event} />;
  }

  if (event.kind === "wave") {
    return <TraceWave draw={draw} event={event} />;
  }

  return <PaperTag draw={draw} event={event} />;
};

const Sticker: React.FC<{ event: Anchor18sStickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, 5, duration - 6, duration], [0, 1, 1, 0], clamp);
  const pop = spring({ frame: Math.max(0, local), fps, config: { damping: 13, mass: 0.42, stiffness: 160 } });
  const draw = interpolate(local, [0, event.kind === "tag" ? 5 : 13], [0, 1], clamp);
  const drift = interpolate(local, [0, duration], [8, -6], clamp);
  const breathe = 1 + Math.sin(local / 13) * 0.012;
  const scale = (0.88 + pop * 0.12) * breathe;

  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      style={{
        filter: "drop-shadow(0 7px 15px rgba(0,0,0,0.24))",
        left: event.x,
        opacity: opacity * 0.92,
        position: "absolute",
        top: event.y,
        transform: `translateY(${drift}px) rotate(${event.rotate ?? 0}deg) scale(${scale})`,
        transformOrigin: "center",
        zIndex: 66,
      }}
    >
      <StickerGraphic draw={draw} event={event} />
    </div>
  );
};

const StickerLayer: React.FC = () => (
  <>
    {anchor18sStickerEvents.map((event) => (
      <Sticker event={event} key={event.id} />
    ))}
  </>
);

const EndingShade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(16.36, fps);
  const local = frame - from;
  const opacity = interpolate(local, [0, 18, 52], [0, 0.52, 0.78], clamp);
  const line = interpolate(local, [10, 34], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: `rgba(5,7,6,${opacity})`, zIndex: 52 }}>
      <div
        style={{
          backgroundColor: "rgba(255,239,198,0.62)",
          bottom: 368,
          height: 1,
          left: 76,
          position: "absolute",
          transform: `scaleX(${line})`,
          transformOrigin: "left center",
          width: 270,
        }}
      />
    </AbsoluteFill>
  );
};

export const EighteenSecondAnchorStickerCandidate: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#060807", overflow: "hidden" }}>
    <Audio src={staticFile(anchor18sAudio)} volume={0.76} />
    {anchor18sSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.id} segment={segment} />
    ))}
    <Atmosphere />
    <EndingShade />
    <CaptionLayer />
    <StickerLayer />
  </AbsoluteFill>
);
