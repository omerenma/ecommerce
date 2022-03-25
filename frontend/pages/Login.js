import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import { Input, InputAdornment, IconButton, TextField } from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Error,
	ErrorOutlineRounded,
	PersonAdd,
	EmailSharp,
} from "@mui/icons-material";
import { loginAction } from "../redux/loginSlice";

export const Buttons = styled.button`
	min-width: 297px;
	border-radius: 2px;
	cursor: pointer;
	&:focus {
		outline: none;
	}
	&:hover {
		background: #fff;
		border: 1px solid orange;
		color: orange;
		transition: all 1s;
	}
	background: ${(props) =>
		props.submit
			? "orange"
			: props.delete
			? "red"
			: props.cancel
			? "transparent"
			: null};
	color: ${(props) =>
		props.submit
			? "white"
			: props.delete
			? "white"
			: props.cancel
			? "orange"
			: null};
	border: ${(props) =>
		props.submit
			? "none"
			: props.delete
			? "none"
			: props.cancel
			? "1px solid orange"
			: null};
`;

export const EmailField = styled(Input)``;

function Login(props) {
	console.log(props, "i want to route");
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, error, success } = useSelector((state) => state.login);
	const [values, setValues] = React.useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	// const [data, setData] = useState({
	// 	email: "",
	// 	password: "",
	// });

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			email,
			password,
		};

		dispatch(loginAction(data));
		if (!data) {
			return alert.error("All fields required");
		}
		if (error) {
			return alert.error("Invalid email or password");
		}
		if (success) {
			// TODO: Redirect to protected page
			props.route.router.push("/Home");
		}
	};

	return (
		<div style={{ padding: 10 }}>
			<span style={{ position: "relative", left: 7, top: 10 }}>Login</span>
			<button
				cancel
				onClick={() => props.handleClose()}
				style={{
					border: "none",
					backgroundColor: "#fff",
					color: "orange",
					position: "absolute",
					right: 10,
					top: 17,
				}}
			>
				x
			</button>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: 300,
					height: 250,
					justifyItems: "center",
					alignItems: "center",
					gap: 10,
					padding: "0 20px",
				}}
			>
				<Input
					style={{
						marginTop: 20,
						border: "1px solid #662D911F",
						padding: "0 5px",
						width: "292px",
						height: " 35px",
					}}
					placeholder="Email"
					disableUnderline={true}
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					endAdornment={<EmailSharp style={{ color: "orange" }} />}
				/>

				<Input
					style={{
						marginTop: 20,
						border: "1px solid #662D911F",
						padding: "0 5px",
						width: "292px",
						height: " 35px",
					}}
					disableUnderline={true}
					type={values.showPassword ? "text" : "password"}
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					endAdornment={
						<InputAdornment position="end" style={{ background: "#662D9133" }}>
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
								style={{ color: "orange" }}
							>
								{values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>

				<div
					style={{
						display: "flex",
						width: 300,
						justifyContent: "space-around",
						position: "relative",
						top: 15,
					}}
				>
					<div style={{ fontSize: "10px" }}>
						<Link href="/register">
							<a style={{ textDecoration: "none" }}>
								{" "}
								Don't have an account? Signup
							</a>
						</Link>
					</div>
					<div style={{ fontSize: "10px" }}>
						<Link href="/forgot-password">
							<a style={{ textDecoration: "none" }}> Forgot password?</a>
						</Link>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						width: 300,
						position: "relative",
						top: 30,
					}}
				>
					<Buttons submit onClick={handleSubmit}>
						{loading === true ? (
							<Loader type="Circles" height={20} width={20} color="orange" />
						) : (
							"Login"
						)}
					</Buttons>
				</div>
			</div>
		</div>
	);
}

export default Login;
