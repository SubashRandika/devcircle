import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authActions';
import { clearCurrentProfile } from './redux/actions/profileActions';
import configureStore from './redux/configureStore';
import Landing from './pages/Landing';
import Authentication from './pages/Authentication';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import Dashboard from './components/dashboard/Dashboard';
import Content from './components/layout/Content';
import CreateProfile from './components/create-profile/CreateProfile';

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

		// clear current Profile
		store.dispatch(clearCurrentProfile());
	}
}

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<PublicRoute exact path='/'>
						<Container className='main_app' maxW='1650px'>
							<Landing />
						</Container>
					</PublicRoute>
					<PublicRoute exact path='/signin'>
						<Authentication signup={false} />
					</PublicRoute>
					<PublicRoute exact path='/signup'>
						<Authentication signup={true} />
					</PublicRoute>
					<PrivateRoute exact path='/dashboard'>
						<Navbar />
						<Content>
							<Dashboard />
						</Content>
					</PrivateRoute>
					<PrivateRoute exact path='/create-profile'>
						<Navbar />
						<Container maxW='1530px' mt='30px' p='0'>
							<CreateProfile />
						</Container>
					</PrivateRoute>
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
