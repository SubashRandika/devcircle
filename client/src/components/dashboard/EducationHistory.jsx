import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profileActions';
import NoData from './NoData';

const color = {
	subtitle: '#7d848c'
};

function EducationHistory({ educations, deleteEducation }) {
	const dateFormat = 'DD/MM/YYYY';
	const sortedEducations = educations.sort(
		(edu1, edu2) => new Date(edu2.from) - new Date(edu1.from)
	);
	const [isOpen, setIsOpen] = useState(false);
	const [currentEduToDelete, setCurrentEduToDelete] = useState({
		id: '',
		school: ''
	});
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();

	const handleDeleteEducation = (eduId) => {
		deleteEducation(eduId);
	};

	return (
		<Box m='2rem 4rem'>
			<Heading as='h2' size='lg'>
				Education History
			</Heading>
			<Divider />
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				motionPreset='slideInBottom'
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='xl' fontWeight='bold'>
							Delete Education
						</AlertDialogHeader>
						<AlertDialogBody>
							<Text mt='-1rem' mb='0.6rem' color='red.400'>
								{currentEduToDelete.school}
							</Text>
							Are you sure, do you want to delete? You can't undo this once
							deleted.
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={() => handleDeleteEducation(currentEduToDelete.id)}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			{sortedEducations.length > 0 ? (
				<Wrap mt='1.8rem' spacing='2rem'>
					{sortedEducations.map((education) => {
						const fromDate = dayjs(education.from).format(dateFormat);
						const toDate = education.to
							? dayjs(education.to).format(dateFormat)
							: 'Now';

						const duration = education.to
							? dayjs(education.to).diff(dayjs(education.from), 'M')
							: dayjs().diff(dayjs(education.from), 'M');

						return (
							<WrapItem
								key={education._id}
								w='29rem'
								shadow='sm'
								borderWidth='0.063rem'
								p='0.1rem 1rem 0.6rem 1rem'
								mt='0'
							>
								<Flex justify='space-between' flex='1'>
									<VStack align='stretch' spacing={0}>
										<Heading fontSize='lg' lineHeight='2rem'>
											{education.school}
										</Heading>
										<Text>
											{education.degree} in {education.fieldofstudy}
										</Text>
										<HStack spacing='2.5rem'>
											<Text color={`${color.subtitle}`} fontSize='0.9rem'>
												{fromDate} - {toDate}
											</Text>
											<Badge
												variant='subtle'
												colorScheme='cyan'
												fontSize='0.9rem'
											>{`${Math.floor(duration / 12)} Years`}</Badge>
										</HStack>
									</VStack>
									<IconButton
										variant='outline'
										colorScheme='red'
										aria-label='Delete Education'
										fontSize='1.25rem'
										float='right'
										mt='1.7rem'
										icon={<FaTrashAlt />}
										onClick={() => {
											setCurrentEduToDelete({
												id: education._id,
												school: education.school
											});
											setIsOpen(true);
										}}
									/>
								</Flex>
							</WrapItem>
						);
					})}
				</Wrap>
			) : (
				<NoData
					heading='No Education Data'
					subtitle='Please add your latest education to list here'
				/>
			)}
		</Box>
	);
}

EducationHistory.propTypes = {
	educations: PropTypes.arrayOf(PropTypes.object).isRequired,
	deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = { deleteEducation };

export default connect(null, mapDispatchToProps)(EducationHistory);
