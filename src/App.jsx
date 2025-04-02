import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from './components/Layout/Layout';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import NotFound from './components/NotFound/NotFound';
import { checkAuthTC } from './store/reducers/authReducers/authThunk';

const App = () => {
	const { isAuthenticated } = useSelector(state => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(checkAuthTC());
	}, [dispatch]);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Navigate to='/users' replace />} />
				<Route path='users' element={<Users />} />
				<Route path='login' element={<Login />} />
				<Route
					path='profile'
					element={
						isAuthenticated ? <Profile /> : <Navigate to='/login' replace />
					}
				/>
				<Route path='profile/:userId' element={<Profile />} />
				<Route
					path='profile/edit'
					element={
						isAuthenticated ? <EditProfile /> : <Navigate to='/login' replace />
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;
