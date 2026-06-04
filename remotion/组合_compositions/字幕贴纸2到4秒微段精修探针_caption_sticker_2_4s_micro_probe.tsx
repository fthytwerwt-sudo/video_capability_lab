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
  MicroProbeSegment,
  MicroStickerEvent,
  microCaptionEvents,
  microProbeBgm,
  microProbeComposition,
  microProbeSegments,
  microStickerEvents,
} from "../数据_data/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe";

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

const SceneLayer: React.FC<{ segment: MicroProbeSegment; index: number }> = ({
  index,
  segment,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const opacityIn = segment.fromSec === 0 ? interpolate(local, [0, 5], [0, 1], clamp) : 1;
  const opacityOut =
    segment.fromSec + segment.durationSec >= microProbeComposition.durationSec
      ? interpolate(local, [duration - 10, duration], [1, 0], clamp)
      : 1;
  const opacity = Math.min(opacityIn, opacityOut);
  const scale = interpolate(local, [0, duration], [segment.scaleStart, segment.scaleEnd], clamp);
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);
  const isTextureExit = segment.role === "texture_exit_probe";

  return (
    <Sequence durationInFrames={duration + 2} from={from} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(segment.src)}
          startFrom={toFrame(segment.sourceStartSec, fps)}
          style={{
            ...fullVideo,
            filter: isTextureExit
              ? "contrast(1.08) saturate(0.96) brightness(0.94)"
              : "contrast(1.08) saturate(1.04) brightness(0.98)",
            objectPosition: segment.objectPosition,
            transform: `scale(${scale}) translateY(${y}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const Atmosphere: React.FC = () => {
  const frame = useCurrentFrame();
  const pressure = interpolate(frame, [7, 18, 44, 58], [0, 0.13, 0.08, 0], clamp);
  const exitWash = interpolate(frame, [54, 62, 80], [0, 0.16, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(13, 13, 11, 0.08) 0%, rgba(5, 5, 5, 0.02) 40%, rgba(0, 0, 0, 0.36) 100%)",
        boxShadow: "inset 0 0 160px rgba(0,0,0,0.34)",
        zIndex: 42,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 62% 54%, rgba(250, 211, 123, ${pressure}) 0%, rgba(250, 211, 123, 0) 26%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, transparent 0%, rgba(255,245,209, ${
            exitWash * 0.88
          }) 50%, transparent 100%)`,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 8px)",
          opacity: 0.16,
        }}
      />
    </AbsoluteFill>
  );
};

const RoughPath: React.FC<{
  d: string;
  draw: number;
  innerColor?: string;
  innerWidth: number;
  outerWidth: number;
}> = ({ d, draw, innerColor = "rgba(236, 184, 69, 0.95)", innerWidth, outerWidth }) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path
      d={d}
      pathLength={1}
      stroke="rgba(39, 34, 26, 0.72)"
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
      strokeWidth={outerWidth + 6}
      transform="translate(4 5)"
    />
    <path
      d={d}
      pathLength={1}
      stroke="rgba(255, 248, 222, 0.96)"
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

const PressureBurst: React.FC<{ event: MicroStickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 9], [0, 1], clamp);
  const opacity = interpolate(local, [0, 4, 27, 31], [0, 1, 0.86, 0], clamp);
  const press = interpolate(local, [0, 4, 13], [0.7, 1.05, 0.98], clamp);
  const jitter = Math.sin(local * 1.7) * interpolate(local, [0, 8, 28], [0, 2.5, 0.4], clamp);
  const paths = [
    "M68 95 C42 86 27 68 16 44",
    "M76 78 C70 53 77 29 96 10",
    "M97 101 C129 97 151 82 166 58",
    "M58 112 C39 127 30 143 26 164",
    "M86 118 C100 142 116 154 140 164",
  ];

  return (
    <svg
      height={190}
      viewBox="0 0 188 190"
      width={188}
      style={{
        filter: "drop-shadow(0 10px 10px rgba(15, 15, 13, 0.34))",
        left: event.x - 86,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 124,
        transform: `translate(${jitter}px, ${-jitter * 0.35}px) scale(${
          press * event.scale
        }) rotate(${event.rotateDeg}deg)`,
        transformOrigin: "92px 105px",
        zIndex: 80,
      }}
    >
      {paths.map((path, index) => {
        const offset = Math.max(0, Math.min(1, (draw - index * 0.1) / 0.82));
        const inner = index === 3 ? "rgba(238, 198, 92, 0.62)" : "rgba(235, 179, 58, 0.94)";
        return (
          <RoughPath
            d={path}
            draw={offset}
            innerColor={inner}
            innerWidth={index === 4 ? 5 : 7}
            key={path}
            outerWidth={index === 4 ? 12 : 16}
          />
        );
      })}
      <path
        d="M110 70 C140 78 165 105 180 146 L180 192 L118 192 C126 151 122 108 110 70Z"
        fill="rgba(9, 11, 10, 0.24)"
        opacity={interpolate(local, [3, 10, 27, 31], [0, 0.78, 0.52, 0], clamp)}
      />
    </svg>
  );
};

