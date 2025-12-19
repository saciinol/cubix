import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Loader2, User } from 'lucide-react';
import { useAuthStore, useProfileStore } from '../store';
import Button from '../components/ui/Button';

const Profile = () => {
	const { id } = useParams();
	const { user } = useAuthStore();
	const { getProfile, loadProfile, isProfileLoading, error } = useProfileStore();
  const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			loadProfile(id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

  const handleEditProfile = () => {
    navigate(`/profile/${id}/edit`);
  }

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
				<div className={`-mt-12 size-24 md:-mt-18 md:size-36 ${profile.cover_url ? "" : "mt-12!"}`}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt="" className="rounded-full" />
          ) : (
            <User className='bg-blue-300 size-24 md:size-36 rounded-full object-contain' />
          )}
				</div>
			</div>

			{id == user.user_id && (
				<div className="flex justify-end" onClick={handleEditProfile}>
					<Button
						variant="transparent"
						className="absolute -mt-10 mr-2 lg:mr-0 md:-mt-16 text-sm h-8! px-3! md:text-base md:h-10! md:px-4!"
					>
						Edit Profile
					</Button>
				</div>
			)}

			<div className="flex flex-col items-center mb-2">
				<p className="font-bold text-base">{profile.display_name || profile.username}</p>
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
