import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Flex,
	Stack,
	Text,
	Heading,
	SimpleGrid,
	Box,
	FormControl,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	Input,
	FormHelperText,
	HStack,
	Textarea,
	Switch,
	InputLeftAddon,
	Button
} from '@chakra-ui/react';
import {
	FaStarOfLife,
	FaFacebookF,
	FaLinkedinIn,
	FaTwitter,
	FaYoutube,
	FaInstagram,
	FaGithub,
	FaSave
} from 'react-icons/fa';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';

import statusList from '../../data/status';
import skillsList from '../../data/skills';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	white: '#ffffff',
	linkColor: '#008cdd',
	primary25: '#e7f5ff',
	primary: '#3182ce',
	neutral20: '#E2E8F0',
	neutral30: '#CBD5E0',
	placeholderColor: '#A0AEC0',
	selectOptionBorderBottom: '#f3f3f3',
	onErrorBorder: '#F56565'
};

const inputLeftStyles = {
	pl: '0',
	pr: '0',
	w: '2.5rem',
	h: '2.5rem',
	fontSize: '10px',
	cursor: 'pointer'
};

const inputStyles = {
	pl: '2rem',
	borderRadius: '0.125rem',
	size: 'md'
};

const helperTextStyles = {
	mb: '0.3rem !important',
	textAlign: 'left'
};

const statusSelectStyles = {
	option: (provided, state) => ({
		...provided,
		fontSize: '0.875rem',
		height: '1.8rem',
		paddingTop: '0.25rem',
		borderBottom: `1px solid ${color.selectOptionBorderBottom}`
	}),
	menu: (provided, state) => ({
		...provided,
		textAlign: 'left',
		borderRadius: '0',
		color: '#494949'
	}),
	placeholder: (base) => ({
		...base,
		fontSize: '1em',
		color: `${color.placeholderColor}`,
		fontWeight: 400,
		paddingLeft: '0.35rem'
	})
};

const requiredStarStyles = {
	color: `${color.secondaryColor}`,
	fontSize: '0.5rem'
};

const formErrorStyles = {
	fontSize: '0.75rem',
	mt: '0.1rem !important',
	mb: '0 !important',
	textAlign: 'left'
};

