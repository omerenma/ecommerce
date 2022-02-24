const User = require("../model/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("..//middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
	)}/api/v1/auth/password/reset/${resetToken}`;
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

// Reset password = > /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
	// Hash URL token
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler(
				"Password reset token is invalid or has been expired",
				400
			)
		);
	}
	if (req.body.password !== req.body.confirmpassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}

	// Setup new password

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();
	sendToken(user, 200, res);
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// Update / Change password => /api/v1/password/update
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
	// Get currently logged In user and select the logged in user password
	const user = await User.findById(req.user.id).select("+password");
	// Check previous user password
	const isMatched = await user.comparePassword(req.body.oldPassword);
	if (!isMatched) {
		return next(new ErrorHandler("Old password is incorrect", 400));
	}
	user.password = req.body.password;
	await user.save();
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
