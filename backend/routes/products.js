const express = require("express");
const router = express.Router();

const {
	getProducts,
	getProductsById,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/productControllers");

router.route("/admin/product").get(getProducts);
router.route("/admin/product/:id").get(getProductsById);
router.route("/admin/product").post(newProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);

module.exports = router;