const selectCustomTheme = (theme) => {
	return {
		...theme,
		borderRadius: '0.125rem',
		colors: {
			...theme.colors,
			primary25: `${color.primary25}`,
			primary: `${color.primary}`,
			neutral20: `${color.neutral20}`,
			neutral30: `${color.neutral30}`
		}
	};
};
function CreateProfile({ profile, errors }) {
	const { handle, status } = errors;
	const animatedComponents = makeAnimated();
	const [profileInfo, setProfileInfo] = useState({
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		bio: '',
		githubusername: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
		github: ''
	});

	const [displaySocialMediaInputs, setDisplaySocialMedia] = useState(false);

	const developerStatus = statusList;
	const developerSkills = skillsList;

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newProfile = {
			...profileInfo
		};

		console.log(newProfile);
	};

	const handleOnChange = (e) => {
		setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
	};

	const handleStatusOnChange = ({ label }, { name }) => {
		setProfileInfo({ ...profileInfo, [name]: label });
	};

	const handleSkillsOnChange = (values, { name }) => {
		const skills = values.map((value) => value.label).join(',');
		setProfileInfo({ ...profileInfo, [name]: skills });
	};

	const handleDisplaySocialMediaInputs = (event) => {
		setDisplaySocialMedia(event.target.checked);
	};

	return (
		<Flex justify='center'>
			<Stack spacing={3} textAlign='center' w='100%' h='100%'>
				<Heading size='2xl'>Create Your Profile</Heading>
				<Text fontSize='xl'>
					Let's get some additional information to make your profile stand out
				</Text>
				<FormControl
					as='form'
					noValidate
					onSubmit={handleOnSubmit}
					isInvalid={Object.keys(errors).length !== 0}
				>
					<SimpleGrid
						columns={2}
						spacing={120}
						p={10}
						borderRadius='md'
						borderWidth='1px'
					>
						<Stack spacing={3} w='100%'>
							<HStack>
								<FaStarOfLife style={requiredStarStyles} />
								<Text fontSize='sm' color={`${color.linkColor}`}>
									- Required Fields
								</Text>
							</HStack>
							<FormHelperText {...helperTextStyles}>
								Unique handle for your profile URL. Can be your full name,
								company name, nickname, etc.
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<InputLeftElement
									{...inputLeftStyles}
									pointerEvents='none'
									children={<FaStarOfLife style={requiredStarStyles} />}
								/>
								<Input
									{...inputStyles}
									type='text'
									name='handle'
									value={profileInfo.handle}
									placeholder='Profile Handle'
									onChange={handleOnChange}
									errorBorderColor={handle ? 'red.400' : 'none'}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{handle}
								</FormErrorMessage>
							</InputGroup>
							<Box mt='0 !important'>
								<FormHelperText {...helperTextStyles}>
									Give us an idea of where you are at in your career
								</FormHelperText>
								<CreatableSelect
									name='status'
									placeholder={
										<HStack>
											<FaStarOfLife style={requiredStarStyles} />
											<Text>Select Professional Status</Text>
										</HStack>
									}
									options={developerStatus}
									styles={{
										...statusSelectStyles,
										control: (provided, state) => ({
											...provided,
											borderColor: status
												? `${color.onErrorBorder} !important`
												: 'none'
										})
									}}
									theme={selectCustomTheme}
									onChange={handleStatusOnChange.bind(this)}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{status}
								</FormErrorMessage>
							</Box>
							<FormHelperText {...helperTextStyles}>
								It could be your own company or one you work for
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<Input
									{...inputStyles}
									type='text'
									name='company'
									value={profileInfo.company}
									placeholder='Company'
									onChange={handleOnChange}
								/>
							</InputGroup>
							<FormHelperText {...helperTextStyles}>
								It could be your own or a company website
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<Input
									{...inputStyles}
									type='text'
									name='website'
									value={profileInfo.website}
									placeholder='Website'
									onChange={handleOnChange}
								/>
							</InputGroup>
							<FormHelperText {...helperTextStyles}>
								City & state, Whatever you are at recently (eg. Colombo,
								Western)
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<Input
									{...inputStyles}
									type='text'
									name='location'
									value={profileInfo.location}
									placeholder='Location'
									onChange={handleOnChange}
								/>
							</InputGroup>
							<FormHelperText {...helperTextStyles}>
								If you want your latest repositories with a Github link, include
								your username here
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<Input
									{...inputStyles}
									type='text'
									name='githubusername'
									value={profileInfo.githubusername}
									placeholder='Github Username'
									onChange={handleOnChange}
								/>
							</InputGroup>
							<FormHelperText {...helperTextStyles}>
								Tell us little bit about yourself
							</FormHelperText>
							<InputGroup mt='0 !important'>
								<Textarea
									{...inputStyles}
									name='bio'
									value={profileInfo.bio}
									placeholder='A short bio about your self'
									onChange={handleOnChange}
								/>
							</InputGroup>
						</Stack>
						<Stack spacing={5} w='100%' mt='1.57rem'>
							<Box>
								<FormHelperText {...helperTextStyles} mb='0.3rem'>
									Select skills that you are most good at. Feel free to add new
									skills which are not in the list.
								</FormHelperText>
								<CreatableSelect
									isMulti
									name='skills'
									placeholder='Skills'
									components={animatedComponents}
									options={developerSkills}
									styles={statusSelectStyles}
									closeMenuOnSelect={false}
									theme={selectCustomTheme}
									onChange={handleSkillsOnChange.bind(this)}
								/>
							</Box>
							<Box display='flex' alignItems='center' mt='0.5rem !important'>
								<FormHelperText {...helperTextStyles} mb='0.8rem' mr='0.8rem'>
									Enable your social media links
								</FormHelperText>
								<Text
									fontSize='sm'
									color={`${color.linkColor}`}
									mb='0.3rem'
									mr='0.8rem'
								>
									(Optional)
								</Text>
								<Switch
									size='lg'
									isChecked={displaySocialMediaInputs}
									onChange={handleDisplaySocialMediaInputs}
								/>
							</Box>
							<Stack
								d={!displaySocialMediaInputs ? 'none' : ''}
								spacing={4}
								mt='1rem !important'
							>
								<InputGroup>
									<InputLeftAddon
										color='#3b5999'
										borderRadius='0.125rem'
										children={<FaFacebookF />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='facebook'
										borderLeftRadius='0'
										value={profileInfo.facebook}
										placeholder='Facebook Page URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon
										color='#0077B5'
										borderRadius='0.125rem'
										children={<FaLinkedinIn />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='linkedin'
										borderLeftRadius='0'
										value={profileInfo.linkedin}
										placeholder='Linkedin Profile URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon
										color='#55acee'
										borderRadius='0.125rem'
										children={<FaTwitter />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='twitter'
										borderLeftRadius='0'
										value={profileInfo.twitter}
										placeholder='Twitter Profile URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon
										color='#e4405f'
										borderRadius='0.125rem'
										children={<FaInstagram />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='instagram'
										borderLeftRadius='0'
										value={profileInfo.instagram}
										placeholder='Instagram Page URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon
										color='#cd201f'
										borderRadius='0.125rem'
										children={<FaYoutube />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='youtube'
										borderLeftRadius='0'
										value={profileInfo.youtube}
										placeholder='Youtube Channel URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
								<InputGroup>
									<InputLeftAddon
										color='#211F1F'
										borderRadius='0.125rem'
										children={<FaGithub />}
									/>
									<Input
										{...inputStyles}
										type='text'
										name='github'
										borderLeftRadius='0'
										value={profileInfo.github}
										placeholder='Github Profile URL'
										onChange={handleOnChange}
									/>
								</InputGroup>
							</Stack>
							<Flex d='flex' justify='flex-end'>
								<Button
									type='submit'
									size='md'
									width='180px'
									ml='80px'
									mt='50px'
									position='fixed'
									bottom='10.5rem'
									color={color.white}
									bgColor={color.secondaryColor}
									_hover={{ bg: color.primaryColor }}
									_active={{ bg: color.primaryColor }}
									rightIcon={<FaSave />}
								>
									Save Info
								</Button>
							</Flex>
						</Stack>
					</SimpleGrid>
				</FormControl>
			</Stack>
		</Flex>
	);
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
