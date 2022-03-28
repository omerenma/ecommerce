import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import {
	Input,
	InputAdornment,
	IconButton,
	TextField,
	Avatar,
} from "@mui/material";
import {
	Visibility,
	VisibilityOff,
	Error,
	ErrorOutlineRounded,
	PersonAdd,
	EmailSharp,
	UploadFile,
} from "@mui/icons-material";
import { registerAction } from "../redux/registerSlice";

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

function Register(props) {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.register);
	const [values, setValues] = React.useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = user;
	const [avatar, setAvatar] = useState("");
	const [avatarPreview, setAvataPreview] = useState("/images/avatar.jpg");

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};
	const handleChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvataPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		const data = {
			name: name,
			email: email,
			password: password,
			avatar:avatar
		};

		dispatch(registerAction(data));
	};

	return (
		<div style={{ padding: 10 }}>
			<span style={{ position: "relative", left: 7, top: 10 }}>Register</span>
			<button
				onClick={() => props.handleClose()}
				style={{
					border: "none",
					backgroundColor: "#fff",
					color: "orange",
					position: "absolute",
					right: 20,
					top: 17,
				}}
			>
				x
			</button>
			<form encType="multipart/form-data">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						width: 320,
						height: 350,
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
						placeholder="Name"
						disableUnderline={true}
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
						endAdornment={<PersonAdd style={{ color: "orange" }} />}
					/>
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
						name="email"
						value={email}
						onChange={handleChange}
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
						name="password"
						placeholder="Password"
						onChange={handleChange}
						endAdornment={
							<InputAdornment
								position="end"
								style={{ background: "#662D9133" }}
							>
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
							justifyContent: "space-between",
							gap: 20,
							width: 300,
						}}
					>
						<figure style={{ position: "relative", top: 25 }}>
							<img
								src={avatarPreview}
								alt="Avatar Preview"
								style={{ width: 30, height: 30 }}
							/>
						</figure>

						<input
							style={{
								position: "relative",
								top: 20,
							}}
							type="file"
							name="avatar"
							accept="images/*"
							onChange={handleChange}
						/>
					</div>

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
							<Link href="/login">
								<a style={{ textDecoration: "none" }}>
									{" "}
									Already have an account? Login
								</a>
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
								"Register"
							)}
						</Buttons>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Register;
