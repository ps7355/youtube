import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring } from "remotion";
import React, { useState, useEffect } from 'react';

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

  // List of images
  const images = [
    "Hand_01.png",
    "Hand_02.png",
    "Hand_03.png",
    "Hand_04.png",
    "Hand_05.png",
    "Hand_06.png",
    "Hand_07.png",
    "Hand_08.png",
  ];

  let imageIndex;

  if (frame <= 80) {
    imageIndex = Math.floor(frame / 10);
  } else {
    const loopFrames = frame - 80;
    const loopSequence = [7, 6, 5, 6, 7];
    const framesPerImage = 10;
    const loopIndex = Math.floor(loopFrames / framesPerImage) % loopSequence.length;
    imageIndex = loopSequence[loopIndex];
  }

  if (imageIndex < 0 || imageIndex >= images.length || isNaN(imageIndex)) {
    console.error(`Invalid imageIndex: ${imageIndex}`);
    imageIndex = 0;
  }

  // --- Div Opening Animation (Adjusted for Higher Position) ---

  const openingStartFrame = 30;
  const openingDuration = 60;

  const openingProgress = interpolate(
    frame,
    [openingStartFrame, openingStartFrame + openingDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const widthProgress = spring({
    fps: 60,
    frame: frame - openingStartFrame,
    config: {
      damping: 20,
      stiffness: 100,
      mass: 0.5
    },
    durationInFrames: openingDuration
  })

  const divWidth = interpolate(widthProgress, [0, 1], [0, 0.9]);

  // --- Typewriter Effect ---
  const riddleText = "What has keys but can't open locks?";
  const answerText = "A Piano!";
  const typingDuration = 60; // Duration for typing the riddle
  const textDisplayProgress = interpolate(
    frame,
    [openingStartFrame + openingDuration, openingStartFrame + openingDuration + typingDuration],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const numCharsToShow = Math.floor(textDisplayProgress * riddleText.length);
  const displayedRiddle = riddleText.substring(0, numCharsToShow);

  // --- Timer and Answer Reveal ---
  useEffect(() => {
    if (frame === openingStartFrame + openingDuration + typingDuration + 30 && timer > 0) { // Start timer 0.5 seconds (30 frames at 60fps) after typing is complete
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 500); // Decrease timer every 0.5 seconds (30 frames)

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setShowAnswer(true);
    }
  }, [frame, timer]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#00FF85" }}>
      {/* Opening Div */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: `${divWidth * 100}%`,
          height: "50%",
          backgroundColor: "#38003D",
          marginLeft: `${(1 - divWidth) / 2 * 100}%`,
          marginTop: "15%" // Adjusted position to be higher
        }}
      >
        {/* Riddle & Answer Text Container */}
        <div
          style={{
            opacity: openingProgress,
            textAlign: "center",
            color: "white",
            fontSize: 40,
            fontFamily: "Arial",
            padding: 20,
            width: "100%"
          }}
        >
          {/* Display the riddle with typewriter effect */}
          {!showAnswer && displayedRiddle}
          {/* Show timer if not showing answer */}
          {!showAnswer && frame >= openingStartFrame + openingDuration + typingDuration + 30 && (
            <div style={{ marginTop: 20 }}>{timer}</div>
          )}
          {/* Show answer after timer */}
          {showAnswer && <div style={{ marginTop: 20 }}>{answerText}</div>}
        </div>
      </AbsoluteFill>

      {/* Hand Image */}
      <Img
        src={staticFile(images[imageIndex])}
        style={{
          marginTop: `${handMove}%`,
          transform: `translateX(${shakeX}px) rotate(${rotation}deg)`,
        }}
      />
    </AbsoluteFill>
  );
};

export default Riddle;