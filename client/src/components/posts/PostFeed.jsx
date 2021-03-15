import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, SimpleGrid, Box, Heading } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { getAllPosts } from '../../redux/actions/postActions';
import CreatePostForm from './CreatePostForm';
import FeedCard from './FeedCard';
import Loading from '../common/Loading';
import NoData from '../common/NoData';

const color = {
	primaryColor: '#414f7a'
};
function PostFeed({ post, getAllPosts }) {
	const { loading, posts } = post;
	let feedsContent;

	useEffect(() => {
		getAllPosts();
	}, [getAllPosts]);

	if (loading) {
		feedsContent = (
			<Loading color={color.primaryColor} text='Loading posts...' />
		);
	} else {
		if (posts.length > 0) {
			feedsContent = posts.map((post) => (
				<FeedCard key={post._id} post={post} />
			));
		} else {
			feedsContent = (
				<Flex w='100%' h='75vh' justify='center' align='center'>
					<NoData
						heading='No Latest Feeds'
						subtitle='Post your questions and technical thoughts here'
					/>
				</Flex>
			);
		}
	}

	return (
		<Flex>
			<SimpleGrid columns={2} spacing={10} w='100%'>
				<Box>
					<Heading
						as='h2'
						size='md'
						mb='1rem'
						d={posts.length > 0 ? 'block' : 'none'}
					>
						Developer Feeds
					</Heading>
					{feedsContent}
				</Box>
				<CreatePostForm />
			</SimpleGrid>
		</Flex>
	);
}

PostFeed.propTypes = {
	post: PropTypes.object.isRequired,
	getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

const mapDispatchToProps = { getAllPosts };

export default connect(mapStateToProps, mapDispatchToProps)(PostFeed);
