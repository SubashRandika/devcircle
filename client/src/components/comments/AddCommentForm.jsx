import React, { useState } from 'react';
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

function AddCommentForm({ auth, errors }) {
	const {
		user: { name, avatar }
	} = auth;
	const { text } = errors;
	const [commentInfo, setCommentInfo] = useState({
		text: '',
		name,
		avatar
	});

	const handleOnSubmit = (e) => {
		e.preventDefault();

		// const newComment = {
		// 	...commentInfo
		// };

		console.log('Comment Created');
	};

	const handleOnChange = (e) => {
		setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
	};

	return (
		<FormControl
			as='form'
			noValidate
			onSubmit={handleOnSubmit}
			isInvalid={Object.keys(errors).length !== 0}
		>
			<Flex bgColor={`${color.formBg}`} p='1rem'>
				<Avatar size='sm' name={name} src={avatar} />
				<Input
					name='text'
					placeholder='Type your comment here...'
					value={commentInfo.text}
					size='sm'
					bg={`${color.white}`}
					m='0 1rem'
					onChange={handleOnChange}
				/>
				<FormErrorMessage {...formErrorStyles}>{text}</FormErrorMessage>
				<Tooltip label='Add Comment' aria-label='Add Comment'>
					<IconButton
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
	auth: PropTypes.object.isRequired,
	error: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);
