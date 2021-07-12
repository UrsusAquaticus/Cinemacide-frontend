import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";

import HoardList from "../components/HoardList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserHoards = () => {
	const userId = useParams().userId;
	const [loadedHoards, setLoadedHoards] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchHoards = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/hoards/user/${userId}`
				);
				console.log(responseData.hoards);
				setLoadedHoards(responseData.hoards);
			} catch (err) {}
		};
		fetchHoards();
	}, [sendRequest, userId]);

	const hoardDeletedHandler = (deletedHoardId) => {
		setLoadedHoards((prevHoards) =>
			prevHoards.filter((hoard) => hoard.id !== deletedHoardId)
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
			{!isLoading && loadedHoards && (
				<div className="card-list center">
					<Card>
						<h2>Create a new hoard</h2>
					</Card>
				</div>
			)}
			{!isLoading && loadedHoards && (
				<HoardList items={loadedHoards} onDeleteHoard={hoardDeletedHandler} />
			)}
		</React.Fragment>
	);
};

export default UserHoards;
