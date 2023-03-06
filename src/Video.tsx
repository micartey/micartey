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
import { P } from './components/Text';
import { getActivityByUsername } from './endpoints/GitHubAPI';
import ReactFrappeChart from "react-frappe-charts";
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
				durationInFrames={800}
				fps={30}
				width={1000}
				height={300}
			/>
		</>
	);
};

let getFormattedDate = (timestamp: number) => {
	var date = new Date(timestamp);
	var months = ['Jan', 'Febr', 'March', 'April', 'Mai', 'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dec'];
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
				scale={.2}
				translateY={80}
			>
				<ReactFrappeChart
					type="percentage"
					colors={["#21ba45"]}
					height={150}
					data={{
						labels: ["Java", "TypeScript", "C#", "Dockerfile", "C++", "Rust"],
						datasets: [{ values: [53, 32, 8, 5, 1, 1] }],
					}}
				/>
			</Transform>
		</Fade>

		<Fade startingFrame={550} endingFrame={800} fadeInFrames={30}>
			<Flexbox style={{ color: 'white', marginLeft: '-330px', marginTop: '20px' }}>
				<img style={{ border: '2px double white', borderRadius: '50%' }} height="100px" width="100px" src="https://github.com/micartey.png" />
				<H2 style={{ marginLeft: '20px' }}>Latest Activity</H2>
			</Flexbox>
			<Flexbox style={{ color: 'white', alignItems: 'normal' }}>
				<Timeline>
					{
						activities?.filter(activity => activity.payload.commits).map(activity => {
							return activity.payload.commits!!.map(commit => {
								return <TimelineItem>
									<TimelineOppositeContent color="#666666">
										{getFormattedDate(Date.parse(activity.created_at))}
									</TimelineOppositeContent>
									<TimelineSeparator>
										{
											{
												"PushEvent": <IoGitCommit size={35} />,
											}[activity.type] || <TimelineDot />
										}
										<TimelineConnector />
									</TimelineSeparator>
									<TimelineContent>
										{commit.message} <br />
										<div style={{ color: '#d0d0d0' }}>{activity.repo.name}</div>
									</TimelineContent>
								</TimelineItem>
							})
						})
					}
					{
						activities?.filter(activity => activity.payload.issue).map(activity => {
							return <TimelineItem>
								<TimelineOppositeContent color="#666666">
									{getFormattedDate(Date.parse(activity.created_at))}
								</TimelineOppositeContent>
								<TimelineSeparator>
									{
										{
											"IssuesEvent": <GoIssueClosed size={35} />,
											"IssueCommentEvent": <GoIssueClosed size={35} />,
										}[activity.type] || <TimelineDot />
									}
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent>
									{activity.payload.issue?.title} <br />
									<div style={{ color: '#d0d0d0' }}>{activity.repo.name}</div>
								</TimelineContent>
							</TimelineItem>
						})
					}
				</Timeline>
			</Flexbox>
		</Fade>

	</AbsoluteFill>
}
