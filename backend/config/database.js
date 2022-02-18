const mongoose = require("mongoose");
const { connect } = require("../routes/products");

const connectDataBase = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useNewUriPraser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() => {
			console.log("Database connected succesfully");
		})
		.catch((err) => console.log(err.message));
};

module.exports = connectDataBase;
