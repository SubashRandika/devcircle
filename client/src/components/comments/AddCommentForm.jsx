import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	Flex,
	FormControl,
	FormErrorMessage,
	IconButton,
	Input,
	Tooltip
} from '@chakra-ui/react';
import { FaCommentMedical } from 'react-icons/fa';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/postActions';

const color = {
	formBg: '#f9f9f9',
	white: '#ffffff'
};

const formErrorStyles = {
	fontSize: '0.75rem',
	mt: '0.1rem !important',
	mb: '0 !important',
	textAlign: 'left'
};

function AddCommentForm({ postId, auth, errors, addComment }) {
	const {
		user: { name, avatar }
	} = auth;
	const { comment } = errors;
	const [commentInfo, setCommentInfo] = useState({
		comment: '',
		name,
		avatar
	});

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newComment = {
			...commentInfo
		};

		addComment(postId, newComment);
		setCommentInfo({ comment: '', name, avatar });
	};

	const handleOnChange = (e) => {
		setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setCommentInfo({
			comment: '',
			name,
			avatar
		});
	}, [avatar, name]);

	return (
		<FormControl
			as='form'
			noValidate
			onSubmit={handleOnSubmit}
			isInvalid={'comment' in errors}
		>
			<Flex bgColor={`${color.formBg}`} p='1rem'>
				<Avatar size='sm' name={name} src={avatar} />
				<Flex direction='column' flex='1' m='0 1rem'>
					<Input
						name='comment'
						placeholder='Type your comment here...'
						value={commentInfo.comment}
						size='sm'
						bg={`${color.white}`}
						onChange={handleOnChange}
					/>
					<FormErrorMessage {...formErrorStyles}>{comment}</FormErrorMessage>
				</Flex>
				<Tooltip label='Add Comment' aria-label='Add Comment'>
					<IconButton
						type='submit'
						w='3.5rem'
						h='2rem'
						colorScheme='facebook'
						aria-label='Search database'
						icon={<FaCommentMedical fontSize='1.2rem' />}
					/>
				</Tooltip>
			</Flex>
		</FormControl>
	);
}

AddCommentForm.propTypes = {
	postId: PropTypes.string.isRequired,
	auth: PropTypes.object.isRequired,
	error: PropTypes.object,
	addComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = { addComment };

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);
