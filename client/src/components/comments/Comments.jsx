import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, SendHorizonal } from 'lucide-react';

import useCommentStore from '../../store/commentStore';
import CommentCard from './CommentCard';
import Button from '../ui/Button';

const Comments = () => {
	const { id } = useParams();
	const { getComments, loadComments, isLoading, createComment, isSubmitting } = useCommentStore();
	const [commentData, setCommentData] = useState({
		content: '',
		parent_comment_id: null,
	});

	useEffect(() => {
		if (id) {
			loadComments(id);
		}
	}, [id, loadComments]);

	const comments = getComments(id);

	const repliesByParentId = useMemo(() => {
		const map = {};
		comments.forEach((c) => {
			if (c.parent_comment_id) {
				map[c.parent_comment_id] ||= [];
				map[c.parent_comment_id].push(c);
			}
		});
		return map;
	}, [comments]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCommentData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!id || !commentData.content.trim()) {
			return;
		}

		try {
      await createComment(id, {
				content: commentData.content.trim(),
				parent_comment_id: commentData.parent_comment_id || null,
			});

			setCommentData({ content: '', parent_comment_id: null });
		} catch (error) {
			console.error('Failed to create comment:', error);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-col">
				{comments
					.filter((c) => !c.parent_comment_id)
					.map((comment) => (
						<div key={comment.comment_id}>
							<CommentCard comment={comment} />

							{repliesByParentId[comment.comment_id]?.map((reply) => (
								<CommentCard key={reply.comment_id} reply={reply} />
							))}
						</div>
					))}
			</div>

			<div className="border-b border-gray-300 sticky bottom-0 z-30 bg-muted">
				<form onSubmit={handleSubmit} className="m-2 mb-0 flex flex-col gap-2">
					<div className="flex flex-col">
						<textarea
							name="content"
							value={commentData.content}
							onChange={handleChange}
							className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 focus:outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
							placeholder="Write your thoughts..."
							disabled={isSubmitting}
						></textarea>
					</div>

					<div className="self-end">
						<Button
							disabled={!commentData.content.trim() || isSubmitting}
							type="submit"
							className="size-5!"
							variant="icon"
						>
							<SendHorizonal />
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Comments;
