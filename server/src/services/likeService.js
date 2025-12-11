import * as likeModel from '../models/likeModel.js';
import { createNotification } from '../models/notificationModel.js';
import { findByPostId } from '../models/postModel.js';

export const toggleLike = async (userId, postId) => {
	const existingLike = await likeModel.checkIfLiked(userId, postId);

	if (existingLike) {
		await likeModel.unlikePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, -1);
		return { liked: false, likes_count: result.likes_count };
	} else {
		await likeModel.likePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, +1);

		const receiver = await findByPostId(postId);

		if (receiver.user_id !== userId) {
			await createNotification(receiver.user_id, userId, 'like', postId, null);
		}

		return { liked: true, likes_count: result.likes_count };
	}
};

export const isLiked = async (userId, postId) => {
	const existingLike = await likeModel.checkIfLiked(userId, postId);

	if (!existingLike) {
		return { liked: false };
	}

	return { liked: true };
};
