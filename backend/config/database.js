const mongoose = require("mongoose");

const connectDataBase = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useUnifiedTopology: true,
		})
		.then((con) => {
			console.log(`Database connected succesfully to ${con.connection.host}`);
		})
		.catch((err) => console.log(err.message));
};

module.exports = connectDataBase;
