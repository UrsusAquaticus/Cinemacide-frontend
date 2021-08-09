import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, ListItem } from "@material-ui/core";

import { Divider } from "@material-ui/core";
import { SwipeableDrawer } from "@material-ui/core";

import { IconButton } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListSubheader } from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import GroupIcon from "@material-ui/icons/Group";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import StarsIcon from "@material-ui/icons/Stars";

import { AuthContext } from "../../context/auth-context";

const useStyles = makeStyles((theme) => ({
	navLinks: {
		"&.active": {
			background: theme.palette.secondary.main,
		},
	},

	logo: {
		height: "2rem",
		width: "auto",
	},
}));

const NavMenu = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerOpen(!drawerOpen);
	};

	const LinkRef = React.forwardRef((props, ref) => (
		<div ref={ref}>
			<NavLink exact {...props} />
		</div>
	));

	return (
		<React.Fragment>
			<IconButton onClick={toggleDrawer}>
				<MenuIcon />
			</IconButton>
			<SwipeableDrawer
				anchor={"left"}
				open={drawerOpen}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<ListItem onClick={toggleDrawer}>
					<ListItemIcon component={IconButton}>
						<MenuIcon />
					</ListItemIcon>
					<img
						className={classes.logo}
						src="/CinemaCideLogoWhiteSmall.png"
						alt="CINEMACIDE"
					/>
				</ListItem>
				<Divider />
				<ListItem
					className={classes.navLinks}
					button
					component={LinkRef}
					to="/"
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary={"Home"} />
				</ListItem>
				<Divider />
				{auth.isLoggedIn && (
					<React.Fragment>
						<ListSubheader>Your Content</ListSubheader>
						<ListItem
							className={classes.navLinks}
							button
							component={LinkRef}
							to={`/${auth.userId}/hoards`}
						>
							<ListItemIcon>
								<VideoLibraryIcon />
							</ListItemIcon>
							<ListItemText primary={"Hoards"} />
						</ListItem>
						<ListItem
							className={classes.navLinks}
							button
							component={LinkRef}
							to={`/${auth.userId}/reviews`}
						>
							<ListItemIcon>
								<StarsIcon />
							</ListItemIcon>
							<ListItemText primary={"Reviews"} />
						</ListItem>
						<Divider />
					</React.Fragment>
				)}
				<ListSubheader>Explore</ListSubheader>
				<ListItem
					className={classes.navLinks}
					button
					component={LinkRef}
					to="/users"
				>
					<ListItemIcon>
						<GroupIcon />
					</ListItemIcon>
					<ListItemText primary={"Public Users"} />
				</ListItem>
				<ListItem
					className={classes.navLinks}
					button
					component={LinkRef}
					to="/hoards"
				>
					<ListItemIcon>
						<VideoLibraryIcon />
					</ListItemIcon>
					<ListItemText primary={"Public Hoards"} />
				</ListItem>
				<ListItem
					className={classes.navLinks}
					button
					component={LinkRef}
					to="/reviews"
				>
					<ListItemIcon>
						<StarsIcon />
					</ListItemIcon>
					<ListItemText primary={"Public Reviews"} />
				</ListItem>
				<Divider />
			</SwipeableDrawer>
		</React.Fragment>
	);
};

export default NavMenu;
