import React, { useState, useEffect } from "react";
import MetaData from "./MetaData";
import { Card, Button, Container } from "react-bootstrap";
import { IconName, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { dataSlice, request } from "../redux/count";
import { getProducts } from "../redux/getProductsSlice";

function Home() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProducts());
	}, []);

	const handleUpdate = () => {
		// dispatch(getJSONData);
	};
	if (products.data.product === undefined) {
		return <p style={{ textAlign: "center" }}>Loading.......</p>;
	}

	return (
		<Container fluid>
			<h1 style={{ marginLeft: 23 }}>Latest products</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					columnGap: "10px",
					paddingTop: 10,
				}}
			>
				<MetaData title={"Buy Best Products Online"} />

				{products.data.product.map((product, id) => (
					<Card style={{ width: "18rem", height: "auto" }}>
						<Card.Img
							variant="top"
							src="../images/camera.jpg"
							className="product_image"
						/>
						<Card.Body>
							<Card.Title>{product.name}</Card.Title>
							<Card.Text>{product.description}</Card.Text>
							<FaStar color="orange">{product.rating}</FaStar>
							<FaStar color="orange">{product.rating}</FaStar>
							<FaStar color="orange">{product.rating}</FaStar>
							<FaStar color="orange">{product.rating}</FaStar>
							<FaStar color="orange">{product.rating}</FaStar>

							<Card.Text>{product.price}</Card.Text>
							<Card.Text> Stock: {product.stock}</Card.Text>
						</Card.Body>

						<Button className="btn" href="#" onClick={handleUpdate}>
							View Details
						</Button>
					</Card>
				))}
			</div>
		</Container>
	);
}

export default Home;
