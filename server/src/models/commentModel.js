import pool from '../config/db.js';

export const findByCommentId = async (commentId) => {
	const result = await pool.query(
      `SELECT
         c.*,
         u.username,
         pr.avatar_url,
         pr.display_name
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      JOIN profiles pr ON u.user_id = pr.user_id
      WHERE c.comment_id = $1`,
      [commentId]
   );
	return result.rows[0];
};

export const getCommentsByPostId = async (postId, limit = 20) => {
	const result = await pool.query(
		`SELECT
         c.*,
         u.username,
         pr.avatar_url,
         pr.display_name
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      JOIN profiles pr ON u.user_id = pr.user_id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
      LIMIT $2`,
		[postId, limit]
	);
	return result.rows;
};

export const createComment = async (postId, userId, content, parentCommentId = null) => {
	const result = await pool.query(
		`INSERT INTO
      comments (post_id, user_id, content, parent_comment_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
		[postId, userId, content, parentCommentId]
	);
	return result.rows[0];
};

// delete comment by ID
export const deleteComment = async (commentId) => {
	const result = await pool.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [commentId]);

	return result.rows[0];
};
