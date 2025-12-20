/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';
import { useAuthStore, useProfileStore } from '../../store';
import Input from '../ui/Input';
import useFormContext from '../utils/useFormContext';

const EditProfile = () => {
	const { user } = useAuthStore();
	const { getProfile, loadProfile, updateProfile, isSubmitting } = useProfileStore();
	const { setFormSubmit, setIsSubmitting } = useFormContext();
	const navigate = useNavigate();

	const fields = [
		{ name: 'display_name', label: 'Display Name' },
		{ name: 'bio', type: 'textarea', label: 'Bio', rows: 4 },
		{ name: 'location', label: 'Location' },
		{ name: 'website', label: 'Website' },
	];

	const [profileData, setProfileData] = useState({
		display_name: '',
		bio: '',
		avatar_url: '',
		cover_url: '',
		location: '',
		website: '',
	});

	const profile = getProfile(user?.user_id || user?.id);

	useEffect(() => {
		if (user?.user_id || user?.id) {
			loadProfile(user?.user_id || user?.id);
		}
	}, [user?.user_id || user?.id]);

	useEffect(() => {
		if (profile) {
			setProfileData({
				display_name: profile.display_name || '',
				bio: profile.bio || '',
				avatar_url: profile.avatar_url || '',
				cover_url: profile.cover_url || '',
				location: profile.location || '',
				website: profile.website || '',
			});
		}
	}, [profile]);

	const handleSubmit = async () => {
		const updates = {};
		Object.keys(profileData).forEach((key) => {
			if (profileData[key] !== profile[key] || '') {
				updates[key] = profileData[key] || null;
			}
		});

		if (Object.keys(updates).length === 0) {
			navigate(`/profile/${user.user_id || user.id}`);
			return;
		}

		setIsSubmitting(true);
		try {
			await updateProfile(user.user_id || user.id, updates);
			navigate(`/profile/${user.user_id || user.id}`);
		} catch (error) {
			console.error('Failed to update profile', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		setFormSubmit(handleSubmit);

		return () => {
			setFormSubmit(null);
		};
	}, [profileData, profile, user]);

	useEffect(() => {
		setIsSubmitting(isSubmitting);
	}, [isSubmitting]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (!profile) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto">
			<div className="flex flex-col items-center mb-2">
				<div>
					<img src={profile.cover_url} alt="" className="w-full max-w-[900px] max-h-[300px] object-cover" />
				</div>

				<div>
					{profile.avatar_url ? (
						<img src={profile.avatar_url} alt="" className="rounded-full object-cover -mt-12 size-24 md:-mt-18 md:size-36 border-3 border-muted" />
					) : (
						<User className="bg-blue-300 size-24 md:size-36 rounded-full object-cover mt-12 border-3 border-muted" />
					)}{' '}
				</div>
			</div>

			<div className="mx-3 mt-5 flex flex-col gap-5">
				{fields.map((field) => (
					<div className="relative" key={field.name}>
						{field.type === 'textarea' ? (
							<textarea
								id={field.name}
								name={field.name}
								value={profileData[field.name]}
								onChange={handleChange}
								rows={field.rows}
								placeholder=""
								disabled={isSubmitting}
								className="flex border-gray-300 bg-transparent px-3 py-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400  disabled:cursor-not-allowed disabled:opacity-50 peer w-full focus:border-blue-600 rounded-sm border pt-5! pb-2! focus:outline-none h-auto resize-none"
							/>
						) : (
							<Input
								id={field.name}
								type={field.type}
								name={field.name}
								value={profileData[field.name]}
								onChange={handleChange}
								placeholder=""
								disabled={isSubmitting}
								className="peer w-full focus:border-blue-600! rounded-sm! border pt-5! pb-2! focus:outline-none h-auto!"
							/>
						)}
						<label
							htmlFor="display_name"
							className="absolute select-none left-3 top-4 text-sm text-gray-400 transition-all
               peer-placeholder-shown:top-4
               peer-placeholder-shown:text-base
             peer-placeholder-shown:text-gray-400
               peer-focus:top-1
               peer-focus:text-xs
             peer-focus:text-blue-500
               peer-not-placeholder-shown:top-1
               peer-not-placeholder-shown:text-xs
             peer-not-placeholder-shown:text-gray-500
             pointer-events-none"
						>
							{field.label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default EditProfile;
