import { TEST_DISPATCH } from '../constants/authTypes';

// register user
export const registerUser = (userData) => {
	return {
		type: TEST_DISPATCH,
		payload: userData
	};
};
