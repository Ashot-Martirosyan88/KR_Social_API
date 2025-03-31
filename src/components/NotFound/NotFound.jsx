import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.notFoundContainer}>
			<h1 className={styles.errorCode}>404</h1>
			<h2 className={styles.errorTitle}>Page Not Found</h2>
			<p className={styles.errorMessage}>
				The page you are looking for might have been removed or is temporarily
				unavailable.
			</p>
			<NavLink to='/' className={styles.homeButton}>
				Go to Homepage
			</NavLink>
		</div>
	);
};

export default NotFound;
