import React from 'react';
import PropTypes from 'prop-types';
import {
	Flex,
	Box,
	Heading,
	Stack,
	Text,
	Avatar,
	IconButton,
	Tooltip
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaTrashAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import renderers from './renderConfigs';

const color = {
	secondaryTextColor: '#545454'
};

dayjs.extend(relativeTime);

function FeedCardBody({ post, auth }) {
	const { text, name, avatar, date } = post;

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
					<Tooltip
						label='Delete post'
						placement='left'
						aria-label='Delete post'
					>
						<IconButton
							variant='ghost'
							colorScheme='red'
							aria-label='Options'
							icon={<FaTrashAlt />}
							size='md'
							borderRadius='50%'
							cursor='pointer'
						></IconButton>
					</Tooltip>
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
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, null)(FeedCardBody);
