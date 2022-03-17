import React, { useEffect, useState } from "react";
import { Popover, Button, Typography } from "@mui/material";
import Loader from "react-loader-spinner";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";

import { Ratings } from "../Products";
import { getProductDetails } from "../../redux/getProductDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export const Instock = () => {
	return (
		<span
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: 20,
				position: "relative",
				bottom: 20,
				right:20
			}}
		>
			<span>In stock</span>
			<span
				style={{
					backgroundColor: "green",
					width: 10,
					height: 10,
					borderRadius: 50,
				}}
			></span>
		</span>
	);
};

export const Outstock = () => {
	return (
		<span
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				gap: 20,
				position: "relative",
				bottom: 20,
				right:20
			}}
		>
			<span>Out of stock</span>
			<span
				style={{
					backgroundColor: "red",
					width: 10,
					height: 10,
					borderRadius: 50,
				}}
			></span>
		</span>
	);
};
const ProductDetails = () => {
	const router = useRouter();
	const params = router.query.detail;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, error, success, data } = useSelector(
		(state) => state.getProductDetailsSlice
	);

	useEffect(() => {
		dispatch(getProductDetails(params));
		if (error) {
			alert.error("Something went wrong!");
		}
		if (success) {
			alert.success("success");
		}
	}, [useDispatch, error, success, alert, params]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	console.log(data, "data");
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	if (loading === true) {
		return <h1>Loading ...</h1>;
	}

	return (
		<div
			className="container container-fluid"
			style={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			{data.product === undefined ? null : (
				<div
					className="row f-flex justify-content-around"
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 100,
					}}
				>
					<div
						className="col-12 col-lg-5 img-fluid"
						id="product_image"
						style={{ alignSelf: "flex-start" }}
					>
						<Carousel pause="hover">
							{data.product.images &&
								data.product.images.map((image) => (
									<Carousel.Item key={image.public_id}>
										{/* <img src={image.url} alt={product.title} /> */}
										<img
											src="../images/camera.jpg"
											alt="sdf"
											height="300"
											width="300"
										/>
									</Carousel.Item>
								))}
						</Carousel>
					</div>

					<div className="col-12 col-lg-5 mt-5">
						<h3>{data.product.name}</h3>
						<p id="product_id">{data.product._id}</p>

						<hr />

						<div className="rating-outer">
							<div className="rating-inner"></div>
						</div>
						<span id="no_of_reviews">{data.product.numOfReview} Review(s)</span>

						<hr />

						<p id="product_price">N{data.product.price}</p>
						<div className="stockCounter d-inline">
							<span
								className="btn btn-danger minus"
								style={{ background: "red" }}
							>
								-
							</span>

							<input
								type="number"
								className="form-control count d-inline"
								value="1"
								readOnly
							/>

							<span
								className="btn btn-primary plus"
								style={{ background: "blue", color: "#fff" }}
							>
								+
							</span>
							<button
								type="button"
								id="cart_btn"
								className="btn btn-primary d-inline ml-4"
								style={{ width: 150, marginLeft: 10, color: "#fff" }}
							>
								Add to Cart
							</button>
						</div>

						<hr />

						<p>
							Status:{" "}
							<span id="stock_status">
								{data.product.stock > 0 ? <Instock /> : <Outstock />}
							</span>
						</p>

						<hr />

						<h4 className="mt-2">Description:</h4>
						<p>{data.product.description}</p>
						<hr />
						<p id="product_seller mb-3">
							Sold by: <strong>{data.product.seller}</strong>
						</p>

						<Popover
							style={{ marginTop: -200 }}
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "left",
								horizontal: "top",
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									padding: "0 50px",
								}}
							>
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<h5>Submit Review</h5>
									<button
										style={{ border: "none", backgroundColor: "transparent" }}
									>
										<span>&times;</span>
									</button>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										position: "relative",
										bottom: 20,
									}}
								>
									{/* <ul
										style={{
											listStyleType: "none",
											position: "relative",
											right: 40,
											// bottom: 30,
										}}
									>
										<li>
											<StarRating />
										</li>
									</ul> */}
									<Ratings />

									<textarea
										style={{ position: "relative", bottom: 10, width: 250 }}
									></textarea>

									<button
										style={{
											background: "#fa9c23",
											color: "#fff",
											border: "none",
											padding: 3,
											borderRadius: 3,
										}}
									>
										Submit
									</button>
								</div>
							</div>
						</Popover>
						<Button
							aria-describedby={id}
							variant="contained"
							onClick={handleClick}
							style={{ background: "#fa9c23" }}
						>
							Submit Your Review
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
