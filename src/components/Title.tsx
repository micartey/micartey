import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import config from '../config.json'

const title: React.CSSProperties = {
	fontFamily: config.fontFamily,
	fontWeight: 'bold',
	textAlign: 'center',
	position: 'absolute',
	width: '100%',
	bottom: '50%'
};

const word: React.CSSProperties = {
	marginLeft: 10,
	marginRight: 10,
	display: 'inline-block',
};

export const Title: React.FC<{
	text: string;
	color: string;
}> = ({text, color}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const words = text.split(' ');

	return (
		<h1 style={title}>
			{words.map((t, i) => {
				const delay = i * 5;

				const scale = spring({
					fps: videoConfig.fps,
					frame: frame - delay,
					config: {
						damping: 200,
					},
				});

				return (
					<span
						key={t}
						style={{
							...word,
							color,
							transform: `scale(${scale})`,
						}}
					>
						{t}
					</span>
				);
			})}
		</h1>
	);
};
