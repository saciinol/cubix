
import api from './api';

export const getPosts = async () => {
	const response = await api.get('/posts');
	return response.data;
};

export const getFeedPosts = async () => {
	const response = await api.get('/posts/feed');
	return response.data;
};

export const getPostById = async (postId) => {
	const response = await api.get(`/posts/${postId}`);
	return response.data;
};

export const getUserPosts = async (userId) => {
	const response = await api.get(`/posts/user/${userId}`);
	return response.data;
};

export const createPost = async (postData) => {
	const response = await api.post('/posts', postData);
	return response.data;
};

export const deletePost = async (postId) => {
	const response = await api.delete(`/posts/${postId}`);
	return response.data;
};
