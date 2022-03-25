import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const logoutAction = createAsyncThunk("logout", async () => {
	const res = await axios.get("http://localhost:5000/api/v1/auth/logout");
	return res.data;
});

const logoutSlice = createSlice({
	name: "logout",
	initialState: {
		loading: false,
		user: {},
		isAuthenticated: true,
	},
	reducers: {},
	extraReducers: {
		[logoutAction.pending]: (state) => {
			state.loading = true;
			state.isAuthenticated = true;
		},
		[logoutAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.isAuthenticated = false;
			state.user = null;
		},
		[logoutAction.rejected]: (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export default logoutSlice.reducer;
