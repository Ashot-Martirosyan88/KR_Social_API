import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { getUserProfileTC } from '../../store/reducers/profileReducers/profileThunk';
import ContentLoader from 'react-content-loader';
import styles from './Profile.module.css';

const Profile = () => {
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector(state => state.auth);
	const { profile, isLoading, error } = useSelector(state => state.profile);
	const [isDataLoaded, setIsDataLoaded] = useState(false);

	useEffect(() => {
		if (isAuthenticated && user?.id) {
			console.log('Fetching profile for user ID:', user.id);
			dispatch(getUserProfileTC(user.id))
				.then(() => {
					setIsDataLoaded(true);
				})
				.catch(error => {
					console.error('Error in profile component:', error);
					setIsDataLoaded(true);
				});
		}
	}, [dispatch, user, isAuthenticated]);

	if (isLoading || !isDataLoaded) {
		return (
			<div className={styles.loaderContainer}>
				<ContentLoader
					speed={2}
					width={800}
					height={400}
					viewBox='0 0 800 400'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='16' ry='16' width='800' height='200' />
					<circle cx='100' cy='250' r='70' />
					<rect x='200' y='220' rx='8' ry='8' width='300' height='30' />
					<rect x='200' y='270' rx='8' ry='8' width='400' height='20' />
					<rect x='200' y='310' rx='8' ry='8' width='500' height='20' />
					<rect x='200' y='350' rx='8' ry='8' width='450' height='20' />
				</ContentLoader>
			</div>
		);
	}

	if (error) {
		return <div className={styles.errorMessage}>Error: {error}</div>;
	}

	if (!profile) {
		return (
			<div className={styles.errorMessage}>
				No profile data available. Please try again later.
			</div>
		);
	}

	return (
		<div className={styles.profileContainer}>
			<div className={styles.profileHeader}>
				<div className={styles.coverImage}></div>
				<div className={styles.profileAvatarContainer}>
					<div className={styles.profileAvatar}>
						{profile.photos?.large ? (
							<img src={profile.photos.large} alt={profile.fullName} />
						) : (
							<FaUser size={60} />
						)}
					</div>
					<button className={styles.editButton}>
						<FaEdit />
						Edit Profile
					</button>
				</div>
			</div>

			<div className={styles.profileContent}>
				<div className={styles.profileInfo}>
					<h1 className={styles.profileName}>{profile.fullName}</h1>
					{profile.aboutMe && (
						<p className={styles.profileBio}>{profile.aboutMe}</p>
					)}

					<div className={styles.profileDetails}>
						{user?.email && (
							<div className={styles.profileDetail}>
								<FaEnvelope className={styles.detailIcon} />
								<span>{user.email}</span>
							</div>
						)}

						{profile.location?.city && (
							<div className={styles.profileDetail}>
								<FaMapMarkerAlt className={styles.detailIcon} />
								<span>{`${profile.location.city}, ${profile.location.country}`}</span>
							</div>
						)}
					</div>
				</div>

				<div className={styles.profileSection}>
					<h2 className={styles.sectionTitle}>Looking for a job</h2>
					<div className={styles.lookingForAJob}>
						{profile.lookingForAJob ? (
							<div className={styles.jobStatus}>
								<span className={styles.available}>Available for work</span>
								{profile.lookingForAJobDescription && (
									<p>{profile.lookingForAJobDescription}</p>
								)}
							</div>
						) : (
							<span className={styles.notAvailable}>Not looking for work</span>
						)}
					</div>
				</div>

				<div className={styles.profileSection}>
					<h2 className={styles.sectionTitle}>Social Media</h2>
					<div className={styles.socialLinks}>
						{Object.entries(profile.contacts || {}).map(([key, value]) => {
							if (value && key !== 'email') {
								return (
									<a
										key={key}
										href={value.startsWith('http') ? value : `https://${value}`}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.socialLink}
									>
										{key}
									</a>
								);
							}
							return null;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
