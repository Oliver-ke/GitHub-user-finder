import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ querySearch, clearUsers, showClear, setAlert }) => {
	const [ searchText, setSearchText ] = useState('');
	const handleTextChange = (e) => setSearchText(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchText === '') {
			setAlert('Please enter something', 'light');
		} else {
			querySearch(searchText);
			setSearchText('');
		}
	};
	return (
		<div>
			<form onSubmit={handleSubmit} className="form">
				<input
					value={searchText}
					type="text"
					onChange={handleTextChange}
					name="search"
					placeholder="Search User.."
				/>
				<input type="submit" className="btn btn-block btn-dark" title="Search" />
			</form>
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	querySearch: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired
};
export default Search;
