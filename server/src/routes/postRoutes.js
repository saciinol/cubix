import express from 'express';
import {
	createPost,
	getPostById,
	getPosts,
	getFeedPosts,
	getUserPosts,
	deletePost,
} from '../controllers/postController.js';
import { toggleLike } from '../controllers/likeController.js';
import { validateCreatePost } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/feed', authenticateToken, getFeedPosts);

// public routes
router.get('/', getPosts);
router.get('/:id', authenticateToken, getPostById);
router.get('/user/:id', getUserPosts);

// protected routes
router.post('/', authenticateToken, validateCreatePost, createPost);
router.post('/:id/like', authenticateToken, toggleLike);
router.delete('/:id', authenticateToken, deletePost);

export default router;
