import { configureStore } from "@reduxjs/toolkit";
import data from "./count";
import products from "./getProductsSlice";
import getProductDetailsSlice from "./getProductDetailsSlice";
import searchProductSlice from "./search";
import login from "./loginSlice";

export default configureStore({
	reducer: {
		data,
		products,
		getProductDetailsSlice,
		searchProductSlice,
		login,
	},
});
