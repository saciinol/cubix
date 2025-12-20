import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box } from 'lucide-react';
import { useAuthStore } from '../store';
import LoginForm from '../components/loginRegister/LoginForm';

const Login = () => {
	const { login, isLoading } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const handleLogin = async (email, password) => {
		await login(email, password);
		navigate(from, { replace: true });
	};

	return (
		<section className="bg-muted h-screen">
			<div className="flex h-full items-center justify-center">
				<div className="border-muted bg-white flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md mx-3">
					<div className="flex flex-col items-center gap-y-2">
						<div className="flex items-center gap-1 lg:justify-start">
							<Box className="size-10 h-10" />
							<h1 className="text-3xl font-bold">Cubix</h1>
						</div>
					</div>

					<div className="flex w-full flex-col gap-8">
						<LoginForm onSubmit={handleLogin} isLoading={isLoading} />
					</div>

					<div className="text-gray-500 flex justify-center gap-1 text-base">
						<p>Don't have an account?</p>
						<Link to="/register" className="text-black font-medium hover:underline">
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
