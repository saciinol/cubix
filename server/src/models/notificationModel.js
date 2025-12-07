import pool from '../config/db.js';

export const createNotification = async (userId, actorId, type, postId = null, commentId = null) => {
	const result = await pool.query(
		`INSERT INTO
      notifications (user_id, actor_id, type, post_id, comment_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
		[userId, actorId, type, postId, commentId]
	);
	return result.rows[0];
};

export const getNotificationsByUserId = async (userId, limit = 20) => {
	const result = await pool.query(
		`SELECT
         n.*,
         u.username,
         pr.avatar_url,
         pr.display_name
      FROM notifications n
      JOIN users u ON n.actor_id = u.user_id
      JOIN profiles pr ON u.user_id = pr.user_id
      WHERE n.user_id = $1
      ORDER BY n.created_at DESC
      LIMIT $2`,
		[userId, limit]
	);
	return result.rows;
};

export const markAsRead = async (notificationId) => {
	const result = await pool.query(
		`UPDATE notifications
      SET is_read = true
      WHERE notification_id = $1
      RETURNING notification_id, is_read`,
		[notificationId]
	);
	return result.rows[0];
};

export const markAllAsRead = async (userId) => {
	const result = await pool.query(
		`UPDATE notifications
      SET is_read = true
      WHERE user_id = $1
      RETURNING notification_id, is_read`,
		[userId]
	);
	return result.rows;
};

export const getByNotificationId = async (notificationId) => {
	const result = await pool.query(
		`SELECT * FROM notifications
      WHERE notification_id = $1`,
		[notificationId]
	);
	return result.rows[0];
};

export const getUnreadCount = async (userId) => {
   const result = await pool.query(
      `SELECT COUNT(*) FROM notifications
      WHERE user_id = $1 AND is_read = false`,
      [userId]
   )
   return result.rows[0];
}