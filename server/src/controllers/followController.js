import * as followService from '../services/followService.js';

export const toggleFollow = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const followingId = parseInt(req.params.id);

		const follow = await followService.toggleFollow(userId, followingId);
		res.status(200).json({ follow });
	} catch (error) {
		next(error);
	}
};

export const isFollowing = async (req, res, next) => {
  try {
    const userId = req.user.userId;
		const followingId = parseInt(req.params.id);

		const follow = await followService.isFollowing(userId, followingId);
		res.status(200).json({ follow });
  } catch (error) {
    next(error);
  }
}