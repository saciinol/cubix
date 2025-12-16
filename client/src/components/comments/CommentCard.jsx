import { Link } from "react-router-dom";
import timeAgo from "../timeAgo";

const CommentCard = ({ comment, setReplyTo, setCommentData }) => {
	const handleReply = () => {
		setReplyTo(comment.display_name);
		setCommentData((prev) => ({
			...prev,
			parent_comment_id: comment.comment_id,
		}));

		setTimeout(() => {
			const textarea = document.querySelector('textarea[name="content"]');
			textarea?.focus();
		}, 100);
	};

	return (
		<div className="w-full py-1">
			<div className="flex items-start gap-2">
				<Link to={`/profile/${comment.user_id}`} className="shrink-0">
					<img
						src={comment.avatar_url || '/default-avatar.png'}
						alt={comment.username}
						className="rounded-full w-8 h-8 object-cover"
					/>
				</Link>

				<div className="flex-1 min-w-0">
					<Link to={`/profile/${comment.user_id}`} className="flex items-center gap-1 flex-wrap">
						<p className="text-sm font-semibold text-gray-900">
							{comment.display_name || comment.username}
						</p>
						<p className="text-xs text-gray-500">
							@{comment.username}
						</p>
						<span className="text-xs text-gray-400">·</span>
						<p className="text-xs text-gray-500">
							{timeAgo(comment.created_at)}
						</p>
					</Link>

					<div className="mt-1">
						<p className="text-sm text-gray-800 whitespace-pre-wrap wrap-break-word">
							{comment.content}
						</p>
					</div>

					<div className="mt-2">
						<button
							onClick={handleReply}
							className="text-xs text-gray-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
						>
							Reply
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentCard;