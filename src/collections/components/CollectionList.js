import React from "react";

import Card from "../../shared/components/UIElements/Card";
import CollectionItem from "./CollectionItem";
import "../../shared/components/UIElements/CardList.css";

const CollectionList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="card-list center">
				<Card>
					<h2>No collections found. Maybe create one?</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="card-list">
			<Card className="card-item__content vertical">
				{props.items.map((collection) => (
					<CollectionItem
						key={collection.id}
						id={collection.id}
						imdbID={collection.imdbID}
						Title={collection.title}
						Poster={collection.poster}
						Rating={collection.rating}
						Comment={collection.comment}
						Creator={collection.creator}
						Username={collection.username}
						Date={collection.lastUpdateDate}
						onDelete={props.onDeleteCollection}
						compact={props.compact}
					/>
				))}
			</Card>
		</ul>
	);
};

export default CollectionList;
