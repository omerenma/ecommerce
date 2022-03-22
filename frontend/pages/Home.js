import React, { useState, useEffect } from "react";
import { Grid, Typography, TablePagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paginate from "react-paginate";
import MetaData from "./MetaData";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import { getProducts } from "../redux/getProductsSlice";
import Products from "./Products";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination/dist/Pagination";
import { withRouter } from "next/router";

const theme = createTheme({
	MuiToolbar: {
		root: {
			background: "red",
		},
	},
});
const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPage, setRowsPerPage] = useState(null);
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, success, error, data, rowsPerPage, productCount, count } =
		useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProducts(currentPage));
		if (success) {
			alert.success("Success");
		}
		if (error) {
			alert.error(error);
		}
	}, [dispatch, success, error, currentPage, productCount]);

	// function setCurrentPageNo() {
	// 	setCurrentPage(currentPage + 1);
	// }

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, rowsPerPage));
		setCurrentPage(0);
	};

	// const handlePageClick = (event) => {
	// 	const newOffset = (event.selected * rowsPerPage) % data.length;
	// 	setCurrentPage(newOffset);
	// };

	if (loading === true) {
		return (
			<span
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position:'absolute',
					left:'50%',
					top:'50%'
				}}
			>
				<Loader type="Circles" height={30} width={30} color="orange" />
			</span>
		);
	}

	return (
		<>
			<MetaData title={"Buy Best Products Online"} />
			<Typography mt={3} style={{ textAlign: "center" }}>
				Latest products
			</Typography>
			<Grid
				container
				spacing={0.5}
				justifyContent="center"
				mt={1}
				p={3}
				style={{
					borderRadius: 5,
					background: "#fff",
					boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.10)",
				}}
			>
				{data.product === undefined
					? null
					: data.product.map((product) => (
							<Grid item key={product._id}>
								<Products product={product} key={product._id} />
							</Grid>
					  ))}
			</Grid>
			<div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
				<TablePagination
					//  onChange={handleChange}
					count={productCount}
					page={currentPage}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
			{/* <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
				<Pagination
					activePage={currentPage}
					itemsCountPerPage={rowsPerPage}
					totalItemsCount={productCount}
					onChange={setCurrentPageNo}
					nextPageText={"Next"}
					prevPageText={"Prev"}
					firstPageText={"First"}
					lastPageText={"Last"}
					itemClass="page-item"
					linkClass="page-link"
				/>
			</div> */}
			{/* <Paginate
				nextLabel="next >"
				onPageChange={setCurrentPageNo}
				pageRangeDisplayed={rowsPerPage}
				marginPagesDisplayed={2}
				pageCount={productCount}
				previousLabel="< previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/> */}
		</>
	);
};

export default withRouter(Home);
