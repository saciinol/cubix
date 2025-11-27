import express from 'express';
import { register, login, verify } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// private route
router.get('/verify', authenticateToken, verify);

export default router;
