import * as postService from '../services/postService.js';

export const createPost = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const { content, image_url } = req.body;

		const post = await postService.createNewPost(userId, content, image_url);
		res.status(201).json({ post });
	} catch (error) {
		next(error);
	}
};

export const getPosts = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;

		const posts = await postService.getFeedPosts(page, limit);
		res.json({ posts, page, limit });
	} catch (error) {
		next(error);
	}
};

export const getUserPosts = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id);
		const limit = parseInt(req.query.limit) || 20;

		const posts = await postService.getUserPosts(userId, limit);
		res.json({ posts });
	} catch (error) {
		next(error);
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.id);
		const userId = req.user.userId;
      console.log('userId:', userId);

		const result = await postService.deleteUserPost(postId, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
};
