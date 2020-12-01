import axios from 'axios';
import { GET_ERRORS } from '../constants/authTypes';

// Register user (SignUp user)
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/users/register', userData)
		.then(() => {
			history.push('/signin');
			history.go(0);
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
