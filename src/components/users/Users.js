import React, { Fragment, useContext, useEffect } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from './../../context/gitHub/githubContext';

const Users = () => {
	const githubContext = useContext(GithubContext);
	const { users, loading, getInitialUsers, justMounted } = githubContext;

	useEffect(() => {
		if (justMounted) {
			getInitialUsers();
		}
		// eslint-disable-next-line
	}, []);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<div style={usersStyle}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>
			)}
		</Fragment>
	);
};

const usersStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
