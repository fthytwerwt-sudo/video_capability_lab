import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  RoutedSegment,
  TransitionEvent,
  transitionEvents,
} from "../数据_data/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate";
import {
  ExternalImageAssetPlacement,
  NormalCaptionLayer,
  aliImageAsset18sBgm,
  aliImageAsset18sComposition,
  aliImageAsset18sSourceSegments,
  externalImageAssetPlacements,
  normalCaptionLayers,
} from "../数据_data/阿里图像资产18秒正片候选_ali_image_asset_18s_full_video_candidate";

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
  index,
  segment,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(segment.fromSec, fps);
  const duration = toFrame(segment.durationSec, fps);
  const local = frame - from;
  const isFirst = segment.fromSec === 0;
  const isLast = segment.fromSec + segment.durationSec >= aliImageAsset18sComposition.durationSec;
  const introOpacity = isFirst ? interpolate(local, [0, 6], [0, 1], clamp) : 1;
  const outroOpacity = isLast
    ? interpolate(local, [Math.max(0, duration - 16), duration], [1, 0], clamp)
    : 1;
  const opacity = Math.min(introOpacity, outroOpacity);
  const scale = interpolate(local, [0, duration], [segment.scaleStart, segment.scaleEnd], clamp);
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
        durationInFrames={toFrame(event.durationSec, aliImageAsset18sComposition.fps)}
        from={toFrame(event.fromSec, aliImageAsset18sComposition.fps)}
        key={event.transitionId}
      >
        <TransitionMark event={event} />
      </Sequence>
    ))}
  </>
);

const entryCurve = (local: number, duration: number, asset: ExternalImageAssetPlacement) => {
  const opacity = interpolate(
    local,
    [0, 5, Math.max(6, duration - 7), duration],
    [0, 1, 1, 0],
    clamp
  );
  const pop = spring({
    frame: Math.max(0, local),
    fps: aliImageAsset18sComposition.fps,
    config: { damping: 15, mass: 0.42, stiffness: 170 },
  });

  if (asset.enter_animation === "slide") {
    return {
      opacity,
      scale: interpolate(local, [0, 9], [0.9, 1], clamp),
      x: interpolate(local, [0, 9], [84, 0], clamp),
      y: 0,
      rotate: interpolate(local, [0, 9], [asset.rotate_deg + 5, asset.rotate_deg], clamp),
    };
  }

  if (asset.enter_animation === "bounce") {
    return {
      opacity,
      scale: interpolate(local, [0, 5, 11], [0.7, 1.08, 1], clamp),
      x: 0,
      y: interpolate(local, [0, 7, 12], [-42, 8, 0], clamp),
      rotate: interpolate(local, [0, 9], [asset.rotate_deg - 8, asset.rotate_deg], clamp),
    };
  }

  if (asset.enter_animation === "scribble") {
    const wiggle = Math.sin(local * 0.72) * interpolate(local, [0, 13], [5, 0.6], clamp);
    return {
      opacity,
      scale: interpolate(local, [0, 10], [0.82, 1], clamp),
      x: interpolate(local, [0, 10], [-38, 0], clamp),
      y: interpolate(local, [0, 10], [20, 0], clamp),
      rotate: asset.rotate_deg + wiggle,
    };
  }

  return {
    opacity,
    scale: 0.92 + pop * 0.08,
    x: 0,
    y: interpolate(local, [0, 8], [22, 0], clamp),
    rotate: asset.rotate_deg,
  };
};

const exitCurve = (local: number, duration: number, asset: ExternalImageAssetPlacement) => {
  const exitStart = Math.max(4, duration - 8);
  if (asset.exit_animation === "slide_out") {
    return {
      scale: 1,
      x: interpolate(local, [exitStart, duration], [0, 82], clamp),
      y: 0,
    };
  }
  if (asset.exit_animation === "pop_out") {
    return {
      scale: interpolate(local, [exitStart, duration], [1, 0.72], clamp),
      x: 0,
      y: interpolate(local, [exitStart, duration], [0, -16], clamp),
    };
  }
  return { scale: 1, x: 0, y: 0 };
};

