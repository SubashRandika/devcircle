import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	InputGroup,
	InputRightElement,
	Textarea,
	Tooltip,
	useToast,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody
} from '@chakra-ui/react';
import { FaEye, FaFileSignature } from 'react-icons/fa';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { createNewPost } from '../../redux/actions/postActions';
import renderers from './renderConfigs';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	white: '#ffffff',
	linkColor: '#008cdd'
};

const formErrorStyles = {
	fontSize: '0.75rem',
	mt: '0.1rem !important',
	mb: '0 !important',
	textAlign: 'left'
};

function CreatePostForm({ auth, errors, createNewPost }) {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		user: { name, avatar }
	} = auth;
	const { text } = errors;
	const [postInfo, setPostInfo] = useState({
		text: '',
		name,
		avatar
	});

	const handlePreviewMarkdown = () => {
		onOpen();
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const newPost = {
			...postInfo
		};

		createNewPost(newPost, toast);
	};

	const handleOnChange = (e) => {
		setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
	};

	return (
		<React.Fragment>
			<FormControl
				as='form'
				noValidate
				onSubmit={handleOnSubmit}
				isInvalid={Object.keys(errors).length !== 0}
			>
				<Flex direction='column'>
					<Heading as='h2' size='md' mb='1rem'>
						Write something here...
					</Heading>
					<InputGroup>
						<Textarea
							name='text'
							placeholder='Write your tech post here. This is markdown supported.'
							value={postInfo.text}
							size='sm'
							rows='15'
							onChange={handleOnChange}
						/>
						{postInfo.text.length > 10 ? (
							<Tooltip
								hasArrow
								label='Preview Your Feed'
								aria-label='preview your feed'
							>
								<InputRightElement
									cursor='pointer'
									onClick={handlePreviewMarkdown}
									children={
										<FaEye fontSize='1.5rem' color={`${color.primaryColor}`} />
									}
								/>
							</Tooltip>
						) : null}
					</InputGroup>
					<FormErrorMessage {...formErrorStyles}>{text}</FormErrorMessage>
					<Button
						alignSelf='flex-end'
						type='submit'
						size='md'
						width='10rem'
						mt='1.8rem'
						color={color.white}
						bgColor={color.secondaryColor}
						_hover={{ bg: color.primaryColor }}
						_active={{ bg: color.primaryColor }}
						leftIcon={<FaFileSignature />}
					>
						Create Post
					</Button>
				</Flex>
			</FormControl>
			<Modal
				size='4xl'
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				motionPreset='scale'
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Markdown Preview</ModalHeader>
					<ModalCloseButton />
					<ModalBody mb='1rem'>
						<ReactMarkdown
							plugins={[gfm]}
							renderers={renderers}
							children={postInfo.text}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</React.Fragment>
	);
}

CreatePostForm.propTypes = {
	auth: PropTypes.object.isRequired,
	error: PropTypes.object,
	createNewPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

const mapDispatchToProps = { createNewPost };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
