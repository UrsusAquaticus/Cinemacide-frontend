import React from "react";
import { CardMedia } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		width: "inherit",
		display: "flex",
		justifyContent: "center",
		flexWrap: "nowrap",
	},
	imageContainer: {
		flexShrink: "1",
		display: "flex",
		minWidth: 0,
		minHeight: 0,
		height: "10rem",
		transformOrigin: "bottom center",
		transition: "transform 0.15s ease-in-out",
		"&:hover": { transform: "scale3d(1.1, 1.1, 1)" },
		"&:last-child": {
			overflow: "hidden",
			maxWidth: "7rem",
			flexShrink: "0",
			transformOrigin: "bottom right",
		},
	},
	image: { height: "inherit", width: "auto" },
});

const getRandom = (arr, n) => {
	var result = new Array(n),
		len = arr.length,
		taken = new Array(len);
	if (n > len) n = len;
	while (n--) {
		var x = Math.floor(Math.random() * len);
		result[n] = arr[x in taken ? taken[x] : x];
		taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
};

const ImageStack = (props) => {
	const classes = useStyles();
	return (
		<CardMedia className={classes.root}>
			{props.loadedReviews &&
				getRandom(props.loadedReviews, 5).map((review, index) => (
					<div className={classes.imageContainer}>
						<img
							className={classes.image}
							key={index}
							alt={review.title}
							src={
								review.poster === "N/A"
									? "/NoImagePlaceholder.png"
									: review.poster
							}
						/>
					</div>
				))}
		</CardMedia>
	);
};

export default ImageStack;
