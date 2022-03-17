import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { withRouter } from "next/router";
import { SearchProducts } from "../redux/search";

const Search = ({ route, params }) => {
	const [keyword, setKeyword] = useState("");
	const dispatch = useDispatch();

	const searchHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			dispatch(SearchProducts(keyword));
		} else {
			route.push("/");
		}
	};
	return (
		<Form className="form" onSubmit={searchHandler}>
			<FormControl
				type="search"
				placeholder="Search products"
				className="search_field"
				aria-label="Search"
				id="search_field"
				onChange={(e) => setKeyword(e.target.value)}
			/>
		</Form>
	);
};

export default withRouter(Search);
