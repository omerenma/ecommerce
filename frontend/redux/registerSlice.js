import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerAction = createAsyncThunk(
	"register/user",
	async (data) => {
		const res = await axios.post(
			"http://localhost:5000/api/v1/auth/register",
			data
			// {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 	},
			// }
		);
		//{
		// method: "POST",
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// },
		// 	body: JSON.stringify(data),
		// });
		return res.data;
	}
);

const registerSlice = createSlice({
	name: "register/user",
	initialState: {
		loading: false,
		success: false,
		user: {},
		error: false,
		errorData: {},
		isRegistered: false,
	},
	reducers: {},
	extraReducers: {
		[registerAction.pending]: (state) => {
			state.loading = true;
			state.isRegistered = false;
		},
		[registerAction.fulfilled]: (state, action) => {
			state.loading = false;
			state.success = true;
			state.isRegistered = true;
			state.user = action.payload;
		},
		[registerAction.rejected]: (state, action) => {
			state.loading = false;
			state.success = false;
			state.error = true;
			state.isRegistered = false;
			state.user = null;
			state.errorData = action.payload;
		},
	},
});

export default registerSlice.reducer;
