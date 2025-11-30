import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen bg-base-100">
			<header
				className={`w-full h-11 px-4 flex items-center bg-gray-300 transition-transform duration-300 sticky top-0 z-40`}
			>
				<div>
					<Link to="/" className="flex items-center gap-1 text-2xl font-bold">
						<Box className="size-7" />
						Cubix
					</Link>
				</div>
			</header>

			<main className="pb-20 lg:pb-4 min-h-[calc(100vh-64px)]">{children}</main>
		</div>
	);
};

export default Layout;
