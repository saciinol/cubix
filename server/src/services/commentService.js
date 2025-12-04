import * as commentModel from '../models/commentModel.js';

export const getComments = async (postId, limit = 20) => {
	const comments = await commentModel.getCommentsByPostId(postId, limit);

	return comments;
};

export const createNewComment = async (postId, userId, content, parentCommentId = null) => {
	const comment = await commentModel.createComment(postId, userId, content, parentCommentId);

	const fullComment = await commentModel.findByCommentId(comment.comment_id);

	return fullComment;
};

export const deleteUserComment = async (commentId, userId) => {
	const comment = await commentModel.findByCommentId(commentId);

	if (!comment) throw new AppError('Comment not found', 400);

	if (comment.user_id !== userId) {
		throw new AppError('Not authorized to delete this comment', 403);
	}

	await commentModel.deleteComment(commentId);

	return { message: 'Comment deleted successfully' };
};
