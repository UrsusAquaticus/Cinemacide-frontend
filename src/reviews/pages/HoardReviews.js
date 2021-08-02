import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import ReviewDialog from "../components/ReviewDialog";
import ReviewList from "../components/ReviewList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

import { useHttpClient } from "../../shared/hooks/http-hook";

const HoardReviews = () => {
	const hoardId = useParams().hoardId;
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/hoard/${hoardId}`
				);
				setLoadedReviews(responseData.reviews);
			} catch (err) {}
		};
		fetchReviews();
	}, [sendRequest, hoardId]);

	return (
		<React.Fragment>
			{isLoading && !loadedReviews && <CircularProgress />}
			{loadedReviews && (
				<HoardCreateDialog>
					<HoardSelectDialog>
						<ReviewDialog>
							<ReviewList loadedReviews={loadedReviews} />
						</ReviewDialog>
					</HoardSelectDialog>
				</HoardCreateDialog>
			)}
		</React.Fragment>
	);
};

export default HoardReviews;
