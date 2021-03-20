import {
	CREATE_POST,
	GET_ALL_POSTS,
	POST_LOADING,
	REMOVE_POST,
	LIKE_DISLIKE_POST,
	ADD_COMMENT,
	REMOVE_COMMENT
} from '../constants/types';

const initialState = {
	posts: [],
	loading: false
};

const getUpdatedPostState = (currentPosts, updatedPost) => {
	const updatedPosts = [...currentPosts];
	const existingPostIndex = currentPosts.findIndex((post) => {
		return post._id === updatedPost._id;
	});

	updatedPosts.splice(existingPostIndex, 1, updatedPost);

	return updatedPosts;
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
			return {
				...state,
				posts: getUpdatedPostState(state.posts, action.payload)
			};
		case ADD_COMMENT:
			return {
				...state,
				posts: getUpdatedPostState(state.posts, action.payload)
			};
		case REMOVE_COMMENT:
			return {
				...state,
				posts: getUpdatedPostState(state.posts, action.payload)
			};
		default:
			return state;
	}
};

export default postReducer;
