const express = require("express");
const app = express();
const { newProduct } = require("./controller/productControllers");
const errorMiddleware = require("./middlewares/errors");
const getProducts = require("./routes/products");

app.use(express.json());

app.use("/api/v1/", getProducts);
app.use("/api/v1/product/new", newProduct);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
