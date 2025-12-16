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
			<div>
				<img src={profile.cover_url} alt="" />
				<img src={profile.avatar_url} alt="" />
			</div>

			<div>
				<p>{profile.display_name}</p>
				<p>@{profile.username}</p>
			</div>

			<div>
				<p>{profile.bio}</p>
				<p>{profile.location}</p>
			</div>
		</div>
	);
};

export default Profile;
