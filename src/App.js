import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import User from './components/users/User';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import Alert from './components/layout/Alert';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ justMounted, setJustMounted ] = useState(false);
	const [ alert, setAlert ] = useState(null);
	const reqFirstMount = async () => {
		setLoading(true);
		setJustMounted(true);
		try {
			const res = await fetch(
				`https://api.github.com/users?client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&cliant_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			const data = await res.json();
			setUsers(data);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		reqFirstMount();
	}, []);

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};
	const triggerAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => setAlert(null), 1500);
	};
	const querySearch = async (searchValue) => {
		searchValue = searchValue.toLowerCase();
		setJustMounted(false);
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.github.com/search/users?q=${searchValue}&client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&cliant_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			const data = await res.json();
			setUser(data.items);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	// get a single github user
	const getUser = async (username) => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.github.com/users/${username}?client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&cliant_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			const data = await res.json();
			setLoading(false);
			setUser(data);
		} catch (err) {
			console.log(err);
		}
	};

	// get users repos
	const getUserRepos = async (username) => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
					.REACT_APP_GITHUB_CLIENT_ID}&cliant_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
			);
			const data = await res.json();
			setLoading(false);
			setRepos(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="container">
					<Alert alert={alert} />
					<Switch>
						<Route
							path="/"
							exact
							render={() => (
								<Fragment>
									<Search
										querySearch={querySearch}
										clearUsers={clearUsers}
										showClear={(users.length > 0) & !justMounted ? true : false}
										setAlert={triggerAlert}
									/>
									<Users users={users} loading={loading} />
								</Fragment>
							)}
						/>
						<Route exact path="/about" component={About} />
						<Route
							exact
							path="/user/:login"
							render={(props) => (
								<User
									{...props}
									getUser={getUser}
									user={user}
									loading={loading}
									getUserRepos={getUserRepos}
									repos={repos}
								/>
							)}
						/>
					</Switch>
				</div>
			</div>
		</Router>
	);
};

export default App;

// JSX => Javascript syntax extension;
