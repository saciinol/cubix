import { Loader2, MessageSquareMore, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { usePostStore } from '../../store';
import Comments from '../comments/Comments';
import timeAgo from '../timeAgo';

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
					<Link to={`/profile/${currentPost.user_id}`} className="flex items-center gap-2">
						<div>
							<img src={currentPost.avatar_url} alt="" className="size-11 rounded-full" />
						</div>
						<div>
							<p className="text-base/tight font-bold">{currentPost.display_name}</p>
							<p className="text-sm/tight text-gray-700">@{currentPost.username}</p>
						</div>
					</Link>
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
