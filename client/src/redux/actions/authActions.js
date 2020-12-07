import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants/types';

// Register user (SignUp user)
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then(() => {
			// navigate to signin route with page reload
			history.push('/signin');
			history.go(0);
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Login user (SignIn user)
export const loginUser = (credentials, history) => (dispatch) => {
	axios
		.post('/api/users/login', credentials)
		.then((res) => {
			const { token } = res.data;

			// Save to local storage
			localStorage.setItem('jwtToken', token);

			// set authorization header with jwt token
			setAuthToken(token);

			// decode jwt token to extract login user data
			const decodedUserData = jwt_decode(token);

			// set current login user
			dispatch(setCurrentUser(decodedUserData));
			// navigate to dashboard route
			history.push('/dashboard');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const setCurrentUser = (userData) => ({
	type: SET_CURRENT_USER,
	payload: userData
});

// logout current signin user
export const logoutUser = () => (dispatch) => {
	// remove token from localStorage
	localStorage.removeItem('jwtToken');

	// remove authorization header from future requests
	setAuthToken(false);

	// set current signin user to {} which is isAuthenticated set to false
	dispatch(setCurrentUser({}));
};
