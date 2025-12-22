import { useNavigate } from 'react-router-dom';
import timeAgo from '../utils/timeAgo';
import { User } from 'lucide-react';
import { memo } from 'react';

const CommentCard = memo(({ comment, setReplyTo, setCommentData }) => {
	const navigate = useNavigate();

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

	const handleProfileClick = () => {
		navigate(`/profile/${comment.user_id}`);
	};

	return (
		<div className="w-full py-1">
			<div className="flex items-start gap-2">
				<div onClick={handleProfileClick} className="shrink-0 cursor-pointer">
					{comment.avatar_url ? (
						<img
							src={comment.avatar_url || '/default-avatar.png'}
							alt={comment.username}
							className="rounded-full size-8 object-cover"
						/>
					) : (
						<User className="bg-blue-300 size-8 rounded-full object-cover" />
					)}
				</div>

				<div className="flex-1 min-w-0">
					<div onClick={handleProfileClick} className="flex items-center gap-1 flex-wrap cursor-pointer">
						<p className="text-sm font-semibold text-gray-900">{comment.display_name || comment.username}</p>
						<p className="text-xs text-gray-500">@{comment.username}</p>
						<span className="text-xs text-gray-400">·</span>
						<p className="text-xs text-gray-500">{timeAgo(comment.created_at)}</p>
					</div>

					<div className="mt-1">
						<p className="text-sm text-gray-800 whitespace-pre-wrap wrap-break-word">{comment.content}</p>
					</div>

					<div className="mt-1">
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
});

export default CommentCard;
