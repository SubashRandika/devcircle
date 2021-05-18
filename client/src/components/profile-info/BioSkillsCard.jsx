import React from 'react';
import PropTypes from 'prop-types';
import {
	Badge,
	Divider,
	Flex,
	Heading,
	Text,
	Wrap,
	WrapItem
} from '@chakra-ui/react';

const color = {
	white: '#ffffff',
	cardBg: '#F7FAFC',
	primaryColor: '#414f7a'
};

function BioSkillsCard({ name, bio, skills }) {
	return (
		<Flex
			direction='column'
			w='24rem'
			mt='1.5rem'
			p='1rem'
			bg={color.cardBg}
			boxShadow='xs'
		>
			<Heading as='h2' size='md' alignSelf='center' mt='0.5rem'>{`${
				name.split(' ')[0]
			}'s Bio`}</Heading>
			<Text fontSize='md' p='1.2rem 0' textAlign='center'>
				{bio}
			</Text>
			<Divider />
			<Heading as='h2' size='md' alignSelf='center' m='1.5rem 0'>
				Tech Skills
			</Heading>
			<Wrap d='flex'>
				{skills.map((skill, index) => (
					<WrapItem key={index}>
						<Badge
							fontSize='1rem'
							bg={color.primaryColor}
							color={color.white}
							borderRadius='full'
							p='0.15rem 0.9rem'
						>
							{skill}
						</Badge>
					</WrapItem>
				))}
			</Wrap>
		</Flex>
	);
}

BioSkillsCard.propTypes = {
	name: PropTypes.string.isRequired,
	bio: PropTypes.string.isRequired,
	skills: PropTypes.array.isRequired
};

export default BioSkillsCard;
