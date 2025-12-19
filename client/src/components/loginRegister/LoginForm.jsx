import { useState } from 'react';
import { Loader2, Eye, EyeOff } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginForm = ({ onSubmit, isLoading }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState('');

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
			await onSubmit(formData.email.trim(), formData.password);
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			setValidationErrors('Invalid email or password.');
		}
	};

	return (
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
				<div className="flex items-center justify-end relative">
					<Input
						type={showPassword ? 'text' : 'password'}
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={`pr-12 ${validationErrors ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder="Password"
						disabled={isLoading}
						required
					/>

					<div
						onClick={() => setShowPassword(!showPassword)}
						className="absolute mr-2 cursor-pointer hover:bg-gray-100 rounded-full duration-200 p-2 select-none"
					>
						{showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors ? validationErrors : '&nbsp;'}
				</p>
			</div>

			<Button type="submit" className="w-full">
				{isLoading ? <Loader2 className="size-6 animate-spin" /> : 'Login'}
			</Button>
		</form>
	);
};

export default LoginForm;
