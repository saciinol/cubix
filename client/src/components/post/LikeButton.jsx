import { useState } from 'react';
import { usePostActions } from '../../store/postStore';
import { ThumbsUp } from 'lucide-react';

const LikeButton = ({ currentPost }) => {
	const { toggleLikePost } = usePostActions();

	const [isLiking, setIsLiking] = useState(false);

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

	return (
		<button
			onClick={handleLike}
			disabled={isLiking}
			className={`flex items-center gap-1.5 group cursor-pointer ${
				currentPost.like_id ? 'text-blue-500' : 'hover:text-blue-500 transition-colors disabled:opacity-50'
			}`}
		>
			<ThumbsUp
				className={`size-5 ${currentPost.like_id ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`}
			/>
			<span className="text-sm font-medium">{currentPost.likes_count}</span>
		</button>
	);
};

export default LikeButton;
