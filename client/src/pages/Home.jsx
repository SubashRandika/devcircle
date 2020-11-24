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
import { Link } from 'react-router-dom';
import { ReactComponent as BlueBlob } from '../assets/blue_blog.svg';
import { ReactComponent as FooterBlob } from '../assets/footer_blog.svg';
import { ReactComponent as ComputerMan } from '../assets/computer_man.svg';
import { ReactComponent as ProfileCard } from '../assets/profile_card.svg';
import { ReactComponent as PostingWoman } from '../assets/posting_woman.svg';
import './Home.style.css';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f17872',
	white: '#ffffff',
	bluishGrey: '#949ABB'
};

const logoText = {
	fontWeight: '800',
	fontSize: '55px',
	lineHeight: '55px'
};

const buttonStyles = {
	size: 'xl',
	height: '50px',
	width: '150px',
	border: '2px',
	borderRadius: '50px',
	color: color.white,
	lineHeight: 'unset'
};

function Home() {
	return (
		<>
			<Flex align='center'>
				<Center h='135px'>
					<Box>
						<Text>
							<Text as='span' color={color.primaryColor} {...logoText}>
								Dev
							</Text>
							<Text as='span' color={color.secondaryColor} {...logoText}>
								Circle
							</Text>
						</Text>
					</Box>
				</Center>
				<Spacer />
				<center>
					<Box>
						<ButtonGroup variant='outline' spacing='6'>
							<Link to='/signin'>
								<Button
									{...buttonStyles}
									borderColor={color.bluishGrey}
									_hover={{ bg: color.bluishGrey }}
									_active={{ bg: color.bluishGrey }}
								>
									Sign In
								</Button>
							</Link>
							<Link to='/signup'>
								<Button
									{...buttonStyles}
									borderColor={color.secondaryColor}
									_hover={{ bg: color.secondaryColor }}
									_active={{ bg: color.secondaryColor }}
								>
									Sign Up
								</Button>
							</Link>
						</ButtonGroup>
					</Box>
				</center>
			</Flex>
			<Stack spacing={8} maxW='600px'>
				<Box>
					<Heading fontSize='4xl' mt='70px' ml='80px'>
						Are you a developer?
					</Heading>
					<Text fontSize='xl' mt='30px' ml='80px' maxW='500px'>
						Build up your developer portfolio today.
					</Text>
					<Text fontSize='xl' ml='80px' maxW='500px'>
						Connect with career mates all around the world.
					</Text>
					<Text fontSize='xl' ml='80px' maxW='500px'>
						Share your tech thoughts and questions with other developers.
					</Text>
					<Button
						size='lg'
						borderRadius='50px'
						ml='80px'
						mt='50px'
						color={color.white}
						bgColor={color.secondaryColor}
						_hover={{ bg: color.primaryColor }}
						_active={{ bg: color.primaryColor }}
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
