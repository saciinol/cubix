import api from './api';

export const postService = {
	getPosts: async () => {
		const response = await api.get('/');
		return response.data.data;
	},

	getPostById: async (postId) => {
		const response = await api.get(`/post/${postId}`);
		return response.data.data;
	},

	getUserPosts: async (userId) => {
		const response = await api.get(`/user/${userId}`);
		return response.data.data;
	},

	createPost: async (postData) => {
		const response = await api.post('/', postData);
		return response.data.data;
	},

	deletePost: async (userId) => {
		const response = await api.delete(`/post/${userId}`);
		return response.data;
	},
};
