import API from '../../../api/api';
import {
	setUserProfileAC,
	setProfileLoadingAC,
	setProfileErrorAC,
	setUserStatusAC,
} from './profileActionCreator';

export const getUserProfileTC = userId => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			const response = await API.getUserProfile(userId);
			dispatch(setUserProfileAC(response.data));

			// Also fetch user status
			dispatch(getUserStatusTC(userId));
		} catch (error) {
			dispatch(setProfileErrorAC(error.message || 'Failed to fetch profile'));
			console.error('Error fetching profile:', error);
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};

export const getUserStatusTC = userId => {
	return async dispatch => {
		try {
			const response = await API.getUserStatus(userId);
			dispatch(setUserStatusAC(response.data));
		} catch (error) {
			console.error('Error fetching status:', error);
		}
	};
};

export const updateUserStatusTC = status => {
	return async dispatch => {
		try {
			const response = await API.updateUserStatus(status);
			if (response.data.resultCode === 0) {
				dispatch(setUserStatusAC(status));
			}
		} catch (error) {
			dispatch(setProfileErrorAC(error.message || 'Failed to update status'));
			console.error('Error updating status:', error);
		}
	};
};

export const updateUserPhotoTC = file => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			const response = await API.updateUserPhoto(file);
			if (response.data.resultCode === 0) {
				// Update profile with new photos
				dispatch(
					setUserProfileAC({
						...response.data.data,
					})
				);
			} else {
				dispatch(
					setProfileErrorAC(
						response.data.messages[0] || 'Failed to update photo'
					)
				);
			}
		} catch (error) {
			dispatch(setProfileErrorAC(error.message || 'Failed to update photo'));
			console.error('Error updating photo:', error);
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};
