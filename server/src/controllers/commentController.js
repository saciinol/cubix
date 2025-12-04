import * as commentServices from '../services/commentService.js';

export const getComments = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.id);
		const limit = parseInt(req.query.limit) || 20;

		const comments = await commentServices.getComments(postId, limit);
		res.json({ comments });
	} catch (error) {
		next(error);
	}
};

export const createComment = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.id);
		const userId = req.user.userId;
		const { content, parent_comment_id } = req.body;

		const comment = await commentServices.createNewComment(postId, userId, content, parent_comment_id);
		res.status(201).json({ comment });
	} catch (error) {
		next(error);
	}
};

export const deleteComment = async (req, res, next) => {
	try {
		const commentId = parseInt(req.params.id);
		const userId = req.user.userId;

		const result = await commentServices.deleteUserComment(commentId, userId);
		res.json(result);
	} catch (error) {
		next(error);
	}
};
