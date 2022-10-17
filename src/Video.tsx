import { AbsoluteFill, Composition } from 'remotion';
import { Flexbox } from './components/Flexbox';
import { H1, H4 } from './components/Headers';
import { Fade } from './effects/Fade';
import { Succession } from './effects/Succession';
import { Transform } from './effects/Transform';
import { FaJava, FaDocker, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiSpring, SiMongodb } from 'react-icons/si';
import { P } from './components/Text';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Intro"
				component={Intro}
				durationInFrames={1000}
				fps={30}
				width={1000}
				height={300}
			/>
		</>
	);
};


export const Intro: React.FunctionComponent = () => {
	return <AbsoluteFill style={{ backgroundColor: '#141414' }}>
		<Transform
			idleFrames={25}
			translateX={-350}
			endingFrame={350}
			scale={.1}
		>
			<Fade>
				<Flexbox>
					<img style={{ border: '2px double white', borderRadius: '50%' }} height="250px" width="250px" src="https://github.com/micartey.png" />
				</Flexbox>
			</Fade>
		</Transform>


		<Fade startingFrame={50} endingFrame={350}>
			<Transform
				idleFrames={20}
				translateY={-70}
			>
				<Flexbox style={{ color: 'white', marginLeft: '60px' }}>
					<H1>micartey</H1>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={90} endingFrame={350}>
			<Transform
				idleFrames={10}
				translateY={100}
			>
				<Flexbox style={{ color: '#999999', marginLeft: '60px' }}>
					<H4>github.com/micartey</H4>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={110} endingFrame={350}>
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

		<Fade startingFrame={350} endingFrame={550}>
			<Transform
				idleFrames={25}
				translateX={-250}
				scale={.1}
			>
				<Fade>
					<Flexbox>
						<img style={{ border: '2px double white', borderRadius: '15px' }} height="80%" src="https://i.imgur.com/WqGBNWx.png" />
					</Flexbox>
				</Fade>
			</Transform>

			<Fade startingFrame={50}>
				<Transform
					idleFrames={20}
					translateY={-70}
				>
					<Flexbox style={{ color: 'white', marginLeft: '220px' }}>
						<H1>nura-vault</H1>
					</Flexbox>
				</Transform>
			</Fade>

			<Fade startingFrame={70}>
				<Succession translateX={520} translateY={135} type={'vertical'}>
					<P>Your free and open source password manager</P>
					<P>  Store your passwords and access them</P>
					<P>           anywere and anytime</P>
				</Succession>
			</Fade>
		</Fade>

		<Fade startingFrame={550} endingFrame={750}>
			<Transform
				idleFrames={25}
				translateX={250}
				scale={.1}
			>
				<Fade>
					<Flexbox>
						<img style={{ border: '2px double white', borderRadius: '15px' }} height="80%" src="https://i.imgur.com/vycmdEq.gif" />
					</Flexbox>
				</Fade>
			</Transform>

			<Fade startingFrame={50}>
				<Transform
					idleFrames={20}
					translateY={-70}
				>
					<Flexbox style={{ color: 'white', marginLeft: '-230px' }}>
						<H1>viro</H1>
					</Flexbox>
				</Transform>
			</Fade>

			<Fade startingFrame={70}>
				<Succession translateX={150} translateY={135} type={'vertical'}>
					<P>A java doodle application</P>
					<P>made for screen sharing</P>
					<P>  and highlighting</P>
				</Succession>
			</Fade>
		</Fade>

		<Fade startingFrame={750} endingFrame={1000}>
			<Transform
				idleFrames={25}
				translateX={-250}
				scale={.1}
			>
				<Fade>
					<Flexbox>
						<img style={{ border: '2px double white', borderRadius: '15px' }} height="70%" src="https://i.imgur.com/ydsHPlx.png" />
					</Flexbox>
				</Fade>
			</Transform>

			<Fade startingFrame={50}>
				<Transform
					idleFrames={20}
					translateY={-70}
				>
					<Flexbox style={{ color: 'white', marginLeft: '220px' }}>
						<H1>yawen</H1>
					</Flexbox>
				</Transform>
			</Fade>

			<Fade startingFrame={70}>
				<Succession translateX={580} translateY={135} type={'vertical'}>
					<P>Dynamic dependency loader</P>
					<P>to keep your java application</P>
					<P>     always up to date</P>
				</Succession>
			</Fade>
		</Fade>

	</AbsoluteFill>
}
