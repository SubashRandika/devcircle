import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, HStack, Stack, VStack, Wrap } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profileActions';
import ProfileCard from './ProfileCard';
import Loading from '../common/Loading';
import NoData from '../common/NoData';

const color = {
	primaryColor: '#414f7a'
};

function Profiles({ profile, getAllProfiles }) {
	const { profiles, loading } = profile;
	let profilesContent;

	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);

	if (loading) {
		profilesContent = (
			<Flex w='100%' justify='center' align='center'>
				<Loading color={color.primaryColor} text='Loading...' />
			</Flex>
		);
	} else {
		if (profiles) {
			profilesContent = profiles.map((profile) => (
				<ProfileCard key={profile._id} profile={profile} />
			));
		} else {
			profilesContent = (
				<Flex w='100%' h='60vh' justify='center' align='center'>
					<NoData
						heading='Sorry! No Profiles Available Yet'
						subtitle='When more developers signup, will immediately appear in here. Keep exploring.'
					/>
				</Flex>
			);
		}
	}

	return (
		<Stack direction='column' ml='4rem'>
			<VStack mb={8} spacing='0.1rem'>
				<Heading as='h1' size='xl'>
					Developer Profiles
				</Heading>
				<HStack>
					<Heading
						as='h2'
						fontSize='1.3rem'
						fontWeight='400'
						display={profiles ? 'block' : 'none'}
					>
						Search and connect with other developers.
					</Heading>
				</HStack>
			</VStack>
			<Wrap spacing='2.5rem'>{profilesContent}</Wrap>
		</Stack>
	);
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

const mapDispatchToProps = { getAllProfiles };

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
