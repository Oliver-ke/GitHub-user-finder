import React, { useState, useContext } from 'react';
import GithubContext from './../../context/gitHub/githubContext';
import AlertContext from './../../context/alert/alertContext';
const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);
	const { querySearch, clearUsers, users } = githubContext;
	const { setAlert } = alertContext;

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
			{users.length > 0 && (
				<button className="btn btn-light btn-block" onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
