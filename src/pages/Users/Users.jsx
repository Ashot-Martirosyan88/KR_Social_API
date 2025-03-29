import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getUsersTC } from '../../store/reducers/usersReducers/usersThunk';
import User from '../../components/User/User';
import './Users.css'; 

const Users = () => {
	const dispatch = useDispatch();
	const { users, isLoading, currentPage, totalUsersCount, pageSize, error } =
		useSelector(state => state.usersData);

	useEffect(() => {
		dispatch(getUsersTC(currentPage, pageSize));
	}, [dispatch, currentPage, pageSize]);

	const handlePageClick = ({ selected }) => {
		dispatch(getUsersTC(selected + 1, pageSize));
	};

	const pageCount = Math.ceil(totalUsersCount / pageSize);

	if (error) {
		return <div className='error-message'>Error: {error}</div>;
	}

	return (
		<div className='users-container'>
			{isLoading ? (
				<div className='loading'>Loading...</div>
			) : (
				<User users={users} />
			)}

			{totalUsersCount > 0 && (
				<ReactPaginate
					previousLabel={'←'}
					nextLabel={'→'}
					breakLabel={'...'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					activeClassName={'active'}
					forcePage={currentPage - 1}
				/>
			)}
		</div>
	);
};

export default Users;
