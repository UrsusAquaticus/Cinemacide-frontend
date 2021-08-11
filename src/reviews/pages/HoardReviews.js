import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewDialog from "../components/ReviewDialog";
import ReviewList from "../components/ReviewList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const HoardReviews = () => {
	const hoardId = useParams().hoardId;
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/hoard/${hoardId}`
				);
				setLoadedReviews(responseData.reviews);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Reviews: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchReviews();
	}, [sendRequest, hoardId]);

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

export default HoardReviews;
