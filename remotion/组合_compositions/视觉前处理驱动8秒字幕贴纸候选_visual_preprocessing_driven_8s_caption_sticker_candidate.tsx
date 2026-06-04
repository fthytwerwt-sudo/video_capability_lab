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
  AnchorSummary,
  CaptionEvent,
  SelectedSegment,
  StickerEvent,
  anchorMapSummary,
  captionEvents,
  maskPlanSummary,
  motionTrackSummary,
  selectedSegments,
  stickerEvents,
  visualPreprocessing8sBgm,
  visualPreprocessing8sComposition,
  visualScorecardSummary,
} from "../数据_data/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate";

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

const anchorById = (anchorId: string) =>
  anchorMapSummary.find((anchor) => anchor.anchor_id === anchorId) ?? anchorMapSummary[0];

const gradeFilter = (grade: SelectedSegment["grade"]) => {
  if (grade === "texture") {
    return "contrast(1.08) saturate(0.9) brightness(0.95)";
  }
  if (grade === "machine") {
    return "contrast(1.08) saturate(0.96) brightness(0.94)";
  }
  if (grade === "close") {
    return "contrast(1.05) saturate(0.92) brightness(0.9)";
  }
  return "contrast(1.05) saturate(1.02) brightness(0.98)";
};

const SceneLayer: React.FC<{ segment: SelectedSegment; index: number }> = ({
  segment,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.time_range.start_sec, fps);
  const duration = toFrame(segment.time_range.end_sec - segment.time_range.start_sec, fps);
  const local = frame - from;
  const opacity = interpolate(local, [0, 5, Math.max(6, duration - 5), duration], [0, 1, 1, 0], clamp);
  const scale = interpolate(local, [0, duration], [segment.scale_start, segment.scale_end], clamp);
  const y = interpolate(local, [0, duration], [segment.y_start, segment.y_end], clamp);

  return (
    <Sequence durationInFrames={duration + 2} from={from} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(segment.source_path)}
          startFrom={toFrame(segment.source_start_sec, fps)}
          style={{
            filter: gradeFilter(segment.grade),
            height: "100%",
            objectFit: "cover",
            objectPosition: segment.object_position,
            transform: `scale(${scale}) translateY(${y}px)`,
            width: "100%",
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const AtmosphereLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const machineWash = interpolate(frame, [120, 160, 210, 240], [0, 0.14, 0.16, 0.04], clamp);
  const edgeFocus = interpolate(frame, [92, 118, 176, 210], [0, 0.12, 0.18, 0], clamp);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 42 }}>
      <Solid
        color="rgba(20, 22, 18, 0.18)"
        effects={[
          noise({ amount: 0.08, seed: 63 }),
          vignette({ amount: 0.38, radius: 0.62, feather: 0.28 }),
          blur({ radius: 0.8 }),
          dropShadow({ color: "#000000", opacity: 0.16, radius: 8, offsetX: 0, offsetY: 8 }),
        ]}
        height={visualPreprocessing8sComposition.height}
        style={{ mixBlendMode: "soft-light", position: "absolute" }}
        width={visualPreprocessing8sComposition.width}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(110deg, transparent 0%, rgba(244, 220, 155, ${edgeFocus}) 46%, transparent 64%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(9, 12, 12, ${machineWash})`,
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ event: CaptionEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const anchor = anchorById(event.anchor_from);
  const start = toFrame(event.time_range.start_sec, fps);
  const end = toFrame(event.time_range.end_sec, fps);
  const local = frame - start;
  const duration = end - start;
  const opacity = interpolate(local, [0, 5, Math.max(6, duration - 7), duration], [0, 1, 0.92, 0], clamp);
  const shove = interpolate(local, [0, 8, duration], [22, 0, -4], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const isReaction = event.caption_type === "reaction_word";
  const isMotionPhrase = event.caption_type === "motion_phrase";
  const zone = anchor.safe_caption_zone;
  const x = isReaction ? anchor.contact_points[0].x - 620 : isMotionPhrase ? 618 : zone.x;
  const y = isReaction ? anchor.contact_points[0].y + 96 : isMotionPhrase ? 520 : zone.y;
  const fontSize = isReaction ? 76 : event.attention_weight === "medium" ? 62 : 44;

  return (
    <div
      style={{
        color: isMotionPhrase ? "rgba(255, 243, 205, 0.86)" : "#fff1c8",
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize,
        fontWeight: isReaction ? 880 : 760,
        left: x,
        letterSpacing: 0,
        lineHeight: 1,
        maxWidth: 450,
        opacity,
        position: "absolute",
        textShadow:
          "4px 5px 0 rgba(32, 29, 22, 0.64), 0 14px 28px rgba(0,0,0,0.40)",
        top: y,
        transform: `translateX(${shove}px) rotate(${isReaction ? -5 : -2}deg)`,
        whiteSpace: "nowrap",
        zIndex: 88,
      }}
    >
      {event.text}
    </div>
  );
};

const CaptionLayer: React.FC = () => (
  <>
    {captionEvents.map((event) => (
      <Caption event={event} key={event.caption_id} />
    ))}
  </>
);

const PathStroke: React.FC<{
  d: string;
  draw: number;
  innerColor?: string;
  innerWidth?: number;
  outerWidth?: number;
}> = ({
  d,
  draw,
  innerColor = "rgba(238, 190, 76, 0.96)",
  innerWidth = 7,
  outerWidth = 17,
}) => {
  const evolved = evolvePath(draw, d);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d={d}
        pathLength={1}
        stroke="rgba(255, 250, 226, 0.94)"
        strokeDasharray={evolved.strokeDasharray}
        strokeDashoffset={evolved.strokeDashoffset}
        strokeWidth={outerWidth}
      />
      <path
        d={d}
        pathLength={1}
        stroke={innerColor}
        strokeDasharray={evolved.strokeDasharray}
        strokeDashoffset={evolved.strokeDashoffset}
        strokeWidth={innerWidth}
      />
    </g>
  );
};

const SimulatedOcclusionPatch: React.FC<{ anchor: AnchorSummary; opacity: number }> = ({
  anchor,
  opacity,
}) => (
  <div
    style={{
      background: "rgba(18, 21, 18, 0.46)",
      borderRadius: 10,
      height: Math.max(80, anchor.subject_bbox.height * 0.22),
      left: anchor.subject_bbox.x + anchor.subject_bbox.width * 0.54,
      mixBlendMode: "multiply",
      opacity,
      position: "absolute",
      top: anchor.subject_bbox.y + anchor.subject_bbox.height * 0.47,
      transform: "rotate(-5deg)",
      width: Math.max(100, anchor.subject_bbox.width * 0.2),
      zIndex: 82,
    }}
  />
);

const EdgeScuffSticker: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const anchor = anchorById(event.anchor_from);
  const draw = interpolate(local, [0, 14], [0, 1], clamp);
  const opacity = interpolate(local, [0, 6, 15, 20], [0, 0.82, 0.74, 0], clamp);
  const length = getLength(anchor.edge_path);
  const point = getPointAtLength(anchor.edge_path, length * Math.min(0.9, 0.18 + draw * 0.55));

  return (
    <Trail lagInFrames={2} layers={5} trailOpacity={0.22}>
      <svg
        height={1920}
        style={{ left: 0, opacity, overflow: "visible", position: "absolute", top: 0, zIndex: 78 }}
        viewBox="0 0 1080 1920"
        width={1080}
      >
        <PathStroke d={anchor.edge_path} draw={draw} innerWidth={7} outerWidth={16} />
        <circle cx={point.x} cy={point.y} fill="rgba(246, 204, 91, 0.9)" r={10 + draw * 8} />
      </svg>
    </Trail>
  );
};

const ContactRubSticker: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const anchor = anchorById(event.anchor_from);
  const draw = interpolate(local, [0, 12], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(local, [0, 5, 20, 25], [0, 0.9, 0.82, 0], clamp);
  const rubPath = "M644 1038 C682 1014 708 1042 740 1088 C766 1132 802 1148 846 1142";
  const activePath = interpolatePath(Math.min(1, draw), anchor.edge_path, rubPath);
  const length = getLength(activePath);
  const point = getPointAtLength(activePath, length * Math.min(0.95, draw));
  const patchOpacity = maskPlanSummary.simulated_occlusion_only ? opacity * 0.42 : 0;

  return (
    <>
      <Trail lagInFrames={2} layers={7} trailOpacity={0.28}>
        <svg
          height={1920}
          style={{ left: 0, opacity, overflow: "visible", position: "absolute", top: 0, zIndex: 80 }}
          viewBox="0 0 1080 1920"
          width={1080}
        >
          <PathStroke d={activePath} draw={draw} innerColor="rgba(245, 205, 96, 0.95)" innerWidth={9} outerWidth={20} />
          <circle
            cx={point.x}
            cy={point.y}
            fill="rgba(255, 239, 176, 0.9)"
            r={16 + draw * 7}
            stroke="rgba(33,31,24,0.36)"
            strokeWidth={8}
          />
        </svg>
      </Trail>
      <SimulatedOcclusionPatch anchor={anchor} opacity={patchOpacity} />
    </>
  );
};

const MotionTrailSticker: React.FC<{ event: StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const anchor = anchorById(event.anchor_from);
  const draw = interpolate(local, [0, 20], [0, 1], clamp);
  const opacity = interpolate(local, [0, 8, 26, 34], [0, 0.78, 0.68, 0], clamp);
  const length = getLength(anchor.edge_path);
  const shift = interpolate(draw, [0, 1], [0, motionTrackSummary.velocity.x * 0.1], clamp);

  return (
    <Trail lagInFrames={3} layers={6} trailOpacity={0.2}>
      <svg
        height={1920}
        style={{ left: 0, opacity, overflow: "visible", position: "absolute", top: 0, zIndex: 79 }}
        viewBox="0 0 1080 1920"
        width={1080}
      >
        {[0.2, 0.42, 0.64].map((ratio, index) => {
          const point = getPointAtLength(anchor.edge_path, length * ratio);
          const localDraw = Math.max(0, Math.min(1, (draw - index * 0.16) / 0.84));
          const path = `M${point.x - 30 + shift} ${point.y - 20 + index * 26} C${point.x + 20 + shift} ${point.y - 34 + index * 16} ${point.x + 72 + shift} ${point.y - 16 + index * 10} ${point.x + 128 + shift} ${point.y - 36 + index * 20}`;
          return (
            <PathStroke
              d={path}
              draw={localDraw}
              innerColor="rgba(242, 206, 105, 0.78)"
              innerWidth={5}
              key={ratio}
              outerWidth={13}
            />
          );
        })}
      </svg>
    </Trail>
  );
};

const Sticker: React.FC<{ event: StickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - toFrame(event.time_range.start_sec, fps);
  if (event.sticker_type === "edge_scuff") {
    return <EdgeScuffSticker event={event} local={local} />;
  }
  if (event.sticker_type === "contact_rub") {
    return <ContactRubSticker event={event} local={local} />;
  }
  return <MotionTrailSticker event={event} local={local} />;
};

const StickerLayer: React.FC = () => (
  <>
    {stickerEvents.map((event) => (
      <Sequence
        durationInFrames={toFrame(event.time_range.end_sec - event.time_range.start_sec, visualPreprocessing8sComposition.fps)}
        from={toFrame(event.time_range.start_sec, visualPreprocessing8sComposition.fps)}
        key={event.sticker_id}
        premountFor={10}
      >
        <Sticker event={event} />
      </Sequence>
    ))}
  </>
);

const ScoreBadge: React.FC = () => (
  <div
    style={{
      bottom: 96,
      color: "rgba(246, 238, 212, 0.72)",
      fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
      fontSize: 24,
      left: 72,
      letterSpacing: 0,
      lineHeight: 1.32,
      position: "absolute",
      textShadow: "0 8px 20px rgba(0,0,0,0.36)",
      width: 860,
      zIndex: 92,
    }}
  >
    anchor {visualScorecardSummary.anchor_attachment_score}/3 · motion{" "}
    {visualScorecardSummary.motion_event_score}/3 · simulated mask · review pending
  </div>
);

const TransitionLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const sweepA = interpolate(frame, [33, 42], [-760, 1180], clamp);
  const sweepB = interpolate(frame, [144, 154], [-860, 1160], clamp);
  const opacityA = interpolate(frame, [31, 38, 45], [0, 0.42, 0], clamp);
  const opacityB = interpolate(frame, [142, 149, 157], [0, 0.36, 0], clamp);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 74 }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, transparent 0%, transparent 42%, rgba(255,247,216,${opacityA}) 50%, transparent 58%, transparent 100%)`,
          transform: `translateX(${sweepA}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, transparent 0%, transparent 42%, rgba(255,247,216,${opacityB}) 50%, transparent 58%, transparent 100%)`,
          transform: `translateX(${sweepB}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  const bgmStart = toFrame(visualPreprocessing8sBgm.source_start_sec, fps);
  return (
    <Audio
      endAt={bgmStart + visualPreprocessing8sComposition.durationInFrames}
      src={assetUrl(visualPreprocessing8sBgm.path)}
      startFrom={bgmStart}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / visualPreprocessing8sBgm.fade_in_sec);
        const fadeOut = Math.min(
          1,
          Math.max(0, (visualPreprocessing8sComposition.durationSec - second) / visualPreprocessing8sBgm.fade_out_sec)
        );
        return visualPreprocessing8sBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const VisualPreprocessingDriven8sCaptionStickerCandidate: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    {selectedSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.segment_id} segment={segment} />
    ))}
    <AtmosphereLayer />
    <TransitionLayer />
    <StickerLayer />
    <CaptionLayer />
    <ScoreBadge />
    <AudioLayer />
  </AbsoluteFill>
);
