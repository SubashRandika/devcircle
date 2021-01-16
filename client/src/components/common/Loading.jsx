import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

function Loading({ color, text }) {
	return (
		<Flex h='75vh' align='center' justify='center'>
			<VStack>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={color}
					width='4rem'
					height='4rem'
				/>
				<Text fontSize='xl'>{text}</Text>
			</VStack>
		</Flex>
	);
}

Loading.propTypes = {
	color: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default Loading;
