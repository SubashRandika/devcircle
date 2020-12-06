import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Flex, Spacer, Avatar, Stack, Button, Tooltip } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import Logo from '../logo/Logo';
import { logoutUser } from '../../redux/actions/authActions';

const logoText = {
	fontWeight: '800',
	fontSize: '40px',
	lineHeight: '40px'
};

const color = {
	primaryColor: '#414f7a',
	white: '#ffffff'
};

function Navbar({ logoutUser, auth }) {
	const history = useHistory();
	const { user } = auth;

	const handleLogout = (e) => {
		e.preventDefault();
		logoutUser();
		history.push('/signin');
	};

	return (
		<Flex as='nav' padding='1.2rem 12rem' bg='gray.50' boxShadow='xs'>
			<Stack direction='row' spacing={12}>
				<Logo {...logoText} />
				<Button colorScheme='blue' variant='ghost' fontSize='20px'>
					Developers
				</Button>
			</Stack>
			<Spacer />
			<Stack direction='row' spacing={6}>
				<Tooltip
					hasArrow
					placement='bottom'
					label='Go to your profile'
					aria-label='Navbar Avatar Tooltip'
				>
					<Avatar
						w='2.6rem'
						h='2.6rem'
						cursor='pointer'
						loading='eager'
						name={user.name}
						src={user.avatar}
					/>
				</Tooltip>
				<Button
					borderRadius='20px'
					border={`1px solid ${color.primaryColor}`}
					bgColor={color.primaryColor}
					color={color.white}
					fontWeight='bold'
					p='12px 30px'
					letterSpacing='1px'
					lineHeight='unset'
					transition='transform 80ms ease-in'
					_hover={{ bg: 'transparent', color: `${color.primaryColor}` }}
					_active={{ bg: 'transparent' }}
					rightIcon={<FaSignOutAlt />}
					onClick={handleLogout}
				>
					Logout
				</Button>
			</Stack>
		</Flex>
	);
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = { logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
