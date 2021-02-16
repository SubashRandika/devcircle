import {
	GET_PROFILE,
	GET_ALL_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE
} from '../constants/types';

const initialState = {
	currentProfile: null,
	profiles: null,
	loading: false
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case GET_PROFILE:
			return {
				...state,
				currentProfile: action.payload,
				loading: false
			};
		case GET_ALL_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				currentProfile: null
			};
		default:
			return state;
	}
};

export default profileReducer;
