import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProductDetails = createAsyncThunk(
	"get/productDetails",
	async (id) => {
		const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
		return res.data;
	}
);

export const getProductDetailsSlice = createSlice({
	name: "productDetails",
	initialState: {
		loading: false,
		success: false,
		error: false,
		data: [],
	},
	reducers: {},
	extraReducers: {
		[getProductDetails.pending]: (state) => {
			state.loading = true;
		},
		[getProductDetails.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.data = action.payload;
		},
		[getProductDetails.rejected]: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
	},
});

// export const { getProductDetails } = userSlice.actions;
export default getProductDetailsSlice.reducer;
