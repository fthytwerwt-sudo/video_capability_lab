import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  OffthreadVideo,
  Sequence,
  interpolate,
  registerRoot,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  FullVideoCaptionEvent,
  FullVideoSegment,
  FullVideoStickerEvent,
  FullVideoTransitionEvent,
  fullVideoCandidateBgm,
  fullVideoCandidateCaptions,
  fullVideoCandidateComposition,
  fullVideoCandidateSegments,
  fullVideoCandidateStickers,
  fullVideoCandidateTransitions,
} from "../数据_data/完整正片候选全流程重剪_full_video_candidate_complete_flow_recut";

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

const SceneLayer: React.FC<{ segment: FullVideoSegment; index: number }> = ({
  segment,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const opacity = interpolate(
    local,
    [0, 8, Math.max(9, duration - 8), duration],
    [0, 1, 1, 0],
    clamp
  );
  const scale = interpolate(
    local,
    [0, duration],
    [segment.scaleStart, segment.scaleEnd],
    clamp
  );
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);
  const isBreath =
    segment.role === "breath_object" || segment.role === "visual_reset";
  const isOutro = segment.role === "mood_outro";

  return (
    <Sequence from={from} durationInFrames={duration + 2} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(segment.src)}
          startFrom={toFrame(segment.sourceStartSec, fps)}
          style={{
            ...fullVideo,
            filter: `contrast(${isBreath ? 0.98 : 1.05}) saturate(${
              isOutro ? 0.84 : isBreath ? 0.92 : 1.02
            }) brightness(${isOutro ? 0.86 : 1})`,
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
  const pulse = interpolate(Math.sin(frame / 27), [-1, 1], [0.05, 0.13]);
  const outroShade = interpolate(frame, [372, 470, 540], [0, 0.18, 0.44], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(11, 14, 14, 0.16) 0%, rgba(11, 14, 14, 0.03) 43%, rgba(4, 5, 5, 0.48) 100%)",
        boxShadow: "inset 0 0 160px rgba(0,0,0,0.28)",
        zIndex: 34,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 42% 30%, rgba(252, 224, 155, ${pulse}) 0%, rgba(252, 224, 155, 0) 36%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(3, 5, 5, ${outroShade})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 6px)",
          opacity: 0.16,
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ event: FullVideoCaptionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, 7, duration - 6, duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(local, [0, 12], [18, 0], clamp);
  const isBreath = event.role === "breath";
  const isOutro = event.role === "outro";
  const color = isBreath ? "#1d2622" : "#fff3d6";

  return (
    <div
      style={{
        color,
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: isOutro ? 54 : isBreath ? 44 : 56,
        fontWeight: 800,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow: isBreath
          ? "0 8px 22px rgba(255,255,255,0.44)"
          : "0 10px 28px rgba(0,0,0,0.52)",
        top: event.y,
        transform: `translateY(${lift}px) rotate(${isOutro ? -1.4 : -0.4}deg)`,
        whiteSpace: "nowrap",
        zIndex: 72,
      }}
    >
      {event.text}
    </div>
  );
};

const CaptionLayer: React.FC = () => (
  <>
    {fullVideoCandidateCaptions.map((event) => (
      <Caption event={event} key={event.id} />
    ))}
  </>
);

const ContactSpark: React.FC<{
  event: FullVideoStickerEvent;
  local: number;
}> = ({ event, local }) => {
  const draw = interpolate(local, [0, 9], [0, 1], clamp);
  const opacity = interpolate(local, [0, 4, 15, 18], [0, 1, 0.9, 0], clamp);
  const pop = interpolate(local, [0, 5, 12], [0.62, 1.08, 0.96], clamp);
  const strokes = [
    "M42 88 C27 74 20 56 16 36",
    "M76 62 C76 39 86 22 101 10",
    "M103 89 C130 80 146 62 160 38",
    "M68 108 C48 119 35 132 25 150",
  ];

  return (
    <svg
      height={180}
      viewBox="0 0 180 180"
      width={180}
      style={{
        filter: "drop-shadow(0 8px 8px rgba(23, 24, 16, 0.28))",
        left: event.x - 78,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 128,
        transform: `scale(${pop * event.scale}) rotate(${event.rotate}deg)`,
        transformOrigin: "85px 102px",
        zIndex: 76,
      }}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((d, index) => {
          const offset = Math.max(0, Math.min(1, (draw - index * 0.13) / 0.87));
          return (
            <g key={d}>
              <path
                d={d}
                pathLength={1}
                stroke="rgba(255, 252, 226, 0.96)"
                strokeDasharray={1}
                strokeDashoffset={1 - offset}
                strokeWidth={18}
              />
              <path
                d={d}
                pathLength={1}
                stroke="rgba(245, 194, 83, 0.95)"
                strokeDasharray={1}
                strokeDashoffset={1 - offset}
                strokeWidth={8}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const ShortStrokeCluster: React.FC<{
  event: FullVideoStickerEvent;
  local: number;
}> = ({ event, local }) => {
  const opacity = interpolate(local, [0, 5, 14, 17], [0, 1, 0.92, 0], clamp);
  const draw = interpolate(local, [0, 11], [0, 1], clamp);
  const paths = [
    "M16 34 C38 22 55 16 76 12",
    "M24 74 C52 66 70 55 91 38",
    "M47 111 C74 102 92 91 111 74",
  ];

  return (
    <svg
      height={144}
      viewBox="0 0 132 144"
      width={132}
      style={{
        filter: "drop-shadow(0 7px 7px rgba(22, 22, 18, 0.25))",
        left: event.x - 54,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 82,
        transform: `scale(${event.scale}) rotate(${event.rotate}deg)`,
        zIndex: 76,
      }}
    >
      {paths.map((d, index) => {
        const offset = Math.max(0, Math.min(1, (draw - index * 0.18) / 0.82));
        return (
          <g key={d} fill="none" strokeLinecap="round">
            <path
              d={d}
              pathLength={1}
              stroke="rgba(255, 252, 226, 0.95)"
              strokeDasharray={1}
              strokeDashoffset={1 - offset}
              strokeWidth={18 - index * 2}
            />
            <path
              d={d}
              pathLength={1}
              stroke="rgba(233, 186, 82, 0.95)"
              strokeDasharray={1}
              strokeDashoffset={1 - offset}
              strokeWidth={8 - index}
            />
          </g>
        );
      })}
    </svg>
  );
};

const BreathEdgeLine: React.FC<{
  event: FullVideoStickerEvent;
  local: number;
}> = ({ event, local }) => {
  const draw = interpolate(local, [0, 18], [0, 1], clamp);
  const opacity = interpolate(local, [0, 10, 20, 23], [0, 0.78, 0.66, 0], clamp);

  return (
    <svg
      height={96}
      viewBox="0 0 280 96"
      width={280}
      style={{
        filter: "drop-shadow(0 5px 8px rgba(0,0,0,0.18))",
        left: event.x,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotate}deg)`,
        zIndex: 76,
      }}
    >
      <path
        d="M10 58 C45 38 78 62 114 44 C151 25 184 52 220 35 C241 25 258 28 272 35"
        fill="none"
        pathLength={1}
        stroke="rgba(255, 251, 224, 0.98)"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
        strokeLinecap="round"
        strokeWidth={12}
      />
      <path
        d="M10 58 C45 38 78 62 114 44 C151 25 184 52 220 35 C241 25 258 28 272 35"
        fill="none"
        pathLength={1}
        stroke="rgba(235, 186, 76, 0.76)"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
        strokeLinecap="round"
        strokeWidth={5}
      />
      <path
        d="M18 70 C53 52 82 74 116 58 C149 42 178 64 210 50"
        fill="none"
        opacity={0.48}
        pathLength={1}
        stroke="rgba(42, 38, 28, 0.62)"
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
        strokeLinecap="round"
        strokeWidth={5}
      />
    </svg>
  );
};

const Sticker: React.FC<{ event: FullVideoStickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const local = frame;

  if (event.shapeGrammar === "contact_spark") {
    return <ContactSpark event={event} local={local} />;
  }

  if (event.shapeGrammar === "short_stroke_cluster") {
    return <ShortStrokeCluster event={event} local={local} />;
  }

  return <BreathEdgeLine event={event} local={local} />;
};

const StickerLayer: React.FC = () => (
  <>
    {fullVideoCandidateStickers.map((event) => (
      <Sequence
        durationInFrames={toFrame(event.durationSec, fullVideoCandidateComposition.fps)}
        from={toFrame(event.fromSec, fullVideoCandidateComposition.fps)}
        key={event.id}
      >
        <Sticker event={event} />
      </Sequence>
    ))}
  </>
);

const TransitionMark: React.FC<{ event: FullVideoTransitionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame;
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(local, [0, Math.max(1, duration / 2), duration], [0, 0.42, 0], clamp);
  const sweep = interpolate(local, [0, duration], [-420, 1180], clamp);
  const isDip = event.transitionType === "breath_dip";
  const isFlash = event.transitionType === "texture_flash";

  return (
    <AbsoluteFill
      style={{
        background: isDip
          ? `rgba(250, 238, 198, ${opacity * 0.55})`
          : `linear-gradient(105deg, transparent 0%, transparent 41%, rgba(255,247,216,${
              isFlash ? opacity * 0.9 : opacity
            }) 50%, transparent 59%, transparent 100%)`,
        opacity: isDip ? 1 : 0.9,
        transform: isDip ? undefined : `translateX(${sweep}px)`,
        zIndex: 62,
      }}
    />
  );
};

const TransitionLayer: React.FC = () => (
  <>
    {fullVideoCandidateTransitions.map((event) => (
      <Sequence
        durationInFrames={toFrame(event.durationSec, fullVideoCandidateComposition.fps)}
        from={toFrame(event.fromSec, fullVideoCandidateComposition.fps)}
        key={event.id}
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
      endAt={toFrame(fullVideoCandidateComposition.durationSec, fps)}
      src={assetUrl(fullVideoCandidateBgm.path)}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / fullVideoCandidateBgm.fadeInSec);
        const fadeOut = Math.min(
          1,
          Math.max(
            0,
            (fullVideoCandidateComposition.durationSec - second) /
              fullVideoCandidateBgm.fadeOutDurationSec
          )
        );
        return fullVideoCandidateBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const FullVideoCandidateCompleteFlowRecut: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050605" }}>
      {fullVideoCandidateSegments.map((segment, index) => (
        <SceneLayer index={index} key={segment.id} segment={segment} />
      ))}
      <AtmosphereLayer />
      <TransitionLayer />
      <StickerLayer />
      <CaptionLayer />
      <AudioLayer />
    </AbsoluteFill>
  );
};

const RemotionRoot: React.FC = () => (
  <Composition
    component={FullVideoCandidateCompleteFlowRecut}
    durationInFrames={fullVideoCandidateComposition.durationInFrames}
    fps={fullVideoCandidateComposition.fps}
    height={fullVideoCandidateComposition.height}
    id={fullVideoCandidateComposition.id}
    width={fullVideoCandidateComposition.width}
  />
);

registerRoot(RemotionRoot);
