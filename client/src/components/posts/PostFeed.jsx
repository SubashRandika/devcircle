import React from 'react';
import { Flex, SimpleGrid, Box } from '@chakra-ui/react';
import CreatePostForm from './CreatePostForm';

function PostFeed() {
	return (
		<Flex>
			<SimpleGrid columns={2} spacing={10} w='100%'>
				<Box>Feeds List</Box>
				<CreatePostForm />
			</SimpleGrid>
		</Flex>
	);
}

export default PostFeed;
