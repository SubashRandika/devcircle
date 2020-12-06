import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PublicRoutes({ children, auth, ...rest }) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				!auth.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/dashboard',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

PublicRoutes.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	auth: PropTypes.object.isRequired,
	rest: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(PublicRoutes);
