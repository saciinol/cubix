import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
	console.log("Starting database seeding...");

	try {
		const seedPath = path.join(__dirname, "../database/seed.sql");
		const seedData = fs.readFileSync(seedPath, "utf8");

		await pool.query(seedData);

		console.log("Database seeded successfully!");
		console.log("Test users created!");

		process.exit(0);
	} catch (error) {
		console.error("Seeding failed:", error.message);
		process.exit(1);
	}
}

seed();
