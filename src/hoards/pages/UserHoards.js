import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";

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

	const hoardDeletedHandler = (deletedId) => {
		setLoadedHoards((prevHoards) =>
			prevHoards.filter((hoard) => hoard.id !== deletedId)
		);
	};

	return (
		<React.Fragment>
			{isLoading && !loadedHoards && <CircularProgress />}
			{loadedHoards && (
				<HoardList onDelete={hoardDeletedHandler} loadedHoards={loadedHoards} />
			)}
		</React.Fragment>
	);
};

export default UserHoards;
