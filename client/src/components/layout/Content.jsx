import React from 'react';
import { Container } from '@chakra-ui/react';

function Content({ children }) {
	return (
		<Container ml='0' mr='0' p='2.2rem 8rem' maxW='none'>
			{children}
		</Container>
	);
}

export default Content;
