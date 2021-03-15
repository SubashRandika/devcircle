import { CREATE_POST, GET_ALL_POSTS, POST_LOADING } from '../constants/types';

const initialState = {
	posts: [],
	post: {},
	loading: false
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case CREATE_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts]
			};
		case GET_ALL_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export default postReducer;
