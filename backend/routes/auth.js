const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logout,
	forgotPassword,
	resetPassword,
	getUserProfile,
	updateUserPassword
} = require("../controller/authController");
const { isAuthenticatedUser } = require("../middlewares/auth");

// Register user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/update-password").put(isAuthenticatedUser,updateUserPassword)


module.exports = router;
