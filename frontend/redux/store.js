import { configureStore } from "@reduxjs/toolkit";
import data from "./count";
import user from './userSlice'

export default configureStore({
	reducer: {
		data,
        user
	},
});
