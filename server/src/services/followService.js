import * as followModel from '../models/followModel.js';

export const toggleFollow = async (userId, followingId) => {
	const existingFollow = await followModel.checkIfFollowing(userId, followingId);

	if (existingFollow) {
		await followModel.unfollowUser(userId, followingId);
		return { followed: false };
	} else {
		await followModel.followUser(userId, followingId);
		return { followed: true };
	}
};
