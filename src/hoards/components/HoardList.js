import React from "react";

import Card from "../../shared/components/UIElements/Card";
import HoardItem from "./HoardItem";
import "../../shared/components/UIElements/CardList.css";

const HoardList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className="card-list center">
				<Card>
					<h2>No hoards found. Maybe create one?</h2>
				</Card>
			</div>
		);
	}

	return (
		<ul className="card-list">
			<Card className="card-item__content vertical">
				{props.items.map((hoard) => (
					<HoardItem
						key={hoard.id}
						id={hoard.id}
						imdbID={hoard.imdbID}
						Title={hoard.title}
						Poster={hoard.poster}
						Rating={hoard.rating}
						Comment={hoard.comment}
						Creator={hoard.creator}
						Username={hoard.username}
						Date={hoard.lastUpdateDate}
						onDelete={props.onDeleteHoard}
						compact={props.compact}
					/>
				))}
			</Card>
		</ul>
	);
};

export default HoardList;
