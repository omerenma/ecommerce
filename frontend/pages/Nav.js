import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { Popover, Avatar } from "@mui/material";
import {
	Navbar,
	Nav,
	Form,
	FormControl,
	Button,
	Image,
	Container,
	Dropdown,
} from "react-bootstrap";
import { ShoppingCart } from "@mui/icons-material";
import Search from "./Search";
import Login from "./Login";
import Register from "./Register";
import { logoutAction } from "../redux/logout";
import axios from "axios";
import store from "../redux/store";

const Navs = (props) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { isAuthenticated, user } = useSelector((state) => state.login);
	const [open, setOpen] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);
	const [loginData, setLoginData] = useState("");

	const handleOpen = () => {
		setOpen(true);
	};
	const handleCloseRegister = () => {
		setOpenRegister(false);
	};

	const handleOpenRegister = () => {
		setOpenRegister(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleLogout = () => {
		//  dispatch(logoutAction());
		axios.get("http://localhost:5000/api/v1/auth/logout").then((res) => {
			if (res.statusText === "OK") {
				store.getState().login = {};
			}
		});
		router.push("/");
	};
	return (
		<>
			{isAuthenticated ? (
				<Navbar className="navbar" expand="lg">
					<Container className="container">
						<a href="/">
							<Image src="../images/logo.png" />
						</a>

						<Navbar.Toggle aria-controls="navbarScroll" />
						<Navbar.Collapse id="navbarScroll" className="nav-collapse">
							<Search route={props} />

							<Nav
								// className="me-auto my-2 my-lg-0"
								style={{
									display: "flex",
									justifyContent: "space-around",
									gap: 20,
								}}
								navbarScroll
							>
								{" "}
								<span
									style={{
										display: "flex",
										gap: 7,
										justifyContent: "space-around",
										color: "#fff",
									}}
								>
									<Avatar />
									<span style={{ position: "relative", top: 5 }}>
										{user && user.user.name}
									</span>
								</span>
								<Link href="/cart">
									<a>
										<ShoppingCart
											style={{ color: "#fff", position: "relative", top: 5 }}
										/>
									</a>
								</Link>
								<Button
									// className="nav-link"
									type="button"
									onClick={handleLogout}
								>
									Logout
								</Button>
								{user && user.user.role !== "admin" ? (
									<Link href="/orders/me">
										<a
											style={{
												position: "relative",
												top: 10,
												color: "orange",
												textDecoration: "none",
											}}
										>
											Order
										</a>
									</Link>
								) : (
									<Link href="/dashboard">
										<a
											style={{
												position: "relative",
												top: 10,
												color: "orange",
												textDecoration: "none",
											}}
										>
											Dashbaord
										</a>
									</Link>
								)}
								<Link href="/profile">
									<a
										style={{
											position: "relative",
											top: 10,
											color: "orange",
											textDecoration: "none",
										}}
									>
										Profile
									</a>
								</Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			) : (
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
										onClick={handleOpenRegister}
									>
										Register
									</Button>
									<Button
										href="#action1"
										className="nav-link"
										// aria-describedby={id}
										type="button"
										onClick={handleOpen}
									>
										Login
									</Button>
									<Link href="/cart">
										<a>
											<ShoppingCart
												style={{ color: "#fff", position: "relative", top: 5 }}
											/>
										</a>
									</Link>
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}

			<Popover
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "center",
					horizontal: "center",
				}}
				open={openRegister}
			>
				<Register handleClose={handleCloseRegister} />
			</Popover>
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
				<Login
					handleClose={handleClose}
					loginData={setLoginData}
					route={props}
				/>
			</Popover>
		</>
	);
};

export default withRouter(Navs);
