import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaCamera } from 'react-icons/fa';
import {
	updateUserPhotoTC,
	updateUserProfileTC,
	getUserProfileTC,
} from '../../store/reducers/profileReducers/profileThunk';
import styles from './EditProfile.module.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { profile, isLoading, error } = useSelector(state => state.profile);
	const { user } = useSelector(state => state.auth);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [localError, setLocalError] = useState(null);

	useEffect(() => {
		// If no profile is loaded, fetch the current user's profile
		if (!profile && user) {
			dispatch(getUserProfileTC(user.id));
		}
	}, [profile, user, dispatch]);

	const [formData, setFormData] = useState({
		fullName: '',
		aboutMe: '',
		lookingForAJob: false,
		lookingForAJobDescription: '',
		contacts: {
			github: '',
			vk: '',
			facebook: '',
			instagram: '',
			twitter: '',
			website: '',
			youtube: '',
			mainLink: '',
		},
	});

	// Update form data when profile is loaded
	useEffect(() => {
		if (profile) {
			setFormData({
				fullName: profile.fullName || '',
				aboutMe: profile.aboutMe || '',
				lookingForAJob: profile.lookingForAJob || false,
				lookingForAJobDescription: profile.lookingForAJobDescription || '',
				contacts: {
					github: profile.contacts?.github || '',
					vk: profile.contacts?.vk || '',
					facebook: profile.contacts?.facebook || '',
					instagram: profile.contacts?.instagram || '',
					twitter: profile.contacts?.twitter || '',
					website: profile.contacts?.website || '',
					youtube: profile.contacts?.youtube || '',
					mainLink: profile.contacts?.mainLink || '',
				},
			});
		}
	}, [profile]);

	const [photoFile, setPhotoFile] = useState(null);
	const [photoPreview, setPhotoPreview] = useState(null);

	const handleInputChange = e => {
		const { name, value, type, checked } = e.target;

		if (name.includes('.')) {
			const [parent, child] = name.split('.');
			setFormData(prevData => ({
				...prevData,
				[parent]: {
					...prevData[parent],
					[child]: value,
				},
			}));
		} else {
			setFormData(prevData => ({
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			}));
		}
	};

	const handlePhotoChange = e => {
		const file = e.target.files[0];
		if (file) {
			setPhotoFile(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPhotoPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePhotoSubmit = async e => {
		e.preventDefault();
		if (photoFile) {
			try {
				await dispatch(updateUserPhotoTC(photoFile));
				setPhotoFile(null); // Clear the file input after successful upload
			} catch (error) {
				setLocalError('Failed to update photo. Please try again.');
			}
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setFormSubmitting(true);
		setLocalError(null);

		try {
			if (!user || !user.id) {
				throw new Error('User ID is missing. Please log in again.');
			}

			const updatedProfile = {
				userId: user.id,
				fullName: formData.fullName,
				aboutMe: formData.aboutMe || '',
				lookingForAJob: Boolean(formData.lookingForAJob),
				lookingForAJobDescription: formData.lookingForAJobDescription || '',
				contacts: {
					github: formData.contacts.github || '',
					vk: formData.contacts.vk || '',
					facebook: formData.contacts.facebook || '',
					instagram: formData.contacts.instagram || '',
					twitter: formData.contacts.twitter || '',
					website: formData.contacts.website || '',
					youtube: formData.contacts.youtube || '',
					mainLink: formData.contacts.mainLink || '',
				},
			};

			console.log('Submitting profile data:', updatedProfile);
			await dispatch(updateUserProfileTC(updatedProfile));
			navigate('/profile');
		} catch (err) {
			console.error('Failed to update profile:', err);
			setLocalError(
				err.message || 'Failed to update profile. Please try again.'
			);
		} finally {
			setFormSubmitting(false);
		}
	};

	const handleCancel = () => {
		navigate('/profile');
	};

	if (isLoading && !profile) {
		return <div className={styles.loading}>Loading profile data...</div>;
	}

	return (
		<div className={styles.editFormContainer}>
			<h2 className={styles.editTitle}>Edit Profile</h2>

			{(error || localError) && (
				<div className={styles.errorMessage}>{error || localError}</div>
			)}

			<div className={styles.photoSection}>
				<div className={styles.profileAvatar}>
					{photoPreview ? (
						<img src={photoPreview} alt='Preview' />
					) : profile && profile.photos?.large ? (
						<img src={profile.photos.large} alt={profile.fullName} />
					) : (
						<FaUser size={60} />
					)}
				</div>

				<form onSubmit={handlePhotoSubmit} className={styles.photoForm}>
					<label className={styles.photoLabel}>
						<FaCamera /> Change Photo
						<input
							type='file'
							accept='image/*'
							onChange={handlePhotoChange}
							className={styles.fileInput}
						/>
					</label>

					{photoFile && (
						<button
							type='submit'
							className={styles.uploadButton}
							disabled={isLoading}
						>
							Upload Photo
						</button>
					)}
				</form>
			</div>

			<form onSubmit={handleSubmit} className={styles.profileForm}>
				<div className={styles.formGroup}>
					<label htmlFor='fullName'>Full Name</label>
					<input
						type='text'
						id='fullName'
						name='fullName'
						value={formData.fullName}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='aboutMe'>About Me</label>
					<textarea
						id='aboutMe'
						name='aboutMe'
						value={formData.aboutMe}
						onChange={handleInputChange}
						rows={4}
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.checkboxLabel}>
						<input
							type='checkbox'
							name='lookingForAJob'
							checked={formData.lookingForAJob}
							onChange={handleInputChange}
						/>
						Looking for a Job
					</label>
				</div>

				{formData.lookingForAJob && (
					<div className={styles.formGroup}>
						<label htmlFor='lookingForAJobDescription'>Job Description</label>
						<textarea
							id='lookingForAJobDescription'
							name='lookingForAJobDescription'
							value={formData.lookingForAJobDescription}
							onChange={handleInputChange}
							rows={3}
						/>
					</div>
				)}

				<h3 className={styles.contactsHeading}>Contacts</h3>

				{formData.contacts &&
					Object.keys(formData.contacts).map(key => (
						<div className={styles.formGroup} key={key}>
							<label htmlFor={`contacts.${key}`}>{key}</label>
							<input
								type='text'
								id={`contacts.${key}`}
								name={`contacts.${key}`}
								value={formData.contacts[key]}
								onChange={handleInputChange}
							/>
						</div>
					))}

				<div className={styles.formActions}>
					<button
						type='button'
						className={styles.cancelButton}
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						type='submit'
						className={styles.saveButton}
						disabled={isLoading || formSubmitting}
					>
						{isLoading || formSubmitting ? 'Saving...' : 'Save Changes'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
