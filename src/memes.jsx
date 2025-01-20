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

// Data structure to hold images
const mediaFiles = [
  { type: "image", src: staticFile("1.jpeg") },
  { type: "image", src: staticFile("2.jpeg") },
  { type: "image", src: staticFile("3.jpeg") },
  { type: "image", src: staticFile("4.jpeg") },
  { type: "image", src: staticFile("5.jpeg") },
  { type: "image", src: staticFile("6.jpeg") },
  { type: "image", src: staticFile("7.jpeg") },
  { type: "image", src: staticFile("8.jpeg") },
  { type: "image", src: staticFile("9.jpeg") },
  { type: "image", src: staticFile("10.jpeg") },
  { type: "image", src: staticFile("11.jpeg") },
  { type: "image", src: staticFile("12.jpeg") },

];

// Audio files
const audioFiles = [
  staticFile("audio1.mp3"),
  staticFile("audio2.mp3"),
  staticFile("audio3.mp3"),

];

const YouTube = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const segmentDurationInFrames = fps * 9;

  // Calculate indices for images
  const segmentIndex = Math.floor(frame / segmentDurationInFrames);
  const startFrame = segmentIndex * segmentDurationInFrames;
  const topMediaIndex = (segmentIndex * 2) % mediaFiles.length;
  const bottomMediaIndex = (segmentIndex * 2 + 1) % mediaFiles.length;

  const topMedia = mediaFiles[topMediaIndex];
  const bottomMedia = mediaFiles[bottomMediaIndex];

  // Fade transition for images
  const transitionDuration = fps * 0.5;
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + transitionDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // Audio Logic
  const audioIndex = segmentIndex % audioFiles.length;

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

      {/* Container for Images */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Increased container width
          height: "85%", // Increased container height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Image */}
        <Img
          src={topMedia.src}
          alt={`Top Image ${topMediaIndex + 1}`}
          style={{
            width: "100%",
            height: "47.5%", // Equal height for top and bottom images
            objectFit: "contain",
            opacity,
          }}
        />

        {/* Bottom Image */}
        <Img
          src={bottomMedia.src}
          alt={`Bottom Image ${bottomMediaIndex + 1}`}
          style={{
            width: "100%",
            height: "47.5%", // Equal height for top and bottom images
            objectFit: "contain",
            opacity,
          }}
        />
      </div>

      {/* Audio Loop */}
      <Sequence from={startFrame} durationInFrames={segmentDurationInFrames}>
        <Audio src={audioFiles[audioIndex]} volume={0.4} />
      </Sequence>

      {/* Lottie Animation */}
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{
            position: "absolute",
            marginTop: "-8.5%",
            top: "3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "650px",
            height: "350px",
          }}
        />
      )}
    </div>
  );
};

export default YouTube;




















































































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
// import { Lottie } from "@remotion/lottie";

// // Data structure to hold both images and videos
// const mediaFiles = [
//   { type: "image", src: staticFile("1 (1).jpeg") },
//   { type: "image", src: staticFile("1 (2).jpeg") },
//   { type: "image", src: staticFile("1 (3).jpeg") },
//   { type: "image", src: staticFile("1 (4).jpeg") },
//   { type: "image", src: staticFile("1 (5).jpeg") },
//   { type: "video", src: staticFile("video1.mp4") }, // Video 1
//   { type: "image", src: staticFile("1 (7).jpeg") },
//   { type: "image", src: staticFile("1 (8).jpeg") },
//   { type: "image", src: staticFile("1 (9).jpeg") },
//   { type: "image", src: staticFile("1 (10).jpeg") },
//   { type: "video", src: staticFile("video2.mp4") }, // Video 2
//   { type: "image", src: staticFile("1 (12).jpeg") },
//   { type: "image", src: staticFile("1 (13).jpeg") },
//   { type: "image", src: staticFile("1 (14).jpeg") },
//   { type: "image", src: staticFile("1 (15).jpeg") },
//   { type: "video", src: staticFile("video3.mp4") }, // Video 3
//   { type: "image", src: staticFile("1 (16).jpeg") },
//   { type: "image", src: staticFile("1 (17).jpeg") },
//   { type: "image", src: staticFile("1 (18).jpeg") },
//   { type: "image", src: staticFile("1 (19).jpeg") },
//   { type: "video", src: staticFile("video4.mp4") }, // Video 4
//   { type: "image", src: staticFile("1 (20).jpeg") },
//   { type: "image", src: staticFile("1 (21).jpeg") },
//   { type: "image", src: staticFile("1 (22).jpg") },
//   { type: "image", src: staticFile("1 (23).jpg") },
//   { type: "video", src: staticFile("video5.mp4") }, // Video 5
//   { type: "image", src: staticFile("1 (24).jpg") },
//   { type: "image", src: staticFile("1 (25).jpg") },
//   { type: "image", src: staticFile("1 (26).jpg") },
//   { type: "image", src: staticFile("1 (27).jpg") },
//   { type: "video", src: staticFile("video6.mp4") }, // Video 6
//   { type: "image", src: staticFile("1 (28).jpg") },
//   { type: "image", src: staticFile("1 (29).jpg") },
//   { type: "image", src: staticFile("1 (30).jpg") },
  
