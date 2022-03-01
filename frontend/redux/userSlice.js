import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		success: false,
		error: false,
		data: [],
	},
	reducers: {
		loading: (state) => {
			state.loading = true;
		},
		success: (state, action) => {
			state.data = action.payload;
		},
		error: (state) => {
			(state.loading = false), (state.error = true);
		},
	},
});

export const { loading, success, error } = userSlice.actions;
export default userSlice.reducer;
