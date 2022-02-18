const express = require("express");
const app = express();
const getProducts = require("./routes/products");

app.use(express.json());

app.use("/api/v1/", getProducts);

module.exports = app;
