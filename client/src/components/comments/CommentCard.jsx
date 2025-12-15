function timeAgo(date) {
	const now = Date.now();
	const past = new Date(date).getTime();
	const diff = now - past;

	const seconds = Math.floor(diff / 1000);
	if (seconds < 60) return `${seconds}s`;

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes}m`;

	const hours = Math.floor(minutes / 60);
	if (hours < 24) return `${hours}h`;

	const days = Math.floor(hours / 24);
	if (days < 7) return `${days}d`;

	const weeks = Math.floor(days / 7);
	if (weeks < 4) return `${weeks}w`;

	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo`;

	const years = Math.floor(days / 365);
	return `${years}y`;
}

const CommentCard = ({ comment = null, reply = null, setReplyTo, setCommentData }) => {
	return (
		<div className="w-full">
			<div className={`flex items-start m-2 ${reply ? 'ml-12' : ''}`}>
				<div>
					<img
						src={reply ? reply.avatar_url : comment.avatar_url}
						alt=""
						className={`rounded-full ${reply ? 'size-6' : 'size-8'}`}
					/>
				</div>

				<div className="mx-2">
					<div className="bg-gray-200 rounded-xl p-2">
						<div className="flex items-center gap-1">
							<p className="text-xs/tight font-bold">{reply ? reply.display_name : comment.display_name}</p>
							<p className="text-xs/tight text-gray-700">@{reply ? reply.username : comment.username}</p>
						</div>

						<div className="">
							<p className="text-sm/5">{reply ? reply.content : comment.content}</p>
						</div>
					</div>

					<div className="ml-2 mb-2 flex gap-2">
						<p className="text-xs">{reply ? timeAgo(reply.created_at) : timeAgo(comment.created_at)}</p>
						<button
							onClick={() => {
								setReplyTo(reply ? reply.display_name : comment.display_name);
								setCommentData((prev) => ({
									...prev,
									parent_comment_id: reply ? reply.comment_id : comment.comment_id,
								}));
							}}
							className="text-xs cursor-pointer"
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
