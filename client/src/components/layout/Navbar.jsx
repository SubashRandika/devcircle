import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import {
	Flex,
	Spacer,
	Avatar,
	Stack,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import Logo from '../common/Logo';
import { logoutUser } from '../../redux/actions/authActions';
import {
	clearCurrentProfile,
	getProfileByUserId
} from '../../redux/actions/profileActions';

const logoText = {
	fontWeight: '800',
	fontSize: '40px',
	lineHeight: '40px'
};

const color = {
	primaryColor: '#414f7a',
	white: '#ffffff'
};

function Navbar({ logoutUser, clearCurrentProfile, getProfileByUserId, auth }) {
	const history = useHistory();
	const { user, isAuthenticated } = auth;

	const handleLogout = (e) => {
		e.preventDefault();

		clearCurrentProfile();
		logoutUser();

		history.push('/signin');
	};

	const handleShowProfile = () => {
		getProfileByUserId(user.id, history);
	};

	return (
		<Flex as='nav' padding='1.2rem 12rem' bg='gray.50' boxShadow='xs'>
			<Stack direction='row' spacing={12}>
				<Link to={isAuthenticated ? '/dashboard' : '/'}>
					<Logo {...logoText} />
				</Link>
				<Link to='/profiles'>
					<Button colorScheme='blue' variant='ghost' fontSize='20px'>
						Developers
					</Button>
				</Link>
			</Stack>
			<Spacer display={isAuthenticated ? 'block' : 'none'} />
			<Stack
				direction='row'
				spacing={0}
				display={isAuthenticated ? 'block' : 'none'}
			>
				<Menu isLazy placement='bottom-end' offset={[0, 1]}>
					<MenuButton
						as={Avatar}
						w='2.6rem'
						h='2.6rem'
						cursor='pointer'
						loading='eager'
						name={user.name}
						src={user.avatar}
					></MenuButton>
					<MenuList>
						<MenuItem onClick={handleShowProfile}>See Profile</MenuItem>
						<Link to='/dashboard'>
							<MenuItem>Dashboard</MenuItem>
						</Link>
					</MenuList>
				</Menu>
				<Button
					borderRadius='20px'
					border={`1px solid ${color.primaryColor}`}
					bgColor={color.primaryColor}
					color={color.white}
					fontWeight='bold'
					ml='1.5rem !important'
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
	clearCurrentProfile: PropTypes.func.isRequired,
	getProfileByUserId: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = {
	logoutUser,
	clearCurrentProfile,
	getProfileByUserId
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
