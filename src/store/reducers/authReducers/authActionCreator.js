import {
	SET_USER_DATA,
	SET_AUTH_LOADING,
	SET_AUTH_ERROR,
	LOGOUT,
} from './authAction';

export const setUserDataAC = userData => ({
	type: SET_USER_DATA,
	payload: userData,
});

export const setAuthLoadingAC = isLoading => ({
	type: SET_AUTH_LOADING,
	payload: isLoading,
});

export const setAuthErrorAC = error => ({
	type: SET_AUTH_ERROR,
	payload: error,
});

export const logoutAC = () => ({
	type: LOGOUT,
});
