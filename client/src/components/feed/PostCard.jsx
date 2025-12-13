import { MessageSquareMore, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { toggleLike } from '../../services/postService';
import { Link } from 'react-router-dom';

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

const PostCard = ({ post }) => {
	const [isLiked, setIsLiked] = useState(post.like_id ? true : false);
	const [likeCount, setLikeCount] = useState(post.likes_count);

	const handleLikePost = async () => {
		try {
			const { like } = await toggleLike(post.post_id);
			setIsLiked(like.liked);
			setLikeCount(like.likes_count);
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			return;
		}
	};

	return (
		<div className="w-full">
			<Link to={`/posts/${post.post_id}`}>
				<div className="flex justify-between m-2">
					<div className="flex items-center gap-2">
						<div>
							<img src={post.avatar_url} alt="" className="size-11 rounded-full" />
						</div>
						<div>
							<p className="text-base/tight">{post.display_name}</p>
							<p className="text-sm/tight text-gray-700">@{post.username}</p>
						</div>
					</div>
					<div>
						<p className="text-xs">{timeAgo(post.created_at)}</p>
					</div>
				</div>

				<div>
					<p className="mx-2 text-base/5">{post.content}</p>
					<img src={post.image_url} alt="" className="m-2" />
				</div>
			</Link>

			<div className="flex gap-4 m-2">
				<div className="flex items-end gap-1">
					<div onClick={handleLikePost} className="cursor-pointer">
						<ThumbsUp className={`size-5 ${isLiked ? 'text-blue-500' : 'text-black'}`} />
					</div>
					<p className="text-sm">{likeCount}</p>
				</div>
				<div className="flex items-end gap-1">
					<MessageSquareMore className="size-5" />
					<p className="text-sm">{post.comments_count}</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
