import { Loader2, MessageSquareMore, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePostStore } from '../../store';
import Comments from '../comments/Comments';

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

const Post = () => {
	const { id } = useParams();
	const { currentPost, loadPost, toggleLikePost, isLoading } = usePostStore();
	const [isLiking, setIsLiking] = useState(false);

	useEffect(() => {
		if (id) loadPost(id);
	}, [id, loadPost]);

	const handleLike = async () => {
		setIsLiking(true);
		try {
			await toggleLikePost(currentPost.post_id);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLiking(false);
		}
	};

	if (isLoading || !currentPost) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="w-full max-w-2xl mx-auto">
			<div>
				<div className="flex justify-between m-2">
					<div className="flex items-center gap-2">
						<div>
							<img src={currentPost.avatar_url} alt="" className="size-11 rounded-full" />
						</div>
						<div>
							<p className="text-base/tight font-bold">{currentPost.display_name}</p>
							<p className="text-sm/tight text-gray-700">@{currentPost.username}</p>
						</div>
					</div>
					<div>
						<p className="text-xs">{timeAgo(currentPost.created_at)}</p>
					</div>
				</div>

				<div>
					<p className="mx-2 text-base/5">{currentPost.content}</p>
					<img src={currentPost.image_url} alt="" className="m-2" />
				</div>

				<div className="flex gap-4 m-2">
					<div className="flex items-end gap-1 select-none">
						<ThumbsUp
							onClick={handleLike}
							disabled={isLiking}
							className={`size-5 cursor-pointer ${currentPost.like_id ? 'text-blue-500' : 'text-black'}`}
						/>
						<p className="text-sm">{currentPost.likes_count}</p>
					</div>
					<div className="flex items-end gap-1">
						<MessageSquareMore className="size-5" />
						<p className="text-sm">{currentPost.comments_count}</p>
					</div>
				</div>
			</div>

      <Comments />
		</div>
	);
};

export default Post;
