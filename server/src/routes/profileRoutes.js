import express from 'express';
import { getProfile, getMyProfile, updateProfile } from '../controllers/profileController.js';
import { validateUpdateProfile } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// protected
router.get('/me', authenticateToken, getMyProfile);
router.put('/:id', authenticateToken, validateUpdateProfile, updateProfile);

// public
router.get('/:id', getProfile);

export default router;
