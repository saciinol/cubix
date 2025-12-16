import { create } from 'zustand';
import {
	getMyProfile as getMyProfileAPI,
	getProfile as getProfileAPI,
	updateProfile as updateProfileAPI,
} from '../services/profileService';

const useProfileStore = create((set, get) => ({
	// state
	profiles: {},
	isLoading: false,
	isSubmitting: false,
	error: null,

	getProfile: (userId) => {
		const { profiles } = get();
		return profiles[userId] || [];
	},

	setProfile: (userId, profile) => {
		const { profiles } = get();
		set({
			profiles: {
				...profiles,
				[userId]: profile,
			},
		});
	},

	loadProfile: async (userId) => {
		set({ isLoading: true, error: null });

		try {
			const { profile } = await getProfileAPI(userId);
			get().setProfile(userId, profile);
			set({ isLoading: false });
		} catch (error) {
			set({
				error: error.message,
				isLoading: false,
			});
		}
	},
}));

export default useProfileStore;
