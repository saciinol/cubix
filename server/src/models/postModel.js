import pool from '../config/db.js';

// create new post
export const createPost = async (userId, content, imageUrl = null) => {
	const result = await pool.query(
		`INSERT INTO posts (user_id, content, image_url)
      VALUES ($1, $2, $3)
      RETURNING post_id, user_id, content, image_url, likes_count, comments_count, created_at`,
		[userId, content, imageUrl]
	);

	return result.rows[0];
};

// get post by ID
export const findByPostId = async (postId) => {
	const result = await pool.query(
		`SELECT p.*, u.username, pr.avatar_url, pr.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      JOIN profiles pr ON u.user_id = pr.user_id
      WHERE p.post_id = $1`,
		[postId]
	);

	return result.rows[0];
};

// get all posts
export const getAllPosts = async (limit = 20, offset = 0) => {
	const result = await pool.query(
		`SELECT p.*, u.username, pr.avatar_url, pr.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      JOIN profiles pr on u.user_id = pr.user_id
      ORDER BY p.created_at DESC
      LIMIT $1 OFFSET $2`,
		[limit, offset]
	);

	return result.rows;
};

// get posts from people you follow
export const getFeedPosts = async (userId, limit = 20, offset = 0) => {
	const result = await pool.query(
		`SELECT p.*, u.username, pr.avatar_url, pr.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      JOIN profiles pr ON u.user_id = pr.user_id
      WHERE p.user_id IN (
         SELECT following_id FROM follows WHERE follower_id = $1
      )
      ORDER BY p.created_at DESC
      LIMIT $2 OFFSET $3`,
		[userId, limit, offset]
	);

	return result.rows;
};

// get post by user ID
export const getPostsByUserId = async (userId, limit = 20) => {
	const result = await pool.query(
		`SELECT p.*, u.username, pr.avatar_url, pr.display_name
      FROM posts p
      JOIN users u ON p.user_id = u.user_id
      JOIN profiles pr on u.user_id = pr.user_id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC
      LIMIT $2`,
		[userId, limit]
	);

	return result.rows;
};

// delete post by ID
export const deletePost = async (postId) => {
	const result = await pool.query(`DELETE FROM posts WHERE post_id = $1 RETURNING *`, [postId]);

	return result.rows[0];
};
