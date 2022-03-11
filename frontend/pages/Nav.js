import React from "react";
import link from "next/link";
import {
	Navbar,
	Nav,
	NavDropdown,
	Container,
	Form,
	FormControl,
	Button,
	Image,
} from "react-bootstrap";
//import {InputGroup, InputGroupText, Input} from 'reactstrap'

const Navs = () => {
	return (
		<>
			<Navbar className="navbar" expand="lg">
				<Container className="container">
					<a href="/">
						<Image src="../images/logo.png" />
					</a>

					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll" className="nav-collapse">
						<Form className="form">
							<FormControl
								type="search"
								placeholder="Search products"
								className="search_field"
								aria-label="Search"
								id="search_field"
							/>
						</Form>
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

export default Navs;
