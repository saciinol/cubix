import pool from '../config/db.js';

export const getProfileByUserId = async (userId) => {
	const result = await pool.query(
		`SELECT
         p.*,
         u.username,
         u.email,
         u.created_at as joined_at,
         (SELECT COUNT(*) FROM posts WHERE user_id = u.user_id) as post_count,
         (SELECT COUNT (*) FROM follows WHERE following_id = u.user_id) as followers_count,
         (SELECT COUNT (*) FROM follows WHERE follower_id = u.user_id) as following_count
      FROM profiles p
      JOIN users u ON p.user_id = u.user_id
      WHERE p.user_id = $1`,
		[userId]
	);
	return result.rows[0];
};

export const updateProfile = async (userId, updates) => {
	// dynamic UPDATE query
	const fields = [];
	const values = [];
	let paramCount = 1;

	// only updates fields that are provided
	if (updates.display_name !== undefined) {
		fields.push(`display_name = $${paramCount}`);
		values.push(updates.display_name);
		paramCount++;
	}
	if (updates.bio !== undefined) {
		fields.push(`bio = $${paramCount}`);
		values.push(updates.bio);
		paramCount++;
	}
	if (updates.avatar_url !== undefined) {
		fields.push(`avatar_url = $${paramCount}`);
		values.push(updates.avatar_url);
		paramCount++;
	}
	if (updates.cover_url !== undefined) {
		fields.push(`cover_url = $${paramCount}`);
		values.push(updates.cover_url);
		paramCount++;
	}
	if (updates.location !== undefined) {
		fields.push(`location = $${paramCount}`);
		values.push(updates.location);
		paramCount++;
	}
	if (updates.website !== undefined) {
		fields.push(`website = $${paramCount}`);
		values.push(updates.website);
		paramCount++;
	}

	fields.push(`updated_at = CURRENT_TIMESTAMP`);
	values.push(userId);

	const query = `
      UPDATE profiles
      SET ${fields.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING *`;

	const result = await pool.query(query, values);
	return result.rows[0];
};
