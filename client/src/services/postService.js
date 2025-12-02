import api from './api';

export const getPosts = async () => {
	const response = await api.get('/posts');
	return response.data.posts;
};

export const getFeedPosts = async () => {
	const response = await api.get('/posts/feed');
	return response.data.posts;
};

export const getPostById = async (postId) => {
	const response = await api.get(`/posts/${postId}`);
	return response.data.post;
};

export const getUserPosts = async (userId) => {
	const response = await api.get(`/posts/user/${userId}`);
	return response.data.posts;
};

export const createPost = async (postData) => {
	const response = await api.post('/posts', postData);
	return response.data.post;
};

export const deletePost = async (postId) => {
	const response = await api.delete(`/posts/${postId}`);
	return response.data;
};
