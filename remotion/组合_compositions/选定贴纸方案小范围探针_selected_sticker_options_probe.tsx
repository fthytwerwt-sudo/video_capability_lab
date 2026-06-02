import React from "react";
import {
  AbsoluteFill,
  Composition,
  Img,
  interpolate,
  registerRoot,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {
  selectedStickerOptionProbes,
  selectedStickerOptionsProbeComposition,
  type StickerOptionProbe,
} from "../数据_data/选定贴纸方案小范围探针_selected_sticker_options_probe";

const clampFrameValue = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
) =>
  interpolate(value, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const getLocalFrame = (frame: number) => {
  const optionDuration =
    selectedStickerOptionsProbeComposition.optionDurationFrames;
  const optionIndex = Math.min(
    Math.floor(frame / optionDuration),
    selectedStickerOptionProbes.length - 1
  );

  return {
    option: selectedStickerOptionProbes[optionIndex],
    optionIndex,
    localFrame: frame - optionIndex * optionDuration,
  };
};

const getStickerOpacity = (localFrame: number) =>
  interpolate(localFrame, [0, 5, 26, 31, 35], [0, 1, 1, 0.48, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const getPhaseLabel = (localFrame: number) => {
  if (localFrame <= selectedStickerOptionsProbeComposition.startFrameOffset) {
    return "start";
  }

  if (localFrame < selectedStickerOptionsProbeComposition.exitFrameOffset) {
    return "mid";
  }

  return "exit";
};

const ReviewOnlyStamp: React.FC<{
  option: StickerOptionProbe;
  localFrame: number;
}> = ({ option, localFrame }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 36,
        bottom: 36,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        padding: "15px 18px",
        borderRadius: 18,
        background: "rgba(22, 24, 18, 0.58)",
        color: "rgba(255, 248, 224, 0.94)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", Arial, sans-serif',
        fontSize: 23,
        lineHeight: 1.08,
        letterSpacing: 0,
        maxWidth: 840,
      }}
    >
      <strong style={{ fontSize: 26 }}>{option.optionId}</strong>
      <span>
        {getPhaseLabel(localFrame)} / {option.attachmentRelation} /{" "}
        {option.shapeGrammar}
      </span>
    </div>
  );
};

const ContactSpark: React.FC<{
  option: StickerOptionProbe;
  localFrame: number;
}> = ({ option, localFrame }) => {
  const drawProgress = clampFrameValue(localFrame, [1, 11], [0, 1]);
  const popScale =
    0.72 +
    clampFrameValue(localFrame, [0, 7], [0, 0.36]) -
    clampFrameValue(localFrame, [7, 14], [0, 0.08]);
  const rotate = clampFrameValue(localFrame, [0, 13], [-9, 2]);
  const opacity = getStickerOpacity(localFrame);

  const strokes = [
    { d: "M74 96 C48 83 36 64 28 43", delay: 0 },
    { d: "M95 76 C92 50 101 32 118 20", delay: 0.14 },
    { d: "M122 104 C150 92 169 76 188 50", delay: 0.28 },
    { d: "M84 124 C59 132 43 145 30 168", delay: 0.4 },
  ];

  return (
    <svg
      width={230}
      height={210}
      viewBox="0 0 230 210"
      style={{
        position: "absolute",
        left: option.anchor.x - 86,
        top: option.anchor.y - 150,
        overflow: "visible",
        opacity,
        transform: `scale(${popScale}) rotate(${rotate}deg)`,
        transformOrigin: "96px 116px",
        filter: "drop-shadow(0 9px 8px rgba(23, 31, 20, 0.28))",
      }}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {strokes.map((stroke) => {
          const pathProgress = Math.max(
            0,
            Math.min(1, (drawProgress - stroke.delay) / (1 - stroke.delay))
          );

          return (
            <g key={stroke.d}>
              <path
                d={stroke.d}
                pathLength={1}
                stroke="rgba(255, 252, 226, 0.96)"
                strokeWidth={19}
                strokeDasharray={1}
                strokeDashoffset={1 - pathProgress}
              />
              <path
                d={stroke.d}
                pathLength={1}
                stroke="rgba(245, 194, 83, 0.96)"
                strokeWidth={9}
                strokeDasharray={1}
                strokeDashoffset={1 - pathProgress}
              />
            </g>
          );
        })}
        <path
          d="M98 113 C108 104 124 106 132 117 C120 123 107 126 98 113Z"
          fill="rgba(255, 237, 142, 0.92)"
          stroke="rgba(255, 252, 226, 0.96)"
          strokeWidth={9}
          opacity={clampFrameValue(localFrame, [4, 10], [0, 1])}
        />
      </g>
    </svg>
  );
};

