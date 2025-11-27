import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import corsOptions from "./src/config/cors.js";
import authRoutes from "./src/routes/authRoutes.js";
import { errorHandler, notFoundHandler } from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
	res.json({
		message: "Cubix API is running!",
		version: "1.0.0",
	});
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
