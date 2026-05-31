import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const TitleOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const intro = interpolate(frame, [0, fps * 0.4, fps * 2.6], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mid = interpolate(frame, [fps * 7.7, fps * 8.4, fps * 10], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 88,
          opacity: intro,
          zIndex: 10,
          color: "#f8f1df",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 0, marginBottom: 22, textTransform: "uppercase" }}>
          Remotion capability proof
        </div>
        <div style={{ fontSize: 94, fontWeight: 800, lineHeight: 0.96 }}>真实素材先跑起来</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          bottom: 250,
          opacity: mid,
          zIndex: 12,
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
          textShadow: "0 10px 28px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.1 }}>手写字 + 分屏 + BGM marker</div>
        <div style={{ marginTop: 18, fontSize: 31, lineHeight: 1.28, color: "#e9e2d2" }}>
          这不是正式成片，只验证 Codex + Remotion 是否能做出像样 demo。
        </div>
      </div>
    </>
  );
};
