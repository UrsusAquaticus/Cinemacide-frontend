import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";

import ReviewList from "../../reviews/components/ReviewList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const Movie = () => {
	const movieId = useParams().movieId;
	const [loadedMovie, setLoadedMovie] = useState();
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`
				);
				const responseArray = [];
				responseArray.push(responseData.movie);
				setLoadedMovie(responseArray);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Movie: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchMovie();
	}, [sendRequest, movieId]);

	useEffect(() => {
		if (loadedMovie) {
			const fetchReviews = async () => {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/reviews/movie/${movieId}`,
						undefined,
						undefined,
						undefined,
						true
					);
					setLoadedReviews(responseData.reviews);
				} catch (err) {
					enqueueSnackbar("Failed to Fetch Reviews: " + err.message, {
						variant: "error",
					});
				}
			};
			fetchReviews();
		}
	}, [sendRequest, movieId, loadedMovie]);

	const reviewDeletedHandler = (deletedReviewId) => {
		setLoadedReviews((prevReviews) =>
			prevReviews.filter((review) => review.id !== deletedReviewId)
		);
	};

	return <React.Fragment></React.Fragment>;
};

export default Movie;
