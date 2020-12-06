import React from 'react';
import {
	Flex,
	Box,
	Spacer,
	Center,
	Text,
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
import './Landing.style.css';
import Logo from '../components/logo/Logo';

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
	size: 'lg',
	border: '2px',
	borderRadius: '50px',
	color: color.white,
	bgColor: 'transparent'
};

function Landing() {
	return (
		<>
			<Flex align='center'>
				<Center h='135px'>
					<Logo {...logoText} />
				</Center>
				<Spacer />
				<center>
					<Box>
						<Button
							{...buttonStyles}
							borderColor={color.secondaryColor}
							_hover={{ bg: color.secondaryColor }}
							_active={{ bg: color.secondaryColor }}
						>
							Checkout Developers
						</Button>
					</Box>
				</center>
			</Flex>
			<Stack spacing={8} maxW='700px'>
				<Box>
					<Heading fontSize='4xl' mt='70px' ml='80px'>
						Are you a developer?
					</Heading>
					<Text fontSize='xl' mt='30px' ml='80px' maxW='600px'>
						Build up your developer portfolio today.
					</Text>
					<Text fontSize='xl' ml='80px' maxW='600px'>
						Get connected with talented developers all around the world.
					</Text>
					<Text fontSize='xl' ml='80px' maxW='600px'>
						Share your technical knowledge and thoughts with others.
					</Text>
					<Link to='/signin'>
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
							Get Started Here
						</Button>
					</Link>
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

export default Landing;
