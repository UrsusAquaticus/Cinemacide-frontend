import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "../../shared/components/UIElements/CardList.css";

const NewCollection = () => {
	const movieId = useParams().movieId;
	const auth = useContext(AuthContext);
	const [loadedMovie, setLoadedMovie] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			rating: {
				value: "",
				isValid: false,
			},
			comment: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	useEffect(() => {
		const fetchMovie = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`
				);

				setLoadedMovie(responseData.movie);
			} catch (err) {}
		};
		fetchMovie();
	}, [sendRequest, movieId]);

	const history = useHistory();

	const collectionSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/collections`,
				"POST",
				JSON.stringify({
					imdbID: movieId,
					title: loadedMovie.Title,
					poster: loadedMovie.Poster,
					rating: formState.inputs.rating.value,
					comment: formState.inputs.comment.value,
					creator: auth.userId,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			history.push("/");
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="card-list">
				<Card className="card-item__content vertical">
					<form onSubmit={collectionSubmitHandler}>
						{!isLoading && loadedMovie && <h2>{loadedMovie.Title}</h2>}
						{isLoading && <LoadingSpinner asOverlay />}
						{/* Replace with a better rating input */}
						<Input
							id="rating"
							element="input"
							type="text"
							label="Rating"
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a valid number."
							onInput={inputHandler}
						/>
						<Input
							id="comment"
							element="textarea"
							label="Comment"
							validators={[VALIDATOR_MINLENGTH(10)]}
							errorText="Please enter a valid description (at least 10 characters)."
							onInput={inputHandler}
						/>
						<Button type="submit" disabled={!formState.isValid}>
							ADD COLLECTION
						</Button>
					</form>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default NewCollection;
