const Product = require("../model/products");

// Create new product => /api/vi/product/new

exports.newProduct = async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		success: true,
		product,
	});
};

// Get all products from the database
exports.getProducts = async (req, res, next) => {
	const product = await Product.find();
	product
		? res.status(200).json({ success: true, product })
		: res.status(500).json({
				success: false,
				message: "Request could be processed, try again.",
		  });
};

// Get products by id
exports.getProductsById = async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	product
		? res.status(200).json({ success: true, product })
		: res.status(404).json({
				success: false,
				message: "Product not found.",
		  });
};

// Update product by id

exports.updateProduct = async (req, res, next) => {
	const { id } = req.params;
	let product = await Product.findById(id);

	!product
		? res.status(404).json({
				success: false,
				message: "Product not found",
		  })
		: (product = await Product.findByIdAndUpdate(id, req.body, {
				new: true,
				runValidators: true,
		  }));
	res.status(200).json({ success: true, product });
};
// Delete product by id
exports.deleteProduct = async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findByIdAndDelete(id);
	product
		? res
				.status(200)
				.json({ success: true, message: "Product successfuly deleted" })
		: "Please try again.";
};
