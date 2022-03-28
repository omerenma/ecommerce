const express = require("express");
const path = require("path");
const app = require("./app");
const db = require("./config/database");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

//dotenv.config({path:'./config/confog.env'})
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle Uncaught execptional error
process.on("uncaughtException", (err) => {
	console.log(err.message);
	console.log(`ERROR : ${err.message}`);
	console.log("Shutting down server due to uncaught execption");
	process.exit(1);
});

// Setup config
//dotenv.config({ path: "./config/config.env" });

app.use(express.static(path.join(__dirname, "public")));
// connect to database
db();

const server = app.listen(process.env.PORT, () => {
	console.log(
		`Express server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});

// Handle Unnandled Promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shutting down the server due to unhandled rejection");
	server.close(() => {
		process.exit(1);
	});
});
