import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import Home from './pages/Home';
import Authentication from './pages/Authentication';

const store = configureStore();

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
