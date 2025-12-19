import { useState } from 'react';
import { useAuthStore, usePostStore } from '../../store';
import Button from '../ui/Button';
import { useIsSubmitting, usePostActions } from '../../store/postStore';

const CreatePost = () => {
	const { user } = useAuthStore();
	// const { createPost, isSubmitting } = usePostStore();
	const { createPost } = usePostActions();
	const isSubmitting = useIsSubmitting();

	const [postData, setPostData] = useState({
		content: '',
		image_url: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setPostData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user?.user_id || !postData.content.trim()) {
			return;
		}

		try {
			await createPost(postData.content.trim(), postData.image_url || null, user.user_id);

			setPostData({ content: '', image_url: '' });
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	return (
		<div className="border-b border-gray-300">
			<form onSubmit={handleSubmit} className="m-2 flex flex-col gap-2">
				<div className="flex flex-col">
					<textarea
						name="content"
						value={postData.content}
						onChange={handleChange}
						className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 focus:outline-none focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 resize-none overflow-hidden"
						placeholder="Write your thoughts..."
						disabled={isSubmitting}
						rows={1}
						onInput={(e) => {
							e.target.style.height = 'auto';
							e.target.style.height = `${e.target.scrollHeight}px`;
						}}
					></textarea>
				</div>

				<div className="self-end">
					<Button
						disabled={!postData.content.trim() || isSubmitting}
						type="submit"
						className="h-8! bg-white! hover:text-black! border-0! shadow-md"
						variant="transparent"
					>
						Post
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreatePost;
