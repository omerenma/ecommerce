const app = require("./app");

const dotenv = require("dotenv");

// Setup config
dotenv.config({ path: "./config/config.env" });

app.listen(process.env.PORT, () => {
	console.log(
		`Express server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});
