import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  SecondEpisodeAdaptiveColorSection,
  SecondEpisodeColorGradeProfile,
  SecondEpisodeShot,
  secondEpisodeAdaptiveColorGradeProfile,
  secondEpisode16sBgm,
  secondEpisode16sVlogCandidateComposition,
  secondEpisodeShots,
} from "../数据_data/第二期16秒vlog验证候选_second_episode_16s_vlog_validation_candidate";

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

const zoneBias: Record<SecondEpisodeShot["gradeZone"], { brightness: number; saturation: number; contrast: number }> = {
  day_warm_detail: { brightness: 0.01, contrast: 0.01, saturation: 0.015 },
  day_soft_green: { brightness: 0.015, contrast: -0.01, saturation: -0.005 },
  day_neutral_walk: { brightness: 0.005, contrast: 0, saturation: 0 },
  shadow_clean: { brightness: 0.025, contrast: -0.015, saturation: -0.025 },
  day_motion: { brightness: 0, contrast: 0.015, saturation: -0.005 },
  golden_shift: { brightness: 0.01, contrast: 0, saturation: 0.01 },
  night_neon: { brightness: 0.035, contrast: -0.005, saturation: -0.01 },
  night_motion: { brightness: 0.045, contrast: -0.015, saturation: -0.025 },
  night_aftertaste: { brightness: 0.04, contrast: -0.02, saturation: -0.035 },
  shadow_close: { brightness: 0.045, contrast: -0.025, saturation: -0.045 },
};

const sectionToProfile = (
  profile: SecondEpisodeColorGradeProfile,
  section: SecondEpisodeAdaptiveColorSection
): SecondEpisodeColorGradeProfile => ({
  ...profile,
  brightness_adjust: section.brightness_adjust,
  contrast_adjust: section.contrast_adjust,
  saturation_adjust: section.saturation_adjust,
  temperature_adjust: section.temperature_adjust,
  tint_adjust: section.tint_adjust,
  shadow_lift: section.shadow_lift,
  highlight_rolloff: section.highlight_rolloff,
  vignette_strength: section.vignette_strength,
  grain_strength: section.grain_strength,
});

const selectColorProfileForFrame = (
  profile: SecondEpisodeColorGradeProfile,
  frame: number
): SecondEpisodeColorGradeProfile => {
  if (profile.apply_scope !== "per_music_section" || !profile.sections?.length) {
    return profile;
  }

  const activeSection = profile.sections.find(
    (section) => frame >= section.frame_range[0] && frame < section.frame_range[1]
  );

  if (activeSection) {
    return sectionToProfile(profile, activeSection);
  }

  const nearestSection = profile.sections.reduce((nearest, section) => {
    const distanceToNearest = Math.min(
      Math.abs(frame - nearest.frame_range[0]),
      Math.abs(frame - nearest.frame_range[1])
    );
    const distanceToSection = Math.min(
      Math.abs(frame - section.frame_range[0]),
      Math.abs(frame - section.frame_range[1])
    );
    return distanceToSection < distanceToNearest ? section : nearest;
  });

  return sectionToProfile(profile, nearestSection);
};

const cssFilter = (profile: SecondEpisodeColorGradeProfile, shot: SecondEpisodeShot) => {
  const bias = zoneBias[shot.gradeZone];
  const brightness = 1 + profile.brightness_adjust + profile.shadow_lift * 0.45 + bias.brightness;
  const contrast = 1 + profile.contrast_adjust + bias.contrast;
  const saturation = 1 + profile.saturation_adjust + bias.saturation;
  const tint = profile.tint_adjust;

  return [
    `brightness(${brightness.toFixed(3)})`,
    `contrast(${contrast.toFixed(3)})`,
    `saturate(${saturation.toFixed(3)})`,
    `sepia(${Math.max(0, profile.temperature_adjust * 0.35).toFixed(3)})`,
    `hue-rotate(${(tint * 28).toFixed(3)}deg)`,
  ].join(" ");
};

