import axios from 'axios';
import {
	CREATE_POST,
	GET_ALL_POSTS,
	GET_ERRORS,
	POST_LOADING,
	REMOVE_POST,
	LIKE_DISLIKE_POST
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
					'Successfully created your post. Please check that in your feeds wall.',
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

// delete a post by id
export const removePost = (postId, toast) => (dispatch) => {
	axios
		.delete(`/api/posts/${postId}`)
		.then((res) => {
			dispatch({
				type: REMOVE_POST,
				payload: postId
			});

			toast({
				title: 'Post deleted.',
				description:
					'Post has been deleted successfully. Cannot be undone again.',
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

// like a post by id
export const likePost = (postId) => (dispatch) => {
	axios
		.post(`/api/posts/${postId}/like`)
		.then((res) => {
			dispatch({
				type: LIKE_DISLIKE_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

// dislike a post by id
export const dislikePost = (postId) => (dispatch) => {
	axios
		.post(`/api/posts/${postId}/unlike`)
		.then((res) => {
			dispatch({
				type: LIKE_DISLIKE_POST,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
