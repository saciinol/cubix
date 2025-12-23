import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Box, LogOut, User } from 'lucide-react';
import Dropdown, { DropdownItem } from '../ui/Dropdown';
import { useEffect } from 'react';
import useFormContext from './useFormContext';
import { useAuthActions, useUser } from '../../store/authStore';
import { useProfileActions, useProfiles } from '../../store/profileStore';

const Layout = ({ children, ...props }) => {
	const user = useUser();
	const { logout } = useAuthActions();
	const { loadProfile } = useProfileActions();
	const getProfile = useProfiles();
	const { onSubmit, isSubmitting } = useFormContext();
	const navigate = useNavigate();

	const profile = getProfile[user?.user_id];

	useEffect(() => {
		if (user.user_id) {
			loadProfile(user.user_id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.user_id]);

	const handleProfile = () => {
		navigate(`/profile/${user.user_id}`);
	};

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	if (props.post || props.editProfile) {
		return (
			<div className="min-h-screen bg-muted">
				<header className={`sticky top-0 z-40 w-full bg-white shadow-sm`}>
					<nav className="max-w-7xl mx-auto flex items-center p-1.5">
						<div className="w-full py-1.5 px-2 flex justify-between items-center">
							<div className="flex items-center gap-3">
								<ArrowLeft className="size-5 cursor-pointer" onClick={handleGoBack} />
								{props.post && <p className="font-bold text-xl">Post</p>}
								{props.editProfile && <p className="font-bold text-xl">Edit Profile</p>}
							</div>

							{props.editProfile && (
								<button
									onClick={onSubmit}
									disabled={isSubmitting}
									className="cursor-pointer font-bold text-lg hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Save
								</button>
							)}
						</div>
					</nav>
				</header>

				<main className="pb-20 lg:pb-4 min-h-[calc(100vh-64px)]">{children}</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-muted">
			<header className={`sticky top-0 z-40 w-full bg-white shadow-sm`}>
				<nav className="max-w-7xl mx-auto flex justify-between items-center p-1.5">
					<Link
						to="/"
						className="py-1 px-2 flex items-center justify-center gap-1 hover:bg-gray-100 rounded-md duration-100"
					>
						<Box className="size-7" />
						<p className="text-xl font-bold">Cubix</p>
					</Link>

					<div className="py-1 px-2 flex items-center justify-center gap-1 cursor-pointer">
						<Dropdown
							trigger={
								profile?.avatar_url ? (
									<img src={profile?.avatar_url} alt={profile?.username} className="size-8 rounded-full object-cover" />
								) : (
									<User className="bg-blue-300 size-8 rounded-full object-cover" />
								)
							}
						>

							<DropdownItem onClick={handleProfile}>
								<User className="size-5" />
								<p className="text-sm/1">Profile</p>
							</DropdownItem>
							<DropdownItem onClick={handleLogout}>
								<LogOut className="size-5" />
								<p className="text-sm/1">Logout</p>
							</DropdownItem>
						</Dropdown>
					</div>
				</nav>
			</header>

			<main className="pb-20 lg:pb-4 min-h-[calc(100vh-64px)]">{children}</main>
		</div>
	);
};

export default Layout;
