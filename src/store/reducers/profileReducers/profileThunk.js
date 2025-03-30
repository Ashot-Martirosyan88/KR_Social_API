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
			dispatch(setProfileErrorAC(null));

			console.log('Fetching profile for user ID:', userId);
			const response = await API.getUserProfile(userId);

			if (response.data) {
				dispatch(setUserProfileAC(response.data));
				console.log('Profile data loaded:', response.data);
			} else {
				throw new Error('No profile data received');
			}

			dispatch(getUserStatusTC(userId));
			return response.data; 
		} catch (error) {
			const errorMessage = error.message || 'Failed to fetch profile';
			dispatch(setProfileErrorAC(errorMessage));
			console.error('Error fetching profile:', error);
			throw error; 
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};

export const getUserStatusTC = userId => {
	return async dispatch => {
		try {
			const response = await API.getUserStatus(userId);
			dispatch(setUserStatusAC(response.data || ''));
		} catch (error) {
			console.error('Error fetching status:', error);
		}
	};
};

export const updateUserStatusTC = status => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			const response = await API.updateUserStatus(status);

			if (response.data.resultCode === 0) {
				dispatch(setUserStatusAC(status));
			} else {
				throw new Error(response.data.messages[0] || 'Failed to update status');
			}
		} catch (error) {
			dispatch(setProfileErrorAC(error.message || 'Failed to update status'));
			console.error('Error updating status:', error);
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};

export const updateUserPhotoTC = file => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			const response = await API.updateUserPhoto(file);

			if (response.data.resultCode === 0) {
				const currentProfile = await API.getUserProfile(
					response.data.data.userId
				);

				dispatch(
					setUserProfileAC({
						...currentProfile.data,
						photos: response.data.data.photos,
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
