import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Navbar = ({ icon }) => {
	return (
		<nav className="navbar bg-primary">
			<h1>
				<i className={icon} />
				{' '}Git<span style={{color: '#2DC450'}}>{'Hub'}</span> Finder
			</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</nav>
	);
};

Navbar.defaultProps = {
	icon: 'fab fa-github'
};
Navbar.propTypes = {
	icon: PropTypes.string.isRequired
};

export default Navbar;
