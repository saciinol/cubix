import pool from '../config/db.js';

export const createUser = async (username, email, hashedPassword) => {
   const result = await pool.query(
      'INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email, created_at',
      [username, email, hashedPassword]
   );
   return result.rows[0];
};

export const createProfile = async (userId) => {
   const result = await pool.query('INSERT INTO profiles (user_id) VALUES ($1) RETURNING *', [userId]);
   return result.rows[0];
};

export const findByUserId = async (userId) => {
	const result = await pool.query('SELECT user_id, username, email, created_at FROM users WHERE user_id = $1', [userId]);
	return result.rows[0];
};

export const findByUsername = async (username) => {
	const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
	return result.rows[0];
};

export const findByEmail = async (email) => {
	const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
	return result.rows[0];
};
