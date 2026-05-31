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
  ThirtySecondCaptionEvent,
  ThirtySecondSegment,
  ThirtySecondStickerEvent,
  thirtySecondAudio,
  thirtySecondCaptionEvents,
  thirtySecondSegments,
  thirtySecondStickerEvents,
} from "../数据_data/三十秒对标素材清单_30s_reference_sample_clips";

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

const SceneLayer: React.FC<{ segment: ThirtySecondSegment; index: number }> = ({ segment, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const opacity =
    segment.id === "sand_trace_opening"
      ? interpolate(local, [duration - 10, duration], [1, 0], clamp)
      : interpolate(local, [0, 8, duration - 10, duration], [0, 1, 1, 0], clamp);
  const scale = interpolate(local, [0, duration], [segment.scaleStart, segment.scaleEnd], clamp);
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);
  const contrast = segment.role === "emotional_peak" ? 1.09 : 1;

  return (
    <Sequence from={from} durationInFrames={duration} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          loop
          muted
          src={staticFile(segment.src)}
          style={{
            ...fullVideo,
            filter: `contrast(${contrast}) saturate(0.96)`,
            transform: `scale(${scale}) translateY(${y}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const Atmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = interpolate(Math.sin(frame / 28), [-1, 1], [0.08, 0.2]);
  const peakShade = interpolate(frame, [18.8 * fps, 20.5 * fps, 23 * fps], [0, 0.22, 0.06], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(4,6,5,0.16) 0%, rgba(4,6,5,0.03) 38%, rgba(4,6,5,0.62) 100%)",
        boxShadow: "inset 0 0 180px rgba(0,0,0,0.38)",
        zIndex: 24,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 52% 42%, rgba(255,247,211,${pulse}) 0%, rgba(255,247,211,0) 34%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background: `rgba(7, 9, 8, ${peakShade})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.028) 0px, rgba(255,255,255,0.028) 1px, transparent 1px, transparent 5px)",
          opacity: 0.2,
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ event: ThirtySecondCaptionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, 6, duration - 7, duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(local, [0, 12], [22, 0], clamp);
  const wobble = Math.sin(local / 7) * 1.4;
  const isImpact = event.tone === "impact";
  const isSerif = event.tone === "serif";
  const isSmall = event.tone === "small";

  return (
    <div
      style={{
        color: isSmall ? "#1a211f" : "#fff6d8",
        fontFamily: isSerif || isImpact ? "Georgia, 'Times New Roman', serif" : '"Marker Felt", "Bradley Hand", cursive',
        fontSize: isImpact ? 92 : isSerif ? 54 : isSmall ? 42 : 58,
        fontWeight: isImpact ? 850 : isSmall ? 800 : 760,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow: isSmall ? "0 6px 16px rgba(255,255,255,0.45)" : "0 10px 28px rgba(0,0,0,0.54)",
        top: event.y,
        transform: `translateY(${lift}px) rotate(${isImpact ? -1.6 : wobble}deg)`,
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
    {thirtySecondCaptionEvents.map((event) => (
      <Caption event={event} key={event.id} />
    ))}
  </>
);

const StickerSvg: React.FC<{ event: ThirtySecondStickerEvent; scale: number }> = ({ event, scale }) => {
  const stroke = event.color;
  const fill = event.color;

  if (event.kind === "arrow") {
    return (
      <svg height="130" viewBox="0 0 210 130" width="210">
        <path d="M18 82 C60 34 112 30 164 52" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="12" />
        <path d="M146 22 L184 58 L132 70" fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" />
      </svg>
    );
  }

  if (event.kind === "circle") {
    return (
      <svg height="170" viewBox="0 0 170 170" width="170">
        <path d="M88 15 C130 19 154 51 146 91 C138 132 94 156 55 140 C17 124 9 79 31 45 C44 25 62 13 88 15Z" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="10" />
      </svg>
    );
  }

  if (event.kind === "spark") {
    return (
      <svg height="145" viewBox="0 0 145 145" width="145">
        <path d="M72 9 L79 53 L119 31 L93 72 L136 80 L93 91 L113 130 L72 105 L47 137 L51 91 L9 111 L40 74 L13 43 L55 53 Z" fill={fill} opacity="0.94" />
      </svg>
    );
  }

  if (event.kind === "wave") {
    return (
      <svg height="96" viewBox="0 0 230 96" width="230">
        <path d="M12 56 C41 15 70 88 98 50 C126 12 154 86 184 48 C199 28 214 32 224 43" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="10" />
      </svg>
    );
  }

  if (event.kind === "tag") {
    return (
      <div
        style={{
          backgroundColor: stroke,
          borderRadius: 999,
          boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
          color: "#151712",
          fontFamily: '"Marker Felt", "Bradley Hand", cursive',
          fontSize: 38,
          fontWeight: 800,
          letterSpacing: 0,
          padding: "18px 28px 16px",
          transform: `scale(${scale})`,
          whiteSpace: "nowrap",
        }}
      >
        {event.text}
      </div>
    );
  }

  if (event.kind === "burst") {
    return (
      <svg height="170" viewBox="0 0 170 170" width="170">
        <path d="M85 14 L96 60 L140 37 L116 81 L158 96 L111 104 L126 151 L86 121 L50 155 L59 106 L12 112 L53 84 L25 45 L69 61 Z" fill={fill} opacity="0.9" />
      </svg>
    );
  }

  if (event.kind === "dottrail") {
    return (
      <svg height="120" viewBox="0 0 210 120" width="210">
        <circle cx="24" cy="68" fill={fill} r="13" />
        <circle cx="70" cy="46" fill={fill} r="11" opacity="0.85" />
        <circle cx="118" cy="65" fill={fill} r="15" opacity="0.95" />
        <circle cx="166" cy="42" fill={fill} r="10" opacity="0.72" />
      </svg>
    );
  }

  return (
    <svg height="96" viewBox="0 0 230 96" width="230">
      <path d="M14 55 C54 72 101 73 147 55 C176 44 198 42 217 48" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="12" />
      <path d="M52 76 C94 87 135 82 171 65" fill="none" stroke={stroke} strokeLinecap="round" strokeWidth="8" opacity="0.6" />
    </svg>
  );
};

const Sticker: React.FC<{ event: ThirtySecondStickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, 5, duration - 5, duration], [0, 1, 1, 0], clamp);
  const pop = spring({ frame: Math.max(0, local), fps, config: { damping: 11, mass: 0.4, stiffness: 170 } });
  const drift = interpolate(local, [0, duration], [10, -8], clamp);
  const scale = 0.82 + pop * 0.18;

  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      style={{
        left: event.x,
        opacity,
        position: "absolute",
        top: event.y,
        transform: `translateY(${drift}px) rotate(${event.rotate ?? 0}deg) scale(${scale})`,
        zIndex: 64,
      }}
    >
      <StickerSvg event={event} scale={scale} />
    </div>
  );
};

const StickerLayer: React.FC = () => (
  <>
    {thirtySecondStickerEvents.map((event) => (
      <Sticker event={event} key={event.id} />
    ))}
  </>
);

const ScrapbookLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(10.92, fps);
  const duration = toFrame(4.02, fps);
  const local = frame - from;
  const opacity = interpolate(local, [0, 8, duration - 10, duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(local, [0, 22], [36, 0], clamp);

  const panel: React.CSSProperties = {
    backgroundColor: "#090b0a",
    border: "1px solid rgba(255,242,204,0.3)",
    boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
    overflow: "hidden",
    position: "absolute",
  };

  return (
    <Sequence from={from} durationInFrames={duration} premountFor={fps}>
      <AbsoluteFill style={{ backgroundColor: "#070908", opacity, transform: `translateY(${lift}px)`, zIndex: 42 }}>
        <div style={{ ...panel, height: 520, left: 76, top: 210, width: 360 }}>
          <OffthreadVideo loop muted src={staticFile(thirtySecondSegments[8].src)} style={fullVideo} />
        </div>
        <div style={{ ...panel, height: 380, right: 72, top: 332, width: 450 }}>
          <OffthreadVideo loop muted src={staticFile(thirtySecondSegments[9].src)} style={fullVideo} />
        </div>
        <div style={{ ...panel, height: 560, left: 208, top: 908, width: 664 }}>
          <OffthreadVideo loop muted src={staticFile(thirtySecondSegments[10].src)} style={fullVideo} />
        </div>
        <div
          style={{
            bottom: 206,
            color: "#fff1c2",
            fontFamily: '"Marker Felt", "Bradley Hand", cursive',
            fontSize: 44,
            left: 86,
            letterSpacing: 0,
            position: "absolute",
            transform: "rotate(-2deg)",
          }}
        >
          慢一点
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

const PeakFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = interpolate(frame, [19.2 * fps, 20.4 * fps, 22.2 * fps], [0, 0.36, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, rgba(255,216,95,${glow}) 0%, rgba(255,156,196,${glow * 0.5}) 36%, rgba(0,0,0,0) 72%)`,
        mixBlendMode: "screen",
        zIndex: 50,
      }}
    />
  );
};

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = toFrame(27.18, fps);
  const local = frame - start;
  const opacity = interpolate(local, [0, 12], [0, 1], clamp);
  const shade = interpolate(local, [0, 50], [0.18, 0.88], clamp);
  const line = interpolate(local, [8, 34], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(6,8,7,${shade})`,
        color: "#fff2cf",
        fontFamily: "Georgia, 'Times New Roman', serif",
        opacity,
        zIndex: 72,
      }}
    >
      <div
        style={{
          bottom: 152,
          left: 74,
          position: "absolute",
          right: 74,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,239,198,0.62)",
            height: 1,
            marginBottom: 30,
            transform: `scaleX(${line})`,
            transformOrigin: "left center",
            width: "100%",
          }}
        />
        <div style={{ fontSize: 76, fontWeight: 860, letterSpacing: 0, lineHeight: 1.02 }}>先停在这里。</div>
        <div style={{ color: "#d8ccb0", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 30, lineHeight: 1.38, marginTop: 18 }}>
          风把路藏好了，再看一秒。
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ThirtySecondReferenceSample: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#060807", overflow: "hidden" }}>
    <Audio src={staticFile(thirtySecondAudio)} volume={0.78} />
    {thirtySecondSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.id} segment={segment} />
    ))}
    <Atmosphere />
    <ScrapbookLayer />
    <PeakFlash />
    <CaptionLayer />
    <StickerLayer />
    <EndCard />
  </AbsoluteFill>
);
