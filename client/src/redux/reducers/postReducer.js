import {
	CREATE_POST,
	GET_ALL_POSTS,
	POST_LOADING,
	REMOVE_POST,
	LIKE_DISLIKE_POST,
	ADD_COMMENT
} from '../constants/types';

const initialState = {
	posts: [],
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
		case REMOVE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload)
			};
		case LIKE_DISLIKE_POST:
			const updatedPosts = [...state.posts];
			const postIndex = state.posts.findIndex((post) => {
				return post._id === action.payload._id;
			});

			updatedPosts.splice(postIndex, 1, action.payload);

			return {
				...state,
				posts: updatedPosts
			};
		case ADD_COMMENT:
			const updatedComments = [...state.posts];
			const existingPostIndex = state.posts.findIndex((post) => {
				return post._id === action.payload._id;
			});

			updatedComments.splice(existingPostIndex, 1, action.payload);

			return {
				...state,
				posts: updatedComments
			};
		default:
			return state;
	}
};

export default postReducer;
