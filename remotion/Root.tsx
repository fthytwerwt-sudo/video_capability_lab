import React from "react";
import { Composition, registerRoot } from "remotion";
import { CapabilityDemo } from "./组合_compositions/能力证明Demo_capability_demo";
import { AestheticRetargetDemo } from "./组合_compositions/审美重定Demo_aesthetic_retarget_demo";
import { NewReferenceRebuildDemo } from "./组合_compositions/新素材参考重做Demo_new_reference_rebuild_demo";
import { ThirtySecondReferenceSample } from "./组合_compositions/三十秒对标样片_30s_reference_sample";
import { EighteenSecondAnchorStickerCandidate } from "./组合_compositions/十八秒锚点贴纸候选_18s_anchor_sticker_candidate";
import { VisualLanguageRoutedFullCandidate18s } from "./组合_compositions/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate";
import { CaptionStickerMicroProbe2To4s } from "./组合_compositions/字幕贴纸2到4秒微段精修探针_caption_sticker_2_4s_micro_probe";
import { CaptionStickerFixV2MicroProbe } from "./组合_compositions/字幕贴纸2到4秒微段修正版_caption_sticker_2_4s_fix_v2";
import { VisualToolchainPluginSmokeProbe } from "./组合_compositions/视觉工具链插件冒烟探针_visual_toolchain_plugin_smoke_probe";
import { VisualPreprocessingDrivenCaptionStickerProbe } from "./组合_compositions/视觉前处理驱动字幕贴纸探针_visual_preprocessing_driven_caption_sticker_probe";
import { VisualPreprocessingDriven8sCaptionStickerCandidate } from "./组合_compositions/视觉前处理驱动8秒字幕贴纸候选_visual_preprocessing_driven_8s_caption_sticker_candidate";
import { AutoVisualAssetNeedDetectionProbe } from "./组合_compositions/自动视觉资产需求识别探针_auto_visual_asset_need_detection_probe";
import { ExternalImageAssetPipelineAlignmentCandidate } from "./组合_compositions/外部图像资产流程对齐候选_external_image_asset_pipeline_alignment_candidate";

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="能力证明Demo-capability-demo"
        component={CapabilityDemo}
        durationInFrames={360}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="审美重定Demo-aesthetic-retarget-demo"
        component={AestheticRetargetDemo}
        durationInFrames={360}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="新素材参考重做Demo-new-reference-rebuild-demo"
        component={NewReferenceRebuildDemo}
        durationInFrames={360}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="三十秒对标样片-30s-reference-sample"
        component={ThirtySecondReferenceSample}
        durationInFrames={900}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="十八秒锚点贴纸候选-18s-anchor-sticker-candidate"
        component={EighteenSecondAnchorStickerCandidate}
        durationInFrames={540}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="参考视觉语言路由18秒正片候选-18s-visual-language-routed-full-candidate"
        component={VisualLanguageRoutedFullCandidate18s}
        durationInFrames={540}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="字幕贴纸2到4秒微段精修探针-caption-sticker-2-4s-micro-probe"
        component={CaptionStickerMicroProbe2To4s}
        durationInFrames={90}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="字幕贴纸2到4秒微段修正版-caption-sticker-2-4s-fix-v2"
        component={CaptionStickerFixV2MicroProbe}
        durationInFrames={90}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="视觉工具链插件冒烟探针-visual-toolchain-plugin-smoke-probe"
        component={VisualToolchainPluginSmokeProbe}
        durationInFrames={90}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="视觉前处理驱动字幕贴纸探针-visual-preprocessing-driven-caption-sticker-probe"
        component={VisualPreprocessingDrivenCaptionStickerProbe}
        durationInFrames={90}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="视觉前处理驱动8秒字幕贴纸候选-visual-preprocessing-driven-8s-caption-sticker-candidate"
        component={VisualPreprocessingDriven8sCaptionStickerCandidate}
        durationInFrames={240}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="自动视觉资产需求识别探针-auto-visual-asset-need-detection-probe"
        component={AutoVisualAssetNeedDetectionProbe}
        durationInFrames={240}
        fps={30}
        height={1920}
        width={1080}
      />
      <Composition
        id="外部图像资产流程对齐候选-external-image-asset-pipeline-alignment-candidate"
        component={ExternalImageAssetPipelineAlignmentCandidate}
        durationInFrames={240}
        fps={30}
        height={1920}
        width={1080}
      />
    </>
  );
};

registerRoot(RemotionRoot);
