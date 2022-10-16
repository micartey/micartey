import React from 'react';
import styled from 'styled-components';
import { spring } from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

interface Props {
	startingFrame?: number
	durration?: number
	idleFrames?: number
	translateX?: number
	translateY?: number
	scale?: number
	children: React.ReactNode
}

export const Transform: React.FunctionComponent<Props> = (props) => {

	const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();
    const durration = props.durration ?? durationInFrames

	// Animate from 0 to 1 after startingFrame frames
	const translationProgress = spring({
		frame: frame - (props.startingFrame ?? 0) - (props.idleFrames ?? 0),
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the child x pixels once the transition starts
	const translationX = interpolate(
		translationProgress,
		[0, 1],
		[0, props.translateX ?? 0]
	);

	const translationY = interpolate(
		translationProgress,
		[0, 1],
		[0, props.translateY ?? 0]
	);

	const scale = interpolate(
		translationProgress,
		[0, 1],
		[0, props.scale ?? 0]
	);


	return <Sequence from={props.startingFrame ?? 0} durationInFrames={durration}>
		<AbsoluteFill style={{ transform: `translate(${translationX}px, ${translationY}px) scale(${1 - scale})` }}>
			{props.children}
		</AbsoluteFill>
	</Sequence>
}