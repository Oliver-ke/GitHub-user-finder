import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const UserItem = ({ user: { avatar_url, login, html_url } }) => {
	let displayName;
	if(login.length > 5){
		displayName = `${login.slice(0,5)}...`	
		displayName[0].toUpperCase();
	}else{
		displayName = login
		displayName[0].toUpperCase();
	}
	return (
		<div className="card text-center">
			<img src={avatar_url} alt="user" className="round-img" style={{ width: '60px' }} />
			<h3>{displayName}</h3>
			<div>
				<Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
					More..
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserItem;
