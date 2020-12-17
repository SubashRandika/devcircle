import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Stack, Text, Heading } from '@chakra-ui/react';
import { connect } from 'react-redux';

function CreateProfile({ profile, errors }) {
	const [showSocialInputs, setShowSocialInputs] = useState(false);
	const [profileInfo, setProfileInfo] = useState({
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		bio: '',
		githubusername: '',
		youtube: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		instagram: '',
		github: ''
	});

	return (
		<Flex justify='center'>
			<Stack spacing={3} textAlign='center'>
				<Heading size='2xl'>Create Your Profile</Heading>
				<Text fontSize='xl'>
					Let's get some additional information to make your profile stand out
				</Text>
			</Stack>
		</Flex>
	);
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps)(CreateProfile);
