import React from "react";
import { Box } from "@material-ui/core";

import HoardItem from "./HoardItem";

const HoardList = (props) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			{props.loadedHoards.map((hoard, index) => (
				<HoardItem
					number={index}
					key={hoard.id}
					{...hoard}
					onHoardOpen={props.onHoardOpen}
					onHoardSelectOpen={props.onHoardSelectOpen}
					onDelete={props.onDelete}
				/>
			))}
		</Box>
	);
};

export default HoardList;
