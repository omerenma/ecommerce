const express = require("express");
const router = express.Router();

const {
	getProducts,
	getProductsById,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/productControllers");

router.route("/product").get(getProducts);
router.route("/product/:id").get(getProductsById);
router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/new/:id").put(updateProduct);
router.route("/admin/product/new/:id").delete(deleteProduct);

module.exports = router;
