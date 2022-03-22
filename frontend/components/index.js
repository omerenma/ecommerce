import React, { useState } from "react";
import styled from "styled-components";
import { Input, InputAdornment, IconButton, TextField } from "@mui/material";
//import { DatePicker, LocalizationProvider } from "@mui/lab";
import {
	Visibility,
	VisibilityOff,
	Error,
	ErrorOutlineRounded,
	PersonAdd,
	EmailSharp,
} from "@mui/icons-material";

export const Buttons = styled.button`
	min-width: 100px;
	border-radius: 2px;
	cursor: pointer;
	&:focus {
		outline: none;
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

export const TextFields = styled.input`
	width: 292px;
	height: 35px;
	border-radius: 2px;
	border: 1px solid #662d9133;
	&:hover {
		border: 1.5px solid #662d9133;
	}
	&:focus {
		outline: none;
	}
`;

export const ErrorField = styled(Input)``;

export const TextFieldWithIcon = ({
	type,
	color,
	value,
	onChange,
	placeholder,
}) => {
	const [values, setValues] = React.useState({
		email: "",
		password: "",
		showPassword: false,
	});

	

	const handleChange = (props) => (event) => {
		setValues({ ...values, [props]: event.target.value });
	};

	const handleSubmit = () => {
		console.log("submit");
	};
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<form>
			{type === "password" ? (
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
					password={password}
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
			) : type === "error" ? (
				<Input
					style={{
						marginTop: 30,
						border: "1px solid #D13232",
						borderRadius: "3px",
						padding: "0 5px",
						width: "292px",
						height: " 35px",
					}}
					disableUnderline={true}
					// type={values.showPassword ? "text" : "password"}
					// value={values.password}
					// onChange={handleChange("password")}
					endAdornment={
						<InputAdornment position="end" style={{ background: "#662D9133" }}>
							<IconButton
								// onClick={handleClickShowPassword}
								// onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								<ErrorOutlineRounded
									style={{ width: 20, height: 20, color: "#D13232" }}
								/>
							</IconButton>
						</InputAdornment>
					}
				/>
			) : type === "user" ? (
				<Input
					style={{
						marginTop: 20,
						border: "1px solid #662D911F",
						padding: "0 5px",
						width: "292px",
						height: " 35px",
					}}
					disableUnderline={true}
					type="text"
					// value={values.password}
					onChange={handleChange("password")}
					startAdornment={
						<InputAdornment
							position="start"
							style={{ background: "#662D9133" }}
						>
							<PersonAdd />
						</InputAdornment>
					}
				/>
			) : type === "email" ? (
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
					email={email}
					onChange={(e) => setEmail(e.target.value)}
					endAdornment={<EmailSharp style={{ color: color }} />}
				/>
			) : (
				<Input
					style={{
						marginTop: 20,
						border: "1px solid #662D911F",
						padding: "0 5px",
						width: "292px",
						height: " 35px",
					}}
					disableUnderline={true}
					// type={values.showPassword ? "text" : "password"}
					// value={values.password}
					// onChange={handleChange("password")}
					endAdornment={
						<InputAdornment
							position="start"
							style={{ background: "#662D9133" }}
						>
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="start"
							>
								{/* <PersonAdd /> */}
							</IconButton>
						</InputAdornment>
					}
				
				/>
			)}
		</form>
	);
};

export const DatePickerField = (props) => {
	const [value, setValue] = useState(null);
	return "Hello";
	// <LocalizationProvider>
	// 	<DatePicker
	// 		label="Basic example"
	// 		value={value}
	// 		onChange={(newValue) => {
	// 			setValue(newValue);
	// 		}}
	// 		renderInput={(params) => <TextField {...params} />}
	// 	/>
	// </LocalizationProvider>
};
