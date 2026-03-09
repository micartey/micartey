import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface Props {
  startingFrame?: number;
  endingFrame?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
  durration?: number;
  children: React.ReactNode;
}

export const Fade: React.FunctionComponent<Props> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const startFrame = props.startingFrame ?? 0;
  const durration =
    props.endingFrame ??
    Math.max(
      (props.durration ?? durationInFrames) + startFrame,
      durationInFrames,
    );

  const fadeIn = interpolate(
    frame,
    [startFrame, startFrame + (props.fadeInFrames ?? 10)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const fadeOut = interpolate(
    frame,
    [durration - (props.fadeOutFrames ?? 10), durration],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <Sequence from={startFrame} durationInFrames={durration}>
      <AbsoluteFill
        style={{
          opacity:
            frame - startFrame < (durration - startFrame) / 2
              ? fadeIn
              : fadeOut,
        }}
      >
        {props.children}
      </AbsoluteFill>
    </Sequence>
  );
};
