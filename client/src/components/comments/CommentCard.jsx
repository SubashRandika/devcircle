import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Button,
	Collapse,
	Flex,
	Heading,
	IconButton,
	Stack,
	Text,
	Tooltip
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';

const color = {
	secondaryText: '#545454',
	commentBorder: '#f1f0f0'
};

function CommentCard({ comment, auth }) {
	const [showCommentText, setShowCommentText] = useState(false);

	const handleShowLargeComment = () => {
		setShowCommentText(!showCommentText);
	};

	return (
		<Box borderTop={`0.063rem solid ${color.commentBorder}`} p='1rem'>
			<Flex>
				<Avatar
					mr='1rem'
					size='sm'
					name='Dan Abrahmov'
					src='https://bit.ly/dan-abramov'
				/>
				<Box flex='1'>
					<Stack direction='row' spacing={4} mb='0.6rem'>
						<Heading as='h2' fontSize='md'>
							Dan Abrahmov
						</Heading>
						<Text fontSize='xs' color={`${color.secondaryText}`} pt='0.063rem'>
							3 min ago
						</Text>
					</Stack>
					<Collapse startingHeight={20} in={showCommentText}>
						<Text fontSize='0.9rem'>
							Anim pariatur cliche reprehenderit, enim eiusmod high life
							accusamus terry richardson ad squid. Nihil anim keffiyeh
							helvetica, craft beer labore wes anderson cred nesciunt sapiente
							ea proident. lorem
						</Text>
					</Collapse>
					<Button
						fontSize='0.8rem'
						colorScheme='linkedin'
						variant='link'
						onClick={handleShowLargeComment}
						mt='0.5rem'
					>
						Show {showCommentText ? 'Less' : 'More'}
					</Button>
				</Box>
				<Tooltip
					label='Delete comment'
					placement='left-start'
					aria-label='Delete post'
				>
					<IconButton
						variant='ghost'
						colorScheme='red'
						aria-label='Options'
						icon={<FaTrashAlt />}
						size='md'
						borderRadius='50%'
						cursor='pointer'
					></IconButton>
				</Tooltip>
			</Flex>
		</Box>
	);
}

CommentCard.propTypes = {
	comment: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(CommentCard);
