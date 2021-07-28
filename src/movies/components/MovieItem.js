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

const capitalise = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const MovieItem = (props) => {
	const auth = useContext(AuthContext);
	const classes = useStyles();

	return (
		<Card className={classes.root} title={props.Title}>
			<CardActionArea
				onClick={() => {
					props.onMovieOpen(props.imdbID);
				}}
			>
				<CardContent>
					<Typography noWrap variant="h5" component="h1">
						{props.Title}
					</Typography>
					<Box flexWrap="nowrap" flexDirection="row">
						<Typography noWrap variant="subtitle1" component="h3">
							{capitalise(props.Type) + " | " + props.Year}
						</Typography>
					</Box>
				</CardContent>
				<CardMedia
					className={classes.image}
					component="img"
					alt={props.Title}
					src={
						props.Poster === "N/A" ? "/NoImagePlaceholder.png" : props.Poster
					}
				/>
			</CardActionArea>
			<CardActions>
				<Button
					onClick={() => {
						props.onHoardSelectOpen(props.imdbID, props.Title, props.Poster);
					}}
					variant="contained"
					color="secondary"
					fullWidth
				>
					Hoard
				</Button>
			</CardActions>
		</Card>
	);
};

export default MovieItem;
