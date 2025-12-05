import express from 'express';
import { toggleFollow } from '../controllers/followController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/:id/follow', authenticateToken, toggleFollow);

export default router;
