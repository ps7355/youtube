import { useEffect, useState } from "react";
import {
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Lottie } from "@remotion/lottie";

export const Balloons = () => {
  const [handle] = useState(() => delayRender("Loading Lottie animation"));
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(staticFile("subscribe.json"))
      .then((data) => data.json())
      .then((json) => {
        setAnimationData(json);
        continueRender(handle);
      })
      .catch((err) => {
        setError("Failed to load animation.");
        console.error("Animation failed to load", err);
        continueRender(handle); // Ensure rendering continues
      });
  }, [handle]);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!animationData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Lottie
        animationData={animationData}
        segments={[0, Math.min(200, durationInFrames - 1)]}
        speed={1} // Adjust speed as needed
      />
    </div>
  );
};
