import API from '../../../api/api';
import {
	setUserProfileAC,
	setProfileLoadingAC,
	setProfileErrorAC,
	setUserStatusAC,
	updateUserProfileAC,
	updateProfilePhotoAC,
} from './profileActionCreator';

export const getUserProfileTC = userId => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			const response = await API.getUserProfile(userId);
			dispatch(setUserProfileAC(response.data));
			return response.data;
		} catch (error) {
			dispatch(
				setProfileErrorAC(error.message || 'Failed to fetch user profile')
			);
			console.error('Error fetching user profile:', error);
			throw error;
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};

export const updateUserProfileTC = profileData => {
	return async dispatch => {
		try {
			dispatch(setProfileLoadingAC(true));
			dispatch(setProfileErrorAC(null));

			const sanitizedProfile = {
				userId: profileData.userId,
				fullName: profileData.fullName,
				aboutMe: profileData.aboutMe || '',
				lookingForAJob: Boolean(profileData.lookingForAJob),
				lookingForAJobDescription: profileData.lookingForAJobDescription || '',
				contacts: {
					github: profileData.contacts?.github || '',
					vk: profileData.contacts?.vk || '',
					facebook: profileData.contacts?.facebook || '',
					instagram: profileData.contacts?.instagram || '',
					twitter: profileData.contacts?.twitter || '',
					website: profileData.contacts?.website || '',
					youtube: profileData.contacts?.youtube || '',
					mainLink: profileData.contacts?.mainLink || '',
				},
			};

			console.log('Sending profile update:', sanitizedProfile);
			const response = await API.updateUserProfile(sanitizedProfile);

			if (response.data.resultCode === 0) {
				dispatch(updateUserProfileAC(sanitizedProfile));
				return response.data;
			} else {
				const errorMessage =
					response.data.messages && response.data.messages.length > 0
						? response.data.messages[0]
						: 'Failed to update profile';
				throw new Error(errorMessage);
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			dispatch(setProfileErrorAC(error.message || 'Failed to update profile'));
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
				dispatch(updateProfilePhotoAC(response.data.data.photos));
				return response.data.data.photos;
			} else {
				const errorMessage =
					response.data.messages && response.data.messages.length > 0
						? response.data.messages[0]
						: 'Failed to update photo';
				dispatch(setProfileErrorAC(errorMessage));
				throw new Error(errorMessage);
			}
		} catch (error) {
			const errorMessage = error.message || 'Failed to update photo';
			dispatch(setProfileErrorAC(errorMessage));
			console.error('Error updating photo:', error);
			throw error;
		} finally {
			dispatch(setProfileLoadingAC(false));
		}
	};
};
