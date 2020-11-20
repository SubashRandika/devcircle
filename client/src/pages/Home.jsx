import React from 'react';
import {
	Flex,
	Box,
	Spacer,
	Center,
	Text,
	ButtonGroup,
	Button,
	Stack,
	Heading
} from '@chakra-ui/react';
import { ReactComponent as BlueBlob } from '../assets/blue_blog.svg';
import { ReactComponent as FooterBlob } from '../assets/footer_blog.svg';
import { ReactComponent as ComputerMan } from '../assets/computer_man.svg';
import { ReactComponent as ProfileCard } from '../assets/profile_card.svg';
import { ReactComponent as PostingWoman } from '../assets/posting_woman.svg';
import './Home.style.css';

function Home() {
	return (
		<>
			<Flex align='center'>
				<Center h='135px'>
					<Box>
						<Text>
							<span className='logo__text first-part'>Dev</span>
							<span className='logo__text last-part'>Circle</span>
						</Text>
					</Box>
				</Center>
				<Spacer />
				<center>
					<Box>
						<ButtonGroup variant='outline' spacing='6'>
							<Button
								size='xl'
								height='50px'
								width='150px'
								border='2px'
								borderRadius='50px'
								borderColor='#949ABB'
								color='#ffffff'
								_hover={{ bg: '#949ABB' }}
							>
								Sign In
							</Button>
							<Button
								size='xl'
								height='50px'
								width='150px'
								border='2px'
								borderRadius='50px'
								borderColor='#f17872'
								color='#ffffff'
								_hover={{ bg: '#f17872' }}
							>
								Sign Up
							</Button>
						</ButtonGroup>
					</Box>
				</center>
			</Flex>
			<Stack spacing={8} maxW='600px'>
				<Box>
					<Heading fontFamily='Nunito' fontSize='4xl' mt='70px' ml='80px'>
						Are you a developer?
					</Heading>
					<Text
						fontFamily='Nunito'
						fontSize='xl'
						mt='30px'
						ml='80px'
						maxW='500px'
					>
						Build up your developer portfolio today.
					</Text>
					<Text fontFamily='Nunito' fontSize='xl' ml='80px' maxW='500px'>
						Connect with career mates all around the world.
					</Text>
					<Text fontFamily='Nunito' fontSize='xl' ml='80px' maxW='500px'>
						Share your tech thoughts and questions with other developers.
					</Text>
					<Button
						size='lg'
						borderRadius='50px'
						ml='80px'
						mt='50px'
						color='#ffffff'
						bgColor='#f17872'
						_hover={{ bg: '#414F7A' }}
					>
						Checkout Developers
					</Button>
				</Box>
			</Stack>
			<BlueBlob className='home__blue-blob' />
			<FooterBlob className='home__footer-blob' />
			<ComputerMan className='home__computer-man' />
			<ProfileCard className='home__profile-card' />
			<PostingWoman className='home__posting-woman' />
		</>
	);
}

export default Home;
