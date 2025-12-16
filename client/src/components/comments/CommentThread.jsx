// CommentThread.jsx - New recursive component
import CommentCard from './CommentCard';

const CommentThread = ({ comment, replies, setReplyTo, setCommentData, depth = 0 }) => {
	const MAX_DEPTH = 5; // Limit nesting depth to prevent infinite recursion
	const childReplies = replies[comment.comment_id] || [];

	return (
		<div className={depth > 0 ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''}>
			{/* Render the comment */}
			<CommentCard comment={comment} setReplyTo={setReplyTo} setCommentData={setCommentData} />

			{/* Recursively render replies */}
			{depth < MAX_DEPTH && childReplies.length > 0 && (
				<div className="mt-2">
					{childReplies.map((reply) => (
						<CommentThread
							key={reply.comment_id}
							comment={reply}
							replies={replies}
							setReplyTo={setReplyTo}
							setCommentData={setCommentData}
							depth={depth + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CommentThread;
