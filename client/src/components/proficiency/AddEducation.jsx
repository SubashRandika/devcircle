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
import { FaSave, FaStarOfLife, FaUserGraduate } from 'react-icons/fa';
import CreatableSelect from 'react-select/creatable';
import { connect } from 'react-redux';
import { addNewEducation } from '../../redux/actions/profileActions';
import { clearErrors } from '../../redux/actions/errorActions';
import degreesList from '../../data/degrees';

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

function AddEducation({ profile, errors, addNewEducation, clearErrors }) {
	const { school, degree, fieldofstudy, from } = errors;
	const initialRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [education, setEducation] = useState({
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		isCurrent: false,
		description: ''
	});

	const handleEducationSave = (e) => {
		const newEducation = {
			...education
		};

		addNewEducation(newEducation, onClose);
	};

	const handleOnChange = (e) => {
		setEducation({ ...education, [e.target.name]: e.target.value });
	};

	const handleDegreeChange = (e) => {
		setEducation({ ...education, degree: e.label });
	};

	const handleOnCheckChange = (e) => {
		setEducation({ ...education, isCurrent: e.target.checked });
	};

	const resetModalOnClose = () => {
		setEducation({
			school: '',
			degree: '',
			fieldofstudy: '',
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
				leftIcon={<FaUserGraduate />}
				onClick={onOpen}
			>
				Add Education
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
					<ModalHeader>Add Your Education</ModalHeader>
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
									<Text {...helperTextStyles}>Place that you studied.</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<Input
									{...inputStyles}
									type='text'
									name='school'
									placeholder='University or College name'
									value={education.school}
									onChange={handleOnChange}
									errorBorderColor={
										school ? `${color.onErrorBorder}` : 'grey.300'
									}
									ref={initialRef}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{school}
								</FormErrorMessage>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>
										Degree or Certificate you received
									</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<CreatableSelect
									name='degree'
									placeholder={<Text>Select Your Degree</Text>}
									options={degreesList}
									styles={{
										...statusSelectStyles,
										control: (provided, state) => ({
											...provided,
											borderColor: degree
												? `${color.onErrorBorder} !important`
												: '#E2E8F0 !important',
											boxShadow: degree
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
									onChange={handleDegreeChange}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{degree}
								</FormErrorMessage>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>Field or area you studied</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<Input
									{...inputStyles}
									type='text'
									name='fieldofstudy'
									placeholder='Field Of Study'
									value={education.fieldofstudy}
									onChange={handleOnChange}
									errorBorderColor={
										fieldofstudy ? `${color.onErrorBorder}` : 'grey.300'
									}
								/>
								<FormErrorMessage {...formErrorStyles}>
									{fieldofstudy}
								</FormErrorMessage>
								<HStack mt='0 !important'>
									<Text {...helperTextStyles}>Period of study</Text>
									<FaStarOfLife style={requiredStarStyles} />
								</HStack>
								<HStack mt='0 !important'>
									<Input
										{...inputStyles}
										type='date'
										name='from'
										value={education.from}
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
										isDisabled={education.isCurrent}
										value={education.to}
										onChange={handleOnChange}
										errorBorderColor='grey.300'
									/>
								</HStack>
								<FormErrorMessage {...formErrorStyles}>{from}</FormErrorMessage>
								<Checkbox
									w='13rem'
									defaultIsChecked={education.isCurrent}
									onChange={handleOnCheckChange}
								>
									<Text fontSize='sm'>I'm currently studying here</Text>
								</Checkbox>
								<Text {...helperTextStyles}>
									Tell us more about your education like subjects and what you
									learned. etc
								</Text>
								<Textarea
									{...inputStyles}
									name='description'
									placeholder='Program Description'
									value={education.description}
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
							onClick={handleEducationSave}
						>
							Save Education
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

AddEducation.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addNewEducation: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

const mapDispatchToProps = { addNewEducation, clearErrors };

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation);
