import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useIsLoading, usePostActions, useUserPosts } from '../../store/postStore';
import PostCard from '../post/PostCard';

const UserPosts = () => {
	const { id } = useParams();
	const isLoading = useIsLoading();
	const userPosts = useUserPosts();
	const { loadUserPosts } = usePostActions();

	const posts = userPosts[id];

	useEffect(() => {
		if (id) {
			loadUserPosts(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="w-full max-w-2xl mx-auto md:mx-0">
			<div className="flex flex-col divide-y divide-gray-300">
				{isLoading ? (
					<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
						<Loader2 className="size-6 animate-spin" />
					</div>
				) : posts && posts.length > 0 ? (
					posts.map((post) => <PostCard key={post.post_id} post={post} />)
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
