// import { useEffect, useState } from "react";
// import {
//   continueRender,
//   delayRender,
//   staticFile,
//   useCurrentFrame,
//   useVideoConfig,
// } from "remotion";
// import { Lottie } from "@remotion/lottie";

import { AbsoluteFill, interpolate, spring, useCurrentFrame } from "remotion";

// export const Balloons = () => {
//   const [handle] = useState(() => delayRender("Loading Lottie animation"));
//   const { durationInFrames } = useVideoConfig();
//   const frame = useCurrentFrame();

//   const [animationData, setAnimationData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(staticFile("subscribe.json"))
//       .then((data) => data.json())
//       .then((json) => {
//         setAnimationData(json);
//         continueRender(handle);
//       })
//       .catch((err) => {
//         setError("Failed to load animation.");
//         console.error("Animation failed to load", err);
//         continueRender(handle); // Ensure rendering continues
//       });
//   }, [handle]);

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!animationData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: "500px", height: "500px" }}>
//       <Lottie
//         animationData={animationData}
//         segments={[0, Math.min(200, durationInFrames - 1)]}
//         speed={1} // Adjust speed as needed
//       />
//     </div>
//   );
// };
import {AbsoluteFill, interpolate, spring, useCurrentFrame} from 'remotion';

const demo = () => {
  const frame = useCurrentFrame();

  // Interpolate example
  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Spring example
  const scale = spring({
    from: 0,
    to: 1,
    frame,
    durationInFrames: 100,
    fps: 30,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 100,
      }}
    >
      <div
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: 'red',
          WebkitBoxShadow: `0px 0px 150px 164px rgba(45,255,196,${scale})`,
          MozBoxShadow: `0px 0px 150px 164px rgba(45,255,196,${scale})`,
          boxShadow: `0px 0px 150px 164px rgba(45,255,196,${scale})`,
          //transform: `scale(${scale})`,
        }}
      ></div>
    </AbsoluteFill>
  );
};





export default demo;



// import React from "react";
// import {
//   useCurrentFrame,
//   interpolate,
//   staticFile,
//   Audio,
//   Sequence,
//   Img,
//   Video,
// } from "remotion";
// import { useState, useEffect } from "react";
// import { Lottie } from "@remotion/lottie"; // Use the proper React wrapper

// // Explicitly list all 24 images
// const images = [
//   staticFile("1 (1).jpeg"),
//   staticFile("1 (2).jpeg"),
//   staticFile("1 (3).jpeg"),
//   staticFile("1 (4).jpeg"),
//   staticFile("1 (5).jpeg"),
//   staticFile("1 (6).jpeg"),
//   staticFile("1 (7).jpeg"),
//   staticFile("1 (8).jpeg"),
//   staticFile("1 (9).jpeg"),
//   staticFile("1 (10).jpeg"),
//   staticFile("1 (11).jpeg"),
//   staticFile("1 (12).jpeg"),
//   staticFile("1 (13).jpeg"),
//   staticFile("1 (14).jpeg"),
//   staticFile("1 (15).jpeg"),
//   staticFile("1 (16).jpeg"),
//   staticFile("1 (17).jpeg"),
//   staticFile("1 (18).jpeg"),
//   staticFile("1 (19).jpeg"),
//   staticFile("1 (20).jpeg"),
//   staticFile("1 (21).jpeg"),
//   staticFile("1 (22).jpeg"),
//   staticFile("1 (23).jpeg"),
//   staticFile("1 (24).jpeg"),
//   staticFile("1 (25).jpeg"),
//   staticFile("1 (26).jpeg"),
//   staticFile("1 (27).jpeg"),
// ];

// // Explicitly list all 3 audio files
// const audioFiles = [
//   staticFile("audio1.mp3"),
//   staticFile("audio2.mp3"),
//   staticFile("audio3.mp3"),
// ];

// const YouTube = () => {
//   const frame = useCurrentFrame();
//   const fps = 30;
//   const segmentDurationInFrames = fps * 9; // Duration of one segment in frames (9 seconds)

//   // Calculate the segment index (there are 8 segments in total)
//   const segmentIndex = Math.floor(frame / segmentDurationInFrames);
//   const startFrame = segmentIndex * segmentDurationInFrames;

//   // Calculate the image index based on the current segment and time
//   const imageIndex = Math.floor(
//     ((frame - startFrame) % segmentDurationInFrames) / (fps * 3)
//   );
//   const imageFileIndex = (segmentIndex * 3 + imageIndex) % images.length;

//   // Fade transition for the images (only for the 2nd and 3rd images)
//   const transitionDuration = fps * 0.5;
//   const transitionStartFrame = startFrame + imageIndex * (fps * 3);
//   const opacity =
//     imageIndex === 0
//       ? 1
//       : interpolate(
//           frame,
//           [transitionStartFrame, transitionStartFrame + transitionDuration],
//           [0, 1],
//           { extrapolateRight: "clamp" }
//         );

//   // Audio Logic
//   const audioIndex = segmentIndex % audioFiles.length;

//   const [animationData, setAnimationData] = useState(null);
//   useEffect(() => {
//     fetch(staticFile("subscribe.json"))
//       .then((res) => res.json())
//       .then((data) => setAnimationData(data))
//       .catch((err) => console.error("Failed to load Lottie animation:", err));
//   }, []);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       {/* Background Video */}
//       <Video
//         loop
//         src={staticFile("videoplayback.mp4")}
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           left: 0,
//         }}
//       />

//       {/* Display the current image with transition */}
//       <Img
//         src={images[imageFileIndex]}
//         alt={`Image ${imageFileIndex + 1}`}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           maxWidth: "80%",
//           maxHeight: "80%",
//           objectFit: "contain",
//           opacity,
//         }}
//       />

//       {/* Audio Loop - Using Sequence per segment */}
//       <Sequence from={startFrame} durationInFrames={segmentDurationInFrames}>
//         <Audio src={audioFiles[audioIndex]} volume={0.1} />
//       </Sequence>

//       {/* Lottie Animation at the Bottom */}
//       {animationData && (
//         <Lottie
//           animationData={animationData}
//           loop
//           autoplay
//           style={{
//             position: "absolute",
//             bottom: "100px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "650px",
//             height: "350px",
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default YouTube;
