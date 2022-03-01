import React, { useState, useEffect } from "react";
import MetaData from "./MetaData";
import { Card, Button, Container } from "react-bootstrap";
import { IconName, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { dataSlice, request } from "../redux/count";
import { addUser } from "../redux/userSlice";
import { getJSONData } from "../redux/apiCalls";

function Home() {
	const dispatch = useDispatch();
	const { loading, data } = useSelector((state) => state.data);
	const datas = useSelector((state) => state.user.data);
	const [post, setPost] = useState("");

	// useEffect(() => {
	// 	dispatch(getJSONData())
	// }, []);

	if (loading) {
		return <p>Loading...</p>;
	}
	const handleUpdate = () => {
		dispatch(getJSONData);
	};

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
				<Card style={{ width: "18rem", height: "auto" }}>
					<Card.Img
						variant="top"
						src="../images/camera.jpg"
						className="product_image"
					/>
					<Card.Body>
						<Card.Title>Niko Camera</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<Card.Text>N500,000.00</Card.Text>
					</Card.Body>

					<Button className="btn" href="#" onClick={handleUpdate}>
						View Details
					</Button>
				</Card>
				<Card style={{ width: "18rem" }}>
					<Card.Img
						variant="top"
						src="../images/mac2.jpeg"
						className="product_image mac"
					/>
					<Card.Body>
						<Card.Title>Macbook pro</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<Card.Text>N500,000.00</Card.Text>
					</Card.Body>

					<Button className="btn" href="#">
						View Details
					</Button>
				</Card>
				<Card style={{ width: "18rem" }}>
					<Card.Img
						variant="top"
						src="../images/camera.jpg"
						className="product_image"
					/>
					<Card.Body>
						<Card.Title>Niko Camera</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<Card.Text>N500,000.00</Card.Text>
					</Card.Body>

					<Button className="btn" href="#">
						View Details
					</Button>
				</Card>

				<Card style={{ width: "18rem" }}>
					<Card.Img
						variant="top"
						src="../images/camera.jpg"
						className="product_image"
					/>
					<Card.Body>
						<Card.Title>Niko Camera</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<FaStar color="orange" />
						<Card.Text>N500,000.00</Card.Text>
					</Card.Body>
					<Button className="btn" href="#">
						View Details
					</Button>
				</Card>
			</div>
		</Container>
	);
}

export default Home;
