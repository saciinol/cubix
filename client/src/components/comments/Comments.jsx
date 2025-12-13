import { useEffect } from 'react';
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

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className='flex flex-col divide-y divide-gray-300'>
			{comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
		</div>
	);
};

export default Comments;
