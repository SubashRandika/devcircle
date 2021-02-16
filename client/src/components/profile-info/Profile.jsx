import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../redux/actions/profileActions';
import ProfileInfoCard from './ProfileInfoCard';
import Loading from '../common/Loading';
import BioSkillsCard from './BioSkillsCard';

const color = {
	primaryColor: '#414f7a'
};

function Profile({ profile, getProfileByHandle }) {
	const { handle } = useParams();
	const { currentProfile, loading } = profile;
	let profileContent;

	useEffect(() => {
		getProfileByHandle(handle);
	}, [getProfileByHandle, handle]);

	if (loading) {
		profileContent = <Loading color={color.primaryColor} text='Loading...' />;
	} else {
		if (currentProfile) {
			profileContent = (
				<React.Fragment>
					<Flex direction='column'>
						<ProfileInfoCard currentProfile={currentProfile} />
						<BioSkillsCard
							name={currentProfile.user.name}
							bio={currentProfile.bio}
							skills={currentProfile.skills}
						/>
					</Flex>
					<Box flex='1'>
						<Text>Box 2</Text>
					</Box>
					<Box w='25rem'>
						<Text>Box 3</Text>
					</Box>
				</React.Fragment>
			);
		}
	}

	return (
		<Flex m='0 4.063rem' justify='center'>
			{profileContent}
		</Flex>
	);
}

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

const mapDispatchToProps = { getProfileByHandle };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
