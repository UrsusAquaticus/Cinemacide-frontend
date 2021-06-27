import React from "react";

import Card from "../../shared/components/UIElements/Card";
import MovieItem from "./MovieItem";
import "../../shared/components/UIElements/CardList.css";

const MovieList = (props) => {
	return (
		<React.Fragment>
			<ul className="card-list">
				{props.search && (
					<li className="banner">
						<Card>
							<h2>Search results for "{props.search}"</h2>
						</Card>
					</li>
				)}
				{props.items.map((movie) => (
					<MovieItem
						search={props.search}
						key={movie.imdbID}
						Actors={movie.Actors}
						Awards={movie.Awards}
						BoxOffice={movie.BoxOffice}
						Country={movie.Country}
						DVD={movie.DVD}
						Director={movie.Director}
						Genre={movie.Genre}
						Language={movie.Language}
						Metascore={movie.Metascore}
						Plot={movie.Plot}
						Poster={movie.Poster}
						Production={movie.Production}
						Rated={movie.Rated}
						Ratings={movie.Ratings}
						Released={movie.Released}
						Runtime={movie.Runtime}
						Title={movie.Title}
						Type={movie.Type}
						Website={movie.Website}
						Writer={movie.Writer}
						Year={movie.Year}
						imdbID={movie.imdbID}
						imdbRating={movie.imdbRating}
						imdbVotes={movie.imdbVotes}
					/>
				))}
			</ul>
		</React.Fragment>
	);
};

export default MovieList;
