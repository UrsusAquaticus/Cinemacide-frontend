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
			{props.loadedReviews.map((review) => (
				<ReviewItem
					key={review.id}
					{...review}
					onReviewOpen={props.onReviewOpen}
					onHoardSelectOpen={props.onHoardSelectOpen}
					onDelete={props.onDelete}
				/>
			))}
		</Box>
	);
};

export default ReviewList;
