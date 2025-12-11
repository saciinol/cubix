import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { usePostStore } from '../store';
import PostCard from '../components/ui/PostCard';

const Feed = () => {
	const { feedPosts, isLoading, loadFeedPosts } = usePostStore();

	useEffect(() => {
		loadFeedPosts();
	}, []);

	return (
		<div className="max-w-2xl mx-auto flex flex-col divide-y divide-gray-300">
			{isLoading ? (
				<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
					<Loader2 className="size-6 animate-spin" />
				</div>
			) : (
				feedPosts.map((post) => <PostCard key={post.post_id} post={post} />)
			)}
		</div>
	);
};

export default Feed;
