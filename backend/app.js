const express = require("express");
const app = express();
const { newProduct } = require("./controller/productControllers");
const errorMiddleware = require("./middlewares/errors");
const getProducts = require("./routes/products");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/", getProducts);
app.use("/api/v1/product/new", newProduct);
app.use("/api/v1/auth", auth);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
