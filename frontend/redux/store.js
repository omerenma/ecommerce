import { configureStore } from "@reduxjs/toolkit";
import data from "./count";
import products from "./getProductsSlice";
import getProductDetailsSlice from "./getProductDetailsSlice";

export default configureStore({
	reducer: {
		data,
		products,
		getProductDetailsSlice,
	},
});
