import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { sanitizeInput, validateRegister } from '../../utils/validation';

const RegisterForm = ({ onSubmit, isLoading }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (validationErrors[name]) {
			setValidationErrors((prev) => ({
				...prev,
				[name]: null,
			}));
		}

		setFormData({
			...formData,
			[name]: name === 'username' ? sanitizeInput(value) : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validation = validateRegister(formData);

		if (!validation.isValid) {
			setValidationErrors(validation.errors);
			return;
		}

		setValidationErrors({});

		try {
			await onSubmit({
				username: formData.username.trim(),
				email: formData.email.trim(),
				password: formData.password,
			});
		} catch {
			return;
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col">
			<div className="flex flex-col">
				<Input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					className={`${validationErrors.username ? 'border-red-600 focus:border-red-600' : ''}`}
					placeholder="Username"
					disabled={isLoading}
					required
				/>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors.username ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.username ? validationErrors.username : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col">
				<Input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className={`${validationErrors.email ? 'border-red-600 focus:border-red-600' : ''}`}
					placeholder="Email"
					disabled={isLoading}
					required
				/>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors.email ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.email ? validationErrors.email : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-end">
					<Input
						type={showPassword ? 'text' : 'password'}
						name="password"
						value={formData.password}
						onChange={handleChange}
						className={`${validationErrors.password ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder="Password"
						disabled={isLoading}
						required
					/>

					<div
						onClick={() => setShowPassword(!showPassword)}
						className="absolute mr-2 cursor-pointer hover:bg-gray-100 rounded-full duration p-2 select-none"
					>
						{showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors.password ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.password ? validationErrors.password : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col">
				<div className="flex items-center justify-end">
					<Input
						type={showConfirmPassword ? 'text' : 'password'}
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						className={`${validationErrors.confirmPassword ? 'border-red-600 focus:border-red-600' : ''}`}
						placeholder="Confirm Password"
						disabled={isLoading}
						required
					/>

					<div
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						className="absolute mr-2 cursor-pointer hover:bg-gray-100 rounded-full duration p-2 select-none"
					>
						{showConfirmPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
					</div>
				</div>

				<p className={`ml-1 text-red-600 text-sm ${validationErrors.confirmPassword ? 'opacity-100' : 'opacity-0'}`}>
					{validationErrors.confirmPassword ? validationErrors.confirmPassword : '&nbsp;'}
				</p>
			</div>

			<div className="flex flex-col gap-2 mt-4">
				<Button type="submit" className="w-full">
					{isLoading ? <Loader2 className="size-6 animate-spin" /> : 'Sign Up'}
				</Button>
			</div>
		</form>
	);
};

export default RegisterForm;
