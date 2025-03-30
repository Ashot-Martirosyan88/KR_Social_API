import { FaRegUserCircle } from 'react-icons/fa';
import styles from './User.module.css';

const User = ({ users }) => {
	if (!users || users.length === 0) {
		return <div className={styles['no-users']}>No users found</div>;
	}

	return (
		<ul className={styles['users-list']}>
			{users.map(user => (
				<li key={user.id} className={styles['user-item']}>
					<div className={styles['user-avatar']}>
						{user.photos?.small ? (
							<img src={user.photos.small} alt={user.name} />
						) : (
							<FaRegUserCircle size={60} color='#c5c9d6' />
						)}
					</div>
					<div className={styles['user-info']}>
						<h3>{user.name}</h3>
						{user.status && <p>{user.status}</p>}
					</div>
				</li>
			))}
		</ul>
	);
};

export default User;
