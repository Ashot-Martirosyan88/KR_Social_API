import {
	SET_USER_PROFILE,
	SET_PROFILE_LOADING,
	SET_PROFILE_ERROR,
	SET_USER_STATUS,
} from './profileAction';

export const setUserProfileAC = profile => ({
	type: SET_USER_PROFILE,
	payload: profile,
});

export const setProfileLoadingAC = isLoading => ({
	type: SET_PROFILE_LOADING,
	payload: isLoading,
});

export const setProfileErrorAC = error => ({
	type: SET_PROFILE_ERROR,
	payload: error,
});

export const setUserStatusAC = status => ({
	type: SET_USER_STATUS,
	payload: status,
});
