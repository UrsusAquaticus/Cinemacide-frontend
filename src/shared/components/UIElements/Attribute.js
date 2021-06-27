import React from "react";
import { Link } from "react-router-dom";

import "./Attribute.css";

const startWithCapital = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const Attribute = (props) => {
	if (!props.attribute || props.attribute === "N/A") {
		return null;
	}
	return (
		<div className={"attribute " + props.className}>
			<div>
				<h3>{props.label}</h3>
				{props.to && (
					<Link to={props.to} className="link-to">
						<p>{startWithCapital(props.attribute)}</p>
					</Link>
				)}
				{!props.to && (
					<p className={props.delete ? "delete" : ""} onClick={props.onClick}>
						{startWithCapital(props.attribute)}
					</p>
				)}
			</div>
		</div>
	);
};

export default Attribute;
