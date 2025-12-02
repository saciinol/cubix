import * as profileService from '../services/profileService.js';

export const getProfile = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id);

		const profile = await profileService.getUserProfile(userId);
		res.json({ profile });
	} catch (error) {
		next(error);
	}
};

export const updateProfile = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id);
		const requestingUserId = req.user.userId;
		const updates = req.body;

		const profile = await profileService.updateUserProfile(userId, requestingUserId, updates);
		res.json({ profile });
	} catch (error) {
		next(error);
	}
};

export const getMyProfile = async (req, res, next) => {
	try {
		const userId = req.user.userId;

		const profile = await profileService.getUserProfile(userId);
		res.json({ profile });
	} catch (error) {
		next(error);
	}
};
