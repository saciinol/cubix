import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCurrentPosts, useIsLoading, usePostActions } from '../../store/postStore';
import PostCard from './PostCard';
import Comments from '../comments/Comments';

const Post = () => {
	const { id } = useParams();
	const currentPost = useCurrentPosts();
	const isLoading = useIsLoading();
	const { loadPost } = usePostActions();

	useEffect(() => {
		window.scrollTo(0, 0);

		if (id) loadPost(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	if (isLoading || !currentPost) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="w-full max-w-2xl mx-auto">
			<PostCard post={currentPost} disableClick={true} />
			<Comments />
		</div>
	);
};

export default Post;
