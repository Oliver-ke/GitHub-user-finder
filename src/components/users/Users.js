import React, { Fragment } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => (
	<Fragment>
		{loading ? (
			<Spinner />
		) : (
			<div style={usersStyle}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>
		)}
	</Fragment>
);

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const usersStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default Users;
