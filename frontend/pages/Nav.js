import React from "react";
import { useRouter, withRouter } from "next/router";
import {
	Navbar,
	Nav,
	Form,
	FormControl,
	Button,
	Image,
	Container,
} from "react-bootstrap";
import Search from "./Search";

const Navs = (props) => {
	const keyword = props.router.query.Home;

	console.log(keyword, "keyword from nav");
	return (
		<>
			<Navbar className="navbar" expand="lg">
				<Container className="container">
					<a href="/">
						<Image src="../images/logo.png" />
					</a>

					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll" className="nav-collapse">
						<Search route={props}  />

						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<Nav.Link className="nav_link">
								<Button href="#action1" className="nav-link">
									Login
								</Button>
								<Button href="#action2" className="nav-link">
									Cart
								</Button>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default withRouter(Navs);
