import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ExternalImageAssetPipelinePlacement,
  externalImageAssetPipelineComposition,
  externalImageAssetPipelinePlacements,
  externalImageAssetPipelineSummary,
} from "../数据_data/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate";

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

const enterCurve = (
  local: number,
  duration: number,
  placement: ExternalImageAssetPipelinePlacement
) => {
  const baseOpacity = interpolate(
    local,
    [0, 5, Math.max(6, duration - 6), duration],
    [0, 1, 1, 0],
    clamp
  );
  const ease = {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  };

  if (placement.enter_animation === "slide") {
    return {
      opacity: baseOpacity,
      scale: interpolate(local, [0, 9], [0.94, 1], ease),
      x: interpolate(local, [0, 9], [placement.anchor === "left_mid" ? -88 : 88, 0], ease),
      y: 0,
      rotate: interpolate(local, [0, 9], [placement.anchor === "left_mid" ? -5 : 5, 0], ease),
    };
  }

  if (placement.enter_animation === "bounce") {
    return {
      opacity: baseOpacity,
      scale: interpolate(local, [0, 6, 12], [0.74, 1.14, 1], ease),
      x: 0,
      y: interpolate(local, [0, 8, 12], [-46, 10, 0], ease),
      rotate: interpolate(local, [0, 8, 12], [-8, 5, 0], ease),
    };
  }

  if (placement.enter_animation === "scribble") {
    const wiggle = Math.sin(local * 0.78) * interpolate(local, [0, 12], [5, 1], clamp);
    return {
      opacity: baseOpacity,
      scale: interpolate(local, [0, 8], [0.8, 1], ease),
      x: interpolate(local, [0, 10], [-46, 0], ease),
      y: interpolate(local, [0, 10], [22, 0], ease),
      rotate: wiggle,
    };
  }

  return {
    opacity: baseOpacity,
    scale: interpolate(local, [0, 5, 10], [0.72, 1.12, 1], ease),
    x: 0,
    y: 0,
    rotate: interpolate(local, [0, 10], [-6, 0], ease),
  };
};

const exitCurve = (
  local: number,
  duration: number,
  placement: ExternalImageAssetPipelinePlacement
) => {
  const exitStart = Math.max(4, duration - 8);
  if (placement.exit_animation === "slide_out") {
    return {
      scale: 1,
      x: interpolate(local, [exitStart, duration], [0, 86], clamp),
      y: 0,
    };
  }
  if (placement.exit_animation === "pop_out") {
    return {
      scale: interpolate(local, [exitStart, duration], [1, 0.74], clamp),
      x: 0,
      y: interpolate(local, [exitStart, duration], [0, -14], clamp),
    };
  }
  return { scale: 1, x: 0, y: 0 };
};

const MachineLabel: React.FC<{ placement: ExternalImageAssetPipelinePlacement; opacity: number }> = ({
  opacity,
  placement,
}) => {
  const fallback = placement.asset_source_status === "provider_arrearage_fallback_existing_ali_asset";
  return (
    <div
      style={{
        background: fallback ? "rgba(80, 32, 24, 0.52)" : "rgba(18, 26, 28, 0.46)",
        border: fallback ? "1px solid rgba(255, 206, 166, 0.52)" : "1px solid rgba(202, 238, 220, 0.40)",
        borderRadius: 6,
        color: fallback ? "rgba(255, 225, 190, 0.88)" : "rgba(224, 246, 228, 0.86)",
        fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: 21,
        fontWeight: 620,
        left: 52,
        letterSpacing: 0,
        lineHeight: 1.24,
        maxWidth: 740,
        opacity: opacity * 0.88,
        padding: "8px 12px",
        position: "absolute",
        top: 52,
        zIndex: 96,
      }}
    >
      {placement.asset_need_id} · {placement.machine_review_label}
    </div>
  );
};

const AssetOverlay: React.FC<{ placement: ExternalImageAssetPipelinePlacement }> = ({ placement }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const startFrame = toFrame(placement.time_range.start_sec, fps);
  const endFrame = toFrame(placement.time_range.end_sec, fps);
  const local = frame - startFrame;
  const duration = Math.max(1, endFrame - startFrame);
  const enter = enterCurve(local, duration, placement);
  const exit = exitCurve(local, duration, placement);
  const opacity = enter.opacity;
  const scale = enter.scale * exit.scale;
  const x = enter.x + exit.x;
  const y = enter.y + exit.y;
  const rotate = enter.rotate + (placement.supplemental_existing_ali_asset ? 2 : 0);

  return (
    <>
      <Img
        src={assetUrl(placement.alpha_path)}
        style={{
          filter: "drop-shadow(0 16px 22px rgba(0,0,0,0.34))",
          left: placement.x,
          maxWidth: placement.max_width,
          opacity,
          position: "absolute",
          top: placement.y,
          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rotate}deg)`,
          transformOrigin: "center center",
          width: placement.max_width,
          zIndex: placement.asset_type === "motion_punctuation" ? 91 : 88,
        }}
      />
      <MachineLabel opacity={opacity} placement={placement} />
    </>
  );
};

const PlacementLayer: React.FC = () => (
  <>
    {externalImageAssetPipelinePlacements.map((placement) => {
      const from = toFrame(placement.time_range.start_sec, externalImageAssetPipelineComposition.fps);
      const duration = Math.max(
        1,
        toFrame(
          placement.time_range.end_sec - placement.time_range.start_sec,
          externalImageAssetPipelineComposition.fps
        )
      );
      return (
        <Sequence
          durationInFrames={duration}
          from={from}
          key={placement.asset_need_id}
          premountFor={8}
        >
          <AssetOverlay placement={placement} />
        </Sequence>
      );
    })}
  </>
);

const BoundaryLabel: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", zIndex: 98 }}>
    <div
      style={{
        bottom: 58,
        color: "rgba(246, 239, 214, 0.58)",
        fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: 21,
        fontWeight: 540,
        left: 58,
        letterSpacing: 0,
        lineHeight: 1.28,
        position: "absolute",
        textShadow: "0 8px 18px rgba(0,0,0,0.35)",
        width: 900,
      }}
    >
      partial pipeline alignment · {externalImageAssetPipelineSummary.auto_probe_generated_assets} generated ·{" "}
      {externalImageAssetPipelineSummary.fallback_assets} fallback · not full video candidate
    </div>
  </AbsoluteFill>
);

export const ExternalImageAssetPipelineAlignmentCandidate: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#070807", overflow: "hidden" }}>
    <OffthreadVideo
      src={assetUrl(externalImageAssetPipelineComposition.sourceVideo)}
      style={{
        height: "100%",
        objectFit: "cover",
        width: "100%",
      }}
    />
    <PlacementLayer />
    <BoundaryLabel />
  </AbsoluteFill>
);
