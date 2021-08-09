import React, { useState, useEffect } from "react";
import { CardMedia } from "@material-ui/core";
import { Fade } from "@material-ui/core";
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

const ImageStack = (props) => {
	const classes = useStyles();
	const [randomReviews, setRandomReviews] = useState();
	const [count, setCount] = useState(1);

	const checkLoaded = (totalCount, maxCount) => {
		if (!props.isLoading) return;
		const length = totalCount < maxCount ? totalCount : maxCount;
		setCount(count + 1);
		if (count >= length) {
			props.onLoadComplete();
		}
	};

	useEffect(() => {
		const getRandom = () => {
			let number = props.number;
			let loadedReviews = props.loadedReviews;

			var result = new Array(number),
				len = loadedReviews.length,
				taken = new Array(len);
			if (len == 0) return;
			if (number > len) number = len;
			while (number--) {
				var x = Math.floor(Math.random() * len);
				result[number] = loadedReviews[x in taken ? taken[x] : x];
				taken[x] = --len in taken ? taken[len] : len;
			}
			setRandomReviews(result);
		};
		getRandom();
	}, []);

	return (
		<CardMedia
			className={classes.root}
			style={{
				visibility: props.isLoading ? "hidden" : "visible",
				position: props.isLoading ? "absolute" : "static",
			}}
		>
			<div />
			{randomReviews &&
				randomReviews.map((review, index) => (
					<div className={classes.imageContainer} key={review.id}>
						<Fade in={!props.isLoading}>
							<img
								className={classes.image}
								alt={review.title}
								src={
									review.poster === "N/A"
										? "/NoImagePlaceholder.png"
										: review.poster
								}
								onLoad={() => {
									checkLoaded(props.loadedReviews.length, props.number);
								}}
							/>
						</Fade>
					</div>
				))}
		</CardMedia>
	);
};

export default ImageStack;
