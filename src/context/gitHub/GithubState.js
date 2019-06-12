// contains initial state and action
import React, { useReducer } from 'react';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_REPOS,
	GET_USER,
	GET_INITIAL_USERS,
	SET_JUST_MOUNTED
} from '../types';

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		justMounted: true
	};

	const [ state, dispatch ] = useReducer(githubReducer, initialState);
	// search users
	const querySearch = async (searchValue) => {
		searchValue = searchValue.toLowerCase();
		//setJustMounted(false);
		setLoading();
		try {
			const res = await fetch(
				`https://api.github.com/search/users?q=${searchValue}&client_id=${githubClientId}&cliant_secret=${githubClientSecret}`
			);
			const data = await res.json();
			dispatch({ type: SEARCH_USERS, payload: data.items });
		} catch (err) {
			console.log(err);
		}
	};

	// get user
	const getUser = async (username) => {
		setLoading();
		try {
			const res = await fetch(
				`https://api.github.com/users/${username}?client_id=${githubClientId}&cliant_secret=${githubClientSecret}`
			);
			const data = await res.json();
			dispatch({ type: GET_USER, payload: data });
		} catch (err) {
			console.log(err);
		}
	};

	// get initialUsers
	const getInitialUsers = async () => {
		dispatch({ type: SET_JUST_MOUNTED });
		setLoading();
		try {
			const res = await fetch(
				`https://api.github.com/users?client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&cliant_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			const data = await res.json();
			dispatch({ type: GET_INITIAL_USERS, payload: data });
		} catch (err) {
			console.log(err);
		}
	};

	// get repos
	const getUserRepos = async (username) => {
		setLoading();
		try {
			const res = await fetch(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&cliant_secret=${githubClientSecret}`
			);
			const data = await res.json();
			dispatch({ type: GET_REPOS, payload: data });
		} catch (err) {
			console.log(err);
		}
	};

	// clear users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	//set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<githubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				justMounted: state.justMounted,
				querySearch,
				clearUsers,
				getUser,
				getUserRepos,
				getInitialUsers
			}}
		>
			{props.children}
		</githubContext.Provider>
	);
};

export default GithubState;
