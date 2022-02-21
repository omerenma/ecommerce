const ErrorHandler = require("../utils/errorHandler");
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
        let error = {...err}
        // Wrong Mongoose Object ID Error

        error.message = err.message
        if(err.name === 'castError'){
            const message = `Resource not found. Invalid: ${err.path}`
            error = new Error(message, 400)
        }

        // Handling mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message, 400)
        }

		res.status(err.statusCode).json({
			success: false,
			error: err.message || "Internal Server Error",
		});
	}
};
