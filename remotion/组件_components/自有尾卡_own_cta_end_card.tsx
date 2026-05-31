import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const OwnCtaEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = interpolate(frame, [fps * 10.05, fps * 10.55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: enter,
        zIndex: 20,
        background: "linear-gradient(180deg, rgba(18,22,20,0.25), rgba(10,13,12,0.92))",
        color: "#f8f1df",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          bottom: 118,
          borderTop: "2px solid rgba(248,241,223,0.56)",
          paddingTop: 34,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 0.98 }}>继续机制设计？</div>
        <div style={{ marginTop: 22, fontSize: 34, lineHeight: 1.3, color: "#d8ceb7" }}>
          本地 demo 已导出，下一步看 final_decision，而不是只看 render 成功。
        </div>
        <div
          style={{
            display: "inline-block",
            marginTop: 36,
            padding: "16px 24px",
            border: "2px solid rgba(247,208,92,0.8)",
            color: "#f7d05c",
            fontSize: 29,
            fontWeight: 700,
          }}
        >
          review: capability proof only
        </div>
      </div>
    </div>
  );
};
