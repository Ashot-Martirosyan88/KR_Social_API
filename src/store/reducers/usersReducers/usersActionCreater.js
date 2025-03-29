import {
	GET_USERS,
	SET_LOADING,
	SET_PAGE,
	SET_TOTAL_COUNT,
	SET_ERROR,
} from './usersAction';

export const getUsersAC = users => ({ type: GET_USERS, payload: users });
export const setLoadingAC = isLoading => ({
	type: SET_LOADING,
	payload: isLoading,
});
export const setPageAC = page => ({ type: SET_PAGE, payload: page });
export const setTotalCountAC = totalCount => ({
	type: SET_TOTAL_COUNT,
	payload: totalCount,
});
export const setErrorAC = error => ({ type: SET_ERROR, payload: error });
