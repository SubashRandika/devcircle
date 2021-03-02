import axios from 'axios';
import { CREATE_POST, GET_ERRORS } from '../constants/types';

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
