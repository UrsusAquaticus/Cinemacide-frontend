import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, ListItem } from "@material-ui/core";

import { AuthContext } from "../../context/auth-context";
import AuthDialog from "./AuthDialog";

const useStyles = makeStyles((theme) => ({
	navLinks: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		maxHeight: "2rem",
		whiteSpace: "nowrap",
		width: "auto",
		"&.active": {
			background: theme.palette.secondary.main,
		},
	},
}));

const NavLinks = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();
	const [authOpen, setAuthOpen] = useState(false);

	const toggleAuthOpen = () => {
		setAuthOpen(!authOpen);
	};

	const LinkRef = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<NavLink exact {...props} />
		</div>
	));

	return (
		<React.Fragment>
			<AuthDialog authOpen={authOpen} toggleAuthOpen={toggleAuthOpen} />
			<ListItem
				button
				className={classes.navLinks}
				component={LinkRef}
				to="/users"
			>
				Users
			</ListItem>
			<ListItem button className={classes.navLinks} component={LinkRef} to="/">
				Hoards
			</ListItem>
			{auth.isLoggedIn && (
				<ListItem
					button
					className={classes.navLinks}
					component={LinkRef}
					to={`/${auth.userId}/hoards`}
				>
					My Hoards
				</ListItem>
			)}
			<ListItem
				button
				className={classes.navLinks}
				component={LinkRef}
				to="/reviews"
			>
				Reviews
			</ListItem>
			{auth.isLoggedIn && (
				<ListItem
					button
					className={classes.navLinks}
					component={LinkRef}
					to={`/${auth.userId}/reviews`}
				>
					My Reviews
				</ListItem>
			)}
			{!auth.isLoggedIn && (
				<ListItem
					button
					className={classes.navLinks}
					component={LinkRef}
					to="/auth"
					onClick={(e) => {
						e.preventDefault();
						toggleAuthOpen();
					}}
				>
					Login
				</ListItem>
			)}
			{auth.isLoggedIn && (
				<ListItem button className={classes.navLinks} onClick={auth.logout}>
					Logout
				</ListItem>
			)}
		</React.Fragment>
	);
};

export default NavLinks;
