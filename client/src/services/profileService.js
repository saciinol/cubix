import api from './api';

export const updateProfile = async (userId, updates) => {
	const response = await api.put(`/profile/${userId}`, updates);
	return response.data;
};

export const getProfile = async (userId) => {
	const response = await api.get(`/profile/${userId}`);
	return response.data;
};
