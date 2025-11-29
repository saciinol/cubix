import express from 'express';
import { createPost, getPosts, getUserPosts, deletePost } from '../controllers/postController.js';
import { validateCreatePost } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// public routes
router.get('/', getPosts);
router.get('/user/:id', getUserPosts);

// protected routes
router.post('/', authenticateToken, validateCreatePost, createPost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
