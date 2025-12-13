import * as likeModel from '../models/likeModel.js';
import { createNotification } from '../models/notificationModel.js';
import { findByPostIdForLikeNotif } from '../models/postModel.js';

export const toggleLike = async (userId, postId) => {
	const existingLike = await likeModel.checkIfLiked(userId, postId);

	if (existingLike) {
		await likeModel.unlikePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, -1);
		return { liked: false, likes_count: result.likes_count };
	} else {
		await likeModel.likePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, +1);

		const receiver = await findByPostIdForLikeNotif(postId);

		if (receiver.user_id !== userId) {
			await createNotification(receiver.user_id, userId, 'like', postId, null);
		} 

		return { liked: true, likes_count: result.likes_count };
	}
};