// ];

// // Explicitly list all 3 audio files
// const audioFiles = [
//   staticFile("audio1.mp3"),
//   staticFile("audio2.mp3"),
//   staticFile("audio3.mp3"),
//   staticFile("audio4.mp3"),
//   staticFile("audio5.mp3")
// ];

// const YouTube = () => {
//   const frame = useCurrentFrame();
//   const fps = 30;
//   const segmentDurationInFrames = fps * 9; // Duration of one segment in frames (9 seconds)

//   // Calculate the segment index (there are 8 segments in total)
//   const segmentIndex = Math.floor(frame / segmentDurationInFrames);
//   const startFrame = segmentIndex * segmentDurationInFrames;

//   // Calculate the media file indices for top and bottom
//   const topMediaIndex = (segmentIndex * 2) % mediaFiles.length;
//   const bottomMediaIndex = (segmentIndex * 2 + 1) % mediaFiles.length;

//   // Get the media objects for the top and bottom
//   const topMedia = mediaFiles[topMediaIndex];
//   const bottomMedia = mediaFiles[bottomMediaIndex];

//   // Fade transition (only for images, not videos)
//   const transitionDuration = fps * 0.5;
//   const opacity =
//     segmentIndex === 0 ||
//     topMedia.type === "video" ||
//     bottomMedia.type === "video"
//       ? 1
//       : interpolate(
//           frame,
//           [startFrame, startFrame + transitionDuration],
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

//       {/* Container for Media (Images or Videos) */}
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "95%",
//           height: "80%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* Top Media (Image or Video) */}
//         {topMedia.type === "image" ? (
//           <Img
//             src={topMedia.src}
//             alt={`Top Image ${topMediaIndex + 1}`}
//             style={{
//               width: "100%",
//               maxHeight: "45%",
//               objectFit: "contain",
//               opacity,
//               transform: "scale(1.1)",
//             }}
//           />
//         ) : (
//           <Video
//             src={topMedia.src}
//             style={{
//               width: "100%",
//               maxHeight: "45%",
//               objectFit: "contain",
//               transform: "scale(1.1)",
//             }}
//             muted 
//             loop
//           />
//         )}

//         {/* Bottom Media (Image or Video) */}
//         {bottomMedia.type === "image" ? (
//           <Img
//             src={bottomMedia.src}
//             alt={`Bottom Image ${bottomMediaIndex + 1}`}
//             style={{
//               width: "100%",
//               maxHeight: "45%",
//               objectFit: "contain",
//               opacity,
//               transform: "scale(1.1)",
//             }}
//           />
//         ) : (
//           <Video
//             src={bottomMedia.src}
//             style={{
//               width: "100%",
//               maxHeight: "45%",
//               objectFit: "contain",
//               transform: "scale(1.1)",
//             }}
//             muted 
//             loop
//           />
//         )}
//       </div>

//       {/* Audio Loop */}
//       <Sequence from={startFrame} durationInFrames={segmentDurationInFrames}>
//         <Audio src={audioFiles[audioIndex]} volume={0.4} />
//       </Sequence>

//       {/* Lottie Animation */}
//       {animationData && (
//         <Lottie
//           animationData={animationData}
//           loop
//           autoplay
//           style={{
//             position: "absolute",
//             marginTop: "-8.5%",
//             top: "3px",
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