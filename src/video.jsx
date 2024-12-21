import React from "react";
import { useCurrentFrame, interpolate, OffthreadVideo, staticFile, Audio, Sequence } from "remotion";
import { Img } from "remotion";
import { Video } from "remotion";
// Explicitly list all 24 images
const images = [
  staticFile("1 (1).jpeg"),
  staticFile("1 (2).jpeg"),
  staticFile("1 (3).jpeg"),
  staticFile("1 (4).jpeg"),
  staticFile("1 (5).jpeg"),
  staticFile("1 (6).jpeg"),
  staticFile("1 (7).jpeg"),
  staticFile("1 (8).jpeg"),
  staticFile("1 (9).jpeg"),
  staticFile("1 (10).jpeg"),
  staticFile("1 (11).jpeg"),
  staticFile("1 (12).jpeg"),
  staticFile("1 (13).jpeg"),
  staticFile("1 (14).jpeg"),
  staticFile("1 (15).jpeg"),
  staticFile("1 (16).jpeg"),
  staticFile("1 (17).jpeg"),
  staticFile("1 (18).jpeg"),
  staticFile("1 (19).jpeg"),
  staticFile("1 (20).jpeg"),
  staticFile("1 (21).jpeg"),
  staticFile("1 (22).jpeg"),
  staticFile("1 (23).jpeg"),
  staticFile("1 (24).jpeg"),
];

// Explicitly list all 3 audio files
const audioFiles = [
  staticFile("audio1.mp3"),
  staticFile("audio2.mp3"),
  staticFile("audio3.mp3"),
];

const YouTube = () => {
  const frame = useCurrentFrame();
  const fps = 30;
  const segmentDurationInFrames = fps * 15; // Duration of one segment in frames (15 seconds)
  const gapDurationInFrames = fps * 1; // 1 second gap duration

  // Calculate the segment index (there are 8 segments in total)
  const segmentIndex = Math.floor(frame / (segmentDurationInFrames + gapDurationInFrames)); // Including the gap
  const startFrame = segmentIndex * (segmentDurationInFrames + gapDurationInFrames); // Starting frame for the current segment

  // Calculate the image index based on the current segment and time
  const imageIndex = Math.floor((frame - startFrame) / (fps * 5)) % 3; // 3 images per segment, each lasts for 5 seconds
  const imageFileIndex = segmentIndex * 3 + imageIndex; // Adjust for the correct image in the entire sequence

  // Fade transition for the images (only for the 2nd and 3rd images)
  const transitionDuration = fps * 1; // 1-second fade transition
  const transitionStartFrame = startFrame + imageIndex * (fps * 5); // Transition start frame
  const opacity =
    imageIndex === 0
      ? 1 // No transition for the first image
      : interpolate(
          frame,
          [transitionStartFrame, transitionStartFrame + transitionDuration],
          [0, 1],
          { extrapolateRight: "clamp" }
        );

  // Loop through audio files (each audio lasts 15 seconds)
  const audioDurationInFrames = fps * 15; // 15 seconds of audio
  const audioIndex = segmentIndex % audioFiles.length; // Loop through audio files

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

      {/* Display the current image with transition */}
      <Img
        src={images[imageFileIndex]} // Dynamically display the current image
        alt={`Image ${imageFileIndex + 1}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // Centers the image
          maxWidth: "80%", // Adjust the size of the image
          maxHeight: "80%", // Ensure it fits well within the video
          objectFit: "contain", // Maintain aspect ratio
          opacity, // Apply transition only for 2nd and 3rd images
        }}
      />

      {/* Loop through audio files (15 seconds each) */}
      <Sequence
        from={startFrame}
        durationInFrames={audioDurationInFrames}
      >
        <Audio src={audioFiles[audioIndex]} volume={0.1} />
      </Sequence>
    </div>
  );
};

export default YouTube;
