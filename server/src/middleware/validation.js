import { AppError } from '../utils/AppError.js';

export const validateRegister = (req, res, next) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) throw new AppError('All fields are required', 400);

	if (username.length < 3 || username.length > 30) throw new AppError('Username must be 3-30 characters', 400);

	const usernameRegex = /^[a-zA-Z0-9_]+$/;
	if (!usernameRegex.test(username))
		throw new AppError('Username can only contain letters, numbers, and underscores', 400);

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AppError('Invalid email format', 400);

	if (password.length < 6) throw new AppError('Password must be at least 6 characters', 400);

	next();
};

export const validateLogin = (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new AppError('All fields are required', 400);
	}

	next();
};
