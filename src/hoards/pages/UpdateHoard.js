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

const UpdateHoard = () => {
	const auth = useContext(AuthContext);
	const hoardId = useParams().hoardId;
	const [loadedHoard, setLoadedHoard] = useState();
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
		const fetchHoard = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/hoards/${hoardId}`
				);
				setLoadedHoard(responseData.hoard);
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
		fetchHoard();
	}, [sendRequest, hoardId, setFormData]);

	const hoardUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/hoards/${hoardId}`,
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
			history.push(`/${auth.userId}/hoards`);
		} catch (err) {}
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner />
			</div>
		);
	}

	if (!loadedHoard && !error) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find hoard!</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{!isLoading && loadedHoard && (
				<div className="card-list">
					<Card className="card-item__content vertical">
						<form className="hoard-form" onSubmit={hoardUpdateSubmitHandler}>
							<h2>{loadedHoard.title}</h2>
							<Input
								id="rating"
								element="input"
								type="text"
								label="Rating"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter a valid rating."
								onInput={inputHandler}
								initialValue={loadedHoard.rating}
								initialValid={true}
							/>
							<Input
								id="comment"
								element="textarea"
								label="Comment"
								validators={[VALIDATOR_MINLENGTH(5)]}
								errorText="Please enter a valid comment (min. 5 characters)."
								onInput={inputHandler}
								initialValue={loadedHoard.comment}
								initialValid={true}
							/>
							<Button type="submit" disabled={!formState.isValid}>
								UPDATE HOARD
							</Button>
						</form>
					</Card>
				</div>
			)}
		</React.Fragment>
	);
};

export default UpdateHoard;
