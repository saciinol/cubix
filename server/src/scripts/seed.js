import pool from "../config/db.js";
import fs from "fs";
import path from "path";

async function seed() {
	console.log("Starting database seeding...");

	try {
		const seedPath = path.join(__dirname, "../database/seed.sql");
		const seedData = fs.readFileSync(seedPath, "utf8");

		await pool.query(seedData);

		console.log("Database seeded successfully!");
		console.log("Test users created: john_doe, jane_smith, bob_wilson");

		process.exit(0);
	} catch (error) {
		console.error("Seeding failed:", error.message);
		process.exit(1);
	}
}

seed();
