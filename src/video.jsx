import React from "react";
import {
  useCurrentFrame,
  interpolate,
  staticFile,
  Audio,
  Sequence,
  Img,
  Video
} from "remotion";

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
  const blackScreenDuration = fps * 2; // 2 seconds black screen

  // Calculate the segment index (there are 8 segments in total)
  const totalSegmentDuration = segmentDurationInFrames + blackScreenDuration;
  const segmentIndex = Math.floor(frame / totalSegmentDuration);
  const startFrame = segmentIndex * totalSegmentDuration;

  // Determine if the current frame is within the black screen
  const isBlackScreen =
    frame >= startFrame + segmentDurationInFrames &&
    frame < startFrame + totalSegmentDuration;

  // Calculate the image index based on the current segment and time
  const imageIndex = Math.floor(((frame - startFrame) % segmentDurationInFrames) / (fps * 5));
  const imageFileIndex = (segmentIndex * 3 + imageIndex) % images.length;

  // Fade transition for the images (only for the 2nd and 3rd images)
  const transitionDuration = fps * 1;
  const transitionStartFrame = startFrame + imageIndex * (fps * 5);
  const opacity =
    imageIndex === 0 || isBlackScreen
      ? isBlackScreen
        ? 0
        : 1
      : interpolate(
          frame,
          [transitionStartFrame, transitionStartFrame + transitionDuration],
          [0, 1],
          { extrapolateRight: "clamp" }
        );

  // Audio Logic: Replicate Original Behavior
  const audioDurationInFrames = fps * 15;
  const audioIndex = segmentIndex % audioFiles.length;

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

      {/* Black screen */}
      {isBlackScreen && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
        />
      )}

      {/* Display the current image with transition */}
      {!isBlackScreen && (
        <Img
          src={images[imageFileIndex]}
          alt={`Image ${imageFileIndex + 1}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "80%",
            maxHeight: "80%",
            objectFit: "contain",
            opacity,
          }}
        />
      )}

      {/* Audio Loop - Replicating Original Code's Logic */}
      <Sequence from={startFrame} durationInFrames={audioDurationInFrames}>
        <Audio src={audioFiles[audioIndex]} volume={0.1} />
      </Sequence>
    </div>
  );
};

export default YouTube;