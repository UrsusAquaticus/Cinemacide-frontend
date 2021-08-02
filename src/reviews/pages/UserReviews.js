import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import ReviewDialog from "../components/ReviewDialog";
import ReviewList from "../components/ReviewList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

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
				setLoadedReviews(responseData.reviews);
			} catch (err) {}
		};
		fetchReviews();
	}, [sendRequest, userId]);

	const reviewDeletedHandler = (deletedId) => {
		setLoadedReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== deletedId)
		);
	};

	return (
		<React.Fragment>
			{isLoading && !loadedReviews && <CircularProgress />}
			{loadedReviews && (
				<HoardSelectDialog>
					<HoardCreateDialog>
						<ReviewDialog>
							<ReviewList
								onDelete={reviewDeletedHandler}
								loadedReviews={loadedReviews}
							/>
						</ReviewDialog>
					</HoardCreateDialog>
				</HoardSelectDialog>
			)}
		</React.Fragment>
	);
};

export default UserReviews;
