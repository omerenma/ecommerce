const app = require("./app");
const db = require("./config/database");

const dotenv = require("dotenv");

// Setup config
dotenv.config({ path: "./config/config.env" });

// connect to database
db();

app.listen(process.env.PORT, () => {
	console.log(
		`Express server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});
