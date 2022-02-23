const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logout,
    forgotPassword
} = require("../controller/authController");

// Register user
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/forgot/password').post(forgotPassword)

router.route("/logout").get(logout);

module.exports = router;
