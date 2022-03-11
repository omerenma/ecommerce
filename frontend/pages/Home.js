import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MetaData from "./MetaData";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { getProducts } from "../redux/getProductsSlice";
import Products from "./Products";
import { useAlert } from "react-alert";
function Home() {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, success, error, data } = useSelector(
		(state) => state.products
	);

	useEffect(() => {
		dispatch(getProducts());
		if (success) {
			alert.success("Success");
		}
		if (error) {
			alert.error(error);
		}
	}, [dispatch, success, error]);

	const handleUpdate = () => {
		// dispatch(getJSONData);
	};
	if (loading === true) {
		return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
	}
	// if (products.data.product === undefined) {
	// 	return "Loading"
	// }

	return (
		<div>
			<Typography mt={3} style={{ textAlign: "center" }}>
				Latest products
			</Typography>
			<Grid container spacing={1} justifyContent="center">
				<MetaData title={"Buy Best Products Online"} />

				{data.product === undefined
					? null
					: data.product.map((product) => (
							<Grid item key={product._id} mt={5}>
								<Products product={product} key={product._id} />
							</Grid>
					  ))}
			</Grid>
		</div>
	);
}

export default Home;
