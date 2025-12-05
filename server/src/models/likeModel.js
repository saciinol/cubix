import pool from '../config/db.js';

export const checkIfLiked = async (userId, postId) => {
	const result = await pool.query(
		`SELECT * FROM likes
      WHERE user_id = $1 AND post_id = $2`,
		[userId, postId]
	);

	return result.rows[0];
};

export const likePost = async (userId, postId) => {
	const result = await pool.query(
		`INSERT INTO
      likes (user_id, post_id)
      VALUES ($1, $2)
      RETURNING *`,
		[userId, postId]
	);

	return result.rows[0];
};

export const unlikePost = async (userId, postId) => {
	const result = await pool.query(
		`DELETE FROM likes
      WHERE user_id = $1 AND post_id = $2
      RETURNING *`,
		[userId, postId]
	);

	return result.rows[0];
};

export const updateLikeCount = async (postId, increment) => {
	const result = await pool.query(
		`UPDATE posts
      SET likes_count = likes_count + $1
      WHERE post_id = $2
      RETURNING likes_count`,
		[increment, postId]
	);

	return result.rows[0];
};
