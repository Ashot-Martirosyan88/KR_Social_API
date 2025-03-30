import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = () => {
	return (
		<div className={styles.layout}>
			<Nav />
			<main className={styles.main}>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
