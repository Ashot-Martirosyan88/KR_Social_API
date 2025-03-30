import {
	SET_USER_PROFILE,
	SET_PROFILE_LOADING,
	SET_PROFILE_ERROR,
	SET_USER_STATUS,
} from './profileAction';
import { initialState } from './profileState';

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
			return {
				...state,
				profile: action.payload,
				error: null,
			};
		case SET_PROFILE_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		case SET_PROFILE_ERROR:
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};
		case SET_USER_STATUS:
			return {
				...state,
				status: action.payload,
			};
		default:
			return state;
	}
};

export default profileReducer;
