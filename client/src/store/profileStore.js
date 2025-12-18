import { create } from 'zustand';
import { getProfile as getProfileAPI, updateProfile as updateProfileAPI } from '../services/profileService';

const useProfileStore = create((set, get) => ({
	// state
	profiles: {},
	loadingIds: new Set(),
	isLoading: false,
	isSubmitting: false,
	error: null,

	getProfile: (userId) => {
		const { profiles } = get();
		return profiles[userId] || [];
	},

	isProfileLoading: (userId) => {
		return get().loadingIds.has(userId);
	},

	loadProfile: async (userId) => {
		const { profiles, loadingIds } = get();

		if (profiles[userId]) {
			return profiles[userId];
		}

		if (loadingIds.has(userId)) {
			return;
		}

		set((state) => ({
			isLoading: true,
			loadingIds: new Set(state.loadingIds).add(userId),
		}));

		try {
			const { profile } = await getProfileAPI(userId);

			set((state) => ({
				profiles: {
					...state.profiles,
					[userId]: profile,
				},
				isLoading: state.loadingIds.size === 1 ? false : true,
				loadingIds: new Set([...state.loadingIds].filter((id) => id !== userId)),
				error: null,
			}));

			return profile;
		} catch (error) {
			set((state) => ({
				error: error.message || 'Failed to load profile',
				isLoading: state.loadingIds.size === 1 ? false : true,
				loadingIds: new Set([...state.loadingIds].filter((id) => id !== userId)),
			}));
			throw error;
		}
	},

	updateProfile: async (userId, updates) => {
		set({ isSubmitting: true, error: null });

		try {
			const { profile } = await updateProfileAPI(userId, updates);

			set((state) => ({
				profiles: {
					...state.profiles,
					[userId]: profile,
				},
				isSubmitting: false,
				error: null,
			}));

			return profile;
		} catch (error) {
			set({
				error: error.message,
				isSubmitting: false,
			});
			throw error;
		}
	},

	clearError: () => set({ error: null }),

	// clearProfile: (userId) => {
	// 	set((state) => {
	// 		const { [userId]: removed, ...rest } = state.profiles;
	// 		return { profiles: rest };
	// 	});
	// },

	clearAllProfiles: () => set({ profiles: {}, error: null }),
}));

export default useProfileStore;
