import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	Box,
	Flex,
	Spinner,
	Text,
	VStack,
	Link,
	Stack,
	Badge,
	Divider,
	Heading
} from '@chakra-ui/react';
import NoData from '../dashboard/NoData';
import useDeepEffect from '../custom-hooks/useDeepEffect';

const color = {
	white: '#ffffff',
	cardBg: '#F7FAFC',
	primaryColor: '#414f7a'
};

function GitHubReposCard({ username }) {
	const githubRef = useRef(null);
	const [gitHubInfo, setGitHubInfo] = useState({
		repoCount: 5,
		sortBy: 'created:asc',
		repositories: [],
		loading: true
	});

	useDeepEffect(() => {
		if (username) {
			axios
				.get(
					`https://api.github.com/users/${username}/repos?per_page=${gitHubInfo.repoCount}&sort=${gitHubInfo.sortBy}`,
					{
						headers: {
							Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`
						}
					}
				)
				.then((res) => {
					if (githubRef.current) {
						setGitHubInfo({
							...gitHubInfo,
							repositories: res.data,
							loading: false
						});
					}
				})
				.catch((err) => {
					if (githubRef.current) {
						setGitHubInfo({
							...gitHubInfo,
							loading: false
						});
					}
					console.error(`Unable to fetch GitHub repositories due to: ${err}`);
				});
		}
	}, [gitHubInfo, username]);

	return (
		<Flex
			direction='column'
			w='21rem'
			p='1rem'
			bg={color.cardBg}
			boxShadow='xs'
			ref={githubRef}
		>
			{gitHubInfo.loading ? (
				<VStack>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='#414f7a'
						size='xl'
					/>
					<Text fontSize='md'>Getting GitHub Repositories...</Text>
				</VStack>
			) : gitHubInfo.repositories.length > 0 ? (
				<React.Fragment>
					<Heading as='h4' size='md' textAlign='center' m='0.5rem 0 1rem 0'>
						Latest GitHub Repositories
					</Heading>
					{gitHubInfo.repositories.map((repo) => (
						<React.Fragment key={repo.id}>
							<Box _notFirst={{ marginTop: '1rem' }}>
								<Link
									fontSize='lg'
									fontWeight='700'
									color='blue.500'
									href={repo.html_url}
									isExternal={true}
									_focus={{
										outline: 'none'
									}}
								>
									{repo.name}
								</Link>
								<Text fontSize='0.9rem !important' mt='0.5rem !important'>
									{repo.description}
								</Text>
								<Stack direction='row' mt='0.8rem'>
									<Badge fontSize='sm' colorScheme='green' variant='solid'>
										Stars: {repo.stargazers_count}
									</Badge>
									<Badge fontSize='sm' colorScheme='blue' variant='solid'>
										Watchers: {repo.watchers_count}
									</Badge>
									<Badge fontSize='sm' colorScheme='red' variant='solid'>
										Forks: {repo.forks_count}
									</Badge>
								</Stack>
							</Box>
							<Divider mt='1rem' _last={{ display: 'none' }} />
						</React.Fragment>
					))}
				</React.Fragment>
			) : (
				<Flex justify='center' align='center'>
					<NoData
						heading='Sorry! No GitHub Repositories'
						subtitle={`Please make sure you have github account with ${username} or at least one repository available.`}
					/>
				</Flex>
			)}
		</Flex>
	);
}

GitHubReposCard.propTypes = {
	username: PropTypes.string.isRequired
};

export default GitHubReposCard;
