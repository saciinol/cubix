import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const result = await authService.registerUser(username, email, password);
		res.status(201).json({
			token: result.token,
			user: result.user,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const result = await authService.loginUser(email, password);
		res.status(200).json({
			token: result.token,
			user: result.user,
		});
	} catch (error) {
		next(error);
	}
};

export const verify = async (req, res, next) => {
	try {
		const user = await authService.verifyUser(req.user.userId);

		res.json({ user });
	} catch (error) {
		next(error);
	}
};
