const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		maxlength: [30, "Your name cannot exceed 30 characters"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		validate: [validator.isEmail, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		minlength: [6, "Password length cannot be less tha 6 characters"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			//required: true,
		},
		url: {
			type: String,
			//required: true,
		},
	},
	role: {
		type: String,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: {
		type: String,
		resetPasswordExpired: Date,
	},
});

// Encrypting password before saving the user
// NB: .pre means before saving do this
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// compare user password 
userSchema.methods.comparePassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password)
}

// Asign JWT token upon login
userSchema.methods.getJwtToken = function (){
	return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
		expiresIn:process.env.JWT_EXPIRES_TIME
	})
}



module.exports = mongoose.model("User", userSchema);
