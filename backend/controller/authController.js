const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("..//middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");

// Register a user => /api/vi/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
		// Harde coded avatar
		avatar: {
			public_id: "",
			url: "",
		},
	});

	sendToken(user, 200, res);
});

// Login a user => /api/vi/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;

	// ckeck if email and password is entered by user
	if (!email || !password) {
		return next(new ErrorHandler("Please enter email and password", 400));
	}
	// FInding user in database
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Invalid email or password", 401));
	}
	// check if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Incorrect password", 401));
	}
	sendToken(user, 200, res);
});

// Logout user
exports.logout = catchAsyncError(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		success: true,
		message: "Logged out",
	});
});
