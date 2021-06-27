import React from "react";

import Card from "../../shared/components/UIElements/Card";
import ReviewItem from "./ReviewItem";
import "../../shared/components/UIElements/CardList.css";

const ReviewList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="card-list center">
				<Card>
					<h2>No reviews found. Maybe create one?</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="card-list">
			<Card className="card-item__content vertical">
				{props.items.map((review) => (
					<ReviewItem
						key={review.id}
						id={review.id}
						imdbID={review.imdbID}
						Title={review.title}
						Poster={review.poster}
						Rating={review.rating}
						Comment={review.comment}
						Creator={review.creator}
						Username={review.username}
						Date={review.lastUpdateDate}
						onDelete={props.onDeleteReview}
						compact={props.compact}
					/>
				))}
			</Card>
		</ul>
	);
};

export default ReviewList;
