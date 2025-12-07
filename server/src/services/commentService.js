import * as commentModel from '../models/commentModel.js';
import { createNotification } from '../models/notificationModel.js';
import { findByPostId } from '../models/postModel.js';
import { AppError } from '../utils/AppError.js';

export const getComments = async (postId, limit = 20) => {
	const comments = await commentModel.getCommentsByPostId(postId, limit);

	return comments;
};

export const createNewComment = async (postId, userId, content, parentCommentId = null) => {
	const comment = await commentModel.createComment(postId, userId, content, parentCommentId);

	await commentModel.updateCommentCount(postId, +1);

	if (parentCommentId) {
		const replyReceiver = await commentModel.findByCommentId(parentCommentId);
		if (!replyReceiver) throw new AppError('Comment cannot be found', 400);

		if (replyReceiver.user_id !== userId) {
			await createNotification(replyReceiver.user_id, userId, 'reply', postId, parentCommentId);
		}
	} else {
		const commentReceiver = await findByPostId(postId);
		if (commentReceiver.user_id !== userId) {
			await createNotification(commentReceiver.user_id, userId, 'comment', postId, null);
		}
	}

	const fullComment = await commentModel.findByCommentId(comment.comment_id);
	return fullComment;
};

export const deleteUserComment = async (commentId, userId) => {
	const comment = await commentModel.findByCommentId(commentId);

	if (!comment) throw new AppError('Comment not found', 400);

	if (comment.user_id !== userId) {
		throw new AppError('Not authorized to delete this comment', 403);
	}

	await commentModel.updateCommentCount(comment.post_id, -1);
	await commentModel.deleteComment(commentId);

	return { message: 'Comment deleted successfully' };
};
