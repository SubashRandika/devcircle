import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Collapse,
	Flex,
	Heading,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Text
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const color = {
	secondaryText: '#545454',
	commentBorder: '#f1f0f0'
};

dayjs.extend(relativeTime);
function CommentCard({ comment, auth }) {
	const initialFocusRef = useRef();
	const [showCommentText, setShowCommentText] = useState(false);
	const { _id, comment: commentText, name, avatar, user, date } = comment;

	const handleShowLargeComment = () => {
		setShowCommentText(!showCommentText);
	};

	const handleDeleteComment = (commentId) => {
		console.log('Comment Deleted');
	};

	return (
		<Box borderTop={`0.063rem solid ${color.commentBorder}`} p='1rem'>
			<Flex>
				<Avatar mr='1rem' size='sm' name={name} src={avatar} />
				<Box flex='1'>
					<Stack direction='row' spacing={4} mb='0.6rem'>
						<Heading as='h2' fontSize='md'>
							{name}
						</Heading>
						<Text fontSize='xs' color={`${color.secondaryText}`} pt='0.063rem'>
							{dayjs().diff(dayjs(date), 'd') >= 1
								? dayjs(date).format('MMMM D, YYYY h:mm a')
								: dayjs(date).fromNow()}
						</Text>
					</Stack>
					<Collapse startingHeight={20} in={showCommentText}>
						<Text fontSize='0.9rem'>{commentText}</Text>
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
				{user === auth.user.id ? (
					<Popover
						placement='bottom'
						isLazy={true}
						initialFocusRef={initialFocusRef}
					>
						<PopoverTrigger>
							<IconButton
								variant='ghost'
								colorScheme='red'
								aria-label='Options'
								icon={<FaTrashAlt />}
								size='md'
								borderRadius='50%'
								cursor='pointer'
							></IconButton>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader fontWeight='700'>
								Delete Confirmation
							</PopoverHeader>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverBody>
								Are you sure you want to delete this comment?
							</PopoverBody>
							<PopoverFooter d='flex' justifyContent='flex-end'>
								<ButtonGroup size='sm'>
									<Button
										colorScheme='red'
										ref={initialFocusRef}
										onClick={() => handleDeleteComment(_id)}
									>
										Delete
									</Button>
								</ButtonGroup>
							</PopoverFooter>
						</PopoverContent>
					</Popover>
				) : null}
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
