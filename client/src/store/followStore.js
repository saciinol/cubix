import { create } from 'zustand';
import { isFollowing as isFollowingAPI, toggleFollow } from '../services/followService';

const useFollowStore = create((set) => ({
	// state
	following: false,
	isLoading: false,
	error: null,

	actions: {
		isFollowing: async (userId) => {
			set({ isLoading: true, error: null });
			try {
				const { follow } = await isFollowingAPI(userId);
				set({
					following: follow.followed,
					isLoading: false,
				});
			} catch (error) {
				set({
					error: error.message,
					isLoading: false,
				});
			}
		},

		toggleFollowUser: async (userId) => {
			set({ isLoading: true, error: null });
			try {
				const { follow } = await toggleFollow(userId);
				set({
					following: follow.followed,
					isLoading: false,
				});
			} catch (error) {
				set({
					error: error.message,
					isLoading: false,
				});
			}
		},
	},
}));

export default useFollowStore;

export const useFollowing = () => useFollowStore((state) => state.following);
export const useIsLoading = () => useFollowStore((state) => state.isLoading);
export const useFollowActions = () => useFollowStore((state) => state.actions);
