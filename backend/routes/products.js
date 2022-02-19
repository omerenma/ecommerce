const express = require("express");
const router = express.Router();

const {
	getProducts,
	getProductsById,
	newProduct,
} = require("../controller/productControllers");

router.route("/product").get(getProducts);
router.route("/product/:id").get(getProductsById);
router.route("/product/new").post(newProduct);

module.exports = router;
