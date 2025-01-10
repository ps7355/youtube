import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Video,
  Audio
} from "remotion";
import React, { useState, useEffect } from "react";

const Riddle = () => {
  const frame = useCurrentFrame();
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(3);

  // --- Hand Movement ---
  const handMove = interpolate(frame, [0, 40], [100, 70], {
    extrapolateRight: "clamp",
    easing: (t) => Math.floor(t * 10) / 10, // Step effect
  });

  // Reduced horizontal shake and rotation
  const shakeX = Math.sin(frame / 15) * 1.5;
  const rotation = Math.sin(frame / 20) * 4;

  // List of hand images
  const handImages = [
    "Hand_01.png",
    "Hand_02.png",
    "Hand_03.png",
    "Hand_04.png",
    "Hand_05.png",
    "Hand_06.png",
    "Hand_07.png",
    "Hand_08.png",
  ];

  // List of paper images
  const paperImages = [
    "paper1.png",
    "paper2.png",
    "paper3.png",
    "paper4.png",
    "paper5.png",
    "paper6.png",
    "paper7.png",
    "paper8.png",
  ];

  let handImageIndex;
  let showPaper = false;
  let paperImageIndex = 0;

  // --- Hand Image Index Logic ---
  if (frame <= 80) {
    handImageIndex = Math.floor(frame / 10);
  } else {
    const loopFrames = frame - 80;
    const loopSequence = [7, 6, 5, 6, 7];
    const framesPerImage = 10;
    const loopIndex = Math.floor(loopFrames / framesPerImage) % loopSequence.length;
    handImageIndex = loopSequence[loopIndex];
  }

  if (handImageIndex < 0 || handImageIndex >= handImages.length || isNaN(handImageIndex)) {
    console.error(`Invalid handImageIndex: ${handImageIndex}`);
    handImageIndex = 0;
  }

  // --- Paper Unfolding Logic ---
  const paperUnfoldStartFrame = 40; // Start when hand reaches image index 4
  const paperUnfoldDuration = 80; // 8 images over 80 frames (10 frames per image)

  if (
    frame >= paperUnfoldStartFrame &&
    frame < paperUnfoldStartFrame + paperUnfoldDuration
  ) {
    showPaper = true;
    paperImageIndex = Math.floor(
      (frame - paperUnfoldStartFrame) / (paperUnfoldDuration / paperImages.length)
    );
  }

  if (paperImageIndex < 0 || paperImageIndex >= paperImages.length) {
    console.error(`Invalid paperImageIndex: ${paperImageIndex}`);
    paperImageIndex = 0;
  }

  // --- Keep Paper 8 Visible ---
  const showPaper8 = frame >= paperUnfoldStartFrame + paperUnfoldDuration;

  // Paper upward movement
  const paperMove = interpolate(
    frame,
    [
      paperUnfoldStartFrame,
      paperUnfoldStartFrame + paperUnfoldDuration,
      paperUnfoldStartFrame + paperUnfoldDuration + 1,
    ],
    [90, 25, 25], // Start even lower at 90%, end at 25%
    { extrapolateRight: "clamp" }
  );

  // --- Typewriter Effect ---
  const riddleText = "What has keys but can't open locks?";
  const answerText = "A Piano!";
  const typingStartFrame = paperUnfoldStartFrame + paperUnfoldDuration; // Typing starts when paper unfolding ends
  const typingDuration = 60; // Duration for typing the riddle
  const textDisplayProgress = interpolate(
    frame,
    [typingStartFrame, typingStartFrame + typingDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const numCharsToShow = Math.floor(textDisplayProgress * riddleText.length);
  const displayedRiddle = riddleText.substring(0, numCharsToShow);

  // --- Timer and Answer Reveal ---
  useEffect(() => {
    if (
      frame === typingStartFrame + typingDuration + 30 &&
      timer > 0
    ) {
      // Start timer 0.5 seconds (30 frames at 60fps) after typing is complete
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 500); // Decrease timer every 0.5 seconds (30 frames)

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setShowAnswer(true);
    }
  }, [frame, timer]);

  // Further reduced scale factor
  const scaleFactor = 1.5; // Reduced from 2

  return (
    <AbsoluteFill>
      {/* Background Video */}
      <Video src={staticFile("back.mp4")} style={{ width: "100%", height: "100%" }} />

      {/* Hand Image (Always visible) */}
      <AbsoluteFill>
        <Img
          src={staticFile(handImages[handImageIndex])}
          style={{
            marginTop: `${handMove}%`,
            transform: `translateX(${shakeX}px) rotate(${rotation}deg)`,
          }}
        />
      </AbsoluteFill>

      {/* Paper Image */}
      {showPaper && (
        <Img
          src={staticFile(paperImages[paperImageIndex])}
          style={{
            position: "absolute",
            left: "50%",
            transform: `translateX(-50%) scale(${scaleFactor})`,
            marginTop: `${paperMove}%`,
            transformOrigin: "bottom",
          }}
        />
      )}

      {/* Paper 8 (Visible after unfolding) */}
      {showPaper8 && (
        <Img
          src={staticFile(paperImages[7])} // paper8.png
          style={{
            position: "absolute",
            left: "50%",
            transform: `translateX(-50%) scale(${scaleFactor})`,
            marginTop: `${paperMove}%`, // Use the final position from paperMove
            transformOrigin: "bottom",
          }}
        />
      )}

      {/* Text Container */}
      {frame >= typingStartFrame && (
        <div
          style={{
            position: "absolute",
            top: "5%", // Adjust vertical position to be above the paper
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "white",
            fontSize: 40,
            fontFamily: "Arial",
            width: "80%",
          }}
        >
          {/* Display the riddle with typewriter effect */}
          {!showAnswer && displayedRiddle}
          {/* Show timer if not showing answer */}
          {!showAnswer &&
            frame >= typingStartFrame + typingDuration + 30 && (
              <div style={{ marginTop: 20 }}>{timer}</div>
            )}
          {/* Show answer after timer */}
          {showAnswer && <div style={{ marginTop: 20 }}>{answerText}</div>}
        </div>
      )}

      {/* Add Audio */}
      <Audio src={staticFile("audio4.mp3")} volume={0.5} />
    </AbsoluteFill>
  );
};

export default Riddle;