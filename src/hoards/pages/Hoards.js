import React, { useState, useEffect } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import HoardList from "../components/HoardList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Hoards = () => {
	const [loadedHoards, setLoadedHoards] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchHoards = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/hoards/`
				);
				console.log(responseData.hoards);
				setLoadedHoards(responseData.hoards);
			} catch (err) {}
		};
		fetchHoards();
	}, [sendRequest]);

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
				<HoardList
					items={loadedHoards}
					onDeleteHoard={hoardDeletedHandler}
				/>
			)}
		</React.Fragment>
	);
};

export default Hoards;
