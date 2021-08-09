import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Button } from "@material-ui/core";

import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Menu } from "@material-ui/core";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { AuthContext } from "../../context/auth-context";
import AuthDialog from "./AuthDialog";

const useStyles = makeStyles((theme) => ({
	menuButton: {
		height: "2rem",
		width: "auto",
	},
	avatarButton: {
		height: "2rem",
		width: "2rem",
	},
}));

const UserMenu = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();
	const [authOpen, setAuthOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const toggleAuthOpen = () => {
		setAuthOpen(!authOpen);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<AuthDialog authOpen={authOpen} toggleAuthOpen={toggleAuthOpen} />
			{!auth.isLoggedIn && (
				<Button
					className={classes.menuButton}
					color="secondary"
					variant="contained"
					onClick={(e) => {
						e.preventDefault();
						toggleAuthOpen();
					}}
				>
					Login
				</Button>
			)}
			{auth.isLoggedIn && (
				<React.Fragment>
					<IconButton onClick={handleClick}>
						<Avatar
							className={classes.avatarButton}
							alt={auth.name}
							src={auth.image}
						/>
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<ListItem>
							<ListItemIcon>
								<Avatar alt={auth.name} src={auth.image} />
							</ListItemIcon>
							<ListItemText primary={auth.name} />
						</ListItem>
						<Divider />
						<ListItem button onClick={handleClose}>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText primary={"My Profile"} />
						</ListItem>
						<ListItem
							button
							onClick={() => {
								handleClose();
								auth.logout();
							}}
						>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary={"Logout"} />
						</ListItem>
					</Menu>
				</React.Fragment>
			)}
		</React.Fragment>
	);
};

export default UserMenu;
