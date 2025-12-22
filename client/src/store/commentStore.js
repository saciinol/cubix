import { create } from 'zustand';
import {
	getComments as getCommentsAPI,
	createComment as createCommentAPI,
	deleteComment as deleteCommentAPI,
} from '../services/commentService';

const useCommentStore = create((set, get) => ({
	// state
	comments: {},
	isLoading: false,
	isSubmitting: false,

	actions: {
		// getters
		getComments: (postId) => {
			const { comments } = get();
			return comments[postId] || [];
		},

		// setters
		setComments: (postId, postComments) => {
			set((state) => ({
				comments: {
					...state.comments,
					[postId]: postComments,
				},
			}));
		},

		loadComments: async (postId) => {
			set({ isLoading: true });

			try {
				const { comments } = await getCommentsAPI(postId);
				set((state) => ({
					comments: {
						...state.comments,
						[postId]: comments,
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

		createComment: async (postId, { content, parent_comment_id = null }) => {
			set({ isSubmitting: true });

			try {
				const { comment } = await createCommentAPI(postId, {
					content,
					...(parent_comment_id && { parent_comment_id: parent_comment_id }),
				});

				// update comments
				const currentPostComments = get().actions.getComments(postId);
				set((state) => ({
					comments: {
						...state.comments,
						[postId]: [...currentPostComments, comment],
					},
					isSubmitting: false,
				}));

				return comment;
			} catch (error) {
				set({
					isSubmitting: false,
				});
				throw error;
			}
		},

		deleteComment: async (commentId, postId) => {
			set({ isSubmitting: true });

			try {
				await deleteCommentAPI(commentId);

				// remove from post comments
				const currentPostComments = get().actions.getComments(postId);
				set((state) => ({
					comments: {
						...state.comments,
						[postId]: currentPostComments.filter((c) => c.comment_id !== commentId),
					},
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

export default useCommentStore;

export const useComments = () => useCommentStore((state) => state.comments);
export const useIsLoading = () => useCommentStore((state) => state.isLoading);
export const useIsSubmitting = () => useCommentStore((state) => state.isSubmitting);
export const useCommentsActions = () => useCommentStore((state) => state.actions);
