const mongoose = require("mongoose");
const user = require("./user");

const orderSchema = mongoose.Schema({
	shipingInfo: {
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	orderItems: [
		{
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			image: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			},
		},
	],
	paymentInfo: {
		id: {
			// This is the id of the payment gateway
			type: String,
		},
		status: {
			// Status of the transaction
			type: String,
		},
	},
	paidAt: {
		type: Date,
	},
	itemsPrice: {
		// This is the total price of the items you want to buy
		type: Number,
		required: true,
		default: 0.0,
	},
	taxPrice: {
		// This is the total price of the items you want to buy
		type: Number,
		required: true,
		default: 0.0,
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	orderStatus: {
		type: String,
		required: true,
		default: "Processing",
	},
	deliveredAt: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("order", orderSchema);
