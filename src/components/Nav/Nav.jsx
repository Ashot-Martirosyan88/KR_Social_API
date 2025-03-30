import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaUsers, FaUserAlt, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { logoutTC } from '../../store/reducers/authReducer/authThunk';
import styles from './Navbar.module.css';

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
				<Link to='/' className={styles.logo}>
					SocialApp
				</Link>

				<div className={styles.navLinks}>
					<Link to='/users' className={styles.navLink}>
						<FaUsers className={styles.icon} />
						<span>Users</span>
					</Link>

					{isAuthenticated ? (
						<>
							<Link to='/profile' className={styles.navLink}>
								<FaUserAlt className={styles.icon} />
								<span>Profile</span>
							</Link>
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
						<Link to='/login' className={styles.navLink}>
							<FaSignInAlt className={styles.icon} />
							<span>Login</span>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
