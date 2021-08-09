import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Avatar } from "@material-ui/core";
import { ListItem, ListItemText } from "@material-ui/core";
import { ListItemIcon } from "@material-ui/core";

import { AuthContext } from "../../shared/context/auth-context";

const useStyles = makeStyles({
	root: {
		position: "relative",
		margin: "0.5rem",

		display: "flex",
		flexWrap: "nowrap",

		transformOrigin: "center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.01, 1.01, 1)" },
	},
	row: {
		display: "flex",
	},
});

const LinkRef = React.forwardRef((props, ref) => (
	<div ref={ref}>
		<NavLink exact {...props} />
	</div>
));

const UserItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();

	return (
		<Card className={classes.root} title={props.name}>
			<CardActionArea
				component={LinkRef}
				to={`/${props.userId}/hoards`}
				onClick={() => {
					props.onUserOpen(props.id);
				}}
			>
				<ListItem>
					<ListItemIcon>
						<Avatar alt={props.name} src={props.image} />
					</ListItemIcon>
					<ListItemText primary={props.name} />
				</ListItem>
			</CardActionArea>
		</Card>
	);
};

export default UserItem;
