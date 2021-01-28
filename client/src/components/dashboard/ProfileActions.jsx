import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	VStack
} from '@chakra-ui/react';
import { FaUserEdit, FaTrashAlt } from 'react-icons/fa';
import AddExperience from '../proficiency/AddExperience';
import AddEducation from '../proficiency/AddEducation';

const color = {
	secondaryColor: '#f06a63',
	linkColor: '#008cdd'
};

function ProfileActions({ name, profile, deleteAccount }) {
	const [isOpen, setIsOpen] = useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = useRef();

	return (
		<Box m='0 4rem'>
			<VStack mb={8} spacing='10px'>
				<Heading as='h1' size='xl'>
					Dashboard
				</Heading>
				<HStack>
					<Heading as='h2' size='md' color={color.secondaryText}>
						Welcome
					</Heading>
					<Heading as='h2' size='md' color={color.linkColor}>
						<Link to={`/profile/${profile.handle}`}>{name}</Link>
					</Heading>
				</HStack>
			</VStack>
			<Flex justify='space-between'>
				<HStack>
					<Link to='/update-profile'>
						<Button
							variant='outline'
							colorScheme='blue'
							leftIcon={<FaUserEdit />}
						>
							Edit Profile
						</Button>
					</Link>
					<AddExperience />
					<AddEducation />
				</HStack>
				<Button
					variant='solid'
					colorScheme='red'
					leftIcon={<FaTrashAlt />}
					onClick={() => setIsOpen(true)}
				>
					Delete My Account
				</Button>
			</Flex>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Account
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can't undo or restore your account afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='red' onClick={() => deleteAccount()} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
}

ProfileActions.propTypes = {
	name: PropTypes.string.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

export default ProfileActions;
