import { MessageSquareMore, ThumbsUp, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../../store';
import timeAgo from '../timeAgo';

const PostCard = ({ post }) => {
	const { toggleLikePost } = usePostStore();
	const [isLiking, setIsLiking] = useState(false);
	const navigate = useNavigate();

	const handleLike = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		setIsLiking(true);

		try {
			await toggleLikePost(post.post_id);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLiking(false);
		}
	};

	const handleProfileClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		navigate(`/profile/${post.user_id}`);
	};

	const handlePostClick = () => {
		navigate(`/posts/${post.post_id}`);
	};

	return (
		<div className="w-full hover:bg-gray-50 transition-colors" onClick={handlePostClick}>
			<div className="flex justify-between m-2">
				<div onClick={handleProfileClick} className="flex items-center gap-2 cursor-pointer">
					<img src={post.avatar_url} alt={post.username} className="size-11 rounded-full object-cover" />
					<div>
						<p className="text-base/tight font-bold">{post.display_name}</p>
						<p className="text-sm/tight text-gray-700">@{post.username}</p>
					</div>
				</div>
				<p className="text-xs text-gray-500">{timeAgo(post.created_at)}</p>
			</div>

			<div className="mx-2 mb-2">
				<p className="text-base leading-snug whitespace-pre-wrap wrap-break-word">{post.content}</p>
				{post.image_url && (
					<img src={post.image_url} alt={post.username} className="my-2 rounded-lg w-full object-cover max-h-96" />
				)}
			</div>

			<div className="flex gap-4 mx-2 mb-2 text-gray-600">
				<button
					onClick={handleLike}
					disabled={isLiking}
					className={`flex items-center gap-1.5 group cursor-pointer ${
						post.like_id ? 'text-blue-500' : 'hover:text-blue-500 transition-colors disabled:opacity-50'
					}`}
				>
					<ThumbsUp
						className={`size-5 ${post.like_id ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`}
					/>
					<span className="text-sm font-medium">{post.likes_count}</span>
				</button>

				<div onClick={handlePostClick} className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-pointer">
					<MessageSquareMore className="size-5" />
					<p className="text-sm font-medium">{post.comments_count}</p>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
