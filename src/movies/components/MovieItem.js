import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { AuthContext } from "../../shared/context/auth-context";

const useStyles = makeStyles({
	root: {
		position: "relative",
		height: "10rem",
		width: "25rem",
		margin: "0.5rem",

		display: "flex",
		flexWrap: "nowrap",

		transformOrigin: "center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.01, 1.01, 1)" },
	},
	area: {
		height: "inherit",
		display: "flex",
		flexWrap: "nowrap",
		justifyContent: "flex-start",
	},
	image: {
		objectFit: "cover",
		height: "auto",
		width: "10rem",
	},
	content: {
		flexGrow: 1,
	},
	topRight: {
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 2,
	},
	text: {
		whiteSpace: " nowrap",
		textOverflow: "ellipsis",
		overflow: "hidden",

		"@supports (-webkit-line-clamp: 2)": {
			overflow: " hidden",
			textOverflow: "ellipsis",
			whiteSpace: "initial",
			display: "-webkit-box",
			"-webkit-line-clamp": "2",
			"-webkit-box-orient": "vertical",
		},
	},
});

const capitalise = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const MovieItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();

	return (
		<Card className={classes.root} title={props.Title}>
			<Button
				className={classes.topRight}
				onClick={() => {
					props.onHoardSelectOpen(props.imdbID, props.Title, props.Poster);
				}}
				variant="contained"
				color="Secondary"
			>
				Hoard
			</Button>
			<CardActionArea
				className={classes.area}
				onClick={() => {
					props.onMovieOpen(props.imdbID);
				}}
			>
				<CardMedia
					className={classes.image}
					component="img"
					alt={props.Title}
					image={
						props.Poster === "N/A" ? "/NoImagePlaceholder.png" : props.Poster
					}
				/>
				<CardContent className={classes.content}>
					<Typography
						className={classes.text}
						noWrap
						variant="h5"
						component="h1"
					>
						{props.Title}
					</Typography>
					<Typography variant="body1" component="h2">
						{capitalise(props.Type)} | {props.Year}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default MovieItem;
