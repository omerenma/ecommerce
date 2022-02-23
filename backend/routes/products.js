const express = require("express");
const router = express.Router();

const {
	getProducts,
	getProductsById,
	newProduct,
	updateProduct,
	deleteProduct,
} = require("../controller/productControllers");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/product").get(getProducts);
router.route("/product/:id").get(getProductsById);
router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router
	.route("/admin/product/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
