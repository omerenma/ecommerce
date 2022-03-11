const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, "Please enter product name"],
		trim: true,
		maxlength: [100, "Product name cannot exceed 100 character"],
	},
	price: {
		type: Number,
		required: [true, "Please enter product price"],
		maxlength: [15, "Product proce cannot exceed 5 character"],
		default: 0.0,
	},
	description: {
		type: String,
		required: [true, "Please enter product description"],
	},
	ratings: {
		type: Number,
		default: 0,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, "Please select a category for this product"],
		enum: {
			values: [
				"Electronics",
				"Computers",
				"Clothes",
				"Shoes",
				"Kitchen",
				"Food",
				"Beauty/Health",
				"Sports",
				"Home",
			],
			message: "Please select correct category for products",
		},
	},
	seller: {
		type: String,
		required: [true, "Please enter product seller "],
	},
	stock: {
		type: Number,
		required: [true, "Please enter product stock"],
		maxlength: [5, "Product name cannot  exceed 5 character"],
		default: 0,
	},
	numOfReview: {
		type: Number,
		default: 0,
	},
	reviews: [
		
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Product", productSchema);
