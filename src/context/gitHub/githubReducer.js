import {
	SEARCH_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_REPOS,
	GET_USER,
	GET_INITIAL_USERS,
	SET_JUST_MOUNTED
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: true };
		case SEARCH_USERS:
			return { ...state, users: action.payload, loading: false };
		case CLEAR_USERS:
			return { ...state, users: [], loading: false };
		case GET_USER:
			return { ...state, user: action.payload, loading: false };
		case GET_REPOS:
			return { ...state, repos: action.payload, loading: false };
		case GET_INITIAL_USERS:
			return { ...state, users: action.payload, justMounted: false, loading: false };
		case SET_JUST_MOUNTED:
			return { ...state, justMounted: true, loading: true };
		default:
			return state;
	}
};
