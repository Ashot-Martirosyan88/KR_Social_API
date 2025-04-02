import { NavLink } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.notFoundContainer}>
			<h1 className={styles.notFoundTitle}>404</h1>
			<h2 className={styles.notFoundSubtitle}>Page Not Found</h2>
			<p className={styles.notFoundText}>
				The page you are looking for does not exist or has been moved.
			</p>
			<NavLink to='/' className={styles.notFoundLink}>
				Go to Home Page
			</NavLink>
		</div>
	);
};

export default NotFound;
