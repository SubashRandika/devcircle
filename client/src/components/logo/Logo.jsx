import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f17872'
};

function Logo(otherProps) {
	return (
		<Box>
			<Text>
				<Text as='span' color={color.primaryColor} {...otherProps}>
					Dev
				</Text>
				<Text as='span' color={color.secondaryColor} {...otherProps}>
					Circle
				</Text>
			</Text>
		</Box>
	);
}

export default Logo;
