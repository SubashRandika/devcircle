import React from 'react';
import {
	Flex,
	Box,
	Text,
	Button,
	HStack,
	Heading,
	Fade,
	SlideFade
} from '@chakra-ui/react';
import { ReactComponent as NoProfileImage } from '../../assets/profile_setup.svg';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	secondaryText: '#1A202C',
	white: '#ffffff'
};

function NoProfile({ name }) {
	return (
		<Flex mt='10rem' justify='center' align='center'>
			<Fade in={true}>
				<NoProfileImage />
			</Fade>
			<Box ml='2rem'>
				<SlideFade in={true} offsetX='-50%'>
					<HStack mb={8} spacing='20px'>
						<Heading as='h1' size='2xl'>
							Welcome
						</Heading>
						<Heading as='h1' size='2xl' color={color.primaryColor}>
							{name}
						</Heading>
					</HStack>
					<Text fontSize='xl' color={color.secondaryText}>
						You have not created your profile yet,
					</Text>
					<Text fontSize='xl' color={color.secondaryText}>
						Please add some extra information about you
					</Text>
					<Button
						size='lg'
						mt='24px'
						bg='linear-gradient(to left bottom, #414f7a, #71558c, #a5568e, #d25a7f, #f06a63)'
						color={color.white}
						transition='all 0.2s ease-in-out'
						_hover={{
							bg: `linear-gradient(to left bottom, #a5568e, #d25a7f, #f06a63)`
						}}
						_active={{
							bg: `linear-gradient(to left bottom, #a5568e, #d25a7f, #f06a63)`
						}}
					>
						Create a Profile
					</Button>
				</SlideFade>
			</Box>
		</Flex>
	);
}

export default NoProfile;
