import React, { Fragment } from 'react';
import RepoItem from './RepoItem';
import PropTypes from 'prop-types';

const Repos = ({ repos }) => {
	return <Fragment>{repos.map((repo) => <RepoItem repo={repo} key={repo.id} />)}</Fragment>;
};

Repos.propTypes = {
	repos: PropTypes.array.isRequired
};

export default Repos;