const ApiAssetOverlay: React.FC<{ asset: ExternalImageAssetPlacement }> = ({ asset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = Math.max(1, toFrame(asset.time_range.end_sec - asset.time_range.start_sec, fps));
  const entry = entryCurve(frame, duration, asset);
  const exit = exitCurve(frame, duration, asset);
  const scale = entry.scale * exit.scale;

  return (
    <Img
      src={assetUrl(asset.alpha_path)}
      style={{
        filter: "drop-shadow(0 16px 20px rgba(0,0,0,0.30))",
        left: asset.x,
        maxWidth: asset.max_width,
        opacity: entry.opacity,
        position: "absolute",
        top: asset.y,
        transform: `translate(calc(-50% + ${entry.x + exit.x}px), calc(-50% + ${
          entry.y + exit.y
        }px)) scale(${scale}) rotate(${entry.rotate}deg)`,
        transformOrigin: "center center",
        width: asset.max_width,
        zIndex: asset.z_index,
      }}
    />
  );
};

const ApiAssetLayer: React.FC = () => (
  <>
    {externalImageAssetPlacements.map((asset) => (
      <Sequence
        durationInFrames={toFrame(
          asset.time_range.end_sec - asset.time_range.start_sec,
          aliImageAsset18sComposition.fps
        )}
        from={toFrame(asset.time_range.start_sec, aliImageAsset18sComposition.fps)}
        key={asset.asset_need_id}
        premountFor={8}
      >
        <ApiAssetOverlay asset={asset} />
      </Sequence>
    ))}
  </>
);

const NormalCaption: React.FC<{ caption: NormalCaptionLayer }> = ({ caption }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = Math.max(
    1,
    toFrame(caption.time_range.end_sec - caption.time_range.start_sec, fps)
  );
  const opacity = interpolate(frame, [0, 6, Math.max(7, duration - 7), duration], [0, 1, 1, 0], clamp);
  const lift = interpolate(frame, [0, 9], [18, 0], clamp);
  const isLow = caption.attention_weight === "low";

  return (
    <div
      style={{
        color: isLow ? "rgba(255, 246, 214, 0.84)" : "#fff1c9",
        fontFamily:
          '"PingFang SC", "Helvetica Neue", "Marker Felt", "Bradley Hand", Arial, sans-serif',
        fontSize: caption.font_size,
        fontWeight: isLow ? 650 : 780,
        left: caption.position.x,
        letterSpacing: 0,
        lineHeight: 1.08,
        maxWidth: caption.position.max_width,
        opacity,
        position: "absolute",
        textShadow: isLow
          ? "0 7px 18px rgba(0,0,0,0.34)"
          : "0 3px 0 rgba(28,25,19,0.68), 0 10px 24px rgba(0,0,0,0.42)",
        top: caption.position.y,
        transform: `translateY(${lift}px) rotate(${caption.position.rotate_deg}deg)`,
        transformOrigin: "left center",
        whiteSpace: "nowrap",
        zIndex: 84,
      }}
    >
      {caption.text}
    </div>
  );
};

const NormalCaptionLayerView: React.FC = () => (
  <>
    {normalCaptionLayers.map((caption) => (
      <Sequence
        durationInFrames={toFrame(
          caption.time_range.end_sec - caption.time_range.start_sec,
          aliImageAsset18sComposition.fps
        )}
        from={toFrame(caption.time_range.start_sec, aliImageAsset18sComposition.fps)}
        key={caption.caption_id}
        premountFor={8}
      >
        <NormalCaption caption={caption} />
      </Sequence>
    ))}
  </>
);

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      endAt={toFrame(aliImageAsset18sComposition.durationSec, fps)}
      src={assetUrl(aliImageAsset18sBgm.path)}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / aliImageAsset18sBgm.fadeInSec);
        const fadeOut = Math.min(
          1,
          Math.max(
            0,
            (aliImageAsset18sComposition.durationSec - second) /
              aliImageAsset18sBgm.fadeOutDurationSec
          )
        );
        return aliImageAsset18sBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const AliImageAsset18sFullVideoCandidate: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#050605", overflow: "hidden" }}>
    {aliImageAsset18sSourceSegments.map((segment, index) => (
      <SceneLayer index={index} key={segment.segmentId} segment={segment} />
    ))}
    <AtmosphereLayer />
    <TransitionLayer />
    <ApiAssetLayer />
    <NormalCaptionLayerView />
    <AudioLayer />
  </AbsoluteFill>
);
