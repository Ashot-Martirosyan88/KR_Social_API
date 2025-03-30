import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
	withCredentials: true,
	headers: {
		'API-KEY': 'your-api-key-here', // Replace with your actual API key
	},
});

const API = {
	// Users
	getUsers: (page = 1, count = 10) => {
		return instance.get(`/users?page=${page}&count=${count}`);
	},

	// Auth
	me: () => {
		return instance.get('/auth/me');
	},
	login: (email, password, rememberMe = false) => {
		return instance.post('/auth/login', { email, password, rememberMe });
	},
	logout: () => {
		return instance.delete('/auth/login');
	},

	// Profile
	getUserProfile: userId => {
		return instance.get(`/profile/${userId}`);
	},
	updateUserStatus: status => {
		return instance.put('/profile/status', { status });
	},
	getUserStatus: userId => {
		return instance.get(`/profile/status/${userId}`);
	},
	updateUserPhoto: photoFile => {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance.put('/profile/photo', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	updateUserProfile: profile => {
		return instance.put('/profile', profile);
	},
};

export default API;
