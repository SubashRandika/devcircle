import axios from 'axios';
import {
	CREATE_POST,
	GET_ALL_POSTS,
	GET_ERRORS,
	POST_LOADING
} from '../constants/types';
import { clearErrors } from './errorActions';

// set posts is still loading
export const setPostsLoading = (loading) => {
	return {
		type: POST_LOADING,
		payload: loading
	};
};

// get all posts
export const getAllPosts = () => (dispatch) => {
	dispatch(setPostsLoading(true));

	axios
		.get('/api/posts')
		.then((res) => {
			dispatch({
				type: GET_ALL_POSTS,
				payload: res.data
			});
			dispatch(clearErrors());
		})
		.catch((err) => {
			dispatch({
				type: GET_ALL_POSTS,
				payload: []
			});
		});
};

// create a new post with post data
export const createNewPost = (postInfo, toast) => (dispatch) => {
	axios
		.post('/api/posts', postInfo)
		.then((res) => {
			dispatch({
				type: CREATE_POST,
				payload: res.data
			});
			toast({
				title: 'Post created.',
				description:
					'We successfully created your post. Please check it your post wall.',
				status: 'success',
				duration: 5000,
				position: 'top',
				isClosable: true
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
