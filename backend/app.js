const express = require("express");
const app = express();
// const cors = require("cors");

const { newProduct } = require("./controller/productControllers");
const errorMiddleware = require("./middlewares/errors");
const getProducts = require("./routes/products");
const cors = require("cors");
const auth = require("./routes/auth");
const order = require("./routes/order");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/", getProducts);
app.use("/api/v1/product/new", newProduct);
app.use("/api/v1/auth", auth);
app.use("/api/v1/order", order);

// Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
