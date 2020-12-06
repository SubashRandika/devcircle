import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
import configureStore from './redux/configureStore';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoutes from './components/routes/PublicRoutes';

const store = configureStore();

// check availability of auth token
const { jwtToken } = localStorage;

if (jwtToken) {
	// sets token to authorization header
	setAuthToken(jwtToken);

	// decode token and extract login user info and expiration time
	const decoded = jwt_decode(jwtToken);

	// sets whether user is authenticated or not
	store.dispatch(setCurrentUser(decoded));

	// check whether token has expired
	const currentTime = Date.now() / 1000;

	if (decoded.exp < currentTime) {
		// logout currently login users
		store.dispatch(logoutUser());

		// TODO: Clear current Profile
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<PublicRoutes exact path='/'>
						<Container className='main_app' maxW='1650px'>
							<Landing />
						</Container>
					</PublicRoutes>
					<PublicRoutes exact path='/signin'>
						<Authentication signup={false} />
					</PublicRoutes>
					<PublicRoutes exact path='/signup'>
						<Authentication signup={true} />
					</PublicRoutes>
					<ProtectedRoute exact path='/dashboard'>
						<Navbar />
					</ProtectedRoute>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
