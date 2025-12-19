import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { validateUpdateProfile } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// protected
router.get('/:id', authenticateToken, getProfile);
router.put('/:id', authenticateToken, validateUpdateProfile, updateProfile);

export default router;
