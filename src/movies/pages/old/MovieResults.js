import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Card from "../../shared/components/UIElements/Card";

import MoviesList from "../components/MoviesList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Movies = () => {
	const searchTitle = useParams().title;
	const [loadedMovies, setLoadedMovies] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/movies/search/${searchTitle}`
				);

				setLoadedMovies(responseData.movie.Search); // array of movie
				console.log(responseData);
			} catch (err) {}
		};
		fetchMovies();
	}, [sendRequest, searchTitle]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			{!isLoading && loadedMovies && (
				<MoviesList items={loadedMovies} search={searchTitle} />
			)}
			{!isLoading && !loadedMovies && (
				<div className="movie-list center">
					<Card>
						<h2>No results for "{searchTitle}"</h2>
					</Card>
				</div>
			)}
		</React.Fragment>
	);
};

export default Movies;
