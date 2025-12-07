import express from 'express';
import { getNotifications, getUnreadCount, markAllAsRead, markAsRead } from '../controllers/notificationController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// protected
router.get('/', authenticateToken, getNotifications);
router.get('/unread', authenticateToken, getUnreadCount);
router.put('/:id', authenticateToken, markAsRead);
router.put('/', authenticateToken, markAllAsRead);

export default router;
