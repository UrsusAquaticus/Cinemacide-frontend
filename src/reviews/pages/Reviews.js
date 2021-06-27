import React, { useState, useEffect } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import ReviewList from "../components/ReviewList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Reviews = () => {
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/`
				);
				console.log(responseData.reviews);
				setLoadedReviews(responseData.reviews);
			} catch (err) {}
		};
		fetchReviews();
	}, [sendRequest]);

	const reviewDeletedHandler = (deletedReviewId) => {
		setLoadedReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== deletedReviewId)
		);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedReviews && (
				<ReviewList
					items={loadedReviews}
					onDeleteReview={reviewDeletedHandler}
				/>
			)}
		</React.Fragment>
	);
};

export default Reviews;
