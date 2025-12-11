import api from './api';

export const getMyProfile = async () => {
	const response = await api.get('/profile/me');
	return response.data;
};

export const updateProfile = async (userId) => {
	const response = await api.put(`/profile/${userId}`);
	return response.data;
};

export const getProfile = async (userId) => {
	const response = await api.get(`/profile/${userId}`);
	return response.data;
};
