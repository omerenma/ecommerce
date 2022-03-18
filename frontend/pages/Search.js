import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import { withRouter } from "next/router";
import { SearchProducts } from "../redux/search";
import { getProducts } from "../redux/getProductsSlice";

const Search = ({ route, params }) => {
	const [keyword, setKeyword] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useDispatch();

	const { loading, success, error, data, rowsPerPage, productCount, count } =
		useSelector((state) => state.products);

	const searchHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			dispatch(getProducts(keyword, currentPage));
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
