import pool from '../config/db.js';

export const likesPost = async (userId, postId) => {
	const result = await pool.query(
		`INSERT INTO
      likes (user_id, post_id)
      VALUES ($1, $2)
      RETURNING *`,
		[userId, postId]
	);

	return result.rows[0];
};
