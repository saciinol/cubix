import jwt from 'jsonwebtoken';

import { AppError } from '../utils/AppError.js';

export const authenticateToken = (req, res, next) => {
	try {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) throw new AppError('Access Denied. No token provided.', 401);

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = decoded;

		next();
	} catch (error) {
		next(error);
	}
};
