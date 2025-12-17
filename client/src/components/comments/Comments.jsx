import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, SendHorizonal } from 'lucide-react';

import { useCommentStore } from '../../store';
import CommentThread from './CommentThread';
import Button from '../ui/Button';

const Comments = () => {
	const { id } = useParams();
	const { getComments, loadComments, isLoading, createComment, isSubmitting } = useCommentStore();
	const [commentData, setCommentData] = useState({
		content: '',
		parent_comment_id: null,
	});
	const [replyTo, setReplyTo] = useState('');

	useEffect(() => {
		if (id) {
			loadComments(id);
		}
	}, [id]);

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

	const topLevelComments = useMemo(() => {
		return comments.filter((c) => !c.parent_comment_id);
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
			setReplyTo('');
		} catch (error) {
			console.error('Failed to create comment:', error);
		}
	};

	const handleCancelReply = () => {
		setReplyTo('');
		setCommentData((prev) => ({
			...prev,
			parent_comment_id: null,
		}));
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
			{/* render comments recursively */}
			<div className="flex flex-col m-2 gap-4">
				{topLevelComments.length > 0 ? (
					topLevelComments.map((comment) => (
						<CommentThread
							key={comment.comment_id}
							comment={comment}
							replies={repliesByParentId}
							setReplyTo={setReplyTo}
							setCommentData={setCommentData}
							depth={0}
						/>
					))
				) : (
					<div className="text-center text-gray-500 py-8">
						<p>No comments yet. Be the first to comment!</p>
					</div>
				)}
			</div>

			<div className="sticky bottom-0 z-30 bg-muted">
				<form onSubmit={handleSubmit} className="m-2 flex flex-col gap-2">
					{replyTo && (
						<div className="flex gap-1">
							<p className="text-xs/2 ml-2">
								Replying to <span className="font-semibold">{replyTo}</span>
							</p>
							<p className="text-xs/2">&middot;</p>
							<button className="text-xs/2 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors" onClick={handleCancelReply}>
								Cancel
							</button>
						</div>
					)}

					<div className="flex flex-col">
						<textarea
							name="content"
							value={commentData.content}
							onChange={handleChange}
							className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 focus:outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden"
							placeholder={replyTo ? `Reply to ${replyTo}` : 'Write a comment...'}
							disabled={isSubmitting}
							rows={1}
              onInput={(e) => {
								e.target.style.height = 'auto';
								e.target.style.height = `${e.target.scrollHeight}px`;
							}}
						></textarea>
					</div>

					<Button
						disabled={!commentData.content.trim() || isSubmitting}
						type="submit"
						className="size-5! self-end"
						variant="icon"
					>
						<SendHorizonal />
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Comments;
