import * as notificationModel from '../models/notificationModel.js';
import { AppError } from '../utils/AppError.js';

export const getMyNotifications = async (userId, limit = 20) => {
	const notif = await notificationModel.getNotificationsByUserId(userId, limit);
	return notif;
};

export const markNotificationAsRead = async (notificationId, userId) => {
	const notif = await notificationModel.getByNotificationId(notificationId);

	if (!notif) {
		throw new AppError('Notification not found', 404);
	}

	if (notif.user_id !== userId) {
		throw new AppError('Not authorized to access this notification', 401);
	}

	const read = await notificationModel.markAsRead(notificationId);
	return read;
};

export const markAllNotifAsRead = async (userId) => {
	const readAll = await notificationModel.markAllAsRead(userId);
	return readAll;
};

export const getNotifUnreadCount = async (userId) => {
   const unreadCount = await notificationModel.getUnreadCount(userId);
   return unreadCount;
}