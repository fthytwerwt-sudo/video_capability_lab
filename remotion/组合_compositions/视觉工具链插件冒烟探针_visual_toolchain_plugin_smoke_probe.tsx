import React from "react";
import { blur } from "@remotion/effects/blur";
import { dropShadow } from "@remotion/effects/drop-shadow";
import { noise } from "@remotion/effects/noise";
import { vignette } from "@remotion/effects/vignette";
import { Trail } from "@remotion/motion-blur";
import {
  evolvePath,
  getLength,
  getPointAtLength,
  interpolatePath,
} from "@remotion/paths";
import {
  AbsoluteFill,
  Easing,
  Solid,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  pluginSmokeComposition,
  pluginSmokePathFacts,
  smokeBasePath,
  smokeTargetPath,
} from "../数据_data/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Label: React.FC<{ text: string; top: number }> = ({ text, top }) => (
  <div
    style={{
      color: "rgba(247, 240, 219, 0.88)",
      fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
      fontSize: 34,
      fontWeight: 650,
      left: 82,
      letterSpacing: 0,
      lineHeight: 1.2,
      position: "absolute",
      textShadow: "0 3px 12px rgba(0,0,0,0.45)",
      top,
      width: 860,
    }}
  >
    {text}
  </div>
);

export const VisualToolchainPluginSmokeProbe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0.2 * fps, 2.3 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const evolved = evolvePath(progress, smokeBasePath);
  const activePath = interpolatePath(progress, smokeBasePath, smokeTargetPath);
  const length = getLength(activePath);
  const point = getPointAtLength(activePath, length * progress);

  return (
    <AbsoluteFill style={{ backgroundColor: "#111410", overflow: "hidden" }}>
      <Solid
        color="#1b211d"
        effects={[
          noise({ amount: 0.1, seed: 12 }),
          vignette({ amount: 0.44, radius: 0.64, feather: 0.35 }),
        ]}
        height={pluginSmokeComposition.height}
        width={pluginSmokeComposition.width}
      />
      <Solid
        color="rgba(226, 204, 138, 0.22)"
        effects={[blur({ radius: 24 }), dropShadow({ radius: 18, offsetX: 0, offsetY: 16 })]}
        height={360}
        style={{
          left: 0,
          mixBlendMode: "screen",
          position: "absolute",
          top: 520,
          transform: "rotate(-8deg)",
        }}
        width={pluginSmokeComposition.width}
      />
      <svg
        height={1120}
        style={{ left: 0, overflow: "visible", position: "absolute", top: 260 }}
        viewBox="0 0 1080 1120"
        width={1080}
      >
        <path
          d={smokeBasePath}
          fill="none"
          opacity={0.18}
          stroke="rgba(250, 244, 220, 0.92)"
          strokeLinecap="round"
          strokeWidth={16}
        />
        <path
          d={activePath}
          fill="none"
          pathLength={1}
          stroke="rgba(244, 202, 91, 0.95)"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={22}
        />
      </svg>
      <Trail lagInFrames={2} layers={7} trailOpacity={0.32}>
        <div
          style={{
            background: "rgba(248, 223, 129, 0.95)",
            border: "7px solid rgba(255,255,241,0.96)",
            borderRadius: 999,
            boxShadow: "0 0 24px rgba(246, 209, 94, 0.62), 0 16px 34px rgba(0,0,0,0.34)",
            height: 58,
            left: point.x - 29,
            position: "absolute",
            top: 260 + point.y - 29,
            width: 58,
            zIndex: 50,
          }}
        />
      </Trail>
      <Label text="@remotion/paths: path length, point sampling, evolvePath, interpolatePath" top={112} />
      <Label text="@remotion/motion-blur: Trail leaves a low-risk moving echo" top={158} />
      <Label text="@remotion/effects: Solid canvas uses blur, dropShadow, noise and vignette" top={204} />
      <div
        style={{
          bottom: 126,
          color: "rgba(247, 240, 219, 0.74)",
          fontFamily: '"PingFang SC", "Helvetica Neue", Arial, sans-serif',
          fontSize: 28,
          left: 82,
          letterSpacing: 0,
          lineHeight: 1.38,
          position: "absolute",
          width: 870,
        }}
      >
        getLength={pluginSmokePathFacts.getLength_result.toFixed(2)} / sampled x=
        {point.x.toFixed(1)} y={point.y.toFixed(1)}
      </div>
    </AbsoluteFill>
  );
};