const CaptionTailTick: React.FC<{ event: MicroStickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 12], [0, 1], clamp);
  const opacity = interpolate(local, [0, 5, 32, 37], [0, 0.9, 0.78, 0], clamp);
  const sag = interpolate(local, [0, 16, 34], [12, 0, 4], clamp);

  return (
    <svg
      height={300}
      viewBox="0 0 420 300"
      width={420}
      style={{
        filter: "drop-shadow(0 8px 9px rgba(0,0,0,0.30))",
        left: event.x,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 258,
        transform: `translateY(${sag}px) rotate(${event.rotateDeg}deg) scale(${event.scale})`,
        transformOrigin: "30px 245px",
        zIndex: 79,
      }}
    >
      <RoughPath
        d="M22 248 C88 234 152 199 208 144 C252 101 284 86 326 78"
        draw={draw}
        innerColor="rgba(235, 184, 62, 0.76)"
        innerWidth={5}
        outerWidth={12}
      />
      <RoughPath
        d="M292 91 C316 83 333 75 354 56"
        draw={Math.max(0, Math.min(1, (draw - 0.18) / 0.82))}
        innerColor="rgba(235, 184, 62, 0.64)"
        innerWidth={4}
        outerWidth={10}
      />
    </svg>
  );
};

const ResidualDrag: React.FC<{ event: MicroStickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 8], [0, 1], clamp);
  const opacity = interpolate(local, [0, 2, 10, 14], [0, 0.52, 0.36, 0], clamp);
  const slide = interpolate(local, [0, 14], [-14, 22], clamp);

  return (
    <svg
      height={120}
      viewBox="0 0 250 120"
      width={250}
      style={{
        filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.28))",
        left: event.x + slide,
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `scale(${event.scale}) rotate(${event.rotateDeg}deg)`,
        zIndex: 78,
      }}
    >
      <RoughPath
        d="M18 42 C58 33 95 30 132 26 C164 22 189 18 226 8"
        draw={draw}
        innerColor="rgba(245, 224, 174, 0.40)"
        innerWidth={4}
        outerWidth={10}
      />
      <RoughPath
        d="M42 82 C84 75 121 62 164 53 C185 49 205 42 236 28"
        draw={Math.max(0, Math.min(1, (draw - 0.12) / 0.88))}
        innerColor="rgba(245, 224, 174, 0.34)"
        innerWidth={3}
        outerWidth={9}
      />
    </svg>
  );
};

const StickerGraphic: React.FC<{ event: MicroStickerEvent }> = ({ event }) => {
  const frame = useCurrentFrame();
  if (!event.stickerNeeded) {
    return null;
  }
  if (event.stickerType === "contact_pressure_burst") {
    return <PressureBurst event={event} local={frame} />;
  }
  if (event.stickerType === "residual_motion_drag") {
    return <ResidualDrag event={event} local={frame} />;
  }
  return <CaptionTailTick event={event} local={frame} />;
};

const StickerLayer: React.FC = () => (
  <>
    {microStickerEvents
      .filter((event) => event.stickerNeeded)
      .map((event) => (
        <Sequence
          durationInFrames={toFrame(event.durationSec, microProbeComposition.fps)}
          from={toFrame(event.fromSec, microProbeComposition.fps)}
          key={event.stickerId}
          premountFor={8}
        >
          <StickerGraphic event={event} />
        </Sequence>
      ))}
  </>
);

const ContactCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const event = microCaptionEvents[0];
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const opacity = interpolate(
    local,
    [0, event.entryFrames, Math.max(event.entryFrames + 1, duration - event.exitFrames), duration],
    [0, 1, 1, 0],
    clamp
  );
  const pop = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 13, mass: 0.42, stiffness: 170 },
  });
  const shove = interpolate(local, [0, 9, 34], [34, 0, -4], clamp);

  return (
    <div
      style={{
        color: "#fff0c4",
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: event.fontSize,
        fontWeight: 880,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1.02,
        maxWidth: event.maxWidth,
        opacity,
        position: "absolute",
        textShadow:
          "5px 6px 0 rgba(35, 30, 24, 0.74), -2px 3px 0 rgba(35, 30, 24, 0.62), 0 14px 28px rgba(0,0,0,0.46)",
        top: event.y,
        transform: `translate(${shove}px, ${interpolate(local, [0, 9], [18, 0], clamp)}px) rotate(${
          event.rotateDeg
        }deg) scale(${0.94 + pop * 0.06})`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
        zIndex: 83,
      }}
    >
      {event.text}
    </div>
  );
};

const TextureCut: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [54, 58, 62], [0, 0.55, 0], clamp);
  const x = interpolate(frame, [53, 63], [-480, 1140], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(103deg, transparent 0%, transparent 42%, rgba(255,246,218,${opacity}) 50%, transparent 58%, transparent 100%)`,
        transform: `translateX(${x}px)`,
        zIndex: 76,
      }}
    />
  );
};

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  const bgmStart = toFrame(microProbeBgm.sourceStartSec, fps);
  const bgmEnd = bgmStart + microProbeComposition.durationInFrames;
  return (
    <Audio
      endAt={bgmEnd}
      src={assetUrl(microProbeBgm.path)}
      startFrom={bgmStart}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / microProbeBgm.fadeInSec);
        const fadeOut = Math.min(
          1,
          Math.max(0, (microProbeComposition.durationSec - second) / microProbeBgm.fadeOutSec)
        );
        return microProbeBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const CaptionStickerMicroProbe2To4s: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    {microProbeSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.segmentId} segment={segment} />
    ))}
    <Atmosphere />
    <TextureCut />
    <StickerLayer />
    <ContactCaption />
    <AudioLayer />
  </AbsoluteFill>
);
