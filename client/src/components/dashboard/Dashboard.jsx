import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import NoProfile from './NoProfile';

function Dashboard({ getCurrentProfile, auth, userProfile }) {
	const { user } = auth;
	const { profile, loading } = userProfile;
	let dashboardContent;

	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	if (profile && Object.keys(profile).length > 0) {
		dashboardContent = <h1>TODO: DISPLAY PROFILE</h1>;
	} else {
		dashboardContent = <NoProfile name={user.name} />;
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
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	userProfile: state.profile
});

const mapDispatchToProps = { getCurrentProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
