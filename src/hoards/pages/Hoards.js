import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import HoardList from "../components/HoardList";

import { useHttpClient } from "../../shared/hooks/http-hook";

import { useSnackbar } from "notistack";

const Hoards = () => {
	const [loadedHoards, setLoadedHoards] = useState();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchHoards = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/hoards/`
				);
				setLoadedHoards(responseData.hoards); // array of hoards
			} catch (err) {
				enqueueSnackbar("Failed to Fetch Hoards: " + err.message, {
					variant: "error",
				});
			}
		};
		fetchHoards();
	}, [sendRequest]);

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

export default Hoards;
