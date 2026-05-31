import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
import { HandwritingBeatLayer } from "../组件_components/手写字节奏层_handwriting_beat_layer";
import { OwnCtaEndCard } from "../组件_components/自有尾卡_own_cta_end_card";
import { SplitScreenCollage } from "../组件_components/分屏拼贴_split_screen_collage";
import { TitleOverlay } from "../组件_components/标题叠层_title_overlay";
import { demoAudio, demoClips } from "../数据_data/素材清单_demo_clips";
import { demoMarkers } from "../数据_data/卡点标记_demo_markers";

const coverVideo: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const CapabilityDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#111514", overflow: "hidden" }}>
      <Audio src={staticFile(demoAudio)} volume={0.78} />
      <AbsoluteFill style={{ filter: "contrast(1.04) saturate(1.05)" }}>
        <OffthreadVideo src={staticFile(demoClips[0].src)} muted loop style={coverVideo} />
      </AbsoluteFill>
      <Sequence from={Math.round(2.75 * fps)} durationInFrames={Math.round(3.7 * fps)} premountFor={fps}>
        <OffthreadVideo src={staticFile(demoClips[1].src)} muted loop style={coverVideo} />
      </Sequence>
      <Sequence from={Math.round(7.75 * fps)} durationInFrames={Math.round(2.75 * fps)} premountFor={fps}>
        <OffthreadVideo src={staticFile(demoClips[2].src)} muted loop style={coverVideo} />
      </Sequence>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.62) 100%)",
          zIndex: 4,
        }}
      />
      <SplitScreenCollage clips={demoClips} />
      <TitleOverlay />
      <HandwritingBeatLayer markers={demoMarkers} />
      <OwnCtaEndCard />
    </AbsoluteFill>
  );
};
