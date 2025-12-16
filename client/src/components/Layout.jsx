import { Link, useNavigate } from 'react-router-dom';
import { Box, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store';
import Dropdown, { DropdownItem } from './ui/Dropdown';

const Layout = ({ children }) => {
	const { logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className="min-h-screen bg-muted">
			<header className={`sticky top-0 z-40 w-full bg-white shadow-sm`}>
				<nav className="max-w-7xl mx-auto flex justify-between items-center p-1.5">
					<Link
						to="/posts/feed"
						className="py-1 px-2 flex items-center justify-center gap-1 hover:bg-gray-100 rounded-md duration-100"
					>
						<Box className="size-7" />
						<p className="text-xl font-bold">Cubix</p>
					</Link>

					<div className="py-1 px-2 flex items-center justify-center gap-1 cursor-pointer">
						<Dropdown trigger={<User className="bg-blue-300 size-8 rounded-full" />}>
							<DropdownItem>
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
