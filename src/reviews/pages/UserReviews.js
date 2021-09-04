import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MovieDialog from "../../shared/components/MovieDialog";
import ReviewList from "../components/ReviewList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const UserReviews = () => {
	const userId = useParams().userId;
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}`
				);
				setLoadedReviews(responseData.reviews);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Review: " + err.message, {
					variant: "error",
				});
			}
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
			{loadedReviews && (
				<HoardSelectDialog>
					<HoardCreateDialog>
						<MovieDialog>
							<ReviewList
								onDelete={reviewDeletedHandler}
								loadedReviews={loadedReviews}
							/>
						</MovieDialog>
					</HoardCreateDialog>
				</HoardSelectDialog>
			)}
		</React.Fragment>
	);
};

export default UserReviews;
