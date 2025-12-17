import { useParams } from 'react-router-dom';
import useProfileStore from '../store/profileStore';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const Profile = () => {
	const { id } = useParams();
	const { getProfile, loadProfile, isLoading } = useProfileStore();

	useEffect(() => {
		if (id) {
			loadProfile(id);
		}
	}, [id, loadProfile]);

	const profile = getProfile(id);

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className='flex flex-col items-center mb-2'>
				<div className='w-full'>
					<img src={profile.cover_url} alt="" />
				</div>
				<div className='-mt-12 size-24 md:-mt-18 md:size-36'>
					<img src={profile.avatar_url} alt="" className='rounded-full' />
				</div>
			</div>

			<div className='flex flex-col items-center mb-2'>
				<p className='font-bold text-base'>{profile.display_name}</p>
				<p className='text-sm/3'>@{profile.username}</p>
			</div>

			<div>
				<p>{profile.bio}</p>
				<p>{profile.location}</p>
				<p>{profile.website}</p>
			</div>
		</div>
	);
};

export default Profile;
