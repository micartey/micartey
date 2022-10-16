import { AbsoluteFill, Composition } from 'remotion';
import { Flexbox } from './components/Flexbox';
import { H1, H4 } from './components/Headers';
import { Fade } from './effects/Fade';
import { Succession } from './effects/Succession';
import { Transform } from './effects/Transform';
import { FaJava, FaDocker, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiSpring, SiMongodb } from 'react-icons/si';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Playground"
				component={Playground}
				durationInFrames={500}
				fps={30}
				width={1000}
				height={300}
			/>
		</>
	);
};


export const Playground: React.FunctionComponent = () => {
	return <AbsoluteFill style={{ backgroundColor: '#141414' }}>
		<Transform
			idleFrames={25}
			translateX={-350}
			scale={.1}
		>
			<Fade>
				<Flexbox>
					<img style={{ border: '2px double white', borderRadius: '50%' }} height="250px" width="250px" src="https://github.com/micartey.png" />
				</Flexbox>
			</Fade>
		</Transform>


		<Fade startingFrame={50}>
			<Transform
				idleFrames={20}
				translateY={-70}
			>
				<Flexbox style={{ color: 'white', marginLeft: '60px' }}>
					<H1>micartey</H1>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={90}>
			<Transform
				idleFrames={10}
				translateY={100}
			>
				<Flexbox style={{ color: '#999999', marginLeft: '60px' }}>
					<H4>github.com/micartey</H4>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={110}>
			<Succession translateX={320} translateY={135}>
				<FaDocker size={50} color="white" />
				<FaReact size={50} color="white" />
				<FaNodeJs size={50} color="white" />
				<SiSpring size={50} color="white" />
				<FaJava size={50} color="white" />
				<SiMongodb size={50} color="white" />
				<FaGithub size={50} color="white" />
			</Succession>
		</Fade>

	</AbsoluteFill>
}
