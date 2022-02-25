const mongoose = require("mongoose");
const Product = require("../model/products");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create new product => /api/vi/product/new

exports.newProduct = catchAsyncError(async (req, res, next) => {
	req.body.user = req.user.id;
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

// Create new review = > /api/v1/review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
	const { rating, comment, productId } = req.body;

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};
	const product = await Product.findById(productId);
	const isReviewed = product.reviews.find(
		(r) => r.user.toString() === req.user._id.toString()
	);
	if (isReviewed) {
		product.reviews.forEach((review) => {
			if (review.user.toString() === req.user._id.toString()) {
				review.comment = comment;
				review.rating = rating;
			}
		});
	} else {
		product.reviews.push(review);
		product.numOfReviews = product.reviews.length;
	}
	product.ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		product.reviews.length;

	await product.save({ validateBeforeSave: false });
	res.status(200).json({
		success: true,
	});
});

// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.productId);
	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

// Delete Product Reviews => /api/v1/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	const reviews = product.reviews.filter(
		(review) => review._id.toString() !== req.query.id.toString()
	);

		const numOfReviews = reviews.length
	const ratings =
		product.reviews.reduce((acc, item) => item.rating + acc, 0) /
		reviews.length;

		await Product.findByIdAndUpdate(req.query.productId, {
			reviews,
			ratings,
			numOfReviews
		}, {
			new:true,
			runValidators:true,
			userFindAndModify:false
		})
	res.status(200).json({
		success: true,
	});
});
