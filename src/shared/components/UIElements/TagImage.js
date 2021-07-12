import React from "react";

import "./TagImage.css";

const TagImage = (props) => {
	return (
		<div className="tag-horizontal">
			<h2>{props.tag}</h2>
			<img className={"tag-img " + props.imgClass} src={props.image} />
		</div>
	);
};

export default TagImage;
