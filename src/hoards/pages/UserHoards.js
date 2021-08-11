import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import HoardList from "../components/HoardList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const UserHoards = () => {
	const userId = useParams().userId;
	const [loadedHoards, setLoadedHoards] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		const fetchHoards = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/hoards/user/${userId}`
				);
				setLoadedHoards(responseData.hoards);
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Hoards: " + err.message, {
					variant: "error",
				});
			}
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
			{loadedHoards && (
				<HoardList onDelete={hoardDeletedHandler} loadedHoards={loadedHoards} />
			)}
		</React.Fragment>
	);
};

export default UserHoards;
