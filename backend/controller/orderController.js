const Order = require("../model/orders");
const Product = require("../model/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Create  new order => /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body;
	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user._id,
	});
	res.status(200).json({
		success: true,
		order,
	});
});

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (!order) {
		return next(new ErrorHandler("No order found with this ID", 404));
	}
	res.status(200).json({
		success: true,
		order,
	});
});

// Get logged in user order => /api/v1/order/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
	const order = await Order.find({ user: req.user.id });

	res.status(200).json({
		success: true,
		order,
	});
});

// Get all orders => /api/v1/order/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.find();
	let totalAmount = 0;

	orders.map((order) => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Update / Process order - ADMIN  => /api/v1/admin/order/:id
exports.updateOrders = catchAsyncError(async (req, res, next) => {
	const orders = await Order.findById(req.params.id);

	if (orders.orderStatus === "Delivered") {
		return next(new ErrorHandler("You have already delivered this order", 400));
	}
	orders.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.quantity);
	});

	orders.orderStatus = req.body.orderStatus;
	await orders.save();

	res.status(200).json({
		success: true,
	});
});

async function updateStock(id, quantity) {
	const product = await Product.findById(id);
	product.stock = product.stock - quantity;
	await product.save({validateBeforeSave:false});

}


// Delete order => / /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('No order found with this ID', 404))
    }
    await order.remove()
    res.status(200).json({
        success:true
    })
})