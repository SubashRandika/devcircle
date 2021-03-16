import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapse, Flex, Text } from '@chakra-ui/react';
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa';
import FeedCardBody from './FeedCardBody';
import AddCommentForm from '../comments/AddCommentForm';
import CommentCard from '../comments/CommentCard';

const color = {
	secondaryText: '#545454',
	commentsBg: '#F7FAFC'
};

function FeedCard({ post }) {
	const [showComments, setShowComments] = useState(false);
	const { likes, comments } = post;

	const handleToggleComments = () => {
		setShowComments(!showComments);
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
							<Text fontSize='sm' color={`${color.secondaryText}`}>
								{likes.length} likes
							</Text>
							<Text ml='1rem' fontSize='sm' color={`${color.secondaryText}`}>
								{comments.length} comments
							</Text>
						</Flex>
					</Flex>
					<Collapse
						startingHeight={0}
						in={showComments}
						padding='1rem'
						unmountOnExit='true'
					>
						<AddCommentForm />
						<Box bgColor={`${color.commentsBg}`}>
							<CommentCard comment={{}} />
						</Box>
					</Collapse>
				</Box>
			</Box>
		</React.Fragment>
	);
}

FeedCard.propTypes = {
	post: PropTypes.object.isRequired
};

export default FeedCard;
