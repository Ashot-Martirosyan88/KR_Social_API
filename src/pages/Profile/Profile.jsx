import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEdit } from 'react-icons/fa';
import API from '../../api/api';
import {
	setUserProfileAC,
	setProfileLoadingAC,
	setProfileErrorAC,
} from '../../store/reducers/profileReducers/profileActionCreator';
import {
	getUserStatusTC,
	updateUserStatusTC,
} from '../../store/reducers/profileReducers/profileThunk';
import styles from './Profile.module.css';

const Profile = () => {
	const { userId: paramUserId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { profile, status, isLoading, error } = useSelector(
		state => state.profile
	);
	const { user, isAuthenticated } = useSelector(state => state.auth);

	const [statusText, setStatusText] = useState('');
	const [isEditingStatus, setIsEditingStatus] = useState(false);

	const userId = paramUserId || (user && user.id);
	const isOwnProfile = user && userId === user.id;

	useEffect(() => {
		if (!userId) {
			if (isAuthenticated) {
				navigate('/profile');
			} else {
				navigate('/login');
			}
			return;
		}

		const fetchProfile = async () => {
			try {
				dispatch(setProfileLoadingAC(true));
				const response = await API.getUserProfile(userId);
				dispatch(setUserProfileAC(response.data));
				dispatch(getUserStatusTC(userId));
			} catch (error) {
				dispatch(setProfileErrorAC(error.message || 'Failed to load profile'));
				console.error('Error fetching profile:', error);
			} finally {
				dispatch(setProfileLoadingAC(false));
			}
		};

		fetchProfile();
	}, [userId, dispatch, navigate, isAuthenticated]);

	useEffect(() => {
		if (status) {
			setStatusText(status);
		}
	}, [status]);

	const handleEditProfile = () => {
		navigate('/profile/edit');
	};

	const handleStatusClick = () => {
		if (isOwnProfile) {
			setIsEditingStatus(true);
		}
	};

	const handleStatusChange = e => {
		setStatusText(e.target.value);
	};

	const handleStatusSubmit = () => {
		if (statusText !== status) {
			dispatch(updateUserStatusTC(statusText));
		}
		setIsEditingStatus(false);
	};

	const handleStatusBlur = () => {
		handleStatusSubmit();
	};

	const handleStatusKeyDown = e => {
		if (e.key === 'Enter') {
			handleStatusSubmit();
		}
	};

	if (isLoading) {
		return <div className={styles.loading}>Loading profile...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	if (!profile) {
		return <div className={styles.notFound}>Profile not found</div>;
	}

	return (
		<div className={styles.profileContainer}>
			<div className={styles.profileHeader}>
				<div className={styles.profileAvatar}>
					{profile.photos?.large ? (
						<img src={profile.photos.large} alt={profile.fullName} />
					) : (
						<FaUser size={100} />
					)}
				</div>

				<div className={styles.profileInfo}>
					<h1 className={styles.profileName}>{profile.fullName}</h1>

					<div className={styles.profileStatus} onClick={handleStatusClick}>
						{isEditingStatus ? (
							<input
								type='text'
								value={statusText}
								onChange={handleStatusChange}
								onBlur={handleStatusBlur}
								onKeyDown={handleStatusKeyDown}
								autoFocus
								className={styles.statusInput}
							/>
						) : (
							<p>
								{status || (isOwnProfile ? 'Click to add status' : 'No status')}
							</p>
						)}
					</div>

					{isOwnProfile && (
						<button className={styles.editButton} onClick={handleEditProfile}>
							<FaEdit /> Edit Profile
						</button>
					)}
				</div>
			</div>

			<div className={styles.profileDetails}>
				<div className={styles.profileSection}>
					<h2>About Me</h2>
					<p>{profile.aboutMe || 'No information provided'}</p>
				</div>

				<div className={styles.profileSection}>
					<h2>Job Status</h2>
					<p>
						<strong>Looking for a job: </strong>
						{profile.lookingForAJob ? 'Yes' : 'No'}
					</p>
					{profile.lookingForAJob && profile.lookingForAJobDescription && (
						<p>
							<strong>Job Description: </strong>
							{profile.lookingForAJobDescription}
						</p>
					)}
				</div>

				<div className={styles.profileSection}>
					<h2>Contacts</h2>
					{profile.contacts &&
					Object.entries(profile.contacts).some(([value]) => value) ? (
						<ul className={styles.contactsList}>
							{Object.entries(profile.contacts).map(([key, value]) => {
								if (value) {
									return (
										<li key={key} className={styles.contactItem}>
											<strong>{key}: </strong>
											<a
												href={
													value.startsWith('http') ? value : `https://${value}`
												}
												target='_blank'
												rel='noreferrer'
											>
												{value}
											</a>
										</li>
									);
								}
								return null;
							})}
						</ul>
					) : (
						<p>No contact information provided</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
