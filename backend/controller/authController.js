const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("..//middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}
	// Get reset sendToken

	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });
	// Create reset passowrd uri
	const resetUri = `${req.protocol}://${req.get(
		"host"
	)}/api/v1/password/reset/${resetToken}`;
	const message = `Your password reset token is as follow:\n\n${resetUri}\n\nif you have not requested this email, then ignore it.`;
	try {
		await sendEmail({
			email: user.email,
			subject: "Ecommerce Password Recovery",
			message,
		});
		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpired = undefined;

		await user.save({ validateBeforeSave: false });
		return next(new ErrorHandler(error.message, 500));
	}
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
