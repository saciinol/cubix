import * as postModel from '../models/postModel.js';
import { AppError } from '../utils/AppError.js';

export const createNewPost = async (userId, content, imageUrl = null) => {
	const post = await postModel.createPost(userId, content, imageUrl);

	const fullPost = await postModel.findByPostId(post.post_id);

	return fullPost;
};

export const getAllPosts = async (page = 1, limit = 20) => {
	const offset = (page - 1) * limit;
	const posts = await postModel.getAllPosts(limit, offset);
	return posts;
};

export const getFeedPosts = async (userId, page = 1, limit = 20) => {
	const offset = (page - 1) * limit;
	const posts = await postModel.getFeedPosts(userId, limit, offset);
	return posts;
};

export const getPostById = async (userId, postId) => {
	const post = await postModel.findByPostId(userId, postId);

   if (!post) throw new AppError('Post not found', 400);

	return post;
};

export const getUserPosts = async (userId, limit = 20) => {
	const posts = await postModel.getPostsByUserId(userId, limit);
	return posts;
};

export const deleteUserPost = async (postId, userId) => {
	const post = await postModel.findByPostId(postId);

	if (!post) throw new AppError('Post not found', 400);

	if (post.user_id !== userId) throw new AppError('Not authorized to delete this post', 403);

	await postModel.deletePost(postId);

	return { message: 'Post deleted successfully' };
};
