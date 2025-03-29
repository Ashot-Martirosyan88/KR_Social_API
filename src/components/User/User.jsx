import { FaRegUserCircle } from 'react-icons/fa';
import './User.css';

const User = ({ users }) => {
	if (!users || users.length === 0) {
		return <div className='no-users'>No users found</div>;
	}

	return (
		<ul className='users-list'>
			{users.map(user => (
				<li key={user.id} className='user-item'>
					<div className='user-avatar'>
						{user.photos?.small ? (
							<img src={user.photos.small} alt={user.name} />
						) : (
							<FaRegUserCircle size={60} />
						)}
					</div>
					<div className='user-info'>
						<h3>{user.name}</h3>
						{user.status && <p>{user.status}</p>}
					</div>
				</li>
			))}
		</ul>
	);
};

export default User;
