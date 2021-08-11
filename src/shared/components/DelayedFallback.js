import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const DelayedFallback = () => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		let timeout = setTimeout(() => setShow(true), 1000);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<React.Fragment>
			{show && (
				<Grid container spacing={0} direction="column" alignItems="center">
					<Card>
						<CardContent>
							<Typography variant="h3" component="h2">
								Site may take up to a minute to wake up
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			)}
		</React.Fragment>
	);
};
export default DelayedFallback;
