import { AbsoluteFill, Composition } from 'remotion';
import { Flexbox } from './components/Flexbox';
import { H1, H2, H4 } from './components/Headers';
import { Fade } from './effects/Fade';
import { Succession } from './effects/Succession';
import { Transform } from './effects/Transform';
import { FaJava, FaDocker, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { IoGitCommit } from 'react-icons/io5';
import { SiSpring, SiMongodb } from 'react-icons/si';
import { GoIssueClosed } from 'react-icons/go';
import { MdPublish } from 'react-icons/md';
import { P } from './components/Text';
import { getActivityByUsername } from './endpoints/GitHubAPI';
import { GitActivity } from './entities';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import React from 'react';

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

let getFormattedDate = (timestamp: number) => {
	var date = new Date(timestamp);
	var months = ['Jan', 'Febr', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'];
	var year = date.getFullYear();
	var month = months[date.getMonth()];
	var day = date.getDate();
	return day + ' ' + month + ', ' + year;
};

export const Intro: React.FunctionComponent = () => {

	const [activities, setActivities] = React.useState<GitActivity[] | undefined>()

	React.useEffect(() => {
		getActivityByUsername('micartey').then((activities) => {
			setActivities(activities)
		})
	}, [])

	return <AbsoluteFill style={{ backgroundColor: '#141414' }}>
		<Transform
			startingFrame={25}
			idleFrames={25}
			translateX={-350}
			endingFrame={325}
			scale={.1}
		>
			<Fade>
				<Flexbox>
					<img style={{ border: '2px double white', borderRadius: '50%' }} height="250px" width="250px" src="https://github.com/micartey.png" />
				</Flexbox>
			</Fade>
		</Transform>

		<Transform
			idleFrames={20}
			translateY={-120}
			translateX={400}
			endingFrame={350}
			scale={.35}
		>
			<Flexbox style={{ color: '#f1f1f1' }}>
				<H1>{getFormattedDate(Date.now())}</H1>
			</Flexbox>
		</Transform>

		<Fade startingFrame={75} endingFrame={350}>
			<Transform
				idleFrames={20}
				translateY={-70}
			>
				<Flexbox style={{ color: 'white', marginLeft: '60px' }}>
					<H1>micartey</H1>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={110} endingFrame={350}>
			<Transform
				idleFrames={10}
				translateY={100}
			>
				<Flexbox style={{ color: '#999999', marginLeft: '60px' }}>
					<H4>github.com/micartey</H4>
				</Flexbox>
			</Transform>
		</Fade>

		<Fade startingFrame={130} endingFrame={350}>
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
					<Flexbox style={{ color: 'white', marginLeft: '200px' }}>
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
					<Flexbox style={{ color: 'white', marginLeft: '-250px' }}>
						<H1>viro</H1>
					</Flexbox>
				</Transform>
			</Fade>

			<Fade startingFrame={70}>
				<Succession translateX={150} translateY={135} type={'vertical'}>
					<P>A java doodle application</P>
					<P>made for screen sharing</P>
					<P>   and highlighting</P>
				</Succession>
			</Fade>
		</Fade>

		<Fade startingFrame={750} endingFrame={1000} fadeInFrames={30}>
			<Flexbox style={{ color: 'white', marginLeft: '-330px', marginTop: '20px' }}>
				<img style={{ border: '2px double white', borderRadius: '50%' }} height="100px" width="100px" src="https://github.com/micartey.png" />
				<H2 style={{ marginLeft: '20px' }}>Latest Activity</H2>
			</Flexbox>
			<Flexbox style={{ color: 'white', alignItems: 'normal' }}>
				<Timeline>
					{
						activities?.map(activity => {
							return <TimelineItem>
								<TimelineOppositeContent color="#666666">
									{getFormattedDate(Date.parse(activity.created_at))}
								</TimelineOppositeContent>
								<TimelineSeparator>
									{
										{
											"PushEvent": <IoGitCommit size={30} />,
											"IssuesEvent": <GoIssueClosed size={30} />,
											"IssueCommentEvent": <GoIssueClosed size={30} />,
											"ReleaseEvent": <MdPublish size={30} />,
										}[activity.type] || <TimelineDot />
									}
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>{activity.repo.name}</TimelineContent>
							</TimelineItem>
						})
					}
				</Timeline>
			</Flexbox>
		</Fade>

	</AbsoluteFill>
}
