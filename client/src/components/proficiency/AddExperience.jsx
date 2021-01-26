import React from 'react';
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

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	white: '#ffffff',
	linkColor: '#008cdd',
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

function AddExperience() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log('Experience Saved');
	};

	const handleOnChange = (e) => {
		console.log('Input Changed');
	};

	return (
		<React.Fragment>
			<Button
				variant='outline'
				colorScheme='cyan'
				leftIcon={<FaUserTie />}
				onClick={onOpen}
			>
				Add Experience
			</Button>
			<Modal
				isCentered
				size='3xl'
				motionPreset='slideInBottom'
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Your Experience</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl as='form' noValidate onSubmit={handleOnSubmit}>
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
								<Input
									{...inputStyles}
									type='text'
									name='title'
									placeholder='Job Title'
									onChange={handleOnChange}
								/>
								<FormErrorMessage {...formErrorStyles}></FormErrorMessage>
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
									onChange={handleOnChange}
								/>
								<FormErrorMessage {...formErrorStyles}></FormErrorMessage>
								<Text {...helperTextStyles}>
									Company address or location you have worked
								</Text>
								<Input
									{...inputStyles}
									type='text'
									name='location'
									placeholder='Company Location'
									onChange={handleOnChange}
								/>
								<Text {...helperTextStyles}>Work period</Text>
								<HStack mt='0 !important'>
									<Input
										{...inputStyles}
										type='date'
										name='from'
										onChange={handleOnChange}
									/>
									<Text fontSize='sm'>To</Text>
									<Input
										{...inputStyles}
										type='date'
										name='to'
										onChange={handleOnChange}
									/>
								</HStack>
								<Checkbox w='13rem'>
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
									onChange={handleOnChange}
								/>
							</Stack>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button
							type='submit'
							size='md'
							width='180px'
							ml='80px'
							color={color.white}
							bgColor={color.primaryColor}
							_hover={{ bg: color.primaryColor }}
							_active={{ bg: color.primaryColor }}
							leftIcon={<FaSave />}
						>
							Save Experience
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

export default AddExperience;
