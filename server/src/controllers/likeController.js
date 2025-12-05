import * as likeService from '../services/likeService.js';

export const toggleLike = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const postId = parseInt(req.params.id);

		const like = await likeService.toggleLike(userId, postId);
		res.status(200).json({ like });
	} catch (error) {
		next(error);
	}
};
