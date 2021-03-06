import React from "react";
import { Box } from "@material-ui/core";

import ReviewItem from "./ReviewItem";

const ReviewList = (props) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			{props.loadedReviews.map((review, index) => (
				<ReviewItem
					number={index}
					key={review.id}
					{...review}
					onMovieOpen={props.onMovieOpen}
					onHoardSelectOpen={props.onHoardSelectOpen}
					onDelete={props.onDelete}
				/>
			))}
		</Box>
	);
};

export default ReviewList;
