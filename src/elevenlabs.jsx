import React from "react";
import {
  useCurrentFrame,
  interpolate,
  staticFile,
  Audio,
  Sequence,
  Img,
} from "remotion";
import { Video } from "remotion";
import { useState, useEffect } from "react";
import { Lottie } from "@remotion/lottie";

// Media Files: Images only
const mediaFiles = [
  staticFile("eimage1.jpeg"),
  staticFile("eimage2.jpeg"),
  staticFile("eimage3.jpeg"),
];

// Audio Files with respective durations in seconds
const audioFiles = [
  { src: staticFile("eaudio1.mp3"), duration: 26 }, // Audio 1: 7 seconds
  { src: staticFile("eaudio2.mp3"), duration: 34 }, // Audio 2: 10 seconds
  { src: staticFile("eaudio3.mp3"), duration: 38 }, // Audio 3: 6 seconds
];

const ElevenAudio = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  // Corrected calculation of audioIndex and startFrame
  let totalAudioDuration = 0;
  for (let i = 0; i < audioFiles.length; i++) {
    totalAudioDuration += audioFiles[i].duration;
  }
  const cumulativeAudioDuration = (frame / fps) % totalAudioDuration;

  let audioIndex = 0;
  let accumulatedDuration = 0;
  for (let i = 0; i < audioFiles.length; i++) {
    if (
      cumulativeAudioDuration >= accumulatedDuration &&
      cumulativeAudioDuration < accumulatedDuration + audioFiles[i].duration
    ) {
      audioIndex = i;
      break;
    }
    accumulatedDuration += audioFiles[i].duration;
  }

  const startFrame = Math.floor(accumulatedDuration * fps);
  const mediaIndex = audioIndex % mediaFiles.length;
  const currentMedia = mediaFiles[mediaIndex];

  // Simplified opacity calculation
  const transitionDuration = fps * 0.5;
  const localFrame = frame - startFrame; // Frame within the current segment
  const opacity = interpolate(
    localFrame,
    [0, transitionDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    fetch(staticFile("subscribe.json"))
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation:", err));
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Background Video */}
      <Video
        loop
        src={staticFile("videoplayback.mp4")}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Single Media Container (only Image) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%", // Decreased width of the image
          height: "60%", // Decreased height of the image
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Display the image with opacity transition */}
        <Img
          src={currentMedia}
          alt={`Media ${mediaIndex + 1}`}
          style={{
            width: "129%",
            height: "100%",
            objectFit: "contain",
            padding: "4%",
            opacity,
          }}
        />
      </div>

      {/* Audio Loop */}
      <Sequence
        from={startFrame}
        durationInFrames={fps * audioFiles[audioIndex].duration}
      >
        <Audio src={audioFiles[audioIndex].src} volume={0.5} />
      </Sequence>

      {/* Lottie Animation */}
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            position: "absolute",
            // marginTop: "-3%", // Consider removing or adjusting this
            top: "0", // Align to the top
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "300px",
          }}
        />
      )}
    </div>
  );
};

export default ElevenAudio;