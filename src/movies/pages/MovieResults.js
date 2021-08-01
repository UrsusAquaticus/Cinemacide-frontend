import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import MovieDialog from "../components/MovieDialog";
import MovieList from "../components/MovieList";
import HoardSelectDialog from "../../shared/components/hoards/HoardSelectDialog";
import HoardCreateDialog from "../../shared/components/hoards/HoardCreateDialog";

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
				<HoardSelectDialog>
					<HoardCreateDialog>
						<MovieDialog>
							<MovieList loadedMovies={loadedMovies} />
						</MovieDialog>
					</HoardCreateDialog>
				</HoardSelectDialog>
			)}
		</React.Fragment>
	);
};

export default Movies;
