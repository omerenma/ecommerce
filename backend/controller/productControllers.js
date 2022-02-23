const Product = require("../model/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create new product => /api/vi/product/new

exports.newProduct = catchAsyncError(async (req, res, next) => {
	req.body.user = req.user.id
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
});
// Get all products from the database
exports.getProducts = catchAsyncError(async (req, res, next) => {
	const resPerPage = 5;
	const productCount = await Product.countDocuments();
	const apiFeatures = new ApiFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resPerPage);
	const product = await apiFeatures.query;
	res.status(200).json({
		success: true,
		count: product.length,
		productCount,
		product,
	});
});

// Get products by id
exports.getProductsById = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;

	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	res.status(200).json({
		success: true,
		product,
	});
});

// Update product by id

exports.updateProduct = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	let product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler("Product not found", 404));
	}
	product = await Product.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({ success: true, product });
});
// Delete product by id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id);
	product
		? res
				.status(200)
				.json({ success: true, message: "Product successfuly deleted" })
		: "Please try again. ";
});
