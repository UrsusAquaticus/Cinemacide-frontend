import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

import MoviesList from "../components/MoviesList";
import ReviewList from "../../reviews/components/ReviewList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Movie = () => {
	const movieId = useParams().movieId;
	const [loadedMovie, setLoadedMovie] = useState();
	const [loadedReviews, setLoadedReviews] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`
				);
				const responseArray = [];
				responseArray.push(responseData.movie);
				setLoadedMovie(responseArray);
				console.log(responseArray);
			} catch (err) {}
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
				} catch (err) {}
			};
			fetchReviews();
		}
	}, [sendRequest, movieId, loadedMovie]);

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

			{!isLoading && !loadedMovie && (
				<div className="center">
					<Card>
						<h2>Something went wrong.</h2>
					</Card>
				</div>
			)}

			{!isLoading && loadedMovie && <MoviesList items={loadedMovie} />}

			{!isLoading && loadedReviews && (
				<ReviewList
					compact
					items={loadedReviews}
					onDeleteReview={reviewDeletedHandler}
				/>
			)}

			{!isLoading && loadedMovie && !loadedReviews && (
				<div className="center">
					<Card>
						<h2>Be the first to add a review!</h2>
					</Card>
				</div>
			)}
		</React.Fragment>
	);
};

export default Movie;
