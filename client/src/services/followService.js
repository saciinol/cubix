import api from './api';

export const toggleFollow = async (userId) => {
	const response = await api.post(`/users/${userId}/follow`);
	return response.data;
};

export const isFollowing = async (userId) => {
	const response = await api.get(`/users/${userId}`);
	return response.data;
};
