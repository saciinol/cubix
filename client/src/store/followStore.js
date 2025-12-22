import { create } from 'zustand';
import { isFollowing as isFollowingAPI, toggleFollow } from '../services/followService';

const useFollowStore = create((set) => ({
	// state
	following: false,
	isLoading: false,

	actions: {
		isFollowing: async (userId) => {
			set({ isLoading: true });
			try {
				const { follow } = await isFollowingAPI(userId);
				set({
					following: follow.followed,
					isLoading: false,
				});
			} catch (error) {
				set({
					isLoading: false,
				});
        throw error;
			}
		},

		toggleFollowUser: async (userId) => {
			set({ isLoading: true });
			try {
				const { follow } = await toggleFollow(userId);
				set({
					following: follow.followed,
					isLoading: false,
				});
			} catch (error) {
				set({
					isLoading: false,
				});
        throw error;
			}
		},
	},
}));

export default useFollowStore;

export const useFollowing = () => useFollowStore((state) => state.following);
export const useIsLoading = () => useFollowStore((state) => state.isLoading);
export const useFollowActions = () => useFollowStore((state) => state.actions);
