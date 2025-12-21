import ProfileDetails from '../components/profile/ProfileDetails';
import UserPosts from '../components/profile/UserPosts';

const Profile = () => {
	return (
		<section>
			<ProfileDetails />
			<div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between">
				<div>Ewan ko pa</div>
				<UserPosts />
			</div>
		</section>
	);
};

export default Profile;
