import CreatePost from './CreatePost';
import FeedPosts from './FeedPosts';

const PostList = () => {
	return (
		<div className="max-w-2xl mx-auto">
			<CreatePost />
			<FeedPosts />
		</div>
	);
};

export default PostList;
