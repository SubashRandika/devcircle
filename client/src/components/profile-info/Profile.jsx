import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../redux/actions/profileActions';
import ProfileInfoCard from './ProfileInfoCard';
import Loading from '../common/Loading';
import BioSkillsCard from './BioSkillsCard';
import ProficiencyTimeline from './ProficiencyTimeline';
import GitHubReposCard from './GitHubReposCard';

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
						<ProficiencyTimeline
							experience={currentProfile.experience}
							education={currentProfile.education}
						/>
					</Box>
					<Box w='19rem'>
						<GitHubReposCard username={currentProfile.githubusername} />
					</Box>
				</React.Fragment>
			);
		}
	}

	return (
		<Flex justify='center'>
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
