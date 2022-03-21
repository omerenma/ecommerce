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
	min-width: 292px;
	border-radius: 2px;
	cursor: pointer;
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
			? "red"
			: null};
	border: ${(props) =>
		props.submit
			? "none"
			: props.delete
			? "none"
			: props.cancel
			? "1px solid red"
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

export const TextFieldWithIcon = ({ type, color, value, onChange, placeholder }) => {
	console.log(onChange, "change");
	const [values, setValues] = React.useState({
		email: "",
		password: "",
		showPassword: false,
	});
	const handleChange = (onChange) => (event) => {
		setValues({ ...values, [onchange]: event.target.value });
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
		<>
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
					value={values.password}
                    placeholder="Password"
					endAdornment={
						<InputAdornment position="end" style={{ background: "#662D9133" }}>
							<IconButton
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
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
					type="text"
					value={values.email}
					onChange={handleChange}
					startAdornment={<EmailSharp style={{ color: color }} />}
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
		</>
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