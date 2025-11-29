import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';

const Layout = ({ children }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY && currentScrollY > 50) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY]);

	return (
		<div className="min-h-screen bg-base-100">
			<header
				className={`w-full px-5 py-3 bg-gray-300 shadow-sm border-b border-gray-400 transition-transform duration-300 sticky top-0 z-40 ${
					isVisible ? 'translate-y-0' : '-translate-y-full'
				}`}
			>
				<div>
					<Link to="/" className="flex items-center gap-1 text-3xl font-bold">
						<Box className="size-8" />
						Cubix
					</Link>
				</div>
			</header>

			<main className="pb-20 lg:pb-4 min-h-[calc(100vh-64px)]">{children}</main>
		</div>
	);
};

export default Layout;
