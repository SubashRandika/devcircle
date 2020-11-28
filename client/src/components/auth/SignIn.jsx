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
	Link as ForgotPassword
} from '@chakra-ui/react';
import SocialMedia from './SocialMedia';

const color = {
	primaryColor: '#414f7a',
	white: '#ffffff',
	linkColor: '#008cdd'
};

function SignIn({ isRightPanelActive }) {
	return (
		<Box
			pos='absolute'
			top='0'
			left='0'
			w='50%'
			h='100%'
			opacity={isRightPanelActive ? '0' : '1'}
			zIndex={isRightPanelActive ? '-1' : '5'}
			transition='all 0.6s ease-in-out'
			transform={isRightPanelActive ? 'translateX(100%)' : ''}
		>
			<FormControl
				as='form'
				d='flex'
				bgColor={color.white}
				p='0 50px'
				h='100%'
				textAlign='center'
			>
				<Flex align='center' justify='center' direction='column'>
					<Heading as='h1' fontWeight='bold' m='0'>
						Already have an account?
					</Heading>
					<SocialMedia />
					<Text as='span' fontSize='md' mb='10px'>
						or use your account
					</Text>
					<Stack spacing={3} w='100%' mb='10px'>
						<Input type='email' placeholder='Email' />
						<Input type='password' placeholder='Password' />
					</Stack>
					<ForgotPassword
						href='#'
						fontSize='16px'
						mb='20px'
						_hover={{ textDecoration: 'none', color: `${color.linkColor}` }}
					>
						Forgot your password?
					</ForgotPassword>
					<Button
						borderRadius='20px'
						border={`2px solid ${color.primaryColor}`}
						bgColor={color.primaryColor}
						color={color.white}
						fontSize='14px'
						fontWeight='bold'
						p='12px 45px'
						letterSpacing='1px'
						lineHeight='unset'
						textTransform='uppercase'
						transition='transform 80ms ease-in'
						_hover={{ bg: 'transparent', color: `${color.primaryColor}` }}
						_active={{ bg: 'transparent' }}
					>
						Sign In
					</Button>
				</Flex>
			</FormControl>
		</Box>
	);
}

export default SignIn;