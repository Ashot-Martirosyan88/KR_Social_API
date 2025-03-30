import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getUsersTC } from '../../store/reducers/usersReducers/usersThunk';
import ContentLoader from 'react-content-loader';
import User from '../../components/User/User';
import styles from './Users.module.css';

const Users = () => {
	const dispatch = useDispatch();
	const { users, isLoading, currentPage, totalUsersCount, pageSize, error } =
		useSelector(state => state.usersData);

	useEffect(() => {
		if (users.length === 0) {
			dispatch(getUsersTC(currentPage, pageSize));
		}
	}, [dispatch, pageSize, users.length]);
	
	
		if (error) {
			return <div className={styles['error-message']}>Error: {error}</div>;
		}
	// Handle page change
	const handlePageClick = ({ selected }) => {
		const newPage = selected + 1;
		if (newPage !== currentPage) {
			dispatch(getUsersTC(newPage, pageSize));
		}
	};

	// Calculate total pages
	const pageCount = Math.ceil(totalUsersCount / pageSize);

	const UserSkeletonLoader = () => (
		<div className={styles['users-list']}>
			{Array.from({ length: pageSize }).map((_, index) => (
				<ContentLoader
					key={index}
					speed={2}
					width={280}
					height={100}
					viewBox='0 0 280 100'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
					className={styles['user-item']}
				>
					{/* Circle for avatar */}
					<circle cx='35' cy='50' r='35' />
					{/* Rectangle for name */}
					<rect x='80' y='30' rx='3' ry='3' width='140' height='15' />
					{/* Rectangle for status */}
					<rect x='80' y='55' rx='3' ry='3' width='100' height='10' />
				</ContentLoader>
			))}
		</div>
	);

	return (
		<div className={styles['users-container']}>
			{isLoading ? <UserSkeletonLoader /> : <User users={users ?? []} />}

			{totalUsersCount > 0 && (
				<ReactPaginate
					previousLabel='←'
					nextLabel='→'
					breakLabel='...'
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					onPageChange={handlePageClick}
					containerClassName={styles.pagination}
					activeClassName={styles.active}
					breakClassName={styles['break-me']}
					pageClassName={styles['page-item']}
					previousClassName={styles['previous-button']}
					nextClassName={styles['next-button']}
					disabledClassName={styles.disabled}
					forcePage={currentPage - 1}
				/>
			)}
		</div>
	);
};

export default Users;
