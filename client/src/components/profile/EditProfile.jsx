import { useState } from 'react';
import { useProfileStore } from '../../store';
import { useNavigate, useParams } from 'react-router-dom';

const EditProfile = () => {
	const { id } = useParams();
	const { getProfile, updateProfile, isSubmitting } = useProfileStore();
	const [profileData, setProfileData] = useState({});
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateProfile(id, profileData);
			navigate(`/profile/${id}`);
		} catch (error) {
			console.error('Failed to update profile', error);
		}
	};

	const profile = getProfile(id);

	return (
		<div className="max-w-4xl mx-auto">
			<form onSubmit={handleSubmit}>
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
			</form>
		</div>
	);
};

export default EditProfile;
