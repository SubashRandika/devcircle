import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { connect } from 'react-redux';
import {
	getCurrentProfile,
	deleteAccount
} from '../../redux/actions/profileActions';
import NoProfile from './NoProfile';
import ProfileActions from './ProfileActions';
import Loading from '../common/Loading';

const color = {
	primaryColor: '#414f7a'
};

function Dashboard({ auth, userProfile, getCurrentProfile, deleteAccount }) {
	const { user } = auth;
	const { profile, loading } = userProfile;
	let dashboardContent;

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	const handleDeleteAccount = (e) => {
		deleteAccount();
	};

	if (loading) {
		dashboardContent = <Loading color={color.primaryColor} text='Loading...' />;
	} else {
		if (profile && Object.keys(profile).length > 0) {
			dashboardContent = (
				<ProfileActions
					name={user.name}
					profile={profile}
					deleteAccount={handleDeleteAccount}
				/>
			);
		} else {
			dashboardContent = <NoProfile name={user.name} />;
		}
	}

	return (
		<Box w='100%' h='100%'>
			{dashboardContent}
		</Box>
	);
}

Dashboard.propTypes = {
	auth: PropTypes.object,
	profile: PropTypes.object,
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	userProfile: state.profile
});

const mapDispatchToProps = { getCurrentProfile, deleteAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
