const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
	newOrder,
	getSingleOrder,
	myOrders,
	allOrders,
	updateOrders,
    deleteOrder,
} = require("../controller/orderController");

router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/order/").get(isAuthenticatedUser, myOrders);
router
	.route("/admin/orders")
	.get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);
router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrders)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)
module.exports = router;
