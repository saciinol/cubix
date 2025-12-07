import * as notificationService from '../services/notificationService.js';

export const getNotifications = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const limit = parseInt(req.query.limit) || 20;

		const notifications = await notificationService.getMyNotifications(userId, limit);
		res.json({ notifications });
	} catch (error) {
		next(error);
	}
};

export const markAsRead = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const notificationsId = parseInt(req.params.id);
		const read = await notificationService.markNotificationAsRead(notificationsId, userId);
		res.json({ read });
	} catch (error) {
		next(error);
	}
};

export const markAllAsRead = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const readAll = await notificationService.markAllNotifAsRead(userId);
		res.json({ readAll });
	} catch (error) {
		next(error);
	}
};

export const getUnreadCount = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const unreadCount = await notificationService.getNotifUnreadCount(userId);
		res.json({ unreadCount });
	} catch (error) {
		next(error);
	}
};
