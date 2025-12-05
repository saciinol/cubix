import * as likeModel from '../models/likeModel.js';

export const toggleLike = async (userId, postId) => {
	const existingLike = await likeModel.checkIfLiked(userId, postId);

	if (existingLike) {
		await likeModel.unlikePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, -1);
      return { liked: false, likes_count: result.likes_count };
	} else {
		await likeModel.likePost(userId, postId);
		const result = await likeModel.updateLikeCount(postId, +1);
      return { liked: true, likes_count: result.likes_count };
	}
};
