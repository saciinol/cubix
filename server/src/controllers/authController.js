import * as authService from "../services/authService.js";

export const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const user = await authService.registerNewUser(username, email, password);
		res.status(201).json({ user });
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		const user = await authService.loginUser(username, password);
		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};
