import axios from 'axios';
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS
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

// create or update profile details
export const createUpdateProfile = (profileInfo, history) => (dispatch) => {
	dispatch(setProfileLoading());

	axios
		.post('/api/profile', profileInfo)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// clear current profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
