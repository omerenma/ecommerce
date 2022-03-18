import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const SearchProducts = createAsyncThunk(
	"search/product",
	async (keyword) => {
		const currentPage = 1;
		console.log(keyword, "word", currentPage, "page current");
		const res = await axios.get(
			`http://localhost:5000/api/v1/product?keyword=${keyword}&page=${currentPage}&limit=2`
		);
		return res.data;
	}
);

export const searchProductSlice = createSlice({
	name: "search",
	initialState: {
		loading: false,
		success: false,
		error: false,
		data: [],
		rowsPerPage: null,
	},
	reducers: {},
	extraReducers: {
		[SearchProducts.pending]: (state) => {
			state.loading = true;
		},
		[SearchProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.data = action.payload;
			state.rowsPerPage = action.payload.rowsPerPage;
		},
		[SearchProducts.rejected]: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
	},
});

// export const { getProducts } = userSlice.actions;
export default searchProductSlice.reducer;
