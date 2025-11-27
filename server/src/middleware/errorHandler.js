import { AppError } from "../utils/AppError.js";

export const errorHandler = (error, req, res, next) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Internal Server Error";

	console.error("Error", {
		message: error.message,
		statusCode,
		path: req.path,
		method: req.method,
		...(error.isOperational === false && { stack: error.stack }),
	});

   if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message= "Invalid Token"
   }

   if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message= "Token Expired"
   }

	const isDev = process.env.NODE_ENV !== "production";
	if (!error.isOperational && !isDev) {
		message = "Internal Server Error";
	}

	res.status(statusCode).json({
		success: false,
		message,
		...(isDev && { stack: error.stack }),
	});
};

export const notFoundHandler = (req, res, next) => {
	// ignore flavicon requests
	if (req.path === "/favicon.ico") {
		return res.status(204).end();
	}

	next(new AppError(`Route not found - ${req.originalUrl}`, 404));
};
