import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Button,
	Collapse,
	Flex,
	Heading,
	List,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import { FaRegComment, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { likePost, dislikePost } from '../../redux/actions/postActions';
import FeedCardBody from './FeedCardBody';
import AddCommentForm from '../comments/AddCommentForm';
import CommentCard from '../comments/CommentCard';

const color = {
	secondaryText: '#545454',
	commentsBg: '#F7FAFC'
};

dayjs.extend(relativeTime);
function FeedCard({ auth, post, likePost, dislikePost }) {
	const { id } = auth.user;
	const [showComments, setShowComments] = useState(false);
	const { _id, likes, comments } = post;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleToggleComments = () => {
		setShowComments(!showComments);
	};

	const handleLikeUnlikeClick = () => {
		if (isSignInUserLiked()) {
			dislikePost(_id);
		} else {
			likePost(_id);
		}
	};

	const isSignInUserLiked = () => {
		return post.likes.find((like) => like.user === id) ? true : false;
	};

	return (
		<React.Fragment>
			<Box p={5} shadow='md' borderWidth='1px' mb='1rem'>
				<FeedCardBody post={post} />
				<Box mt='1rem'>
					<Flex justify='space-between' align='center' mb='0.9rem'>
						<Box>
							<Button
								colorScheme={isSignInUserLiked() ? 'blackAlpha' : 'linkedin'}
								size='sm'
								variant='ghost'
								leftIcon={
									isSignInUserLiked() ? (
										<FaRegThumbsDown fontSize='1rem' />
									) : (
										<FaRegThumbsUp fontSize='1rem' />
									)
								}
								onClick={handleLikeUnlikeClick}
							>
								{isSignInUserLiked() ? 'Dislike' : 'Like'}
							</Button>
							<Button
								ml='1rem'
								colorScheme='teal'
								size='sm'
								variant='ghost'
								leftIcon={<FaRegComment fontSize='1rem' />}
								onClick={handleToggleComments}
							>
								Comment
							</Button>
						</Box>
						<Flex pt='0.7rem'>
							<Text fontSize='sm' color={`${color.secondaryText}`}>
								{likes.length}
								{likes.length > 0 ? (
									<Button
										colorScheme='linkedin'
										variant='link'
										onClick={onOpen}
									>
										likes
									</Button>
								) : (
									' likes'
								)}
							</Text>
							<Text ml='1rem' fontSize='sm' color={`${color.secondaryText}`}>
								{comments.length} comments
							</Text>
							{likes.length > 0 ? (
								<Modal
									onClose={onClose}
									isOpen={isOpen}
									isCentered
									motionPreset='scale'
									scrollBehavior='inside'
								>
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>Likes</ModalHeader>
										<ModalCloseButton />
										<ModalBody mb='1rem'>
											<List spacing={3}>
												{likes.map((like) => (
													<ListItem key={like._id}>
														<Flex>
															<Avatar
																w='2.6rem'
																h='2.6rem'
																name={like.name}
																src={like.avatar}
															/>
															<Stack
																direction='column'
																spacing={0}
																ml='1rem'
																mt='0.2rem'
															>
																<Heading as='h1' fontSize='lg'>
																	{like.name}
																</Heading>
																<Text
																	fontSize='xs'
																	color={`${color.secondaryTextColor}`}
																>
																	{dayjs().diff(dayjs(like.date), 'd') >= 1
																		? dayjs(like.date).format(
																				'MMMM D, YYYY h:mm a'
																		  )
																		: dayjs(like.date).fromNow()}
																</Text>
															</Stack>
														</Flex>
													</ListItem>
												))}
											</List>
										</ModalBody>
									</ModalContent>
								</Modal>
							) : null}
						</Flex>
					</Flex>
					<Collapse
						startingHeight={0}
						in={showComments}
						padding='1rem'
						unmountOnExit='true'
					>
						<AddCommentForm postId={_id} />
						<Box bgColor={`${color.commentsBg}`}>
							{comments?.length > 0
								? comments.map((comment) => (
										<CommentCard
											key={comment._id}
											postId={_id}
											comment={comment}
										/>
								  ))
								: null}
						</Box>
					</Collapse>
				</Box>
			</Box>
		</React.Fragment>
	);
}

FeedCard.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	likePost: PropTypes.func.isRequired,
	dislikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = { likePost, dislikePost };

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
