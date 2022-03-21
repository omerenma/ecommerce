import React, { useState } from "react";
import Link from "next/link";
import { TextFieldWithIcon, Buttons } from "../components/index";
import { Typography } from "@mui/material";

function Login({ onChange, handleClose }) {
	return (
		<>
			<span style={{ position: "relative", left: 7, top: 10 }}>Login</span>
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
				<TextFieldWithIcon
					type="email"
					color="orange"
					// value={email}
					onChange={(e) => e.target}
				/>
				<TextFieldWithIcon type="password" />
				<div style={{ position: "relative", left: 85, fontSize: "10px" }}>
					<Link href="/forgot-password">
						<a style={{ textDecoration: "none" }}> Forgot password?</a>
					</Link>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-around",
						width: 300,
						position: "relative",
					}}
				>
					<Buttons cancel onClick={() => handleClose()}>
						Cancel
					</Buttons>
					<Buttons submit>Submit</Buttons>
				</div>
				<div style={{ position: "relative", left: 55, fontSize: "10px" }}>
					<Link href="/register">
						<a style={{ textDecoration: "none" }}>
							{" "}
							Don't have an account? Signup
						</a>
					</Link>
				</div>
			</div>
		</>
	);
}

export default Login;
