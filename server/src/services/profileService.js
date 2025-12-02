import * as profileModel from '../models/profileModel.js';
import { AppError } from '../utils/AppError.js';

export const getUserProfile = async (userId) => {
	const profile = await profileModel.getProfileByUserId(userId);

	if (!profile) throw new AppError('Profile not found', 404);

	return profile;
};

export const updateUserProfile = async (userId, requestingUserId, updates) => {
	// users can only update their own profile
	if (userId !== requestingUserId) {
		throw new AppError('Not authorized to update this profile', 401);
	}

	const sanitizedUpdates = {};

	if (updates.display_name !== undefined) {
		const trimmed = updates.display_name?.trim();
		sanitizedUpdates.display_name = trimmed || null;
	}

	if (updates.bio !== undefined) {
		const trimmed = updates.bio?.trim();
		sanitizedUpdates.bio = trimmed || null;
	}

   if (updates.avatar_url !== undefined) {
      sanitizedUpdates.avatar_url = updates.avatar_url;
   }

   if (updates.cover_url !== undefined) {
      sanitizedUpdates.cover_url = updates.cover_url;
   }

   if (updates.location !== undefined) {
      const trimmed = updates.location?.trim();
      sanitizedUpdates.location = trimmed || null;
   }

   if (updates.website !== undefined) {
      sanitizedUpdates.website = updates.website;
   }

   const updatedProfile = await profileModel.updateProfile(userId, sanitizedUpdates);

   const fullProfile = await profileModel.getProfileByUserId(userId);

   return fullProfile;
};
