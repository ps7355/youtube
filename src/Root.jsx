import { Composition } from "remotion";
import YouTube from "./video"
import { Balloons } from "./lottie";
export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="demo"
        component={YouTube} // Pass the component reference
        fps={30}
        durationInFrames={4000} // Duration for a 2-minute video at 30 FPS
        width={1080}
        height={1920}
      />
       {/* <Composition
      id="LottieExample"
      component={Balloons}
      durationInFrames={200}
      fps={30}
      width={1920}
      height={1080}
    /> */}
    </>
  );
};
