import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk(
	"get/product",
	async (keyword, currentPage = 1) => {
		const res = await axios.get(
			`http://localhost:5000/api/v1/product?page=${currentPage}&keyword=${keyword}`
		);
		return res.data;
	}
);

export const getProductSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		success: false,
		error: false,
		data: [],
		rowsPerPage: null,
	},
	reducers: {},
	extraReducers: {
		[getProducts.pending]: (state) => {
			state.loading = true;
		},
		[getProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.data = action.payload;
			state.rowsPerPage = action.payload.rowsPerPage;
		},
		[getProducts.rejected]: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
	},
});

// export const { getProducts } = userSlice.actions;
export default getProductSlice.reducer;
