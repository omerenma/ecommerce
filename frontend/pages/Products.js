import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//import { Link } from "react-router-dom";
import { StarBorderOutlined } from "@mui/icons-material";
import { Card, Button, Container } from "react-bootstrap";
import { Rating, Typography, Box } from "@mui/material";
import style from "../styles/Home.module.css";

export const StarRating = () => {
	return (
		<div>
			{[...Array(5)].map((star) => {
				return <StarBorderOutlined style={{ color: "orange" }} />;
			})}
		</div>
	);
};

export const Ratings = () => {
	const [value, setValue] = useState(2);
	return (
		<Box
			sx={{
				"& > legend": { mt: 2 },
			}}
		>
			<Rating
				name="simple-controlled"
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			/>
		</Box>
	);
};

const Products = ({ product }) => {
	const handleClick = (e) => {
		e.preventDefault();
		router.push(`/products/${product._id}`);
	};
	return (
		<Card style={{ width: 200 }}>
			<Card.Img
				variant="top"
				src="../images/camera.jpg"
				style={{ width: "100px", height: 100 }}
			/>
			<Card.Body>
				<Card.Link href={`/product`}>{product.name}</Card.Link>
				<Card.Text>{product.description}</Card.Text>

				<Ratings />
				<Card.Text>{product.numOfReview} Review(s)</Card.Text>
				<Card.Text>N {product.price}</Card.Text>
				<Card.Text> Stock: {product.stock}</Card.Text>
			</Card.Body>

			<Link className={style.btn} href={`/products/${product._id}`}>
				<a className={style.btn}>View Details</a>
			</Link>
		</Card>
	);
};

export default Products;
