import { create } from 'zustand';
import {
	getPosts,
	getFeedPosts as getFeedPostsAPI,
	getPostById,
	getUserPosts as getUserPostsAPI,
	createPost as createPostAPI,
	deletePost as deletePostAPI,
	isLiked as isLikedAPI,
} from '../services/postService';

// REMOVE ERROR STATE? BECAUSE INTERCEPTOR HANDLES ERRORS?

const usePostStore = create((set, get) => ({
	// state
	allPosts: [],
	feedPosts: [],
	userPosts: {},
	isLiked: false,
	currentPost: null,
	isLoading: false,
	isSubmitting: false,
	error: null,

	// getters
	getUserPosts: (userId) => {
		const { userPosts } = get();
		return userPosts[userId] || [];
	},

	// setters
	setUserPosts: (userId, posts) => {
		const { userPosts } = get();
		set({
			userPosts: {
				...userPosts,
				[userId]: posts,
			},
		});
	},

	isPostLiked: async (postId) => {
		try {
			const { like } = await isLikedAPI(postId);
			set({ isLiked: like.liked });
		} catch (error) {}
	},

	// actions
	loadAllPosts: async () => {
		set({ isLoading: true, error: null });

		try {
			const { posts } = await getPosts();
			set({
				allPosts: posts,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error.message,
				isLoading: false,
			});
		}
	},

	loadFeedPosts: async () => {
		set({ isLoading: true, error: null });

		try {
			const { posts } = await getFeedPostsAPI();
			set({
				feedPosts: posts,
				isLoading: false,
			});
		} catch (error) {
			set({
				error: error.message,
				isLoading: false,
			});
		}
	},

	loadUserPosts: async (userId) => {
		set({ isLoading: true, error: null });

		try {
			const { posts } = await getUserPostsAPI(userId);
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
			const { post } = await getPostById(postId);
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

	createPost: async (content, image_url, userId) => {
		set({ isSubmitting: true, error: null });

		try {
			const { post } = await createPostAPI({ content, image_url });

			// update user posts
			const currentUserPosts = get().getUserPosts(userId);
			const updatedUserPosts = [...currentUserPosts, post];
			get().setUserPosts(userId, updatedUserPosts);

			// update all posts
			const { allPosts } = get();
			set({
				allPosts: [...allPosts, post],
				isSubmitting: false,
			});

			return post;
		} catch (error) {
			set({
				error: error.message,
				isSubmitting: false,
			});
			throw error;
		}
	},

	deletePost: async (postId, userId) => {
		set({ isSubmitting: true, error: null });

		try {
			await deletePostAPI(postId);

			// remove from user posts
			const currentUserPosts = get().getUserPosts(userId);
			const updatedUserPosts = currentUserPosts.filter((p) => p.post_id !== postId);
			get().setUserPosts(userId, updatedUserPosts);

			// remove from all posts
			const { allPosts } = get();
			const updatedAllPosts = allPosts.filter((p) => p.post_id !== postId);
			set({
				allPosts: updatedAllPosts,
				isSubmitting: false,
			});
		} catch (error) {
			set({
				error: error.message,
				isSubmitting: false,
			});
			throw error;
		}
	},

	clearError: () => set({ error: null }),
}));

export default usePostStore;
