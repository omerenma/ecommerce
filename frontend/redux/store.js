import { configureStore } from "@reduxjs/toolkit";
import data from "./count";
import products from "./getProductsSlice";

export default configureStore({
	reducer: {
		data,
		products,
	},
});