const HalfRingPeekMark: React.FC<{
  option: StickerOptionProbe;
  localFrame: number;
}> = ({ option, localFrame }) => {
  const drawProgress = clampFrameValue(localFrame, [1, 16], [0, 1]);
  const opacity = getStickerOpacity(localFrame);
  const scale = 0.84 + clampFrameValue(localFrame, [0, 12], [0, 0.13]);

  return (
    <svg
      width={310}
      height={270}
      viewBox="0 0 310 270"
      style={{
        position: "absolute",
        left: option.anchor.x - 166,
        top: option.anchor.y - 180,
        overflow: "visible",
        opacity,
        transform: `scale(${scale}) rotate(-8deg)`,
        transformOrigin: "155px 152px",
        filter: "drop-shadow(0 9px 9px rgba(27, 32, 17, 0.26))",
      }}
    >
      <path
        d="M76 163 C62 108 95 56 148 49 C211 40 258 88 251 150"
        pathLength={1}
        fill="none"
        stroke="rgba(255, 252, 226, 0.96)"
        strokeWidth={22}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - drawProgress}
      />
      <path
        d="M76 163 C62 108 95 56 148 49 C211 40 258 88 251 150"
        pathLength={1}
        fill="none"
        stroke="rgba(238, 185, 72, 0.95)"
        strokeWidth={11}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - drawProgress}
      />
      <path
        d="M112 188 C135 202 164 203 190 190"
        pathLength={1}
        fill="none"
        stroke="rgba(255, 249, 220, 0.88)"
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={1}
        strokeDashoffset={1 - clampFrameValue(localFrame, [10, 18], [0, 1])}
      />
      {[0, 1, 2].map((dot) => (
        <circle
          key={dot}
          cx={214 + dot * 23}
          cy={176 + dot * 11}
          r={7 - dot}
          fill="rgba(255, 243, 171, 0.92)"
          stroke="rgba(255, 252, 226, 0.92)"
          strokeWidth={5}
          opacity={clampFrameValue(localFrame, [12 + dot * 2, 18 + dot * 2], [0, 1])}
        />
      ))}
    </svg>
  );
};

const ShortStrokeCluster: React.FC<{
  option: StickerOptionProbe;
  localFrame: number;
}> = ({ option, localFrame }) => {
  const opacity = getStickerOpacity(localFrame);
  const scale = 0.82 + clampFrameValue(localFrame, [0, 12], [0, 0.15]);
  const strokes = [
    {
      d: "M32 88 C66 70 90 61 123 45",
      delay: 0,
      width: 12,
    },
    {
      d: "M50 132 C88 115 111 106 151 91",
      delay: 0.18,
      width: 10,
    },
    {
      d: "M79 169 C112 156 135 146 168 129",
      delay: 0.36,
      width: 8,
    },
  ];

  return (
    <svg
      width={230}
      height={230}
      viewBox="0 0 230 230"
      style={{
        position: "absolute",
        left: option.anchor.x - 92,
        top: option.anchor.y - 124,
        overflow: "visible",
        opacity,
        transform: `scale(${scale}) rotate(-15deg)`,
        transformOrigin: "94px 116px",
        filter: "drop-shadow(0 8px 7px rgba(28, 34, 20, 0.22))",
      }}
    >
      {strokes.map((stroke) => {
        const progress = Math.max(
          0,
          Math.min(
            1,
            (clampFrameValue(localFrame, [2, 14], [0, 1]) - stroke.delay) /
              (1 - stroke.delay)
          )
        );

        return (
          <g key={stroke.d} fill="none" strokeLinecap="round">
            <path
              d={stroke.d}
              pathLength={1}
              stroke="rgba(255, 253, 226, 0.96)"
              strokeWidth={stroke.width + 10}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
            />
            <path
              d={stroke.d}
              pathLength={1}
              stroke="rgba(247, 198, 80, 0.94)"
              strokeWidth={stroke.width}
              strokeDasharray={1}
              strokeDashoffset={1 - progress}
            />
          </g>
        );
      })}
    </svg>
  );
};

const StickerOverlay: React.FC<{
  option: StickerOptionProbe;
  localFrame: number;
}> = ({ option, localFrame }) => {
  if (option.shapeGrammar === "half_ring_peek_mark") {
    return <HalfRingPeekMark option={option} localFrame={localFrame} />;
  }

  if (option.shapeGrammar === "short_stroke_cluster") {
    return <ShortStrokeCluster option={option} localFrame={localFrame} />;
  }

  return <ContactSpark option={option} localFrame={localFrame} />;
};

export const SelectedStickerOptionsProbe: React.FC = () => {
  const frame = useCurrentFrame();
  const { option, localFrame } = getLocalFrame(frame);

  return (
    <AbsoluteFill style={{ backgroundColor: "#10130e" }}>
      <Img
        src={staticFile(option.sourceFrame)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "saturate(0.94) contrast(1.03)",
          transform: `scale(${option.backgroundTransform.scale}) translateY(${option.backgroundTransform.y}px)`,
        }}
      />
      <StickerOverlay option={option} localFrame={localFrame} />
      <ReviewOnlyStamp option={option} localFrame={localFrame} />
    </AbsoluteFill>
  );
};

const RemotionRoot: React.FC = () => (
  <Composition
    id={selectedStickerOptionsProbeComposition.id}
    component={SelectedStickerOptionsProbe}
    durationInFrames={
      selectedStickerOptionsProbeComposition.optionDurationFrames *
      selectedStickerOptionProbes.length
    }
    fps={selectedStickerOptionsProbeComposition.fps}
    height={selectedStickerOptionsProbeComposition.height}
    width={selectedStickerOptionsProbeComposition.width}
  />
);

registerRoot(RemotionRoot);
