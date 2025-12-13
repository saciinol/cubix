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

const CommentCard = ({ comment }) => {
	return (
		<div className="w-full">
			<div className="flex justify-between m-2">
				<div className="flex items-center gap-2">
					<div>
						<img src={comment.avatar_url} alt="" className="size-8 rounded-full" />
					</div>

					<div>
						<p className="text-sm/tight">{comment.display_name}</p>
						<p className="text-xs/tight text-gray-700">@{comment.username}</p>
					</div>
				</div>

				<div>
					<p className="text-xs">{timeAgo(comment.created_at)}</p>
				</div>
			</div>

			<div className="my-2">
				<p className="mx-2 text-sm/5">{comment.content}</p>
			</div>
		</div>
	);
};

export default CommentCard;
