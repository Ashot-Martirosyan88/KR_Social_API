import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { loginTC } from '../../store/reducers/authReducers/authThunk';
import styles from './Login.module.css';

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(4, 'Password must be at least 4 characters')
		.required('Password is required'),
	rememberMe: Yup.boolean(),
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, isLoading, error } = useSelector(
		state => state.auth
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/profile');
		}
	}, [isAuthenticated, navigate]);

	const handleSubmit = (values, { setSubmitting }) => {
		dispatch(loginTC(values.email, values.password, values.rememberMe));
		setSubmitting(false);
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<div className={styles.loginHeader}>
					<h1>Welcome Back</h1>
					<p>Please sign in to your account</p>
				</div>

				{error && <div className={styles.errorMessage}>{error}</div>}

				<Formik
					initialValues={{ email: '', password: '', rememberMe: false }}
					validationSchema={LoginSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting, touched, errors }) => (
						<Form className={styles.form}>
							<div className={styles.formGroup}>
								<label htmlFor='email' className={styles.label}>
									<FaUser className={styles.labelIcon} />
									Email
								</label>
								<Field
									type='email'
									name='email'
									id='email'
									className={`${styles.input} ${
										touched.email && errors.email ? styles.inputError : ''
									}`}
									placeholder='Enter your email'
								/>
								<ErrorMessage
									name='email'
									component='div'
									className={styles.error}
								/>
							</div>

							<div className={styles.formGroup}>
								<label htmlFor='password' className={styles.label}>
									<FaLock className={styles.labelIcon} />
									Password
								</label>
								<Field
									type='password'
									name='password'
									id='password'
									className={`${styles.input} ${
										touched.password && errors.password ? styles.inputError : ''
									}`}
									placeholder='Enter your password'
								/>
								<ErrorMessage
									name='password'
									component='div'
									className={styles.error}
								/>
							</div>

							<div className={styles.checkboxGroup}>
								<label className={styles.checkboxLabel}>
									<Field
										type='checkbox'
										name='rememberMe'
										className={styles.checkbox}
									/>
									<span>Remember me</span>
								</label>
								<a href='#' className={styles.forgotPassword}>
									Forgot password?
								</a>
							</div>

							<button
								type='submit'
								className={styles.submitButton}
								disabled={isSubmitting || isLoading}
							>
								{isLoading ? (
									<span className={styles.loading}></span>
								) : (
									<>
										<FaSignInAlt className={styles.buttonIcon} />
										Sign In
									</>
								)}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
