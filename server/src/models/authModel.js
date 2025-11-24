import pool from "../config/db.js";

export const createUser = async (username, email, hashedPassword) => {
	const result = await pool.query("INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *", [
		username,
		email,
		hashedPassword,
	]);
	return result.rows[0];
};

export const findByUsername = async (username) => {
	const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
   return result.rows[0];
};

export const findByEmail = async (email) => {
	const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
   return result.rows[0];
};
