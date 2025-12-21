import express from 'express';
import { isFollowing, toggleFollow } from '../controllers/followController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', authenticateToken, isFollowing);
router.post('/:id/follow', authenticateToken, toggleFollow);

export default router;
