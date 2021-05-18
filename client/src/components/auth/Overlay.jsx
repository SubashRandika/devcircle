import React from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Overlay({ isRightPanelActive, handleClick }) {
	return (
		<Box
			pos='absolute'
			top='0'
			left='50%'
			w='50%'
			h='100%'
			overflow='hidden'
			transition='transform 0.6s ease-in-out'
			zIndex='100'
			transform={isRightPanelActive ? 'translateX(-100%)' : ''}
		>
			<Box
				pos='relative'
				color='#ffffff'
				left='-100%'
				h='100%'
				width='200%'
				transform={isRightPanelActive ? 'translateX(50%)' : 'translateX(0)'}
				transition='transform 0.6s ease-in-out'
				background='linear-gradient(to left bottom, #414f7a, #72578c, #a55d90, #d26686, #f17872)'
			>
				<Flex
					as='div'
					pos='absolute'
					align='center'
					justify='center'
					direction='column'
					p='0 40px'
					textAlign='center'
					top='0'
					h='100%'
					w='50%'
					transform={isRightPanelActive ? 'translateX(0)' : 'translateX(-20%)'}
					transition='transform 0.6s ease-in-out'
				>
					<Heading as='h1' fontWeight='bold' m='0'>
						Welcome Back!
					</Heading>
					<Text
						fontSize='md'
						lineHeight='20px'
						letterSpacing='0.5px'
						m='20px 0 30px'
					>
						To keep connected with other developers please signin with your
						credentials
					</Text>
					<Link to='/signin'>
						<Button
							borderRadius='20px'
							border='2px solid #ffffff'
							bgColor='transparent'
							color='#ffffff'
							fontSize='14px'
							fontWeight='bold'
							p='12px 45px'
							letterSpacing='1px'
							lineHeight='unset'
							textTransform='uppercase'
							transition='transform 80ms ease-in'
							_hover={{ bg: '#414F7A' }}
							onClick={() => handleClick()}
							_active={{ bg: '#414F7A' }}
						>
							Sign In
						</Button>
					</Link>
				</Flex>
				<Flex
					as='div'
					pos='absolute'
					align='center'
					justify='center'
					direction='column'
					p='0 40px'
					textAlign='center'
					top='0'
					right='0'
					h='100%'
					w='50%'
					transform={isRightPanelActive ? 'translateX(20%)' : 'translateX(0)'}
					transition='transform 0.6s ease-in-out'
				>
					<Heading as='h1' fontWeight='bold' m='0'>
						Hello, Developer!
					</Heading>
					<Text
						fontSize='md'
						lineHeight='20px'
						letterSpacing='0.5px'
						m='20px 0 30px'
					>
						Create your portfolio and make connections with career mates today
					</Text>
					<Link to='/signup'>
						<Button
							borderRadius='20px'
							border='2px solid #ffffff'
							bgColor='transparent'
							color='#ffffff'
							fontSize='14px'
							fontWeight='bold'
							p='12px 45px'
							letterSpacing='1px'
							lineHeight='unset'
							textTransform='uppercase'
							transition='transform 80ms ease-in'
							_hover={{ bg: '#f06a63' }}
							onClick={() => handleClick()}
							_active={{ bg: '#f06a63' }}
						>
							Sign Up
						</Button>
					</Link>
				</Flex>
			</Box>
		</Box>
	);
}

export default Overlay;
