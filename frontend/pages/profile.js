import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import store from "../redux/store";
import { useAlert } from "react-alert";

const profile = (props) => {
	const router = useRouter();
	const [auth, setAuth] = useState(false);
	const [user, setUser] = useState(null);
	const alert = useAlert();
	useEffect(() => {
		const isAuth = store.getState().login.isAuthenticated;
		const user = store.getState().login.user;
		if (isAuth) {
			setAuth(isAuth);
			setUser(user);
		}
	}, [auth, user]);
	console.log(user, "users", auth);
	return (
		<div>
			{auth === false ? (
				<span
					style={{
						backgroundColor: "yellow",
						padding: 5,
						width:330,
						borderRadius: 5,
                        position:'absolute',
                        top:20,
                        left:50
					}}
				>
					Not authorized to view this resource. Please login
				</span>
			) : (
				//alert.error("Not authorized to view this resource")
				<>
					<Typography>My Profile</Typography>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							columnGap: 100,
						}}
					>
						<div style={{ display: "flex", flexDirection: "column" }}>
							{/* <Avatar src={user.user.avatar.url} /> */}
							<button
								style={{
									background: "orange",
									padding: 5,
									color: "#fff",
									borderRadius: 5,
									cursor: "pointer",
									width: "200px",
									border: "none",
								}}
							>
								Edit Profile
							</button>
						</div>
						<div>
							<div>
								<div>Full Name</div>
								<div> {user && user.user.name}</div>
							</div>
							<div>
								<div>Email</div>
								<div>{user && user.user.email}</div>
							</div>
							<div>
								<div>Date Joined</div>
								<div>
									{String(user && user.user.createdAt).substring(0, 10)}
								</div>
							</div>
							{user.user.role === "admin" && (
								<button
									style={{
										background: "red",
										padding: 5,
										color: "#fff",
										borderRadius: 5,
										cursor: "pointer",
										width: "200px",
										border: "none",
									}}
								>
									Change password
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default profile;
