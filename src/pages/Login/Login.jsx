import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginTC } from '../../store/reducers/authReducers/authThunk';
import styles from './Login.module.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [formErrors, setFormErrors] = useState({});

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

	const validateForm = () => {
		const errors = {};

		if (!email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid';
		}

		if (!password) {
			errors.password = 'Password is required';
		} else if (password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (validateForm()) {
			dispatch(loginTC(email, password, rememberMe));
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginForm}>
				<h1 className={styles.loginTitle}>Login</h1>

				{error && <div className={styles.errorMessage}>{error}</div>}

				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={formErrors.email ? styles.inputError : ''}
						/>
						{formErrors.email && (
							<p className={styles.errorText}>{formErrors.email}</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className={formErrors.password ? styles.inputError : ''}
						/>
						{formErrors.password && (
							<p className={styles.errorText}>{formErrors.password}</p>
						)}
					</div>

					<div className={styles.formGroup}>
						<label className={styles.checkboxLabel}>
							<input
								type='checkbox'
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
							/>
							Remember me
						</label>
					</div>

					<button
						type='submit'
						className={styles.loginButton}
						disabled={isLoading}
					>
						{isLoading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<div className={styles.loginInfo}>
					<p>For demo access, use:</p>
					<p>Email: free@samuraijs.com</p>
					<p>Password: free</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
