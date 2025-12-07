import * as followModel from '../models/followModel.js';
import { createNotification } from '../models/notificationModel.js';
import { findByUserId } from '../models/userModel.js';

export const toggleFollow = async (userId, followingId) => {
	const existingFollow = await followModel.checkIfFollowing(userId, followingId);

	if (existingFollow) {
		await followModel.unfollowUser(userId, followingId);
		return { followed: false };
	} else {
		await followModel.followUser(userId, followingId);

      const receiver = await findByUserId(followingId);
      await createNotification(receiver.user_id, userId, 'follow', null, null);

		return { followed: true };
	}
};
