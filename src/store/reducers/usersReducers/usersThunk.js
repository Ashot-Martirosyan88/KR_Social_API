import API from '../../../api/api';
import {
	setLoadingAC,
	getUsersAC,
	setPageAC,
	setTotalCountAC,
	setErrorAC,
} from './usersActionCreater';

export const getUsersTC = (page = 1, count = 10) => {
	return async dispatch => {
		try {
			dispatch(setLoadingAC(true));
			dispatch(setPageAC(page));

			const response = await API.getUsers(page, count);
			dispatch(getUsersAC(response.data.items));
			dispatch(setTotalCountAC(response.data.totalCount));
		} catch (error) {
			dispatch(setErrorAC(error.message || 'Failed to fetch users'));
			console.error('Error fetching users:', error);
		} finally {
			dispatch(setLoadingAC(false));
		}
	};
};
