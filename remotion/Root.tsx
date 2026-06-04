import React from "react";
import { Composition, registerRoot } from "remotion";
import { CapabilityDemo } from "./组合_compositions/能力证明Demo_capability_demo";
import { AestheticRetargetDemo } from "./组合_compositions/审美重定Demo_aesthetic_retarget_demo";
import { NewReferenceRebuildDemo } from "./组合_compositions/新素材参考重做Demo_new_reference_rebuild_demo";
import { ThirtySecondReferenceSample } from "./组合_compositions/三十秒对标样片_30s_reference_sample";
import { EighteenSecondAnchorStickerCandidate } from "./组合_compositions/十八秒锚点贴纸候选_18s_anchor_sticker_candidate";
import { VisualLanguageRoutedFullCandidate18s } from "./组合_compositions/参考视觉语言路由18秒正片候选_18s_visual_language_routed_full_candidate";

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
    </>
  );
};

registerRoot(RemotionRoot);
