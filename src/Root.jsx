import { Composition } from "remotion";
import YouTube from "./video";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="demo"
        component={YouTube} // Pass the component reference
        fps={30}
        durationInFrames={3600} // Duration for a 2-minute video at 30 FPS
        width={1080}
        height={1920}
      />
    </>
  );
};
