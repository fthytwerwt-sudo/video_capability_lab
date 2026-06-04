import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CaptionEvent,
  RoutedSegment,
  StickerEvent,
  TransitionEvent,
  captionEvents,
  routedFullCandidateBgm,
  routedFullCandidateComposition,
  routedSegments,
  stickerEvents,
  transitionEvents,
} from "../数据_data/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate";

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

const fullVideo: React.CSSProperties = {
  height: "100%",
  objectFit: "cover",
  width: "100%",
};

const gradeFilter = (grade: RoutedSegment["grade"]) => {
  if (grade === "cool_texture") {
    return "contrast(1.08) saturate(0.88) brightness(0.94)";
  }
  if (grade === "breath_soft") {
    return "contrast(0.96) saturate(0.88) brightness(1.02)";
  }
  if (grade === "dark_close") {
    return "contrast(1.05) saturate(0.78) brightness(0.82)";
  }
  return "contrast(1.05) saturate(1.02) brightness(1)";
};

const SceneLayer: React.FC<{ segment: RoutedSegment; index: number }> = ({
  segment,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const isFirst = segment.fromSec === 0;
  const isLast = segment.fromSec + segment.durationSec >= routedFullCandidateComposition.durationSec;
  const introOpacity = isFirst ? interpolate(local, [0, 6], [0, 1], clamp) : 1;
  const outroOpacity = isLast
    ? interpolate(local, [Math.max(0, duration - 16), duration], [1, 0], clamp)
    : 1;
  const opacity = Math.min(introOpacity, outroOpacity);
  const scale = interpolate(
    local,
    [0, duration],
    [segment.scaleStart, segment.scaleEnd],
    clamp
  );
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);

  return (
    <Sequence from={from} durationInFrames={duration + 2} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(segment.src)}
          startFrom={toFrame(segment.sourceStartSec, fps)}
          style={{
            ...fullVideo,
            filter: gradeFilter(segment.grade),
            objectPosition: segment.objectPosition,
            transform: `scale(${scale}) translateY(${y}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const AtmosphereLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const lowPulse = interpolate(Math.sin(frame / 24), [-1, 1], [0.03, 0.11]);
  const darkClose = interpolate(frame, [350, 456, 540], [0, 0.18, 0.58], clamp);
  const breathWash = interpolate(frame, [236, 302, 356], [0, 0.14, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(12, 13, 12, 0.12) 0%, rgba(12, 13, 12, 0.02) 42%, rgba(5, 6, 6, 0.42) 100%)",
        boxShadow: "inset 0 0 170px rgba(0,0,0,0.30)",
        zIndex: 42,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 36% 26%, rgba(250, 221, 150, ${lowPulse}) 0%, rgba(250, 221, 150, 0) 34%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(220, 228, 214, ${breathWash})`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(2, 4, 5, ${darkClose})` }} />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 7px)",
          opacity: 0.18,
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ event: CaptionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(
    local,
    [0, event.entryFrames, Math.max(event.entryFrames + 1, duration - event.exitFrames), duration],
    [0, 1, 1, 0],
    clamp
  );
  const lift = interpolate(local, [0, event.entryFrames + 5], [22, 0], clamp);
  const pop = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 14, mass: 0.38, stiffness: 165 },
  });
  const isHero = event.captionType === "hero_keyword";
  const isWhisper = event.captionType === "whisper_caption";
  const color = isWhisper ? "rgba(255, 246, 214, 0.86)" : "#fff1c9";
  const shadow = isWhisper
    ? "0 8px 22px rgba(0,0,0,0.32)"
    : "0 4px 0 rgba(28,25,19,0.72), 0 12px 28px rgba(0,0,0,0.46)";

  return (
    <div
      style={{
        color,
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: event.fontSize,
        fontWeight: isWhisper ? 650 : 850,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1.02,
        maxWidth: event.maxWidth,
        opacity,
        position: "absolute",
        textShadow: shadow,
        top: event.y,
        transform: `translateY(${lift}px) rotate(${event.rotateDeg}deg) scale(${
          isHero ? 0.96 + pop * 0.04 : 1
        })`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
        zIndex: 82,
      }}
    >
      {event.text}
    </div>
  );
};

const CaptionLayer: React.FC = () => (
  <>
    {captionEvents.map((event) => (
      <Caption event={event} key={event.captionId} />
    ))}
  </>
);

const RoughPath: React.FC<{
  d: string;
  draw: number;
  outerWidth: number;
  innerWidth: number;
  innerColor?: string;
}> = ({ d, draw, outerWidth, innerWidth, innerColor = "rgba(238, 186, 75, 0.96)" }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path
      d={d}
      pathLength={1}
      stroke="rgba(255, 250, 225, 0.96)"
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeWidth={outerWidth}
    />
    <path
      d={d}
      pathLength={1}
      stroke={innerColor}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeWidth={innerWidth}
    />
  </g>
);

const EdgeStrokes: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 11], [0, 1], clamp);
  const opacity = interpolate(local, [0, 5, 14, 17], [0, 0.92, 0.86, 0], clamp);
  const paths = [
    "M12 64 C42 50 63 42 92 30",
    "M26 99 C57 91 83 75 112 54",
    "M57 128 C81 118 99 106 126 92",
  ];

  return (
    <svg
      height={150}
      viewBox="0 0 148 150"
      width={148}
      style={{
        filter: "drop-shadow(0 7px 8px rgba(24, 22, 17, 0.24))",
        left: event.x,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotateDeg}deg)`,
        zIndex: 78,
      }}
    >
      {paths.map((path, index) => {
        const offset = Math.max(0, Math.min(1, (draw - index * 0.17) / 0.83));
        return (
          <RoughPath
            d={path}
            draw={offset}
            innerWidth={7 - index}
            key={path}
            outerWidth={17 - index * 2}
          />
        );
      })}
    </svg>
  );
};

