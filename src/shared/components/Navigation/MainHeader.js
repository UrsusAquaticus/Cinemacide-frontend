import React from "react";
import { Link } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	logo: {
		height: "2rem",
		width: "auto",
	},
	logoContainer: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
	},
}));

export default function MainHeader() {
	const classes = useStyles();

	return (
		<header>
			<div className={classes.grow}>
				<AppBar elevation={5} position="fixed">
					<Toolbar>
						<NavMenu />
						<Link className={classes.logoContainer} to="/">
							<img
								className={classes.logo}
								src="/CinemaCideLogoWhiteSmall.png"
								alt="CINEMACIDE"
							/>
						</Link>
						<SearchBar />
						<UserMenu />
					</Toolbar>
				</AppBar>
			</div>
		</header>
	);
}
