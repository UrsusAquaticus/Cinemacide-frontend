import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import MovieDialog from "../components/MovieDialog";
import MovieList from "../components/MovieList";
import HoardSelectDialog from "../components/HoardSelectDialog";
import HoardCreateDialog from "../components/HoardCreateDialog";

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
			{isLoading && !loadedMovies && <CircularProgress />}
			{loadedMovies && (
				<HoardCreateDialog>
					<HoardSelectDialog>
						<MovieDialog>
							<MovieList loadedMovies={loadedMovies} />
						</MovieDialog>
					</HoardSelectDialog>
				</HoardCreateDialog>
			)}
		</React.Fragment>
	);
};

export default Movies;
