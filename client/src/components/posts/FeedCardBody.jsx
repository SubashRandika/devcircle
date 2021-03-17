import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
	Flex,
	Box,
	Heading,
	Stack,
	Text,
	Avatar,
	IconButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	PopoverFooter,
	ButtonGroup,
	Button,
	useToast
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaTrashAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import renderers from './renderConfigs';
import { removePost } from '../../redux/actions/postActions';

const color = {
	secondaryTextColor: '#545454'
};

dayjs.extend(relativeTime);

function FeedCardBody({ post, auth, removePost }) {
	const initialFocusRef = useRef();
	const toast = useToast();
	const { _id, text, name, avatar, date } = post;

	const handleDeletePost = (id) => {
		removePost(id, toast);
	};

	return (
		<React.Fragment>
			<Flex justify='space-between' align='center'>
				<Flex>
					<Avatar w='2.6rem' h='2.6rem' name={name} src={avatar} />
					<Stack direction='column' spacing={0} ml='1rem'>
						<Heading as='h1' fontSize='lg'>
							{name}
						</Heading>
						<Text fontSize='xs' color={`${color.secondaryTextColor}`}>
							{dayjs().diff(dayjs(date), 'd') >= 1
								? dayjs(date).format('MMMM D, YYYY h:mm a')
								: dayjs(date).fromNow()}
						</Text>
					</Stack>
				</Flex>
				{post.user === auth.user.id ? (
					<Popover
						placement='bottom'
						isLazy={true}
						initialFocusRef={initialFocusRef}
					>
						<PopoverTrigger>
							<IconButton
								variant='ghost'
								colorScheme='red'
								aria-label='Options'
								icon={<FaTrashAlt />}
								size='md'
								borderRadius='50%'
								cursor='pointer'
							></IconButton>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader fontWeight='700'>
								Delete Confirmation
							</PopoverHeader>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverBody>
								Are you sure you want to delete this post?
							</PopoverBody>
							<PopoverFooter d='flex' justifyContent='flex-end'>
								<ButtonGroup size='sm'>
									<Button
										colorScheme='red'
										ref={initialFocusRef}
										onClick={() => handleDeletePost(_id)}
									>
										Delete
									</Button>
								</ButtonGroup>
							</PopoverFooter>
						</PopoverContent>
					</Popover>
				) : null}
			</Flex>
			<Box w='100%' mt='1rem'>
				<ReactMarkdown plugins={[gfm]} renderers={renderers} children={text} />
			</Box>
		</React.Fragment>
	);
}

FeedCardBody.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	removePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

const mapDispatchToProps = { removePost };

export default connect(mapStateToProps, mapDispatchToProps)(FeedCardBody);
