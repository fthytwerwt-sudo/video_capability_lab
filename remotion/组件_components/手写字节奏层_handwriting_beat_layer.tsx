import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { DemoMarker } from "../数据_data/卡点标记_demo_markers";

type Props = {
  markers: DemoMarker[];
};

const phrases = ["别急着定路线", "先看真实节奏", "剪辑能不能站住"];

export const HandwritingBeatLayer: React.FC<Props> = ({ markers }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const activeIndex = Math.max(
    0,
    markers.findIndex((item, index) => {
      const start = item.time * fps;
      const next = markers[index + 1]?.time ? markers[index + 1].time * fps : start + fps * 1.4;
      return frame >= start && frame < next;
    }),
  );
  const active = markers[activeIndex] ?? markers[0];
  const local = frame - active.time * fps;
  const reveal = interpolate(local, [0, 8, 22], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lift = interpolate(local, [0, 20], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = interpolate(local, [0, 5, 16], [0.75, 1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const phrase = phrases[activeIndex % phrases.length];

  return (
    <div
      style={{
        position: "absolute",
        left: 86,
        right: 86,
        top: activeIndex % 2 === 0 ? 252 : 1356,
        transform: `translateY(${lift}px) scale(${pulse})`,
        opacity: reveal,
        color: "#fff7da",
        fontFamily: '"Marker Felt", "Bradley Hand", "Comic Sans MS", cursive',
        fontSize: 62,
        lineHeight: 1.05,
        textShadow: "0 8px 24px rgba(0,0,0,0.5)",
        zIndex: 14,
      }}
    >
      <div>{phrase}</div>
      <svg width="100%" height="48" viewBox="0 0 760 48" style={{ display: "block", marginTop: 10 }}>
        <path
          d="M8 27 C132 6 228 43 362 21 C486 2 592 36 752 16"
          fill="none"
          stroke="#f7d05c"
          strokeLinecap="round"
          strokeWidth="9"
          style={{
            strokeDasharray: 790,
            strokeDashoffset: 790 - 790 * reveal,
            filter: "drop-shadow(0 7px 16px rgba(0,0,0,0.42))",
          }}
        />
      </svg>
    </div>
  );
};
