import React from 'react';
import { Container } from '@chakra-ui/react';
import Home from './pages/Home';
import './App.css';

function App() {
	return (
		<Container className='main_app' maxW='1650px'>
			<Home />
		</Container>
	);
}

export default App;
