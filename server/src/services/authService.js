import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userModel from '../models/userModel.js';
import { AppError } from '../utils/AppError.js';

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (username, email, password) => {
	const existingUsername = await userModel.findByUsername(username);
	if (existingUsername) throw new AppError('Username already taken', 400);

	const existingEmail = await userModel.findByEmail(email);
	if (existingEmail) throw new AppError('Email already in use', 400);

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await userModel.createUser(username, email, hashedPassword);

	await userModel.createProfile(user.user_id);

	const token = generateToken(user.user_id);

	return {
		token,
		user: {
			id: user.user_id,
			username: user.username,
			email: user.email,
		},
	};
};

export const loginUser = async (email, password) => {
	const user = await userModel.findByEmail(email);
	if (!user) throw new AppError('Invalid email or password', 401);

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) throw new AppError('Invalid email or password', 401);

	const token = generateToken(user.user_id);

	return {
		token,
		user: {
			id: user.user_id,
			username: user.username,
			email: user.email,
		},
	};
};

export const verifyUser = async (userId) => {
	const user = await userModel.findByUserId(userId);
	if (!user) throw new AppError('User not found', 404);

	return user;
};
