import { Loader2, MessageSquareMore, User } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// import { usePostStore } from '../../store';
import Comments from '../comments/Comments';
import timeAgo from '../timeAgo';
import { useCurrentPosts, useIsLoading, usePostActions } from '../../store/postStore';
import LikeButton from './LikeButton';

const Post = () => {
	const { id } = useParams();
	// const { currentPost, loadPost, toggleLikePost, isLoading } = usePostStore();
	const currentPost = useCurrentPosts();
	const isLoading = useIsLoading();
	const { loadPost } = usePostActions();

	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);

		if (id) loadPost(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleProfileClick = () => {
		navigate(`/profile/${currentPost.user_id}`);
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
					<div onClick={handleProfileClick} className="flex items-center gap-2 cursor-pointer">
						{currentPost.avatar_url ? (
							<img
								src={currentPost.avatar_url}
								alt={currentPost.username}
								className="size-11 rounded-full object-cover"
							/>
						) : (
							<User className="bg-blue-300 size-11 rounded-full object-cover" />
						)}
						<div>
							<p className="text-base/tight font-bold">{currentPost.display_name || currentPost.username}</p>
							<p className="text-sm/tight text-gray-700">@{currentPost.username}</p>
						</div>
					</div>
					<p className="text-xs text-gray-500">{timeAgo(currentPost.created_at)}</p>
				</div>

				<div className="mx-2 mb-2">
					<p className="text-base leading-snug">{currentPost.content}</p>
					{currentPost.image_url && (
						<img
							src={currentPost.image_url}
							alt={currentPost.username}
							className="my-2 rounded-lg w-full object-cover max-h-96"
						/>
					)}
				</div>

				<div className="flex gap-4 mx-2 mb-2 text-gray-600">
					<LikeButton currentPost={currentPost} />

					<div className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
						<MessageSquareMore className="size-5" />
						<p className="text-sm font-medium">{currentPost.comments_count}</p>
					</div>
				</div>
			</div>

			<Comments />
		</div>
	);
};

export default Post;
