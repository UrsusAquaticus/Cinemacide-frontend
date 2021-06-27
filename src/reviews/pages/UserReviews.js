import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import ReviewList from "../components/ReviewList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserReviews = () => {
	const userId = useParams().userId;
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}`
				);
				console.log(responseData.reviews);
				setLoadedReviews(responseData.reviews);
			} catch (err) {}
		};
		fetchReviews();
	}, [sendRequest, userId]);

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

export default UserReviews;
