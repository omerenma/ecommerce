import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import { loading, success, error } from "./userSlice";
import axios from "axios";

export const getJSONData = async (dispatch) => {
	dispatch(loading());
	console.log(loading, "loading");
	try {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/posts/1"
		);
		dispatch(success(response.data));
	} catch (err) {
		dispatch(error(err));
	}
};

export const postRequest = async (data, dispatch) => {};
