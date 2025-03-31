import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUsers, FaUserAlt, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { logoutTC } from '../../store/reducers/authReducers/authThunk';
import styles from './Nav.module.css';

const Nav = () => {
	const { isAuthenticated, user } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logoutTC());
		navigate('/login');
	};

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<NavLink to='/' className={styles.logo}>
					SocialApp
				</NavLink>

				<div className={styles.navLinks}>
					<NavLink to='/users' className={styles.navLink}>
						<FaUsers className={styles.icon} />
						<span>Users</span>
					</NavLink>

					{isAuthenticated ? (
						<>
							<NavLink to='/profile' className={styles.navLink}>
								<FaUserAlt className={styles.icon} />
								<span>Profile</span>
							</NavLink>
							<button onClick={handleLogout} className={styles.navButton}>
								<FaSignOutAlt className={styles.icon} />
								<span>Logout</span>
							</button>
							{user?.photos?.small && (
								<div className={styles.userAvatar}>
									<img src={user.photos.small} alt={user.name} />
								</div>
							)}
						</>
					) : (
						<NavLink to='/login' className={styles.navLink}>
							<FaSignInAlt className={styles.icon} />
							<span>Login</span>
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
