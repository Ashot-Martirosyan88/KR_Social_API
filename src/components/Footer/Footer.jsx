import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.content}>
					<p className={styles.copyright}>
						© {currentYear} SocialApp. Made with{' '}
						<FaHeart className={styles.heartIcon} /> by Dev Team
					</p>
					<div className={styles.socialLinks}>
						<a
							href='https://github.com'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
						>
							<FaGithub />
						</a>
						<a
							href='https://linkedin.com'
							target='_blank'
							rel='noopener noreferrer'
							className={styles.socialLink}
						>
							<FaLinkedin />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
