import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const UpdateReview = () => {
	const auth = useContext(AuthContext);
	const reviewId = useParams().reviewId;
	const [loadedReview, setLoadedReview] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const history = useHistory();

	const [formState, inputHandler, setFormData] = useForm(
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
		const fetchReview = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`
				);
				setLoadedReview(responseData.review);
				setFormData(
					{
						rating: {
							value: responseData.rating,
							isValid: true,
						},
						comment: {
							value: responseData.comment,
							isValid: true,
						},
					},
					true
				);
			} catch (err) {}
		};
		fetchReview();
	}, [sendRequest, reviewId, setFormData]);

	const reviewUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`,
				"PATCH",
				JSON.stringify({
					rating: formState.inputs.rating.value,
					comment: formState.inputs.comment.value,
				}),
				{
					"Content-Type": "application/json",
					Authorization: "Bearer " + auth.token,
				}
			);
			history.push(`/${auth.userId}/reviews`);
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedReview && !error) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find review!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedReview && (
				<div className="card-list">
					<Card className="card-item__content vertical">
						<form className="review-form" onSubmit={reviewUpdateSubmitHandler}>
							<h2>{loadedReview.title}</h2>
							<Input
								id="rating"
								element="input"
								type="text"
								label="Rating"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter a valid rating."
								onInput={inputHandler}
								initialValue={loadedReview.rating}
								initialValid={true}
							/>
							<Input
								id="comment"
								element="textarea"
								label="Comment"
								validators={[VALIDATOR_MINLENGTH(5)]}
								errorText="Please enter a valid comment (min. 5 characters)."
								onInput={inputHandler}
								initialValue={loadedReview.comment}
								initialValid={true}
							/>
							<Button type="submit" disabled={!formState.isValid}>
								UPDATE REVIEW
							</Button>
						</form>
					</Card>
				</div>
			)}
		</React.Fragment>
	);
};

export default UpdateReview;
