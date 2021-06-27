import React from "react";

import "./StarRating.css";

//Maxes out at 5
const getStars = (number) => {
	const list = [];
	for (let i = 0; i < 5; i++) {
		let c = "";
		if (i < number) {
			c = "light"
		}
		list.push(<img className={"star "+c} src={"/Star.png"} alt={"star"} />);
	}
	return list;
};

const StarRating = (props) => {
	return <div className="star-container">{getStars(props.stars)}</div>;
};

export default StarRating;
