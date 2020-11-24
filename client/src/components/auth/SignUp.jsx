import React from 'react';
import {
	Box,
	FormControl,
	Flex,
	Heading,
	Text,
	Stack,
	Input,
	Button,
	keyframes,
	usePrefersReducedMotion
} from '@chakra-ui/react';
import SocialMedia from './SocialMedia';

const show = keyframes`
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}

	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
`;

function SignUp({ isRightPanelActive }) {
	const prefersReducedMotion = usePrefersReducedMotion();
	const animation = prefersReducedMotion ? undefined : `${show} 0.6s`;

	return (
		<Box
			pos='absolute'
			top='0'
			left='0'
			w='50%'
			h='100%'
			opacity={isRightPanelActive ? '1' : '0'}
			zIndex={isRightPanelActive ? '5' : '1'}
			transform={isRightPanelActive ? 'translateX(100%)' : ''}
			animation={isRightPanelActive ? animation : ''}
			transition='all 0.6s ease-in-out'
		>
			<FormControl
				d='flex'
				bgColor='#ffffff'
				p='0 50px'
				h='100%'
				textAlign='center'
			>
				<Flex align='center' justify='center' direction='column'>
					<Heading as='h1' fontWeight='bold' m='0'>
						Do not have an account?
					</Heading>
					<SocialMedia />
					<Text as='span' fontSize='md' mb='10px'>
						or use your email for registration
					</Text>
					<Stack spacing={3} w='100%' mb='10px'>
						<Input type='text' placeholder='Name' />
						<Input type='email' placeholder='Email' />
						<Input type='password' placeholder='Password' />
					</Stack>
					<Button
						borderRadius='20px'
						border='2px solid #f06a63'
						bgColor='#f06a63'
						color='#ffffff'
						fontSize='14px'
						fontWeight='bold'
						p='12px 45px'
						letterSpacing='1px'
						textTransform='uppercase'
						lineHeight='unset'
						transition='transform 80ms ease-in'
						_hover={{ bg: 'transparent', color: '#f06a63' }}
						_active={{ bg: 'transparent' }}
					>
						Sign Up
					</Button>
				</Flex>
			</FormControl>
		</Box>
	);
}

export default SignUp;
