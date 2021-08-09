import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import { Skeleton } from "@material-ui/lab";
import { Fade } from "@material-ui/core";

const SkeletonHoardItem = (props) => {
	const onExitHandler = () => {
		props.onExited();
	};

	return (
		<Fade
			mountOnEnter
			in={props.isLoading}
			onExited={onExitHandler}
			unmountOnExit
		>
			<Card>
				<CardContent>
					<Typography variant="h5">
						<Skeleton />
					</Typography>
					<Typography variant="subtitle1">
						<Skeleton />
					</Typography>
					<Skeleton variant="rect" width={"15rem"} height={"10rem"} />
				</CardContent>
			</Card>
		</Fade>
	);
};

export default SkeletonHoardItem;
