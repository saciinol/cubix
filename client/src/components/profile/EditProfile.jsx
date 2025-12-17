import { useState } from 'react';

const EditProfile = () => {
	const [profileData, setProfileData] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='absolute flex justify-center items-center'>
			<form onSubmit={handleSubmit}>
				<input type="text" name="displayName" value={profileData.displayName} onChange={handleChange} />
				Edit Profile
				<input
					type="file"
					name="avatarUrl"
					accept="image/*"
					className="size-24 md:size-36 rounded-full"
				/>
			</form>
		</div>
	);
};

export default EditProfile;
