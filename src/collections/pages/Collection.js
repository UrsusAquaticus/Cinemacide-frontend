import React, { useState, useEffect } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import CollectionList from "../components/CollectionList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Collections = () => {
	const [loadedCollections, setLoadedCollections] = useState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	useEffect(() => {
		const fetchCollections = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/collections/`
				);
				console.log(responseData.collections);
				setLoadedCollections(responseData.collections);
			} catch (err) {}
		};
		fetchCollections();
	}, [sendRequest]);

	const collectionDeletedHandler = (deletedCollectionId) => {
		setLoadedCollections((prevCollections) =>
			prevCollections.filter((collection) => collection.id !== deletedCollectionId)
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
			{!isLoading && loadedCollections && (
				<CollectionList
					items={loadedCollections}
					onDeleteCollection={collectionDeletedHandler}
				/>
			)}
		</React.Fragment>
	);
};

export default Collections;
