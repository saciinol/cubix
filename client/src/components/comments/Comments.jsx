import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useCommentStore } from '../../store';
import CommentThread from './CommentThread';
import CreateComment from './CreateComment';

const Comments = () => {
	const { id } = useParams();
	const { getComments, loadComments, isLoading } = useCommentStore();
	const [commentData, setCommentData] = useState({
		content: '',
		parent_comment_id: null,
	});
	const [replyTo, setReplyTo] = useState('');

	useEffect(() => {
		if (id) {
			loadComments(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

      <CreateComment id={id} replyTo={replyTo} setReplyTo={setReplyTo} commentData={commentData} setCommentData={setCommentData}  />
		</div>
	);
};

export default Comments;
