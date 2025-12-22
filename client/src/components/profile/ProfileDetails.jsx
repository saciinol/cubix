/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Loader2, MapPin, User } from 'lucide-react';
import Button from '../ui/Button';
import { useUser } from '../../store/authStore';
import { useFollowActions, useFollowing, useIsLoading } from '../../store/followStore';
import { useProfileActions, useProfiles } from '../../store/profileStore';

const ProfileDetails = () => {
	const { id } = useParams();
	const user = useUser();
	const { loadProfile, isProfileLoading } = useProfileActions();
	const getProfile = useProfiles();
	const following = useFollowing();
	const isLoading = useIsLoading();
	const { isFollowing, toggleFollowUser } = useFollowActions();
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			loadProfile(id);
		}
	}, [id]);

	useEffect(() => {
		if (id) {
			isFollowing(id);
		}
	}, [id]);

	const handleEditProfile = () => {
		navigate(`/profile/${id}/edit`);
	};

	const handleFollow = async () => {
		try {
			await toggleFollowUser(id);
		} catch (error) {
			console.log('Failed to follow', error);
		}
	};

	const profile = getProfile[id];
	const loading = isProfileLoading(id);

	if (loading && !profile) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	if (!profile) {
		return <div className="min-h-screen flex items-center justify-center">Profile not found...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto border-b border-gray-300">
			<div className="flex flex-col items-center mb-2">
				<div>
					<img src={profile.cover_url} alt="" className="w-full max-w-[900px] max-h-[300px] object-cover" />
				</div>

				<div>
					{profile.avatar_url ? (
						<img
							src={profile.avatar_url}
							alt=""
							className="rounded-full object-cover -mt-12 size-24 md:-mt-18 md:size-36 border-3 border-muted"
						/>
					) : (
						<User className="bg-blue-300 size-24 md:size-36 rounded-full object-cover mt-12 border-3 border-muted" />
					)}
				</div>
			</div>

			{id == user.user_id || id == user.id ? (
				<div className="flex justify-end">
					<Button
						variant="transparent"
						className="absolute -mt-10 mr-2 lg:mr-0 md:-mt-16 text-sm h-8! px-3! md:text-base md:h-10! md:px-4!"
						onClick={handleEditProfile}
					>
						Edit Profile
					</Button>
				</div>
			) : (
				<div className="flex justify-end">
					<Button
						variant="transparent"
						className={`absolute -mt-10 mr-2 lg:mr-0 md:-mt-16 text-sm h-8! px-3! md:text-base md:h-10! md:px-4! ${
							following && 'bg-black! text-white! hover:bg-white! hover:text-black!'
						}`}
						onClick={handleFollow}
					>
						{isLoading ? (
							<div className="min-h-[calc(100vh-132px)] flex items-center justify-center">
								<Loader2 className="size-6 animate-spin" />
							</div>
						) : (
							<p>{following ? 'Following' : 'Follow'}</p>
						)}
					</Button>
				</div>
			)}

			<div className="flex flex-col items-center mb-2">
				<p className="font-bold text-base">{profile.display_name || profile.username}</p>
				<p className="text-sm leading-tight text-black/60">@{profile.username}</p>
			</div>

			<div className="flex justify-center gap-5 mb-2">
				<p className="text-base text-black/60">
					<span className="font-semibold text-black">{profile.following_count}</span> Following
				</p>
				<p className="text-base text-black/60">
					<span className="font-semibold text-black">{profile.followers_count}</span> Followers
				</p>
			</div>

			<div className="mx-2">
				<p>{profile.bio}</p>
			</div>

			{(profile.location || profile.website) && (
				<div className="flex flex-col md:flex-row md:gap-3 m-2">
					<div className="flex gap-1 items-center text-black/60 text-sm">
						<MapPin className="size-4" />
						<p>{profile.location}</p>
					</div>
					<div className="flex gap-1 items-center text-black/60 text-sm">
						<Link className="size-4" />
						<p>{profile.website}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDetails;
