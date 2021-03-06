import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	FormControl,
	FormErrorMessage,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Input,
	useDisclosure,
	Checkbox,
	Textarea
} from '@chakra-ui/react';
import { FaSave, FaStarOfLife, FaUserTie } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux';
import { addNewExperience } from '../../redux/actions/profileActions';
import { clearErrors } from '../../redux/actions/errorActions';
import statusList from '../../data/status';

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

const requiredStarStyles = {
	color: `${color.secondaryColor}`,
	fontSize: '0.4rem'
};

const helperTextStyles = {
	mb: '0.2rem !important',
	mt: '0.8rem !important',
	textAlign: 'left',
	fontSize: 'sm'
};

const inputStyles = {
	pl: '1rem',
	borderRadius: '0.125rem',
	size: 'md',
	mt: '0 !important'
};

const formErrorStyles = {
	fontSize: '0.75rem',
	mt: '0.1rem !important',
	mb: '0 !important',
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
		paddingLeft: '0'
	})
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

function AddExperience({ profile, errors, addNewExperience, clearErrors }) {
	const { title, company, from } = errors;
	const initialRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [experience, setExperience] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		isCurrent: false,
		description: ''
	});

	const handleExperienceSave = (e) => {
		const newExperience = {
			...experience
		};

		addNewExperience(newExperience, onClose);
	};

	const handleOnChange = (e) => {
		setExperience({ ...experience, [e.target.name]: e.target.value });
	};

	const handleTitleChange = (e) => {
		setExperience({ ...experience, title: e.label });
	};

	const handleOnCheckChange = (e) => {
		setExperience({ ...experience, isCurrent: e.target.checked });
	};

	const resetModalOnClose = () => {
		setExperience({
			title: '',
			company: '',
			location: '',
			from: '',
			to: '',
			isCurrent: false,
			description: ''
		});

		if (Object.keys(errors).length > 0) {
			clearErrors();
		}

		onClose();
	};

	return (
		<React.Fragment>
			<Button
				variant='outline'
				colorScheme='blue'
				leftIcon={<FaUserTie />}
				onClick={onOpen}
			>
				Add Experience
			</Button>
			<Modal
				isCentered
				useInert
				size='3xl'
				motionPreset='scale'
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={resetModalOnClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Your Experience</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl
							as='form'
							noValidate
							isInvalid={Object.keys(errors).length !== 0}
						>
							<Stack spacing={3} w='100%'>
								<HStack>
									<FaStarOfLife style={requiredStarStyles} />
									<Text fontSize='sm' color={`${color.linkColor}`}>
										- Required Fields
									</Text>
								</HStack>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>Company offered job title</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<CreatableSelect
									name='title'
									placeholder={<Text>Select Professional Status</Text>}
									options={statusList}
									styles={{
										...statusSelectStyles,
										control: (provided, state) => ({
											...provided,
											borderColor: title
												? `${color.onErrorBorder} !important`
												: '#E2E8F0 !important',
											boxShadow: title
												? `0 0 0 1px ${color.onErrorBorder}`
												: '',
											minHeight: '2.5rem',
											marginTop: '-0.75rem'
										}),
										valueContainer: (provided, state) => ({
											...provided,
											padding: '2px 14px'
										})
									}}
									theme={selectCustomTheme}
									onChange={handleTitleChange}
									ref={initialRef}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{title}
								</FormErrorMessage>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>
										Company name you have worked
									</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<Input
									{...inputStyles}
									type='text'
									name='company'
									placeholder='Company Name'
									value={experience.company}
									onChange={handleOnChange}
									errorBorderColor={
										company ? `${color.onErrorBorder}` : 'grey.300'
									}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{company}
								</FormErrorMessage>
								<Text {...helperTextStyles}>
									Company address or location you have worked
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='location'
									placeholder='Company Location'
									value={experience.location}
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>Work period</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<HStack mt='0 !important'>
									<Input
										{...inputStyles}
										type='date'
										name='from'
										value={experience.from}
										onChange={handleOnChange}
										errorBorderColor={
											from ? `${color.onErrorBorder}` : 'grey.300'
										}
									/>
									<Text fontSize='sm'>To</Text>
									<Input
										{...inputStyles}
										type='date'
										name='to'
										isDisabled={experience.isCurrent}
										value={experience.to}
										onChange={handleOnChange}
										errorBorderColor='grey.300'
									/>
								</HStack>
								<FormErrorMessage {...formErrorStyles}>{from}</FormErrorMessage>
								<Checkbox
									w='13rem'
									defaultIsChecked={experience.isCurrent}
									onChange={handleOnCheckChange}
								>
									<Text fontSize='sm'>I'm currently working here</Text>
								</Checkbox>
								<Text {...helperTextStyles}>
									Provide your job description with some of responsibilities,
									tasks, etc
								</Text>
								<Textarea
									{...inputStyles}
									name='description'
									placeholder='Job Description'
									value={experience.description}
									onChange={handleOnChange}
									errorBorderColor='grey.300'
								/>
							</Stack>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							size='md'
							width='180px'
							ml='80px'
							color={color.white}
							bgColor={color.secondaryColor}
							_hover={{ bg: color.primaryColor }}
							_active={{ bg: color.primaryColor }}
							leftIcon={<FaSave />}
							onClick={handleExperienceSave}
						>
							Save Experience
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addNewExperience: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

const mapDispatchToProps = { addNewExperience, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
