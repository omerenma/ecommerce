import React from "react";
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";

export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			{/* <Home /> */}
			{children}
			<Footer />
		</div>
	);
}
