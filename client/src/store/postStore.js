import { create } from 'zustand';
import {
	getPosts,
	getFeedPosts as getFeedPostsAPI,
	getPostById,
	getUserPosts as getUserPostsAPI,
	createPost as createPostAPI,
	deletePost as deletePostAPI,
	toggleLike,
} from '../services/postService';

const usePostStore = create((set, get) => ({
	// state
	allPosts: [],
	feedPosts: [],
	userPosts: {},
	currentPost: null,
	isLoading: false,
	isSubmitting: false,
	actions: {
		// getters
		getUserPosts: (userId) => {
			const { userPosts } = get();
			return userPosts[userId] || [];
		},

		// helper
		updatePostInAllCollections: (postId, updateFn) => {
			set((state) => {
				// update allPosts
				const updatedAllPosts = state.allPosts.map((post) => (post.post_id === postId ? updateFn(post) : post));

				// update feedPosts
				const updatedFeedPosts = state.feedPosts.map((post) => (post.post_id === postId ? updateFn(post) : post));

				// update userPosts
				const updatedUserPosts = {};
				Object.keys(state.userPosts).forEach((userId) => {
					updatedUserPosts[userId] = state.userPosts[userId].map((post) =>
						post.post_id === postId ? updateFn(post) : post
					);
				});

				// update currentPost
				const updatedCurrentPost =
					state.currentPost?.post_id === postId ? updateFn(state.currentPost) : state.currentPost;

				return {
					allPosts: updatedAllPosts,
					feedPosts: updatedFeedPosts,
					userPosts: updatedUserPosts,
					currentPost: updatedCurrentPost,
				};
			});
		},

		// actions
		loadAllPosts: async () => {
			set({ isLoading: true });

			try {
				const { posts } = await getPosts();
				set({
					allPosts: posts,
					isLoading: false,
				});
			} catch (error) {
				set({
					isLoading: false,
				});
				throw error;
			}
		},

		loadFeedPosts: async () => {
			set({ isLoading: true });

			try {
				const { posts } = await getFeedPostsAPI();
				set({
					feedPosts: posts,
					isLoading: false,
				});
			} catch (error) {
				set({
					isLoading: false,
				});
				throw error;
			}
		},

		loadUserPosts: async (userId) => {
			set({ isLoading: true });

			try {
				const { posts } = await getUserPostsAPI(userId);
				set((state) => ({
					userPosts: {
						...state.userPosts,
						[userId]: posts,
					},
					isLoading: false,
				}));
			} catch (error) {
				set({
					isLoading: false,
				});
				throw error;
			}
		},

		loadPost: async (postId) => {
			set({ isLoading: true });

			try {
				const { post } = await getPostById(postId);
				set({
					currentPost: post,
					isLoading: false,
				});
			} catch (error) {
				set({
					isLoading: false,
					currentPost: null,
				});
				throw error;
			}
		},

		toggleLikePost: async (postId) => {
			// save original statet for rollback
			const originalState = {
				allPosts: [...get().allPosts],
				feedPosts: [...get().feedPosts],
				userPosts: JSON.parse(JSON.stringify(get().userPosts)),
				currentPost: get().currentPost ? { ...get().currentPost } : null,
			};

			// optimistic update
			get().actions.updatePostInAllCollections(postId, (post) => {
				const isLiked = Boolean(post.like_id);
				return {
					...post,
					like_id: isLiked ? null : 1,
					likes_count: isLiked ? post.likes_count - 1 : post.likes_count + 1,
				};
			});

			try {
				const { like_id } = await toggleLike(postId);

				if (like_id) {
					get().actions.updatePostInAllCollections(postId, (post) => ({
						...post,
						like_id,
					}));
				}
			} catch (error) {
				set(originalState);

				throw error;
			}
		},

		createPost: async (content, image_url, userId) => {
			set({ isSubmitting: true });

			try {
				const { post } = await createPostAPI({ content, image_url });

				// update from user, feed, all posts
				const currentUserPosts = get().actions.getUserPosts(userId);
				set((state) => ({
					userPosts: {
						...state.userPosts,
						[userId]: [post, ...currentUserPosts],
					},
					allPosts: [post, ...state.allPosts],
					feedPosts: [post, ...state.feedPosts],
					isSubmitting: false,
				}));

				return post;
			} catch (error) {
				set({
					isSubmitting: false,
				});
				throw error;
			}
		},

		deletePost: async (postId, userId) => {
			set({ isSubmitting: true });

			try {
				await deletePostAPI(postId);

				// remove from user, feed, all posts
				const currentUserPosts = get().actions.getUserPosts(userId);
				set((state) => ({
					userPosts: {
						...state.userPosts,
						[userId]: currentUserPosts.filter((p) => p.post_id !== postId),
					},
					allPosts: state.allPosts.filter((p) => p.post_id !== postId),
					feedPosts: state.feedPosts.filter((p) => p.post_id !== postId),
					isSubmitting: false,
				}));
			} catch (error) {
				set({
					isSubmitting: false,
				});
				throw error;
			}
		},
	},
}));

export default usePostStore;

export const useAllPosts = () => usePostStore((state) => state.allPosts);
export const useFeedPosts = () => usePostStore((state) => state.feedPosts);
export const useCurrentPosts = () => usePostStore((state) => state.currentPost);
export const useUserPosts = () => usePostStore((state) => state.userPosts);
export const useIsLoading = () => usePostStore((state) => state.isLoading);
export const useIsSubmitting = () => usePostStore((state) => state.isSubmitting);
export const usePostActions = () => usePostStore((state) => state.actions);
