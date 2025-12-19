import { Link, useNavigate } from 'react-router-dom';
import { Box } from 'lucide-react';

import { useAuthStore } from '../store';
import RegisterForm from '../components/loginRegister/RegisterForm';

const Register = () => {
	const { register, isLoading } = useAuthStore();
	const navigate = useNavigate();

	const handleRegister = async (formData) => {
		await register(formData);
		navigate('/posts/feed');
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
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          </div>

					<div className="text-gray-500 flex justify-center gap-1 text-base">
						<p>Already have an account?</p>
						<Link to="/login" className="text-black font-medium hover:underline">
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;
