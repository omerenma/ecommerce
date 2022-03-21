import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginAction = createAsyncThunk("login/user", async (data) => {
	const res = await axios.post("http:5000/api/v1/auth/login", {
		Headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify(data),
	});
	return res.data;
});

const loginSlice = createSlice({
	name: "login",
	initialState: {
		loading: false,
		success: false,
		user: {},
		error: false,
		errorData: {},
		isAuthenticated: false,
	},
	reducers: {},
	extraReducers: {
		[loginAction.pending]: (state) => {
			state.loading = true;
			state.isAuthenticated = false;
		},
		[loginAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		[loginAction.rejected]: (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = true;
			state.isAuthenticated = false;
			state.user = null;
			state.errorData = action.payload;
		},
	},
});

export default loginSlice.reducer;
