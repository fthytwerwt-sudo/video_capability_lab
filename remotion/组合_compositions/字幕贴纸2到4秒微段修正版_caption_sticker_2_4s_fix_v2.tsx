import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  FixV2Segment,
  FixV2StickerEvent,
  fixV2Bgm,
  fixV2CaptionEvents,
  fixV2Composition,
  fixV2Segments,
  fixV2StickerEvents,
} from "../数据_data/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2";

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

const SceneLayer: React.FC<{ segment: FixV2Segment; index: number }> = ({
  index,
  segment,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const isTexture = segment.role === "texture_absorb_fix";
  const opacityIn = segment.fromSec === 0 ? interpolate(local, [0, 5], [0, 1], clamp) : 1;
  const opacityOut =
    segment.fromSec + segment.durationSec >= fixV2Composition.durationSec
      ? interpolate(local, [duration - 10, duration], [1, 0], clamp)
      : 1;
  const scale = interpolate(local, [0, duration], [segment.scaleStart, segment.scaleEnd], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const y = interpolate(local, [0, duration], [segment.yStart, segment.yEnd], clamp);

  return (
    <Sequence durationInFrames={duration + 2} from={from} premountFor={fps}>
      <AbsoluteFill style={{ opacity: Math.min(opacityIn, opacityOut), zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(segment.src)}
          startFrom={toFrame(segment.sourceStartSec, fps)}
          style={{
            ...fullVideo,
            filter: isTexture
              ? "contrast(1.06) saturate(0.9) brightness(0.92)"
              : "contrast(1.06) saturate(0.96) brightness(0.96)",
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
  const contactDim = interpolate(frame, [8, 20, 45, 58], [0, 0.08, 0.05, 0], clamp);
  const cutWash = interpolate(frame, [54, 59, 65], [0, 0.14, 0], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(12,12,11,0.08) 0%, rgba(5,5,5,0.01) 42%, rgba(0,0,0,0.32) 100%)",
        boxShadow: "inset 0 0 150px rgba(0,0,0,0.30)",
        zIndex: 42,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 62% 52%, rgba(210, 202, 178, ${contactDim}) 0%, rgba(210,202,178,0) 22%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(102deg, transparent 0%, rgba(238,233,218,${
            cutWash * 0.74
          }) 51%, transparent 100%)`,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.016) 0px, rgba(255,255,255,0.016) 1px, transparent 1px, transparent 8px)",
          opacity: 0.14,
        }}
      />
    </AbsoluteFill>
  );
};

const PathStroke: React.FC<{
  d: string;
  draw: number;
  innerColor?: string;
  outerColor?: string;
  innerWidth: number;
  outerWidth: number;
}> = ({
  d,
  draw,
  innerColor = "rgba(226, 219, 199, 0.62)",
  outerColor = "rgba(43, 42, 39, 0.48)",
  innerWidth,
  outerWidth,
}) => (
  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path
      d={d}
      pathLength={1}
      stroke={outerColor}
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

const PinRubMark: React.FC<{ event: FixV2StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 4, 10], [0, 0.82, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(local, [0, 3, 17, 21], [0, 0.78, 0.66, 0], clamp);
  const compress = interpolate(local, [0, 5, 13], [0.96, 1.02, 0.99], clamp);
  const rubX = interpolate(local, [0, 7, 17], [-4, 3, 0], clamp);

  return (
    <svg
      height={138}
      viewBox="0 0 150 138"
      width={150}
      style={{
        left: event.x - 74,
        mixBlendMode: "soft-light",
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y - 78,
        transform: `translate(${rubX}px, 0) rotate(${event.rotateDeg}deg) scale(${
          event.scale * compress
        })`,
        transformOrigin: "78px 78px",
        zIndex: 80,
      }}
    >
      <PathStroke d="M42 74 C54 57 73 46 96 38" draw={draw} innerWidth={5} outerWidth={10} />
      <PathStroke
        d="M50 92 C66 76 86 64 108 54"
        draw={Math.max(0, Math.min(1, (draw - 0.14) / 0.86))}
        innerColor="rgba(229, 214, 177, 0.44)"
        innerWidth={4}
        outerWidth={9}
      />
      <PathStroke
        d="M74 108 C88 92 103 82 124 72"
        draw={Math.max(0, Math.min(1, (draw - 0.28) / 0.72))}
        innerColor="rgba(204, 198, 181, 0.34)"
        innerWidth={3}
        outerWidth={8}
      />
      <path
        d="M92 24 C122 46 139 78 146 112 L146 138 L92 138 C104 96 104 58 92 24Z"
        fill="rgba(103, 111, 104, 0.44)"
        opacity={interpolate(local, [2, 7, 16, 21], [0, 0.74, 0.54, 0], clamp)}
      />
    </svg>
  );
};

const BarCompressionScuff: React.FC<{ event: FixV2StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 9], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(local, [0, 4, 24, 29], [0, 0.48, 0.38, 0], clamp);
  const wipe = interpolate(local, [0, 19, 29], [-18, 2, 28], clamp);

  return (
    <svg
      height={88}
      viewBox="0 0 330 88"
      width={330}
      style={{
        left: event.x + wipe,
        mixBlendMode: "multiply",
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y,
        transform: `rotate(${event.rotateDeg}deg) scale(${event.scale})`,
        transformOrigin: "70px 20px",
        zIndex: 79,
      }}
    >
      <PathStroke
        d="M12 24 C52 16 93 19 132 16 C176 12 220 18 314 10"
        draw={draw}
        innerColor="rgba(220, 216, 202, 0.25)"
        outerColor="rgba(31, 32, 30, 0.38)"
        innerWidth={5}
        outerWidth={14}
      />
      <PathStroke
        d="M42 42 C86 36 134 38 190 32 C226 28 262 30 312 24"
        draw={Math.max(0, Math.min(1, (draw - 0.18) / 0.82))}
        innerColor="rgba(236, 222, 188, 0.20)"
        outerColor="rgba(42, 42, 38, 0.32)"
        innerWidth={3}
        outerWidth={10}
      />
      <rect fill="rgba(101, 108, 101, 0.38)" height="48" width="342" x="-8" y="34" />
    </svg>
  );
};

const TextureAbsorbSmear: React.FC<{ event: FixV2StickerEvent; local: number }> = ({
  event,
  local,
}) => {
  const draw = interpolate(local, [0, 5], [0, 1], clamp);
  const opacity = interpolate(local, [0, 2, 6, 9], [0, 0.32, 0.18, 0], clamp);
  const y = interpolate(local, [0, 9], [-8, 12], clamp);

  return (
    <svg
      height={120}
      viewBox="0 0 160 120"
      width={160}
      style={{
        left: event.x,
        mixBlendMode: "soft-light",
        opacity,
        overflow: "visible",
        position: "absolute",
        top: event.y + y,
        transform: `rotate(${event.rotateDeg}deg) scale(${event.scale})`,
        zIndex: 78,
      }}
    >
      <PathStroke
        d="M42 10 C54 32 58 58 56 98"
        draw={draw}
        innerColor="rgba(226, 222, 210, 0.34)"
        outerColor="rgba(38, 40, 39, 0.28)"
        innerWidth={3}
        outerWidth={8}
      />
      <PathStroke
        d="M82 2 C96 28 98 54 92 112"
        draw={Math.max(0, Math.min(1, (draw - 0.12) / 0.88))}
        innerColor="rgba(226, 222, 210, 0.22)"
        outerColor="rgba(38, 40, 39, 0.22)"
        innerWidth={2}
        outerWidth={7}
      />
    </svg>
  );
};

const StickerGraphic: React.FC<{ event: FixV2StickerEvent }> = ({ event }) => {
  const local = useCurrentFrame();
  if (!event.stickerNeeded) {
    return null;
  }
  if (event.stickerType === "pin_rub_mark") {
    return <PinRubMark event={event} local={local} />;
  }
  if (event.stickerType === "bar_compression_scuff") {
    return <BarCompressionScuff event={event} local={local} />;
  }
  return <TextureAbsorbSmear event={event} local={local} />;
};

const StickerLayer: React.FC = () => (
  <>
    {fixV2StickerEvents.map((event) => (
      <Sequence
        durationInFrames={toFrame(event.durationSec, fixV2Composition.fps)}
        from={toFrame(event.fromSec, fixV2Composition.fps)}
        key={event.stickerId}
        premountFor={8}
      >
        <StickerGraphic event={event} />
      </Sequence>
    ))}
  </>
);

const ContactSoundCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const event = fixV2CaptionEvents[0];
  const local = frame - toFrame(event.fromSec, fps);
  const duration = toFrame(event.durationSec, fps);
  const writeIn = interpolate(local, [0, event.entryFrames], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const exit = interpolate(local, [duration - event.exitFrames, duration], [1, 0], {
    ...clamp,
    easing: Easing.in(Easing.cubic),
  });
  const opacity = Math.min(writeIn, exit) * 0.88;
  const rub = interpolate(local, [0, 5, 15], [-12, 2, 0], clamp);

  return (
    <div
      style={{
        color: "rgba(236, 226, 198, 0.88)",
        fontFamily:
          '"Marker Felt", "Bradley Hand", "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: event.fontSize,
        fontWeight: 820,
        left: event.x,
        letterSpacing: 0,
        lineHeight: 1,
        opacity,
        position: "absolute",
        textShadow:
          "2px 3px 0 rgba(38, 37, 33, 0.58), 0 7px 12px rgba(0,0,0,0.28)",
        top: event.y,
        transform: `translate(${rub}px, ${interpolate(local, [0, 5], [8, 0], clamp)}px) rotate(${
          event.rotateDeg
        }deg) scale(${interpolate(local, [0, 5, 14], [0.88, 1.02, 0.98], clamp)})`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
        zIndex: 82,
      }}
    >
      {event.text}
    </div>
  );
};

const TextureCut: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [54, 58, 63], [0, 0.38, 0], clamp);
  const x = interpolate(frame, [53, 63], [-460, 1130], clamp);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(103deg, transparent 0%, transparent 44%, rgba(236,232,220,${opacity}) 50%, transparent 56%, transparent 100%)`,
        transform: `translateX(${x}px)`,
        zIndex: 76,
      }}
    />
  );
};

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  const bgmStart = toFrame(fixV2Bgm.sourceStartSec, fps);
  const bgmEnd = bgmStart + fixV2Composition.durationInFrames;
  return (
    <Audio
      endAt={bgmEnd}
      src={assetUrl(fixV2Bgm.path)}
      startFrom={bgmStart}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / fixV2Bgm.fadeInSec);
        const fadeOut = Math.min(
          1,
          Math.max(0, (fixV2Composition.durationSec - second) / fixV2Bgm.fadeOutSec)
        );
        return fixV2Bgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const CaptionStickerFixV2MicroProbe: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    {fixV2Segments.map((segment, index) => (
      <SceneLayer index={index} key={segment.segmentId} segment={segment} />
    ))}
    <Atmosphere />
    <TextureCut />
    <StickerLayer />
    <ContactSoundCaption />
    <AudioLayer />
  </AbsoluteFill>
);
