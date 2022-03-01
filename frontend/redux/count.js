import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	success: false,
	data: [],
};

export const request = createAsyncThunk("post", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

	return response.data;
});

const dataSlice = createSlice({
	name: "post",
	initialState,

	reducers: {
		getPost: {
			reducer(state, action) {
				state.data.push(action.payload);
			},
		},
		// [request.pending]: (state) => {
		// 	state.loading = true;
		// },
		// [request.fulfilled]: (state) => {
		// 	state.loading = false;
		// 	state.data = payload;
		// },
		// [request.rejected]: (state) => {
		// 	state.loading = false;
		// },
	},
});
export const { getPost } = dataSlice.actions;
export default dataSlice.reducer;
