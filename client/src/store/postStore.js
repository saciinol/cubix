import { create } from 'zustand';
import { postService } from '../services/postService';

const usePostStore = create((set, get) => ({
	// state
	feedPosts: [],
	userPosts: {},
	currentPost: null,
	isLoading: false,
	error: null,

	getFeedPosts: () => {
		const { feedPosts } = get();
		return feedPosts || [];
	},

	getUserPosts: (userId) => {
		const { userPosts } = get();
		return userPosts[userId] || [];
	},

	setFeedPosts: (feedPosts) => set({ feedPosts }),

	setUserPosts: (userId, posts) => {
		const { userPosts } = get();
		set({
			userPosts: {
				...userPosts,
				[userId]: posts,
			},
		});
	},

	setCurrentPost: (post) => set({ currentPost: post }),

	setLoading: (isLoading) => set({ isLoading }),

	setError: (error) => set({ error }),

	loadFeedPosts: async () => {},

	loadUserPosts: async (userId) => {
		set({ isLoading: true, error: null });

		try {
			const posts = await postService.getUserPosts(userId);
			get().setUserPosts(userId, posts);
			set({ isLoading: false });
		} catch (error) {
			set({
				error: error.message,
				isLoading: false,
			});
		}
	},

	loadPost: async (postId) => {
		set({ isLoading: true, error: null });

		try {
			const post = await postService.getPostById(postId);
			set({
				currentPost: post,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error.message,
				isLoading: false,
				currentPost: null,
			});
		}
	},

	clearError: () => set({ error: null }),
}));

export default usePostStore;
