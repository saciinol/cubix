import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import useCommentStore from '../../store/commentStore';
import CommentCard from './CommentCard';

const Comments = () => {
	const { id } = useParams();
	const { getComments, loadComments, isLoading } = useCommentStore();

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

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}
  
	return (
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
	);
};

export default Comments;
