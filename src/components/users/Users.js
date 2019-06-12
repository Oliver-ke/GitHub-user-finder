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
				<div className="grid-3-2">{users.map((user) => <UserItem key={user.id} user={user} />)}</div>
			)}
		</Fragment>
	);
};

export default Users;
