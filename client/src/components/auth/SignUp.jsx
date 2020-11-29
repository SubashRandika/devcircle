import React, { useState } from 'react';
import {
	Box,
	FormControl,
	Flex,
	Heading,
	Text,
	Stack,
	InputGroup,
	Input,
	InputRightElement,
	Tooltip,
	Button,
	keyframes,
	usePrefersReducedMotion
} from '@chakra-ui/react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import SocialMedia from './SocialMedia';

const color = {
	secondaryColor: '#f06a63',
	white: '#ffffff'
};

const inputRightStyles = {
	pl: '0',
	pr: '0',
	w: '2rem',
	h: '2rem',
	cursor: 'pointer'
};

const show = keyframes`
	0%, 49.99% {
		opacity: 0;
		z-index: -1;
	}

	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
`;

function SignUp({ isRightPanelActive }) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [signUp, setSignUp] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const animation = prefersReducedMotion ? undefined : `${show} 0.6s`;

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	const handleOnChange = (e) => {
		setSignUp({ ...signUp, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			...signUp
		};

		console.log(newUser);
	};

	return (
		<Box
			pos='absolute'
			top='0'
			left='0'
			w='50%'
			h='100%'
			opacity={isRightPanelActive ? '1' : '0'}
			zIndex={isRightPanelActive ? '5' : '-1'}
			transform={isRightPanelActive ? 'translateX(100%)' : ''}
			animation={isRightPanelActive ? animation : ''}
			transition='all 0.6s ease-in-out'
		>
			<FormControl
				as='form'
				d='flex'
				bgColor={color.white}
				p='0 50px'
				h='100%'
				textAlign='center'
				onSubmit={handleOnSubmit}
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
						<Input
							size='sm'
							type='text'
							name='name'
							value={signUp.name}
							placeholder='Name'
							onChange={handleOnChange}
						/>
						<InputGroup>
							<Tooltip
								hasArrow
								placement='top'
								label='This site uses Gravatar. If you want a profile image, use your Gravatar email here.'
								aria-label='Email info tooltip'
							>
								<Input
									size='sm'
									type='email'
									name='email'
									value={signUp.email}
									placeholder='Email'
									onChange={handleOnChange}
								/>
							</Tooltip>
						</InputGroup>
						<InputGroup>
							<Input
								size='sm'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={signUp.password}
								placeholder='Password'
								onChange={handleOnChange}
							/>
							<InputRightElement
								{...inputRightStyles}
								onClick={handleShowPassword}
								children={showPassword ? <FaEye /> : <FaEyeSlash />}
							/>
						</InputGroup>
						<InputGroup>
							<Input
								size='sm'
								type={showConfirmPassword ? 'text' : 'password'}
								name='confirmPassword'
								value={signUp.confirmPassword}
								placeholder='Confirm Password'
								onChange={handleOnChange}
							/>
							<InputRightElement
								{...inputRightStyles}
								onClick={handleShowConfirmPassword}
								children={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
							/>
						</InputGroup>
					</Stack>
					<Button
						type='submit'
						borderRadius='20px'
						border={`2px solid ${color.secondaryColor}`}
						bgColor={color.secondaryColor}
						color={color.white}
						fontSize='14px'
						fontWeight='bold'
						p='12px 45px'
						letterSpacing='1px'
						textTransform='uppercase'
						lineHeight='unset'
						transition='transform 80ms ease-in'
						_hover={{ bg: 'transparent', color: `${color.secondaryColor}` }}
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
