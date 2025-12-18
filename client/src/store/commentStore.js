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
	error: false,

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
		set({ isLoading: true, error: null });

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
				error: error.message,
				isLoading: false,
			});
		}
	},

	createComment: async (postId, { content, parent_comment_id = null }) => {
		set({ isSubmitting: true, error: null });

		try {
			const { comment } = await createCommentAPI(postId, {
				content,
				...(parent_comment_id && { parent_comment_id: parent_comment_id }),
			});

			// update comments
			const currentPostComments = get().getComments(postId);
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
				error: error.message,
				isSubmitting: false,
			});
			throw error;
		}
	},

	deleteComment: async (commentId, postId) => {
		set({ isSubmitting: true, error: null });

		try {
			await deleteCommentAPI(commentId);

			// remove from post comments
			const currentPostComments = get().getComments(postId);
			set((state) => ({
				comments: {
					...state.comments,
					[postId]: currentPostComments.filter((c) => c.comment_id !== commentId),
				},
				isSubmitting: false,
			}));
		} catch (error) {
			set({
				error: error.message,
				isSubmitting: false,
			});
		}
	},
}));

export default useCommentStore;
