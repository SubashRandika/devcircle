import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

function SocialMedia() {
	return (
		<Box m='20px 0'>
			<IconButton
				aria-label='Facebook'
				variant='outline'
				borderRadius='50%'
				m='0 5px'
				icon={<FaFacebookF />}
				_hover={{
					bg: '#ffffff',
					color: '#1877f2',
					borderColor: '#1877f2'
				}}
				_active={{ bg: 'transparent' }}
				_focus={{ borderColor: 'none' }}
			/>
			<IconButton
				aria-label='LinkedIn'
				variant='outline'
				borderRadius='50%'
				m='0 5px'
				icon={<FaLinkedinIn />}
				_hover={{
					bg: '#ffffff',
					color: '#007bb5',
					borderColor: '#007bb5'
				}}
				_active={{ bg: 'transparent' }}
				_focus={{ borderColor: 'none' }}
			/>
			<IconButton
				aria-label='Github'
				variant='outline'
				borderRadius='50%'
				m='0 5px'
				icon={<FaGithub />}
				_hover={{
					bg: '#ffffff',
					color: '#211F1F',
					borderColor: '#211F1F'
				}}
				_active={{ bg: 'transparent' }}
				_focus={{ borderColor: 'none' }}
			/>
		</Box>
	);
}

export default SocialMedia;
