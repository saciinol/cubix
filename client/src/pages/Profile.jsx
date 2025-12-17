import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthStore, useProfileStore } from '../store';

const Profile = () => {
	const { id } = useParams();
	const { user } = useAuthStore();
	const { getProfile, loadProfile, isProfileLoading, updateProfile, isSubmitting, error } = useProfileStore();
	const [profileData, setProfileData] = useState({});

	useEffect(() => {
		if (id) {
			loadProfile(id);
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (id !== user.user_id) return;
	};

	const profile = getProfile(id);
	const loading = isProfileLoading(id);

	if (loading && !profile) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	if (error && !profile) {
		return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
	}

	if (!profile) {
		return <div className="min-h-screen flex items-center justify-center">Profile not found...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex flex-col items-center mb-2">
				<div className="w-full">
					<img src={profile.cover_url} alt="" />
				</div>
				<div className="-mt-12 size-24 md:-mt-18 md:size-36">
					<img src={profile.avatar_url} alt="" className="rounded-full" />
				</div>
			</div>

			<div className="flex flex-col items-center mb-2">
				<p className="font-bold text-base">{profile.display_name}</p>
				<p className="text-sm text-black/60">@{profile.username}</p>
			</div>

			<div className="flex justify-center gap-5 mb-2">
				<p className="text-base text-black/60">
					<span className="font-semibold text-black">{profile.following_count}</span> Following
				</p>
				<p className="text-base text-black/60">
					<span className="font-semibold text-black">{profile.followers_count}</span> Followers
				</p>
			</div>

			<div className="m-2">
				<p>{profile.bio}</p>
				<p>{profile.location}</p>
				<p>{profile.website}</p>
			</div>
		</div>
	);
};

export default Profile;
