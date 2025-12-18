import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { usePostStore } from '../../store';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const PostList = () => {
	const { feedPosts, isLoading, loadFeedPosts } = usePostStore();

	useEffect(() => {
		loadFeedPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="max-w-2xl mx-auto">
      <CreatePost />

			<div className="flex flex-col divide-y divide-gray-300">
				{isLoading ? (
					<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
						<Loader2 className="size-6 animate-spin" />
					</div>
				) : feedPosts && feedPosts.length > 0 ? (
					feedPosts.map((post) => <PostCard key={post.post_id} post={post} />)
				) : (
					<div className="min-h-[calc(100vh-132px)] flex items-center justify-center text-gray-500">
						<p>No posts yet. Be the first to post!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostList;
