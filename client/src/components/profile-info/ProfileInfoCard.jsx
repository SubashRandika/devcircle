import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Flex,
	Heading,
	HStack,
	Link,
	Text,
	VStack,
	IconButton
} from '@chakra-ui/react';
import {
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaYoutube
} from 'react-icons/fa';

const color = {
	white: '#ffffff',
	cardBg: '#F7FAFC',
	secondaryText: '#545353',
	facebook: '#3b5999',
	linkedin: '#0077B5',
	twitter: '#55acee',
	github: '#211F1F',
	instagram: '#e4405f',
	youtube: '#cd201f'
};

function ProfileInfoCard({ currentProfile }) {
	const { user, status, company, website, location, social } = currentProfile;
	const { facebook, linkedin, twitter, github, instagram, youtube } = social;

	return (
		<Flex w='24rem' justify='center' bg={color.cardBg}>
			<Box w='100%' h='20.625rem' boxShadow='xs'>
				<Box
					display='flex'
					justifyContent='center'
					w='100%'
					h='6.875rem'
					bgGradient='linear(to-l, #f06a63, #d25a7f, #a5568e, #71558c, #414f7a)'
				>
					<Avatar
						size='2xl'
						name={user.name}
						src={user.avatar}
						mt='2rem'
						bg={color.white}
						p='0.313rem'
					/>
				</Box>
				<VStack spacing='1' display='flex' justifyContent='center' mt='4rem'>
					<Heading as='h2' size='md'>
						{user.name}
					</Heading>
					<HStack>
						<Text fontSize='sm' fontWeight='600'>
							{`${status} @ `}
							<Link
								color='blue.500'
								href={website}
								isExternal={true}
								_focus={{
									outline: 'none'
								}}
							>
								{company}
							</Link>
						</Text>
					</HStack>
					<Text fontSize='sm' color={color.secondaryText}>
						{location}
					</Text>
					<HStack spacing='2' mt='1rem !important'>
						{facebook ? (
							<Link href={facebook} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='Facebook Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.facebook}
									icon={<FaFacebookF />}
									_hover={{
										bg: `${color.facebook}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
						{linkedin ? (
							<Link href={linkedin} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='LinkedIn Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.linkedin}
									icon={<FaLinkedinIn />}
									_hover={{
										bg: `${color.linkedin}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
						{twitter ? (
							<Link href={twitter} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='Twitter Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.twitter}
									icon={<FaTwitter />}
									_hover={{
										bg: `${color.twitter}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
						{github ? (
							<Link href={github} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='Github Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.github}
									icon={<FaGithub />}
									_hover={{
										bg: `${color.github}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
						{instagram ? (
							<Link href={instagram} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='Instagram Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.instagram}
									icon={<FaInstagram />}
									_hover={{
										bg: `${color.instagram}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
						{youtube ? (
							<Link href={youtube} isExternal>
								<IconButton
									display='flex'
									variant='unstyled'
									aria-label='Youtube Icon'
									fontSize='1.5rem'
									size='sm'
									color={color.youtube}
									icon={<FaYoutube />}
									_hover={{
										bg: `${color.youtube}`,
										color: '#ffffff',
										transition: '0.3'
									}}
								/>
							</Link>
						) : null}
					</HStack>
				</VStack>
			</Box>
		</Flex>
	);
}

ProfileInfoCard.propTypes = {
	currentProfile: PropTypes.object.isRequired
};

export default ProfileInfoCard;
