import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getProducts = createAsyncThunk("get/product", async () => {
	const res = await axios.get("http://localhost:5000/api/v1/product");
	return res.data;
});

export const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		success: false,
		error: false,
		data: [],
	},
	reducers: {},
	extraReducers: {
		[getProducts.pending]: (state) => {
			state.loading = true;
			state.error = false;
		},
		[getProducts.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.data = action.payload;
		},
		[getProducts.rejected]: (state) => {
			state.loading = false;
			state.success = false;
			state.error = true;
		},
	},
});

// export const { getProducts } = userSlice.actions;
export default userSlice.reducer;
