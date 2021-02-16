import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Badge,
	Box,
	Button,
	Heading,
	HStack,
	Stack,
	Text,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const color = {
	primaryColor: '#414f7a',
	cardBg: '#f9f9f9',
	secondaryColor: '#f06a63',
	secondaryHover: '#fd4b42',
	white: '#ffffff'
};

function ProfileCard({ profile }) {
	const { user, status, company, location, skills, handle } = profile;

	return (
		<WrapItem>
			<Box
				w='30rem'
				borderWidth='1px'
				borderRadius='sm'
				p='1rem'
				bg={color.cardBg}
			>
				<HStack>
					<Avatar size='2xl' name={user.name} mr='1rem' src={user.avatar} />
					<Stack>
						<Heading as='h2' size='lg' fontSize='1.5rem'>
							{user.name}
						</Heading>
						<Text fontSize='md'>{`${status} at ${company}`}</Text>
						<Text fontSize='sm'>{location}</Text>
						<Link to={`/profile/${handle}`}>
							<Button
								size='sm'
								w='8rem'
								bg={color.secondaryColor}
								color={color.white}
								_hover={{
									bg: `${color.secondaryHover}`
								}}
								_active={{
									bg: `${color.secondaryHover}`
								}}
							>
								See Profile
							</Button>
						</Link>
					</Stack>
				</HStack>
				<Box mt='1rem'>
					<Heading as='h2' size='md'>
						Skills Set
					</Heading>
					<Wrap mt='1rem'>
						{skills.map((skill, index) => (
							<WrapItem key={index}>
								<Badge
									fontSize='0.9rem'
									bg={color.primaryColor}
									color={color.white}
									p='0.1rem 0.9rem'
								>
									{skill}
								</Badge>
							</WrapItem>
						))}
					</Wrap>
				</Box>
			</Box>
		</WrapItem>
	);
}

ProfileCard.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileCard;
