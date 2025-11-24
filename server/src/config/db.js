import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const isDev = process.env.NODE_ENV !== "production";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const pool = new Pool({
	host: PG_HOST,
	port: PG_PORT,
	database: PG_DATABASE,
	user: PG_USER,
	password: PG_PASSWORD,
	ssl: isDev ? false : { rejectUnauthorized: false },
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

if (isDev) {
	pool.on("connect", () => console.log("Connected to PostgreSQL"));
}

pool.on("error", (error) => {
	console.error("Unexpected database error:", error);
	process.exit(-1);
});

const gracefulShutdown = async () => {
	try {
		await pool.end();
		if (isDev) console.log("Database pool closed");
      process.exit(0);
	} catch (error) {
		console.error("Error during shutdown:", error);
		process.exit(1);
	}
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default pool;
