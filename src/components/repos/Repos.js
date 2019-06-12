import React, { Fragment, useContext } from 'react';
import RepoItem from './RepoItem';
import GithubContext from '../../context/gitHub/githubContext';
const Repos = () => {
	const { repos } = useContext(GithubContext);
	return <Fragment>{repos.map((repo) => <RepoItem repo={repo} key={repo.id} />)}</Fragment>;
};

export default Repos;
