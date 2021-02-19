import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Heading, Text } from '@chakra-ui/react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import {
	VerticalTimeline,
	VerticalTimelineElement
} from 'react-vertical-timeline-component';
import dayjs from 'dayjs';
import sortByLatestDate from '../../utils/sortByLatestDate';
import 'react-vertical-timeline-component/style.min.css';
import './ProficiencyTimeline.style.css';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	expCardBg: '#F7FAFC',
	eduCardBg: '#f9efef',
	white: '#ffffff',
	textColor: '#000000',
	company: '#2b6cb0',
	location: '#4c4c4c',
	degree: '#9a0115'
};

function ProficiencyTimeline({ experience, education }) {
	const sortedExperiences = sortByLatestDate(experience);
	const sortedEducations = sortByLatestDate(education);

	return (
		<VerticalTimeline className='timeline__wrapper'>
			{sortedExperiences.map((exp) => (
				<VerticalTimelineElement
					key={exp._id}
					className='vertical-timeline-element--work'
					contentStyle={{
						background: `${color.expCardBg}`,
						color: `${color.textColor}`,
						padding: '1.1rem',
						boxShadow: `0 3px 0 ${color.primaryColor}`
					}}
					contentArrowStyle={{ borderRight: `7px solid ${color.expCardBg}` }}
					iconStyle={{
						background: `${color.primaryColor}`,
						color: `${color.white}`,
						boxShadow:
							'0 0 0 4px rgb(185 227 251), inset 0 2px 0 rgb(0 0 0 / 8%), 0 3px 0 4px rgb(0 0 0 / 5%)'
					}}
					date={`${dayjs(exp.from).format('YYYY-MMM')} - ${
						exp.isCurrent ? 'Present' : dayjs(exp.to).format('YYYY-MMM')
					}`}
					icon={<FaBriefcase />}
				>
					<Heading as='h2' size='md'>
						{exp.title}
					</Heading>
					<Text
						fontSize='md'
						fontWeight='700 !important'
						mt='0.6rem !important'
						color={`${color.company}`}
					>
						{exp.company}
					</Text>
					<Text
						fontSize='0.875rem !important'
						mt='0 !important'
						mb='0.5rem !important'
						color={`${color.location}`}
					>
						{exp.location}
					</Text>
					<Divider />
					<Text fontSize='0.9rem !important' mt='1rem !important'>
						{exp.description}
					</Text>
				</VerticalTimelineElement>
			))}
			{sortedEducations.map((edu) => (
				<VerticalTimelineElement
					key={edu._id}
					className='vertical-timeline-element--education'
					contentStyle={{
						background: `${color.eduCardBg}`,
						color: `${color.textColor}`,
						padding: '1.1rem',
						boxShadow: `0 3px 0 ${color.secondaryColor}`
					}}
					contentArrowStyle={{ borderRight: `7px solid ${color.eduCardBg}` }}
					iconStyle={{
						background: `${color.secondaryColor}`,
						color: `${color.white}`,
						boxShadow:
							'0 0 0 4px rgb(243 200 200), inset 0 2px 0 rgb(0 0 0 / 8%), 0 3px 0 4px rgb(0 0 0 / 5%)'
					}}
					date={`${dayjs(edu.from).format('YYYY-MMM')} - ${
						edu.isCurrent ? 'Present' : dayjs(edu.to).format('YYYY-MMM')
					}`}
					icon={<FaGraduationCap />}
				>
					<Heading as='h2' size='md'>
						{edu.school}
					</Heading>
					<Text
						fontSize='md'
						fontWeight='700 !important'
						mt='0.6rem !important'
						color={`${color.degree}`}
					>
						{edu.degree}
					</Text>
					<Text
						fontSize='0.875rem !important'
						mt='0 !important'
						mb='0.5rem !important'
						color={`${color.location}`}
					>
						{edu.fieldofstudy}
					</Text>
					<Divider />
					<Text fontSize='0.9rem !important' mt='1rem !important'>
						{edu.description}
					</Text>
				</VerticalTimelineElement>
			))}
		</VerticalTimeline>
	);
}

ProficiencyTimeline.propTypes = {
	experience: PropTypes.arrayOf(PropTypes.object).isRequired,
	education: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProficiencyTimeline;
