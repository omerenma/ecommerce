import { configureStore } from "@reduxjs/toolkit";
import data from "./count";
import products from "./getProductsSlice";
import getProductDetailsSlice from "./getProductDetailsSlice";
import searchProductSlice from "./search";
import login from "./loginSlice";
import register from "./registerSlice";
import logout from "./logout";

export default configureStore({
	reducer: {
		data,
		products,
		getProductDetailsSlice,
		searchProductSlice,
		login,
		register,
		logout,
	},
});