const CaptionMicroMark: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 9], [0, 1], clamp);
  const opacity = interpolate(local, [0, 5, 15, 19], [0, 0.9, 0.82, 0], clamp);

  return (
    <svg
      height={80}
      viewBox="0 0 140 80"
      width={140}
      style={{
        filter: "drop-shadow(0 5px 7px rgba(0,0,0,0.22))",
        left: event.x,
        opacity,
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotateDeg}deg)`,
        zIndex: 80,
      }}
    >
      <RoughPath d="M24 48 C44 38 64 34 92 28" draw={draw} innerWidth={6} outerWidth={14} />
      <RoughPath d="M20 64 C33 58 45 55 60 52" draw={draw} innerWidth={4} outerWidth={10} />
    </svg>
  );
};

const ContactFlash: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 8], [0, 1], clamp);
  const opacity = interpolate(local, [0, 4, 15, 19], [0, 1, 0.9, 0], clamp);
  const pop = interpolate(local, [0, 4, 12], [0.64, 1.08, 0.97], clamp);
  const paths = [
    "M44 88 C28 72 20 52 16 34",
    "M74 60 C76 38 87 22 102 10",
    "M102 88 C128 78 144 60 158 38",
    "M68 108 C48 118 34 132 24 150",
  ];

  return (
    <svg
      height={180}
      viewBox="0 0 180 180"
      width={180}
      style={{
        filter: "drop-shadow(0 8px 8px rgba(23, 24, 16, 0.30))",
        left: event.x - 80,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 126,
        transform: `scale(${pop * event.scale}) rotate(${event.rotateDeg}deg)`,
        transformOrigin: "88px 102px",
        zIndex: 79,
      }}
    >
      {paths.map((path, index) => {
        const offset = Math.max(0, Math.min(1, (draw - index * 0.12) / 0.88));
        return <RoughPath d={path} draw={offset} innerWidth={8} key={path} outerWidth={18} />;
      })}
    </svg>
  );
};

const MotionTrail: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const opacity = interpolate(local, [0, 5, 18, 23], [0, 0.92, 0.82, 0], clamp);
  const draw = interpolate(local, [0, 13], [0, 1], clamp);
  const isShadow = event.stickerId.includes("shadow");
  const inner = isShadow ? "rgba(246, 225, 178, 0.62)" : "rgba(239, 186, 70, 0.94)";
  const paths = [
    "M18 34 C44 28 64 20 91 12",
    "M32 70 C58 63 84 52 116 36",
    "M50 108 C78 100 104 86 134 68",
  ];

  return (
    <svg
      height={136}
      viewBox="0 0 156 136"
      width={156}
      style={{
        filter: isShadow
          ? "drop-shadow(0 4px 8px rgba(0,0,0,0.52))"
          : "drop-shadow(0 6px 8px rgba(26,24,20,0.25))",
        left: event.x,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotateDeg}deg)`,
        zIndex: 79,
      }}
    >
      {paths.map((path, index) => {
        const offset = Math.max(0, Math.min(1, (draw - index * 0.18) / 0.82));
        return (
          <RoughPath
            d={path}
            draw={offset}
            innerColor={inner}
            innerWidth={7 - index}
            key={path}
            outerWidth={16 - index * 2}
          />
        );
      })}
    </svg>
  );
};

