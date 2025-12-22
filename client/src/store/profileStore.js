import { create } from 'zustand';
import { getProfile as getProfileAPI, updateProfile as updateProfileAPI } from '../services/profileService';

const useProfileStore = create((set, get) => ({
	// state
	profiles: {},
	loadingIds: new Set(),
	isLoading: false,
	isSubmitting: false,

	actions: {
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
				}));

				return profile;
			} catch (error) {
				set((state) => ({
					isLoading: state.loadingIds.size === 1 ? false : true,
					loadingIds: new Set([...state.loadingIds].filter((id) => id !== userId)),
				}));
				throw error;
			}
		},

		updateProfile: async (userId, updates) => {
			set({ isSubmitting: true });

			try {
				const { profile } = await updateProfileAPI(userId, updates);

				set((state) => ({
					profiles: {
						...state.profiles,
						[userId]: profile,
					},
					isSubmitting: false,
				}));

				return profile;
			} catch (error) {
				set({
					isSubmitting: false,
				});
				throw error;
			}
		},

		clearAllProfiles: () => set({ profiles: {} }),
	},
}));

export default useProfileStore;

export const useProfiles = () => useProfileStore((state) => state.profiles);
export const useLoadingIds = () => useProfileStore((state) => state.loadingIds);
export const useIsLoading = () => useProfileStore((state) => state.isLoading);
export const useIsSubmitting = () => useProfileStore((state) => state.isSubmitting);
export const useProfileActions = () => useProfileStore((state) => state.actions);
