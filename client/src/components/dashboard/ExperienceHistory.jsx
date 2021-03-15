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
	Tooltip,
	VStack,
	Wrap,
	WrapItem
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profileActions';
import NoData from '../common/NoData';
import sortByLatestDate from '../../utils/sortByLatestDate';

const color = {
	subtitle: '#7d848c'
};

function ExperienceHistory({ experiences, deleteExperience }) {
	const dateFormat = 'DD/MM/YYYY';
	const sortedExperiences = sortByLatestDate(experiences);
	const [isOpen, setIsOpen] = useState(false);
	const [currentExpToDelete, setCurrentExpToDelete] = useState({
		id: '',
		title: ''
	});
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();

	const handleDeleteExperience = (expId) => {
		deleteExperience(expId);
	};

	return (
		<Box m='2rem 4rem'>
			<Heading as='h2' size='lg'>
				Experience History
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
							Delete Experience
						</AlertDialogHeader>
						<AlertDialogBody>
							<Text mt='-1rem' mb='0.6rem' color='red.400'>
								{currentExpToDelete.title}
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
								onClick={() => handleDeleteExperience(currentExpToDelete.id)}
								ml={3}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			{sortedExperiences.length > 0 ? (
				<Wrap mt='1.8rem' spacing='2rem'>
					{sortedExperiences.map((experience) => {
						const fromDate = dayjs(experience.from).format(dateFormat);
						const toDate = experience.to
							? dayjs(experience.to).format(dateFormat)
							: 'Now';

						const duration = experience.to
							? dayjs(experience.to).diff(dayjs(experience.from), 'M')
							: dayjs().diff(dayjs(experience.from), 'M');

						return (
							<WrapItem
								key={experience._id}
								w='29rem'
								shadow='sm'
								borderWidth='0.063rem'
								p='0.1rem 1rem 0.6rem 1rem'
								mt='0'
							>
								<Flex justify='space-between' flex='1'>
									<VStack align='stretch' spacing={0} w='100%'>
										<Heading fontSize='lg' lineHeight='2rem'>
											{experience.title}
										</Heading>
										<Text>{experience.company}</Text>
										<HStack spacing='2.9rem'>
											<Text color={`${color.subtitle}`} fontSize='0.9rem'>
												{fromDate} - {toDate}
											</Text>
											<Badge
												variant='subtle'
												colorScheme='blue'
												fontSize='0.9rem'
											>{`${(duration / 12).toFixed(1)} Years`}</Badge>
										</HStack>
									</VStack>
									<Tooltip hasArrow label='Delete Experience'>
										<IconButton
											variant='outline'
											colorScheme='red'
											aria-label='Delete Experience'
											fontSize='1.25rem'
											float='right'
											mt='1.7rem'
											icon={<FaTrashAlt />}
											onClick={() => {
												setCurrentExpToDelete({
													id: experience._id,
													title: experience.title
												});
												setIsOpen(true);
											}}
										/>
									</Tooltip>
								</Flex>
							</WrapItem>
						);
					})}
				</Wrap>
			) : (
				<NoData
					heading='No Experience Data'
					subtitle='Please add your latest experience to list here'
				/>
			)}
		</Box>
	);
}

ExperienceHistory.propTypes = {
	experiences: PropTypes.arrayOf(PropTypes.object).isRequired,
	deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = { deleteExperience };

export default connect(null, mapDispatchToProps)(ExperienceHistory);
