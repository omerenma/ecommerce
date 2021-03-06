import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
			{/* <Card.Img
				variant="top"
				src="../images/camera.jpg"
				style={{ width: "100px", height: 100 }}
			/> */}
			<Card.Body style={{ margin: "0 auto", padding: 0 }}>
				<Card.Link href={`/product`}>{product.name}</Card.Link>
				<p>{product.description}</p>

				<Ratings />
				<p>{product.numOfReview} Review(s)</p>
				<p>N {product.price}</p>
				<p> Stock: {product.stock}</p>
			</Card.Body>

			<Link className={style.btn} href={`/products/${product._id}`}>
				<a className={style.btn}>View More</a>
			</Link>
		</Card>
	);
};

export default Products;
