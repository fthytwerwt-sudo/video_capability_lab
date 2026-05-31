import React from "react";
import { Composition, registerRoot } from "remotion";
import { CapabilityDemo } from "./组合_compositions/能力证明Demo_capability_demo";
import { AestheticRetargetDemo } from "./组合_compositions/审美重定Demo_aesthetic_retarget_demo";

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
    </>
  );
};

registerRoot(RemotionRoot);
