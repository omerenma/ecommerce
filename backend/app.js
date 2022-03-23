const express = require("express");
const app = express();
// const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

const { newProduct } = require("./controller/productControllers");
const errorMiddleware = require("./middlewares/errors");
const getProducts = require("./routes/products");
const cors = require("cors");
const auth = require("./routes/auth");
const order = require("./routes/order");
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SCRETE,
});

app.use(cookieParser());
app.use(cors());
app.use("/api/v1/", getProducts);
app.use("/api/v1/product/new", newProduct);
app.use("/api/v1/auth", auth);
app.use("/api/v1/order", order);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
