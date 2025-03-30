import API from '../../../api/api';
import {
	setUserDataAC,
	setAuthLoadingAC,
	setAuthErrorAC,
	logoutAC,
} from './authActionCreator';

export const checkAuthTC = () => {
	return async dispatch => {
		try {
			dispatch(setAuthLoadingAC(true));
			const response = await API.me();

			if (response.data.resultCode === 0) {
				dispatch(setUserDataAC(response.data.data));
			}
		} catch (error) {
			dispatch(setAuthErrorAC(error.message || 'Authorization failed'));
			console.error('Auth check error:', error);
		} finally {
			dispatch(setAuthLoadingAC(false));
		}
	};
};

export const loginTC = (email, password, rememberMe) => {
	return async dispatch => {
		try {
			dispatch(setAuthLoadingAC(true));
			const response = await API.login(email, password, rememberMe);

			if (response.data.resultCode === 0) {
				dispatch(checkAuthTC());
			} else {
				dispatch(setAuthErrorAC(response.data.messages[0] || 'Login failed'));
			}
		} catch (error) {
			dispatch(setAuthErrorAC(error.message || 'Login failed'));
			console.error('Login error:', error);
		} finally {
			dispatch(setAuthLoadingAC(false));
		}
	};
};

export const logoutTC = () => {
	return async dispatch => {
		try {
			dispatch(setAuthLoadingAC(true));
			const response = await API.logout();

			if (response.data.resultCode === 0) {
				dispatch(logoutAC());
			} else {
				dispatch(setAuthErrorAC(response.data.messages[0] || 'Logout failed'));
			}
		} catch (error) {
			dispatch(setAuthErrorAC(error.message || 'Logout failed'));
			console.error('Logout error:', error);
		} finally {
			dispatch(setAuthLoadingAC(false));
		}
	};
};
