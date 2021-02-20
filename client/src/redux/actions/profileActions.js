import axios from 'axios';
import {
	GET_PROFILE,
	GET_ALL_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS
} from '../constants/types';
import { logoutUser } from './authActions';
import { clearErrors } from './errorActions';

// set profile is still loading
export const setProfileLoading = (loading) => {
	return {
		type: PROFILE_LOADING,
		payload: loading
	};
};

// retrieve current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading(true));

	axios
		.get('/api/profile')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};

// get all profiles details
export const getAllProfiles = () => (dispatch) => {
	dispatch(setProfileLoading(true));

	axios
		.get('/api/profile/all')
		.then((res) => {
			dispatch({
				type: GET_ALL_PROFILES,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_PROFILES,
				payload: null
			});
		});
};

// get profile information by user handle
export const getProfileByHandle = (handle) => (dispatch) => {
	dispatch(setProfileLoading(true));

	axios
		.get(`/api/profile/handle/${handle}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};

// get profile information by user id
export const getProfileByUserId = (userId, history) => (dispatch) => {
	axios
		.get(`/api/profile/user/${userId}`)
		.then((res) => {
			getProfileByHandle(res.data.handle);
			history.push(`/profile/${res.data.handle}`);
		})
		.catch((err) => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};

// create or update profile details
export const createUpdateProfile = (profileInfo, history) => (dispatch) => {
	dispatch(setProfileLoading(true));

	axios
		.post('/api/profile', profileInfo)
		.then((res) => {
			dispatch(setProfileLoading(false));
			history.push('/dashboard');
		})
		.catch((err) => {
			dispatch(setProfileLoading(false));
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

// add a new experience to the profile
export const addNewExperience = (experienceInfo, onClose) => (dispatch) => {
	axios
		.post('/api/profile/experience', experienceInfo)
		.then((res) => {
			dispatch(clearErrors());
			onClose();
			dispatch(getCurrentProfile());
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// add a new education details to the profile
export const addNewEducation = (educationalInfo, onClose) => (dispatch) => {
	axios
		.post('/api/profile/education', educationalInfo)
		.then((res) => {
			dispatch(clearErrors());
			onClose();
			dispatch(getCurrentProfile());
		})
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

// delete a experience by experience id
export const deleteExperience = (experienceId) => (dispatch) => {
	axios
		.delete(`/api/profile/experience/${experienceId}`)
		.then((res) => {
			dispatch(getCurrentProfile());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

// delete a education by education id
export const deleteEducation = (educationId) => (dispatch) => {
	axios
		.delete(`/api/profile/education/${educationId}`)
		.then((res) => {
			dispatch(getCurrentProfile());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

// delete entire user account with profile and logout the user
export const deleteAccount = () => (dispatch) => {
	axios
		.delete('/api/profile/')
		.then((res) => {
			dispatch(logoutUser());
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
