import axios from 'axios';
import { CREATE_POST, GET_ERRORS } from '../constants/types';

// create a new post with post data
export const createNewPost = (postInfo) => (dispatch) => {
	axios
		.post('/api/posts', postInfo)
		.then((res) => {
			dispatch({
				type: CREATE_POST,
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
