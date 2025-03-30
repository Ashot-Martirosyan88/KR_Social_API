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
				const userId = response.data.data.id;
				if (userId) {
					try {
						const profileResponse = await API.getUserProfile(userId);
						dispatch(
							setUserDataAC({
								...response.data.data,
								profile: profileResponse.data,
							})
						);
					} catch (profileError) {
						console.error(
							'Error fetching profile during auth check:',
							profileError
						);
					}
				}
			} else {
				console.log(
					'Auth check failed with result code:',
					response.data.resultCode
				);
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
			dispatch(setAuthErrorAC(null)); 

			const response = await API.login(email, password, rememberMe);

			if (response.data.resultCode === 0) {
				dispatch(checkAuthTC());
			} else {
				const errorMessage =
					response.data.messages && response.data.messages.length > 0
						? response.data.messages[0]
						: 'Login failed. Check your credentials.';
				dispatch(setAuthErrorAC(errorMessage));
			}
		} catch (error) {
			dispatch(setAuthErrorAC(error.message || 'Login failed. Network error.'));
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
