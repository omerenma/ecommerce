// import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

// import { loading, success, error } from "./userSlice";
// import axios from "axios";

// export const getJSONData = createAsyncThunk("get/getData", async () => {
// 	loading();
// 	try {
// 		const response = await axios.get("http://localhost:5000/api/v1/product");
// 		dispatch(success(response.data));
// 	} catch (error) {
// 		dispatch(error(error));
// 	}
// });

// // export const getJSONData = async (dispatch) => {
// // 	dispatch(loading());
// // 	console.log(loading, "loading");
// // 	try {
// // 		const response = await axios.get("http://localhost:5000/api/v1/product");
// // 		dispatch(success(response.data));
// // 	} catch (err) {
// // 		dispatch(error(err));
// // 	}
// // };

// export const postRequest = async (data, dispatch) => {};
