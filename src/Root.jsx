import { Composition } from "remotion";
import YouTube from "./memes";
import { Balloons } from "./lottie";
import demo from "./lottie";
import Riddle from "./demo";
import VideoPlayer from "./demo";
import elevenaudio from "./elevenlabs";
export const RemotionRoot = () => {
  return (
    <>
      {/* <Composition
        id="demo"
        component={Riddle} // Pass the component reference
        fps={30}
        durationInFrames={1500} // Duration for a 2-minute video at 30 FPS
        width={1080}
        height={1920}
      /> */}
       {/* <Composition
      id="LottieExample"
      component={Balloons}
      durationInFrames={200}
      fps={30}
      width={1920}
      height={1080}
    /> */}
    <Composition
    id="demo"
    component={YouTube}
    durationInFrames={1622}
    fps={30}
    width={1080}
    height={1920}
    />
    </>
  );
};
