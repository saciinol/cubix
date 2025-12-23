/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';
import Input from '../ui/Input';
import useFormContext from '../utils/useFormContext';
import { useUser } from '../../store/authStore';
import { useIsSubmitting, useProfileActions, useProfiles } from '../../store/profileStore';
import Label from '../ui/Label';

const EditProfile = () => {
	const user = useUser();
	const getProfile = useProfiles();
	const { loadProfile, updateProfile } = useProfileActions();
	const isSubmitting = useIsSubmitting();
	const { setOnSubmit, setIsSubmitting } = useFormContext();
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

	const [errors, setErrors] = useState({});

	const profile = getProfile[user?.user_id];

	useEffect(() => {
		if (user.user_id) {
			loadProfile(user.user_id);
		}
	}, [user.user_id]);

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
		// validation
		const newErrors = {};
		if (profileData.display_name.trim().length > 100)
			newErrors.display_name = 'Display name cannot exceed 100 characters';
		if (profileData.bio.trim().length > 500) newErrors.bio = 'Bio cannot exceed 500 characters';
		if (profileData.location.trim().length > 100) newErrors.location = 'Location cannot exceed 100 characters';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true);

		const updates = {};
		Object.keys(profileData).forEach((key) => {
			const newValue = profileData[key] || null;
			const oldValue = profile[key] || null;

			if (newValue !== oldValue) {
				updates[key] = newValue;
			}
		});

		if (Object.keys(updates).length === 0) {
			navigate(`/profile/${user.user_id}`);
			return;
		}

		try {
			await updateProfile(user.user_id, updates);
			navigate(`/profile/${user.user_id}`);
		} catch (error) {
			console.error('Failed to update profile', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		setOnSubmit(() => handleSubmit);

		return () => setOnSubmit(null);
	}, [profileData, profile]);

	useEffect(() => {
		setIsSubmitting(isSubmitting);
	}, [isSubmitting]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};

	if (!profile) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loader2 className="size-6 animate-spin" />
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto mb-5">
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
					)}{' '}
				</div>
			</div>

			<div className="max-w-2xl md:mx-auto mt-5 flex flex-col gap-5">
				{fields.map((field) => (
					<div className="relative mx-3" key={field.name}>
						{field.type === 'textarea' ? (
							<textarea
								id={field.name}
								name={field.name}
								value={profileData[field.name]}
								onChange={handleChange}
								rows={field.rows}
								placeholder=""
								disabled={isSubmitting}
								className="flex border-gray-300 bg-transparent px-3 pt-4 pb-2 text-base placeholder:text-gray-500 focus:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 peer w-full focus:border-blue-600 rounded-md border focus:outline-none h-auto resize-none"
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
							/>
						)}

						<Label htmlFor={field.name}>{field.label}</Label>

						{errors[field.name] && <div className="text-red-600 text-xs mt-1 ml-3">{errors[field.name]}</div>}
					</div>
				))}
			</div>
		</div>
	);
};

export default EditProfile;
