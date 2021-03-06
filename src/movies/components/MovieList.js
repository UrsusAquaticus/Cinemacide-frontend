import React from "react";
import { Box } from "@material-ui/core";

import MovieItem from "./MovieItem";

const MovieList = (props) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			{props.loadedMovies.map((movie, index) => (
				<MovieItem
					number={index}
					key={movie.id}
					{...movie}
					onMovieOpen={props.onMovieOpen}
					onHoardSelectOpen={props.onHoardSelectOpen}
				/>
			))}
		</Box>
	);
};

export default MovieList;
