import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Loader2 } from 'lucide-react';

import { useAuthStore } from '../store';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [validationErrors, setValidationErrors] = useState('');

	const { login, isLoading } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/feed';

	const handleChange = (e) => {
		const { name, value } = e.target;

		setValidationErrors('');

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(formData.email.trim(), formData.password);
			navigate(from, { replace: true });
		// eslint-disable-next-line no-unused-vars
		} catch (error) {
			setValidationErrors('Invalid email or password.');
		}
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
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<Input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`${validationErrors ? 'border-red-600 focus:border-red-600' : ''}`}
									placeholder="Email"
									disabled={isLoading}
									required
								/>
							</div>

							<div className="flex flex-col">
								<Input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									className={`${validationErrors ? 'border-red-600 focus:border-red-600' : ''}`}
									placeholder="Password"
									disabled={isLoading}
									required
								/>

								<p className={`ml-1 text-red-600 text-sm ${validationErrors ? 'opacity-100' : 'opacity-0'}`}>
									{validationErrors ? validationErrors : '&nbsp;'}
								</p>
							</div>

							<div className="flex flex-col gap-2">
								<Button type="submit" className="w-full">
									{isLoading ? <Loader2 className="size-6 animate-spin" /> : 'Login'}
								</Button>
							</div>
						</form>
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
