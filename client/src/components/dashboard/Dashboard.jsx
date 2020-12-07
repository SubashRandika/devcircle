import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';

function Dashboard({ getCurrentProfile }) {
	useEffect(() => {
		getCurrentProfile();
	});

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired
};

const mapDispatchToProps = { getCurrentProfile };

export default connect(null, mapDispatchToProps)(Dashboard);
