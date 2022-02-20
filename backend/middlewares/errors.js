const errorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Inernal Server Error";

	if (process.env.NODE_ENV === "DEVELOPMENT") {
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errMessage: err.message,
			stack: err.stack,
		});
	}
	if (process.env.NODE_ENV === "PRODUCTION") {
		res.status(err.statusCode).json({
			success: false,
			error: err.message || "Internal Server Error",
		});
	}
};
