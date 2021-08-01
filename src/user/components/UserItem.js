import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

import { AuthContext } from "../../shared/context/auth-context";

const useStyles = makeStyles({
	root: {
		width: "15rem",
		margin: "0.5rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		transformOrigin: "center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.1, 1.1, 1)" },
	},
	image: {
		height: "15rem",
	},
});

const UserItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();

	return (
		<Card className={classes.root} title={props.name}>
			<CardActionArea
				onClick={() => {
					props.onUserOpen(props.id);
				}}
			>
				<CardContent>
					<Typography noWrap variant="h5" component="h1">
						{props.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default UserItem;
