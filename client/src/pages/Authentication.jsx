import React, { useState } from 'react';
import { Box, Flex, Text, ScaleFade, Fade } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Overlay from '../components/auth/Overlay';
import { clearErrors } from '../redux/actions/authActions';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f17872',
	white: '#ffffff',
	borderColor: '#E2E8F0'
};

const logoText = {
	fontWeight: '800',
	fontSize: '55px',
	lineHeight: '55px'
};

function Authentication({ signup, clearErrors }) {
	const [rightPanelActive, setRightPanelActive] = useState(signup);

	const handleButtonClick = (isRightActive) => {
		clearErrors();
		setRightPanelActive(isRightActive);
	};

	return (
		<ScaleFade initialScale={0.9} in={true}>
			<Flex
				w='100%'
				h='100vh'
				justify='center'
				align='center'
				direction='column'
			>
				<Fade in={true}>
					<Link to='/'>
						<Text pl='45px' mb='20px'>
							<Text as='span' color={color.primaryColor} {...logoText}>
								Dev
							</Text>
							<Text as='span' color={color.secondaryColor} {...logoText}>
								Circle
							</Text>
						</Text>
					</Link>
				</Fade>
				<Box
					pos='relative'
					overflow='hidden'
					w='900px'
					maxW='100%'
					minH='600px'
					bgColor={color.white}
					borderRadius='10px'
					border={`1px solid ${color.borderColor}`}
					shadow='md'
				>
					<SignIn isRightPanelActive={rightPanelActive} />
					<SignUp isRightPanelActive={rightPanelActive} />
					<Overlay
						isRightPanelActive={rightPanelActive}
						handleClick={() => handleButtonClick(!rightPanelActive)}
					/>
				</Box>
			</Flex>
		</ScaleFade>
	);
}

const mapDispatchToProps = { clearErrors };

export default connect(null, mapDispatchToProps)(Authentication);
