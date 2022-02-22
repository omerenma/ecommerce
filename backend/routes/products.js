const express = require("express");
const router = express.Router();

const {
	getProducts,
	getProductsById,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/productControllers");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/admin/product").get(isAuthenticatedUser, getProducts);
router.route("/admin/product/:id").get(isAuthenticatedUser, getProductsById);
router.route("/admin/product").post(newProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);

module.exports = router;
