import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import useCommentStore from '../../store/commentStore';
import CommentCard from './CommentCard';

const Comments = () => {
	const { id } = useParams();
	const { getComments, getReplies, loadComments, isLoading } = useCommentStore();

	useEffect(() => {
		if (id) {
			loadComments(id);
		}
	}, [id, loadComments]);

	const comments = getComments(id);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}
	// const replies = getReplies(id, comment.comment_id);
	{
		/* getReplies(id, comment.comment_id) ? (
      <div>he</div> */
	}

	return (
		<div className="flex flex-col">
			{comments.map((comment) => (
				<div key={comment.comment_id}>
					<CommentCard comment={comment} />

					{getReplies(id, comment.comment_id) &&
						getReplies(id, comment.comment_id).map((reply) => <CommentCard reply={reply} />)}
				</div>
			))}
		</div>
	);
};

export default Comments;
