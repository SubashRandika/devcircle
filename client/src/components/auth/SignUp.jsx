import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	Box,
	FormControl,
	FormErrorMessage,
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
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
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

const formErrorStyles = {
	fontSize: '0.75rem',
	mt: '0.1rem !important',
	mb: '0 !important',
	textAlign: 'left'
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

function SignUp({
	isRightPanelActive,
	registerUser,
	auth: { loading },
	errors
}) {
	const { name, email, password, confirmPassword } = errors;
	let history = useHistory();
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

		registerUser(newUser, history);
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
				noValidate
				as='form'
				d='flex'
				bgColor={color.white}
				p='0 50px'
				h='100%'
				textAlign='center'
				onSubmit={handleOnSubmit}
				isInvalid={Object.keys(errors).length !== 0}
			>
				<Flex align='center' justify='center' direction='column'>
					<Heading as='h1' fontWeight='bold' m='0'>
						Do not have an account?
					</Heading>
					<SocialMedia />
					<Text as='span' fontSize='md' mb='10px'>
						or use your email for registration
					</Text>
					<Stack spacing={3} w='100%' mb='20px'>
						<Input
							size='sm'
							type='text'
							name='name'
							value={signUp.name}
							placeholder='Name'
							onChange={handleOnChange}
							errorBorderColor={name ? 'red.400' : 'none'}
						/>
						<FormErrorMessage {...formErrorStyles}>{name}</FormErrorMessage>
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
									errorBorderColor={email ? 'red.400' : 'none'}
								/>
							</Tooltip>
						</InputGroup>
						<FormErrorMessage {...formErrorStyles}>{email}</FormErrorMessage>
						<InputGroup>
							<Input
								size='sm'
								type={showPassword ? 'text' : 'password'}
								name='password'
								value={signUp.password}
								placeholder='Password'
								onChange={handleOnChange}
								errorBorderColor={password ? 'red.400' : 'none'}
							/>
							<InputRightElement
								{...inputRightStyles}
								onClick={handleShowPassword}
								children={showPassword ? <FaEye /> : <FaEyeSlash />}
							/>
						</InputGroup>
						<FormErrorMessage {...formErrorStyles}>{password}</FormErrorMessage>
						<InputGroup>
							<Input
								size='sm'
								type={showConfirmPassword ? 'text' : 'password'}
								name='confirmPassword'
								value={signUp.confirmPassword}
								placeholder='Confirm Password'
								onChange={handleOnChange}
								errorBorderColor={confirmPassword ? 'red.400' : 'none'}
							/>
							<InputRightElement
								{...inputRightStyles}
								onClick={handleShowConfirmPassword}
								children={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
							/>
						</InputGroup>
						<FormErrorMessage {...formErrorStyles}>
							{confirmPassword}
						</FormErrorMessage>
					</Stack>
					<Button
						type='submit'
						isLoading={loading}
						loadingText='Signing Up'
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

SignUp.propTypes = {
	isRightPanelActive: PropTypes.bool.isRequired,
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = { registerUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
