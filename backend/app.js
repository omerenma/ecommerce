const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { newProduct } = require("./controller/productControllers");
const errorMiddleware = require("./middlewares/errors");
const getProducts = require("./routes/products");
const cors = require("cors");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use(cookieParser());
app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up cloudinary configuration


app.use("/api/v1/", getProducts);
app.use("/api/v1/product/new", newProduct);
app.use("/api/v1/auth", auth);
app.use("/api/v1/order", order);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
