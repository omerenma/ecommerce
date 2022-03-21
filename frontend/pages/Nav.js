import React, { useState } from "react";
import { useRouter, withRouter } from "next/router";
import { Popover } from "@mui/material";
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
import Login from "./Login";

const Navs = (props) => {
	const [open, setOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const keyword = props.router.query.Home;

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Navbar className="navbar" expand="lg">
				<Container className="container">
					<a href="/">
						<Image src="../images/logo.png" />
					</a>

					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll" className="nav-collapse">
						<Search route={props} />

						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							<Nav.Link className="nav_link">
								<Button
									href="#action1"
									className="nav-link"
									// aria-describedby={id}
									type="button"
									onClick={handleOpen}
								>
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
			<Popover
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				open={open}
			>
				<Login handleClose={handleClose} />
			</Popover>
		</>
	);
};

export default withRouter(Navs);
