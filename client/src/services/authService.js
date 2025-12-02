import api from './api.js';

export const registerUser = async (userData) => {
	const response = await api.post('/auth/register', userData);
	return response.data;
};

export const loginUser = async (email, password) => {
	const response = await api.post('auth/login', {
		email,
		password,
	});
	return response.data;
};

export const validateToken = async (token) => {
	const response = await api.get('/auth/verify', {
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data.user;
};
