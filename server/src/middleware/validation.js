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
	const { email, password } = req.body;

	if (!email || !password) {
		throw new AppError('All fields are required', 400);
	}

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		throw new AppError('Invalid email format', 400);
	}

	next();
};

const isValidUrl = (url) => {
	if (!url) return true;

	try {
		const urlObj = new URL(url);
		return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
	} catch (error) {
		return false;
	}
};

export const validateCreatePost = (req, res, next) => {
	const { content, image_url } = req.body;

	if (!content) {
		throw new AppError('Post content is required', 400);
	}
	if (content.trim().length === 0) {
		throw new AppError('Post content cannot be empty', 400);
	}
	if (content.length > 500) {
		throw new AppError('Post content cannot exceed 500 characters', 400);
	}
	if (image_url && !isValidUrl(image_url)) {
		throw new AppError('Invalid image URL format', 400);
	}

	next();
};

export const validateUpdateProfile = (req, res, next) => {
	const { display_name, bio, avatar_url, cover_url, location, website } = req.body;

	if (
		display_name === undefined &&
		bio === undefined &&
		avatar_url === undefined &&
		cover_url === undefined &&
		location === undefined &&
		website === undefined
	) {
		throw new AppError('At least one field must be provided to update', 400);
	}

	if (display_name !== undefined && display_name !== null) {
		if (typeof display_name !== 'string') {
			throw new AppError('Display name must be string', 400);
		}
		if (display_name.trim().length > 100) {
			throw new AppError('Display name cannot exceed 100 characters', 400);
		}
	}

	if (bio !== undefined && bio !== null) {
		if (typeof bio !== 'string') {
			throw new AppError('Bio must be string', 400);
		}
		if (bio.length > 500) {
			throw new AppError('Bio cannot exceed 500 characters', 400);
		}
	}

	if (avatar_url !== undefined && avatar_url !== null) {
		if (!isValidUrl(avatar_url)) {
			throw new AppError('Invalid avatar URL format. Must be http or https.', 400);
		}
	}

	if (cover_url !== undefined && cover_url !== null) {
		if (!isValidUrl(cover_url)) {
			throw new AppError('Invalid cover URL format. Must be http or https.', 400);
		}
	}

	if (location !== undefined && location !== null) {
		if (typeof location !== 'string') {
			throw new AppError('Location must be string', 400);
		}
		if (location.length > 100) {
			throw new AppError('Location cannot exceed 100 characters', 400);
		}
	}

	if (website !== undefined && website !== null) {
		if (!isValidUrl(website)) {
			throw new AppError('Invalid website URL format. Must be http or https.', 400);
		}
	}

	next();
};

export const validateCreateComment = (req, res, next) => {
	const postId = parseInt(req.params.id);
	const { content, parent_comment_id } = req.body;

	if (isNaN(postId)) {
		throw new AppError('Post ID must be a valid number', 400);
	}

	if (parent_comment_id !== undefined && typeof parent_comment_id !== 'number') {
		throw new AppError('Parent Comment ID must be a number', 400);
	}

	if (!content) {
		throw new AppError('Comment content is required', 400);
	}
	if (content.trim().length === 0) {
		throw new AppError('Comment content cannot be empty', 400);
	}
	if (content.length > 300) {
		throw new AppError('Comment content cannot exceed 300 characters', 400);
	}

	next();
};
