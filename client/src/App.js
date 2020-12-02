import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/authActions';
import configureStore from './redux/configureStore';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

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
}

function App() {
	return (
		<Provider store={store}>
			<Container className='main_app' maxW='1650px' fontFamily='Nunito'>
				<Router>
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						<Route exact path='/signin'>
							<Authentication signup={false} />
						</Route>
						<Route exact path='/signup'>
							<Authentication signup={true} />
						</Route>
					</Switch>
				</Router>
			</Container>
		</Provider>
	);
}

export default App;
