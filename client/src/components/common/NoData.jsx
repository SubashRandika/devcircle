import React from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';

const color = {
	infoIcon: '#3182ce',
	subtitle: '#7d848c'
};

function NoData({ heading, subtitle }) {
	return (
		<Flex justify='center' align='center' mt='15px'>
			<VStack spacing='0.625rem'>
				<FaInfoCircle size='3.125rem' color={`${color.infoIcon}`} />
				<Heading as='h2' size='md'>
					{heading}
				</Heading>
				<Text fontSize='md' color={`${color.subtitle}`}>
					{subtitle}
				</Text>
			</VStack>
		</Flex>
	);
}

export default NoData;
