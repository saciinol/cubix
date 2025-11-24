import pool from "../config/db.js";
import fs from "fs";
import path from "path";

async function migrate() {
	console.log("Starting database migration...");

	try {
		const schemaPath = path.join(__dirname, "../database/schema.sql");
		const schema = fs.readFileSync(schemaPath, "utf8");

		await pool.query(schema);

		console.log("Database migrated successfully!");
		console.log("Tables created: users, profiles, posts, comments, likes, follows");

		process.exit(0);
	} catch (error) {
      console.error('Migration failed:', error.message);
    process.exit(1);
   }
}

migrate();