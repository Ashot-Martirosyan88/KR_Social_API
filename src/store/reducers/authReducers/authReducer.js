import {
	SET_USER_DATA,
	SET_AUTH_LOADING,
	SET_AUTH_ERROR,
	LOGOUT,
} from './authAction';
import { initialState } from './authState';

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				error: null,
			};
		case SET_AUTH_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_AUTH_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export default authReducer;
