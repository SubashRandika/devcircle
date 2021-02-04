import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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
	Input,
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
import {
	createUpdateProfile,
	getCurrentProfile
} from '../../redux/actions/profileActions';
import useDeepEffect from '../custom-hooks/useDeepEffect';

import statusList from '../../data/status';
import skillsList from '../../data/skills';
import Loading from '../common/Loading';

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

const inputStyles = {
	pl: '1rem',
	borderRadius: '0.125rem',
	size: 'md',
	mt: '0 !important'
};

const helperTextStyles = {
	mb: '0.2rem !important',
	mt: '0.8rem !important',
	textAlign: 'left',
	fontSize: 'sm'
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
		paddingLeft: '0'
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
function UpdateProfile({
	profile,
	errors,
	createUpdateProfile,
	getCurrentProfile
}) {
	const { currentProfile, loading } = profile;
	const { handle, status, skills } = errors;
	const animatedComponents = makeAnimated();
	const [profileInfo, setProfileInfo] = useState({
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: [],
		bio: '',
		githubusername: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
		github: ''
	});
	const history = useHistory();

	const [displaySocialMediaInputs, setDisplaySocialMedia] = useState(false);

	const developerStatus = statusList;
	const developerSkills = skillsList;

	useDeepEffect(() => {
		if (currentProfile) {
			setProfileInfo({
				handle: currentProfile?.handle,
				company: currentProfile?.company,
				website: currentProfile?.website,
				location: currentProfile?.location,
				status: currentProfile?.status,
				skills: currentProfile?.skills,
				bio: currentProfile?.bio,
				githubusername: currentProfile?.githubusername,
				youtube: currentProfile?.social?.youtube,
				twitter: currentProfile?.social?.twitter,
				facebook: currentProfile?.social?.facebook,
				linkedin: currentProfile?.social?.linkedin,
				instagram: currentProfile?.social?.instagram,
				github: currentProfile?.social?.github
			});
		} else {
			getCurrentProfile();
		}
	}, [getCurrentProfile, currentProfile]);

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const updatedProfile = {
			...profileInfo
		};

		createUpdateProfile(updatedProfile, history);
	};

	const handleOnChange = (e) => {
		setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
	};

	const handleStatusOnChange = (e) => {
		setProfileInfo({ ...profileInfo, status: e.label });
	};

	const handleSkillsOnChange = (skills) => {
		setProfileInfo({
			...profileInfo,
			skills: skills.map((obj) => obj.label)
		});
	};

	const handleDisplaySocialMediaInputs = (event) => {
		setDisplaySocialMedia(event.target.checked);
	};

	const getStatusObject = (status) => {
		return developerStatus.find((obj) => obj.label === status);
	};

	const getSkillsArray = (skills) => {
		const skillsObjArray = [];

		if (skills?.length > 0) {
			skills.forEach((skill) => {
				skillsObjArray.push(developerSkills.find((obj) => obj.label === skill));
			});
		}

		return skillsObjArray;
	};

	return (
		<Flex justify='center'>
			{loading && !currentProfile ? (
				<Loading color={color.primaryColor} text='Loading...' />
			) : (
				<Stack spacing={3} textAlign='center' w='100%' h='100%'>
					<Heading size='2xl'>Update Your Profile</Heading>
					<Text fontSize='xl'>
						Give us some additional information to make your profile complete
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
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>
										Unique handle for your profile URL. Can be your full name,
										company name, nickname, etc.
									</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<Input
									{...inputStyles}
									type='text'
									name='handle'
									value={profileInfo.handle || ''}
									placeholder='Profile Handle'
									onChange={handleOnChange}
									errorBorderColor={handle ? 'red.400' : 'none'}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{handle}
								</FormErrorMessage>
								<Box mt='0 !important'>
									<HStack>
										<Text {...helperTextStyles}>
											Give us an idea of where you are at in your career
										</Text>
										<FaStarOfLife style={requiredStarStyles} />
									</HStack>
									<CreatableSelect
										name='status'
										placeholder={<Text>Select Professional Status</Text>}
										value={getStatusObject(profileInfo.status)}
										options={developerStatus}
										styles={{
											...statusSelectStyles,
											control: (provided, state) => ({
												...provided,
												borderColor: status
													? `${color.onErrorBorder} !important`
													: '#E2E8F0 !important',
												boxShadow: status
													? `0 0 0 1px ${color.onErrorBorder}`
													: ''
											}),
											valueContainer: (provided, state) => ({
												...provided,
												padding: '2px 14px'
											})
										}}
										theme={selectCustomTheme}
										onChange={handleStatusOnChange}
									/>
								</Box>
								<FormErrorMessage {...formErrorStyles}>
									{status}
								</FormErrorMessage>
								<Text {...helperTextStyles}>
									It could be your own company or one you work for
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='company'
									value={profileInfo.company || ''}
									placeholder='Company'
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
								<Text {...helperTextStyles}>
									It could be your own or a company website
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='website'
									value={profileInfo.website || ''}
									placeholder='Website'
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
								<Text {...helperTextStyles}>
									City & state, Whatever you are at recently (eg. Colombo,
									Western)
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='location'
									value={profileInfo.location || ''}
									placeholder='Location'
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
								<Text fontSize='sm' {...helperTextStyles}>
									If you want your latest repositories with a Github link,
									include your username here
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='githubusername'
									value={profileInfo.githubusername || ''}
									placeholder='Github Username'
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
								<Text {...helperTextStyles}>
									Tell us little bit about yourself
								</Text>
								<Textarea
									{...inputStyles}
									name='bio'
									value={profileInfo.bio || ''}
									placeholder='A short bio about your self'
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
							</Stack>
							<Stack spacing={5} w='100%' mt='1.57rem'>
								<Box>
									<HStack>
										<Text {...helperTextStyles} mb='0.1rem' mt='0.56rem'>
											Select skills that you are most good at. Feel free to add
											new skills which are not in the list.
										</Text>
										<FaStarOfLife style={requiredStarStyles} />
									</HStack>
									<CreatableSelect
										isMulti
										name='skills'
										placeholder='Skills'
										components={animatedComponents}
										options={developerSkills}
										value={getSkillsArray(profileInfo.skills)}
										styles={{
											...statusSelectStyles,
											control: (provided, state) => ({
												...provided,
												borderColor: skills
													? `${color.onErrorBorder} !important`
													: '#E2E8F0 !important',
												boxShadow: status
													? `0 0 0 1px ${color.onErrorBorder}`
													: ''
											})
										}}
										closeMenuOnSelect={false}
										theme={selectCustomTheme}
										onChange={handleSkillsOnChange}
									/>
									<FormErrorMessage {...formErrorStyles}>
										{skills}
									</FormErrorMessage>
								</Box>
								<Box display='flex' alignItems='center' mt='1rem !important'>
									<Text {...helperTextStyles} mb='0.8rem' mr='0.8rem'>
										Enable your social media links
									</Text>
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
											value={profileInfo.facebook || ''}
											placeholder='Facebook Page URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
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
											value={profileInfo.linkedin || ''}
											placeholder='Linkedin Profile URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
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
											value={profileInfo.twitter || ''}
											placeholder='Twitter Profile URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
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
											value={profileInfo.instagram || ''}
											placeholder='Instagram Page URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
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
											value={profileInfo.youtube || ''}
											placeholder='Youtube Channel URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
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
											value={profileInfo.github || ''}
											placeholder='Github Profile URL'
											onChange={handleOnChange}
											errorBorderColor='grey.300'
										/>
									</InputGroup>
								</Stack>
								<Flex d='flex' justify='flex-end'>
									<Link to='/dashboard'>
										<Button w='7.5rem'>Cancel</Button>
									</Link>
									<Button
										type='submit'
										size='md'
										width='11.25rem'
										ml='1.125rem'
										color={color.white}
										bgColor={color.secondaryColor}
										_hover={{ bg: color.primaryColor }}
										_active={{ bg: color.primaryColor }}
										leftIcon={<FaSave />}
									>
										Save Info
									</Button>
								</Flex>
							</Stack>
						</SimpleGrid>
					</FormControl>
				</Stack>
			)}
		</Flex>
	);
}

UpdateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createUpdateProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

const mapDispatchToProps = { getCurrentProfile, createUpdateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
