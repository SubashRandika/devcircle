import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE
} from '../constants/types';

// set profile is still loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// retrieve current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.get('/api/profile')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// clear current profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
