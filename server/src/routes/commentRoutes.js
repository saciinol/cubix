import express from 'express';
import { getComments, createComment, deleteComment } from '../controllers/commentController.js';
import { validateCreateComment } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// public
router.get('/:id/comments', getComments);

// protected
router.post('/:id/comments', authenticateToken, validateCreateComment, createComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

export default router;
