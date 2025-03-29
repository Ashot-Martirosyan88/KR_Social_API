import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0',
});

const API = {
	getUsers: (page = 1, count = 10) => {
		return instance.get(`/users?page=${page}&count=${count}`);
	},
};

export default API;
