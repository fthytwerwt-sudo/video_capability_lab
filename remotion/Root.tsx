import React from "react";
import { Composition, registerRoot } from "remotion";
import { CapabilityDemo } from "./组合_compositions/能力证明Demo_capability_demo";

const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="能力证明Demo-capability-demo"
      component={CapabilityDemo}
      durationInFrames={360}
      fps={30}
      height={1920}
      width={1080}
    />
  );
};

registerRoot(RemotionRoot);
