import {
	GET_USERS,
	SET_LOADING,
	SET_PAGE,
	SET_TOTAL_COUNT,
	SET_ERROR,
} from './usersAction';
import { initialState } from './usersState';

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, error: null };
		case SET_LOADING:
			return { ...state, isLoading: action.payload };
		case SET_PAGE:
			return { ...state, currentPage: action.payload };
		case SET_TOTAL_COUNT:
			return { ...state, totalUsersCount: action.payload };
		case SET_ERROR:
			return { ...state, error: action.payload, isLoading: false };
		default:
			return state;
	}
};

export default usersReducer;
