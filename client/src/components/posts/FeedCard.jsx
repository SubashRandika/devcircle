import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Collapse,
	Flex,
	Heading,
	IconButton,
	Input,
	Stack,
	Text,
	Tooltip
} from '@chakra-ui/react';
import {
	FaRegComment,
	FaRegThumbsUp,
	FaCommentMedical,
	FaTrashAlt
} from 'react-icons/fa';
import FeedCardBody from './FeedCardBody';

function FeedCard({ post }) {
	const [showComments, setShowComments] = useState(false);
	const [showCommentText, setShowCommentText] = useState(false);

	const handleToggleComments = () => {
		setShowComments(!showComments);
	};

	const handleShowLargeComment = () => {
		setShowCommentText(!showCommentText);
	};

	return (
		<React.Fragment>
			<Box p={5} shadow='md' borderWidth='1px' mb='1rem'>
				<FeedCardBody post={post} />
				<Box mt='1rem'>
					<Flex justify='space-between' align='center' mb='0.9rem'>
						<Box>
							<Button
								colorScheme='linkedin'
								size='sm'
								variant='ghost'
								leftIcon={<FaRegThumbsUp fontSize='1rem' />}
							>
								Like
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
							<Text fontSize='sm' color='#545454'>
								{post.likes.length} likes
							</Text>
							<Text ml='1rem' fontSize='sm' color='#545454'>
								{post.comments.length} comments
							</Text>
						</Flex>
					</Flex>
					<Collapse
						startingHeight={0}
						in={showComments}
						padding='1rem'
						unmountOnExit='true'
					>
						<Flex bgColor='#f9f9f9' p='1rem'>
							<Avatar
								size='sm'
								name='Ryan Florence'
								src='https://bit.ly/ryan-florence'
							/>
							<Input
								placeholder='Type your comment here...'
								size='sm'
								bg='#ffffff'
								m='0 1rem'
							/>
							<Tooltip label='Add Comment' aria-label='Add Comment'>
								<IconButton
									w='3.5rem'
									h='2rem'
									colorScheme='facebook'
									aria-label='Search database'
									icon={<FaCommentMedical fontSize='1.2rem' />}
								/>
							</Tooltip>
						</Flex>
						<Box bgColor='#F7FAFC'>
							<Flex borderTop='0.063rem solid #f1f0f0' p='1rem'>
								<Avatar
									mr='1rem'
									size='sm'
									name='Dan Abrahmov'
									src='https://bit.ly/dan-abramov'
								/>
								<Flex direction='column'>
									<Flex justify='space-between' align='center'>
										<Stack direction='row' spacing={4}>
											<Heading as='h2' fontSize='md'>
												Dan Abrahmov
											</Heading>
											<Text fontSize='xs' color='#545454' pt='0.063rem'>
												3 min ago
											</Text>
										</Stack>
										<Tooltip
											label='Delete post'
											placement='left'
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
									<Box>
										<Collapse startingHeight={20} in={showCommentText}>
											<Text fontSize='0.9rem'>
												Anim pariatur cliche reprehenderit, enim eiusmod high
												life accusamus terry richardson ad squid. Nihil anim
												keffiyeh helvetica, craft beer labore wes anderson cred
												nesciunt sapiente ea proident. lorem
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
								</Flex>
							</Flex>
						</Box>
					</Collapse>
				</Box>
			</Box>
		</React.Fragment>
	);
}

export default FeedCard;