const SceneLayer: React.FC<{
  profile: SecondEpisodeColorGradeProfile;
  shot: SecondEpisodeShot;
  index: number;
}> = ({ index, profile, shot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const from = toFrame(shot.fromSec, fps);
  const duration = toFrame(shot.durationSec, fps);
  const local = frame - from;
  const opacity = interpolate(
    local,
    [0, 7, Math.max(8, duration - 7), duration],
    [0, 1, 1, 0],
    clamp
  );
  const scale = interpolate(local, [0, duration], [shot.scaleStart, shot.scaleEnd], clamp);
  const y = interpolate(local, [0, duration], [shot.yStart, shot.yEnd], clamp);
  const activeProfile = selectColorProfileForFrame(profile, frame);

  return (
    <Sequence from={from} durationInFrames={duration + 2} premountFor={fps}>
      <AbsoluteFill style={{ opacity, zIndex: 2 + index }}>
        <OffthreadVideo
          muted
          src={assetUrl(shot.src)}
          startFrom={toFrame(shot.sourceStartSec, fps)}
          style={{
            ...fullVideo,
            filter: cssFilter(activeProfile, shot),
            objectPosition: shot.objectPosition,
            transform: `scale(${scale}) translateY(${y}px)`,
          }}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

const AtmosphereLayer: React.FC<{ profile: SecondEpisodeColorGradeProfile }> = ({ profile }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const activeProfile = selectColorProfileForFrame(profile, frame);
  const warmAlpha = Math.max(0, activeProfile.temperature_adjust) * 0.82;
  const shadowLift = activeProfile.shadow_lift;
  const highlight = activeProfile.highlight_rolloff;
  const vignette = activeProfile.vignette_strength;
  const grain = activeProfile.grain_strength;
  const nightShade = interpolate(frame, [0, 240, 420, durationInFrames], [0, 0.03, 0.12, 0.22], clamp);
  const endingFade = interpolate(frame, [durationInFrames - 26, durationInFrames], [0, 0.42], clamp);
  const pulse = interpolate(Math.sin(frame / 21), [-1, 1], [0.015, 0.055]);

  return (
    <AbsoluteFill style={{ zIndex: 42 }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(255, 218, 158, ${warmAlpha}) 0%, rgba(255, 218, 158, 0.02) 42%, rgba(15, 21, 24, ${nightShade}) 100%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 48% 36%, rgba(255,247,215, ${highlight * 0.7 + pulse}) 0%, rgba(255,247,215, 0) 39%)`,
          mixBlendMode: "soft-light",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: `rgba(230, 225, 205, ${shadowLift * 0.38})`,
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 190px rgba(0,0,0, ${vignette})`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 7px)",
          opacity: grain,
        }}
      />
      <AbsoluteFill style={{ backgroundColor: `rgba(3, 4, 4, ${endingFade})` }} />
    </AbsoluteFill>
  );
};

const AudioLayer: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Audio
      endAt={toFrame(secondEpisode16sVlogCandidateComposition.durationSec, fps)}
      src={assetUrl(secondEpisode16sBgm.path)}
      volume={(frame) => {
        const second = frame / fps;
        const fadeIn = Math.min(1, second / secondEpisode16sBgm.fadeInSec);
        const fadeOut =
          second < secondEpisode16sBgm.fadeOutStartSec
            ? 1
            : Math.max(
                0,
                (secondEpisode16sVlogCandidateComposition.durationSec - second) /
                  secondEpisode16sBgm.fadeOutDurationSec
              );
        return secondEpisode16sBgm.level * Math.min(fadeIn, fadeOut);
      }}
    />
  );
};

export const SecondEpisode16sVlogValidationCandidate: React.FC<SecondEpisodeColorGradeProfile> = (
  props
) => {
  const profile = {
    ...secondEpisodeAdaptiveColorGradeProfile,
    ...props,
    sections: props.sections ?? secondEpisodeAdaptiveColorGradeProfile.sections,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0c0b" }}>
      {secondEpisodeShots.map((shot, index) => (
        <SceneLayer index={index} key={shot.shotId} profile={profile} shot={shot} />
      ))}
      <AtmosphereLayer profile={profile} />
      <AudioLayer />
    </AbsoluteFill>
  );
};
