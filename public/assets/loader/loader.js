// import ContentLoader from 'react-content-loader';
// import { useSelector } from 'react-redux';
// import styles from '../../../src/pages/Users/Users.module.css';

// export const UserSkeletonLoader = () => {
// 	const pageSize = useSelector(state => state.usersData.pageSize);

// 	return (
// 		<div className={styles['users-list']}>
// 			{Array.from({ length: pageSize }).map((_, index) => (
// 				<ContentLoader
// 					key={index}
// 					speed={2}
// 					width={280}
// 					height={100}
// 					viewBox='0 0 280 100'
// 					backgroundColor='#f3f3f3'
// 					foregroundColor='#ecebeb'
// 					className={styles['user-item']}
// 				>
// 					{/* Circle for avatar */}
// 					<circle cx='35' cy='50' r='35' />
// 					{/* Rectangle for name */}
// 					<rect x='80' y='30' rx='3' ry='3' width='140' height='15' />
// 					{/* Rectangle for status */}
// 					<rect x='80' y='55' rx='3' ry='3' width='100' height='10' />
// 				</ContentLoader>
// 			))}
// 		</div>
// 	);
// };
