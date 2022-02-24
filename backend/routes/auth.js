const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logout,
	forgotPassword,
	resetPassword,
	getUserProfile,
	updateUserPassword,
	updateUserProfile,
	allUsers,
	getUserDetails,
	updateUser,
	deleteUser,
} = require("../controller/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Register user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);
router.route("/update-password").put(isAuthenticatedUser, updateUserPassword);

router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
	.route("/admin/user/:id")
	.get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);

router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
