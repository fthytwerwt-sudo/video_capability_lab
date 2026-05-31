import React from "react";
import { OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
import type { DemoClip } from "../数据_data/素材清单_demo_clips";

type Props = {
  clips: DemoClip[];
};

const panelStyle: React.CSSProperties = {
  position: "absolute",
  overflow: "hidden",
  border: "4px solid rgba(255,255,255,0.82)",
  boxShadow: "0 18px 44px rgba(0,0,0,0.34)",
};

const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const SplitScreenCollage: React.FC<Props> = ({ clips }) => {
  const { fps } = useVideoConfig();

  return (
    <Sequence from={Math.round(3.55 * fps)} durationInFrames={Math.round(4.75 * fps)} premountFor={fps}>
      <div style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <div style={{ ...panelStyle, left: 62, top: 304, width: 956, height: 430 }}>
          <OffthreadVideo src={staticFile(clips[2].src)} muted loop style={videoStyle} />
        </div>
        <div style={{ ...panelStyle, left: 62, top: 760, width: 456, height: 780 }}>
          <OffthreadVideo src={staticFile(clips[0].src)} muted loop style={videoStyle} />
        </div>
        <div style={{ ...panelStyle, right: 62, top: 760, width: 456, height: 780 }}>
          <OffthreadVideo src={staticFile(clips[3].src)} muted loop style={videoStyle} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 82,
            top: 214,
            color: "#f3efe4",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 32,
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          real clips / split proof
        </div>
      </div>
    </Sequence>
  );
};
