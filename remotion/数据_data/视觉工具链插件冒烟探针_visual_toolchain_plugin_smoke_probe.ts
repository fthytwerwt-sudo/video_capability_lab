import {
  evolvePath,
  getLength,
  getPointAtLength,
  interpolatePath,
} from "@remotion/paths";

export const pluginSmokeComposition = {
  id: "视觉工具链插件冒烟探针-visual-toolchain-plugin-smoke-probe",
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 90,
  durationSec: 3,
};

export const smokeBasePath = "M120 640 C220 440 420 500 515 700 C610 900 790 860 900 620";
export const smokeTargetPath = "M120 700 C280 560 390 760 530 650 C690 520 780 790 900 690";

const pathLength = getLength(smokeBasePath);
const midPoint = getPointAtLength(smokeBasePath, pathLength * 0.5);

export const pluginSmokePathFacts = {
  base_path: smokeBasePath,
  target_path: smokeTargetPath,
  getLength_result: pathLength,
  getPointAtLength_result: midPoint,
  interpolatePath_result_sample: interpolatePath(0.5, smokeBasePath, smokeTargetPath),
  evolvePath_result_keys: Object.keys(evolvePath(0.5, smokeBasePath)),
  actual_api_result: {
    paths_root_exports:
      "getLength/getPointAtLength/interpolatePath/evolvePath are exported from @remotion/paths.",
    motion_blur_exports: "Trail and CameraMotionBlur are exported from @remotion/motion-blur.",
    effects_import_style:
      "@remotion/effects has package subpath exports; use @remotion/effects/blur, /drop-shadow, /noise, /vignette.",
  },
};

export const smokePluginChecklist = {
  paths_get_length: true,
  paths_get_point_at_length: true,
  paths_interpolate_path: true,
  paths_evolve_path: true,
  motion_blur_trail: true,
  effects_blur_drop_shadow_noise_vignette: true,
  probe_status: "installed_imported_render_pending",
  do_not_claim: [
    "video_fixed",
    "vlog_director_capability_verified",
    "visual_understanding_verified",
  ],
};