const BreathLine: React.FC<{ event: StickerEvent; local: number }> = ({ event, local }) => {
  const draw = interpolate(local, [0, 19], [0, 1], clamp);
  const opacity = interpolate(local, [0, 9, 20, 24], [0, 0.72, 0.62, 0], clamp);

  return (
    <svg
      height={96}
      viewBox="0 0 300 96"
      width={300}
      style={{
        filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.16))",
        left: event.x,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotateDeg}deg)`,
        zIndex: 78,
      }}
    >
      <RoughPath
        d="M12 58 C48 40 82 62 120 46 C158 28 190 54 226 38 C250 28 270 30 286 38"
        draw={draw}
        innerColor="rgba(232, 214, 168, 0.52)"
        innerWidth={4}
        outerWidth={10}
      />
    </svg>
  );
};

const StickerGraphic: React.FC<{ event: StickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  if (!event.stickerNeeded) {
    return null;
  }
  if (event.stickerType === "edge_attached_short_stroke_cluster") {
    return <EdgeStrokes event={event} local={frame} />;
  }
  if (event.stickerType === "caption_relation_micro_mark") {
    return <CaptionMicroMark event={event} local={frame} />;
  }
  if (event.stickerType === "contact_flash") {
    return <ContactFlash event={event} local={frame} />;
  }
  if (event.stickerType === "motion_trail_punctuation") {
    return <MotionTrail event={event} local={frame} />;
  }
  return <BreathLine event={event} local={frame} />;
};

const StickerLayer: React.FC = () => (
  <>
    {stickerEvents
      .filter((event) => event.stickerNeeded)
      .map((event) => (
        <Sequence
          durationInFrames={toFrame(event.durationSec, routedFullCandidateComposition.fps)}
          from={toFrame(event.fromSec, routedFullCandidateComposition.fps)}
          key={event.stickerId}
          premountFor={8}
        >
          <StickerGraphic event={event} />
        </Sequence>
      ))}
  </>
);

const TransitionMark: React.FC<{ event: TransitionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(frame, [0, Math.max(1, duration / 2), duration], [0, 0.44, 0], clamp);
  const sweep = interpolate(frame, [0, duration], [-360, 1160], clamp);
  const isDip = event.transitionType === "breath_dip";
  const isFlash = event.transitionType === "texture_flash";
  const isReturn = event.transitionType === "return_cutline";

  if (isDip) {
    return (
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(244, 233, 204, ${opacity * 0.62})`,
          zIndex: 70,
        }}
      />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(105deg, transparent 0%, transparent 42%, rgba(255,247,216,${
          isFlash ? opacity * 0.95 : isReturn ? opacity * 0.72 : opacity
        }) 50%, transparent 58%, transparent 100%)`,
        transform: `translateX(${sweep}px)`,
        zIndex: 70,
      }}
    />
  );
};

const TransitionLayer: React.FC = () => (
  <>
    {transitionEvents.map((event) => (
      <Sequence
        durationInFrames={toFrame(event.durationSec, routedFullCandidateComposition.fps)}
        from={toFrame(event.fromSec, routedFullCandidateComposition.fps)}
        key={event.transitionId}
      >
        <TransitionMark event={event} />
      </Sequence>
    ))}
  </>
);

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      endAt={toFrame(routedFullCandidateComposition.durationSec, fps)}
      src={assetUrl(routedFullCandidateBgm.path)}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / routedFullCandidateBgm.fadeInSec);
        const fadeOut = Math.min(
          1,
          Math.max(
            0,
            (routedFullCandidateComposition.durationSec - second) /
              routedFullCandidateBgm.fadeOutDurationSec
          )
        );
        return routedFullCandidateBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const VisualLanguageRoutedFullCandidate18s: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    {routedSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.segmentId} segment={segment} />
    ))}
    <AtmosphereLayer />
    <TransitionLayer />
    <StickerLayer />
    <CaptionLayer />
    <AudioLayer />
  </AbsoluteFill>
);
