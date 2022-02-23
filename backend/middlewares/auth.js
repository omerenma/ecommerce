// Check if user is authenticated or not
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
	const { token } = req.cookies;
	if (!token) {
		return next(new ErrorHandler("Login first to access this resource", 401));
	}
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decoded.id);
	next();
});

// Handling users role

exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`Role (${req.user.role}) is not allowed to access this resource`,
					403
				)
			);
		}
		next();
	};
};
