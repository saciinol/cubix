import { useEffect } from 'react';
import { useIsLoading, usePostActions } from '../../store/postStore';
import { Loader2 } from 'lucide-react';
import PostCard from '../post/PostCard';
import { useAuthStore } from '../../store';

const UserPosts = () => {
	const { user } = useAuthStore();
	const isLoading = useIsLoading();
	const { loadUserPosts, getUserPosts } = usePostActions();

	const userPosts = getUserPosts(user?.user_id || user?.id);

	useEffect(() => {
		if (user?.user_id || user?.id) {
			loadUserPosts(user?.user_id || user?.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.user_id || user?.id]);

	return (
		<div className="max-w-2xl mx-auto">
			<div className="flex flex-col divide-y divide-gray-300">
				{isLoading ? (
					<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
						<Loader2 className="size-6 animate-spin" />
					</div>
				) : userPosts && userPosts.length > 0 ? (
					userPosts.map((post) => <PostCard key={post.post_id} post={post} />)
				) : (
					<div className="min-h-[calc(100vh-132px)] flex items-center justify-center text-gray-500">
						<p>No posts yet. Be the first to post!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserPosts;
