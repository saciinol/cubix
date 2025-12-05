import pool from '../config/db.js';

// export const checkIfFollowed = async (userId, followerId) => {
// 	const result = await pool.query(
// 		`SELECT *
//       FROM follows
//       WHERE follower_id = $1 AND following_id = $2`,
// 		[followerId, userId]
// 	);
// 	return result.rows[0];
// };

export const checkIfFollowing = async (userId, followingId) => {
	const result = await pool.query(
		`SELECT *
      FROM follows
      WHERE follower_id = $1 AND following_id = $2`,
		[userId, followingId]
	);
	return result.rows[0];
};

export const followUser = async (userId, followingId) => {
	const result = await pool.query(
		`INSERT INTO
      follows (follower_id, following_id)
      VALUES ($1, $2)
      RETURNING *`,
		[userId, followingId]
	);
	return result.rows[0];
};

export const unfollowUser = async (userId, followingId) => {
	const result = await pool.query(
		`DELETE FROM follows
      WHERE follower_id = $1 AND following_id = $2
      RETURNING *`,
		[userId, followingId]
	);
	return result.rows[0];
};
